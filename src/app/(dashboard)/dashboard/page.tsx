import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default async function DashboardRedirectPage() {
  const session = await getCurrentUser();

  if (!session) {
    redirect('/login');
  }

  switch (session.role) {
    case 'SUPER_ADMIN':
      redirect('/dashboard/super-admin');
    case 'BRANCH_ADMIN':
      redirect('/dashboard/branch-admin');
    case 'PRINCIPAL':
      redirect('/dashboard/principal');
    case 'FACULTY':
      redirect('/dashboard/faculty');
    case 'STUDENT':
      redirect('/dashboard/student');
    case 'PARENT':
      redirect('/dashboard/parent');
    case 'ACCOUNTANT':
      redirect('/dashboard/accountant');
    default:
      redirect('/dashboard/student');
  }
}

