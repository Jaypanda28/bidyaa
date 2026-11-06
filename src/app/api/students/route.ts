import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const branchId = searchParams.get('branchId');
    const classLevel = searchParams.get('classLevel');

    const where: any = {};
    if (branchId) where.branchId = branchId;
    if (classLevel) where.classLevel = classLevel;

    const students = await prisma.student.findMany({
      where,
      include: {
        user: true,
        branch: true,
        parent: { include: { user: true } },
        enrollments: { include: { course: true, batch: true } },
        attendance: true,
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ students });
  } catch (error) {
    console.error('Fetch students error:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      classLevel,
      stream,
      schoolName,
      branchId,
      courseId,
      batchId,
      fatherName,
      fatherPhone,
    } = body;

    if (!name || !email || !classLevel) {
      return NextResponse.json(
        { error: 'Name, email, and class level are required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: 'A student or user with this email already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword('Bidya@2026');

    // Create User
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        phone: phone || '',
        role: 'STUDENT',
        branchId: branchId || null,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      },
    });

    // Generate unique student ID (e.g. BC-2024-004)
    const count = await prisma.student.count();
    const studentId = `BC-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;

    // Create Student record
    const student = await prisma.student.create({
      data: {
        studentId,
        userId: user.id,
        classLevel,
        stream: stream || 'Science',
        schoolName: schoolName || 'School in Bhubaneswar',
        branchId: branchId || null,
      },
    });

    // If batch & course provided, enroll
    if (batchId && courseId) {
      await prisma.enrollment.create({
        data: {
          studentId: student.id,
          courseId,
          batchId,
          status: 'ACTIVE',
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Student registered and enrolled successfully!',
      student,
    });
  } catch (error) {
    console.error('Create student error:', error);
    return NextResponse.json({ error: 'Failed to create student' }, { status: 500 });
  }
}

