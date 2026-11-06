'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Bell,
  LogOut,
  User,
  ShieldCheck,
  ChevronDown,
  Building,
  GraduationCap,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { AuthSession } from '@/lib/auth';

interface Props {
  session: AuthSession;
}

export default function DashboardHeader({ session }: Props) {
  const router = useRouter();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const demoRoles = [
    { role: 'SUPER_ADMIN', label: 'Super Admin (MD)', email: 'admin@bidyaclasses.com' },
    { role: 'BRANCH_ADMIN', label: 'Branch Admin', email: 'ghatikia.admin@bidyaclasses.com' },
    { role: 'PRINCIPAL', label: 'Principal', email: 'principal@bidyaclasses.com' },
    { role: 'FACULTY', label: 'Faculty (Maths)', email: 'faculty.maths@bidyaclasses.com' },
    { role: 'STUDENT', label: 'Student (Class X)', email: 'student@bidyaclasses.com' },
    { role: 'PARENT', label: 'Parent Portal', email: 'parent@bidyaclasses.com' },
    { role: 'ACCOUNTANT', label: 'Accountant', email: 'accounts@bidyaclasses.com' },
  ];

  const handleQuickSwitchRole = async (targetEmail: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail, password: 'Bidya@2026' }),
      });
      const data = await res.json();
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  };

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-6 py-2.5">
      <div className="flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-white p-1 rounded-lg w-9 h-9 flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Bidya Classes"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base leading-none">
                Bidya <span className="text-red-500">Classes</span>
              </div>
              <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                ERP Management System
              </div>
            </div>
          </Link>

          <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-[11px] text-slate-300 border border-slate-700">
            <Building className="w-3 h-3 text-red-500" />
            <span>Bhubaneswar Campuses</span>
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Quick Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-700/60 text-xs text-red-200 font-bold transition-colors"
              title="Switch demo account"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">Switch Role</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2 z-50 text-xs">
                <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Instant Demo Persona Switcher
                </div>
                {demoRoles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => {
                      setRoleMenuOpen(false);
                      handleQuickSwitchRole(r.email);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors ${
                      session.role === r.role ? 'text-red-400 font-bold bg-slate-800/50' : 'text-slate-300'
                    }`}
                  >
                    <span>{r.label}</span>
                    {session.role === r.role && (
                      <span className="text-[10px] bg-red-900/60 text-red-300 px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <span>Public Website</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          {/* User Profile Info */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs overflow-hidden border border-red-400/40">
              {session.avatar ? (
                <Image src={session.avatar} alt={session.name} width={32} height={32} className="object-cover" />
              ) : (
                session.name.slice(0, 2).toUpperCase()
              )}
            </div>

            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold leading-tight">{session.name}</div>
              <div className="text-[10px] text-red-400 font-semibold tracking-wider">
                {session.role.replace('_', ' ')}
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

