

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"accessToken","req":true,"short":"OAuth access token from the social provider","type":"`$STRING`","index$":0},{"active":true,"format":"date-time","name":"createdAt","req":false,"short":"Account creation timestamp","type":"`$STRING`","index$":1},{"active":true,"format":"email","name":"email","req":false,"short":"User's email address","type":"`$STRING`","index$":2},{"active":true,"name":"id","req":false,"short":"Unique user identifier","type":"`$STRING`","index$":3},{"active":true,"name":"name","req":false,"short":"User's full name","type":"`$STRING`","index$":4},{"active":true,"name":"phone","req":false,"short":"User's phone number","type":"`$STRING`","index$":5},{"active":true,"name":"provider","req":true,"short":"Social media provider","type":"`$STRING`","index$":6},{"active":true,"name":"subscriptionStatus","req":false,"short":"User's subscription status","type":"`$STRING`","index$":7}],"id":{"field":"id","name":"id"},"name":"social_login","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /auth/social-login","json":"{\"operationId\":\"socialLogin\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"facebookLogin\":{\"summary\":\"Login with Facebook\",\"value\":{\"accessToken\":\"EAABwzLixnjYBAO...\",\"provider\":\"facebook\"}},\"googleLogin\":{\"summary\":\"Login with Google\",\"value\":{\"accessToken\":\"ya29.a0AfH6SMBx...\",\"provider\":\"google\"}}},\"schema\":{\"properties\":{\"accessToken\":{\"description\":\"OAuth access token from the social provider\",\"example\":\"EAABwzLixnjYBAO...\",\"type\":\"string\"},\"provider\":{\"description\":\"Social media provider\",\"enum\":[\"facebook\",\"google\"],\"example\":\"facebook\",\"type\":\"string\"}},\"required\":[\"provider\",\"accessToken\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"expiresIn\":{\"description\":\"Token expiration time in seconds\",\"example\":3600,\"type\":\"integer\"},\"refreshToken\":{\"description\":\"Refresh token for obtaining new access tokens\",\"example\":\"rt_8f9a7b6c5d4e3f2a1b0c9d8e7f6a5b4c\",\"type\":\"string\"},\"success\":{\"example\":true,\"type\":\"boolean\"},\"token\":{\"description\":\"JWT authentication token\",\"example\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\",\"type\":\"string\"},\"user\":{\"properties\":{\"createdAt\":{\"description\":\"Account creation timestamp\",\"example\":\"2023-01-15T10:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"description\":\"User's email address\",\"example\":\"user@example.com\",\"format\":\"email\",\"type\":\"string\"},\"id\":{\"description\":\"Unique user identifier\",\"example\":\"usr_123456789\",\"type\":\"string\"},\"name\":{\"description\":\"User's full name\",\"example\":\"John Doe\",\"type\":\"string\"},\"phone\":{\"description\":\"User's phone number\",\"example\":\"+905551234567\",\"type\":\"string\"},\"subscriptionStatus\":{\"description\":\"User's subscription status\",\"enum\":[\"active\",\"inactive\",\"trial\"],\"example\":\"active\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successfully authenticated via social provider\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_CREDENTIALS\",\"type\":\"string\"},\"details\":{\"items\":{\"properties\":{\"field\":{\"example\":\"email\",\"type\":\"string\"},\"message\":{\"example\":\"Email is required\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Invalid email or password\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid provider or token\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_CREDENTIALS\",\"type\":\"string\"},\"details\":{\"items\":{\"properties\":{\"field\":{\"example\":\"email\",\"type\":\"string\"},\"message\":{\"example\":\"Email is required\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Invalid email or password\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Invalid or expired social token\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT token obtained from login or social login endpoints\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/auth/social-login","segments":[{"lit":"auth"},{"lit":"social-login"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.user`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"social_login","name__orig":"social_login","Name":"SocialLogin","name_":"social_login","name-":"social-login","NAME":"SOCIAL_LOGIN","index$":3}, {"active":true,"entity":"social_login","key$":"BasicSocialLoginFlow","kind":"basic","name":"BasicSocialLoginFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"social_login_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'SocialLogin')
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
  
