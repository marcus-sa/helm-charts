# `@helm-charts/bitnami-mariadb-cluster`

Chart to create a Highly available MariaDB cluster

| Field               | Value           |
| ------------------- | --------------- |
| Repository Name     | bitnami         |
| Chart Name          | mariadb-cluster |
| Chart Version       | 0.5.2           |
| NPM Package Version | 0.1.0           |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami MariaDB image version
## ref: https://hub.docker.com/r/bitnami/mariadb/tags/
##
image:
  registry: docker.io
  repository: bitnami/mariadb
  tag: 10.1.28
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

service:
  ## Kubernetes service type
  type: ClusterIP
  port: 3306

root:
  ## MariaDB admin password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb#setting-the-root-password-on-first-run
  ##
  password:

db:
  ## MariaDB username and password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb#creating-a-database-user-on-first-run
  ##
  user:
  password:
  ## Database to create
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb#creating-a-database-on-first-run
  ##
  name: my_database

replication:
  ## MariaDB replication user
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb#setting-up-a-replication-cluster
  ##
  user: replicator
  ## MariaDB replication user password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb#setting-up-a-replication-cluster
  ##
  password:

master:
  antiAffinity: soft
  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  persistence:
    ## If true, use a Persistent Volume Claim, If false, use emptyDir
    ##
    enabled: true
    ## Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    ## Persistent Volume Claim annotations
    ##
    annotations:
    ## Persistent Volume Access Mode
    ##
    accessModes:
      - ReadWriteOnce
    ## Persistent Volume size
    ##
    size: 8Gi
  ## Configure master resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources: {}

slave:
  replicas: 1
  antiAffinity: soft
  hpa:
    min: 1
    max: 3
    target:
      cpuPercentage: 75
  ## Configure slave resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources: {}

metrics:
  enabled: false
  image: prom/mysqld-exporter
  imageTag: v0.10.0
  imagePullPolicy: IfNotPresent
  resources: {}
  annotations:
    prometheus.io/scrape: 'true'
    prometheus.io/port: '9104'
```

</details>

---

# MariaDB Cluster

[MariaDB](https://mariadb.org) is one of the most popular database servers in the world. It???s made by the original developers of MySQL and guaranteed to stay open source. Notable users include Wikipedia, Facebook and Google.

MariaDB is developed as open source software and as a relational database it provides an SQL interface for accessing data. The latest versions of MariaDB also include GIS and JSON features.

## TL;DR

```bash
$ helm install incubator/mariadb-cluster
```

## Introduction

This chart bootstraps a [MariaDB](https://github.com/bitnami/bitnami-docker-mariadb) replication cluster deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release incubator/mariadb-cluster
```

The command deploys MariaDB on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the MariaDB chart and their default values.

| Parameter                         | Description                                         | Default                                                           |
| --------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------- |
| `image.registry`                  | MariaDB image registry                              | `docker.io`                                                       |
| `image.repository`                | MariaDB Image name                                  | `bitnami/mariadb`                                                 |
| `image.tag`                       | MariaDB Image tag                                   | `{VERSION}`                                                       |
| `image.pullPolicy`                | MariaDB image pull policy                           | `Always` if `imageTag` is `latest`, else `IfNotPresent`           |
| `image.pullSecrets`               | Specify image pull secrets                          | `nil` (does not add image pull secrets to deployed pods)          |
| `service.type`                    | Kubernetes service type                             | `ClusterIP`                                                       |
| `service.port`                    | MySQL service port                                  | `3306`                                                            |
| `root.password`                   | Password for the `root` user                        | _random 10 character alphanumeric string_                         |
| `db.user`                         | Username of new user to create                      | `nil`                                                             |
| `db.password`                     | Password for the new user                           | _random 10 character alphanumeric string if `db.user` is defined_ |
| `db.name`                         | Name for new database to create                     | `my_database`                                                     |
| `replication.user`                | MariaDB replication user                            | `replicator`                                                      |
| `replication.password`            | MariaDB replication user password                   | _random 10 character alphanumeric string_                         |
| `master.antiAffinity`             | Master pod anti-affinity policy                     | `soft`                                                            |
| `master.persistence.enabled`      | Enable persistence using a `PersistentVolumeClaim`  | `true`                                                            |
| `master.persistence.annotations`  | Persistent Volume Claim annotations                 | `{}`                                                              |
| `master.persistence.storageClass` | Persistent Volume Storage Class                     | ``                                                                |
| `master.persistence.accessModes`  | Persistent Volume Access Modes                      | `[ReadWriteOnce]`                                                 |
| `master.persistence.size`         | Persistent Volume Size                              | `8Gi`                                                             |
| `master.resources`                | CPU/Memory resource requests/limits for master node | `{}`                                                              |
| `slave.replicas`                  | Desired number of slave replicas                    | `1`                                                               |
| `slave.antiAffinity`              | Slave pod anti-affinity policy                      | `soft`                                                            |
| `slave.hpa.min`                   | Minimum number of slave pods                        | `1`                                                               |
| `slave.hpa.max`                   | Maximum number of slave pods                        | `3`                                                               |
| `slave.hpa.target.cpuPercentage`  | Target CPU percentage to trigger pod autoscaling    | `75`                                                              |
| `slave.resources`                 | CPU/Memory resource requests/limits for slave nodes | `{}`                                                              |
| `metrics.enabled`                 | Start a side-car prometheus exporter                | `false`                                                           |
| `metrics.image`                   | Exporter image name                                 | `prom/mysqld-exporter`                                            |
| `metrics.imageTag`                | Exporter image tag                                  | `v0.10.0`                                                         |
| `metrics.imagePullPolicy`         | Exporter image pull policy                          | `IfNotPresent`                                                    |
| `metrics.resources`               | Exporter resource requests/limit                    | `nil`                                                             |

The above parameters map to the env variables defined in [bitnami/mariadb](http://github.com/bitnami/bitnami-docker-mariadb). For more information please refer to the [bitnami/mariadb](http://github.com/bitnami/bitnami-docker-mariadb) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set root.password=secretpassword,user.database=app_database \
    incubator/mariadb-cluster
```

The above command sets the MariaDB `root` account password to `secretpassword`. Additionally it creates a database named `my_database`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml incubator/mariadb-cluster
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami MariaDB](https://github.com/bitnami/bitnami-docker-mariadb) image stores the MariaDB data and configurations at the `/bitnami/mariadb` path of the container.

The chart mounts a [Persistent Volume](kubernetes.io/docs/user-guide/persistent-volumes/) volume at this location. The volume is created using dynamic volume provisioning, by default. An existing PersistentVolumeClaim can be defined.
