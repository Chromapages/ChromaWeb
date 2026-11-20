import Link from "next/link";
import Button from "@/components/ui/button";

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="cp-container cp-section flex min-h-[70vh] flex-col items-center justify-center text-center"
    >
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="cp-heading-1 mt-4 text-ink">
        This page does not exist.
      </h1>
      <p className="cp-intro mt-6">
        The page you tried to open may have moved, been removed, or never existed in the
        first place.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button href="/" analyticsLabel="Back home" analyticsLocation="not-found">
          Back home
        </Button>
        <Button
          href="/contact"
          variant="secondary"
          analyticsLabel="Contact"
          analyticsLocation="not-found"
        >
          Contact
        </Button>
      </div>
      <div className="mt-8">
        <Link href="/work" className="cp-text-link">
          View work
        </Link>
      </div>
    </main>
  );
}
