# `@helm-charts/stable-seq`

Seq is the easiest way for development teams to capture, search and visualize structured log events! This page will walk you through the very quick setup process.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | seq    |
| Chart Version       | 0.1.2  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for seq.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

image:
  repository: datalust/seq
  tag: 5.0.832-pre
  pullPolicy: IfNotPresent

# By passing the value Y in the ACCEPT_EULA environment variable,
# you are expressing that you have read and accepted the terms in
# Seq End User License Agreement applicable to the Seq Docker image
# that you intend to use.
acceptEULA: 'Y'

service:
  type: ClusterIP
  port: 5341

ui:
  enabled: true

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

nodeSelector: {}

tolerations: []

affinity: {}

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true

  ## The path the volume will be mounted at, useful when using different
  ## Redis images.
  path: /data

  ## The subdirectory of the volume to mount to, useful in dev environments and one PV for multiple services.
  subPath: ''

  ## A manually managed Persistent Volume and Claim
  ## Requires persistence.enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:

  ## redis data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 8Gi
```

</details>

---

# Seq

[Seq](https://getseq.net/) is the easiest way for development teams to capture, search and visualize structured log events!

## TL;DR;

```bash
$ helm install seq
```

## Introduction

This chart bootstraps a [Seq](https://hub.docker.com/r/datalust/seq/) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.9+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release seq
```

The command deploys Seq on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Seq chart and their default values.

| Parameter                   | Description                                                                                | Default                      |
| --------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------- |
| `image.repository`          | Image repository                                                                           | `datalust/seq`               |
| `image.tag`                 | Seq image tag. Possible values listed [here](https://hub.docker.com/r/datalust/seq/tags/). | `5.0.832-pre`                |
| `image.pullPolicy`          | Image pull policy                                                                          | `IfNotPresent`               |
| `acceptEULA`                | Accept EULA                                                                                | `Y`                          |
| `service.type`              | Kubernetes service type                                                                    | `ClusterIP`                  |
| `service.port`              | Kubernetes port where service is exposed                                                   | `5341`                       |
| `persistence.enabled`       | Use persistent volume to store data                                                        | `true`                       |
| `persistence.size`          | Size of persistent volume claim                                                            | `8Gi`                        |
| `persistence.existingClaim` | Use an existing PVC to persist data                                                        | `nil`                        |
| `persistence.storageClass`  | Type of persistent volume claim                                                            | `generic`                    |
| `persistence.accessMode`    | ReadWriteOnce or ReadOnly                                                                  | `ReadWriteOnce`              |
| `persistence.subPath`       | Mount a sub directory of the persistent volume if set                                      | `""`                         |
| `resources`                 | CPU/Memory resource requests/limits                                                        | Memory: `256Mi`, CPU: `100m` |
| `nodeSelector`              | Node labels for pod assignment                                                             | `{}`                         |
| `affinity`                  | Affinity settings for pod assignment                                                       | `{}`                         |
| `tolerations`               | Toleration labels for pod assignment                                                       | `[]`                         |

Some of the parameters above map to the env variables defined in the [Seq DockerHub image](https://hub.docker.com/r/datalust/seq/).

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set persistence.size=8Gi \
    seq
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml seq
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Seq](https://hub.docker.com/r/datalust/seq/) image stores the Seq data and configurations at the `/data` path of the container.

By default, the chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) at this location. The volume is created using dynamic volume provisioning. If a Persistent Volume Claim already exists, specify it during installation.

### Existing PersistentVolumeClaim

1. Create the PersistentVolume
1. Create the PersistentVolumeClaim
1. Install the chart

```bash
$ helm install --set persistence.existingClaim=PVC_NAME seq
```
