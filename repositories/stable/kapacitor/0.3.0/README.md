# `@helm-charts/stable-kapacitor`

InfluxDB's native data processing engine. It can process both stream and batch data from InfluxDB.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | kapacitor |
| Chart Version       | 0.3.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## influxdb image version
## ref: https://hub.docker.com/r/library/influxdb/tags/
##
image:
  repository: 'kapacitor'
  tag: '1.2'
  pullPolicy: 'IfNotPresent'

## Specify a service type, defaults to NodePort
## ref: http://kubernetes.io/docs/user-guide/services/
##
service:
  type: ClusterIP

## Persist data to a persistent volume
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: false
  ## If defined, volume.beta.kubernetes.io/storage-class: <storageClass>
  ## Default: volume.alpha.kubernetes.io/storage-class: default
  ##
  # storageClass:
  accessMode: ReadWriteOnce
  size: 8Gi

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 256Mi
    cpu: 0.1
  limits:
    memory: 2Gi
    cpu: 2
## Set the environment variables for kapacitor (or anything else you want to use)
## ref: https://hub.docker.com/_/kapacitor/
##
# Examples below
#
# envVars:
#   KAPACITOR_SLACK_ENABLED: true
#   KAPACITOR_SLACK_URL: "http://slack.com/xxxxx/xxxxx/xxxx/xxxxxxx"
#
# or, at your terminal, with
#
# helm install --name kapacitor-rls --set influxURL=http://influxurl.com,envVars.KAPACITOR_SLACK_ENABLED=true,envVars.KAPACITOR_SLACK_URL="http://slack.com/xxxxx/xxxxx/xxxx/xxxxxxx" stable/kapacitor

## Set the URL of InfluxDB instance to create subscription on
## ref: https://docs.influxdata.com/kapacitor/v1.1/introduction/getting_started/
##
# influxURL: http://influxdb-influxdb.tick:8086
```

</details>

---

# Kapacitor

## An Open-Source Time Series ETL and Alerting Engine

[Kapacitor](https://github.com/influxdata/kapacitor) is an open-source framework built by the folks over at [InfluxData](https://influxdata.com) and written in Go for processing, monitoring, and alerting on time series data

## QuickStart

```bash
$ helm install stable/kapacitor --name foo --namespace bar
```

## Introduction

This chart bootstraps A Kapacitor deployment and service on a Kubernetes cluster using the Helm Package manager.

## Prerequisites

- Kubernetes 1.4+
- PV provisioner support in the underlying infrastructure (optional)

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/kapacitor
```

The command deploys Kapacitor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Kapacitor chart and their default values.

| Parameter                  | Description                                                                                               | Default                              |
| -------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `image.repository`         | Kapacitor image                                                                                           | `kapacitor`                          |
| `image.tag`                | Kapacitor image version                                                                                   | `1.2`                                |
| `image.pullPolicy`         | Kapacitor image pull policy                                                                               | `IfNotPresent`                       |
| `service.type`             | Kapacitor web service type                                                                                | `ClusterIP`                          |
| `persistence.enabled`      | Enable Kapacitor persistence using Persistent Volume Claims                                               | `false`                              |
| `persistence.storageClass` | Kapacitor Persistent Volume Storage Class                                                                 | `default`                            |
| `persistence.accessMode`   | Kapacitor Persistent Volume Access Mode                                                                   | `ReadWriteOnce`                      |
| `persistence.size`         | Kapacitor Persistent Volume Storage Size                                                                  | `8Gi`                                |
| `resources.request.memory` | Kapacitor memory request                                                                                  | `256Mi`                              |
| `resources.request.cpu`    | Kapacitor cpu request                                                                                     | `0.1`                                |
| `resources.limits.memory`  | Kapacitor memory limit                                                                                    | `2Gi`                                |
| `resources.limits.cpu`     | Kapacitor cpu limit                                                                                       | `2`                                  |
| `envVars`                  | Environment variables to set initial Kapacitor configuration (https://hub.docker.com/_/kapacitor/)        | `{}`                                 |
| `influxURL`                | InfluxDB url used to interact with Kapacitor (also can be set with `envVars.KAPACITOR_INFLUXDB_0_URLS_0`) | `http://influxdb-influxdb.tick:8086` |

The configurable parameters of the Kapacitor chart and the default values are listed in `values.yaml`.

The [full image documentation](https://hub.docker.com/_/kapacitor/) contains more information about running Kapacitor in docker.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set influxURL=http://myinflux.mytld:8086,persistence.enabled=true \
    stable/kapacitor
```

The above command enables persistence and changes the size of the requested data volume to 200GB.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/kapacitor
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Kapacitor](https://hub.docker.com/_/kapacitor/) image stores data in the `/var/lib/kapacitor` directory in the container.

The chart optionally mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) volume at this location. The volume is created using dynamic volume provisioning.
