# `@helm-charts/stable-zetcd`

CoreOS zetcd Helm chart for Kubernetes

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | zetcd  |
| Chart Version       | 0.1.8  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for zetcd.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1

image:
  repository: quay.io/coreos/zetcd
  tag: v0.0.3
  pullPolicy: IfNotPresent
service:
  name: zetcd
  type: ClusterIP
  externalPort: 2181
  internalPort: 2181
resources:
  {}
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
nodeSelector: {}

etcd:
  operatorEnabled: true
  endpoints: localhost:2379

etcd-operator:
  cluster:
    enabled: true
```

</details>

---

# CoreOS zetcd chart

This chart runs zetcd, a ZooKeeper "personality" for etcd.

## Introduction

This chart bootstraps zetcd and optionally an etcd-operator

## Official Documentation

Official project documentation found [here](https://github.com/coreos/zetcd)

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- **Suggested:** PV provisioner support in the underlying infrastructure to support backups of etcd

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install stable/zetcd --name my-release
```

**Note**: By default etcd-operator is installed with zetcd. `cluster.enabled` is set on install but it will have no effect.
Before you create a zetcd deployment, the TPR must be installed by the operator, so this option is ignored during helm installs. Alternatively, the release can be upgraded after install to launch the etcd cluster pods.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components EXCEPT the persistent volume.

## Updating

Updating the TPR resource will not result in the cluster being update until `kubectl apply` for
TPRs is fixed see [kubernetes/issues/29542](https://github.com/kubernetes/kubernetes/issues/29542)
Work around options are documented [here](https://github.com/coreos/etcd-operator#resize-an-etcd-cluster)

## Configuration

The following table lists the configurable parameters of the zetcd chart and their default values. Check the etcd-operator chart for additional configuration options

| Parameter                   | Description                                                       | Default                |
| --------------------------- | ----------------------------------------------------------------- | ---------------------- |
| `replicaCount`              | Number of zetcd replicas to create                                | `1`                    |
| `image.repository`          | zetcd container image                                             | `quay.io/coreos/zetcd` |
| `image.tag`                 | zetcd container image tag                                         | `v0.0.3`               |
| `image.pullPolicy`          | zetcd container image pull policy                                 | `IfNotPresent`         |
| `resources.limits.cpu`      | CPU limit per zetcd pod                                           |                        |
| `resources.limits.memory`   | Memory limit per zetcd pod                                        |                        |
| `resources.requests.cpu`    | CPU request per zetcd pod                                         |                        |
| `resources.requests.memory` | Memory request per zetcd pod                                      |                        |
| `nodeSelector`              | Node labels for pod assignment                                    | `{}`                   |
| `etcd.operatorEnabled`      | Whether to use etcd-operator to launch a cluster                  | `true`                 |
| `etcd.endpoints`            | Existing etcd endpoints to be used when etcd-operator is disabled | `localhost:2379`       |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```bash
$ helm install --name my-release --set image.tag=v0.0.3 stable/zetcd
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm install --name my-release --values values.yaml stable/zetcd
```
