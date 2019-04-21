# `@helm-charts/stable-prometheus-cloudwatch-exporter`

A Helm chart for prometheus cloudwatch-exporter

| Field               | Value                          |
| ------------------- | ------------------------------ |
| Repository Name     | stable                         |
| Chart Name          | prometheus-cloudwatch-exporter |
| Chart Version       | 0.1.0                          |
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
  tag: latest
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80
  targetPort: 9100

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
  region: eu-west-1
  role:
  # Note: Do not specify the aws_access_key_id abd aws_secret_access_key if you specified role before
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

- [kube2iam](../../stable/kube2iam) installed to used the **aws.role** config option otherwise configure **aws.aws_access_key_id** and **aws.aws_secret_access_key**

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ # edit aws.aws_access_key_id and aws.aws_access_key_id with the key/password of a AWS user with a policy to access  Cloudwatch
$ helm install --name my-release stable/prometheus-cloudwatch-exporter
$ # or add a role to aws with the [correct policy](https://github.com/prometheus/cloudwatch_exporter#credentials-and-permissions) to add to cloud watch
$ helm install --name my-release stable/prometheus-cloudwatch-exporter --set awsRole=roll_name_here
```

The command deploys Cloudwatch exporter on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Cloudwatch Exporter chart and their default values.

| Parameter                   | Description                                            | Default                    |
| --------------------------- | ------------------------------------------------------ | -------------------------- |
| `image`                     | Image                                                  | `prom/cloudwatch-exporter` |
| `imageTag`                  | Image tag                                              | `latest`                   |
| `imagePullPolicy`           | Image pull policy                                      | `IfNotPresent`             |
| `service.type`              | Service type                                           | `ClusterIP`                |
| `service.port`              | The service port                                       | `80`                       |
| `service.targetPort`        | The target port of the container                       | `9100`                     |
| `resources`                 |                                                        | `{}`                       |
| `aws.region`                | AWS Cloudwatch region                                  | `eu-west-1`                |
| `aws.role`                  | AWS IAM Role To Use                                    |                            |
| `aws.aws_access_key_id`     | AWS access key id                                      |                            |
| `aws.aws_secret_access_key` | AWS secret access key                                  |                            |
| `config`                    | Cloudwatch exporter configuration                      | `example configuration`    |
| `rbac.create`               | If true, create & use RBAC resources                   | `false`                    |
| `serviceAccount.create`     | Specifies whether a service account should be created. | `true`                     |
| `serviceAccount.name`       | Name of the service account.                           |                            |
| `tolerations`               | Add tolerations                                        | `[]`                       |
| `nodeSelector`              | node labels for pod assignment                         | `{}`                       |
| `affinity`                  | node/pod affinities                                    | `{}`                       |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set aws.region=us-east-1 --set aws.role=my-aws-role \
    stable/prometheus-cloudwatch-exporter
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/prometheus-cloudwatch-exporter
```
