import {redirect} from "next/navigation";
import React from "react";

import {PortalNav} from "@/components/portal/PortalNav";
import {getCurrentSession} from "@/lib/portal/auth";

export default async function PortalLayout({children}: {children: React.ReactNode}) {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login?redirect=/portal");
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col text-ink antialiased">
      <PortalNav session={session} />
      <main className="flex-1 w-full max-w-content-wide mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
        {children}
      </main>
      <footer className="border-t border-ink/10 py-6 text-center text-xs text-ink/50">
        Chromapages Customer Workspace &bull; Private Client Portal &bull; All rights reserved
      </footer>
    </div>
  );
}
