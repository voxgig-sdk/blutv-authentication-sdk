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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "email": { "a": true, "fo": "email", "h": "Email", "n": "email", "r": true, "sh": "User's email address", "t": "`$STRING`", "key$": "email", "index$": 0 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "User's full name", "t": "`$STRING`", "key$": "name", "index$": 1 }, "password": { "a": true, "fo": "password", "h": "Password", "n": "password", "r": true, "sh": "User's password", "t": "`$STRING`", "key$": "password", "index$": 2 }, "phone": { "a": true, "h": "Phone", "n": "phone", "r": false, "sh": "User's phone number", "t": "`$STRING`", "key$": "phone", "index$": 3 }, "termsAccepted": { "a": true, "h": "Terms Accepted", "n": "termsAccepted", "r": false, "sh": "User acceptance of terms and conditions", "t": "`$BOOLEAN`", "key$": "termsAccepted", "index$": 4 } }, "name": "register", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /auth/register", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/auth/register", "q": {}, "r": {}, "s": [{ "lit": "auth" }, { "lit": "register" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "register", "name__orig": "register", "Name": "Register", "name_": "register", "name-": "register", "NAME": "REGISTER", "index$": 2 }, { "active": true, "entity": "register", "key$": "BasicRegisterFlow", "kind": "basic", "name": "BasicRegisterFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "register_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Register', { "POST /auth/register": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["email", "password", "name"], "properties": { "email": { "type": "string", "format": "email", "description": "User's email address", "example": "newuser@example.com", "key$": "email" }, "password": { "type": "string", "format": "password", "description": "User's password", "minLength": 6, "example": "SecurePassword123!", "key$": "password" }, "name": { "type": "string", "description": "User's full name", "minLength": 2, "example": "John Doe", "key$": "name" }, "phone": { "type": "string", "description": "User's phone number", "example": "+905551234567", "key$": "phone" }, "termsAccepted": { "type": "boolean", "description": "User acceptance of terms and conditions", "example": true, "key$": "termsAccepted" } }, "x-ref": "#/components/schemas/RegisterRequest", "index$": 1 } } } }, "parameters": [] } });
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