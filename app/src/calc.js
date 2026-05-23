(function (global) {
  'use strict';

  var VALID_DROP_FACTORS = [15, 20, 60];
  var MIN_VOLUME_ML = 10;
  var MAX_VOLUME_ML = 2500;
  var MINUTES_PER_DAY = 24 * 60;

  function pad2(value) {
    return String(value).padStart(2, '0');
  }

  function roundVolume(input) {
    return Math.round(input / 10) * 10;
  }

  function parseVolume(volumeInput) {
    if (volumeInput === null || volumeInput === undefined || String(volumeInput).trim() === '') {
      return { error: '残量を入力してください' };
    }

    var numericVolume = Number(volumeInput);
    if (!Number.isFinite(numericVolume)) {
      return { error: '残量を入力してください' };
    }

    var roundedVolumeMl = roundVolume(numericVolume);
    if (roundedVolumeMl < MIN_VOLUME_ML) {
      return { error: '残量は10mL以上で入力してください', roundedVolumeMl: roundedVolumeMl };
    }

    if (roundedVolumeMl > MAX_VOLUME_ML) {
      return { error: '残量は2500mL以下で入力してください', roundedVolumeMl: roundedVolumeMl };
    }

    return { roundedVolumeMl: roundedVolumeMl };
  }

  function parseDropFactor(dropFactor) {
    var numericDropFactor = Number(dropFactor);
    if (!VALID_DROP_FACTORS.includes(numericDropFactor)) {
      return { error: '滴下係数を選択してください' };
    }

    return { dropFactor: numericDropFactor };
  }

  function parseEndTime(endTimeValue) {
    if (endTimeValue === null || endTimeValue === undefined || String(endTimeValue).trim() === '') {
      return { error: '終了予定時刻を入力してください' };
    }

    var match = /^(\d{2}):(\d{2})$/.exec(String(endTimeValue));
    if (!match) {
      return { error: '終了予定時刻を入力してください' };
    }

    var hour = Number(match[1]);
    var minute = Number(match[2]);
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      return { error: '終了予定時刻を入力してください' };
    }

    var roundedMinute = Math.round(minute / 10) * 10;
    if (roundedMinute === 60) {
      hour += 1;
      roundedMinute = 0;
    }
    if (hour === 24) {
      hour = 0;
    }

    return {
      hour: hour,
      minute: roundedMinute,
      roundedEndTimeText: pad2(hour) + ':' + pad2(roundedMinute)
    };
  }

  function normalizeNow(now) {
    var normalized = now instanceof Date ? new Date(now.getTime()) : new Date(now);
    if (Number.isNaN(normalized.getTime())) {
      normalized = new Date();
    }
    normalized.setSeconds(0, 0);
    return normalized;
  }

  function resolveEndDate(nowDate, roundedHour, roundedMinute) {
    var endDate = new Date(nowDate.getTime());
    endDate.setHours(roundedHour, roundedMinute, 0, 0);

    if (endDate.getTime() <= nowDate.getTime()) {
      endDate.setDate(endDate.getDate() + 1);
    }

    return endDate;
  }

  function formatRemainingMinutes(remainingMinutes) {
    var hours = Math.floor(remainingMinutes / 60);
    var minutes = remainingMinutes % 60;
    return hours + '時間' + pad2(minutes) + '分';
  }

  function formatRoundedPositive(rawValue, unit, lessThanOneText) {
    var roundedValue = Math.round(rawValue);
    if (roundedValue === 0 && rawValue > 0) {
      return { text: lessThanOneText, roundedValue: 0, isLessThanOne: true };
    }

    return { text: String(roundedValue) + unit, roundedValue: roundedValue, isLessThanOne: false };
  }

  function floorToSecondMs(value) {
    var numericValue = Number(value);
    if (!Number.isFinite(numericValue)) {
      return 0;
    }

    return Math.floor(numericValue / 1000) * 1000;
  }

  function secondAngleFromMs(value) {
    var date = new Date(value);
    return date.getSeconds() * 6;
  }

  function getNextMarkerMs(anchorMs, intervalMs, nowMs) {
    var elapsedMs = nowMs - anchorMs;
    var completedIntervals = Math.floor(elapsedMs / intervalMs);
    var nextMarkerMs = anchorMs + (completedIntervals + 1) * intervalMs;

    while (nextMarkerMs <= nowMs) {
      nextMarkerMs += intervalMs;
    }

    return nextMarkerMs;
  }

  function getClockwiseSweepAngle(startAngle, endAngle) {
    return (endAngle - startAngle + 360) % 360;
  }

  function getSecondGuideState(anchorMs, intervalSeconds, nowMs) {
    var normalizedIntervalSeconds = Math.round(Number(intervalSeconds));
    if (!Number.isFinite(normalizedIntervalSeconds) || normalizedIntervalSeconds <= 0) {
      return null;
    }

    var normalizedAnchorMs = floorToSecondMs(anchorMs);
    var normalizedNowMs = floorToSecondMs(nowMs);
    var intervalMs = normalizedIntervalSeconds * 1000;
    var nextMarkerMs = getNextMarkerMs(normalizedAnchorMs, intervalMs, normalizedNowMs);
    var followingMarkerMs = nextMarkerMs + intervalMs;
    var currentAngleDeg = secondAngleFromMs(normalizedNowMs);
    var nextMarkerAngleDeg = secondAngleFromMs(nextMarkerMs);
    var followingMarkerAngleDeg = secondAngleFromMs(followingMarkerMs);
    var rangeSweepAngleDeg = getClockwiseSweepAngle(currentAngleDeg, nextMarkerAngleDeg);

    return {
      normalizedAnchorMs: normalizedAnchorMs,
      normalizedNowMs: normalizedNowMs,
      intervalSeconds: normalizedIntervalSeconds,
      currentAngleDeg: currentAngleDeg,
      nextMarkerAngleDeg: nextMarkerAngleDeg,
      followingMarkerAngleDeg: followingMarkerAngleDeg,
      rangeStartAngleDeg: currentAngleDeg,
      rangeEndAngleDeg: nextMarkerAngleDeg,
      rangeSweepAngleDeg: rangeSweepAngleDeg,
      nextMarkerMs: nextMarkerMs,
      followingMarkerMs: followingMarkerMs,
      showDialLabels: normalizedIntervalSeconds > 2
    };
  }

  function calculate(options) {
    var input = options || {};
    var errors = {};

    var volume = parseVolume(input.volumeInput);
    if (volume.error) {
      errors.volume = volume.error;
    }

    var endTime = parseEndTime(input.endTimeValue);
    if (endTime.error) {
      errors.endTime = endTime.error;
    }

    var dropFactor = parseDropFactor(input.dropFactor);
    if (dropFactor.error) {
      errors.dropFactor = dropFactor.error;
    }

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors: errors, result: null };
    }

    var nowDate = normalizeNow(input.now);
    var endDate = resolveEndDate(nowDate, endTime.hour, endTime.minute);
    var remainingMinutes = Math.round((endDate.getTime() - nowDate.getTime()) / 60000);

    if (remainingMinutes <= 0 || remainingMinutes > MINUTES_PER_DAY) {
      return {
        ok: false,
        errors: { endTime: '終了予定時刻を入力してください' },
        result: null
      };
    }

    var mlPerHourRaw = volume.roundedVolumeMl / remainingMinutes * 60;
    var dropsPerMinuteRaw = volume.roundedVolumeMl / remainingMinutes * dropFactor.dropFactor;
    var mlPerHour = formatRoundedPositive(mlPerHourRaw, 'mL/h', '1mL/h未満');
    var dropsPerMinute = formatRoundedPositive(dropsPerMinuteRaw, '滴/分', '1滴/分未満');
    var secondsPerDropRaw = dropsPerMinuteRaw > 0 ? 60 / dropsPerMinuteRaw : null;
    var secondsPerDropSeconds = null;
    var secondsPerDropText = '';
    var mainText = dropsPerMinute.text;

    if (!dropsPerMinute.isLessThanOne) {
      secondsPerDropSeconds = Math.round(60 / dropsPerMinute.roundedValue);
      secondsPerDropText = '約' + secondsPerDropSeconds + '秒に1滴';
      mainText = secondsPerDropText;
    }

    var isSecondGuideEligible =
      secondsPerDropRaw !== null &&
      secondsPerDropRaw >= 1 &&
      secondsPerDropSeconds !== null &&
      secondsPerDropSeconds < 60;

    var conditionText = [
      '条件：残量' + volume.roundedVolumeMl + 'mL',
      '終了' + endTime.roundedEndTimeText,
      '残り' + formatRemainingMinutes(remainingMinutes),
      dropFactor.dropFactor + '滴/mL'
    ].join(' / ');

    return {
      ok: true,
      errors: {},
      result: {
        mainText: mainText,
        dropsPerMinuteText: dropsPerMinute.text,
        mlPerHourText: mlPerHour.text,
        secondsPerDropText: secondsPerDropText,
        dropsPerMinuteValue: dropsPerMinuteRaw,
        secondsPerDropRaw: secondsPerDropRaw,
        secondsPerDropSeconds: secondsPerDropSeconds,
        isSecondGuideEligible: isSecondGuideEligible,
        conditionText: conditionText,
        roundedVolumeMl: volume.roundedVolumeMl,
        roundedEndTimeText: endTime.roundedEndTimeText,
        remainingMinutes: remainingMinutes
      }
    };
  }

  global.TentekiCalc = {
    calculate: calculate,
    getSecondGuideState: getSecondGuideState
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = global.TentekiCalc;
  }
})(typeof globalThis !== 'undefined' ? globalThis : window);
