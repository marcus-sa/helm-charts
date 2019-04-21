# `@helm-charts/bitnami-dokuwiki`

DokuWiki is a standards-compliant, simple to use wiki optimized for creating documentation. It is targeted at developer teams, workgroups, and small companies. All data is stored in plain text files, so no database is required.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | bitnami  |
| Chart Name          | dokuwiki |
| Chart Version       | 3.3.0    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Global Docker image registry
## Please, note that this will override the image registry for all the images, including dependencies, configured to use the global value
##
# global:
#   imageRegistry:

## Bitnami DokuWiki image version
## ref: https://hub.docker.com/r/bitnami/dokuwiki/tags/
##
image:
  registry: docker.io
  repository: bitnami/dokuwiki
  tag: 0.20180422.201805030840
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

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-dokuwiki#environment-variables
##
dokuwikiUsername: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-dokuwiki#environment-variables
# dokuwikiPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-dokuwiki#environment-variables
##
dokuwikiEmail: user@example.com

## User's Full Name
## ref: https://github.com/bitnami/bitnami-docker-dokuwiki#environment-variables
##
dokuwikiFullName: User Name

## Name of the Wiki
## ref: https://github.com/bitnami/bitnami-docker-dokuwiki#environment-variables
##
dokuwikiWikiName: My Wiki

## Kubernetes svc configuration
##
service:
  ## Kubernetes svc type
  ## For minikube, set this to NodePort, elsewhere use LoadBalancer
  ##
  type: LoadBalancer
  ## Use serviceLoadBalancerIP to request a specific static IP,
  ## otherwise leave blank
  ##
  # loadBalancerIP:
  ## Use nodePorts to requets some specific ports when usin NodePort
  ## nodePorts:
  ##   http: <to set explicitly, choose port between 30000-32767>
  ##   https: <to set explicitly, choose port between 30000-32767>
  ##
  nodePorts:
    http: ''
    https: ''
  ## Enable client source IP preservation
  ## ref http://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/#preserving-the-client-source-ip
  ##
  externalTrafficPolicy: Cluster

## Configure the ingress resource that allows you to access the
## Dokuwiki installation. Set up the URL
## ref: http://kubernetes.io/docs/user-guide/ingress/
##
ingress:
  ## Set to true to enable ingress record generation
  enabled: false

  ## The list of hostnames to be covered with this ingress record.
  ## Most likely this will be just one host, but in the event more hosts are needed, this is an array
  hosts:
    - name: dokuwiki.local

      ## Set this to true in order to enable TLS on the ingress record
      ## A side effect of this will be that the backend dokuwiki service will be connected at port 443
      tls: false

      ## Set this to true in order to add the corresponding annotations for cert-manager
      certManager: false

      ## If TLS is set to true, you must declare what secret will store the key/certificate for TLS
      tlsSecret: dokuwiki.local-tls

      ## Ingress annotations done as key:value pairs
      ## For a full list of possible ingress annotations, please see
      ## ref: https://github.com/kubernetes/ingress-nginx/blob/master/docs/annotations.md
      ##
      ## If tls is set to true, annotation ingress.kubernetes.io/secure-backends: "true" will automatically be set
      ## If certManager is set to true, annotation kubernetes.io/tls-acme: "true" will automatically be set
      annotations:
      #  kubernetes.io/tls-acme: true

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
  # - name: dokuwiki.local-tls
  #   key:
  #   certificate:

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  apache:
    ## Apache data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 1Gi
  dokuwiki:
    ## Dokuwiki data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 8Gi

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 512Mi
    cpu: 300m

## Configure extra options for liveness and readiness probes
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#configure-probes)
livenessProbe:
  enabled: true
  initialDelaySeconds: 120
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1
readinessProbe:
  enabled: true
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1

## Configuration options for nodeSelector, tolerations and affinity for pod
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
nodeSelector: {}
tolerations: []
affinity: {}

## Pod annotations
## ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
##
podAnnotations: {}
## Prometheus Exporter / Metrics
##
metrics:
  enabled: false
  image:
    registry: docker.io
    repository: lusotycoon/apache-exporter
    tag: v0.5.0
    pullPolicy: IfNotPresent
    ## Optionally specify an array of imagePullSecrets.
    ## Secrets must be manually created in the namespace.
    ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
    ##
    # pullSecrets:
    #   - myRegistrKeySecretName
  ## Metrics exporter pod Annotation and Labels
  podAnnotations:
    prometheus.io/scrape: 'true'
    prometheus.io/port: '9117'
    ## Metrics exporter resource requests and limits
    ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
    ##
  # resources: {}
```

</details>

---

# DokuWiki

[DokuWiki](https://www.dokuwiki.org) is a standards-compliant, simple to use wiki optimized for creating documentation. It is targeted at developer teams, workgroups, and small companies. All data is stored in plain text files, so no database is required.

## TL;DR;

```console
$ helm install stable/dokuwiki
```

## Introduction

This chart bootstraps a [DokuWiki](https://github.com/bitnami/bitnami-docker-dokuwiki) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/dokuwiki
```

The command deploys DokuWiki on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the DokuWiki chart and their default values.

| Parameter                            | Description                                               | Default                                                      |
| ------------------------------------ | --------------------------------------------------------- | ------------------------------------------------------------ |
| `global.imageRegistry`               | Global Docker image registry                              | `nil`                                                        |
| `image.registry`                     | DokuWiki image registry                                   | `docker.io`                                                  |
| `image.repository`                   | DokuWiki image name                                       | `bitnami/dokuwiki`                                           |
| `image.tag`                          | DokuWiki image tag                                        | `{VERSION}`                                                  |
| `image.pullPolicy`                   | Image pull policy                                         | `Always`                                                     |
| `image.pullSecrets`                  | Specify image pull secrets                                | `nil`                                                        |
| `dokuwikiUsername`                   | User of the application                                   | `user`                                                       |
| `dokuwikiFullName`                   | User's full name                                          | `User Name`                                                  |
| `dokuwikiPassword`                   | Application password                                      | _random 10 character alphanumeric string_                    |
| `dokuwikiEmail`                      | User email                                                | `user@example.com`                                           |
| `dokuwikiWikiName`                   | Wiki name                                                 | `My Wiki`                                                    |
| `service.loadBalancer`               | Kubernetes LoadBalancerIP to request                      | `nil`                                                        |
| `service.externalTrafficPolicy`      | Enable client source IP preservation                      | `Cluster`                                                    |
| `service.nodePorts.http`             | Kubernetes http node port                                 | `""`                                                         |
| `service.nodePorts.https`            | Kubernetes https node port                                | `""`                                                         |
| `ingress.enabled`                    | Enable ingress controller resource                        | `false`                                                      |
| `ingress.hosts[0].name`              | Hostname to your DokuWiki installation                    | `dokuwiki.local`                                             |
| `ingress.hosts[0].path`              | Path within the url structure                             | `/`                                                          |
| `ingress.hosts[0].tls`               | Utilize TLS backend in ingress                            | `false`                                                      |
| `ingress.hosts[0].certManager`       | Add annotations for cert-manager                          | `false`                                                      |
| `ingress.hosts[0].tlsSecret`         | TLS Secret (certificates)                                 | `dokuwiki.local-tls`                                         |
| `ingress.hosts[0].annotations`       | Annotations for this host's ingress record                | `[]`                                                         |
| `ingress.secrets[0].name`            | TLS Secret Name                                           | `nil`                                                        |
| `ingress.secrets[0].certificate`     | TLS Secret Certificate                                    | `nil`                                                        |
| `ingress.secrets[0].key`             | TLS Secret Key                                            | `nil`                                                        |
| `persistence.enabled`                | Enable persistence using PVC                              | `true`                                                       |
| `persistence.apache.storageClass`    | PVC Storage Class for apache volume                       | `nil` (uses alpha storage class annotation)                  |
| `persistence.apache.accessMode`      | PVC Access Mode for apache volume                         | `ReadWriteOnce`                                              |
| `persistence.apache.size`            | PVC Storage Request for apache volume                     | `1Gi`                                                        |
| `persistence.dokuwiki.storageClass`  | PVC Storage Class for DokuWiki volume                     | `nil` (uses alpha storage class annotation)                  |
| `persistence.dokuwiki.accessMode`    | PVC Access Mode for DokuWiki volume                       | `ReadWriteOnce`                                              |
| `persistence.dokuwiki.size`          | PVC Storage Request for DokuWiki volume                   | `8Gi`                                                        |
| `resources`                          | CPU/Memory resource requests/limits                       | Memory: `512Mi`, CPU: `300m`                                 |
| `livenessProbe.enabled`              | Enable/disable the liveness probe                         | `true`                                                       |
| `livenessProbe.initialDelaySeconds`  | Delay before liveness probe is initiated                  | 120                                                          |
| `livenessProbe.periodSeconds`        | How often to perform the probe                            | 10                                                           |
| `livenessProbe.timeoutSeconds`       | When the probe times out                                  | 5                                                            |
| `livenessProbe.failureThreshold`     | Minimum consecutive failures to be considered failed      | 6                                                            |
| `livenessProbe.successThreshold`     | Minimum consecutive successes to be considered successful | 1                                                            |
| `readinessProbe.enabled`             | Enable/disable the readiness probe                        | `true`                                                       |
| `readinessProbe.initialDelaySeconds` | Delay before readinessProbe is initiated                  | 30                                                           |
| `readinessProbe.periodSeconds`       | How often to perform the probe                            | 10                                                           |
| `readinessProbe.timeoutSeconds`      | When the probe times out                                  | 5                                                            |
| `readinessProbe.failureThreshold`    | Minimum consecutive failures to be considered failed      | 6                                                            |
| `readinessProbe.successThreshold`    | Minimum consecutive successes to be considered successful | 1                                                            |
| `nodeSelector`                       | Node labels for pod assignment                            | `{}`                                                         |
| `affinity`                           | Affinity settings for pod assignment                      | `{}`                                                         |
| `tolerations`                        | Toleration labels for pod assignment                      | `[]`                                                         |
| `podAnnotations`                     | Pod annotations                                           | `{}`                                                         |
| `metrics.enabled`                    | Start a side-car prometheus exporter                      | `false`                                                      |
| `metrics.image.registry`             | Apache exporter image registry                            | `docker.io`                                                  |
| `metrics.image.repository`           | Apache exporter image name                                | `lusotycoon/apache-exporter`                                 |
| `metrics.image.tag`                  | Apache exporter image tag                                 | `v0.5.0`                                                     |
| `metrics.image.pullPolicy`           | Image pull policy                                         | `IfNotPresent`                                               |
| `metrics.image.pullSecrets`          | Specify docker-registry secret names as an array          | `nil`                                                        |
| `metrics.podAnnotations`             | Additional annotations for Metrics exporter pod           | `{prometheus.io/scrape: "true", prometheus.io/port: "9117"}` |
| `metrics.resources`                  | Exporter resource requests/limit                          | {}                                                           |

The above parameters map to the env variables defined in [bitnami/dokuwiki](http://github.com/bitnami/bitnami-docker-dokuwiki). For more information please refer to the [bitnami/dokuwiki](http://github.com/bitnami/bitnami-docker-dokuwiki) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set dokuwikiUsername=admin,dokuwikiPassword=password \
    stable/dokuwiki
```

The above command sets the DokuWiki administrator account username and password to `admin` and `password` respectively.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/dokuwiki
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami DokuWiki](https://github.com/bitnami/bitnami-docker-dokuwiki) image stores the DokuWiki data and configurations at the `/bitnami/dokuwiki` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Upgrading

### To 3.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 3.0.0. The following example assumes that the release name is dokuwiki:

```console
$ kubectl patch deployment dokuwiki-dokuwiki --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
```
