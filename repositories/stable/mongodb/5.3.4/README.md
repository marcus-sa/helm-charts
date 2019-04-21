# `@helm-charts/stable-mongodb`

NoSQL document-oriented database that stores JSON-like documents with dynamic schemas, simplifying the integration of data in content-driven applications.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | mongodb |
| Chart Version       | 5.3.4   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Global Docker image registry
## Please, note that this will override the image registry for all the images, including dependencies, configured to use the global value
##
# global:
#   imageRegistry:

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
  tag: 4.0.6

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

  ## Set to true if you would like to see extra information on logs
  ## It turns NAMI debugging in minideb
  ## ref:  https://github.com/bitnami/minideb-extras/#turn-on-nami-debugging
  debug: false

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

## MongoDB System Log configuration
## ref: https://github.com/bitnami/bitnami-docker-mongodb#configuring-system-log-verbosity-level
##
mongodbSystemLogVerbosity: 0
mongodbDisableSystemLog: false

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

## Kubernetes Cluster Domain
clusterDomain: cluster.local

## Kubernetes service type
service:
  annotations: {}
  type: ClusterIP
  # clusterIP: None
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

# Additional pod labels to apply
podLabels: {}

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

## Pod priority
## https://kubernetes.io/docs/concepts/configuration/pod-priority-preemption/
# priorityClassName: ""

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

## Prometheus Exporter / Metrics
##
metrics:
  enabled: false

  image:
    registry: docker.io
    repository: forekshub/percona-mongodb-exporter
    tag: latest
    pullPolicy: IfNotPresent
    ## Optionally specify an array of imagePullSecrets.
    ## Secrets must be manually created in the namespace.
    ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
    ##
    # pullSecrets:
    #   - myRegistrKeySecretName

  ## Metrics exporter resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  # resources: {}

  ## Metrics exporter pod Annotation
  podAnnotations:
    prometheus.io/scrape: 'true'
    prometheus.io/port: '9216'

  ## Prometheus Service Monitor
  ## ref: https://github.com/coreos/prometheus-operator
  ##      https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md
  serviceMonitor:
    ## If the operator is installed in your cluster, set to true to create a Service Monitor Entry
    enabled: false
    ## Used to pass Labels that are used by the Prometheus installed in your cluster to select Service Monitors to work with
    ## ref: https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#prometheusspec
    additionalLabels: {}

    ## Specify Metric Relabellings to add to the scrape endpoint
    ## ref: https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#endpoint
    # relabellings:

    alerting:
      ## Define individual alerting rules as required
      ## ref: https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#rulegroup
      ##      https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/
      rules: {}

      ## Used to pass Labels that are used by the Prometheus installed in your cluster to select Prometheus Rules to work with
      ## ref: https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#prometheusspec
      additionalLabels: {}
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

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

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

| Parameter                                          | Description                                                                                  | Default                                                 |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `global.imageRegistry`                             | Global Docker image registry                                                                 | `nil`                                                   |
| `image.registry`                                   | MongoDB image registry                                                                       | `docker.io`                                             |
| `image.repository`                                 | MongoDB Image name                                                                           | `bitnami/mongodb`                                       |
| `image.tag`                                        | MongoDB Image tag                                                                            | `{VERSION}`                                             |
| `image.pullPolicy`                                 | Image pull policy                                                                            | `Always`                                                |
| `image.pullSecrets`                                | Specify docker-registry secret names as an array                                             | `[]` (does not add image pull secrets to deployed pods) |
| `image.debug`                                      | Specify if debug logs should be enabled                                                      | `false`                                                 |
| `usePassword`                                      | Enable password authentication                                                               | `true`                                                  |
| `existingSecret`                                   | Existing secret with MongoDB credentials                                                     | `nil`                                                   |
| `mongodbRootPassword`                              | MongoDB admin password                                                                       | `random alphanumeric string (10)`                       |
| `mongodbUsername`                                  | MongoDB custom user                                                                          | `nil`                                                   |
| `mongodbPassword`                                  | MongoDB custom user password                                                                 | `random alphanumeric string (10)`                       |
| `mongodbDatabase`                                  | Database to create                                                                           | `nil`                                                   |
| `mongodbEnableIPv6`                                | Switch to enable/disable IPv6 on MongoDB                                                     | `true`                                                  |
| `mongodbSystemLogVerbosity`                        | MongoDB systen log verbosity level                                                           | `0`                                                     |
| `mongodbDisableSystemLog`                          | Whether to disable MongoDB system log or not                                                 | `false`                                                 |
| `mongodbExtraFlags`                                | MongoDB additional command line flags                                                        | []                                                      |
| `service.annotations`                              | Kubernetes service annotations                                                               | `{}`                                                    |
| `service.type`                                     | Kubernetes Service type                                                                      | `ClusterIP`                                             |
| `service.clusterIP`                                | Static clusterIP or None for headless services                                               | `nil`                                                   |
| `service.nodePort`                                 | Port to bind to for NodePort service type                                                    | `nil`                                                   |
| `port`                                             | MongoDB service port                                                                         | `27017`                                                 |
| `replicaSet.enabled`                               | Switch to enable/disable replica set configuration                                           | `false`                                                 |
| `replicaSet.name`                                  | Name of the replica set                                                                      | `rs0`                                                   |
| `replicaSet.useHostnames`                          | Enable DNS hostnames in the replica set config                                               | `true`                                                  |
| `replicaSet.key`                                   | Key used for authentication in the replica set                                               | `nil`                                                   |
| `replicaSet.replicas.secondary`                    | Number of secondary nodes in the replica set                                                 | `1`                                                     |
| `replicaSet.replicas.arbiter`                      | Number of arbiter nodes in the replica set                                                   | `1`                                                     |
| `replicaSet.pdb.minAvailable.primary`              | PDB for the MongoDB Primary nodes                                                            | `1`                                                     |
| `replicaSet.pdb.minAvailable.secondary`            | PDB for the MongoDB Secondary nodes                                                          | `1`                                                     |
| `replicaSet.pdb.minAvailable.arbiter`              | PDB for the MongoDB Arbiter nodes                                                            | `1`                                                     |
| `podAnnotations`                                   | Annotations to be added to pods                                                              | {}                                                      |
| `podLabels`                                        | Additional labels for the pod(s).                                                            | {}                                                      |
| `resources`                                        | Pod resources                                                                                | {}                                                      |
| `priorityClassName`                                | Pod priority class name                                                                      | ``                                                      |
| `nodeSelector`                                     | Node labels for pod assignment                                                               | {}                                                      |
| `affinity`                                         | Affinity for pod assignment                                                                  | {}                                                      |
| `tolerations`                                      | Toleration labels for pod assignment                                                         | {}                                                      |
| `securityContext.enabled`                          | Enable security context                                                                      | `true`                                                  |
| `securityContext.fsGroup`                          | Group ID for the container                                                                   | `1001`                                                  |
| `securityContext.runAsUser`                        | User ID for the container                                                                    | `1001`                                                  |
| `persistence.enabled`                              | Use a PVC to persist data                                                                    | `true`                                                  |
| `persistence.storageClass`                         | Storage class of backing PVC                                                                 | `nil` (uses alpha storage class annotation)             |
| `persistence.accessMode`                           | Use volume as ReadOnly or ReadWrite                                                          | `ReadWriteOnce`                                         |
| `persistence.size`                                 | Size of data volume                                                                          | `8Gi`                                                   |
| `persistence.annotations`                          | Persistent Volume annotations                                                                | `{}`                                                    |
| `persistence.existingClaim`                        | Name of an existing PVC to use (avoids creating one if this is given)                        | `nil`                                                   |
| `livenessProbe.initialDelaySeconds`                | Delay before liveness probe is initiated                                                     | `30`                                                    |
| `livenessProbe.periodSeconds`                      | How often to perform the probe                                                               | `10`                                                    |
| `livenessProbe.timeoutSeconds`                     | When the probe times out                                                                     | `5`                                                     |
| `livenessProbe.successThreshold`                   | Minimum consecutive successes for the probe to be considered successful after having failed. | `1`                                                     |
| `livenessProbe.failureThreshold`                   | Minimum consecutive failures for the probe to be considered failed after having succeeded.   | `6`                                                     |
| `readinessProbe.initialDelaySeconds`               | Delay before readiness probe is initiated                                                    | `5`                                                     |
| `readinessProbe.periodSeconds`                     | How often to perform the probe                                                               | `10`                                                    |
| `readinessProbe.timeoutSeconds`                    | When the probe times out                                                                     | `5`                                                     |
| `readinessProbe.failureThreshold`                  | Minimum consecutive failures for the probe to be considered failed after having succeeded.   | `6`                                                     |
| `readinessProbe.successThreshold`                  | Minimum consecutive successes for the probe to be considered successful after having failed. | `1`                                                     |
| `configmap`                                        | MongoDB configuration file to be used                                                        | `nil`                                                   |
| `metrics.enabled`                                  | Start a side-car prometheus exporter                                                         | `false`                                                 |
| `metrics.image.registry`                           | MongoDB exporter image registry                                                              | `docker.io`                                             |
| `metrics.image.repository`                         | MongoDB exporter image name                                                                  | `forekshub/percona-mongodb-exporter`                    |
| `metrics.image.tag`                                | MongoDB exporter image tag                                                                   | `latest`                                                |
| `metrics.image.pullPolicy`                         | Image pull policy                                                                            | `IfNotPresent`                                          |
| `metrics.image.pullSecrets`                        | Specify docker-registry secret names as an array                                             | `[]` (does not add image pull secrets to deployed pods) |
| `metrics.podAnnotations`                           | Additional annotations for Metrics exporter pod                                              | {}                                                      |
| `metrics.resources`                                | Exporter resource requests/limit                                                             | Memory: `256Mi`, CPU: `100m`                            |
| `metrics.serviceMonitor.enabled`                   | Create ServiceMonitor Resource for scraping metrics using PrometheusOperator                 | `false`                                                 |
| `metrics.serviceMonitor.additionalLabels`          | Used to pass Labels that are required by the Installed Prometheus Operator                   | {}                                                      |
| `metrics.serviceMonitor.relabellings`              | Specify Metric Relabellings to add to the scrape endpoint                                    | `nil`                                                   |
| `metrics.serviceMonitor.alerting.rules`            | Define individual alerting rules as required                                                 | {}                                                      |
| `metrics.serviceMonitor.alerting.additionalLabels` | Used to pass Labels that are required by the Installed Prometheus Operator                   | {}                                                      |

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
$ helm install --name my-release stable/mongodb --set replicaSet.enabled=true
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

## Initialize a fresh instance

The [Bitnami MongoDB](https://github.com/bitnami/bitnami-docker-mongodb) image allows you to use your custom scripts to initialize a fresh instance. In order to execute the scripts, they must be located inside the chart folder `files/docker-entrypoint-initdb.d` so they can be consumed as a ConfigMap.

The allowed extensions are `.sh`, and `.js`.

## Persistence

The [Bitnami MongoDB](https://github.com/bitnami/bitnami-docker-mongodb) image stores the MongoDB data and configurations at the `/bitnami/mongodb` path of the container.

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) at this location. The volume is created using dynamic volume provisioning.

## Upgrading

### To 5.0.0

When enabling replicaset configuration, backwards compatibility is not guaranteed unless you modify the labels used on the chart's statefulsets.
Use the workaround below to upgrade from versions previous to 5.0.0. The following example assumes that the release name is `my-release`:

```consoloe
$ kubectl delete statefulset my-release-mongodb-arbiter my-release-mongodb-primary my-release-mongodb-secondary --cascade=false
```
