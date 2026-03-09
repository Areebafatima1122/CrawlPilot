export default function sitemap() {
    const baseUrl = 'https://crawlpilot.io';
    const lastModified = new Date();

    const publicPages = [
        '', '/pricing', '/api-docs', '/faq', '/blog', '/referral', '/support',
        '/understanding-bots/google', '/understanding-bots/bing', '/understanding-bots/openai',
        '/authorize', '/privacy-policy', '/terms-of-service',
    ];

    return publicPages.map((page) => ({
        url: `${baseUrl}${page}`,
        lastModified,
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
    }));
}
