import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  code: string;
  className?: string;
  speed?: number;
}

export function CodeEditor({
  code,
  className,
  speed = 18,
}: CodeEditorProps) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let index = 0;

    setDisplay("");

    const interval = setInterval(() => {
      setDisplay(code.slice(0, index + 1));
      index++;

      if (index >= code.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [code, speed]);

  return (
    <pre
      className={cn(
        "overflow-x-auto text-left font-mono text-[15px] leading-8 text-zinc-300",
        className
      )}
    >
      {display}
      <span className="animate-pulse text-orange-500">|</span>
    </pre>
  );
}