# `@helm-charts/appscode-stash`

Stash by AppsCode - Backup your Kubernetes Volumes

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | appscode |
| Chart Name          | stash    |
| Chart Version       | 0.7.0    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for stash.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
# Docker registry containing Stash images
operator:
  registry: appscode
  repository: stash
  tag: 0.7.0
pushgateway:
  registry: prom
  repository: pushgateway
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
  # enableMutatingWebhook is used to configure mutating webhook for Kubernetes workloads
  enableMutatingWebhook: false
  # enableValidatingWebhook is used to configure validating webhook for Stash CRDss
  enableValidatingWebhook: false
  # CA certificate used by main Kubernetes api server
  ca:

# Send usage events to Google Analytics
enableAnalytics: true
```

</details>

---

# Stash

[Stash by AppsCode](https://github.com/appscode/stash) - Backup your Kubernetes Volumes

## TL;DR;

```console
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm install appscode/stash
```

## Introduction

This chart bootstraps a [Stash controller](https://github.com/appscode/stash) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install appscode/stash --name my-release
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

| Parameter                           | Description                                                                                                                   | Default        |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `replicaCount`                      | Number of stash operator replicas to create (only 1 is supported)                                                             | `1`            |
| `operator.registry`                 | Docker registry used to pull operator image                                                                                   | `appscode`     |
| `operator.repository`               | operator container image                                                                                                      | `stash`        |
| `operator.tag`                      | operator container image tag                                                                                                  | `0.7.0`        |
| `pushgateway.registry`              | Docker registry used to pull Prometheus pushgateway image                                                                     | `prom`         |
| `pushgateway.repository`            | Prometheus pushgateway container image                                                                                        | `pushgateway`  |
| `pushgateway.tag`                   | Prometheus pushgateway container image tag                                                                                    | `v0.4.0`       |
| `imagePullPolicy`                   | container image pull policy                                                                                                   | `IfNotPresent` |
| `criticalAddon`                     | If true, installs Stash operator as critical addon                                                                            | `false`        |
| `rbac.create`                       | If `true`, create and use RBAC resources                                                                                      | `true`         |
| `serviceAccount.create`             | If `true`, create a new service account                                                                                       | `true`         |
| `serviceAccount.name`               | Service account to be used. If not set and `serviceAccount.create` is `true`, a name is generated using the fullname template | ``             |
| `apiserver.groupPriorityMinimum`    | The minimum priority the group should have.                                                                                   | 10000          |
| `apiserver.versionPriority`         | The ordering of this API inside of the group.                                                                                 | 15             |
| `apiserver.enableValidatingWebhook` | Enable validating webhooks for Stash CRDs                                                                                     | false          |
| `apiserver.enableMutatingWebhook`   | Enable mutating webhooks for Kubernetes workloads                                                                             | false          |
| `apiserver.ca`                      | CA certificate used by main Kubernetes api server                                                                             | ``             |
| `enableAnalytics`                   | Send usage events to Google Analytics                                                                                         | `true`         |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install --name my-release --set image.tag=v0.2.1 appscode/stash
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install --name my-release --values values.yaml appscode/stash
```

## RBAC

By default the chart will not install the recommended RBAC roles and rolebindings.

You need to have the flag `--authorization-mode=RBAC` on the api server. See the following document for how to enable [RBAC](https://kubernetes.io/docs/admin/authorization/rbac/).

To determine if your cluster supports RBAC, run the following command:

```console
$ kubectl api-versions | grep rbac
```

If the output contains "beta", you may install the chart with RBAC enabled (see below).

### Enable RBAC role/rolebinding creation

To enable the creation of RBAC resources (On clusters with RBAC). Do the following:

```console
$ helm install --name my-release appscode/stash --set rbac.create=true
```
