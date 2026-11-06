'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertCircle,
  Award,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  Send,
  RotateCcw,
} from 'lucide-react';

interface Question {
  id: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
  explanation: string | null;
  marks: number;
}

interface Exam {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  positiveMarks: number;
  negativeMarks: number;
  questions: Question[];
}

interface Props {
  exam: Exam;
  studentId: string;
  studentName: string;
}

export default function ExamEngineClient({ exam, studentId, studentName }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(exam.durationMinutes * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Timer Countdown
  useEffect(() => {
    if (result || timeLeftSeconds <= 0) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeftSeconds, result]);

  const handleAutoSubmit = () => {
    handleSubmitExam();
  };

  const handleSelectOption = (option: string) => {
    const qId = exam.questions[currentIndex].id;
    setAnswers({ ...answers, [qId]: option });
  };

  const handleClearSelection = () => {
    const qId = exam.questions[currentIndex].id;
    const newAnswers = { ...answers };
    delete newAnswers[qId];
    setAnswers(newAnswers);
  };

  const toggleMarkForReview = () => {
    const qId = exam.questions[currentIndex].id;
    setMarkedForReview({
      ...markedForReview,
      [qId]: !markedForReview[qId],
    });
  };

  const handleSubmitExam = async () => {
    setIsSubmitting(true);
    setShowConfirmModal(false);

    try {
      const timeSpent = exam.durationMinutes * 60 - timeLeftSeconds;
      const res = await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examId: exam.id,
          studentId,
          answers,
          timeSpentSeconds: timeSpent,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit exam');
      setResult(data.result);
    } catch (err: any) {
      alert(err.message || 'Submission error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const currentQ = exam.questions[currentIndex];
  const selectedOption = currentQ ? answers[currentQ.id] : null;

  // IF RESULT IS GENERATED: SHOW SCORECARD & SOLUTIONS
  if (result) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 py-6">
        {/* Scorecard Hero */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              OFFICIAL CBT SCORECARD
            </span>
            <h1 className="text-3xl font-black text-slate-900 mt-1">{exam.title}</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Candidate: <strong>{studentName}</strong> • Passing Marks: {exam.passingMarks} / {exam.totalMarks}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-2xl font-black text-slate-900">{result.score}</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Total Score</div>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="text-2xl font-black text-emerald-700">{result.correctCount}</div>
              <div className="text-[10px] text-emerald-800 uppercase font-bold">Correct (+{exam.positiveMarks})</div>
            </div>
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
              <div className="text-2xl font-black text-red-700">{result.incorrectCount}</div>
              <div className="text-[10px] text-red-800 uppercase font-bold">Incorrect (-{exam.negativeMarks})</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-2xl font-black text-slate-700">{result.percentage}%</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Accuracy</div>
            </div>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/dashboard/student"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl"
            >
              Back to Student Portal
            </Link>
            <button
              onClick={() => window.print()}
              className="bg-white border border-slate-300 text-slate-700 font-bold text-xs px-6 py-2.5 rounded-xl hover:bg-slate-50"
            >
              Print Official Scorecard
            </button>
          </div>
        </div>

        {/* Detailed Solutions Breakdown */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-extrabold text-slate-900 border-b pb-3">
            Detailed Solution & Pedagogical Explanations
          </h2>

          <div className="space-y-6">
            {exam.questions.map((q, idx) => {
              const userAns = answers[q.id];
              const isCorrect = userAns && userAns.toUpperCase() === q.correctOption.toUpperCase();
              const isSkipped = !userAns;

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-2xl border text-xs sm:text-sm space-y-3 ${
                    isCorrect
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : isSkipped
                      ? 'border-slate-200 bg-slate-50/50'
                      : 'border-red-200 bg-red-50/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900">
                      Question {idx + 1}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : isSkipped
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {isCorrect ? `Correct (+${exam.positiveMarks})` : isSkipped ? 'Unattempted (0)' : `Incorrect (-${exam.negativeMarks})`}
                    </span>
                  </div>

                  <p className="text-slate-800 font-semibold">{q.questionText}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div
                      className={`p-2.5 rounded-lg border ${
                        q.correctOption === 'A'
                          ? 'border-emerald-500 bg-emerald-100/60 font-bold text-emerald-900'
                          : userAns === 'A'
                          ? 'border-red-400 bg-red-50 text-red-800'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      (A) {q.optionA}
                    </div>
                    <div
                      className={`p-2.5 rounded-lg border ${
                        q.correctOption === 'B'
                          ? 'border-emerald-500 bg-emerald-100/60 font-bold text-emerald-900'
                          : userAns === 'B'
                          ? 'border-red-400 bg-red-50 text-red-800'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      (B) {q.optionB}
                    </div>
                    <div
                      className={`p-2.5 rounded-lg border ${
                        q.correctOption === 'C'
                          ? 'border-emerald-500 bg-emerald-100/60 font-bold text-emerald-900'
                          : userAns === 'C'
                          ? 'border-red-400 bg-red-50 text-red-800'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      (C) {q.optionC}
                    </div>
                    <div
                      className={`p-2.5 rounded-lg border ${
                        q.correctOption === 'D'
                          ? 'border-emerald-500 bg-emerald-100/60 font-bold text-emerald-900'
                          : userAns === 'D'
                          ? 'border-red-400 bg-red-50 text-red-800'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      (D) {q.optionD}
                    </div>
                  </div>

                  {q.explanation && (
                    <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600">
                      <strong className="text-slate-900 block mb-1">Faculty Solution Key:</strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE EXAMINATION INTERFACE
  return (
    <div className="space-y-6">
      {/* Top Bar with Timer */}
      <div className="bg-slate-900 text-white rounded-3xl p-4 sm:p-6 shadow-md flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">
            CBT Online Examination Engine
          </span>
          <h1 className="text-base sm:text-xl font-bold">{exam.title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-2xl border border-slate-700">
            <Clock className="w-5 h-5 text-red-400 animate-pulse" />
            <span className="font-mono text-lg font-black tracking-wider text-white">
              {formatTime(timeLeftSeconds)}
            </span>
          </div>

          <button
            onClick={() => setShowConfirmModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span>Submit Test</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Question Area */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between min-h-[460px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <span className="font-black text-slate-900 text-base">
                Question {currentIndex + 1} of {exam.questions.length}
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  +{exam.positiveMarks} Mark
                </span>
                <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  -{exam.negativeMarks} Neg
                </span>
              </div>
            </div>

            <p className="text-base font-semibold text-slate-900 leading-relaxed mb-6">
              {currentQ.questionText}
            </p>

            {/* Options */}
            <div className="space-y-3">
              {[
                { key: 'A', text: currentQ.optionA },
                { key: 'B', text: currentQ.optionB },
                { key: 'C', text: currentQ.optionC },
                { key: 'D', text: currentQ.optionD },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectOption(opt.key)}
                  className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all flex items-center gap-3 ${
                    selectedOption === opt.key
                      ? 'border-red-600 bg-red-50 text-red-900 font-bold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 text-slate-800'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                      selectedOption === opt.key
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {opt.key}
                  </span>
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearSelection}
                className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
              >
                Clear Choice
              </button>
              <button
                onClick={toggleMarkForReview}
                className={`px-3 py-2 rounded-xl border font-semibold flex items-center gap-1 ${
                  markedForReview[currentQ.id]
                    ? 'border-amber-400 bg-amber-50 text-amber-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{markedForReview[currentQ.id] ? 'Marked' : 'Mark for Review'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(currentIndex - 1)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 font-bold"
              >
                &larr; Previous
              </button>
              <button
                disabled={currentIndex === exam.questions.length - 1}
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40 font-bold"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Right: Question Palette */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900">Question Navigator</h3>

          <div className="grid grid-cols-5 gap-2">
            {exam.questions.map((q, idx) => {
              const isAns = !!answers[q.id];
              const isMarked = !!markedForReview[q.id];
              const isCur = currentIndex === idx;

              let btnClass = 'bg-slate-100 text-slate-700 border-slate-200';
              if (isCur) btnClass = 'ring-2 ring-red-500 font-black';
              if (isAns) btnClass += ' bg-emerald-500 text-white border-emerald-600';
              if (isMarked) btnClass += ' bg-amber-500 text-white border-amber-600';

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-10 rounded-xl border text-xs font-bold transition-all flex items-center justify-center ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-md bg-emerald-500"></span>
              <span>Answered ({Object.keys(answers).length})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-md bg-amber-500"></span>
              <span>Marked for Review ({Object.keys(markedForReview).filter((k) => markedForReview[k]).length})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-md bg-slate-100 border border-slate-300"></span>
              <span>Unattempted ({exam.questions.length - Object.keys(answers).length})</span>
            </div>
          </div>
        </div>
      </div>

      {/* SUBMISSION CONFIRM MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-slate-900">Confirm Exam Submission?</h3>
            <p className="text-xs text-slate-500">
              You have answered <strong>{Object.keys(answers).length}</strong> out of {exam.questions.length} questions. Are you sure you want to finalize and evaluate?
            </p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                Resume Test
              </button>
              <button
                onClick={handleSubmitExam}
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-sm"
              >
                {isSubmitting ? 'Evaluating...' : 'Yes, Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

