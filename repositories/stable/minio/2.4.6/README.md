# `@helm-charts/stable-minio`

Minio is a high performance distributed object storage server, designed for large-scale private cloud infrastructure.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | minio  |
| Chart Version       | 2.4.6  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## set kubernetes cluster domain where minio is running
##
clusterDomain: cluster.local

## Set default image, imageTag, and imagePullPolicy. mode is used to indicate the
##
image:
  repository: minio/minio
  tag: RELEASE.2019-02-12T21-58-47Z
  pullPolicy: IfNotPresent

## Set default image, imageTag, and imagePullPolicy for the `mc` (the minio
## client used to create a default bucket).
##
mcImage:
  repository: minio/mc
  tag: RELEASE.2019-02-13T19-48-27Z
  pullPolicy: IfNotPresent

## minio server mode, i.e. standalone or distributed.
## Distributed Minio ref: https://docs.minio.io/docs/distributed-minio-quickstart-guide
##
mode: standalone

## Update strategy for Deployments
DeploymentUpdate:
  type: RollingUpdate
  maxUnavailable: 0
  maxSurge: 100%

## Update strategy for StatefulSets
StatefulSetUpdate:
  updateStrategy: RollingUpdate

## Pod priority settings
## ref: https://kubernetes.io/docs/concepts/configuration/pod-priority-preemption/
##
priorityClassName: ''

## Set default accesskey, secretkey, Minio config file path, volume mount path and
## number of nodes (only used for Minio distributed mode)
## Distributed Minio ref: https://docs.minio.io/docs/distributed-minio-quickstart-guide
##
existingSecret: ''
accessKey: 'AKIAIOSFODNN7EXAMPLE'
secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
configPath: '/root/.minio/'
configPathmc: '/root/.mc/'
mountPath: '/export'
replicas: 4

## TLS Settings for Minio
tls:
  enabled: false
  ## Create a secret with private.key and public.crt files and pass that here. Ref: https://github.com/minio/minio/tree/master/docs/tls/kubernetes#2-create-kubernetes-secret
  certSecret: ''
  publicCrt: public.crt
  privateKey: private.key

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
  ## Storage class of PV to bind. By default it looks for standard storage class.
  ## If the PV uses a different storage class, specify that here.
  # storageClass: standard
  accessMode: ReadWriteOnce
  size: 10Gi

  ## If subPath is set mount a sub folder of a volume instead of the root of the volume.
  ## This is especially handy for volume plugins that don't natively support sub mounting (like glusterfs).
  ##
  subPath: ''

## Expose the Minio service to be accessed from outside the cluster (LoadBalancer service).
## or access it from within the cluster (ClusterIP service). Set the service type and the port to serve it.
## ref: http://kubernetes.io/docs/user-guide/services/
##

service:
  type: ClusterIP
  clusterIP: ~
  port: 9000
  # nodePort: 31311
  # externalIPs:
  #   - externalIp1
  annotations:
    {}
    # prometheus.io/scrape: 'true'
    # prometheus.io/path:   '/minio/prometheus/metrics'
    # prometheus.io/port:   '9000'

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - chart-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}
tolerations: []
affinity: {}

# Additational pod annotations
podAnnotations: {}

## Liveness and Readiness probe values.
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/
livenessProbe:
  initialDelaySeconds: 5
  periodSeconds: 30
  timeoutSeconds: 1
  successThreshold: 1
  failureThreshold: 3
readinessProbe:
  initialDelaySeconds: 5
  periodSeconds: 15
  timeoutSeconds: 1
  successThreshold: 1
  failureThreshold: 3

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

## Create multiple buckets after minio install
## Enabling `defaultBucket` will take priority over this list
##
buckets:
  []
  # - name: bucket1
  #   policy: none
  #   purge: false
  # - name: bucket2
  #   policy: none
  #   purge: false

s3gateway:
  enabled: false
  replicas: 4
  serviceEndpoint: ''

## Use minio as an azure blob gateway, you should disable data persistence so no volume claim are created.
## https://docs.minio.io/docs/minio-gateway-for-azure
azuregateway:
  enabled: false
  # Number of parallel instances
  replicas: 4

## Use minio as GCS (Google Cloud Storage) gateway, you should disable data persistence so no volume claim are created.
## https://docs.minio.io/docs/minio-gateway-for-gcs

gcsgateway:
  enabled: false
  # Number of parallel instances
  replicas: 4
  # credential json file of service account key
  gcsKeyJson: ''
  # Google cloud project-id
  projectId: ''

ossgateway:
  enabled: false
  # Number of parallel instances
  replicas: 4
  endpointURL: ''

## Use minio on NAS backend
## https://docs.minio.io/docs/minio-gateway-for-nas

nasgateway:
  enabled: false
  # Number of parallel instances
  replicas: 4
  # For NAS Gateway, you may want to bind the PVC to a specific PV. To ensure that happens, PV to bind to should have
  # a label like "pv: <value>", use value here.
  pv: ~

## Use this field to add environment variables relevant to Minio server. These fields will be passed on to Minio container(s)
## when Chart is deployed
environment:
  ## To disable Minio Browser, set this value to off
  MINIO_BROWSER: 'on'
  ## To enable virtual-host-style requests, set this value to Minio host domain name.
  # MINIO_DOMAIN: ""
  ## Minio Cache settings, refer: https://docs.minio.io/docs/minio-disk-cache-guide.html
  # MINIO_CACHE_DRIVES: ""
  # MINIO_CACHE_EXCLUDE: ""
  # MINIO_CACHE_EXPIRY: ""
  # MINIO_CACHE_MAXUSE: ""
  ## Minio WORM setting, refer: https://docs.minio.io/docs/minio-server-configuration-guide.html
  # MINIO_WORM: ""
  ## Minio KMS settings, refer: https://docs.minio.io/docs/minio-kms-quickstart-guide.html
  # MINIO_SSE_VAULT_ENDPOINT: ""
  # MINIO_SSE_VAULT_APPROLE_ID: ""
  # MINIO_SSE_VAULT_APPROLE_SECRET: ""
  # MINIO_SSE_VAULT_KEY_NAME: ""
  ## Minio Federation settings, refer: https://docs.minio.io/docs/minio-federation-quickstart-guide.html
  # MINIO_ETCD_ENDPOINTS: ""
  # MINIO_PUBLIC_IPS: ""
  # MINIO_DOMAIN: ""
  ## Add other environment variables relevant to Minio server here. These values will be added to the container(s) as this Chart is deployed

## https://docs.minio.io/docs/minio-bucket-notification-guide
## https://github.com/minio/minio/blob/master/docs/config
minioConfig:
  region: 'us-east-1'
  browser: 'on'
  domain: ''
  worm: 'off'
  storageClass:
    standardStorageClass: ''
    reducedRedundancyStorageClass: ''
  cache:
    drives: []
    expiry: 90
    maxuse: 80
    exclude: []
  aqmp:
    enable: false
    url: ''
    exchange: ''
    routingKey: ''
    exchangeType: ''
    deliveryMode: 0
    mandatory: false
    immediate: false
    durable: false
    internal: false
    noWait: false
    autoDeleted: false
  nats:
    enable: false
    address: ''
    subject: ''
    username: ''
    password: ''
    token: ''
    secure: false
    pingInterval: 0
    enableStreaming: false
    clusterID: ''
    clientID: ''
    async: false
    maxPubAcksInflight: 0
  elasticsearch:
    enable: false
    format: 'namespace'
    url: ''
    index: ''
  redis:
    enable: false
    format: 'namespace'
    address: ''
    password: ''
    key: ''
  postgresql:
    enable: false
    format: 'namespace'
    connectionString: ''
    table: ''
    host: ''
    port: ''
    user: ''
    password: ''
    database: ''
  kafka:
    enable: false
    brokers: 'null'
    topic: ''
  webhook:
    enable: false
    endpoint: ''
  mysql:
    enable: false
    format: 'namespace'
    dsnString: ''
    table: ''
    host: ''
    port: ''
    user: ''
    password: ''
    database: ''
  mqtt:
    enable: false
    broker: ''
    topic: ''
    qos: 0
    clientId: ''
    username: ''
    password: ''
    reconnectInterval: 0
    keepAliveInterval: 0
networkPolicy:
  enabled: false
  allowExternal: true
```

</details>

---

# Minio

[Minio](https://minio.io) is a distributed object storage service for high performance, high scale data infrastructures. It is a drop in replacement for AWS S3 in your own environment. It uses erasure coding to provide highly resilient storage that can tolerate failures of upto n/2 nodes. It runs on cloud, container, kubernetes and bare-metal environments. It is simple enough to be deployed in seconds, and can scale to 100s of peta bytes. Minio is suitable for storing objects such as photos, videos, log files, backups, VM and container images.

Minio supports [distributed mode](https://docs.minio.io/docs/distributed-minio-quickstart-guide). In distributed mode, you can pool multiple drives (even on different machines) into a single object storage server.

## Introduction

This chart bootstraps Minio deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled for default standalone mode.
- Kubernetes 1.5+ with Beta APIs enabled to run Minio in [distributed mode](#distributed-minio).
- PV provisioner support in the underlying infrastructure.

## Installing the Chart

Install this chart using:

```bash
$ helm install stable/minio
```

The command deploys Minio on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

### Release name

An instance of a chart running in a Kubernetes cluster is called a release. Each release is identified by a unique name within the cluster. Helm automatically assigns a unique release name after installing the chart. You can also set your preferred name by:

```bash
$ helm install --name my-release stable/minio
```

### Access and Secret keys

By default a pre-generated access and secret key will be used. To override the default keys, pass the access and secret keys as arguments to helm install.

```bash
$ helm install --set accessKey=myaccesskey,secretKey=mysecretkey \
    stable/minio
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
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Upgrading the Chart

You can use Helm to update Minio version in a live release. Assuming your release is named as `my-release`, get the values using the command:

```bash
$ helm get values my-release > old_values.yaml
```

Then change the field `image.tag` in `old_values.yaml` file with Minio image tag you want to use. Now update the chart using

```bash
$ helm upgrade -f old_values.yaml my-release stable/minio
```

Default upgrade strategies are specified in the `values.yaml` file. Update these fields if you'd like to use a different strategy.

## Configuration

The following table lists the configurable parameters of the Minio chart and their default values.

| Parameter                            | Description                                                                                                                             | Default                                    |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `image.repository`                   | Image repository                                                                                                                        | `minio/minio`                              |
| `image.tag`                          | Minio image tag. Possible values listed [here](https://hub.docker.com/r/minio/minio/tags/).                                             | `RELEASE.2019-02-12T21-58-47Z`             |
| `image.pullPolicy`                   | Image pull policy                                                                                                                       | `IfNotPresent`                             |
| `mcImage.repository`                 | Client image repository                                                                                                                 | `minio/mc`                                 |
| `mcImage.tag`                        | mc image tag. Possible values listed [here](https://hub.docker.com/r/minio/mc/tags/).                                                   | `RELEASE.2019-02-13T19-48-27Z`             |
| `mcImage.pullPolicy`                 | mc Image pull policy                                                                                                                    | `IfNotPresent`                             |
| `ingress.enabled`                    | Enables Ingress                                                                                                                         | `false`                                    |
| `ingress.annotations`                | Ingress annotations                                                                                                                     | `{}`                                       |
| `ingress.hosts`                      | Ingress accepted hostnames                                                                                                              | `[]`                                       |
| `ingress.tls`                        | Ingress TLS configuration                                                                                                               | `[]`                                       |
| `mode`                               | Minio server mode (`standalone` or `distributed`)                                                                                       | `standalone`                               |
| `replicas`                           | Number of nodes (applicable only for Minio distributed mode). Should be 4 <= x <= 32                                                    | `4`                                        |
| `existingSecret`                     | Name of existing secret with access and secret key.                                                                                     | `""`                                       |
| `accessKey`                          | Default access key (5 to 20 characters)                                                                                                 | `AKIAIOSFODNN7EXAMPLE`                     |
| `secretKey`                          | Default secret key (8 to 40 characters)                                                                                                 | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `configPath`                         | Default config file location                                                                                                            | `~/.minio`                                 |
| `configPathmc`                       | Default config file location for minio client - mc                                                                                      | `~/.mc`                                    |
| `mountPath`                          | Default mount location for persistent drive                                                                                             | `/export`                                  |
| `clusterDomain`                      | domain name of kubernetes cluster where pod is running.                                                                                 | `cluster.local`                            |
| `service.type`                       | Kubernetes service type                                                                                                                 | `ClusterIP`                                |
| `service.port`                       | Kubernetes port where service is exposed                                                                                                | `9000`                                     |
| `service.externalIPs`                | service external IP addresses                                                                                                           | `nil`                                      |
| `service.annotations`                | Service annotations                                                                                                                     | `{}`                                       |
| `persistence.enabled`                | Use persistent volume to store data                                                                                                     | `true`                                     |
| `persistence.size`                   | Size of persistent volume claim                                                                                                         | `10Gi`                                     |
| `persistence.existingClaim`          | Use an existing PVC to persist data                                                                                                     | `nil`                                      |
| `persistence.storageClass`           | Storage class name of PVC                                                                                                               | `nil`                                      |
| `persistence.accessMode`             | ReadWriteOnce or ReadOnly                                                                                                               | `ReadWriteOnce`                            |
| `persistence.subPath`                | Mount a sub directory of the persistent volume if set                                                                                   | `""`                                       |
| `resources`                          | CPU/Memory resource requests/limits                                                                                                     | Memory: `256Mi`, CPU: `100m`               |
| `priorityClassName`                  | Pod priority settings                                                                                                                   | `""`                                       |
| `nodeSelector`                       | Node labels for pod assignment                                                                                                          | `{}`                                       |
| `affinity`                           | Affinity settings for pod assignment                                                                                                    | `{}`                                       |
| `tolerations`                        | Toleration labels for pod assignment                                                                                                    | `[]`                                       |
| `podAnnotations`                     | Pod annotations                                                                                                                         | `{}`                                       |
| `tls.enabled`                        | Enable TLS for Minio server                                                                                                             | `false`                                    |
| `tls.certSecret`                     | Kubernetes Secret with `public.crt` and `private.key` files.                                                                            | `""`                                       |
| `livenessProbe.initialDelaySeconds`  | Delay before liveness probe is initiated                                                                                                | `5`                                        |
| `livenessProbe.periodSeconds`        | How often to perform the probe                                                                                                          | `30`                                       |
| `livenessProbe.timeoutSeconds`       | When the probe times out                                                                                                                | `1`                                        |
| `livenessProbe.successThreshold`     | Minimum consecutive successes for the probe to be considered successful after having failed.                                            | `1`                                        |
| `livenessProbe.failureThreshold`     | Minimum consecutive failures for the probe to be considered failed after having succeeded.                                              | `3`                                        |
| `readinessProbe.initialDelaySeconds` | Delay before readiness probe is initiated                                                                                               | `5`                                        |
| `readinessProbe.periodSeconds`       | How often to perform the probe                                                                                                          | `15`                                       |
| `readinessProbe.timeoutSeconds`      | When the probe times out                                                                                                                | `1`                                        |
| `readinessProbe.successThreshold`    | Minimum consecutive successes for the probe to be considered successful after having failed.                                            | `1`                                        |
| `readinessProbe.failureThreshold`    | Minimum consecutive failures for the probe to be considered failed after having succeeded.                                              | `3`                                        |
| `defaultBucket.enabled`              | If set to true, a bucket will be created after minio install                                                                            | `false`                                    |
| `defaultBucket.name`                 | Bucket name                                                                                                                             | `bucket`                                   |
| `defaultBucket.policy`               | Bucket policy                                                                                                                           | `none`                                     |
| `defaultBucket.purge`                | Purge the bucket if already exists                                                                                                      | `false`                                    |
| `buckets`                            | List of buckets to create after minio install                                                                                           | `[]`                                       |
| `s3gateway.enabled`                  | Use minio as a [s3 gateway](https://github.com/minio/minio/blob/master/docs/gateway/s3.md)                                              | `false`                                    |
| `s3gateway.replicas`                 | Number of s3 gateway instances to run in parallel                                                                                       | `4`                                        |
| `s3gateway.serviceEndpoint`          | Endpoint to the S3 compatible service                                                                                                   | `""`                                       |
| `azuregateway.enabled`               | Use minio as an [azure gateway](https://docs.minio.io/docs/minio-gateway-for-azure)                                                     | `false`                                    |
| `gcsgateway.enabled`                 | Use minio as a [Google Cloud Storage gateway](https://docs.minio.io/docs/minio-gateway-for-gcs)                                         | `false`                                    |
| `gcsgateway.gcsKeyJson`              | credential json file of service account key                                                                                             | `""`                                       |
| `gcsgateway.projectId`               | Google cloud project id                                                                                                                 | `""`                                       |
| `ossgateway.enabled`                 | Use minio as an [Alibaba Cloud Object Storage Service gateway](https://github.com/minio/minio/blob/master/docs/gateway/oss.md)          | `false`                                    |
| `ossgateway.replicas`                | Number of oss gateway instances to run in parallel                                                                                      | `4`                                        |
| `ossgateway.endpointURL`             | OSS server endpoint.                                                                                                                    | `""`                                       |
| `nasgateway.enabled`                 | Use minio as a [NAS gateway](https://docs.minio.io/docs/minio-gateway-for-nas)                                                          | `false`                                    |
| `nasgateway.replicas`                | Number of NAS gateway instances to be run in parallel on a PV                                                                           | `4`                                        |
| `environment`                        | Set Minio server relevant environment variables in `values.yaml` file. Minio containers will be passed these variables when they start. | `MINIO_BROWSER: "on"`                      |

Some of the parameters above map to the env variables defined in the [Minio DockerHub image](https://hub.docker.com/r/minio/minio/).

You can specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set persistence.size=100Gi \
    stable/minio
```

The above command deploys Minio server with a 100Gi backing persistent volume.

Alternately, you can provide a YAML file that specifies parameter values while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/minio
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Distributed Minio

This chart provisions a Minio server in standalone mode, by default. To provision Minio server in [distributed mode](https://docs.minio.io/docs/distributed-minio-quickstart-guide), set the `mode` field to `distributed`,

```bash
$ helm install --set mode=distributed stable/minio
```

This provisions Minio server in distributed mode with 4 nodes. To change the number of nodes in your distributed Minio server, set the `replicas` field,

```bash
$ helm install --set mode=distributed,replicas=8 stable/minio
```

This provisions Minio server in distributed mode with 8 nodes. Note that the `replicas` value should be an integer between 4 and 16 (inclusive).

### StatefulSet [limitations](http://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/#limitations) applicable to distributed Minio

1. StatefulSets need persistent storage, so the `persistence.enabled` flag is ignored when `mode` is set to `distributed`.
2. When uninstalling a distributed Minio release, you'll need to manually delete volumes associated with the StatefulSet.

## NAS Gateway

### Prerequisites

Minio in [NAS gateway mode](https://docs.minio.io/docs/minio-gateway-for-nas) can be used to create multiple Minio instances backed by single PV in `ReadWriteMany` mode. Currently few [Kubernetes volume plugins](https://kubernetes.io/docs/user-guide/persistent-volumes/#access-modes) support `ReadWriteMany` mode. To deploy Minio NAS gateway with Helm chart you'll need to have a Persistent Volume running with one of the supported volume plugins. [This document](https://kubernetes.io/docs/user-guide/volumes/#nfs)
outlines steps to create a NFS PV in Kubernetes cluster.

### Provision NAS Gateway Minio instances

To provision Minio servers in [NAS gateway mode](https://docs.minio.io/docs/minio-gateway-for-nas), set the `nasgateway.enabled` field to `true`,

```bash
$ helm install --set nasgateway.enabled=true stable/minio
```

This provisions 4 Minio NAS gateway instances backed by single storage. To change the number of instances in your Minio deployment, set the `replicas` field,

```bash
$ helm install --set nasgateway.enabled=true,nasgateway.replicas=8 stable/minio
```

This provisions Minio NAS gateway with 8 instances.

## Persistence

This chart provisions a PersistentVolumeClaim and mounts corresponding persistent volume to default location `/export`. You'll need physical storage available in the Kubernetes cluster for this to work. If you'd rather use `emptyDir`, disable PersistentVolumeClaim by:

```bash
$ helm install --set persistence.enabled=false stable/minio
```

> _"An emptyDir volume is first created when a Pod is assigned to a Node, and exists as long as that Pod is running on that node. When a Pod is removed from a node for any reason, the data in the emptyDir is deleted forever."_

## Existing PersistentVolumeClaim

If a Persistent Volume Claim already exists, specify it during installation.

1. Create the PersistentVolume
2. Create the PersistentVolumeClaim
3. Install the chart

```bash
$ helm install --set persistence.existingClaim=PVC_NAME stable/minio
```

## NetworkPolicy

To enable network policy for Minio,
install [a networking plugin that implements the Kubernetes
NetworkPolicy spec](https://kubernetes.io/docs/tasks/administer-cluster/declare-network-policy#before-you-begin),
and set `networkPolicy.enabled` to `true`.

For Kubernetes v1.5 & v1.6, you must also turn on NetworkPolicy by setting
the DefaultDeny namespace annotation. Note: this will enforce policy for _all_ pods in the namespace:

    kubectl annotate namespace default "net.beta.kubernetes.io/network-policy={\"ingress\":{\"isolation\":\"DefaultDeny\"}}"

With NetworkPolicy enabled, traffic will be limited to just port 9000.

For more precise policy, set `networkPolicy.allowExternal=true`. This will
only allow pods with the generated client label to connect to Minio.
This label will be displayed in the output of a successful install.

## Existing secret

Instead of having this chart create the secret for you, you can supply a preexisting secret, much
like an existing PersistentVolumeClaim.

First, create the secret:

```bash
$ kubectl create secret generic my-minio-secret --from-literal=accesskey=foobarbaz --from-literal=secretkey=foobarbazqux
```

Then install the chart, specifying that you want to use an existing secret:

```bash
$ helm install --set existingSecret=my-minio-secret stable/minio
```

The following fields are expected in the secret

1. `accesskey` - the access key ID
2. `secretkey` - the secret key
3. `gcs_key.json` - The GCS key if you are using the GCS gateway feature. This is optional.

## Configure TLS

To enable TLS for Minio containers, acquire TLS certificates from a CA or create self-signed certificates. While creating / acquiring certificates ensure the corresponding domain names are set as per the standard [DNS naming conventions](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#pod-identity) in a Kubernetes StatefulSet (for a distributed Minio setup). Then create a secret using

```bash
$ kubectl create secret generic tls-ssl-minio --from-file=path/to/private.key --from-file=path/to/public.crt
```

Then install the chart, specifying that you want to use the TLS secret:

```bash
$ helm install --set tls.enabled=true,tls.certSecret=tls-ssl-minio stable/minio
```

## Pass environment variables to Minio containers

To pass environment variables to Minio containers when deploying via Helm chart, use the below command line format

```bash
$ helm install --set environment.MINIO_BROWSER=on,environment.MINIO_DOMAIN=domain-name stable/minio
```

You can add as many environment variables as required, using the above format. Just add `environment.<VARIABLE_NAME>=<value>` under `set` flag.

## Create buckets after install

Install the chart, specifying the buckets you want to create after install:

```bash
$ helm install --set buckets[0].name=bucket1,buckets[0].policy=none,buckets[0].purge=false stable/minio
```

Description of the configuration parameters used above -

1. `buckets[].name` - name of the bucket to create, must be a string with length > 0
2. `buckets[].policy` - Can be one of none|download|upload|public
3. `buckets[].purge` - Purge if bucket exists already
