import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { verifyPassword, signSessionToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: {
        student: true,
        branch: true,
      },
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'Invalid email or account is inactive' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password. Please check your credentials.' },
        { status: 401 }
      );
    }

    const sessionPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      branchId: user.branchId,
      studentId: user.student?.studentId || null,
      avatar: user.avatar,
    };

    const token = await signSessionToken(sessionPayload);

    // Set cookie
    const cookieStore = cookies();
    cookieStore.set('bidya_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN',
        entity: 'User',
        details: `User logged in with role ${user.role}`,
      },
    });

    return NextResponse.json({
      success: true,
      user: sessionPayload,
      redirectUrl: getRoleDashboardUrl(user.role),
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error during authentication' },
      { status: 500 }
    );
  }
}

function getRoleDashboardUrl(role: string): string {
  switch (role) {
    case 'SUPER_ADMIN':
      return '/dashboard/super-admin';
    case 'BRANCH_ADMIN':
      return '/dashboard/branch-admin';
    case 'PRINCIPAL':
      return '/dashboard/principal';
    case 'FACULTY':
      return '/dashboard/faculty';
    case 'STUDENT':
      return '/dashboard/student';
    case 'PARENT':
      return '/dashboard/parent';
    case 'ACCOUNTANT':
      return '/dashboard/accountant';
    default:
      return '/dashboard';
  }
}

