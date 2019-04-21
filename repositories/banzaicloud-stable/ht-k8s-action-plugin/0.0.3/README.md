# `@helm-charts/banzaicloud-stable-ht-k8s-action-plugin`

Hollowtrees action plugin Helm chart for Kubernetes

| Field               | Value                |
| ------------------- | -------------------- |
| Repository Name     | banzaicloud-stable   |
| Chart Name          | ht-k8s-action-plugin |
| Chart Version       | 0.0.3                |
| NPM Package Version | 0.1.0                |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for ht-k8s-action-plugin
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

## The official Banzai ht-k8s-action-plugin image, change tag to use a different version.
## https://hub.docker.com/r/banzaicloud/ht-k8s-action-plugin/tags/
##
image:
  repository: 'banzaicloud/ht-k8s-action-plugin'
  tag: '0.0.1'

  ## Specify an imagePullPolicy (Required)
  ## It's recommended to change this to 'Always' if the image tag is 'latest'
  ## ref: http://kubernetes.io/docs/user-guide/images/#updating-images
  imagePullPolicy: IfNotPresent

replicas: 1

service:
  ## Kubernetes service type
  type: ClusterIP

  ## Specify the nodePort value for the LoadBalancer and NodePort service types.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
  ##
  # nodePort:
  ## Provide any additonal annotations which may be required. This can be used to
  ## set the LoadBalancer service type to internal only.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#internal-load-balancer
  ##
  # annotations:

logLevel: 'debug'

# location that holds (multiple) k8s config files
clusterConfigRoot: '/statestore'

# The address to listen on for HTTP requests.
port: 8080

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 256Mi
    cpu: 120m
```

</details>

---

# Hollowtrees Action Plugin

[Hollowtrees Action Plugin](https://github.com/banzaicloud/ht-k8s-action-plugin)

## tl;dr:

```bash
$ helm repo add banzaicloud-stable http://kubernetes-charts.banzaicloud.com/branch/master
$ helm repo update
$ helm install banzaicloud/ht-k8s-action-plugin
```

## Introduction

This chart bootstraps an BanzaiCloud [Hollowtrees Action Plugin](https://github.com/banzaicloud/banzai-charts/tree/master/ht-k8s-action-plugin) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release banzaicloud/ht-k8s-action-plugin
```

The command deploys Hollowtrees action plugin on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Hollowtrees Action Plugin chart and their default values.

| Parameter             | Description                               | Default                                      |
| --------------------- | ----------------------------------------- | -------------------------------------------- |
| `name`                | Container name                            | `ht-k8s-action-plugin`                       |
| `image`               | Container image                           | `banzaicloud/ht-k8s-action-plugin:{VERSION}` |
| `replicaCount`        | Replica Count                             | `1`                                          |
| `service.type`        | Kubernetes service type to expose         | `ClusterIP`                                  |
| `service.nodePort`    | Port to bind to for NodePort service type | `nil`                                        |
| `service.annotations` | Additional annotations to add to service  | `nil`                                        |
| `imagePullPolicy`     | Image pull policy.                        | `IfNotPresent`                               |
| `logLevel`            | Log level                                 | `debug`                                      |
| `logFormat`           | Log format                                | `text`                                       |
| `bindAddr`            | Port to bind to for service               | `8887`                                       |
| `resources`           | CPU/Memory resource requests/limits       | Memory: `256Mi`, CPU: `100m`                 |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example:

```bash
$ helm install --name my-release -f values.yaml banzaicloud/ht-k8s-action-plugin
```

> **Tip**: You can use the default [values.yaml](values.yaml)

```

```
