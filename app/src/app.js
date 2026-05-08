(function () {
  'use strict';

  var DEFAULT_DROP_FACTOR = 20;
  var selectedDropFactor = DEFAULT_DROP_FACTOR;

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

  function setSelectedDropFactor(dropFactor) {
    selectedDropFactor = Number(dropFactor);

    factorButtons.forEach(function (button) {
      var isSelected = Number(button.dataset.dropFactor) === selectedDropFactor;
      button.classList.toggle('is-selected', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
    });

    dropFactorError.textContent = '';
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
  }

  function resetInputs() {
    volumeInput.value = '';
    endTimeInput.value = '';
    setSelectedDropFactor(DEFAULT_DROP_FACTOR);
  }

  factorButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      setSelectedDropFactor(button.dataset.dropFactor);
    });
  });

  volumeInput.addEventListener('input', function () {
    volumeError.textContent = '';
    volumeInput.setAttribute('aria-invalid', 'false');
  });

  endTimeInput.addEventListener('input', function () {
    endTimeError.textContent = '';
    endTimeInput.setAttribute('aria-invalid', 'false');
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var calculation = window.TentekiCalc.calculate({
      volumeInput: volumeInput.value,
      endTimeValue: endTimeInput.value,
      dropFactor: selectedDropFactor,
      now: new Date()
    });

    if (!calculation.ok) {
      showErrors(calculation.errors);
      focusFirstInvalid(calculation.errors);
      return;
    }

    clearErrors();
    renderResult(calculation.result);
    resetInputs();
  });

  setSelectedDropFactor(DEFAULT_DROP_FACTOR);
})();
