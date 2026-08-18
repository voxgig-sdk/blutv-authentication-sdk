# BlutvAuthentication SDK configuration

module BlutvAuthenticationConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "BlutvAuthentication",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://www.blutv.com/api",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "login" => {},
          "password_recovery" => {},
          "register" => {},
          "social_login" => {},
        },
      },
      "entity" => {
        "login" => {
          "fields" => [
            {
              "name" => "createdAt",
              "type" => "`$STRING`",
            },
            {
              "name" => "email",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "password",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "phone",
              "type" => "`$STRING`",
            },
            {
              "name" => "rememberMe",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "subscriptionStatus",
              "type" => "`$STRING`",
            },
          ],
          "name" => "login",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/auth/login",
                  "parts" => [
                    "auth",
                    "login",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.user`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "password_recovery" => {
          "fields" => [
            {
              "name" => "email",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "message",
              "type" => "`$STRING`",
            },
            {
              "name" => "success",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "password_recovery",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/auth/password-recovery",
                  "parts" => [
                    "auth",
                    "password-recovery",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "register" => {
          "fields" => [
            {
              "name" => "email",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "password",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "phone",
              "type" => "`$STRING`",
            },
            {
              "name" => "termsAccepted",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "register",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/auth/register",
                  "parts" => [
                    "auth",
                    "register",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.user`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "social_login" => {
          "fields" => [
            {
              "name" => "accessToken",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "createdAt",
              "type" => "`$STRING`",
            },
            {
              "name" => "email",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "phone",
              "type" => "`$STRING`",
            },
            {
              "name" => "provider",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "subscriptionStatus",
              "type" => "`$STRING`",
            },
          ],
          "name" => "social_login",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/auth/social-login",
                  "parts" => [
                    "auth",
                    "social-login",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.user`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    BlutvAuthenticationFeatures.make_feature(name)
  end
end
