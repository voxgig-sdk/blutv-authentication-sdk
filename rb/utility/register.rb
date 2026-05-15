# BlutvAuthentication SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

BlutvAuthenticationUtility.registrar = ->(u) {
  u.clean = BlutvAuthenticationUtilities::Clean
  u.done = BlutvAuthenticationUtilities::Done
  u.make_error = BlutvAuthenticationUtilities::MakeError
  u.feature_add = BlutvAuthenticationUtilities::FeatureAdd
  u.feature_hook = BlutvAuthenticationUtilities::FeatureHook
  u.feature_init = BlutvAuthenticationUtilities::FeatureInit
  u.fetcher = BlutvAuthenticationUtilities::Fetcher
  u.make_fetch_def = BlutvAuthenticationUtilities::MakeFetchDef
  u.make_context = BlutvAuthenticationUtilities::MakeContext
  u.make_options = BlutvAuthenticationUtilities::MakeOptions
  u.make_request = BlutvAuthenticationUtilities::MakeRequest
  u.make_response = BlutvAuthenticationUtilities::MakeResponse
  u.make_result = BlutvAuthenticationUtilities::MakeResult
  u.make_point = BlutvAuthenticationUtilities::MakePoint
  u.make_spec = BlutvAuthenticationUtilities::MakeSpec
  u.make_url = BlutvAuthenticationUtilities::MakeUrl
  u.param = BlutvAuthenticationUtilities::Param
  u.prepare_auth = BlutvAuthenticationUtilities::PrepareAuth
  u.prepare_body = BlutvAuthenticationUtilities::PrepareBody
  u.prepare_headers = BlutvAuthenticationUtilities::PrepareHeaders
  u.prepare_method = BlutvAuthenticationUtilities::PrepareMethod
  u.prepare_params = BlutvAuthenticationUtilities::PrepareParams
  u.prepare_path = BlutvAuthenticationUtilities::PreparePath
  u.prepare_query = BlutvAuthenticationUtilities::PrepareQuery
  u.result_basic = BlutvAuthenticationUtilities::ResultBasic
  u.result_body = BlutvAuthenticationUtilities::ResultBody
  u.result_headers = BlutvAuthenticationUtilities::ResultHeaders
  u.transform_request = BlutvAuthenticationUtilities::TransformRequest
  u.transform_response = BlutvAuthenticationUtilities::TransformResponse
}
