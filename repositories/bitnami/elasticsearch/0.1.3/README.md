# `@helm-charts/bitnami-elasticsearch`

A highly scalable open-source full-text search and analytics engine

| Field               | Value         |
| ------------------- | ------------- |
| Repository Name     | bitnami       |
| Chart Name          | elasticsearch |
| Chart Version       | 0.1.3         |
| NPM Package Version | 0.1.0         |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Elasticsearch cluster name
## ref: https://github.com/bitnami/bitnami-docker-elasticsearch#environment-variables
##
name: elastic

## Elasticsearch image
## ref: https://hub.docker.com/r/bitnami/elasticsearch/tags/
image:
  registry: docker.io
  repository: bitnami/elasticsearch
  tag: 5.5.2
  ## Specify a imagePullPolicy
  ## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  ##
  pullPolicy: IfNotPresent
  ## Optionally specify an array of imagePullSecrets.
  ## Secrets must be manually created in the namespace.
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  ##
  # pullSecrets:
  #   - myRegistrKeySecretName

## The serviceAccountName to be used, required by the elasticsearch-cloud-kubernetes plugin
serviceAccountName: default
## Comma seperated list of plugins
## ref: https://github.com/bitnami/bitnami-docker-elasticsearch#environment-variables
##
plugins: io.fabric8:elasticsearch-cloud-kubernetes:5.5.2
## Customize elasticsearch configuration
## ref: https://www.elastic.co/guide/en/elasticsearch/reference/current/settings.html
config:

master:
  name: master
  replicas: 2
  heapSize: 128m
  antiAffinity: 'soft'
  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    requests:
      cpu: 25m
      memory: '256Mi'

client:
  name: client
  replicas: 2
  heapSize: 128m
  antiAffinity: 'soft'
  service:
    type: ClusterIP
    ## Externally accessible elasticsearch REST API port
    port: 9200
  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    requests:
      cpu: 25m
      memory: '256Mi'

data:
  name: data
  replicas: 3
  heapSize: 1024m
  antiAffinity: 'soft'
  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    requests:
      cpu: 25m
      memory: '1152Mi'
  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  persistence:
    ## If true, use a Persistent Volume Claim, If false, use emptyDir
    ##
    enabled: true

    ## Persistent Volume Claim annotations
    ##
    annotations: {}

    ## Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"

    ## Persistent Volume Access Mode
    accessModes:
      - ReadWriteOnce

    ## Persistent Volume size
    ##
    size: 8Gi

metrics:
  enabled: false
  name: metrics
  image:
    name: justwatch/elasticsearch_exporter
    tag: 1.0.1
    pullPolicy: IfNotPresent
  annotations:
    prometheus.io/scrape: 'true'
    prometheus.io/port: '9108'
  service:
    type: ClusterIP
  resources:
    requests:
      cpu: 25m
```

</details>

---

# Elasticsearch

[Elasticsearch](https://www.elastic.co/products/elasticsearch) is a highly scalable open-source full-text search and analytics engine. It allows you to store, search, and analyze big volumes of data quickly and in near real time.

## TL;DR

```console
$ helm install incubator/elasticsearch
```

## Introduction

This chart bootstraps a [Elasticsearch](https://github.com/bitnami/bitnami-docker-elasticsearch) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.6+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release incubator/elasticsearch
```

The command deploys Elasticsearch on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Elasticsearch chart and their default values.

| Parameter                       | Description                                           | Default                                                             |
| ------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------- |
| `image.registry`                | ElasticSearch image registry                          | `docker.io`                                                         |
| `image.repository`              | ElasticSearch Image name                              | `bitnami/elasticsearch`                                             |
| `image.tag`                     | ElasticSearch Image tag                               | `{VERSION}`                                                         |
| `image.pullPolicy`              | ElasticSearch image pull policy                       | `Always` if `imageTag` is `latest`, else `IfNotPresent`             |
| `image.pullSecrets`             | Specify image pull secrets                            | `nil` (does not add image pull secrets to deployed pods)            |
| `name`                          | Elasticsearch cluster name                            | `elastic`                                                           |
| `serviceAccountName`            | Kubernetes service account                            | `default`                                                           |
| `plugins`                       | Elasticsearch node plugins                            | `io.fabric8:elasticsearch-cloud-kubernetes:5.5.2` (required plugin) |
| `config`                        | Elasticsearch node custom configuration               | ``                                                                  |
| `master.name`                   | Master node pod name                                  | `master`                                                            |
| `master.replicas`               | Desired number of Elasticsearch master eligible nodes | `2`                                                                 |
| `master.heapSize`               | master node heap size                                 | `128m`                                                              |
| `master.antiAffinity`           | Mater pod anti-affinity policy                        | `soft`                                                              |
| `master.resources`              | CPU/Memory resource requests/limits for master nodes  | `requests: { cpu: "25m", memory: "256Mi" }`                         |
| `client.name`                   | Client node pod name                                  | `client`                                                            |
| `client.replicas`               | Desired number of Elasticsearch client nodes          | `2`                                                                 |
| `client.heapSize`               | Client node heap size                                 | `128m`                                                              |
| `client.antiAffinity`           | Client pod anti-affinity policy                       | `soft`                                                              |
| `client.service`.type           | Client node kubernetes service type                   | `ClusterIP`                                                         |
| `client.service`.port           | Externally accessible elasticsearch REST API port     | `9200`                                                              |
| `client.resources`              | CPU/Memory resource requests/limits for client nodes  | `requests: { cpu: "25m", memory: "256Mi" }`                         |
| `data.name`                     | Data node pod name                                    | `data`                                                              |
| `data.replicas`                 | Desired number of Elasticsearch data eligible nodes   | `3`                                                                 |
| `data.heapSize`                 | data node heap size                                   | `1024m`                                                             |
| `data.antiAffinity`             | Data pod anti-affinity policy                         | `soft`                                                              |
| `data.resources`                | CPU/Memory resource requests/limits for data nodes    | `requests: { cpu: "25m", memory: "1152Mi" }`                        |
| `data.persistence.enabled`      | Enable persistence using a `PersistentVolumeClaim`    | `true`                                                              |
| `data.persistence.annotations`  | Persistent Volume Claim annotations                   | `{}`                                                                |
| `data.persistence.storageClass` | Persistent Volume Storage Class                       | ``                                                                  |
| `data.persistence.accessModes`  | Persistent Volume Access Modes                        | `[ReadWriteOnce]`                                                   |
| `data.persistence.size`         | Persistent Volume Size                                | `8Gi`                                                               |
| `metrics.enabled`               | Enable prometheus exporter                            | `false`                                                             |
| `metrics.name`                  | Metrics pod name                                      | `metrics`                                                           |
| `metrics.image.name`            | Metrics exporter image name                           | `justwatch/elasticsearch_exporter`                                  |
| `metrics.image.tag`             | Metrics exporter image tag                            | `1.0.1`                                                             |
| `metrics.image.pullPolicy`      | Metrics exporter image pull policy                    | `IfNotPresent`                                                      |
| `metrics.service.type`          | Metrics exporter endpoint service type                | `ClusterIP`                                                         |
| `metrics.resources`             | Metrics exporter resource requests/limit              | `requests: { cpu: "25m" }`                                          |

The above parameters map to the env variables defined in [bitnami/elasticsearch](http://github.com/bitnami/bitnami-docker-elasticsearch). For more information please refer to the [bitnami/elasticsearch](http://github.com/bitnami/bitnami-docker-elasticsearch) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set name=my-elastic,client.service.port=8080 \
  incubator/elasticsearch
```

The above command sets the Elasticsearch cluster name to `my-elastic` and REST port number to `8080`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml incubator/elasticsearch
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami Elasticsearch](https://github.com/bitnami/bitnami-docker-elasticsearch) image stores the Elasticsearch data and configurations at the `/bitnami` path of the container. Persistent Volume Claims are used to persist the state of the data processing Elasticsearch nodes. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
