'use client';

import React, { useState, useEffect } from 'react';
import { ClipboardList, Calendar, CheckCircle2, Clock, Upload } from 'lucide-react';

export default function StudentAssignmentsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Homework & Subjective Assignments</h1>
        <p className="text-xs text-slate-500">
          Weekly subjective problem sets, practice sheets, and faculty evaluations.
        </p>
      </div>

      <div className="space-y-4">
        {/* Sample Assignment 1 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700">
                Mathematics
              </span>
              <span className="text-xs text-slate-400 font-semibold">Class X Udaan Batch</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              <span>Due Date: 10th Nov 2024</span>
            </div>
          </div>

          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Class X Mathematics Board Practice Sheet - Real Numbers & Polynomials
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Solve all 25 subjective questions and submit scanned copy before Sunday 8:00 PM. Includes NCERT Exemplar proofs of irrationality.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
            <div className="flex items-center justify-between font-bold text-emerald-800">
              <span>Submitted & Graded</span>
              <span className="text-sm">Score: 48 / 50</span>
            </div>
            <p className="text-slate-600 text-[11px] pt-1">
              <strong>Faculty Feedback:</strong> Excellent work! Clean handwriting and accurate justifications for square root irrationality.
            </p>
          </div>
        </div>

        {/* Sample Assignment 2 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                Physics
              </span>
              <span className="text-xs text-slate-400 font-semibold">Class X Udaan Batch</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              <span>Due Date: 15th Nov 2024</span>
            </div>
          </div>

          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Electricity Numerical Sheet: Circuit Equivalent Resistance & Ohm&apos;s Law
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Calculate current in parallel and series branches, and compute electrical energy consumed in kilowatt-hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
              ✓ Solution PDF Uploaded Successfully! Awaiting Mentor Review.
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">Solve on notebook & submit scanned PDF copy</span>
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl transition-colors"
              >
                Upload Solution PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
