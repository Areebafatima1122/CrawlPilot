import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { prisma } from "lib/prisma";

export async function POST(req) {
    try {
        const { sitemapUrl } = await req.json();

        if (!sitemapUrl) {
            return NextResponse.json({ error: "Sitemap URL is required" }, { status: 400 });
        }

        const response = await fetch(sitemapUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; CrawlPilot/1.0; +https://crawlpilot.io)'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch sitemap: ${response.statusText}`);
        }

        const xml = await response.text();

        // Simple regex to extract <loc> tags
        const locRegex = /<loc>(.*?)<\/loc>/g;
        const urls = [];
        let match;

        while ((match = locRegex.exec(xml)) !== null) {
            urls.push(match[1]);
        }

        // Limit to 1000 URLs to avoid abuse in this version
        const limitedUrls = urls.slice(0, 1000);

        return NextResponse.json({
            urls: limitedUrls,
            total: urls.length,
            count: limitedUrls.length
        });
    } catch (error) {
        console.error("Sitemap Fetch Error:", error);
        return NextResponse.json({ error: "Could not parse sitemap. Ensure it is a valid XML sitemap." }, { status: 500 });
    }
}
