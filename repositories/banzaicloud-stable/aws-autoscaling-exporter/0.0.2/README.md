# `@helm-charts/banzaicloud-stable-aws-autoscaling-exporter`

An aws autoscaling exporter Helm chart for Kubernetes

| Field               | Value                    |
| ------------------- | ------------------------ |
| Repository Name     | banzaicloud-stable       |
| Chart Name          | aws-autoscaling-exporter |
| Chart Version       | 0.0.2                    |
| NPM Package Version | 0.1.0                    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for aws-autoscaling-exporter
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

autoscalingExporter:
  ## The official Banzai AWS Autoscaling Exporter image, change tag to use a different version.
  ## https://hub.docker.com/r/banzaicloud/aws-autoscaling-exporter/tags/
  ##
  image:
    repository: 'banzaicloud/aws-autoscaling-exporter'
    tag: '0.0.1'

    ## Specify an imagePullPolicy (Required)
    ## It's recommended to change this to 'Always' if the image tag is 'latest'
    ## ref: http://kubernetes.io/docs/user-guide/images/#updating-images
    imagePullPolicy: IfNotPresent

  replicas: 1

  service:
    ## Kubernetes service type
    type: ClusterIP

    ## Specify the nodePort value for the LoadBalancer and NodePort service types.
    ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
    ##
    # nodePort:
    ## Provide any additonal annotations which may be required. This can be used to
    ## set the LoadBalancer service type to internal only.
    ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#internal-load-balancer
    ##
    # annotations:

  logLevel: 'info'

  # The address to listen on for HTTP requests.
  appPort: 8089

  # URL of the spot instance recommender
  recommenderUrl: 'http://localhost:9090'

  # Path to metrics endpoint
  metricsPath: '/metrics'

  #AWS region where the recommender should work.
  region: 'eu-west-1'

  #Comma separated list of auto scaling groups to monitor. Empty value means all groups in the region.
  autoScalingGroups: ''

  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    requests:
      memory: 256Mi
      cpu: 120m

#AWS access key ID used to describe auto scaling groups
awsAccessKeyId: ''
#AWS secret key used to describe auto scaling groups
awsSecretAccessKey: ''
```

</details>

---

# Hollowtrees AWS Autoscaling Exporter

[AutoscalingExporter](https://github.com/banzaicloud/aws-autoscaling-exporter) Prometheus exporter for AWS auto scaling groups.

## tl;dr:

```bash
$ helm repo add banzaicloud-incubator http://kubernetes-charts-incubator.banzaicloud.com
$ helm repo update
$ helm install banzaicloud-incubator/aws-autoscaling-exporter
```

## Introduction

This chart bootstraps an AWS [Autoscaling exporter](https://github.com/banzaicloud/banzai-charts/incubator/aws-autoscaling-exporter) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release banzaicloud-incubator/aws-autoscaling-exporter
```

The command deploys AutoscalingExporter on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the AWS Autoscaling Exporter chart and their default values.

| Parameter                                 | Description                                   | Default                                          |
| ----------------------------------------- | --------------------------------------------- | ------------------------------------------------ |
| `autoscalingExporter.name`                | Autoscaling Exporter container name           | `autoscalingExporter`                            |
| `autoscalingExporter.image`               | Autoscaling Exporter container image          | `banzaicloud/aws-autoscaling-exporter:{VERSION}` |
| `autoscalingExporter.replicaCount`        | Replica Count                                 | `3`                                              |
| `autoscalingExporter.service.type`        | Kubernetes service type to expose             | `ClusterIP`                                      |
| `autoscalingExporter.service.nodePort`    | Port to bind to for NodePort service type     | `nil`                                            |
| `autoscalingExporter.service.annotations` | Additional annotations to add to service      | `nil`                                            |
| `autoscalingExporter.imagePullPolicy`     | Image pull policy.                            | `IfNotPresent`                                   |
| `autoscalingExporter.logLevel`            | Recommender Log level                         | `info`                                           |
| `autoscalingExporter.appPort`             | Port to bind to for Recommender service       | `8089`                                           |
| `autoscalingExporter.recommenderUrl`      | URL of the spot instance recommender          | `http://localhost:9090`                          |
| `autoscalingExporter.metricsPath`         | Path to metrics endpoint                      | `/metrics`                                       |
| `autoscalingExporter.region`              | AWS region where the recommender should work. | `eu-west-1`                                      |
| `autoscalingExporter.resources`           | CPU/Memory resource requests/limits           | Memory: `256Mi`, CPU: `100m`                     |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example:

```bash
$ helm install --name my-release -f values.yaml banzaicloud-incubator/aws-autoscaling-exporter
```

> **Tip**: You can use the default [values.yaml](values.yaml)

```

```
