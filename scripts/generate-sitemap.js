const fs = require('fs');
const path = require('path');

const baseUrl = 'https://katiniemela.fi';

// Define your pages
const pages = [
  { url: '/', priority: '1.0', changefreq: 'monthly' },
  { url: '/keikat', priority: '0.8', changefreq: 'weekly' },
  { url: '/cv', priority: '0.8', changefreq: 'monthly' },
  { url: '/muusikko', priority: '0.8', changefreq: 'monthly' },
  { url: '/laulunopettaja', priority: '0.8', changefreq: 'monthly' },
];

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(
    path.join(__dirname, '../public/sitemap.xml'),
    sitemap,
    'utf8'
  );
  console.log('Sitemap generated successfully!');
}

generateSitemap();

module.exports = { generateSitemap };
