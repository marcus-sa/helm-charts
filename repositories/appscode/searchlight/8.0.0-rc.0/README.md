# `@helm-charts/appscode-searchlight`

Searchlight by AppsCode - Alerts for Kubernetes

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | appscode    |
| Chart Name          | searchlight |
| Chart Version       | 8.0.0-rc.0  |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for searchlight.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

operator:
  registry: appscode
  repository: searchlight
  tag: 8.0.0-rc.0

ido:
  registry: appscode
  repository: postgres
  tag: 9.5-alpine

icinga:
  registry: appscode
  repository: icinga
  tag: 8.0.0-rc.0-k8s

cleaner:
  registry: appscode
  repository: kubectl
  tag: v1.12

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

## Log level for proxy
logLevel: 3

## Icinga configaration
## https://github.com/appscode/searchlight/blob/master/docs/icinga2/deployment.md#create-deployment
icinga2web:
  password: changeit

icinga2:
  password:

notifier:
  hipchat:
    authToken: ''
  mailgun:
    domain: ''
    apiKey: ''
    publicAPIKey: ''
    from: ''
  smtp:
    host: ''
    port: ''
    insecureSkipVerify: ''
    username: ''
    password: ''
    from: ''
  twilio:
    accountSid: ''
    authToken: ''
    from: ''
  slack:
    authToken: ''
    channel: ''
  plivo:
    authId: ''
    authToken: ''
    from: ''

## Installs Searchlight operator as critical addon
## https://kubernetes.io/docs/tasks/administer-cluster/guaranteed-scheduling-critical-addon-pods/
criticalAddon: false

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
  # enableValidatingWebhook is used to configure apiserver as ValidationWebhook for Searchlight CRDs
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

# Searchlight

[Searchlight by AppsCode](https://github.com/appscode/searchlight) is an alert manager for Kubernetes built around Icinga2.

## TL;DR;

```console
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm install appscode/searchlight --name searchlight-operator --namespace kube-system
```

## Introduction

This chart bootstraps a [Searchlight controller](https://github.com/appscode/searchlight) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.9+

## Installing the Chart

To install the chart with the release name `searchlight-operator`:

```console
$ helm install appscode/searchlight --name searchlight-operator
```

The command deploys Searchlight operator on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `searchlight-operator`:

```console
$ helm delete searchlight-operator
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Searchlight chart and their default values.

| Parameter                            | Description                                                                                                                   | Default                                                  |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `replicaCount`                       | Number of searchlight Operator replicas to create (only 1 is supported)                                                       | `1`                                                      |
| `operator.registry`                  | Docker registry used to pull Operator image                                                                                   | `appscode`                                               |
| `operator.repository`                | Operator container image                                                                                                      | `searchlight`                                            |
| `operator.tag`                       | Operator image tag                                                                                                            | `8.0.0-rc.0`                                             |
| `icinga.registry`                    | Docker registry used to pull Icinga image                                                                                     | `appscode`                                               |
| `icinga.repository`                  | Icinga container image                                                                                                        | `icinga`                                                 |
| `icinga.tag`                         | icinga container image tag                                                                                                    | `8.0.0-rc.0-k8s`                                         |
| `ido.registry`                       | Docker registry used to pull PostgreSQL image                                                                                 | `appscode`                                               |
| `ido.repository`                     | PostgreSQL container image                                                                                                    | `postgress`                                              |
| `ido.tag`                            | ido container image tag                                                                                                       | `9.5-alpine`                                             |
| `imagePullSecrets`                   | Specify image pull secrets                                                                                                    | `nil` (does not add image pull secrets to deployed pods) |
| `imagePullPolicy`                    | Image pull policy                                                                                                             | `IfNotPresent`                                           |
| `criticalAddon`                      | If true, installs Searchlight operator as critical addon                                                                      | `false`                                                  |
| `logLevel`                           | Log level for operator                                                                                                        | `3`                                                      |
| `affinity`                           | Affinity rules for pod assignment                                                                                             | `{}`                                                     |
| `nodeSelector`                       | Node labels for pod assignment                                                                                                | `{}`                                                     |
| `nodeSelector`                       | Node labels for pod assignment                                                                                                | `{}`                                                     |
| `tolerations`                        | Tolerations used pod assignment                                                                                               | `{}`                                                     |
| `rbac.create`                        | If `true`, create and use RBAC resources                                                                                      | `true`                                                   |
| `serviceAccount.create`              | If `true`, create a new service account                                                                                       | `true`                                                   |
| `serviceAccount.name`                | Service account to be used. If not set and `serviceAccount.create` is `true`, a name is generated using the fullname template | ``                                                       |
| `apiserver.groupPriorityMinimum`     | The minimum priority the group should have.                                                                                   | 10000                                                    |
| `apiserver.versionPriority`          | The ordering of this API inside of the group.                                                                                 | 15                                                       |
| `apiserver.enableValidatingWebhook`  | Enable validating webhooks for Searchlight CRDs                                                                               | false                                                    |
| `apiserver.ca`                       | CA certificate used by main Kubernetes api server                                                                             | ``                                                       |
| `apiserver.disableStatusSubresource` | If true, uses status sub resource for Searchlight crds                                                                        | `false`                                                  |
| `enableAnalytics`                    | Send usage events to Google Analytics                                                                                         | `true`                                                   |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install --name searchlight-operator --set image.tag=v0.2.1 appscode/searchlight
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install --name searchlight-operator --values values.yaml appscode/searchlight
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
$ helm install --name searchlight-operator appscode/searchlight --set rbac.create=true
```
