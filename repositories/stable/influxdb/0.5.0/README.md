# `@helm-charts/stable-influxdb`

Scalable datastore for metrics, events, and real-time analytics.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | influxdb |
| Chart Version       | 0.5.0    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## influxdb image version
## ref: https://hub.docker.com/r/library/influxdb/tags/
image:
  repo: 'influxdb'
  tag: '1.2-alpine'
  pullPolicy: IfNotPresent

## Specify a service type
## NodePort is default
## ref: http://kubernetes.io/docs/user-guide/services/
##
service:
  ## Add annotations to service
  # annotations: {}
  type: ClusterIP

## Persist data to a persistent volume
##
persistence:
  enabled: false
  ## If true will use an existing PVC instead of creating one
  # useExisting: false
  ## Name of existing PVC to be used in the influx deployment
  # name:
  ## influxdb data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 8Gi

## Create default user through Kubernetes job
## Defaults indicated below
##
setDefaultUser:
  enabled: false
  ## Image of the container used for job
  ## Default: appropriate/curl:latest
  ##
  # image: appropriate/curl:latest
  ## Deadline for job so it does not retry forever.
  ## Default: activeDeadline: 300
  ##
  # activeDeadline: 300
  ## Restart policy for job
  ## Default: OnFailure
  # restartPolicy: OnFailure
  # user:
  ## The user name
  ## Default: "admin"
  # username: "admin"
  ## User password
  ## Default: (Randomly generated 10 characters of Ascii)
  # password:
  ## User privileges
  ## Default: "WITH ALL PRIVILEGES"
  # privileges: "WITH ALL PRIVILEGES"

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
resources:
  requests:
    memory: 256Mi
    cpu: 0.1
  limits:
    memory: 16Gi
    cpu: 8

## Change InfluxDB configuration paramaters below:
## Defaults are indicated
## ref: https://docs.influxdata.com/influxdb/v1.1/administration/config/
config:
  reporting_disabled: false
  bind_address: 8088
  storage_directory: /var/lib/influxdb
  meta:
    retention_autocreate: true
    logging_enabled: true
  data:
    query_log_enabled: true
    cache_max_memory_size: 1073741824
    cache_snapshot_memory_size: 26214400
    cache_snapshot_write_cold_duration: 10m0s
    compact_full_write_cold_duration: 4h0m0s
    max_series_per_database: 1000000
    max_values_per_tag: 100000
    trace_logging_enabled: false
  coordinator:
    write_timeout: 10s
    max_concurrent_queries: 0
    query_timeout: 0s
    log_queries_after: 0s
    max_select_point: 0
    max_select_series: 0
    max_select_buckets: 0
  retention:
    enabled: true
    check_interval: 30m0s
  shard_precreation:
    enabled: true
    check_interval: 10m0s
    advance_period: 30m0s
  admin:
    enabled: false
    bind_address: 8083
    https_enabled: false
    https_certificate: /etc/ssl/influxdb.pem
  monitor:
    store_enabled: true
    store_database: _internal
    store_interval: 10s
  subscriber:
    enabled: true
    http_timeout: 30s
    insecure_skip_verify: false
    ca_certs: ''
    write_concurrency: 40
    write_buffer_size: 1000
  http:
    enabled: true
    bind_address: 8086
    auth_enabled: false
    log_enabled: true
    write_tracing: false
    pprof_enabled: true
    https_enabled: false
    https_certificate: /etc/ssl/influxdb.pem
    https_private_key: ''
    max_row_limit: 10000
    max_connection_limit: 0
    shared_secret: 'beetlejuicebeetlejuicebeetlejuice'
    realm: InfluxDB
    unix_socket_enabled: false
    bind_socket: /var/run/influxdb.sock
  graphite:
    enabled: false
    bind_address: 2003
    database: graphite
    retention_policy: autogen
    protocol: tcp
    batch_size: 5000
    batch_pending: 10
    batch_timeout: 1s
    consistency_level: one
    separator: .
    udp_read_buffer: 0
  collectd:
    enabled: false
    bind_address: 25826
    database: collectd
    retention_policy: autogen
    batch_size: 5000
    batch_pending: 10
    batch_timeout: 10s
    read_buffer: 0
    typesdb: /usr/share/collectd/types.db
    security_level: none
    auth_file: /etc/collectd/auth_file
  opentsdb:
    enabled: false
    bind_address: 4242
    database: opentsdb
    retention_policy: autogen
    consistency_level: one
    tls_enabled: false
    certificate: /etc/ssl/influxdb.pem
    batch_size: 1000
    batch_pending: 5
    batch_timeout: 1s
    log_point_errors: true
  udp:
    enabled: false
    bind_address: 8089
    database: udp
    retention_policy: autogen
    batch_size: 5000
    batch_pending: 10
    read_buffer: 0
    batch_timeout: 1s
    precision: 'ns'
  continuous_queries:
    log_enabled: true
    enabled: true
    run_interval: 1s
```

</details>

---

# InfluxDB

## An Open-Source Time Series Database

[InfluxDB](https://github.com/influxdata/influxdb) is an open source time series database built by the folks over at [InfluxData](https://influxdata.com) with no external dependencies. It's useful for recording metrics, events, and performing analytics.

## QuickStart

```bash
$ helm install stable/influxdb --name foo --namespace bar
```

## Introduction

This chart bootstraps an InfluxDB deployment and service on a Kubernetes cluster using the Helm Package manager.

## Prerequisites

- Kubernetes 1.4+
- PV provisioner support in the underlying infrastructure (optional)

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/influxdb
```

The command deploys InfluxDB on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The default configuration values for this chart are listed in `values.yaml`.

The [full image documentation](https://hub.docker.com/_/influxdb/) contains more information about running InfluxDB in docker.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set persistence.enabled=true,persistence.size=200Gi \
    stable/influxdb
```

The above command enables persistence and changes the size of the requested data volume to 200GB.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/influxdb
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [InfluxDB](https://hub.docker.com/_/influxdb/) image stores data in the `/var/lib/influxdb` directory in the container.

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) volume at this location. The volume is created using dynamic volume provisioning.

## Starting with authentication

In `values.yaml` change `.Values.config.http.auth_enabled` to `true`.

Influxdb requires also a user to be set in order for authentication to be enforced. See more details [here](https://docs.influxdata.com/influxdb/v1.2/query_language/authentication_and_authorization/#set-up-authentication).

To handle this setup on startup, a job can be enabled in `values.yaml` by setting `.Values.setDefaultUser.enabled` to `true`.

Make sure to uncomment or configure the job settings after enabling it. If a password is not set, a random password will be generated.
