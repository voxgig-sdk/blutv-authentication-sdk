# Typed models for the BlutvAuthentication SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Login:
    email: str
    password: str
    expires_in: Optional[int] = None
    refresh_token: Optional[str] = None
    remember_me: Optional[bool] = None
    success: Optional[bool] = None
    token: Optional[str] = None
    user: Optional[dict] = None


@dataclass
class LoginCreateData:
    email: Optional[str] = None
    expires_in: Optional[int] = None
    password: Optional[str] = None
    refresh_token: Optional[str] = None
    remember_me: Optional[bool] = None
    success: Optional[bool] = None
    token: Optional[str] = None
    user: Optional[dict] = None


@dataclass
class PasswordRecovery:
    email: str
    message: Optional[str] = None
    success: Optional[bool] = None


@dataclass
class PasswordRecoveryCreateData:
    email: Optional[str] = None
    message: Optional[str] = None
    success: Optional[bool] = None


@dataclass
class Register:
    email: str
    name: str
    password: str
    phone: Optional[str] = None
    terms_accepted: Optional[bool] = None


@dataclass
class RegisterCreateData:
    email: Optional[str] = None
    name: Optional[str] = None
    password: Optional[str] = None
    phone: Optional[str] = None
    terms_accepted: Optional[bool] = None


@dataclass
class SocialLogin:
    access_token: str
    provider: str
    expires_in: Optional[int] = None
    refresh_token: Optional[str] = None
    success: Optional[bool] = None
    token: Optional[str] = None
    user: Optional[dict] = None


@dataclass
class SocialLoginCreateData:
    access_token: Optional[str] = None
    expires_in: Optional[int] = None
    provider: Optional[str] = None
    refresh_token: Optional[str] = None
    success: Optional[bool] = None
    token: Optional[str] = None
    user: Optional[dict] = None

