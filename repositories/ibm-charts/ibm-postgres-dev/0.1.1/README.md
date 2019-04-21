# `@helm-charts/ibm-charts-ibm-postgres-dev`

Object-relational database management system (ORDBMS) with an emphasis on extensibility and on standards-compliance.

| Field               | Value            |
| ------------------- | ---------------- |
| Repository Name     | ibm-charts       |
| Chart Name          | ibm-postgres-dev |
| Chart Version       | 0.1.1            |
| NPM Package Version | 0.1.0            |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
###############################################################################
############################ PostgreSQL #######################################
###############################################################################

###############################################################################
## Common image variables
###############################################################################
image:
  repository: na.cumulusrepo.com/hcicp_dev/postgresql
  tag: 9.6.4
  pullPolicy: IfNotPresent

  # Docker images will be pushed for supported architectures (i.e. x86_64, ppc64le, ...)
  # and a fat manifest" created which references the image manifests for platform-specific
  # versions of an image.
  # For example :
  #   myimage:1.0             <--------  Used in HELM Chart
  #   myimage:1.0_ppc64le
  #   myimage:1.0_x86_64

###############################################################################
## Persistence Storage
###############################################################################

## Persistence enabled by default
## global persistence settings
persistence:
  enabled: true
  useDynamicProvisioning: false

dataVolume:
  name: 'data-stor'

  ## Specify the name of the Existing Claim to be used by your application
  ## empty string means don't use an existClaim
  existingClaimName: ''

  ## Specify the name of the StorageClass
  ## empty string means don't use a StorageClass
  storageClassName: ''
  accessModes: ReadWriteOnce
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
    cpu: 16000m

service:
  name: postgresql
  type: NodePort
  port: 5432

## Database access attributes - empty value will be
## overriden with default
database:
  user: ''
  password: ''
  name: ''
  dbcmd: ''

  ## Specify initial db arguments defined by image , e.g. --data-checksums
  ## ref: <database specific documentation regarding initialization parameters>
  initdbArgs: ''
```

</details>

---

PostgreSQL Development- BETA

[PostgreSQL](https://www.postgresql.org/) is an object-relational database management system (ORDBMS) with an emphasis on extensibility and on standards-compliance.

## Introduction

This chart is a generic chart for persistent relational and non-relational databases intended to be deployed in IBM Cloud private environments. Both IBM and open source databases are supported.

## Prerequisites

- Persistent Volume is required if persistance is enabled and no dynamic provisioning has been set up. You can create a persistent volume via the IBM Cloud private interface or through a yaml file. For example:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv0001
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: anything
    storage: 5Gi
  hostPath:
    path: /data/pv0001/
EOF
```

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/ibm-postgres-dev
```

The command deploys PostgreSQL on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Verifying the Chart

See NOTES.txt associated with this chart for verification instructions

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release. If a delete can result in orphaned components include instructions additional commands required for clean-up.

For example :

When deleting a release with stateful sets the associated persistent volume will need to be deleted.  
Do the following after deleting the chart release to clean up orphaned Persistent Volumes.

```console
$ kubectl delete pvc -l release=my-release
```

## Configuration

The following tables lists the configurable parameters of the IBM PostgreSQL chart and their default values.

| Parameter                            | Description                                      | Default                                                 |
| ------------------------------------ | ------------------------------------------------ | ------------------------------------------------------- |
| `image`                              | `postgresql` image repository                    | `postgresql`                                            |
| `imageTag`                           | `postgresql` image tag                           | `9.6.4`                                                 |
| `imagePullPolicy`                    | Image pull policy                                | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `persistence.enabled`                | Use a PVC to persist data                        | `true`                                                  |
| `persistence.useDynamicProvisioning` | Specify a storageclass or leave empty            | `false`                                                 |
| `dataVolume.existingClaim`           | Provide an existing PersistentVolumeClaim        | `nil`                                                   |
| `dataVolume.storageClass`            | Storage class of backing PVC                     | `nil`                                                   |
| `dataVolume.size`                    | Size of data volume                              | `8Gi`                                                   |
| `resources`                          | CPU/Memory resource requests/limits              | Memory: `256Mi`, CPU: `100m`                            |
| `user`                               | Username of new user to create.                  | `nil`                                                   |
| `password`                           | Password for the new user.                       | custom or random 10 characters                          |
| `initialDatabase`                    | Name for new database to create.                 | `nil`                                                   |
| `initdbArgs`                         | Initdb Arguments                                 | `nil`                                                   |
| `persistence.subPath`                | Subdirectory of the volume to mount at           | `nil`                                                   |
| `service.port`                       | TCP port                                         | `5432`                                                  |
| `service.type`                       | k8s service type exposing ports, e.g. `NodePort` | `NodePort`                                              |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

- Persistent storage using kubernetes dynamic provisioning. Uses the default storageclass defined by the kubernetes admin or by using a custom storageclass which will override the default.
  - Set global values to:
    - persistence.enabled: true (default)
    - persistence.useDynamicProvisioning: true
  - Specify a custom storageClassName per volume or leave the value empty to use the default storageClass.

* Persistent storage using a predefined PersistentVolumeClaim or PersistentVolume setup prior to the deployment of this chart
  - Set global values to:
    - persistence.enabled: true
    - persistence.useDynamicProvisioning: false (default)
  - Specify an existingClaimName per volume or leave the value empty and let the kubernetes binding process select a pre-existing volume based on the accessMode and size.

- No persistent storage. This mode with use emptyPath for any volumes referenced in the deployment
  - enable this mode by setting the global values to:
    - persistence.enabled: false
    - persistence.useDynamicProvisioning: false

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) volume. The volume is created using dynamic volume provisioning. If the PersistentVolumeClaim should not be managed by the chart, define `persistence.existingClaim`.

### Existing PersistentVolumeClaims

1. Create the PersistentVolume
1. Create the PersistentVolumeClaim
1. Install the chart

```bash
$ helm install --set persistence.existingClaim=PVC_NAME
```

The volume defaults to mount at a subdirectory of the volume instead of the volume root to avoid the volume's hidden directories from interfering with database creation.
