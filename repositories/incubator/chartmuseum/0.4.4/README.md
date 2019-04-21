# `@helm-charts/incubator-chartmuseum`

Helm Chart Repository with support for Amazon S3 and Google Cloud Storage

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | incubator   |
| Chart Name          | chartmuseum |
| Chart Version       | 0.4.4       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
replicaCount: 1
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 0
image:
  repository: chartmuseum/chartmuseum
  tag: v0.4.2
  pullPolicy: IfNotPresent
env:
  open:
    # storage backend, can be one of: local, alibaba, amazon, google, microsoft
    STORAGE: local
    # oss bucket to store charts for alibaba storage backend
    STORAGE_ALIBABA_BUCKET:
    # prefix to store charts for alibaba storage backend
    STORAGE_ALIBABA_PREFIX:
    # oss endpoint to store charts for alibaba storage backend
    STORAGE_ALIBABA_ENDPOINT:
    # server side encryption algorithm for alibaba storage backend, can be one
    # of: AES256 or KMS
    STORAGE_ALIBABA_SSE:
    # s3 bucket to store charts for amazon storage backend
    STORAGE_AMAZON_BUCKET:
    # prefix to store charts for amazon storage backend
    STORAGE_AMAZON_PREFIX:
    # region of s3 bucket to store charts
    STORAGE_AMAZON_REGION:
    # alternative s3 endpoint
    STORAGE_AMAZON_ENDPOINT:
    # server side encryption algorithm
    STORAGE_AMAZON_SSE:
    # gcs bucket to store charts for google storage backend
    STORAGE_GOOGLE_BUCKET:
    # prefix to store charts for google storage backend
    STORAGE_GOOGLE_PREFIX:
    # container to store charts for microsoft storage backend
    STORAGE_MICROSOFT_CONTAINER:
    # prefix to store charts for microsoft storage backend
    STORAGE_MICROSOFT_PREFIX:
    # form field which will be queried for the chart file content
    CHART_POST_FORM_FIELD_NAME: chart
    # form field which will be queried for the provenance file content
    PROV_POST_FORM_FIELD_NAME: prov
    # show debug messages
    DEBUG: false
    # output structured logs as json
    LOG_JSON: true
    # disable Prometheus metrics
    DISABLE_METRICS: true
    # disable all routes prefixed with /api
    DISABLE_API: true
    # allow chart versions to be re-uploaded
    ALLOW_OVERWRITE: false
    # absolute url for .tgzs in index.yaml
    CHART_URL:
    # allow anonymous GET operations when auth is used
    AUTH_ANONYMOUS_GET: false
    # sets the base context path
    CONTEXT_PATH:
    # parallel scan limit for the repo indexer
    INDEX_LIMIT: 0
  secret:
    # username for basic http authentication
    BASIC_AUTH_USER:
    # password for basic http authentication
    BASIC_AUTH_PASS:
deployment:
  ## Chartmuseum Deployment annotations
  annotations: {}
  #   name: value
replica:
  ## Chartmuseum Replicas annotations
  annotations: {}
  ## Read more about kube2iam to provide access to s3 https://github.com/jtblin/kube2iam
  #   iam.amazonaws.com/role: role-arn
service:
  type: ClusterIP
  externalPort: 8080
  internalPort: 8080
  nodePort:
  annotations: {}

resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 80m
    memory: 64Mi

nodeSelector: {}

tolerations: []

affinity: {}

persistence:
  Enabled: false
  AccessMode: ReadWriteOnce
  Size: 8Gi
  ## A manually managed Persistent Volume and Claim
  ## Requires Persistence.Enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # ExistingClaim:
  ## Chartmuseum data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # StorageClass: "-"

## Ingress for load balancer
ingress:
  enabled: false
## Chartmuseum Ingress labels
##
#   labels:
#     dns: "route53"

## Chartmuseum Ingress annotations
##
#   annotations:
#     kubernetes.io/ingress.class: nginx
#     kubernetes.io/tls-acme: "true"

## Chartmuseum Ingress hostnames
## Must be provided if Ingress is enabled
##
#   hosts:
#     chartmuseum.domain.com:
#         - /charts
#         - /index.yaml

## Chartmuseum Ingress TLS configuration
## Secrets must be manually created in the namespace
##
#   tls:
#   - secretName: chartmuseum-server-tls
#     hosts:
#     - chartmuseum.domain.com
```

</details>

---

# ChartMuseum Helm Chart

Deploy your own private ChartMuseum.

Please also see https://github.com/kubernetes-helm/chartmuseum

## Prerequisites

- Kubernetes with extensions/v1beta1 available
- [If enabled] A persistent storage resource and RW access to it
- [If enabled] Kubernetes StorageClass for dynamic provisioning

## Configuration

By default this chart will not have persistent storage, and the API service
will be _DISABLED_. This protects against unauthorized access to the API
with default configuration values.

For a more robust solution supply helm install with a custom values.yaml  
You are also required to create the StorageClass resource ahead of time:

```
kubectl create -f /path/to/storage_class.yaml
```

The following table lists common configurable parameters of the chart and
their default values. See values.yaml for all available options.

| Parameter                              | Description                                 | Default                   |
| -------------------------------------- | ------------------------------------------- | ------------------------- |
| `image.pullPolicy`                     | Container pull policy                       | `IfNotPresent`            |
| `image.repository`                     | Container image to use                      | `chartmuseum/chartmuseum` |
| `image.tag`                            | Container image tag to deploy               | `v0.4.2`                  |
| `persistence.accessMode`               | Access mode to use for PVC                  | `ReadWriteOnce`           |
| `persistence.enabled`                  | Whether to use a PVC for persistent storage | `false`                   |
| `persistence.size`                     | Amount of space to claim for PVC            | `8Gi`                     |
| `persistence.storageClass`             | Storage Class to use for PVC                | `-`                       |
| `replicaCount`                         | k8s replicas                                | `1`                       |
| `resources.limits.cpu`                 | Container maximum CPU                       | `100m`                    |
| `resources.limits.memory`              | Container maximum memory                    | `128Mi`                   |
| `resources.requests.cpu`               | Container requested CPU                     | `80m`                     |
| `resources.requests.memory`            | Container requested memory                  | `64Mi`                    |
| `nodeSelector`                         | Map of node labels for pod assignment       | `{}`                      |
| `tolerations`                          | List of node taints to tolerate             | `[]`                      |
| `affinity`                             | Map of node/pod affinities                  | `{}`                      |
| `env.open.STORAGE`                     | Storage Backend to use                      | `local`                   |
| `env.open.ALIBABA_BUCKET`              | Bucket to store charts in for Alibaba       | ``                        |
| `env.open.ALIBABA_PREFIX`              | Prefix to store charts under for Alibaba    | ``                        |
| `env.open.ALIBABA_ENDPOINT`            | Alternative Alibaba endpoint                | ``                        |
| `env.open.ALIBABA_SSE`                 | Server side encryption algoritm to use      | ``                        |
| `env.open.AMAZON_BUCKET`               | Bucket to store charts in for AWS           | ``                        |
| `env.open.AMAZON_ENDPOINT`             | Alternative AWS endpoint                    | ``                        |
| `env.open.AMAZON_PREFIX`               | Prefix to store charts under for AWS        | ``                        |
| `env.open.AMAZON_REGION`               | Region to use for bucket access for AWS     | ``                        |
| `env.open.AMAZON_SSE`                  | Server side encryption algoritm to use      | ``                        |
| `env.open.GOOGLE_BUCKET`               | Bucket to store charts in for GCP           | ``                        |
| `env.open.GOOGLE_PREFIX`               | Prefix to store charts under for GCP        | ``                        |
| `env.open.STORAGE_MICROSOFT_CONTAINER` | Container to store charts under for MS      | ``                        |
| `env.open.STORAGE_MICROSOFT_PREFIX`    | Prefix to store charts under for MS         | ``                        |
| `env.open.CHART_POST_FORM_FIELD_NAME`  | Form field to query for chart file content  | ``                        |
| `env.open.PROV_POST_FORM_FIELD_NAME`   | Form field to query for chart provenance    | ``                        |
| `env.open.DEBUG`                       | Show debug messages                         | `false`                   |
| `env.open.LOG_JSON`                    | Output structured logs in JSON              | `true`                    |
| `env.open.DISABLE_METRICS`             | Disable Prometheus metrics                  | `true`                    |
| `env.open.DISABLE_API`                 | Disable all routes prefixed with /api       | `true`                    |
| `env.open.ALLOW_OVERWRITE`             | Allow chart versions to be re-uploaded      | `false`                   |
| `env.open.CHART_URL`                   | Absolute url for .tgzs in index.yaml        | ``                        |
| `env.open.AUTH_ANONYMOUS_GET`          | Allow anon GET operations when auth is used | `false`                   |
| `env.open.CONTEXT_PATH`                | Set the base context path                   | ``                        |
| `env.open.INDEX_LIMIT`                 | Parallel scan limit for the repo indexer    | ``                        |
| `env.secret.BASIC_AUTH_USER`           | Username for basic HTTP authentication      | ``                        |
| `env.secret.BASIC_AUTH_PASS`           | Password for basic HTTP authentication      | ``                        |

secret: # username for basic http authentication
BASIC_AUTH_USER: # password for basic http authentication
BASIC_AUTH_PASS:

Specify each parameter using the `--set key=value[,key=value]` argument to
`helm install`.

## Installation

```shell
helm install --name my-chartmuseum -f custom.yaml incubator/chartmuseum
```

## Uninstall

By default, a deliberate uninstall will result in the persistent volume
claim being deleted.

```shell
helm delete my-chartmuseum
```

To delete the deployment and its history:

```shell
helm delete --purge my-chartmuseum
```

## Example storage

Example storage-class.yaml provided here for use with a Ceph cluster.

```
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: storage-volume
provisioner: kubernetes.io/rbd
parameters:
  monitors: "10.11.12.13:4567,10.11.12.14:4567"
  adminId: admin
  adminSecretName: thesecret
  adminSecretNamespace: default
  pool: chartstore
  userId: user
  userSecretName: thesecret
```
