// Typed models for the BlutvAuthentication SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Login is the typed data model for the login entity.
type Login struct {
	Email string `json:"email"`
	ExpiresIn *int `json:"expires_in,omitempty"`
	Password string `json:"password"`
	RefreshToken *string `json:"refresh_token,omitempty"`
	RememberMe *bool `json:"remember_me,omitempty"`
	Success *bool `json:"success,omitempty"`
	Token *string `json:"token,omitempty"`
	User *map[string]any `json:"user,omitempty"`
}

// LoginCreateData mirrors the login fields as an all-optional match
// filter (Go analog of Partial<Login>).
type LoginCreateData struct {
	Email *string `json:"email,omitempty"`
	ExpiresIn *int `json:"expires_in,omitempty"`
	Password *string `json:"password,omitempty"`
	RefreshToken *string `json:"refresh_token,omitempty"`
	RememberMe *bool `json:"remember_me,omitempty"`
	Success *bool `json:"success,omitempty"`
	Token *string `json:"token,omitempty"`
	User *map[string]any `json:"user,omitempty"`
}

// PasswordRecovery is the typed data model for the password_recovery entity.
type PasswordRecovery struct {
	Email string `json:"email"`
	Message *string `json:"message,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// PasswordRecoveryCreateData mirrors the password_recovery fields as an all-optional match
// filter (Go analog of Partial<PasswordRecovery>).
type PasswordRecoveryCreateData struct {
	Email *string `json:"email,omitempty"`
	Message *string `json:"message,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// Register is the typed data model for the register entity.
type Register struct {
	Email string `json:"email"`
	Name string `json:"name"`
	Password string `json:"password"`
	Phone *string `json:"phone,omitempty"`
	TermsAccepted *bool `json:"terms_accepted,omitempty"`
}

// RegisterCreateData mirrors the register fields as an all-optional match
// filter (Go analog of Partial<Register>).
type RegisterCreateData struct {
	Email *string `json:"email,omitempty"`
	Name *string `json:"name,omitempty"`
	Password *string `json:"password,omitempty"`
	Phone *string `json:"phone,omitempty"`
	TermsAccepted *bool `json:"terms_accepted,omitempty"`
}

// SocialLogin is the typed data model for the social_login entity.
type SocialLogin struct {
	AccessToken string `json:"access_token"`
	ExpiresIn *int `json:"expires_in,omitempty"`
	Provider string `json:"provider"`
	RefreshToken *string `json:"refresh_token,omitempty"`
	Success *bool `json:"success,omitempty"`
	Token *string `json:"token,omitempty"`
	User *map[string]any `json:"user,omitempty"`
}

// SocialLoginCreateData mirrors the social_login fields as an all-optional match
// filter (Go analog of Partial<SocialLogin>).
type SocialLoginCreateData struct {
	AccessToken *string `json:"access_token,omitempty"`
	ExpiresIn *int `json:"expires_in,omitempty"`
	Provider *string `json:"provider,omitempty"`
	RefreshToken *string `json:"refresh_token,omitempty"`
	Success *bool `json:"success,omitempty"`
	Token *string `json:"token,omitempty"`
	User *map[string]any `json:"user,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
