# `@helm-charts/appscode-vault-operator`

Vault Operator by AppsCode - HashiCorp Vault Operator for Kubernetes

| Field               | Value          |
| ------------------- | -------------- |
| Repository Name     | appscode       |
| Chart Name          | vault-operator |
| Chart Version       | 0.1.0          |
| NPM Package Version | 0.1.0          |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for vault-operator.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
operator:
  registry: kubevault
  repository: vault-operator
  tag: 0.1.0
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
## Installs voyager operator as critical addon
## https://kubernetes.io/docs/tasks/administer-cluster/guaranteed-scheduling-critical-addon-pods/
criticalAddon: false

## Log level for operator
logLevel: 3

## Annotations passed to operator pod(s).
##
annotations: {}

resources: {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector:
  beta.kubernetes.io/os: linux
  beta.kubernetes.io/arch: amd64

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
  # enableValidatingWebhook is used to configure validating webhook for Kubernetes workloads
  enableValidatingWebhook: true
  # CA certificate used by main Kubernetes api server
  ca: not-ca-cert
  # If true, disables status sub resource for crds.
  # Otherwise, enables status sub resource for Kubernetes version >= 1.11 and disables for other versions.
  disableStatusSubresource: false
  # If true, bypasses validating webhook xray checks
  bypassValidatingWebhookXray: false
  # If true, uses kube-apiserver FQDN for AKS cluster to workaround https://github.com/Azure/AKS/issues/522 (default true)
  useKubeapiserverFqdnForAks: true
  # healthcheck configures the readiness and liveliness probes for the operator pod.
  healthcheck:
    enabled: true

# Send usage events to Google Analytics
enableAnalytics: true

monitoring:
  # specify monitoring agent (either "prometheus.io/builtin" or "prometheus.io/coreos-operator")
  agent: "none"
  # specify whether to monitor Vault operator
  operator: false
  # specify where ServiceMonitor crd will be created
  prometheus:
    namespace: ""
  serviceMonitor:
    labels: {}

# Name of cluster used in a multi-cluster setup
clusterName:
```

</details>

---

# Vault Operator

[Vault Operator by AppsCode](https://github.com/kubevault/operator) - HashiCorp Vault Operator for Kubernetes

## TL;DR;

```console
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm install appscode/vault-operator --name vault-operator --namespace kube-system
```

## Introduction

This chart bootstraps a [HashiCorp Vault controller](https://github.com/kubevault/operator) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.9+

## Installing the Chart

To install the chart with the release name `vault-operator`:

```console
$ helm install appscode/vault-operator --name vault-operator
```

The command deploys Vault operator on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `vault-operator`:

```console
$ helm delete vault-operator
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Vault chart and their default values.

| Parameter                               | Description                                                                                                                                                                | Default                                                   |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `replicaCount`                          | Number of Vault operator replicas to create (only 1 is supported)                                                                                                          | `1`                                                       |
| `operator.registry`                     | Docker registry used to pull Vault operator image                                                                                                                          | `kubevault`                                               |
| `operator.repository`                   | Vault operator container image                                                                                                                                             | `vault-operator`                                          |
| `operator.tag`                          | Vault operator container image tag                                                                                                                                         | `0.1.0`                                                   |
| `cleaner.registry`                      | Docker registry used to pull Webhook cleaner image                                                                                                                         | `appscode`                                                |
| `cleaner.repository`                    | Webhook cleaner container image                                                                                                                                            | `kubectl`                                                 |
| `cleaner.tag`                           | Webhook cleaner container image tag                                                                                                                                        | `v1.11`                                                   |
| `imagePullSecrets`                      | Specify image pull secrets                                                                                                                                                 | `nil` (does not add image pull secrets to deployed pods)  |
| `imagePullPolicy`                       | Image pull policy                                                                                                                                                          | `IfNotPresent`                                            |
| `criticalAddon`                         | If true, installs Vault operator as critical addon                                                                                                                         | `false`                                                   |
| `logLevel`                              | Log level for operator                                                                                                                                                     | `3`                                                       |
| `affinity`                              | Affinity rules for pod assignment                                                                                                                                          | `{}`                                                      |
| `nodeSelector`                          | Node labels for pod assignment                                                                                                                                             | `{}`                                                      |
| `tolerations`                           | Tolerations used pod assignment                                                                                                                                            | `{}`                                                      |
| `rbac.create`                           | If `true`, create and use RBAC resources                                                                                                                                   | `true`                                                    |
| `serviceAccount.create`                 | If `true`, create a new service account                                                                                                                                    | `true`                                                    |
| `serviceAccount.name`                   | Service account to be used. If not set and `serviceAccount.create` is `true`, a name is generated using the fullname template                                              | ``                                                        |
| `apiserver.groupPriorityMinimum`        | The minimum priority the group should have.                                                                                                                                | 10000                                                     |
| `apiserver.versionPriority`             | The ordering of this API inside of the group.                                                                                                                              | 15                                                        |
| `apiserver.enableValidatingWebhook`     | Enable validating webhooks for Vault CRDs                                                                                                                                  | true                                                      |
| `apiserver.enableMutatingWebhook`       | Enable mutating webhooks for Vault CRDs                                                                                                                                    | true                                                      |
| `apiserver.ca`                          | CA certificate used by main Kubernetes api server                                                                                                                          | `not-ca-cert`                                             |
| `apiserver.disableStatusSubresource`    | If true, disables status sub resource for crds. Otherwise enables based on Kubernetes version                                                                              | `false`                                                   |
| `apiserver.bypassValidatingWebhookXray` | If true, bypasses validating webhook xray checks                                                                                                                           | `false`                                                   |
| `apiserver.useKubeapiserverFqdnForAks`  | If true, uses kube-apiserver FQDN for AKS cluster to workaround https://github.com/Azure/AKS/issues/522                                                                    | `true`                                                    |
| `apiserver.healthcheck.enabled`         | Enable readiness and liveliness probes                                                                                                                                     | `true`                                                    |
| `enableAnalytics`                       | Send usage events to Google Analytics                                                                                                                                      | `true`                                                    |
| `monitoring.agent`                      | Specify which monitoring agent to use for monitoring Vault. It accepts either `prometheus.io/builtin` or `prometheus.io/coreos-operator`.                                  | `none`                                                    |
| `monitoring.operator`                   | Specify whether to monitor Vault operator.                                                                                                                                 | `false`                                                   |
| `monitoring.prometheus.namespace`       | Specify the namespace where Prometheus server is running or will be deployed.                                                                                              | Release namespace                                         |
| `monitoring.serviceMonitor.labels`      | Specify the labels for ServiceMonitor. Prometheus crd will select ServiceMonitor using these labels. Only usable when monitoring agent is `prometheus.io/coreos-operator`. | `app: <generated app name>` and `release: <release name>` |
| `clusterName`                           | Specify the name of cluster used in a multi-cluster setup                                                                                                                  |                                                           |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install --name vault-operator --set image.tag=v0.1.0 appscode/vault-operator
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install --name vault-operator --values values.yaml appscode/vault-operator
```

## RBAC

By default the chart will not install the recommended RBAC roles and rolebindings.

You need to have the flag `--authorization-mode=RBAC` on the api operator. See the following document for how to enable [RBAC](https://kubernetes.io/docs/admin/authorization/rbac/).

To determine if your cluster supports RBAC, run the following command:

```console
$ kubectl api-versions | grep rbac
```

If the output contains "beta", you may install the chart with RBAC enabled (see below).

### Enable RBAC role/rolebinding creation

To enable the creation of RBAC resources (On clusters with RBAC). Do the following:

```console
$ helm install --name vault-operator appscode/vault-operator --set rbac.create=true
```
