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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"req": true,
						"short": "User's email address or username",
						"format": "email",
					},
					map[string]any{
						"name": "expiresIn",
						"title": "Expires In",
						"type": "`$INTEGER`",
						"short": "Token expiration time in seconds",
					},
					map[string]any{
						"name": "password",
						"title": "Password",
						"type": "`$STRING`",
						"req": true,
						"short": "User's password",
						"format": "password",
					},
					map[string]any{
						"name": "refreshToken",
						"title": "Refresh Token",
						"type": "`$STRING`",
						"short": "Refresh token for obtaining new access tokens",
					},
					map[string]any{
						"name": "rememberMe",
						"title": "Remember Me",
						"type": "`$BOOLEAN`",
						"short": "Keep user logged in",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "token",
						"title": "Token",
						"type": "`$STRING`",
						"short": "JWT authentication token",
					},
					map[string]any{
						"name": "user",
						"title": "User",
						"type": "`$OBJECT`",
					},
				},
				"name": "login",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"auth",
									"login",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"req": true,
						"short": "Email address for password recovery",
						"format": "email",
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"short": "Success message",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
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
								"parts": []any{
									"auth",
									"password-recovery",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"req": true,
						"short": "User's email address",
						"format": "email",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "User's full name",
					},
					map[string]any{
						"name": "password",
						"title": "Password",
						"type": "`$STRING`",
						"req": true,
						"short": "User's password",
						"format": "password",
					},
					map[string]any{
						"name": "phone",
						"title": "Phone",
						"type": "`$STRING`",
						"short": "User's phone number",
					},
					map[string]any{
						"name": "termsAccepted",
						"title": "Terms Accepted",
						"type": "`$BOOLEAN`",
						"short": "User acceptance of terms and conditions",
					},
				},
				"name": "register",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"auth",
									"register",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Access Token",
						"type": "`$STRING`",
						"req": true,
						"short": "OAuth access token from the social provider",
					},
					map[string]any{
						"name": "expiresIn",
						"title": "Expires In",
						"type": "`$INTEGER`",
						"short": "Token expiration time in seconds",
					},
					map[string]any{
						"name": "provider",
						"title": "Provider",
						"type": "`$STRING`",
						"req": true,
						"short": "Social media provider",
					},
					map[string]any{
						"name": "refreshToken",
						"title": "Refresh Token",
						"type": "`$STRING`",
						"short": "Refresh token for obtaining new access tokens",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "token",
						"title": "Token",
						"type": "`$STRING`",
						"short": "JWT authentication token",
					},
					map[string]any{
						"name": "user",
						"title": "User",
						"type": "`$OBJECT`",
					},
				},
				"name": "social_login",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"auth",
									"social-login",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
