# `@helm-charts/stable-kong`

Kong is open-source API Gateway and Microservices Management Layer, delivering high performance and reliability that can be used as Kubernetes Ingress.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | kong   |
| Chart Version       | 0.6.2  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for kong.
# Declare variables to be passed into your templates.

image:
  repository: kong
  tag: 0.14.1
  pullPolicy: IfNotPresent
  ## Optionally specify an array of imagePullSecrets.
  ## Secrets must be manually created in the namespace.
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  ##
  # pullSecrets:
  #   - myRegistrKeySecretName

waitImage:
  repository: busybox
  tag: latest

# Specify Kong admin and proxy services configurations
admin:
  # If you want to specify annotations for the admin service, uncomment the following
  # line, add additional or adjust as needed, and remove the curly braces after 'annotations:'.
  annotations: {}
  #  service.beta.kubernetes.io/aws-load-balancer-proxy-protocol: "*"

  # HTTPS traffic on the admin port
  # if set to false also set readinessProbe and livenessProbe httpGet scheme's to 'HTTP'
  useTLS: true
  servicePort: 8444
  containerPort: 8444
  # Kong admin service type
  type: NodePort
  # Set a nodePort which is available
  # nodePort: 32444
  # Kong admin ingress settings.
  ingress:
    # Enable/disable exposure using ingress.
    enabled: false
    # TLS secret name.
    # tls: kong-admin.example.com-tls
    # Array of ingress hosts.
    hosts: []
    # Map of ingress annotations.
    annotations: {}
    # Ingress path.
    path: /

proxy:
  # If you want to specify annotations for the proxy service, uncomment the following
  # line, add additional or adjust as needed, and remove the curly braces after 'annotations:'.
  annotations: {}
  #  service.beta.kubernetes.io/aws-load-balancer-proxy-protocol: "*"

  # HTTPS traffic on the proxy port
  useTLS: true
  servicePort: 8443
  containerPort: 8443
  type: NodePort
  # Set a nodePort which is available
  # nodePort: 32443
  # Kong proxy ingress settings.
  ingress:
    # Enable/disable exposure using ingress.
    enabled: false
    # TLS secret name.
    # tls: kong-proxy.example.com-tls
    # Array of ingress hosts.
    hosts: []
    # Map of ingress annotations.
    annotations: {}
    # Ingress path.
    path: /

# Set runMigrations to run Kong migrations
runMigrations: true

# Specify Kong configurations
# Kong configurations guide https://getkong.org/docs/latest/configuration/
env:
  database: postgres

# If you want to specify resources, uncomment the following
# lines, adjust them as necessary, and remove the curly braces after 'resources:'.
resources:
  {}
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

# readinessProbe for Kong pods
readinessProbe:
  httpGet:
    path: '/status'
    port: admin
    scheme: HTTPS
  initialDelaySeconds: 30
  timeoutSeconds: 1
  periodSeconds: 10
  successThreshold: 1
  failureThreshold: 5

# livenessProbe for Kong pods
livenessProbe:
  httpGet:
    path: '/status'
    port: admin
    scheme: HTTPS
  initialDelaySeconds: 30
  timeoutSeconds: 5
  periodSeconds: 30
  successThreshold: 1
  failureThreshold: 5

# Affinity for pod assignment
# Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
# affinity: {}

# Tolerations for pod assignment
# Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
tolerations: []

# Node labels for pod assignment
# Ref: https://kubernetes.io/docs/user-guide/node-selection/
nodeSelector: {}

# Annotation to be added to Kong pods
podAnnotations: {}

# Kong pod count
replicaCount: 1

# Kong has a choice of either Postgres or Cassandra as a backend datatstore.
# This chart allows you to choose either of them with the `database.type`
# parameter.  Postgres is chosen by default.

# Additionally, this chart allows you to use your own database or spin up a new
# instance by using the `postgres.enabled` or `cassandra.enabled` parameters.
# Enabling both will create both databases in your cluster, but only one
# will be used by Kong based on the `env.database` parameter.
# Postgres is enabled by default.

# Cassandra chart configs
cassandra:
  enabled: false

# PostgreSQL chart configs
postgresql:
  enabled: true
  postgresUser: kong
  postgresDatabase: kong
  service:
    port: 5432

# Kong Ingress Controller's primary purpose is to satisfy Ingress resources
# created in k8s.  It uses CRDs for more fine grained control over routing and
# for Kong specific configuration.
ingressController:
  enabled: false
  image:
    repository: kong-docker-kubernetes-ingress-controller.bintray.io/kong-ingress-controller
    tag: 0.2.0
  replicaCount: 1
  livenessProbe:
    failureThreshold: 3
    httpGet:
      path: '/healthz'
      port: 10254
      scheme: HTTP
    initialDelaySeconds: 30
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 5
  readinessProbe:
    failureThreshold: 3
    httpGet:
      path: '/healthz'
      port: 10254
      scheme: HTTP
      initialDelaySeconds: 30
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 5

  rbac:
    # Specifies whether RBAC resources should be created
    create: true

  serviceAccount:
    # Specifies whether a ServiceAccount should be created
    create: true
    # The name of the ServiceAccount to use.
    # If not set and create is true, a name is generated using the fullname template
    name:
```

</details>

---

## Kong

[Kong](https://KongHQ.com/) is an open-source API Gateway and Microservices
Management Layer, delivering high performance and reliability.

## TL;DR;

```bash
$ helm install stable/kong
```

## Introduction

This chart bootstraps all the components needed to run Kong on a [Kubernetes](http://kubernetes.io)
cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled.
- PV provisioner support in the underlying infrastructure if persistence
  is needed for Kong datastore.

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/kong
```

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the
chart and deletes the release.

## Configuration

### General Configuration Parameters

The following table lists the configurable parameters of the Kong chart
and their default values.

| Parameter                      | Description                                                                      | Default        |
| ------------------------------ | -------------------------------------------------------------------------------- | -------------- |
| image.repository               | Kong image                                                                       | `kong`         |
| image.tag                      | Kong image version                                                               | `0.14.1`       |
| image.pullPolicy               | Image pull policy                                                                | `IfNotPresent` |
| image.pullSecrets              | Image pull secrets                                                               | `null`         |
| replicaCount                   | Kong instance count                                                              | `1`            |
| admin.useTLS                   | Secure Admin traffic                                                             | `true`         |
| admin.servicePort              | TCP port on which the Kong admin service is exposed                              | `8444`         |
| admin.containerPort            | TCP port on which Kong app listens for admin traffic                             | `8444`         |
| admin.nodePort                 | Node port when service type is `NodePort`                                        |                |
| admin.type                     | k8s service type, Options: NodePort, ClusterIP, LoadBalancer                     | `NodePort`     |
| admin.loadBalancerIP           | Will reuse an existing ingress static IP for the admin service                   | `null`         |
| admin.loadBalancerSourceRanges | Limit admin access to CIDRs if set and service type is `LoadBalancer`            | `[]`           |
| admin.ingress.enabled          | Enable ingress resource creation (works with proxy.type=ClusterIP)               | `false`        |
| admin.ingress.tls              | Name of secret resource, containing TLS secret                                   |                |
| admin.ingress.hosts            | List of ingress hosts.                                                           | `[]`           |
| admin.ingress.path             | Ingress path.                                                                    | `/`            |
| admin.ingress.annotations      | Ingress annotations. See documentation for your ingress controller for details   | `{}`           |
| proxy.useTLS                   | Secure Proxy traffic                                                             | `true`         |
| proxy.servicePort              | TCP port on which the Kong Proxy Service is exposed                              | `8443`         |
| proxy.containerPort            | TCP port on which the Kong app listens for Proxy traffic                         | `8443`         |
| proxy.nodePort                 | Node port when service type is `NodePort`                                        |                |
| proxy.type                     | k8s service type. Options: NodePort, ClusterIP, LoadBalancer                     | `NodePort`     |
| proxy.loadBalancerSourceRanges | Limit proxy access to CIDRs if set and service type is `LoadBalancer`            | `[]`           |
| proxy.loadBalancerIP           | To reuse an existing ingress static IP for the admin service                     |                |
| proxy.ingress.enabled          | Enable ingress resource creation (works with proxy.type=ClusterIP)               | `false`        |
| proxy.ingress.tls              | Name of secret resource, containing TLS secret                                   |                |
| proxy.ingress.hosts            | List of ingress hosts.                                                           | `[]`           |
| proxy.ingress.path             | Ingress path.                                                                    | `/`            |
| proxy.ingress.annotations      | Ingress annotations. See documentation for your ingress controller for details   | `{}`           |
| env                            | Additional [Kong configurations](https://getkong.org/docs/latest/configuration/) |                |
| runMigrations                  | Run Kong migrations job                                                          | `true`         |
| readinessProbe                 | Kong readiness probe                                                             |                |
| livenessProbe                  | Kong liveness probe                                                              |                |
| affinity                       | Node/pod affinities                                                              |                |
| nodeSelector                   | Node labels for pod assignment                                                   | `{}`           |
| podAnnotations                 | Annotations to add to each pod                                                   | `{}`           |
| resources                      | Pod resource requests & limits                                                   | `{}`           |
| tolerations                    | List of node taints to tolerate                                                  | `[]`           |

### Kong-specific parameters

Kong has a choice of either Postgres or Cassandra as a backend datatstore.
This chart allows you to choose either of them with the `env.database`
parameter. Postgres is chosen by default.

Additionally, this chart allows you to use your own database or spin up a new
instance by using the `postgres.enabled` or `cassandra.enabled` parameters.
Enabling both will create both databases in your cluster, but only one
will be used by Kong based on the `env.database` parameter.
Postgres is enabled by default.

| Parameter                    | Description                                                              | Default    |
| ---------------------------- | ------------------------------------------------------------------------ | ---------- |
| cassandra.enabled            | Spin up a new cassandra cluster for Kong                                 | `false`    |
| postgresql.enabled           | Spin up a new postgres instance for Kong                                 | `true`     |
| waitImage.repository         | Image used to wait for database to become ready                          | `busybox`  |
| waitImage.tag                | Tag for image used to wait for database to become ready                  | `latest`   |
| env.database                 | Choose either `postgres` or `cassandra`                                  | `postgres` |
| env.pg_user                  | Postgres username                                                        | `kong`     |
| env.pg_database              | Postgres database name                                                   | `kong`     |
| env.pg_password              | Postgres database password (required if you are using your own database) | `kong`     |
| env.pg_host                  | Postgres database host (required if you are using your own database)     | ``         |
| env.pg_port                  | Postgres database port                                                   | `5432`     |
| env.cassandra_contact_points | Cassandra contact points (required if you are using your own database)   | ``         |
| env.cassandra_port           | Cassandra query port                                                     | `9042`     |
| env.cassandra_keyspace       | Cassandra keyspace                                                       | `kong`     |
| env.cassandra_repl_factor    | Replication factor for the Kong keyspace                                 | `2`        |

For complete list of Kong configurations please check https://getkong.org/docs/0.11.x/configuration/.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install stable/kong --name my-release \
  --set=image.tag=0.11.2,env.database=cassandra,cassandra.enabled=true
```

Alternatively, a YAML file that specifies the values for the above parameters
can be provided while installing the chart. For example,

```console
$ helm install stable/kong --name my-release -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)

### Kong Ingress Controller

Kong Ingress Controller's primary purpose is to satisfy Ingress resources
created in your Kubernetes cluster.
It uses CRDs for more fine grained control over routing and
for Kong specific configuration.
To deploy the ingress controller together with
kong run the following command:

```bash
helm install stable/kong \
    --set ingressController.enabled=true \
    --set admin.useTLS=false \
    --set readinessProbe.httpGet.scheme=HTTP \
    --set livenessProbe.httpGet.scheme=HTTP
```

**Note**: Kong Ingress controller doesn't support custom SSL certificates
on Admin port. We will be removing this limitation in the future.

Kong ingress controller relies on several Custom Resource Definition objects to
declare the the Kong configurations and synchronize the configuration with the
Kong admin API. Each of this new objects declared in Kubernetes have a
one-to-one relation with a Kong resource.
The custom resources are:

- KongConsumer
- KongCredential
- kongPlugin
- KongIngress

You can can learn about kong ingress custom resource definitions here:
https://github.com/Kong/kubernetes-ingress-controller/blob/master/docs/custom-types.md

| Parameter        | Description                                 | Default                                                                      |
| ---------------- | ------------------------------------------- | ---------------------------------------------------------------------------- |
| enabled          | Deploy the ingress controller, rbac and crd | false                                                                        |
| replicaCount     | Number of desired ingress controllers       | 1                                                                            |
| image.repository | Docker image with the ingress controller    | kong-docker-kubernetes-ingress-controller.bintray.io/kong-ingress-controller |
| image.tag        | Version of the ingress controller           | 0.2.0                                                                        |
| readinessProbe   | Kong ingress controllers readiness probe    |                                                                              |
| livenessProbe    | Kong ingress controllers liveness probe     |                                                                              |
