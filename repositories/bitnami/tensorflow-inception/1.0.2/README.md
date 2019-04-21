# `@helm-charts/bitnami-tensorflow-inception`

Open-source software library for serving machine learning models

| Field               | Value                |
| ------------------- | -------------------- |
| Repository Name     | bitnami              |
| Chart Name          | tensorflow-inception |
| Chart Version       | 1.0.2                |
| NPM Package Version | 0.1.0                |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## TensorFlow Serving server image version
## ref: https://hub.docker.com/r/bitnami/tensorflow-serving/tags/
##
server:
  image:
    registry: docker.io
    repository: bitnami/tensorflow-serving
    tag: 1.10.1-debian-9
    ## Specify a imagePullPolicy
    ## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
    ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
    ##
    pullPolicy: IfNotPresent
    ## Optionally specify an array of imagePullSecrets.
    ## Secrets must be manually created in the namespace.
    ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
    ##
    # pullSecrets:
    #   - myRegistrKeySecretName
  port: 8500

## TensorFlow Inception image version
## ref: https://hub.docker.com/r/bitnami/tensorflow-inception/tags/
##
client:
  image:
    registry: docker.io
    repository: bitnami/tensorflow-inception
    tag: 1.10.1-debian-9
    ## Specify a imagePullPolicy
    ## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
    ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
    ##
    pullPolicy: IfNotPresent
    ## Optionally specify an array of imagePullSecrets.
    ## Secrets must be manually created in the namespace.
    ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
    ##
    # pullSecrets:
    #   - myRegistrKeySecretName

## Specify a imagePullPolicy
## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  ## If defined, volume.beta.kubernetes.io/storage-class: <storageClass>
  ## Default: volume.alpha.kubernetes.io/storage-class: default
  ##
  # storageClass:
  accessMode: ReadWriteOnce
  size: 500Mi

## Kubernetes configuration
## For minikube, set this to NodePort, elsewhere use LoadBalancer
##
serviceType: LoadBalancer
```

</details>

---

# TensorFlow Serving Inception v3

TensorFlow Serving is an open-source software library for serving machine learning models. This chart will specifically serve the Inception v3 model with already trained data.

## TL;DR;

```console
$ helm install bitnami/tensorflow-inception
```

## Introduction

This chart bootstraps a TensorFlow Serving Inception v3 pod on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Get this chart

Download the latest release of the chart from the [releases](../../../releases) page.

Alternatively, clone the repo if you wish to use the development snapshot:

```console
$ git clone https://github.com/bitnami/charts.git
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release bitnami/tensorflow-inception
```

The command deploys Tensorflow Serving Inception v3 model on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

You can check your releases with:

```console
$ helm list
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the TensorFlow Inception chart and their default values.

| Parameter                  | Description                            | Default                                                  |
| -------------------------- | -------------------------------------- | -------------------------------------------------------- |
| `server.image.registry`    | TensorFlow Serving image registry      | `docker.io`                                              |
| `server.image.repository`  | TensorFlow Serving Image name          | `bitnami/tensorflow-serving`                             |
| `server.image.tag`         | TensorFlow Serving Image tag           | `{VERSION}`                                              |
| `server.image.pullPolicy`  | TensorFlow Serving image pull policy   | `Always` if `imageTag` is `latest`, else `IfNotPresent`  |
| `server.image.pullSecrets` | Specify image pull secrets             | `nil` (does not add image pull secrets to deployed pods) |
| `server.port`              | Tensorflow server port                 | `8500`                                                   |
| `client.image.registry`    | TensorFlow Inception image registry    | `docker.io`                                              |
| `client.image.repository`  | TensorFlow Inception Image name        | `bitnami/tensorflow-inception`                           |
| `client.image.tag`         | TensorFlow Inception Image tag         | `{VERSION}`                                              |
| `client.image.pullPolicy`  | TensorFlow Inception image pull policy | `Always` if `imageTag` is `latest`, else `IfNotPresent`  |
| `client.image.pullSecrets` | Specify image pull secrets             | `nil` (does not add image pull secrets to deployed pods) |
| `imagePullPolicy`          | Image pull policy                      | `Always` if `image` tag is `latest`, else `IfNotPresent` |
| `persistence.enabled`      | Use a PVC to persist data              | `true`                                                   |
| `persistence.storageClass` | Storage class of backing PVC           | `nil` (uses alpha storage class annotation)              |
| `persistence.accessMode`   | Use volume as ReadOnly or ReadWrite    | `ReadWriteOnce`                                          |
| `persistence.size`         | Size of data volume                    | `500Mi`                                                  |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release bitnami/tensorflow-inception --set imagePullPolicy=Always
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml bitnami/tensorflow-inception
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Upgrading

### To 1.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 1.0.0. The following example assumes that the release name is tensorflow-inception:

```console
$ kubectl patch deployment tensorflow-inception --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
```
