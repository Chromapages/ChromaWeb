"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorLabel = target.getAttribute("data-cursor");
      if (cursorLabel) {
        setLabel(cursorLabel);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="custom-cursor"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className="bg-[var(--color-swiss-black)] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 whitespace-nowrap">
        {label.replace(/-/g, " ")}
      </div>
    </div>
  );
}
