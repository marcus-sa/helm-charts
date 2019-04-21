# `@helm-charts/kiwigrid-zipkin-stackdriver-proxy`

A Helm chart for Zipkin Stackdriver proxy

| Field               | Value                    |
| ------------------- | ------------------------ |
| Repository Name     | kiwigrid                 |
| Chart Name          | zipkin-stackdriver-proxy |
| Chart Version       | 0.1.0                    |
| NPM Package Version | 0.1.0                    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for zipkin-stackdriver-proxy.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: gcr.io/stackdriver-trace-docker/zipkin-collector
  tag: v0.6.0
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

service:
  type: ClusterIP
  port: 9411

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# Zipkins Stackdriver Proxy

- **Source:** https://github.com/openzipkin/zipkin-gcp

## Introduction

This chart forwards zipkin traces to stackdriver.

## Installing the Chart

Install from remote URL with the release name `zipkin-stackdriver-proxy` into namespace `default`:

```console
$ helm upgrade -i zipkin-stackdriver-proxy kiwigrid/zipkin-stackdriver-proxy
```

## Uninstalling the Chart

To uninstall/delete the `zipkin-stackdriver-proxy` deployment:

```console
$ helm delete zipkin-stackdriver-proxy --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the chart and their default values.

| Parameter          | Description             | Default                                            |
| ------------------ | ----------------------- | -------------------------------------------------- |
| `image.repository` | image name              | `gcr.io/stackdriver-trace-docker/zipkin-collector` |
| `image.tag`        | image tag               | `v0.6.0`                                           |
| `image.pullPolicy` | Image pull policy       | `IfNotPresent`                                     |
| `resources`        | Resource limits for pod | `{}`                                               |
| `nodeSelector`     | NodeSelector            | `{}`                                               |
| `tolerations`      | Tolerations             | `[]`                                               |
| `affinity`         | Affinity                | `{}`                                               |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml kiwigrid/zipkin-stackdriver-proxy
```

> **Tip**: You can use the default [values.yaml](values.yaml)
