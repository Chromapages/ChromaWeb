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
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
