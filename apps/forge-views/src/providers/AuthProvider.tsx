import { type PropsWithChildren, useEffect } from "react";

import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { useAuthStore } from "@/stores/auth.store";
import AppLoader from "@/components/common/AppLoader";

export default function AuthProvider({
    children,
}: PropsWithChildren) {
    const {
        accessToken,
        hasHydrated,
        setUser,
        logout,
        setInitializing,
        isInitializing,
    } = useAuthStore();

    const { data, isLoading, isSuccess, isError } = useCurrentUser(
        hasHydrated && !!accessToken,
    );

    useEffect(() => {
        // Wait until persisted state has been restored
        if (!hasHydrated) return;

        // No token => guest user
        if (!accessToken) {
            setInitializing(false);
            return;
        }

        // Wait for /me
        if (isLoading) return;

        // User fetched successfully
        if (isSuccess && data) {
            setUser(data);
            setInitializing(false);
            return;
        }

        // Refresh interceptor already tried.
        // If we're still here, authentication failed.
        if (isError) {
            logout();
        }
    }, [
        hasHydrated,
        accessToken,
        isLoading,
        isSuccess,
        isError,
        data,
        logout,
        setInitializing,
        setUser,
    ]);

    if (!hasHydrated || isInitializing) {
        return <AppLoader />;
    }

    return <>{children}</>;
}