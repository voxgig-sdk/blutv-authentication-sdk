-- Typed models for the BlutvAuthentication SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Login
---@field createdAt? string
---@field email? string
---@field id? string
---@field name? string
---@field password string
---@field phone? string
---@field rememberMe? boolean
---@field subscriptionStatus? string

---@class LoginCreateData
---@field createdAt? string
---@field email? string
---@field id? string
---@field name? string
---@field password string
---@field phone? string
---@field rememberMe? boolean
---@field subscriptionStatus? string

---@class PasswordRecovery
---@field email string
---@field message? string
---@field success? boolean

---@class PasswordRecoveryCreateData
---@field email string
---@field message? string
---@field success? boolean

---@class Register
---@field email string
---@field name string
---@field password string
---@field phone? string
---@field termsAccepted? boolean

---@class RegisterCreateData
---@field email string
---@field name string
---@field password string
---@field phone? string
---@field termsAccepted? boolean

---@class SocialLogin
---@field accessToken string
---@field createdAt? string
---@field email? string
---@field id? string
---@field name? string
---@field phone? string
---@field provider string
---@field subscriptionStatus? string

---@class SocialLoginCreateData
---@field accessToken string
---@field createdAt? string
---@field email? string
---@field id? string
---@field name? string
---@field phone? string
---@field provider string
---@field subscriptionStatus? string

local M = {}

return M
