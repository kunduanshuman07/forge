import { Navigate, Outlet } from "react-router-dom";
import { type ReactNode } from "react";

import AppLoader from "@/components/common/AppLoader";
import { useAuthStore } from "@/stores/auth.store";

interface ProtectedRouteProps {
  children?: ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const {
    isAuthenticated,
    isInitializing,
    hasHydrated,
  } = useAuthStore();

  if (!hasHydrated || isInitializing) {
    return <AppLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}