# BlutvAuthentication SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module BlutvAuthenticationFeatures
  def self.make_feature(name)
    case name
    when "base"
      BlutvAuthenticationBaseFeature.new
    when "test"
      BlutvAuthenticationTestFeature.new
    else
      BlutvAuthenticationBaseFeature.new
    end
  end
end
