# BlutvAuthentication SDK utility: prepare_body
module BlutvAuthenticationUtilities
  PrepareBody = ->(ctx) {
    ctx.op.input == "data" ? ctx.utility.transform_request.call(ctx) : nil
  }
end
