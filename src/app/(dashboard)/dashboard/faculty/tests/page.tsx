import React from 'react';
import Link from 'next/link';
import { FileCheck2, Clock, Award, Users, ArrowRight } from 'lucide-react';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Conduct Tests & Grade Results | Faculty Desk',
};

export default async function FacultyTestsPage() {
  const exams = await prisma.examination.findMany({
    include: {
      questions: true,
      batch: { include: { course: true } },
      attempts: {
        include: {
          student: { include: { user: true } },
        },
        orderBy: { score: 'desc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Conduct Tests & Review Performance</h1>
          <p className="text-xs text-slate-500">
            MCQ assessments, automatic evaluation, and student rank lists.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((ex) => (
          <div
            key={ex.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700">
                  {ex.examType}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{ex.batch.name}</span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-base">{ex.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{ex.description}</p>

              <div className="grid grid-cols-3 gap-2 mt-4 text-center bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
                <div>
                  <div className="font-black text-slate-900">{ex.questions.length}</div>
                  <div className="text-[10px] text-slate-400 uppercase">Questions</div>
                </div>
                <div>
                  <div className="font-black text-slate-900">{ex.durationMinutes}m</div>
                  <div className="text-[10px] text-slate-400 uppercase">Duration</div>
                </div>
                <div>
                  <div className="font-black text-red-600">+{ex.positiveMarks}/-{ex.negativeMarks}</div>
                  <div className="text-[10px] text-slate-400 uppercase">Marking</div>
                </div>
              </div>

              {ex.attempts.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">
                    Highest Performer:
                  </span>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-900">{ex.attempts[0].student.user.name}</span>
                    <span className="text-emerald-700 font-bold">
                      {ex.attempts[0].score} / {ex.totalMarks}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">{ex.attempts.length} Submissions</span>
              <Link
                href={`/dashboard/exam/${ex.id}`}
                className="font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <span>View Question Set</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

