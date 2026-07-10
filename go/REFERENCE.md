# BlutvAuthentication Golang SDK Reference

Complete API reference for the BlutvAuthentication Golang SDK.


## BlutvAuthenticationSDK

### Constructor

```go
func NewBlutvAuthenticationSDK(options map[string]any) *BlutvAuthenticationSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *BlutvAuthenticationSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *BlutvAuthenticationSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Login(data map[string]any) BlutvAuthenticationEntity`

Create a new `Login` entity instance. Pass `nil` for no initial data.

#### `PasswordRecovery(data map[string]any) BlutvAuthenticationEntity`

Create a new `PasswordRecovery` entity instance. Pass `nil` for no initial data.

#### `Register(data map[string]any) BlutvAuthenticationEntity`

Create a new `Register` entity instance. Pass `nil` for no initial data.

#### `SocialLogin(data map[string]any) BlutvAuthenticationEntity`

Create a new `SocialLogin` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## LoginEntity

```go
login := client.Login(nil)
fmt.Println(login.GetName()) // "login"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `expires_in` | `int` | No |  |
| `password` | `string` | Yes |  |
| `refresh_token` | `string` | No |  |
| `remember_me` | `bool` | No |  |
| `success` | `bool` | No |  |
| `token` | `string` | No |  |
| `user` | `map[string]any` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Login(nil).Create(map[string]any{
    "email": "example_email",
    "password": "example_password",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LoginEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PasswordRecoveryEntity

```go
passwordRecovery := client.PasswordRecovery(nil)
fmt.Println(passwordRecovery.GetName()) // "password_recovery"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `message` | `string` | No |  |
| `success` | `bool` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.PasswordRecovery(nil).Create(map[string]any{
    "email": "example_email",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PasswordRecoveryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RegisterEntity

```go
register := client.Register(nil)
fmt.Println(register.GetName()) // "register"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `password` | `string` | Yes |  |
| `phone` | `string` | No |  |
| `terms_accepted` | `bool` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Register(nil).Create(map[string]any{
    "email": "example_email",
    "name": "example_name",
    "password": "example_password",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RegisterEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SocialLoginEntity

```go
socialLogin := client.SocialLogin(nil)
fmt.Println(socialLogin.GetName()) // "social_login"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | Yes |  |
| `expires_in` | `int` | No |  |
| `provider` | `string` | Yes |  |
| `refresh_token` | `string` | No |  |
| `success` | `bool` | No |  |
| `token` | `string` | No |  |
| `user` | `map[string]any` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.SocialLogin(nil).Create(map[string]any{
    "access_token": "example_access_token",
    "provider": "example_provider",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SocialLoginEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewBlutvAuthenticationSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

