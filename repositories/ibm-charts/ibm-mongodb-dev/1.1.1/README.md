# `@helm-charts/ibm-charts-ibm-mongodb-dev`

NoSQL document-oriented database that stores JSON-like documents with dynamic schemas, simplifying the integration of data in content-driven applications.

| Field               | Value           |
| ------------------- | --------------- |
| Repository Name     | ibm-charts      |
| Chart Name          | ibm-mongodb-dev |
| Chart Version       | 1.1.1           |
| NPM Package Version | 0.1.0           |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
###############################################################################
############################ MongoDB ##########################################
###############################################################################

###############################################################################
## Common image variables
###############################################################################
## Architecture - e.g. amd64, s390x, ppc64le. Specific worker node architecture
## to deploy to.
## You can use kubectl version command to determine the architecture on the
## desired worker node.

# Specify architecture (amd64, ppc64le, s390x) and weight to be  used for scheduling as follows :
#   0 - Do not use
#   1 - Least preferred
#   2 - No preference
#   3 - Most preferred
arch:
  amd64: '2 - No preference'
  ppc64le: '2 - No preference'
  s390x: '2 - No preference'

image:
  repository: 'na.cumulusrepo.com/hcicp_dev/mongodb'
  tag: '3.6.0'

  ## Specify a imagePullPolicy
  ## 'Always' if imageTag is 'latest', else set to 'IfNotPresent'
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  ##
  imagePullPolicy: IfNotPresent

###############################################################################
## Persistence Storage
###############################################################################

## Persistence enabled by default
## global persistence settings
persistence:
  enabled: true
  useDynamicProvisioning: false

dataVolume:
  name: 'datavolume'

  ## Specify the name of the Existing Claim to be used by your application
  existingClaimName: ''

  ## Specify the name of the StorageClass
  ## empty string means don't use a StorageClass
  storageClassName: ''

  ## Required minimum Persistence Storage volume size of 8Gi
  size: 20Gi

## sub-path inside the referenced volume instead of its root if specified
volumeMounts:
  data:
    subPath: ''

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 256Mi
    cpu: 100m
  limits:
    cpu: 2
    memory: 4Gi

service:
  name: ibm-mongodb-dev
  type: NodePort
  port: 27017

## Database access attributes - empty value will be
## overriden with default
database:
  user: 'mongo'
  password: ''
  name: 'admin'
  dbcmd: 'mongo'
  ## Specify initial db arguments defined by image , e.g. --data-checksums
  ## ref: <database specific documentation regarding initialization parameters>
  # initdbArgs: ""
```

</details>

---

# MongoDB

THIS VERSION OF THE CHART IS NOW DEPRECATED. THE SUBSEQUENT VERSION IS v1.1.2
[MongoDB](https://www.mongodb.com/) is a cross-platform document-oriented database. Classified as a NoSQL database, MongoDB eschews the traditional table-based relational database structure in favor of JSON-like documents with dynamic schemas, making the integration of data in certain types of applications easier and faster.

## Introduction

This chart bootstraps a MongoDB deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

### New in this release

1. Multi-platform manifest support
2. Base OS with latest patches

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure
- Persistent Volume is required if persistance is enabled and no dynamic provisioning has been set up. You can create a persistent volume via the IBM Cloud Private interface or through a yaml file. For example:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: <persistent volume name>
spec:
  capacity:
    storage: 8Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: <PATH>
```

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/ibm-mongodb-dev
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

The following tables lists the configurable parameters of the MongoDB chart and their default values.

| Parameter                            | Description                                                    | Default                                                  |
| ------------------------------------ | -------------------------------------------------------------- | -------------------------------------------------------- |
| `arch.amd64`                         | `Amd64 worker node scheduler preference in a hybrid cluster`   | `2 - No preference` - worker node is chosen by scheduler |
| `arch.ppc64le`                       | `Ppc64le worker node scheduler preference in a hybrid cluster` | `2 - No preference` - worker node is chosen by scheduler |
| `arch.s390x`                         | `S390x worker node scheduler preference in a hybrid cluster`   | `2 - No preference` - worker node is chosen by scheduler |
| `image.repository`                   | MongoDB repository                                             | `na.cumulusrepo.com/hcicp_dev/mongodb`                   |
| `image.tag`                          | Image tag                                                      | `3.6.0`                                                  |
| `image.imagePullPolicy`              | Image pull policy                                              | `Always` if `imageTag` is `latest`, else `IfNotPresent`. |
| `database.user`                      | MongoDB admin user                                             | `mongo`                                                  |
| `database.password`                  | MongoDB admin user password                                    | `nil`                                                    |
| `database.name`                      | Database to create                                             | `admin`                                                  |
| `service.type`                       | Kubernetes Service type                                        | `ClusterIP`                                              |
| `service.port`                       | MongoDB port                                                   | `27017`                                                  |
| `persistence.enabled`                | Use a PVC to persist data                                      | `true`                                                   |
| `persistence.useDynamicProvisioning` | Specify a storageclass or leave empty                          | `false`                                                  |
| `resources.limits.cpu`               | Container CPU limit                                            | 2                                                        |
| `resources.limits.memory`            | Container memory limit                                         | 4Gi                                                      |
| `resources.requests.cpu`             | Container CPU requested                                        | 100m                                                     |
| `resources.requests.memory`          | Container Memory requested                                     | 258Mi                                                    |
| `dataVolume.name`                    | Name of the PVC to be created                                  | `datavolume`                                             |
| `dataVolume.storageClassName`        | Storage class of backing PVC                                   | `nil` (uses alpha storage class annotation)              |
| `dataVolume.existingClaimName`       | Name of the Existing Claim to be used                          | `nil`                                                    |
| `dataVolume.size`                    | Size of data volume                                            | `8Gi`                                                    |

The above parameters map to the env variables defined in [values.yaml](https://github.com/IBM/charts/blob/master/stable/ibm-mongodb-dev/values.yaml).

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set database.password=mypassword,database.user=myuser \
    stable/ibm-mongodb-dev
```

The above command sets the MongoDB `myuser` account password to `mypassword`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/ibm-mongodb-dev
```

## Persistence

The MongoDB image stores the MongoDB data at the `/data/db` path of the container.

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) volume at this location. User need to create a PV before chart deployed, or enable dynamic volume provisioning in chart configuration.
