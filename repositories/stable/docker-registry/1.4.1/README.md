# `@helm-charts/stable-docker-registry`

A Helm chart for Docker Registry

| Field               | Value           |
| ------------------- | --------------- |
| Repository Name     | stable          |
| Chart Name          | docker-registry |
| Chart Version       | 1.4.1           |
| NPM Package Version | 0.1.0           |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for docker-registry.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1

updateStrategy:
  # type: RollingUpdate
  # rollingUpdate:
  #   maxSurge: 1
  #   maxUnavailable: 0

podAnnotations: {}

image:
  repository: registry
  tag: 2.6.2
  pullPolicy: IfNotPresent
# imagePullSecrets:
# - docker
service:
  name: registry
  type: ClusterIP
  # clusterIP:
  port: 5000
  # nodePort:
  annotations: {}
  # foo.io/bar: "true"
ingress:
  enabled: false
  path: /
  # Used to create an Ingress record.
  hosts:
    - chart-example.local
  annotations:
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  tls:
    # Secrets must be manually created in the namespace.
    # - secretName: chart-example-tls
    #   hosts:
    #     - chart-example.local
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
persistence:
  accessMode: 'ReadWriteOnce'
  enabled: false
  size: 10Gi
  # storageClass: '-'

# set the type of filesystem to use: filesystem, s3
storage: filesystem

# Set this to name of secret for tls certs
# tlsSecretName: registry.docker.example.com
secrets:
  haSharedSecret: ''
  htpasswd: ''
# Secrets for S3 access and secret keys
#   s3:
#     accessKey: ""
#     secretKey: ""
# Secrets for Swift username and password
#   swift:
#     username: ""
#     password: ""

# Options for s3 storage type:
# s3:
#  region: us-east-1
#  bucket: my-bucket
#  encrypt: false
#  secure: true

# Options for swift storage type:
# swift:
#  authurl: http://swift.example.com/
#  container: my-container

configData:
  version: 0.1
  log:
    fields:
      service: registry
  storage:
    cache:
      blobdescriptor: inmemory
  http:
    addr: :5000
    headers:
      X-Content-Type-Options: [nosniff]
  health:
    storagedriver:
      enabled: true
      interval: 10s
      threshold: 3
```

</details>

---

# Docker Registry Helm Chart

This directory contains a Kubernetes chart to deploy a private Docker Registry.

## Prerequisites Details

- PV support on underlying infrastructure (if persistence is required)

## Chart Details

This chart will do the following:

- Implement a Docker registry deployment

## Installing the Chart

To install the chart, use the following:

```console
$ helm install stable/docker-registry
```

## Configuration

The following table lists the configurable parameters of the docker-registry chart and
their default values.

| Parameter                   | Description                                                                                | Default                                                  |
| :-------------------------- | :----------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| `image.pullPolicy`          | Container pull policy                                                                      | `IfNotPresent`                                           |
| `image.repository`          | Container image to use                                                                     | `registry`                                               |
| `image.tag`                 | Container image tag to deploy                                                              | `2.6.2`                                                  |
| `imagePullSecrets`          | Specify image pull secrets                                                                 | `nil` (does not add image pull secrets to deployed pods) |
| `persistence.accessMode`    | Access mode to use for PVC                                                                 | `ReadWriteOnce`                                          |
| `persistence.enabled`       | Whether to use a PVC for the Docker storage                                                | `false`                                                  |
| `persistence.size`          | Amount of space to claim for PVC                                                           | `10Gi`                                                   |
| `persistence.storageClass`  | Storage Class to use for PVC                                                               | `-`                                                      |
| `persistence.existingClaim` | Name of an existing PVC to use for config                                                  | `nil`                                                    |
| `service.port`              | TCP port on which the service is exposed                                                   | `5000`                                                   |
| `service.type`              | service type                                                                               | `ClusterIP`                                              |
| `service.clusterIP`         | if `service.type` is `ClusterIP` and this is non-empty, sets the cluster IP of the service | `nil`                                                    |
| `service.nodePort`          | if `service.type` is `NodePort` and this is non-empty, sets the node port of the service   | `nil`                                                    |
| `replicaCount`              | k8s replicas                                                                               | `1`                                                      |
| `updateStrategy`            | update strategy for deployment                                                             | `{}`                                                     |
| `podAnnotations`            | Annotations for pod                                                                        | `{}`                                                     |
| `resources.limits.cpu`      | Container requested CPU                                                                    | `nil`                                                    |
| `resources.limits.memory`   | Container requested memory                                                                 | `nil`                                                    |
| `storage`                   | Storage system to use                                                                      | `filesystem`                                             |
| `tlsSecretName`             | Name of secret for TLS certs                                                               | `nil`                                                    |
| `secrets.htpasswd`          | Htpasswd authentication                                                                    | `nil`                                                    |
| `secrets.s3.accessKey`      | Access Key for S3 configuration                                                            | `nil`                                                    |
| `secrets.s3.secretKey`      | Secret Key for S3 configuration                                                            | `nil`                                                    |
| `secrets.swift.username`    | Username for Swift configuration                                                           | `nil`                                                    |
| `secrets.swift.password`    | Password for Swift configuration                                                           | `nil`                                                    |
| `haSharedSecret`            | Shared secret for Registry                                                                 | `nil`                                                    |
| `configData`                | Configuration hash for docker                                                              | `nil`                                                    |
| `s3.region`                 | S3 region                                                                                  | `nil`                                                    |
| `s3.bucket`                 | S3 bucket name                                                                             | `nil`                                                    |
| `s3.encrypt`                | Store images in encrypted format                                                           | `nil`                                                    |
| `s3.secure`                 | Use HTTPS                                                                                  | `nil`                                                    |
| `swift.authurl`             | Swift authurl                                                                              | `nil`                                                    |
| `swift.container`           | Swift container                                                                            | `nil`                                                    |

Specify each parameter using the `--set key=value[,key=value]` argument to
`helm install`.

To generate htpasswd file, run this docker command:
`docker run --entrypoint htpasswd registry:2 -Bbn user password > ./htpasswd`.
