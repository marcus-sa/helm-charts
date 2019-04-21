# `@helm-charts/stable-hlf-couchdb`

CouchDB instance for Hyperledger Fabric (these charts are created by AID:Tech and are currently not directly associated with the Hyperledger project)

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | stable      |
| Chart Name          | hlf-couchdb |
| Chart Version       | 1.0.6       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Default values for hlf-couchdb.
## This is a YAML-formatted file.
## Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: hyperledger/fabric-couchdb
  tag: 0.4.10
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 5984

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - chart-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

persistence:
  enabled: true
  annotations: {}
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  storageClass: ''
  accessMode: ReadWriteOnce
  size: 1Gi
  # existingClaim: ""

##################################
## Further configuration options #
##################################
## Database username
couchdbUsername: 'couchdb'
## Database password (default: random 24 character string)
# couchdbPassword:

resources:
  {}
  ## We usually recommend not to specify default resources and to leave this as a conscious
  ## choice for the user. This also increases chances charts run on environments with little
  ## resources, such as Minikube. If you do want to specify resources, uncomment the following
  ## lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  ## limits:
  #   cpu: 100m
  #   memory: 128Mi
  # requests:
  #   cpu: 100m
  #   memory: 128Mi

nodeSelector: {}

tolerations: []

affinity:
  ## Suggested antiAffinity, as each CouchDB instance should be on a separate Node for resilience
  # podAntiAffinity:
  #   requiredDuringSchedulingIgnoredDuringExecution:
  #     - topologyKey: "kubernetes.io/hostname"
  #       labelSelector:
  #         matchLabels:
  #           app: hlf-couchdb
```

</details>

---

# Hyperledger Fabric CouchDB

[Hyperledger Fabric CouchDB](http://hyperledger-fabric.readthedocs.io/) is the node holding the blockchain ledger of each peers for the [Hyperledger](https://www.hyperledger.org/) Fabric permissioned blockchain framework.

## TL;DR;

```bash
$ helm install stable/hlf-couchdb
```

## Introduction

Hyperledger Fabric Peers can make use of CouchDB instances to permit rich query operations on ledger data. This chart utilises a modified version of CouchDB suitable for Hyperledger Fabric applications.

## Prerequisites

- Kubernetes 1.9+
- PV provisioner support in the underlying infrastructure.

## Installing the Chart

To install the chart with the release name `cdb1`:

```bash
$ helm install stable/hlf-couchdb --name cdb1
```

The command deploys the Hyperledger Fabric implementation of CouchDB on the Kubernetes cluster in the default configuration. The [Configuration](#Configuration) section lists the parameters that can be configured during installation.

### Custom parameters

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```bash
$ helm install stable/hlf-couchdb --name cdb1 --set couchdbUsername=couchdb,couchdbPassword=secretpassword
```

The above command creates a CouchDB user named `couchdb` with password `secretpassword`.

Alternatively, a YAML file can be provided while installing the chart. This file specifies values to override those provided in the default values.yaml. For example,

```bash
$ helm install stable/hlf-couchdb --name cdb1 -f my-values.yaml
```

## Updating the chart

When updating the chart, make sure you provide the `couchdbPassword`, otherwise `helm update` will generate a new random (and invalid) password.

```bash
$ export COUCHDB_PASSWORD=$(kubectl get secret --namespace {{ .Release.Namespace }} cdb1 -o jsonpath="{.data.COUCHDB_PASSWORD}" | base64 --decode; echo)
$ helm upgrade cdb1 stable/hlf-couchdb --set couchdbPassword=$COUCHDB_PASSWORD
```

## Uninstalling the Chart

To uninstall/delete the `cdb1` deployment:

```bash
$ helm delete cdb1
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Hyperledger Fabric CouchDB chart and default values.

| Parameter                  | Description                                       | Default                           |
| -------------------------- | ------------------------------------------------- | --------------------------------- |
| `image.repository`         | `hlf-couchdb` image repository                    | `hyperledger/fabric-couchdb`      |
| `image.tag`                | `hlf-couchdb` image tag                           | `x86_64-0.4.7`                    |
| `image.pullPolicy`         | Image pull policy                                 | `IfNotPresent`                    |
| `service.port`             | TCP port                                          | `5984`                            |
| `service.type`             | K8S service type exposing ports, e.g. `ClusterIP` | `ClusterIP`                       |
| `persistence.accessMode`   | Use volume as ReadOnly or ReadWrite               | `ReadWriteOnce`                   |
| `persistence.annotations`  | Persistent Volume annotations                     | `{}`                              |
| `persistence.size`         | Size of data volume (adjust for production!)      | `1Gi`                             |
| `persistence.storageClass` | Storage class of backing PVC                      | `default`                         |
| `couchdbUsername`          | Username for CouchDB                              | `couchdb`                         |
| `couchdbPassword`          | Password for CouchDB                              | Random 24 alphanumeric characters |
| `resources`                | CPU/Memory resource requests/limits               | `{}`                              |
| `nodeSelector`             | Node labels for pod assignment                    | `{}`                              |
| `tolerations`              | Toleration labels for pod assignment              | `[]`                              |
| `affinity`                 | Affinity settings for pod assignment              | `{}`                              |

## Persistence

The volume stores the Fabric CouchDB data and configurations at the `/opt/couchdb/data` path of the container.

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) at this location. The volume is created using dynamic volume provisioning through a PersistentVolumeClaim managed by the chart.

## Feedback and feature requests

This is a work in progress and we are happy to accept feature requests. We are even happier to accept pull requests implementing improvements :-)
