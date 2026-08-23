# BlutvAuthentication SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
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
            "short": "Account creation timestamp",
            "type": "`$STRING`",
          },
          {
            "name": "email",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "User's email address",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique user identifier",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "User's full name",
            "type": "`$STRING`",
          },
          {
            "name": "password",
            "req": True,
            "short": "User's password",
            "type": "`$STRING`",
          },
          {
            "name": "phone",
            "short": "User's phone number",
            "type": "`$STRING`",
          },
          {
            "name": "rememberMe",
            "short": "Keep user logged in",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "subscriptionStatus",
            "short": "User's subscription status",
            "type": "`$STRING`",
          },
        ],
        "name": "login",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/auth/login",
                "parts": [
                  "auth",
                  "login",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.user`",
                },
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
            "req": True,
            "short": "Email address for password recovery",
            "type": "`$STRING`",
          },
          {
            "name": "message",
            "short": "Success message",
            "type": "`$STRING`",
          },
          {
            "name": "success",
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
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/auth/password-recovery",
                "parts": [
                  "auth",
                  "password-recovery",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "req": True,
            "short": "User's email address",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "short": "User's full name",
            "type": "`$STRING`",
          },
          {
            "name": "password",
            "req": True,
            "short": "User's password",
            "type": "`$STRING`",
          },
          {
            "name": "phone",
            "short": "User's phone number",
            "type": "`$STRING`",
          },
          {
            "name": "termsAccepted",
            "short": "User acceptance of terms and conditions",
            "type": "`$BOOLEAN`",
          },
        ],
        "name": "register",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/auth/register",
                "parts": [
                  "auth",
                  "register",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.user`",
                },
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
            "req": True,
            "short": "OAuth access token from the social provider",
            "type": "`$STRING`",
          },
          {
            "name": "createdAt",
            "short": "Account creation timestamp",
            "type": "`$STRING`",
          },
          {
            "name": "email",
            "short": "User's email address",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique user identifier",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "User's full name",
            "type": "`$STRING`",
          },
          {
            "name": "phone",
            "short": "User's phone number",
            "type": "`$STRING`",
          },
          {
            "name": "provider",
            "req": True,
            "short": "Social media provider",
            "type": "`$STRING`",
          },
          {
            "name": "subscriptionStatus",
            "short": "User's subscription status",
            "type": "`$STRING`",
          },
        ],
        "name": "social_login",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/auth/social-login",
                "parts": [
                  "auth",
                  "social-login",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.user`",
                },
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
