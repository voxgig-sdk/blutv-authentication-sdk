<?php
declare(strict_types=1);

// BlutvAuthentication SDK utility: feature_add

class BlutvAuthenticationFeatureAdd
{
    public static function call(BlutvAuthenticationContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
