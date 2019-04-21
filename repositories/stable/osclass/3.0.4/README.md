# `@helm-charts/stable-osclass`

Osclass is a php script that allows you to quickly create and manage your own free classifieds site.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | osclass |
| Chart Version       | 3.0.4   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami Osclass image version
## ref: https://hub.docker.com/r/bitnami/osclass/tags/
##
image:
  registry: docker.io
  repository: bitnami/osclass
  tag: 3.7.4-debian-9
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

## Osclass host to create application URLs
## ref: https://github.com/bitnami/bitnami-docker-osclass#configuration
##
# osclassHost:

## loadBalancerIP for the Osclass Service (optional, cloud specific)
## ref: http://kubernetes.io/docs/user-guide/services/#type-loadbalancer
##
# osclassLoadBalancerIP:

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-osclass#configuration
##
osclassUsername: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-osclass#configuration
##
# osclassPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-osclass#configuration
##
osclassEmail: user@example.com

## Application title
## ref: https://github.com/bitnami/bitnami-docker-osclass#configuration
osclassWebTitle: 'Sample Web Page'

## Allow site to appear in search engines
## ref: https://github.com/bitnami/bitnami-docker-osclass#configuration
osclassPingEngines: 1

## Automatically send usage statistics and crash reports to Osclass
## ref: https://github.com/bitnami/bitnami-docker-osclass#configuration
##
osclassSaveStats: 1

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-osclass#environment-variables
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
  user: bn_osclass

  ## Database password
  password:

  ## Database name
  database: bitnami_osclass

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-osclass/#smtp-configuration
##
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
  ## Disable MariaDB replication
  replication:
    enabled: false

  ## Create a database and a database user
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  db:
    name: bitnami_osclass
    user: bn_osclass
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
  osclass:
    ## osclass data Persistent Volume Storage Class
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

# Osclass

[Osclass](https://osclass.org/) is a PHP script that allows you to quickly create and manage your own free classifieds site. Using this script, you can provide free advertising for items for sale, real estate, jobs, cars... Hundreds of free classified advertising sites are using Osclass.

## TL;DR;

```console
$ helm install stable/osclass
```

## Introduction

This chart bootstraps an [Osclass](https://github.com/bitnami/bitnami-docker-osclass) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the Osclass application.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/osclass
```

The command deploys Osclass on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Osclass chart and their default values.

| Parameter                          | Description                              | Default                                                 |
| ---------------------------------- | ---------------------------------------- | ------------------------------------------------------- |
| `image.registry`                   | Osclass image registry                   | `docker.io`                                             |
| `image.repository`                 | Osclass Image name                       | `bitnami/osclass`                                       |
| `image.tag`                        | Osclass Image tag                        | `{VERSION}`                                             |
| `image.pullPolicy`                 | Image pull policy                        | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`                | Specify image pull secrets               | `nil`                                                   |
| `osclassHost`                      | Osclass host to create application URLs  | `nil`                                                   |
| `osclassLoadBalancerIP`            | `loadBalancerIP` for the Osclass Service | `nil`                                                   |
| `osclassUsername`                  | User of the application                  | `user`                                                  |
| `osclassPassword`                  | Application password                     | `bitnami`                                               |
| `osclassEmail`                     | Admin email                              | `user@example.com`                                      |
| `osclassWebTitle`                  | Application tittle                       | `Sample Web Page`                                       |
| `osclassPingEngines`               | Allow site to appear in search engines   | `1`                                                     |
| `osclassSaveStats`                 | Send statistics and reports to Osclass   | `1`                                                     |
| `smtpHost`                         | SMTP host                                | `nil`                                                   |
| `smtpPort`                         | SMTP port                                | `nil`                                                   |
| `smtpUser`                         | SMTP user                                | `nil`                                                   |
| `smtpPassword`                     | SMTP password                            | `nil`                                                   |
| `smtpProtocol`                     | SMTP protocol [`ssl`, `tls`]             | `nil`                                                   |
| `serviceType`                      | Kubernetes Service type                  | `LoadBalancer`                                          |
| `resources`                        | CPU/Memory resource requests/limits      | Memory: `512Mi`, CPU: `300m`                            |
| `persistence.enabled`              | Enable persistence using PVC             | `true`                                                  |
| `persistence.apache.storageClass`  | PVC Storage Class for Apache volume      | `nil` (uses alpha storage class annotation)             |
| `persistence.apache.accessMode`    | PVC Access Mode for Apache volume        | `ReadWriteOnce`                                         |
| `persistence.apache.size`          | PVC Storage Request for Apache volume    | `1Gi`                                                   |
| `persistence.moodle.storageClass`  | PVC Storage Class for OSClass volume     | `nil` (uses alpha storage class annotation)             |
| `persistence.moodle.accessMode`    | PVC Access Mode for OSClass volume       | `ReadWriteOnce`                                         |
| `persistence.moodle.size`          | PVC Storage Request for OSClass volume   | `8Gi`                                                   |
| `allowEmptyPassword`               | Allow DB blank passwords                 | `yes`                                                   |
| `externalDatabase.host`            | Host of the external database            | `nil`                                                   |
| `externalDatabase.port`            | Port of the external database            | `3306`                                                  |
| `externalDatabase.user`            | Existing username in the external db     | `bn_osclass`                                            |
| `externalDatabase.password`        | Password for the above username          | `nil`                                                   |
| `externalDatabase.database`        | Name of the existing database            | `bitnami_osclass`                                       |
| `mariadb.enabled`                  | Whether to use the MariaDB chart         | `true`                                                  |
| `mariadb.db.name`                  | Database name to create                  | `bitnami_osclass`                                       |
| `mariadb.db.user`                  | Database user to create                  | `bn_osclass`                                            |
| `mariadb.mariadbPassword`          | Password for the database                | `nil`                                                   |
| `mariadb.mariadbRootPassword`      | MariaDB admin password                   | `nil`                                                   |
| `mariadb.persistence.enabled`      | Enable MariaDB persistence using PVC     | `true`                                                  |
| `mariadb.persistence.storageClass` | PVC Storage Class for MariaDB volume     | `generic`                                               |
| `mariadb.persistence.accessMode`   | PVC Access Mode for MariaDB volume       | `ReadWriteOnce`                                         |
| `mariadb.persistence.size`         | PVC Storage Request for MariaDB volume   | `8Gi`                                                   |

The above parameters map to the env variables defined in [bitnami/osclass](http://github.com/bitnami/bitnami-docker-osclass). For more information please refer to the [bitnami/osclass](http://github.com/bitnami/bitnami-docker-osclass) image documentation.

> **Note**:
>
> For Osclass to function correctly, you should specify the `osclassHost` parameter to specify the FQDN (recommended) or the public IP address of the Osclass service.
>
> Optionally, you can specify the `osclassLoadBalancerIP` parameter to assign a reserved IP address to the Osclass service of the chart. However please note that this feature is only available on a few cloud providers (f.e. GKE).
>
> To reserve a public IP address on GKE:
>
> ```bash
> $ gcloud compute addresses create osclass-public-ip
> ```
>
> The reserved IP address can be associated to the Osclass service by specifying it as the value of the `osclassLoadBalancerIP` parameter while installing the chart.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set osclassUsername=admin,osclassPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/osclass
```

The above command sets the Osclass administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/osclass
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami Osclass](https://github.com/bitnami/bitnami-docker-osclass) image stores the Osclass data and configurations at the `/bitnami/osclass` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Upgrading

### To 3.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 3.0.0. The following example assumes that the release name is osclass:

```console
$ kubectl patch deployment osclass-osclass --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
$ kubectl delete statefulset osclass-mariadb --cascade=false
```
