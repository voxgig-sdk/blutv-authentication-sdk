# Typed models for the BlutvAuthentication SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class LoginRequired(TypedDict):
    email: str
    password: str


class Login(LoginRequired, total=False):
    expires_in: int
    refresh_token: str
    remember_me: bool
    success: bool
    token: str
    user: dict


class LoginCreateDataRequired(TypedDict):
    email: str
    password: str


class LoginCreateData(LoginCreateDataRequired, total=False):
    expires_in: int
    refresh_token: str
    remember_me: bool
    success: bool
    token: str
    user: dict


class PasswordRecoveryRequired(TypedDict):
    email: str


class PasswordRecovery(PasswordRecoveryRequired, total=False):
    message: str
    success: bool


class PasswordRecoveryCreateDataRequired(TypedDict):
    email: str


class PasswordRecoveryCreateData(PasswordRecoveryCreateDataRequired, total=False):
    message: str
    success: bool


class RegisterRequired(TypedDict):
    email: str
    name: str
    password: str


class Register(RegisterRequired, total=False):
    phone: str
    terms_accepted: bool


class RegisterCreateDataRequired(TypedDict):
    email: str
    name: str
    password: str


class RegisterCreateData(RegisterCreateDataRequired, total=False):
    phone: str
    terms_accepted: bool


class SocialLoginRequired(TypedDict):
    access_token: str
    provider: str


class SocialLogin(SocialLoginRequired, total=False):
    expires_in: int
    refresh_token: str
    success: bool
    token: str
    user: dict


class SocialLoginCreateDataRequired(TypedDict):
    access_token: str
    provider: str


class SocialLoginCreateData(SocialLoginCreateDataRequired, total=False):
    expires_in: int
    refresh_token: str
    success: bool
    token: str
    user: dict
