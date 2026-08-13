// Typed models for the BlutvAuthentication SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Login {
  createdAt?: string
  email?: string
  id?: string
  name?: string
  password: string
  phone?: string
  rememberMe?: boolean
  subscriptionStatus?: string
}

export interface LoginCreateData {
  createdAt?: string
  email?: string
  id?: string
  name?: string
  password: string
  phone?: string
  rememberMe?: boolean
  subscriptionStatus?: string
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
  createdAt?: string
  email?: string
  id?: string
  name?: string
  phone?: string
  provider: string
  subscriptionStatus?: string
}

export interface SocialLoginCreateData {
  accessToken: string
  createdAt?: string
  email?: string
  id?: string
  name?: string
  phone?: string
  provider: string
  subscriptionStatus?: string
}

