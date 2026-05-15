-- ProjectName SDK exists test

local sdk = require("blutv-authentication_sdk")

describe("BlutvAuthenticationSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
