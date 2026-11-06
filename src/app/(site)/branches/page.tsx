import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Building,
  Navigation,
  ArrowRight,
} from 'lucide-react';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Our Branches & Learning Centres | Bidya Classes – Bhubaneswar',
  description: 'Visit Bidya Classes campuses in Bhubaneswar: Ghatikia Branch (Near Apeejay School) and Fire Station Branch (Baramunda). Contact numbers, addresses, and facilities.',
};

export default async function BranchesPage() {
  const branches = await prisma.branch.findMany({
    include: {
      batches: { include: { course: true } },
    },
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/30 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
            <Building className="w-3.5 h-3.5" />
            BHUBANESWAR CAMPUSES
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Our Learning Centres & Branches
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Two conveniently located state-of-the-art educational centers in Bhubaneswar equipped with smart classrooms, digital test setups, and quiet self-study libraries.
          </p>
        </div>
      </section>

      {/* Branches List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {branches.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-8 flex flex-col justify-between hover:shadow-xl transition-all space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      b.isMain
                        ? 'bg-red-100 text-red-700'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {b.isMain ? 'Main Campus & Head Office' : 'Specialized Entrance Wing'}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    CODE: {b.code}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900">{b.name}</h2>
                  <p className="text-sm text-slate-600 mt-2 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>
                      {b.address}, {b.city}, {b.state} – {b.pincode}
                    </span>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <a href={`tel:${b.phone}`} className="font-bold hover:text-red-600">
                      {b.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <a href={`mailto:${b.email}`} className="font-bold hover:text-red-600">
                      {b.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 sm:col-span-2">
                    <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>Mon – Sun: 08:00 AM – 08:30 PM (Class & Doubt Desks)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Campus Facilities:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      AC Digital Smart Classrooms
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Dedicated Science Demo Corner
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      CBT Examination Terminal
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Silent Reading Library
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/admissions?branch=${encodeURIComponent(b.name)}`}
                  className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-sm"
                >
                  Enquire at this Branch
                </Link>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `Bidya Classes, ${b.address}, Bhubaneswar`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-4 py-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-red-600" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

