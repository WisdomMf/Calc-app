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
    images: {
        domains: ['placehold.co'], // Add other domains as necessary
    },
    // Additional configurations can go here
};
