import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Get total counts using aggregate queries
        const totalUrlsResult = await prisma.indexingResult.count({
            where: { userId: session.user.id }
        });

        const deliveredCount = await prisma.indexingResult.count({
            where: { 
                userId: session.user.id,
                status: "Delivered"
            }
        });

        // Get all results to calculate total bot signals
        const allResults = await prisma.indexingResult.findMany({
            where: { userId: session.user.id },
            select: { bots: true }
        });

        // Calculate total bot signals by summing up all bots
        let totalBotSignals = 0;
        allResults.forEach(result => {
            try {
                const botsArray = JSON.parse(result.bots);
                totalBotSignals += botsArray.length;
            } catch (e) {
                // Skip if bots field is not valid JSON
            }
        });

        // Get user balance
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { balance: true }
        });

        // Get recent activity (last 14 days)
        const fourteenDaysAgo = new Date();
        fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

        const dailyStats = await prisma.indexingResult.groupBy({
            by: ['createdAt'],
            where: { 
                userId: session.user.id,
                createdAt: {
                    gte: fourteenDaysAgo
                }
            },
            _count: {
                id: true
            }
        });

        return NextResponse.json({
            balance: user?.balance || 0,
            totalUrls: totalUrlsResult,
            delivered: deliveredCount,
            pending: totalUrlsResult - deliveredCount,
            totalBotSignals: totalBotSignals,
            dailyStats: dailyStats
        });
    } catch (error) {
        console.error("Stats API error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
