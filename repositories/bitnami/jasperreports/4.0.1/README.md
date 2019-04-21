# `@helm-charts/bitnami-jasperreports`

The JasperReports server can be used as a stand-alone or embedded reporting and BI server that offers web-based reporting, analytic tools and visualization, and a dashboard feature for compiling multiple custom views

| Field               | Value         |
| ------------------- | ------------- |
| Repository Name     | bitnami       |
| Chart Name          | jasperreports |
| Chart Version       | 4.0.1         |
| NPM Package Version | 0.1.0         |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Global Docker image registry
## Please, note that this will override the image registry for all the images, including dependencies, configured to use the global value
##
# global:
#   imageRegistry:

## Bitnami JasperReports image version
## ref: https://hub.docker.com/r/bitnami/dokuwiki/tags/
##
image:
  registry: docker.io
  repository: bitnami/jasperreports
  tag: 7.1.0
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
## ref: https://github.com/bitnami/bitnami-docker-jasperreports#configuration
##
jasperreportsUsername: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-jasperreports#configuration
##
# jasperreportsPassword:
#
## Application mail
## ref: https://github.com/bitnami/bitnami-docker-jasperreports#configuration
##
jasperreportsEmail: user@example.com

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-jasperreports#environment-variables
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
  user: bn_jasperreports

  ## Database password
  password:

  ## Database name
  database: bitnami_jasperreports

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-jasperreports#smtp-configuration
##
# smtpHost:
# smtpPort:
# smtpEmail:
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
    name: bitnami_jasperreports
    user: bn_jasperreports
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
## For minikube, set this to NodePort, elsewhere use LoadBalancer
##
service:
  type: LoadBalancer
  # HTTP Port
  port: 80
  ##
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
  ## database data Persistent Volume Storage Class
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
```

</details>

---

# JasperReports

[JasperReports](http://community.jaspersoft.com/project/jasperreports-server) The JasperReports server can be used as a stand-alone or embedded reporting and BI server that offers web-based reporting, analytic tools and visualization, and a dashboard feature for compiling multiple custom views

## TL;DR;

```console
$ helm install stable/jasperreports
```

## Introduction

This chart bootstraps a [JasperReports](https://github.com/bitnami/bitnami-docker-jasperreports) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which bootstraps a MariaDB deployment required by the JasperReports application.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/jasperreports
```

The command deploys JasperReports on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the JasperReports chart and their default values.

| Parameter                       | Description                                  | Default                                                 |
| ------------------------------- | -------------------------------------------- | ------------------------------------------------------- |
| `global.imageRegistry`          | Global Docker image registry                 | `nil`                                                   |
| `image.registry`                | JasperReports image registry                 | `docker.io`                                             |
| `image.repository`              | JasperReports Image name                     | `bitnami/jasperreports`                                 |
| `image.tag`                     | JasperReports Image tag                      | `{VERSION}`                                             |
| `image.pullPolicy`              | Image pull policy                            | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`             | Specify image pull secrets                   | `nil`                                                   |
| `jasperreportsUsername`         | User of the application                      | `user`                                                  |
| `jasperreportsPassword`         | Application password                         | _random 10 character long alphanumeric string_          |
| `jasperreportsEmail`            | User email                                   | `user@example.com`                                      |
| `smtpHost`                      | SMTP host                                    | `nil`                                                   |
| `smtpPort`                      | SMTP port                                    | `nil`                                                   |
| `smtpEmail`                     | SMTP email                                   | `nil`                                                   |
| `smtpUser`                      | SMTP user                                    | `nil`                                                   |
| `smtpPassword`                  | SMTP password                                | `nil`                                                   |
| `smtpProtocol`                  | SMTP protocol [`ssl`, `none`]                | `nil`                                                   |
| `allowEmptyPassword`            | Allow DB blank passwords                     | `yes`                                                   |
| `externalDatabase.host`         | Host of the external database                | `nil`                                                   |
| `externalDatabase.port`         | Port of the external database                | `3306`                                                  |
| `externalDatabase.user`         | Existing username in the external db         | `bn_jasperreports`                                      |
| `externalDatabase.password`     | Password for the above username              | `nil`                                                   |
| `externalDatabase.database`     | Name of the existing database                | `bitnami_jasperreports`                                 |
| `mariadb.enabled`               | Whether to use the MariaDB chart             | `true`                                                  |
| `mariadb.db.name`               | Database name to create                      | `bitnami_jasperreports`                                 |
| `mariadb.db.user`               | Database user to create                      | `bn_jasperreports`                                      |
| `mariadb.db.password`           | Password for the database                    | `nil`                                                   |
| `mariadb.rootUser.password`     | MariaDB admin password                       | `nil`                                                   |
| `service.type`                  | Kubernetes Service type                      | `LoadBalancer`                                          |
| `service.externalTrafficPolicy` | Enable client source IP preservation         | `Cluster`                                               |
| `service.port`                  | Service HTTP port                            | `80`                                                    |
| `service.nodePorts.http`        | Kubernetes http node port                    | `""`                                                    |
| `persistence.enabled`           | Enable persistence using PVC                 | `true`                                                  |
| `persistence.storageClass`      | PVC Storage Class for JasperReports volume   | `nil` (uses alpha storage annotation)                   |
| `persistence.accessMode`        | PVC Access Mode for JasperReports volume     | `ReadWriteOnce`                                         |
| `persistence.size`              | PVC Storage Request for JasperReports volume | `8Gi`                                                   |
| `resources`                     | CPU/Memory resource requests/limits          | Memory: `512Mi`, CPU: `300m`                            |

The above parameters map to the env variables defined in [bitnami/jasperreports](http://github.com/bitnami/bitnami-docker-jasperreports). For more information please refer to the [bitnami/jasperreports](http://github.com/bitnami/bitnami-docker-jasperreports) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set jasperreportsUsername=admin,jasperreportsPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/jasperreports
```

The above command sets the JasperReports administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/jasperreports
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami JasperReports](https://github.com/bitnami/bitnami-docker-jasperreports) image stores the JasperReports data and configurations at the `/bitnami/jasperreports` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Upgrading

### To 3.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 3.0.0. The following example assumes that the release name is jasperreports:

```console
$ kubectl patch deployment jasperreports-jasperreports --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
$ kubectl delete statefulset jasperreports-mariadb --cascade=false
```
