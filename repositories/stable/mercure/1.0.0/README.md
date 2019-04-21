# `@helm-charts/stable-mercure`

The Mercure hub allows to push data updates using the Mercure protocol to web browsers and other HTTP clients in a convenient, fast, reliable and battery-efficient way

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | mercure |
| Chart Version       | 1.0.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for chart.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

allowAnonymous: '0'
corsAllowedOrigins: ''
debug: '0'
demo: '0'
jwtKey: ''
logFormat: 'FLUENTD'
publishAllowedOrigins: ''
publisherJwtKey: ''
subscriberJwtKey: ''

image:
  repository: dunglas/mercure
  tag: v0
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

service:
  type: NodePort
  port: 80

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  paths: []
  hosts:
    - mercure.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - mercure.local

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

# Mercure

[Mercure](https://mercure.rocks) is a protocol allowing to push data updates to web browsers and other HTTP clients in a convenient, fast, reliable and battery-efficient way.

## TL;DR;

```console
$ helm install stable/mercure
```

## Introduction

This chart bootstraps a [Mercure Hub](https://mercure.rocks) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/mercure
```

The command deploys the Mercure Hub on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Moodle chart and their default values.

| Parameter               | Description                                                                                         | Default             |     |     |
| ----------------------- | --------------------------------------------------------------------------------------------------- | ------------------- | --- | --- |
| `allowAnonymous`        | set to `1` to allow subscribers with no valid JWT to connect                                        | `0`                 |     |     |
| `corsAllowedOrigins`    | a comma separated list of allowed CORS origins, can be `*` for all                                  | empty               |     |     |
| `debug`                 | set to `1` to enable the debug mode (prints recovery stack traces)                                  | `0`                 |     |     |
| `demo`                  | set to `1` to enable the demo mode (automatically enabled when `debug` is `1`)                      | `0`                 |     |     |
| `jwtKey`                | the JWT key to use for both publishers and subscribers                                              | random string       |     |     |
| `logFormat`             | the log format                                                                                      | `FLUENTD`           |     |     |
| `publishAllowedOrigins` | a comma separated list of origins allowed to publish (only applicable when using cookie-based auth) | empty               |     |     |
| `publisherJwtKey`       | must contain the secret key to valid publishers' JWT, can be omited in favor of `jwtKey`            | empty               |     |     |
| `subscriberJwtKey`      | must contain the secret key to valid subscribers' JWT, can be omited in favor of `jwtKey`           | empty               |     |     |
| `image.repository`      | controller container image repository                                                               | `dunglas/mercure`   |     |     |
| `image.tag`             | controller container image tag                                                                      | `v0.3.2`            |     |     |
| `image.pullPolicy`      | controller container image pull policy                                                              | `IfNotPresent`      |     |     |
| `nameOverride`          | Name override                                                                                       | empty               |     |     |
| `fullnameOverride`      | fullname override                                                                                   | `empty              |
| `service.type`          | Service type                                                                                        | `NodePort`          |     |     |
| `service.port`          | Service port                                                                                        | `80`                |     |     |
| `ingress.enabled`       | Enables Ingress                                                                                     | `false`             |     |     |
| `ingress.annotations`   | Ingress annotations                                                                                 | `{}`                |     |     |
| `ingress.path`          | Ingress path                                                                                        | `/`                 |     |     |
| `ingress.hosts`         | Ingress accepted hostnames                                                                          | `["mercure.local"]` |     |     |
| `ingress.tls`           | Ingress TLS configuration                                                                           | `[]`                |     |     |
| `resources`             | controller pod resource requests & limits                                                           | `{}`                |     |     |
| `nodeSelector`          | node labels for controller pod assignment                                                           | `{}`                |     |     |
| `tolerations`           | controller pod toleration for taints                                                                | `{}`                |     |     |
|                         |                                                                                                     |                     |     |     |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release --set jwtKey=FooBar,corsAllowedOrigins=example.com stable/mercure
```

The above command sets the JWT key to `FooBar`.
Additionally it allows pages served from `example.com` to connect to the hub.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/mercure
```

> **Tip**: You can use the default [values.yaml](values.yaml)
