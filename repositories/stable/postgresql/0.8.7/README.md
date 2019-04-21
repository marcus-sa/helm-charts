# `@helm-charts/stable-postgresql`

Object-relational database management system (ORDBMS) with an emphasis on extensibility and on standards-compliance.

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | postgresql |
| Chart Version       | 0.8.7      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## postgres image repository
image: 'postgres'
## postgres image version
## ref: https://hub.docker.com/r/library/postgres/tags/
##
imageTag: '9.6.2'

## Specify a imagePullPolicy
## 'Always' if imageTag is 'latest', else set to 'IfNotPresent'
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
# imagePullPolicy:

## Specify imagePullSecrets
## ref: https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod
##
# imagePullSecrets: myregistrykey

## Create a database user
## Default: postgres
# postgresUser:
## Default: random 10 character string
# postgresPassword:

## Create a database
## Default: the postgres user
# postgresDatabase:

## Specify initdb arguments, e.g. --data-checksums
## ref: https://github.com/docker-library/docs/blob/master/postgres/content.md#postgres_initdb_args
## ref: https://www.postgresql.org/docs/current/static/app-initdb.html
# postgresInitdbArgs:

## Persist data to a persitent volume
persistence:
  enabled: true

  ## A manually managed Persistent Volume and Claim
  ## Requires persistence.enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:

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
  subPath: 'postgresql-db'

  # annotations: {}

metrics:
  enabled: false
  image: wrouesnel/postgres_exporter
  imageTag: v0.1.1
  imagePullPolicy: IfNotPresent
  resources:
    requests:
      memory: 256Mi
      cpu: 100m
    ## Define additional custom metrics
    ## ref: https://github.com/wrouesnel/postgres_exporter#adding-new-metrics-via-a-config-file
    # customMetrics:
    #   pg_database:
    #     query: "SELECT d.datname AS name, CASE WHEN pg_catalog.has_database_privilege(d.datname, 'CONNECT') THEN pg_catalog.pg_database_size(d.datname) ELSE 0 END AS size FROM pg_catalog.pg_database d where datname not in ('template0', 'template1', 'postgres')"
    #     metrics:
    #       - name:
    #           usage: "LABEL"
    #           description: "Name of the database"
    #       - size_bytes:
    #           usage: "GAUGE"
    #           description: "Size of the database in bytes"

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 256Mi
    cpu: 100m

service:
  type: ClusterIP
  port: 5432
  externalIPs: []

networkPolicy:
  ## Enable creation of NetworkPolicy resources.
  ##
  enabled: false

  ## The Policy model to apply. When set to false, only pods with the correct
  ## client label will have network access to the port PostgreSQL is listening
  ## on. When true, PostgreSQL will accept connections from any source
  ## (with the correct destination port).
  ##
  allowExternal: true

## Node labels and tolerations for pod assignment
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#taints-and-tolerations-beta-feature
nodeSelector: {}
tolerations: []
affinity: {}
```

</details>

---

# PostgreSQL

[PostgreSQL](https://postgresql.org) is a powerful, open source object-relational database system. It has more than 15 years of active development and a proven architecture that has earned it a strong reputation for reliability, data integrity, and correctness.

## TL;DR;

```bash
$ helm install stable/postgresql
```

## Introduction

This chart bootstraps a [PostgreSQL](https://github.com/docker-library/postgres) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure (Only when persisting data)

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/postgresql
```

The command deploys PostgreSQL on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the PostgresSQL chart and their default values.

| Parameter                     | Description                                      | Default                                                 |
| ----------------------------- | ------------------------------------------------ | ------------------------------------------------------- |
| `image`                       | `postgres` image repository                      | `postgres`                                              |
| `imageTag`                    | `postgres` image tag                             | `9.6.2`                                                 |
| `imagePullPolicy`             | Image pull policy                                | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `imagePullSecrets`            | Image pull secrets                               | `nil`                                                   |
| `postgresUser`                | Username of new user to create.                  | `postgres`                                              |
| `postgresPassword`            | Password for the new user.                       | random 10 characters                                    |
| `postgresDatabase`            | Name for new database to create.                 | `postgres`                                              |
| `postgresInitdbArgs`          | Initdb Arguments                                 | `nil`                                                   |
| `persistence.enabled`         | Use a PVC to persist data                        | `true`                                                  |
| `persistence.existingClaim`   | Provide an existing PersistentVolumeClaim        | `nil`                                                   |
| `persistence.storageClass`    | Storage class of backing PVC                     | `nil` (uses alpha storage class annotation)             |
| `persistence.accessMode`      | Use volume as ReadOnly or ReadWrite              | `ReadWriteOnce`                                         |
| `persistence.annotations`     | Persistent Volume annotations                    | `{}`                                                    |
| `persistence.size`            | Size of data volume                              | `8Gi`                                                   |
| `persistence.subPath`         | Subdirectory of the volume to mount at           | `postgresql-db`                                         |
| `resources`                   | CPU/Memory resource requests/limits              | Memory: `256Mi`, CPU: `100m`                            |
| `metrics.enabled`             | Start a side-car prometheus exporter             | `false`                                                 |
| `metrics.image`               | Exporter image                                   | `wrouesnel/postgres_exporter`                           |
| `metrics.imageTag`            | Exporter image                                   | `v0.1.1`                                                |
| `metrics.imagePullPolicy`     | Exporter image pull policy                       | `IfNotPresent`                                          |
| `metrics.resources`           | Exporter resource requests/limit                 | Memory: `256Mi`, CPU: `100m`                            |
| `metrics.customMetrics`       | Additional custom metrics                        | `nil`                                                   |
| `service.externalIPs`         | External IPs to listen on                        | `[]`                                                    |
| `service.port`                | TCP port                                         | `5432`                                                  |
| `service.type`                | k8s service type exposing ports, e.g. `NodePort` | `ClusterIP`                                             |
| `networkPolicy.enabled`       | Enable NetworkPolicy                             | `false`                                                 |
| `networkPolicy.allowExternal` | Don't require client label for connections       | `true`                                                  |
| `nodeSelector`                | Node labels for pod assignment                   | {}                                                      |
| `affinity`                    | Affinity settings for pod assignment             | {}                                                      |
| `tolerations`                 | Toleration labels for pod assignment             | []                                                      |

The above parameters map to the env variables defined in [postgres](http://github.com/docker-library/postgres). For more information please refer to the [postgres](http://github.com/docker-library/postgres) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set postgresUser=my-user,postgresPassword=secretpassword,postgresDatabase=my-database \
    stable/postgresql
```

The above command creates a PostgresSQL user named `root` with password `secretpassword`. Additionally it creates a database named `my-database`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/postgresql
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [postgres](https://github.com/docker-library/postgres) image stores the PostgreSQL data and configurations at the `/var/lib/postgresql/data/pgdata` path of the container.

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) volume at this location. The volume is created using dynamic volume provisioning. If the PersistentVolumeClaim should not be managed by the chart, define `persistence.existingClaim`.

### Existing PersistentVolumeClaims

1. Create the PersistentVolume
1. Create the PersistentVolumeClaim
1. Install the chart

```bash
$ helm install --set persistence.existingClaim=PVC_NAME postgresql
```

The volume defaults to mount at a subdirectory of the volume instead of the volume root to avoid the volume's hidden directories from interfering with `initdb`. If you are upgrading this chart from before version `0.4.0`, set `persistence.subPath` to `""`.

## Metrics

The chart optionally can start a metrics exporter for [prometheus](https://prometheus.io). The metrics endpoint (port 9187) is not exposed and it is expected that the metrics are collected from inside the k8s cluster using something similar as the described in the [example Prometheus scrape configuration](https://github.com/prometheus/prometheus/blob/master/documentation/examples/prometheus-kubernetes.yml).

The exporter allows to create custom metrics from additional SQL queries. See the Chart's `values.yaml` for an example and consult the [exporters documentation](https://github.com/wrouesnel/postgres_exporter#adding-new-metrics-via-a-config-file) for more details.

## NetworkPolicy

To enable network policy for PostgreSQL,
install [a networking plugin that implements the Kubernetes
NetworkPolicy spec](https://kubernetes.io/docs/tasks/administer-cluster/declare-network-policy#before-you-begin),
and set `networkPolicy.enabled` to `true`.

For Kubernetes v1.5 & v1.6, you must also turn on NetworkPolicy by setting
the DefaultDeny namespace annotation. Note: this will enforce policy for _all_ pods in the namespace:

    kubectl annotate namespace default "net.beta.kubernetes.io/network-policy={\"ingress\":{\"isolation\":\"DefaultDeny\"}}"

With NetworkPolicy enabled, traffic will be limited to just port 5432.

For more precise policy, set `networkPolicy.allowExternal=false`. This will
only allow pods with the generated client label to connect to PostgreSQL.
This label will be displayed in the output of a successful install.
