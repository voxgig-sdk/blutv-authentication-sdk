<?php
declare(strict_types=1);

// BlutvAuthentication SDK utility: prepare_body

class BlutvAuthenticationPrepareBody
{
    public static function call(BlutvAuthenticationContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
