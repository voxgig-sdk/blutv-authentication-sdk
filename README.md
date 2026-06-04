# BlutvAuthentication SDK

Internal sign-in, registration, password recovery, and social login endpoints for the Turkish streaming service BluTV

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About BluTV Authentication API

[BluTV](https://www.blutv.com/) is a Turkish subscription video-on-demand streaming platform. The endpoints grouped under this SDK are the browser-facing authentication routes that the BluTV web client uses to sign users in, register new accounts, recover passwords, and connect social-media identities.

What the API exposes:

- Credential login for existing BluTV subscribers.
- New-account registration.
- Password-recovery flows.
- Social login hand-off (e.g. Facebook, Google).

Operational notes: this is an internal site API rather than a documented developer product. The [FreePublicAPIs catalogue entry](https://freepublicapis.com/blutv-authentication-api) currently flags the endpoints as dead, CORS is disabled, and the base path `https://www.blutv.com/api` no longer responds normally because BluTV's catalogue has been merged into HBO Max Turkey. Treat the SDK as a historical reference rather than something to wire into production.

## Try it

**TypeScript**
```bash
npm install blutv-authentication
```

**Python**
```bash
pip install blutv-authentication-sdk
```

**PHP**
```bash
composer require voxgig/blutv-authentication-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/blutv-authentication-sdk/go
```

**Ruby**
```bash
gem install blutv-authentication-sdk
```

**Lua**
```bash
luarocks install blutv-authentication-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { BlutvAuthenticationSDK } from 'blutv-authentication'

const client = new BlutvAuthenticationSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o blutv-authentication-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "blutv-authentication": {
      "command": "/abs/path/to/blutv-authentication-mcp"
    }
  }
}
```

## Entities

The API exposes 4 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Login** | Credential-based sign-in flow for existing BluTV accounts. | `/auth/login` |
| **PasswordRecovery** | Endpoints that start and complete the forgotten-password reset journey. | `/auth/password-recovery` |
| **Register** | New-user account creation against the BluTV authentication backend. | `/auth/register` |
| **SocialLogin** | OAuth-style hand-off for signing in with a linked social-media account (e.g. Facebook, Google). | `/auth/social-login` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from blutvauthentication_sdk import BlutvAuthenticationSDK

client = BlutvAuthenticationSDK({})

```

### PHP

```php
<?php
require_once 'blutvauthentication_sdk.php';

$client = new BlutvAuthenticationSDK([]);

```

### Golang

```go
import sdk "github.com/voxgig-sdk/blutv-authentication-sdk/go"

client := sdk.NewBlutvAuthenticationSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "BlutvAuthentication_sdk"

client = BlutvAuthenticationSDK.new({})

```

### Lua

```lua
local sdk = require("blutv-authentication_sdk")

local client = sdk.new({})

```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = BlutvAuthenticationSDK.test()
const result = await client.Login().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = BlutvAuthenticationSDK.test(None, None)
result, err = client.Login(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = BlutvAuthenticationSDK::test(null, null);
[$result, $err] = $client->Login(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Login(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = BlutvAuthenticationSDK.test(nil, nil)
result, err = client.Login(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Login(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the BluTV Authentication API

- Upstream: [https://www.blutv.com/](https://www.blutv.com/)
- API docs: [https://freepublicapis.com/blutv-authentication-api](https://freepublicapis.com/blutv-authentication-api)

- No public licence or developer terms are published for these endpoints.
- The API is an internal service powering the BluTV website, not an open developer API.
- The catalogue entry on FreePublicAPIs lists it as unreliable (0% uptime over the last 30 days) and notes it cannot be revived.
- BluTV has been absorbed into HBO Max in Turkey, so production use is not recommended.

---

Generated from the BluTV Authentication API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
