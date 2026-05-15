<?php
declare(strict_types=1);

// BlutvAuthentication SDK base feature

class BlutvAuthenticationBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(BlutvAuthenticationContext $ctx, array $options): void {}
    public function PostConstruct(BlutvAuthenticationContext $ctx): void {}
    public function PostConstructEntity(BlutvAuthenticationContext $ctx): void {}
    public function SetData(BlutvAuthenticationContext $ctx): void {}
    public function GetData(BlutvAuthenticationContext $ctx): void {}
    public function GetMatch(BlutvAuthenticationContext $ctx): void {}
    public function SetMatch(BlutvAuthenticationContext $ctx): void {}
    public function PrePoint(BlutvAuthenticationContext $ctx): void {}
    public function PreSpec(BlutvAuthenticationContext $ctx): void {}
    public function PreRequest(BlutvAuthenticationContext $ctx): void {}
    public function PreResponse(BlutvAuthenticationContext $ctx): void {}
    public function PreResult(BlutvAuthenticationContext $ctx): void {}
    public function PreDone(BlutvAuthenticationContext $ctx): void {}
    public function PreUnexpected(BlutvAuthenticationContext $ctx): void {}
}
