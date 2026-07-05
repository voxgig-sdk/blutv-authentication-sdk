// Typed models for the BlutvAuthentication SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Login {
  email: string
  expires_in?: number
  password: string
  refresh_token?: string
  remember_me?: boolean
  success?: boolean
  token?: string
  user?: Record<string, any>
}

export interface LoginCreateData {
  email: string
  expires_in?: number
  password: string
  refresh_token?: string
  remember_me?: boolean
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
  terms_accepted?: boolean
}

export interface RegisterCreateData {
  email: string
  name: string
  password: string
  phone?: string
  terms_accepted?: boolean
}

export interface SocialLogin {
  access_token: string
  expires_in?: number
  provider: string
  refresh_token?: string
  success?: boolean
  token?: string
  user?: Record<string, any>
}

export interface SocialLoginCreateData {
  access_token: string
  expires_in?: number
  provider: string
  refresh_token?: string
  success?: boolean
  token?: string
  user?: Record<string, any>
}

