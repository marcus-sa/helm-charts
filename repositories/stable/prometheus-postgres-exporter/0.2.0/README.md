# `@helm-charts/stable-prometheus-postgres-exporter`

A Helm chart for prometheus postgres-exporter

| Field               | Value                        |
| ------------------- | ---------------------------- |
| Repository Name     | stable                       |
| Chart Name          | prometheus-postgres-exporter |
| Chart Version       | 0.2.0                        |
| NPM Package Version | 0.1.0                        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for prometheus-postgres-exporter.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: wrouesnel/postgres_exporter
  tag: v0.4.6
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80
  targetPort: 9187

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #   cpu: 100m
  #    memory: 128Mi
  # requests:
  #   cpu: 100m
  #   memory: 128Mi

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

config:
  datasource:
    host:
    user:
    password:
    port: '5432'
    sslmode: disable
  # this are the defaults queries that the exporter will run, extracted from: https://github.com/wrouesnel/postgres_exporter/blob/master/queries.yaml
  queries: |-
    pg_replication:
      query: "SELECT EXTRACT(EPOCH FROM (now() - pg_last_xact_replay_timestamp()))::INT as lag"
      metrics:
        - lag:
            usage: "GAUGE"
            description: "Replication lag behind master in seconds"

    pg_postmaster:
      query: "SELECT pg_postmaster_start_time as start_time_seconds from pg_postmaster_start_time()"
      metrics:
        - start_time_seconds:
            usage: "GAUGE"
            description: "Time at which postmaster started"

    pg_stat_user_tables:
      query: "SELECT schemaname, relname, seq_scan, seq_tup_read, idx_scan, idx_tup_fetch, n_tup_ins, n_tup_upd, n_tup_del, n_tup_hot_upd, n_live_tup, n_dead_tup, n_mod_since_analyze, last_vacuum, last_autovacuum, last_analyze, last_autoanalyze, vacuum_count, autovacuum_count, analyze_count, autoanalyze_count FROM pg_stat_user_tables"
      metrics:
        - schemaname:
            usage: "LABEL"
            description: "Name of the schema that this table is in"
        - relname:
            usage: "LABEL"
            description: "Name of this table"
        - seq_scan:
            usage: "COUNTER"
            description: "Number of sequential scans initiated on this table"
        - seq_tup_read:
            usage: "COUNTER"
            description: "Number of live rows fetched by sequential scans"
        - idx_scan:
            usage: "COUNTER"
            description: "Number of index scans initiated on this table"
        - idx_tup_fetch:
            usage: "COUNTER"
            description: "Number of live rows fetched by index scans"
        - n_tup_ins:
            usage: "COUNTER"
            description: "Number of rows inserted"
        - n_tup_upd:
            usage: "COUNTER"
            description: "Number of rows updated"
        - n_tup_del:
            usage: "COUNTER"
            description: "Number of rows deleted"
        - n_tup_hot_upd:
            usage: "COUNTER"
            description: "Number of rows HOT updated (i.e., with no separate index update required)"
        - n_live_tup:
            usage: "GAUGE"
            description: "Estimated number of live rows"
        - n_dead_tup:
            usage: "GAUGE"
            description: "Estimated number of dead rows"
        - n_mod_since_analyze:
            usage: "GAUGE"
            description: "Estimated number of rows changed since last analyze"
        - last_vacuum:
            usage: "GAUGE"
            description: "Last time at which this table was manually vacuumed (not counting VACUUM FULL)"
        - last_autovacuum:
            usage: "GAUGE"
            description: "Last time at which this table was vacuumed by the autovacuum daemon"
        - last_analyze:
            usage: "GAUGE"
            description: "Last time at which this table was manually analyzed"
        - last_autoanalyze:
            usage: "GAUGE"
            description: "Last time at which this table was analyzed by the autovacuum daemon"
        - vacuum_count:
            usage: "COUNTER"
            description: "Number of times this table has been manually vacuumed (not counting VACUUM FULL)"
        - autovacuum_count:
            usage: "COUNTER"
            description: "Number of times this table has been vacuumed by the autovacuum daemon"
        - analyze_count:
            usage: "COUNTER"
            description: "Number of times this table has been manually analyzed"
        - autoanalyze_count:
            usage: "COUNTER"
            description: "Number of times this table has been analyzed by the autovacuum daemon"

    pg_database:
      query: " SELECT pg_database.datname, pg_database_size(pg_database.datname) as size FROM pg_database"
      metrics:
        - datname:
            usage: "LABEL"
            description: "Name of the database"
        - size:
            usage: "GAUGE"
            description: "Disk space used by the database"

nodeSelector: {}

tolerations: []

affinity: {}

annotations: {}
```

</details>

---

# Prometheus Postgres Exporter

- Installs prometheus [postgres exporter](https://github.com/wrouesnel/postgres_exporter)

## TL;DR;

```console
$ helm install stable/prometheus-postgres-exporter
```

## Introduction

This chart bootstraps a prometheus [postgres exporter](https://github.com/wrouesnel/postgres_exporter) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/prometheus-postgres-exporter
```

The command deploys postgres exporter on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the postgres Exporter chart and their default values.

| Parameter               | Description                                            | Default                                                                                               |
| ----------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `image`                 | Image                                                  | `wrouesnel/postgres_exporter`                                                                         |
| `imageTag`              | Image tag                                              | `v0.4.6`                                                                                              |
| `imagePullPolicy`       | Image pull policy                                      | `IfNotPresent`                                                                                        |
| `service.type`          | Service type                                           | `ClusterIP`                                                                                           |
| `service.port`          | The service port                                       | `80`                                                                                                  |
| `service.targetPort`    | The target port of the container                       | `9187`                                                                                                |
| `resources`             |                                                        | `{}`                                                                                                  |
| `config.datasource`     | Postgresql datasource configuration                    |                                                                                                       |
| `config.queries`        | SQL queries that the exporter will run                 | [postgres exporter defaults](https://github.com/wrouesnel/postgres_exporter/blob/master/queries.yaml) |
| `serviceAccount.create` | Specifies whether a service account should be created. | `true`                                                                                                |
| `serviceAccount.name`   | Name of the service account.                           |                                                                                                       |
| `tolerations`           | Add tolerations                                        | `[]`                                                                                                  |
| `nodeSelector`          | node labels for pod assignment                         | `{}`                                                                                                  |
| `affinity`              | node/pod affinities                                    | `{}`                                                                                                  |
| `annotations`           | Deployment annotations                                 | `{}`                                                                                                  |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set serviceAccount.name=postgres  \
    stable/prometheus-postgres-exporter
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/prometheus-postgres-exporter
```
