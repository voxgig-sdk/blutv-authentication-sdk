# BlutvAuthentication TypeScript SDK



The TypeScript SDK for the BlutvAuthentication API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Login()` — each with a small set of operations (`create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/blutv-authentication-sdk/releases](https://github.com/voxgig-sdk/blutv-authentication-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { BlutvAuthenticationSDK } from '@voxgig-sdk/blutv-authentication'

const client = new BlutvAuthenticationSDK({
  apikey: process.env.BLUTV_AUTHENTICATION_APIKEY,
})
```

### 4. Create, update, and remove

```ts
// Create — returns the created Login
const created = await client.Login().create({
  email: 'example_email',
  password: 'example_password',
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const login = await client.Login().create({ email: "example", password: "example" })
  console.log(login)
} catch (err) {
  console.error('create failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = BlutvAuthenticationSDK.test()

const login = await client.Login().create({ email: 'example_email', password: 'example_password' })
// login is a bare entity populated with mock response data
console.log(login)
```

You can also use the instance method:

```ts
const client = new BlutvAuthenticationSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Login()

// First call runs the operation and stores its result
await entity.create({ email: 'example_email', password: 'example_password' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new BlutvAuthenticationSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
BLUTV_AUTHENTICATION_TEST_LIVE=TRUE
BLUTV_AUTHENTICATION_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```


## Reference

### BlutvAuthenticationSDK

#### Constructor

```ts
new BlutvAuthenticationSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Login(data?)` | `LoginEntity` | Create a Login entity instance. |
| `PasswordRecovery(data?)` | `PasswordRecoveryEntity` | Create a PasswordRecovery entity instance. |
| `Register(data?)` | `RegisterEntity` | Create a Register entity instance. |
| `SocialLogin(data?)` | `SocialLoginEntity` | Create a SocialLogin entity instance. |
| `tester(testopts?, sdkopts?)` | `BlutvAuthenticationSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `BlutvAuthenticationSDK.test(testopts?, sdkopts?)` | `BlutvAuthenticationSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): BlutvAuthenticationSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `create` resolves to a single entity object.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Login

| Field | Description |
| --- | --- |
| `email` |  |
| `expires_in` |  |
| `password` |  |
| `refresh_token` |  |
| `remember_me` |  |
| `success` |  |
| `token` |  |
| `user` |  |

Operations: create.

API path: `/auth/login`

#### PasswordRecovery

| Field | Description |
| --- | --- |
| `email` |  |
| `message` |  |
| `success` |  |

Operations: create.

API path: `/auth/password-recovery`

#### Register

| Field | Description |
| --- | --- |
| `email` |  |
| `name` |  |
| `password` |  |
| `phone` |  |
| `terms_accepted` |  |

Operations: create.

API path: `/auth/register`

#### SocialLogin

| Field | Description |
| --- | --- |
| `access_token` |  |
| `expires_in` |  |
| `provider` |  |
| `refresh_token` |  |
| `success` |  |
| `token` |  |
| `user` |  |

Operations: create.

API path: `/auth/social-login`



## Entities


### Login

Create an instance: `const login = client.Login()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `expires_in` | `number` |  |
| `password` | `string` |  |
| `refresh_token` | `string` |  |
| `remember_me` | `boolean` |  |
| `success` | `boolean` |  |
| `token` | `string` |  |
| `user` | `Record<string, any>` |  |

#### Example: Create

```ts
const login = await client.Login().create({
  email: /* string */,
  password: /* string */,
})
```


### PasswordRecovery

Create an instance: `const password_recovery = client.PasswordRecovery()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `message` | `string` |  |
| `success` | `boolean` |  |

#### Example: Create

```ts
const password_recovery = await client.PasswordRecovery().create({
  email: /* string */,
})
```


### Register

Create an instance: `const register = client.Register()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `name` | `string` |  |
| `password` | `string` |  |
| `phone` | `string` |  |
| `terms_accepted` | `boolean` |  |

#### Example: Create

```ts
const register = await client.Register().create({
  email: /* string */,
  name: /* string */,
  password: /* string */,
})
```


### SocialLogin

Create an instance: `const social_login = client.SocialLogin()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` |  |
| `expires_in` | `number` |  |
| `provider` | `string` |  |
| `refresh_token` | `string` |  |
| `success` | `boolean` |  |
| `token` | `string` |  |
| `user` | `Record<string, any>` |  |

#### Example: Create

```ts
const social_login = await client.SocialLogin().create({
  access_token: /* string */,
  provider: /* string */,
})
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
blutv-authentication/
├── src/
│   ├── BlutvAuthenticationSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { BlutvAuthenticationSDK } from '@voxgig-sdk/blutv-authentication'
```

### Entity state

Entity instances are stateful. After a successful `create`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const login = client.Login()
await login.create({ email: "example", password: "example" })

// login.data() now returns the login data from the last `create`
// login.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
