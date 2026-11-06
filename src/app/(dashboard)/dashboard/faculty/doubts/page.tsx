import React from 'react';
import { HelpCircle, CheckCircle2 } from 'lucide-react';
import prisma from '@/lib/prisma';
import AnswerDoubtModal from '../AnswerDoubtModal';

export const metadata = {
  title: 'Resolve Student Doubts | Faculty Desk',
};

export default async function FacultyDoubtsPage() {
  const doubts = await prisma.doubt.findMany({
    include: {
      student: { include: { user: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Student Doubt Clearance Portal</h1>
        <p className="text-xs text-slate-500">
          Provide step-by-step guidance and mathematical explanations to student queries.
        </p>
      </div>

      <div className="space-y-4">
        {doubts.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3 text-xs"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 text-sm">{d.student.user.name}</span>
                <span className="text-slate-400 font-mono text-[11px] ml-2">({d.student.studentId})</span>
                <span className="ml-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 uppercase">
                  {d.subject}
                </span>
              </div>

              <span
                className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                  d.status === 'ANSWERED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {d.status}
              </span>
            </div>

            <p className="text-slate-800 font-medium text-sm leading-relaxed">
              &ldquo;{d.question}&rdquo;
            </p>

            {d.answer ? (
              <div className="mt-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-bold text-emerald-700 block">
                  Your Answer (Answered by {d.answeredBy}):
                </span>
                <p className="text-slate-700 text-xs leading-relaxed">{d.answer}</p>
              </div>
            ) : (
              <div className="pt-2">
                <AnswerDoubtModal doubtId={d.id} studentName={d.student.user.name} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

