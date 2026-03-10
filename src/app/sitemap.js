import { prisma } from "@/lib/prisma";

export default async function sitemap() {
    const baseUrl = 'https://crawlpilot.io';
    const lastModified = new Date();

    const publicPages = [
        '', '/pricing', '/api-docs', '/faq', '/blog', '/referral', '/support',
        '/understanding-bots/google', '/understanding-bots/bing', '/understanding-bots/openai',
        '/privacy-policy', '/terms-of-service',
    ].map((page) => ({
        url: `${baseUrl}${page}`,
        lastModified,
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
    }));

    // Fetch blog posts
    let blogs = [];
    try {
        const posts = await prisma.blog.findMany({
            select: { slug: true, updatedAt: true }
        });
        blogs = posts.map(post => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: post.updatedAt,
            changeFrequency: 'monthly',
            priority: 0.6,
        }));
    } catch (error) {
        console.error("Error fetching blogs for sitemap:", error);
    }

    return [...publicPages, ...blogs];
}
