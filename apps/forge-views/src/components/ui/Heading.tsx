import { cn } from "@/lib/utils";

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export function Heading({
  children,
  className,
}: HeadingProps) {
  return (
    <h2
      className={cn(
        "font-['Space_Grotesk'] text-5xl font-bold leading-tight tracking-tight lg:text-6xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}