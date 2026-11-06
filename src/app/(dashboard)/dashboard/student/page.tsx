import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  FileCheck2,
  Receipt,
  Clock,
  Video,
  Award,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const metadata = {
  title: 'Student Learning Portal | Bidya Classes ERP',
};

export default async function StudentDashboardPage() {
  const session = await getCurrentUser();

  // Fetch student profile based on session
  const student = await prisma.student.findFirst({
    where: {
      userId: session?.id,
    },
    include: {
      user: true,
      branch: true,
      enrollments: {
        include: {
          course: {
            include: {
              studyMaterials: true,
              videoLectures: true,
            },
          },
          batch: {
            include: {
              timetable: true,
              faculty: { include: { user: true } },
              examinations: { include: { questions: true } },
            },
          },
        },
      },
      attendance: { orderBy: { date: 'desc' } },
      payments: true,
      doubts: { orderBy: { createdAt: 'desc' } },
      examAttempts: { include: { exam: true }, orderBy: { submittedAt: 'desc' } },
    },
  });

  // Calculate attendance rate
  const totalAtt = student?.attendance.length || 0;
  const presentCount = student?.attendance.filter((a) => a.status === 'PRESENT').length || 0;
  const attRate = totalAtt > 0 ? Math.round((presentCount / totalAtt) * 100) : 100;

  const currentBatch = student?.enrollments[0]?.batch;
  const currentCourse = student?.enrollments[0]?.course;

  // Active examination available
  const availableExams = currentBatch?.examinations || [];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-600/30 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
                Student Learning Portal
              </span>
              <span className="text-xs text-slate-400 font-mono font-bold">
                ID: {student?.studentId || 'BC-2024-001'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Welcome back, {student?.user.name || 'Student'}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              {currentBatch ? currentBatch.name : 'Batch Allocation in Progress'} • {student?.branch?.name || 'Ghatikia Campus'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 text-center">
              <div className="text-xl font-black text-emerald-400">{attRate}%</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Attendance</div>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 text-center">
              <div className="text-xl font-black text-white">{student?.examAttempts.length || 0}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Exams Taken</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          href="/dashboard/student/materials"
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-red-300 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="font-bold text-slate-900 text-sm">Study Notes & PDFs</div>
          <div className="text-[11px] text-slate-400">
            {currentCourse?.studyMaterials.length || 4} Modules Available
          </div>
        </Link>

        <Link
          href="/dashboard/student/lectures"
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-red-300 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Video className="w-5 h-5" />
          </div>
          <div className="font-bold text-slate-900 text-sm">Recorded Lectures</div>
          <div className="text-[11px] text-slate-400">
            {currentCourse?.videoLectures.length || 3} Video Classes
          </div>
        </Link>

        <Link
          href="/dashboard/student/exams"
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-red-300 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div className="font-bold text-slate-900 text-sm">Online CBT Mock Tests</div>
          <div className="text-[11px] text-slate-400">Timed MCQ engine with marks</div>
        </Link>

        <Link
          href="/dashboard/student/doubts"
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-red-300 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="font-bold text-slate-900 text-sm">Ask Faculty Doubts</div>
          <div className="text-[11px] text-slate-400">1-on-1 mentor guidance</div>
        </Link>
      </div>

      {/* Main Grid: Timetable & Available Exams */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Class Schedule */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Weekly Class Timetable</h3>
              <p className="text-xs text-slate-400">Your scheduled classes for this week</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-600">
              {currentBatch?.roomNumber || 'Smart Room 1'}
            </span>
          </div>

          <div className="space-y-3">
            {currentBatch?.timetable && currentBatch.timetable.length > 0 ? (
              currentBatch.timetable.map((tt) => (
                <div
                  key={tt.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 text-center py-1 bg-red-100 text-red-700 font-black rounded-lg text-[11px]">
                      {tt.dayOfWeek.slice(0, 3)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{tt.subject}</div>
                      <div className="text-slate-500 text-[11px]">Faculty: {tt.facultyName}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-slate-800">
                      {tt.startTime} – {tt.endTime}
                    </div>
                    <div className="text-slate-400 text-[10px]">Room {tt.room}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-slate-400 p-4 text-center">
                Classes scheduled on Mon, Wed, Fri (4:30 PM – 7:30 PM). Check notice board for holiday revisions.
              </div>
            )}
          </div>
        </div>

        {/* Right: Available Online Mock CBTs */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Online CBT Examinations</h3>
              <p className="text-xs text-slate-400">Timed computer-based assessments</p>
            </div>
          </div>

          <div className="space-y-3">
            {availableExams.map((ex) => (
              <div
                key={ex.id}
                className="p-4 rounded-2xl border border-red-200/80 bg-red-50/30 space-y-3"
              >
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 uppercase">
                    {ex.examType} Test
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">{ex.title}</h4>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {ex.questions.length} Questions • {ex.durationMinutes} Minutes • Negative Marking (-{ex.negativeMarks})
                  </div>
                </div>

                <Link
                  href={`/dashboard/exam/${ex.id}`}
                  className="w-full text-center block bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-xs"
                >
                  Start Examination Now &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

