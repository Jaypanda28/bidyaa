import React from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  Clock,
  Award,
  Layers,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Examination Management & CBT Question Banks | Bidya Classes ERP',
};

export default async function ExamsManagementPage() {
  const exams = await prisma.examination.findMany({
    include: {
      batch: { include: { course: true } },
      questions: true,
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
          <h1 className="text-2xl font-black text-slate-900">Examination Engine & Test Series</h1>
          <p className="text-xs text-slate-500">
            Computer-based tests (CBT), negative marking, question banks, and instant evaluation.
          </p>
        </div>
        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
          {exams.length} Active Tests
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((exam) => {
          const topAttempt = exam.attempts[0];

          return (
            <div
              key={exam.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700">
                    {exam.examType} EXAM
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    {exam.batch.course.title}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base">{exam.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{exam.description}</p>

                <div className="grid grid-cols-3 gap-2 mt-4 text-center bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
                  <div>
                    <div className="font-black text-slate-900">{exam.questions.length}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Questions</div>
                  </div>
                  <div>
                    <div className="font-black text-slate-900">{exam.durationMinutes}m</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Duration</div>
                  </div>
                  <div>
                    <div className="font-black text-red-600">
                      +{exam.positiveMarks} / -{exam.negativeMarks}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Marking</div>
                  </div>
                </div>

                {topAttempt && (
                  <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                        Top Ranker
                      </span>
                      <span className="font-bold text-slate-900">
                        {topAttempt.student.user.name} ({topAttempt.student.studentId})
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-emerald-700 text-sm">
                        {topAttempt.score} / {exam.totalMarks}
                      </span>
                      <div className="text-[10px] text-slate-500 font-medium">Rank 1</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {exam.attempts.length} Student {exam.attempts.length === 1 ? 'Submission' : 'Submissions'}
                </span>
                <Link
                  href={`/dashboard/exam/${exam.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700"
                >
                  <span>Preview Exam UI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

