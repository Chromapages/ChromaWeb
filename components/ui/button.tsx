"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { trackCTAClick } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

type SharedProps = {
  variant?: "primary" | "secondary" | "tertiary";
  analyticsLabel?: string;
  analyticsLocation?: string;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = SharedProps & {
  href: string;
  target?: string;
  rel?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "className">;

type NativeButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: never;
  };

function buttonClasses(variant: NonNullable<SharedProps["variant"]>) {
  const base =
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-functional px-6 py-3 text-sm font-semibold transition-all duration-280 ease-out active:scale-[0.98]";

  switch (variant) {
    case "secondary":
      return cn(
        base,
        "border border-primary/10 bg-surface-2 text-primary hover:bg-surface-3 hover:border-primary/20",
      );
    case "tertiary":
      return cn(
        base,
        "bg-transparent px-0 text-accent hover:opacity-80 nav-underline",
      );
    case "primary":
    default:
      return cn(
        base,
        "bg-accent text-white shadow-soft hover:brightness-110 hover:-translate-y-0.5",
      );
  }
}

export default function Button(props: LinkButtonProps | NativeButtonProps) {
  const pathname = usePathname();
  const {
    variant = "primary",
    analyticsLabel,
    analyticsLocation,
    className,
    children,
    ...rest
  } = props;
  const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
  const nativeButtonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  const handleClick = () => {
    if (!analyticsLabel) {
      return;
    }

    trackCTAClick({
      label: analyticsLabel,
      location: analyticsLocation,
      destination: "href" in props ? props.href : undefined,
      pagePath: pathname,
      pageType: pathname === "/" ? "home" : "marketing",
    });
  };

  const classes = cn(buttonClasses(variant), className);
  const href = "href" in props ? props.href : undefined;
  const target = "target" in props ? props.target : undefined;
  const rel = "rel" in props ? props.rel : undefined;

  if (href) {
    const isExternal =
      href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

    if (isExternal) {
      return (
        <a
          {...anchorProps}
          href={href}
          target={target}
          rel={rel ?? (target === "_blank" ? "noreferrer" : undefined)}
          onClick={handleClick}
          className={classes}
        >
          {children}
        </a>
      );
    }

    return (
      <Link {...anchorProps} href={href} onClick={handleClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...nativeButtonProps} onClick={handleClick} className={classes}>
      {children}
    </button>
  );
}
