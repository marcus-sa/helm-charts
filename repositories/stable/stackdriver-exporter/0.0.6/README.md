# `@helm-charts/stable-stackdriver-exporter`

Stackdriver exporter for Prometheus

| Field               | Value                |
| ------------------- | -------------------- |
| Repository Name     | stable               |
| Chart Name          | stackdriver-exporter |
| Chart Version       | 0.0.6                |
| NPM Package Version | 0.1.0                |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Number of exporters to run
replicaCount: 1

# Restart policy for container
restartPolicy: Always

image:
  repository: frodenas/stackdriver-exporter
  tag: v0.6.0
  pullPolicy: IfNotPresent

resources:
  {}
  # requests:
  #   cpu: 100m
  #   memory: 128Mi
  # limits:
  #   cpu: 100m
  #   memory: 128Mi

service:
  type: ClusterIP
  httpPort: 9255
  annotations: {}

stackdriver:
  # The Google Project ID to gather metrics for
  projectId: 'FALSE'
  # Max number of retries that should be attempted on 503 errors from Stackdriver
  maxRetries: 0
  # How long should Stackdriver_exporter wait for a result from the Stackdriver API
  httpTimeout: 10s
  # Max time between each request in an exp backoff scenario
  maxBackoff: 5s
  # The amount of jitter to introduce in an exp backoff scenario
  backoffJitter: 1s
  # The HTTP statuses that should trigger a retry
  retryStatuses: 503
  metrics:
    # The prefixes to gather metrics for, we default to just CPU metrics.
    typePrefixes: 'compute.googleapis.com/instance/cpu'
    # The frequency to request
    interval: '5m'
    # How far into the past to offset
    offset: '0s'

web:
  # Port to listen on
  listenAddress: ':9255'
  # Path under which to expose metrics.
  path: /metrics

annotations: {}
```

</details>

---

# Stackdriver Exporter

Prometheus exporter for Stackdriver, allowing for Google Cloud metrics. You
must have appropriate IAM permissions for this exporter to work. If you
are passing in an IAM key then you must have:

- monitoring.metricDescriptors.list
- monitoring.timeSeries.list

These are contained within `roles/monitoring.viewer`. If you're using legacy
access scopes, then you must have
`https://www.googleapis.com/auth/monitoring.read`.

Learn more: https://github.com/frodenas/stackdriver_exporter

## TL;DR;

```bash
$ helm install stable/stackdriver-exporter --set stackdriver.projectId=google-project-name
```

## Introduction

This chart creates a Stackdriver-Exporter deployment on a
[Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh)
package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/stackdriver-exporter --set stackdriver.projectId=google-project-name
```

The command deploys Stackdriver-Exporter on the Kubernetes cluster using the
default configuration. The [configuration](#configuration) section lists the
parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete --purge my-release
```

The command removes all the Kubernetes components associated with the chart and
deletes the release.

## Configuration

The following table lists the configurable parameters of the
Stackdriver-Exporter chart and their default values.

| Parameter                          | Description                                                                     | Default                               |
| ---------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------- |
| `replicaCount`                     | Desired number of pods                                                          | `1`                                   |
| `restartPolicy`                    | Container restart policy                                                        | `Always`                              |
| `image.repository`                 | Container image repository                                                      | `frodenas/stackdriver-exporter`       |
| `image.tag`                        | Container image tag                                                             | `v0.6.0`                              |
| `image.pullPolicy`                 | Container image pull policy                                                     | `IfNotPresent`                        |
| `resources`                        | Resource requests & limits                                                      | `{}`                                  |
| `service.type`                     | Type of service to create                                                       | `ClusterIP`                           |
| `service.httpPort`                 | Port for the http service                                                       | `9255`                                |
| `stackdriver.projectId`            | GCP Project ID                                                                  | ``                                    |
| `stackdriver.maxRetries`           | Max number of retries that should be attempted on errors from Stackdriver       | `0`                                   |
| `stackdriver.httpTimeout`          | How long should Stackdriver_exporter wait for a result from the Stackdriver API | `10s`                                 |
| `stackdriver.maxBackoff`           | Max time between each request in an exponential backoff scenario                | `5s`                                  |
| `stackdriver.backoffJitter`        | The amount of jitter to introduce in an exponential backoff scenario            | `1s`                                  |
| `stackdriver.retryStatuses`        | The HTTP statuses that should trigger a retry                                   | `503`                                 |
| `stackdriver.metrics.typePrefixes` | Comma separated Metric Type prefixes                                            | `compute.googleapis.com/instance/cpu` |
| `stackdriver.metrics.interval`     | Metrics interval to request from GCP                                            | `5m`                                  |
| `stackdriver.metrics.offset`       | Offset (into the past) to request                                               | `0s`                                  |
| `web.listenAddress`                | Port to listen on                                                               | `9255`                                |
| `web.path`                         | Path under which to expose metrics                                              | `/metrics`                            |
| `annotations`                      | Deployment annotations                                                          | `{}`                                  |

Specify each parameter using the `--set key=value[,key=value]` argument to
`helm install`. For example,

```bash
$ helm install --name my-release \
    --set key_1=value_1,key_2=value_2 \
    stable/stackdriver-exporter
```

Alternatively, a YAML file that specifies the values for the parameters can be
provided while installing the chart. For example,

```bash
# example for staging
$ helm install --name my-release -f values.yaml stable/stackdriver-exporter
```

> **Tip**: You can use the default [values.yaml](values.yaml), as long as you provide a value for stackdriver.projectId

## Google Storage Metrics

In order to get metrics for GCS you need to ensure the metrics interval is >
24h. You can read more information about this in [this bug
report](https://github.com/frodenas/stackdriver_exporter/issues/14).

The easiest way to do this is to create two separate exporters with different
prefixes and intervals, to ensure you gather all appropriate metrics.
