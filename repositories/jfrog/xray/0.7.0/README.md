# `@helm-charts/jfrog-xray`

Universal component scan for security and license inventory and impact analysis

| Field               | Value |
| ------------------- | ----- |
| Repository Name     | jfrog |
| Chart Name          | xray  |
| Chart Version       | 0.7.0 |
| NPM Package Version | 0.1.0 |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for Xray HA.
# This is a YAML-formatted file.
# Beware when changing values here. You should know what you are doing!
# Access the values with {{ .Values.key.subkey }}

# General
imagePullPolicy: IfNotPresent
initContainerImage: 'alpine:3.6'
imagePullSecrets:

## Role Based Access
## Ref: https://kubernetes.io/docs/admin/authorization/rbac/
rbac:
  create: true
  role:
    ## Rules to create. It follows the role specification
    rules:
      - apiGroups:
          - ''
        resources:
          - services
          - endpoints
          - pods
        verbs:
          - get
          - watch
          - list

ingress:
  enabled: false
  defaultBackend:
    enabled: true
  # Used to create an Ingress record.
  hosts:
    - xray.domain.example
  annotations:
  # kubernetes.io/ingress.class: nginx
  # kubernetes.io/tls-acme: "true"
  tls:
  # Secrets must be manually created in the namespace.
  # - secretName: chart-example-tls
  #   hosts:
  #     - xray.domain.example

## Service Account
## Ref: https://kubernetes.io/docs/admin/service-accounts-admin/
##
serviceAccount:
  create: true
  ## The name of the ServiceAccount to use.
  ## If not set and create is true, a name is generated using the fullname template
  name:

# PostgreSQL
## Configuration values for the postgresql dependency
## ref: https://github.com/kubernetes/charts/blob/master/stable/postgresql/README.md
##
postgresql:
  enabled: true
  postgresDatabase: 'xraydb'
  postgresUser: 'xray'
  postgresPassword:
  postgresConfig:
    maxConnections: '500'
  service:
    port: 5432
  persistence:
    enabled: true
    size: 50Gi
    existingClaim:
  resources: {}
  #  requests:
  #    memory: "1Gi"
  #    cpu: "250m"
  #  limits:
  #    memory: "2Gi"
  #    cpu: "1"
  nodeSelector: {}
  affinity: {}
  tolerations: []

## Configuration values for the mongodb dependency
## ref: https://github.com/kubernetes/charts/blob/master/stable/mongodb/README.md
##
mongodb:
  enabled: true
  image:
    tag: 3.6.3
    pullPolicy: IfNotPresent
  persistence:
    size: 50Gi
  resources: {}
  #  requests:
  #    memory: "12Gi"
  #    cpu: "200m"
  #  limits:
  #    memory: "12Gi"
  #    cpu: "2"
  ## Make sure the --wiredTigerCacheSizeGB is no more than half the memory limit!
  ## This is critical to protect against OOMKill by Kubernetes!
  mongodbExtraFlags:
    - '--wiredTigerCacheSizeGB=1'
  mongodbRootPassword:
  mongodbUsername: xray
  mongodbPassword:
  mongodbDatabase: xray
  #  livenessProbe:
  #    initialDelaySeconds: 60
  #    periodSeconds: 10
  #  readinessProbe:
  #    initialDelaySeconds: 30
  #    periodSeconds: 30
  nodeSelector: {}
  affinity: {}
  tolerations: []

# RabbitMQ HA
## Configuration values for the rabbitmq-ha dependency
## ref: https://github.com/kubernetes/charts/blob/master/stable/rabbitmq-ha/README.md
##
rabbitmq-ha:
  enabled: true
  replicaCount: 1
  rabbitmqUsername: guest
  rabbitmqPassword:
  rabbitmqErlangCookie: XRAYRABBITMQCLUSTER
  rabbitmqMemoryHighWatermark: 500MB
  rabbitmqNodePort: 5672
  policies: |-
    {
      "name": "ha-all",
      "apply-to": "all",
      "pattern": ".*",
      "vhost": "/",
      "definition": {
        "ha-mode": "all",
        "ha-sync-mode": "automatic",
      }
    }
  resources: {}
  #  requests:
  #    memory: "250Mi"
  #    cpu: "100m"
  #  limits:
  #    memory: "550Mi"
  #    cpu: "200m"
  persistentVolume:
    enabled: true
    size: 20Gi
  rbac:
    create: true
  nodeSelector: {}
  tolerations: []

# RabbitMQ
## Configuration values for the rabbitmq dependency
## ref: https://github.com/kubernetes/charts/blob/master/stable/rabbitmq/README.md
##
rabbitmq:
  enabled: false
  rabbitmqErlangCookie: XRAYRABBITMQCLUSTER
  rabbitmqMemoryHighWatermark: 500MB
  rabbitmqNodePort: 5672
  rabbitmqUsername: user
  rabbitmqPassword:
  persistentVolume:
    enabled: true
    size: 20Gi
  rbac:
    create: true

# Common Xray settings
common:
  ## Note that by default we use appVersion to get image tag
  # xrayVersion:
  xrayConfigPath: /var/opt/jfrog/xray/data
  xrayUserId: 1035
  xrayGroupId: 1035
  stdOutEnabled: true
  ## Xray requires a unique master key
  ## You can generate one with the command:
  ## 'openssl rand -hex 32'
  ## Pass it to helm with '--set common.masterKey=${MASTER_KEY}'
  ## IMPORTANT: You should NOT use the example masterKey for a production deployment!
  masterKey: FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF

# For setting up external services, must pass the connection URL for them
global:
  mongoUrl:
  postgresqlUrl:

analysis:
  name: xray-analysis
  image: docker.bintray.io/jfrog/xray-analysis
  replicaCount: 1
  internalPort: 7000
  externalPort: 7000
  service:
    type: ClusterIP
  ## Container storage limit
  storage:
    sizeLimit: 10Gi
  resources: {}
  #  requests:
  #    memory: "1Gi"
  #    cpu: "100m"
  #  limits:
  #    memory: "2Gi"
  #    cpu: "1"
  nodeSelector: {}
  affinity: {}
  tolerations: []

indexer:
  name: xray-indexer
  image: docker.bintray.io/jfrog/xray-indexer
  replicaCount: 1
  internalPort: 7002
  externalPort: 7002
  service:
    type: ClusterIP
  ## Container storage limit
  storage:
    sizeLimit: 10Gi
  resources: {}
  #  requests:
  #    memory: "1Gi"
  #    cpu: "100m"
  #  limits:
  #    memory: "2Gi"
  #    cpu: "1"
  nodeSelector: {}
  affinity: {}
  tolerations: []

persist:
  name: xray-persist
  image: docker.bintray.io/jfrog/xray-persist
  replicaCount: 1
  internalPort: 7003
  externalPort: 7003
  service:
    type: ClusterIP
  ## Container storage limit
  storage:
    sizeLimit: 10Gi
  resources: {}
  #  requests:
  #    memory: "1Gi"
  #    cpu: "100m"
  #  limits:
  #    memory: "2Gi"
  #    cpu: "1"
  nodeSelector: {}
  affinity: {}
  tolerations: []

server:
  name: xray-server
  image: docker.bintray.io/jfrog/xray-server
  replicaCount: 1
  internalPort: 8000
  externalPort: 80
  service:
    type: LoadBalancer
    name: xray
  ## Container storage limit
  storage:
    sizeLimit: 10Gi
  # Whitelist IPs allowed to LoadBalancer type services
  # Example: loadBalancerSourceRanges={82.82.190.51/32,141.141.8.8/32}
  loadBalancerSourceRanges: []
  resources: {}
  #  requests:
  #    memory: "1Gi"
  #    cpu: "100m"
  #  limits:
  #    memory: "2Gi"
  #    cpu: "1"
  nodeSelector: {}
  affinity: {}
  tolerations: []
```

</details>

---

# JFrog Xray HA on Kubernetes Helm Chart

## Prerequisites Details

- Kubernetes 1.8+

## Chart Details

This chart will do the following:

- Optionally deploy PostgreSQL, MongoDB
- Deploy RabbitMQ (optionally as an HA cluster)
- Deploy JFrog Xray micro-services

## Requirements

- A running Kubernetes cluster
  - Dynamic storage provisioning enabled
  - Default StorageClass set to allow services using the default StorageClass for persistent storage
- A running Artifactory
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) installed and setup to use the cluster
- [Helm](https://helm.sh/) installed and setup to use the cluster (helm init)

## Install JFrog Xray

### Add JFrog Helm repository

Before installing JFrog helm charts, you need to add the [JFrog helm repository](https://charts.jfrog.io/) to your helm client

```bash
helm repo add jfrog https://charts.jfrog.io
```

### Install Chart

Install JFrog Xray

```bash
helm install -n xray jfrog/xray
```

## Status

See the status of your deployed **helm** releases

```bash
helm status xray
```

## Upgrade

To upgrade an existing Xray, you still use **helm**

```bash
# Update existing deployed version to 2.1.2
helm upgrade --set common.xrayVersion=2.1.2 jfrog/xray
```

## Remove

Removing a **helm** release is done with

```bash
# Remove the Xray services and data tools
helm delete --purge xray

# Remove the data disks
kubectl delete pvc -l release=xray
```

### Create a unique Master Key

JFrog Xray requires a unique master key to be used by all micro-services in the same cluster. By default the chart has one set in values.yaml (`common.masterKey`).

**This key is for demo purpose and should not be used in a production environment!**

You should generate a unique one and pass it to the template at install/upgrade time.

```bash
# Create a key
export MASTER_KEY=$(openssl rand -hex 32)
echo ${MASTER_KEY}

# Pass the created master key to helm
helm install --set common.masterKey=${MASTER_KEY} -n xray jfrog/xray
```

**NOTE:** Make sure to pass the same master key with `--set common.masterKey=${MASTER_KEY}` on all future calls to `helm install` and `helm upgrade`!

## Special deployments

This is a list of special use cases for non-standard deployments

### High Availability

For **high availability** of Xray, set the replica count per service be equal or higher than **2**. Recommended is **3**.

> It is highly recommended to also set **RabbitMQ** to run as an HA cluster.

```bash
# Start Xray with 3 replicas per service and 3 replicas for RabbitMQ
helm install -n xray --set analysis.replicaCount=3,server.replicaCount=3,indexer.replicaCount=3,persist.replicaCount=3,rabbitmq-ha.replicaCount=3 jfrog/xray
```

### External Databases

There is an option to use external database services (MongoDB or PostgreSQL) for your Xray.

#### MongoDB

To use an external **MongoDB**, You need to set Xray **MongoDB** connection URL.

For this, pass the parameter: `global.mongoUrl=${XRAY_MONGODB_CONN_URL}`.

**IMPORTANT:** Make sure the DB is already created before deploying Xray services

```bash
# Passing a custom MongoDB to Xray

# Example
# MongoDB host: custom-mongodb.local
# MongoDB port: 27017
# MongoDB user: xray
# MongoDB password: password1_X

export XRAY_MONGODB_CONN_URL='mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@custom-mongodb.local:27017/?authSource=${MONGODB_DATABSE}&authMechanism=SCRAM-SHA-1'
helm install -n xray --set global.mongoUrl=${XRAY_MONGODB_CONN_URL} jfrog/xray
```

#### PostgreSQL

To use an external **PostgreSQL**, You need to disable the use of the bundled **PostgreSQL** and set a custom **PostgreSQL** connection URL.

For this, pass the parameters: `postgresql.enabled=false` and `global.postgresqlUrl=${XRAY_POSTGRESQL_CONN_URL}`.

**IMPORTANT:** Make sure the DB is already created before deploying Xray services

```bash
# Passing a custom PostgreSQL to Xray

# Example
# PostgreSQL host: custom-postgresql.local
# PostgreSQL port: 5432
# PostgreSQL user: xray
# PostgreSQL password: password2_X

export XRAY_POSTGRESQL_CONN_URL='postgres://${POSTGRESQL_USER}:${POSTGRESQL_PASSWORD}@custom-postgresql.local:5432/${POSTGRESQL_DATABASE}?sslmode=disable'
helm install -n xray --set postgresql.enabled=false,global.postgresqlUrl=${XRAY_POSTGRESQL_CONN_URL} jfrog/xray
```

## Configuration

The following table lists the configurable parameters of the xray chart and their default values.

| Parameter                                    | Description                                                                    | Default                                                            |
| -------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `imagePullSecrets`                           | Docker registry pull secret                                                    |                                                                    |
| `imagePullPolicy`                            | Container pull policy                                                          | `IfNotPresent`                                                     |
| `initContainerImage`                         | Init container image                                                           | `alpine:3.6`                                                       |
| `serviceAccount.create`                      | Specifies whether a ServiceAccount should be created                           | `true`                                                             |
| `serviceAccount.name`                        | The name of the ServiceAccount to create                                       | Generated using the fullname template                              |
| `rbac.create`                                | Specifies whether RBAC resources should be created                             | `true`                                                             |
| `rbac.role.rules`                            | Rules to create                                                                | `[]`                                                               |
| `ingress.enabled`                            | If true, Xray Ingress will be created                                          | `false`                                                            |
| `ingress.annotations`                        | Xray Ingress annotations                                                       | `{}`                                                               |
| `ingress.hosts`                              | Xray Ingress hostnames                                                         | `[]`                                                               |
| `ingress.tls`                                | Xray Ingress TLS configuration (YAML)                                          | `[]`                                                               |
| `ingress.defaultBackend.enabled`             | If true, the default `backend` will be added using serviceName and servicePort | `true`                                                             |
| `postgresql.enabled`                         | Use enclosed PostgreSQL as database                                            | `true`                                                             |
| `postgresql.postgresDatabase`                | PostgreSQL database name                                                       | `xraydb`                                                           |
| `postgresql.postgresUser`                    | PostgreSQL database user                                                       | `xray`                                                             |
| `postgresql.postgresPassword`                | PostgreSQL database password                                                   | ``                                                                 |
| `postgresql.postgresConfig.maxConnections`   | PostgreSQL max_connections parameter                                           | `500`                                                              |
| `postgresql.persistence.enabled`             | PostgreSQL use persistent storage                                              | `true`                                                             |
| `postgresql.persistence.size`                | PostgreSQL persistent storage size                                             | `50Gi`                                                             |
| `postgresql.persistence.existingClaim`       | PostgreSQL use existing persistent storage                                     | ``                                                                 |
| `postgresql.service.port`                    | PostgreSQL database port                                                       | `5432`                                                             |
| `postgresql.resources.requests.memory`       | PostgreSQL initial memory request                                              |                                                                    |
| `postgresql.resources.requests.cpu`          | PostgreSQL initial cpu request                                                 |                                                                    |
| `postgresql.resources.limits.memory`         | PostgreSQL memory limit                                                        |                                                                    |
| `postgresql.resources.limits.cpu`            | PostgreSQL cpu limit                                                           |                                                                    |
| `postgresql.nodeSelector`                    | PostgreSQL node selector                                                       | `{}`                                                               |
| `postgresql.affinity`                        | PostgreSQL node affinity                                                       | `{}`                                                               |
| `postgresql.tolerations`                     | PostgreSQL node tolerations                                                    | `[]`                                                               |
| `mongodb.enabled`                            | Enable Mongodb                                                                 | `true`                                                             |
| `mongodb.image.tag`                          | Mongodb docker image tag                                                       | `3.6.3`                                                            |
| `mongodb.image.pullPolicy`                   | Mongodb Container pull policy                                                  | `IfNotPresent`                                                     |
| `mongodb.persistence.enabled`                | Mongodb persistence volume enabled                                             | `true`                                                             |
| `mongodb.persistence.existingClaim`          | Use an existing PVC to persist data                                            | `nil`                                                              |
| `mongodb.persistence.storageClass`           | Storage class of backing PVC                                                   | `generic`                                                          |
| `mongodb.persistence.size`                   | Mongodb persistence volume size                                                | `50Gi`                                                             |
| `mongodb.livenessProbe.initialDelaySeconds`  | Mongodb delay before liveness probe is initiated                               | ``                                                                 |
| `mongodb.readinessProbe.initialDelaySeconds` | Mongodb delay before readiness probe is initiated                              | ``                                                                 |
| `mongodb.mongodbExtraFlags`                  | MongoDB additional command line flags                                          | `["--wiredTigerCacheSizeGB=1"]`                                    |
| `mongodb.mongodbDatabase`                    | Mongodb Database for Xray                                                      | `xray`                                                             |
| `mongodb.mongodbRootPassword`                | Mongodb Database Password for root user                                        | ``                                                                 |
| `mongodb.mongodbUsername`                    | Mongodb Database Xray User                                                     | `admin`                                                            |
| `mongodb.mongodbPassword`                    | Mongodb Database Password for Xray User                                        | ``                                                                 |
| `mongodb.nodeSelector`                       | Mongodb node selector                                                          | `{}`                                                               |
| `mongodb.affinity`                           | Mongodb node affinity                                                          | `{}`                                                               |
| `mongodb.tolerations`                        | Mongodb node tolerations                                                       | `[]`                                                               |
| `rabbitmq.enabled`                           | RabbitMQ enabled uses rabbitmq                                                 | `false`                                                            |
| `rabbitmq.rabbitmqErlangCookie`              | RabbitMQ Erlang cookie                                                         | `XRAYRABBITMQCLUSTER`                                              |
| `rabbitmq.rabbitmqMemoryHighWatermark`       | RabbitMQ Memory high watermark                                                 | `500MB`                                                            |
| `rabbitmq.rabbitmqUsername`                  | RabbitMQ application username                                                  | `user`                                                             |
| `rabbitmq.rabbitmqNodePort`                  | RabbitMQ node port                                                             | `5672`                                                             |
| `rabbitmq.persistentVolume.enabled`          | If `true`, persistent volume claims are created                                | `true`                                                             |
| `rabbitmq.persistentVolume.size`             | RabbitMQ Persistent volume size                                                | `20Gi`                                                             |
| `rabbitmq.rbac.create`                       | If true, create & use RBAC resources                                           | `true`                                                             |
| `rabbitmq-ha.enabled`                        | RabbitMQ enabled uses rabbitmq-ha                                              | `true`                                                             |
| `rabbitmq-ha.replicaCount`                   | RabbitMQ Number of replica                                                     | `1`                                                                |
| `rabbitmq-ha.rabbitmqUsername`               | RabbitMQ application username                                                  | `guest`                                                            |
| `rabbitmq-ha.rabbitmqPassword`               | RabbitMQ application password                                                  | ``                                                                 |
| `rabbitmq-ha.rabbitmqErlangCookie`           | RabbitMQ Erlang cookie                                                         | `XRAYRABBITMQCLUSTER`                                              |
| `rabbitmq-ha.rabbitmqMemoryHighWatermark`    | RabbitMQ Memory high watermark                                                 | `500MB`                                                            |
| `rabbitmq-ha.persistentVolume.enabled`       | If `true`, persistent volume claims are created                                | `true`                                                             |
| `rabbitmq-ha.persistentVolume.size`          | RabbitMQ Persistent volume size                                                | `20Gi`                                                             |
| `rabbitmq-ha.rbac.create`                    | If true, create & use RBAC resources                                           | `true`                                                             |
| `rabbitmq-ha.nodeSelector`                   | RabbitMQ node selector                                                         | `{}`                                                               |
| `rabbitmq-ha.tolerations`                    | RabbitMQ node tolerations                                                      | `[]`                                                               |
| `common.xrayVersion`                         | Xray image tag                                                                 | `.Chart.AppVersion`                                                |
| `common.xrayConfigPath`                      | Xray config path                                                               | `/var/opt/jfrog/xray/data`                                         |
| `common.xrayUserId`                          | Xray User Id                                                                   | `1035`                                                             |
| `common.xrayGroupId`                         | Xray Group Id                                                                  | `1035`                                                             |
| `common.stdOutEnabled`                       | Xray enable standard output                                                    | `true`                                                             |
| `common.masterKey`                           | Xray Master Key Can be generated with `openssl rand -hex 32`                   | `FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF` |
| `global.mongoUrl`                            | Xray external MongoDB URL                                                      | ``                                                                 |
| `global.postgresqlUrl`                       | Xray external PostgreSQL URL                                                   | ``                                                                 |
| `analysis.name`                              | Xray Analysis name                                                             | `xray-analysis`                                                    |
| `analysis.image`                             | Xray Analysis container image                                                  | `docker.bintray.io/jfrog/xray-analysis`                            |
| `analysis.replicaCount`                      | Xray Analysis replica count                                                    | `1`                                                                |
| `analysis.internalPort`                      | Xray Analysis internal port                                                    | `7000`                                                             |
| `analysis.externalPort`                      | Xray Analysis external port                                                    | `7000`                                                             |
| `analysis.service.type`                      | Xray Analysis service type                                                     | `ClusterIP`                                                        |
| `analysis.storage.sizeLimit`                 | Xray Analysis storage size limit                                               | `10Gi`                                                             |
| `analysis.resources`                         | Xray Analysis resources                                                        | `{}`                                                               |
| `analysis.nodeSelector`                      | Xray Analysis node selector                                                    | `{}`                                                               |
| `analysis.affinity`                          | Xray Analysis node affinity                                                    | `{}`                                                               |
| `analysis.tolerations`                       | Xray Analysis node tolerations                                                 | `[]`                                                               |
| `indexer.name`                               | Xray Indexer name                                                              | `xray-indexer`                                                     |
| `indexer.image`                              | Xray Indexer container image                                                   | `docker.bintray.io/jfrog/xray-indexer`                             |
| `indexer.replicaCount`                       | Xray Indexer replica count                                                     | `1`                                                                |
| `indexer.internalPort`                       | Xray Indexer internal port                                                     | `7002`                                                             |
| `indexer.externalPort`                       | Xray Indexer external port                                                     | `7002`                                                             |
| `indexer.service.type`                       | Xray Indexer service type                                                      | `ClusterIP`                                                        |
| `indexer.storage.sizeLimit`                  | Xray Indexer storage size limit                                                | `10Gi`                                                             |
| `indexer.resources`                          | Xray Indexer resources                                                         | `{}`                                                               |
| `indexer.nodeSelector`                       | Xray Indexer node selector                                                     | `{}`                                                               |
| `indexer.affinity`                           | Xray Indexer node affinity                                                     | `{}`                                                               |
| `indexer.tolerations`                        | Xray Indexer node tolerations                                                  | `[]`                                                               |
| `persist.name`                               | Xray Persist name                                                              | `xray-persist`                                                     |
| `persist.image`                              | Xray Persist container image                                                   | `docker.bintray.io/jfrog/xray-persist`                             |
| `persist.replicaCount`                       | Xray Persist replica count                                                     | `1`                                                                |
| `persist.internalPort`                       | Xray Persist internal port                                                     | `7003`                                                             |
| `persist.externalPort`                       | Xray Persist external port                                                     | `7003`                                                             |
| `persist.service.type`                       | Xray Persist service type                                                      | `ClusterIP`                                                        |
| `persist.storage.sizeLimit`                  | Xray Persist storage size limit                                                | `10Gi`                                                             |
| `persist.resources`                          | Xray Persist resources                                                         | `{}`                                                               |
| `persist.nodeSelector`                       | Xray Persist node selector                                                     | `{}`                                                               |
| `persist.affinity`                           | Xray Persist node affinity                                                     | `{}`                                                               |
| `persist.tolerations`                        | Xray Persist node tolerations                                                  | `[]`                                                               |
| `server.name`                                | Xray server name                                                               | `xray-server`                                                      |
| `server.image`                               | Xray server container image                                                    | `docker.bintray.io/jfrog/xray-server`                              |
| `server.replicaCount`                        | Xray server replica count                                                      | `1`                                                                |
| `server.internalPort`                        | Xray server internal port                                                      | `8000`                                                             |
| `server.externalPort`                        | Xray server external port                                                      | `80`                                                               |
| `server.service.name`                        | Xray server service name                                                       | `xray`                                                             |
| `server.service.type`                        | Xray server service type                                                       | `LoadBalancer`                                                     |
| `server.storage.sizeLimit`                   | Xray server storage size limit                                                 | `10Gi`                                                             |
| `server.resources`                           | Xray server resources                                                          | `{}`                                                               |
| `server.nodeSelector`                        | Xray server node selector                                                      | `{}`                                                               |
| `server.affinity`                            | Xray server node affinity                                                      | `{}`                                                               |
| `server.tolerations`                         | Xray server node tolerations                                                   | `[]`                                                               |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

### Ingress and TLS

To get Helm to create an ingress object with a hostname, add these two lines to your Helm command:

```
helm install --name xray \
  --set ingress.enabled=true \
  --set ingress.hosts[0]="xray.company.com" \
  --set server.service.type=NodePort \
  jfrog/xray
```

If your cluster allows automatic creation/retrieval of TLS certificates (e.g. [kube-lego](https://github.com/jetstack/kube-lego)), please refer to the documentation for that mechanism.

To manually configure TLS, first create/retrieve a key & certificate pair for the address(es) you wish to protect. Then create a TLS secret in the namespace:

```console
kubectl create secret tls xray-tls --cert=path/to/tls.cert --key=path/to/tls.key
```

Include the secret's name, along with the desired hostnames, in the Xray Ingress TLS section of your custom `values.yaml` file:

```
  ingress:
    ## If true, Xray Ingress will be created
    ##
    enabled: true

    ## Xray Ingress hostnames
    ## Must be provided if Ingress is enabled
    ##
    hosts:
      - xray.domain.com
    annotations:
      kubernetes.io/tls-acme: "true"
    ## Xray Ingress TLS configuration
    ## Secrets must be manually created in the namespace
    ##
    tls:
      - secretName: xray-tls
        hosts:
          - xray.domain.com
```

## Useful links

- https://www.jfrog.com/confluence/display/XRAY/Xray+High+Availability
- https://www.jfrog.com/confluence/display/EP/Getting+Started
- https://www.jfrog.com/confluence/
