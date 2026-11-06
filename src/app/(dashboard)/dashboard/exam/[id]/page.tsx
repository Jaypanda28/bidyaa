import React from 'react';
import { notFound, redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import ExamEngineClient from './ExamEngineClient';

interface Props {
  params: { id: string };
}

export const metadata = {
  title: 'Online Examination Terminal | Bidya Classes ERP',
};

export default async function ExamTerminalPage({ params }: Props) {
  const session = await getCurrentUser();
  if (!session) redirect('/login');

  const exam = await prisma.examination.findUnique({
    where: { id: params.id },
    include: {
      questions: true,
      batch: { include: { course: true } },
    },
  });

  if (!exam) notFound();

  // Find or determine studentId
  let studentId = session.studentId;
  if (!studentId) {
    const studentRec = await prisma.student.findFirst({
      where: { userId: session.id },
    });
    studentId = studentRec?.id;
  } else {
    const studentRec = await prisma.student.findUnique({
      where: { studentId },
    });
    studentId = studentRec?.id;
  }

  // Fallback to first student if admin is previewing
  if (!studentId) {
    const firstStudent = await prisma.student.findFirst();
    studentId = firstStudent?.id;
  }

  return (
    <ExamEngineClient
      exam={exam}
      studentId={studentId || ''}
      studentName={session.name}
    />
  );
}

