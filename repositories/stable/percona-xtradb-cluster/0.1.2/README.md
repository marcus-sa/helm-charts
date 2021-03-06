# `@helm-charts/stable-percona-xtradb-cluster`

free, fully compatible, enhanced, open source drop-in replacement for MySQL with Galera Replication (xtradb)

| Field               | Value                  |
| ------------------- | ---------------------- |
| Repository Name     | stable                 |
| Chart Name          | percona-xtradb-cluster |
| Chart Version       | 0.1.2                  |
| NPM Package Version | 0.1.0                  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for Percona XtraDB Cluster

## percona image and version
## ref: https://hub.docker.com/r/percona/percona-xtradb-cluster/tags/
image:
  repository: 'percona/percona-xtradb-cluster'
  tag: '5.7.19'
  pullPolicy: IfNotPresent

# Desired number of members of xtradb cluster
replicas: 3

## Specify password for root user
##
# mysqlRootPassword: not-a-secure-password

## Specify password for xtradb backup user
##
# xtraBackupPassword: replicate-my-data

## Uncomment to create a database user
##
# mysqlUser: test
# mysqlPassword: test

## Allow unauthenticated access, uncomment to enable
##
# mysqlAllowEmptyPassword: true

## Uncomment to Create a database
##
# mysqlDatabase: test

## hosts to allow root user access from
# set to "127.0.0.1" to deny remote root.
allowRootFrom: '%'

## Persist data to a persitent volume
persistence:
  enabled: false
  ## percona data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 8Gi

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
# resources:
#  requests:
#    memory: 256Mi
#    cpu: 100m

configFiles:
  node.cnf: |+
    [mysqld]
    datadir=/var/lib/mysql
    default_storage_engine=InnoDB
    binlog_format=ROW
    innodb_flush_log_at_trx_commit  = 0
    innodb_flush_method             = O_DIRECT
    innodb_file_per_table           = 1
    innodb_autoinc_lock_mode=2
    bind_address = 0.0.0.0
    wsrep_slave_threads=2
    wsrep_cluster_address=gcomm://
    wsrep_provider=/usr/lib/galera3/libgalera_smm.so
    wsrep_cluster_name=galera
    wsrep_sst_method=xtrabackup-v2

## When set to true will create sidecar for `prom/mysqld-exporter`
## metrics exporting
metricsExporter: false

## When set to true will create sidecar to tail mysql log
logTail: true
```

</details>

---

# Percona XtraDB Cluster

[Percona Server](https://MySQL.org) for MySQL?? is a free, fully compatible, enhanced, open source drop-in replacement for MySQL that provides superior performance, scalability and instrumentation. With over 3,000,000 downloads, Percona Server for MySQL's self-tuning algorithms and support for extremely high-performance hardware delivers excellent performance and reliability.

Notable users include Netflix, Amazon Web Services, Alcatel-Lucent, and Smug Mug.

## Introduction

This chart, based off of the Percona chart (which in turn is based off the MySQL chart), bootstraps a multi-node Percona XtraDB Cluster deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

The chart exploits the deterministic nature of StatefulSet and KubeDNS to ensure the cluster bootstrap is performed in the correct order.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/percona-xtradb-cluster
```

The command deploys a Percona XtraDB Cluster on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

The root password can only be used inside each `pod`. You should set a default `mysqlDatabase`, `mysqlUser` and `mysqlPassword` in the values.yaml file.

By default an **insecure** password will be generated for the root and replication users. If you'd like to set your own password change the `mysqlRootPassword` or `xtraBackupPassword` respectively
in the values.yaml.

You can retrieve your root password (usable only via localhost in each pod) by running the following command. Make sure to replace [YOUR_RELEASE_NAME]:

    printf $(printf '\%o' `kubectl get secret [YOUR_RELEASE_NAME]-percona -o jsonpath="{.data.mysql-root-password[*]}"`)

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Percona chart and their default values.

| Parameter                  | Description                                                                                                        | Default                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| `image.repository`         | `percona-xtradb-cluster` image Repo.                                                                               | 5.7.19 release                            |
| `image.tag`                | `percona-xtradb-cluster` image tag.                                                                                | `percona/percona-xtradb-cluster`          |
| `image.pullPolicy`         | Image pull policy                                                                                                  | `IfNotPresent`                            |
| `replicas`                 | Number of pods to join the Percona XtraDB Cluster                                                                  | 3                                         |
| `allowRootFrom`            | Remote hosts to allow root access, set to `127.0.0.1` to disable remote root                                       | `%`                                       |
| `mysqlRootPassword`        | Password for the `root` user.                                                                                      | `not-a-secure-password`                   |
| `xtraBackupPassword`       | Password for the `xtrabackup` user.                                                                                | `replicate-my-data`                       |
| `mysqlUser`                | Username of new user to create.                                                                                    | `nil`                                     |
| `mysqlPassword`            | Password for the new user.                                                                                         | `nil`                                     |
| `mysqlDatabase`            | Name for new database to create.                                                                                   | `nil`                                     |
| `persistence.enabled`      | Create a volume to store data                                                                                      | false                                     |
| `persistence.size`         | Size of persistent volume claim                                                                                    | 8Gi RW                                    |
| `persistence.storageClass` | Type of persistent volume claim                                                                                    | nil (uses alpha storage class annotation) |
| `persistence.accessMode`   | ReadWriteOnce or ReadOnly                                                                                          | ReadWriteOnce                             |
| `nodeSelector`             | Node labels for pod assignment                                                                                     | `{}`                                      |
| `resources`                | CPU/Memory resource requests/limits                                                                                | Memory: `256Mi`, CPU: `100m`              |
| `configFiles`              | files to write to /etc/mysql/conf.d                                                                                | see values.yaml                           |
| `logTail`                  | if set to true runs a container to tail /var/log/mysqld.log in the pod                                             | true                                      |
| `metricsExporter`          | if set to true runs a [mysql metrics exporter](https://github.com/prometheus/mysqld_exporter) container in the pod | false                                     |

Some of the parameters above map to the env variables defined in the [Percona XtraDB Cluster DockerHub image](https://hub.docker.com/r/percona/percona-xtradb-cluster/).

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set mysqlRootPassword=secretpassword,mysqlUser=my-user,mysqlPassword=my-password,mysqlDatabase=my-database \
    stable/percona-xtradb-cluster
```

The above command sets the MySQL `root` account password to `secretpassword`. Additionally it creates a standard database user named `my-user`, with the password `my-password`, who has access to a database named `my-database`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/percona-xtradb-cluster
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Percona XtraDB Cluster DockerHub image](https://hub.docker.com/r/percona/percona-xtradb-cluster/) image stores the MySQL data and configurations at the `/var/lib/mysql` path of the container.

By default, an emptyDir volume is mounted at that location.

> _"An emptyDir volume is first created when a Pod is assigned to a Node, and exists as long as that Pod is running on that node. When a Pod is removed from a node for any reason, the data in the emptyDir is deleted forever."_

You can change the values.yaml to enable persistence and use a PersistentVolumeClaim instead.
