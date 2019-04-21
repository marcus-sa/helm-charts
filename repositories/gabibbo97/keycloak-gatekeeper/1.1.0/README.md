# `@helm-charts/gabibbo97-keycloak-gatekeeper`

Keycloak gatekeeper

| Field               | Value               |
| ------------------- | ------------------- |
| Repository Name     | gabibbo97           |
| Chart Name          | keycloak-gatekeeper |
| Chart Version       | 1.1.0               |
| NPM Package Version | 0.1.0               |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for keycloak-gatekeeper.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: keycloak/keycloak-gatekeeper
  tag: 4.6.0.Final
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - chart-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}

# URL for OpenID autoconfiguration
# On Keycloak <server>/auth/realms/<realm_name>
discoveryURL: ''

# Service to proxy after successful authentication
# upstreamURL: http://my-service.my-namespace.svc.cluster.local:8088
upstreamURL: ''

# skip upstream url tls verification
skip-upstream-tls-verify: false

# OpenID ClientID and secret
ClientID: ''
ClientSecret: ''

# Sets the encryption key used to encode the session state
# If not set it defaults to a random 32 characters alphanumeric string
encryptionKey: ''

# Require the following scopes in the request
scopes: []

# The following claims will be added to the headers of the request
# addClaims:
# - username
# - email
# - some_claim
# Will register three headers: X-Auth-Username, X-Auth-Email, X-Auth-Some-Claim
addClaims: []

# This allows to verify that a received JWT matches the expectations
matchClaims: {}

# These rules specify different authentication strategies for different URLs
# they follow this pattern: "key1=value1|key2=value2"
# Here is a non exhaustive list of key-value pairs
#   uri=/private/*    require access to subpaths of /private
#   roles=admin,user  require the user to have both roles to access
#   require-any-role  combined with roles above, switches the conditional from AND to OR
#   white-listed      allow anyone to have access
#   methods=GET,POST  apply authentication to these methods
rules: []

# Print verbose logs
debug: false

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

# Expose Prometheus metrics
prometheusMetrics: true
```

</details>

---

# Keycloak-gatekeeper

[Keycloak gatekeeper](https://github.com/keycloak/keycloak-gatekeeper) is an authentication proxy service which at the risk of stating the obvious integrates with the Keycloak authentication service.

## TL;DR

```bash
helm install gabibbo97/keycloak-gatekeeper \
    --set discoveryURL=https://keycloak.example.com/auth/realms/myrealm \
    --set upstreamURL=http://my-svc.my-namespace.svc.cluster.local:8088 \
    --set ClientID=myOIDCClientID \
    --set ClientSecret=deadbeef-b000-1337-abcd-aaabacadaeaf \
    --set ingress.enabled=true \
    --set ingress.hosts[0]=my-svc-auth.example.com
```

## Introduction

This chart bootstraps an authenticating proxy for a service.

Users accessing this service will be required to login and then they will be granted access to the backend service.

This can be used with Kubernetes-dashboard, Grafana, Jenkins, ...

## Configuration options

| Parameter               | Description                                                | Default |
| ----------------------- | ---------------------------------------------------------- | :-----: |
| `discoveryURL`          | URL for OpenID autoconfiguration                           |   ``    |
| `upstreamURL`           | URL of the service to proxy                                |   ``    |
| `skipUpstreamTlsVerify` | URL of the service to proxy                                |   ``    |
| `ClientID`              | Client ID for OpenID server                                |   ``    |
| `ClientSecret`          | Client secret for OpenID server                            |   ``    |
| `scopes`                | Additional required scopes for authentication              |  `[]`   |
| `addClaims`             | Set these claims as headers in the request for the backend |  `[]`   |
| `matchClaims`           | Key-Value pairs that the JWT should contain                |  `{}`   |
| `resources`             | Specify fine grained rules for authentication              |  `[]`   |
| `debug`                 | Use verbose logging                                        | `false` |

## Setting up Keycloak

After having installed Keycloak from its [Helm chart](https://github.com/helm/charts/tree/master/stable/keycloak)

- Create a client in Keycloak with protocol `openid-connect` and access-type: `confidential`
- Add a redirect URL to `<SCHEME>://<PROXY_HOST>/oauth/callback`
- Get the `ClientID` and `ClientSecret` from the `Credentials` page

You can now use this new client from keycloak-gatekeeper

## Fine grained rules for authentication

This chart allows to specify rules inside of the `resource` array, these can be used to fine-tweak your authentication endpoints

Each element of `resource` is a `|` (pipe separator) delimited list of key, value pairs.

Here is a non exhaustive list of key-value pairs

|     Example      | Description                                                        |
| :--------------: | ------------------------------------------------------------------ |
| uri=/private/\*  | require access to subpaths of /private                             |
| roles=admin,user | require the user to have both roles to access                      |
| require-any-role | combined with roles above, switches the conditional from AND to OR |
|   white-listed   | allow anyone to have access                                        |
| methods=GET,POST | apply authentication to these methods                              |

## Example

```yaml
resources:
  - 'uri=/admin*|roles=admin,root|require-any-role'
  - 'uri=/public*|white-listed=true'
  - 'uri=/authenticated/users|roles=user'
```

This sets up

- Paths under `/admin` to be accessible only from admins or root
- Paths under `/public` to be accessible by anyone
- Path `/authenticated/users` is accessible only from users
