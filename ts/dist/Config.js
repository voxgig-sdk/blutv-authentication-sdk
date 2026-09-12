"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'BlutvAuthentication',
        slug: "blutv-authentication",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://www.blutv.com/api",
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            login: {},
            password_recovery: {},
            register: {},
            social_login: {},
        }
    };
    entity = {
        "login": {
            "fields": [
                {
                    "format": "date-time",
                    "name": "createdAt",
                    "short": "Account creation timestamp",
                    "type": "`$STRING`"
                },
                {
                    "format": "email",
                    "name": "email",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "short": "User's email address",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Unique user identifier",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "User's full name",
                    "type": "`$STRING`"
                },
                {
                    "format": "password",
                    "name": "password",
                    "req": true,
                    "short": "User's password",
                    "type": "`$STRING`"
                },
                {
                    "name": "phone",
                    "short": "User's phone number",
                    "type": "`$STRING`"
                },
                {
                    "name": "rememberMe",
                    "short": "Keep user logged in",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "subscriptionStatus",
                    "short": "User's subscription status",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
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
                            "segments": [
                                {
                                    "lit": "auth"
                                },
                                {
                                    "lit": "login"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.user`"
                            },
                            "parts": [
                                "auth",
                                "login"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "password_recovery": {
            "fields": [
                {
                    "format": "email",
                    "name": "email",
                    "req": true,
                    "short": "Email address for password recovery",
                    "type": "`$STRING`"
                },
                {
                    "name": "message",
                    "short": "Success message",
                    "type": "`$STRING`"
                },
                {
                    "name": "success",
                    "type": "`$BOOLEAN`"
                }
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
                            "segments": [
                                {
                                    "lit": "auth"
                                },
                                {
                                    "lit": "password-recovery"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "auth",
                                "password-recovery"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "register": {
            "fields": [
                {
                    "format": "email",
                    "name": "email",
                    "req": true,
                    "short": "User's email address",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "req": true,
                    "short": "User's full name",
                    "type": "`$STRING`"
                },
                {
                    "format": "password",
                    "name": "password",
                    "req": true,
                    "short": "User's password",
                    "type": "`$STRING`"
                },
                {
                    "name": "phone",
                    "short": "User's phone number",
                    "type": "`$STRING`"
                },
                {
                    "name": "termsAccepted",
                    "short": "User acceptance of terms and conditions",
                    "type": "`$BOOLEAN`"
                }
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
                            "segments": [
                                {
                                    "lit": "auth"
                                },
                                {
                                    "lit": "register"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.user`"
                            },
                            "parts": [
                                "auth",
                                "register"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "social_login": {
            "fields": [
                {
                    "name": "accessToken",
                    "req": true,
                    "short": "OAuth access token from the social provider",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "createdAt",
                    "short": "Account creation timestamp",
                    "type": "`$STRING`"
                },
                {
                    "format": "email",
                    "name": "email",
                    "short": "User's email address",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Unique user identifier",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "User's full name",
                    "type": "`$STRING`"
                },
                {
                    "name": "phone",
                    "short": "User's phone number",
                    "type": "`$STRING`"
                },
                {
                    "name": "provider",
                    "req": true,
                    "short": "Social media provider",
                    "type": "`$STRING`"
                },
                {
                    "name": "subscriptionStatus",
                    "short": "User's subscription status",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
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
                            "segments": [
                                {
                                    "lit": "auth"
                                },
                                {
                                    "lit": "social-login"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.user`"
                            },
                            "parts": [
                                "auth",
                                "social-login"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map