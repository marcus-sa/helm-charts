# `@helm-charts/stable-gangway`

An application that can be used to easily enable authentication flows via OIDC for a kubernetes cluster.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | gangway |
| Chart Version       | 0.0.5   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
replicaCount: 1

image:
  repository: gcr.io/heptio-images/gangway
  tag: v3.0.0
  pullPolicy: IfNotPresent
  ## Optional array of imagePullSecrets containing private registry credentials
  ## Ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  pullSecrets: []
  # - name: secretName

nameOverride: ''
fullnameOverride: ''

gangway:
  # The address to listen on. Defaults to 0.0.0.0 to listen on all interfaces.
  # Env var: GANGWAY_HOST
  # host: 0.0.0.0

  # The port to listen on. Defaults to 8080.
  # Env var: GANGWAY_PORT
  port: 8080

  # Should Gangway serve TLS vs. plain HTTP? Default: false
  # Env var: GANGWAY_SERVE_TLS
  # serveTLS: false

  # The public cert file (including root and intermediates) to use when serving TLS.
  # Env var: GANGWAY_CERT_FILE
  # certFile: /etc/gangway/tls/tls.crt

  # The private key file when serving TLS.
  # Env var: GANGWAY_KEY_FILE
  # keyFile: /etc/gangway/tls/tls.key

  # The cluster name. Used in UI and kubectl config instructions.
  # Env var: GANGWAY_CLUSTER_NAME
  clusterName: '${GANGWAY_CLUSTER_NAME}'

  # OAuth2 URL to start authorization flow.
  # Env var: GANGWAY_AUTHORIZE_URL
  authorizeURL: 'https://${DNS_NAME}/authorize'

  # OAuth2 URL to obtain access tokens.
  # Env var: GANGWAY_TOKEN_URL
  tokenURL: 'https://${DNS_NAME}/oauth/token'

  # Endpoint that provides user profile information [optional]. Not all providers
  # will require this.
  # Env var: GANGWAY_AUDIENCE
  audience: 'https://${DNS_NAME}/userinfo'

  # Used to specify the scope of the requested Oauth authorization.
  scopes: ['openid', 'profile', 'email', 'offline_access']

  # Where to redirect back to. This should be a URL where gangway is reachable.
  # Typically this also needs to be registered as part of the oauth application
  # with the oAuth provider.
  # Env var: GANGWAY_REDIRECT_URL
  redirectURL: 'https://${GANGWAY_REDIRECT_URL}/callback'

  # API client ID as indicated by the identity provider
  # Env var: GANGWAY_CLIENT_ID
  clientID: '${GANGWAY_CLIENT_ID}'

  # API client secret as indicated by the identity provider
  # Env var: GANGWAY_CLIENT_SECRET
  clientSecret: '${GANGWAY_CLIENT_SECRET}'

  # Some identity providers accept an empty client secret, this
  # is not generally considered a good idea. If you have to use an
  # empty secret and accept the risks that come with that then you can
  # set this to true.
  # allowEmptyClientSecret: false

  # The JWT claim to use as the username. This is used in UI.
  # Default is "nickname". This is combined with the clusterName
  # for the "user" portion of the kubeconfig.
  # Env var: GANGWAY_USERNAME_CLAIM
  usernameClaim: 'sub'

  # The API server endpoint used to configure kubectl
  # Env var: GANGWAY_APISERVER_URL
  apiServerURL: 'https://${GANGWAY_APISERVER_URL}'

  # The path to find the CA bundle for the API server. Used to configure kubectl.
  # This is typically mounted into the default location for workloads running on
  # a Kubernetes cluster and doesn't need to be set.
  # Env var: GANGWAY_CLUSTER_CA_PATH
  # cluster_ca_path: "/var/run/secrets/kubernetes.io/serviceaccount/ca.crt"
  # The path to a root CA to trust for self signed certificates at the Oauth2 URLs
  # Env var: GANGWAY_TRUSTED_CA_PATH
  # trustedCAPath: /cacerts/rootca.crt
  # The path gangway uses to create urls (defaults to "")
  # Env var: GANGWAY_HTTP_PATH
  # httpPath: "https://${GANGWAY_HTTP_PATH}"
  # The key to use when encrypting the contents of cookies.
  # You can leave this blank and the chart will generate a random key, however
  # you must use that with caution. Subsequent upgrades to the deployment will
  # regenerate this key which will cause Gangway to error when attempting to
  # decrypt cookies stored in users' browsers which were encrypted with the old
  # key.
  # TL;DR: Safe to use the auto generation in test environments, provide your
  # own in procution.
  # sessionKey:

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
```

</details>

---

# Gangway

An application that can be used to easily enable authentication flows via OIDC for a kubernetes cluster.

## TL;DR

    helm install stable/gangway

## Introduction

The chart deploys an instance of Gangway into a Kubernetes cluster using the Helm package manager.

This chart will do the following:

- Create a deployment of [gangway] within your Kubernetes Cluster.

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
helm install --name my-release stable/gangway
```

Due to the nature of OIDC configuration, deploying the chart without at least some of the values being set will not result in a functioning application. See the Configuration section below for more information.

## Configuration

The following table lists the configurable parameters of the external-dns chart and their default values.

All values under the `gangway` top level object are passed directly to the Gangway container via a `yaml` config file. The contents of that object in [`values.yaml`](values.yaml) are lifted directly from the Gangway [documentation](https://github.com/heptiolabs/gangway/tree/master/docs).

At a minimum you _must_ configure any of the values marked as **required** in the table below.

| Parameter                        | Description                                                                                                                                                                                                     | Default                                            |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `affinity`                       | List of affinities (requires Kubernetes >=1.6)                                                                                                                                                                  | `{}`                                               |
| `gangway.allowEmptyClientSecret` | Some identity providers accept an empty client secret, this is not generally considered a good idea. If you have to use an empty secret and accept the risks that come with that then you can set this to true. | `false`                                            |
| `gangway.apiServerURL`           | The API server endpoint used to configure kubectl. **Required**                                                                                                                                                 | `""`                                               |
| `gangway.audience`               | Endpoint that provides user profile information [optional]. Not all providers will require this. To be taken from the configuration of your OIDC provider. **Required**                                         | `""`                                               |
| `gangway.authorizeURL`           | OAuth2 URL to start authorization flow. To be taken from the configuration of your OIDC provider. **Required**                                                                                                  | `""`                                               |
| `gangway.certData`               | The Public cert data. This is normally safe to leave alone.                                                                                                                                                     | `""`                                               |
| `gangway.clientID`               | API client ID as indicated by the identity provider. **Required**                                                                                                                                               | `""`                                               |
| `gangway.clientSecret`           | API client secret as indicated by the identity provider. **Required**                                                                                                                                           | `""`                                               |
| `gangway.cluster_ca_path`        | The path to find the CA bundle for the API server. Used to configure kubectl. This is typically mounted into the default location for workloads running on a Kubernetes cluster and doesn't need to be set.     | `""`                                               |
| `gangway.clusterName`            | The cluster name. Used in UI and kubectl config instructions. **Required**                                                                                                                                      | `""`                                               |
| `gangway.host`                   | The address to listen on. Defaults to 0.0.0.0 to listen on all interfaces.                                                                                                                                      | `80`                                               |
| `gangway.httpPath`               | The path gangway uses to create urls (defaults to "")                                                                                                                                                           | `/`                                                |
| `gangway.keyData`                | The Private key data                                                                                                                                                                                            | `""`                                               |
| `gangway.port`                   | The port to listen on. Defaults to 8080.                                                                                                                                                                        | `80`                                               |
| `gangway.redirectURL`            | Where to redirect back to. This should be a URL where gangway is reachable. Typically this also needs to be registered as part of the oauth application with the oAuth provider. **Required**                   | `""`                                               |
| `gangway.scopes`                 | Used to specify the scope of the requested Oauth authorization.                                                                                                                                                 | `["openid", "profile", "email", "offline_access"]` |
| `gangway.serveTLS`               | Should Gangway serve TLS vs. plain HTTP?                                                                                                                                                                        | `false`                                            |
| `gangway.sessionKey`             | Encryption key for cookie contents. Will autogenerate if not provided. Caution: Do not use auto generation in production environments.                                                                          | `""`                                               |
| `gangway.tokenURL`               | OAuth2 URL to obtain access tokens. To be taken from the configuration of your OIDC provider. **Required**                                                                                                      | `""`                                               |
| `gangway.trustedCAPath`          | The path to a root CA to trust for self signed certificates at the Oauth2 URLs                                                                                                                                  | `""`                                               |
| `gangway.usernameClaim`          | The JWT claim to use as the username. This is used in UI. Default is "nickname". This is combined with the clusterName for the "user" portion of the kubeconfig.                                                | `name`                                             |
| `image.repository`               | Container image name (Including repository name if not `hub.docker.com`).                                                                                                                                       | `gcr.io/heptio-images/gangway`                     |
| `image.pullPolicy`               | Container pull policy.                                                                                                                                                                                          | `IfNotPresent`                                     |
| `image.tag`                      | Container image tag.                                                                                                                                                                                            | `v2.2.0`                                           |
| `image.pullSecrets`              | Name of Secret resource containing private registry credentials                                                                                                                                                 | `""`                                               |
| `ingress.annotations`            | Ingress annotations                                                                                                                                                                                             | `{}`                                               |
| `ingress.enabled`                | Enables or Disables the ingress resource                                                                                                                                                                        | `false`                                            |
| `ingress.hosts`                  | List of FQDN's for the ingress                                                                                                                                                                                  | `""`                                               |
| `ingress.tls.hosts`              | List of FQDN's the above secret is associated with                                                                                                                                                              | `""`                                               |
| `ingress.tls.secretName`         | Name of the secret to use                                                                                                                                                                                       | `""`                                               |
| `ingress.tls`                    | List of SSL certs to use                                                                                                                                                                                        | `""`                                               |
| `nodeSelector`                   | Node labels for pod assignment                                                                                                                                                                                  | `{}`                                               |
| `podAnnotations`                 | Additional annotations to apply to the pod.                                                                                                                                                                     | `{}`                                               |
| `resources`                      | CPU/Memory resource requests/limits.                                                                                                                                                                            | `{}`                                               |
| `service.port`                   | The port the service should listen on                                                                                                                                                                           | `80`                                               |
| `service.type`                   | Type of service to create                                                                                                                                                                                       | `ClusterIP`                                        |
| `tolerations`                    | List of node taints to tolerate (requires Kubernetes >= 1.6)                                                                                                                                                    | `[]`                                               |

You will likely want to expose Gangway to your users somehow, possibly by way of an ingress, the values below would be a way of doing this with the [Traefik] ingress controller, this assumes TLS offload is happening at the load balancer:

```yaml
ingress:
enabled: true
annotations:
  kubernetes.io/ingress.class: traefik
path: /
hosts:
  - gangway.your-domain.com
tls: []
```

## Note about `gangway.sessionKey`

The chart will auto generate a random value for `gangway.sessionKey` when you install the chart. Gangway uses this via the [Gorilla Secure Cookie] Go library to encrypt the contents of cookies sent to the users browser. Relying on the autogeneration is acceptable in testing environments, however in production you are strongly advised to provide your own random value for this variable. If you do not and you subsequently update your Helm deployment this key will be regenerated. This has the impact that any cookies in your users browsers from before the upgrade, will have been encrypted with the old key, which Gangway no longer has. Therefore when they browse to your Gangway url they will get an error when they attempt to login. The only solution to that issue is to have the user delete all the gangway cookies from their browser. You have been warned!

### Specifying Values

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm upgrade --install --wait my-release \
    --set ingress.enabled=true \
    stable/gangway
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm upgrade --install --wait my-release stable/gangway -f values.yaml
```

> **Tip**: You can copy the default [values.yaml](values.yaml) and make any required edits in there

[gangway]: https://github.com/heptiolabs/gangway
[gangway docs]: https://github.com/heptiolabs/gangway/tree/master/docs
[traefik]: https://docs.traefik.io/user-guide/kubernetes/
[gorilla secure cookie]: https://github.com/gorilla/securecookie
