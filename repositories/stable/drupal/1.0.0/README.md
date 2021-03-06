# `@helm-charts/stable-drupal`

One of the most versatile open source content management systems.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | drupal |
| Chart Version       | 1.0.0  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami Drupal image version
## ref: https://hub.docker.com/r/bitnami/drupal/tags/
##
image:
  registry: docker.io
  repository: bitnami/drupal
  tag: 8.5.4
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
## ref: https://github.com/bitnami/bitnami-docker-drupal#configuration
##
drupalUsername: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-drupal#configuration
##
# drupalPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-drupal#configuration
##
drupalEmail: user@example.com

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
allowEmptyPassword: 'yes'

##
## External database configuration
##
externalDatabase:
  ## Database host
  # host:
  ## Database user
  # user: bn_drupal
  ## Database password
  # password:
  ## Database name
  # database: bitnami_drupal

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
    name: bitnami_drupal
    user: bn_drupal
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
## Use ClusterIP if your setup includes ingress controller
##
serviceType: LoadBalancer

## Configure Ingress resource that allow you to access the Drupal installation
## Set up the URL
## ref: http://kubernetes.io/docs/user-guide/ingress/
##
ingress:
  enabled: false
  # Used to create Ingress record (should used with ServiceType: ClusterIP).
  # hostname: drupal.local
  ## Ingress annotations
  ##
  # annotations:
  #   kubernetes.io/ingress.class: nginx
  ## Ingress TLS configuration
  ## Secrets must be manually created in the namespace
  ##
  # tls:
  #   - secretName: wordpress.local-tls
  #     hosts:
  #       - drupal.local

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
  drupal:
    ## drupal data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 8Gi

    ## A manually managed Persistent Volume Claim
    ## Requires persistence.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    ##
    # existingClaim:
    ## If defined, the drupal-data volume will mount to the specified hostPath.
    ## Requires persistence.enabled: true
    ## Requires persistence.existingClaim: nil|false
    ## Default: nil.
    ##
    # hostPath:

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 512Mi
    cpu: 300m

## Configure volume mounts. This is useful for images whose data mount paths are
## different than the default.
## Setting volumeMounts.apache.mountPath to "" prevents Apache config mount.
##
volumeMounts:
  drupal:
    mountPath: /bitnami/drupal
  apache:
    mountPath: /bitnami/apache

## Pass extra environment variables to the Drupal container.
##
# extraVars:
# - name: EXTRA_VAR_1
#   value: extra-var-value-1
# - name: EXTRA_VAR_2
#   value: extra-var-value-2

## Configure liveness and readiness probes.
## Drupal core exposes /user/login to unauthenticated requests, making it a good
## default liveness and readiness path. However, that may not always be the
## case. For example, if the image value is overridden to an image containing a
## module that alters that route, or an image that does not auto-install Drupal.
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/
#
livenessProbe:
  httpGet:
    path: /user/login
    port: http
  initialDelaySeconds: 120
readinessProbe:
  httpGet:
    path: /user/login
    port: http
  initialDelaySeconds: 30
```

</details>

---

# Drupal

[Drupal](https://www.drupal.org/) is one of the most versatile open source content management systems on the market.

## TL;DR;

```console
$ helm install stable/drupal
```

## Introduction

This chart bootstraps a [Drupal](https://github.com/bitnami/bitnami-docker-drupal) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment as a database for the Drupal application.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/drupal
```

The command deploys Drupal on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Drupal chart and their default values.

| Parameter                          | Description                           | Default                                                  |
| ---------------------------------- | ------------------------------------- | -------------------------------------------------------- |
| `image.registry`                   | Drupal image registry                 | `docker.io`                                              |
| `image.repository`                 | Drupal Image name                     | `bitnami/drupal`                                         |
| `image.tag`                        | Drupal Image tag                      | `{VERSION}`                                              |
| `image.pullPolicy`                 | Drupal image pull policy              | `Always` if `imageTag` is `latest`, else `IfNotPresent`  |
| `image.pullSecrets`                | Specify image pull secrets            | `nil` (does not add image pull secrets to deployed pods) |
| `drupalUsername`                   | User of the application               | `user`                                                   |
| `drupalPassword`                   | Application password                  | _random 10 character long alphanumeric string_           |
| `drupalEmail`                      | Admin email                           | `user@example.com`                                       |
| `allowEmptyPassword`               | Allow DB blank passwords              | `yes`                                                    |
| `extraVars`                        | Extra environment variables           | `nil`                                                    |
| `ingress.annotations`              | Specify ingress class                 | `kubernetes.io/ingress.class: nginx`                     |
| `ingress.enabled`                  | Enable ingress controller resource    | `false`                                                  |
| `ingress.hostname`                 | URL for your Drupal installation      | `drupal.local`                                           |
| `ingress.tls`                      | Ingress TLS configuration             | `[]`                                                     |
| `externalDatabase.host`            | Host of the external database         | `nil`                                                    |
| `externalDatabase.user`            | Existing username in the external db  | `bn_drupal`                                              |
| `externalDatabase.password`        | Password for the above username       | `nil`                                                    |
| `externalDatabase.database`        | Name of the existing database         | `bitnami_drupal`                                         |
| `mariadb.enabled`                  | Whether to use the MariaDB chart      | `true`                                                   |
| `mariadb.rootUser.password`        | MariaDB admin password                | `nil`                                                    |
| `mariadb.db.name`                  | Database name to create               | `bitnami_drupal`                                         |
| `mariadb.db.user`                  | Database user to create               | `bn_drupal`                                              |
| `mariadb.db.password`              | Password for the database             | _random 10 character long alphanumeric string_           |
| `serviceType`                      | Kubernetes Service type               | `LoadBalancer`                                           |
| `persistence.enabled`              | Enable persistence using PVC          | `true`                                                   |
| `persistence.apache.storageClass`  | PVC Storage Class for Apache volume   | `nil` (uses alpha storage class annotation)              |
| `persistence.apache.accessMode`    | PVC Access Mode for Apache volume     | `ReadWriteOnce`                                          |
| `persistence.apache.size`          | PVC Storage Request for Apache volume | `1Gi`                                                    |
| `persistence.drupal.storageClass`  | PVC Storage Class for Drupal volume   | `nil` (uses alpha storage class annotation)              |
| `persistence.drupal.accessMode`    | PVC Access Mode for Drupal volume     | `ReadWriteOnce`                                          |
| `persistence.drupal.existingClaim` | An Existing PVC name                  | `nil`                                                    |
| `persistence.drupal.hostPath`      | Host mount path for Drupal volume     | `nil` (will not mount to a host path)                    |
| `persistence.drupal.size`          | PVC Storage Request for Drupal volume | `8Gi`                                                    |
| `resources`                        | CPU/Memory resource requests/limits   | Memory: `512Mi`, CPU: `300m`                             |
| `volumeMounts.drupal.mountPath`    | Drupal data volume mount path         | `/bitnami/drupal`                                        |
| `volumeMounts.apache.mountPath`    | Apache data volume mount path         | `/bitnami/apache`                                        |

The above parameters map to the env variables defined in [bitnami/drupal](http://github.com/bitnami/bitnami-docker-drupal). For more information please refer to the [bitnami/drupal](http://github.com/bitnami/bitnami-docker-drupal) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set drupalUsername=admin,drupalPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/drupal
```

The above command sets the Drupal administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/drupal
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Image

The `image` parameter allows specifying which image will be pulled for the chart.

### Private registry

If you configure the `image` value to one in a private registry, you will need to [specify an image pull secret](https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod).

1. Manually create image pull secret(s) in the namespace. See [this YAML example reference](https://kubernetes.io/docs/concepts/containers/images/#creating-a-secret-with-a-docker-config). Consult your image registry's documentation about getting the appropriate secret.
1. Note that the `imagePullSecrets` configuration value cannot currently be passed to helm using the `--set` parameter, so you must supply these using a `values.yaml` file, such as:

```yaml
imagePullSecrets:
  - name: SECRET_NAME
```

1. Install the chart

```console
helm install --name my-release -f values.yaml stable/drupal
```

## Persistence

The configured image must store Drupal data and Apache configurations in separate paths of the container.

The [Bitnami Drupal](https://github.com/bitnami/bitnami-docker-drupal) image stores the Drupal data and Apache configurations at the `/bitnami/drupal` and `/bitnami/apache` paths of the container. If you wish to override the `image` value, and your image stores this data and configurations in different paths, you may specify these paths with `volumeMounts.drupal.mountPath` and `volumeMounts.apache.mountPath`.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

### Existing PersistentVolumeClaim

1. Create the PersistentVolume
1. Create the PersistentVolumeClaim
1. Install the chart

```bash
$ helm install --name my-release --set persistence.drupal.existingClaim=PVC_NAME stable/drupal
```

### Host path

#### System compatibility

- The local filesystem accessibility to a container in a pod with `hostPath` has been tested on OSX/MacOS with xhyve, and Linux with VirtualBox.
- Windows has not been tested with the supported VM drivers. Minikube does however officially support [Mounting Host Folders](https://github.com/kubernetes/minikube/blob/master/docs/host_folder_mount.md) per pod. Or you may manually sync your container whenever host files are changed with tools like [docker-sync](https://github.com/EugenMayer/docker-sync) or [docker-bg-sync](https://github.com/cweagans/docker-bg-sync).

#### Mounting steps

1. The specified `hostPath` directory must already exist (create one if it does not).
1. Install the chart

   ```bash
   $ helm install --name my-release --set persistence.drupal.hostPath=/PATH/TO/HOST/MOUNT stable/drupal
   ```

   This will mount the `drupal-data` volume into the `hostPath` directory. The site data will be persisted if the mount path contains valid data, else the site data will be initialized at first launch.

1. Because the container cannot control the host machine???s directory permissions, you must set the Drupal file directory permissions yourself and disable or clear Drupal cache. See Drupal Core???s [INSTALL.txt](http://cgit.drupalcode.org/drupal/tree/core/INSTALL.txt?h=8.3.x#n152) for setting file permissions, and see [Drupal handbook page](https://www.drupal.org/node/2598914) to disable the cache, or [Drush handbook](https://drushcommands.com/drush-8x/cache/cache-rebuild/) to clear cache.
