<?php
declare(strict_types=1);

// BlutvAuthentication SDK exists test

require_once __DIR__ . '/../blutvauthentication_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = BlutvAuthenticationSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
