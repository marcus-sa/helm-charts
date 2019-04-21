# `@helm-charts/incubator-fluentd-elasticsearch`

A Fluentd Helm chart for Kubernetes with Elasticsearch output

| Field               | Value                 |
| ------------------- | --------------------- |
| Repository Name     | incubator             |
| Chart Name          | fluentd-elasticsearch |
| Chart Version       | 0.1.4                 |
| NPM Package Version | 0.1.0                 |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image: gcr.io/google-containers/fluentd-elasticsearch
imageTag: v2.0.4

## Specify an imagePullPolicy (Required)
## It's recommended to change this to 'Always' if the image tag is 'latest'
## ref: http://kubernetes.io/docs/user-guide/images/#updating-images
imagePullPolicy: IfNotPresent

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  limits:
    cpu: 100m
    memory: 500Mi
  requests:
    cpu: 100m
    memory: 200Mi

elasticsearch:
  host: 'elasticsearch-client'
  port: 9200
  buffer_chunk_limit: 2M
  buffer_queue_limit: 8

rbac:
  create: true

annotations:
  {}
  # prometheus.io/scrape: "true"
  # prometheus.io/port: "24231"

tolerations:
  {}
  # - key: node-role.kubernetes.io/master
  #   operator: Exists
  #   effect: NoSchedule

configMaps:
  output.conf: |
    # Enriches records with Kubernetes metadata
    <filter kubernetes.**>
      @type kubernetes_metadata
    </filter>

    <match **>
      @id elasticsearch
      @type elasticsearch
      @log_level info
      include_tag_key true
      host "#{ENV['OUTPUT_HOST']}"
      port "#{ENV['OUTPUT_PORT']}"
      logstash_format true
      <buffer>
        @type file
        path /var/log/fluentd-buffers/kubernetes.system.buffer
        flush_mode interval
        retry_type exponential_backoff
        flush_thread_count 2
        flush_interval 5s
        retry_forever
        retry_max_interval 30
        chunk_limit_size "#{ENV['OUTPUT_BUFFER_CHUNK_LIMIT']}"
        queue_limit_length "#{ENV['OUTPUT_BUFFER_QUEUE_LIMIT']}"
        overflow_action block
      </buffer>
    </match>

# fluentdcustomconfig: |
#   # add fluentd custom configs here
```

</details>

---

# Fluentd Elasticsearch

- Installs [Fluentd](https://www.fluentd.org/) log forwarder.

## TL;DR;

```console
$ helm install incubator/fluentd-elasticsearch
```

## Introduction

This chart bootstraps a [Fluentd](https://www.fluentd.org/) daemonset on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release incubator/fluentd-elasticsearch
```

The command deploys Fluentd elasticsearch on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Fluentd elasticsearch chart and their default values.

| Parameter                          | Description                      | Default                                          |
| ---------------------------------- | -------------------------------- | ------------------------------------------------ |
| `annotations`                      | Optional deamon set annotations  | `NULL`                                           |
| `configMaps`                       | Fluentd configmaps               | `output.conf`                                    |
| `elasticsearch.host`               | Elstaicsearch Host               | `elasticsearch-client`                           |
| `elasticsearch.port`               | Elasticsearch Port               | `9200`                                           |
| `elasticsearch.buffer_chunk_limit` | Elasticsearch buffer chunk limit | `2M`                                             |
| `elasticsearch.buffer_queue_limit` | Elasticsearch buffer queue limit | `8`                                              |
| `fluentdcustomconfig`              | Optional custom configmaps       | `NULL`                                           |
| `image`                            | Image                            | `gcr.io/google-containers/fluentd-elasticsearch` |
| `imageTag`                         | Image tag                        | `v2.0.4                                          |
| `imagePullPolicy`                  | Image pull policy                | `Always` if `imageTag` is `imagePullPolicy`      |
| `rbac.create`                      | RBAC                             | `true`                                           |
| `resources.limits.cpu`             | CPU limit                        | `100m`                                           |
| `resources.limits.memory`          | Memory limit                     | `500Mi`                                          |
| `resources.requests.cpu`           | CPU request                      | `100m`                                           |
| `resources.requests.memory`        | Memory request                   | `200Mi`                                          |
| `tolerations`                      | Optional daemonset tolerations   | `NULL`                                           |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
    incubator/fluentd-elasticsearch
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml incubator/fluentd-elasticsearch
```
