# `@helm-charts/appscode-git-apiserver`

Git API server by AppsCode - Sync git repositories as Kubernetes resources

| Field               | Value         |
| ------------------- | ------------- |
| Repository Name     | appscode      |
| Chart Name          | git-apiserver |
| Chart Version       | 0.1.0         |
| NPM Package Version | 0.1.0         |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for Git API server.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
# Docker registry containing Git API server images
operator:
  registry: kubeci
  repository: git-apiserver
  tag: 0.1.0
cleaner:
  registry: appscode
  repository: kubectl
  tag: v1.11
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
## Installs Git API server operator as critical addon
## https://kubernetes.io/docs/tasks/administer-cluster/guaranteed-scheduling-critical-addon-pods/
criticalAddon: false

## Log level for operator
logLevel: 3

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
  enableMutatingWebhook: true
  # enableValidatingWebhook is used to configure validating webhook for Git API server CRDss
  enableValidatingWebhook: true
  # CA certificate used by main Kubernetes api server
  ca: not-ca-cert
  # If true, disables status sub resource for crds.
  # Otherwise, enables status sub resource for Kubernetes version >= 1.11 and disables for other versions.
  disableStatusSubresource: false

# Send usage events to Google Analytics
enableAnalytics: true
```

</details>

---

# Git API Server

[Git API server by AppsCode](https://github.com/kube-ci/git-apiserver) - Sync git repositories as Kubernetes resources.

## TL;DR;

```console
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm install appscode/git-apiserver --name git-apiserver --namespace kube-system
```

## Introduction

This chart bootstraps a [Git API server controller](https://github.com/kube-ci/git-apiserver) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.9+

## Installing the Chart

To install the chart with the release name `git-apiserver`:

```console
$ helm install appscode/git-apiserver --name git-apiserver
```

The command deploys Git API server operator on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `git-apiserver`:

```console
$ helm delete git-apiserver
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Git API server chart and their default values.

| Parameter                            | Description                                                                                                                   | Default         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `replicaCount`                       | Number of Git API server operator replicas to create (only 1 is supported)                                                    | `1`             |
| `operator.registry`                  | Docker registry used to pull operator image                                                                                   | `kubeci`        |
| `operator.repository`                | Operator container image                                                                                                      | `git-apiserver` |
| `operator.tag`                       | Operator container image tag                                                                                                  | `0.1.0`         |
| `cleaner.registry`                   | Docker registry used to pull Webhook cleaner image                                                                            | `appscode`      |
| `cleaner.repository`                 | Webhook cleaner container image                                                                                               | `kubectl`       |
| `cleaner.tag`                        | Webhook cleaner container image tag                                                                                           | `v1.11`         |
| `imagePullPolicy`                    | Container image pull policy                                                                                                   | `IfNotPresent`  |
| `criticalAddon`                      | If true, installs Git API server operator as critical addon                                                                   | `false`         |
| `logLevel`                           | Log level for operator                                                                                                        | `3`             |
| `affinity`                           | Affinity rules for pod assignment                                                                                             | `{}`            |
| `annotations`                        | Annotations applied to operator pod(s)                                                                                        | `{}`            |
| `nodeSelector`                       | Node labels for pod assignment                                                                                                | `{}`            |
| `tolerations`                        | Tolerations used pod assignment                                                                                               | `{}`            |
| `rbac.create`                        | If `true`, create and use RBAC resources                                                                                      | `true`          |
| `serviceAccount.create`              | If `true`, create a new service account                                                                                       | `true`          |
| `serviceAccount.name`                | Service account to be used. If not set and `serviceAccount.create` is `true`, a name is generated using the fullname template | ``              |
| `apiserver.groupPriorityMinimum`     | The minimum priority the group should have.                                                                                   | 10000           |
| `apiserver.versionPriority`          | The ordering of this API inside of the group.                                                                                 | 15              |
| `apiserver.enableValidatingWebhook`  | Enable validating webhooks for Git API server CRDs                                                                            | true            |
| `apiserver.enableMutatingWebhook`    | Enable mutating webhooks for Kubernetes workloads                                                                             | true            |
| `apiserver.ca`                       | CA certificate used by main Kubernetes api server                                                                             | `not-ca-cert`   |
| `apiserver.disableStatusSubresource` | If true, disables status sub resource for crds. Otherwise enables based on Kubernetes version                                 | `false`         |
| `enableAnalytics`                    | Send usage events to Google Analytics                                                                                         | `true`          |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install --name git-apiserver --set image.tag=v0.2.1 appscode/git-apiserver
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install --name git-apiserver --values values.yaml appscode/git-apiserver
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
$ helm install --name git-apiserver appscode/git-apiserver --set rbac.create=true
```
