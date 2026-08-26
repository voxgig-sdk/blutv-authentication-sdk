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
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
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
              'name' => 'createdAt',
              'short' => 'Account creation timestamp',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'email',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'User\'s email address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique user identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'User\'s full name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'password',
              'req' => true,
              'short' => 'User\'s password',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'phone',
              'short' => 'User\'s phone number',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'rememberMe',
              'short' => 'Keep user logged in',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'subscriptionStatus',
              'short' => 'User\'s subscription status',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'login',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/auth/login',
                  'parts' => [
                    'auth',
                    'login',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.user`',
                  ],
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
              'req' => true,
              'short' => 'Email address for password recovery',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'message',
              'short' => 'Success message',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'success',
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
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/auth/password-recovery',
                  'parts' => [
                    'auth',
                    'password-recovery',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
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
              'req' => true,
              'short' => 'User\'s email address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'short' => 'User\'s full name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'password',
              'req' => true,
              'short' => 'User\'s password',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'phone',
              'short' => 'User\'s phone number',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'termsAccepted',
              'short' => 'User acceptance of terms and conditions',
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'register',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/auth/register',
                  'parts' => [
                    'auth',
                    'register',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.user`',
                  ],
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
              'req' => true,
              'short' => 'OAuth access token from the social provider',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'createdAt',
              'short' => 'Account creation timestamp',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'email',
              'short' => 'User\'s email address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique user identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'User\'s full name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'phone',
              'short' => 'User\'s phone number',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'provider',
              'req' => true,
              'short' => 'Social media provider',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'subscriptionStatus',
              'short' => 'User\'s subscription status',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'social_login',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/auth/social-login',
                  'parts' => [
                    'auth',
                    'social-login',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.user`',
                  ],
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
