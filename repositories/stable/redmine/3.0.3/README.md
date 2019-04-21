# `@helm-charts/stable-redmine`

A flexible project management web application.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | redmine |
| Chart Version       | 3.0.3   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami Redmine image version
## ref: https://hub.docker.com/r/bitnami/redmine/tags/
##
image:
  registry: docker.io
  repository: bitnami/redmine
  tag: 3.4.5
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
## ref: https://github.com/bitnami/bitnami-docker-redmine/#environment-variables
##
redmineUsername: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
##
# redminePassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-redmine/#environment-variables
##
redmineEmail: user@example.com

## Redmine default data language
## ref: https://github.com/bitnami/bitnami-docker-redmine/#environment-variables
##
redmineLanguage: en

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-redmine/#smtp-configuration
##
# smtpHost:
# smtpPort:
# smtpUser:
# smtpPassword:
# smtpTls:

## Environment variables, to pass to the entry point
##
# extraVars:
#   - name: NAMI_DEBUG
#     value: --log-level trace

## Database configuration. Please note that only one of the following databases should be selected.
## ref: https://github.com/bitnami/bitnami-docker-redmine#run-the-application-using-postgresql-database
##
databaseType:
  mariadb: true
  postgresql: false

##
## MariaDB chart configuration
##
mariadb:
  ## MariaDB admin password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#setting-the-root-password-on-first-run
  ##
  # mariadbRootPassword:

  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  persistence:
    enabled: true
    ## A manually manage Persistent Volume Claim
    ## Requires mariadb.persistence.enable: true
    ## If defined, PVC must be created manually before volume will be bound
    # existingClaim:

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

##
## PostgreSQL chart configuration
##
postgresql:
  ## PostgreSQL admin password
  ## ref: https://github.com/bitnami/bitnami-docker-postgresql/blob/master/README.md#setting-the-root-password-on-first-run
  ##
  # postgresqlPassword:

  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  persistence:
    enabled: true
    ## A manually manage Persistent Volume Claim
    ## Requires postgresql.persistence.enable: true
    ## If defined, PVC must be created manually before volume will be bound
    # existingClaim:

    ## postgresql data Persistent Volume Storage Class
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
##   minikube: NodePort
##   ingress: ClusterIP
##   elsewhere: LoadBalancer
##
serviceType: LoadBalancer
## Control hosts connecting to "LoadBalancer" only
serviceLoadBalancerSourceRanges:
  - 0.0.0.0/0

ingress:
  enabled: false
  hostname: redmine.cluser.local
  annotations:
    # kubernetes.io/ingress.class: nginx
    # ingress.kubernetes.io/whitelist-source-range: "10.0.0.0/24,172.10.0.1"
  tls:
    # - secretName: redmine.cluster.local
    #   hosts:
    #     - redmine.cluster.local

## For Kubernetes v1.4, v1.5 and v1.6, use 'extensions/v1beta1'
## For Kubernetes v1.7, use 'networking.k8s.io/v1'
networkPolicyApiVersion: extensions/v1beta1

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  ## A manually manage Persistent Volume Claim
  ## Requires persistence.enable: true
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:

  ## redmine data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 8Gi
```

</details>

---

# Redmine

[Redmine](http://www.redmine.org) is a free and open source, web-based project management and issue tracking tool.

## TL;DR;

```bash
$ helm install stable/redmine
```

## Introduction

This chart bootstraps a [Redmine](https://github.com/bitnami/bitnami-docker-redmine) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) and the [PostgreSQL chart](https://github.com/kubernetes/charts/tree/master/stable/postgresql) which are required for bootstrapping a MariaDB/PostgreSQL deployment for the database requirements of the Redmine application.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/redmine
```

The command deploys Redmine on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Using PostgreSQL instead of MariaDB

This chart includes the option to use a PostgreSQL database for Redmine instead of MariaDB. To use this, MariaDB must be explicitly disabled and PostgreSQL enabled:

```
helm install --name my-release stable/redmine --set databaseType.mariadb=false,databaseType.postgresql=true
```

## Configuration

The following table lists the configurable parameters of the Redmine chart and their default values.

| Parameter                         | Description                              | Default                                                 |
| --------------------------------- | ---------------------------------------- | ------------------------------------------------------- |
| `image.registry`                  | Redmine image registry                   | `docker.io`                                             |
| `image.repository`                | Redmine image name                       | `bitnami/redmine`                                       |
| `image.tag`                       | Redmine image tag                        | `{VERSION}`                                             |
| `image.pullPolicy`                | Image pull policy                        | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`               | Specify image pull secrets               | `nil`                                                   |
| `redmineUsername`                 | User of the application                  | `user`                                                  |
| `redminePassword`                 | Application password                     | _random 10 character long alphanumeric string_          |
| `redmineEmail`                    | Admin email                              | `user@example.com`                                      |
| `redmineLanguage`                 | Redmine default data language            | `en`                                                    |
| `extraVars`                       | Environment variables, passed to redmine | `nil`                                                   |
| `smtpHost`                        | SMTP host                                | `nil`                                                   |
| `smtpPort`                        | SMTP port                                | `nil`                                                   |
| `smtpUser`                        | SMTP user                                | `nil`                                                   |
| `smtpPassword`                    | SMTP password                            | `nil`                                                   |
| `smtpTls`                         | Use TLS encryption with SMTP             | `nil`                                                   |
| `databaseType.postgresql`         | Select postgresql database               | `false`                                                 |
| `databaseType.mariadb`            | Select mariadb database                  | `true`                                                  |
| `mariadb.mariadbRootPassword`     | MariaDB admin password                   | `nil`                                                   |
| `postgresql.postgresqlPassword`   | PostgreSQL admin password                | `nil`                                                   |
| `serviceType`                     | Kubernetes Service type                  | `LoadBalancer`                                          |
| `serviceLoadBalancerSourceRanges` | An array of load balancer sources        | `0.0.0.0/0`                                             |
| `ingress.enabled`                 | Enable or disable the ingress            | `false`                                                 |
| `ingress.hostname`                | The virtual host name                    | `redmine.cluster.local`                                 |
| `ingress.annotations`             | An array of service annotations          | `nil`                                                   |
| `ingress.tls[i].secretName`       | The secret kubernetes.io/tls             | `nil`                                                   |
| `ingress.tls[i].hosts[j]`         | The virtual host name                    | `nil`                                                   |
| `networkPolicyApiVersion`         | The kubernetes network API version       | `extensions/v1beta1`                                    |
| `persistence.enabled`             | Enable persistence using PVC             | `true`                                                  |
| `persistence.existingClaim`       | The name of an existing PVC              | `nil`                                                   |
| `persistence.storageClass`        | PVC Storage Class                        | `nil` (uses alpha storage class annotation)             |
| `persistence.accessMode`          | PVC Access Mode                          | `ReadWriteOnce`                                         |
| `persistence.size`                | PVC Storage Request                      | `8Gi`                                                   |

The above parameters map to the env variables defined in [bitnami/redmine](http://github.com/bitnami/bitnami-docker-redmine). For more information please refer to the [bitnami/redmine](http://github.com/bitnami/bitnami-docker-redmine) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set redmineUsername=admin,redminePassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/redmine
```

The above command sets the Redmine administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/redmine
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami Redmine](https://github.com/bitnami/bitnami-docker-redmine) image stores the Redmine data and configurations at the `/bitnami/redmine` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube. The volume is created using dynamic volume provisioning. Clusters configured with NFS mounts require manually managed volumes and claims.

See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

### Existing PersistentVolumeClaims

The following example includes two PVCs, one for Redmine and another for MariaDB.

1. Create the PersistentVolume
1. Create the PersistentVolumeClaim
1. Create the directory, on a worker
1. Install the chart

```bash
$ helm install --name test --set persistence.existingClaim=PVC_REDMINE,mariadb.persistence.existingClaim=PVC_MARIADB  redmine
```
