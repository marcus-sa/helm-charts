# `@helm-charts/stable-phpbb`

Community forum that supports the notion of users and groups, file attachments, full-text search, notifications and more.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | phpbb  |
| Chart Version       | 3.1.0  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Global Docker image registry
## Please, note that this will override the image registry for all the images, including dependencies, configured to use the global value
##
# global:
#   imageRegistry:

## Bitnami phpBB image version
## ref: https://hub.docker.com/r/bitnami/phpbb/tags/
##
image:
  registry: docker.io
  repository: bitnami/phpbb
  tag: 3.2.3-debian-9
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
## ref: https://github.com/bitnami/bitnami-docker-phpbb#environment-variables
##
phpbbUser: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-phpbb#environment-variables
##
# phpbbPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-phpbb#environment-variables
##
phpbbEmail: user@example.com

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
allowEmptyPassword: 'yes'

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-phpbb#smtp-configuration
##
# smtpHost:
# smtpPort:
# smtpUser:
# smtpPassword:

##
## External database configuration
##
externalDatabase:
  ## Database host
  host:

  ## Database host
  port: 3306

  ## Database user
  user: bn_phpbb

  ## Database password
  password:

  ## Database name
  database: bitnami_phpbb

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
    name: bitnami_phpbb
    user: bn_phpbb
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
serviceType: LoadBalancer

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
  phpbb:
    ## phpbb data Persistent Volume Storage Class
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

# phpBB

[phpBB](https://www.phpbb.com/) is an Internet forum package written in the PHP scripting language. The name "phpBB" is an abbreviation of PHP Bulletin Board.

## TL;DR;

```console
$ helm install stable/phpbb
```

## Introduction

This chart bootstraps a [phpBB](https://github.com/bitnami/bitnami-docker-phpbb) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the phpBB application.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/phpbb
```

The command deploys phpBB on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the phpBB chart and their default values.

| Parameter                         | Description                           | Default                                                 |
| --------------------------------- | ------------------------------------- | ------------------------------------------------------- |
| `global.imageRegistry`            | Global Docker image registry          | `nil`                                                   |
| `image.registry`                  | phpBB image registry                  | `docker.io`                                             |
| `image.repository`                | phpBB image name                      | `bitnami/phpbb`                                         |
| `image.tag`                       | phpBB image tag                       | `{VERSION}`                                             |
| `image.pullPolicy`                | Image pull policy                     | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`               | Specify image pull secrets            | `nil`                                                   |
| `phpbbUser`                       | User of the application               | `user`                                                  |
| `phpbbPassword`                   | Application password                  | _random 10 character long alphanumeric string_          |
| `phpbbEmail`                      | Admin email                           | `user@example.com`                                      |
| `allowEmptyPassword`              | Allow DB blank passwords              | `yes`                                                   |
| `smtpHost`                        | SMTP host                             | `nil`                                                   |
| `smtpPort`                        | SMTP port                             | `nil`                                                   |
| `smtpUser`                        | SMTP user                             | `nil`                                                   |
| `smtpPassword`                    | SMTP password                         | `nil`                                                   |
| `externalDatabase.host`           | Host of the external database         | `nil`                                                   |
| `externalDatabase.user`           | Existing username in the external db  | `bn_phpbb`                                              |
| `externalDatabase.password`       | Password for the above username       | `nil`                                                   |
| `externalDatabase.database`       | Name of the existing database         | `bitnami_phpbb`                                         |
| `mariadb.enabled`                 | Use or not the MariaDB chart          | `true`                                                  |
| `mariadb.rootUser.password`       | MariaDB admin password                | `nil`                                                   |
| `mariadb.db.name`                 | Database name to create               | `bitnami_phpbb`                                         |
| `mariadb.db.user`                 | Database user to create               | `bn_phpbb`                                              |
| `mariadb.db.password`             | Password for the database             | _random 10 character long alphanumeric string_          |
| `serviceType`                     | Kubernetes Service type               | `LoadBalancer`                                          |
| `persistence.enabled`             | Enable persistence using PVC          | `true`                                                  |
| `persistence.apache.storageClass` | PVC Storage Class for Apache volume   | `nil` (uses alpha storage class annotation)             |
| `persistence.apache.accessMode`   | PVC Access Mode for Apache volume     | `ReadWriteOnce`                                         |
| `persistence.apache.size`         | PVC Storage Request for Apache volume | `1Gi`                                                   |
| `persistence.phpbb.storageClass`  | PVC Storage Class for phpBB volume    | `nil` (uses alpha storage class annotation)             |
| `persistence.phpbb.accessMode`    | PVC Access Mode for phpBB volume      | `ReadWriteOnce`                                         |
| `persistence.phpbb.size`          | PVC Storage Request for phpBB volume  | `8Gi`                                                   |
| `resources`                       | CPU/Memory resource requests/limits   | Memory: `512Mi`, CPU: `300m`                            |

The above parameters map to the env variables defined in [bitnami/phpbb](http://github.com/bitnami/bitnami-docker-phpbb). For more information please refer to the [bitnami/phpbb](http://github.com/bitnami/bitnami-docker-phpbb) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set phpbbUser=admin,phpbbPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/phpbb
```

The above command sets the phpBB administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/phpbb
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami phpBB](https://github.com/bitnami/bitnami-docker-phpbb) image stores the phpBB data and configurations at the `/bitnami/phpbb` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Upgrading

### To 3.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 3.0.0. The following example assumes that the release name is phpbb:

```console
$ kubectl patch deployment phpbb-phpbb --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
$ kubectl delete statefulset phpbb-mariadb --cascade=false
```
