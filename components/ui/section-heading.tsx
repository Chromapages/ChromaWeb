import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-4",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="cp-heading-2 wrap-break-word">{title}</h2>
      {description ? (
        <p className="cp-intro text-pretty">{description}</p>
      ) : null}
    </div>
  );
}
