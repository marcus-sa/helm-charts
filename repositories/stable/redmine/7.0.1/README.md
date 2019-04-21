# `@helm-charts/stable-redmine`

A flexible project management web application.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | redmine |
| Chart Version       | 7.0.1   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Global Docker image registry
## Please, note that this will override the image registry for all the images, including dependencies, configured to use the global value
##
# global:
#   imageRegistry:

## Bitnami Redmine image version
## ref: https://hub.docker.com/r/bitnami/redmine/tags/
##
image:
  registry: docker.io
  repository: bitnami/redmine
  tag: 3.4.7
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
    name: bitnami_redmine
    user: bn_redmine
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

##
## PostgreSQL chart configuration
##
## https://github.com/helm/charts/blob/master/stable/postgresql/values.yaml
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
service:
  type: LoadBalancer
  # HTTP Port
  port: 80
  ## loadBalancerIP:
  ## Control hosts connecting to "LoadBalancer" only
  loadBalancerSourceRanges:
    - 0.0.0.0/0
  ##
  ## nodePorts:
  ##   http: <to set explicitly, choose port between 30000-32767>
  nodePorts:
    http: ''
  ## Enable client source IP preservation
  ## ref http://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/#preserving-the-client-source-ip
  ##
  externalTrafficPolicy: Cluster

## Configure the ingress resource that allows you to access the
## Redmine installation. Set up the URL
## ref: http://kubernetes.io/docs/user-guide/ingress/
##
ingress:
  ## Set to true to enable ingress record generation
  enabled: false

  ## The list of hostnames to be covered with this ingress record.
  ## Most likely this will be just one host, but in the event more hosts are needed, this is an array
  hosts:
    - name: redmine.local

      ## Set this to true in order to enable TLS on the ingress record
      ## A side effect of this will be that the backend wordpress service will be connected at port 443
      tls: false

      ## Set this to true in order to add the corresponding annotations for cert-manager
      certManager: false

      ## If TLS is set to true, you must declare what secret will store the key/certificate for TLS
      tlsSecret: redmine.local-tls

      ## Ingress annotations done as key:value pairs
      ## For a full list of possible ingress annotations, please see
      ## ref: https://github.com/kubernetes/ingress-nginx/blob/master/docs/annotations.md
      ##
      ## If certManager is set to true, annotation kubernetes.io/tls-acme: "true" will automatically be set
      annotations:
      #  kubernetes.io/ingress.class: nginx

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

## Define a disruption budget
## ref: https://kubernetes.io/docs/concepts/workloads/pods/disruptions/
podDisruptionBudget:
  enabled: false
  # minAvailable: 1
  # maxUnavailable: 1

## Define the number of pods the deployment will create
## Do not change unless your persistent volume allows more than one writer, ie NFS
## ref: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
replicas: 1

## Redmine pods resource requests and limits
## ref: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#resource-requests-and-limits-of-pod-and-container
resources:
  {}
  # requests:
  #   cpu: "1"
  #   memory: "1G"
  # limits:
  #   cpu: "2"
  #   memory: "1G"
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

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

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

| Parameter                            | Description                                | Default                                                 |
| ------------------------------------ | ------------------------------------------ | ------------------------------------------------------- |
| `global.imageRegistry`               | Global Docker image registr y              | `nil`                                                   |
| `image.registry`                     | Redmine image registry                     | `docker.io`                                             |
| `image.repository`                   | Redmine image name                         | `bitnami/redmine`                                       |
| `image.tag`                          | Redmine image tag                          | `{VERSION}`                                             |
| `image.pullPolicy`                   | Image pull policy                          | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`                  | Specify image pull secrets                 | `nil`                                                   |
| `redmineUsername`                    | User of the application                    | `user`                                                  |
| `redminePassword`                    | Application password                       | _random 10 character long alphanumeric string_          |
| `redmineEmail`                       | Admin email                                | `user@example.com`                                      |
| `redmineLanguage`                    | Redmine default data language              | `en`                                                    |
| `extraVars`                          | Environment variables, passed to redmine   | `nil`                                                   |
| `smtpHost`                           | SMTP host                                  | `nil`                                                   |
| `smtpPort`                           | SMTP port                                  | `nil`                                                   |
| `smtpUser`                           | SMTP user                                  | `nil`                                                   |
| `smtpPassword`                       | SMTP password                              | `nil`                                                   |
| `smtpTls`                            | Use TLS encryption with SMTP               | `nil`                                                   |
| `databaseType.postgresql`            | Select postgresql database                 | `false`                                                 |
| `databaseType.mariadb`               | Select mariadb database                    | `true`                                                  |
| `mariadb.rootUser.password`          | MariaDB admin password                     | `nil`                                                   |
| `postgresql.postgresqlPassword`      | PostgreSQL admin password                  | `nil`                                                   |
| `service.type`                       | Kubernetes Service type                    | `LoadBalancer`                                          |
| `service.port`                       | Service HTTP port                          | `80`                                                    |
| `service.nodePorts.http`             | Kubernetes http node port                  | `""`                                                    |
| `service.externalTrafficPolicy`      | Enable client source IP preservation       | `Cluster`                                               |
| `service.loadBalancerIP`             | LoadBalancer service IP address            | `""`                                                    |
| `service.loadBalancerSourceRanges`   | An array of load balancer sources          | `0.0.0.0/0`                                             |
| `ingress.enabled`                    | Enable or disable the ingress              | `false`                                                 |
| `ingress.hosts[0].name`              | Hostname to your Redmine installation      | `redmine.local`                                         |
| `ingress.hosts[0].path`              | Path within the url structure              | `/`                                                     |
| `ingress.hosts[0].tls`               | Utilize TLS backend in ingress             | `false`                                                 |
| `ingress.hosts[0].certManager`       | Add annotations for cert-manager           | `false`                                                 |
| `ingress.hosts[0].tlsSecret`         | TLS Secret (certificates)                  | `redmine.local-tls-secret`                              |
| `ingress.hosts[0].annotations`       | Annotations for this host's ingress record | `[]`                                                    |
| `ingress.secrets[0].name`            | TLS Secret Name                            | `nil`                                                   |
| `ingress.secrets[0].certificate`     | TLS Secret Certificate                     | `nil`                                                   |
| `ingress.secrets[0].key`             | TLS Secret Key                             | `nil`                                                   |
| `persistence.enabled`                | Enable persistence using PVC               | `true`                                                  |
| `persistence.existingClaim`          | The name of an existing PVC                | `nil`                                                   |
| `persistence.storageClass`           | PVC Storage Class                          | `nil` (uses alpha storage class annotation)             |
| `persistence.accessMode`             | PVC Access Mode                            | `ReadWriteOnce`                                         |
| `persistence.size`                   | PVC Storage Request                        | `8Gi`                                                   |
| `podDisruptionBudget.enabled`        | Pod Disruption Budget toggle               | `false`                                                 |
| `podDisruptionBudget.minAvailable`   | Minimum available pods                     | `nil`                                                   |
| `podDisruptionBudget.maxUnavailable` | Maximum unavailable pods                   | `nil`                                                   |
| `replicas`                           | The number of pod replicas                 | `1`                                                     |
| `resources`                          | Resources allocation (Requests and Limits) | `{}`                                                    |

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

## Replicas

Redmine writes uploaded files to a persistent volume. By default that volume
cannot be shared between pods (RWO). In such a configuration the `replicas` option
must be set to `1`. If the persistent volume supports more than one writer
(RWX), ie NFS, `replicas` can be greater than `1`.

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

## Upgrading

### To 5.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 5.0.0. The following example assumes that the release name is redmine:

```console
$ kubectl patch deployment redmine-redmine --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
# If using postgresql as database
$ kubectl patch deployment redmine-postgresql --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
# If using mariadb as database
$ kubectl delete statefulset redmine-mariadb --cascade=false
```
