<?php
declare(strict_types=1);

// PasswordRecovery entity test

require_once __DIR__ . '/../blutvauthentication_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PasswordRecoveryEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = BlutvAuthenticationSDK::test(null, null);
        $ent = $testsdk->PasswordRecovery(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = password_recovery_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "password_recovery." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set BLUTVAUTHENTICATION_TEST_PASSWORD_RECOVERY_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $password_recovery_ref01_ent = $client->PasswordRecovery(null);
        $password_recovery_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.password_recovery"), "password_recovery_ref01"));

        [$password_recovery_ref01_data_result, $err] = $password_recovery_ref01_ent->create($password_recovery_ref01_data, null);
        $this->assertNull($err);
        $password_recovery_ref01_data = Helpers::to_map($password_recovery_ref01_data_result);
        $this->assertNotNull($password_recovery_ref01_data);

    }
}

function password_recovery_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/password_recovery/PasswordRecoveryTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = BlutvAuthenticationSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["password_recovery01", "password_recovery02", "password_recovery03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("BLUTVAUTHENTICATION_TEST_PASSWORD_RECOVERY_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "BLUTVAUTHENTICATION_TEST_PASSWORD_RECOVERY_ENTID" => $idmap,
        "BLUTVAUTHENTICATION_TEST_LIVE" => "FALSE",
        "BLUTVAUTHENTICATION_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["BLUTVAUTHENTICATION_TEST_PASSWORD_RECOVERY_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["BLUTVAUTHENTICATION_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new BlutvAuthenticationSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["BLUTVAUTHENTICATION_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["BLUTVAUTHENTICATION_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
