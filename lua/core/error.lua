-- BlutvAuthentication SDK error

local BlutvAuthenticationError = {}
BlutvAuthenticationError.__index = BlutvAuthenticationError


function BlutvAuthenticationError.new(code, msg, ctx)
  local self = setmetatable({}, BlutvAuthenticationError)
  self.is_sdk_error = true
  self.sdk = "BlutvAuthentication"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function BlutvAuthenticationError:error()
  return self.msg
end


function BlutvAuthenticationError:__tostring()
  return self.msg
end


return BlutvAuthenticationError
