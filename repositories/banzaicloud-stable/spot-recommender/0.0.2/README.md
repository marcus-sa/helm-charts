# `@helm-charts/banzaicloud-stable-spot-recommender`

A Spot Recommender Helm chart for Kubernetes

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | spot-recommender   |
| Chart Version       | 0.0.2              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for spot-recommender
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

recommender:
  ## The official Banzai Spot Recommender image, change tag to use a different version.
  ## https://hub.docker.com/r/banzaicloud/spot-recommender/tags/
  ##
  image:
    repository: 'banzaicloud/spot-recommender'
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
  appPort: 9090

  # Recommendations are cached for these instance types (comma separated list)
  cacheInstanceTypes: 'm4.xlarge,m5.xlarge,c5.xlarge'

  # Time (in seconds) between reevaluating the recommendations.
  reevaluationInterval: '1m0s'

  #AWS region where the recommender should work.
  region: 'eu-west-1'

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

# Hollowtrees Spot Recommender

[SpotRecommender](https://github.com/banzaicloud/spot-recommender) Spot instance recommender is a building block of the Hollowtrees project.

## tl;dr:

```bash
$ helm repo add banzaicloud-incubator http://kubernetes-charts-incubator.banzaicloud.com
$ helm repo update
$ helm install banzaicloud-incubator/spot-recommender
```

## Introduction

This chart bootstraps an [AWS spot recommender](https://github.com/banzaicloud/banzai-charts/incubator/spot-recommender) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release banzaicloud-incubator/spot-recommender
```

The command deploys SpotRecommender on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the SpotRecommender chart and their default values.

| Parameter                          | Description                                                 | Default                                  |
| ---------------------------------- | ----------------------------------------------------------- | ---------------------------------------- |
| `recommender.name`                 | Spot Recommender container name                             | `recommender`                            |
| `recommender.image`                | Spot Recommender container image                            | `banzaicloud/spot-recommender:{VERSION}` |
| `recommender.replicaCount`         | Replica Count                                               | `3`                                      |
| `recommender.service.type`         | Kubernetes service type to expose                           | `ClusterIP`                              |
| `recommender.service.nodePort`     | Port to bind to for NodePort service type                   | `nil`                                    |
| `recommender.service.annotations`  | Additional annotations to add to service                    | `nil`                                    |
| `recommender.imagePullPolicy`      | Image pull policy.                                          | `IfNotPresent`                           |
| `recommender.logLevel`             | Recommender Log level                                       | `info`                                   |
| `recommender.appPort`              | Port to bind to for Recommender service                     | `9090`                                   |
| `recommender.cacheInstanceTypes`   | Recommendations are cached for these instance types         | `m4.xlarge,m5.xlarge,c5.xlarge`          |
| `recommender.reevaluationInterval` | Time (in seconds) between reevaluating the recommendations. | `1m0s`                                   |
| `recommender.region`               | AWS region where the recommender should work.               | `eu-west-1`                              |
| `recommender.resources`            | CPU/Memory resource requests/limits                         | Memory: `256Mi`, CPU: `100m`             |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example:

```bash
$ helm install --name my-release -f values.yaml banzaicloud-incubator/spot-recommender
```

> **Tip**: You can use the default [values.yaml](values.yaml)

```

```
