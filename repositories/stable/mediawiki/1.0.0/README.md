# `@helm-charts/stable-mediawiki`

Extremely powerful, scalable software and a feature-rich wiki implementation that uses PHP to process and display data stored in a database.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | mediawiki |
| Chart Version       | 1.0.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami DokuWiki image version
## ref: https://hub.docker.com/r/bitnami/mediawiki/tags/
##
image:
  registry: docker.io
  repository: bitnami/mediawiki
  tag: 1.30.0
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
## ref: https://github.com/bitnami/bitnami-docker-mediawiki#environment-variables
##
mediawikiUser: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-mediawiki#environment-variables
##
# mediawikiPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-mediawiki#environment-variables
##
mediawikiEmail: user@example.com

## Name for the wiki
## ref: https://github.com/bitnami/bitnami-docker-mediawiki#environment-variables
##
mediawikiName: My Wiki

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-mediawiki#environment-variables
allowEmptyPassword: 'yes'

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-mediawiki#smtp-configuration
##
# smtpHost:
# smtpPort:
# smtpHostID:
# smtpUser:
# smtpPassword:

##
## External database configuration
##
externalDatabase:
  ## Database host
  host:

  ## Database port
  port: 3306

  ## Database user
  user: bn_mediawiki

  ## Database password
  password:

  ## Database name
  database: bitnami_mediawiki

##
## MariaDB chart configuration
##
mariadb:
  ## Whether to deploy a mariadb server to satisfy the applications database requirements. To use an external database set this to false and configure the externalDatabase parameters
  enabled: true

  ## MariaDB admin password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#setting-the-root-password-on-first-run
  ##
  # mariadbRootPassword:

  ## Create a database
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-on-first-run
  ##
  mariadbDatabase: bitnami_mediawiki

  ## Create a database user
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  mariadbUser: bn_mediawiki

  ## Password for mariadbUser
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  # mariadbPassword:

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
  mediawiki:
    ## mediawiki data Persistent Volume Storage Class
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

# MediaWiki

[MediaWiki](https://www.mediawiki.org) is an extremely powerful, scalable software and a feature-rich wiki implementation that uses PHP to process and display data stored in a database, such as MySQL.

## TL;DR;

```console
$ helm install stable/mediawiki
```

## Introduction

This chart bootstraps a [MediaWiki](https://github.com/bitnami/bitnami-docker-mediawiki) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the MediaWiki application.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/mediawiki
```

The command deploys MediaWiki on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the MediaWiki chart and their default values.

| Parameter                            | Description                              | Default                                                 |
| ------------------------------------ | ---------------------------------------- | ------------------------------------------------------- |
| `image.registry`                     | MediaWiki image registry                 | `docker.io`                                             |
| `image.repository`                   | MwdiaWiki Image name                     | `bitnami/mediawiki`                                     |
| `image.tag`                          | MediaWiki Image tag                      | `{VERSION}`                                             |
| `image.pullPolicy`                   | Image pull policy                        | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`                  | Specify image pull secrets               | `nil`                                                   |
| `mediawikiUser`                      | User of the application                  | `user`                                                  |
| `mediawikiPassword`                  | Application password                     | _random 10 character long alphanumeric string_          |
| `mediawikiEmail`                     | Admin email                              | `user@example.com`                                      |
| `mediawikiName`                      | Name for the wiki                        | `My Wiki`                                               |
| `allowEmptyPassword`                 | Allow DB blank passwords                 | `yes`                                                   |
| `smtpHost`                           | SMTP host                                | `nil`                                                   |
| `smtpPort`                           | SMTP port                                | `nil`                                                   |
| `smtpHostID`                         | SMTP host ID                             | `nil`                                                   |
| `smtpUser`                           | SMTP user                                | `nil`                                                   |
| `smtpPassword`                       | SMTP password                            | `nil`                                                   |
| `externalDatabase.host`              | Host of the external database            | `nil`                                                   |
| `externalDatabase.user`              | Existing username in the external db     | `bn_mediawiki`                                          |
| `externalDatabase.password`          | Password for the above username          | `nil`                                                   |
| `externalDatabase.database`          | Name of the existing databse             | `bitnami_mediawiki`                                     |
| `mariadb.enabled`                    | Use or not the mariadb chart             | `true`                                                  |
| `mariadb.mariadbRootPassword`        | MariaDB admin password                   | `nil`                                                   |
| `mariadb.mariadbDatabase`            | Database name to create                  | `bitnami_mediawiki`                                     |
| `mariadb.mariadbUser`                | Database user to create                  | `bn_mediawiki`                                          |
| `mariadb.mariadbPassword`            | Password for the database                | _random 10 character long alphanumeric string_          |
| `serviceType`                        | Kubernetes Service type                  | `LoadBalancer`                                          |
| `persistence.enabled`                | Enable persistence using PVC             | `true`                                                  |
| `persistence.apache.storageClass`    | PVC Storage Class for Apache volume      | `nil` (uses alpha storage class annotation)             |
| `persistence.apache.accessMode`      | PVC Access Mode for Apache volume        | `ReadWriteOnce`                                         |
| `persistence.apache.size`            | PVC Storage Request for Apache volume    | `1Gi`                                                   |
| `persistence.mediawiki.storageClass` | PVC Storage Class for MediaWiki volume   | `nil` (uses alpha storage class annotation)             |
| `persistence.mediawiki.accessMode`   | PVC Access Mode for MediaWiki volume     | `ReadWriteOnce`                                         |
| `persistence.mediawiki.size`         | PVC Storage Request for MediaWiki volume | `8Gi`                                                   |
| `resources`                          | CPU/Memory resource requests/limits      | Memory: `512Mi`, CPU: `300m`                            |

The above parameters map to the env variables defined in [bitnami/mediawiki](http://github.com/bitnami/bitnami-docker-mediawiki). For more information please refer to the [bitnami/mediawiki](http://github.com/bitnami/bitnami-docker-mediawiki) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set mediawikiUser=admin,mediawikiPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/mediawiki
```

The above command sets the MediaWiki administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/mediawiki
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami MediaWiki](https://github.com/bitnami/bitnami-docker-mediawiki) image stores the MediaWiki data and configurations at the `/bitnami/mediawiki` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
