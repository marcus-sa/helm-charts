# `@helm-charts/jfrog-distribution`

A Helm chart for JFrog Distribution

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | jfrog        |
| Chart Name          | distribution |
| Chart Version       | 3.1.0        |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for distribution.
# This is a YAML-formatted file.
# Beware when changing values here. You should know what you are doing!
# Access the values with {{ .Values.key.subkey }}

# Common
initContainerImage: 'alpine:3.8'

# For supporting pulling from private registries
imagePullSecrets:

# For HA
replicaCount: 1

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

# PostgreSQL
## Configuration values for the postgresql dependency
## ref: https://github.com/kubernetes/charts/blob/master/stable/postgresql/README.md
##
postgresql:
  enabled: true
  imageTag: '9.6.11'
  postgresDatabase: 'distribution'
  postgresUser: 'distribution'
  postgresPassword:
  postgresConfig:
    maxConnections: '1500'
  service:
    port: 5432
  persistence:
    enabled: true
    size: 50Gi
    existingClaim:
  resources: {}
  #    requests:
  #      memory: "1Gi"
  #      cpu: "250m"
  #    limits:
  #      memory: "2Gi"
  #      cpu: "1"
  nodeSelector: {}
  tolerations: []
  affinity: {}

## If NOT using the PostgreSQL in this chart (postgresql.enabled=false),
## specify custom database details here or leave empty and Artifactory will use embedded derby
database:
  host:
  port:
  database:
  ## If you would like this chart to create the secret containing the db
  ## password, use these values
  user:
  password:
  ## If you have existing Kubernetes secrets containing db credentials, use
  ## these values
  secrets: {}
  #  user:
  #    name: "database-creds"
  #    key: "db-user"
  #  password:
  #    name: "database-creds"
  #    key: "db-password"

## Configuration values for the redis dependency
## ref: https://github.com/helm/charts/blob/master/stable/redis/README.md
##
redis:
  name: redis
  image:
    repository: docker.io/bitnami/redis
    tag: 4.0.11-debian-9
    pullPolicy: IfNotPresent
  port: 6379
  password:
  uid: 1001
  serviceAccount:
    create: true
  disableCommands: 'FLUSHDB,FLUSHALL'
  persistence:
    enabled: true
    path: /bitnami/redis/data
    size: 10Gi
    ## A manually managed Persistent Volume and Claim
    ## Requires redis.persistence.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    # existingClaim:
    accessMode: ReadWriteOnce
  resources: {}
  #  requests:
  #    memory: "256Mi"
  #    cpu: "100m"
  #  limits:
  #    memory: "2Gi"
  #    cpu: "250m"

  nodeSelector: {}
  tolerations: []
  affinity: {}

common:
  uid: 1020
  gid: 1020

distribution:
  name: distribution
  image:
    repository: 'docker.bintray.io/jfrog/distribution-distribution'
    ## Note that by default we use appVersion to get image tag
    # version:
    imagePullPolicy: IfNotPresent
  internalPort: 8080
  externalPort: 80
  ## Distribution requires a unique master key
  ## You can generate one with the command:
  ## 'openssl rand -hex 32'
  ## Pass it to helm with '--set distribution.masterKey=${MASTER_KEY}'
  ## IMPORTANT: You should NOT use the example masterKey for a production deployment!
  masterKey: BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
  serviceId:
  env:
    artifactoryUrl:
    btServerUrl:
    artifactoryCi1Url:
    artifactoryEdge1Url:
    artifactoryEdge2Url:
    artifactoryEdge3Url:
  service:
    type: LoadBalancer
    # Whitelist IPs allowed to LoadBalancer type services
    # Example: loadBalancerSourceRanges={82.82.190.51/32,141.141.8.8/32}
    loadBalancerSourceRanges: []

  ## Add custom init containers
  customInitContainers: |
  #  - name: "custom-setup"
  #    image: "{{ .Values.initContainerImage }}"
  #    imagePullPolicy: "{{ .Values.distribution.image.pullPolicy }}"
  #    command:
  #      - 'sh'
  #      - '-c'
  #      - 'touch {{ .Values.distribution.persistence.mountPath }}/example-custom-setup'
  #    volumeMounts:
  #      - mountPath: "{{ .Values.distribution.persistence.mountPath }}"
  #        name: distribution-data

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

  nodeSelector: {}
  tolerations: []
  affinity: {}

distributor:
  name: distributor
  image:
    repository: 'docker.bintray.io/jfrog/distribution-distributor'
    ## Note that by default we use appVersion to get image tag
    # version:
    imagePullPolicy: IfNotPresent
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

  nodeSelector: {}
  tolerations: []
  affinity: {}
```

</details>

---

# JFrog Distribution Helm Chart

## Prerequisites Details

- Kubernetes 1.8+

## Chart Details

This chart does the following:

- Deploy PostgreSQL database.
- Deploy Redis.
- Deploy distributor.
- Deploy distribution.

## Requirements

- A running Kubernetes cluster
- Dynamic storage provisioning enabled
- Default StorageClass set to allow services using the default StorageClass for persistent storage
- A running Artifactory Enterprise Plus
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) installed and setup to use the cluster
- [Helm](https://helm.sh/) installed and setup to use the cluster (helm init)

## Installing the Chart

### Add JFrog Helm repository

Before installing JFrog helm charts, you need to add the [JFrog helm repository](https://charts.jfrog.io/) to your helm client

```bash
helm repo add jfrog https://charts.jfrog.io
```

### Install Chart

To install the chart with the release name `distribution`:

```bash
helm install --name distribution jfrog/distribution
```

### Accessing Distribution

**NOTE:** It might take a few minutes for Distribution's public IP to become available, and the nodes to complete initial setup.
Follow the instructions outputted by the install command to get the Distribution IP and URL to access it.

### Updating Distribution

Once you have a new chart version, you can update your deployment with

```bash
helm upgrade distribution jfrog/distribution
```

### Create a unique Master Key

JFrog Distribution requires a unique master key to be used by all micro-services in the same cluster. By default the chart has one set in values.yaml (`distribution.masterKey`).

**This key is for demo purpose and should not be used in a production environment!**

You should generate a unique one and pass it to the template at install/upgrade time.

```bash
# Create a key
export MASTER_KEY=$(openssl rand -hex 32)
echo ${MASTER_KEY}

# Pass the created master key to helm
helm install --set distribution.masterKey=${MASTER_KEY} -n distribution jfrog/distribution
```

**NOTE:** Make sure to pass the same master key with `--set distribution.masterKey=${MASTER_KEY}` on all future calls to `helm install` and `helm upgrade`!

### High Availability

JFrog Distribution can run in High Availability by having multiple replicas of the Distribution service.

To enable this, pass replica count to the `helm install` and `helm upgrade` commands.

```bash
# Run 3 replicas of the Distribution service
helm install --name distribution --set replicaCount=3 jfrog/distribution
```

### External Database

There is an option to use an external PostgreSQL database for your Distribution.

To use an external **PostgreSQL**, You need to set the Distribution **PostgreSQL** connection details

```bash
export POSTGRES_HOST=
export POSTGRES_PORT=
export POSTGRES_DATABASE=
export POSTGRES_USERNAME=
export POSTGRES_PASSWORD=

helm install --name distribution \
    --set database.host=${POSTGRES_HOST} \
    --set database.port=${POSTGRES_PORT} \
    --set database.database=${POSTGRES_DATABASE} \
    --set database.user=${POSTGRES_USERNAME} \
    --set database.password=${POSTGRES_PASSWORD} \
    jfrog/distribution
```

**NOTE:** The Database password is saved as a Kubernetes secret

#### Use existing secrets for PostgreSQL connection details

You can use already existing secrets for managing the database connection details.

Pass them to the install command like this

```bash
export POSTGRES_USERNAME_SECRET_NAME=
export POSTGRES_USERNAME_SECRET_KEY=
export POSTGRES_PASSWORD_SECRET_NAME=
export POSTGRES_PASSWORD_SECRET_KEY=

helm install --name distribution \
    --set database.secrets.user.name=${POSTGRES_USERNAME_SECRET_NAME} \
    --set database.secrets.user.key=${POSTGRES_USERNAME_SECRET_KEY} \
    --set database.secrets.password.name=${POSTGRES_PASSWORD_SECRET_NAME} \
    --set database.secrets.password.key=${POSTGRES_PASSWORD_SECRET_KEY} \
    jfrog/distribution
```

## Upgrade

Upgrading Distribution is a simple helm command

```bash
helm upgrade distribution jfrog/distribution
```

**NOTE:** Check for any version specific upgrade nodes in [CHANGELOG.md]

### Non compatible upgrades

In cases where a new version is not compatible with existing deployed version (look in CHANGELOG.md) you should

- Deploy new version along side old version (set a new release name)
- Copy configurations and data from old deployment to new one (/var/opt/jfrog)
- Update DNS to point to new Distribution service
- Remove old release

## Custom init containers

There are cases where a special, unsupported init processes is needed like checking something on the file system or testing something before spinning up the main container.

For this, there is a section for writing a custom init container in the [values.yaml](values.yaml). By default it's commented out

```
distribution:
  ## Add custom init containers
  customInitContainers: |
    ## Init containers template goes here ##
```

## Configuration

The following table lists the configurable parameters of the distribution chart and their default values.

| Parameter                                       | Description                                                            | Default                                                            |
| ----------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `imagePullSecrets`                              | Docker registry pull secret                                            |                                                                    |
| `replicaCount`                                  | HA - Number of instances per service                                   |                                                                    |
| `serviceAccount.create`                         | Specifies whether a ServiceAccount should be created                   | `true`                                                             |
| `serviceAccount.name`                           | The name of the ServiceAccount to create                               | Generated using fullname template                                  |
| `rbac.create`                                   | Specifies whether RBAC resources should be created                     | `true`                                                             |
| `rbac.role.rules`                               | Rules to create                                                        | `[]`                                                               |
| `ingress.enabled`                               | If true, distribution Ingress will be created                          | `false`                                                            |
| `ingress.annotations`                           | distribution Ingress annotations                                       | `{}`                                                               |
| `ingress.hosts`                                 | distribution Ingress hostnames                                         | `[]`                                                               |
| `ingress.tls`                                   | distribution Ingress TLS configuration (YAML)                          | `[]`                                                               |
| `postgresql.enabled`                            | Enable PostgreSQL                                                      | `true`                                                             |
| `postgresql.imageTag`                           | PostgreSQL image tag                                                   | `9.6.11`                                                           |
| `postgresql.postgresDatabase`                   | PostgreSQL database name                                               | `distribution`                                                     |
| `postgresql.postgresUser`                       | PostgreSQL database username                                           | `distribution`                                                     |
| `postgresql.postgresPassword`                   | PostgreSQL database password                                           | ``                                                                 |
| `postgresql.postgresConfig.maxConnections`      | PostgreSQL max_connections                                             | `1500`                                                             |
| `postgresql.service.port`                       | PostgreSQL service port                                                | `5432`                                                             |
| `postgresql.persistence.enabled`                | PostgreSQL persistence enabled                                         | `true`                                                             |
| `postgresql.persistence.size`                   | PostgreSQL persistent disk size                                        | `50Gi`                                                             |
| `postgresql.persistence.existingClaim`          | PostgreSQL persistence use existing PVC                                | ``                                                                 |
| `postgresql.resources.requests.memory`          | PostgreSQL initial memory request                                      | ``                                                                 |
| `postgresql.resources.requests.cpu`             | PostgreSQL initial cpu request                                         | ``                                                                 |
| `postgresql.resources.limits.memory`            | PostgreSQL memory limit                                                | ``                                                                 |
| `postgresql.resources.limits.cpu`               | PostgreSQL cpu limit                                                   | ``                                                                 |
| `postgresql.nodeSelector`                       | PostgreSQL node selector                                               | `{}`                                                               |
| `postgresql.affinity`                           | PostgreSQL node affinity                                               | `{}`                                                               |
| `postgresql.tolerations`                        | PostgreSQL node tolerations                                            | `[]`                                                               |
| `redis.password`                                | Redis password                                                         | ``                                                                 |
| `redis.port`                                    | Redis Port                                                             | `6379`                                                             |
| `redis.persistence.enabled`                     | Redis use a PVC to persist data                                        | `true`                                                             |
| `redis.persistence.existingClaim`               | Redis use an existing PVC to persist data                              | `nil`                                                              |
| `redis.persistence.storageClass`                | Redis storage class of backing PVC                                     | `generic`                                                          |
| `redis.persistence.size`                        | Redis size of data volume                                              | `10Gi`                                                             |
| `redis.nodeSelector`                            | Redis node selector                                                    | `{}`                                                               |
| `redis.affinity`                                | Redis node affinity                                                    | `{}`                                                               |
| `redis.tolerations`                             | Redis node tolerations                                                 | `[]`                                                               |
| `common.uid`                                    | Distribution and Distributor process user ID                           | `1020`                                                             |
| `common.gid`                                    | Distribution and Distributor process group ID                          | `1020`                                                             |
| `distribution.name`                             | Distribution name                                                      | `distribution`                                                     |
| `distribution.image.pullPolicy`                 | Container pull policy                                                  | `IfNotPresent`                                                     |
| `distribution.image.repository`                 | Container image                                                        | `docker.jfrog.io/jf-distribution`                                  |
| `distribution.image.version`                    | Container image tag                                                    | `.Chart.AppVersion`                                                |
| `distribution.service.type`                     | Distribution service type                                              | `LoadBalancer`                                                     |
| `distribution.service.loadBalancerSourceRanges` | Distribution service whitelist                                         | `[]`                                                               |
| `distribution.customInitContainers`             | Custom init containers for Distribution                                |                                                                    |
| `distribution.externalPort`                     | Distribution service external port                                     | `80`                                                               |
| `distribution.internalPort`                     | Distribution service internal port                                     | `8080`                                                             |
| `distribution.masterKey`                        | Distribution Master Key (can be generated with `openssl rand -hex 32`) | `BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB` |
| `distribution.serviceId`                        | Distribution service ID                                                | ``                                                                 |
| `distribution.env.artifactoryUrl`               | Distribution Environment Artifactory URL                               | ``                                                                 |
| `distribution.persistence.mountPath`            | Distribution persistence volume mount path                             | `"/jf-distribution"`                                               |
| `distribution.persistence.enabled`              | Distribution persistence volume enabled                                | `true`                                                             |
| `distribution.persistence.storageClass`         | Storage class of backing PVC                                           | `nil`                                                              |
| `distribution.persistence.existingClaim`        | Provide an existing PersistentVolumeClaim                              | `nil`                                                              |
| `distribution.persistence.accessMode`           | Distribution persistence volume access mode                            | `ReadWriteOnce`                                                    |
| `distribution.persistence.size`                 | Distribution persistence volume size                                   | `50Gi`                                                             |
| `distribution.nodeSelector`                     | Distribution node selector                                             | `{}`                                                               |
| `distribution.affinity`                         | Distribution node affinity                                             | `{}`                                                               |
| `distribution.tolerations`                      | Distribution node tolerations                                          | `[]`                                                               |
| `distributor.name`                              | Distribution name                                                      | `distribution`                                                     |
| `distributor.image.pullPolicy`                  | Container pull policy                                                  | `IfNotPresent`                                                     |
| `distributor.image.repository`                  | Container image                                                        | `docker.jfrog.io/jf-distribution`                                  |
| `distributor.image.version`                     | Container image tag                                                    | `.Chart.AppVersion`                                                |
| `distributor.persistence.mountPath`             | Distributor persistence volume mount path                              | `"/bt-distributor"`                                                |
| `distributor.persistence.existingClaim`         | Provide an existing PersistentVolumeClaim                              | `nil`                                                              |
| `distributor.persistence.storageClass`          | Storage class of backing PVC                                           | `nil (uses alpha storage class annotation)`                        |
| `distributor.persistence.enabled`               | Distributor persistence volume enabled                                 | `true`                                                             |
| `distributor.persistence.accessMode`            | Distributor persistence volume access mode                             | `ReadWriteOnce`                                                    |
| `distributor.persistence.size`                  | Distributor persistence volume size                                    | `50Gi`                                                             |
| `distributor.nodeSelector`                      | Distributor node selector                                              | `{}`                                                               |
| `distributor.affinity`                          | Distributor node affinity                                              | `{}`                                                               |
| `distributor.tolerations`                       | Distributor node tolerations                                           | `[]`                                                               |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

### Ingress and TLS

To get Helm to create an ingress object with a hostname, add these two lines to your Helm command:

```bash
helm install --name distribution \
  --set ingress.enabled=true \
  --set ingress.hosts[0]="distribution.company.com" \
  --set distribution.service.type=NodePort \
  jfrog/distribution
```

If your cluster allows automatic creation/retrieval of TLS certificates (e.g. [cert-manager](https://github.com/jetstack/cert-manager)), please refer to the documentation for that mechanism.

To manually configure TLS, first create/retrieve a key & certificate pair for the address(es) you wish to protect. Then create a TLS secret in the namespace:

```bash
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
