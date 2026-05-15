# BlutvAuthentication SDK exists test

require "minitest/autorun"
require_relative "../BlutvAuthentication_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = BlutvAuthenticationSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
