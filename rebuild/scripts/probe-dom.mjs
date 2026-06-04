import * as cheerio from 'cheerio';

const html = await fetch('https://www.clearwaterdentist.com/').then((r) => r.text());
const $ = cheerio.load(html);

const selectors = [
  '#dmHeaderContainer',
  '#dmHeader',
  '.dmHeader',
  '#dmFooter',
  '.dmFooter',
  '#dm_content',
  '.dmBody',
  '#dmFirstContainer',
  '#dm-outer-wrapper',
];

for (const sel of selectors) {
  const el = $(sel);
  console.log(sel, 'count:', el.length, 'html len:', el.length ? $.html(el.first()).length : 0);
}

// stylesheet links
const css = [];
$('link[rel="stylesheet"]').each((_, el) => {
  css.push($(el).attr('href'));
});
console.log('\nCSS count:', css.length);
console.log('Sample CSS:', css.slice(0, 5));

// fonts in style tags
const fontFamilies = new Set();
$('style').each((_, el) => {
  const t = $(el).html() || '';
  for (const m of t.matchAll(/font-family:\s*([^;}{]+)/gi)) fontFamilies.add(m[1].trim());
});
console.log('\nFont families in inline styles:', [...fontFamilies].slice(0, 15));
