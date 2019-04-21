# `@helm-charts/appscode-stash`

Stash by AppsCode - Backup your Kubernetes Volumes

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | appscode |
| Chart Name          | stash    |
| Chart Version       | 0.4.1    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for stash.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
operator:
  image: appscode/stash
  tag: 0.6.2
pushgateway:
  image: prom/pushgateway
  tag: v0.4.0
## Optionally specify an array of imagePullSecrets.
## Secrets must be manually created in the namespace.
## ref: https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod
##
# imagePullSecrets:
#   - name: myRegistryKeySecretName
## Specify a imagePullPolicy
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent
## Installs Stash operator as critical addon
## https://kubernetes.io/docs/tasks/administer-cluster/guaranteed-scheduling-critical-addon-pods/
criticalAddon: false
## Install Default RBAC roles and bindings
rbac:
  ## If true, create & use RBAC resources
  create: false
  ## Ignored if rbac.create is true
  serviceAccountName: default
```

</details>

---

# Stash

[Stash by AppsCode](https://github.com/appscode/stash) - Backup your Kubernetes Volumes

## TL;DR;

```console
$ helm install stable/stash
```

## Introduction

This chart bootstraps a [Stash controller](https://github.com/appscode/stash) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.5+

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install stable/stash --name my-release
```

The command deploys Stash operator on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release`:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Stash chart and their default values.

| Parameter                 | Description                                                       | Default            |
| ------------------------- | ----------------------------------------------------------------- | ------------------ |
| `replicaCount`            | Number of stash operator replicas to create (only 1 is supported) | `1`                |
| `operator.image`          | operator container image                                          | `appscode/stash`   |
| `operator.tag`            | operator container image tag                                      | `0.6.2`            |
| `operator.pullPolicy`     | operator container image pull policy                              | `IfNotPresent`     |
| `pushgateway.image`       | Prometheus pushgateway container image                            | `prom/pushgateway` |
| `pushgateway.tag`         | Prometheus pushgateway container image tag                        | `v0.4.0`           |
| `pushgateway.pullPolicy`  | Prometheus pushgateway container image pull policy                | `IfNotPresent`     |
| `criticalAddon`           | If true, installs Stash operator as critical addon                | `false`            |
| `rbac.create`             | install required rbac service account, roles and rolebindings     | `false`            |
| `rbac.serviceAccountName` | ServiceAccount Stash will use (ignored if rbac.create=true)       | `default`          |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install --name my-release --set image.tag=v0.2.1 stable/stash
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install --name my-release --values values.yaml stable/stash
```

## RBAC

By default the chart will not install the recommended RBAC roles and rolebindings.

You need to have the flag `--authorization-mode=RBAC` on the api server. See the following document for how to enable [RBAC](https://kubernetes.io/docs/admin/authorization/rbac/).

To determine if your cluster supports RBAC, run the the following command:

```console
$ kubectl api-versions | grep rbac
```

If the output contains "beta", you may install the chart with RBAC enabled (see below).

### Enable RBAC role/rolebinding creation

To enable the creation of RBAC resources (On clusters with RBAC). Do the following:

```console
$ helm install --name my-release stable/stash --set rbac.create=true
```
