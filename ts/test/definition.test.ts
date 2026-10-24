import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "login",
    "accessor": "Login",
    "op": "create",
    "method": "POST",
    "path": "/auth/login",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "success": true,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "rt_8f9a7b6c5d4e3f2a1b0c9d8e7f6a5b4c",
      "user": {
        "id": "usr_123456789",
        "email": "user@example.com",
        "name": "John Doe",
        "phone": "+905551234567",
        "subscriptionStatus": "active",
        "createdAt": "2023-01-15T10:30:00Z"
      },
      "expiresIn": 3600
    },
    "idField": "id"
  },
  {
    "entity": "password_recovery",
    "accessor": "PasswordRecovery",
    "op": "create",
    "method": "POST",
    "path": "/auth/password-recovery",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "success": true,
      "message": "Password recovery email has been sent to your email address"
    },
    "idField": "id"
  },
  {
    "entity": "register",
    "accessor": "Register",
    "op": "create",
    "method": "POST",
    "path": "/auth/register",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 201,
    "sample": {
      "success": true,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "rt_8f9a7b6c5d4e3f2a1b0c9d8e7f6a5b4c",
      "user": {
        "id": "usr_123456789",
        "email": "user@example.com",
        "name": "John Doe",
        "phone": "+905551234567",
        "subscriptionStatus": "active",
        "createdAt": "2023-01-15T10:30:00Z"
      },
      "expiresIn": 3600
    },
    "idField": "id"
  },
  {
    "entity": "social_login",
    "accessor": "SocialLogin",
    "op": "create",
    "method": "POST",
    "path": "/auth/social-login",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "success": true,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "rt_8f9a7b6c5d4e3f2a1b0c9d8e7f6a5b4c",
      "user": {
        "id": "usr_123456789",
        "email": "user@example.com",
        "name": "John Doe",
        "phone": "+905551234567",
        "subscriptionStatus": "active",
        "createdAt": "2023-01-15T10:30:00Z"
      },
      "expiresIn": 3600
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
