'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, Clock, Calendar, Check } from 'lucide-react';

interface StudentInfo {
  id: string;
  studentId: string;
  user: {
    name: string;
  };
}

interface Props {
  batchId: string;
  students: StudentInfo[];
}

export default function FacultyAttendanceMarker({ batchId, students }: Props) {
  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(todayStr);
  const [statusMap, setStatusMap] = useState<Record<string, 'PRESENT' | 'ABSENT' | 'LATE'>>(() => {
    const initial: Record<string, 'PRESENT' | 'ABSENT' | 'LATE'> = {};
    students.forEach((s) => {
      initial[s.id] = 'PRESENT';
    });
    return initial;
  });

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const setAllStatus = (status: 'PRESENT' | 'ABSENT') => {
    const updated: Record<string, 'PRESENT' | 'ABSENT' | 'LATE'> = {};
    students.forEach((s) => {
      updated[s.id] = status;
    });
    setStatusMap(updated);
  };

  const handleToggle = (id: string, status: 'PRESENT' | 'ABSENT' | 'LATE') => {
    setStatusMap({ ...statusMap, [id]: status });
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    setSuccessMsg(null);

    const records = students.map((s) => ({
      studentId: s.id,
      status: statusMap[s.id] || 'PRESENT',
    }));

    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batchId,
          date,
          records,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save attendance');
      setSuccessMsg(data.message || 'Attendance logged successfully!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Error saving attendance');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Date & Bulk Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span className="font-bold text-slate-700">Date:</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-slate-300 font-medium text-slate-800 bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAllStatus('PRESENT')}
            className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold"
          >
            Mark All Present
          </button>
          <button
            type="button"
            onClick={() => setAllStatus('ABSENT')}
            className="px-2.5 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 font-bold"
          >
            Mark All Absent
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Student List */}
      <div className="space-y-2">
        {students.map((st) => {
          const current = statusMap[st.id] || 'PRESENT';

          return (
            <div
              key={st.id}
              className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200 flex items-center justify-between text-xs"
            >
              <div>
                <div className="font-bold text-slate-900">{st.user.name}</div>
                <div className="font-mono text-slate-400 text-[10px]">{st.studentId}</div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleToggle(st.id, 'PRESENT')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    current === 'PRESENT'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  P
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(st.id, 'LATE')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    current === 'LATE'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  L
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(st.id, 'ABSENT')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    current === 'ABSENT'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  A
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        disabled={saving}
        onClick={handleSaveAttendance}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-sm"
      >
        {saving ? 'Logging Attendance to Database...' : 'Save & Publish Session Attendance'}
      </button>
    </div>
  );
}

