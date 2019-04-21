# `@helm-charts/stable-bookstack`

BookStack is a simple, self-hosted, easy-to-use platform for organising and storing information.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | bookstack |
| Chart Version       | 1.0.1     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for bookstack.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: solidnerd/bookstack
  tag: 0.24.3
  pullPolicy: IfNotPresent

app:
  # Laravel APP_KEY. Generate one with `php artisan key:generate` and put here if you want a static key.
  key:

##
## External database configuration
##
externalDatabase:
  ## Database host
  host:

  ## Database host
  port: 3306

  ## Database user
  user: bookstack

  ## Database password
  password:

  ## Database name
  database: bookstack

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
    name: bookstack
    user: bookstack
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
      enabled: false
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

service:
  type: ClusterIP
  port: 80

# If true, create & use Pod Security Policy resources
# https://kubernetes.io/docs/concepts/policy/pod-security-policy/
podSecurityPolicy:
  enabled: false

## For RBAC support:
rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true

  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  # Persistence for the public/uploads folder
  uploads:
    enabled: true
    ## database data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 8Gi

  # Persistence for the public/storage folder
  storage:
    enabled: true
    ## database data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 8Gi

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - bookstack-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}

## Enable ldap authentication. See https://www.bookstackapp.com/docs/admin/ldap-auth/ for details on how to set it up.
ldap:
  enabled: false
  server:
  base_dn:
  dn:
  pass:
  userFilter:
  version:
```

</details>

---

# Bookstack

[Bookstack](https://www.bookstackapp.com) is a simple, easy-to-use platform for organising and storing information.

## TL;DR;

```bash
$ helm install stable/bookstack
```

## Introduction

This chart bootstraps a [Bookstack](https://hub.docker.com/r/solidnerd/bookstack/) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also uses the [MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which satisfies the database requirements of the application.

## Prerequisites

- Kubernetes 1.9+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm update --install my-release stable/bookstack
```

The command deploys Bookstack on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Redmine chart and their default values.

| Parameter                           | Description                                                                                                                | Default                                     |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `replicaCount`                      | Number of replicas to start                                                                                                | `1`                                         |
| `image.repository`                  | Bookstack image name                                                                                                       | `solidnerd/bookstack`                       |
| `image.tag`                         | Bookstack image tag                                                                                                        | `0.24.3`                                    |
| `image.pullPolicy`                  | Bookstack image pull policy                                                                                                | `IfNotPresent`                              |
| `externalDatabase.host`             | Host of the external database                                                                                              | `nil`                                       |
| `externalDatabase.port`             | Port of the external database                                                                                              | `3306`                                      |
| `externalDatabase.user`             | Existing username in the external db                                                                                       | `bookstack`                                 |
| `externalDatabase.password`         | Password for the above username                                                                                            | `nil`                                       |
| `externalDatabase.database`         | Name of the existing database                                                                                              | `bookstack`                                 |
| `mariadb.enabled`                   | Whether to use the MariaDB chart                                                                                           | `true`                                      |
| `mariadb.db.name`                   | Database name to create                                                                                                    | `bookstack`                                 |
| `mariadb.db.user`                   | Database user to create                                                                                                    | `bookstack`                                 |
| `mariadb.db.password`               | Password for the database                                                                                                  | `nil`                                       |
| `mariadb.rootUser.password`         | MariaDB admin password                                                                                                     | `nil`                                       |
| `mariadb.persistence.enabled`       | Enable MariaDB persistence using PVC                                                                                       | `true`                                      |
| `mariadb.persistence.storageClass`  | PVC Storage Class for MariaDB volume                                                                                       | `nil` (uses alpha storage class annotation) |
| `mariadb.persistence.accessMode`    | PVC Access Mode for MariaDB volume                                                                                         | `ReadWriteOnce`                             |
| `mariadb.persistence.size`          | PVC Storage Request for MariaDB volume                                                                                     | `8Gi`                                       |
| `service.type`                      | Desired service type                                                                                                       | `ClusterIP`                                 |
| `service.port`                      | Service exposed port                                                                                                       | `80`                                        |
| `podSecurityPolicy.enabled`         | Create & use Pod Security Policy resources                                                                                 | `false`                                     |
| `rbac.create`                       | Use Role-based Access Control                                                                                              | `true`                                      |
| `serviceAccount.create`             | Should we create a ServiceAccount                                                                                          | `true`                                      |
| `serviceAccount.name`               | Name of the ServiceAccount to use                                                                                          | `null`                                      |
| `persistence.uploads.enabled`       | Enable persistence using PVC for uploads                                                                                   | `true`                                      |
| `persistence.uploads.storageClass`  | PVC Storage Class                                                                                                          | `nil` (uses alpha storage class annotation) |
| `persistence.uploads.accessMode`    | PVC Access Mode                                                                                                            | `ReadWriteMany`                             |
| `persistence.uploads.size`          | PVC Storage Request                                                                                                        | `8Gi`                                       |
| `persistence.uploads.existingClaim` | If PVC exists & bounded for uploads                                                                                        | `nil` (when nil, new one is requested)      |
| `persistence.storage.enabled`       | Enable persistence using PVC for uploads                                                                                   | `true`                                      |
| `persistence.storage.storageClass`  | PVC Storage Class                                                                                                          | `nil` (uses alpha storage class annotation) |
| `persistence.storage.accessMode`    | PVC Access Mode                                                                                                            | `ReadWriteMany`                             |
| `persistence.storage.size`          | PVC Storage Request                                                                                                        | `8Gi`                                       |
| `persistence.storage.existingClaim` | If PVC exists & bounded for storage                                                                                        | `nil` (when nil, new one is requested)      |
| `ingress.enabled`                   | Enable or disable the ingress                                                                                              | `false`                                     |
| `ingress.hosts`                     | The virtual host name(s)                                                                                                   | `{}`                                        |
| `ingress.annotations`               | An array of service annotations                                                                                            | `nil`                                       |
| `ingress.tls[i].secretName`         | The secret kubernetes.io/tls                                                                                               | `nil`                                       |
| `ingress.tls[i].hosts[j]`           | The virtual host name                                                                                                      | `nil`                                       |
| `resources`                         | Resources allocation (Requests and Limits)                                                                                 | `{}`                                        |
| `ldap.enabled`                      | Enable or disable LDAP authentication. [See official docs for details](https://www.bookstackapp.com/docs/admin/ldap-auth/) | `false`                                     |
| `ldap.server`                       | LDAP server address                                                                                                        | `nil`                                       |
| `ldap.base_dn`                      | Base DN where users will be searched                                                                                       | `nil`                                       |
| `ldap.dn`                           | User which will make search queries. Leave empty to search anonymously.                                                    | `nil`                                       |
| `ldap.pass`                         | Password of user performing search queries.                                                                                | `nil`                                       |
| `ldap.userFilter`                   | A filter to use when searching for users                                                                                   | `nil`                                       |
| `ldap.version`                      | Set the LDAP version to use when connecting to the server. Required especially when using AD.                              | `nil`                                       |

The above parameters map to the env variables defined in the [Bookstack image](https://hub.docker.com/r/solidnerd/bookstack/) and the MariaDB/MySQL database settings. For more information please refer to the [Bookstack](https://hub.docker.com/r/solidnerd/bookstack/) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm upgrade --install my-release \
  --set podSecurityPolicy.enabled=true \
    stable/bookstack
```

The above command enables podSecurityPolicy.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```bash
$ helm upgrade --install my-release -f values.yaml stable/bookstack
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Replicas

Bookstack writes uploaded files to a persistent volume. By default that volume
cannot be shared between pods (RWO). In such a configuration the `replicas` option
must be set to `1`. If the persistent volume supports more than one writer
(RWX), ie NFS, `replicaCount` can be greater than `1`.

## Persistence

The [Bookstack](https://hub.docker.com/r/solidnerd/bookstack/) image stores the uploaded data at the `public/uploads` path, relative to the document root of the Bookstack application. Other misc. data is stored under the `public/storage` path, also relative to the document root of the application.

Persistent Volume Claims are used to keep the data across deployments. The volume is created using dynamic volume provisioning.

See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

### Existing PersistentVolumeClaims

The following example includes two PVCs, one for uploads and another for misc. data.

1. Create the PersistentVolume
1. Create the PersistentVolumeClaim
1. Create the directory, on a worker
1. Install the chart

```bash
$ helm upgrade --install test --set persistence.uploads.existingClaim=PVC_UPLOADS,persistence.storage.existingClaim=PVC_STORAGE stable/bookstack
```
