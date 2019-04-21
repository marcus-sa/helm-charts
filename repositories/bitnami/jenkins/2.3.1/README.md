# `@helm-charts/bitnami-jenkins`

The leading open source automation server

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | bitnami |
| Chart Name          | jenkins |
| Chart Version       | 2.3.1   |
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

## Bitnami Jenkins image version
## ref: https://hub.docker.com/r/bitnami/jenkins/tags/
##
image:
  registry: docker.io
  repository: bitnami/jenkins
  tag: 2.164.2
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

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-jenkins#configuration
##
jenkinsUser: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-jenkins#configuration
##
# jenkinsPassword:

## Jenkins home directory
##
jenkinsHome: /opt/bitnami/jenkins/jenkins_home

## Allows to disable the initial Bitnami configuration for Jenkins
##
disableInitialization: no

## Customize JVM parameters
##
# javaOpts:

## Kubernetes configuration
## For minikube, set this to NodePort, elsewhere use LoadBalancer
##
service:
  type: LoadBalancer
  # HTTP Port
  port: 80
  # HTTPS Port
  httpsPort: 443
  ## loadBalancerIP:
  ##
  ## nodePorts:
  ##   http: <to set explicitly, choose port between 30000-32767>
  ##   https: <to set explicitly, choose port between 30000-32767>
  nodePorts:
    http: ''
    https: ''
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

## Pod annotations
## ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
##
podAnnotations: {}

## Configure the ingress resource that allows you to access the
## Jenkins installation. Set up the URL
## ref: http://kubernetes.io/docs/user-guide/ingress/
##
ingress:
  ## Set to true to enable ingress record generation
  enabled: false

  ## Set this to true in order to add the corresponding annotations for cert-manager
  certManager: false

  ## Ingress annotations done as key:value pairs
  ## For a full list of possible ingress annotations, please see
  ## ref: https://github.com/kubernetes/ingress-nginx/blob/master/docs/annotations.md
  ##
  ## If tls is set to true, annotation ingress.kubernetes.io/secure-backends: "true" will automatically be set
  ## If certManager is set to true, annotation kubernetes.io/tls-acme: "true" will automatically be set
  annotations:
  #  kubernetes.io/ingress.class: nginx

  ## The list of hostnames to be covered with this ingress record.
  ## Most likely this will be just one host, but in the event more hosts are needed, this is an array
  hosts:
    - name: jenkins.local
      path: /

      ## Set this to true in order to enable TLS on the ingress record
      tls: false

      ## Optionally specify the TLS hosts for the ingress record
      ## Useful when the Ingress controller supports www-redirection
      ## If not specified, the above host name will be used
      # tlsHosts:
      # - www.jenkins.local
      # - jenkins.local

      ## If TLS is set to true, you must declare what secret will store the key/certificate for TLS
      tlsSecret: jenkins.local-tls

  secrets:
  ## If you're providing your own certificates, please use this to add the certificates as secrets
  ## key and certificate should start with -----BEGIN CERTIFICATE----- or
  ## -----BEGIN RSA PRIVATE KEY-----
  ##
  ## name should line up with a tlsSecret set further up
  ## If you're using cert-manager, this is unneeded, as it will create the secret for you if it is not set
  ##
  ## It is also possible to create and manage the certificates outside of this helm chart
  ## Please see README.md for more information
  # - name: jenkins.local-tls
  #   key:
  #   certificate:

## Prometheus Exporter / Metrics
##
metrics:
  enabled: false
  image:
    registry: docker.io
    repository: tolleiv/jenkins_exporter
    tag: latest
    pullPolicy: IfNotPresent
    ## Optionally specify an array of imagePullSecrets.
    ## Secrets must be manually created in the namespace.
    ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
    ##
    # pullSecrets:
    #   - myRegistryKeySecretName
  ## Metrics exporter pod Annotation and Labels
  podAnnotations:
    prometheus.io/scrape: 'true'
    prometheus.io/port: '9118'
    ## Metrics exporter resource requests and limits
    ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
    ##
  # resources: {}
```

</details>

---

# Jenkins

[Jenkins](https://jenkins.io) is widely recognized as the most feature-rich CI available with easy configuration, continuous delivery and continuous integration support, easily test, build and stage your app, and more. It supports multiple SCM tools including CVS, Subversion and Git. It can execute Apache Ant and Apache Maven-based projects as well as arbitrary scripts.

## TL;DR;

```console
$ helm install bitnami/jenkins
```

## Introduction

This chart bootstraps a [Jenkins](https://github.com/bitnami/bitnami-docker-jenkins) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters. This Helm chart has been tested on top of [Bitnami Kubernetes Production Runtime](https://kubeprod.io/) (BKPR). Deploy BKPR to get automated TLS certificates, logging and monitoring for your applications.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release bitnami/jenkins
```

The command deploys Jenkins on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Jenkins chart and their default values.

| Parameter                        | Description                                                                          | Default                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `global.imageRegistry`           | Global Docker image registry                                                         | `nil`                                                        |
| `global.imagePullSecrets`        | Global Docker registry secret names as an array                                      | `[]` (does not add image pull secrets to deployed pods)      |
| `image.registry`                 | Jenkins image registry                                                               | `docker.io`                                                  |
| `image.repository`               | Jenkins Image name                                                                   | `bitnami/jenkins`                                            |
| `image.tag`                      | Jenkins Image tag                                                                    | `{VERSION}`                                                  |
| `image.pullPolicy`               | Jenkins image pull policy                                                            | `Always` if `imageTag` is `latest`, else `IfNotPresent`      |
| `image.pullSecrets`              | Specify docker-registry secret names as an array                                     | `[]` (does not add image pull secrets to deployed pods)      |
| `jenkinsUser`                    | User of the application                                                              | `user`                                                       |
| `jenkinsPassword`                | Application password                                                                 | _random 10 character alphanumeric string_                    |
| `jenkinsHome`                    | Jenkins home directory                                                               | `/opt/bitnami/jenkins/jenkins_home`                          |
| `disableInitialization`          | Allows to disable the initial Bitnami configuration for Jenkins                      | `no`                                                         |
| `javaOpts`                       | Customize JVM parameters                                                             | `nil`                                                        |
| `service.type`                   | Kubernetes Service type                                                              | `LoadBalancer`                                               |
| `service.port`                   | Service HTTP port                                                                    | `80`                                                         |
| `service.httpsPort`              | Service HTTPS port                                                                   | `443`                                                        |
| `service.nodePorts.http`         | Kubernetes http node port                                                            | `""`                                                         |
| `service.nodePorts.https`        | Kubernetes https node port                                                           | `""`                                                         |
| `service.externalTrafficPolicy`  | Enable client source IP preservation                                                 | `Cluster`                                                    |
| `service.loadBalancerIP`         | LoadBalancer service IP address                                                      | `""`                                                         |
| `ingress.enabled`                | Enable ingress controller resource                                                   | `false`                                                      |
| `ingress.annotations`            | Ingress annotations                                                                  | `[]`                                                         |
| `ingress.certManager`            | Add annotations for cert-manager                                                     | `false`                                                      |
| `ingress.hosts[0].name`          | Hostname to your jenkins installation                                                | `jenkins.local`                                              |
| `ingress.hosts[0].path`          | Path within the url structure                                                        | `/`                                                          |
| `ingress.hosts[0].tls`           | Utilize TLS backend in ingress                                                       | `false`                                                      |
| `ingress.hosts[0].tlsHosts`      | Array of TLS hosts for ingress record (defaults to `ingress.hosts[0].name` if `nil`) | `nil`                                                        |
| `ingress.hosts[0].tlsSecret`     | TLS Secret (certificates)                                                            | `jenkins.local-tls-secret`                                   |
| `ingress.secrets[0].name`        | TLS Secret Name                                                                      | `nil`                                                        |
| `ingress.secrets[0].certificate` | TLS Secret Certificate                                                               | `nil`                                                        |
| `ingress.secrets[0].key`         | TLS Secret Key                                                                       | `nil`                                                        |
| `persistence.enabled`            | Enable persistence using PVC                                                         | `true`                                                       |
| `persistence.storageClass`       | PVC Storage Class for Jenkins volume                                                 | `nil` (uses alpha storage class annotation)                  |
| `persistence.accessMode`         | PVC Access Mode for Jenkins volume                                                   | `ReadWriteOnce`                                              |
| `persistence.size`               | PVC Storage Request for Jenkins volume                                               | `8Gi`                                                        |
| `resources`                      | CPU/Memory resource requests/limits                                                  | Memory: `512Mi`, CPU: `300m`                                 |
| `podAnnotations`                 | Pod annotations                                                                      | `{}`                                                         |
| `metrics.enabled`                | Start a side-car Jenkins prometheus exporter                                         | `false`                                                      |
| `metrics.image.registry`         | Jenkins exporter image registry                                                      | `docker.io`                                                  |
| `metrics.image.repository`       | Jenkins exporter image name                                                          | `tolleiv/jenkins_exporter`                                   |
| `metrics.image.tag`              | Jenkins exporter image tag                                                           | `latest`                                                     |
| `metrics.image.pullPolicy`       | Image pull policy                                                                    | `IfNotPresent`                                               |
| `metrics.image.pullSecrets`      | Specify docker-registry secret names as an array                                     | `[]` (does not add image pull secrets to deployed pods)      |
| `metrics.podAnnotations`         | Additional annotations for Metrics exporter pod                                      | `{prometheus.io/scrape: "true", prometheus.io/port: "9118"}` |
| `metrics.resources`              | Exporter resource requests/limit                                                     | Memory: `256Mi`, CPU: `100m`                                 |

The above parameters map to the env variables defined in [bitnami/jenkins](http://github.com/bitnami/bitnami-docker-jenkins). For more information please refer to the [bitnami/jenkins](http://github.com/bitnami/bitnami-docker-jenkins) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set jenkinsUsername=admin,jenkinsPassword=password \
    bitnami/jenkins
```

The above command sets the Jenkins administrator account username and password to `admin` and `password` respectively.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml bitnami/jenkins
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami Jenkins](https://github.com/bitnami/bitnami-docker-jenkins) image stores the Jenkins data and configurations at the `/bitnami/jenkins` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Upgrading

### To 1.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 1.0.0. The following example assumes that the release name is jenkins:

```console
$ kubectl patch deployment jenkins --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
```
