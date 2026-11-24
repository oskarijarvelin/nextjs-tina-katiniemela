const nextConfig = {
    images: {
        domains: ['assets.tina.io', 'kaniffi.fi'],
    },
    // Pääosoite on kaniffi.fi: vanha osoite ohjataan pysyvästi (308) samaan polkuun uudessa osoitteessa
    async redirects() {
        return ['katiniemela.fi', 'www.katiniemela.fi'].map((host) => ({
            source: '/:path*',
            has: [{ type: 'host', value: host }],
            destination: 'https://kaniffi.fi/:path*',
            permanent: true,
        }));
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
    async rewrites() {
        return [
            {
                source: '/admin',
                destination: '/admin/index.html',
            },
        ];
    },
};

module.exports = nextConfig;
