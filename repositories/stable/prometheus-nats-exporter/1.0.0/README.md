# `@helm-charts/stable-prometheus-nats-exporter`

A Helm chart for prometheus-nats-exporter

| Field               | Value                    |
| ------------------- | ------------------------ |
| Repository Name     | stable                   |
| Chart Name          | prometheus-nats-exporter |
| Chart Version       | 1.0.0                    |
| NPM Package Version | 0.1.0                    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for prometheus-nats-exporter.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: appcelerator/prometheus-nats-exporter
  tag: 0.17.0
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80
  targetPort: 8222

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

config:
  nats:
    service: nats-nats-monitoring
    namespace: default
    port: 8222

nodeSelector: {}

tolerations: []

affinity: {}

annotations: {}

extraContainers: |

extraVolumes: |
```

</details>

---

# Prometheus NATS Exporter

- Installs prometheus [NATS exporter](https://github.com/nats-io/prometheus-nats-exporter)

## TL;DR;

```console
$ helm install incubator/prometheus-nats-exporter
```

## Introduction

This chart bootstraps a prometheus [NATS exporter](https://github.com/nats-io/prometheus-nats-exporter) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release incubator/prometheus-nats-exporter
```

The command deploys NATS exporter on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the postgres Exporter chart and their default values.

| Parameter               | Description                                                                                                          | Default                                 |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `image`                 | Image                                                                                                                | `appcelerator/prometheus-nats-exporter` |
| `imageTag`              | Image tag                                                                                                            | `0.17.0`                                |
| `imagePullPolicy`       | Image pull policy                                                                                                    | `IfNotPresent`                          |
| `service.type`          | Service type                                                                                                         | `ClusterIP`                             |
| `service.port`          | The service port                                                                                                     | `80`                                    |
| `service.targetPort`    | The target port of the container                                                                                     | `8222`                                  |
| `resources`             |                                                                                                                      | `{}`                                    |
| `config.nats.service`   | NATS monitoring [service name](https://github.com/helm/charts/blob/master/stable/nats/templates/monitoring-svc.yaml) | `nats-nats-monitoring`                  |
| `config.nats.namespace` | Namespace in which NATS deployed                                                                                     | `default`                               |
| `config.nats.port`      | NATS monitoring service port                                                                                         | `8222`                                  |
| `tolerations`           | Add tolerations                                                                                                      | `[]`                                    |
| `nodeSelector`          | node labels for pod assignment                                                                                       | `{}`                                    |
| `affinity`              | node/pod affinities                                                                                                  | `{}`                                    |
| `annotations`           | Deployment annotations                                                                                               | `{}`                                    |
| `extraContainers`       | Additional sidecar containers                                                                                        | `""`                                    |
| `extraVolumes`          | Additional volumes for use in extraContainers                                                                        | `""`                                    |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set config.nats.service=nats-production-nats-monitoring  \
    incubator/prometheus-nats-exporter
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/prometheus-nats-exporter
```
