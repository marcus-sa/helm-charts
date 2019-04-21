# `@helm-charts/stable-telegraf`

Telegraf is an agent written in Go for collecting, processing, aggregating, and writing metrics.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | telegraf |
| Chart Version       | 0.2.1    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Default values.yaml for Telegraf
## This is a YAML-formatted file.
## ref: https://hub.docker.com/r/library/telegraf/tags/
image:
  repo: 'telegraf'
  tag: '1.2.0-alpine'
  pullPolicy: IfNotPresent

## Configure the telegraf daemonset here.
## Resource limits and outputs can be set seperately
daemonset:
  enabled: true
  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  resources:
    requests:
      memory: 256Mi
      cpu: 0.1
    limits:
      memory: 2Gi
      cpu: 1
  ## Exposed telegraf configuration
  ## ref: https://docs.influxdata.com/telegraf/v1.1/administration/configuration/
  config:
    ##    global_tags:
    ##      dc: "us-east-1"
    ##      user: "$USER"
    agent:
      interval: '10s'
      round_interval: true
      metric_batch_size: 1000
      metric_buffer_limit: 10000
      collection_jitter: '0s'
      flush_interval: '10s'
      flush_jitter: '0s'
      precision: ''
      debug: false
      quiet: false
      logfile: ''
      hostname: '$HOSTNAME'
      omit_hostname: false
    outputs:
      influxdb:
        urls: []
        # - "http://influxdb-influxdb.tick:8086"
        database: 'telegraf'
    ##        retention_policy: ""
    ##        write_consistency: "any"
    ##        timeout: "5s"
    ##        username: "telegraf"
    ##        password: "metricsmetricsmetricsmetrics"
    ##        user_agent: "telegraf"
    ##        udp_payload: 512
    ##        ssl_ca: "/etc/telegraf/ca.pem"
    ##        ssl_cert: "/etc/telegraf/cert.pem"
    ##        ssl_key: "/etc/telegraf/key.pem"
    ##        insecure_skip_verify: false
    ##      amqp:
    ##        url: "amqp://localhost:5672/influxdb"
    ##        exchange: "telegraf"
    ##        auth_method: "PLAIN"
    ##        routing_tag: "host"
    ##        retention_policy: "default"
    ##        database: "telegraf"
    ##        precision: "s"
    ##        ssl_ca: "/etc/telegraf/ca.pem"
    ##        ssl_cert: "/etc/telegraf/cert.pem"
    ##        ssl_key: "/etc/telegraf/key.pem"
    ##        insecure_skip_verify: false
    ##        data_format: "influx"
    ##      kafka:
    ##        brokers:
    ##          - "localhost:9092"
    ##        topic: "telegraf"
    ##        routing_tag: "host"
    ##        compression_codec: 0
    ##        required_acks: -1
    ##        max_retry: 3
    ##        ssl_ca: "/etc/telegraf/ca.pem"
    ##        ssl_cert: "/etc/telegraf/cert.pem"
    ##        ssl_key: "/etc/telegraf/key.pem"
    ##        insecure_skip_verify: false
    ##        data_format: "influx"
    ##      mqtt:
    ##        servers:
    ##          - "localhost:1883"
    ##        topic_prefix: "telegraf"
    ##        username: "telegraf"
    ##        password: "metricsmetricsmetricsmetrics"
    ##        ssl_ca: "/etc/telegraf/ca.pem"
    ##        ssl_cert: "/etc/telegraf/cert.pem"
    ##        ssl_key: "/etc/telegraf/key.pem"
    ##        insecure_skip_verify: false
    ##        data_format: "influx"
    ##      nats:
    ##        servers:
    ##          - "nats://localhost:4222"
    ##        username: ""
    ##        password: ""
    ##        subject: "telegraf"
    ##        ssl_ca: "/etc/telegraf/ca.pem"
    ##        ssl_cert: "/etc/telegraf/cert.pem"
    ##        ssl_key: "/etc/telegraf/key.pem"
    ##        insecure_skip_verify: false
    ##        data_format: "influx"
    ##      nsq:
    ##        server: "localhost:4150"
    ##        topic: "telegraf"
    ##        data_format: "influx"
    inputs:
      cpu:
        percpu: true
        totalcpu: true
        collect_cpu_time: false
      disk:
        ignore_fs:
          - 'tmpfs'
          - 'devtmpfs'
      diskio:
      docker:
        endpoint: 'unix:///var/run/docker.sock'
        container_names: []
      kernel:
      mem:
      processes:
      swap:
      system:
      kubernetes:
        url: 'http://$HOSTNAME:10255'
        bearer_token: '/var/run/secrets/kubernetes.io/serviceaccount/token'
        insecure_skip_verify: true

## Configure the telegraf single instance here.
## Resource limits and outputs can be set seperately
single:
  enabled: true
  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  resources:
    requests:
      memory: 256Mi
      cpu: 0.1
    limits:
      memory: 2Gi
      cpu: 1
  ## Configure the service for this telegraf instance. If you are running
  ## Any of the service plugins you will need this enabled
  ## Service Plugins: http_listener, statsd, tcp_listener, udp_listener
  ## ref: http://kubernetes.io/docs/user-guide/services/
  service:
    enabled: true
    type: ClusterIP

  ## Exposed telegraf configuration
  ## For full list of possible values see `/docs/all-config-values.yaml` and `/docs/all-config-values.toml`
  ## ref: https://docs.influxdata.com/telegraf/v1.1/administration/configuration/

  config:
    ##    global_tags:
    ##      dc: "us-east-1"
    ##      user: "$USER"
    agent:
      interval: '10s'
      round_interval: true
      metric_batch_size: 1000
      metric_buffer_limit: 10000
      collection_jitter: '0s'
      flush_interval: '10s'
      flush_jitter: '0s'
      precision: ''
      debug: false
      quiet: false
      logfile: ''
      hostname: 'telegraf-polling-service'
      omit_hostname: false
    outputs:
      influxdb:
        urls: []
        # - "http://influxdb-influxdb.tick:8086"
        database: 'telegraf'
    ##        retention_policy: ""
    ##        write_consistency: "any"
    ##        timeout: "5s"
    ##        username: "telegraf"
    ##        password: "metricsmetricsmetricsmetrics"
    ##        user_agent: "telegraf"
    ##        udp_payload: 512
    ##        ssl_ca: "/etc/telegraf/ca.pem"
    ##        ssl_cert: "/etc/telegraf/cert.pem"
    ##        ssl_key: "/etc/telegraf/key.pem"
    ##        insecure_skip_verify: false
    ##      amqp:
    ##        url: "amqp://localhost:5672/influxdb"
    ##        exchange: "telegraf"
    ##        auth_method: "PLAIN"
    ##        routing_tag: "host"
    ##        retention_policy: "default"
    ##        database: "telegraf"
    ##        precision: "s"
    ##        ssl_ca: "/etc/telegraf/ca.pem"
    ##        ssl_cert: "/etc/telegraf/cert.pem"
    ##        ssl_key: "/etc/telegraf/key.pem"
    ##        insecure_skip_verify: false
    ##        data_format: "influx"
    ##      kafka:
    ##        brokers:
    ##          - "localhost:9092"
    ##        topic: "telegraf"
    ##        routing_tag: "host"
    ##        compression_codec: 0
    ##        required_acks: -1
    ##        max_retry: 3
    ##        ssl_ca: "/etc/telegraf/ca.pem"
    ##        ssl_cert: "/etc/telegraf/cert.pem"
    ##        ssl_key: "/etc/telegraf/key.pem"
    ##        insecure_skip_verify: false
    ##        data_format: "influx"
    ##      mqtt:
    ##        servers:
    ##          - "localhost:1883"
    ##        topic_prefix: "telegraf"
    ##        username: "telegraf"
    ##        password: "metricsmetricsmetricsmetrics"
    ##        ssl_ca: "/etc/telegraf/ca.pem"
    ##        ssl_cert: "/etc/telegraf/cert.pem"
    ##        ssl_key: "/etc/telegraf/key.pem"
    ##        insecure_skip_verify: false
    ##        data_format: "influx"
    ##      nats:
    ##        servers:
    ##          - "nats://localhost:4222"
    ##        username: ""
    ##        password: ""
    ##        subject: "telegraf"
    ##        ssl_ca: "/etc/telegraf/ca.pem"
    ##        ssl_cert: "/etc/telegraf/cert.pem"
    ##        ssl_key: "/etc/telegraf/key.pem"
    ##        insecure_skip_verify: false
    ##        data_format: "influx"
    ##      nsq:
    ##        server: "localhost:4150"
    ##        topic: "telegraf"
    ##        data_format: "influx"
    inputs:
      cpu:
        percpu: false
        totalcpu: true
      system:
      ##      aerospike:
      ##        servers:
      ##          - "localhost:3000"
      ##      apache:
      ##        urls:
      ##          - "http://localhost/server-status?auto"
      ##      cassandra:
      ##        context: "/jolokia/read"
      ##        servers:
      ##          - "myuser:mypassword@10.10.10.1:8778"
      ##          - "10.10.10.2:8778"
      ##          - ":8778"
      ##        metrics :
      ##          - "/java.lang:type=Memory/HeapMemoryUsage"
      ##          - "/org.apache.cassandra.metrics:type=Table,keyspace=*,scope=*,name=ReadLatency"
      ##      cloudwatch:
      ##        region: "us-east-1"
      ##        access_key: ""
      ##        secret_key: ""
      ##        token: ""
      ##        role_arn: ""
      ##        profile: ""
      ##        shared_credential_file: ""
      ##        period: "5m"
      ##        delay: "5m"
      ##        interval: "5m"
      ##        cache_ttl: "10m"
      ##        namespace: "AWS/ELB"
      ##        ratelimit: 10
      ##        metrics:
      ##         names:
      ##          - "Latency"
      ##          - "RequestCount"
      ##         dimensions:
      ##           name: "LoadBalancerName"
      ##           value: "p-example"
      ##      consul:
      ##        address: "localhost"
      ##        scheme: "http"
      ##        token: ""
      ##        username: ""
      ##        password: ""
      ##        datacentre: ""
      ##      couchbase:
      ##        servers:
      ##          - "http://localhost:8091"
      ##      couchdb:
      ##        hosts:
      ##          - "http://localhost:8086/_stats"
      ##      disque:
      ##        servers:
      ##          - "localhost"
      ##      dns_query:
      ##        servers:
      ##          - "8.8.8.8"
      ##        domains:
      ##          - "."
      ##        record_type: "A"
      ##        port: 53
      ##        timeout: 2
      ##      dovecot:
      ##        servers:
      ##          - "localhost:24242"
      ##        type: "global"
      ##        filters:
      ##          - ""
      ##      elasticsearch:
      ##        servers:
      ##          - "http://localhost:9200"
      ##        http_timeout: "5s"
      ##        local: true
      ##        cluster_health: false
      ##        ssl_ca: "/etc/telegraf/ca.pem"
      ##        ssl_cert: "/etc/telegraf/cert.pem"
      ##        ssl_key: "/etc/telegraf/key.pem"
      ##        insecure_skip_verify: false
      ##      graylog:
      ##        servers:
      ##          - "http://[graylog-server-ip]:12900/system/metrics/multiple"
      ##        metrics:
      ##          - "jvm.cl.loaded"
      ##          - "jvm.memory.pools.Metaspace.committed"
      ##        username: ""
      ##        password: ""
      ##        ssl_ca: "/etc/telegraf/ca.pem"
      ##        ssl_cert: "/etc/telegraf/cert.pem"
      ##        ssl_key: "/etc/telegraf/key.pem"
      ##        insecure_skip_verify: false
      ##      haproxy:
      ##        servers:
      ##          - "http://myhaproxy.com:1936/haproxy?stats"
      influxdb:
        urls:
          - 'http://influxdb-influxdb.tick:8086/debug/vars'
        timeout: '5s'
      ##      lustre2:
      ##        ost_procfiles:
      ##          - "/proc/fs/lustre/obdfilter/*/stats"
      ##          - "/proc/fs/lustre/osd-ldiskfs/*/stats"
      ##          - "/proc/fs/lustre/obdfilter/*/job_stats"
      ##        mds_procfiles:
      ##          - "/proc/fs/lustre/mdt/*/md_stats"
      ##          - "/proc/fs/lustre/mdt/*/job_stats"
      ##      mailchimp:
      ##        api_key: ""
      ##        days_old: 0
      ##        campaign_id: ""
      ##      memcached:
      ##        servers:
      ##          - "localhost:11211"
      ##        unix_sockets:
      ##          - "/var/run/memcached.sock"
      ##      mesos:
      ##        timeout: 100
      ##        masters:
      ##          - "localhost:5050"
      ##        master_collections:
      ##          - "resources"
      ##          - "master"
      ##          - "system"
      ##          - "agents"
      ##          - "frameworks"
      ##          - "tasks"
      ##          - "messages"
      ##          - "evqueue"
      ##          - "registrar"
      ##        slaves:
      ##          -
      ##        slave_collections:
      ##          - "resources"
      ##          - "agent"
      ##          - "system"
      ##          - "executors"
      ##          - "tasks"
      ##          - "messages"
      ##      mongodb:
      ##        servers:
      ##          - "mongodb://user:password@127.0.0.1:27017"
      ##        gather_perdb_stats: false
      ##      mysql:
      ##        servers:
      ##          - "tcp(127.0.0.1:3306)?tls=false"
      ##        perf_events_statements_digest_text_limit : 120
      ##        perf_events_statements_limit: 250
      ##        perf_events_statements_time_limit        : 86400
      ##        table_schema_databases: []
      ##        gather_table_schema: false
      ##        gather_process_list: true
      ##        gather_info_schema_auto_inc: true
      ##        gather_slave_status: true
      ##        gather_binary_logs: false
      ##        gather_table_io_waits: false
      ##        gather_table_lock_waits: false
      ##        gather_index_io_waits: false
      ##        gather_event_waits: false
      ##        gather_file_events_stats: false
      ##        gather_perf_events_statements: false
      ##        interval_slow: "30m"
      ##      net_response:
      ##        protocol: "tcp"
      ##        address: "github.com:80"
      ##        timeout: "1s"
      ##        send: "ssh"
      ##        expect: "ssh"
      ##        read_timeout: "1s"
      ##      nginx:
      ##        urls:
      ##          - "http://nginx.nginx-ingress/nginx_status"
      ##      nsq:
      ##        endpoints:
      ##          - "http://localhost:4151"
      ##      phpfpm:
      ##        urls:
      ##          - "http://localhost/status"
      ##      ping:
      ##        urls:
      ##          - "www.google.com"
      ##        count: 1
      ##        ping_interval: 1.0
      ##        timeout: 1.0
      ##        interface: ""
      ##      postgresql:
      ##        address: "postgres://user:password@localhost?sslmode=disable"
      ##        ignored_databases:
      ##          - "postgres"
      ##        databases:
      ##          - "app_production"
      ##          - "testing"
      prometheus:
        urls:
          - 'https://kubernetes.default:443/metrics'
        name_prefix: 'prom_'
        bearer_token: '/var/run/secrets/kubernetes.io/serviceaccount/token'
        insecure_skip_verify: true
      ##        ssl_ca: /path/to/cafile
      ##        ssl_cert: /path/to/certfile
      ##        ssl_key: /path/to/keyfile
      ##     rabbitmq:
      ##       url: "http://localhost:15672"
      ##       name: "rmq-server-1"
      ##       username: "guest"
      ##       password: "guest"
      ##       ssl_ca: "/etc/telegraf/ca.pem"
      ##       ssl_cert: "/etc/telegraf/cert.pem"
      ##       ssl_key: "/etc/telegraf/key.pem"
      ##       insecure_skip_verify: false
      ##       nodes:
      ##         - "rabbit@node1"
      ##         - "rabbit@node2"
      ##     raindrops:
      ##       urls:
      ##         - "http://localhost:8080/_raindrops"
      ##     redis:
      ##       servers:
      ##         - "tcp://localhost:6379"
      ##     rethinkdb:
      ##       servers:
      ##         - "127.0.0.1:28015"
      ##     riak:
      ##       servers:
      ##         - "http://localhost:8098"
      ##     sqlserver:
      ##       servers:
      ##         - "Server=192.168.1.10;Port=1433;User Id=<user>;Password=<pw>;app name=telegraf;log=1;"
      ##     twemproxy:
      ##       addr: "localhost:22222"
      ##        pools:
      ##          - "redis_pool"
      ##          - "mc_pool"
      ##      zookeeper:
      ##        servers:
      ##          - "localhost:2181"
      ##      http_listener:
      ##        service_address: ":8186"
      ##        read_timeout: "10s"
      ##        write_timeout: "10s"
      ##        max_body_size: 0
      ##        max_line_size: 0
      statsd:
        service_address: ':8125'
        percentiles:
          - 50
          - 95
          - 99
        metric_separator: '_'
        allowed_pending_messages: 10000
        percentile_limit: 1000
```

</details>

---

# Telegraf

_This chart has been deprecated as of version 0.2.1 and will not be updated. Please use the telegraf-s and telegraf-ds charts instead._

[Telegraf](https://github.com/influxdata/telegraf) is a plugin-driven server agent written by the folks over at [InfluxData](https://influxdata.com) for collecting & reporting metrics.

## TL;DR

```console
$ helm install stable/telegraf
```

## Introduction

This chart bootstraps a `telegraf` deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/telegraf
```

The command deploys Telegraf on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The default configuration parameters are listed in `values.yaml`. To change the defaults, specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set single.enabled=false \
    stable/telegraf
```

The above command prevents the single telegraf instance from deploying.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/telegraf
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Telegraf Configuration

This chart deploys the following by default:

- `telegraf` (`telegraf-ds`) running in a daemonset with the following plugins enabled

  - [`cpu`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/system)
  - [`disk`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/system)
  - [`docker`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/docker)
  - [`diskio`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/system)
  - [`kernel`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/system)
  - [`kubernetes`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/kubernetes)
  - [`mem`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/system)
  - [`processes`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/system)
  - [`swap`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/system)
  - [`system`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/system)

- A single `telegraf` deployment (`telegraf-s`) with an associated service running the following plugins:

  - [`prometheus`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/prometheus)
  - [`influxdb`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/influxdb)
  - [`statsd`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/statsd)

### Supported Outputs

The following telegraf output plugins are supported for both the daemonset and the single instance. To enable them uncomment them in `.Values.{{ "daemonset" | "single" }}.outputs`:

- [`amqp`](https://github.com/influxdata/telegraf/tree/master/plugins/outputs/amqp)
- [`influxdb`](https://github.com/influxdata/telegraf/tree/master/plugins/outputs/influxdb)
- [`kafka`](https://github.com/influxdata/telegraf/tree/master/plugins/outputs/kafka)
- [`mqtt`](https://github.com/influxdata/telegraf/tree/master/plugins/outputs/mqtt)
- [`nats`](https://github.com/influxdata/telegraf/tree/master/plugins/outputs/nats)
- [`nsq`](https://github.com/influxdata/telegraf/tree/master/plugins/outputs/nsq)

### Service Plugins - Single Instance

The single telegraf also supports all service plugins. To enable them uncomment the named plugin in `.Values.single.inputs` section. The associated service exposes the ports if it is enabled:

- [`tcp_listener`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/tcp_listener)
- [`udp_listener`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/udp_listener)
- [`statsd`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/statsd)
- [`http_listener`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/http_listener)

### Supported Inputs - Single Instance

To enable additional input plugins uncomment them in the `.Values.single.inputs` section. The input plugins supported by the single telegraf instance are as follows:

- [`aerospike`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/aerospike)
- [`apache`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/apache)
- [`cassandra`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/cassandra)
- [`cloudwatch`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/cloudwatch)
- [`consul`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/consul)
- [`couchbase`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/couchbase)
- [`couchdb`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/couchdb)
- [`disque`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/disque)
- [`dns_query`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/dns_query)
- [`dovecot`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/dovecot)
- [`elasticsearch`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/elasticsearch)
- [`graylog`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/graylog)
- [`haproxy`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/haproxy)
- [`influxdb`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/influxdb)
- [`lustre2`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/lustre2)
- [`mailchimp`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mailchimp)
- [`memcached`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/memcached)
- [`mesos`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mesos)
- [`mongodb`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mongodb)
- [`mysql`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql)
- [`net_response`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/net_response)
- [`nginx`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/nginx)
- [`nsq`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/nsq)
- [`phpfpm`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/phpfpm)
- [`ping`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/ping)
- [`postgresql`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/postgresql)
- [`prometheus`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/prometheus)
- [`rabbitmq`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/rabbitmq)
- [`raindrops`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/raindrops)
- [`redis`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/redis)
- [`rethinkdb`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/rethinkdb)
- [`riak`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/riak)
- [`sqlserver`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/sqlserver)
- [`twemproxy`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/twemproxy)
- [`zookeeper`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/zookeeper)
- [`http_listener`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/http_listener)
- [`statsd`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/statsd)
- [`tcp_listener`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/tcp_listener)
- [`udp_listener`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/udp_listener)
- [`webhooks`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/webhooks)

### Future work:

There are a couple of additional plugins that could/should possibly be supported but are not yet:

- `telegraf-s`
  - [`smnp`](https://github.com/influxdata/telegraf/tree/master/plugins/smnp)
- `telegraf-ds`
  - [`jolokia`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia)
  - [`bcache`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/bcache)
  - [`cgroup`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/cgroup)
  - [`conntrack`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/conntrack)
  - [`exec`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/exec)
  - [`filestat`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/filestat)
  - [`hddtemp`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/hddtemp)
  - [`ipmi_sensor`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/ipmi_sensor)
  - [`iptables`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/iptables)
  - [`leofs`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/leofs)
  - [`logparser`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/logparser)
  - [`nstat`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/nstat)
  - [`ntpq`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/ntpq)
  - [`passenger`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/passenger)
  - [`powerdns`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/powerdns)
  - [`procstat`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/procstat)
  - [`puppetagent`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/puppetagent)
  - [`sysstat`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/sysstat)
  - [`varnish`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/varnish)
  - [`win_perf_counters`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/win_perf_counters)
  - [`zfs`](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/zfs)
