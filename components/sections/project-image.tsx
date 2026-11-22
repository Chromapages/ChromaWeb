"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [failedSrc, setFailedSrc] = useState<string>();
  if (failedSrc === src) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      sizes="(min-width: 1440px) 843px, (min-width: 1024px) calc(66.67vw - 72px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
      className="col-span-full h-auto w-full rounded-structural lg:col-span-8"
      onError={() => setFailedSrc(src)}
    />
  );
}
