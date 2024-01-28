const withLess = require("next-with-less");

const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'assets.tina.io', 'katiniemela.vercel.app', 'katiniemela.fi', 'kaniffi.fi'],
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
