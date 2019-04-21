# `@helm-charts/appscode-kubedb`

KubeDB by AppsCode - Production ready databases on Kubernetes

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | appscode     |
| Chart Name          | kubedb       |
| Chart Version       | 0.9.0-beta.0 |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
##
## KubeDB chart configuration
##
# Declare variables to be passed into your templates.
replicaCount: 1
# Docker registry containing Kubedb images
kubedb:
  registry: kubedb
  repository: operator
  tag: 0.9.0-beta.0
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
  # enableMutatingWebhook is used to configure mutating webhook for KubeDB CRDs
  enableMutatingWebhook: false
  # enableValidatingWebhook is used to configure validating webhook for KubeDB CRDs
  enableValidatingWebhook: false
  # CA certificate used by main Kubernetes api server
  ca:
  # If true, uses status sub resource for crds.
  enableStatusSubresource: false

# Send usage events to Google Analytics
enableAnalytics: true
```

</details>

---

# KubeDB

[KubeDB by AppsCode](https://github.com/kubedb/cli) - Making running production-grade databases easy on Kubernetes

## TL;DR;

```console
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm install appscode/kubedb
```

## Introduction

This chart bootstraps a [KubeDB controller](https://github.com/kubedb/cli) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.9+

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install appscode/kubedb --name my-release
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

| Parameter                           | Description                                                                                                                   | Default                                                  |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `replicaCount`                      | Number of kubedb operator replicas to create (only 1 is supported)                                                            | `1`                                                      |
| `kubedb.registry`                   | Docker registry used to pull Kubedb operator image                                                                            | `kubedb`                                                 |
| `kubedb.repository`                 | Kubedb operator container image                                                                                               | `operator`                                               |
| `kubedb.tag`                        | Kubedb operator container image tag                                                                                           | `0.9.0-beta.0`                                           |
| `imagePullSecrets`                  | Specify image pull secrets                                                                                                    | `nil` (does not add image pull secrets to deployed pods) |
| `imagePullPolicy`                   | Image pull policy                                                                                                             | `IfNotPresent`                                           |
| `criticalAddon`                     | If true, installs KubeDB operator as critical addon                                                                           | `false`                                                  |
| `affinity`                          | Affinity rules for pod assignment                                                                                             | `{}`                                                     |
| `annotations`                       | Annotations applied to operator pod(s)                                                                                        | `{}`                                                     |
| `nodeSelector`                      | Node labels for pod assignment                                                                                                | `{}`                                                     |
| `tolerations`                       | Tolerations used pod assignment                                                                                               | `{}`                                                     |
| `rbac.create`                       | If `true`, create and use RBAC resources                                                                                      | `true`                                                   |
| `serviceAccount.create`             | If `true`, create a new service account                                                                                       | `true`                                                   |
| `serviceAccount.name`               | Service account to be used. If not set and `serviceAccount.create` is `true`, a name is generated using the fullname template | ``                                                       |
| `apiserver.groupPriorityMinimum`    | The minimum priority the group should have.                                                                                   | 10000                                                    |
| `apiserver.versionPriority`         | The ordering of this API inside of the group.                                                                                 | 15                                                       |
| `apiserver.enableValidatingWebhook` | Enable validating webhooks for KubeDB CRDs                                                                                    | false                                                    |
| `apiserver.enableMutatingWebhook`   | Enable mutating webhooks for KubeDB CRDs                                                                                      | false                                                    |
| `apiserver.ca`                      | CA certificate used by main Kubernetes api server                                                                             | ``                                                       |
| `apiserver.enableStatusSubresource` | If true, uses status sub resource for crds                                                                                    | `false`                                                  |
| `enableAnalytics`                   | Send usage events to Google Analytics                                                                                         | `true`                                                   |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install --name my-release --set image.tag=v0.2.1 appscode/kubedb
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install --name my-release --values values.yaml appscode/kubedb
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
$ helm install --name my-release appscode/kubedb --set rbac.create=true
```
