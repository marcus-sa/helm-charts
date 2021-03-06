# `@helm-charts/ibm-charts-ibm-minio-objectstore`

Minio is a high performance distributed object storage server, designed for large-scale private cloud infrastructure.

| Field               | Value                 |
| ------------------- | --------------------- |
| Repository Name     | ibm-charts            |
| Chart Name          | ibm-minio-objectstore |
| Chart Version       | 1.3.4                 |
| NPM Package Version | 0.1.0                 |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
###############################################################################
## Architecture Configuration Parameters
###############################################################################
# Specify architecture (amd64, ppc64le, s390x) and weight to be  used for scheduling as follows :
#  0 - Do not use
#  1 - Least preferred
#  2 - No preference
#  3 - Most preferred
arch:
  amd64: '2 - No preference'

## Set default image, imageTag, and imagePullPolicy. mode is used to indicate the
##
image:
  repository: minio/minio
  tag: RELEASE.2018-06-09T03-43-35Z
  pullPolicy: IfNotPresent

## Set default image, imageTag, and imagePullPolicy for the `mc` (the minio
## client used to create a default bucket).
##
mcImage:
  repository: minio/mc
  tag: RELEASE.2018-06-09T02-18-09Z
  pullPolicy: IfNotPresent

## minio server mode, i.e. standalone or distributed.
## Distributed Minio ref: https://docs.minio.io/docs/distributed-minio-quickstart-guide
##
mode: standalone

## Set default accesskey, secretkey, Minio config file path, volume mount path and
## number of nodes (only used for Minio distributed mode)
## Distributed Minio ref: https://docs.minio.io/docs/distributed-minio-quickstart-guide
##

minioAccessSercret: ''

configPath: ''
mountPath: '/export'
replicas: 4

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true

  ## A manually managed Persistent Volume and Claim
  ## Requires persistence.enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:

  ## minio data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##

  useDynamicProvisioning: true
  storageClass: '-'
  accessMode: ReadWriteOnce
  size: 10Gi

  ## If subPath is set mount a sub folder of a volume instead of the root of the volume.
  ## This is especially handy for volume plugins that don't natively support sub mounting (like glusterfs).
  ##
  subPath: ''

  existingClaim: ''

## Expose the Minio service to be accessed from outside the cluster (LoadBalancer service).
## or access it from within the cluster (ClusterIP service). Set the service type and the port to serve it.
## ref: http://kubernetes.io/docs/user-guide/services/
##

service:
  type: ClusterIP
  clusterIP: None
  loadBalancerIP: None
  port: 9000
  annotations:
    ''
    # prometheus.io/scrape: 'true'
    # prometheus.io/path:   '/minio/prometheus/metrics'
    # prometheus.io/port:   '9000'

ingress:
  enabled: false
  annotations:
    ''
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts: ''
  tls: ''
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: ''
tolerations: ''
#affinity: ""

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 256Mi
    cpu: 250m

## Create a bucket after minio install
##
defaultBucket:
  enabled: false
  ## If enabled, must be a string with length > 0
  name: bucket
  ## Can be one of none|download|upload|public
  policy: none
  ## Purge if bucket exists already
  purge: false

## Use minio as an azure blob gateway, you should disable data persistence so no volume claim are created.
## https://docs.minio.io/docs/minio-gateway-for-azure
azuregateway:
  enabled: false

## Use minio as GCS (Google Cloud Storage) gateway, you should disable data persistence so no volume claim are created.
## https://docs.minio.io/docs/minio-gateway-for-gcs

gcsgateway:
  enabled: false
  # credential json file of service account key
  gcsKeyJson: ''
  # Google cloud project-id
  projectId: ''

## https://docs.minio.io/docs/minio-bucket-notification-guide
##
## IBM: Commenting it now as it is not being used.
#minioConfig:
#  region: "us-east-1"
#  browser: "on"
#  domain: ""
#  standardStorageClass: ""
#  reducedRedundancyStorageClass: ""
#  aqmp:
#    enable: false
#    url: ""
#    exchange: ""
#    routingKey: ""
#    exchangeType: ""
#    deliveryMode: 0
#    mandatory: false
#    immediate: false
#    durable: false
#    internal: false
#    noWait: false
#    autoDeleted: false
#  nats:
#    enable: false
#    address: ""
#    subject: ""
#    username: ""
#    password: ""
#    token: ""
#    secure: false
#    pingInterval: 0
#    enableStreaming: false
#    clusterID: ""
#    clientID: ""
#    async: false
#    maxPubAcksInflight: 0
#  elasticsearch:
#    enable: false
#    format: "namespace"
#    url: ""
#    index: ""
#  redis:
#    enable: false
#    format: "namespace"
#    address: ""
#    password: ""
#    key: ""
#  postgresql:
#    enable: false
#    format: "namespace"
#    connectionString: ""
#    table: ""
#    host: ""
#    port: ""
#    user: ""
#    password: ""
#    database: ""
#  kafka:
#    enable: false
#    brokers: "null"
#    topic: ""
#  webhook:
#    enable: false
#    endpoint: ""
#  mysql:
#    enable: false
#    format: "namespace"
#    dsnString: ""
#    table: ""
#    host: ""
#    port: ""
#    user: ""
#    password: ""
#    database: ""
#  mqtt:
#    enable: false
#    broker: ""
#    topic: ""
#    qos: 0
#    clientId: ""
#    username: ""
#    password: ""
networkPolicy:
  enabled: false
  allowExternal: true
```

</details>

---

# Minio

## Introduction

[Minio](https://minio.io) is a lightweight, AWS S3 compatible object storage server. It is best suited for storing unstructured data such as photos, videos, log files, backups, VM and container images. Size of an object can range from a few KBs to a maximum of 5TB. Minio server is light enough to be bundled with the application stack, similar to NodeJS, Redis and MySQL.

Minio supports [distributed mode](https://docs.minio.io/docs/distributed-minio-quickstart-guide). In distributed mode, you can pool multiple drives (even on different machines) into a single object storage server.

## Chart Details

This chart bootstraps Minio deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Limitations

- Minio is supported on Linux?? 64-bit cluster. Currently it is not supported on Linux?? on Power?? 64-bit LE and IBM?? Z clusters.

## Prerequisites

- Kubernetes 1.10+ with Beta APIs enabled for default standalone mode.
- Kubernetes 1.10+ with Beta APIs enabled to run Minio in [distributed mode](#distributed-minio).
- PV provisioner support in the underlying infrastructure.
- A Secret object containing access and secret keys in base64 encoded form. Please see Access and Secret keys Sercet section for details.

## Resources Required

The minio containers have the following resource requests and limits:

| Container | Memory Request | Memory Limit | CPU Request | CPU Limit |
| --------- | -------------- | ------------ | ----------- | --------- |
| minio     | 256Mi          | 512Mi        | 250m        | 500m      |

## Installing the Chart

### Access and Secret keys Secret

This chart uses precreated Kubernetes secret object containing access and secret keys. Users need to create the secret and specify the name of secret while deploying this chart.

Create the following secret object:

```
apiVersion: v1
kind: Secret
metadata:
  name: minio
type: Opaque
data:
  accesskey: <b64enc access key (5 to 20 characters)>
  secretkey: <b64enc secret key (8 to 40 characters)>

```

Install this chart using:

```bash
$ helm install --set minioAccessSercret=minio stable/minio --tls
```

The command deploys Minio on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

### Release name

An instance of a chart running in a Kubernetes cluster is called a release. Each release is identified by a unique name within the cluster. Helm automatically assigns a unique release name after installing the chart. You can also set your preferred name by:

```bash
$ helm install --name my-release --set minioAccessSercret=minio stable/minio --tls
```

### Updating Minio configuration via Helm

[ConfigMap](https://kubernetes.io/docs/user-guide/configmap/) allows injecting containers with configuration data even while a Helm release is deployed.

To update your Minio server configuration while it is deployed in a release, you need to

1. Check all the configurable values in the Minio chart using `helm inspect values stable/minio`.
2. Override the `minio_server_config` settings in a YAML formatted file, and then pass that file like this `helm upgrade -f config.yaml stable/minio`.
3. Restart the Minio server(s) for the changes to take effect.

You can also check the history of upgrades to a release using `helm history my-release`. Replace `my-release` with the actual release name.

## Uninstalling the Chart

Assuming your release is named as `my-release`, delete it using the command:

```bash
$ helm delete --purge my-release --tls
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Minio chart and their default values.

| Parameter                            | Description                                                                                                                                                                                       | Default                        |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `image.repository`                   | Image repository                                                                                                                                                                                  | `minio/minio`                  |
| `image.tag`                          | Minio image tag. Possible values listed [here](https://hub.docker.com/r/minio/minio/tags/).                                                                                                       | `RELEASE.2018-06-09T03-43-35Z` |
| `image.pullPolicy`                   | Image pull policy                                                                                                                                                                                 | `IfNotPresent`                 |
| `mcImage.repository`                 | Client image repository                                                                                                                                                                           | `minio/mc`                     |
| `mcImage.tag`                        | mc image tag. Possible values listed [here](https://hub.docker.com/r/minio/mc/tags/).                                                                                                             | `RELEASE.2018-06-09T02-18-09Z` |
| `mcImage.pullPolicy`                 | mc Image pull policy                                                                                                                                                                              | `IfNotPresent`                 |
| `ingress.enabled`                    | Enables Ingress                                                                                                                                                                                   | `false`                        |
| `ingress.annotations`                | Ingress annotations, e.g. {kubernetes.io/ingress.class: nginx, kubernetes.io/tls-acme: "true"}                                                                                                    | `nil`                          |
| `ingress.hosts`                      | Ingress accepted hostnames, e.g. ["chart-example1.local", "chart-example2.local"]                                                                                                                 | `nil`                          |
| `ingress.tls`                        | Ingress TLS configuration, e.g. [{"secretName": "chart-example-tls", "hosts": ["chart-example.local", "chart-example.local"]}]                                                                    | `nil`                          |
| `mode`                               | Minio server mode (`standalone`, `shared` or `distributed`)                                                                                                                                       | `standalone`                   |
| `replicas`                           | Number of nodes (applicable only for Minio distributed mode). Should be 4 <= x <= 32                                                                                                              | `4`                            |
| `minioAccessSercret`                 | This manually created secret contains accesskey and secretkey to access Minio Object Server. Users need to create this in same namespace as chart being deployed and specify name of secret here. | `nil`                          |
| `configPath`                         | Default config file location                                                                                                                                                                      | `~/.minio`                     |
| `mountPath`                          | Default mount location for persistent drive                                                                                                                                                       | `/export`                      |
| `service.type`                       | Kubernetes service type                                                                                                                                                                           | `ClusterIP`                    |
| `service.port`                       | Kubernetes port where service is exposed                                                                                                                                                          | `9000`                         |
| `service.annotations`                | Service annotations, e.g. { "prometheus.io/scrape": "true","prometheus.io/path": "/minio/prometheus/metrics", "prometheus.io/port": "9000"}                                                       | `nil`                          |
| `persistence.enabled`                | Use persistent volume to store data                                                                                                                                                               | `true`                         |
| `persistence.size`                   | Size of persistent volume claim                                                                                                                                                                   | `10Gi`                         |
| `persistence.existingClaim`          | Use an existing PVC to persist data                                                                                                                                                               | `nil`                          |
| `persistence.useDynamicProvisioning` | The persistent volume claim will use the storageClassName to bind the volume                                                                                                                      | `true`                         |
| `persistence.storageClass`           | Type of persistent volume claim                                                                                                                                                                   | `generic`                      |
| `persistence.accessMode`             | ReadWriteOnce or ReadOnly                                                                                                                                                                         | `ReadWriteOnce`                |
| `persistence.subPath`                | Mount a sub directory of the persistent volume if set                                                                                                                                             | `""`                           |
| `resources`                          | CPU/Memory resource requests/limits                                                                                                                                                               | Memory: `256Mi`, CPU: `100m`   |
| `nodeSelector`                       | Node labels for pod assignment, e.g. {"key":"value"}                                                                                                                                              | `nil`                          |
| `tolerations`                        | Toleration labels for pod assignment [{"key": "key", "operator":"Equal", "value": "value", "effect":"NoSchedule"}]                                                                                | `nil`                          |
| `defaultBucket.enabled`              | If set to true, a bucket will be created after minio install                                                                                                                                      | `false`                        |
| `defaultBucket.name`                 | Bucket name                                                                                                                                                                                       | `bucket`                       |
| `defaultBucket.policy`               | Bucket policy                                                                                                                                                                                     | `none`                         |
| `defaultBucket.purge`                | Purge the bucket if already exists                                                                                                                                                                | `false`                        |
| `azuregateway.enabled`               | Use minio as an [azure gateway](https://docs.minio.io/docs/minio-gateway-for-azure)                                                                                                               | `false`                        |
| `gcsgateway.enabled`                 | Use minio as a [Google Cloud Storage gateway](https://docs.minio.io/docs/minio-gateway-for-gcs)                                                                                                   | `false`                        |
| `gcsgateway.gcsKeyJson`              | credential json file of service account key                                                                                                                                                       | `""`                           |
| `gcsgateway.projectId`               | Google cloud project id                                                                                                                                                                           | `""`                           |

Some of the parameters above map to the env variables defined in the [Minio DockerHub image](https://hub.docker.com/r/minio/minio/).

You can specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set persistence.size=100Gi \
    stable/minio --tls
```

The above command deploys Minio server with a 100Gi backing persistent volume.

Alternately, you can provide a YAML file that specifies parameter values while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/minio --tls
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Distributed Minio

This chart provisions a Minio server in standalone mode, by default. To provision Minio server in [distributed mode](https://docs.minio.io/docs/distributed-minio-quickstart-guide), set the `mode` field to `distributed`,

```bash
$ helm install --set mode=distributed,minioAccessSercret=minio stable/minio --tls
```

This provisions Minio server in distributed mode with 4 nodes. To change the number of nodes in your distributed Minio server, set the `replicas` field,

```bash
$ helm install --set mode=distributed,replicas=8,minioAccessSercret=minio stable/minio --tls
```

This provisions Minio server in distributed mode with 8 nodes. Note that the `replicas` value should be an integer between 4 and 16 (inclusive).

### StatefulSet [limitations](http://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/#limitations) applicable to distributed Minio

1. StatefulSets need persistent storage, so the `persistence.enabled` flag is ignored when `mode` is set to `distributed`.
2. When uninstalling a distributed Minio release, you'll need to manually delete volumes associated with the StatefulSet.

## Shared Minio

### Prerequisites

Minio shared mode deployment creates multiple Minio server instances backed by single PV in `ReadWriteMany` mode. Currently few [Kubernetes volume plugins](https://kubernetes.io/docs/user-guide/persistent-volumes/#access-modes) support `ReadWriteMany` mode. To deploy Minio shared mode you'll need to have a Persistent Volume running with one of the supported volume plugins. [This document](https://kubernetes.io/docs/user-guide/volumes/#nfs)
outlines steps to create a NFS PV in Kubernetes cluster.

### Provision Shared Minio instances

To provision Minio servers in [shared mode](https://github.com/minio/minio/blob/master/docs/shared-backend/README.md), set the `mode` field to `shared`,

```bash
$ helm install --set mode=shared,minioAccessSercret=minio stable/minio --tls
```

This provisions 4 Minio server nodes backed by single storage. To change the number of nodes in your shared Minio deployment, set the `replicas` field,

```bash
$ helm install --set mode=shared,replicas=8,minioAccessSercret=minio stable/minio --tls
```

This provisions Minio server in shared mode with 8 nodes.

## Persistence

This chart provisions a PersistentVolumeClaim and mounts corresponding persistent volume to default location `/export`. You'll need physical storage available in the Kubernetes cluster for this to work. If you'd rather use `emptyDir`, disable PersistentVolumeClaim by:

```bash
$ helm install --set persistence.enabled=false,minioAccessSercret=minio stable/minio --tls
```

> _"An emptyDir volume is first created when a Pod is assigned to a Node, and exists as long as that Pod is running on that node. When a Pod is removed from a node for any reason, the data in the emptyDir is deleted forever."_

## Existing PersistentVolumeClaim

If a Persistent Volume Claim already exists, specify it during installation.

1. Create the PersistentVolume
1. Create the PersistentVolumeClaim
1. Install the chart

```bash
$ helm install --set persistence.existingClaim=PVC_NAME,minioAccessSercret=minio stable/minio --tls
```

## NetworkPolicy

To enable network policy for Minio,
install [a networking plugin that implements the Kubernetes
NetworkPolicy spec](https://kubernetes.io/docs/tasks/administer-cluster/declare-network-policy#before-you-begin),
and set `networkPolicy.enabled` to `true`.

With NetworkPolicy enabled, traffic will be limited to just port 9000.

For more precise policy, set `networkPolicy.allowExternal=true`. This will
only allow pods with the generated client label to connect to Minio.
This label will be displayed in the output of a successful install.
