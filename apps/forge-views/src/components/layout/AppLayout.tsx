import { Outlet } from "react-router-dom";

import { AppNavbar } from "./AppNavbar";

export function AppLayout() {
    return (
        <div className="min-h-screen bg-[#090909] text-white">
            {/* Global Background */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-[-200px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[180px]" />

                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
            `,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <AppNavbar />

            <main className="relative z-10 pt-24">
                <Outlet />
            </main>
        </div>
    );
}