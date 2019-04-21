# `@helm-charts/kiwigrid-prometheus-thanos`

A Helm chart for thanos querier and store gateway

| Field               | Value             |
| ------------------- | ----------------- |
| Repository Name     | kiwigrid          |
| Chart Name          | prometheus-thanos |
| Chart Version       | 0.4.1             |
| NPM Package Version | 0.1.0             |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for prometheus-thanos.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

nameOverride: ''
fullnameOverride: ''
cluster:
  enabled: false
  port: 10900
  address: 0.0.0.0

service:
  querier:
    type: ClusterIP
    http:
      port: 9090
    grpc:
      port: 10901
  storeGateway:
    type: ClusterIP
    http:
      port: 9090
    grpc:
      port: 10901

querier:
  replicaCount: 1
  image:
    repository: improbable/thanos
    tag: v0.3.2
    pullPolicy: IfNotPresent
  replicaLabel: replica
  logLevel: info
  stores: []
  additionalFlags: {}
  resources: {}
  nodeSelector: {}
  tolerations: []
  affinity: {}
  livenessProbe:
    initialDelaySeconds: 30
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 30
  readinessProbe:
    initialDelaySeconds: 30
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 30
storeGateway:
  replicaCount: 1
  image:
    repository: improbable/thanos
    tag: v0.3.2
    pullPolicy: IfNotPresent
  extraEnv:
  # - name: GOOGLE_APPLICATION_CREDENTIALS
  #   value: /etc/gcp/secrets/credentials.json
  logLevel: info
  indexCacheSize: 500MB
  chunkPoolSize: 500MB

  objStoreType: GCS
  additionalFlags: {}
  objStoreConfig:
  ## GCS example
  #  bucket: demo-bucket

  ## S3 example
  #  bucket: demo-bucket
  #  access_key: smth
  #  secret_key: Need8Chars
  #  endpoint: a
  #  insecure: true
  resources: {}
  nodeSelector: {}
  tolerations: []
  affinity: {}
  livenessProbe:
    initialDelaySeconds: 30
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 30
  readinessProbe:
    initialDelaySeconds: 30
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 30
  volumeMounts:
  volumes:

compact:
  replicaCount: 1
  image:
    repository: improbable/thanos
    tag: v0.3.2
    pullPolicy: IfNotPresent
  logLevel: info
  retentionResolutionRaw: 30d
  retentionResolution5m: 30d
  retentionResolution1h: 10y
  syncDelay: 30m
  additionalFlags: {}
  objStoreConfig:
  ## GCS example
  #  bucket: demo-bucket

  ## S3 example
  #  bucket: demo-bucket
  #  access_key: smth
  #  secret_key: Need8Chars
  #  endpoint: a
  #  insecure: true
  extraEnv:
  # - name: GOOGLE_APPLICATION_CREDENTIALS
  #   value: /etc/gcp/secrets/credentials.json
  resources: {}
  nodeSelector: {}
  tolerations: []
  affinity: {}
## this is only for test support dont use this in production
minio:
  enabled: false
any-resource:
  enabled: false
```

</details>

---

# Prometheus Thanos

## Introduction

[Thanos](https://github.com/improbable-eng/thanos/) is a set of components that can be composed into a highly available metric system with unlimited storage capacity, which can be added seamlessly on top of existing Prometheus deployments.

Thanos leverages the Prometheus 2.0 storage format to cost-efficiently store historical metric data in any object storage while retaining fast query latencies. Additionally, it provides a global query view across all Prometheus installations and can merge data from Prometheus HA pairs on the fly..

## Prerequisites

- Has been tested on Kubernetes 1.11+

## Installing the Chart

To install the chart you have to set `objStoreConfig`.
To install the chart with the release name `prometheus-thanos`, run the following command:

```bash
$ helm install kiwigrid/prometheus-thanos --name prometheus-thanos --values=my-values.yaml
```

## Uninstalling the Chart

To uninstall/delete the `prometheus-thanos` deployment:

```bash
$ helm delete prometheus-thanos
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

> **Tip**: To completely remove the release, run `helm delete --purge prometheus-thanos`

## Configuration

The following table lists the configurable parameters of the prometheus-thanos chart and their default values.

| Parameter                                         | Description                                                                                         | Default             |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------- |
| `querier.replicaCount`                            | replica count for querier                                                                           | `1`                 |
| `querier.image.repository`                        | Docker image repo for querier                                                                       | `improbable/thanos` |
| `querier.image.tag`                               | Docker image tag for querier                                                                        | `v0.3.2`            |
| `querier.image.pullPolicy`                        | Docker image pull policy for querier                                                                | `IfNotPresent`      |
| `storeGateway.replicaCount`                       | for store gateway                                                                                   | `1`                 |
| `storeGateway.image.repository`                   | Docker image repo for store gateway                                                                 | `improbable/thanos` |
| `storeGateway.image.tag`                          | Docker image tag for store gateway                                                                  | `v0.3.2`            |
| `storeGateway.image.pullPolicy`                   | Docker image pull policy for store gateway                                                          | `IfNotPresent`      |
| `compact.replicaCount`                            | for store gateway                                                                                   | `1`                 |
| `compact.image.repository`                        | Docker image repo for store gateway                                                                 | `improbable/thanos` |
| `compact.image.tag`                               | Docker image tag for store gateway                                                                  | `v0.3.2`            |
| `compact.image.pullPolicy`                        | Docker image pull policy for store gateway                                                          | `IfNotPresent`      |
| `cluster.enabled`                                 | enable cluster mode                                                                                 | `false`             |
| `cluster.port`                                    | cluster port                                                                                        | `10900`             |
| `cluster.address`                                 | cluster listen address                                                                              | `0.0.0.0`           |
| `service.querier.type`                            | Service type for the querier                                                                        | `ClusterIP`         |
| `service.querier.http.port`                       | Service http port for the querier                                                                   | `9090`              |
| `service.querier.grpc.port`                       | Service grpc port for the querier                                                                   | `10901`             |
| `service.storeGateway.type`                       | Service type for the store gateway                                                                  | `ClusterIP`         |
| `service.storeGateway.http.port`                  | Service http port for the store gateway                                                             | `9090`              |
| `service.storeGateway.grpc.port`                  | Service grpc port for the store gateway                                                             | `10901`             |
| `querier.logLevel`                                | querier log level                                                                                   | `info`              |
| `querier.stores`                                  | list of stores [see](https://github.com/improbable-eng/thanos/blob/master/docs/components/query.md) | `[]`                |
| `querier.additionalFlags`                         | additional command line flags                                                                       | `{}`                |
| `querier.livenessProbe.initialDelaySeconds`       | liveness probe initialDelaySeconds                                                                  | `30`                |
| `querier.livenessProbe.periodSeconds`             | liveness probe periodSeconds                                                                        | `10`                |
| `querier.livenessProbe.successThreshold`          | liveness probe successThreshold                                                                     | `1`                 |
| `querier.livenessProbe.timeoutSeconds`            | liveness probe timeoutSeconds                                                                       | `30`                |
| `querier.readinessProbe.initialDelaySeconds`      | readiness probe initialDelaySeconds                                                                 | `30`                |
| `querier.readinessProbe.periodSeconds`            | readiness probe periodSeconds                                                                       | `10`                |
| `querier.readinessProbe.successThreshold`         | readiness probe successThreshold                                                                    | `1`                 |
| `querier.readinessProbe.timeoutSeconds`           | readiness probe timeoutSeconds                                                                      | `30`                |
| `querier.resources`                               | Resources                                                                                           | `{}`                |
| `querier.nodeSelector`                            | NodeSelector                                                                                        | `{}`                |
| `querier.tolerations`                             | Tolerations                                                                                         | `[]`                |
| `querier.affinity`                                | Affinity                                                                                            | `{}`                |
| `querier.volumeMounts`                            | additional volume mounts                                                                            | `nil`               |
| `querier.volumes`                                 | additional volumes                                                                                  | `nil`               |
| `storeGateway.extraEnv`                           | extra env vars                                                                                      | `nil`               |
| `storeGateway.logLevel`                           | store gateway log level                                                                             | `info`              |
| `storeGateway.indexCacheSize`                     | index cache size                                                                                    | `500MB`             |
| `storeGateway.chunkPoolSize`                      | chunk pool size                                                                                     | `500MB`             |
| `storeGateway.objStoreType`                       | object store [type](https://github.com/improbable-eng/thanos/blob/master/docs/storage.md)           | `GCS`               |
| `storeGateway.additionalFlags`                    | additional command line flags                                                                       | `{}`                |
| `storeGateway.objStoreConfig`                     | config for the [bucket store](https://github.com/improbable-eng/thanos/blob/master/docs/storage.md) | `nil`               |
| `storeGateway.livenessProbe.initialDelaySeconds`  | liveness probe initialDelaySeconds                                                                  | `30`                |
| `storeGateway.livenessProbe.periodSeconds`        | liveness probe periodSeconds                                                                        | `10`                |
| `storeGateway.livenessProbe.successThreshold`     | liveness probe successThreshold                                                                     | `1`                 |
| `storeGateway.livenessProbe.timeoutSeconds`       | liveness probe timeoutSeconds                                                                       | `30`                |
| `storeGateway.readinessProbe.initialDelaySeconds` | readiness probe initialDelaySeconds                                                                 | `30`                |
| `storeGateway.readinessProbe.periodSeconds`       | readiness probe periodSeconds                                                                       | `10`                |
| `storeGateway.readinessProbe.successThreshold`    | readiness probe successThreshold                                                                    | `1`                 |
| `storeGateway.readinessProbe.timeoutSeconds`      | readiness probe timeoutSeconds                                                                      | `30`                |
| `storeGateway.resources`                          | Resources                                                                                           | `{}`                |
| `storeGateway.nodeSelector`                       | NodeSelector                                                                                        | `{}`                |
| `storeGateway.tolerations`                        | Tolerations                                                                                         | `[]`                |
| `storeGateway.affinity`                           | Affinity                                                                                            | `{}`                |
| `storeGateway.volumeMounts`                       | additional volume mounts                                                                            | `nil`               |
| `storeGateway.volumes`                            | additional volumes                                                                                  | `nil`               |
| `compact.extraEnv`                                | extra env vars                                                                                      | `nil`               |
| `compact.logLevel`                                | store gateway log level                                                                             | `info`              |
| `compact.retentionResolutionRaw`                  | retention for raw buckets                                                                           | `30d`               |
| `compact.retentionResolution5m`                   | retention for 5m buckets                                                                            | `120d`              |
| `compact.retentionResolution1h`                   | retention for 1h buckets                                                                            | `10y`               |
| `compact.syncDelay`                               | sync delay                                                                                          | `30m`               |
| `compact.objStoreType`                            | object store [type](https://github.com/improbable-eng/thanos/blob/master/docs/storage.md)           | `GCS`               |
| `compact.additionalFlags`                         | additional command line flags                                                                       | `{}`                |
| `compact.objStoreConfig`                          | config for the [bucket store](https://github.com/improbable-eng/thanos/blob/master/docs/storage.md) | `nil`               |
| `compact.resources`                               | Resources                                                                                           | `{}`                |
| `compact.nodeSelector`                            | NodeSelector                                                                                        | `{}`                |
| `compact.tolerations`                             | Tolerations                                                                                         | `[]`                |
| `compact.affinity`                                | Affinity                                                                                            | `{}`                |
| `compact.volumeMounts`                            | additional volume mounts                                                                            | `nil`               |
| `compact.volumes`                                 | additional volumes                                                                                  | `nil`               |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```bash
$ helm install --name prometheus-thanos --set ingress.enabled=false kiwigrid/prometheus-thanos
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart.
