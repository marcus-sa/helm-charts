# `@helm-charts/bitnami-tomcat`

Chart for Apache Tomcat

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | bitnami |
| Chart Name          | tomcat  |
| Chart Version       | 2.1.2   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Global Docker image registry
## Please, note that this will override the image registry for all the images, including dependencies, configured to use the global value
##
# global:
#   imageRegistry:

## Bitnami Tomcat image version
## ref: https://hub.docker.com/r/bitnami/tomcat/tags/
##
image:
  registry: docker.io
  repository: bitnami/tomcat
  tag: 8.5.37
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

## Pod Security Context
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
##
securityContext:
  enabled: true
  fsGroup: 1001
  runAsUser: 1001

## Specify a imagePullPolicy
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent

## Admin user
## ref: https://github.com/bitnami/bitnami-docker-tomcat#creating-a-custom-user
##
tomcatUsername: user

## Admin password
## ref: https://github.com/bitnami/bitnami-docker-tomcat#creating-a-custom-user
##
# tomcatPassword:

## Expose management services
## ref: https://github.com/bitnami/charts/tree/master/bitnami/tomcat#configuration
##
tomcatAllowRemoteManagement: 0

## Kubernetes configuration
## For minikube, set this to NodePort, elsewhere use LoadBalancer
##
service:
  type: LoadBalancer
  # HTTP Port
  port: 80
  ##
  ## loadBalancerIP:
  ## nodePorts:
  ##   http: <to set explicitly, choose port between 30000-32767>
  ##   https: <to set explicitly, choose port between 30000-32767>
  nodePorts:
    http: ''
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

# Tomcat

[Apache Tomcat](http://tomcat.apache.org/), often referred to as Tomcat, is an open-source web server and servlet container developed by the Apache Software Foundation. Tomcat implements several Java EE specifications including Java Servlet, JavaServer Pages, Java EL, and WebSocket, and provides a "pure Java" HTTP web server environment for Java code to run in.

## TL;DR;

```console
$ helm install bitnami/tomcat
```

## Introduction

This chart bootstraps a [Tomcat](https://github.com/bitnami/bitnami-docker-tomcat) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release bitnami/tomcat
```

The command deploys Tomcat on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Tomcat chart and their default values.

| Parameter                       | Description                                      | Default                                                 |
| ------------------------------- | ------------------------------------------------ | ------------------------------------------------------- |
| `global.imageRegistry`          | Global Docker image registry                     | `nil`                                                   |
| `image.registry`                | Tomcat image registry                            | `docker.io`                                             |
| `image.repository`              | Tomcat Image name                                | `bitnami/tomcat`                                        |
| `image.tag`                     | Tomcat Image tag                                 | `{VERSION}`                                             |
| `image.pullPolicy`              | Tomcat image pull policy                         | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`             | Specify docker-registry secret names as an array | `[]` (does not add image pull secrets to deployed pods) |
| `tomcatUsername`                | Tomcat admin user                                | `user`                                                  |
| `tomcatPassword`                | Tomcat admin password                            | _random 10 character alphanumeric string_               |
| `tomcatAllowRemoteManagement`   | Enable remote access to management interface     | `0` (disabled)                                          |
| `securityContext.enabled`       | Enable security context                          | `true`                                                  |
| `securityContext.fsGroup`       | Group ID for the container                       | `1001`                                                  |
| `securityContext.runAsUser`     | User ID for the container                        | `1001`                                                  |
| `service.type`                  | Kubernetes Service type                          | `LoadBalancer`                                          |
| `service.port`                  | Service HTTP port                                | `80`                                                    |
| `service.nodePorts.http`        | Kubernetes http node port                        | `""`                                                    |
| `service.externalTrafficPolicy` | Enable client source IP preservation             | `Cluster`                                               |
| `service.loadBalancerIP`        | LoadBalancer service IP address                  | `""`                                                    |
| `persistence.enabled`           | Enable persistence using PVC                     | `true`                                                  |
| `persistence.storageClass`      | PVC Storage Class for Tomcat volume              | `nil` (uses alpha storage class annotation)             |
| `persistence.accessMode`        | PVC Access Mode for Tomcat volume                | `ReadWriteOnce`                                         |
| `persistence.size`              | PVC Storage Request for Tomcat volume            | `8Gi`                                                   |
| `resources`                     | CPU/Memory resource requests/limits              | Memory: `512Mi`, CPU: `300m`                            |

The above parameters map to the env variables defined in [bitnami/tomcat](http://github.com/bitnami/bitnami-docker-tomcat). For more information please refer to the [bitnami/tomcat](http://github.com/bitnami/bitnami-docker-tomcat) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set tomcatUser=manager,tomcatPassword=password bitnami/tomcat
```

The above command sets the Tomcat management username and password to `manager` and `password` respectively.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml bitnami/tomcat
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami Tomcat](https://github.com/bitnami/bitnami-docker-tomcat) image stores the Tomcat data and configurations at the `/bitnami/tomcat` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Upgrading

### To 2.1.0

Tomcat container was moved to a non-root approach. There shouldn't be any issue when upgrading since the corresponding `securityContext` is enabled by default. Both the container image and the chart can be upgraded by running the command below:

```
$ helm upgrade my-release stable/tomcat
```

If you use a previous container image (previous to **8.5.35-r26**) disable the `securityContext` by running the command below:

```
$ helm upgrade my-release stable/tomcat --set securityContext.enabled=fase,image.tag=XXX
```

### To 1.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 1.0.0. The following example assumes that the release name is tomcat:

```console
$ kubectl patch deployment tomcat --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
```
