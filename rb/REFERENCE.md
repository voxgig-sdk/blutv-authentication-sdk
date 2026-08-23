# BlutvAuthentication Ruby SDK Reference

Complete API reference for the BlutvAuthentication Ruby SDK.


## BlutvAuthenticationSDK

### Constructor

```ruby
require_relative 'BlutvAuthentication_sdk'

client = BlutvAuthenticationSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `BlutvAuthenticationSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = BlutvAuthenticationSDK.test
```


### Instance Methods

#### `Login(data = nil)`

Create a new `Login` entity instance. Pass `nil` for no initial data.

#### `PasswordRecovery(data = nil)`

Create a new `PasswordRecovery` entity instance. Pass `nil` for no initial data.

#### `Register(data = nil)`

Create a new `Register` entity instance. Pass `nil` for no initial data.

#### `SocialLogin(data = nil)`

Create a new `SocialLogin` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## LoginEntity

```ruby
login = client.Login
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `String` | No | Account creation timestamp |
| `email` | `String` | No | User's email address |
| `id` | `String` | No | Unique user identifier |
| `name` | `String` | No | User's full name |
| `password` | `String` | Yes | User's password |
| `phone` | `String` | No | User's phone number |
| `rememberMe` | `Boolean` | No | Keep user logged in |
| `subscriptionStatus` | `String` | No | User's subscription status |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Login.create({
  "password" => "example_password", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LoginEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PasswordRecoveryEntity

```ruby
password_recovery = client.PasswordRecovery
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `String` | Yes | Email address for password recovery |
| `message` | `String` | No | Success message |
| `success` | `Boolean` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.PasswordRecovery.create({
  "email" => "example_email", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PasswordRecoveryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RegisterEntity

```ruby
register = client.Register
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `String` | Yes | User's email address |
| `name` | `String` | Yes | User's full name |
| `password` | `String` | Yes | User's password |
| `phone` | `String` | No | User's phone number |
| `termsAccepted` | `Boolean` | No | User acceptance of terms and conditions |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Register.create({
  "email" => "example_email", # String
  "name" => "example_name", # String
  "password" => "example_password", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RegisterEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SocialLoginEntity

```ruby
social_login = client.SocialLogin
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accessToken` | `String` | Yes | OAuth access token from the social provider |
| `createdAt` | `String` | No | Account creation timestamp |
| `email` | `String` | No | User's email address |
| `id` | `String` | No | Unique user identifier |
| `name` | `String` | No | User's full name |
| `phone` | `String` | No | User's phone number |
| `provider` | `String` | Yes | Social media provider |
| `subscriptionStatus` | `String` | No | User's subscription status |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.SocialLogin.create({
  "accessToken" => "example_accessToken", # String
  "provider" => "example_provider", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SocialLoginEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = BlutvAuthenticationSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

