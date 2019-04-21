# `@helm-charts/bitnami-wildfly`

Chart for Wildfly

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | bitnami |
| Chart Name          | wildfly |
| Chart Version       | 2.2.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Global Docker image parameters
## Please, note that this will override the image parameters, including dependencies, configured to use the global value
## Current available global Docker image parameters: imageRegistry and imagePullSecrets
##
# global:
#   imageRegistry: myRegistryName
#   imagePullSecrets:
#     - myRegistryKeySecretName

## Bitnami WildFly image version
## ref: https://hub.docker.com/r/bitnami/wildfly/tags/
##
image:
  registry: docker.io
  repository: bitnami/wildfly
  tag: 15.0.1
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
  #   - myRegistryKeySecretName

## Specify a imagePullPolicy
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent

## Pod Security Context
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
##
securityContext:
  enabled: true
  fsGroup: 1001
  runAsUser: 1001

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
service:
  type: LoadBalancer
  # HTTP Port
  port: 80
  # Management Port
  mgmtPort: 9990
  ##
  ## loadBalancerIP:
  ## nodePorts:
  ##   http: <to set explicitly, choose port between 30000-32767>
  ##   mgmt: <to set explicitly, choose port between 30000-32767>
  nodePorts:
    http: ''
    mgmt: ''
  ## Enable client source IP preservation
  ## ref http://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/#preserving-the-client-source-ip
  ##
  externalTrafficPolicy: Cluster

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

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters. This Helm chart has been tested on top of [Bitnami Kubernetes Production Runtime](https://kubeprod.io/) (BKPR). Deploy BKPR to get automated TLS certificates, logging and monitoring for your applications.

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

| Parameter                       | Description                                      | Default                                                 |
| ------------------------------- | ------------------------------------------------ | ------------------------------------------------------- |
| `global.imageRegistry`          | Global Docker image registry                     | `nil`                                                   |
| `global.imagePullSecrets`       | Global Docker registry secret names as an array  | `[]` (does not add image pull secrets to deployed pods) |
| `image.registry`                | WildFly image registry                           | `docker.io`                                             |
| `image.repository`              | WildFly Image name                               | `bitnami/wildfly`                                       |
| `image.tag`                     | WildFly Image tag                                | `{VERSION}`                                             |
| `image.pullPolicy`              | WildFly image pull policy                        | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`             | Specify docker-registry secret names as an array | `[]` (does not add image pull secrets to deployed pods) |
| `wildflyUsername`               | WildFly admin user                               | `user`                                                  |
| `wildflyPassword`               | WildFly admin password                           | _random 10 character alphanumeric string_               |
| `securityContext.enabled`       | Enable security context                          | `true`                                                  |
| `securityContext.fsGroup`       | Group ID for the container                       | `1001`                                                  |
| `securityContext.runAsUser`     | User ID for the container                        | `1001`                                                  |
| `service.type`                  | Kubernetes Service type                          | `LoadBalancer`                                          |
| `service.port`                  | Service HTTP port                                | `80`                                                    |
| `service.mgmtPort`              | Service Management port                          | `9990`                                                  |
| `service.nodePorts.http`        | Kubernetes http node port                        | `""`                                                    |
| `service.nodePorts.mgmt`        | Kubernetes management node port                  | `""`                                                    |
| `service.externalTrafficPolicy` | Enable client source IP preservation             | `Cluster`                                               |
| `service.loadBalancerIP`        | LoadBalancer service IP address                  | `""`                                                    |
| `persistence.enabled`           | Enable persistence using PVC                     | `true`                                                  |
| `persistence.storageClass`      | PVC Storage Class for WildFly volume             | `nil` (uses alpha storage class annotation)             |
| `persistence.accessMode`        | PVC Access Mode for WildFly volume               | `ReadWriteOnce`                                         |
| `persistence.size`              | PVC Storage Request for WildFly volume           | `8Gi`                                                   |
| `resources`                     | CPU/Memory resource requests/limits              | Memory: `512Mi`, CPU: `300m`                            |

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

## Upgrading

### To 2.1.0

WildFly container was moved to a non-root approach. There shouldn't be any issue when upgrading since the corresponding `securityContext` is enabled by default. Both the container image and the chart can be upgraded by running the command below:

```
$ helm upgrade my-release stable/wildfly
```

If you use a previous container image (previous to **14.0.1-r75**) disable the `securityContext` by running the command below:

```
$ helm upgrade my-release stable/wildfly --set securityContext.enabled=fase,image.tag=XXX
```

### To 1.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 1.0.0. The following example assumes that the release name is wildfly:

```console
$ kubectl patch deployment wildfly --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
```
