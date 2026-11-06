import React from 'react';
import Link from 'next/link';
import { FileCheck2, Clock, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const metadata = {
  title: 'CBT Mock Examinations | Bidya Classes ERP',
};

export default async function StudentExamsListPage() {
  const session = await getCurrentUser();

  const exams = await prisma.examination.findMany({
    include: {
      questions: true,
      batch: true,
      attempts: {
        where: {
          student: { userId: session?.id },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Computer-Based Tests (CBT) & Mock Exams</h1>
        <p className="text-xs text-slate-500">
          Timed examination engine with negative marking, question banks, and automatic evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((ex) => {
          const attempt = ex.attempts[0];

          return (
            <div
              key={ex.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700">
                    {ex.examType} EXAM
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{ex.subject}</span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base">{ex.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{ex.description}</p>

                <div className="grid grid-cols-3 gap-2 mt-4 text-center bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
                  <div>
                    <div className="font-black text-slate-900">{ex.questions.length}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Questions</div>
                  </div>
                  <div>
                    <div className="font-black text-slate-900">{ex.durationMinutes}m</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Duration</div>
                  </div>
                  <div>
                    <div className="font-black text-red-600">+{ex.positiveMarks}/-{ex.negativeMarks}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Marking</div>
                  </div>
                </div>

                {attempt && (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-xs rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-emerald-800 block">Previously Completed</span>
                      <span className="text-slate-500 text-[10px]">
                        Submitted on {new Date(attempt.submittedAt!).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    <div className="text-right font-black text-emerald-700 text-sm">
                      Score: {attempt.score} / {ex.totalMarks}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100">
                <Link
                  href={`/dashboard/exam/${ex.id}`}
                  className="w-full text-center block bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-xs"
                >
                  {attempt ? 'Retake Examination' : 'Start Examination Now'} &rarr;
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

