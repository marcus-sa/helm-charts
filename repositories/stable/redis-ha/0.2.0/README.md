# `@helm-charts/stable-redis-ha`

Highly available Redis cluster with multiple sentinels and standbys.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | redis-ha |
| Chart Version       | 0.2.0    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  master:
    requests:
      memory: 200Mi
      cpu: 100m
    limits:
      memory: 700Mi
  slave:
    requests:
      memory: 200Mi
      cpu: 100m
    limits:
      memory: 200Mi
  sentinel:
    requests:
      memory: 200Mi
      cpu: 100m
    limits:
      memory: 200Mi

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistentVolume:
  ## If true, redis will create/use a Persistent Volume Claim
  ## If false, use emptyDir
  ##
  enabled: false

  ## Redis data Persistent Volume access modes
  ## Must match those of existing PV or dynamic provisioner
  ## Ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  accessModes:
    - ReadWriteOnce

  ## Redis data Persistent Volume Claim annotations
  ##
  annotations: {}

  ## Redis data Persistent Volume existing claim name
  ## Requires alertmanager.persistentVolume.enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  existingClaim: ''

  ## Redis data Persistent Volume mount root path
  ##
  mountPath: /data

  ## alertmanager data Persistent Volume size
  ##
  size: 2Gi

  ## Redis data Persistent Volume Storage Class
  ## If defined, volume.beta.kubernetes.io/storage-class: <storageClass>
  ## Default: volume.alpha.kubernetes.io/storage-class: default
  ##
  storageClass: ''

  ## Subdirectory of redis data Persistent Volume to mount
  ## Useful if the volume's root directory is not empty
  ##
  subPath: ''

## Redis image version
redis_image: gcr.io/google_containers/redis:v1

## replicas number for each component

replicas:
  master: 1
  slave: 1
  sentinel: 3
```

</details>

---

# Redis

[Redis](http://redis.io/) is an advanced key-value cache and store. It is often referred to as a data structure server since keys can contain strings, hashes, lists, sets, sorted sets, bitmaps and hyperloglogs.

## TL;DR;

```bash
$ helm install stable/redis-ha
```

By default this chart install one master pod containing redis master container and sentinel container, 2 sentinels and 1 redis slave.

## Introduction

This chart bootstraps a [Redis](https://github.com/bitnami/bitnami-docker-redis) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.5+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart

```bash
$ helm install stable/redis-ha
```

The command deploys Redis on the Kubernetes cluster in the default configuration. By default this chart install one master pod containing redis master container and sentinel container, 2 sentinels and 1 redis slave. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the deployment:

```bash
$ helm delete <chart-name>
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Redis chart and their default values.

| Parameter                        | Description                                           | Default                             |
| -------------------------------- | ----------------------------------------------------- | ----------------------------------- |
| `redis_image`                    | Redis image                                           | `gcr.io/google_containers/redis:v1` |
| `persistentVolume.enabled`       | Use a PVC to persist data                             | `false`                             |
| `persistentVolume.storageClass`  | Storage class of backing PVC                          | `generic`                           |
| `persistentVolume.accessMode`    | Use volume as ReadOnly or ReadWrite                   | `ReadWriteOnce`                     |
| `persistentVolume.size`          | Size of data volume                                   | `8Gi`                               |
| `persistentVolume.annotations`   | Redis data Persistent Volume Claim annotations        | `{}`                                |
| `persistentVolume.existingClaim` | Redis data Persistent Volume existing claim name      | ``                                  |
| `persistentVolume.mountPath`     | Redis data Persistent Volume mount root path          | `/data`                             |
| `persistentVolume.subPath`       | Subdirectory of redis data Persistent Volume to mount | ``                                  |
| `resources.master`               | CPU/Memory for master nodes resource requests/limits  | Memory: `200Mi`, CPU: `100m`        |
| `resources.slave`                | CPU/Memory for slave nodes resource requests/limits   | Memory: `200Mi`, CPU: `100m`        |
| `resources.sentinel`             | CPU/Memory for sentinel node resource requests/limits | Memory: `200Mi`, CPU: `100m`        |
| `replicas.master`                | Number of master pods                                 | 1                                   |
| `replicas.slave`                 | Number of slave pods                                  | 1                                   |
| `replicas.sentinel`              | Number of sentinel pods                               | 3                                   |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install \
  --set redis_image=gcr.io/google_containers/redis:v1 \
    stable/redis-ha
```

The above command sets the Redis server within `default` namespace.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install -f values.yaml stable/redis-ha
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The chart mounts a [Persistent Volume](kubernetes.io/docs/user-guide/persistent-volumes/) volume at this location. The volume is created using dynamic volume provisioning.
