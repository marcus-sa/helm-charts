# `@helm-charts/appscode-swift`

Swift by AppsCode - Ajax friendly Helm Tiller Proxy

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | appscode |
| Chart Name          | swift    |
| Chart Version       | 0.11.0   |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for swift.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
swift:
  registry: appscode
  repository: swift
  tag: 0.11.0
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

## Annotations passed to operator pod(s).
##
annotations: {}

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}

## Tolerations for pod assignment
## Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
##
tolerations: {}

## Affinity for pod assignment
## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
##
affinity: {}

## Log level for proxy
logLevel: 3

## Install Default RBAC roles and bindings
rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

# Send usage events to Google Analytics
enableAnalytics: true
```

</details>

---

# swift

[swift by AppsCode](https://github.com/appscode/swift) - Ajax friendly Helm Tiller Proxy

## TL;DR;

```console
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm install appscode/swift
```

## Introduction

This chart bootstraps a [Helm Tiller Proxy](https://github.com/appscode/swift) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.6+

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install appscode/swift --name my-release
```

The command deploys Swift proxy on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release`:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the swift chart and their default values.

| Parameter               | Description                                                                                                                   | Default                                                  |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `replicaCount`          | Number of swift replicas to create (only 1 is supported)                                                                      | `1`                                                      |
| `swift.registry`        | Docker registry used to pull Swift image                                                                                      | `appscode`                                               |
| `swift.repository`      | Swift container image                                                                                                         | `swift`                                                  |
| `swift.tag`             | Swift container image tag                                                                                                     | `0.11.0`                                                 |
| `imagePullSecrets`      | Specify image pull secrets                                                                                                    | `nil` (does not add image pull secrets to deployed pods) |
| `imagePullPolicy`       | Image pull policy                                                                                                             | `IfNotPresent`                                           |
| `logLevel`              | Log level for proxy                                                                                                           | `3`                                                      |
| `affinity`              | Affinity rules for pod assignment                                                                                             | `{}`                                                     |
| `annotations`           | Annotations applied to operator pod(s)                                                                                        | `{}`                                                     |
| `nodeSelector`          | Node labels for pod assignment                                                                                                | `{}`                                                     |
| `tolerations`           | Tolerations used pod assignment                                                                                               | `{}`                                                     |
| `rbac.create`           | If `true`, create and use RBAC resources                                                                                      | `true`                                                   |
| `serviceAccount.create` | If `true`, create a new service account                                                                                       | `true`                                                   |
| `serviceAccount.name`   | Service account to be used. If not set and `serviceAccount.create` is `true`, a name is generated using the fullname template | ``                                                       |
| `enableAnalytics`       | Send usage events to Google Analytics                                                                                         | `true`                                                   |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install --name my-release --set image.tag=v0.2.1 appscode/swift
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install --name my-release --values values.yaml appscode/swift
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
$ helm install --name my-release appscode/swift --set rbac.create=true
```
