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
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] rememberMe
#   @return [Boolean, nil]
#
# @!attribute [rw] subscriptionStatus
#   @return [String, nil]
Login = Struct.new(
  :createdAt,
  :email,
  :id,
  :name,
  :password,
  :phone,
  :rememberMe,
  :subscriptionStatus,
  keyword_init: true
)

# Request payload for Login#create.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] rememberMe
#   @return [Boolean, nil]
#
# @!attribute [rw] subscriptionStatus
#   @return [String, nil]
LoginCreateData = Struct.new(
  :createdAt,
  :email,
  :id,
  :name,
  :password,
  :phone,
  :rememberMe,
  :subscriptionStatus,
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
# @!attribute [rw] termsAccepted
#   @return [Boolean, nil]
Register = Struct.new(
  :email,
  :name,
  :password,
  :phone,
  :termsAccepted,
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
# @!attribute [rw] termsAccepted
#   @return [Boolean, nil]
RegisterCreateData = Struct.new(
  :email,
  :name,
  :password,
  :phone,
  :termsAccepted,
  keyword_init: true
)

# SocialLogin entity data model.
#
# @!attribute [rw] accessToken
#   @return [String]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] subscriptionStatus
#   @return [String, nil]
SocialLogin = Struct.new(
  :accessToken,
  :createdAt,
  :email,
  :id,
  :name,
  :phone,
  :provider,
  :subscriptionStatus,
  keyword_init: true
)

# Request payload for SocialLogin#create.
#
# @!attribute [rw] accessToken
#   @return [String]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] subscriptionStatus
#   @return [String, nil]
SocialLoginCreateData = Struct.new(
  :accessToken,
  :createdAt,
  :email,
  :id,
  :name,
  :phone,
  :provider,
  :subscriptionStatus,
  keyword_init: true
)

