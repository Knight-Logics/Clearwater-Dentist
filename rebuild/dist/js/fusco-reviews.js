(function () {
  "use strict";

  function initReviewCarousels() {
    document.querySelectorAll("[data-review-carousel]").forEach(function (carousel) {
      var track = carousel.querySelector("[data-review-track]");
      var dotsContainer = carousel.querySelector("[data-review-dots]");
      var previousButton = carousel.querySelector("[data-review-prev]");
      var nextButton = carousel.querySelector("[data-review-next]");

      if (!track || !dotsContainer) return;

      var cards = Array.from(track.querySelectorAll(".review-card"));
      if (!cards.length) return;

      var currentIndex = 0;
      var cachedCardWidth = 0;

      function visibleCount() {
        if (window.innerWidth <= 760) return 1;
        if (window.innerWidth <= 1080) return 2;
        return 3;
      }

      function getCardWidth() {
        if (!cachedCardWidth) {
          var firstCard = cards[0];
          var styles = window.getComputedStyle(track);
          var gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
          cachedCardWidth = firstCard.getBoundingClientRect().width + gap;
        }
        return cachedCardWidth;
      }

      function buildDots() {
        dotsContainer.innerHTML = "";
        var pages = Math.max(1, Math.ceil(cards.length / visibleCount()));
        for (var index = 0; index < pages; index += 1) {
          var dot = document.createElement("button");
          dot.type = "button";
          dot.className = "review-carousel-dot";
          dot.setAttribute("aria-label", "Go to review set " + (index + 1));
          dot.addEventListener("click", function (i) {
            return function () {
              currentIndex = i * visibleCount();
              updateCarousel();
            };
          }(index));
          dotsContainer.appendChild(dot);
        }
      }

      function updateCarousel() {
        var visible = visibleCount();
        var maxIndex = Math.max(0, cards.length - visible);
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
        track.style.transform = "translateX(-" + currentIndex * getCardWidth() + "px)";

        var activeDotIndex = Math.floor(currentIndex / visible);
        dotsContainer.querySelectorAll(".review-carousel-dot").forEach(function (dot, index) {
          dot.classList.toggle("active", index === activeDotIndex);
        });

        if (previousButton) previousButton.disabled = currentIndex === 0;
        if (nextButton) nextButton.disabled = currentIndex >= maxIndex;
      }

      if (previousButton) {
        previousButton.addEventListener("click", function () {
          currentIndex -= visibleCount();
          updateCarousel();
        });
      }

      if (nextButton) {
        nextButton.addEventListener("click", function () {
          currentIndex += visibleCount();
          updateCarousel();
        });
      }

      buildDots();
      updateCarousel();

      var resizeTimer;
      window.addEventListener("resize", function () {
        cachedCardWidth = 0;
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(function () {
          buildDots();
          updateCarousel();
        }, 120);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initReviewCarousels);
  } else {
    initReviewCarousels();
  }
})();
