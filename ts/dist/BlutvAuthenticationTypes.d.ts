export interface Login {
    email: string;
    expiresIn?: number;
    password: string;
    refreshToken?: string;
    rememberMe?: boolean;
    success?: boolean;
    token?: string;
    user?: Record<string, any>;
}
export interface LoginCreateData {
    email: string;
    expiresIn?: number;
    password: string;
    refreshToken?: string;
    rememberMe?: boolean;
    success?: boolean;
    token?: string;
    user?: Record<string, any>;
}
export interface PasswordRecovery {
    email: string;
    message?: string;
    success?: boolean;
}
export interface PasswordRecoveryCreateData {
    email: string;
    message?: string;
    success?: boolean;
}
export interface Register {
    email: string;
    name: string;
    password: string;
    phone?: string;
    termsAccepted?: boolean;
}
export interface RegisterCreateData {
    email: string;
    name: string;
    password: string;
    phone?: string;
    termsAccepted?: boolean;
}
export interface SocialLogin {
    accessToken: string;
    expiresIn?: number;
    provider: string;
    refreshToken?: string;
    success?: boolean;
    token?: string;
    user?: Record<string, any>;
}
export interface SocialLoginCreateData {
    accessToken: string;
    expiresIn?: number;
    provider: string;
    refreshToken?: string;
    success?: boolean;
    token?: string;
    user?: Record<string, any>;
}
