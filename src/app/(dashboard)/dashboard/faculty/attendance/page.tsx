import React from 'react';
import { Calendar, Users, Layers } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import FacultyAttendanceMarker from '../FacultyAttendanceMarker';

export const metadata = {
  title: 'Mark Batch Attendance | Faculty Desk',
};

export default async function FacultyAttendancePage() {
  const session = await getCurrentUser();

  const faculty = await prisma.faculty.findFirst({
    where: { userId: session?.id },
    include: {
      batches: {
        include: {
          enrollments: {
            include: {
              student: { include: { user: true } },
            },
          },
        },
      },
    },
  });

  let currentBatch = faculty?.batches[0] || null;
  if (!currentBatch) {
    currentBatch = await prisma.batch.findFirst({
      include: {
        enrollments: {
          include: {
            student: { include: { user: true } },
          },
        },
      },
    });
  }

  const students = currentBatch?.enrollments.map((e) => e.student) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Mark Batch Session Attendance</h1>
        <p className="text-xs text-slate-500">
          Select date and log presence. Attendance records immediately sync with the student & parent portals.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4 max-w-2xl">
        <div className="border-b pb-3">
          <h2 className="font-extrabold text-base text-slate-900">{currentBatch?.name}</h2>
          <p className="text-xs text-slate-400">Classroom Attendance Register</p>
        </div>

        {currentBatch && (
          <FacultyAttendanceMarker
            batchId={currentBatch.id}
            students={students}
          />
        )}
      </div>
    </div>
  );
}

