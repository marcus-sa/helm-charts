# `@helm-charts/bitnami-mongodb`

NoSQL document-oriented database that stores JSON-like documents with dynamic schemas, simplifying the integration of data in content-driven applications.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | bitnami |
| Chart Name          | mongodb |
| Chart Version       | 2.0.2   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami MongoDB image version
## ref: https://hub.docker.com/r/bitnami/mongodb/tags/
##
image:
  registry: docker.io
  repository: bitnami/mongodb
  tag: 3.7.3
  ## Specify a imagePullPolicy
  ## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  ##
  pullPolicy: IfNotPresent
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

## MongoDB admin password
## ref: https://github.com/bitnami/bitnami-docker-mongodb/blob/master/README.md#setting-the-root-password-on-first-run
##
# mongodbRootPassword:

## MongoDB custom user and database
## ref: https://github.com/bitnami/bitnami-docker-mongodb/blob/master/README.md#creating-a-user-and-database-on-first-run
##
# mongodbUsername:
# mongodbPassword:
# mongodbDatabase:

## MongoDB additional command line flags
##
## Can be used to specify command line flags, for example:
##
## mongodbExtraFlags:
##  - "--wiredTigerCacheSizeGB=2"
mongodbExtraFlags: []

service:
  ## Kubernetes service type
  type: ClusterIP

  ## Specify the nodePort value for the LoadBalancer and NodePort service types.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
  ##
  # nodePort:

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
  accessMode: ReadWriteOnce
  size: 8Gi

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 256Mi
    cpu: 100m

## Node selector
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
nodeSelector: {}

## Configure extra options for liveness and readiness probes
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#configure-probes)
livenessProbe:
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1
readinessProbe:
  initialDelaySeconds: 5
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1
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

| Parameter                            | Description                                                                                  | Default                                                 |
| ------------------------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `image.registry`                     | MongoDB image registry                                                                       | `docker.io`                                             |
| `image.repository`                   | MongoDB Image name                                                                           | `bitnami/mongodb`                                       |
| `image.tag`                          | MongoDB Image tag                                                                            | `{VERSION}`                                             |
| `image.pullPolicy`                   | Image pull policy                                                                            | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`                  | Specify image pull secrets                                                                   | `nil`                                                   |
| `usePassword`                        | Enable password authentication                                                               | `true`                                                  |
| `mongodbRootPassword`                | MongoDB admin password                                                                       | `random alhpanumeric string (10)`                       |
| `mongodbUsername`                    | MongoDB custom user                                                                          | `nil`                                                   |
| `mongodbPassword`                    | MongoDB custom user password                                                                 | `random alhpanumeric string (10)`                       |
| `mongodbDatabase`                    | Database to create                                                                           | `nil`                                                   |
| `mongodbExtraFlags`                  | MongoDB additional command line flags                                                        | []                                                      |
| `service.type`                       | Kubernetes Service type                                                                      | `ClusterIP`                                             |
| `service.nodePort`                   | Port to bind to for NodePort service type                                                    | `nil`                                                   |
| `persistence.enabled`                | Use a PVC to persist data                                                                    | `true`                                                  |
| `persistence.storageClass`           | Storage class of backing PVC                                                                 | `nil` (uses alpha storage class annotation)             |
| `persistence.accessMode`             | Use volume as ReadOnly or ReadWrite                                                          | `ReadWriteOnce`                                         |
| `persistence.size`                   | Size of data volume                                                                          | `8Gi`                                                   |
| `nodeSelector`                       | Node labels for pod assignment                                                               | {}                                                      |
| `livenessProbe.initialDelaySeconds`  | Delay before liveness probe is initiated                                                     | 30                                                      |
| `livenessProbe.periodSeconds`        | How often to perform the probe                                                               | 10                                                      |
| `livenessProbe.timeoutSeconds`       | When the probe times out                                                                     | 5                                                       |
| `livenessProbe.successThreshold`     | Minimum consecutive successes for the probe to be considered successful after having failed. | 1                                                       |
| `livenessProbe.failureThreshold`     | Minimum consecutive failures for the probe to be considered failed after having succeeded.   | 6                                                       |
| `readinessProbe.initialDelaySeconds` | Delay before readiness probe is initiated                                                    | 5                                                       |
| `readinessProbe.periodSeconds`       | How often to perform the probe                                                               | 10                                                      |
| `readinessProbe.timeoutSeconds`      | When the probe times out                                                                     | 5                                                       |
| `readinessProbe.successThreshold`    | Minimum consecutive successes for the probe to be considered successful after having failed. | 1                                                       |
| `readinessProbe.failureThreshold`    | Minimum consecutive failures for the probe to be considered failed after having succeeded.   | 6                                                       |

The above parameters map to the env variables defined in [bitnami/mongodb](http://github.com/bitnami/bitnami-docker-mongodb). For more information please refer to the [bitnami/mongodb](http://github.com/bitnami/bitnami-docker-mongodb) image documentation.

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

## Persistence

The [Bitnami MongoDB](https://github.com/bitnami/bitnami-docker-mongodb) image stores the MongoDB data and configurations at the `/bitnami/mongodb` path of the container.

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) at this location. The volume is created using dynamic volume provisioning.
