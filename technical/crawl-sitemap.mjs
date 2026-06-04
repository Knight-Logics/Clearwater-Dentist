#!/usr/bin/env node
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'crawl-screaming-frog');

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'KnightLogics-Audit/1.0' } }, (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => resolve({ status: res.statusCode, url, body }));
      })
      .on('error', reject);
  });
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const sm = await get('https://www.clearwaterdentist.com/sitemap.xml');
const urls = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const results = [];

for (const url of urls) {
  try {
    const r = await get(url);
    const titleMatch = r.body.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? stripHtml(titleMatch[1]) : '';
    const h1s = [...r.body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
      stripHtml(m[1])
    );
    const metaMatch =
      r.body.match(/name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
      r.body.match(/content=["']([^"']*)["'][^>]*name=["']description["']/i);
    const meta = metaMatch ? metaMatch[1].trim() : '';
    const phones = [
      ...new Set([...r.body.matchAll(/\(?727\)?[\s\-.]?\d{3}[\s\-.]?\d{4}/g)].map((m) => m[0]))
    ];
    const wordCount = stripHtml(r.body).split(' ').filter(Boolean).length;
    const booking = [];
    if (/dentrix|ascend/i.test(r.body)) booking.push('dentrix');
    if (/getweave|weave\.com/i.test(r.body)) booking.push('weave');

    results.push({
      url,
      status: r.statusCode,
      title,
      h1Count: h1s.length,
      h1: h1s[0] || '',
      meta,
      metaLen: meta.length,
      wordCount,
      phones: phones.join('|'),
      booking: booking.join('|')
    });
    await sleep(120);
  } catch (e) {
    results.push({ url, status: 'ERR', title: e.message });
  }
}

const dupTitles = {};
const dupH1 = {};
for (const r of results) {
  if (r.title) dupTitles[r.title] = (dupTitles[r.title] || 0) + 1;
  if (r.h1) dupH1[r.h1] = (dupH1[r.h1] || 0) + 1;
}

const summary = {
  crawledAt: new Date().toISOString(),
  total: results.length,
  statusCounts: results.reduce((a, r) => {
    a[r.status] = (a[r.status] || 0) + 1;
    return a;
  }, {}),
  missingH1: results.filter((r) => r.status === 200 && !r.h1).map((r) => r.url),
  duplicateTitles: Object.entries(dupTitles)
    .filter(([, c]) => c > 1)
    .map(([title, count]) => ({ title, count })),
  duplicateH1s: Object.entries(dupH1)
    .filter(([, c]) => c > 1)
    .map(([h1, count]) => ({ h1, count })),
  shortMeta: results.filter((r) => r.metaLen > 0 && r.metaLen < 50),
  longMeta: results.filter((r) => r.metaLen > 160),
  phoneVariants: [...new Set(results.flatMap((r) => (r.phones || '').split('|').filter(Boolean)))],
  thinPages: results.filter((r) => r.status === 200 && r.wordCount < 300).map((r) => ({
    url: r.url,
    words: r.wordCount,
    title: r.title
  })),
  bookingPages: results.filter((r) => r.booking).map((r) => ({ url: r.url, booking: r.booking }))
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'crawl-results.json'), JSON.stringify(results, null, 2));
fs.writeFileSync(path.join(outDir, 'crawl-summary.json'), JSON.stringify(summary, null, 2));

const csvHeader = 'URL,Status,Title,H1 Count,H1,Meta Length,Word Count,Phones,Booking\n';
const csvRows = results
  .map((r) =>
    [
      r.url,
      r.status,
      `"${(r.title || '').replace(/"/g, '""')}"`,
      r.h1Count ?? '',
      `"${(r.h1 || '').replace(/"/g, '""')}"`,
      r.metaLen ?? '',
      r.wordCount ?? '',
      `"${(r.phones || '').replace(/"/g, '""')}"`,
      `"${(r.booking || '').replace(/"/g, '""')}"`
    ].join(',')
  )
  .join('\n');
fs.writeFileSync(path.join(outDir, 'internal_all.csv'), csvHeader + csvRows);

console.log(JSON.stringify(summary, null, 2));
