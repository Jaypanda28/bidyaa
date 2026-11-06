'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  ClipboardList,
  BookOpen,
  FileCheck2,
  Receipt,
  Bell,
  HelpCircle,
  Video,
  Clock,
  Award,
  Layers,
  Building,
  CheckCircle2,
  DollarSign,
} from 'lucide-react';
import { AuthSession } from '@/lib/auth';

interface Props {
  role: string;
  session: AuthSession;
}

export default function DashboardSidebar({ role, session }: Props) {
  const pathname = usePathname();

  const isCurrent = (path: string) => {
    if (path === pathname) return true;
    if (path !== '/dashboard' && pathname.startsWith(path)) return true;
    return false;
  };

  const getNavLinks = () => {
    switch (role) {
      case 'SUPER_ADMIN':
        return [
          { name: 'Central Dashboard', href: '/dashboard/super-admin', icon: LayoutDashboard },
          { name: 'Students Directory', href: '/dashboard/super-admin/students', icon: GraduationCap },
          { name: 'Faculty & Mentors', href: '/dashboard/super-admin/faculty', icon: Users },
          { name: 'Batches & Timetable', href: '/dashboard/super-admin/batches', icon: Layers },
          { name: 'Admissions & Enquiries', href: '/dashboard/super-admin/enquiries', icon: ClipboardList },
          { name: 'Attendance Matrix', href: '/dashboard/super-admin/attendance', icon: Calendar },
          { name: 'Exams & Question Bank', href: '/dashboard/super-admin/exams', icon: FileCheck2 },
          { name: 'Fees & Collections', href: '/dashboard/super-admin/fees', icon: Receipt },
          { name: 'Announcements', href: '/dashboard/super-admin/announcements', icon: Bell },
        ];

      case 'BRANCH_ADMIN':
        return [
          { name: 'Branch Overview', href: '/dashboard/branch-admin', icon: LayoutDashboard },
          { name: 'Branch Students', href: '/dashboard/super-admin/students', icon: GraduationCap },
          { name: 'Batch Schedules', href: '/dashboard/super-admin/batches', icon: Layers },
          { name: 'Attendance Logs', href: '/dashboard/super-admin/attendance', icon: Calendar },
          { name: 'Local Enquiries', href: '/dashboard/super-admin/enquiries', icon: ClipboardList },
        ];

      case 'PRINCIPAL':
        return [
          { name: 'Academic Dean Desk', href: '/dashboard/principal', icon: LayoutDashboard },
          { name: 'Faculty Allocations', href: '/dashboard/super-admin/faculty', icon: Users },
          { name: 'Batches & Syllabus', href: '/dashboard/super-admin/batches', icon: Layers },
          { name: 'Exam Analytics', href: '/dashboard/super-admin/exams', icon: Award },
          { name: 'Students Directory', href: '/dashboard/super-admin/students', icon: GraduationCap },
        ];

      case 'FACULTY':
        return [
          { name: 'Faculty Desk', href: '/dashboard/faculty', icon: LayoutDashboard },
          { name: 'Mark Batch Attendance', href: '/dashboard/faculty/attendance', icon: Calendar },
          { name: 'Study Materials (PDF)', href: '/dashboard/faculty/materials', icon: BookOpen },
          { name: 'Tests & Question Bank', href: '/dashboard/faculty/tests', icon: FileCheck2 },
          { name: 'Student Doubts', href: '/dashboard/faculty/doubts', icon: HelpCircle },
        ];

      case 'STUDENT':
        return [
          { name: 'Student Portal', href: '/dashboard/student', icon: LayoutDashboard },
          { name: 'Study Materials (PDF)', href: '/dashboard/student/materials', icon: BookOpen },
          { name: 'Recorded Video Classes', href: '/dashboard/student/lectures', icon: Video },
          { name: 'Online CBT Mock Tests', href: '/dashboard/student/exams', icon: FileCheck2 },
          { name: 'My Attendance', href: '/dashboard/student/attendance', icon: Calendar },
          { name: 'Submit Homework', href: '/dashboard/student/assignments', icon: ClipboardList },
          { name: 'Ask a Doubt', href: '/dashboard/student/doubts', icon: HelpCircle },
          { name: 'Fee Dues & Receipts', href: '/dashboard/student/fees', icon: Receipt },
        ];

      case 'PARENT':
        return [
          { name: 'Parent Portal', href: '/dashboard/parent', icon: LayoutDashboard },
          { name: 'Child Attendance', href: '/dashboard/parent/attendance', icon: Calendar },
          { name: 'Test Scorecards', href: '/dashboard/parent/results', icon: Award },
          { name: 'Fee Summary & Pay', href: '/dashboard/parent/fees', icon: Receipt },
          { name: 'Circulars & Notices', href: '/dashboard/parent/notices', icon: Bell },
        ];

      case 'ACCOUNTANT':
        return [
          { name: 'Accounts Desk', href: '/dashboard/accountant', icon: LayoutDashboard },
          { name: 'Fee Collections & Receipts', href: '/dashboard/super-admin/fees', icon: Receipt },
          { name: 'Fee Structures', href: '/dashboard/accountant/structures', icon: DollarSign },
          { name: 'Student Fee Ledgers', href: '/dashboard/super-admin/students', icon: GraduationCap },
        ];

      default:
        return [
          { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between p-4 flex-shrink-0">
      <div className="space-y-6">
        {/* Role identification badge */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Current Workspace
          </div>
          <div className="font-extrabold text-slate-800 text-sm mt-0.5">
            {role.replace('_', ' ')}
          </div>
          {session.studentId && (
            <div className="text-[11px] font-mono text-red-600 font-bold mt-0.5">
              ID: {session.studentId}
            </div>
          )}
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const active = isCurrent(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-red-600 text-white shadow-sm shadow-red-600/25 font-bold'
                    : 'text-slate-600 hover:text-red-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center space-y-1">
        <div className="font-bold text-slate-700">Bidya Classes ERP v2.0</div>
        <div>Bhubaneswar, Odisha</div>
      </div>
    </aside>
  );
}

