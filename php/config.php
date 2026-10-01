<?php
declare(strict_types=1);

// BlutvAuthentication SDK configuration

class BlutvAuthenticationConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "BlutvAuthentication",
                "slug" => "blutv-authentication",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://www.blutv.com/api",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "login" => [],
                    "password_recovery" => [],
                    "register" => [],
                    "social_login" => [],
                ],
            ],
            "entity" => [
        'login' => [
          'fields' => [
            [
              'name' => 'email',
              'title' => 'Email',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'User\'s email address or username',
              'format' => 'email',
            ],
            [
              'name' => 'expiresIn',
              'title' => 'Expires In',
              'type' => '`$INTEGER`',
              'short' => 'Token expiration time in seconds',
            ],
            [
              'name' => 'password',
              'title' => 'Password',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'User\'s password',
              'format' => 'password',
            ],
            [
              'name' => 'refreshToken',
              'title' => 'Refresh Token',
              'type' => '`$STRING`',
              'short' => 'Refresh token for obtaining new access tokens',
            ],
            [
              'name' => 'rememberMe',
              'title' => 'Remember Me',
              'type' => '`$BOOLEAN`',
              'short' => 'Keep user logged in',
            ],
            [
              'name' => 'success',
              'title' => 'Success',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'token',
              'title' => 'Token',
              'type' => '`$STRING`',
              'short' => 'JWT authentication token',
            ],
            [
              'name' => 'user',
              'title' => 'User',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'login',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/auth/login',
                  'segments' => [
                    [
                      'lit' => 'auth',
                    ],
                    [
                      'lit' => 'login',
                    ],
                  ],
                  'parts' => [
                    'auth',
                    'login',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'password_recovery' => [
          'fields' => [
            [
              'name' => 'email',
              'title' => 'Email',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Email address for password recovery',
              'format' => 'email',
            ],
            [
              'name' => 'message',
              'title' => 'Message',
              'type' => '`$STRING`',
              'short' => 'Success message',
            ],
            [
              'name' => 'success',
              'title' => 'Success',
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'password_recovery',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/auth/password-recovery',
                  'segments' => [
                    [
                      'lit' => 'auth',
                    ],
                    [
                      'lit' => 'password-recovery',
                    ],
                  ],
                  'parts' => [
                    'auth',
                    'password-recovery',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'register' => [
          'fields' => [
            [
              'name' => 'email',
              'title' => 'Email',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'User\'s email address',
              'format' => 'email',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'User\'s full name',
            ],
            [
              'name' => 'password',
              'title' => 'Password',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'User\'s password',
              'format' => 'password',
            ],
            [
              'name' => 'phone',
              'title' => 'Phone',
              'type' => '`$STRING`',
              'short' => 'User\'s phone number',
            ],
            [
              'name' => 'termsAccepted',
              'title' => 'Terms Accepted',
              'type' => '`$BOOLEAN`',
              'short' => 'User acceptance of terms and conditions',
            ],
          ],
          'name' => 'register',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/auth/register',
                  'segments' => [
                    [
                      'lit' => 'auth',
                    ],
                    [
                      'lit' => 'register',
                    ],
                  ],
                  'parts' => [
                    'auth',
                    'register',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'social_login' => [
          'fields' => [
            [
              'name' => 'accessToken',
              'title' => 'Access Token',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'OAuth access token from the social provider',
            ],
            [
              'name' => 'expiresIn',
              'title' => 'Expires In',
              'type' => '`$INTEGER`',
              'short' => 'Token expiration time in seconds',
            ],
            [
              'name' => 'provider',
              'title' => 'Provider',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Social media provider',
            ],
            [
              'name' => 'refreshToken',
              'title' => 'Refresh Token',
              'type' => '`$STRING`',
              'short' => 'Refresh token for obtaining new access tokens',
            ],
            [
              'name' => 'success',
              'title' => 'Success',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'token',
              'title' => 'Token',
              'type' => '`$STRING`',
              'short' => 'JWT authentication token',
            ],
            [
              'name' => 'user',
              'title' => 'User',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'social_login',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/auth/social-login',
                  'segments' => [
                    [
                      'lit' => 'auth',
                    ],
                    [
                      'lit' => 'social-login',
                    ],
                  ],
                  'parts' => [
                    'auth',
                    'social-login',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return BlutvAuthenticationFeatures::make_feature($name);
    }
}
