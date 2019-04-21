# `@helm-charts/appscode-kubed`

Kubed by AppsCode - Kubernetes daemon

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | appscode   |
| Chart Name          | kubed      |
| Chart Version       | 0.7.0-rc.0 |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
##
## Kubed chart configuration
##
# Declare variables to be passed into your templates.
replicaCount: 1
kubed:
  registry: appscode
  repository: kubed
  tag: 0.7.0-rc.0
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
## Installs Searchlight operator as critical addon
## https://kubernetes.io/docs/tasks/administer-cluster/guaranteed-scheduling-critical-addon-pods/
criticalAddon: false
## Log level for kubed
logLevel: 3
## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}

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

apiserver:
  # groupPriorityMinimum is the minimum priority the group should have. Please see
  # https://github.com/kubernetes/kube-aggregator/blob/release-1.9/pkg/apis/apiregistration/v1beta1/types.go#L58-L64
  # for more information on proper values of this field.
  groupPriorityMinimum: 10000
  # versionPriority is the ordering of this API inside of the group. Please see
  # https://github.com/kubernetes/kube-aggregator/blob/release-1.9/pkg/apis/apiregistration/v1beta1/types.go#L66-L70
  # for more information on proper values of this field
  versionPriority: 15
  # CA certificate used by main Kubernetes api server
  ca:

# Send usage events to Google Analytics
enableAnalytics: true
```

</details>

---

# Kubed

[Kubed by AppsCode](https://github.com/appscode/kubed) - A Kubernetes cluster manager daemon.

## TL;DR;

```console
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm install appscode/kubed
```

## Introduction

This chart bootstraps a [Kubed controller](https://github.com/appscode/kubed) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install appscode/kubed --name my-release
```

The command deploys Kubed operator on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release`:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Kubed chart and their default values.

| Parameter                        | Description                                                                                                                   | Default                                                  |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `replicaCount`                   | Number of kubed operator replicas to create (only 1 is supported)                                                             | `1`                                                      |
| `kubed.registry`                 | Docker registry used to pull Kubed image                                                                                      | `appscode`                                               |
| `kubed.repository`               | Kubed container image                                                                                                         | `kubed`                                                  |
| `kubed.tag`                      | Kubed container image tag                                                                                                     | `0.7.0-rc.0`                                             |
| `imagePullSecrets`               | Specify image pull secrets                                                                                                    | `nil` (does not add image pull secrets to deployed pods) |
| `imagePullPolicy`                | Image pull policy                                                                                                             | `IfNotPresent`                                           |
| `criticalAddon`                  | If true, installs kubed operator as critical addon                                                                            | `false`                                                  |
| `logLevel`                       | Log level for kubed                                                                                                           | `3`                                                      |
| `nodeSelector`                   | Node labels for pod assignment                                                                                                | `{}`                                                     |
| `rbac.create`                    | If `true`, create and use RBAC resources                                                                                      | `true`                                                   |
| `serviceAccount.create`          | If `true`, create a new service account                                                                                       | `true`                                                   |
| `serviceAccount.name`            | Service account to be used. If not set and `serviceAccount.create` is `true`, a name is generated using the fullname template | ``                                                       |
| `apiserver.groupPriorityMinimum` | The minimum priority the group should have.                                                                                   | 10000                                                    |
| `apiserver.versionPriority`      | The ordering of this API inside of the group.                                                                                 | 15                                                       |
| `apiserver.ca`                   | CA certificate used by main Kubernetes api server                                                                             | ``                                                       |
| `enableAnalytics`                | Send usage events to Google Analytics                                                                                         | `true`                                                   |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install --name my-release --set image.tag=v0.2.1 appscode/kubed
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install --name my-release --values values.yaml appscode/kubed
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
$ helm install --name my-release appscode/kubed --set rbac.create=true
```
