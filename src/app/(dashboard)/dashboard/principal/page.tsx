import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Users,
  Award,
  Layers,
  BookOpen,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Principal Academic Oversight | Bidya Classes ERP',
};

export default async function PrincipalDashboardPage() {
  const facultyList = await prisma.faculty.findMany({
    include: {
      user: true,
      batches: { include: { course: true, enrollments: true } },
    },
  });

  const exams = await prisma.examination.findMany({
    include: {
      attempts: true,
      batch: true,
    },
  });

  const totalStudents = await prisma.student.count();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-red-600/30 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
              Principal & Academic Dean Desk
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">Academic Quality & Faculty Oversight</h1>
            <p className="text-xs text-slate-400">
              Curriculum adherence, faculty allocations, and student performance audits.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-center">
              <div className="text-xl font-black text-white">{facultyList.length}</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Faculty</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-center">
              <div className="text-xl font-black text-white">{totalStudents}</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Students</div>
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Allocations Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-900">Faculty Allocations & Teaching Load</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {facultyList.map((fac) => (
            <div
              key={fac.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs"
            >
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">{fac.user.name}</h4>
                <div className="text-red-600 font-bold text-[11px]">{fac.designation}</div>
                <div className="text-slate-400 text-[10px]">{fac.qualification}</div>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-1 text-slate-600">
                <div><strong>Assigned Batches:</strong> {fac.batches.length}</div>
                <div><strong>Specialization:</strong> {fac.specialization}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

