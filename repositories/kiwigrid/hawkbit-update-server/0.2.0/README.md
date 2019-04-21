# `@helm-charts/kiwigrid-hawkbit-update-server`

A Helm chart for hawkbit update server

| Field               | Value                 |
| ------------------- | --------------------- |
| Repository Name     | kiwigrid              |
| Chart Name          | hawkbit-update-server |
| Chart Version       | 0.2.0                 |
| NPM Package Version | 0.1.0                 |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# use dependency charts
useMysql: true
useRabbitmq: true

image:
  repository: 'hawkbit/hawkbit-update-server'
  tag: 0.2.5-mysql
  pullPolicy: IfNotPresent

replicaCount: 1

nameOverride: ''
fullnameOverride: ''

service:
  type: ClusterIP
  port: 80

livenessProbe:
  initialDelaySeconds: 240
  timeoutSeconds: 5
readinessProbe:
  initialDelaySeconds: 120
  timeoutSeconds: 5

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  paths: []
  hosts:
    - chart-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

# value should reflect size of your images
nginxClientMaxBodySize: 200M

# env vars for configuration
env:
  springDatasourceHost: 'hawkbit-update-server-mysql'
  springDatasourceUsername: 'hawkbit'
  springDatasourcePassword: 'hawkbit'
  springDatasourceDb: 'hawkbit'
  springRabbitmqHost: 'hawkbit-update-server-rabbitmq'
  springRabbitmqUsername: 'hawkbit'
  springRabbitmqPassword: 'hawkbit'
  securityUserName: 'admin'
  # if no password is set a 40 digit random password is created
  securityUserPassword: ''

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

# dependency charts config
mysql:
  mysqlUser: hawkbit
  mysqlPassword: hawkbit
  mysqlDatabase: hawkbit
  metrics:
    enabled: true

rabbitmq:
  rabbitmq:
    username: hawkbit
    password: hawkbit
    metrics:
      enabled: true
```

</details>

---

# Hawkbit update server

## Introduction

[Eclipse hawkBit™](https://www.eclipse.org/hawkbit/) is a domain independent back-end framework for rolling out software updates to constrained edge devices as well as more powerful controllers and gateways connected to IP based networking infrastructure.

This chart uses hawkbit/hawkbit-update-server container to run Hawkbit update server inside Kubernetes.

## Prerequisites

- Has been tested on Kubernetes 1.11+

## Installing the Chart

To install the chart with the release name `hawkbit-update-server`, run the following command:

```bash
$ helm install kiwigrid/hawkbit-update-server --name hawkbit-update-server
```

## Uninstalling the Chart

To uninstall/delete the `hawkbit-update-server` deployment:

```bash
$ helm delete hawkbit-update-server
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

> **Tip**: To completely remove the release, run `helm delete --purge hawkbit-update-server`

## Configuration

The following table lists the configurable parameters of the hawkbit-update-server chart and their default values.

| Parameter                            | Description                              | Default                            |
| ------------------------------------ | ---------------------------------------- | ---------------------------------- |
| `image.repository`                   | Docker image repo                        | `hawkbit/hawkbit-update-server`    |
| `image.tag`                          | Docker image                             | `0.2.5-mysql`                      |
| `image.pullPolicy`                   | Docker image pull policy                 | `IfNotPresent`                     |
| `service.type`                       | Service type                             | `ClusterIP`                        |
| `service.port`                       | Service port of hawkbit-update-server UI | `80`                               |
| `resources`                          | Resource limits for the pod              | `{}`                               |
| `ingress.enabled`                    | Ingress enabled                          | `false`                            |
| `ingress.annotations`                | Ingress annotations                      | `{}`                               |
| `ingress.path`                       | Ingress path                             | `/`                                |
| `ingress.hosts`                      | Ingress hosts                            | `[]`                               |
| `ingress.tls`                        | Ingress TLS                              | `[]`                               |
| `resources`                          | Resources                                | `{}`                               |
| `nodeSelector`                       | NodeSelector                             | `{}`                               |
| `tolerations`                        | Tolerations                              | `[]`                               |
| `affinity`                           | Affinity                                 | `{}`                               |
| `useMysql`                           | use MySQL dependency chart               | `true`                             |
| `useRabbitmq`                        | user Rabbitmq dependency chart           | `true`                             |
| `livenessProbe.initialDelaySeconds`  | livenessProbe initialDelaySeconds        | `240`                              |
| `livenessProbe.timeoutSeconds`       | livenessProbe timeoutSeconds             | `5`                                |
| `readinessProbe.initialDelaySeconds` | readinessProbe timeoutSeconds            | `120`                              |
| `readinessProbe.timeoutSeconds`      | readinessProbe timeoutSeconds            | `5`                                |
| `env.springDatasourceHost`           | MySQL host                               | `"hawkbit-update-server-mysql"`    |
| `env.springDatasourceUsername`       | MySQL user                               | `"hawkbit"`                        |
| `env.springDatasourcePassword`       | MySQL pass                               | `"hawkbit"`                        |
| `env.springDatasourceDb`             | MySQL db                                 | `"hawkbit"`                        |
| `env.springRabbitmqHost`             | RabbitMq host                            | `"hawkbit-update-server-rabbitmq"` |
| `env.springRabbitmqUsername`         | RabbitMq user                            | `"hawkbit"`                        |
| `env.springRabbitmqPassword`         | RabbitMq pass                            | `"hawkbit"                         |
| `env.SecurityUserName`               | Hawkbit user                             | `"admin"`                          |
| `env.SecurityUserPassword`           | Hawkbit pass                             | `""`                               |
| `nginxClientMaxBodySize`             | Nginx client_max_body_size annotation    | `200M`                             |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```bash
$ helm install --name hawkbit-update-server --set ingress.enabled=false kiwigrid/hawkbit-update-server
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart.
