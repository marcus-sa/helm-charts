# `@helm-charts/bitnami-mongodb`

NoSQL document-oriented database that stores JSON-like documents with dynamic schemas, simplifying the integration of data in content-driven applications.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | bitnami |
| Chart Name          | mongodb |
| Chart Version       | 4.2.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  ## Bitnami MongoDB registry
  ##
  registry: docker.io
  ## Bitnami MongoDB image name
  ##
  repository: bitnami/mongodb
  ## Bitnami MongoDB image tag
  ## ref: https://hub.docker.com/r/bitnami/mongodb/tags/
  ##
  tag: 4.0.1-debian-9

  ## Specify a imagePullPolicy
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  ##
  pullPolicy: Always
  ## Optionally specify an array of imagePullSecrets.
  ## Secrets must be manually created in the namespace.
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  ##
  # pullSecrets:
  #   - myRegistrKeySecretName

## Enable authentication
## ref: https://docs.mongodb.com/manual/tutorial/enable-authentication/
#
usePassword: true
# existingSecret: name-of-existing-secret

## MongoDB admin password
## ref: https://github.com/bitnami/bitnami-docker-mongodb/blob/master/README.md#setting-the-root-password-on-first-run
##
# mongodbRootPassword:

## MongoDB custom user and database
## ref: https://github.com/bitnami/bitnami-docker-mongodb/blob/master/README.md#creating-a-user-and-database-on-first-run
##
# mongodbUsername: username
# mongodbPassword: password
# mongodbDatabase: database

## Whether enable/disable IPv6 on MongoDB
## ref: https://github.com/bitnami/bitnami-docker-mongodb/blob/master/README.md#enabling/disabling-ipv6
##
mongodbEnableIPv6: true

## MongoDB additional command line flags
##
## Can be used to specify command line flags, for example:
##
## mongodbExtraFlags:
##  - "--wiredTigerCacheSizeGB=2"
mongodbExtraFlags: []

## Pod Security Context
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
##
securityContext:
  enabled: true
  fsGroup: 1001
  runAsUser: 1001

## Kubernetes service type
service:
  annotations: {}
  type: ClusterIP
  port: 27017

  ## Specify the nodePort value for the LoadBalancer and NodePort service types.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
  ##
  # nodePort:

## Setting up replication
## ref: https://github.com/bitnami/bitnami-docker-mongodb#setting-up-a-replication
#
replicaSet:
  ## Whether to create a MongoDB replica set for high availability or not
  enabled: false
  useHostnames: true

  ## Name of the replica set
  ##
  name: rs0

  ## Key used for replica set authentication
  ##
  # key: key

  ## Number of replicas per each node type
  ##
  replicas:
    secondary: 1
    arbiter: 1
  ## Pod Disruption Budget
  ## ref: https://kubernetes.io/docs/concepts/workloads/pods/disruptions/
  pdb:
    minAvailable:
      primary: 1
      secondary: 1
      arbiter: 1

# Annotations to be added to MongoDB pods
podAnnotations: {}

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources: {}
# limits:
#   cpu: 500m
#   memory: 512Mi
# requests:
#   cpu: 100m
#   memory: 256Mi

## Node selector
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
nodeSelector: {}

## Affinity
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
affinity: {}

## Tolerations
## ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
tolerations: []

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  ## A manually managed Persistent Volume and Claim
  ## Requires persistence.enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:

  ## mongodb data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessModes:
    - ReadWriteOnce
  size: 8Gi
  annotations: {}

## Configure extra options for liveness and readiness probes
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#configure-probes)
livenessProbe:
  enabled: true
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1
readinessProbe:
  enabled: true
  initialDelaySeconds: 5
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1

# Entries for the MongoDB config file
configmap:
#  # Where and how to store data.
#  storage:
#    dbPath: /opt/bitnami/mongodb/data/db
#    journal:
#      enabled: true
#    #engine:
#    #wiredTiger:
#  # where to write logging data.
#  systemLog:
#    destination: file
#    logAppend: true
#    path: /opt/bitnami/mongodb/logs/mongodb.log
#  # network interfaces
#  net:
#    port: 27017
#    bindIp: 0.0.0.0
#    unixDomainSocket:
#      enabled: true
#      pathPrefix: /opt/bitnami/mongodb/tmp
#  # replica set options
#  #replication:
#  #  replSetName: replicaset
#  # process management options
#  processManagement:
#     fork: false
#     pidFilePath: /opt/bitnami/mongodb/tmp/mongodb.pid
#  # set parameter options
#  setParameter:
#     enableLocalhostAuthBypass: true
#  # security options
#  security:
#    authorization: enabled
#    #keyFile: /opt/bitnami/mongodb/conf/keyfile
```

</details>

---

# MongoDB

[MongoDB](https://www.mongodb.com/) is a cross-platform document-oriented database. Classified as a NoSQL database, MongoDB eschews the traditional table-based relational database structure in favor of JSON-like documents with dynamic schemas, making the integration of data in certain types of applications easier and faster.

## TL;DR;

```bash
$ helm install stable/mongodb
```

## Introduction

This chart bootstraps a [MongoDB](https://github.com/bitnami/bitnami-docker-mongodb) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/mongodb
```

The command deploys MongoDB on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the MongoDB chart and their default values.

| Parameter                               | Description                                                                                  | Default                                     |
| --------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `image.registry`                        | MongoDB image registry                                                                       | `docker.io`                                 |
| `image.repository`                      | MongoDB Image name                                                                           | `bitnami/mongodb`                           |
| `image.tag`                             | MongoDB Image tag                                                                            | `{VERSION}`                                 |
| `image.pullPolicy`                      | Image pull policy                                                                            | `Always`                                    |
| `image.pullSecrets`                     | Specify image pull secrets                                                                   | `nil`                                       |
| `usePassword`                           | Enable password authentication                                                               | `true`                                      |
| `existingSecret`                        | Existing secret with MongoDB credentials                                                     | `nil`                                       |
| `mongodbRootPassword`                   | MongoDB admin password                                                                       | `random alhpanumeric string (10)`           |
| `mongodbUsername`                       | MongoDB custom user                                                                          | `nil`                                       |
| `mongodbPassword`                       | MongoDB custom user password                                                                 | `random alhpanumeric string (10)`           |
| `mongodbDatabase`                       | Database to create                                                                           | `nil`                                       |
| `mongodbEnableIPv6`                     | Switch to enable/disable IPv6 on MongoDB                                                     | `true`                                      |
| `mongodbExtraFlags`                     | MongoDB additional command line flags                                                        | []                                          |
| `service.annotations`                   | Kubernetes service annotations                                                               | `{}`                                        |
| `service.type`                          | Kubernetes Service type                                                                      | `ClusterIP`                                 |
| `service.nodePort`                      | Port to bind to for NodePort service type                                                    | `nil`                                       |
| `port`                                  | MongoDB service port                                                                         | `27017`                                     |
| `replicaSet.enabled`                    | Switch to enable/disable replica set configuration                                           | `false`                                     |
| `replicaSet.name`                       | Name of the replica set                                                                      | `rs0`                                       |
| `replicaSet.useHostnames`               | Enable DNS hostnames in the replica set config                                               | `true`                                      |
| `replicaSet.key`                        | Key used for authentication in the replica set                                               | `nil`                                       |
| `replicaSet.replicas.secondary`         | Number of secondary nodes in the replica set                                                 | `1`                                         |
| `replicaSet.replicas.arbiter`           | Number of arbiter nodes in the replica set                                                   | `1`                                         |
| `replicaSet.pdb.minAvailable.primary`   | PDB for the MongoDB Primary nodes                                                            | `1`                                         |
| `replicaSet.pdb.minAvailable.secondary` | PDB for the MongoDB Secondary nodes                                                          | `1`                                         |
| `replicaSet.pdb.minAvailable.arbiter`   | PDB for the MongoDB Arbiter nodes                                                            | `1`                                         |
| `podAnnotations`                        | Annotations to be added to pods                                                              | {}                                          |
| `resources`                             | Pod resources                                                                                | {}                                          |
| `nodeSelector`                          | Node labels for pod assignment                                                               | {}                                          |
| `affinity`                              | Affinity for pod assignment                                                                  | {}                                          |
| `tolerations`                           | Toleration labels for pod assignment                                                         | {}                                          |
| `securityContext.enabled`               | Enable security context                                                                      | `true`                                      |
| `securityContext.fsGroup`               | Group ID for the container                                                                   | `1001`                                      |
| `securityContext.runAsUser`             | User ID for the container                                                                    | `1001`                                      |
| `persistence.enabled`                   | Use a PVC to persist data                                                                    | `true`                                      |
| `persistence.storageClass`              | Storage class of backing PVC                                                                 | `nil` (uses alpha storage class annotation) |
| `persistence.accessMode`                | Use volume as ReadOnly or ReadWrite                                                          | `ReadWriteOnce`                             |
| `persistence.size`                      | Size of data volume                                                                          | `8Gi`                                       |
| `persistence.annotations`               | Persistent Volume annotations                                                                | `{}`                                        |
| `livenessProbe.initialDelaySeconds`     | Delay before liveness probe is initiated                                                     | `30`                                        |
| `livenessProbe.periodSeconds`           | How often to perform the probe                                                               | `10`                                        |
| `livenessProbe.timeoutSeconds`          | When the probe times out                                                                     | `5`                                         |
| `livenessProbe.successThreshold`        | Minimum consecutive successes for the probe to be considered successful after having failed. | `1`                                         |
| `livenessProbe.failureThreshold`        | Minimum consecutive failures for the probe to be considered failed after having succeeded.   | `6`                                         |
| `readinessProbe.initialDelaySeconds`    | Delay before readiness probe is initiated                                                    | `5`                                         |
| `readinessProbe.periodSeconds`          | How often to perform the probe                                                               | `10`                                        |
| `readinessProbe.timeoutSeconds`         | When the probe times out                                                                     | `5`                                         |
| `readinessProbe.failureThreshold`       | Minimum consecutive failures for the probe to be considered failed after having succeeded.   | `6`                                         |
| `readinessProbe.successThreshold`       | Minimum consecutive successes for the probe to be considered successful after having failed. | `1`                                         |
| `configmap`                             | MongoDB configuration file to be used                                                        | `nil`                                       |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set mongodbRootPassword=secretpassword,mongodbUsername=my-user,mongodbPassword=my-password,mongodbDatabase=my-database \
    stable/mongodb
```

The above command sets the MongoDB `root` account password to `secretpassword`. Additionally, it creates a standard database user named `my-user`, with the password `my-password`, who has access to a database named `my-database`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/mongodb
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Replication

You can start the MongoDB chart in replica set mode with the following command:

```bash
$ helm install --name my-release stable/mongodb --set replication.enabled=true
```

## Production settings and horizontal scaling

The [values-production.yaml](values-production.yaml) file consists a configuration to deploy a scalable and high-available MongoDB deployment for production environments. We recommend that you base your production configuration on this template and adjust the parameters appropriately.

```console
$ curl -O https://raw.githubusercontent.com/kubernetes/charts/master/stable/mongodb/values-production.yaml
$ helm install --name my-release -f ./values-production.yaml stable/mongodb
```

To horizontally scale this chart, run the following command to scale the number of secondary nodes in your MongoDB replica set.

```console
$ kubectl scale statefulset my-release-mongodb-secondary --replicas=3
```

Some characteristics of this chart are:

- Each of the participants in the replication has a fixed stateful set so you always know where to find the primary, secondary or arbiter nodes.
- The number of secondary and arbiter nodes can be scaled out independently.
- Easy to move an application from using a standalone MongoDB server to use a replica set.

## Persistence

The [Bitnami MongoDB](https://github.com/bitnami/bitnami-docker-mongodb) image stores the MongoDB data and configurations at the `/bitnami/mongodb` path of the container.

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) at this location. The volume is created using dynamic volume provisioning.
