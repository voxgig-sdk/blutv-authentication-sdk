# BlutvAuthentication SDK utility: feature_add
module BlutvAuthenticationUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
