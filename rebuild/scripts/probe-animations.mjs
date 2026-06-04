import * as cheerio from 'cheerio';

const html = await fetch('https://www.clearwaterdentist.com/').then((r) => r.text());
const $ = cheerio.load(html);
const anims = new Set();
$('[data-anim]').each((_, el) => anims.add($(el).attr('data-anim')));
console.log('data-anim values:', [...anims]);

const fadeEls = [];
$('[class*="fade"]').each((_, el) => {
  const cls = $(el).attr('class') || '';
  if (cls.includes('fade')) fadeEls.push(cls.split(/\s+/).filter((c) => c.includes('fade')).join(' '));
});
console.log('fade classes sample:', [...new Set(fadeEls)].slice(0, 10));

console.log('flexslider count:', $('.flexslider').length);
console.log('dmImageSlider count:', $('.dmImageSlider').length);
