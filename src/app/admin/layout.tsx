import {redirect} from "next/navigation";
import React from "react";

import {AdminNav} from "@/components/portal/AdminNav";
import {getCurrentSession} from "@/lib/portal/auth";

export default async function AdminLayout({children}: {children: React.ReactNode}) {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login?redirect=/admin");
  }

  if (!session.isStaff && !session.isStudioAdmin) {
    redirect("/portal");
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col text-ink antialiased">
      <AdminNav session={session} />
      <main className="flex-1 w-full max-w-content-wide mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
        {children}
      </main>
      <footer className="border-t border-indigo/10 py-6 text-center text-xs text-ink/50 bg-indigo/[0.01]">
        Chromapages Staff Delivery Queue &bull; Restricted Studio Workspace &bull; Internal Use Only
      </footer>
    </div>
  );
}
