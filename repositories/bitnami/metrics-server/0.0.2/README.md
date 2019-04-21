# `@helm-charts/bitnami-metrics-server`

Metrics Server is a cluster-wide aggregator of resource usage data. Metrics Server collects metrics from the Summary API, exposed by Kubelet on each node.

| Field               | Value          |
| ------------------- | -------------- |
| Repository Name     | bitnami        |
| Chart Name          | metrics-server |
| Chart Version       | 0.0.2          |
| NPM Package Version | 0.1.0          |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami Metrics Server image version
## ref: https://hub.docker.com/r/bitnami/metrics-server/tags/
##
image:
  registry: docker.io
  repository: bitnami/metrics-server
  tag: 0.2.1
  ## Specify a imagePullPolicy
  ## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  ##
  pullPolicy: Always

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

apiService:
  # Specifies if the v1beta1.metrics.k8s.io API service should be created.
  #
  # If you disable API service creation you have to
  # manage it outside of this chart for e.g horizontal pod autoscaling to
  # work with this release.
  create: true
```

</details>

---

# Metrics Server

[Metrics Server](https://github.com/kubernetes-incubator/metrics-server) is a cluster-wide aggregator of resource usage data. Metrics Server collects metrics from the Summary API, exposed by Kubelet on each node.

## TL;DR;

```console
$ helm install bitnami/metrics-server
```

## Introduction

This chart bootstraps a [Metrics Server](https://github.com/bitnami/bitnami-docker-metrics-server) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release bitnami/metrics-server
```

The command deploys Metrics Server on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Metrics Server chart and their default values.

| Parameter               | Description                                                                | Default                               |
| ----------------------- | -------------------------------------------------------------------------- | ------------------------------------- |
| `image.registry`        | Metrics Server image registry                                              | `docker.io`                           |
| `image.repository`      | Metrics Server image name                                                  | `bitnami/metrics-server`              |
| `image.tag`             | Metrics Server image tag                                                   | `{VERSION}`                           |
| `image.pullPolicy`      | Metrics Server image pull policy                                           | `Always`                              |
| `rbac.create`           | Enable RBAC authentication                                                 | `true`                                |
| `serviceAccount.create` | Specifies whether a ServiceAccount should be created                       | `true`                                |
| `serviceAccount.name`   | The name of the ServiceAccount to create                                   | Generated using the fullname template |
| `apiService.create`     | Specifies whether the v1beta1.metrics.k8s.io API service should be created | `true`                                |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set rbac.create=true bitnami/metrics-server
```

The above command enables RBAC authentication.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml bitnami/metrics-server
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Enable security for Metrics Server

### Configure RBAC

In order to enable Role-based access control for Metrics Servier you can run the following command:

```console
$ helm install --name my-release --set rbac.create bitnami/metrics-server
```
