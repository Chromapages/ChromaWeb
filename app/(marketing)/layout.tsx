import Footer from "@/components/global/footer";
import Header from "@/components/global/header";
import { getNavigation } from "@/lib/sanity/fetch";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = await getNavigation();

  return (
    <div className="flex min-h-screen flex-col">
      <Header items={navItems} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
