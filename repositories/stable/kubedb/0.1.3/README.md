# `@helm-charts/stable-kubedb`

DEPRECATED KubeDB by AppsCode - Making running production-grade databases easy on Kubernetes

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | kubedb |
| Chart Version       | 0.1.3  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
##
## KubeDB chart configuration
##
# Docker registry containing KubeDB images
dockerRegistry: kubedb
## Tags for Docker images
imageTags:
  ## Docker image tag containing KubeDB operator
  operator: 0.8.0-beta.2
  ## Docker image tag containing KubeDB exporter
  exporter: 0.8.0-beta.2
  ## Docker image tag containing KubeDB apiserver
  apiserver: 0.1.0-beta.2
# Declare variables to be passed into your templates.
replicaCount: 1
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
## Installs KubeDB operator as critical addon
## https://kubernetes.io/docs/tasks/administer-cluster/guaranteed-scheduling-critical-addon-pods/
criticalAddon: false

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
  # enableAdmissionWebhook is used to configure apiserver as admission webhook for KubeDB CRDs
  enableAdmissionWebhook: false
  # CA certificate used by main Kubernetes api server
  ca:
```

</details>

---

**This chart is DEPRECATED and moved to https://github.com/appscode/charts**

# KubeDB

[KubeDB by AppsCode](https://github.com/kubedb/cli) - Making running production-grade databases easy on Kubernetes

## TL;DR;

```console
$ helm install stable/kubedb
```

## Introduction

This chart bootstraps a [KubeDB controller](https://github.com/kubedb/cli) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.9+

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install stable/kubedb --name my-release
```

The command deploys KubeDB operator on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release`:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the KubeDB chart and their default values.

| Parameter                          | Description                                                                                                                   | Default                                                  |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `replicaCount`                     | Number of kubedb operator replicas to create (only 1 is supported)                                                            | `1`                                                      |
| `dockerRegistry`                   | Docker registry used to pull KubeDB related images                                                                            | `kubedb`                                                 |
| `imageTags.operator`               | Tag of KubeDB operator image                                                                                                  | `0.8.0-beta.2`                                           |
| `imageTags.exporter`               | Tag of KubeDB operator image                                                                                                  | `0.8.0-beta.2`                                           |
| `imageTags.apiserver`              | Tag of KubeDB server image                                                                                                    | `0.1.0-beta.2`                                           |
| `imagePullSecrets`                 | Specify image pull secrets                                                                                                    | `nil` (does not add image pull secrets to deployed pods) |
| `imagePullPolicy`                  | Image pull policy                                                                                                             | `IfNotPresent`                                           |
| `criticalAddon`                    | If true, installs KubeDB operator as critical addon                                                                           | `false`                                                  |
| `rbac.create`                      | If `true`, create and use RBAC resources                                                                                      | `true`                                                   |
| `serviceAccount.create`            | If `true`, create a new service account                                                                                       | `true`                                                   |
| `serviceAccount.name`              | Service account to be used. If not set and `serviceAccount.create` is `true`, a name is generated using the fullname template | ``                                                       |
| `apiserver.groupPriorityMinimum`   | The minimum priority the group should have.                                                                                   | 10000                                                    |
| `apiserver.versionPriority`        | The ordering of this API inside of the group.                                                                                 | 15                                                       |
| `apiserver.enableAdmissionWebhook` | Configure apiserver as admission webhooks for KubeDB CRDs                                                                     | false                                                    |
| `apiserver.ca`                     | CA certificate used by main Kubernetes api server                                                                             | ``                                                       |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install --name my-release --set image.tag=v0.2.1 stable/kubedb
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install --name my-release --values values.yaml stable/kubedb
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
$ helm install --name my-release stable/kubedb --set rbac.create=true
```
