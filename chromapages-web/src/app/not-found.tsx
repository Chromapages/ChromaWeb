import Link from "next/link";
import { Button } from "@/components/ui";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center px-6 bg-[var(--brand-base)]">
            <div className="text-center max-w-md">
                {/* 404 Display */}
                <div className="relative mb-8">
                    <span className="text-[12rem] font-heading font-extrabold text-[var(--brand-primary)]/5 leading-none select-none">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-heading font-bold text-[var(--brand-primary)]">
                            Oops!
                        </span>
                    </div>
                </div>

                <h1 className="heading-section text-2xl text-[var(--brand-ink)] mb-4">
                    Page Not Found
                </h1>

                <p className="text-gray-600 mb-10">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <Button leftIcon={<Home className="w-4 h-4" />}>
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button variant="secondary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                            Contact Us
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
