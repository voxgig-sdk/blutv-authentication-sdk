# BlutvAuthentication SDK utility: make_context
require_relative '../core/context'
module BlutvAuthenticationUtilities
  MakeContext = ->(ctxmap, basectx) {
    BlutvAuthenticationContext.new(ctxmap, basectx)
  }
end
