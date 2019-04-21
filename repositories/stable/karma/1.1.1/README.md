# `@helm-charts/stable-karma`

A Helm chart for Karma - an UI for Prometheus Alertmanager

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | karma  |
| Chart Version       | 1.1.1  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for karma.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: lmierzwa/karma
  tag: v0.12
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

# env:
# - name: ALERTMANAGER_URI
#   value: http://monitoring-prometheus-alertmanager

service:
  type: ClusterIP
  port: 80
  annotations:
    {}
    # prometheus.io/scrape: "true"

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - chart-example.local
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
```

</details>

---

# Karma

Karma is an ASL2 licensed alert dashboard for Prometheus Alertmanager.

## Introduction

This chart deploys karma to your cluster via a Deployment and Service.
Optionally you can also enable ingress.

# Prerequisites

- Kubernetes 1.9+

## Installing the Chart

To install the chart with the release name `my-release`, run:

```bash
$ helm install --name my-release stable/karma
```

After a few seconds, you should see service statuses being written to the configured output.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the karma chart and their default values.

| Parameter                   | Description                       | Default          |
| --------------------------- | --------------------------------- | ---------------- |
| `replicaCount`              | Number of replicas                | `1`              |
| `image.repository`          | The image to run                  | `lmierzwa/karma` |
| `image.tag`                 | The image tag to pull             | `v0.12`          |
| `image.pullPolicy`          | Image pull policy                 | `IfNotPresent`   |
| `nameOverride`              | Override name of app              | ``               |
| `fullnameOverride`          | Override full name of app         | ``               |
| `service.type`              | Type of Service                   | `ClusterIP`      |
| `service.port`              | Port for kubernetes service       | `80`             |
| `service.annotations`       | Annotations to add to the service | `{}`             |
| `resources.requests.cpu`    | CPU resource requests             |                  |
| `resources.limits.cpu`      | CPU resource limits               |                  |
| `resources.requests.memory` | Memory resource requests          |                  |
| `resources.limits.memory`   | Memory resource limits            |                  |
| `ingress`                   | Settings for ingress              | `{}`             |
| `nodeSelector`              | Settings for nodeselector         | `{}`             |
| `tolerations`               | Settings for toleration           | `{}`             |
| `affinity`                  | Settings for affinity             | `{}`             |
| `serviceAccount.create`     | Create service-account            | `true`           |
| `serviceAccount.name`       | Override service-account name     | ``               |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
    stable/karma
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/karma
```

> **Tip**: You will have to define the URL to alertmanager in env-settings in [values.yaml](values.yaml), under key ALERTMANAGER_URI .
