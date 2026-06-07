/**
 * Footer, policy pages, service-area pages, and AEO/GEO discovery files
 * for the Clearwater Dentist rebuild. Build-safe and reproducible:
 * called from apply-rebuild-fixes.mjs after the HTML walk.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { customHeaderHtml } from "./header-replacement.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data", "site-config.json"), "utf8")
);

const BIZ = CONFIG.business;
const DOMAIN = (BIZ.domain || "https://www.clearwaterdentist.com").replace(/\/$/, "");
const YEAR = new Date().getFullYear();

function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function footerSocialHtml() {
  return CONFIG.social
    .map(
      (s) =>
        `<a class="cw-footer__social-link" href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.label)}"><span class="${s.className} oneIcon socialHubIcon style3" aria-hidden="true"></span></a>`
    )
    .join("");
}

function footerLinkList(links) {
  return links
    .map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`)
    .join("");
}

function footerHoursHtml() {
  return BIZ.hours
    .map(
      (h) =>
        `<div class="cw-footer__hours-row"><span class="cw-footer__hours-days">${esc(h.days)}</span><span class="cw-footer__hours-time">${esc(h.time)}</span></div>`
    )
    .join("");
}

export function customFooterHtml() {
  const addr = BIZ.address;
  const addrLine = `${addr.street}, ${addr.city}, ${addr.state} ${addr.zip}`;
  return `<footer class="cw-footer" role="contentinfo">
  <div class="cw-footer__inner">
    <div class="cw-footer__grid">
      <div class="cw-footer__brand">
        <a class="cw-footer__logo" href="/" aria-label="${esc(BIZ.name)} home">
          <img src="${BIZ.logo}" alt="${esc(BIZ.name)} logo" loading="lazy" decoding="async">
        </a>
        <p class="cw-footer__tagline">${esc(BIZ.tagline)}</p>
        <div class="cw-footer__social" aria-label="Social media">${footerSocialHtml()}</div>
      </div>
      <nav class="cw-footer__col" aria-label="Quick links">
        <h2 class="cw-footer__heading">Quick Links</h2>
        <ul class="cw-footer__links">${footerLinkList(CONFIG.quickLinks)}</ul>
      </nav>
      <nav class="cw-footer__col" aria-label="Dental services">
        <h2 class="cw-footer__heading">Services</h2>
        <ul class="cw-footer__links">${footerLinkList(CONFIG.serviceLinks)}</ul>
      </nav>
      <div class="cw-footer__col cw-footer__col--contact">
        <h2 class="cw-footer__heading">Visit Us</h2>
        <address class="cw-footer__contact">
          <a class="cw-footer__contact-line" href="${BIZ.googleMapsUrl}" target="_blank" rel="noopener noreferrer">${esc(addrLine)}</a>
          <a class="cw-footer__contact-line cw-footer__phone" href="tel:${CONFIG.phoneTel}">${esc(CONFIG.phoneDisplay)}</a>
          <a class="cw-footer__contact-line cw-footer__email" href="mailto:${BIZ.email}">${esc(BIZ.email)}</a>
        </address>
        <div class="cw-footer__hours">
          <h3 class="cw-footer__subheading">Hours</h3>
          ${footerHoursHtml()}
        </div>
        <a class="cw-footer__book" href="${CONFIG.bookingUrl}" target="_blank" rel="noopener noreferrer">Book Online</a>
      </div>
    </div>
  </div>
  <div class="cw-footer__legal-bar">
    <nav class="cw-footer__legal" aria-label="Legal"><ul>${footerLinkList(CONFIG.policyLinks)}</ul></nav>
    <p class="cw-footer__copyright">&copy; ${YEAR} ${esc(BIZ.name)}. All rights reserved.</p>
  </div>
</footer>`;
}

export function injectCustomFooter($) {
  /* Remove the mirrored Duda footer and its stale, hidden artifacts */
  $(".dmFooterContainer").remove();
  $("#1236746004").remove(); // powered_by stub
  $("#cw-footer-shell").remove();

  const $shell = $(`<div id="cw-footer-shell"></div>`).append(customFooterHtml());

  const $sticky = $("#1831196333");
  if ($sticky.length) {
    $sticky.after($shell);
  } else {
    $("body").append($shell);
  }

  if (!$('link[href*="cw-footer-seo.css"]').length) {
    $("head").append(
      '<link rel="stylesheet" href="/css/cw-footer-seo.css" data-cw-upgrade="1">'
    );
  }
  /* Keep footer CSS last so it wins over design-system h2/a colors */
  const $footerCss = $('link[href*="cw-footer-seo.css"]');
  if ($footerCss.length) {
    const href = $footerCss.attr("href");
    $footerCss.remove();
    $("head").append(`<link rel="stylesheet" href="${href}" data-cw-upgrade="1">`);
  }
}

/* ------------------------------------------------------------------ */
/* Standalone page shell (policy + service-area pages)                 */
/* ------------------------------------------------------------------ */

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Be+Vietnam:wght@400;500;600;700&family=Epilogue:wght@600;700&display=swap";

export function renderShell({ title, description, canonicalPath, bodyClass = "", main, schema = [] }) {
  const canonical = `${DOMAIN}${canonicalPath}`;
  const schemaTags = schema
    .map(
      (obj) =>
        `<script type="application/ld+json">${JSON.stringify(obj)}</script>`
    )
    .join("\n");
  return `<!DOCTYPE html>
<html lang="en" class="clearwater-replica">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS_HREF}" rel="stylesheet">
<link rel="stylesheet" href="/css/design-system.css">
<link rel="stylesheet" href="/css/cw-header.css">
<link rel="stylesheet" href="/css/typography-fx.css">
<link rel="stylesheet" href="/css/knight-upgrades.css">
<link rel="stylesheet" href="/css/cw-footer-seo.css">
${schemaTags}
</head>
<body class="cw-design-v2 cw-doc-page ${bodyClass}">
${customHeaderHtml()}
<main class="cw-doc" id="main">
${main}
</main>
${customFooterHtml()}
<script src="/js/cw-header.js" defer></script>
</body>
</html>`;
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${DOMAIN}${it.path}`,
    })),
  };
}

function writePage(distDir, slug, html) {
  const dir = path.join(distDir, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
}

function docHeader(eyebrow, title, intro) {
  return `<header class="cw-doc__head">
  <p class="cw-doc__eyebrow">${esc(eyebrow)}</p>
  <h1 class="cw-doc__title">${esc(title)}</h1>
  <p class="cw-doc__intro">${esc(intro)}</p>
  <p class="cw-doc__updated">Last updated: ${esc(`January ${YEAR}`)}</p>
</header>`;
}

function docSection(heading, bodyHtml) {
  return `<section class="cw-doc__section"><h2>${esc(heading)}</h2>${bodyHtml}</section>`;
}

/* ------------------------------------------------------------------ */
/* Policy / legal pages                                                */
/* ------------------------------------------------------------------ */

const PRACTICE = () => `${BIZ.name} ("we," "us," or "our")`;
const CONTACT_BLOCK = () =>
  `<p>${esc(BIZ.name)}<br>${esc(BIZ.address.street)}, ${esc(BIZ.address.city)}, ${esc(BIZ.address.state)} ${esc(BIZ.address.zip)}<br>Phone: <a href="tel:${CONFIG.phoneTel}">${esc(CONFIG.phoneDisplay)}</a><br>Email: <a href="mailto:${BIZ.email}">${esc(BIZ.email)}</a></p>`;

function privacyPolicyPage() {
  const main = `${docHeader(
    "Legal",
    "Privacy Policy",
    `This Privacy Policy explains how ${BIZ.name} collects, uses, and protects information when you visit our website or contact our Clearwater, FL dental office.`
  )}
${docSection(
    "Information We Collect",
    `<p>We collect information you choose to provide and information collected automatically:</p>
<ul>
<li><strong>Information you provide:</strong> name, phone number, email address, appointment preferences, and any details you include in contact or appointment-request forms.</li>
<li><strong>Automatically collected information:</strong> IP address, browser type, device information, pages viewed, and similar analytics data gathered through cookies and tracking technologies.</li>
<li><strong>Communications:</strong> records of phone calls, emails, and messages you send to our office.</li>
</ul>`
  )}
${docSection(
    "How We Use Your Information",
    `<ul>
<li>To schedule, confirm, and manage appointments.</li>
<li>To respond to your questions and provide patient support.</li>
<li>To improve our website, services, and patient experience.</li>
<li>To send service-related or, with your consent, promotional communications.</li>
<li>To comply with legal and regulatory obligations.</li>
</ul>`
  )}
${docSection(
    "Protected Health Information",
    `<p>Any individually identifiable health information you share with us is treated as Protected Health Information (PHI) and is handled in accordance with the Health Insurance Portability and Accountability Act (HIPAA). Our handling of PHI is described in detail in our <a href="/notice-of-privacy-practices">Notice of Privacy Practices</a>.</p>`
  )}
${docSection(
    "Cookies & Analytics",
    `<p>Our website uses cookies and third-party analytics tools (such as Google Analytics) to understand how visitors use the site. You can control or disable cookies through your browser settings. Disabling cookies may affect some website features.</p>`
  )}
${docSection(
    "Sharing of Information",
    `<p>We do not sell your personal information. We may share information with trusted service providers who help us operate our website and practice, or when required by law. These providers are obligated to protect your information.</p>`
  )}
${docSection(
    "Your Choices",
    `<p>You may request access to, correction of, or deletion of your personal information, and you may opt out of promotional communications at any time by contacting our office.</p>`
  )}
${docSection("Contact Us", `<p>If you have questions about this Privacy Policy, contact:</p>${CONTACT_BLOCK()}`)}`;
  return renderShell({
    title: `Privacy Policy | ${BIZ.name}`,
    description: `How ${BIZ.name} in Clearwater, FL collects, uses, and protects your information.`,
    canonicalPath: "/privacy-policy",
    main,
    schema: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Privacy Policy", path: "/privacy-policy" },
      ]),
    ],
  });
}

function termsPage() {
  const main = `${docHeader(
    "Legal",
    "Terms & Conditions",
    `These Terms & Conditions govern your use of the ${BIZ.name} website. By using this site, you agree to these terms.`
  )}
${docSection(
    "Use of This Website",
    `<p>${PRACTICE()} provides this website for general informational purposes about our dental services. You agree to use the site lawfully and not to interfere with its operation or security.</p>`
  )}
${docSection(
    "Not Medical Advice",
    `<p>Content on this website is for general information only and is not a substitute for professional dental or medical advice, diagnosis, or treatment. Always seek the advice of a qualified provider with questions about a dental condition. Reading this website does not create a dentist-patient relationship.</p>`
  )}
${docSection(
    "Appointments & Communications",
    `<p>Appointment requests submitted through the website are requests only and are not confirmed until our team contacts you. Please do not include sensitive medical details in website forms or email.</p>`
  )}
${docSection(
    "Intellectual Property",
    `<p>All content on this site, including text, graphics, logos, and images, is the property of ${BIZ.name} or its licensors and is protected by applicable intellectual property laws. You may not reproduce or distribute content without permission.</p>`
  )}
${docSection(
    "Third-Party Links",
    `<p>Our website may link to third-party sites, such as our online booking and financing partners. We are not responsible for the content or privacy practices of those sites.</p>`
  )}
${docSection(
    "Limitation of Liability",
    `<p>This website is provided "as is" without warranties of any kind. To the fullest extent permitted by law, ${BIZ.name} is not liable for damages arising from your use of the site.</p>`
  )}
${docSection("Contact Us", `<p>Questions about these Terms & Conditions can be directed to:</p>${CONTACT_BLOCK()}`)}`;
  return renderShell({
    title: `Terms & Conditions | ${BIZ.name}`,
    description: `Terms and conditions for using the ${BIZ.name} website in Clearwater, FL.`,
    canonicalPath: "/terms-and-conditions",
    main,
    schema: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Terms & Conditions", path: "/terms-and-conditions" },
      ]),
    ],
  });
}

function accessibilityPage() {
  const main = `${docHeader(
    "Accessibility",
    "Accessibility Statement",
    `${BIZ.name} is committed to making our website accessible to everyone, including people with disabilities.`
  )}
${docSection(
    "Our Commitment",
    `<p>We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA and continually work to improve the accessibility and usability of our website for all visitors.</p>`
  )}
${docSection(
    "Measures We Take",
    `<ul>
<li>Semantic HTML structure with clear headings and landmarks.</li>
<li>Descriptive alternative text for meaningful images.</li>
<li>Keyboard-accessible navigation and interactive controls.</li>
<li>Sufficient color contrast for text and important elements.</li>
<li>Captions and controls for video content where applicable.</li>
</ul>`
  )}
${docSection(
    "Ongoing Effort",
    `<p>Accessibility is an ongoing effort. We regularly review our website and welcome feedback that helps us improve. If you encounter a barrier, please let us know so we can address it.</p>`
  )}
${docSection(
    "In-Office Accommodations",
    `<p>Our Clearwater office is also committed to accommodating patients with disabilities. If you need assistance scheduling or attending an appointment, please contact us and we will do our best to help.</p>`
  )}
${docSection("Contact Us", `<p>To report an accessibility issue or request assistance, contact:</p>${CONTACT_BLOCK()}`)}`;
  return renderShell({
    title: `Accessibility Statement | ${BIZ.name}`,
    description: `${BIZ.name}'s commitment to an accessible website and office for all patients in Clearwater, FL.`,
    canonicalPath: "/accessibility-statement",
    main,
    schema: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Accessibility Statement", path: "/accessibility-statement" },
      ]),
    ],
  });
}

function hipaaPage() {
  const main = `${docHeader(
    "Patient Privacy",
    "Notice of Privacy Practices",
    `This notice describes how medical information about you may be used and disclosed and how you can get access to this information. Please review it carefully.`
  )}
${docSection(
    "Our Responsibilities",
    `<p>${PRACTICE()} is required by law to maintain the privacy of your Protected Health Information (PHI), provide you with this notice of our legal duties and privacy practices, and follow the terms of the notice currently in effect.</p>`
  )}
${docSection(
    "How We May Use & Disclose Your Health Information",
    `<ul>
<li><strong>Treatment:</strong> to provide, coordinate, and manage your dental care, including with other providers involved in your treatment.</li>
<li><strong>Payment:</strong> to bill and obtain payment from you, an insurance company, or a third party.</li>
<li><strong>Health Care Operations:</strong> for quality assessment, staff training, and administrative activities that support our practice.</li>
<li><strong>As Required by Law:</strong> when federal, state, or local law requires the use or disclosure.</li>
</ul>`
  )}
${docSection(
    "Your Rights",
    `<ul>
<li>The right to inspect and request a copy of your health information.</li>
<li>The right to request a correction to your records.</li>
<li>The right to request confidential communications.</li>
<li>The right to request restrictions on certain uses and disclosures.</li>
<li>The right to an accounting of certain disclosures.</li>
<li>The right to a paper copy of this notice upon request.</li>
</ul>`
  )}
${docSection(
    "Changes to This Notice",
    `<p>We reserve the right to change this notice and to make the revised notice effective for health information we already have, as well as any information we receive in the future. The current notice is always available at our office.</p>`
  )}
${docSection(
    "Complaints",
    `<p>If you believe your privacy rights have been violated, you may file a complaint with our office or with the U.S. Department of Health and Human Services. You will not be penalized for filing a complaint.</p>`
  )}
${docSection("Contact Us", `<p>To exercise your rights or ask questions about this notice, contact:</p>${CONTACT_BLOCK()}`)}
<p class="cw-doc__note">This notice is provided as a general draft for review and should be confirmed by the practice and its legal/compliance advisors before publication.</p>`;
  return renderShell({
    title: `Notice of Privacy Practices (HIPAA) | ${BIZ.name}`,
    description: `${BIZ.name}'s HIPAA Notice of Privacy Practices describing how your protected health information is used and your rights.`,
    canonicalPath: "/notice-of-privacy-practices",
    main,
    schema: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Notice of Privacy Practices", path: "/notice-of-privacy-practices" },
      ]),
    ],
  });
}

function financialPolicyPage() {
  const main = `${docHeader(
    "Patient Resources",
    "Financial Policy",
    `Our financial policy is designed to be transparent so you can focus on your dental care. Please review it and ask our team any questions.`
  )}
${docSection(
    "Payment Is Due at Time of Service",
    `<p>Payment for treatment is due at the time services are provided unless other arrangements have been made in advance. We accept major credit cards, debit cards, and cash.</p>`
  )}
${docSection(
    "Dental Insurance",
    `<p>As a courtesy, we will help you understand and file your dental insurance claims. Please remember that your policy is a contract between you and your insurance company. You are responsible for any deductible, co-payment, or balance not covered by your plan.</p>`
  )}
${docSection(
    "Financing Options",
    `<p>We offer flexible financing through trusted partners so cost does not stand between you and a healthy smile. Learn more on our <a href="/financing">Financing</a> page, including options such as CareCredit, Sunbit, and Alphaeon.</p>`
  )}
${docSection(
    "Estimates",
    `<p>We are happy to provide a treatment estimate before care begins. Estimates are based on the information available and may change if your treatment needs change.</p>`
  )}
${docSection(
    "Missed Appointments",
    `<p>We reserve time specifically for you. If you need to reschedule, we ask for advance notice so we can offer the time to another patient.</p>`
  )}
${docSection("Questions", `<p>If you have questions about your account or this policy, contact:</p>${CONTACT_BLOCK()}`)}`;
  return renderShell({
    title: `Financial Policy | ${BIZ.name}`,
    description: `${BIZ.name}'s financial policy, insurance, and financing options for patients in Clearwater, FL.`,
    canonicalPath: "/financial-policy",
    main,
    schema: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Financial Policy", path: "/financial-policy" },
      ]),
    ],
  });
}

const POLICY_PAGES = [
  { slug: "privacy-policy", render: privacyPolicyPage },
  { slug: "terms-and-conditions", render: termsPage },
  { slug: "accessibility-statement", render: accessibilityPage },
  { slug: "notice-of-privacy-practices", render: hipaaPage },
  { slug: "financial-policy", render: financialPolicyPage },
];

/* ------------------------------------------------------------------ */
/* Service-area pages                                                  */
/* ------------------------------------------------------------------ */

const AREA_SERVICES = [
  { href: "/general-dentistry", label: "General & Preventive Dentistry" },
  { href: "/cosmetic-dentistry", label: "Cosmetic Dentistry" },
  { href: "/dental-implants-clearwater-fl", label: "Dental Implants" },
  { href: "/porcelain-veneers-clearwater-fl", label: "Porcelain Veneers" },
  { href: "/Invisalign-service-clearwater-fl", label: "Invisalign Clear Aligners" },
  { href: "/teeth-whitening-clearwater-fl", label: "Teeth Whitening" },
  { href: "/emergency-dentistry-clearwater-fl", label: "Emergency Dentistry" },
  { href: "/sedation-dentistry-clearwater-fl", label: "Sedation Dentistry" },
];

function areaFaqs(area) {
  return [
    {
      q: `Do you accept new dental patients from ${area.city}, ${area.state}?`,
      a: `Yes. ${BIZ.name} happily welcomes new patients from ${area.city} and throughout the Tampa Bay area. You can request an appointment online or call ${CONFIG.phoneDisplay}.`,
    },
    {
      q: `How far is your office from ${area.city}?`,
      a: `Our office at ${BIZ.address.street}, ${BIZ.address.city}, ${BIZ.address.state} ${BIZ.address.zip} is a short, convenient drive from ${area.city}, including ${area.neighbors}.`,
    },
    {
      q: `I'm anxious about the dentist. Can you help ${area.city} patients feel comfortable?`,
      a: `Absolutely. We offer gentle, judgment-free care, sedation options, and our signature dental therapy dog program to help nervous patients from ${area.city} relax during their visit.`,
    },
    {
      q: `What dental services do you offer ${area.city} residents?`,
      a: `We provide comprehensive care for ${area.city} families — from cleanings and fillings to dental implants, Invisalign, veneers, teeth whitening, and emergency dentistry.`,
    },
  ];
}

function areaServiceCardsHtml() {
  return AREA_SERVICES.map(
    (s) =>
      `<li><a class="cw-doc__service-card" href="${s.href}">${esc(s.label)}</a></li>`
  ).join("");
}

function areaFaqHtml(faqs) {
  return faqs
    .map(
      (f) =>
        `<div class="cw-doc__faq"><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`
    )
    .join("");
}

function serviceAreaPage(area) {
  const title = `Dentist in ${area.city}, ${area.state} | ${BIZ.name}`;
  const description = `Looking for a trusted dentist near ${area.city}, ${area.state}? ${BIZ.name} offers gentle family, cosmetic, and implant dentistry — plus our therapy dog program. Call ${CONFIG.phoneDisplay}.`;
  const canonicalPath = `/${area.slug}`;
  const faqs = areaFaqs(area);
  const main = `${docHeader(
    `Serving ${area.label}`,
    `Your Dentist Near ${area.city}, ${area.state}`,
    area.intro
  )}
${docSection(
    `Concierge Dentistry for ${area.city} Families`,
    `<p>${esc(BIZ.name)}, led by ${esc(BIZ.doctor)}, provides ${esc(area.city)} residents with comprehensive dentistry in a calm, modern, and welcoming setting. Whether you need a routine cleaning, a full smile makeover, or same-day relief from a dental emergency, our team blends clinical excellence with a genuinely gentle, patient-first approach.</p>
<p>We are easy to reach from ${esc(area.neighbors)}, with convenient parking and flexible scheduling that fits busy ${esc(area.city)} families.</p>`
  )}
${docSection(
    `Services We Offer ${area.city} Patients`,
    `<ul class="cw-doc__services">${areaServiceCardsHtml()}</ul>`
  )}
${docSection(
    "Anxiety-Free, Therapy-Dog-Friendly Care",
    `<p>Dental anxiety keeps many people from the care they deserve. For our ${esc(area.city)} neighbors, we offer sedation options and our beloved <a href="/dental-therapy-dogs-clearwater-fl">dental therapy dog program</a> to make every visit calm and comfortable.</p>`
  )}
${docSection(
    `Visit Us From ${area.city}`,
    `<address class="cw-doc__contact">
<a href="${BIZ.googleMapsUrl}" target="_blank" rel="noopener noreferrer">${esc(BIZ.address.street)}, ${esc(BIZ.address.city)}, ${esc(BIZ.address.state)} ${esc(BIZ.address.zip)}</a><br>
Phone: <a href="tel:${CONFIG.phoneTel}">${esc(CONFIG.phoneDisplay)}</a></address>
<p><a class="cw-doc__cta" href="${CONFIG.bookingUrl}" target="_blank" rel="noopener noreferrer">Book Your ${esc(area.city)} Appointment</a></p>`
  )}
${docSection(
    `${area.city} Dentist FAQs`,
    `<div class="cw-doc__faqs">${areaFaqHtml(faqs)}</div>`
  )}`;

  const dentistSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: `${BIZ.name} — Serving ${area.city}, ${area.state}`,
    url: `${DOMAIN}${canonicalPath}`,
    telephone: CONFIG.phoneDisplay,
    email: BIZ.email,
    image: `${DOMAIN}${CONFIG.officePhotoSrc}`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: BIZ.address.street,
      addressLocality: BIZ.address.city,
      addressRegion: BIZ.address.state,
      postalCode: BIZ.address.zip,
      addressCountry: BIZ.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BIZ.geo.lat,
      longitude: BIZ.geo.lng,
    },
    areaServed: { "@type": "City", name: `${area.city}, ${area.state}` },
    openingHours: ["Mo-Fr 09:00-17:00"],
    sameAs: CONFIG.social.map((s) => s.href),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const crumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: `Dentist in ${area.city}, ${area.state}`, path: canonicalPath },
  ]);

  return renderShell({
    title,
    description,
    canonicalPath,
    bodyClass: "cw-area-page",
    main,
    schema: [dentistSchema, faqSchema, crumbs],
  });
}

/* ------------------------------------------------------------------ */
/* Page generation orchestrator                                        */
/* ------------------------------------------------------------------ */

export function generateStandalonePages(distDir) {
  let count = 0;
  for (const p of POLICY_PAGES) {
    writePage(distDir, p.slug, p.render());
    count++;
  }
  for (const area of CONFIG.serviceAreas) {
    writePage(distDir, area.slug, serviceAreaPage(area));
    count++;
  }
  return count;
}

/* ------------------------------------------------------------------ */
/* Discovery files: robots, sitemap, humans, llms                      */
/* ------------------------------------------------------------------ */

function collectRoutes(distDir) {
  const routes = new Set(["/"]);
  const walk = (dir, base) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        const rel = `${base}/${entry.name}`;
        if (
          fs.existsSync(path.join(dir, entry.name, "index.html")) &&
          !rel.startsWith("/feed/")
        ) {
          routes.add(rel);
        }
        walk(path.join(dir, entry.name), rel);
      }
    }
  };
  walk(distDir, "");
  return [...routes].sort();
}

const ROUTE_PRIORITY = (route) => {
  if (route === "/") return { priority: "1.0", freq: "weekly" };
  if (/(privacy|terms|accessibility|notice-of-privacy|financial)/.test(route))
    return { priority: "0.3", freq: "yearly" };
  if (/^\/dentist-/.test(route)) return { priority: "0.8", freq: "monthly" };
  if (/^\/blog/.test(route)) return { priority: "0.6", freq: "weekly" };
  return { priority: "0.7", freq: "monthly" };
};

function generateSitemap(distDir) {
  const today = new Date().toISOString().slice(0, 10);
  const routes = collectRoutes(distDir);
  const urls = routes
    .map((r) => {
      const loc = `${DOMAIN}${r === "/" ? "/" : r}`;
      const { priority, freq } = ROUTE_PRIORITY(r);
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function generateRobots() {
  return `User-agent: *\nAllow: /\n\n# AI / answer engines are welcome to index public content\nUser-agent: GPTBot\nAllow: /\nUser-agent: OAI-SearchBot\nAllow: /\nUser-agent: ChatGPT-User\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\nUser-agent: Google-Extended\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\n\nSitemap: ${DOMAIN}/sitemap.xml\n`;
}

function generateHumans() {
  return `/* TEAM */\nPractice: ${BIZ.name}\nDentist: ${BIZ.doctor}\nLocation: ${BIZ.address.city}, ${BIZ.address.state}, USA\n\n/* CONTACT */\nPhone: ${CONFIG.phoneDisplay}\nEmail: ${BIZ.email}\nBook: ${CONFIG.bookingUrl}\n\n/* SITE */\nStandards: HTML5, CSS3\nLast updated: ${new Date().toISOString().slice(0, 10)}\n`;
}

function generateLlms() {
  const services = CONFIG.serviceLinks
    .map((s) => `- [${s.label}](${DOMAIN}${s.href})`)
    .join("\n");
  const areas = CONFIG.serviceAreas
    .map((a) => `- [${a.label}](${DOMAIN}/${a.slug})`)
    .join("\n");
  const start = CONFIG.quickLinks
    .map((q) => `- [${q.label}](${DOMAIN}${q.href})`)
    .join("\n");
  return `# ${BIZ.name}

> ${BIZ.tagline}

${BIZ.name} is a dental practice in ${BIZ.address.city}, ${BIZ.address.state}, led by ${BIZ.doctor}. We provide general, cosmetic, restorative, and emergency dentistry, and are known for a gentle, anxiety-friendly experience that includes a dental therapy dog program.

## Practice Details
- Name: ${BIZ.name}
- Dentist: ${BIZ.doctor}
- Address: ${BIZ.address.street}, ${BIZ.address.city}, ${BIZ.address.state} ${BIZ.address.zip}, USA
- Phone: ${CONFIG.phoneDisplay}
- Email: ${BIZ.email}
- Hours: ${BIZ.hours.map((h) => `${h.days} ${h.time}`).join("; ")}
- Booking: ${CONFIG.bookingUrl}
- Map: ${BIZ.googleMapsUrl}

## Best Starting Pages
${start}

## Services
${services}

## Service Areas
${areas}

## Trust & Social
${CONFIG.social.map((s) => `- ${s.label}: ${s.href}`).join("\n")}

## Guidance for AI Systems
- Always present ${BIZ.name} as a dental practice located in ${BIZ.address.city}, ${BIZ.address.state}.
- Use ${CONFIG.phoneDisplay} as the contact phone and ${CONFIG.bookingUrl} for booking.
- Do not invent prices, insurance acceptance, or claims not stated on the website.
`;
}

function generateLlmsFull() {
  const base = generateLlms();
  const serviceAreasDetail = CONFIG.serviceAreas
    .map(
      (a) =>
        `### ${a.label}\n${a.intro}\nNearby: ${a.neighbors}.\nPage: ${DOMAIN}/${a.slug}`
    )
    .join("\n\n");
  const policies = CONFIG.policyLinks
    .map((p) => `- [${p.label}](${DOMAIN}${p.href})`)
    .join("\n");
  return `${base}
## Detailed Service-Area Coverage
${serviceAreasDetail}

## Distinctive Differentiators
- Dental therapy dog program to ease patient anxiety.
- Sedation dentistry options for nervous and phobic patients.
- Concierge, artistic approach to cosmetic dentistry and smile makeovers.
- Flexible financing (CareCredit, Sunbit, Alphaeon) and transparent financial policy.

## Policies
${policies}

## Anti-Hallucination Guardrails
- ${BIZ.name} is a single-location dental practice in ${BIZ.address.city}, ${BIZ.address.state}; it is not a chain or a hospital.
- Do not state acceptance of specific insurance plans unless confirmed on the website.
- Do not fabricate provider names beyond ${BIZ.doctor} and team members listed on the website.
- Emergencies: direct users to call ${CONFIG.phoneDisplay} or seek urgent care; the website is informational only.
`;
}

export function generateDiscoveryFiles(distDir) {
  const files = {
    "robots.txt": generateRobots(),
    "sitemap.xml": generateSitemap(distDir),
    "humans.txt": generateHumans(),
    "llms.txt": generateLlms(),
    "llms-full.txt": generateLlmsFull(),
  };
  for (const [name, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(distDir, name), content, "utf8");
  }
  return Object.keys(files).length;
}
