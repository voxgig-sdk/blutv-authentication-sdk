<?php
declare(strict_types=1);

// BlutvAuthentication SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class BlutvAuthenticationMakeContext
{
    public static function call(array $ctxmap, ?BlutvAuthenticationContext $basectx): BlutvAuthenticationContext
    {
        return new BlutvAuthenticationContext($ctxmap, $basectx);
    }
}
