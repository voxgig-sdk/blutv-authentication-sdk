"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('LoginEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when BLUTV_AUTHENTICATION_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('BLUTV_AUTHENTICATION_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.BlutvAuthenticationSDK.test();
        const ent = testsdk.Login();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.BLUTV_AUTHENTICATION_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'login.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": false, "sh": "Account creation timestamp", "t": "`$STRING`", "key$": "createdAt", "index$": 0 }, "email": { "a": true, "fo": "email", "h": "Email", "n": "email", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "User's email address", "t": "`$STRING`", "key$": "email", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique user identifier", "t": "`$STRING`", "key$": "id", "index$": 2 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "User's full name", "t": "`$STRING`", "key$": "name", "index$": 3 }, "password": { "a": true, "fo": "password", "h": "Password", "n": "password", "r": true, "sh": "User's password", "t": "`$STRING`", "key$": "password", "index$": 4 }, "phone": { "a": true, "h": "Phone", "n": "phone", "r": false, "sh": "User's phone number", "t": "`$STRING`", "key$": "phone", "index$": 5 }, "rememberMe": { "a": true, "h": "Remember Me", "n": "rememberMe", "r": false, "sh": "Keep user logged in", "t": "`$BOOLEAN`", "key$": "rememberMe", "index$": 6 }, "subscriptionStatus": { "a": true, "h": "Subscription Status", "n": "subscriptionStatus", "r": false, "sh": "User's subscription status", "t": "`$STRING`", "key$": "subscriptionStatus", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "login", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /auth/login", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/auth/login", "q": {}, "r": {}, "s": [{ "lit": "auth" }, { "lit": "login" }], "t": { "req": "`reqdata`", "res": "`body.user`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "login", "name__orig": "login", "Name": "Login", "name_": "login", "name-": "login", "NAME": "LOGIN", "index$": 0 }, { "active": true, "entity": "login", "key$": "BasicLoginFlow", "kind": "basic", "name": "BasicLoginFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "login_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Login', { "POST /auth/login": { "protocol": "http", "operationId": "loginUser", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["email", "password"], "properties": { "email": { "type": "string", "format": "email", "description": "User's email address or username", "example": "user@example.com", "key$": "email" }, "password": { "type": "string", "format": "password", "description": "User's password", "minLength": 6, "example": "SecurePassword123!", "key$": "password" }, "rememberMe": { "type": "boolean", "description": "Keep user logged in", "default": false, "key$": "rememberMe" } }, "x-ref": "#/components/schemas/LoginRequest", "index$": 1 }, "examples": { "emailLogin": { "summary": "Login with email", "value": { "email": "user@example.com", "password": "SecurePassword123!" } } } } } }, "responses": { "200": { "description": "Successfully authenticated", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": true }, "token": { "type": "string", "description": "JWT authentication token", "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }, "refreshToken": { "type": "string", "description": "Refresh token for obtaining new access tokens", "example": "rt_8f9a7b6c5d4e3f2a1b0c9d8e7f6a5b4c" }, "user": { "type": "object", "properties": { "id": { "type": "string", "description": "Unique user identifier", "example": "usr_123456789", "key$": "id" }, "email": { "type": "string", "format": "email", "description": "User's email address", "example": "user@example.com", "key$": "email" }, "name": { "type": "string", "description": "User's full name", "example": "John Doe", "key$": "name" }, "phone": { "type": "string", "description": "User's phone number", "example": "+905551234567", "key$": "phone" }, "subscriptionStatus": { "type": "string", "enum": ["active", "inactive", "trial"], "description": "User's subscription status", "example": "active", "key$": "subscriptionStatus" }, "createdAt": { "type": "string", "format": "date-time", "description": "Account creation timestamp", "example": "2023-01-15T10:30:00Z", "key$": "createdAt" } }, "x-ref": "#/components/schemas/User", "index$": 0 }, "expiresIn": { "type": "integer", "description": "Token expiration time in seconds", "example": 3600 } }, "x-ref": "#/components/schemas/AuthSuccessResponse" } } } }, "400": { "description": "Bad request - invalid input", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code", "example": "INVALID_CREDENTIALS" }, "message": { "type": "string", "description": "Human-readable error message", "example": "Invalid email or password" }, "details": { "type": "array", "items": { "type": "object", "properties": { "field": { "type": "string", "example": "email" }, "message": { "type": "string", "example": "Email is required" } } } } } } }, "x-ref": "#/components/schemas/ErrorResponse" } } } }, "401": { "description": "Invalid credentials", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code", "example": "INVALID_CREDENTIALS" }, "message": { "type": "string", "description": "Human-readable error message", "example": "Invalid email or password" }, "details": { "type": "array", "items": { "type": "object", "properties": { "field": { "type": "string", "example": "email" }, "message": { "type": "string", "example": "Email is required" } } } } } } }, "x-ref": "#/components/schemas/ErrorResponse" } } } }, "429": { "description": "Too many requests", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code", "example": "INVALID_CREDENTIALS" }, "message": { "type": "string", "description": "Human-readable error message", "example": "Invalid email or password" }, "details": { "type": "array", "items": { "type": "object", "properties": { "field": { "type": "string", "example": "email" }, "message": { "type": "string", "example": "Email is required" } } } } } } }, "x-ref": "#/components/schemas/ErrorResponse" } } } } }, "parameters": [], "securitySource": "unspecified", "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "JWT token obtained from login or social login endpoints" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const login_ref01_ent = client.Login();
        let login_ref01_data = setup.data.new.login['login_ref01'];
        login_ref01_data = (await login_ref01_ent.create(login_ref01_data)).data();
        (0, node_assert_1.default)(null != login_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/login/LoginTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.BlutvAuthenticationSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['login01', 'login02', 'login03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'BLUTV_AUTHENTICATION_TEST_LOGIN_ENTID': idmap,
        'BLUTV_AUTHENTICATION_TEST_LIVE': 'FALSE',
        'BLUTV_AUTHENTICATION_TEST_EXPLAIN': 'FALSE',
        'BLUTV_AUTHENTICATION_APIKEY': '',
    });
    idmap = env['BLUTV_AUTHENTICATION_TEST_LOGIN_ENTID'];
    const live = 'TRUE' === env.BLUTV_AUTHENTICATION_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['BLUTV_AUTHENTICATION_TEST_LOGIN_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.BlutvAuthenticationSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.BLUTV_AUTHENTICATION_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.BLUTV_AUTHENTICATION_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=LoginEntity.test.js.map