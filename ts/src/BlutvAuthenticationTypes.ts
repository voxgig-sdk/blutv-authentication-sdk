// Typed models for the BlutvAuthentication SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Login {
  email: string
  expiresIn?: number
  password: string
  refreshToken?: string
  rememberMe?: boolean
  success?: boolean
  token?: string
  user?: Record<string, any>
}

export interface LoginCreateData {
  email: string
  expiresIn?: number
  password: string
  refreshToken?: string
  rememberMe?: boolean
  success?: boolean
  token?: string
  user?: Record<string, any>
}

export interface PasswordRecovery {
  email: string
  message?: string
  success?: boolean
}

export interface PasswordRecoveryCreateData {
  email: string
  message?: string
  success?: boolean
}

export interface Register {
  email: string
  name: string
  password: string
  phone?: string
  termsAccepted?: boolean
}

export interface RegisterCreateData {
  email: string
  name: string
  password: string
  phone?: string
  termsAccepted?: boolean
}

export interface SocialLogin {
  accessToken: string
  expiresIn?: number
  provider: string
  refreshToken?: string
  success?: boolean
  token?: string
  user?: Record<string, any>
}

export interface SocialLoginCreateData {
  accessToken: string
  expiresIn?: number
  provider: string
  refreshToken?: string
  success?: boolean
  token?: string
  user?: Record<string, any>
}

