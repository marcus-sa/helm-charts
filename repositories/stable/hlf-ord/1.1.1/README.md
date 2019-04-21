# `@helm-charts/stable-hlf-ord`

Hyperledger Fabric Orderer chart (these charts are created by AID:Tech and are currently not directly associated with the Hyperledger project)

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | hlf-ord |
| Chart Version       | 1.1.1   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Default values for hlf-ord.
## This is a YAML-formatted file.
## Declare variables to be passed into your templates.

image:
  repository: hyperledger/fabric-orderer
  tag: 1.2.0
  pullPolicy: IfNotPresent

service:
  # Cluster IP or LoadBalancer
  type: ClusterIP
  port: 7050

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
## Address of Certificate Authority where O
caAddress: hlf-ca.local
## Username for registering/enrolling with CA
caUsername: ord1
## Password for registering/enrolling with CA  (defaults to random 24 alphanumeric)
# caPassword:

ord:
  # Tools version
  hlfToolsVersion: 1.2.0
  ## Type of Orderer, `solo` or `kafka`
  type: solo
  ## MSP ID of the Orderer
  mspID: OrdererMSP

secrets:
  {}
  ## This should contain "genesis" block derived from a configtx.yaml
  ## configtxgen -profile OrdererGenesis -outputBlock genesis.block
  # genesis: hlf--genesis
  ## This should contain the Certificate of the Orderer Organisation admin
  ## This is necessary to successfully run the orderer
  # adminCert: hlf--ord-admincert
  ## This should contain the CA server's TLS details under the key tls.crt (e.g. a Let's Encrypt Certificate PEM)
  # caServerTls: ca--tls

resources:
  {}
  ## We usually recommend not to specify default resources and to leave this as a conscious
  ## choice for the user. This also increases chances charts run on environments with little
  ## resources, such as Minikube. If you do want to specify resources, uncomment the following
  ## lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #   cpu: 100m
  #   memory: 128Mi
  # requests:
  #   cpu: 100m
  #   memory: 128Mi

nodeSelector: {}

tolerations: []

affinity:
  {}
  ## Suggested antiAffinity, as each Orderer should be on a separate Node for resilience
  # podAntiAffinity:
  #   requiredDuringSchedulingIgnoredDuringExecution:
  #     - topologyKey: "kubernetes.io/hostname"
  #       labelSelector:
  #         matchLabels:
  #           app: hlf-ord
```

</details>

---

# Hyperledger Fabric Orderer

[Hyperledger Fabric Orderer](http://hyperledger-fabric.readthedocs.io/) is the node type responsible for "consensus" for the [Hyperledger](https://www.hyperledger.org/) Fabric permissioned blockchain framework.

## TL;DR;

```bash
$ helm install stable/hlf-ord
```

## Introduction

The Hyperledger Fabric Orderer can be installed as either a `solo` orderer (for development), or a `kafka` orderer (for crash fault tolerant consensus).

This Orderer can receive transaction endorsements and package them into blocks to be distributed to the nodes of the Hyperledger Fabric network.

Learn more about deploying a production ready consensus framework based on Apache [Kafka](https://hyperledger-fabric.readthedocs.io/en/release-1.1/kafka.html?highlight=orderer). Minimally, you will need to set these options:

```
  "default.replication.factor": 4  # given a 4 node Kafka cluster
  "unclean.leader.election.enable": false
  "min.insync.replicas": 3  # to permit one Kafka replica to go offline
  "message.max.bytes": "103809024"  # 99 * 1024 * 1024 B
  "replica.fetch.max.bytes": "103809024"  # 99 * 1024 * 1024 B
  "log.retention.ms": -1  # Since we need to keep logs indefinitely for the HL Fabric Orderer
```

## Prerequisites

- Kubernetes 1.9+
- PV provisioner support in the underlying infrastructure.
- Two K8S secrets containing:
  - the genesis block for the Orderer
  - the certificate of the Orderer Organisation Admin
- A running [Kafka Chart](https://github.com/kubernetes/charts/tree/master/incubator/kafka) if you are using the `kafka` consensus mechanism.

## Installing the Chart

To install the chart with the release name `ord1`:

```bash
$ helm install stable/hlf-ord --name ord1
```

The command deploys the Hyperledger Fabric Orderer on the Kubernetes cluster in the default configuration. The [Configuration](#configuration) section lists the parameters that can be configured during installation.

### Custom parameters

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```bash
$ helm install stable/hlf-ord --name ord1 --set caUsername=ord1,caPassword=secretpassword
```

The above command specifies (but does not register/enroll) an Orderer username of `ord1` with password `secretpassword`.

Alternatively, a YAML file can be provided while installing the chart. This file specifies values to override those provided in the default values.yaml. For example,

```bash
$ helm install stable/hlf-ord --name ord1 -f my-values.yaml
```

## Updating the chart

When updating the chart, make sure you provide the `caPassword`, otherwise `helm update` will generate a new random (and invalid) password.

```bash
$ export CA_PASSWORD=$(kubectl get secret --namespace {{ .Release.Namespace }} ord1-hlf-ord -o jsonpath="{.data.CA_PASSWORD}" | base64 --decode; echo)
$ helm upgrade ord1 stable/hlf-ord --set caPassword=$CA_PASSWORD
```

## Uninstalling the Chart

To uninstall/delete the `ord1` deployment:

```bash
$ helm delete ord1
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Hyperledger Fabric Orderer chart and default values.

| Parameter                  | Description                                       | Default                           |
| -------------------------- | ------------------------------------------------- | --------------------------------- |
| `image.repository`         | `hlf-ord` image repository                        | `hyperledger/fabric-orderer`      |
| `image.tag`                | `hlf-ord` image tag                               | `x86_64-1.1.0`                    |
| `image.pullPolicy`         | Image pull policy                                 | `IfNotPresent`                    |
| `service.port`             | TCP port                                          | `7050`                            |
| `service.type`             | K8S service type exposing ports, e.g. `ClusterIP` | `ClusterIP`                       |
| `persistence.accessMode`   | Use volume as ReadOnly or ReadWrite               | `ReadWriteOnce`                   |
| `persistence.annotations`  | Persistent Volume annotations                     | `{}`                              |
| `persistence.size`         | Size of data volume (adjust for production!)      | `1Gi`                             |
| `persistence.storageClass` | Storage class of backing PVC                      | `default`                         |
| `caAddress`                | Address of CA to register/enroll with             | `hlf-ca.local`                    |
| `caUsername`               | Username for registering/enrolling with CA        | `ord1`                            |
| `caPassword`               | Password for registering/enrolling with CA        | Random 24 alphanumeric characters |
| `ord.hlfToolsVersion`      | Version of Hyperledger Fabric tools used          | `1.1.0`                           |
| `ord.type`                 | Type of Orderer (`solo` or `kafka`)               | `solo`                            |
| `ord.mspID`                | ID of MSP the Orderer belongs to                  | `OrdererMSP`                      |
| `secrets.genesis`          | Secret containing Genesis Block for orderer       | `hlf--genesis`                    |
| `secrets.adminCert`        | Secret containing Orderer Org admin certificate   | `hlf--ord-admincert`              |
| `secrets.caServerTls`      | Secret containing CA Server TLS certificate       | `ca--tls`                         |
| `resources`                | CPU/Memory resource requests/limits               | `{}`                              |
| `nodeSelector`             | Node labels for pod assignment                    | `{}`                              |
| `tolerations`              | Toleration labels for pod assignment              | `[]`                              |
| `affinity`                 | Affinity settings for pod assignment              | `{}`                              |

## Persistence

The volume stores the Fabric Orderer data and configurations at the `/var/hyperledger` path of the container.

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) at this location. The volume is created using dynamic volume provisioning through a PersistentVolumeClaim managed by the chart.

## Feedback and feature requests

This is a work in progress and we are happy to accept feature requests. We are even happier to accept pull requests implementing improvements :-)
