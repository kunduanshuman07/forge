import { Navigate, Outlet } from "react-router-dom";

import AppLoader from "@/components/common/AppLoader";
import { useAuthStore } from "@/stores/auth.store";

export default function ProtectedRoute() {
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

  return <Outlet />;
}