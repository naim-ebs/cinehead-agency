import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Cine Head CMS • Control Panel',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full overflow-hidden bg-[#030712] text-slate-100 flex flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 h-screen overflow-y-auto p-6 sm:p-10">
        <div className="max-w-7xl mx-auto pb-12">
          {children}
        </div>
      </main>
    </div>
  );
}
