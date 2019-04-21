# `@helm-charts/stable-elasticsearch-exporter`

Elasticsearch stats exporter for Prometheus

| Field               | Value                  |
| ------------------- | ---------------------- |
| Repository Name     | stable                 |
| Chart Name          | elasticsearch-exporter |
| Chart Version       | 0.4.1                  |
| NPM Package Version | 0.1.0                  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## number of exporter instances
##
replicaCount: 1

## restart policy for all containers
##
restartPolicy: Always

image:
  repository: justwatch/elasticsearch_exporter
  tag: 1.0.2
  pullPolicy: IfNotPresent

resources:
  {}
  # requests:
  #   cpu: 100m
  #   memory: 128Mi
  # limits:
  #   cpu: 100m
  #   memory: 128Mi

priorityClassName: ''

nodeSelector: {}

tolerations: {}

podAnnotations: {}

service:
  type: ClusterIP
  httpPort: 9108
  annotations: {}

es:
  ## Address (host and port) of the Elasticsearch node we should connect to.
  ## This could be a local node (localhost:9200, for instance), or the address
  ## of a remote Elasticsearch server. When basic auth is needed,
  ## specify as: <proto>://<user>:<password>@<host>:<port>. e.g., http://admin:pass@localhost:9200.
  ##
  uri: localhost:9200

  ## If true, query stats for all nodes in the cluster, rather than just the
  ## node we connect to.
  ##
  all: true

  ## If true, query stats for all indices in the cluster.
  ##
  indices: true

  ## Timeout for trying to get stats from Elasticsearch. (ex: 20s)
  ##
  timeout: 30s

  ssl:
    ## If true, a secure connection to ES cluster is used (requires SSL certs below)
    ##
    enabled: false

    ca:
      ## PEM that contains trusted CAs used for setting up secure Elasticsearch connection
      ##
      # pem:

    client:
      ## PEM that contains the client cert to connect to Elasticsearch.
      ##
      # pem:
      ## Private key for client auth when connecting to Elasticsearch
      ##
      # key:

web:
  ## Path under which to expose metrics.
  ##
  path: /metrics
```

</details>

---

# Elasticsearch Exporter

Prometheus exporter for various metrics about ElasticSearch, written in Go.

Learn more: https://github.com/justwatchcom/elasticsearch_exporter

## TL;DR;

```bash
$ helm install stable/elasticsearch-exporter
```

## Introduction

This chart creates an Elasticsearch-Exporter deployment on a [Kubernetes](http://kubernetes.io)
cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/elasticsearch-exporter
```

The command deploys Elasticsearch-Exporter on the Kubernetes cluster using the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete --purge my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Elasticsearch-Exporter chart and their default values.

| Parameter              | Description                                                                                  | Default                            |
| ---------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------- |
| `replicaCount`         | desired number of pods                                                                       | `1`                                |
| `restartPolicy`        | container restart policy                                                                     | `Always`                           |
| `image.repository`     | container image repository                                                                   | `justwatch/elasticsearch_exporter` |
| `image.tag`            | container image tag                                                                          | `1.0.2`                            |
| `image.pullPolicy`     | container image pull policy                                                                  | `IfNotPresent`                     |
| `resources`            | resource requests & limits                                                                   | `{}`                               |
| `priorityClassName`    | priorityClassName                                                                            | `nil`                              |
| `nodeSelector`         | Node labels for pod assignment                                                               | `{}`                               |
| `tolerations`          | Node tolerations for pod assignment                                                          | `{}`                               |
| `podAnnotations`       | Pod annotations                                                                              | `{}`                               |
| `service.type`         | type of service to create                                                                    | `ClusterIP`                        |
| `service.httpPort`     | port for the http service                                                                    | `9108`                             |
| `service.annotations`  | Annotations on the http service                                                              | `{}`                               |
| `es.uri`               | address of the Elasticsearch node to connect to                                              | `localhost:9200`                   |
| `es.all`               | if `true`, query stats for all nodes in the cluster, rather than just the node we connect to | `true`                             |
| `es.indices`           | if true, query stats for all indices in the cluster                                          | `true`                             |
| `es.timeout`           | timeout for trying to get stats from Elasticsearch                                           | `30s`                              |
| `es.ssl.enabled`       | If true, a secure connection to E cluster is used                                            | `false`                            |
| `es.ssl.client.ca.pem` | PEM that contains trusted CAs used for setting up secure Elasticsearch connection            |
| `es.ssl.client.pem`    | PEM that contains the client cert to connect to Elasticsearch                                |
| `es.ssl.client.key`    | Private key for client auth when connecting to Elasticsearch                                 |
| `web.path`             | path under which to expose metrics                                                           | `/metrics`                         |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
    --set key_1=value_1,key_2=value_2 \
    stable/elasticsearch-exporter
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
# example for staging
$ helm install --name my-release -f values.yaml stable/elasticsearch-exporter
```

> **Tip**: You can use the default [values.yaml](values.yaml)
