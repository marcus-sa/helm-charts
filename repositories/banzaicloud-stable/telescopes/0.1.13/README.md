# `@helm-charts/banzaicloud-stable-telescopes`

A Telescopes Helm chart for Kubernetes

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | telescopes         |
| Chart Version       | 0.1.13             |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for telescopes
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

## The official Banzai Spot Recommender image, change tag to use a different version.
## https://hub.docker.com/r/banzaicloud/telescopes/tags/
##
image:
  repository: 'banzaicloud/telescopes'
  tag: 0.4.1

  ## Specify an imagePullPolicy (Required)
  ## It's recommended to change this to 'Always' if the image tag is 'latest'
  ## ref: http://kubernetes.io/docs/user-guide/images/#updating-images
  imagePullPolicy: IfNotPresent

replicas: 1

service:
  ## Kubernetes service type
  type: ClusterIP
  port: 9090
  internalPort: 9090

  ## Specify the nodePort value for the LoadBalancer and NodePort service types.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
  ##
  # nodePort:
  ## Provide any additonal annotations which may be required. This can be used to
  ## set the LoadBalancer service type to internal only.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#internal-load-balancer
  ##
  # annotations:

ingress:
  enabled: false
  annotations:
    {}
    #kubernetes.io/ingress.class: traefik
    #ingress.kubernetes.io/ssl-redirect: "false"
    #traefik.frontend.rule.type: PathPrefix
  hosts:
    - '/'
    # - "domain.com/xyz"
    # - "domain.com"
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

podAnnotations:
  {}
  # prometheus.io/scrape: "true"
  # prometheus.io/path: "/metrics"
  # prometheus.io/port: "9999"

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 256Mi
    cpu: 120m

app:
  cloudInfoAddress: 'https://beta.banzaicloud.io/cloudinfo/api/v1'
  logLevel: info
  devMode: true
#  vaultAddress:
#  tokenSigningKey:

## Additional deployment labels and annotations
## ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
deploymentLabels: {}
deploymentAnnotations: {}
```

</details>

---

# Telescopes Chart

[Telescopes](https://github.com/banzaicloud/telescopes) Instance recommender is a building block of the Hollowtrees project.

## tl;dr:

```bash
$ helm repo add banzaicloud-stable http://kubernetes-charts.banzaicloud.com/
$ helm repo update
$ helm install banzaicloud-stable/telescopes
```

## Introduction

This chart bootstraps an [Telescopes](https://github.com/banzaicloud/banzai-charts/stable/telescopes) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release banzaicloud-stable/telescopes
```

The command deploys telescopes on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the telescopes chart and their default values.

| Parameter               | Description                                           | Default                                        |
| ----------------------- | ----------------------------------------------------- | ---------------------------------------------- |
| `image.repository`      | Container image repository                            | `banzaicloud/telescopes`                       |
| `image.tag`             | Container image tag                                   | `latest`                                       |
| `image.pullPolicy`      | Container pull policy                                 | `Always`                                       |
| `service.type`          | The kubernetes service type to use                    | `ClusterIP`                                    |
| `service.name`          | The kubernetes service name to use                    | `telescopes`                                   |
| `service.port`          | Port to bind to for NodePort service type             | `nil`                                          |
| `service.annotations`   | The kubernetes service annotations                    | `nil`                                          |
| `app.logLevel`          | Log level                                             | `info`                                         |
| `app.cloudInfoAddress`  | The address of the cloudinfo service                  | `https://beta.banzaicloud.io/cloudinfo/api/v1` |
| `app.devMode`           | Developer mode                                        | `false`                                        |
| `app.vaultAddress`      | The vault address for authentication token management | `nil`                                          |
| `app.tokenSigningKey`   | The token signing key for the authentication process  | `nil`                                          |
| `deploymentLabels`      | Additional deployment labels                          | `{}`                                           |
| `deploymentAnnotations` | Additional deployment annotations                     | `{}`                                           |

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example:

```bash
$ helm install --name my-release -f values.yaml banzaicloud-stable/telescopes
```

> **Tip**: You can use the default [values.yaml](values.yaml)

```

```
