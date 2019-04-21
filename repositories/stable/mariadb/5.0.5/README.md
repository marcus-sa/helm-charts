# `@helm-charts/stable-mariadb`

Fast, reliable, scalable, and easy to use open-source relational database system. MariaDB Server is intended for mission-critical, heavy-load production systems as well as for embedding into mass-deployed software. Highly available MariaDB cluster.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | mariadb |
| Chart Version       | 5.0.5   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami MariaDB image
## ref: https://hub.docker.com/r/bitnami/mariadb/tags/
##
image:
  registry: docker.io
  repository: bitnami/mariadb
  tag: 10.1.36-debian-9
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
  ## Kubernetes service type, ClusterIP and NodePort are supported at present
  type: ClusterIP
  port: 3306
  ## Specify the nodePort value for the LoadBalancer and NodePort service types.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
  ##
  # nodePort:
  #   master: 30001
  #   slave: 30002

rootUser:
  ## MariaDB admin password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb#setting-the-root-password-on-first-run
  ##
  password:
  ## Use existing secret (ignores root, db and replication passwords)
  # existingSecret:
  ##
  ## Option to force users to specify a password. That is required for 'helm upgrade' to work properly.
  ## If it is not force, a random password will be generated.
  forcePassword: false

db:
  ## MariaDB username and password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb#creating-a-database-user-on-first-run
  ##
  user:
  password:
  ## Password is ignored if existingSecret is specified.
  ## Database to create
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb#creating-a-database-on-first-run
  ##
  name: my_database
  ## Option to force users to specify a password. That is required for 'helm upgrade' to work properly.
  ## If it is not force, a random password will be generated.
  forcePassword: false

replication:
  ## Enable replication. This enables the creation of replicas of MariaDB. If false, only a
  ## master deployment would be created
  enabled: true
  ##
  ## MariaDB replication user
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb#setting-up-a-replication-cluster
  ##
  user: replicator
  ## MariaDB replication user password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb#setting-up-a-replication-cluster
  ##
  password:
  ## Password is ignored if existingSecret is specified.
  ##
  ## Option to force users to specify a password. That is required for 'helm upgrade' to work properly.
  ## If it is not force, a random password will be generated.
  forcePassword: false

master:
  ## Affinity for pod assignment
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
  ##
  affinity: {}

  ## Kept for backwards compatibility. You can now disable it by removing it.
  ## if you wish to set it through master.affinity.podAntiAffinity instead.
  ##
  antiAffinity: soft

  ## Tolerations for pod assignment
  ## Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
  ##
  tolerations: []

  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  persistence:
    ## If true, use a Persistent Volume Claim, If false, use emptyDir
    ##
    enabled: true
    # Enable persistence using an existing PVC
    # existingClaim:
    # mountPath:
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
    ##

  ## Configure MySQL with a custom my.cnf file
  ## ref: https://mysql.com/kb/en/mysql/configuring-mysql-with-mycnf/#example-of-configuration-file
  ##
  config: |-
    [mysqld]
    skip-name-resolve
    explicit_defaults_for_timestamp
    basedir=/opt/bitnami/mariadb
    port=3306
    socket=/opt/bitnami/mariadb/tmp/mysql.sock
    tmpdir=/opt/bitnami/mariadb/tmp
    max_allowed_packet=16M
    bind-address=0.0.0.0
    pid-file=/opt/bitnami/mariadb/tmp/mysqld.pid
    log-error=/opt/bitnami/mariadb/logs/mysqld.log
    character-set-server=UTF8
    collation-server=utf8_general_ci

    [client]
    port=3306
    socket=/opt/bitnami/mariadb/tmp/mysql.sock
    default-character-set=UTF8

    [manager]
    port=3306
    socket=/opt/bitnami/mariadb/tmp/mysql.sock
    pid-file=/opt/bitnami/mariadb/tmp/mysqld.pid

  ## Configure master resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources: {}
  livenessProbe:
    enabled: true
    ##
    ## Initializing the database could take some time
    initialDelaySeconds: 120
    ##
    ## Default Kubernetes values
    periodSeconds: 10
    timeoutSeconds: 1
    successThreshold: 1
    failureThreshold: 3
  readinessProbe:
    enabled: true
    initialDelaySeconds: 30
    ##
    ## Default Kubernetes values
    periodSeconds: 10
    timeoutSeconds: 1
    successThreshold: 1
    failureThreshold: 3

slave:
  replicas: 1

  ## Affinity for pod assignment
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
  ##
  affinity: {}

  ## Kept for backwards compatibility. You can now disable it by removing it.
  ## if you wish to set it through slave.affinity.podAntiAffinity instead.
  ##
  antiAffinity: soft

  ## Tolerations for pod assignment
  ## Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
  ##
  tolerations: []

  persistence:
    ## If true, use a Persistent Volume Claim, If false, use emptyDir
    ##
    enabled: true
    # storageClass: "-"
    annotations:
    accessModes:
      - ReadWriteOnce
    ## Persistent Volume size
    ##
    size: 8Gi
    ##

  ## Configure MySQL slave with a custom my.cnf file
  ## ref: https://mysql.com/kb/en/mysql/configuring-mysql-with-mycnf/#example-of-configuration-file
  ##
  config: |-
    [mysqld]
    skip-name-resolve
    explicit_defaults_for_timestamp
    basedir=/opt/bitnami/mariadb
    port=3306
    socket=/opt/bitnami/mariadb/tmp/mysql.sock
    tmpdir=/opt/bitnami/mariadb/tmp
    max_allowed_packet=16M
    bind-address=0.0.0.0
    pid-file=/opt/bitnami/mariadb/tmp/mysqld.pid
    log-error=/opt/bitnami/mariadb/logs/mysqld.log
    character-set-server=UTF8
    collation-server=utf8_general_ci

    [client]
    port=3306
    socket=/opt/bitnami/mariadb/tmp/mysql.sock
    default-character-set=UTF8

    [manager]
    port=3306
    socket=/opt/bitnami/mariadb/tmp/mysql.sock
    pid-file=/opt/bitnami/mariadb/tmp/mysqld.pid

  ##
  ## Configure slave resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources: {}
  livenessProbe:
    enabled: true
    ##
    ## Initializing the database could take some time
    initialDelaySeconds: 120
    ##
    ## Default Kubernetes values
    periodSeconds: 10
    timeoutSeconds: 1
    successThreshold: 1
    failureThreshold: 3
  readinessProbe:
    enabled: true
    initialDelaySeconds: 45
    ##
    ## Default Kubernetes values
    periodSeconds: 10
    timeoutSeconds: 1
    successThreshold: 1
    failureThreshold: 3

metrics:
  enabled: false
  image:
    registry: docker.io
    repository: prom/mysqld-exporter
    tag: v0.10.0
    pullPolicy: IfNotPresent
  resources: {}
  annotations:
    prometheus.io/scrape: 'true'
    prometheus.io/port: '9104'
```

</details>

---

# MariaDB

[MariaDB](https://mariadb.org) is one of the most popular database servers in the world. It’s made by the original developers of MySQL and guaranteed to stay open source. Notable users include Wikipedia, Facebook and Google.

MariaDB is developed as open source software and as a relational database it provides an SQL interface for accessing data. The latest versions of MariaDB also include GIS and JSON features.

## TL;DR

```bash
$ helm install stable/mariadb
```

## Introduction

This chart bootstraps a [MariaDB](https://github.com/bitnami/bitnami-docker-mariadb) replication cluster deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/mariadb
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

The following table lists the configurable parameters of the MariaDB chart and their default values.

| Parameter                                   | Description                                                   | Default                                                           |
| ------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------- |
| `image.registry`                            | MariaDB image registry                                        | `docker.io`                                                       |
| `image.repository`                          | MariaDB Image name                                            | `bitnami/mariadb`                                                 |
| `image.tag`                                 | MariaDB Image tag                                             | `{VERSION}`                                                       |
| `image.pullPolicy`                          | MariaDB image pull policy                                     | `Always` if `imageTag` is `latest`, else `IfNotPresent`           |
| `image.pullSecrets`                         | Specify image pull secrets                                    | `nil` (does not add image pull secrets to deployed pods)          |
| `service.type`                              | Kubernetes service type                                       | `ClusterIP`                                                       |
| `service.port`                              | MySQL service port                                            | `3306`                                                            |
| `rootUser.password`                         | Password for the `root` user                                  | _random 10 character alphanumeric string_                         |
| `rootUser.forcePassword`                    | Force users to specify a password                             | `false`                                                           |
| `db.user`                                   | Username of new user to create                                | `nil`                                                             |
| `db.password`                               | Password for the new user                                     | _random 10 character alphanumeric string if `db.user` is defined_ |
| `db.name`                                   | Name for new database to create                               | `my_database`                                                     |
| `replication.enabled`                       | MariaDB replication enabled                                   | `true`                                                            |
| `replication.user`                          | MariaDB replication user                                      | `replicator`                                                      |
| `replication.password`                      | MariaDB replication user password                             | _random 10 character alphanumeric string_                         |
| `master.affinity`                           | Master affinity (in addition to master.antiAffinity when set) | `{}`                                                              |
| `master.antiAffinity`                       | Master pod anti-affinity policy                               | `soft`                                                            |
| `master.tolerations`                        | List of node taints to tolerate (master)                      | `[]`                                                              |
| `master.persistence.enabled`                | Enable persistence using a `PersistentVolumeClaim`            | `true`                                                            |
| `master.persistence.existingClaim`          | Provide an existing `PersistentVolumeClaim`                   | `nil`                                                             |
| `master.persistence.mountPath`              | Configure existing `PersistentVolumeClaim` mount path         | `""`                                                              |
| `master.persistence.annotations`            | Persistent Volume Claim annotations                           | `{}`                                                              |
| `master.persistence.storageClass`           | Persistent Volume Storage Class                               | ``                                                                |
| `master.persistence.accessModes`            | Persistent Volume Access Modes                                | `[ReadWriteOnce]`                                                 |
| `master.persistence.size`                   | Persistent Volume Size                                        | `8Gi`                                                             |
| `master.config`                             | Config file for the MariaDB Master server                     | `_default values in the values.yaml file_`                        |
| `master.resources`                          | CPU/Memory resource requests/limits for master node           | `{}`                                                              |
| `master.livenessProbe.enabled`              | Turn on and off liveness probe (master)                       | `true`                                                            |
| `master.livenessProbe.initialDelaySeconds`  | Delay before liveness probe is initiated (master)             | `120`                                                             |
| `master.livenessProbe.periodSeconds`        | How often to perform the probe (master)                       | `10`                                                              |
| `master.livenessProbe.timeoutSeconds`       | When the probe times out (master)                             | `1`                                                               |
| `master.livenessProbe.successThreshold`     | Minimum consecutive successes for the probe (master)          | `1`                                                               |
| `master.livenessProbe.failureThreshold`     | Minimum consecutive failures for the probe (master)           | `3`                                                               |
| `master.readinessProbe.enabled`             | Turn on and off readiness probe (master)                      | `true`                                                            |
| `master.readinessProbe.initialDelaySeconds` | Delay before readiness probe is initiated (master)            | `30`                                                              |
| `master.readinessProbe.periodSeconds`       | How often to perform the probe (master)                       | `10`                                                              |
| `master.readinessProbe.timeoutSeconds`      | When the probe times out (master)                             | `1`                                                               |
| `master.readinessProbe.successThreshold`    | Minimum consecutive successes for the probe (master)          | `1`                                                               |
| `master.readinessProbe.failureThreshold`    | Minimum consecutive failures for the probe (master)           | `3`                                                               |
| `slave.replicas`                            | Desired number of slave replicas                              | `1`                                                               |
| `slave.affinity`                            | Slave affinity (in addition to slave.antiAffinity when set)   | `{}`                                                              |
| `slave.antiAffinity`                        | Slave pod anti-affinity policy                                | `soft`                                                            |
| `slave.tolerations`                         | List of node taints to tolerate for (slave)                   | `[]`                                                              |
| `slave.persistence.enabled`                 | Enable persistence using a `PersistentVolumeClaim`            | `true`                                                            |
| `slave.persistence.annotations`             | Persistent Volume Claim annotations                           | `{}`                                                              |
| `slave.persistence.storageClass`            | Persistent Volume Storage Class                               | ``                                                                |
| `slave.persistence.accessModes`             | Persistent Volume Access Modes                                | `[ReadWriteOnce]`                                                 |
| `slave.persistence.size`                    | Persistent Volume Size                                        | `8Gi`                                                             |
| `slave.config`                              | Config file for the MariaDB Slave replicas                    | `_default values in the values.yaml file_`                        |
| `slave.resources`                           | CPU/Memory resource requests/limits for slave node            | `{}`                                                              |
| `slave.livenessProbe.enabled`               | Turn on and off liveness probe (slave)                        | `true`                                                            |
| `slave.livenessProbe.initialDelaySeconds`   | Delay before liveness probe is initiated (slave)              | `120`                                                             |
| `slave.livenessProbe.periodSeconds`         | How often to perform the probe (slave)                        | `10`                                                              |
| `slave.livenessProbe.timeoutSeconds`        | When the probe times out (slave)                              | `1`                                                               |
| `slave.livenessProbe.successThreshold`      | Minimum consecutive successes for the probe (slave)           | `1`                                                               |
| `slave.livenessProbe.failureThreshold`      | Minimum consecutive failures for the probe (slave)            | `3`                                                               |
| `slave.readinessProbe.enabled`              | Turn on and off readiness probe (slave)                       | `true`                                                            |
| `slave.readinessProbe.initialDelaySeconds`  | Delay before readiness probe is initiated (slave)             | `45`                                                              |
| `slave.readinessProbe.periodSeconds`        | How often to perform the probe (slave)                        | `10`                                                              |
| `slave.readinessProbe.timeoutSeconds`       | When the probe times out (slave)                              | `1`                                                               |
| `slave.readinessProbe.successThreshold`     | Minimum consecutive successes for the probe (slave)           | `1`                                                               |
| `slave.readinessProbe.failureThreshold`     | Minimum consecutive failures for the probe (slave)            | `3`                                                               |
| `metrics.enabled`                           | Start a side-car prometheus exporter                          | `false`                                                           |
| `metrics.image.registry`                    | Exporter image registry                                       | `docker.io`                                                       |
| `metrics.image.repository`                  | Exporter image name                                           | `prom/mysqld-exporter`                                            |
| `metrics.image.tag`                         | Exporter image tag                                            | `v0.10.0`                                                         |
| `metrics.image.pullPolicy`                  | Exporter image pull policy                                    | `IfNotPresent`                                                    |
| `metrics.resources`                         | Exporter resource requests/limit                              | `nil`                                                             |

The above parameters map to the env variables defined in [bitnami/mariadb](http://github.com/bitnami/bitnami-docker-mariadb). For more information please refer to the [bitnami/mariadb](http://github.com/bitnami/bitnami-docker-mariadb) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set root.password=secretpassword,user.database=app_database \
    stable/mariadb
```

The above command sets the MariaDB `root` account password to `secretpassword`. Additionally it creates a database named `my_database`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/mariadb
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Initialize a fresh instance

The [Bitnami MariaDB](https://github.com/bitnami/bitnami-docker-mariadb) image allows you to use your custom scripts to initialize a fresh instance. In order to execute the scripts, they must be located inside the chart folder `files/docker-entrypoint-initdb.d` so they can be consumed as a ConfigMap.

The allowed extensions are `.sh`, `.sql` and `.sql.gz`.

## Persistence

The [Bitnami MariaDB](https://github.com/bitnami/bitnami-docker-mariadb) image stores the MariaDB data and configurations at the `/bitnami/mariadb` path of the container.

The chart mounts a [Persistent Volume](kubernetes.io/docs/user-guide/persistent-volumes/) volume at this location. The volume is created using dynamic volume provisioning, by default. An existing PersistentVolumeClaim can be defined.

## Upgrading

It's necessary to set the `rootUser.password` parameter when upgrading for readiness/liveness probes to work properly. When you install this chart for the first time, some notes will be displayed providing the credentials you must use under the 'Administrator credentials' section. Please note down the password and run the command below to upgrade your chart:

```bash
$ helm upgrade my-release stable/mariadb --set rootUser.password=[ROOT_PASSWORD]
```

| Note: you need to substitue the placeholder _[ROOT_PASSWORD]_ with the value obtained in the installation notes.

### To 5.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 5.0.0. The following example assumes that the release name is mariadb:

```console
$ kubectl delete statefulset opencart-mariadb --cascade=false
```
