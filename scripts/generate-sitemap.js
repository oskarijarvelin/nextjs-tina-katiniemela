const fs = require('fs');
const path = require('path');

const baseUrl = 'https://kaniffi.fi';
const contentDir = path.join(__dirname, '../pages/content');

// Sivut luetaan suoraan Tinan sisältökansiosta, joten uudet sivut päätyvät sivukarttaan automaattisesti.
function getPages() {
  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const isHome = slug === 'home';
      return {
        url: isHome ? '/' : `/${slug}`,
        priority: isHome ? '1.0' : '0.8',
        changefreq: slug === 'keikat' ? 'weekly' : 'monthly',
      };
    })
    .sort((a, b) => (a.url === '/' ? -1 : b.url === '/' ? 1 : a.url.localeCompare(b.url)));
}

function generateSitemap() {
  const lastmod = new Date().toISOString();
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${getPages().map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${lastmod}</lastmod>
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
