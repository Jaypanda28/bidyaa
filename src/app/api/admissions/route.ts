import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      studentName,
      email,
      phone,
      dob,
      gender,
      fatherName,
      fatherPhone,
      motherName,
      address,
      targetCourse,
      branch,
      currentClass,
      previousSchool,
      board,
      lastExamScore,
      scholarshipOptIn,
    } = body;

    if (!studentName || !phone || !fatherName || !targetCourse) {
      return NextResponse.json(
        { error: 'Student name, student phone, father name, and target course are required.' },
        { status: 400 }
      );
    }

    // Generate unique application number e.g. APP-2024-XXXX
    const count = await prisma.admissionApplication.count();
    const appNum = `APP-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

    const application = await prisma.admissionApplication.create({
      data: {
        applicationNumber: appNum,
        studentName,
        email: email || `${studentName.toLowerCase().replace(/\s+/g, '')}@student.bidya`,
        phone,
        dob: dob || '',
        gender: gender || 'Male',
        fatherName,
        fatherPhone: fatherPhone || phone,
        motherName: motherName || '',
        address: address || 'Bhubaneswar, Odisha',
        targetCourse,
        branch: branch || 'Ghatikia Branch',
        currentClass: currentClass || 'Class X',
        previousSchool: previousSchool || 'School in Bhubaneswar',
        board: board || 'CBSE',
        lastExamScore: lastExamScore || 'N/A',
        scholarshipOptIn: scholarshipOptIn !== false,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Admission Application registered successfully!',
      applicationNumber: application.applicationNumber,
      application,
    });
  } catch (error) {
    console.error('Admission API error:', error);
    return NextResponse.json(
      { error: 'Could not register application. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const applications = await prisma.admissionApplication.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json({ applications });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

