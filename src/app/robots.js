export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/panel/', '/authorize'],
            },
        ],
        sitemap: 'https://crawlpilot.io/sitemap.xml',
    };
}
