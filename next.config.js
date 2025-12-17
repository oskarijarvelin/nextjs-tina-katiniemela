const withLess = require("next-with-less");

const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'assets.tina.io', 'katiniemela.vercel.app', 'katiniemela.fi', 'kaniffi.fi'],
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()'
                    }
                ]
            }
        ];
    },
    i18n: {
        locales: ['fi'],
        defaultLocale: 'fi',
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
