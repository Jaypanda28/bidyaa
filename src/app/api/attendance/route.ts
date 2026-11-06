import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { batchId, date, records } = body;
    // records: Array<{ studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE', remarks?: string }>

    if (!batchId || !date || !Array.isArray(records)) {
      return NextResponse.json(
        { error: 'Batch ID, date, and student records array are required' },
        { status: 400 }
      );
    }

    for (const rec of records) {
      // Upsert attendance for student for that date and batch
      const existing = await prisma.attendance.findFirst({
        where: {
          studentId: rec.studentId,
          batchId,
          date,
        },
      });

      if (existing) {
        await prisma.attendance.update({
          where: { id: existing.id },
          data: {
            status: rec.status,
            remarks: rec.remarks || null,
            markedById: user?.id || null,
          },
        });
      } else {
        await prisma.attendance.create({
          data: {
            studentId: rec.studentId,
            batchId,
            date,
            status: rec.status,
            remarks: rec.remarks || null,
            markedById: user?.id || null,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Attendance marked successfully for ${records.length} students on ${date}!`,
    });
  } catch (error) {
    console.error('Attendance error:', error);
    return NextResponse.json({ error: 'Failed to save attendance' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');
    const batchId = searchParams.get('batchId');

    const where: any = {};
    if (studentId) where.studentId = studentId;
    if (batchId) where.batchId = batchId;

    const attendance = await prisma.attendance.findMany({
      where,
      include: {
        student: { include: { user: true } },
        batch: true,
      },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json({ attendance });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}

