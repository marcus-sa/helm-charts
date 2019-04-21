# `@helm-charts/banzaicloud-stable-ingressauthgenerator`

Ingressauthgenerator Helm chart for Kubernetes

| Field               | Value                |
| ------------------- | -------------------- |
| Repository Name     | banzaicloud-stable   |
| Chart Name          | ingressauthgenerator |
| Chart Version       | 0.0.2                |
| NPM Package Version | 0.1.0                |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for ingressauthgenerator
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

ingressauthgenerator:
  replicaCount: 1

  ## The official Banzai ingressauthgenerator image, change tag to use a different version.
  ## https://hub.docker.com/r/banzaicloud/ingressauthgenerator/tags/
  ##
  image:
    repository: 'banzaicloud/ingressauthgenerator'
    tag: '0.0.2'

    ## Specify an imagePullPolicy (Required)
    ## It's recommended to change this to 'Always' if the image tag is 'latest'
    ## ref: http://kubernetes.io/docs/user-guide/images/#updating-images
    imagePullPolicy: IfNotPresent

  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    requests:
      memory: 120Mi
      cpu: 10m
```

</details>

---

# IngressAuthGenerator

[IngressAuthGenerator](https://github.com/banzaicloud/ingressauthgenerator)

## tl;dr:

```bash
$ helm repo add banzaicloud http://kubernetes-charts.banzaicloud.com
$ helm repo update
$ helm install banzaicloud/ingressauthgenerator
```

## Introduction

This chart bootstraps a Banzai Cloud [IngressAuthGenerator](https://github.com/banzaicloud/banzai-charts/stable/ingressauthgenerator) deployment to a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release banzaicloud/ingressauthgenerator
```

The command deploys IngressAuthGenerator to a Kubernetes cluster with the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the IngressAuthGenerator chart and their default values.

| Parameter                              | Description                         | Default                                      |
| -------------------------------------- | ----------------------------------- | -------------------------------------------- |
| `ingressauthgenerator.name`            | Container name                      | `ingressauthgenerator`                       |
| `ingressauthgenerator.image`           | Container image                     | `banzaicloud/ingressauthgenerator:{VERSION}` |
| `ingressauthgenerator.imagePullPolicy` | Image pull policy.                  | `IfNotPresent`                               |
| `ingressauthgenerator.resources`       | CPU/Memory resource requests/limits | Memory: `120Mi`, CPU: `20m`                  |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example:

```bash
$ helm install --name my-release -f values.yaml banzaicloud/ingressauthgenerator
```

> **Tip**: You can use the default [values.yaml](values.yaml)

```

```
