# `@helm-charts/kiwigrid-prometheus-pingdom-exporter`

A Helm chart for Prometheus Pingdom Exporter

| Field               | Value                       |
| ------------------- | --------------------------- |
| Repository Name     | kiwigrid                    |
| Chart Name          | prometheus-pingdom-exporter |
| Chart Version       | 2.0.0                       |
| NPM Package Version | 0.1.0                       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for prometheus-pingdom-exporter.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  # we use camptocamp/prometheus-pingdom-exporter image as giantswarm did not publish recent versions after 0.1.1
  repository: camptocamp/prometheus-pingdom-exporter
  tag: 20180821-1
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

service:
  type: ClusterIP
  port: 9100
  annotations:
    {}
    # prometheus.io/scrape: "true"
    # prometheus.io/port: "9100"

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

# configuration of the pingdom credentials
pingdom:
  # username of the pingdom account
  user: somebody@invalid
  # password of the pingdom account
  password: totallysecret
  # application id / api secret can be created on the pingdom website
  appId: alsototallysecret
  # account email of the account owner if using multiaccount / team accounts
  accountEmail: somebodyorelse@invalid
  # time (in seconds) between accessing the Pingdom  API
  wait: 10
```

</details>

---

# Prometheus Pingdom Exporter

- **Source:** https://github.com/giantswarm/prometheus-pingdom-exporter

[prometheus-pingdom-exporter](https://github.com/giantswarm/prometheus-pingdom-exporter) the prometheus-pingdom-exporter cares about preprocessing the pingdom uptime check results for consumption of by prometheus.

## Introduction

This chart creates a kubernetes deployment on a Kubernetes cluster using the Helm package manager.

## Installing the Chart

Install from remote URL with the release name `prometheus-pingdom-exporter`:

```console
$ helm upgrade -i prometheus-pingdom-exporter kiwigrid/prometheus-pingdom-exporter
```

## Uninstalling the Chart

To uninstall/delete the `prometheus-pingdom-exporter` deployment:

```console
$ helm delete prometheus-pingdom-exporter --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the prometheus-pingdom-exporter chart and their default values.

| Parameter              | Description                                           | Default                                  |
| ---------------------- | ----------------------------------------------------- | ---------------------------------------- |
| `image.repository`     | Image                                                 | `camptocamp/prometheus-pingdom-exporter` |
| `image.tag`            | Image tag                                             | `20180821-1`                             |
| `image.pullPolicy`     | Image pull policy                                     | `IfNotPresent`                           |
| `service.type`         | Service type                                          | `ClusterIP`                              |
| `service.port`         | Service port of Graphite UI                           | `9100`                                   |
| `service.annotations`  | Service annotations                                   | `{}`                                     |
| `service.labels`       | Service labels                                        | `{}`                                     |
| `resources`            | Resource limits                                       | `{}`                                     |
| `nodeSelector`         | NodeSelector                                          | `{}`                                     |
| `tolerations`          | Tolerations                                           | `[]`                                     |
| `affinity`             | Affinity                                              | `{}`                                     |
| `pingdom.user`         | Username of the Pingdom Account                       | `somebody@invalid`                       |
| `pingdom.password`     | Password of the Pingdom Account                       | `totallysecret`                          |
| `pingdom.appId`        | Application ID, can be created on the pingdom website | `alsototallysecret`                      |
| `pingdom.accountEmail` | Account-E-Mail of the Account owner                   | `somebodyorelse@invalid`                 |
| `pingdom.wait`         | time (in seconds) between accessing the Pingdom API   | `10`                                     |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name prometheus-pingdom-exporter -f values.yaml kiwigrid/prometheus-pingdom-exporter
```

> **Tip**: You can use the default [values.yaml](values.yaml)
