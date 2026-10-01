-- Typed models for the BlutvAuthentication SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Login
---@field email string
---@field expiresIn? number
---@field password string
---@field refreshToken? string
---@field rememberMe? boolean
---@field success? boolean
---@field token? string
---@field user? table

---@class LoginCreateData
---@field email string
---@field expiresIn? number
---@field password string
---@field refreshToken? string
---@field rememberMe? boolean
---@field success? boolean
---@field token? string
---@field user? table

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
---@field expiresIn? number
---@field provider string
---@field refreshToken? string
---@field success? boolean
---@field token? string
---@field user? table

---@class SocialLoginCreateData
---@field accessToken string
---@field expiresIn? number
---@field provider string
---@field refreshToken? string
---@field success? boolean
---@field token? string
---@field user? table

local M = {}

return M
