<?php
declare(strict_types=1);

// BlutvAuthentication SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

BlutvAuthenticationUtility::setRegistrar(function (BlutvAuthenticationUtility $u): void {
    $u->clean = [BlutvAuthenticationClean::class, 'call'];
    $u->done = [BlutvAuthenticationDone::class, 'call'];
    $u->make_error = [BlutvAuthenticationMakeError::class, 'call'];
    $u->feature_add = [BlutvAuthenticationFeatureAdd::class, 'call'];
    $u->feature_hook = [BlutvAuthenticationFeatureHook::class, 'call'];
    $u->feature_init = [BlutvAuthenticationFeatureInit::class, 'call'];
    $u->fetcher = [BlutvAuthenticationFetcher::class, 'call'];
    $u->make_fetch_def = [BlutvAuthenticationMakeFetchDef::class, 'call'];
    $u->make_context = [BlutvAuthenticationMakeContext::class, 'call'];
    $u->make_options = [BlutvAuthenticationMakeOptions::class, 'call'];
    $u->make_request = [BlutvAuthenticationMakeRequest::class, 'call'];
    $u->make_response = [BlutvAuthenticationMakeResponse::class, 'call'];
    $u->make_result = [BlutvAuthenticationMakeResult::class, 'call'];
    $u->make_point = [BlutvAuthenticationMakePoint::class, 'call'];
    $u->make_spec = [BlutvAuthenticationMakeSpec::class, 'call'];
    $u->make_url = [BlutvAuthenticationMakeUrl::class, 'call'];
    $u->param = [BlutvAuthenticationParam::class, 'call'];
    $u->prepare_auth = [BlutvAuthenticationPrepareAuth::class, 'call'];
    $u->prepare_body = [BlutvAuthenticationPrepareBody::class, 'call'];
    $u->prepare_headers = [BlutvAuthenticationPrepareHeaders::class, 'call'];
    $u->prepare_method = [BlutvAuthenticationPrepareMethod::class, 'call'];
    $u->prepare_params = [BlutvAuthenticationPrepareParams::class, 'call'];
    $u->prepare_path = [BlutvAuthenticationPreparePath::class, 'call'];
    $u->prepare_query = [BlutvAuthenticationPrepareQuery::class, 'call'];
    $u->result_basic = [BlutvAuthenticationResultBasic::class, 'call'];
    $u->result_body = [BlutvAuthenticationResultBody::class, 'call'];
    $u->result_headers = [BlutvAuthenticationResultHeaders::class, 'call'];
    $u->transform_request = [BlutvAuthenticationTransformRequest::class, 'call'];
    $u->transform_response = [BlutvAuthenticationTransformResponse::class, 'call'];
});
