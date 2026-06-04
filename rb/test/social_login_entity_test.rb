# SocialLogin entity test

require "minitest/autorun"
require "json"
require_relative "../BlutvAuthentication_sdk"
require_relative "runner"

class SocialLoginEntityTest < Minitest::Test
  def test_create_instance
    testsdk = BlutvAuthenticationSDK.test(nil, nil)
    ent = testsdk.SocialLogin(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = social_login_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "social_login." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set BLUTVAUTHENTICATION_TEST_SOCIAL_LOGIN_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    social_login_ref01_ent = client.SocialLogin(nil)
    social_login_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.social_login"), "social_login_ref01"))

    social_login_ref01_data_result, err = social_login_ref01_ent.create(social_login_ref01_data, nil)
    assert_nil err
    social_login_ref01_data = Helpers.to_map(social_login_ref01_data_result)
    assert !social_login_ref01_data.nil?

  end
end

def social_login_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "social_login", "SocialLoginTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = BlutvAuthenticationSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["social_login01", "social_login02", "social_login03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["BLUTVAUTHENTICATION_TEST_SOCIAL_LOGIN_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "BLUTVAUTHENTICATION_TEST_SOCIAL_LOGIN_ENTID" => idmap,
    "BLUTVAUTHENTICATION_TEST_LIVE" => "FALSE",
    "BLUTVAUTHENTICATION_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["BLUTVAUTHENTICATION_TEST_SOCIAL_LOGIN_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["BLUTVAUTHENTICATION_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = BlutvAuthenticationSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["BLUTVAUTHENTICATION_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["BLUTVAUTHENTICATION_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
