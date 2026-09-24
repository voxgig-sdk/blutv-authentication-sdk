# BlutvAuthentication SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "BlutvAuthentication",
            "slug": "blutv-authentication",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://www.blutv.com/api",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "login": {},
                "password_recovery": {},
                "register": {},
                "social_login": {},
            },
        },
        "entity": {
      "login": {
        "fields": [
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "Account creation timestamp",
            "format": "date-time",
          },
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "User's email address",
            "format": "email",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique user identifier",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "User's full name",
          },
          {
            "name": "password",
            "title": "Password",
            "type": "`$STRING`",
            "req": True,
            "short": "User's password",
            "format": "password",
          },
          {
            "name": "phone",
            "title": "Phone",
            "type": "`$STRING`",
            "short": "User's phone number",
          },
          {
            "name": "rememberMe",
            "title": "Remember Me",
            "type": "`$BOOLEAN`",
            "short": "Keep user logged in",
          },
          {
            "name": "subscriptionStatus",
            "title": "Subscription Status",
            "type": "`$STRING`",
            "short": "User's subscription status",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "login",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/auth/login",
                "segments": [
                  {
                    "lit": "auth",
                  },
                  {
                    "lit": "login",
                  },
                ],
                "parts": [
                  "auth",
                  "login",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.user`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "password_recovery": {
        "fields": [
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "req": True,
            "short": "Email address for password recovery",
            "format": "email",
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "short": "Success message",
          },
          {
            "name": "success",
            "title": "Success",
            "type": "`$BOOLEAN`",
          },
        ],
        "name": "password_recovery",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/auth/password-recovery",
                "segments": [
                  {
                    "lit": "auth",
                  },
                  {
                    "lit": "password-recovery",
                  },
                ],
                "parts": [
                  "auth",
                  "password-recovery",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "register": {
        "fields": [
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "req": True,
            "short": "User's email address",
            "format": "email",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "User's full name",
          },
          {
            "name": "password",
            "title": "Password",
            "type": "`$STRING`",
            "req": True,
            "short": "User's password",
            "format": "password",
          },
          {
            "name": "phone",
            "title": "Phone",
            "type": "`$STRING`",
            "short": "User's phone number",
          },
          {
            "name": "termsAccepted",
            "title": "Terms Accepted",
            "type": "`$BOOLEAN`",
            "short": "User acceptance of terms and conditions",
          },
        ],
        "name": "register",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/auth/register",
                "segments": [
                  {
                    "lit": "auth",
                  },
                  {
                    "lit": "register",
                  },
                ],
                "parts": [
                  "auth",
                  "register",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.user`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "social_login": {
        "fields": [
          {
            "name": "accessToken",
            "title": "Access Token",
            "type": "`$STRING`",
            "req": True,
            "short": "OAuth access token from the social provider",
          },
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "Account creation timestamp",
            "format": "date-time",
          },
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "short": "User's email address",
            "format": "email",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique user identifier",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "User's full name",
          },
          {
            "name": "phone",
            "title": "Phone",
            "type": "`$STRING`",
            "short": "User's phone number",
          },
          {
            "name": "provider",
            "title": "Provider",
            "type": "`$STRING`",
            "req": True,
            "short": "Social media provider",
          },
          {
            "name": "subscriptionStatus",
            "title": "Subscription Status",
            "type": "`$STRING`",
            "short": "User's subscription status",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "social_login",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/auth/social-login",
                "segments": [
                  {
                    "lit": "auth",
                  },
                  {
                    "lit": "social-login",
                  },
                ],
                "parts": [
                  "auth",
                  "social-login",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.user`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
