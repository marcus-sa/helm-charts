# `@helm-charts/ibm-charts-ibm-dsm-dev`

IBM Data Server Manager Developer-C Edition. Note that there can only be one DSM deployed per namespace, subsequent DSM will be deleted silently.

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | ibm-charts  |
| Chart Name          | ibm-dsm-dev |
| Chart Version       | 1.1.2       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
###############################################################################
######################## IBM DSM ##############################################
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
  repository: 'na.cumulusrepo.com/hcicp_dev/dsm-dev'
  tag: '2.1.4.1'
  pullPolicy: IfNotPresent

#  secret: "VISIT http://ibm.biz/db2-dsm-license TO RETRIEVE IMAGE SECRET"
imageSidecar:
  repository: 'na.cumulusrepo.com/hcicp_dev/dsm-sidecar'
  tag: '0.4.0'
  pullPolicy: IfNotPresent
global:
  image:
    secret: 'VISIT http://ibm.biz/db2-dsm-license TO RETRIEVE IMAGE SECRET'

###############################################################################
## Persistent Storage
###############################################################################

## Global persistence settings
persistence:
  enabled: true
  useDynamicProvisioning: false

## Persistence enabled by default
dataVolume:
  name: 'datavolume'

  ## Specify the name of the Existing Claim to be used by your application
  existingClaimName: ''

  ## Specify the name of the StorageClass
  ## empty string means don't use a StorageClass
  storageClassName: ''

  ## Required minimum Persistence Storage volume size
  size: 4Gi

service:
  httpPort: 11080
  httpsPort: 11081
  type: NodePort
  name: console

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 4Gi
    cpu: 2
  limits:
    memory: 16Gi
    cpu: 4

## Default user and password to login
login:
  user: admin
  password: ''

# DB2 repository for DSM
repository:
  ## Architecture
  arch:
    amd64: '2 - No preference'
    ppc64le: '2 - No preference'
    s390x: '2 - No preference'

  image:
    repository: 'na.cumulusrepo.com/hcicp_dev/db2server_dec'
    tag: '11.1.2.2b'
    pullPolicy: IfNotPresent

  ## global persistence settings
  persistence:
    useDynamicProvisioning: false
  ## Persistence parameters for /database
  dataVolume:
    ## Specify the name of the StorageClass
    ## empty string means don't use a StorageClass
    storageClassName: ''
    size: 20Gi

  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    requests:
      memory: 2Gi
      cpu: 2000m
    limits:
      memory: 16Gi
      cpu: 4000m
```

</details>

---

# IBM DSM Developer-C Helm Chart

[IBM Data Server Manager](https://www.ibm.com/developerworks/cn/downloads/im/dsm/index.html) enables you to manage database applications in a non-production environment.

## Introduction

This is a chart for IBM Data Server Manager. IBM Data Server Manager which is a database management tool. This chart is intended to be deployed in IBM Cloud Private.

### New in this release

1. Multi-platform manifest support
2. Base OS with latest patches
3. PostgreSQL and MongoDB beta support

## Prerequisites

- Kubernetes 1.6 with Beta APIs enabled
- Helm 2.3.1 and later version
- Retrieve image pull secret by accepting the terms and conditions here - http://ibm.biz/db2-dsm-license (set in global.image.secret)
- Two PersistentVolume(s) need to be pre-created prior to installing the chart if `persistance.enabled=true` and `persistence.dynamicProvisioning=false` (default values, see [persistence](#persistence) section). It can be created by using the IBM Cloud private UI or via a yaml file as the following example:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv0001
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: anything
    storage: 4Gi
  hostPath:
    path: /data/pv0001/
EOF
```

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv0002
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: anything
    storage: 20Gi
  hostPath:
    path: /data/pv0002/
EOF
```

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release --set license=accept --set global.image.secret=<SECRET> stable/ibm-dsm-dev
```

The command deploys ibm-dsm-dev on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Verifying the Chart

See NOTES.txt associated with this chart for verification instructions

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete --purge my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release. If a delete can result in orphaned components include instructions additional commands required for clean-up.

For example :

When deleting a release with stateful sets the associated persistent volume will need to be deleted.  
Do the following after deleting the chart release to clean up orphaned Persistent Volumes.

```console
$ kubectl delete pvc -l release=my-release
```

## Configuration

The following tables lists the configurable parameters of the ibm-dsm-dev chart and their default values.

| Parameter                                        | Description                                                    | Default                                                         |
| ------------------------------------------------ | -------------------------------------------------------------- | --------------------------------------------------------------- |
| `arch.amd64`                                     | `Amd64 worker node scheduler preference in a hybrid cluster`   | `2 - No preference` - worker node is chosen by scheduler        |
| `arch.ppc64le`                                   | `Ppc64le worker node scheduler preference in a hybrid cluster` | `2 - No preference` - worker node is chosen by scheduler        |
| `arch.s390x`                                     | `S390x worker node scheduler preference in a hybrid cluster`   | `2 - No preference` - worker node is chosen by scheduler        |
| `image.repository`                               | `DSM` image                                                    | `na.cumulusrepo.com/hcicp_dev/dsm`                              |
| `image.tag`                                      | `DSM` image tag                                                | `2.1.4`                                                         |
| `imageSidecar.Tag`                               | `DSM` sidecar image tag                                        | `0.3.0`                                                         |
| `image.pullPolicy`                               | `DSM` image pull policy                                        | `Always` if `imageTag` is `latest`, else `IfNotPresent`         |
| `imageSidecar.pullPolicy`                        | `DSM` sidecar image pull policy                                | `Always` if `imageTag` is `latest`, else `IfNotPresent`         |
| `global.image.secret`                            | `DSM` and repository image secret                              | `VISIT http://ibm.biz/db2-dsm-license TO RETRIEVE IMAGE SECRET` |
| `login.user`                                     | `DSM` admin user name                                          | `admin`                                                         |
| `login.password`                                 | `DSM` admin password                                           | `nil`                                                           |
| `dataVolume.name`                                | The PVC name to persist data                                   | `datavolume`                                                    |
| `persistence.enabled`                            | Use a PVC to persist data                                      | `true`                                                          |
| `persistence.useDynamicProvisioning`             | Dynamic provision persistent volume or not                     | `false`                                                         |
| `dataVolume.persistence.existingClaim`           | Provide an existing PersistentVolumeClaim                      | `nil`                                                           |
| `dataVolume.persistence.storageClass`            | Storage class of backing PVC                                   | `nil`                                                           |
| `dataVolume.persistence.size`                    | Size of data volume                                            | `4Gi`                                                           |
| `resources.limits.cpu`                           | Container CPU limit                                            | `4`                                                             |
| `resources.limits.memory`                        | Container memory limit                                         | `16Gi`                                                          |
| `resources.requests.cpu`                         | Container CPU requested                                        | `2`                                                             |
| `resources.requests.memory`                      | Container Memory requested                                     | `4Gi`                                                           |
| `service.httpPort`                               | Internal http port                                             | `11080`                                                         |
| `service.httpPort`                               | Interal https port                                             | `11081`                                                         |
| `service.type`                                   | k8s service type exposing ports, e.g.`ClusterIP`               | `NodePort`                                                      |
| `service.name`                                   | k8s service type exposing ports name                           | `console`                                                       |
| `repository.image.repository`                    | Repository image                                               | `na.cumulusrepo.com/hcicp_dev/db2server_dec`                    |
| `repository.image.tag`                           | Repository image tag                                           | `11.1.2.2b`                                                     |
| `repository.image.pullPolicy`                    | Repository image pull policy                                   | `Always` if `imageTag` is `latest`, else `IfNotPresent`         |
| `repository.persistence.useDynamicProvisioning`  | Dynamic provision persistent volume or not                     | `false`                                                         |
| `repository.dataVolume.persistence.storageClass` | Storage class of backing PVC                                   | `nil`                                                           |
| `repository.dataVolume.persistence.size`         | Size of data volume                                            | `20Gi`                                                          |
| `repository.resources.limits.cpu`                | Repository container CPU limit                                 | `4000m`                                                         |
| `repository.resources.limits.memory`             | Repository container memory limit                              | `16Gi`                                                          |
| `repository.resources.requests.cpu`              | Repository container CPU requested                             | `1000m`                                                         |
| `repository.resources.requests.memory`           | Repository container Memory requested                          | `2Gi`                                                           |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart.

> **Tip**: You can use the default [values.yaml](values.yaml)

The volume defaults to mount at a subdirectory of the volume instead of the volume root to avoid the volume's hidden directories from interfering with database creation.

## Architecture

- Three major architectures are now available for DSM Developer-C Edition on IBM Cloud Private worker nodes:
  - AMD64 / x86_64
  - s390x
  - ppc64le

An ???arch??? field in values.yaml is required to specify supported architectures to be used during scheduling and includes ability to give preference to certain architecture(s) over another.

Specify architecture (amd64, ppc64le, s390x) and weight to be used for scheduling as follows :
0 - Do not use
1 - Least preferred
2 - No preference
3 - Most preferred

## Persistence

- Persistent storage using kubernetes dynamic provisioning. Uses the default storageclass defined by the kubernetes admin or by using a custom storageclass which will override the default.
  - Set global values to:
    - persistence.enabled: true (default)
    - persistence.useDynamicProvisioning: true
    - repository.persistence.useDynamicProvisioning: true
  - Specify a custom storageClassName per volume or leave the value empty to use the default storageClass.

* Persistent storage using a predefined PersistentVolumeClaim or PersistentVolume setup prior to the deployment of this chart
  - Set global values to:
    - persistence.enabled: true
    - persistence.useDynamicProvisioning: false (default)
    - repository.persistence.useDynamicProvisioning: false (default)
  - Specify an existingClaimName per volume or leave the value empty and let the kubernetes binding process select a pre-existing volume based on the accessMode and size.

- No persistent storage. This mode with use emptyPath for any volumes referenced in the deployment
  - enable this mode by setting the global values to:
    - persistence.enabled: false
    - persistence.useDynamicProvisioning: false
    - repository.persistence.useDynamicProvisioning: false

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) volume. The volume is created using dynamic volume provisioning. If the PersistentVolumeClaim should not be managed by the chart, define `persistence.existingClaim`.

## Automatically connect and manage Db2

If you have Db2 created in your namespace (no matter created before or after DSM), DSM will automatically connect to it and start to manage it.

A repository DB is created automatically to store your monitor and administration metadata. The minimum resource requied: 1 CPU 2G memory and 8G storage. It may need a long time when DSM deploy, creat repository DB and bind to it. If you delete DSM, its repository DB will also be deleted automatically.

You can only run one DSM per namespace. If you deploy the second DSM, it will be deleted silently in a while in backend.
