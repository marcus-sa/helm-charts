# `@helm-charts/incubator-oauth-proxy`

A reverse proxy that provides authentication with Google, Github or other providers

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | incubator   |
| Chart Name          | oauth-proxy |
| Chart Version       | 0.1.8       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Oauth client configuration specifics
config:
  # OAuth client ID
  clientID: 'XXXXXXX'
  # OAuth client secret
  clientSecret: 'XXXXXXXX'
  # Create a new secret with the following command
  # python -c 'import os,base64; print base64.b64encode(os.urandom(16))'
  cookieSecret: 'XXXXXXXXXX'

image:
  repository: 'a5huynh/oauth2_proxy'
  tag: '2.2'
  pullPolicy: 'IfNotPresent'

# Optionally specify an array of imagePullSecrets.
# Secrets must be manually created in the namespace.
# ref: https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod
# imagePullSecrets:
# - name: myRegistryKeySecretName

extraArgs:
  email-domain: '*'
  upstream: 'file:///dev/null'
  http-address: '0.0.0.0:4180'

service:
  type: ClusterIP
  externalPort: 443
  internalPort: 4180

ingress:
  enabled: false
  path: /
  # Used to create an Ingress record.
  # hosts:
  # - chart-example.local
  # annotations:
  #   kubernetes.io/ingress.class: nginx
  #   kubernetes.io/tls-acme: "true"
  # tls:
  # Secrets must be manually created in the namespace.
  # - secretName: chart-example-tls
  #   hosts:
  #     - chart-example.local

resources:
  {}
  # limits:
  #   cpu: 100m
  #   memory: 300Mi
  # requests:
  #   cpu: 100m
  #   memory: 300Mi

# Affinity for pod assignment
# Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
# affinity: {}

# Tolerations for pod assignment
# Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
tolerations: []

# Node labels for pod assignment
# Ref: https://kubernetes.io/docs/user-guide/node-selection/
nodeSelector: {}

podAnnotations: {}
podLabels: {}
replicaCount: 1
```

</details>

---

# oauth-proxy

[oauth-proxy](https://github.com/bitly/oauth2_proxy) is a reverse proxy and static file server that provides authentication using Providers (Google, GitHub, and others) to validate accounts by email, domain or group.

**Note - this chart has been deprecated and [moved to stable](../../stable/oauth2-proxy)**.

**Note - at this time, there is a known incompatibility between `oauth-proxy` version 2.2 (which is it's latest release) and `nginx-ingress` versions >= 0.9beta12. To utilize this chart at this time please use nginx-ingress version 0.9beta11**

## TL;DR;

```console
$ helm install incubator/oauth-proxy
```

## Introduction

This chart bootstraps a oauth-proxy deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install incubator/oauth-proxy --name my-release
```

The command deploys oauth-proxy on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the oauth-proxy chart and their default values.

| Parameter              | Description                                                                                                                         | Default                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `affinity`             | node/pod affinities                                                                                                                 | None                                                     |
| `config.clientID`      | oauth client ID                                                                                                                     | `""`                                                     |
| `config.clientSecret`  | oauth client secret                                                                                                                 | `""`                                                     |
| `config.cookieSecret`  | server specific cookie for the secret; create a new one with `python -c 'import os,base64; print base64.b64encode(os.urandom(16))'` | `""`                                                     |
| `extraArgs`            | key:value list of extra arguments to give the binary                                                                                | `{}`                                                     |
| `image.pullPolicy`     | Image pull policy                                                                                                                   | `IfNotPresent`                                           |
| `image.repository`     | Image repository                                                                                                                    | `a5huynh/oauth2_proxy`                                   |
| `image.tag`            | Image tag                                                                                                                           | `2.2`                                                    |
| `imagePullSecrets`     | Specify image pull secrets                                                                                                          | `nil` (does not add image pull secrets to deployed pods) |
| `ingress.enabled`      | enable ingress                                                                                                                      | `false`                                                  |
| `ingress.path`         | ingress base path                                                                                                                   | `/`                                                      |
| `ingress.host`         | Ingress accepted hostnames                                                                                                          | `nil`                                                    |
| `ingress.tls`          | Ingress TLS configuration                                                                                                           | `[]`                                                     |
| `ingress.annotations`  | Ingress annotations                                                                                                                 | `{}`                                                     |
| `nodeSelector`         | node labels for pod assignment                                                                                                      | `{}`                                                     |
| `podAnnotations`       | annotations to add to each pod                                                                                                      | `{}`                                                     |
| `podLabels`            | additional labesl to add to each pod                                                                                                | `{}`                                                     |
| `replicaCount`         | desired number of pods                                                                                                              | `1`                                                      |
| `resources`            | pod resource requests & limits                                                                                                      | `{}`                                                     |
| `service.externalPort` | external port for the service                                                                                                       | `443`                                                    |
| `service.internalPort` | internal port for the service                                                                                                       | `4180`                                                   |
| `service.type`         | type of service                                                                                                                     | `ClusterIP`                                              |
| `tolerations`          | List of node taints to tolerate                                                                                                     | `[]`                                                     |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install incubator/oauth-proxy --name my-release \
  --set=image.tag=v0.0.2,resources.limits.cpu=200m
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install incubator/oauth-proxy --name my-release -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)
