"use client";

import React, {useCallback, useEffect, useState} from "react";

export type PageStackProps = {
  children?: React.ReactNode;
  items?: React.ReactNode[];
  className?: string;
  dark?: boolean;
  autoPlayInterval?: number;
  ariaLabel?: string;
};

export const PageStack = ({
  children,
  items,
  className = "",
  dark = false,
  autoPlayInterval = 5000,
  ariaLabel = "Interactive layered feature cards",
}: PageStackProps) => {
  const cardList = items && items.length > 0
    ? items
    : React.Children.toArray(children).filter(Boolean);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalCards = cardList.length;

  const handleNext = useCallback(() => {
    if (totalCards <= 1) return;
    setActiveIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const handlePrev = useCallback(() => {
    if (totalCards <= 1) return;
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (totalCards <= 1) return;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      handleNext();
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      handlePrev();
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNext();
    }
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleFocus = () => setIsPaused(true);
  const handleBlur = () => setIsPaused(false);

  useEffect(() => {
    if (totalCards <= 1 || autoPlayInterval <= 0 || isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [totalCards, autoPlayInterval, isPaused, handleNext, activeIndex]);

  // Backward compatibility & single-card fallback
  if (totalCards <= 1) {
    return (
      <div className={`relative inline-block w-full ${className}`}>
        {/* Back Layer - Teal Outline */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 translate-x-2 -translate-y-2 rounded-xl border sm:translate-x-3 sm:-translate-y-3 ${
            dark ? "border-teal/40 bg-teal/5" : "border-teal/30 bg-teal/[0.03]"
          }`}
        />

        {/* Middle Layer - Indigo Outline */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 translate-x-1 -translate-y-1 rounded-xl border sm:translate-x-1.5 sm:-translate-y-1.5 ${
            dark ? "border-indigo/50 bg-indigo/10" : "border-indigo/35 bg-indigo/[0.05]"
          }`}
        />

        {/* Front Layer - Primary Content */}
        <div
          className={`relative z-10 overflow-hidden rounded-xl border ${
            dark
              ? "border-white/15 bg-ink text-canvas shadow-[0_20px_56px_rgba(15,17,21,0.25)]"
              : "border-ink/10 bg-paper text-ink shadow-[0_1px_3px_rgba(15,17,21,0.06)]"
          }`}
        >
          {cardList[0] || children}
        </div>
      </div>
    );
  }

  return (
    <div
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      className={`group relative w-full select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-teal ${className}`}
      onBlur={handleBlur}
      onClick={handleNext}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      tabIndex={0}
    >
      {/* Cards container using CSS Grid overlay */}
      <div className="grid grid-cols-1 grid-rows-1">
        {cardList.map((card, index) => {
          const position = (index - activeIndex + totalCards) % totalCards;
          const isActive = position === 0;
          const isMiddle = position === 1;
          const isBack = position === 2;

          let layerClasses = "";
          let contentOpacityClasses = "";

          if (isActive) {
            layerClasses = dark
              ? "z-30 translate-x-0 translate-y-0 scale-100 opacity-100 border-white/15 bg-ink text-canvas shadow-[0_20px_56px_rgba(15,17,21,0.35)]"
              : "z-30 translate-x-0 translate-y-0 scale-100 opacity-100 border-ink/10 bg-paper text-ink shadow-[0_1px_3px_rgba(15,17,21,0.06)]";
            contentOpacityClasses = "opacity-100 transition-opacity duration-300";
          } else if (isMiddle) {
            layerClasses = dark
              ? "z-20 translate-x-1 -translate-y-1 sm:translate-x-1.5 sm:-translate-y-1.5 scale-[0.99] opacity-100 border-indigo/50 bg-indigo/10 text-transparent pointer-events-none"
              : "z-20 translate-x-1 -translate-y-1 sm:translate-x-1.5 sm:-translate-y-1.5 scale-[0.99] opacity-100 border-indigo/35 bg-indigo/[0.05] text-transparent pointer-events-none";
            contentOpacityClasses = "opacity-0 transition-opacity duration-300 pointer-events-none select-none";
          } else if (isBack) {
            layerClasses = dark
              ? "z-10 translate-x-2 -translate-y-2 sm:translate-x-3 sm:-translate-y-3 scale-[0.98] opacity-100 border-teal/40 bg-teal/5 text-transparent pointer-events-none"
              : "z-10 translate-x-2 -translate-y-2 sm:translate-x-3 sm:-translate-y-3 scale-[0.98] opacity-100 border-teal/30 bg-teal/[0.03] text-transparent pointer-events-none";
            contentOpacityClasses = "opacity-0 transition-opacity duration-300 pointer-events-none select-none";
          } else {
            layerClasses = dark
              ? "z-0 translate-x-3 -translate-y-3 sm:translate-x-4 sm:-translate-y-4 scale-95 opacity-0 border-teal/40 bg-teal/5 text-transparent pointer-events-none"
              : "z-0 translate-x-3 -translate-y-3 sm:translate-x-4 sm:-translate-y-4 scale-95 opacity-0 border-teal/30 bg-teal/[0.03] text-transparent pointer-events-none";
            contentOpacityClasses = "opacity-0 transition-opacity duration-300 pointer-events-none select-none";
          }

          return (
            <div
              key={index}
              aria-hidden={!isActive}
              className={`col-start-1 row-start-1 overflow-hidden rounded-xl border transition-all duration-500 ease-out will-change-transform ${layerClasses}`}
            >
              <div className={contentOpacityClasses}>
                {card}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Pagination / Step Indicators */}
      <div
        aria-label="Stack pagination controls"
        className="mt-4 flex items-center justify-between px-1"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          {cardList.map((_, dotIndex) => {
            const isDotActive = dotIndex === activeIndex;
            return (
              <button
                key={dotIndex}
                aria-label={`Show card ${dotIndex + 1} of ${totalCards}`}
                className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-teal ${
                  isDotActive
                    ? "w-8 bg-white/20"
                    : dark
                    ? "w-2 bg-white/20 hover:bg-white/40"
                    : "w-2 bg-ink/20 hover:bg-ink/40"
                }`}
                onClick={() => handleSelect(dotIndex)}
                type="button"
              >
                {isDotActive && (
                  <span
                    key={`progress-${activeIndex}-${isPaused ? "paused" : "running"}`}
                    className="absolute inset-y-0 left-0 rounded-full bg-teal"
                    style={{
                      animation: !isPaused
                        ? `expandWidth ${autoPlayInterval}ms linear forwards`
                        : "none",
                      width: isPaused ? "100%" : undefined,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <span className="font-display text-[11px] font-medium tracking-wider text-canvas/50">
          0{activeIndex + 1} / 0{totalCards} • <span className="text-teal/80">Cycles every 5s</span>
        </span>
      </div>
    </div>
  );
};

