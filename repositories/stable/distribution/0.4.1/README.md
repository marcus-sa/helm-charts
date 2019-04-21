# `@helm-charts/stable-distribution`

A Helm chart for JFrog Distribution

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | stable       |
| Chart Name          | distribution |
| Chart Version       | 0.4.1        |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for distribution.
# This is a YAML-formatted file.
# Beware when changing values here. You should know what you are doing!
# Access the values with {{ .Values.key.subkey }}

# Common
initContainerImage: 'alpine:3.6'

# For supporting pulling from private registries
imagePullSecrets:

## Role Based Access Control
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

## Service Account
## Ref: https://kubernetes.io/docs/admin/service-accounts-admin/
##
serviceAccount:
  create: true
  ## The name of the ServiceAccount to use.
  ## If not set and create is true, a name is generated using the fullname template
  name:

ingress:
  enabled: false
  # Used to create an Ingress record.
  hosts:
    - distribution.domain.example
  annotations:
  # kubernetes.io/ingress.class: nginx
  # kubernetes.io/tls-acme: "true"
  tls:
  # Secrets must be manually created in the namespace.
  # - secretName: chart-example-tls
  #   hosts:
  #     - distribution.domain.example

# Sub charts
## Configuration values for the mongodb dependency
## ref: https://github.com/kubernetes/charts/blob/master/stable/mongodb/README.md
##
mongodb:
  enabled: true
  image:
    tag: 3.6.3
    pullPolicy: IfNotPresent
  persistence:
    enabled: true
    size: 10Gi
  resources: {}
  #  requests:
  #    memory: "2Gi"
  #    cpu: "100m"
  #  limits:
  #    memory: "2Gi"
  #    cpu: "250m"
  ## Make sure the --wiredTigerCacheSizeGB is no more than half the memory limit!
  ## This is critical to protect against OOMKill by Kubernetes!
  mongodbExtraFlags:
    - '--wiredTigerCacheSizeGB=1'
  mongodbRootPassword:
  mongodbUsername: distribution
  mongodbPassword:
  mongodbDatabase: bintray
  livenessProbe:
    initialDelaySeconds: 40
  readinessProbe:
    initialDelaySeconds: 30

## Configuration values for the redis dependency
## ref: https://github.com/kubernetes/charts/blob/master/stable/redis/README.md
##
redis:
  enabled: true
  redisPassword:
  persistence:
    enabled: true
    size: 10Gi
  master:
    port: 6379
  resources: {}
  #  requests:
  #    memory: "1Gi"
  #    cpu: "100m"
  #  limits:
  #    memory: "2Gi"
  #    cpu: "250m"

# For setting up external services, must pass the connection URL for them
global:
  mongoUrl:
  mongoAuditUrl:
  redisUrl:

distribution:
  replicaCount: 1
  name: distribution
  image:
    repository: 'docker.bintray.io/jfrog/distribution-distribution'
    ## Note that by default we use appVersion to get image tag
    # version: 1.1.0
    imagePullPolicy: IfNotPresent
  internalPort: 8080
  externalPort: 80
  masterKey: BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
  env:
    artifactoryUrl:
    btServerUrl:
    artifactoryCi1Url:
    artifactoryEdge1Url:
    artifactoryEdge2Url:
    artifactoryEdge3Url:
  service:
    type: LoadBalancer
  resources: {}
  #  requests:
  #    memory: "2Gi"
  #    cpu: "500m"
  #  limits:
  #    memory: "4Gi"
  #    cpu: "2"
  ## Control Java options (JAVA_OPTIONS)
  ## IMPORTANT: keep javaOpts.xmx no higher than resources.limits.memory
  javaOpts:
    xms:
    xmx:
  persistence:
    enabled: true
    ## A manually managed Persistent Volume and Claim
    ## Requires persistence.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    # existingClaim:

    accessMode: ReadWriteOnce
    mountPath: '/var/opt/jfrog/distribution'
    size: 50Gi
    ## distribution data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner. (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"

distributor:
  replicaCount: 1
  name: distributor
  image:
    repository: 'docker.bintray.io/jfrog/distribution-distributor'
    ## Note that by default we use appVersion to get image tag
    # version: 1.1.0
    imagePullPolicy: IfNotPresent
  token:
  resources: {}
  #  requests:
  #    memory: "2Gi"
  #    cpu: "500m"
  #  limits:
  #    memory: "4Gi"
  #    cpu: "2"
  ## Control Java options (JAVA_OPTIONS)
  ## IMPORTANT: keep javaOpts.xmx no higher than resources.limits.memory
  javaOpts:
    xms:
    xmx:
  persistence:
    enabled: true
    ## A manually managed Persistent Volume and Claim
    ## Requires persistence.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    # existingClaim:

    accessMode: ReadWriteOnce
    mountPath: '/var/opt/jfrog/distributor'
    size: 50Gi
    ## distribution data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
```

</details>

---

# JFrog Distribution Helm Chart

## Prerequisites Details

- Kubernetes 1.8+

## Chart Details

This chart will do the following:

- Deploy Mongodb database.
- Deploy a Redis.
- Deploy a distributor.
- Deploy a distribution.

## Requirements

- A running Kubernetes cluster
- Dynamic storage provisioning enabled
- Default StorageClass set to allow services using the default StorageClass for persistent storage
- A running Artifactory Enterprise Plus
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) installed and setup to use the cluster
- [Helm](https://helm.sh/) installed and setup to use the cluster (helm init)

## Installing the Chart

To install the chart with the release name `distribution`:

```
helm install --name distribution stable/distribution
```

### Accessing Distribution

**NOTE:** It might take a few minutes for Distribution's public IP to become available, and the nodes to complete initial setup.
Follow the instructions outputted by the install command to get the Distribution IP and URL to access it.

### Updating Distribution

Once you have a new chart version, you can update your deployment with

```
helm upgrade distribution stable/distribution
```

### Create a unique Master Key

JFrog Distribution requires a unique master key to be used by all micro-services in the same cluster. By default the chart has one set in values.yaml (`distribution.masterKey`).

**This key is for demo purpose and should not be used in a production environment!**

You should generate a unique one and pass it to the template at install/upgrade time.

```bash
# Create a key
$ export MASTER_KEY=$(openssl rand -hex 32)
$ echo ${MASTER_KEY}

# Pass the created master key to helm
$ helm install --set distribution.masterKey=${MASTER_KEY} -n distribution stable/distribution
```

**NOTE:** Make sure to pass the same master key with `--set distribution.masterKey=${MASTER_KEY}` on all future calls to `helm install` and `helm upgrade`!

### External Databases

There is an option to use external database services (MongoDB or PostgreSQL) for your Distribution.

#### MongoDB

To use an external **MongoDB**, You need to set Distribution **MongoDB** connection URL.

For this, pass the parameter: `mongodb.enabled=false,global.mongoUrl=${DISTRIBUTION_MONGODB_CONN_URL},global.mongoAuditUrl=${DISTRIBUTION_MONGODB_AUDIT_URL}`.

**IMPORTANT:** Make sure the DB is already created before deploying Distribution services

```bash
# Passing a custom MongoDB to Distribution

# Example
# MongoDB host: custom-mongodb.local
# MongoDB port: 27017
# MongoDB user: distribution
# MongoDB password: password1_X

$ export DISTRIBUTION_MONGODB_CONN_URL='mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@custom-mongodb.local:27017/${MONGODB_DATABSE}'
$ export DISTRIBUTION_MONGODB_AUDIT_URL='mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@custom-mongodb.local:27017/audit?maxpoolsize=500'
$ helm install -n distribution --set global.mongoUrl=${DISTRIBUTION_MONGODB_CONN_URL},global.mongoAuditUrl=${DISTRIBUTION_MONGODB_AUDIT_URL} stable/distribution
```

#### External Redis

To use an external **Redis**, You need to disable the use of the bundled **Redis** and set a custom **Redis** connection URL.

For this, pass the parameters: `redis.enabled=false` and `global.redisUrl=${DISTRIBUTION_REDIS_CONN_URL}`.

**IMPORTANT:** Make sure the DB is already created before deploying Distribution services

```bash
# Passing a custom Redis to Distribution

# Example
# Redis host: custom-redis.local
# Redis port: 6379
# Redis password: password2_X

$ export DISTRIBUTION_REDIS_CONN_URL='redis://:${REDIS_PASSWORD}@custom-redis.local:6379'
$ helm install -n distribution --set redis.enabled=false,global.redisUrl=${DISTRIBUTION_REDIS_CONN_URL} stable/distribution
```

## Configuration

The following table lists the configurable parameters of the distribution chart and their default values.

| Parameter                                    | Description                                          | Default                                     |
| -------------------------------------------- | ---------------------------------------------------- | ------------------------------------------- |
| `imagePullSecrets`                           | Docker registry pull secret                          |                                             |
| `serviceAccount.create`                      | Specifies whether a ServiceAccount should be created | `true`                                      |
| `serviceAccount.name`                        | The name of the ServiceAccount to create             | Generated using the fullname template       |
| `rbac.create`                                | Specifies whether RBAC resources should be created   | `true`                                      |
| `rbac.role.rules`                            | Rules to create                                      | `[]`                                        |
| `ingress.enabled`                            | If true, distribution Ingress will be created        | `false`                                     |
| `ingress.annotations`                        | distribution Ingress annotations                     | `{}`                                        |
| `ingress.hosts`                              | distribution Ingress hostnames                       | `[]`                                        |
| `ingress.tls`                                | distribution Ingress TLS configuration (YAML)        | `[]`                                        |
| `mongodb.enabled`                            | Enable Mongodb                                       | `true`                                      |
| `mongodb.image.tag`                          | Mongodb docker image tag                             | `3.6.3`                                     |
| `mongodb.image.pullPolicy`                   | Mongodb Container pull policy                        | `IfNotPresent`                              |
| `mongodb.persistence.enabled`                | Mongodb persistence volume enabled                   | `true`                                      |
| `mongodb.persistence.existingClaim`          | Use an existing PVC to persist data                  | `nil`                                       |
| `mongodb.persistence.storageClass`           | Storage class of backing PVC                         | `generic`                                   |
| `mongodb.persistence.size`                   | Mongodb persistence volume size                      | `10Gi`                                      |
| `mongodb.livenessProbe.initialDelaySeconds`  | Mongodb delay before liveness probe is initiated     | `40`                                        |
| `mongodb.readinessProbe.initialDelaySeconds` | Mongodb delay before readiness probe is initiated    | `30`                                        |
| `mongodb.mongodbExtraFlags`                  | MongoDB additional command line flags                | `["--wiredTigerCacheSizeGB=1"]`             |
| `mongodb.usePassword`                        | Enable password authentication                       | `false`                                     |
| `mongodb.mongodbDatabase`                    | Mongodb Database for distribution                    | `bintray`                                   |
| `mongodb.mongodbRootPassword`                | Mongodb Database Password for root user              | ``                                          |
| `mongodb.mongodbUsername`                    | Mongodb Database Mission Control User                | `distribution`                              |
| `mongodb.mongodbPassword`                    | Mongodb Database Password for Mission Control user   | ``                                          |
| `redis.enabled`                              | Enable Redis                                         | `true`                                      |
| `redis.redisPassword`                        | Redis password                                       | ``                                          |
| `redis.master.port`                          | Redis Port                                           | `6379`                                      |
| `redis.persistence.enabled`                  | Use a PVC to persist data                            | `true`                                      |
| `redis.persistence.existingClaim`            | Use an existing PVC to persist data                  | `nil`                                       |
| `redis.persistence.storageClass`             | Storage class of backing PVC                         | `generic`                                   |
| `redis.persistence.size`                     | Size of data volume                                  | `10Gi`                                      |
| `distribution.name`                          | Distribution name                                    | `distribution`                              |
| `distribution.image.pullPolicy`              | Container pull policy                                | `IfNotPresent`                              |
| `distribution.image.repository`              | Container image                                      | `docker.jfrog.io/jf-distribution`           |
| `distribution.image.version`                 | Container image tag                                  | `1.1.0`                                     |
| `distribution.service.type`                  | Distribution service type                            | `LoadBalancer`                              |
| `distribution.externalPort`                  | Distribution service external port                   | `80`                                        |
| `distribution.internalPort`                  | Distribution service internal port                   | `8080`                                      |
| `distribution.env.artifactoryUrl`            | Distribution Environment Artifactory URL             | ``                                          |
| `distribution.persistence.mountPath`         | Distribution persistence volume mount path           | `"/jf-distribution"`                        |
| `distribution.persistence.enabled`           | Distribution persistence volume enabled              | `true`                                      |
| `distribution.persistence.storageClass`      | Storage class of backing PVC                         | `nil`                                       |
| `distribution.persistence.existingClaim`     | Provide an existing PersistentVolumeClaim            | `nil`                                       |
| `distribution.persistence.accessMode`        | Distribution persistence volume access mode          | `ReadWriteOnce`                             |
| `distribution.persistence.size`              | Distribution persistence volume size                 | `50Gi`                                      |
| `distributor.name`                           | Distribution name                                    | `distribution`                              |
| `distributor.image.pullPolicy`               | Container pull policy                                | `IfNotPresent`                              |
| `distributor.image.repository`               | Container image                                      | `docker.jfrog.io/jf-distribution`           |
| `distributor.image.version`                  | Container image tag                                  | `1.1.0`                                     |
| `distributor.token`                          | Distributor token                                    | ``                                          |
| `distributor.persistence.mountPath`          | Distributor persistence volume mount path            | `"/bt-distributor"`                         |
| `distributor.persistence.existingClaim`      | Provide an existing PersistentVolumeClaim            | `nil`                                       |
| `distributor.persistence.storageClass`       | Storage class of backing PVC                         | `nil (uses alpha storage class annotation)` |
| `distributor.persistence.enabled`            | Distributor persistence volume enabled               | `true`                                      |
| `distributor.persistence.accessMode`         | Distributor persistence volume access mode           | `ReadWriteOnce`                             |
| `distributor.persistence.size`               | Distributor persistence volume size                  | `50Gi`                                      |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

### Ingress and TLS

To get Helm to create an ingress object with a hostname, add these two lines to your Helm command:

```
helm install --name distribution \
  --set ingress.enabled=true \
  --set ingress.hosts[0]="distribution.company.com" \
  --set distribution.service.type=NodePort \
  stable/distribution
```

If your cluster allows automatic creation/retrieval of TLS certificates (e.g. [cert-manager](https://github.com/jetstack/cert-manager)), please refer to the documentation for that mechanism.

To manually configure TLS, first create/retrieve a key & certificate pair for the address(es) you wish to protect. Then create a TLS secret in the namespace:

```console
kubectl create secret tls distribution-tls --cert=path/to/tls.cert --key=path/to/tls.key
```

Include the secret's name, along with the desired hostnames, in the Distribution Ingress TLS section of your custom `values.yaml` file:

```
  ingress:
    ## If true, Distribution Ingress will be created
    ##
    enabled: true

    ## Distribution Ingress hostnames
    ## Must be provided if Ingress is enabled
    ##
    hosts:
      - distribution.domain.com
    annotations:
      kubernetes.io/tls-acme: "true"
    ## Distribution Ingress TLS configuration
    ## Secrets must be manually created in the namespace
    ##
    tls:
      - secretName: distribution-tls
        hosts:
          - distribution.domain.com
```

## Useful links

- https://www.jfrog.com/confluence/display/EP/Getting+Started
- https://www.jfrog.com/confluence/display/DIST/Installing+Distribution
- https://www.jfrog.com/confluence/
