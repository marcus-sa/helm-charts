# `@helm-charts/stable-voyager`

Voyager by AppsCode - Secure Ingress Controller for Kubernetes

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | voyager |
| Chart Version       | 3.0.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
##
## Voyager chart configuration
##
# Docker registry containing Voyager & HAProxy images
dockerRegistry: appscode
## Tags for Docker images
imageTags:
  ## Docker image tag containing Voyager
  voyager: 6.0.0-rc.0
  ## Docker image tag containing HAProxy binary
  haproxy: 1.7.9-6.0.0-rc.0
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
## Use cloud provider here.
cloudProvider:
## The path to the cloud provider configuration file. Empty string for no configuration file.
## ie. for azure use /etc/kubernetes/azure.json
cloudConfig: ''
## Installs voyager operator as critical addon
## https://kubernetes.io/docs/tasks/administer-cluster/guaranteed-scheduling-critical-addon-pods/
criticalAddon: false
## Log level for voyager
logLevel: 3
persistence:
  enabled: false
  hostPath: /etc/kubernetes

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}

## Install Default RBAC roles and bindings
rbac:
  ## If true, create & use RBAC resources
  create: false
  ## Ignored if rbac.create is true
  serviceAccountName: default

# this flag can be set to 'voyager' to handle only ingress
# with annotation kubernetes.io/ingress.class=voyager.
ingressClass:

apiserver:
  # groupPriorityMinimum is the minimum priority the group should have. Please see
  # https://github.com/kubernetes/kube-aggregator/blob/release-1.9/pkg/apis/apiregistration/v1beta1/types.go#L58-L64
  # for more information on proper values of this field.
  groupPriorityMinimum: 10000
  # versionPriority is the ordering of this API inside of the group. Please see
  # https://github.com/kubernetes/kube-aggregator/blob/release-1.9/pkg/apis/apiregistration/v1beta1/types.go#L66-L70
  # for more information on proper values of this field
  versionPriority: 15
  # enableAdmissionWebhook is used to configure apiserver as ValidationWebhook for Voyager CRDs
  enableAdmissionWebhook: false
  # CA certificate used by main Kubernetes api server
  ca:
```

</details>

---

# Voyager

[Voyager by AppsCode](https://github.com/appscode/voyager) - Secure Ingress Controller for Kubernetes

## TL;DR;

```console
$ helm install stable/voyager
```

## Introduction

This chart bootstraps an [ingress controller](https://github.com/appscode/voyager) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/voyager
```

The command deploys Voyager Controller on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release`:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Voyager chart and their default values.

| Parameter                          | Description                                                   | Default                                                  |
| ---------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------- |
| `dockerRegistry`                   | Docker registry used to pull Voyager related images           | `appscode`                                               |
| `imageTags.voyager`                | Tag of Voyager operator image                                 | `6.0.0-rc.0`                                             |
| `imageTags.haproxy`                | Tag of HAProxy container image                                | `1.7.9-6.0.0-rc.0`                                       |
| `imagePullSecrets`                 | Specify image pull secrets                                    | `nil` (does not add image pull secrets to deployed pods) |
| `imagePullPolicy`                  | Image pull policy                                             | `IfNotPresent`                                           |
| `cloudProvider`                    | Name of cloud provider                                        | `nil`                                                    |
| `cloudConfig`                      | Path to cloud config                                          | ``                                                       |
| `criticalAddon`                    | If true, installs voyager operator as critical addon          | `false`                                                  |
| `logLevel`                         | Log level for operator                                        | `3`                                                      |
| `persistence.enabled`              | Enable mounting cloud config                                  | `false`                                                  |
| `persistence.hostPath`             | Host mount path for cloud config                              | `/etc/kubernetes`                                        |
| `nodeSelector`                     | Node labels for pod assignment                                | `{}`                                                     |
| `rbac.create`                      | install required rbac service account, roles and rolebindings | `false`                                                  |
| `rbac.serviceAccountName`          | ServiceAccount Voyager will use (ignored if rbac.create=true) | `default`                                                |
| `ingressClass`                     | Ingress class to watch for. If empty, it handles all ingress  | ``                                                       |
| `apiserver.groupPriorityMinimum`   | The minimum priority the group should have.                   | 10000                                                    |
| `apiserver.versionPriority`        | The ordering of this API inside of the group.                 | 15                                                       |
| `apiserver.enableAdmissionWebhook` | Configure apiserver as adission webhooks for Voyager CRDs     | false                                                    |
| `apiserver.ca`                     | CA certificate used by main Kubernetes api server             | ``                                                       |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install --name my-release --set image.tag=v0.2.1 stable/voyager
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install --name my-release --values values.yaml stable/voyager
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
$ helm install --name my-release stable/voyager --set rbac.create=true
```
