# `@helm-charts/stable-hlf-peer`

Hyperledger Fabric Peer chart (these charts are created by AID:Tech and are currently not directly associated with the Hyperledger project)

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | hlf-peer |
| Chart Version       | 1.2.0    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for  hlf-peer.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

image:
  repository: hyperledger/fabric-peer
  tag: 1.2.0
  pullPolicy: IfNotPresent

service:
  # Cluster IP or LoadBalancer
  type: ClusterIP
  portRequest: 7051
  portEvent: 7053

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
## Peer configuration options    #
##################################
peer:
  # Type of database ("goleveldb" or "CouchDB"):
  databaseType: goleveldb
  # If CouchDB is used, which chart holds it
  couchdbInstance: cdb-peer1
  ## MSP ID of the Peer
  mspID: Org1MSP
  tls:
    server:
      enabled: 'false'
    client:
      enabled: 'false'

# Secrets references, empty by default, fill in with your secrets (particularly adminCert) or add Peer Admin certificate manually after launching chart.
secrets:
  ## These secrets should contain the Orderer crypto materials and credentials
  peer:
    {}
    ## Credentials, saved under keys 'CA_USERNAME' and 'CA_PASSWORD'
    # cred: hlf--peer1-cred
    ## Certificate, saved under key 'cert.pem'
    # cert: hlf--peer1-idcert
    ## Key, saved under 'key.pem'
    # key: hlf--peer1-idkey
    ## CA Cert, saved under 'cacert.pem'
    # caCert: hlf--peer1-cacert
    ## Intermediate CA Cert (optional), saved under 'intermediatecacert.pem'
    # intCaCert: hlf--peer1-caintcert
    ## TLS secret, saved under keys 'tls.crt' and 'tls.key' (to conform with K8S nomenclature)
    # tls: hlf--peer1-tls
    ## TLS root CA certificate saved under key 'cert.pem'
    # tlsRootCert: hlf--peer1-tlsrootcert
  ## This should contain "channel" transaction derived from a configtx.yaml
  ## configtxgen -profile ComposerChannel -channelID composerchannel -outputCreateChannelTx composerchannel.tx
  # channel: hlf--channel
  ## This should contain the Certificate of the Peer Organisation admin
  ## This is necessary to successfully run the peer
  # adminCert: hlf--peer-admincert
  ## This should contain the Private Key of the Peer Organisation admin
  ## This is necessary to successfully join a channel
  # adminKey: hlf--peer-adminkey

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
  ## Suggested antiAffinity, as each Peer should be on a separate Node for resilience
  # podAntiAffinity:
  #   requiredDuringSchedulingIgnoredDuringExecution:
  #     - topologyKey: "kubernetes.io/hostname"
  #       labelSelector:
  #         matchLabels:
  #           app: hlf-peer
```

</details>

---

# Hyperledger Fabric Peer

[Hyperledger Fabric Peer](http://hyperledger-fabric.readthedocs.io/) is the node type responsible for endorsing transactions and recording them on the Blockchain for the [Hyperledger](https://www.hyperledger.org/) Fabric permissioned blockchain framework.

## TL;DR;

```bash
$ helm install stable/hlf-peer
```

## Introduction

The Hyperledger Fabric Peer can either use a `goleveldb` or a `CouchDB` database for holding the ledger data.

This Peer can receive transaction requests, which it checks and signs, endorsing them. These endorsements can then be sent to the Ordering Service (one or more Orderer nodes), which will package them and return blocks that the Peer can then commit to their own Ledger.

## Prerequisites

- Kubernetes 1.9+
- PV provisioner support in the underlying infrastructure.
- K8S secrets containing:
  - the crypto-materials (e.g. signcert, key, cacert, and optionally intermediatecert, CA credentials)
  - the channel transaction for the Peer
  - the certificate of the Peer Organisation Admin
  - the private key of the Peer Organisation Admin (needed to join the channel)
- A running [HLF-CouchDB Chart](https://github.com/kubernetes/charts/tree/master/stable/hlf-couchdb) if you are using the `CouchDB` database.

## Installing the Chart

To install the chart with the release name `peer1`:

```bash
$ helm install stable/hlf-peer --name peer1
```

The command deploys the Hyperledger Fabric Peer on the Kubernetes cluster in the default configuration. The [Configuration](#configuration) section lists the parameters that can be configured during installation.

### Custom parameters

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```bash
$ helm install stable/hlf-peer --name peer1 --set peer.mspID=MyMSP
```

Alternatively, a YAML file can be provided while installing the chart. This file specifies values to override those provided in the default values.yaml. For example,

```bash
$ helm install stable/hlf-peer --name peer1 -f my-values.yaml
```

## Updating the chart

To update the chart:

```bash
$ helm upgrade peer1 stable/hlf-peer -f my-values.yaml
```

## Uninstalling the Chart

To uninstall/delete the `peer1` deployment:

```bash
$ helm delete peer1
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Hyperledger Fabric Peer chart and default values.

| Parameter                                                                | Description                                          | Default                   |
| ------------------------------------------------------------------------ | ---------------------------------------------------- | ------------------------- |
| `image.repository`                                                       | `hlf-peer` image repository                          | `hyperledger/fabric-peer` |
| `image.tag`                                                              | `hlf-peer` image tag                                 | `x86_64-1.1.0`            |
| `image.pullPolicy`                                                       | Image pull policy                                    | `IfNotPresent`            |
| `service.portRequest`                                                    | TCP port for requests to Peer                        | `7051`                    |
| `service.portEvent`                                                      | TCP port for event service on Peer                   | `7053`                    |
| `service.type`                                                           | K8S service type exposing ports, e.g. `ClusterIP`    | `ClusterIP`               |
| `persistence.accessMode`                                                 | Use volume as ReadOnly or ReadWrite                  | `ReadWriteOnce`           |
| `persistence.annotations`                                                | Persistent Volume annotations                        | `{}`                      |
| `persistence.size`                                                       | Size of data volume (adjust for production!)         | `1Gi`                     |
| `persistence.storageClass`                                               | Storage class of backing PVC                         | `default`                 |
| `peer.databaseType`                                                      | Database type to use (`goleveldb` or `CouchDB`)      | `goleveldb`               |
| `peer.couchdbInstance | CouchDB chart name to use`cdb-peer1`|`cdb-peer1` |
| `peer.mspID`                                                             | ID of MSP the Peer belongs to                        | `Org1MSP`                 |
| `peer.tls.server.enabled`                                                | Do we enable server-side TLS?                        | `false`                   |
| `peer.tls.client.enabled`                                                | Do we enable client-side TLS?                        | `false`                   |
| `secrets.peer.cred`                                                      | Credentials: 'CA_USERNAME' and 'CA_PASSWORD'         | ``                        |
| `secrets.peer.cert`                                                      | Certificate: as 'cert.pem'                           | ``                        |
| `secrets.peer.key`                                                       | Private key: as 'key.pem'                            | ``                        |
| `secrets.peer.caCert`                                                    | CA Cert: as 'cacert.pem'                             | ``                        |
| `secrets.peer.intCaCert`                                                 | Int. CA Cert: as 'intermediatecacert.pem'            | ``                        |
| `secrets.peer.tls`                                                       | TLS secret: as 'tls.crt' and 'tls.key'               | ``                        |
| `secrets.peer.tlsRootCert`                                               | TLS root CA certificate: as 'cert.pem'               | ``                        |
| `secrets.channel`                                                        | Secret containing Channel tx for peer to create/join | ``                        |
| `secrets.adminCert`                                                      | Secret containing Peer Org admin certificate         | ``                        |
| `secrets.adminCert`                                                      | Secret containing Peer Org admin private key         | ``                        |
| `resources`                                                              | CPU/Memory resource requests/limits                  | `{}`                      |
| `nodeSelector`                                                           | Node labels for pod assignment                       | `{}`                      |
| `tolerations`                                                            | Toleration labels for pod assignment                 | `[]`                      |
| `affinity`                                                               | Affinity settings for pod assignment                 | `{}`                      |

## Persistence

The volume stores the Fabric Peer data and configurations at the `/var/hyperledger` path of the container.

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) at this location. The volume is created using dynamic volume provisioning through a PersistentVolumeClaim managed by the chart.

## Upgrading from version 1.1.x

Previous versions of this chart performed enrollment with the Fabric CA directly from the pod. This prevented the possibility of using development cryptographic material (certificates and keys) from Cryptogen or the usage of other CA mechanisms.

Instead, crypto-material and CA credentials are stored separately as secrets.

If you used the former type of chart, you will need to obtain the relevant credentials and cryptographic material from the running pod, and save it externally to a set of secrets, whose names you will need to feed into the chart, under the `secrets.ord` section.

An example upgrade procedure is described in `UPGRADE_1-1-x.md`

## Feedback and feature requests

This is a work in progress and we are happy to accept feature requests. We are even happier to accept pull requests implementing improvements :-)
