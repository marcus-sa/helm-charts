# `@helm-charts/stable-prometheus-couchdb-exporter`

A Helm chart to export the metrics from couchdb in Prometheus format.

| Field               | Value                       |
| ------------------- | --------------------------- |
| Repository Name     | stable                      |
| Chart Name          | prometheus-couchdb-exporter |
| Chart Version       | 0.1.0                       |
| NPM Package Version | 0.1.0                       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for prometheus-couchdb-exporter.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

rbac:
  # Specifies whether RBAC resources should be created
  create: true
  # Specifies whether a PodSecurityPolicy should be created
  pspEnabled: true
serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

replicaCount: 1

image:
  repository: gesellix/couchdb-prometheus-exporter
  tag: 16
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 9984

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    # - chart-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

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

## CouchDB exporter configuratons
couchdb:
  ## URI ofthe couchdb instance
  uri: http://couchdb.default.svc:5984
  ## Specify the list of databases to get the disk usage stats as comma seperates like "db-1,db-2"
  ## or to get stats for every database, please use "_all_dbs"
  databases: _all_dbs
  ## CouchDB username
  # username:
  ## CouchDB Password
  # password:
```

</details>

---

# prometheus-couchdb-exporter

[couchdb-prometheus-exporter](https://github.com/gesellix/couchdb-prometheus-exporter) is a Prometheus exporter for CouchDB metrics.

## TL;DR;

```bash
$ helm install stable/prometheus-couchdb-exporter
```

## Introduction

This chart bootstraps a [couchdb-exporter](https://github.com/gesellix/couchdb-prometheus-exporter) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/prometheus-couchdb-exporter
```

The command deploys prometheus-couchdb-exporter on the Kubernetes cluster in the default configuration.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters and their default values.

| Parameter             | Description                                        | Default                                |
| --------------------- | -------------------------------------------------- | -------------------------------------- |
| `replicaCount`        | desired number of prometheus-couchdb-exporter pods | `1`                                    |
| `image.repository`    | prometheus-couchdb-exporter image repository       | `gesellix/couchdb-prometheus-exporter` |
| `image.tag`           | prometheus-couchdb-exporter image tag              | `16`                                   |
| `image.pullPolicy`    | image pull policy                                  | `IfNotPresent`                         |
| `service.type`        | desired service type                               | `ClusterIP`                            |
| `service.port`        | service external port                              | `9984`                                 |
| `ingress.enabled`     | enable ingress controller resource                 | `false`                                |
| `ingress.annotations` | annotations for the host's ingress records         | `false`                                |
| `ingress.path`        | path for the ingress route                         | `/`                                    |
| `ingress.hosts`       | list of host address for ingress creation          |                                        |
| `ingress.tls`         | utilize TLS backend in ingress                     |                                        |
| `resources`           | cpu/memory resource requests/limits                | {}                                     |
| `nodeSelector`        | node labels for pod assignment                     | {}                                     |
| `tolerations`         | tolerations for pod assignment                     | {}                                     |
| `affinity`            | affinity settings for proxy pod assignments        | {}                                     |
| `couchdb.uri`         | address of the couchdb                             | `http://couchdb.default.svc:5984`      |
| `couchdb.databases`   | comma separated databases to monitor               | `_all_dbs`                             |

For more information please refer to the [couchdb-prometheus-exporter]https://github.com/gesellix/couchdb-prometheus-exporter) documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set "couchdb.uri=http://mycouchdb:5984" \
    stable/prometheus-couchdb-exporter
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/prometheus-couchdb-exporter
```
