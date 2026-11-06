import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');

    const where: any = {};
    if (studentId) where.studentId = studentId;

    const doubts = await prisma.doubt.findMany({
      where,
      include: {
        student: { include: { user: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ doubts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch doubts' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentId, subject, question } = body;

    if (!studentId || !question) {
      return NextResponse.json(
        { error: 'Student ID and question text are required.' },
        { status: 400 }
      );
    }

    const doubt = await prisma.doubt.create({
      data: {
        studentId,
        subject: subject || 'General',
        question,
        status: 'OPEN',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Your doubt has been submitted to your subject mentor!',
      doubt,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit doubt' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { doubtId, answer } = body;

    if (!doubtId || !answer) {
      return NextResponse.json(
        { error: 'Doubt ID and answer are required.' },
        { status: 400 }
      );
    }

    const updated = await prisma.doubt.update({
      where: { id: doubtId },
      data: {
        answer,
        status: 'ANSWERED',
        answeredBy: user?.name || 'Faculty Mentor',
        answeredAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Doubt answered successfully!',
      doubt: updated,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to answer doubt' }, { status: 500 });
  }
}

