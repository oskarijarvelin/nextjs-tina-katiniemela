const withLess = require("next-with-less");

const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'assets.tina.io'],
    },
};

module.exports = withLess({
    async rewrites() {
        return [
          {
            source: '/admin',
            destination: '/admin/index.html',
          },
        ]
    },
    ...nextConfig
});
