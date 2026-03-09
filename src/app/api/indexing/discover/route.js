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

        // Create indexing records
        const data = urls.map(url => ({
            url,
            bots: JSON.stringify(bots),
            status: "Delivered",
            userId: session.user.id
        }));

        await prisma.indexingResult.createMany({
            data: data
        });

        // Deduct balance (mock logic: 1 credit per URL per bot)
        const cost = urls.length * bots.length;
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                balance: {
                    decrement: cost
                }
            }
        });

        return NextResponse.json({ success: true, count: urls.length });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to process discovery" }, { status: 500 });
    }
}
