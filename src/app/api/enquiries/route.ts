import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, courseOfInterest, branch, currentClass, schoolName, message } = body;

    if (!name || !phone || !courseOfInterest) {
      return NextResponse.json(
        { error: 'Name, phone number, and course of interest are required.' },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        email: email || 'not-provided@bidyaclasses.com',
        phone,
        courseOfInterest,
        branch: branch || 'Ghatikia',
        currentClass: currentClass || 'Class X',
        schoolName: schoolName || '',
        message: message || '',
        status: 'NEW',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Admission enquiry received successfully! Our academic counselor will contact you shortly.',
      enquiryId: enquiry.id,
    });
  } catch (error) {
    console.error('Enquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to process enquiry. Please try again or call +91 79787 81801 directly.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json({ enquiries });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

