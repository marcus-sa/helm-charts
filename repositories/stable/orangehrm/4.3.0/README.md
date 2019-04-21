# `@helm-charts/stable-orangehrm`

OrangeHRM is a free HR management system that offers a wealth of modules to suit the needs of your business.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | orangehrm |
| Chart Version       | 4.3.0     |
| NPM Package Version | 0.1.0     |

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

## Bitnami OrangeHRM image version
## ref: https://hub.docker.com/r/bitnami/orangehrm/tags/
##
image:
  registry: docker.io
  repository: bitnami/orangehrm
  tag: 4.3.0-0
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
## ref: https://github.com/bitnami/bitnami-docker-orangehrm#configuration
##
orangehrmUsername: admin

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-orangehrm#configuration
##
# orangehrmPassword:

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-orangehrm#environment-variables
allowEmptyPassword: 'yes'

##
## External database configuration
##
externalDatabase:
  ## Database host
  host:

  ## Database host
  port: 3306

  ## Database user
  user: bn_orangehrm

  ## Database password
  password:

  ## Database name
  database: bitnami_orangehrm

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-orangehrm/#smtp-configuration
# smtpHost:
# smtpPort:
# smtpUser:
# smtpPassword:
# smtpProtocol:

##
## MariaDB chart configuration
##
## https://github.com/helm/charts/blob/master/stable/mariadb/values.yaml
##
mariadb:
  ## Whether to deploy a mariadb server to satisfy the applications database requirements. To use an external database set this to false and configure the externalDatabase parameters
  enabled: true
  ## Disable MariaDB replication
  replication:
    enabled: false

  ## Create a database and a database user
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  db:
    name: bitnami_orangehrm
    user: bn_orangehrm
    ## If the password is not specified, mariadb will generates a random password
    ##
    # password:

  ## MariaDB admin password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#setting-the-root-password-on-first-run
  ##
  # rootUser:
  #   password:

  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  master:
    persistence:
      enabled: true
      ## mariadb data Persistent Volume Storage Class
      ## If defined, storageClassName: <storageClass>
      ## If set to "-", storageClassName: "", which disables dynamic provisioning
      ## If undefined (the default) or set to null, no storageClassName spec is
      ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
      ##   GKE, AWS & OpenStack)
      ##
      # storageClass: "-"
      accessMode: ReadWriteOnce
      size: 8Gi

## Kubernetes configuration
## For minikube, set this to NodePort, elsewhere use LoadBalancer or ClusterIP
##
service:
  type: LoadBalancer
  # HTTP Port
  port: 80
  # HTTPS Port
  httpsPort: 443
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
  apache:
    ## apache data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 1Gi
  orangehrm:
    ## orangehrm data Persistent Volume Storage Class
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

## Pod annotations
## ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
##
podAnnotations: {}

## Configure the ingress resource that allows you to access the
## OrangeHRM installation. Set up the URL
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
    - name: orangehrm.local
      path: /

      ## Set this to true in order to enable TLS on the ingress record
      tls: false

      ## Optionally specify the TLS hosts for the ingress record
      ## Useful when the Ingress controller supports www-redirection
      ## If not specified, the above host name will be used
      # tlsHosts:
      # - www.orangehrm.local
      # - orangehrm.local

      ## If TLS is set to true, you must declare what secret will store the key/certificate for TLS
      tlsSecret: orangehrm.local-tls

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
  # - name: orangehrm.local-tls
  #   key:
  #   certificate:

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
    #   - myRegistryKeySecretName
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

# OrangeHRM

[OrangeHRM](https://www.orangehrm.com) is a free HR management system that offers a wealth of modules to suit the needs of your business. This widely-used system is feature-rich, intuitive and provides an essential HR management platform along with free documentation and access to a broad community of users.

## TL;DR;

```console
$ helm install stable/orangehrm
```

## Introduction

This chart bootstraps an [OrangeHRM](https://github.com/bitnami/bitnami-docker-orangehrm) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the OrangeHRM application.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters. This chart has been tested to work with NGINX Ingress, cert-manager, fluentd and Prometheus on top of the [BKPR](https://kubeprod.io/).

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/orangehrm
```

The command deploys OrangeHRM on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the OrangeHRM chart and their default values.

| Parameter                            | Description                                                                          | Default                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `global.imageRegistry`               | Global Docker image registry                                                         | `nil`                                                        |
| `global.imagePullSecrets`            | Global Docker registry secret names as an array                                      | `[]` (does not add image pull secrets to deployed pods)      |
| `image.registry`                     | OrangeHRM image registry                                                             | `docker.io`                                                  |
| `image.repository`                   | OrangeHRM Image name                                                                 | `bitnami/orangehrm`                                          |
| `image.tag`                          | OrangeHRM Image tag                                                                  | `{VERSION}`                                                  |
| `image.pullPolicy`                   | Image pull policy                                                                    | `Always` if `imageTag` is `latest`, else `IfNotPresent`      |
| `image.pullSecrets`                  | Specify docker-registry secret names as an array                                     | `[]` (does not add image pull secrets to deployed pods)      |
| `orangehrmUsername`                  | User of the application                                                              | `user`                                                       |
| `orangehrmPassword`                  | Application password                                                                 | _random 10 character long alphanumeric string_               |
| `smtpHost`                           | SMTP host                                                                            | `nil`                                                        |
| `smtpPort`                           | SMTP port                                                                            | `nil`                                                        |
| `smtpUser`                           | SMTP user                                                                            | `nil`                                                        |
| `smtpPassword`                       | SMTP password                                                                        | `nil`                                                        |
| `smtpProtocol`                       | SMTP protocol [`ssl`, `none`]                                                        | `nil`                                                        |
| `service.type`                       | Kubernetes Service type                                                              | `LoadBalancer`                                               |
| `service.port`                       | Service HTTP port                                                                    | `80`                                                         |
| `service.httpsPort`                  | Service HTTPS port                                                                   | `443`                                                        |
| `service.externalTrafficPolicy`      | Enable client source IP preservation                                                 | `Cluster`                                                    |
| `service.nodePorts.http`             | Kubernetes http node port                                                            | `""`                                                         |
| `service.nodePorts.https`            | Kubernetes https node port                                                           | `""`                                                         |
| `ingress.enabled`                    | Enable ingress controller resource                                                   | `false`                                                      |
| `ingress.annotations`                | Ingress annotations                                                                  | `[]`                                                         |
| `ingress.certManager`                | Add annotations for cert-manager                                                     | `false`                                                      |
| `ingress.hosts[0].name`              | Hostname to your OrangeHRM installation                                              | `orangehrm.local`                                            |
| `ingress.hosts[0].path`              | Path within the url structure                                                        | `/`                                                          |
| `ingress.hosts[0].tls`               | Utilize TLS backend in ingress                                                       | `false`                                                      |
| `ingress.hosts[0].tlsHosts`          | Array of TLS hosts for ingress record (defaults to `ingress.hosts[0].name` if `nil`) | `nil`                                                        |
| `ingress.hosts[0].tlsSecret`         | TLS Secret (certificates)                                                            | `orangehrm.local-tls-secret`                                 |
| `ingress.secrets[0].name`            | TLS Secret Name                                                                      | `nil`                                                        |
| `ingress.secrets[0].certificate`     | TLS Secret Certificate                                                               | `nil`                                                        |
| `ingress.secrets[0].key`             | TLS Secret Key                                                                       | `nil`                                                        |
| `resources`                          | CPU/Memory resource requests/limits                                                  | Memory: `512Mi`, CPU: `300m`                                 |
| `persistence.enabled`                | Enable persistence using PVC                                                         | `true`                                                       |
| `persistence.apache.storageClass`    | PVC Storage Class for Apache volume                                                  | `nil` (uses alpha storage class annotation)                  |
| `persistence.apache.accessMode`      | PVC Access Mode for Apache volume                                                    | `ReadWriteOnce`                                              |
| `persistence.apache.size`            | PVC Storage Request for Apache volume                                                | `1Gi`                                                        |
| `persistence.orangehrm.storageClass` | PVC Storage Class for OrangeHRM volume                                               | `nil` (uses alpha storage class annotation)                  |
| `persistence.orangehrm.accessMode`   | PVC Access Mode for OrangeHRM volume                                                 | `ReadWriteOnce`                                              |
| `persistence.orangehrm.size`         | PVC Storage Request for OrangeHRM volume                                             | `8Gi`                                                        |
| `allowEmptyPassword`                 | Allow DB blank passwords                                                             | `yes`                                                        |
| `externalDatabase.host`              | Host of the external database                                                        | `nil`                                                        |
| `externalDatabase.port`              | Port of the external database                                                        | `3306`                                                       |
| `externalDatabase.user`              | Existing username in the external db                                                 | `bn_orangehrm`                                               |
| `externalDatabase.password`          | Password for the above username                                                      | `nil`                                                        |
| `externalDatabase.database`          | Name of the existing database                                                        | `bitnami_orangehrm`                                          |
| `mariadb.enabled`                    | Whether to use the MariaDB chart                                                     | `true`                                                       |
| `mariadb.db.name`                    | Database name to create                                                              | `bitnami_orangehrm`                                          |
| `mariadb.db.user`                    | Database user to create                                                              | `bn_orangehrm`                                               |
| `mariadb.db.password`                | Password for the database                                                            | `nil`                                                        |
| `mariadb.rootUser.password`          | MariaDB admin password                                                               | `nil`                                                        |
| `mariadb.persistence.enabled`        | Enable MariaDB persistence using PVC                                                 | `true`                                                       |
| `mariadb.persistence.storageClass`   | PVC Storage Class for MariaDB volume                                                 | `nil` (uses alpha storage class annotation)                  |
| `mariadb.persistence.accessMode`     | PVC Access Mode for MariaDB volume                                                   | `ReadWriteOnce`                                              |
| `mariadb.persistence.size`           | PVC Storage Request for MariaDB volume                                               | `8Gi`                                                        |
| `podAnnotations`                     | Pod annotations                                                                      | `{}`                                                         |
| `metrics.enabled`                    | Start a side-car prometheus exporter                                                 | `false`                                                      |
| `metrics.image.registry`             | Apache exporter image registry                                                       | `docker.io`                                                  |
| `metrics.image.repository`           | Apache exporter image name                                                           | `lusotycoon/apache-exporter`                                 |
| `metrics.image.tag`                  | Apache exporter image tag                                                            | `v0.5.0`                                                     |
| `metrics.image.pullPolicy`           | Image pull policy                                                                    | `IfNotPresent`                                               |
| `metrics.image.pullSecrets`          | Specify docker-registry secret names as an array                                     | `[]` (does not add image pull secrets to deployed pods)      |
| `metrics.podAnnotations`             | Additional annotations for Metrics exporter pod                                      | `{prometheus.io/scrape: "true", prometheus.io/port: "9117"}` |
| `metrics.resources`                  | Exporter resource requests/limit                                                     | {}                                                           |

The above parameters map to the env variables defined in [bitnami/orangehrm](http://github.com/bitnami/bitnami-docker-orangehrm). For more information please refer to the [bitnami/orangehrm](http://github.com/bitnami/bitnami-docker-orangehrm) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set orangehrmUsername=admin,orangehrmPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/orangehrm
```

The above command sets the OrangeHRM administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/orangehrm
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami OrangeHRM](https://github.com/bitnami/bitnami-docker-orangehrm) image stores the OrangeHRM data and configurations at the `/bitnami/orangehrm` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. There is a [known issue](https://github.com/kubernetes/kubernetes/issues/39178) in Kubernetes Clusters with EBS in different availability zones. Ensure your cluster is configured properly to create Volumes in the same availability zone where the nodes are running. Kuberentes 1.12 solved this issue with the [Volume Binding Mode](https://kubernetes.io/docs/concepts/storage/storage-classes/#volume-binding-mode).

See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Upgrading

### To 3.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 3.0.0. The following example assumes that the release name is orangehrm:

```console
$ kubectl patch deployment orangehrm-orangehrm --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
$ kubectl delete statefulset orangehrm-mariadb --cascade=false
```
