import React from 'react';
import { Award, Clock, FileCheck2, CheckCircle2 } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const metadata = {
  title: 'Test Scorecards & Ranks | Parent Portal',
};

export default async function ParentResultsPage() {
  const student = await prisma.student.findFirst({
    include: {
      user: true,
      examAttempts: {
        include: { exam: true },
        orderBy: { submittedAt: 'desc' },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Academic Scorecards & Examination Reports</h1>
        <p className="text-xs text-slate-500">
          Continuous performance tracking for <strong>{student?.user.name}</strong> ({student?.studentId})
        </p>
      </div>

      <div className="space-y-4">
        {student?.examAttempts.map((attempt) => (
          <div
            key={attempt.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 uppercase">
                  {attempt.exam.examType}
                </span>
                <h3 className="font-extrabold text-base text-slate-900 mt-1">{attempt.exam.title}</h3>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black text-emerald-700">
                  {attempt.score} / {attempt.exam.totalMarks}
                </div>
                <div className="text-[11px] text-emerald-800 font-bold">Rank 1 • Distinction</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
              <div>
                <div className="font-black text-emerald-700 text-sm">{attempt.correctCount}</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Correct</div>
              </div>
              <div>
                <div className="font-black text-red-600 text-sm">{attempt.incorrectCount}</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Incorrect</div>
              </div>
              <div>
                <div className="font-black text-slate-700 text-sm">{attempt.unattemptedCount}</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Skipped</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

