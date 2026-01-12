jQuery(document).ready(function ($) {
  console.log("zoom loaded");

//   //!                                ____
//   //!   ____  ____  ____  ____ ___  / / /
//   //!  /_  / / __ \/ __ \/ __ `__ \/ / /
//   //!   / /_/ /_/ / /_/ / / / / / /_/_/
//   //!  /___/\____/\____/_/ /_/ /_(_|_)

//   let imgPosLeft; //.zoom img position left
//   let imgPosTop; //.zoom img position top
//   let imgWidth;  //.zoom img width
//   let imgHeight; //.zoom img height
//   let prozent; //zoom factor

//   let quotientWidth; //to calculate bg position
//   let quotientHeight;//to calculate bg position
//   let $bodyOffSetTop;//document scroll top
//   let $newBodyOffSetTop;//document scroll top after scroll
//   let $diffscroll; //difference of scrolls

//   let topLarge; //position top of large div
//   let leftLarge; //position left of large div

//   let xUp; //mouse x position
//   let yUp; //mouse y position
//   let $name; //the name of pix hovered .zoom img
//   let hasTouch = false; //is it on touchscreen or monitor? SET TO NOT


//  //touchscreen zoom variables
//  let isZoomingTouch = false;
//   let activePointerId = null;
//   let holdTimer = null;
//   let holdDelay = 180; // ms


//   //to know if screen or laptop computer

//   $("body").one("touchstart", function (e) {
//     hasTouch = true;
//     console.log("AM ON A SCRREN");
//     $(this).off(".noTouch");
//   });

//   // ZOOM START
//   $("body").on("mouseenter.noTouch", ".zoom img", function (e) {
//     console.log("ready for zoom");

//     if (hasTouch === true) {
//       return;
//     }

//     let parentOffset = $(this).parent().offset();
//     //or $(this).offset(); if you really just want the current element's offset
//     let relX = e.pageX - parentOffset.left;
//     let relY = e.pageY - parentOffset.top;
//     // alert(` X ${relX} y ${relY}`);
//     console.log(` X ${relX} y ${relY}`);

//     xUp = e.pageX;
//     yUp = e.pageY;
//     $bodyOffSetTop = $(document).scrollTop();
//     console.log("zoom Works");
//     console.log("$bodyOffSetTop: " + $bodyOffSetTop);
    
//     let src = this.currentSrc || $(this).attr("src");
//     $name = src.replace(/-\d+x\d+(?=\.(jpg|jpeg|png|webp)$)/i, "");

//     //alert(name);
//     imgPosLeft = $(this).offset().left;
//     imgPosTop = $(this).offset().top;
//     //imgMarginTop= $('#content').height();
//     //imgMarginTop=78;
//     // console.log(imgMarginTop);
//     console.log("imgPosLeft: " + imgPosLeft);
//     console.log("imgPosTop: " + imgPosTop);
//     imgWidth = $(this).width();
//     imgHeight = $(this).height();
//     //console.log('imgWidth: '+imgWidth);
//     //console.log('imgHeight: '+imgHeight);
//     createNewDiv($name); //put bigPix in div
//     //show div
//   });

//   ////////////////////////////////

//   $("body").on(
//     "mousewheel.noTouch DOMMouseScroll.noTouch",
//     ".zoom img",
//     function (e) {
//       // console.log('ready for zoom 2');
//       if (hasTouch === true) {
//         return;
//       }

//       //console.log('mousewheel DOMMouseScroll zoom 1')
//       //   console.log('scroll');
//       //   console.log('b4 scroll: '+ $bodyOffSetTop);
//       //
//       $newBodyOffSetTop = $(document).scrollTop();
//       //console.log('after scroll: '+ $newBodyOffSetTop);
//       // console.log('diff scroll: '+ ($bodyOffSetTop-$newBodyOffSetTop));
//       $diffscroll = $bodyOffSetTop - $newBodyOffSetTop;
//       $bodyOffSetTop = $newBodyOffSetTop;

//       whereAmIFunction(true, $diffscroll, "mousewheel");
//     }
//   );
//   ///////////////////////////

//   $("body").on("mousemove.noTouch", ".zoom img", function (e) {
//     console.log("mouse move");
//     if (hasTouch === true) {
//       console.log("i stop!!");
//       return;
//     }

//     let parentOffset = $(this).parent().offset();
//     //or $(this).offset(); if you really just want the current element's offset
//     let relX = e.pageX - parentOffset.left;
//     let relY = e.pageY - parentOffset.top;
//     // alert(` X ${relX} y ${relY}`);
//     // console.log(` X ${relX} y ${relY}`);
//     let imgWidth = $(this).attr("width");
//     let imgHeight = $(this).attr("height");

//     console.log("!!!!figureQuotient>imageQuotient");
//     xUp = e.pageX;
//     yUp = e.pageY;
//     whereAmIFunction(false, "", e);

//     // let ImgScrollWidth=
//     // let ImgScrollHeight=

//     xUp = e.pageX;
//     yUp = e.pageY;
//     console.log("imgWidth: " + imgWidth);
//     console.log("imgHeight: " + imgHeight);
//     console.log("imgPosLeft: " + imgPosLeft);
//     console.log("imgPosTop: " + imgPosTop);
//     console.log("xUp: " + xUp);
//     console.log("yUp: " + yUp);

//     whereAmIFunction(false, "", e);
//   });

//   $("body").on("mouseleave.noTouch", ".zoom img", function () {
//     if (hasTouch === true) {
//       return;
//     }
//     hideZoom("mouseleave");
//   });

//   //create new Div large
//   function createNewDiv(name) {
//     console.log("createNewDiv: " + name);
//     //console.log('createNewDiv(name)')

//     $("#large").css("background-image", "url(" + name + ")");
//     //$('#large').css('background-image','url('+urlupload+'centerMe.png)');
//     let img = new Image();
//     img.src = name;
//     //console.log(img.src);
//     $(img).on("load", function () {
//       let bgImgWidth = img.width;

//       console.log("......createNewDiv w:" + bgImgWidth);
//       prozent = bgImgWidth / imgWidth;
//       $("#large").css(
//   "background-size",
//   (imgWidth * prozent) + "px " + (imgHeight * prozent) + "px"
// );
//     });

//   }

//   function whereAmIFunction(scroll, pixels, e) {
//     console.log(
//       "...........................whereAmIFunction(scroll: " +
//         scroll +
//         ",pixels: " +
//         pixels +
//         ")"
//     );
//     //$('#bannerText').text('whereAmIFunction: '+scroll+", "+pixels+", "+from);
//     if ($("#large").css("display") !== "block") {
//       //alert('show');
//       $("#large").show();
//     }

//     if (!scroll) {
//       //console.log('not scroll');
//       //y = e.pageY;
//       //x =  e.pageX;
//       //xUp = e.originalEvent.pageX;
//       //yUp = e.originalEvent.pageY;
//     } else {
//       //console.log('scrolliiing: '+xUp+" "+yUp);
//       yUp -= $diffscroll;
//     }
//     //$('#large').text(touchingMe+' x: '+x)//y-100
//     //console.log('x:'+x);
//     //        console.log('y:'+y);
//     //
//     //console.log($('#large').width());
//     //    console.log ('imgPosLeft'+imgPosLeft);
//     //     console.log ('imgWidth'+imgWidth);
//     //     console.log ('imgPosTop'+imgPosTop);
//     //     console.log ('imgHeight'+imgHeight);
//     //     console.log ('x'+x);
//     //     console.log ('y'+y);
//     quotientWidth = 1 - (xUp - imgPosLeft) / (imgWidth / 2);
//     quotientHeight = 1 - (yUp - imgPosTop) / (imgHeight / 2);

//     // console.log('quotientWidth: '+quotientWidth +' quotientHeight: '+quotientHeight);
//     //quotientWidth=1;
//     //quotientHeight=1;
//     let quotientWidth100 = 100 - 100 * quotientWidth;
//     let quotientHeight100 = 100 - 100 * quotientHeight;
//     let bgLeft = (imgPosLeft - xUp) * prozent + quotientWidth100;
//     let bgTop = (imgPosTop - yUp) * prozent + quotientHeight100;

// // ---- Clamp bg position so background never goes beyond image edges ----
// const lensW = $("#large").width();
// const lensH = $("#large").height();

// const bgW = imgWidth * prozent;
// const bgH = imgHeight * prozent;

// // If lens is bigger than bg (edge case), avoid inverted clamp ranges
// const safeBgW = Math.max(bgW, lensW);
// const safeBgH = Math.max(bgH, lensH);

// // Allowed bgLeft range: [-(bgW - lensW), 0]
// const minBgLeft = -(safeBgW - lensW);
// const minBgTop  = -(safeBgH - lensH);

// bgLeft = Math.min(0, Math.max(minBgLeft, bgLeft));
// bgTop  = Math.min(0, Math.max(minBgTop, bgTop));




//     topLarge = yUp - 100 + 80 * quotientHeight; //imgPosTop-100;//-(100*quotientHeight);
//     // console.log('2 imgMarginTop: '+imgMarginTop);
//     leftLarge = xUp - 100 + 80 * quotientWidth;
//     //console.log('topLarge: '+topLarge);
//     //console.log('leftLarge: '+leftLarge);
//     $("#large")
//       .css("top", topLarge) //y-100   .css('top',topLarge)
//       .css("left", leftLarge) //-100
//       .css("background-position", bgLeft + "px " + bgTop + "px ");

//     console.log("top: " + topLarge + " left: " + leftLarge);
//     console.log(
//       "imgPosLeft: " +
//         imgPosLeft +
//         " imgPosTop: " +
//         imgPosTop +
//         " imgWidth: " +
//         imgWidth +
//         " imgHeight: " +
//         imgHeight
//     );

//     if (
//       xUp < imgPosLeft ||
//       yUp < imgPosTop ||
//       xUp > imgPosLeft + imgWidth ||
//       yUp > imgPosTop + imgHeight
//     ) {
//       hideZoom("whereAmIFunction");
//     }
//   }

//   function hideZoom(from) {
//     console.log("hideZoom");
//     $("#large").hide();
//   }

//   //swipe END


//   // ----------------------------
//   // TOUCH SUPPORT (press & hold)
//   // - normal scrolling works
//   // - zoom activates only after holdDelay
//   // - while zooming, preventDefault so finger moves lens smoothly
//   // ----------------------------

//   // Let the browser scroll normally unless we are actively zooming
//   // (Best set in CSS too: .zoom img { touch-action: pan-y; } body.zooming { touch-action: none; })

//   $("body").on("pointerdown", ".zoom img", function (e) {
//     if (e.pointerType === "mouse") return; // desktop already handled by your code

//     hasTouch = true; // mark touch mode
//     activePointerId = e.pointerId;

//     // Set up image geometry (same as mouseenter)
//     let src = this.currentSrc || $(this).attr("src");
//     $name = src.replace(/-\d+x\d+(?=\.(jpg|jpeg|png|webp)$)/i, "");

//     imgPosLeft = $(this).offset().left;
//     imgPosTop = $(this).offset().top;
//     imgWidth = $(this).width();
//     imgHeight = $(this).height();

//     // Start timer: only activate zoom if user holds
//     holdTimer = setTimeout(() => {
//       isZoomingTouch = true;

//       // create background + compute "prozent"
//       createNewDiv($name);

//       // initial pointer position
//       xUp = e.pageX;
//       yUp = e.pageY;

//       // show + place lens
//       whereAmIFunction(false, "", e);

//       // prevent page from interpreting this as scroll/gesture while zooming
//       document.body.classList.add("zooming");
//     }, holdDelay);
//   });

//   $("body").on("pointermove", ".zoom img", function (e) {
//     if (e.pointerType === "mouse") return;
//     if (activePointerId !== e.pointerId) return;

//     // If not zooming yet, let the user scroll normally
//     if (!isZoomingTouch) return;

//     e.preventDefault(); // stop scrolling while zooming

//     xUp = e.pageX;
//     yUp = e.pageY;

//     whereAmIFunction(false, "", e);
//   });

//   $("body").on("pointerup pointercancel", ".zoom img", function (e) {
//     if (e.pointerType === "mouse") return;
//     if (activePointerId !== e.pointerId) return;

//     clearTimeout(holdTimer);
//     holdTimer = null;

//     activePointerId = null;

//     if (isZoomingTouch) {
//       isZoomingTouch = false;
//       document.body.classList.remove("zooming");
//       hideZoom("pointerup");
//     }
//   });

  // !    ______       __________  ______
  // !   / ___/ |     / /  _/ __ \/ ____/
  // !   \__ \| | /| / // // /_/ / __/
  // !  ___/ /| |/ |/ // // ____/ /___
  // ! /____/ |__/|__/___/_/   /_____/

  let xDown = null;
  let yDown = null;
  let theClickTime;
  let theClickTimeEnd;
  let minTime = 150;

  let classname = document.getElementsByClassName("swipeMich");

  for (let i = 0; i < classname.length; i++) {
    classname[i].addEventListener(
      "touchstart",
      function (someVar) {
        handleTouchstartTimo(someVar);
      },
      false
    );
    classname[i].addEventListener(
      "touchend",
      function (someVar) {
        handleTouchEndTimo(someVar);
      },
      false
    );
  }

  function handleTouchstartTimo(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
    let d = new Date();
    theClickTime = d.getTime();
    $("#swipeStart").html(theClickTime);

    console.log("xDown:" + xDown);
    console.log("yDown:" + yDown);
    $("#xTouchstartPos").html(xDown);
    $("#yTouchstartPos").html(yDown);
  }

  function handleTouchEndTimo(evt) {
    let timeDiffEnd;
    let d = new Date();
    theClickTimeEnd = d.getTime();
    $("#swipeEnd").html(theClickTimeEnd);
    console.log("----theClickTimeEnd-------" + theClickTimeEnd);
    timeDiffEnd = theClickTimeEnd - theClickTime;
    $("#swipeTime").html(timeDiffEnd);
    if (!xDown || !yDown) {
      return;
    }
    //   let xUp = evt.touches[0].clientX;
    //  let yUp = evt.touches[0].clientY;
    let xUp = evt.changedTouches[evt.changedTouches.length - 1].clientX;
    let yUp = evt.changedTouches[evt.changedTouches.length - 1].clientY;
    console.log("xUp:" + xUp);
    console.log("yUp:" + yUp);
    $("#xTouchendPos").html(xUp);
    $("#yTouchendPos").html(yUp);
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;
    $("#xDiff").html(Math.abs(xDiff));
    $("#yDiff").html(Math.abs(yDiff));
    console.log("-----------?????----");
    console.log("xDiff:" + Math.abs(xDiff));
    console.log("yDiff:" + Math.abs(yDiff));
    console.log("timeDiff:" + timeDiffEnd);
    console.log("---------???????????/------");

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
        $("#swipeRichtung").html("left swipe");
        if (timeDiffEnd < minTime && Math.abs(xDiff) > 30) {
          console.log("CHANGE +");
          goOnePixMore();
        } else {
          $("#swipeRichtung").html("too slow for swipe");
          return;
        }
      } else {
        /* right swipe */
        console.log("* +++right swipe +++*");
        if (timeDiffEnd < minTime && Math.abs(xDiff) > 30) {
          console.log("CHANGE -");
          $("#swipeRichtung").html("right swipe");
          goOnePixless();
        } else {
          //zoom
          $("#swipeRichtung").html("too slow for swipe");
          return;
        }
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        if (timeDiffEnd < minTime) {
          $("#swipeRichtung").html("too slow for swipe");
          return;
        } else {
          $("#swipeRichtung").html("down swipe");
          /* down swipe */
          return;
        }
      } else {
        if (timeDiffEnd < minTime) {
          $("#swipeRichtung").html("too slow for swipe");
          return;
        } else {
          //zoom
          $("#swipeRichtung").html("up swipe");
          return;
        }
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }

  function goOnePixMore() {
    let mysrc = $(".wp-image-341").attr("src");
    let newSrc;
    let srcset = $(".wp-image-341").attr("srcset");
    let newSrcset;
    if (mysrc.match("yellow")) {
      newSrc = mysrc.replace("yellow", "red");
      newSrcset = srcset.replace(/yellow/g, "red");
    } else {
      newSrc = mysrc.replace("red", "yellow");
      newSrcset = srcset.replace(/red/g, "yellow");
    }
    $(".wp-image-341").attr("src", newSrc);
    $(".wp-image-341").attr("srcset", newSrcset);
  }

  function goOnePixless() {
    let mysrc = $(".wp-image-341").attr("src");
    let newSrc;
    let srcset = $(".wp-image-341").attr("srcset");
    let newSrcset;
    if (mysrc.match("yellow")) {
      newSrc = mysrc.replace("yellow", "red");
      newSrcset = srcset.replace(/yellow/g, "red");
    } else {
      newSrc = mysrc.replace("red", "yellow");
      newSrcset = srcset.replace(/red/g, "yellow");
    }
    $(".wp-image-341").attr("src", newSrc);
    $(".wp-image-341").attr("srcset", newSrcset);
  }

  // test picture change
  $("#test").on("click", function () {
    goOnePixMore();
  });
  //swipe END
}); // JavaScript Document
