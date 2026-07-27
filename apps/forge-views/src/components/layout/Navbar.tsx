import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "./Container";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/auth/useLogout";

export function Navbar() {
  const navigate = useNavigate();
  const logoutMutation = useLogout();
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <Container>
        <div className="mt-0 flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 backdrop-blur-xl">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 font-bold text-black shadow-[0_0_25px_rgba(255,107,0,0.45)]">
              F
            </div>

            <span className="font-['Space_Grotesk'] text-xl font-bold tracking-tight">
              Forge
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>

            <a href="#how-it-works" className="transition hover:text-white">
              How it Works
            </a>

            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Login
            </Button>

            <Button onClick={() => navigate('/signup')}>
              Signup
            </Button>

            <Button
              variant="ghost"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending
                ? "Signing Out..."
                : "Logout"}
            </Button>

          </div>
        </div>
      </Container>
    </motion.header>
  );
}