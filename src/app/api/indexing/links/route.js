import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { canAddLinks: true, plan: true }
        });

        if (!user?.canAddLinks) {
            return NextResponse.json({ error: 'Permission denied - upgrade to add links' }, { status: 403 });
        }

        const body = await request.json();
        const { resultId, url } = body;

        if (!resultId || !url) {
            return NextResponse.json({ error: 'Result ID and URL required' }, { status: 400 });
        }

        // Get the current result
        const result = await prisma.indexingResult.findUnique({
            where: { id: resultId }
        });

        if (!result) {
            return NextResponse.json({ error: 'Result not found' }, { status: 404 });
        }

        // Parse existing links
        let links = [];
        try {
            links = JSON.parse(result.links || '[]');
        } catch (e) {
            links = [];
        }

        // Add new link
        links.push({
            url: url,
            addedAt: new Date().toISOString()
        });

        // Update result
        await prisma.indexingResult.update({
            where: { id: resultId },
            data: { links: JSON.stringify(links) }
        });

        return NextResponse.json({ success: true, links });
    } catch (error) {
        console.error('Error adding link:', error);
        return NextResponse.json({ error: 'Failed to add link' }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const resultId = searchParams.get('resultId');

        if (!resultId) {
            return NextResponse.json({ error: 'Result ID required' }, { status: 400 });
        }

        const result = await prisma.indexingResult.findUnique({
            where: { id: resultId },
            select: { links: true }
        });

        if (!result) {
            return NextResponse.json({ error: 'Result not found' }, { status: 404 });
        }

        let links = [];
        try {
            links = JSON.parse(result.links || '[]');
        } catch (e) {
            links = [];
        }

        return NextResponse.json({ links });
    } catch (error) {
        console.error('Error fetching links:', error);
        return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 });
    }
}
