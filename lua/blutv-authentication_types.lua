-- Typed models for the BlutvAuthentication SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Login
---@field email string
---@field expires_in? number
---@field password string
---@field refresh_token? string
---@field remember_me? boolean
---@field success? boolean
---@field token? string
---@field user? table

---@class LoginCreateData

---@class PasswordRecovery
---@field email string
---@field message? string
---@field success? boolean

---@class PasswordRecoveryCreateData

---@class Register
---@field email string
---@field name string
---@field password string
---@field phone? string
---@field terms_accepted? boolean

---@class RegisterCreateData

---@class SocialLogin
---@field access_token string
---@field expires_in? number
---@field provider string
---@field refresh_token? string
---@field success? boolean
---@field token? string
---@field user? table

---@class SocialLoginCreateData

local M = {}

return M
