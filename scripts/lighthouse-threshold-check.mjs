import fs from 'fs';

const reportPath = process.argv[2] || 'lighthouse-report.json';
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const categories = report.categories || {};

const thresholds = {
  performance: 0.90,
  accessibility: 0.95,
  seo: 0.95,
  'best-practices': 0.95,
};

let failed = false;
for (const [key, min] of Object.entries(thresholds)) {
  const score = categories[key]?.score;
  if (typeof score !== 'number') {
    console.error(`Missing score for ${key}`);
    failed = true;
    continue;
  }
  console.log(`${key}: ${(score * 100).toFixed(0)} (min ${(min * 100).toFixed(0)})`);
  if (score < min) failed = true;
}

if (failed) {
  process.exit(1);
}
