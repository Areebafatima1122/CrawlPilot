import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const results = await prisma.indexingResult.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
            take: 50
        });

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
    }
}

export async function POST(req) {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { urls, bots } = await req.json();

        if (!urls || !Array.isArray(urls)) {
            return NextResponse.json({ error: "Invalid URLs" }, { status: 400 });
        }

        // Get user plan and allowed bots
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { plan: true, allowedBots: true }
        });

        let allowedBots = [];
        try {
            allowedBots = JSON.parse(user.allowedBots || '["google"]');
        } catch (e) {
            allowedBots = ["google"];
        }

        // Filter bots based on user's allowed bots
        let filteredBots = bots.filter(bot => allowedBots.includes(bot));

        // For free plan, only allow google bot
        if (user.plan === "free" && filteredBots.length === 0) {
            // Force google bot for free plan
            filteredBots = ["google"];
        }

        // If no bots allowed after filtering, reject
        if (filteredBots.length === 0) {
            return NextResponse.json({ 
                error: "No allowed bots selected. Please upgrade your plan or contact admin." 
            }, { status: 403 });
        }

        // Create indexing records
        const data = urls.map(url => ({
            url,
            bots: JSON.stringify(filteredBots),
            status: "Delivered",
            userId: session.user.id
        }));

        await prisma.indexingResult.createMany({
            data: data
        });

        // Deduct balance (1 credit per URL per bot)
        const cost = urls.length * filteredBots.length;
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                balance: {
                    decrement: cost
                }
            }
        });

        return NextResponse.json({ success: true, count: urls.length, botsUsed: filteredBots });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to process discovery" }, { status: 500 });
    }
}
