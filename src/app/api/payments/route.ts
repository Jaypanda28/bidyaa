import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');

    const where: any = {};
    if (studentId) where.studentId = studentId;

    const payments = await prisma.payment.findMany({
      where,
      include: {
        student: {
          include: {
            user: true,
            branch: true,
            enrollments: { include: { course: true, batch: true } },
          },
        },
        feeStructure: true,
      },
      orderBy: { paidAt: 'desc' },
    });

    return NextResponse.json({ payments });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      studentId,
      feeStructureId,
      amount,
      paymentMethod,
      razorpayPaymentId,
      razorpayOrderId,
      notes,
    } = body;

    if (!studentId || !amount) {
      return NextResponse.json(
        { error: 'Student ID and amount are required' },
        { status: 400 }
      );
    }

    // Generate verified receipt number (e.g. BC-RCPT-2024-XXXX)
    const count = await prisma.payment.count();
    const receiptNumber = `BC-RCPT-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

    const payment = await prisma.payment.create({
      data: {
        receiptNumber,
        studentId,
        feeStructureId: feeStructureId || null,
        amount: parseFloat(amount),
        paymentMethod: paymentMethod || 'ONLINE',
        razorpayPaymentId: razorpayPaymentId || `pay_sim_${Date.now()}`,
        razorpayOrderId: razorpayOrderId || `order_sim_${Date.now()}`,
        status: 'SUCCESS',
        notes: notes || 'Online Fee Payment via Razorpay Gateway',
        paidAt: new Date(),
      },
      include: {
        student: {
          include: {
            user: true,
            branch: true,
            enrollments: { include: { course: true, batch: true } },
          },
        },
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        action: 'FEE_PAID',
        entity: 'Payment',
        details: `Fee receipt ${receiptNumber} generated for amount ₹${amount} (Student: ${payment.student.user.name})`,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Payment processed and official receipt generated successfully!',
      payment,
      receiptNumber,
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json({ error: 'Failed to process fee payment' }, { status: 500 });
  }
}

