package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/blutv-authentication-sdk/go"
	"github.com/voxgig-sdk/blutv-authentication-sdk/go/core"

	vs "github.com/voxgig-sdk/blutv-authentication-sdk/go/utility/struct"
)

func TestSocialLoginEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SocialLogin(nil)
		if ent == nil {
			t.Fatal("expected non-nil SocialLoginEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := social_loginBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "social_login." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set BLUTVAUTHENTICATION_TEST_SOCIAL_LOGIN_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		socialLoginRef01Ent := client.SocialLogin(nil)
		socialLoginRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "social_login"}, setup.data), "social_login_ref01"))

		socialLoginRef01DataResult, err := socialLoginRef01Ent.Create(socialLoginRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		socialLoginRef01Data = core.ToMapAny(socialLoginRef01DataResult)
		if socialLoginRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func social_loginBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "social_login", "SocialLoginTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read social_login test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse social_login test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"social_login01", "social_login02", "social_login03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("BLUTVAUTHENTICATION_TEST_SOCIAL_LOGIN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"BLUTVAUTHENTICATION_TEST_SOCIAL_LOGIN_ENTID": idmap,
		"BLUTVAUTHENTICATION_TEST_LIVE":      "FALSE",
		"BLUTVAUTHENTICATION_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["BLUTVAUTHENTICATION_TEST_SOCIAL_LOGIN_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["BLUTVAUTHENTICATION_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewBlutvAuthenticationSDK(core.ToMapAny(mergedOpts))
	}

	live := env["BLUTVAUTHENTICATION_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["BLUTVAUTHENTICATION_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
