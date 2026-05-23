(function () {
  'use strict';

  var DEFAULT_DROP_FACTOR = 20;
  var GUIDE_STATUS_CURRENT = '表示中の結果に基づくガイドです。';
  var GUIDE_STATUS_STALE = '前回の計算結果に基づくガイドです。新しい条件は計算すると反映されます。';
  var GUIDE_A11Y_CURRENT = '秒針ガイドを表示しています。次の目印と2つ先の目印を目安にしてください。';
  var GUIDE_A11Y_UNAVAILABLE = 'この計算結果は秒針ガイドの対象外です。';
  var GUIDE_A11Y_ERROR = '入力エラーのため、表示中のガイドは前回の計算結果です。';
  var SVG_CENTER = 60;
  var selectedDropFactor = DEFAULT_DROP_FACTOR;
  var hasRenderedResult = false;
  var guideTimeoutId = null;
  var guideRunId = 0;
  var activeGuide = null;
  var isResettingAfterSuccess = false;

  var form = document.getElementById('calculation-form');
  var volumeInput = document.getElementById('volume-input');
  var endTimeInput = document.getElementById('end-time-input');
  var volumeError = document.getElementById('volume-error');
  var endTimeError = document.getElementById('end-time-error');
  var dropFactorError = document.getElementById('drop-factor-error');
  var factorButtons = Array.prototype.slice.call(document.querySelectorAll('.factor-button'));
  var mainResult = document.getElementById('main-result');
  var dropsResult = document.getElementById('drops-result');
  var mlResult = document.getElementById('ml-result');
  var conditionText = document.getElementById('condition-text');
  var secondGuide = document.getElementById('second-guide');
  var guideStatus = document.getElementById('guide-status');
  var guideA11y = document.getElementById('guide-a11y');
  var guideDial = document.getElementById('guide-dial');
  var guideUnavailable = document.getElementById('guide-unavailable');
  var guideRange = document.getElementById('guide-range');
  var guideHand = document.getElementById('guide-hand');
  var guideNextMarker = document.getElementById('guide-next-marker');
  var guideFollowingMarker = document.getElementById('guide-following-marker');
  var guideNextLabel = document.getElementById('guide-next-label');
  var guideFollowingLabel = document.getElementById('guide-following-label');

  function setTextIfChanged(element, text) {
    if (element && element.textContent !== text) {
      element.textContent = text;
    }
  }

  function setSelectedDropFactor(dropFactor) {
    selectedDropFactor = Number(dropFactor);

    factorButtons.forEach(function (button) {
      var isSelected = Number(button.dataset.dropFactor) === selectedDropFactor;
      button.classList.toggle('is-selected', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
    });

    dropFactorError.textContent = '';
  }

  function setGuideStatus(isStale, reason) {
    var statusText = isStale ? GUIDE_STATUS_STALE : GUIDE_STATUS_CURRENT;
    var a11yText = GUIDE_A11Y_CURRENT;

    if (reason === 'error') {
      a11yText = GUIDE_A11Y_ERROR;
    } else if (!guideDial || guideDial.hidden) {
      a11yText = GUIDE_A11Y_UNAVAILABLE;
    } else if (isStale) {
      a11yText = GUIDE_STATUS_STALE;
    }

    setTextIfChanged(guideStatus, statusText);
    setTextIfChanged(guideA11y, a11yText);
  }

  function markDisplayedResultStale(reason) {
    if (!hasRenderedResult || isResettingAfterSuccess) {
      return;
    }

    setGuideStatus(true, reason);
  }

  function clearErrors() {
    volumeError.textContent = '';
    endTimeError.textContent = '';
    dropFactorError.textContent = '';
    volumeInput.setAttribute('aria-invalid', 'false');
    endTimeInput.setAttribute('aria-invalid', 'false');
  }

  function showErrors(errors) {
    clearErrors();

    if (errors.volume) {
      volumeError.textContent = errors.volume;
      volumeInput.setAttribute('aria-invalid', 'true');
    }

    if (errors.endTime) {
      endTimeError.textContent = errors.endTime;
      endTimeInput.setAttribute('aria-invalid', 'true');
    }

    if (errors.dropFactor) {
      dropFactorError.textContent = errors.dropFactor;
    }
  }

  function focusFirstInvalid(errors) {
    if (errors.volume) {
      volumeInput.focus();
      return;
    }

    if (errors.endTime) {
      endTimeInput.focus();
      return;
    }

    if (errors.dropFactor && factorButtons.length > 0) {
      factorButtons[0].focus();
    }
  }

  function renderResult(result) {
    mainResult.textContent = result.mainText;
    dropsResult.textContent = result.dropsPerMinuteText;
    mlResult.textContent = result.mlPerHourText;
    conditionText.textContent = result.conditionText;
    hasRenderedResult = true;
  }

  function resetInputs() {
    isResettingAfterSuccess = true;
    volumeInput.value = '';
    endTimeInput.value = '';
    setSelectedDropFactor(DEFAULT_DROP_FACTOR);
    isResettingAfterSuccess = false;
  }

  function polarPoint(angleDeg, radius) {
    var radians = (angleDeg - 90) * Math.PI / 180;
    return {
      x: SVG_CENTER + Math.cos(radians) * radius,
      y: SVG_CENTER + Math.sin(radians) * radius
    };
  }

  function setLineByAngle(element, angleDeg, innerRadius, outerRadius) {
    var start = polarPoint(angleDeg, innerRadius);
    var end = polarPoint(angleDeg, outerRadius);

    element.setAttribute('x1', start.x.toFixed(2));
    element.setAttribute('y1', start.y.toFixed(2));
    element.setAttribute('x2', end.x.toFixed(2));
    element.setAttribute('y2', end.y.toFixed(2));
  }

  function setLabelByAngle(element, angleDeg, radius) {
    var point = polarPoint(angleDeg, radius);
    var normalizedAngle = ((angleDeg % 360) + 360) % 360;
    var textAnchor = 'middle';

    if (normalizedAngle > 20 && normalizedAngle < 160) {
      textAnchor = 'start';
    } else if (normalizedAngle > 200 && normalizedAngle < 340) {
      textAnchor = 'end';
    }

    element.setAttribute('x', point.x.toFixed(2));
    element.setAttribute('y', point.y.toFixed(2));
    element.setAttribute('text-anchor', textAnchor);
  }

  function describeArc(startAngleDeg, sweepAngleDeg, radius) {
    if (sweepAngleDeg <= 0) {
      return '';
    }

    var start = polarPoint(startAngleDeg, radius);
    var end = polarPoint(startAngleDeg + sweepAngleDeg, radius);
    var largeArc = sweepAngleDeg > 180 ? 1 : 0;

    return [
      'M', start.x.toFixed(2), start.y.toFixed(2),
      'A', radius, radius, 0, largeArc, 1, end.x.toFixed(2), end.y.toFixed(2)
    ].join(' ');
  }

  function renderGuideState(state) {
    var markerInnerRadius = state.showDialLabels ? 34 : 43;
    var markerOuterRadius = 54;

    guideRange.setAttribute('d', describeArc(state.rangeStartAngleDeg, state.rangeSweepAngleDeg, 46));
    setLineByAngle(guideHand, state.currentAngleDeg, 0, 42);
    setLineByAngle(guideNextMarker, state.nextMarkerAngleDeg, markerInnerRadius, markerOuterRadius);
    setLineByAngle(guideFollowingMarker, state.followingMarkerAngleDeg, markerInnerRadius, markerOuterRadius);

    guideNextLabel.style.display = state.showDialLabels ? '' : 'none';
    guideFollowingLabel.style.display = state.showDialLabels ? '' : 'none';

    if (state.showDialLabels) {
      setLabelByAngle(guideNextLabel, state.nextMarkerAngleDeg, 30);
      setLabelByAngle(guideFollowingLabel, state.followingMarkerAngleDeg, 30);
    }
  }

  function stopGuideTimer() {
    if (guideTimeoutId !== null) {
      window.clearTimeout(guideTimeoutId);
      guideTimeoutId = null;
    }
  }

  function scheduleNextGuideUpdate(runId) {
    var nowMs = Date.now();
    var delayMs = 1000 - (nowMs % 1000);

    if (delayMs < 50) {
      delayMs += 1000;
    }

    guideTimeoutId = window.setTimeout(function () {
      if (runId !== guideRunId || !activeGuide) {
        return;
      }

      updateGuide(runId);
    }, delayMs);
  }

  function updateGuide(runId) {
    if (runId !== guideRunId || !activeGuide) {
      return;
    }

    var state = window.TentekiCalc.getSecondGuideState(
      activeGuide.anchorMs,
      activeGuide.intervalSeconds,
      Date.now()
    );

    if (state) {
      renderGuideState(state);
    }

    scheduleNextGuideUpdate(runId);
  }

  function showGuideUnavailable() {
    guideDial.hidden = true;
    guideUnavailable.hidden = false;
    guideUnavailable.textContent = 'この計算結果は秒針ガイドの対象外です。滴下間隔は結果表示を確認してください。';
  }

  function showGuideDial() {
    guideDial.hidden = false;
    guideUnavailable.hidden = true;
    guideUnavailable.textContent = '';
  }

  function startOrUpdateGuide(result, anchorMs) {
    stopGuideTimer();
    guideRunId += 1;
    activeGuide = null;
    secondGuide.hidden = false;

    if (!result.isSecondGuideEligible) {
      showGuideUnavailable();
      setGuideStatus(false);
      return;
    }

    showGuideDial();
    setGuideStatus(false);
    activeGuide = {
      anchorMs: anchorMs,
      intervalSeconds: result.secondsPerDropSeconds
    };
    updateGuide(guideRunId);
  }

  function scrollToResult() {
    window.requestAnimationFrame(function () {
      var reducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      mainResult.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  }

  factorButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var previousDropFactor = selectedDropFactor;
      setSelectedDropFactor(button.dataset.dropFactor);

      if (Number(button.dataset.dropFactor) !== previousDropFactor) {
        markDisplayedResultStale('input');
      }
    });
  });

  volumeInput.addEventListener('input', function () {
    volumeError.textContent = '';
    volumeInput.setAttribute('aria-invalid', 'false');
    markDisplayedResultStale('input');
  });

  endTimeInput.addEventListener('input', function () {
    endTimeError.textContent = '';
    endTimeInput.setAttribute('aria-invalid', 'false');
    markDisplayedResultStale('input');
  });

  volumeInput.addEventListener('change', function () {
    markDisplayedResultStale('input');
  });

  endTimeInput.addEventListener('change', function () {
    markDisplayedResultStale('input');
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var clickedAt = new Date();
    var calculation = window.TentekiCalc.calculate({
      volumeInput: volumeInput.value,
      endTimeValue: endTimeInput.value,
      dropFactor: selectedDropFactor,
      now: clickedAt
    });

    if (!calculation.ok) {
      showErrors(calculation.errors);
      markDisplayedResultStale('error');
      focusFirstInvalid(calculation.errors);
      return;
    }

    var anchorMs = Math.floor(clickedAt.getTime() / 1000) * 1000;
    clearErrors();
    renderResult(calculation.result);
    startOrUpdateGuide(calculation.result, anchorMs);
    resetInputs();
    scrollToResult();
  });

  setSelectedDropFactor(DEFAULT_DROP_FACTOR);
})();
