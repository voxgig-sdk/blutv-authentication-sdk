<?php
declare(strict_types=1);

// BlutvAuthentication SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class BlutvAuthenticationFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new BlutvAuthenticationBaseFeature();
            case "test":
                return new BlutvAuthenticationTestFeature();
            default:
                return new BlutvAuthenticationBaseFeature();
        }
    }
}
