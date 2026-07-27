export function AuthDivider() {
    return (
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/10" />
        </div>
  
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#0A0A0A] px-3 text-zinc-500">
            or
          </span>
        </div>
      </div>
    );
  }