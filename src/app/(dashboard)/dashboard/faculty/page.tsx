import React from 'react';
import {
  Users,
  Calendar,
  BookOpen,
  HelpCircle,
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import FacultyAttendanceMarker from './FacultyAttendanceMarker';
import UploadMaterialModal from './UploadMaterialModal';
import AnswerDoubtModal from './AnswerDoubtModal';

export const metadata = {
  title: 'Faculty Academic Desk | Bidya Classes ERP',
};

export default async function FacultyDashboardPage() {
  const session = await getCurrentUser();

  // Find faculty profile
  const faculty = await prisma.faculty.findFirst({
    where: { userId: session?.id },
    include: {
      user: true,
      batches: {
        include: {
          course: true,
          branch: true,
          enrollments: {
            include: {
              student: { include: { user: true, attendance: true } },
            },
          },
        },
      },
    },
  });

  // Get active batch
  let currentBatch = faculty?.batches[0] || null;
  if (!currentBatch) {
    currentBatch = await prisma.batch.findFirst({
      include: {
        course: true,
        branch: true,
        enrollments: {
          include: {
            student: { include: { user: true, attendance: true } },
          },
        },
      },
    });
  }

  // Pending doubts
  const openDoubts = await prisma.doubt.findMany({
    include: {
      student: { include: { user: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const enrolledStudents = currentBatch?.enrollments.map((e) => e.student) || [];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-red-600/30 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
            Faculty Academic Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            Welcome, {faculty?.user.name || 'Professor'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            {faculty?.designation || 'Senior Faculty'} • {faculty?.specialization || 'Academic Mentor'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {currentBatch && (
            <UploadMaterialModal courseId={currentBatch.courseId} />
          )}
        </div>
      </div>

      {/* Main Grid: Mark Attendance & Student Doubts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Attendance Marker */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="font-extrabold text-base text-slate-900">
                Mark Batch Attendance ({currentBatch?.name})
              </h2>
              <p className="text-xs text-slate-400">
                Logged attendance reflects instantly on the parent portal and administrative attendance matrix.
              </p>
            </div>
          </div>

          {currentBatch && (
            <FacultyAttendanceMarker
              batchId={currentBatch.id}
              students={enrolledStudents}
            />
          )}
        </div>

        {/* Student Doubts Desk */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="font-extrabold text-base text-slate-900">Student Doubts Desk</h2>
              <p className="text-xs text-slate-400">Direct questions submitted by learners</p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-xs">
              {openDoubts.length} Queries
            </span>
          </div>

          <div className="space-y-3">
            {openDoubts.map((doubt) => (
              <div
                key={doubt.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{doubt.student.user.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      doubt.status === 'ANSWERED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {doubt.status}
                  </span>
                </div>

                <div className="text-slate-500 font-semibold text-[11px]">{doubt.subject}</div>

                <p className="text-slate-700 font-medium leading-relaxed">
                  &ldquo;{doubt.question}&rdquo;
                </p>

                {doubt.answer ? (
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600">
                    <strong className="text-slate-800 block text-[11px] mb-0.5">Your Response:</strong>
                    {doubt.answer}
                  </div>
                ) : (
                  <AnswerDoubtModal doubtId={doubt.id} studentName={doubt.student.user.name} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
