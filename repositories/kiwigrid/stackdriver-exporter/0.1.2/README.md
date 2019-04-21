# `@helm-charts/kiwigrid-stackdriver-exporter`

A Helm chart for exporting stackdriver metrics to prometheus

| Field               | Value                |
| ------------------- | -------------------- |
| Repository Name     | kiwigrid             |
| Chart Name          | stackdriver-exporter |
| Chart Version       | 0.1.2                |
| NPM Package Version | 0.1.0                |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for stackdriver-exporter.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: frodenas/stackdriver-exporter
  tag: v0.6.0
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''
web:
  port: 9255
  path: /metrics

gcp:
  projectId: 'DUMMY_PROJECT'
#  serviceAccountName: ""
#  keyfileSecretName: ""
#  metricsOffset: 0s
#  metricsInterval: 5m
#  metricsTypePrefixes:
#    - dataproc.googleapis.com/
#    - compute.googleapis.com/instance/cpu

usingGCPController: false
# has to bae base64 encoded
gcpCredentials: 'ewogICAidHlwZSI6ICJzZXJ2aWNlX2FjY291bnQiLAogICAicHJvamVjdF9pZCI6ICJkdW1teS1hY2MiLAogICAicHJpdmF0ZV9rZXlfaWQiOiAiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAiLAogICAicHJpdmF0ZV9rZXkiOiAiIiwKICAgImNsaWVudF9lbWFpbCI6ICJkdW1teUBkdW1teS1hY2MuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLAogICAiY2xpZW50X2lkIjogIjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAiLAogICAiYXV0aF91cmkiOiAiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGgiLAogICAidG9rZW5fdXJpIjogImh0dHBzOi8vb2F1dGgyLmdvb2dsZWFwaXMuY29tL3Rva2VuIiwKICAgImF1dGhfcHJvdmlkZXJfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvY2VydHMiLAogICAiY2xpZW50X3g1MDlfY2VydF91cmwiOiAiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vcm9ib3QvdjEvbWV0YWRhdGEveDUwOS9kdW1teSVkdW1teS1hY2MuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iCn0K'

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #   cpu: 100m
  #   memory: 128Mi
  # requests:
  #   cpu: 100m
  #   memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# Stackdriver Exporter

- **Source:** https://github.com/frodenas/stackdriver_exporter

## Introduction

This chart is for the stackdriver exporter.

## Installing the Chart

Install from remote URL with the release name `stackdriver-exporter` into namespace `default`:

```console
$ helm upgrade -i stackdriver-exporter kiwigrid/stackdriver-exporter
```

## Uninstalling the Chart

To uninstall/delete the `stackdriver-exporter` deployment:

```console
$ helm delete stackdriver-exporter --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the chart and their default values.

| Parameter                 | Description                                                                                                                                                      | Default                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `image.repository`        | image name                                                                                                                                                       | `frodenas/stackdriver-exporter` |
| `image.tag`               | image tag                                                                                                                                                        | `v0.6.0`                        |
| `image.pullPolicy`        | Image pull policy                                                                                                                                                | `IfNotPresent`                  |
| `web.port`                | listen port                                                                                                                                                      | `9255`                          |
| `web.path`                | Path under which to expose Prometheus metrics                                                                                                                    | `/metrics`                      |
| `gcp.projectId`           | gcp project id                                                                                                                                                   |                                 |
| `gcp.serviceAccountName`  | name of service account for gcp                                                                                                                                  |                                 |
| `gcp.keyfileSecretName`   | name of secret                                                                                                                                                   |                                 |
| `gcp.metricsTypePrefixes` | list of metric prefixes                                                                                                                                          |                                 |
| `gcp.metricsInterval`     | Metric's timestamp interval to request from the Google Stackdriver Monitoring Metrics API. Only the most recent data point is used                               | `5m`                            |
| `gcp.metricsOffset`       | Offset (into the past) for the metric's timestamp interval to request from the Google Stackdriver Monitoring Metrics API, to handle latency in published metrics | `0s`                            |
| `gcpCredentials`          | gcp key file base64 encoded has only be set if `usingGCPController` is `false`                                                                                   |                                 |
| `usingGCPController`      | if true the secret will be created via a crd (see [Gcp Service Account Controller](https://github.com/kiwigrid/gcp-serviceaccount-controller) for more infos)    | `false`                         |
| `resources`               | Resource limits for pod                                                                                                                                          | `{}`                            |
| `nodeSelector`            | NodeSelector                                                                                                                                                     | `{}`                            |
| `tolerations`             | Tolerations                                                                                                                                                      | `[]`                            |
| `affinity`                | Affinity                                                                                                                                                         | `{}`                            |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml kiwigrid/stackdriver-exporter
```

> **Tip**: You can use the default [values.yaml](values.yaml)
