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
        <p className="text-label-md uppercase text-primary-container">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-headline-md text-on-surface">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-body-lg text-on-surface/72">{description}</p>
      ) : null}
    </div>
  );
}
