// next.config.js
module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/calculator',
                permanent: true,
            },
        ];
    },
}
