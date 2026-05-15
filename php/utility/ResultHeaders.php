<?php
declare(strict_types=1);

// BlutvAuthentication SDK utility: result_headers

class BlutvAuthenticationResultHeaders
{
    public static function call(BlutvAuthenticationContext $ctx): ?BlutvAuthenticationResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
