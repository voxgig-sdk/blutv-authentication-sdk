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
    password: string;
    rememberMe?: boolean;
}
export interface PasswordRecovery {
    email: string;
    message?: string;
    success?: boolean;
}
export interface PasswordRecoveryCreateData {
    email: string;
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
    provider: string;
}
