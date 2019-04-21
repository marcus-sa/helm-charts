# `@helm-charts/stable-prometheus-rabbitmq-exporter`

Rabbitmq metrics exporter for prometheus

| Field               | Value                        |
| ------------------- | ---------------------------- |
| Repository Name     | stable                       |
| Chart Name          | prometheus-rabbitmq-exporter |
| Chart Version       | 0.1.2                        |
| NPM Package Version | 0.1.0                        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for prometheus-rabbitmq-exporter.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
image:
  repository: kbudde/rabbitmq-exporter
  tag: v0.28.0
  pullPolicy: IfNotPresent
service:
  type: ClusterIP
  externalPort: 9419
  internalPort: 9419
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

loglevel: info
rabbitmq:
  url: http://myrabbit:15672
  user: guest
  password: guest
  capabilities: bert,no_sort
  include_queues: '.*'
  skip_queues: '^$'

annotation: {}
#  prometheus.io/scrape: "true"
#  prometheus.io/path: "/metrics"
#  prometheus.io/port: 9419
```

</details>

---

# prometheus-rabbitmq-exporter

[rabbitmq_exporter](https://github.com/kbudde/rabbitmq_exporter) is a Prometheus exporter for rabbitmq metrics.

## TL;DR;

```bash
$ helm install stable/prometheus-rabbitmq-exporter
```

## Introduction

This chart bootstraps a [rabbitmq_exporter](https://github.com/kbudde/rabbitmq_exporter) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/prometheus-rabbitmq-exporter
```

The command deploys prometheus-rabbitmq-exporter on the Kubernetes cluster in the default configuration.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters and their default values.

| Parameter                 | Description                                                           | Default                    |
| ------------------------- | --------------------------------------------------------------------- | -------------------------- |
| `replicaCount`            | desired number of prometheus-rabbitmq-exporter pods                   | `1`                        |
| `image.repository`        | prometheus-rabbitmq-exporter image repository                         | `kbudde/rabbitmq-exporter` |
| `image.tag`               | prometheus-rabbitmq-exporter image tag                                | `v0.28.0`                  |
| `image.pullPolicy`        | image pull policy                                                     | `IfNotPresent`             |
| `service.type`            | desired service type                                                  | `ClusterIP`                |
| `service.internalport`    | service listening port                                                | `9121`                     |
| `service.externalPort`    | public service port                                                   | `9419`                     |
| `resources`               | cpu/memory resource requests/limits                                   | {}                         |
| `loglevel`                | exporter log level                                                    | {}                         |
| `rabbitmq.url`            | rabbitm management url                                                | `http://myrabbit:15672`    |
| `rabbitmq.user`           | rabbitm user login                                                    | `guest`                    |
| `rabbitmq.password`       | rabbitm password login                                                | `guest`                    |
| `rabbitmq.capabilities`   | comma-separated list of capabilities supported by the RabbitMQ server | `bert,no_sort`             |
| `rabbitmq.include_queues` | regex queue filter. just matching names are exported                  | `.*`                       |
| `rabbitmq.skip_queues`    | regex, matching queue names are not exported                          | `.*`                       |
| `annotation`              | pod annotations for easier discovery                                  | {}                         |

For more information please refer to the [rabbitmq_exporter](https://github.com/kbudde/rabbitmq_exporter) documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set "rabbitmq.url=http://myrabbit:15672" \
    stable/prometheus-rabbitmq-exporter
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/prometheus-rabbitmq-exporter
```
