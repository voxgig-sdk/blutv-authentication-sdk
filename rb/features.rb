# BlutvAuthentication SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module BlutvAuthenticationFeatures
  def self.make_feature(name)
    case name
    when "base"
      BlutvAuthenticationBaseFeature.new
    when "ratelimit"
      BlutvAuthenticationRatelimitFeature.new
    when "retry"
      BlutvAuthenticationRetryFeature.new
    when "test"
      BlutvAuthenticationTestFeature.new
    when "timeout"
      BlutvAuthenticationTimeoutFeature.new
    else
      BlutvAuthenticationBaseFeature.new
    end
  end
end
