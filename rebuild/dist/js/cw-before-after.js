(function () {
  "use strict";

  function pointer(ev) {
    return ev.type.includes("touch")
      ? (ev.touches || ev.changedTouches)[0]
      : ev;
  }

  function waitImg(img) {
    return new Promise(function (resolve) {
      if (!img) return resolve();
      if (img.complete && img.naturalWidth) return resolve();
      img.addEventListener("load", resolve, { once: true });
      img.addEventListener("error", resolve, { once: true });
    });
  }

  function initContainer(container) {
    if (container.dataset.cwBafInit) return;
    container.dataset.cwBafInit = "1";

    var beforeImg = container.querySelector(".baf__img-preview.baf__before");
    var afterWrap = container.querySelector(".baf__img-preview.baf__after");
    var afterImg = afterWrap && afterWrap.querySelector("img");
    var handle = container.querySelector(".baf__handle");
    if (!beforeImg || !afterWrap || !afterImg || !handle) return;

    var dragging = false;
    var movedTo = 0;
    var containerWidth = 0;
    var containerHeight = 0;
    var offsetLeft = 22;

    function clipAt(x) {
      x = Math.max(0, Math.min(containerWidth, x));
      afterWrap.style.transform = "translate(" + x + "px, 0)";
      afterImg.style.transform = "translate(-" + x + "px, 0)";
      movedTo = x;
    }

    function syncSize() {
      var rect = container.getBoundingClientRect();
      containerWidth = rect.width;
      containerHeight = rect.height;
      if (!containerWidth || !containerHeight) return;

      afterWrap.style.width = containerWidth + "px";
      afterWrap.style.height = containerHeight + "px";
      afterImg.style.width = containerWidth + "px";
      afterImg.style.height = containerHeight + "px";
      clipAt(movedTo || containerWidth / 2);
    }

    Promise.all([waitImg(beforeImg), waitImg(afterImg)]).then(function () {
      var handleRect = handle.getBoundingClientRect();
      offsetLeft = handleRect.width / 2;
      movedTo = 0;
      syncSize();
    });

    function onMove(ev) {
      if (!dragging) return;
      ev.preventDefault();
      var rect = container.getBoundingClientRect();
      var x = pointer(ev).clientX - rect.left;
      clipAt(x);
      handle.style.left = "";
      handle.style.transform = "translate(" + (movedTo - offsetLeft) + "px, -50%)";
    }

    function onEnd() {
      if (!dragging) return;
      dragging = false;
      container.classList.remove("baf__dragging");
      handle.style.transform = "";
      handle.style.left = movedTo + "px";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    }

    function onStart(ev) {
      dragging = true;
      container.classList.add("baf__dragging");
      syncSize();
      onMove(ev);
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onEnd);
      document.addEventListener("touchmove", onMove, { passive: false });
      document.addEventListener("touchend", onEnd);
    }

    handle.addEventListener("mousedown", onStart);
    handle.addEventListener("touchstart", onStart, { passive: true });

    if (typeof ResizeObserver !== "undefined") {
      var ro = new ResizeObserver(function () {
        syncSize();
      });
      ro.observe(container);
    } else {
      window.addEventListener("resize", syncSize);
      window.addEventListener("orientationchange", syncSize);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document
      .querySelectorAll(".dmBeforeAndAfter.baf__container")
      .forEach(initContainer);
  });
})();
