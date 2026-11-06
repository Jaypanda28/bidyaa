'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  User,
  GraduationCap,
  Briefcase,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  Building2,
  CheckCircle2,
} from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') || 'STUDENT';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Demo account presets
  const demoAccounts = [
    {
      role: 'SUPER_ADMIN',
      title: 'Super Admin (MD)',
      name: 'Bidyasagar Parida',
      email: 'admin@bidyaclasses.com',
      password: 'Bidya@2026',
      badge: 'Director Access',
      color: 'bg-red-100 text-red-700 border-red-200',
    },
    {
      role: 'BRANCH_ADMIN',
      title: 'Branch Admin',
      name: 'Rajesh Nayak (Ghatikia)',
      email: 'ghatikia.admin@bidyaclasses.com',
      password: 'Bidya@2026',
      badge: 'Campus Head',
      color: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    {
      role: 'PRINCIPAL',
      title: 'Principal / Academic Dean',
      name: 'Dr. Smita Pattnaik',
      email: 'principal@bidyaclasses.com',
      password: 'Bidya@2026',
      badge: 'Academic Head',
      color: 'bg-purple-100 text-purple-700 border-purple-200',
    },
    {
      role: 'FACULTY',
      title: 'Faculty (Maths HOD)',
      name: 'Prof. Soumya R. Dash',
      email: 'faculty.maths@bidyaclasses.com',
      password: 'Bidya@2026',
      badge: 'Teacher Portal',
      color: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      role: 'STUDENT',
      title: 'Student (Class X)',
      name: 'Shivani Samal (BC-2024-001)',
      email: 'student@bidyaclasses.com',
      password: 'Bidya@2026',
      badge: 'Learner Portal',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      role: 'PARENT',
      title: 'Parent Portal',
      name: 'Pratap Kumar Samal',
      email: 'parent@bidyaclasses.com',
      password: 'Bidya@2026',
      badge: 'Guardian Access',
      color: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    },
    {
      role: 'ACCOUNTANT',
      title: 'Accounts Officer',
      name: 'Subrat Kumar Jena',
      email: 'accounts@bidyaclasses.com',
      password: 'Bidya@2026',
      badge: 'Finance Desk',
      color: 'bg-slate-100 text-slate-800 border-slate-300',
    },
  ];

  const handleSelectDemo = (acc: typeof demoAccounts[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to authenticate');
      }

      // Redirect to specific portal
      router.push(data.redirectUrl || '/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-white p-1 rounded-xl w-10 h-10 flex items-center justify-center shadow-sm">
            <Image
              src="/images/logo.png"
              alt="Bidya Classes"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-extrabold text-lg text-white">
              Bidya <span className="text-red-500">Classes</span>
            </span>
            <span className="text-[10px] block text-slate-400 font-bold uppercase tracking-wider">
              Coaching Institute ERP & LMS
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          &larr; Back to Website
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-4xl mx-auto w-full my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column: Login Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
          <div className="space-y-1 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              SECURE ROLE-BASED ACCESS CONTROL
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Sign In to Your ERP Portal
            </h1>
            <p className="text-xs text-slate-500">
              Access attendance records, mock CBT tests, fee receipts, and LMS materials.
            </p>
          </div>

          {error && (
            <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Registered Email ID / Login Username
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bidyaclasses.com or student@..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                <span className="text-[11px] text-slate-400">Default: Bidya@2026</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span>Authenticating credentials...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Don&apos;t have an account yet?</span>
            <Link href="/admissions" className="font-bold text-red-600 hover:underline">
              Apply for Admission &rarr;
            </Link>
          </div>
        </div>

        {/* Right column: 1-Click Demo Roles Quick Switcher */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-white space-y-1 mb-2">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Quick Demo Role Switcher
            </span>
            <h3 className="text-lg font-bold">1-Click Role Testing</h3>
            <p className="text-xs text-slate-400">
              Click any role card below to pre-fill its credentials and evaluate each dashboard instantly:
            </p>
          </div>

          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {demoAccounts.map((acc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectDemo(acc)}
                className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between group ${
                  email === acc.email
                    ? 'bg-red-950/70 border-red-500 text-white shadow-md'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black">{acc.title}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${acc.color}`}>
                      {acc.badge}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{acc.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{acc.email}</div>
                </div>

                <div className="text-xs font-bold text-red-400 group-hover:text-white flex items-center gap-1">
                  <span>Select</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto w-full text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Bidya Classes Coaching ERP System. Protected with JWT authentication and bcrypt password hashing.
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center p-8 text-white text-sm">Loading login terminal...</div>}>
      <LoginContent />
    </Suspense>
  );
}
