(function () {
  'use strict';

  var DEFAULT_DROP_FACTOR = 20;
  var CLOCK_CENTER = 80;
  var CLOCK_TICK_OUTER_RADIUS = 54;
  var CLOCK_TICK_INNER_RADIUS = 50;
  var CLOCK_FIVE_SECOND_TICK_INNER_RADIUS = 45;
  var CLOCK_NUMBER_RADIUS = 63;
  var CLOCK_HAND_RADIUS = 43;
  var selectedDropFactor = DEFAULT_DROP_FACTOR;
  var hasRenderedResult = false;
  var clockTimeoutId = null;
  var isResettingAfterSuccess = false;

  var form = document.getElementById('calculation-form');
  var volumeInput = document.getElementById('volume-input');
  var endTimeInput = document.getElementById('end-time-input');
  var volumeError = document.getElementById('volume-error');
  var endTimeError = document.getElementById('end-time-error');
  var dropFactorError = document.getElementById('drop-factor-error');
  var factorButtons = Array.prototype.slice.call(document.querySelectorAll('.factor-button'));
  var resultPanel = document.getElementById('result-panel');
  var mainResult = document.getElementById('main-result');
  var dropsResult = document.getElementById('drops-result');
  var mlResult = document.getElementById('ml-result');
  var conditionText = document.getElementById('condition-text');
  var staleResult = document.getElementById('stale-result');
  var clockTicks = document.getElementById('clock-ticks');
  var clockNumbers = document.getElementById('clock-numbers');
  var clockHand = document.getElementById('clock-hand');

  function setSelectedDropFactor(dropFactor) {
    selectedDropFactor = Number(dropFactor);

    factorButtons.forEach(function (button) {
      var isSelected = Number(button.dataset.dropFactor) === selectedDropFactor;
      button.classList.toggle('is-selected', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
    });

    dropFactorError.textContent = '';
  }

  function markDisplayedResultStale() {
    if (!hasRenderedResult || isResettingAfterSuccess) {
      return;
    }

    staleResult.hidden = false;
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
    staleResult.hidden = true;
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
      x: CLOCK_CENTER + Math.cos(radians) * radius,
      y: CLOCK_CENTER + Math.sin(radians) * radius
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

  function createSvgElement(tagName) {
    return document.createElementNS('http://www.w3.org/2000/svg', tagName);
  }

  function buildClockFace() {
    if (!clockTicks || !clockNumbers) {
      return;
    }

    for (var second = 0; second < 60; second += 1) {
      var angleDeg = second * 6;
      var isFiveSecondTick = second % 5 === 0;
      var tick = createSvgElement('line');
      tick.setAttribute('class', isFiveSecondTick ? 'clock-tick clock-tick-major' : 'clock-tick');
      setLineByAngle(
        tick,
        angleDeg,
        isFiveSecondTick ? CLOCK_FIVE_SECOND_TICK_INNER_RADIUS : CLOCK_TICK_INNER_RADIUS,
        CLOCK_TICK_OUTER_RADIUS
      );
      clockTicks.appendChild(tick);

      if (isFiveSecondTick) {
        var labelPoint = polarPoint(angleDeg, CLOCK_NUMBER_RADIUS);
        var number = createSvgElement('text');
        number.setAttribute('class', 'clock-number');
        number.setAttribute('x', labelPoint.x.toFixed(2));
        number.setAttribute('y', labelPoint.y.toFixed(2));
        number.textContent = String(second);
        clockNumbers.appendChild(number);
      }
    }
  }

  function updateClock() {
    if (!clockHand) {
      return;
    }

    var state = window.TentekiCalc.getSecondClockState(Date.now());
    setLineByAngle(clockHand, state.angleDeg, 0, CLOCK_HAND_RADIUS);
    scheduleNextClockUpdate();
  }

  function stopClockTimer() {
    if (clockTimeoutId !== null) {
      window.clearTimeout(clockTimeoutId);
      clockTimeoutId = null;
    }
  }

  function scheduleNextClockUpdate() {
    var nowMs = Date.now();
    var delayMs = 1000 - (nowMs % 1000);

    if (delayMs < 50) {
      delayMs += 1000;
    }

    stopClockTimer();
    clockTimeoutId = window.setTimeout(updateClock, delayMs);
  }

  function scrollToResult() {
    window.requestAnimationFrame(function () {
      var reducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      resultPanel.scrollIntoView({
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
        markDisplayedResultStale();
      }
    });
  });

  volumeInput.addEventListener('input', function () {
    volumeError.textContent = '';
    volumeInput.setAttribute('aria-invalid', 'false');
    markDisplayedResultStale();
  });

  endTimeInput.addEventListener('input', function () {
    endTimeError.textContent = '';
    endTimeInput.setAttribute('aria-invalid', 'false');
    markDisplayedResultStale();
  });

  volumeInput.addEventListener('change', markDisplayedResultStale);
  endTimeInput.addEventListener('change', markDisplayedResultStale);

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
      markDisplayedResultStale();
      focusFirstInvalid(calculation.errors);
      return;
    }

    clearErrors();
    renderResult(calculation.result);
    resetInputs();
    scrollToResult();
  });

  window.addEventListener('pagehide', stopClockTimer);
  window.addEventListener('pageshow', updateClock);

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopClockTimer();
    } else {
      updateClock();
    }
  });

  setSelectedDropFactor(DEFAULT_DROP_FACTOR);
  buildClockFace();
  updateClock();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./service-worker.js');
    });
  }
})();
