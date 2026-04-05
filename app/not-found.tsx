import Link from "next/link";
import Button from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-center px-6 py-20 text-center md:px-8">
      <p className="text-label-md uppercase text-primary-container">404</p>
      <h1 className="mt-4 font-display text-4xl text-on-surface md:text-display-lg">
        This page does not exist.
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-body-lg text-on-surface/72">
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
        <Link href="/work" className="text-sm text-primary-container underline-offset-4 hover:underline">
          View work
        </Link>
      </div>
    </main>
  );
}
