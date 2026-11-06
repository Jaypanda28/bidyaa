import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');

    const where: any = {};
    if (courseId) where.courseId = courseId;

    const materials = await prisma.studyMaterial.findMany({
      where,
      include: {
        course: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const videos = await prisma.videoLecture.findMany({
      where,
      include: { course: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ materials, videos });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch LMS materials' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { title, description, subject, courseId, fileUrl, fileType, fileSize } = body;

    if (!title || !subject || !courseId) {
      return NextResponse.json(
        { error: 'Title, subject, and course are required.' },
        { status: 400 }
      );
    }

    const material = await prisma.studyMaterial.create({
      data: {
        title,
        description: description || '',
        subject,
        courseId,
        fileUrl: fileUrl || '/materials/sample-notes.pdf',
        fileType: fileType || 'PDF',
        fileSize: fileSize || '2.5 MB',
        uploadedBy: user?.name || 'Faculty Member',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Study material uploaded to student LMS successfully!',
      material,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload study material' }, { status: 500 });
  }
}

