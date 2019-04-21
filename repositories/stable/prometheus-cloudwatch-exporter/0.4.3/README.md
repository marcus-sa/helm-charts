# `@helm-charts/stable-prometheus-cloudwatch-exporter`

A Helm chart for prometheus cloudwatch-exporter

| Field               | Value                          |
| ------------------- | ------------------------------ |
| Repository Name     | stable                         |
| Chart Name          | prometheus-cloudwatch-exporter |
| Chart Version       | 0.4.3                          |
| NPM Package Version | 0.1.0                          |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for prometheus-cloudwatch-exporter.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: prom/cloudwatch-exporter
  tag: cloudwatch_exporter-0.5.0
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 9106
  portName: http
  annotations: {}
  labels: {}

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #   cpu: 100m
  #    memory: 128Mi
  # requests:
  #   cpu: 100m
  #   memory: 128Mi

aws:
  role:

  # The name of a pre-created secret in which AWS credentials are stored. When
  # set, aws_access_key_id is assumed to be in a field called access_key,
  # aws_secret_access_key is assumed to be in a field called secret_key, and the
  # session token, if it exists, is assumed to be in a field called
  # security_token
  secret:
    name:
    includesSessionToken: false

  # Note: Do not specify the aws_access_key_id and aws_secret_access_key if you specified role or secret.name before
  aws_access_key_id:
  aws_secret_access_key:

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

rbac:
  # Specifies whether RBAC resources should be created
  create: true

config: |-
  # This is the default configuration for prometheus-cloudwatch-exporter
  region: eu-west-1
  period_seconds: 240
  metrics:
  - aws_namespace: AWS/ELB
    aws_metric_name: HealthyHostCount
    aws_dimensions: [AvailabilityZone, LoadBalancerName]
    aws_statistics: [Average]

  - aws_namespace: AWS/ELB
    aws_metric_name: UnHealthyHostCount
    aws_dimensions: [AvailabilityZone, LoadBalancerName]
    aws_statistics: [Average]

  - aws_namespace: AWS/ELB
    aws_metric_name: RequestCount
    aws_dimensions: [AvailabilityZone, LoadBalancerName]
    aws_statistics: [Sum]

  - aws_namespace: AWS/ELB
    aws_metric_name: Latency
    aws_dimensions: [AvailabilityZone, LoadBalancerName]
    aws_statistics: [Average]

  - aws_namespace: AWS/ELB
    aws_metric_name: SurgeQueueLength
    aws_dimensions: [AvailabilityZone, LoadBalancerName]
    aws_statistics: [Maximum, Sum]

nodeSelector: {}

tolerations: []

affinity: {}

# Configurable health checks against the /healthy and /ready endpoints
livenessProbe:
  initialDelaySeconds: 30
  periodSeconds: 5
  timeoutSeconds: 5
  successThreshold: 1
  failureThreshold: 3

readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 5
  timeoutSeconds: 5
  successThreshold: 1
  failureThreshold: 3

serviceMonitor:
  # When set true then use a ServiceMonitor to configure scraping
  enabled: false
  # Set the namespace the ServiceMonitor should be deployed
  # namespace: monitoring
  # Set how frequently Prometheus should scrape
  # interval: 30s
  # Set path to cloudwatch-exporter telemtery-path
  # telemetryPath: /metrics
  # Set labels for the ServiceMonitor, use this to define your scrape label for Prometheus Operator
  # labels:
```

</details>

---

# Cloudwatch exporter

- Installs [cloudwatch exporter](http://github.com/prometheus/cloudwatch_exporter)

## TL;DR;

```console
$ helm install stable/prometheus-cloudwatch-exporter
```

## Introduction

This chart bootstraps a [cloudwatch exporter](http://github.com/prometheus/cloudwatch_exporter) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- [kube2iam](../../stable/kube2iam) installed to used the **aws.role** config option otherwise configure **aws.aws_access_key_id** and **aws.aws_secret_access_key** or **aws.secret.name**

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ # pass AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY as values
$ helm install --name my-release stable/prometheus-cloudwatch-exporter --set aws.aws_access_key_id=$AWS_ACCESS_KEY_ID,aws.aws_secret_access_key=$AWS_SECRET_ACCESS_KEY

$ # or store them in a secret and pass its name as a value
$ kubectl create secret generic <SECRET_NAME> --from-literal=access_key=$AWS_ACCESS_KEY_ID --from-literal=secret_key=$AWS_SECRET_ACCESS_KEY
$ helm install --name my-release stable/prometheus-cloudwatch-exporter --set aws.secret.name=<SECRET_NAME>

$ # or add a role to aws with the [correct policy](https://github.com/prometheus/cloudwatch_exporter#credentials-and-permissions) to add to cloud watch and pass its name as a value
$ helm install --name my-release stable/prometheus-cloudwatch-exporter --set awsRole=<ROLL_NAME>
```

The command deploys Cloudwatch exporter on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Cloudwatch Exporter chart and their default values.

| Parameter                         | Description                                                             | Default                     |
| --------------------------------- | ----------------------------------------------------------------------- | --------------------------- |
| `image.repository`                | Image                                                                   | `prom/cloudwatch-exporter`  |
| `image.tag`                       | Image tag                                                               | `cloudwatch_exporter-0.5.0` |
| `image.pullPolicy`                | Image pull policy                                                       | `IfNotPresent`              |
| `service.type`                    | Service type                                                            | `ClusterIP`                 |
| `service.port`                    | The service port                                                        | `80`                        |
| `service.portName`                | The name of the service port                                            | `http`                      |
| `service.annotations`             | Custom annotations for service                                          | `{}`                        |
| `service.labels`                  | Additional custom labels for the service                                | `{}`                        |
| `resources`                       |                                                                         | `{}`                        |
| `aws.role`                        | AWS IAM Role To Use                                                     |                             |
| `aws.aws_access_key_id`           | AWS access key id                                                       |                             |
| `aws.aws_secret_access_key`       | AWS secret access key                                                   |                             |
| `aws.secret.name`                 | The name of a pre-created secret in which AWS credentials are stored    |                             |
| `aws.secret.includesSessionToken` | Whether or not the pre-created secret contains an AWS STS session token |                             |
| `config`                          | Cloudwatch exporter configuration                                       | `example configuration`     |
| `rbac.create`                     | If true, create & use RBAC resources                                    | `false`                     |
| `serviceAccount.create`           | Specifies whether a service account should be created.                  | `true`                      |
| `serviceAccount.name`             | Name of the service account.                                            |                             |
| `tolerations`                     | Add tolerations                                                         | `[]`                        |
| `nodeSelector`                    | node labels for pod assignment                                          | `{}`                        |
| `affinity`                        | node/pod affinities                                                     | `{}`                        |
| `livenessProbe`                   | Liveness probe settings                                                 |                             |
| `readinessProbe`                  | Readiness probe settings                                                |                             |
| `servicemonitor.enabled`          | Use servicemonitor from prometheus operator                             | `false`                     |
| `servicemonitor.namespace`        | Namespace thes Servicemonitor is installed in                           |                             |
| `servicemonitor.interval`         | How frequently Prometheus should scrape                                 |                             |
| `servicemonitor.telemetryPath`    | path to cloudwatch-exporter telemtery-path                              |                             |
| `servicemonitor.labels`           | labels for the ServiceMonitor passed to Prometheus Operator             | `{}`                        |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
    --set aws.role=my-aws-role \
    stable/prometheus-cloudwatch-exporter
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/prometheus-cloudwatch-exporter
```
