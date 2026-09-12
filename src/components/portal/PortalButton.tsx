"use client";

import React from "react";

export interface PortalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const PortalButton: React.FC<PortalButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  className = "",
  onClick,
  onKeyDown,
  ...props
}) => {
  const isActionDisabled = disabled || isLoading;

  let variantStyles = "bg-teal text-white hover:bg-indigo focus-visible:outline-indigo";
  if (variant === "secondary") {
    variantStyles = "bg-ink/10 text-ink hover:bg-ink/20 focus-visible:outline-ink";
  } else if (variant === "danger") {
    variantStyles = "bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600";
  } else if (variant === "outline") {
    variantStyles = "border border-ink/25 text-ink hover:bg-ink/5 focus-visible:outline-teal";
  } else if (variant === "ghost") {
    variantStyles = "text-ink hover:bg-ink/5 focus-visible:outline-teal";
  }

  let sizeStyles = "px-4 py-2 text-sm font-semibold rounded-lg";
  if (size === "sm") {
    sizeStyles = "px-3 py-1.5 text-xs font-semibold rounded-md";
  } else if (size === "lg") {
    sizeStyles = "px-6 py-3 text-base font-semibold rounded-xl";
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isActionDisabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isActionDisabled) {
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      if (onKeyDown) {
        onKeyDown(e);
      }
    }
  };

  return (
    <button
      aria-busy={isLoading}
      aria-disabled={isActionDisabled}
      className={`inline-flex items-center justify-center gap-2 font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 ${variantStyles} ${sizeStyles} ${className}`}
      disabled={isActionDisabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isActionDisabled ? -1 : 0}
      type="button"
      {...props}
    >
      {isLoading ? (
        <span
          aria-hidden="true"
          className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : null}
      {children}
    </button>
  );
};
