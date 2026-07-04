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

/** Match filter for Login#create (any subset of Login fields). */
class LoginCreateData
{
    public ?string $email = null;
    public ?int $expires_in = null;
    public ?string $password = null;
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

/** Match filter for PasswordRecovery#create (any subset of PasswordRecovery fields). */
class PasswordRecoveryCreateData
{
    public ?string $email = null;
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

/** Match filter for Register#create (any subset of Register fields). */
class RegisterCreateData
{
    public ?string $email = null;
    public ?string $name = null;
    public ?string $password = null;
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

/** Match filter for SocialLogin#create (any subset of SocialLogin fields). */
class SocialLoginCreateData
{
    public ?string $access_token = null;
    public ?int $expires_in = null;
    public ?string $provider = null;
    public ?string $refresh_token = null;
    public ?bool $success = null;
    public ?string $token = null;
    public ?array $user = null;
}

