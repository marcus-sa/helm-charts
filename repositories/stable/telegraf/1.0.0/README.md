# `@helm-charts/stable-telegraf`

Telegraf is an agent written in Go for collecting, processing, aggregating, and writing metrics.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | telegraf |
| Chart Version       | 1.0.0    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Default values.yaml for Telegraf
## This is a YAML-formatted file.
## ref: https://hub.docker.com/r/library/telegraf/tags/

replicaCount: 1

image:
  repo: 'telegraf'
  tag: '1.9-alpine'
  pullPolicy: IfNotPresent

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
resources:
  {}
  # requests:
  #   memory: 128Mi
  #   cpu: 100m
  # limits:
  #   memory: 128Mi
  #   cpu: 100m

service:
  type: ClusterIP
## Exposed telegraf configuration
## For full list of possible values see `/docs/all-config-values.yaml` and `/docs/all-config-values.toml`
## ref: https://docs.influxdata.com/telegraf/v1.1/administration/configuration/
config:
  agent:
    interval: '10s'
    round_interval: true
    metric_batch_size: 1000
    metric_buffer_limit: 10000
    collection_jitter: '0s'
    flush_interval: '10s'
    flush_jitter: '0s'
    precision: ''
    debug: false
    quiet: false
    logfile: ''
    hostname: '$HOSTNAME'
    omit_hostname: false
  outputs:
    - influxdb:
        urls:
          - 'http://influxdb.monitoring.svc:8086'
        database: 'telegraf'
  inputs:
    - statsd:
        service_address: ':8125'
        percentiles:
          - 50
          - 95
          - 99
        metric_separator: '_'
        allowed_pending_messages: 10000
        percentile_limit: 1000
```

</details>

---

# Telegraf

[Telegraf](https://github.com/influxdata/telegraf) is a plugin-driven server agent written by the folks over at [InfluxData](https://influxdata.com) for collecting & reporting metrics.

## TL;DR

```console
$ helm install stable/telegraf
```

## Introduction

This chart bootstraps a `telegraf` deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `telegraf`:

```console
$ helm install --name telegraf --namespace monitoring stable/telegraf
```

The command deploys Telegraf on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `telegraf` deployment:

```console
$ helm delete telegraf
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The default configuration parameters are listed in `values.yaml`.

```console
$ helm install --name telegraf stable/telegraf
```

Outputs and inputs are configured as arrays of key/value dictionaries. Additional examples and defaults can be found in [values.yaml](values.yaml)
Example:

```
outputs:
  - influxdb:
      urls: []
        # - "http://influxdb.monitoring:8086"
      database: "telegraf"
inputs:
  - cpu:
      percpu: false
      totalcpu: true
  - system:
```

> **Tip**: You can use the default [values.yaml](values.yaml)

Please see https://github.com/influxdata/telegraf/tree/master/plugins/ and checkout the contents of the `inputs` and `outputs` folders.
