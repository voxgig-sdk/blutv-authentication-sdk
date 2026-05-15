<?php
declare(strict_types=1);

// BlutvAuthentication SDK utility: result_body

class BlutvAuthenticationResultBody
{
    public static function call(BlutvAuthenticationContext $ctx): ?BlutvAuthenticationResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
