# `@helm-charts/stable-presto`

Distributed SQL query engine for running interactive analytic queries

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | presto |
| Chart Version       | 0.1    |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
server:
  workers: 2
  node:
    environment: production
    dataDir: /presto/etc/data
  log:
    presto:
      level: INFO
  config:
    path: /etc/presto
    http:
      port: 8080
    query:
      maxMemory: '4GB'
      maxMemoryPerNode: '1GB'
  jvm:
    maxHeapSize: '8G'
    gcMethod:
      type: 'UseG1GC'
      g1:
        heapRegionSize: '32M'

image:
  repository: bivas/presto
  tag: 0.196
  pullPolicy: IfNotPresent

service:
  type: ClusterIP

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
```

</details>

---

# Presto Chart

[Presto](http://prestodb.io/) is an open source distributed SQL query engine for running interactive analytic queries against data sources of all sizes ranging from gigabytes to petabytes.

## Chart Details

This chart will do the following:

- Install a single server which acts both as coordinator and worker
- Install a configmap for it
- Install a service

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/presto
```

## Configuration

Configurable values are documented in the `values.yaml`.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/presto
```

> **Tip**: You can use the default [values.yaml](values.yaml)
