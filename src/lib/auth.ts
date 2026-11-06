import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import prisma from './prisma';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'bidya-classes-jwt-secret-key-secure-2026-bhubaneswar-odisha'
);

export interface AuthSession {
  id: string;
  name: string;
  email: string;
  role: string;
  branchId?: string | null;
  studentId?: string | null;
  avatar?: string | null;
}

export async function hashPassword(plain: string): Promise<string> {
  return await bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(plain, hash);
}

export async function signSessionToken(session: AuthSession): Promise<string> {
  return await new SignJWT({ ...session })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<AuthSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AuthSession;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<AuthSession | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('bidya_session')?.value;
    if (!token) return null;
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

export async function getFullUserRecord(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      student: {
        include: {
          branch: true,
          parent: true,
          enrollments: { include: { course: true, batch: true } },
        },
      },
      faculty: {
        include: {
          batches: { include: { course: true, branch: true } },
        },
      },
      parent: {
        include: {
          students: {
            include: {
              user: true,
              branch: true,
              enrollments: { include: { course: true, batch: true } },
            },
          },
        },
      },
      branch: true,
    },
  });
}

