

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


describe('SocialLoginEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BLUTV_AUTHENTICATION_TEST_LIVE=TRUE.
  afterEach(liveDelay('BLUTV_AUTHENTICATION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = BlutvAuthenticationSDK.test()
    const ent = testsdk.SocialLogin()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = BlutvAuthenticationSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SocialLogin().create({"accessToken":1,"provider":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BLUTV_AUTHENTICATION_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'social_login.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"accessToken":{"a":true,"h":"Access Token","n":"accessToken","r":true,"sh":"OAuth access token from the social provider","t":"`$STRING`","key$":"accessToken","index$":0},"expiresIn":{"a":true,"h":"Expires In","n":"expiresIn","r":false,"sh":"Token expiration time in seconds","t":"`$INTEGER`","key$":"expiresIn","index$":1},"provider":{"a":true,"h":"Provider","n":"provider","r":true,"sh":"Social media provider","t":"`$STRING`","key$":"provider","index$":2},"refreshToken":{"a":true,"h":"Refresh Token","n":"refreshToken","r":false,"sh":"Refresh token for obtaining new access tokens","t":"`$STRING`","key$":"refreshToken","index$":3},"success":{"a":true,"h":"Success","n":"success","r":false,"t":"`$BOOLEAN`","key$":"success","index$":4},"token":{"a":true,"h":"Token","n":"token","r":false,"sh":"JWT authentication token","t":"`$STRING`","key$":"token","index$":5},"user":{"a":true,"h":"User","n":"user","r":false,"t":"`$OBJECT`","key$":"user","index$":6}},"name":"social_login","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["accessToken","provider"],"co":{"id":"POST /auth/social-login","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/auth/social-login","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"auth"},{"lit":"social-login"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"social_login","name__orig":"social_login","Name":"SocialLogin","name_":"social_login","name-":"social-login","NAME":"SOCIAL_LOGIN","index$":3}, {"active":true,"entity":"social_login","key$":"BasicSocialLoginFlow","kind":"basic","name":"BasicSocialLoginFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"social_login_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'SocialLogin', {"POST /auth/social-login":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["provider","accessToken"],"properties":{"provider":{"type":"string","enum":["facebook","google"],"description":"Social media provider","example":"facebook","key$":"provider"},"accessToken":{"type":"string","description":"OAuth access token from the social provider","example":"EAABwzLixnjYBAO...","key$":"accessToken"}},"x-ref":"#/components/schemas/SocialLoginRequest","index$":1},"examples":{"facebookLogin":{"summary":"Login with Facebook","value":{"provider":"facebook","accessToken":"EAABwzLixnjYBAO..."}},"googleLogin":{"summary":"Login with Google","value":{"provider":"google","accessToken":"ya29.a0AfH6SMBx..."}}}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const social_login_ref01_ent = client.SocialLogin()
    let social_login_ref01_data = setup.data.new.social_login['social_login_ref01']

    social_login_ref01_data = (await social_login_ref01_ent.create(social_login_ref01_data)).data()
    assert(null != social_login_ref01_data)


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
      '../../../../.sdk/test/entity/social_login/SocialLoginTestData.json')

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
    ['social_login01','social_login02','social_login03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'BLUTV_AUTHENTICATION_TEST_SOCIAL_LOGIN_ENTID': idmap,
    'BLUTV_AUTHENTICATION_TEST_LIVE': 'FALSE',
    'BLUTV_AUTHENTICATION_TEST_EXPLAIN': 'FALSE',
    'BLUTV_AUTHENTICATION_APIKEY': '',
  })

  idmap = env['BLUTV_AUTHENTICATION_TEST_SOCIAL_LOGIN_ENTID']

  const live = 'TRUE' === env.BLUTV_AUTHENTICATION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['BLUTV_AUTHENTICATION_TEST_SOCIAL_LOGIN_ENTID']
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
  
