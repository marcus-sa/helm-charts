# `@helm-charts/stable-uchiwa`

Dashboard for the Sensu monitoring framework

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | uchiwa |
| Chart Version       | 0.2.5  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Docker image name
image: 'sstarcher/uchiwa'
# Docker image tag
imageTag: '0.22'

# Image pull policy for the container
pullPolicy: 'IfNotPresent'

# How many uchiwa containers to spawn
replicaCount: 1

# How to publish the service http://kubernetes.io/docs/user-guide/services/#publishing-services---service-types
serviceType: ClusterIP

# Service port to expose Uchiwa on
httpPort: 80

# If set to true, the service will be exposed via the Deis Router if setup https://github.com/deis/router
deis:
  routable: false
  domains: uchiwa

# CPU and Memory limit and request for Uchiwa
resources:
  limits:
    memory: 50Mi
  requests:
    memory: 50Mi
    cpu: 10m

# Uchiwa configuration https://docs.uchiwa.io/getting-started/configuration/
host: '0.0.0.0'
port: 3000
refresh: 10
loglevel: info
```

</details>

---

# Uchiwa

[Uchiwa](https://uchiwa.io) is a simple yet effective open-source dashboard for the Sensu monitoring framework.

## TL;DR;

```console
$ helm install stable/uchiwa
```

## Introduction

This chart bootstraps a [Uchiwa](https://github.com/sstarcher/docker-uchiwa) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled

## Get this chart

Download the latest release of the chart from the [releases](../../../releases) page.

Alternatively, clone the repo if you wish to use the development snapshot:

```console
$ git clone https://github.com/kubernetes/charts.git
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/uchiwa
```

_Replace the `x.x.x` placeholder with the chart release version._

The command deploys Uchiwa on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Uchiwa chart and their default values.

| Parameter                   | Description                                                | Default            |
| --------------------------- | ---------------------------------------------------------- | ------------------ |
| `image`                     | Uchiwa image                                               | `sstarcher/uchiwa` |
| `imageTag`                  | Uchiwa version                                             | `0.22`             |
| `imagePullPolicy`           | Image pull policy                                          | `IfNotPresent`     |
| `replicaCount`              | Number of uchiwa replicas                                  | `1`                |
| `httpPort`                  | Service port for kubernetes                                | `80`               |
| `routable`                  | Enables routing through the Deis router                    | `false`            |
| `resources.requests.cpu`    | CPU request for uchiwa                                     | `10m`              |
| `resources.requests.memory` | Memory request for uchiwa                                  | `50Mi`             |
| `resources.limits.cpu`      | CPU limit for uchiwa                                       | ``                 |
| `resources.limits.memory`   | Memory limit for uchiwa                                    | `50Mi`             |
| `host`                      | Address on which Uchiwa will listen                        | `0.0.0.0`          |
| `port`                      | Port on which Uchiwa will listen                           | `3000`             |
| `refresh`                   | Determines the interval to pull the Sensu APIs, in seconds | `10`               |
| `loglevel`                  | Level of logging to show after Uchiwa has started          | `info`             |

Detailed documentation for the `config` json can be found at [Uchiwa/Docs](https://docs.uchiwa.io/getting-started/configuration/)

```console
$ helm install --name my-release \
  --set imageTag=0.18.2 \
    stable/uchiwa
```

The above command sets the Uchiwa version to `0.18.2`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/uchiwa
```

> **Tip**: You can use the default [values.yaml](values.yaml)
