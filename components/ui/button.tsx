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
  prefetch?: boolean;
  target?: string;
  rel?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "className">;

type NativeButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: never;
    prefetch?: never;
  };

function buttonClasses(variant: NonNullable<SharedProps["variant"]>) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-functional border border-transparent px-5 py-3 text-center text-sm font-semibold leading-tight transition-[color,background-color,border-color] duration-160 motion-reduce:transition-none disabled:cursor-not-allowed aria-disabled:cursor-not-allowed";

  switch (variant) {
    case "secondary":
      return cn(
        base,
        "border-ink bg-transparent text-ink hover:bg-ink hover:text-white active:bg-ink active:text-white",
      );
    case "tertiary":
      return cn(
        base,
        "px-0 text-[color:var(--cp-link,var(--color-primary))] underline underline-offset-4 hover:decoration-2",
      );
    case "primary":
    default:
      return cn(
        base,
        "border-[color:var(--cp-button-edge,transparent)] bg-accent text-white hover:bg-accent-pressed active:bg-accent-pressed disabled:bg-outline disabled:text-ink aria-disabled:bg-outline aria-disabled:text-ink",
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
    prefetch,
    onClick,
    ...rest
  } = props;
  const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
  const nativeButtonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (analyticsLabel) {
      trackCTAClick({
        label: analyticsLabel,
        location: analyticsLocation,
        destination: "href" in props ? props.href : undefined,
        pagePath: pathname,
        pageType: pathname === "/" ? "home" : "marketing",
      });
    }
    if ("href" in props && props.href) {
      props.onClick?.(event as React.MouseEvent<HTMLAnchorElement>);
    } else {
      (onClick as ButtonHTMLAttributes<HTMLButtonElement>["onClick"])?.(
        event as React.MouseEvent<HTMLButtonElement>,
      );
    }
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
      <Link {...anchorProps} href={href} prefetch={prefetch} onClick={handleClick} className={classes}>
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
