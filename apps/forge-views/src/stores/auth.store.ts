import { create } from "zustand";

import type { User } from "@/types/auth.types";
import { persist } from "zustand/middleware";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;

    isAuthenticated: boolean;
    isInitializing: boolean;
    hasHydrated: any;

    login: (
        accessToken: string,
        refreshToken: string,
        user: User,
    ) => void;

    logout: () => void;

    setAccessToken: (token: string | null) => void;
    setRefreshToken: (token: string | null) => void;
    setUser: (user: User | null) => void;
    setHasHydrated: (value: any) => void;
    setInitializing: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            user: null,

            isAuthenticated: false,
            isInitializing: true,

            hasHydrated: false,

            setHasHydrated: (value) =>
                set({
                    hasHydrated: value,
                }),

            login: (accessToken, refreshToken, user) =>
                set({
                    accessToken,
                    refreshToken,
                    user,
                    isAuthenticated: true,
                    isInitializing: false,
                }),

            logout: () =>
                set({
                    accessToken: null,
                    refreshToken: null,
                    user: null,
                    isAuthenticated: false,
                    isInitializing: false,
                }),

            setAccessToken: (token) =>
                set({
                    accessToken: token,
                }),

            setRefreshToken: (token) =>
                set({
                    refreshToken: token,
                }),

            setUser: (user) =>
                set({
                    user,
                    isAuthenticated: !!user,
                }),

            setInitializing: (value) =>
                set({
                    isInitializing: value,
                }),
        }),
        {
            name: "forge-auth",

            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),

            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        },
    ),
);