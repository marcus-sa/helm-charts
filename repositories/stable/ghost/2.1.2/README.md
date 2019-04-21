# `@helm-charts/stable-ghost`

A simple, powerful publishing platform that allows you to share your stories with the world

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | ghost  |
| Chart Version       | 2.1.2  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami Ghost image version
## ref: https://hub.docker.com/r/bitnami/ghost/tags/
##
image: bitnami/ghost:1.18.4-r0

## Busybox image used to configure volume permissions
##
volumePermissions:
  image:
    name: busybox
    tag: 1.27.1
#    pullPolicy:

## Specify a imagePullPolicy
## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
# imagePullPolicy:

## Ghost host to create application URLs
## ref: https://github.com/bitnami/bitnami-docker-ghost#configuration
##
# ghostHost:

## Ghost port to create application URLs along with host.
## ref: https://github.com/bitnami/bitnami-docker-ghost#configuration
##
ghostPort: 80

## loadBalancerIP for the Ghost Service (optional, cloud specific)
## ref: http://kubernetes.io/docs/user-guide/services/#type-loadbalancer
##
# ghostLoadBalancerIP:

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-ghost#configuration
##
ghostUsername: user@example.com

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-ghost#configuration
##
# ghostPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-ghost#configuration
##
ghostEmail: user@example.com

## Ghost Blog name
## ref: https://github.com/bitnami/bitnami-docker-ghost#environment-variables
##
ghostBlogTitle: User's Blog

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
allowEmptyPassword: yes

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-redmine/#smtp-configuration
##
# smtpHost:
# smtpPort:
# smtpUser:
# smtpPassword:
# smtpService:

##
## External database configuration
##
externalDatabase:
  ## Database host
  # host:
  ## Database user
  # user: bn_ghost
  ## Database password
  # password:
  ## Database name
  # database: bitnami_ghost

##
## MariaDB chart configuration
##
mariadb:
  ## Whether to use the database specified as a requirement or not. For example, to configure the chart with an existing database server.
  enabled: true

  ## MariaDB admin password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#setting-the-root-password-on-first-run
  ##
  # mariadbRootPassword:
  ## Create a database

  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-on-first-run
  ##
  mariadbDatabase: bitnami_ghost

  ## Create a database user
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  mariadbUser: bn_ghost

  ## Password for mariadbUser
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  # mariadbPassword:

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

# Ghost

[Ghost](https://ghost.org/) is one of the most versatile open source content management systems on the market.

## TL;DR;

```console
$ helm install stable/ghost
```

## Introduction

This chart bootstraps a [Ghost](https://github.com/bitnami/bitnami-docker-ghost) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the Ghost application.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/ghost
```

The command deploys Ghost on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Ghost chart and their default values.

| Parameter                     | Description                                                   | Default                                                  |
| ----------------------------- | ------------------------------------------------------------- | -------------------------------------------------------- |
| `image`                       | Ghost image                                                   | `bitnami/ghost:{VERSION}`                                |
| `imagePullPolicy`             | Image pull policy                                             | `Always` if `image` tag is `latest`, else `IfNotPresent` |
| `ghostHost`                   | Ghost host to create application URLs                         | `nil`                                                    |
| `ghostPort`                   | Ghost port to create application URLs along with host         | `80`                                                     |
| `ghostLoadBalancerIP`         | `loadBalancerIP` for the Ghost Service                        | `nil`                                                    |
| `ghostUsername`               | User of the application                                       | `user@example.com`                                       |
| `ghostPassword`               | Application password                                          | Randomly generated                                       |
| `ghostEmail`                  | Admin email                                                   | `user@example.com`                                       |
| `ghostBlogTitle`              | Ghost Blog name                                               | `User's Blog`                                            |
| `allowEmptyPassword`          | Allow DB blank passwords                                      | `yes`                                                    |
| `externalDatabase.host`       | Host of the external database                                 | `nil`                                                    |
| `externalDatabase.user`       | Existing username in the external db                          | `bn_ghost`                                               |
| `externalDatabase.password`   | Password for the above username                               | `nil`                                                    |
| `externalDatabase.database`   | Name of the existing database                                 | `bitnami_ghost`                                          |
| `mariadb.enabled`             | Whether or not to install MariaDB (disable if using external) | `true`                                                   |
| `mariadb.mariadbRootPassword` | MariaDB admin password                                        | `nil`                                                    |
| `mariadb.mariadbDatabase`     | MariaDB Database name to create                               | `bitnami_ghost`                                          |
| `mariadb.mariadbUser`         | MariaDB Database user to create                               | `bn_ghost`                                               |
| `mariadb.mariadbPassword`     | MariaDB Password for user                                     | _random 10 character long alphanumeric string_           |
| `serviceType`                 | Kubernetes Service type                                       | `LoadBalancer`                                           |
| `persistence.enabled`         | Enable persistence using PVC                                  | `true`                                                   |
| `persistence.storageClass`    | PVC Storage Class for Ghost volume                            | `nil` (uses alpha storage annotation)                    |
| `persistence.accessMode`      | PVC Access Mode for Ghost volume                              | `ReadWriteOnce`                                          |
| `persistence.size`            | PVC Storage Request for Ghost volume                          | `8Gi`                                                    |
| `resources`                   | CPU/Memory resource requests/limits                           | Memory: `512Mi`, CPU: `300m`                             |

The above parameters map to the env variables defined in [bitnami/ghost](http://github.com/bitnami/bitnami-docker-ghost). For more information please refer to the [bitnami/ghost](http://github.com/bitnami/bitnami-docker-ghost) image documentation.

> **Note**:
>
> For the Ghost application function correctly, you should specify the `ghostHost` parameter to specify the FQDN (recommended) or the public IP address of the Ghost service.
>
> Optionally, you can specify the `ghostLoadBalancerIP` parameter to assign a reserved IP address to the Ghost service of the chart. However please note that this feature is only available on a few cloud providers (f.e. GKE).
>
> To reserve a public IP address on GKE:
>
> ```bash
> $ gcloud compute addresses create ghost-public-ip
> ```
>
> The reserved IP address can be associated to the Ghost service by specifying it as the value of the `ghostLoadBalancerIP` parameter while installing the chart.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set ghostUsername=admin,ghostPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/ghost
```

The above command sets the Ghost administrator account username and password to `admin` and `password` respectively. Additionally it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/ghost
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Using an existing database

Sometimes you may want to have Ghost connect to an external database rather than installing one inside your cluster, e.g. to use a managed database service, or use run a single database server for all your applications. To do this, the chart allows you to specify credentials for an external database under the [`externalDatabase` parameter](#configuration). You should also disable the MariaDB installation with the `mariadb.enabled` option. For example:

```console
$ helm install stable/ghost \
    --set mariadb.enabled=false,externalDatabase.host=myexternalhost,externalDatabase.user=myuser,externalDatabase.password=mypassword,externalDatabase.database=mydatabase
```

## Persistence

The [Bitnami Ghost](https://github.com/bitnami/bitnami-docker-ghost) image stores the Ghost data and configurations at the `/bitnami/ghost` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
