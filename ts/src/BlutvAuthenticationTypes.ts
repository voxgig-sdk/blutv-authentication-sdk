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

export type LoginCreateData = Partial<Login>

export interface PasswordRecovery {
  email: string
  message?: string
  success?: boolean
}

export type PasswordRecoveryCreateData = Partial<PasswordRecovery>

export interface Register {
  email: string
  name: string
  password: string
  phone?: string
  terms_accepted?: boolean
}

export type RegisterCreateData = Partial<Register>

export interface SocialLogin {
  access_token: string
  expires_in?: number
  provider: string
  refresh_token?: string
  success?: boolean
  token?: string
  user?: Record<string, any>
}

export type SocialLoginCreateData = Partial<SocialLogin>

