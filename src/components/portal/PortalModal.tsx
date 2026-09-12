"use client";

import React, {useEffect, useRef} from "react";

export interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const PortalModal: React.FC<PortalModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-xs animate-fadeIn"
      onClick={handleOverlayClick}
      role="dialog"
    >
      <div
        aria-describedby={description ? "modal-desc" : undefined}
        aria-labelledby="modal-title"
        className="w-full max-w-lg bg-canvas border border-ink/20 rounded-2xl shadow-2xl overflow-hidden focus:outline-hidden"
        ref={modalRef}
        tabIndex={-1}
      >
        <header className="px-6 py-4 border-b border-ink/10 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-bold text-ink" id="modal-title">
              {title}
            </h2>
            {description ? (
              <p className="text-xs text-ink/70 mt-0.5" id="modal-desc">
                {description}
              </p>
            ) : null}
          </div>
          <button
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-ink/60 hover:text-ink hover:bg-ink/10 focus-visible:outline-2 focus-visible:outline-teal cursor-pointer"
            onClick={onClose}
            ref={closeButtonRef}
            tabIndex={0}
            type="button"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              &times;
            </span>
          </button>
        </header>

        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
