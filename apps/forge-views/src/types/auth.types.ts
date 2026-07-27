// src/types/auth.types.ts

export interface LoginDto {
    email: string;
    password: string;
}

export interface SignupDto {
    email: string;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

export interface User {
    userId: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    isEmailVerified: boolean;
}

export interface AuthPayload {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}