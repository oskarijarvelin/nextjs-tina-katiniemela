module.exports = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    async rewrites() {
        return [
          {
            source: '/admin',
            destination: '/admin/index.html',
          },
        ]
    },
}