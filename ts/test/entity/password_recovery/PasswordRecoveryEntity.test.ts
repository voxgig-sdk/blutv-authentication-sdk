

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


describe('PasswordRecoveryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BLUTV_AUTHENTICATION_TEST_LIVE=TRUE.
  afterEach(liveDelay('BLUTV_AUTHENTICATION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = BlutvAuthenticationSDK.test()
    const ent = testsdk.PasswordRecovery()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BLUTV_AUTHENTICATION_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'password_recovery.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"email":{"a":true,"fo":"email","h":"Email","n":"email","r":true,"sh":"Email address for password recovery","t":"`$STRING`","key$":"email","index$":0},"message":{"a":true,"h":"Message","n":"message","r":false,"sh":"Success message","t":"`$STRING`","key$":"message","index$":1},"success":{"a":true,"h":"Success","n":"success","r":false,"t":"`$BOOLEAN`","key$":"success","index$":2}},"name":"password_recovery","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /auth/password-recovery","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/auth/password-recovery","q":{},"r":{},"s":[{"lit":"auth"},{"lit":"password-recovery"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"password_recovery","name__orig":"password_recovery","Name":"PasswordRecovery","name_":"password_recovery","name-":"password-recovery","NAME":"PASSWORD_RECOVERY","index$":1}, {"active":true,"entity":"password_recovery","key$":"BasicPasswordRecoveryFlow","kind":"basic","name":"BasicPasswordRecoveryFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"password_recovery_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'PasswordRecovery', {"POST /auth/password-recovery":{"protocol":"http","operationId":"passwordRecovery","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["email"],"properties":{"email":{"type":"string","format":"email","description":"Email address for password recovery","example":"user@example.com","key$":"email"}},"x-ref":"#/components/schemas/PasswordRecoveryRequest","index$":1}}}},"responses":{"200":{"description":"Password recovery email sent successfully","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":true,"key$":"success"},"message":{"type":"string","description":"Success message","example":"Password recovery email has been sent to your email address","key$":"message"}},"x-ref":"#/components/schemas/PasswordRecoveryResponse","index$":0}}}},"400":{"description":"Bad request - invalid email format","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code","example":"INVALID_CREDENTIALS"},"message":{"type":"string","description":"Human-readable error message","example":"Invalid email or password"},"details":{"type":"array","items":{"type":"object","properties":{"field":{"type":"string","example":"email"},"message":{"type":"string","example":"Email is required"}}}}}}},"x-ref":"#/components/schemas/ErrorResponse"}}}},"404":{"description":"User not found","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"string","description":"Error code","example":"INVALID_CREDENTIALS"},"message":{"type":"string","description":"Human-readable error message","example":"Invalid email or password"},"details":{"type":"array","items":{"type":"object","properties":{"field":{"type":"string","example":"email"},"message":{"type":"string","example":"Email is required"}}}}}}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[],"securitySource":"unspecified","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"JWT token obtained from login or social login endpoints"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const password_recovery_ref01_ent = client.PasswordRecovery()
    let password_recovery_ref01_data = setup.data.new.password_recovery['password_recovery_ref01']

    password_recovery_ref01_data = (await password_recovery_ref01_ent.create(password_recovery_ref01_data)).data()
    assert(null != password_recovery_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/password_recovery/PasswordRecoveryTestData.json')

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
    ['password_recovery01','password_recovery02','password_recovery03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'BLUTV_AUTHENTICATION_TEST_PASSWORD_RECOVERY_ENTID': idmap,
    'BLUTV_AUTHENTICATION_TEST_LIVE': 'FALSE',
    'BLUTV_AUTHENTICATION_TEST_EXPLAIN': 'FALSE',
    'BLUTV_AUTHENTICATION_APIKEY': '',
  })

  idmap = env['BLUTV_AUTHENTICATION_TEST_PASSWORD_RECOVERY_ENTID']

  const live = 'TRUE' === env.BLUTV_AUTHENTICATION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['BLUTV_AUTHENTICATION_TEST_PASSWORD_RECOVERY_ENTID']
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
  
