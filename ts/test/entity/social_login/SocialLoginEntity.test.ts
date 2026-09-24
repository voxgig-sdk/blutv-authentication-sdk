

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { BlutvAuthenticationSDK, BaseFeature, stdutil } from '../../..'

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


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BLUTV_AUTHENTICATION_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'social_login.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"accessToken":{"a":true,"h":"Access Token","n":"accessToken","r":true,"sh":"OAuth access token from the social provider","t":"`$STRING`","key$":"accessToken","index$":0},"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":false,"sh":"Account creation timestamp","t":"`$STRING`","key$":"createdAt","index$":1},"email":{"a":true,"fo":"email","h":"Email","n":"email","r":false,"sh":"User's email address","t":"`$STRING`","key$":"email","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique user identifier","t":"`$STRING`","key$":"id","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"User's full name","t":"`$STRING`","key$":"name","index$":4},"phone":{"a":true,"h":"Phone","n":"phone","r":false,"sh":"User's phone number","t":"`$STRING`","key$":"phone","index$":5},"provider":{"a":true,"h":"Provider","n":"provider","r":true,"sh":"Social media provider","t":"`$STRING`","key$":"provider","index$":6},"subscriptionStatus":{"a":true,"h":"Subscription Status","n":"subscriptionStatus","r":false,"sh":"User's subscription status","t":"`$STRING`","key$":"subscriptionStatus","index$":7}},"id":{"field":"id","name":"id"},"name":"social_login","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /auth/social-login","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/auth/social-login","q":{},"r":{},"s":[{"lit":"auth"},{"lit":"social-login"}],"t":{"req":"`reqdata`","res":"`body.user`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"social_login","name__orig":"social_login","Name":"SocialLogin","name_":"social_login","name-":"social-login","NAME":"SOCIAL_LOGIN","index$":3}, {"active":true,"entity":"social_login","key$":"BasicSocialLoginFlow","kind":"basic","name":"BasicSocialLoginFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"social_login_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'SocialLogin', {"POST /auth/social-login":{"protocol":"http","operationId":"socialLogin","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["provider","accessToken"],"properties":{"provider":{"type":"string","enum":["facebook","google"],"description":"Social media provider","example":"facebook","key$":"provider"},"accessToken":{"type":"string","description":"OAuth access token from the social provider","example":"EAABwzLixnjYBAO...","key$":"accessToken"}},"x-ref":"#/components/schemas/SocialLoginRequest","index$":1},"examples":{"facebookLogin":{"summary":"Login with Facebook","value":{"provider":"facebook","accessToken":"EAABwzLixnjYBAO..."}},"googleLogin":{"summary":"Login with Google","value":{"provider":"google","accessToken":"ya29.a0AfH6SMBx..."}}}}}},"responses":{"200":{"description":"Successfully authenticated via social provider","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":true},"token":{"type":"string","description":"JWT authentication token","example":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},"refreshToken":{"type":"string","description":"Refresh token for obtaining new access tokens","example":"rt_8f9a7b6c5d4e3f2a1b0c9d8e7f6a5b4c"},"user":{"type":"object","properties":{"id":{"type":"string","description":"Unique user identifier","example":"usr_123456789","key$":"id"},"email":{"type":"string","format":"email","description":"User's email address","example":"user@example.com","key$":"email"},"name":{"type":"string","description":"User's full name","example":"John Doe","key$":"name"},"phone":{"type":"string","description":"User's phone number","example":"+905551234567","key$":"phone"},"subscriptionStatus":{"type":"string","enum":["active","inactive","trial"],"description":"User's subscription status","example":"active","key$":"subscriptionStatus"},"createdAt":{"type":"string","format":"date-time","description":"Account creation timestamp","example":"2023-01-15T10:30:00Z","key$":"createdAt"}},"x-ref":"#/components/schemas/User","index$":0},"expiresIn":{"type":"integer","description":"Token expiration time in seconds","example":3600}},"x-ref":"#/components/schemas/AuthSuccessResponse"}}}},"400":{"description":"Bad request - invalid provider or token","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code","example":"INVALID_CREDENTIALS"},"message":{"type":"string","description":"Human-readable error message","example":"Invalid email or password"},"details":{"type":"array","items":{"type":"object","properties":{"field":{"type":"string","example":"email"},"message":{"type":"string","example":"Email is required"}}}}}}},"x-ref":"#/components/schemas/ErrorResponse"}}}},"401":{"description":"Invalid or expired social token","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code","example":"INVALID_CREDENTIALS"},"message":{"type":"string","description":"Human-readable error message","example":"Invalid email or password"},"details":{"type":"array","items":{"type":"object","properties":{"field":{"type":"string","example":"email"},"message":{"type":"string","example":"Email is required"}}}}}}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[],"securitySource":"unspecified","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"JWT token obtained from login or social login endpoints"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const social_login_ref01_ent = client.SocialLogin()
    let social_login_ref01_data = setup.data.new.social_login['social_login_ref01']

    social_login_ref01_data = (await social_login_ref01_ent.create(social_login_ref01_data)).data()
    assert(null != social_login_ref01_data.id)


  })
})



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
  
