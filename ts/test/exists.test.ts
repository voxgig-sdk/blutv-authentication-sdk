
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { BlutvAuthenticationSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = BlutvAuthenticationSDK.test()
    equal(testsdk instanceof BlutvAuthenticationSDK, true,
      'BlutvAuthenticationSDK.test() must return a client synchronously')
  })

})
