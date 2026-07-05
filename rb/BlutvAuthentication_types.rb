# frozen_string_literal: true

# Typed models for the BlutvAuthentication SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Login entity data model.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] expires_in
#   @return [Integer, nil]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] refresh_token
#   @return [String, nil]
#
# @!attribute [rw] remember_me
#   @return [Boolean, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [Hash, nil]
Login = Struct.new(
  :email,
  :expires_in,
  :password,
  :refresh_token,
  :remember_me,
  :success,
  :token,
  :user,
  keyword_init: true
)

# Request payload for Login#create.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] expires_in
#   @return [Integer, nil]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] refresh_token
#   @return [String, nil]
#
# @!attribute [rw] remember_me
#   @return [Boolean, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [Hash, nil]
LoginCreateData = Struct.new(
  :email,
  :expires_in,
  :password,
  :refresh_token,
  :remember_me,
  :success,
  :token,
  :user,
  keyword_init: true
)

# PasswordRecovery entity data model.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
PasswordRecovery = Struct.new(
  :email,
  :message,
  :success,
  keyword_init: true
)

# Request payload for PasswordRecovery#create.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
PasswordRecoveryCreateData = Struct.new(
  :email,
  :message,
  :success,
  keyword_init: true
)

# Register entity data model.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] terms_accepted
#   @return [Boolean, nil]
Register = Struct.new(
  :email,
  :name,
  :password,
  :phone,
  :terms_accepted,
  keyword_init: true
)

# Request payload for Register#create.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] terms_accepted
#   @return [Boolean, nil]
RegisterCreateData = Struct.new(
  :email,
  :name,
  :password,
  :phone,
  :terms_accepted,
  keyword_init: true
)

# SocialLogin entity data model.
#
# @!attribute [rw] access_token
#   @return [String]
#
# @!attribute [rw] expires_in
#   @return [Integer, nil]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] refresh_token
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [Hash, nil]
SocialLogin = Struct.new(
  :access_token,
  :expires_in,
  :provider,
  :refresh_token,
  :success,
  :token,
  :user,
  keyword_init: true
)

# Request payload for SocialLogin#create.
#
# @!attribute [rw] access_token
#   @return [String]
#
# @!attribute [rw] expires_in
#   @return [Integer, nil]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] refresh_token
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [Hash, nil]
SocialLoginCreateData = Struct.new(
  :access_token,
  :expires_in,
  :provider,
  :refresh_token,
  :success,
  :token,
  :user,
  keyword_init: true
)

