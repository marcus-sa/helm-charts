# `@helm-charts/bitnami-wildfly`

Chart for Wildfly

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | bitnami |
| Chart Name          | wildfly |
| Chart Version       | 0.4.13  |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami WildFly image version
## ref: https://hub.docker.com/r/bitnami/wildfly/tags/
##
image:
  registry: docker.io
  repository: bitnami/wildfly
  tag: 11.0.0
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
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent

## Admin user
## ref: https://github.com/bitnami/bitnami-docker-wildfly#creating-a-custom-user
##
wildflyUsername: user

## Admin password
## ref: https://github.com/bitnami/bitnami-docker-wildfly#creating-a-custom-user
##
# wildflyPassword:

## Kubernetes configuration
## For minikube, set this to NodePort, elsewhere use LoadBalancer
##
serviceType: LoadBalancer

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
  size: 8Gi

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 512Mi
    cpu: 300m
```

</details>

---

# WildFly

[Wildfly](http://wildfly.org/) formerly known as JBoss AS, or simply JBoss, is an application server authored by JBoss, now developed by Red Hat. WildFly is written in Java, and implements the Java Platform, Enterprise Edition (Java EE) specification.

## TL;DR;

```console
$ helm install bitnami/wildfly
```

## Introduction

This chart bootstraps a [WildFly](https://github.com/bitnami/bitnami-docker-wildfly) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release bitnami/wildfly
```

The command deploys WildFly on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the WildFly chart and their default values.

| Parameter                  | Description                            | Default                                                  |
| -------------------------- | -------------------------------------- | -------------------------------------------------------- |
| `image.registry`           | WildFly image registry                 | `docker.io`                                              |
| `image.repository`         | WildFly Image name                     | `bitnami/wildfly`                                        |
| `image.tag`                | WildFly Image tag                      | `{VERSION}`                                              |
| `image.pullPolicy`         | WildFly image pull policy              | `Always` if `imageTag` is `latest`, else `IfNotPresent`  |
| `image.pullSecrets`        | Specify image pull secrets             | `nil` (does not add image pull secrets to deployed pods) |
| `wildflyUsername`          | WildFly admin user                     | `user`                                                   |
| `wildflyPassword`          | WildFly admin password                 | _random 10 character alphanumeric string_                |
| `serviceType`              | Kubernetes Service type                | `LoadBalancer`                                           |
| `persistence.enabled`      | Enable persistence using PVC           | `true`                                                   |
| `persistence.storageClass` | PVC Storage Class for WildFly volume   | `nil` (uses alpha storage class annotation)              |
| `persistence.accessMode`   | PVC Access Mode for WildFly volume     | `ReadWriteOnce`                                          |
| `persistence.size`         | PVC Storage Request for WildFly volume | `8Gi`                                                    |
| `resources`                | CPU/Memory resource requests/limits    | Memory: `512Mi`, CPU: `300m`                             |

The above parameters map to the env variables defined in [bitnami/wildfly](http://github.com/bitnami/bitnami-docker-wildfly). For more information please refer to the [bitnami/wildfly](http://github.com/bitnami/bitnami-docker-wildfly) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set wildflyUser=manager,wildflyPassword=password \
    bitnami/wildfly
```

The above command sets the WildFly management username and password to `manager` and `password` respectively.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml bitnami/wildfly
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami WildFly](https://github.com/bitnami/bitnami-docker-wildfly) image stores the WildFly data and configurations at the `/bitnami/wildfly` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
