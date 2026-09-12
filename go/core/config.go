package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "BlutvAuthentication",
			"slug": "blutv-authentication",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://www.blutv.com/api",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"login": map[string]any{},
				"password_recovery": map[string]any{},
				"register": map[string]any{},
				"social_login": map[string]any{},
			},
		},
		"entity": map[string]any{
			"login": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "createdAt",
						"short": "Account creation timestamp",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "email",
						"name": "email",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "User's email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique user identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "User's full name",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "password",
						"name": "password",
						"req": true,
						"short": "User's password",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phone",
						"short": "User's phone number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rememberMe",
						"short": "Keep user logged in",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "subscriptionStatus",
						"short": "User's subscription status",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "login",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/auth/login",
								"segments": []any{
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "login",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.user`",
								},
								"parts": []any{
									"auth",
									"login",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"password_recovery": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "email",
						"name": "email",
						"req": true,
						"short": "Email address for password recovery",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "message",
						"short": "Success message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "success",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "password_recovery",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/auth/password-recovery",
								"segments": []any{
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "password-recovery",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"auth",
									"password-recovery",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"register": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "email",
						"name": "email",
						"req": true,
						"short": "User's email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "User's full name",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "password",
						"name": "password",
						"req": true,
						"short": "User's password",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phone",
						"short": "User's phone number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "termsAccepted",
						"short": "User acceptance of terms and conditions",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "register",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/auth/register",
								"segments": []any{
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "register",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.user`",
								},
								"parts": []any{
									"auth",
									"register",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"social_login": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "accessToken",
						"req": true,
						"short": "OAuth access token from the social provider",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "createdAt",
						"short": "Account creation timestamp",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "email",
						"name": "email",
						"short": "User's email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique user identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "User's full name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phone",
						"short": "User's phone number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "provider",
						"req": true,
						"short": "Social media provider",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "subscriptionStatus",
						"short": "User's subscription status",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "social_login",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/auth/social-login",
								"segments": []any{
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "social-login",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.user`",
								},
								"parts": []any{
									"auth",
									"social-login",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
