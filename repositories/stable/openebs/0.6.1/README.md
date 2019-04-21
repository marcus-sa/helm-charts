# `@helm-charts/stable-openebs`

Containerized Storage for Containers

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | openebs |
| Chart Version       | 0.6.1   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for openebs.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  create: true
  name:

image:
  pullPolicy: IfNotPresent

apiserver:
  image: 'openebs/m-apiserver'
  imageTag: '0.6.0'
  replicas: 1
  ports:
    externalPort: 5656
    internalPort: 5656
  nodeSelector: {}
  tolerations: []
  affinity: {}

provisioner:
  image: 'openebs/openebs-k8s-provisioner'
  imageTag: '0.6.0'
  replicas: 1
  nodeSelector: {}
  tolerations: []
  affinity: {}

snapshotOperator:
  controller:
    image: 'openebs/snapshot-controller'
    imageTag: '0.6.0'
  provisioner:
    image: 'openebs/snapshot-provisioner'
    imageTag: '0.6.0'
  replicas: 1
  upgradeStrategy: 'Recreate'
  nodeSelector: {}
  tolerations: []
  affinity: {}

jiva:
  image: 'openebs/jiva'
  imageTag: '0.6.0'
  replicas: 3
  replicaNodeSelector:
    # Enable this option and specify the node label that will be used to
    # select the nodes where replica pods are scheduled. To use this feature,
    # the nodes should already be labeled with the key=value. For example:
    # `kubectl label nodes <node-name> nodetype=storage
    enabled: false
    value: 'nodetype=storage'

policies:
  monitoring:
    enabled: true
    image: 'openebs/m-exporter'
    imageTag: '0.6.0'
```

</details>

---

# OpenEBS

[OpenEBS](https://github.com/openebs/openebs) is an open source storage platform that provides persistent and containerized block storage for DevOps and container environments.

OpenEBS can be deployed on any Kubernetes cluster - either in cloud, on-premise or developer laptop (minikube). OpenEBS itself is deployed as just another container on your cluster, and enables storage services that can be designated on a per pod, application, cluster or container level.

## Introduction

This chart bootstraps OpenEBS deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.7.5+ with RBAC enabled
- iSCSI PV support in the underlying infrastructure

## Installing OpenEBS

```
helm install stable/openebs
```

## Installing OpenEBS with the release name `my-release`:

```
helm install --name `my-release` stable/openebs
```

## To uninstall/delete the `my-release` deployment:

```
helm ls --all
helm delete `my-release`
```

## Configuration

The following table lists the configurable parameters of the OpenEBS chart and their default values.

| Parameter                               | Description                                   | Default                           |
| --------------------------------------- | --------------------------------------------- | --------------------------------- |
| `rbac.create`                           | Enable RBAC Resources                         | `true`                            |
| `serviceAccount.create`                 | Specify if Service Account should be created  | `true`                            |
| `serviceAccount.name`                   | Specify the name of service account           | `openebs-maya-operator`           |
| `image.pullPolicy`                      | Container pull policy                         | `IfNotPresent`                    |
| `apiserver.image`                       | Docker Image for API Server                   | `openebs/m-apiserver`             |
| `apiserver.imageTag`                    | Docker Image Tag for API Server               | `0.6.0`                           |
| `apiserver.replicas`                    | Number of API Server Replicas                 | `1`                               |
| `provisioner.image`                     | Docker Image for Provisioner                  | `openebs/openebs-k8s-provisioner` |
| `provisioner.imageTag`                  | Docker Image Tag for Provisioner              | `0.6.0`                           |
| `provisioner.replicas`                  | Number of Provisioner Replicas                | `1`                               |
| `snapshotOperator.provisioner.image`    | Docker Image for Snapshot Provisioner         | `openebs/snapshot-provisioner`    |
| `snapshotOperator.provisioner.imageTag` | Docker Image Tag for Snapshot Provisioner     | `0.6.0`                           |
| `snapshotOperator.controller.image`     | Docker Image for Snapshot Controller          | `openebs/snapshot-controller`     |
| `snapshotOperator.controller.imageTag`  | Docker Image Tag for Snapshot Controller      | `0.6.0`                           |
| `snapshotOperator.replicas`             | Number of Snapshot Operator Replicas          | `1`                               |
| `jiva.image`                            | Docker Image for Jiva                         | `openebs/jiva`                    |
| `jiva.imageTag`                         | Docker Image Tag for Jiva                     | `0.6.0`                           |
| `jiva.replicas`                         | Number of Jiva Replicas                       | `3`                               |
| `jiva.replicaNodeSelector.enabled`      | Enable scheduling replicas with node selector | `false`                           |
| `jiva.replicaNodeSelector.value`        | node labels assigned to replica pods          | `nodetype=storage`                |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```shell
helm install --name `my-release` -f values.yaml stable/openebs
```

> **Tip**: You can use the default [values.yaml](values.yaml)
