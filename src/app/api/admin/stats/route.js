import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const userCount = await prisma.user.count();
        const blogCount = await prisma.blog.count();
        const discoveryCount = await prisma.indexingResult.count();
        // For revenue, we could sum up something if we had a payment model, 
        // but for now let's just use some logic or return 0
        const totalRevenue = 0;

        return NextResponse.json({
            userCount,
            blogCount,
            discoveryCount,
            totalRevenue
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
