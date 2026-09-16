package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewLoginEntityFunc func(client *BlutvAuthenticationSDK, entopts map[string]any) BlutvAuthenticationEntity

var NewPasswordRecoveryEntityFunc func(client *BlutvAuthenticationSDK, entopts map[string]any) BlutvAuthenticationEntity

var NewRegisterEntityFunc func(client *BlutvAuthenticationSDK, entopts map[string]any) BlutvAuthenticationEntity

var NewSocialLoginEntityFunc func(client *BlutvAuthenticationSDK, entopts map[string]any) BlutvAuthenticationEntity

