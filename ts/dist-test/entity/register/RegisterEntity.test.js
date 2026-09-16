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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('RegisterEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when BLUTV_AUTHENTICATION_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('BLUTV_AUTHENTICATION_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.BlutvAuthenticationSDK.test();
        const ent = testsdk.Register();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.BLUTV_AUTHENTICATION_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'register.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "email", "name": "email", "req": true, "short": "User's email address", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "name", "req": true, "short": "User's full name", "type": "`$STRING`", "index$": 1 }, { "active": true, "format": "password", "name": "password", "req": true, "short": "User's password", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "phone", "req": false, "short": "User's phone number", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "termsAccepted", "req": false, "short": "User acceptance of terms and conditions", "type": "`$BOOLEAN`", "index$": 4 }], "name": "register", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /auth/register", "json": "{\"operationId\":\"registerUser\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"email\":{\"description\":\"User's email address\",\"example\":\"newuser@example.com\",\"format\":\"email\",\"type\":\"string\"},\"name\":{\"description\":\"User's full name\",\"example\":\"John Doe\",\"minLength\":2,\"type\":\"string\"},\"password\":{\"description\":\"User's password\",\"example\":\"SecurePassword123!\",\"format\":\"password\",\"minLength\":6,\"type\":\"string\"},\"phone\":{\"description\":\"User's phone number\",\"example\":\"+905551234567\",\"type\":\"string\"},\"termsAccepted\":{\"description\":\"User acceptance of terms and conditions\",\"example\":true,\"type\":\"boolean\"}},\"required\":[\"email\",\"password\",\"name\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"expiresIn\":{\"description\":\"Token expiration time in seconds\",\"example\":3600,\"type\":\"integer\"},\"refreshToken\":{\"description\":\"Refresh token for obtaining new access tokens\",\"example\":\"rt_8f9a7b6c5d4e3f2a1b0c9d8e7f6a5b4c\",\"type\":\"string\"},\"success\":{\"example\":true,\"type\":\"boolean\"},\"token\":{\"description\":\"JWT authentication token\",\"example\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\",\"type\":\"string\"},\"user\":{\"properties\":{\"createdAt\":{\"description\":\"Account creation timestamp\",\"example\":\"2023-01-15T10:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"description\":\"User's email address\",\"example\":\"user@example.com\",\"format\":\"email\",\"type\":\"string\"},\"id\":{\"description\":\"Unique user identifier\",\"example\":\"usr_123456789\",\"type\":\"string\"},\"name\":{\"description\":\"User's full name\",\"example\":\"John Doe\",\"type\":\"string\"},\"phone\":{\"description\":\"User's phone number\",\"example\":\"+905551234567\",\"type\":\"string\"},\"subscriptionStatus\":{\"description\":\"User's subscription status\",\"enum\":[\"active\",\"inactive\",\"trial\"],\"example\":\"active\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"User successfully registered\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_CREDENTIALS\",\"type\":\"string\"},\"details\":{\"items\":{\"properties\":{\"field\":{\"example\":\"email\",\"type\":\"string\"},\"message\":{\"example\":\"Email is required\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Invalid email or password\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid input or validation errors\"},\"409\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_CREDENTIALS\",\"type\":\"string\"},\"details\":{\"items\":{\"properties\":{\"field\":{\"example\":\"email\",\"type\":\"string\"},\"message\":{\"example\":\"Email is required\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Invalid email or password\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"User already exists\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT token obtained from login or social login endpoints\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/auth/register", "segments": [{ "lit": "auth" }, { "lit": "register" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.user`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "register", "name__orig": "register", "Name": "Register", "name_": "register", "name-": "register", "NAME": "REGISTER", "index$": 2 }, { "active": true, "entity": "register", "key$": "BasicRegisterFlow", "kind": "basic", "name": "BasicRegisterFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "register_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'Register');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const register_ref01_ent = client.Register();
        let register_ref01_data = setup.data.new.register['register_ref01'];
        register_ref01_data = (await register_ref01_ent.create(register_ref01_data)).data();
        (0, node_assert_1.default)(null != register_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/register/RegisterTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.BlutvAuthenticationSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['register01', 'register02', 'register03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'BLUTV_AUTHENTICATION_TEST_REGISTER_ENTID': idmap,
        'BLUTV_AUTHENTICATION_TEST_LIVE': 'FALSE',
        'BLUTV_AUTHENTICATION_TEST_EXPLAIN': 'FALSE',
        'BLUTV_AUTHENTICATION_APIKEY': '',
    });
    idmap = env['BLUTV_AUTHENTICATION_TEST_REGISTER_ENTID'];
    const live = 'TRUE' === env.BLUTV_AUTHENTICATION_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['BLUTV_AUTHENTICATION_TEST_REGISTER_ENTID'];
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
//# sourceMappingURL=RegisterEntity.test.js.map