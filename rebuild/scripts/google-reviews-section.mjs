import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data", "google-reviews.json"), "utf8")
);

const AVATAR_COLORS = [
  "review-avatar--blue",
  "review-avatar--red",
  "review-avatar--green",
  "review-avatar--orange",
  "review-avatar--purple",
  "review-avatar--teal",
];

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function initials(name) {
  const parts = name.replace(/"/g, "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function buildReviewCard(review, index) {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const quote = escapeHtml(review.quote);
  return `<article class="review-card">
  <div class="review-card-top">
    <div class="review-avatar ${color}">${escapeHtml(initials(review.name))}</div>
    <div class="review-card-person">
      <h3>${escapeHtml(review.name)}</h3>
      <p class="review-card-meta">${escapeHtml(review.meta)}</p>
    </div>
  </div>
  <span class="review-card-stars" aria-label="5 out of 5 stars">★★★★★</span>
  <p class="review-card-quote">"${quote}"</p>
  <p class="review-card-date">${escapeHtml(review.date)}</p>
</article>`;
}

export function buildGoogleReviewsSectionHtml(config = DATA) {
  const cards = config.reviews.map(buildReviewCard).join("\n");
  const rating = config.rating.toFixed(1);
  const count = config.reviewCount.toLocaleString("en-US");

  return `<div class="u_1619377659 dmRespRow dmSectionNoParallax cw-google-trust-section" id="1619377659">
  <div class="dmRespColsWrapper">
    <div class="dmRespCol small-12 medium-12 large-12">
      <section class="cw-google-trust">
        <div class="cw-google-trust__head">
          <p class="cw-google-trust__kicker">Google Reviews and Map</p>
          <h2>See what patients said before you book.</h2>
          <p>Real Google reviews from Clearwater Dentist — ${rating} stars across ${count} reviews.</p>
        </div>
        <div class="review-layout review-layout--stacked">
          <div class="review-carousel-shell" data-review-carousel>
            <div class="review-showcase-header">
              <div class="review-showcase-brand">
                <span class="google-mark" aria-hidden="true">G</span>
                <div>
                  <strong>Google Reviews</strong>
                  <div class="review-showcase-score">
                    <span class="review-stars" aria-label="${rating} out of 5 stars">★★★★★</span>
                    <span>${rating} · ${count} reviews</span>
                  </div>
                </div>
              </div>
              <div class="review-carousel-controls">
                <button class="review-carousel-btn" type="button" data-review-prev aria-label="Previous review card">&#8249;</button>
                <button class="review-carousel-btn" type="button" data-review-next aria-label="Next review card">&#8250;</button>
              </div>
            </div>
            <div class="review-carousel-track-outer">
              <div class="review-carousel-track" data-review-track>
                ${cards}
              </div>
            </div>
            <div class="review-carousel-dots" data-review-dots></div>
            <div class="review-carousel-footer">
              <a class="review-carousel-link" href="${config.googleUrl}" target="_blank" rel="noopener noreferrer">See all reviews on Google</a>
            </div>
          </div>
          <div class="map-card">
            <iframe src="${config.mapEmbed}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Clearwater Dentist on Google Maps"></iframe>
            <p>1700 N McMullen Booth Rd, Ste A1 — Clearwater, FL 33759. Map, directions, and reviews are visible here so patients can confirm the location before scheduling.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>`;
}

export function replaceGoogleReviewsSection($) {
  const target = $("#1619377659, .u_1619377659").first();
  if (!target.length) return false;
  target.replaceWith(buildGoogleReviewsSectionHtml());
  return true;
}
