import { cn } from "@/lib/utils";

type TextProps = {
  children: React.ReactNode;
  className?: string;
};

export function Text({
  children,
  className,
}: TextProps) {
  return (
    <p
      className={cn(
        "text-lg leading-8 text-zinc-400",
        className,
      )}
    >
      {children}
    </p>
  );
}