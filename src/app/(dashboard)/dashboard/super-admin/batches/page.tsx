import React from 'react';
import {
  Layers,
  Users,
  Calendar,
  Clock,
  Building,
  CheckCircle2,
  PlusCircle,
} from 'lucide-react';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Batches & Timetable Management | Bidya Classes ERP',
};

export default async function BatchesPage() {
  const batches = await prisma.batch.findMany({
    include: {
      course: true,
      branch: true,
      faculty: { include: { user: true } },
      enrollments: true,
      timetable: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Batches & Classroom Allocations</h1>
          <p className="text-xs text-slate-500">
            Batch schedules, branch locations, capacity, and active timetable schedules.
          </p>
        </div>
        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
          {batches.length} Active Batches
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {b.branch.name}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">{b.code}</span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-base">{b.name}</h3>
              <div className="text-xs text-red-600 font-semibold">{b.course.title}</div>

              <div className="mt-4 space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{b.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>Room: {b.roomNumber}</span>
                </div>
                {b.faculty && (
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>Mentor: {b.faculty.user.name}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-black text-slate-900">{b.enrollments.length}</span>
                <span className="text-slate-400"> / {b.maxStudents} Students</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                Active
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

