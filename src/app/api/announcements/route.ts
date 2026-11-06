import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { publishedAt: 'desc' },
    });
    return NextResponse.json({ announcements });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, targetAudience, priority, branchName } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Notice title and content are required' },
        { status: 400 }
      );
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        targetAudience: targetAudience || 'ALL',
        priority: priority || 'HIGH',
        branchName: branchName || 'All Branches',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Notice announced successfully to students, parents, and faculty!',
      announcement,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to publish announcement' }, { status: 500 });
  }
}

