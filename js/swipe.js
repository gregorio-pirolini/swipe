document.addEventListener('DOMContentLoaded', function () {
  console.log("swipe loaded (fixed version)");

  var MIN_DISTANCE   = 50;
  var MAX_SWIPE_TIME = 400;
  var MIN_VERTICAL   = 70;

  var startX    = null;
  var startY    = null;
  var startTime = null;

  var swipeElements = document.querySelectorAll('.swipeMich');

  for (var i = 0; i < swipeElements.length; i++) {
    var el = swipeElements[i];
    el.addEventListener('touchstart', handleStart, { passive: true });
    el.addEventListener('touchend',   handleEnd,   { passive: true });
  }

  function updateText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function handleStart(e) {
    var touch = e.touches ? e.touches[0] : e;
    startX     = touch.clientX;
    startY     = touch.clientY;
    startTime  = Date.now();

    updateText('swipeStart', startTime);
    updateText('xTouchstartPos', Math.round(startX));
    updateText('yTouchstartPos', Math.round(startY));
    updateText('swipeRichtung', "");
    updateText('result', "");
  }

  function handleEnd(e) {
    if (startX === null || startY === null) return;

    var touch = e.changedTouches ? e.changedTouches[0] : e;
    var endX   = touch.clientX;
    var endY   = touch.clientY;
    var time   = Date.now() - startTime;

    var xDiff  = startX - endX;
    var yDiff  = startY - endY;
    var absX   = Math.abs(xDiff);
    var absY   = Math.abs(yDiff);

    updateText('swipeEnd', Date.now());
    updateText('swipeTime', time);
    updateText('xTouchendPos', Math.round(endX));
    updateText('yTouchEndPos', Math.round(endY));
    updateText('xDiff', Math.round(absX));
    updateText('yDiff', Math.round(absY));

    startX = startY = startTime = null;

    var directionText = "";
    var resultText    = "";

    if (time > MAX_SWIPE_TIME) {
      resultText = "zu langsam";
    } else if (absX < MIN_DISTANCE && absY < MIN_VERTICAL) {
      resultText = "zu kurz";
    } else {
      if (absX > absY) {
        directionText = xDiff > 0 ? "links ←" : "rechts →";
        resultText    = "SWIPE!";
        if (xDiff !== 0) switchImage();  // only horizontal changes image
      } else {
        directionText = yDiff > 0 ? "runter ↓" : "hoch ↑";
        resultText    = "vertikaler Swipe";
      }
    }

    updateText('swipeRichtung', directionText);
    updateText('swipeResult', resultText);
  }

  function switchImage() {
    var img = document.querySelector('.picture');
    if (!img) return;

    var src    = img.src;
    var srcset = img.srcset || '';

    if (src.indexOf('yellow') !== -1) {
      src    = src.replace('yellow', 'red');
      srcset = srcset.replace(/yellow/g, 'red');
    } else if (src.indexOf('red') !== -1) {
      src    = src.replace('red', 'yellow');
      srcset = srcset.replace(/red/g, 'yellow');
    }

    img.src = src;
    if (srcset) img.srcset = srcset;
  }


  document.getElementById('test')?.addEventListener('click', () => {
    switchImage();
    console.log("Test-Klick")
    updateText('swipeResult', "Test-Klick");
  });


});