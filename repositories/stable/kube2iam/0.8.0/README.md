# `@helm-charts/stable-kube2iam`

Provide IAM credentials to pods based on annotations.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | kube2iam |
| Chart Version       | 0.8.0    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
extraArgs: {}
#   base-role-arn: arn:aws:iam::0123456789:role/
#   default-role: kube2iam-default
#   api-server: ...
#   api-token: ...

host:
  ip: $(HOST_IP)
  iptables: false
  interface: docker0
  port: 8181

image:
  repository: jtblin/kube2iam
  tag: 0.9.0
  pullPolicy: IfNotPresent

# AWS Access keys to inject as environment variables
aws:
  secret_key: ''
  access_key: ''
  region: ''

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}

## Annotations to be added to pods
##
podAnnotations: {}

podLabels: {}

rbac:
  ## If true, create & use RBAC resources
  ##
  create: false

  ## Ignored if rbac.create is true
  ##
  serviceAccountName: default

resources:
  {}
  # limits:
  #   cpu: 4m
  #   memory: 16Mi
  # requests:
  #   cpu: 4m
  #   memory: 16Mi

## Strategy for DaemonSet updates (requires Kubernetes 1.6+)
## Ref: https://kubernetes.io/docs/tasks/manage-daemon/update-daemon-set/
##
updateStrategy: OnDelete

verbose: false

tolerations: []
```

</details>

---

# kube2iam

Installs [kube2iam](https://github.com/jtblin/kube2iam) to provide IAM credentials to pods based on annotations.

## TL;DR;

```console
$ helm install stable/kube2iam
```

## Introduction

This chart bootstraps a [kube2iam](https://github.com/jtblin/kube2iam) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install stable/kube2iam --name my-release
```

The command deploys kube2iam on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the kube2iam chart and their default values.

| Parameter                 | Description                                                  | Default           |
| ------------------------- | ------------------------------------------------------------ | ----------------- |
| `extraArgs`               | Additional container arguments                               | `{}`              |
| `host.ip`                 | IP address of host                                           | `$(HOST_IP)`      |
| `host.iptables`           | Add iptables rule                                            | `false`           |
| `host.interface`          | Host interface for proxying AWS metadata                     | `docker0`         |
| `image.repository`        | Image                                                        | `jtblin/kube2iam` |
| `image.tag`               | Image tag                                                    | `0.6.4`           |
| `image.pullPolicy`        | Image pull policy                                            | `IfNotPresent`    |
| `nodeSelector`            | node labels for pod assignment                               | `{}`              |
| `podAnnotations`          | annotations to be added to pods                              | `{}`              |
| `rbac.create`             | If true, create & use RBAC resources                         | `false`           |
| `rbac.serviceAccountName` | existing ServiceAccount to use (ignored if rbac.create=true) | `default`         |
| `resources`               | pod resource requests & limits                               | `{}`              |
| `updateStrategy`          | Strategy for DaemonSet updates (requires Kubernetes 1.6+)    | `OnDelete`        |
| `verbose`                 | Enable verbose output                                        | `false`           |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install stable/kube2iam --name my-release \
  --set=extraArgs.base-role-arn=arn:aws:iam::0123456789:role/,extraArgs.default-role=kube2iam-default,host.iptables=true,host.interface=cbr0
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install stable/kube2iam --name my-release -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)
