import { motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  FolderKanban,
  LayoutDashboard,
  Search,
  History
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "./Container";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { useLogout } from "@/hooks/auth/useLogout";

export function AppNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = useLogout();

  const { user } = useAuthStore();

  const navigation = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      name: "Projects",
      icon: FolderKanban,
      href: "/projects",
    },
    {
      name: "Submissions",
      icon: History,
      href: "/submissions",
    },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <Container>
        <div className=" flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-6 backdrop-blur-xl">

          {/* Logo */}

          <div
            onClick={() => navigate("/dashboard")}
            className="flex cursor-pointer items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 font-bold text-black shadow-[0_0_25px_rgba(249,115,22,.45)]">
              F
            </div>

            <span className="font-['Space_Grotesk'] text-xl font-bold">
              Forge
            </span>
          </div>

          {/* Navigation */}

          <nav className="hidden items-center gap-2 lg:flex">
            {navigation.map((item) => {
              const Icon = item.icon;

              const active = location.pathname.startsWith(item.href);

              return (
                <button
                  key={item.href}
                  onClick={() => navigate(item.href)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-all ${active
                      ? "bg-orange-500/15 text-orange-400"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <Icon size={17} />

                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Right */}

          <div className="flex items-center gap-3">

            {/* Search */}

            <button className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition hover:border-orange-500/30 hover:text-orange-400 lg:flex">
              <Search size={18} />
            </button>

            {/* Notification */}

            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition hover:border-orange-500/30 hover:text-orange-400">
              <Bell size={18} />
            </button>

            {/* User */}

            <button className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition hover:border-orange-500/20">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 font-semibold text-black">
                {user?.firstName?.charAt(0) ?? "F"}
              </div>

              <div className="hidden text-left lg:block">
                <p className="text-sm font-medium">
                  {user?.firstName}
                </p>

                <p className="text-xs text-zinc-500">
                  Engineer
                </p>
              </div>

              <ChevronDown
                size={16}
                className="hidden text-zinc-500 lg:block"
              />
            </button>

            <Button
              variant="ghost"
              onClick={() => logout.mutate()}
            >
              Logout
            </Button>
          </div>
        </div>
      </Container>
    </motion.header>
  );
}