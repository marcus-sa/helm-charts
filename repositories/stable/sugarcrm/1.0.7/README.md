# `@helm-charts/stable-sugarcrm`

DEPRECATED SugarCRM enables businesses to create extraordinary customer relationships with the most innovative and affordable CRM solution in the market.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | sugarcrm |
| Chart Version       | 1.0.7    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami SugarCRM image version
## ref: https://hub.docker.com/r/bitnami/sugarcrm/tags/
##
image:
  registry: docker.io
  repository: bitnami/sugarcrm
  tag: 6.5.26
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

## SugarCRM host to create application URLs
## ref: https://github.com/bitnami/bitnami-docker-sugarcrm#configuration
##
# sugarcrmHost:

## loadBalancerIP for the SugarCRM Service (optional, cloud specific)
## ref: http://kubernetes.io/docs/user-guide/services/#type-loadbalancer
##
# sugarcrmLoadBalancerIP:

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-sugarcrm#configuration
##
sugarcrmUsername: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-sugarcrm#configuration
##
# sugarcrmPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-sugarcrm#configuration
##
sugarcrmEmail: user@example.com

## Last Name
## ref: https://github.com/bitnami/bitnami-docker-sugarcrm#configuration
##
sugarcrmLastName: LastName

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-sugarcrm#environment-variables
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
  user: bn_sugarcrm

  ## Database password
  password:

  ## Database name
  database: bitnami_sugarcrm

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-orangehrm/#smtp-configuration
# sugarcrmSmtpHost:
# sugarcrmSmtpPort:
# sugarcrmSmtpUser:
# sugarcrmSmtpPassword:
# sugarcrmSmtpProtocol:

##
## MariaDB chart configuration
##
mariadb:
  ## Whether to deploy a mariadb server to satisfy the applications database requirements. To use an external database set this to false and configure the externalDatabase parameters
  enabled: true

  ## Create a database
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-on-first-run
  ##
  mariadbDatabase: bitnami_sugarcrm

  ## Create a database user
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  mariadbUser: bn_sugarcrm

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
  sugarcrm:
    ## sugarcrm data Persistent Volume Storage Class
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
  {}
  # requests:
  #   memory: 512Mi
  #   cpu: 300m
```

</details>

---

# SugarCRM

This Chart is now Deprecated. Please use SuiteCRM instead.

[SugarCRM](https://www.sugarcrm.com) offers the most innovative, flexible and affordable CRM in the market and delivers the best all-around value of any CRM.

## TL;DR;

```console
$ helm install stable/sugarcrm
```

## Introduction

This chart bootstraps a [SugarCRM](https://github.com/bitnami/bitnami-docker-sugarcrm) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the SugarCRM application.

## Prerequisites

- Kubernetes 1.5+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/sugarcrm
```

The command deploys SugarCRM on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the SugarCRM chart and their default values.

| Parameter                           | Description                             | Default                                                 |
| ----------------------------------- | --------------------------------------- | ------------------------------------------------------- |
| `image.registry`                    | SugarCRM image registry                 | `docker.io`                                             |
| `image.repository`                  | SugarCRM image name                     | `bitnami/sugarcrm`                                      |
| `image.tag`                         | SugarCRM image tag                      | `{VERSION}`                                             |
| `image.pullPolicy`                  | Image pull policy                       | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`                 | Specify image pull secrets              | `nil`                                                   |
| `sugarcrmUsername`                  | User of the application                 | `user`                                                  |
| `sugarcrmPassword`                  | Application password                    | _random 10 character alphanumeric string_               |
| `sugarcrmEmail`                     | Admin email                             | `user@example.com`                                      |
| `sugarcrmLastname`                  | Last name                               | `Name`                                                  |
| `sugarcrmHost`                      | Host domain or IP                       | `nil`                                                   |
| `sugarcrmLoadBalancerIP`            | `loadBalancerIP` of the application     | `nil`                                                   |
| `sugarcrmSmtpHost`                  | SMTP host                               | `nil`                                                   |
| `sugarcrmSmtpPort`                  | SMTP port                               | `nil`                                                   |
| `sugarcrmSmtpProtocol`              | SMTP Protocol                           | `nil`                                                   |
| `sugarcrmSmtpUser`                  | SMTP user                               | `nil`                                                   |
| `sugarcrmSmtpPassword`              | SMTP password                           | `nil`                                                   |
| `allowEmptyPassword`                | Allow DB blank passwords                | `yes`                                                   |
| `externalDatabase.host`             | Host of the external database           | `nil`                                                   |
| `externalDatabase.port`             | Port of the external database           | `3306`                                                  |
| `externalDatabase.user`             | Existing username in the external db    | `bn_sugarcrm`                                           |
| `externalDatabase.password`         | Password for the above username         | `nil`                                                   |
| `externalDatabase.database`         | Name of the existing database           | `bitnami_sugarcrm`                                      |
| `mariadb.enabled`                   | Whether to use the MariaDB chart        | `true`                                                  |
| `mariadb.mariadbDatabase`           | Database name to create                 | `bitnami_sugarcrm`                                      |
| `mariadb.mariadbUser`               | Database user to create                 | `bn_sugarcrm`                                           |
| `mariadb.mariadbPassword`           | Password for the database               | `nil`                                                   |
| `mariadb.mariadbRootPassword`       | MariaDB admin password                  | `nil`                                                   |
| `serviceType`                       | Kubernetes Service type                 | `LoadBalancer`                                          |
| `persistence.enabled`               | Enable persistence using PVC            | `true`                                                  |
| `persistence.apache.storageClass`   | PVC Storage Class for apache volume     | `nil` (uses alpha storage class annotation)             |
| `persistence.apache.accessMode`     | PVC Access Mode for apache volume       | `ReadWriteOnce`                                         |
| `persistence.apache.size`           | PVC Storage Request for apache volume   | `1Gi`                                                   |
| `persistence.sugarcrm.storageClass` | PVC Storage Class for SugarCRM volume   | `nil` (uses alpha storage class annotation)             |
| `persistence.sugarcrm.accessMode`   | PVC Access Mode for SugarCRM volume     | `ReadWriteOnce`                                         |
| `persistence.sugarcrm.size`         | PVC Storage Request for SugarCRM volume | `8Gi`                                                   |
| `resources`                         | CPU/Memory resource requests/limits     | Memory: `512Mi`, CPU: `300m`                            |

The above parameters map to the env variables defined in [bitnami/sugarcrm](http://github.com/bitnami/bitnami-docker-sugarcrm). For more information please refer to the [bitnami/sugarcrm](http://github.com/bitnami/bitnami-docker-sugarcrm) image documentation.

> **Note**:
>
> For SugarCRM to function correctly, you should specify the `sugarcrmHost` parameter to specify the FQDN (recommended) or the public IP address of the SugarCRM service.
>
> Optionally, you can specify the `sugarcrmLoadBalancerIP` parameter to assign a reserved IP address to the SugarCRM service of the chart. However please note that this feature is only available on a few cloud providers (f.e. GKE).
>
> To reserve a public IP address on GKE:
>
> ```bash
> $ gcloud compute addresses create sugarcrm-public-ip
> ```
>
> The reserved IP address can be associated to the SugarCRM service by specifying it as the value of the `sugarcrmLoadBalancerIP` parameter while installing the chart.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set sugarcrmUsername=admin,sugarcrmPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/sugarcrm
```

The above command sets the SugarCRM administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/sugarcrm
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami SugarCRM](https://github.com/bitnami/bitnami-docker-sugarcrm) image stores the SugarCRM data and configurations at the `/bitnami/sugarcrm` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
