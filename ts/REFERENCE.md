# BlutvAuthentication TypeScript SDK Reference

Complete API reference for the BlutvAuthentication TypeScript SDK.


## BlutvAuthenticationSDK

### Constructor

```ts
new BlutvAuthenticationSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `BlutvAuthenticationSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = BlutvAuthenticationSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `BlutvAuthenticationSDK` instance in test mode.


### Instance Methods

#### `Login(data?: object)`

Create a new `Login` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LoginEntity` instance.

#### `PasswordRecovery(data?: object)`

Create a new `PasswordRecovery` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PasswordRecoveryEntity` instance.

#### `Register(data?: object)`

Create a new `Register` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RegisterEntity` instance.

#### `SocialLogin(data?: object)`

Create a new `SocialLogin` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SocialLoginEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `BlutvAuthenticationSDK.test()`.

**Returns:** `BlutvAuthenticationSDK` instance in test mode.


---

## LoginEntity

```ts
const login = client.Login()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No | Account creation timestamp |
| `email` | `string` | No | User's email address |
| `id` | `string` | No | Unique user identifier |
| `name` | `string` | No | User's full name |
| `password` | `string` | Yes | User's password |
| `phone` | `string` | No | User's phone number |
| `rememberMe` | `boolean` | No | Keep user logged in |
| `subscriptionStatus` | `string` | No | User's subscription status |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `createdAt` | - |
| `email` | Yes |
| `id` | - |
| `name` | - |
| `password` | - |
| `phone` | - |
| `rememberMe` | - |
| `subscriptionStatus` | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Login().create({
  password: 'example_password',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LoginEntity` instance with the same client and
options.

#### `client()`

Return the parent `BlutvAuthenticationSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PasswordRecoveryEntity

```ts
const password_recovery = client.PasswordRecovery()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes | Email address for password recovery |
| `message` | `string` | No | Success message |
| `success` | `boolean` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.PasswordRecovery().create({
  email: 'example_email',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PasswordRecoveryEntity` instance with the same client and
options.

#### `client()`

Return the parent `BlutvAuthenticationSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RegisterEntity

```ts
const register = client.Register()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes | User's email address |
| `name` | `string` | Yes | User's full name |
| `password` | `string` | Yes | User's password |
| `phone` | `string` | No | User's phone number |
| `termsAccepted` | `boolean` | No | User acceptance of terms and conditions |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Register().create({
  email: 'example_email',
  name: 'example_name',
  password: 'example_password',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RegisterEntity` instance with the same client and
options.

#### `client()`

Return the parent `BlutvAuthenticationSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SocialLoginEntity

```ts
const social_login = client.SocialLogin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accessToken` | `string` | Yes | OAuth access token from the social provider |
| `createdAt` | `string` | No | Account creation timestamp |
| `email` | `string` | No | User's email address |
| `id` | `string` | No | Unique user identifier |
| `name` | `string` | No | User's full name |
| `phone` | `string` | No | User's phone number |
| `provider` | `string` | Yes | Social media provider |
| `subscriptionStatus` | `string` | No | User's subscription status |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.SocialLogin().create({
  accessToken: 'example_accessToken',
  provider: 'example_provider',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SocialLoginEntity` instance with the same client and
options.

#### `client()`

Return the parent `BlutvAuthenticationSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new BlutvAuthenticationSDK({
  feature: {
    test: { active: true },
  }
})
```

