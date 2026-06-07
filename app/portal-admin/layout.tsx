import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Portal Admin | Chromapages",
  description: "Internal dashboard to manage and process client request tickets.",
  robots: "noindex, nofollow",
};

export default function PortalAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 font-sans">
      {children}
    </div>
  );
}
