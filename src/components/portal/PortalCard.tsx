import React from "react";

export interface PortalCardProps {
  title?: string;
  subtitle?: string;
  badge?: React.ReactNode;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  id?: string;
}

export const PortalCard: React.FC<PortalCardProps> = ({
  title,
  subtitle,
  badge,
  headerAction,
  children,
  footer,
  className = "",
  id,
}) => {
  return (
    <section
      aria-labelledby={id && title ? `${id}-title` : undefined}
      className={`border border-ink/15 rounded-xl bg-canvas shadow-xs overflow-hidden ${className}`}
      id={id}
    >
      {title || subtitle || headerAction ? (
        <header className="px-5 py-4 border-b border-ink/10 flex flex-wrap items-center justify-between gap-3 bg-ink/[0.02]">
          <div>
            <div className="flex items-center gap-2">
              {title ? (
                <h3
                  className="font-display text-base font-bold text-ink"
                  id={id && title ? `${id}-title` : undefined}
                >
                  {title}
                </h3>
              ) : null}
              {badge}
            </div>
            {subtitle ? <p className="text-xs text-ink/65 mt-0.5">{subtitle}</p> : null}
          </div>
          {headerAction ? <div className="shrink-0">{headerAction}</div> : null}
        </header>
      ) : null}

      <div className="p-5">{children}</div>

      {footer ? (
        <footer className="px-5 py-3 border-t border-ink/10 bg-ink/[0.02] flex items-center justify-between text-xs text-ink/65">
          {footer}
        </footer>
      ) : null}
    </section>
  );
};
