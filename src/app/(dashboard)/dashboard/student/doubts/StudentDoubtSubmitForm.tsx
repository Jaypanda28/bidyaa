'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, CheckCircle2 } from 'lucide-react';

export default function StudentDoubtSubmitForm({ studentId }: { studentId: string }) {
  const router = useRouter();
  const [subject, setSubject] = useState('Mathematics');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/doubts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          subject,
          question,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit doubt');

      setSuccess(true);
      setQuestion('');
      setTimeout(() => {
        setSuccess(false);
        router.refresh();
      }, 1500);
    } catch (err: any) {
      alert(err.message || 'Error submitting doubt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && (
        <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Doubt delivered to your mentor!</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
        >
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Your Question / Derivation Roadblock</label>
        <textarea
          rows={4}
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Describe where you got stuck, formula you used, or question number from the study module..."
          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
      >
        {loading ? 'Submitting...' : 'Submit to Subject Faculty'}
      </button>
    </form>
  );
}

