
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { BlutvAuthenticationSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await BlutvAuthenticationSDK.test()
    equal(null !== testsdk, true)
  })

})
