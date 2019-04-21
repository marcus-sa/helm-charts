# `@helm-charts/stable-redis-ha`

Highly available Kubernetes implementation of Redis

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | redis-ha |
| Chart Version       | 3.3.3    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
image:
  repository: redis
  tag: 5.0.3-alpine
  pullPolicy: IfNotPresent
## replicas number for each component
replicas: 3

## Custom labels for the redis pod
labels: {}

## Pods Service Account
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
serviceAccount:
  ## Specifies whether a ServiceAccount should be created
  ##
  create: true
  ## The name of the ServiceAccount to use.
  ## If not set and create is true, a name is generated using the redis-ha.fullname template
  # name:

## Role Based Access
## Ref: https://kubernetes.io/docs/admin/authorization/rbac/
##

rbac:
  create: true

## Redis specific configuration options
redis:
  port: 6379
  masterGroupName: mymaster
  config:
    ## Additional redis conf options can be added below
    ## For all available options see http://download.redis.io/redis-stable/redis.conf
    min-slaves-to-write: 1
    min-slaves-max-lag: 5 # Value in seconds
    maxmemory: '0' # Max memory to use for each redis instance. Default is unlimited.
    maxmemory-policy: 'volatile-lru' # Max memory policy to use for each redis instance. Default is volatile-lru.
    # Determines if scheduled RDB backups are created. Default is false.
    # Please note that local (on-disk) RDBs will still be created when re-syncing with a new slave. The only way to prevent this is to enable diskless replication.
    save: '900 1'
    # When enabled, directly sends the RDB over the wire to slaves, without using the disk as intermediate storage. Default is false.
    repl-diskless-sync: 'yes'
    rdbcompression: 'yes'
    rdbchecksum: 'yes'

  ## Custom redis.conf files used to override default settings. If this file is
  ## specified then the redis.config above will be ignored.
  # customConfig: |-
  # Define configuration here

  resources: {}
  #  requests:
  #    memory: 200Mi
  #    cpu: 100m
  #  limits:
  #    memory: 700Mi

## Sentinel specific configuration options
sentinel:
  port: 26379
  quorum: 2
  config:
    ## Additional sentinel conf options can be added below. Only options that
    ## are expressed in the format simialar to 'sentinel xxx mymaster xxx' will
    ## be properly templated.
    ## For available options see http://download.redis.io/redis-stable/sentinel.conf
    down-after-milliseconds: 10000
    ## Failover timeout value in milliseconds
    failover-timeout: 180000
    parallel-syncs: 5

  ## Custom sentinel.conf files used to override default settings. If this file is
  ## specified then the sentinel.config above will be ignored.
  # customConfig: |-
  # Define configuration here

  resources: {}
  #  requests:
  #    memory: 200Mi
  #    cpu: 100m
  #  limits:
  #    memory: 200Mi

securityContext:
  runAsUser: 1000
  fsGroup: 1000
  runAsNonRoot: true

## Node labels, affinity, and tolerations for pod assignment
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#taints-and-tolerations-beta-feature
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
affinity: |
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchLabels:
            app: {{ template "redis-ha.name" . }}
            release: {{ .Release.Name }}
        topologyKey: kubernetes.io/hostname
    preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchLabels:
              app:  {{ template "redis-ha.name" . }}
              release: {{ .Release.Name }}
          topologyKey: failure-domain.beta.kubernetes.io/zone

# Prometheus exporter specific configuration options
exporter:
  enabled: false
  image: oliver006/redis_exporter
  tag: v0.31.0
  pullPolicy: IfNotPresent

  # prometheus port & scrape path
  port: 9121
  scrapePath: /metrics

  # cpu/memory resource limits/requests
  resources: {}

  # Additional args for redis exporter
  extraArgs: {}

podDisruptionBudget:
  {}
  # maxUnavailable: 1
  # minAvailable: 1

## Configures redis with AUTH (requirepass & masterauth conf params)
auth: false
# redisPassword:

## Use existing secret containing "auth" key (ignores redisPassword)
# existingSecret:

persistentVolume:
  enabled: true
  ## redis-ha data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessModes:
    - ReadWriteOnce
  size: 10Gi
  annotations: {}
init:
  resources: {}

# To use a hostPath for data, set persistentVolume.enabled to false
# and define hostPath.path.
# Warning: this might overwrite existing folders on the host system!
hostPath:
  ## path is evaluated as template so placeholders are replaced
  # path: "/data/{{ .Release.Name }}"

  # if chown is true, an init-container with root permissions is launched to
  # change the owner of the hostPath folder to the user defined in the
  # security context
  chown: true
```

</details>

---

# Redis

[Redis](http://redis.io/) is an advanced key-value cache and store. It is often referred to as a data structure server since keys can contain strings, hashes, lists, sets, sorted sets, bitmaps and hyperloglogs.

## TL;DR;

```bash
$ helm install stable/redis-ha
```

By default this chart install 3 pods total:

- one pod containing a redis master and sentinel container (optional prometheus metrics exporter sidecar available)
- two pods each containing a redis slave and sentinel containers (optional prometheus metrics exporter sidecars available)

## Introduction

This chart bootstraps a [Redis](https://redis.io) highly available master/slave statefulset in a [Kubernetes](http://kubernetes.io) cluster using the Helm package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Upgrading the Chart

Please note that there have been a number of changes simplifying the redis management strategy (for better failover and elections) in the 3.x version of this chart. These changes allow the use of official [redis](https://hub.docker.com/_/redis/) images that do not require special RBAC or ServiceAccount roles. As a result when upgrading from version >=2.0.1 to >=3.0.0 of this chart, `Role`, `RoleBinding`, and `ServiceAccount` resources should be deleted manually.

## Installing the Chart

To install the chart

```bash
$ helm install stable/redis-ha
```

The command deploys Redis on the Kubernetes cluster in the default configuration. By default this chart install one master pod containing redis master container and sentinel container along with 2 redis slave pods each containing their own sentinel sidecars. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the deployment:

```bash
$ helm delete <chart-name>
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Redis chart and their default values.

| Parameter                | Description                                                                                                                                                                                              | Default                                                                                    |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| `image`                  | Redis image                                                                                                                                                                                              | `redis`                                                                                    |
| `tag`                    | Redis tag                                                                                                                                                                                                | `5.0.3-alpine`                                                                             |
| `replicas`               | Number of redis master/slave pods                                                                                                                                                                        | `3`                                                                                        |
| `serviceAccount.create`  | Specifies whether a ServiceAccount should be created                                                                                                                                                     | `true`                                                                                     |
| `serviceAccount.name`    | The name of the ServiceAccount to create                                                                                                                                                                 | Generated using the redis-ha.fullname template                                             |
| `rbac.create`            | Create and use RBAC resources                                                                                                                                                                            | `true`                                                                                     |
| `redis.port`             | Port to access the redis service                                                                                                                                                                         | `6379`                                                                                     |
| `redis.masterGroupName`  | Redis convention for naming the cluster group                                                                                                                                                            | `mymaster`                                                                                 |
| `redis.config`           | Any valid redis config options in this section will be applied to each server (see below)                                                                                                                | see values.yaml                                                                            |
| `redis.customConfig`     | Allows for custom redis.conf files to be applied. If this is used then `redis.config` is ignored                                                                                                         | ``                                                                                         |
| `redis.resources`        | CPU/Memory for master/slave nodes resource requests/limits                                                                                                                                               | `{}`                                                                                       |
| `sentinel.port`          | Port to access the sentinel service                                                                                                                                                                      | `26379`                                                                                    |
| `sentinel.quorum`        | Minimum number of servers necessary to maintain quorum                                                                                                                                                   | `2`                                                                                        |
| `sentinel.config`        | Valid sentinel config options in this section will be applied as config options to each sentinel (see below)                                                                                             | see values.yaml                                                                            |
| `sentinel.customConfig`  | Allows for custom sentinel.conf files to be applied. If this is used then `sentinel.config` is ignored                                                                                                   | ``                                                                                         |
| `sentinel.resources`     | CPU/Memory for sentinel node resource requests/limits                                                                                                                                                    | `{}`                                                                                       |
| `init.resources`         | CPU/Memory for init Container node resource requests/limits                                                                                                                                              | `{}`                                                                                       |
| `auth`                   | Enables or disables redis AUTH (Requires `redisPassword` to be set)                                                                                                                                      | `false`                                                                                    |
| `redisPassword`          | A password that configures a `requirepass` and `masterauth` in the conf parameters (Requires `auth: enabled`)                                                                                            | ``                                                                                         |
| `existingSecret`         | An existing secret containing an `auth` key that configures `requirepass` and `masterauth` in the conf parameters (Requires `auth: enabled`, cannot be used in conjunction with `.Values.redisPassword`) | ``                                                                                         |
| `nodeSelector`           | Node labels for pod assignment                                                                                                                                                                           | `{}`                                                                                       |
| `tolerations`            | Toleration labels for pod assignment                                                                                                                                                                     | `[]`                                                                                       |
| `podAntiAffinity.server` | Antiaffinity for pod assignment of servers, `hard` or `soft`                                                                                                                                             | `Hard node and soft zone anti-affinity`                                                    |
| `exporter.enabled`       | If `true`, the prometheus exporter sidecar is enabled                                                                                                                                                    | `false`                                                                                    |
| `exporter.image`         | Exporter image                                                                                                                                                                                           | `oliver006/redis_exporter`                                                                 |
| `exporter.tag`           | Exporter tag                                                                                                                                                                                             | `v0.31.0`                                                                                  |
| `exporter.annotations`   | Prometheus scrape annotations                                                                                                                                                                            | `{prometheus.io/path: /metrics, prometheus.io/port: "9121", prometheus.io/scrape: "true"}` |
| `exporter.extraArgs`     | Additional args for the exporter                                                                                                                                                                         | `{}`                                                                                       |
| `hostPath.path`          | Use this path on the host for data storage                                                                                                                                                               | not set                                                                                    |
| `hostPath.chown`         | Run an init-container as root to set ownership on the hostPath                                                                                                                                           | true                                                                                       |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install \
  --set image=redis \
  --set tag=5.0.3-alpine \
    stable/redis-ha
```

The above command sets the Redis server within `default` namespace.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install -f values.yaml stable/redis-ha
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Custom Redis and Sentinel config options

This chart allows for most redis or sentinel config options to be passed as a key value pair through the `values.yaml` under `redis.config` and `sentinel.config`. See links below for all available options.

[Example redis.conf](http://download.redis.io/redis-stable/redis.conf)
[Example sentinel.conf](http://download.redis.io/redis-stable/sentinel.conf)

For example `repl-timeout 60` would be added to the `redis.config` section of the `values.yaml` as:

```yml
repl-timeout: '60'
```

Sentinel options supported must be in the the `sentinel <option> <master-group-name> <value>` format. For example, `sentinel down-after-milliseconds 30000` would be added to the `sentinel.config` section of the `values.yaml` as:

```yml
down-after-milliseconds: 30000
```

If more control is needed from either the redis or sentinel config then an entire config can be defined under `redis.customConfig` or `sentinel.customConfig`. Please note that these values will override any configuration options under their respective section. For example, if you define `sentinel.customConfig` then the `sentinel.config` is ignored.
