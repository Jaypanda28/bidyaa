import React from 'react';
import { HelpCircle, Clock, CheckCircle2, Send, AlertCircle } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import StudentDoubtSubmitForm from './StudentDoubtSubmitForm';

export const metadata = {
  title: 'Ask Academic Doubts | Bidya Classes ERP',
};

export default async function StudentDoubtsPage() {
  const session = await getCurrentUser();

  const student = await prisma.student.findFirst({
    where: { userId: session?.id },
  });

  const doubts = await prisma.doubt.findMany({
    where: { studentId: student?.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Student Doubt Resolution Desk</h1>
        <p className="text-xs text-slate-500">
          Get 1-on-1 step-by-step mathematical proofs and conceptual answers from your subject mentors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Submit Doubt Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h2 className="font-extrabold text-base text-slate-900">Ask a New Doubt</h2>
          {student && <StudentDoubtSubmitForm studentId={student.id} />}
        </div>

        {/* Existing Doubts & Responses */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="font-extrabold text-base text-slate-900">My Submitted Doubts</h2>
            <span className="text-xs text-slate-400 font-semibold">{doubts.length} Records</span>
          </div>

          <div className="space-y-4">
            {doubts.map((d) => (
              <div
                key={d.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-600 uppercase text-[10px] tracking-wider">
                    {d.subject}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      d.status === 'ANSWERED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {d.status}
                  </span>
                </div>

                <p className="text-slate-800 font-semibold">&ldquo;{d.question}&rdquo;</p>

                {d.answer ? (
                  <div className="mt-2 p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-700 block">
                      Answer by {d.answeredBy}:
                    </span>
                    <p className="text-slate-700 leading-relaxed">{d.answer}</p>
                  </div>
                ) : (
                  <div className="text-[11px] text-amber-700 font-medium">
                    Assigned to your subject mentor. Response expected shortly.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

