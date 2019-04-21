# `@helm-charts/banzaicloud-stable-logging-operator`

Logging operator for Kubernetes based on Fluentd and Fluent-bit.

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | logging-operator   |
| Chart Version       | 0.1.6              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for logging-operator.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: banzaicloud/logging-operator
  tag: 0.1.5
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

# Namespace to watch fot LoggingOperator CRD
watchNamespace: ''

tls:
  enabled: false
  secretName: ''
  sharedKey: ''

fluentbit:
  enabled: true
  namespace: ''
  image:
    tag: 'latest'
    repository: 'fluent/fluent-bit'
    pullPolicy: 'IfNotPresent'

fluentd:
  enabled: true
  namespace: ''
  image:
    tag: 'v1.1.4'
    repository: 'banzaicloud/fluentd'
    pullPolicy: 'IfNotPresent'
  volumeModImage:
    tag: 'latest'
    repository: 'busybox'
    pullPolicy: 'IfNotPresent'
  configReloaderImage:
    tag: 'v0.2.2'
    repository: 'jimmidyson/configmap-reload'
    pullPolicy: 'IfNotPresent'
  fluentdPvcSpec:
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 21Gi

grafana:
  dashboard:
    enabled: true

## Role Based Access
## Ref: https://kubernetes.io/docs/admin/authorization/rbac/
##

rbac:
  enabled: true

## Define resources requests and limits for single Pods.
## ref: https://kubernetes.io/docs/user-guide/compute-resources/
## We usually recommend not to specify default resources and to leave this as a conscious
## choice for the user. This also increases chances charts run on environments with little
## resources, such as Minikube. If you do want to specify resources, uncomment the following
## lines, adjust them as necessary, and remove the curly braces after 'resources:'.
##
resources:
  {}
  # limits:
  #   cpu: 100m
  #   memory: 128Mi
  # requests:
  #   cpu: 100m
  #   memory: 128Mi

## Define which Nodes the Pods are scheduled on.
## ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}

## If specified, the pod's tolerations.
## ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
##
tolerations: []
# - key: "key"
#   operator: "Equal"
#   value: "value"
#   effect: "NoSchedule"

## Assign the Logging operator to run on specific nodes
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
##
affinity: {}
# requiredDuringSchedulingIgnoredDuringExecution:
#   nodeSelectorTerms:
#   - matchExpressions:
#     - key: kubernetes.io/e2e-az-name
#       operator: In
#       values:
#       - e2e-az1
#       - e2e-az2

## SecurityContext holds pod-level security attributes and common container settings.
## This defaults to non root user with uid 1000 and gid 2000.	*v1.PodSecurityContext	false
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
##
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  fsGroup: 2000
```

</details>

---

# Logging Operator Chart

[Logging Operator](https://github.com/banzaicloud/logging-operator) Managed centralized logging component fluentd and fluent-bit instance on cluster.

## tl;dr:

```bash
$ helm repo add banzaicloud-stable http://kubernetes-charts.banzaicloud.com/branch/master
$ helm repo update
$ helm install banzaicloud-stable/logging-operator
```

## Introduction

This chart bootstraps an [Logging Operator](https://github.com/banzaicloud/banzai-charts/logging-operator) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release banzaicloud-stable/logging-operator
```

The command deploys **logging-operator** on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the logging-operator chart and their default values.

| Parameter                                           | Description                                            | Default                                                    |
| --------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| `image.repository`                                  | Container image repository                             | `banzaicloud/logging-operator`                             |
| `image.tag`                                         | Container image tag                                    | `0.1.2`                                                    |
| `image.pullPolicy`                                  | Container pull policy                                  | `IfNotPresent`                                             |
| `nameOverride`                                      | Override name of app                                   | ``                                                         |
| `fullnameOverride`                                  | Override full name of app                              | ``                                                         |
| `watchNamespace`                                    | Namespace to watch fot LoggingOperator CRD             | ``                                                         |
| `tls.enabled`                                       | Enabled TLS communication between components           | true                                                       |
| `tls.secretName`                                    | Specified secret name, which contain tls certs         | This will overwrite automatic Helm certificate generation. |
| `tls.sharedKey`                                     | Shared key between nodes (fluentd-fluentbit)           | [autogenerated]                                            |
| `fluentbit.enabled`                                 | Install fluent-bit                                     | true                                                       |
| `fluentbit.namespace`                               | Specified fluentbit installation namespace             | same as operator namespace                                 |
| `fluentbit.image.tag`                               | Fluentbit container image tag                          | `latest`                                                   |
| `fluentbit.image.repository`                        | Fluentbit container image repository                   | `fluent/fluent-bit`                                        |
| `fluentbit.image.pullPolicy`                        | Fluentbit container pull policy                        | `IfNotPresent`                                             |
| `fluentd.enabled`                                   | Install fluentd                                        | true                                                       |
| `fluentd.namespace`                                 | Specified fluentd installation namespace               | same as operator namespace                                 |
| `fluentd.image.tag`                                 | Fluentd container image tag                            | `v1.1.4`                                                   |
| `fluentd.image.repository`                          | Fluentd container image repository                     | `banzaicloud/fluentd`                                      |
| `fluentd.image.pullPolicy`                          | Fluentd container pull policy                          | `IfNotPresent`                                             |
| `fluentd.volumeModImage.tag`                        | Fluentd volumeModImage container image tag             | `latest`                                                   |
| `fluentd.volumeModImage.repository`                 | Fluentd volumeModImage container image repository      | `busybox`                                                  |
| `fluentd.volumeModImage.pullPolicy`                 | Fluentd volumeModImage container pull policy           | `IfNotPresent`                                             |
| `fluentd.configReloaderImage.tag`                   | Fluentd configReloaderImage container image tag        | `v0.2.2`                                                   |
| `fluentd.configReloaderImage.repository`            | Fluentd configReloaderImage container image repository | `jimmidyson/configmap-reload`                              |
| `fluentd.configReloaderImage.pullPolicy`            | Fluentd configReloaderImage container pull policy      | `IfNotPresent`                                             |
| `fluentd.fluentdPvcSpec.accessModes`                | Fluentd persistence volume access modes                | `[ReadWriteOnce]`                                          |
| `fluentd.fluentdPvcSpec.resources.requests.storage` | Fluentd persistence volume size                        | `21Gi`                                                     |
| `grafana.dashboard.enabled`                         | Install grafana logging-operator dashboard             | `true`                                                     |
| `rbac.create`                                       | Create rbac service account and roles                  | `true`                                                     |
| `affinity`                                          | Node Affinity                                          | `{}`                                                       |
| `resources`                                         | CPU/Memory resource requests/limits                    | `{}`                                                       |
| `tolerations`                                       | Node Tolerations                                       | `[]`                                                       |
| `nodeSelector`                                      | Define which Nodes the Pods are scheduled on.          | `{}`                                                       |
| `securityContext`                                   | SecurityContext for Logging operator                   | `{"runAsNonRoot": true, "runAsUser": 1000}`                |

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example:

```bash
$ helm install --name my-release -f values.yaml banzaicloud-stable/logging-operator
```

> **Tip**: You can use the default [values.yaml](values.yaml)
