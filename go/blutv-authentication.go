package voxgigblutvauthenticationsdk

import (
	"github.com/voxgig-sdk/blutv-authentication-sdk/core"
	"github.com/voxgig-sdk/blutv-authentication-sdk/entity"
	"github.com/voxgig-sdk/blutv-authentication-sdk/feature"
	_ "github.com/voxgig-sdk/blutv-authentication-sdk/utility"
)

// Type aliases preserve external API.
type BlutvAuthenticationSDK = core.BlutvAuthenticationSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type BlutvAuthenticationEntity = core.BlutvAuthenticationEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type BlutvAuthenticationError = core.BlutvAuthenticationError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewLoginEntityFunc = func(client *core.BlutvAuthenticationSDK, entopts map[string]any) core.BlutvAuthenticationEntity {
		return entity.NewLoginEntity(client, entopts)
	}
	core.NewPasswordRecoveryEntityFunc = func(client *core.BlutvAuthenticationSDK, entopts map[string]any) core.BlutvAuthenticationEntity {
		return entity.NewPasswordRecoveryEntity(client, entopts)
	}
	core.NewRegisterEntityFunc = func(client *core.BlutvAuthenticationSDK, entopts map[string]any) core.BlutvAuthenticationEntity {
		return entity.NewRegisterEntity(client, entopts)
	}
	core.NewSocialLoginEntityFunc = func(client *core.BlutvAuthenticationSDK, entopts map[string]any) core.BlutvAuthenticationEntity {
		return entity.NewSocialLoginEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewBlutvAuthenticationSDK = core.NewBlutvAuthenticationSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
