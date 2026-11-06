import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  Sparkles,
  Trophy,
  Star,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const metadata = {
  title: 'Student Results & Achievements | Bidya Classes – Bhubaneswar',
  description: 'Verified board exam and competitive entrance toppers of Bidya Classes Bhubaneswar including Class X, +2 Science, IIT-JEE and OUAT rankers.',
};

export default function ResultsPage() {
  const class10Toppers = [
    { name: 'Shivani Samal', score: '98.6%', school: 'Vikash, Khandagiri', rank: 'Institute 1st Rank' },
    { name: 'Udbhas Kundu', score: '95.4%', school: 'Vikash, Khandagiri', rank: 'Institute 2nd Rank' },
    { name: 'Satwik Ku. Nayak', score: '92.0%', school: 'DAV, Kalinga Nagar', rank: 'Distinction' },
    { name: 'Amitesh Mohanty', score: '92.0%', school: 'DAV, Pokhariput', rank: 'Distinction' },
    { name: 'Sneha Suman Mohapatra', score: '90.0%', school: 'DAV, Pokhariput', rank: 'Distinction' },
  ];

  const class12Toppers = [
    { name: 'Priyanka Hota', score: '96.0%', school: 'St. Xavier, Khandagiri', stream: 'Science' },
    { name: 'Shirshak Acharjya', score: '96.0%', school: 'DAV, Kalinga Nagar', stream: 'Science' },
    { name: 'Devarpita Rout', score: '96.0%', school: 'DAV, Unit - 8', stream: 'Science' },
    { name: 'Nishan Kar', score: '96.0%', school: 'DAV, Kalinga Nagar', stream: 'Science' },
    { name: 'Prabhupada Pradhan', score: '95.0%', school: 'Sai International School', stream: 'Science' },
  ];

  const competitiveToppers = [
    { name: 'Rohan Das', exam: 'IIT-JEE (Advanced)', rank: 'AIR 452', school: 'Bidya Classes Fire Station Campus' },
    { name: 'Sneha Patnaik', exam: 'OUAT Entrance', rank: 'State Rank 35', school: 'Bidya Classes Ghatikia Campus' },
    { name: 'Priya Sahoo', exam: 'CBSE Class XII Board', rank: '98.6%', school: 'Bidya Classes Senior Wing' },
    { name: 'Aditya Mishra', exam: 'CBSE Class XII Board', rank: '98.4%', school: 'Bidya Classes Senior Wing' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/30 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
            <Trophy className="w-3.5 h-3.5" />
            HALL OF FAME & ACADEMIC GLORY
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Our Toppers & Meritorious Achievers
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Celebrating the extraordinary hard work of our students and the dedicated mentorship of our faculty across Bhubaneswar.
          </p>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-md text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-red-600">98.6%</div>
            <div className="text-xs text-slate-500 mt-1 font-semibold">Highest Board Score</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">AIR 452</div>
            <div className="text-xs text-slate-500 mt-1 font-semibold">IIT-JEE Advanced</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">State Rank 35</div>
            <div className="text-xs text-slate-500 mt-1 font-semibold">OUAT Agri Entrance</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-600">500+</div>
            <div className="text-xs text-slate-500 mt-1 font-semibold">90%+ Board Scorers</div>
          </div>
        </div>
      </section>

      {/* Authentic Verification Posters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            OFFICIAL MERIT POSTERS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Class X & Class XII Official Toppers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Authentic verified result publications of Bidya Classes, Bhubaneswar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Class X Poster */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-4 overflow-hidden">
            <div className="text-center py-2 border-b border-slate-100 mb-4">
              <span className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Our Toppers 2023 (Class - X)
              </span>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <Image
                src="/images/toppers-class-10-2023.jpg"
                alt="Our Toppers 2023 Class X"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {class10Toppers.map((t, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                  <div className="text-red-600 font-black text-sm">{t.score}</div>
                  <div className="font-bold text-xs text-slate-800 line-clamp-1">{t.name}</div>
                  <div className="text-[10px] text-slate-500 line-clamp-1">{t.school}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Class XII Poster */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-4 overflow-hidden">
            <div className="text-center py-2 border-b border-slate-100 mb-4">
              <span className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Our Toppers 2023 (Class - XII Science)
              </span>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <Image
                src="/images/toppers-class-12-2023.jpg"
                alt="Our Toppers 2023 Class XII"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {class12Toppers.map((t, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                  <div className="text-red-600 font-black text-sm">{t.score}</div>
                  <div className="font-bold text-xs text-slate-800 line-clamp-1">{t.name}</div>
                  <div className="text-[10px] text-slate-500 line-clamp-1">{t.school}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Exam Rankers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-14">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
              NATIONAL & STATE COMPETITIVE ENTRANCES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Engineering & Allied Science Selections
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {competitiveToppers.map((c, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 text-center space-y-2 hover:border-red-500 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-400 mx-auto flex items-center justify-center font-bold text-sm border border-red-500/30">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-white text-base">{c.name}</h4>
                <div className="text-xs font-semibold text-red-400">{c.exam}</div>
                <div className="text-lg font-black text-amber-400">{c.rank}</div>
                <div className="text-[11px] text-slate-400">{c.school}</div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all"
            >
              <span>Join the Legacy of Toppers &rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

