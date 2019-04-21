# `@helm-charts/stable-owncloud`

A file sharing server that puts the control and security of your own data back into your hands.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | owncloud |
| Chart Version       | 2.0.2    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami ownCloud image version
## ref: https://hub.docker.com/r/bitnami/owncloud/tags/
##
image:
  registry: docker.io
  repository: bitnami/owncloud
  tag: 10.0.8-debian-9
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

## For Kubernetes v1.4, v1.5 and v1.6, use 'extensions/v1beta1'
## For Kubernetes v1.7, use 'networking.k8s.io/v1'
networkPolicyApiVersion: extensions/v1beta1

## Allowing use of ingress controllers
## ref: https://kubernetes.io/docs/concepts/services-networking/ingress/
##
ingress:
  enabled: false
  servicePort: http
  annotations:
    # kubernetes.io/ingress.class: nginx
    # ingress.kubernetes.io/whitelist-source-range: "10.0.0.0/24,172.10.0.1"
  tls:
    # - secretName: owncloud.cluster.local
    #   hosts:
    #     - owncloud.cluster.local

## ownCloud host to create application URLs
## ref: https://github.com/bitnami/bitnami-docker-owncloud#configuration
##
# owncloudHost:

## loadBalancerIP for the ownCloud Service (optional, cloud specific)
## ref: http://kubernetes.io/docs/user-guide/services/#type-loadbalancer
##
# owncloudLoadBalancerIP:

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-owncloud#configuration
##
owncloudUsername: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-owncloud#configuration
##
# owncloudPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-owncloud#configuration
##
owncloudEmail: user@example.com

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-owncloud#environment-variables
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
  user: bn_owncloud

  ## Database password
  password:

  ## Database name
  database: bitnami_owncloud

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
    name: bitnami_owncloud
    user: bn_owncloud
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

    ## A manually managed Persistent Volume and Claim
    ## Requires persistence.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    # existingClaim:

    accessMode: ReadWriteOnce
    size: 1Gi
  owncloud:
    ## owncloud data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"

    ## A manually managed Persistent Volume and Claim
    ## Requires persistence.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    # existingClaim:

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

# ownCloud

[ownCloud](https://owncloud.org/) is a file sharing server that puts the control and security of your own data back into your hands.

## TL;DR;

```console
$ helm install stable/owncloud
```

## Introduction

This chart bootstraps an [ownCloud](https://github.com/bitnami/bitnami-docker-owncloud) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the ownCloud application.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/owncloud
```

The command deploys ownCloud on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the ownCloud chart and their default values.

| Parameter                            | Description                               | Default                                                 |
| ------------------------------------ | ----------------------------------------- | ------------------------------------------------------- |
| `image.registry`                     | ownCloud image registry                   | `docker.io`                                             |
| `image.repository`                   | ownCloud Image name                       | `bitnami/owncloud`                                      |
| `image.tag`                          | ownCloud Image tag                        | `{VERSION}`                                             |
| `image.pullPolicy`                   | Image pull policy                         | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`                  | Specify image pull secrets                | `nil`                                                   |
| `ingress.enabled`                    | Enable use of ingress controllers         | `false`                                                 |
| `ingress.servicePort`                | Ingress' backend servicePort              | `http`                                                  |
| `ingress.annotations`                | An array of service annotations           | `nil`                                                   |
| `ingress.tls`                        | Ingress TLS configuration                 | `[]`                                                    |
| `networkPolicyApiVersion`            | The kubernetes network API version        | `extensions/v1beta1`                                    |
| `owncloudHost`                       | ownCloud host to create application URLs  | `nil`                                                   |
| `owncloudLoadBalancerIP`             | `loadBalancerIP` for the owncloud Service | `nil`                                                   |
| `owncloudUsername`                   | User of the application                   | `user`                                                  |
| `owncloudPassword`                   | Application password                      | Randomly generated                                      |
| `owncloudEmail`                      | Admin email                               | `user@example.com`                                      |
| `externalDatabase.host`              | Host of the external database             | `nil`                                                   |
| `allowEmptyPassword`                 | Allow DB blank passwords                  | `yes`                                                   |
| `externalDatabase.host`              | Host of the external database             | `nil`                                                   |
| `externalDatabase.port`              | Port of the external database             | `3306`                                                  |
| `externalDatabase.database`          | Name of the existing database             | `bitnami_owncloud`                                      |
| `externalDatabase.user`              | Existing username in the external db      | `bn_owncloud`                                           |
| `externalDatabase.password`          | Password for the above username           | `nil`                                                   |
| `mariadb.db.name`                    | Database name to create                   | `bitnami_owncloud`                                      |
| `mariadb.enabled`                    | Whether to use the MariaDB chart          | `true`                                                  |
| `mariadb.db.password`                | Password for the database                 | `nil`                                                   |
| `mariadb.db.user`                    | Database user to create                   | `bn_owncloud`                                           |
| `mariadb.rootUser.password`          | MariaDB admin password                    | `nil`                                                   |
| `serviceType`                        | Kubernetes Service type                   | `LoadBalancer`                                          |
| `persistence.enabled`                | Enable persistence using PVC              | `true`                                                  |
| `persistence.apache.storageClass`    | PVC Storage Class for Apache volume       | `nil` (uses alpha storage class annotation)             |
| `persistence.apache.existingClaim`   | An Existing PVC name for Apache volume    | `nil` (uses alpha storage class annotation)             |
| `persistence.apache.accessMode`      | PVC Access Mode for Apache volume         | `ReadWriteOnce`                                         |
| `persistence.apache.size`            | PVC Storage Request for Apache volume     | `1Gi`                                                   |
| `persistence.owncloud.storageClass`  | PVC Storage Class for ownCloud volume     | `nil` (uses alpha storage class annotation)             |
| `persistence.owncloud.existingClaim` | An Existing PVC name for ownCloud volume  | `nil` (uses alpha storage class annotation)             |
| `persistence.owncloud.accessMode`    | PVC Access Mode for ownCloud volume       | `ReadWriteOnce`                                         |
| `persistence.owncloud.size`          | PVC Storage Request for ownCloud volume   | `8Gi`                                                   |
| `resources`                          | CPU/Memory resource requests/limits       | Memory: `512Mi`, CPU: `300m`                            |

The above parameters map to the env variables defined in [bitnami/owncloud](http://github.com/bitnami/bitnami-docker-owncloud). For more information please refer to the [bitnami/owncloud](http://github.com/bitnami/bitnami-docker-owncloud) image documentation.

> **Note**:
>
> For ownCloud to function correctly, you should specify the `owncloudHost` parameter to specify the FQDN (recommended) or the public IP address of the ownCloud service.
>
> Optionally, you can specify the `owncloudLoadBalancerIP` parameter to assign a reserved IP address to the ownCloud service of the chart. However please note that this feature is only available on a few cloud providers (f.e. GKE).
>
> To reserve a public IP address on GKE:
>
> ```bash
> $ gcloud compute addresses create owncloud-public-ip
> ```
>
> The reserved IP address can be associated to the ownCloud service by specifying it as the value of the `owncloudLoadBalancerIP` parameter while installing the chart.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set owncloudUsername=admin,owncloudPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/owncloud
```

The above command sets the ownCloud administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/owncloud
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami ownCloud](https://github.com/bitnami/bitnami-docker-owncloud) image stores the ownCloud data and configurations at the `/bitnami/owncloud` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
