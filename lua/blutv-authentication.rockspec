package = "voxgig-sdk-blutv-authentication"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/blutv-authentication-sdk.git"
}
description = {
  summary = "BlutvAuthentication SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["blutv-authentication_sdk"] = "blutv-authentication_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
