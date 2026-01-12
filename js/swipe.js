// swipe.js 

document.addEventListener('DOMContentLoaded', () => {
  console.log("swipe loaded (updated 2026 style)");

  const MIN_DISTANCE   = 50;    // px
  const MAX_SWIPE_TIME = 400;   // ms
  const MIN_VERTICAL   = 70;    // a bit more generous for vertical (feels natural)

  let startX    = null;
  let startY    = null;
  let startTime = null;

  const swipeElements = document.querySelectorAll('.swipeMich');

  swipeElements.forEach(el => {
    el.addEventListener('touchstart',   handleStart, { passive: true });
    el.addEventListener('touchend',     handleEnd,   { passive: true });
    el.addEventListener('pointerdown',  handleStart, { passive: true });
    el.addEventListener('pointerup',    handleEnd,   { passive: true });
  });

  function handleStart(e) {
    const touch = e.touches?.[0] ?? e;
    startX     = touch.clientX;
    startY     = touch.clientY;
    startTime  = Date.now();

    // Clear previous results
    document.getElementById('swipeRichtung')?.textContent = "";
    document.getElementById('result')?.textContent        = "";
    document.getElementById('swipeStart')?.textContent    = startTime;
    document.getElementById('xTouchstartPos')?.textContent = startX.toFixed(0);
    document.getElementById('yTouchstartPos')?.textContent = startY.toFixed(0);
  }

  function handleEnd(e) {
    if (startX === null || startY === null) return;

    const touch = e.changedTouches?.[0] ?? e;
    const endX   = touch.clientX;
    const endY   = touch.clientY;
    const time   = Date.now() - startTime;

    const xDiff  = startX - endX;
    const yDiff  = startY - endY;
    const absX   = Math.abs(xDiff);
    const absY   = Math.abs(yDiff);

    // Update debug
    document.getElementById('swipeEnd')?.textContent     = Date.now();
    document.getElementById('swipeTime')?.textContent    = time;
    document.getElementById('xTouchendPos')?.textContent = endX.toFixed(0);
    document.getElementById('yTouchEndPos')?.textContent = endY.toFixed(0);
    document.getElementById('xDiff')?.textContent        = absX.toFixed(0);
    document.getElementById('yDiff')?.textContent        = absY.toFixed(0);

    // Reset
    startX = startY = startTime = null;

    // ─── Feedback preparation ──────────────────────────────────────
    let directionText = "";
    let resultText    = "";

    if (time > MAX_SWIPE_TIME) {
      resultText = "zu langsam";
    }
    else if (absX < MIN_DISTANCE && absY < MIN_VERTICAL) {
      resultText = "zu kurz";
    }
    else {
      // Determine dominant direction
      if (absX > absY) {
        // horizontal dominant
        directionText = xDiff > 0 ? "links ←" : "rechts →";
        resultText    = "SWIPE!";
        if (directionText.includes("links") || directionText.includes("rechts")) {
          switchImage();
        }
      } 
      else {
        // vertical dominant
        directionText = yDiff > 0 ? "runter ↓" : "hoch ↑";
        resultText    = "vertikaler Swipe";
        // → hierkann man work on vertical swipes
      }
    }

    // Apply texts
    document.getElementById('swipeRichtung')?.textContent = directionText;
    document.getElementById('result')?.textContent        = resultText;
  }

  function switchImage() {
    const img = document.querySelector('.picture');
    if (!img) return;

    let src    = img.src;
    let srcset = img.srcset || '';

    if (src.includes('yellow')) {
      src    = src.replace('yellow', 'red');
      srcset = srcset.replace(/yellow/g, 'red');
    } else if (src.includes('red')) {
      src    = src.replace('red', 'yellow');
      srcset = srcset.replace(/red/g, 'yellow');
    }

    img.src = src;
    if (srcset) img.srcset = srcset;
  }

  document.getElementById('test')?.addEventListener('click', () => {
    switchImage();
    document.getElementById('result')?.textContent = "Test-Klick";
  });
});