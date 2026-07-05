<?php
declare(strict_types=1);

// Typed models for the BlutvAuthentication SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Login entity data model. */
class Login
{
    public string $email;
    public ?int $expires_in = null;
    public string $password;
    public ?string $refresh_token = null;
    public ?bool $remember_me = null;
    public ?bool $success = null;
    public ?string $token = null;
    public ?array $user = null;
}

/** Request payload for Login#create. */
class LoginCreateData
{
    public string $email;
    public ?int $expires_in = null;
    public string $password;
    public ?string $refresh_token = null;
    public ?bool $remember_me = null;
    public ?bool $success = null;
    public ?string $token = null;
    public ?array $user = null;
}

/** PasswordRecovery entity data model. */
class PasswordRecovery
{
    public string $email;
    public ?string $message = null;
    public ?bool $success = null;
}

/** Request payload for PasswordRecovery#create. */
class PasswordRecoveryCreateData
{
    public string $email;
    public ?string $message = null;
    public ?bool $success = null;
}

/** Register entity data model. */
class Register
{
    public string $email;
    public string $name;
    public string $password;
    public ?string $phone = null;
    public ?bool $terms_accepted = null;
}

/** Request payload for Register#create. */
class RegisterCreateData
{
    public string $email;
    public string $name;
    public string $password;
    public ?string $phone = null;
    public ?bool $terms_accepted = null;
}

/** SocialLogin entity data model. */
class SocialLogin
{
    public string $access_token;
    public ?int $expires_in = null;
    public string $provider;
    public ?string $refresh_token = null;
    public ?bool $success = null;
    public ?string $token = null;
    public ?array $user = null;
}

/** Request payload for SocialLogin#create. */
class SocialLoginCreateData
{
    public string $access_token;
    public ?int $expires_in = null;
    public string $provider;
    public ?string $refresh_token = null;
    public ?bool $success = null;
    public ?string $token = null;
    public ?array $user = null;
}

