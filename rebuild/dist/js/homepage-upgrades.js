(function () {
  "use strict";

  function syncMapRowHeights() {
    var row = document.querySelector("[data-cw-map-row]");
    if (!row) return;

    var mapCard = row.querySelector(".map-card");
    var photo = row.querySelector("[data-cw-map-photo]");
    if (!mapCard || !photo) return;

    function apply() {
      var height = Math.round(mapCard.getBoundingClientRect().height);
      if (height > 0) {
        photo.style.minHeight = height + "px";
      }
    }

    apply();

    if (typeof ResizeObserver !== "undefined") {
      var observer = new ResizeObserver(apply);
      observer.observe(mapCard);
      observer.observe(photo);
    }

    window.addEventListener("resize", apply);
    row.querySelector(".map-card iframe")?.addEventListener("load", apply);
  }

  function initHomepageVideoMute() {
    document.querySelectorAll(".cw-home-video-block").forEach(function (block) {
      var video = block.querySelector("video.videobgframe");
      var btn = block.querySelector(".cw-video-mute-toggle");
      if (!video || !btn || btn.dataset.cwMuteInit) return;

      btn.dataset.cwMuteInit = "1";
      video.muted = true;
      video.defaultMuted = true;
      btn.setAttribute("aria-pressed", "true");
      btn.setAttribute("aria-label", "Unmute video");

      btn.addEventListener("click", function () {
        video.muted = !video.muted;
        var isMuted = video.muted;
        btn.setAttribute("aria-pressed", isMuted ? "true" : "false");
        btn.setAttribute("aria-label", isMuted ? "Unmute video" : "Mute video");
        block.classList.toggle("cw-home-video-block--unmuted", !isMuted);
        if (!isMuted) {
          video.play().catch(function () {});
        }
      });
    });
  }

  function initVideoModal() {
    var modal = document.getElementById("cw-video-modal");
    if (!modal || modal.dataset.cwModalInit) return null;
    modal.dataset.cwModalInit = "1";

    var video = modal.querySelector(".cw-video-modal__video");
    var titleEl = modal.querySelector(".cw-video-modal__title");
    var lastFocus = null;

    function close() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
      document.body.classList.remove("cw-modal-open");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
      if (modal._onClose) modal._onClose();
    }

    function open(src, title, opener) {
      if (!video || !src) return;
      lastFocus = opener || document.activeElement;
      if (titleEl) titleEl.textContent = title || "";
      video.src = src;
      video.muted = false;
      video.currentTime = 0;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("cw-modal-open");
      video.play().catch(function () {});
      var closeBtn = modal.querySelector(".cw-video-modal__close");
      if (closeBtn) closeBtn.focus();
      if (modal._onOpen) modal._onOpen();
    }

    modal.querySelectorAll("[data-cw-modal-close]").forEach(function (el) {
      el.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) close();
    });

    return { open: open, close: close, el: modal };
  }

  function initHomepageVideoModalTriggers() {
    var modal = initVideoModal();
    if (!modal) return modal;

    document.querySelectorAll("[data-cw-modal-trigger]").forEach(function (trigger) {
      if (trigger.dataset.cwModalBound) return;
      trigger.dataset.cwModalBound = "1";
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        modal.open(
          trigger.getAttribute("data-cw-video-src"),
          trigger.getAttribute("data-cw-video-title"),
          trigger
        );
      });
    });

    return modal;
  }

  function initHomepageVideoCarousel() {
    var widget = document.getElementById("1559410236");
    if (!widget || widget.dataset.cwCarouselInit) return;

    var film = widget.querySelector('[data-auto="slider-filmRole"]');
    var slides = widget.querySelectorAll('[data-auto^="slideSlot"]');
    var bullets = widget.querySelectorAll('[data-grab="pagination-button-bullet"]');
    var row = widget.closest(".cw-home-video-carousel") || widget.parentNode;
    var tabs = row ? row.querySelectorAll(".cw-carousel-tab") : [];
    var prevBtn = widget.querySelector(".cw-carousel-arrow--prev");
    var nextBtn = widget.querySelector(".cw-carousel-arrow--next");
    if (!film || !slides.length) return;

    widget.dataset.cwCarouselInit = "1";

    var modal = initVideoModal();

    var slideCount = slides.length;
    var logicalCount = bullets.length || tabs.length || 7;
    var mq = window.matchMedia("(max-width: 767px)");
    var slotsInFrame = mq.matches ? 1 : 3;
    var maxLeftmost = Math.max(0, slideCount - slotsInFrame);
    var index = 0;
    var timer = null;
    var intervalMs = 7000;
    var paused = false; // hover/focus pause
    var audioLocked = false; // a card has sound on — hold position

    function slideContent(slide) {
      return slide.querySelector('[data-grab="slideContentContainer"]');
    }

    function setActiveSlide(leftmost) {
      slides.forEach(function (slide, idx) {
        var inFrame = idx >= leftmost && idx < leftmost + slotsInFrame;
        slide.classList.toggle(
          "d-ext-mediaSlider-slidesContainer__slide--active",
          idx === leftmost
        );
        slide.setAttribute(
          "data-auto",
          idx === leftmost ? "slideSlot " + idx + " slideSlotActive" : "slideSlot " + idx
        );

        var content = slideContent(slide);
        if (content) {
          content.classList.toggle("fcgCjo", inFrame);
          content.classList.toggle("hITJxk", !inFrame);
          content.classList.toggle("animated", inFrame);
          content.classList.toggle("fadeInUp", inFrame);
        }

        var video = slide.querySelector("video");
        if (video) {
          if (inFrame) {
            video.play().catch(function () {});
          } else {
            video.pause();
            // Re-mute off-screen videos so audio never lingers out of view
            video.muted = true;
            var card = slide.querySelector(".cw-slide-mute");
            if (card) {
              card.setAttribute("aria-pressed", "true");
              card.setAttribute("aria-label", "Unmute video");
            }
          }
        }
      });

      var activeTab = leftmost % logicalCount;
      bullets.forEach(function (btn, idx) {
        var on = idx === activeTab;
        btn.classList.toggle("kApPWo", on);
        btn.classList.toggle("fCzLJV", !on);
        btn.setAttribute("data-auto", "pagination-button-bullet " + idx + (on ? " active" : ""));
      });
      Array.prototype.forEach.call(tabs, function (tab, idx) {
        var on = idx === activeTab;
        tab.classList.toggle("is-active", on);
        tab.setAttribute("aria-selected", on ? "true" : "false");
      });
    }

    function moveTo(nextIndex, animate) {
      nextIndex = Math.max(0, Math.min(nextIndex, maxLeftmost));
      film.style.transition = animate === false ? "none" : "transform 1s ease-in-out";
      var pct = (nextIndex * 100) / slideCount;
      film.style.transform = "translateX(-" + pct + "%)";
      index = nextIndex;
      setActiveSlide(index);
      if (animate === false) {
        requestAnimationFrame(function () {
          film.style.transition = "transform 1s ease-in-out";
        });
      }
    }

    function next() {
      if (index >= maxLeftmost) {
        moveTo(0, false);
      } else {
        moveTo(index + 1, true);
      }
    }

    function prev() {
      if (index <= 0) {
        moveTo(maxLeftmost, true);
      } else {
        moveTo(index - 1, true);
      }
    }

    function advance() {
      if (paused || audioLocked) return;
      next();
    }

    function startAutoplay() {
      stopAutoplay();
      timer = window.setInterval(advance, intervalMs);
    }

    function stopAutoplay() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    /* Arrows */
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        prev();
        startAutoplay();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        next();
        startAutoplay();
      });
    }

    /* Labeled tabs */
    Array.prototype.forEach.call(tabs, function (tab) {
      tab.addEventListener("click", function () {
        var target = parseInt(tab.getAttribute("data-cw-tab"), 10) || 0;
        moveTo(target, true);
        startAutoplay();
      });
    });

    /* Legacy dots still navigate (kept hidden) */
    bullets.forEach(function (btn, idx) {
      btn.addEventListener("click", function () {
        moveTo(idx, true);
        startAutoplay();
      });
    });

    /* Per-card audio: unmuting one mutes the rest and holds the carousel */
    function muteAll() {
      slides.forEach(function (slide) {
        var v = slide.querySelector("video");
        var b = slide.querySelector(".cw-slide-mute");
        if (v) v.muted = true;
        if (b) {
          b.setAttribute("aria-pressed", "true");
          b.setAttribute("aria-label", "Unmute video");
        }
      });
      audioLocked = false;
    }

    slides.forEach(function (slide) {
      var btn = slide.querySelector(".cw-slide-mute");
      var video = slide.querySelector("video");
      if (!btn || !video) return;
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var willUnmute = video.muted;
        muteAll();
        if (willUnmute) {
          video.muted = false;
          audioLocked = true;
          btn.setAttribute("aria-pressed", "false");
          btn.setAttribute("aria-label", "Mute video");
          video.play().catch(function () {});
        }
      });
    });

    /* Fullscreen modal triggers are bound globally in initHomepageVideoModalTriggers */
    if (modal) {
      modal.el._onOpen = function () {
        paused = true;
        stopAutoplay();
        muteAll();
      };
      modal.el._onClose = function () {
        paused = false;
        startAutoplay();
      };
    }

    /* Pause scrolling on hover / keyboard focus */
    function pauseHover() {
      paused = true;
    }
    function resumeHover() {
      paused = false;
    }
    widget.addEventListener("mouseenter", pauseHover);
    widget.addEventListener("mouseleave", resumeHover);
    widget.addEventListener("focusin", pauseHover);
    widget.addEventListener("focusout", resumeHover);

    /* Recompute frame size on breakpoint change */
    function onBreakpoint() {
      slotsInFrame = mq.matches ? 1 : 3;
      maxLeftmost = Math.max(0, slideCount - slotsInFrame);
      moveTo(Math.min(index, maxLeftmost), false);
    }
    if (mq.addEventListener) mq.addEventListener("change", onBreakpoint);
    else if (mq.addListener) mq.addListener(onBreakpoint);

    moveTo(0, false);
    startAutoplay();
  }

  document.addEventListener("DOMContentLoaded", function () {
    syncMapRowHeights();
    initHomepageVideoMute();
    initHomepageVideoModalTriggers();
    initHomepageVideoCarousel();

    document.querySelectorAll("[data-cw-hero-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var fd = new FormData(form);
        var phone = fd.get("phone") || "you";
        form.innerHTML =
          '<p class="cw-hero-panel__fine" style="padding:0.75rem 0;font-weight:700;color:#0f3f55">Thanks! We\'ll contact ' +
          phone +
          " shortly.</p>";
      });
    });
  });
})();
