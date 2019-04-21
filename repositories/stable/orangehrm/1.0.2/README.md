# `@helm-charts/stable-orangehrm`

OrangeHRM is a free HR management system that offers a wealth of modules to suit the needs of your business.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | orangehrm |
| Chart Version       | 1.0.2     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami OrangeHRM image version
## ref: https://hub.docker.com/r/bitnami/orangehrm/tags/
##
image:
  registry: docker.io
  repository: bitnami/orangehrm
  tag: 4.0.0
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
mariadb:
  ## Whether to deploy a mariadb server to satisfy the applications database requirements. To use an external database set this to false and configure the externalDatabase parameters
  enabled: true

  ## Create a database
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-on-first-run
  ##
  mariadbDatabase: bitnami_orangehrm

  ## Create a database user
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  mariadbUser: bn_orangehrm

  ## Password for mariadbUser
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  # mariadbPassword:

  ## MariaDB admin password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#setting-the-root-password-on-first-run
  ##
  # mariadbRootPassword:

  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
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

This chart bootstraps a [OrangeHRM](https://github.com/bitnami/bitnami-docker-orangehrm) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the OrangeHRM application.

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

| Parameter                            | Description                              | Default                                                 |
| ------------------------------------ | ---------------------------------------- | ------------------------------------------------------- |
| `image.registry`                     | OrangeHRM image registry                 | `docker.io`                                             |
| `image.repository`                   | OrangeHRM Image name                     | `bitnami/orangehrm`                                     |
| `image.tag`                          | OrangeHRM Image tag                      | `{VERSION}`                                             |
| `image.pullPolicy`                   | Image pull policy                        | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`                  | Specify image pull secrets               | `nil`                                                   |
| `orangehrmUsername`                  | User of the application                  | `user`                                                  |
| `orangehrmPassword`                  | Application password                     | _random 10 character long alphanumeric string_          |
| `smtpHost`                           | SMTP host                                | `nil`                                                   |
| `smtpPort`                           | SMTP port                                | `nil`                                                   |
| `smtpUser`                           | SMTP user                                | `nil`                                                   |
| `smtpPassword`                       | SMTP password                            | `nil`                                                   |
| `smtpProtocol`                       | SMTP protocol [`ssl`, `none`]            | `nil`                                                   |
| `serviceType`                        | Kubernetes Service type                  | `LoadBalancer`                                          |
| `resources`                          | CPU/Memory resource requests/limits      | Memory: `512Mi`, CPU: `300m`                            |
| `persistence.enabled`                | Enable persistence using PVC             | `true`                                                  |
| `persistence.apache.storageClass`    | PVC Storage Class for Apache volume      | `nil` (uses alpha storage class annotation)             |
| `persistence.apache.accessMode`      | PVC Access Mode for Apache volume        | `ReadWriteOnce`                                         |
| `persistence.apache.size`            | PVC Storage Request for Apache volume    | `1Gi`                                                   |
| `persistence.orangehrm.storageClass` | PVC Storage Class for OrangeHRM volume   | `nil` (uses alpha storage class annotation)             |
| `persistence.orangehrm.accessMode`   | PVC Access Mode for OrangeHRM volume     | `ReadWriteOnce`                                         |
| `persistence.orangehrm.size`         | PVC Storage Request for OrangeHRM volume | `8Gi`                                                   |
| `allowEmptyPassword`                 | Allow DB blank passwords                 | `yes`                                                   |
| `externalDatabase.host`              | Host of the external database            | `nil`                                                   |
| `externalDatabase.port`              | Port of the external database            | `3306`                                                  |
| `externalDatabase.user`              | Existing username in the external db     | `bn_orangehrm`                                          |
| `externalDatabase.password`          | Password for the above username          | `nil`                                                   |
| `externalDatabase.database`          | Name of the existing database            | `bitnami_orangehrm`                                     |
| `mariadb.enabled`                    | Whether to use or not the mariadb chart  | `true`                                                  |
| `mariadb.mariadbDatabase`            | Database name to create                  | `bitnami_orangehrm`                                     |
| `mariadb.mariadbUser`                | Database user to create                  | `bn_orangehrm`                                          |
| `mariadb.mariadbPassword`            | Password for the database                | `nil`                                                   |
| `mariadb.mariadbRootPassword`        | MariaDB admin password                   | `nil`                                                   |
| `mariadb.persistence.enabled`        | Enable MariaDB persistence using PVC     | `true`                                                  |
| `mariadb.persistence.storageClass`   | PVC Storage Class for MariaDB volume     | `nil` (uses alpha storage class annotation)             |
| `mariadb.persistence.accessMode`     | PVC Access Mode for MariaDB volume       | `ReadWriteOnce`                                         |
| `mariadb.persistence.size`           | PVC Storage Request for MariaDB volume   | `8Gi`                                                   |

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

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
