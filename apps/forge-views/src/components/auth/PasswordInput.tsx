import { type ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  placeholder?: string;
  icon?: ReactNode;
  registration: UseFormRegisterReturn;
  error?: string;
}

export function PasswordInput({
  placeholder,
  icon,
  registration,
  error,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="relative mt-2">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}

        <Input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className={`h-14 rounded-2xl bg-zinc-900/60 pl-12 pr-12 text-base transition-all ${
            error
              ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-4 focus-visible:ring-red-500/10"
              : "border-white/10 focus-visible:border-orange-500 focus-visible:ring-4 focus-visible:ring-orange-500/10"
          }`}
          {...registration}
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-white"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}