

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { BlutvAuthenticationSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('RegisterEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BLUTV_AUTHENTICATION_TEST_LIVE=TRUE.
  afterEach(liveDelay('BLUTV_AUTHENTICATION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = BlutvAuthenticationSDK.test()
    const ent = testsdk.Register()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = BlutvAuthenticationSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Register().create({"email":1,"name":"x","password":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BLUTV_AUTHENTICATION_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'register.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"email":{"a":true,"fo":"email","h":"Email","n":"email","r":true,"sh":"User's email address","t":"`$STRING`","key$":"email","index$":0},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"User's full name","t":"`$STRING`","key$":"name","index$":1},"password":{"a":true,"fo":"password","h":"Password","n":"password","r":true,"sh":"User's password","t":"`$STRING`","key$":"password","index$":2},"phone":{"a":true,"h":"Phone","n":"phone","r":false,"sh":"User's phone number","t":"`$STRING`","key$":"phone","index$":3},"termsAccepted":{"a":true,"h":"Terms Accepted","n":"termsAccepted","r":false,"sh":"User acceptance of terms and conditions","t":"`$BOOLEAN`","key$":"termsAccepted","index$":4}},"name":"register","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["email","name","password","phone","termsAccepted"],"co":{"id":"POST /auth/register","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/auth/register","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"auth"},{"lit":"register"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"register","name__orig":"register","Name":"Register","name_":"register","name-":"register","NAME":"REGISTER","index$":2}, {"active":true,"entity":"register","key$":"BasicRegisterFlow","kind":"basic","name":"BasicRegisterFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"register_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Register', {"POST /auth/register":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["email","password","name"],"properties":{"email":{"type":"string","format":"email","description":"User's email address","example":"newuser@example.com","key$":"email"},"password":{"type":"string","format":"password","description":"User's password","minLength":6,"example":"SecurePassword123!","key$":"password"},"name":{"type":"string","description":"User's full name","minLength":2,"example":"John Doe","key$":"name"},"phone":{"type":"string","description":"User's phone number","example":"+905551234567","key$":"phone"},"termsAccepted":{"type":"boolean","description":"User acceptance of terms and conditions","example":true,"key$":"termsAccepted"}},"x-ref":"#/components/schemas/RegisterRequest","index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const register_ref01_ent = client.Register()
    let register_ref01_data = setup.data.new.register['register_ref01']

    register_ref01_data = (await register_ref01_ent.create(register_ref01_data)).data()
    assert(null != register_ref01_data)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/register/RegisterTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = BlutvAuthenticationSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['register01','register02','register03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'BLUTV_AUTHENTICATION_TEST_REGISTER_ENTID': idmap,
    'BLUTV_AUTHENTICATION_TEST_LIVE': 'FALSE',
    'BLUTV_AUTHENTICATION_TEST_EXPLAIN': 'FALSE',
    'BLUTV_AUTHENTICATION_APIKEY': '',
  })

  idmap = env['BLUTV_AUTHENTICATION_TEST_REGISTER_ENTID']

  const live = 'TRUE' === env.BLUTV_AUTHENTICATION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['BLUTV_AUTHENTICATION_TEST_REGISTER_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new BlutvAuthenticationSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
