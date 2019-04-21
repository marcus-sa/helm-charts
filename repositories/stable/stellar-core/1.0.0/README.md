# `@helm-charts/stable-stellar-core`

Backbone node of the Stellar cryptocurrency network.

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | stable       |
| Chart Name          | stellar-core |
| Chart Version       | 1.0.0        |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## NOTE:
## You have to provide a node seed
##   * either by specifying nodeSeed directly
##   * or by specifying existingNodeSeedSecret that points to an existing secret
## You can generate a node seed by running the following command:
##   docker run --rm -it --entrypoint '' satoshipay/stellar-core stellar-core --genseed

## WARNING: make sure to replace this in your configuration or use existingNodeSeedSecret
nodeSeed: SDUFQA7YL3KTWZNKOXX7XXIYU4R5R6JKELMREKHDQOYY2WPUGXFVJN52
# existingNodeSeedSecret:
#   name: stellar-core
#   key: nodeSeed

nodeIsValidator: true

networkPassphrase: Public Global Stellar Network ; September 2015

catchupComplete: false
catchupRecent: 0

maxPeerConnections: 50

knownPeers:
  - stellar1.tempo.eu.com
  - au.stellar.ibm.com
  - br.stellar.ibm.com
  - ca.stellar.ibm.com
  - no.stellar.ibm.com
  - it.stellar.ibm.com
  - hk.stellar.ibm.com
  - in.stellar.ibm.com
  - uk.stellar.ibm.com
  - us.stellar.ibm.com
  - stellar0.keybase.io
  - stellar1.satoshipay.io
  - stellar2.satoshipay.io
  - stellar3.satoshipay.io
  - core-live-a.stellar.org
  - core-live-b.stellar.org
  - core-live-c.stellar.org
  - ohio-1.stellar.stellarport.io
  - ohio-2.stellar.stellarport.io
  - validator1.stellar.stronghold.co
  - validator2.stellar.stronghold.co
  - validator3.stellar.stronghold.co
  - validator4.stellar.stronghold.co
  - validator5.stellar.stronghold.co

preferredPeers:
  - stellar1.tempo.eu.com
  - au.stellar.ibm.com
  - br.stellar.ibm.com
  - ca.stellar.ibm.com
  - no.stellar.ibm.com
  - it.stellar.ibm.com
  - hk.stellar.ibm.com
  - in.stellar.ibm.com
  - uk.stellar.ibm.com
  - us.stellar.ibm.com
  - stellar0.keybase.io
  - stellar1.satoshipay.io
  - stellar2.satoshipay.io
  - stellar3.satoshipay.io
  - core-live-a.stellar.org
  - core-live-b.stellar.org
  - core-live-c.stellar.org
  - validator1.stellar.stronghold.co
  - validator2.stellar.stronghold.co
  - validator3.stellar.stronghold.co
  - validator4.stellar.stronghold.co
  - validator5.stellar.stronghold.co

nodeNames:
  - publicKey: GAOO3LWBC4XF6VWRP5ESJ6IBHAISVJMSBTALHOQM2EZG7Q477UWA6L7U
    name: eno
  - publicKey: GCKWUQGSVO45ZV3QK7POYL7HMFWDKWJVMFVEGUJKCAEVUITUCTQWFSM6
    name: ibm_au
  - publicKey: GBUJA3Z5TLAKLI5MEH4TETLXJBQVSVW74MNEKP5UUHTP3IMLNSUPOTVA
    name: ibm_br
  - publicKey: GB2HF2NHRKKFZYFDGD7MUENOYROOEK7SWYV2APYOODP6P7BUJTLILKIL
    name: ibm_ca
  - publicKey: GDRA72H7JWXAXWJKOONQOPH3JKNSH5MQ6BO5K74C3X6FO2G3OG464BPU
    name: ibm_no
  - publicKey: GAEEH4TBR7YQQWKJ2FIT57HXZZTMK2BX5LY4POJUYFSEZ7Y2ONHPPTES
    name: ibm_it
  - publicKey: GBJ7T3BTLX2BP3T5Q4256PUF7JMDAB35LLO32QRDYE67TDDMN7H33GGE
    name: ibm_hk
  - publicKey: GCH3O5PTCZVR4G65W3B4XDKWI5V677HQB3QO7CW4YPVYDDFBE2GE7G6V
    name: ibm_in
  - publicKey: GAENPO2XRTTMAJXDWM3E3GAALNLG4HVMKJ4QF525TR25RI42YPEDULOW
    name: ibm_uk
  - publicKey: GARBCBH4YSHUJLYEPKEPMVYZIJ3ZSQR3QCJ245CWGY64X72JLN4A6RSG
    name: ibm_us
  - publicKey: GCWJKM4EGTGJUVSWUJDPCQEOEP5LHSOFKSA4HALBTOO4T4H3HCHOM6UX
    name: keybase0
  - publicKey: GC5SXLNAM3C4NMGK2PXK4R34B5GNZ47FYQ24ZIBFDFOCU6D4KBN4POAE
    name: satoshipay1
  - publicKey: GBJQUIXUO4XSNPAUT6ODLZUJRV2NPXYASKUBY4G5MYP3M47PCVI55MNT
    name: satoshipay2
  - publicKey: GAK6Z5UVGUVSEK6PEOCAYJISTT5EJBB34PN3NOLEQG2SUKXRVV2F6HZY
    name: satoshipay3
  - publicKey: GCGB2S2KGYARPVIA37HYZXVRM2YZUEXA6S33ZU5BUDC6THSB62LZSTYH
    name: sdf_watcher1
  - publicKey: GCM6QMP3DLRPTAZW2UZPCPX2LF3SXWXKPMP3GKFZBDSF3QZGV2G5QSTK
    name: sdf_watcher2
  - publicKey: GABMKJM6I25XI4K7U6XWMULOUQIQ27BCTMLS6BYYSOWKTBUXVRJSXHYQ
    name: sdf_watcher3
  - publicKey: GBB32UXWEXGZUE7H7LUVNNZRT3ZMZ3YH7SP3V5EFBILUVL3NCTSSK3IZ
    name: stellarport1
  - publicKey: GC5A5WKAPZU5ASNMLNCAMLW7CVHMLJJAKHSZZHE2KWGAJHZ4EW6TQ7PB
    name: stellarport2
  - publicKey: GDIQKLQVOCD5UD6MUI5D5PTPVX7WTP5TAPP5OBMOLENBBD5KG434KYQ2
    name: stronghold1
  - publicKey: GA7MREQ7673YDVANF4WBPN7LBQM4BSH4BQUFUTC4YLSSQCQUQTXRVBZN
    name: stronghold2
  - publicKey: GDHV7FL7JP6LUEWWYUOA4C3QAFQ4LZ6OHFBWFIL6IFIS3AOBI2DHV62F
    name: stronghold3
  - publicKey: GBGDBLFKR3LORWOI65LVC7ES5OGZ4GHILEHCBVKPW2PMP2OL43F6B2JJ
    name: stronghold4
  - publicKey: GCBXBCIKCCVUIHAZ5QFWK6CKSX4AESOJ33IQNUE42BP7J66X23TM6WPF
    name: stronghold5
  - publicKey: GCJCSMSPIWKKPR7WEPIQG63PDF7JGGEENRC33OKVBSPUDIRL6ZZ5M7OO
    name: tempo
  - publicKey: GD7FVHL2KUTUYNOJFRUUDJPDRO2MAZJ5KP6EBCU6LKXHYGZDUFBNHXQI
    name: umbrel

quorumSet:
  - threshold_percent: 66
    validators:
      - $$eno
      - $$keybase0
      - $$tempo
      - $$umbrel
  - path: ibm
    threshold_percent: 51
    validators:
      - $$ibm_au
      - $$ibm_br
      - $$ibm_ca
      - $$ibm_no
      - $$ibm_it
      - $$ibm_hk
      - $$ibm_in
      - $$ibm_uk
      - $$ibm_us
  - path: satoshipay
    threshold_percent: 51
    validators:
      - $$satoshipay1
      - $$satoshipay2
      - $$satoshipay3
  - path: sdf
    threshold_percent: 51
    validators:
      - $$sdf_watcher1
      - $$sdf_watcher2
      - $$sdf_watcher3
  - path: stronghold
    threshold_percent: 51
    validators:
      - $$stronghold1
      - $$stronghold2
      - $$stronghold3
      - $$stronghold4
      - $$stronghold5

history:
  sdf1:
    get: 'curl -sf http://history.stellar.org/prd/core-live/core_live_001/{0} -o {1}'
  sdf2:
    get: 'curl -sf http://history.stellar.org/prd/core-live/core_live_002/{0} -o {1}'
  sdf3:
    get: 'curl -sf http://history.stellar.org/prd/core-live/core_live_003/{0} -o {1}'

initializeHistoryArchives: false

environment: {}

postgresql:
  enabled: true
  postgresDatabase: stellar-core
  postgresUser: postgres
  # options from https://github.com/helm/charts/tree/master/stable/postgresql
  # postgresPassword:

postgresqlConnectTimeout: 5

## NOTE:
## existingDatabase is only used if postgresql.enabled is false
existingDatabase:
  passwordSecret:
    name: postgresql-core
    key: password
  ## NOTE:
  ## $(DATABASE_PASSWORD) is automatically replaced with the value of the passwordSecret
  # url: postgresql://dbname=stellar-core host=postgresql-core password=$(DATABASE_PASSWORD)

image:
  repository: satoshipay/stellar-core
  tag: '10.0.0-2'
  # flavor: aws
  # flavor: gcloud
  pullPolicy: IfNotPresent

peerService:
  type: LoadBalancer
  port: 11625
  # loadBalancerIP: 35.13.37.42
  # externalTrafficPolicy: Local

httpService:
  type: ClusterIP
  port: 11626

persistence:
  enabled: true

  ## A manually managed Persistent Volume and Claim
  ## Requires persistence.enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:

  ## database data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 8Gi

  subPath: 'stellar-core'
  mountPath: /data

  ## Annotations for the persistent volume claim
  # annotations:

resources:
  requests:
    cpu: 100m
    memory: 512Mi

nodeSelector: {}

tolerations: []

affinity: {}

serviceAccount:
  create: true
  name:
```

</details>

---

# Stellar Core

[Stellar](https://www.stellar.org) is an open-source and distributed payments infrastructure. Stellar Core is the software that powers the backbone of the Stellar network and validates and agrees on transactions. For more information see the [Stellar network overview](https://www.stellar.org/developers/guides/get-started/).

## Introduction

This chart bootstraps a [Stellar Core](https://github.com/stellar/stellar-core/) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager. By default the deployment includes a PostgreSQL database. The chart is based on the Kubernetes-ready [Stellar Core images provided by SatoshiPay](https://github.com/satoshipay/docker-stellar-core/).

## Prerequisites

- You need a node seed to run Stellar Core. If you don't have one you can generate one with the following command:
  ```bash
  $ docker run --rm -it --entrypoint '' satoshipay/stellar-core stellar-core --genseed
  ```
  The output will look like
  ```
  Secret seed: SDUFQA7YL3KTWZNKOXX7XXIYU4R5R6JKELMREKHDQOYY2WPUGXFVJN52
  Public: GDJFYQK2VFVMQAOFSBM7RVE4I5HCUT7VNWOKSJKGI5JEODIH6F3EM6YX
  ```
  The node seed must be kept secret but the public key can (and should) be shared with other Stellar node operators.
- Kubernetes 1.8+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure (Only when persisting data)

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/stellar-core
```

🚨 **Warning:** Make sure to use your own node seed, either via setting `nodeSeed` or `existingNodeSeedSecret`. See [prerequisites](#prerequisites) for how to generate a new node seed.

## Configuration

The following table lists the configurable parameters of the Stellar Core chart and their default values.

| Parameter                           | Description                                                         | Default                                          |
| ----------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------ |
| `nodeSeed`                          | Stellar Core node seed (if `existingNodeSeedSecret` is not set)     | Not set                                          |
| `existingNodeSeedSecret`            | Existing secret with the node seed (if `nodeSeed` is not set)       | Not set                                          |
| `existingNodeSeedSecret.name`       | Secret containing the node seed                                     | Not set                                          |
| `existingNodeSeedSecret.key`        | Key of the node seed in the secret                                  | Not set                                          |
| `nodeIsValidator`                   | Should the node participate in SCP? Otherwise it is only observing  | `true`                                           |
| `networkPassphrase`                 | The network this instance should talk to                            | `Public Global Stellar Network ; September 2015` |
| `catchupRecent`                     | Number of ledgers to catch up (`0` means minimal catchup)           | `0`                                              |
| `maxPeerConnections`                | Maximum number of connections to other peers                        | `50`                                             |
| `knownPeers`                        | List of hostnames/IPs and ports of peers to connect to initially    | Default peers, see `values.yaml`                 |
| `preferredPeers`                    | List of hostnames/IPs and ports of peers to stay connected to       | Default peers, see `values.yaml`                 |
| `nodeNames`                         | List of node public keys and node names                             | Default node names, see `values.yaml`            |
| `nodeNames[].publicKey`             | Public key of a node                                                | See above                                        |
| `nodeNames[].name`                  | Name of a node                                                      | See above                                        |
| `quorumSet`                         | List of quorum set definitions                                      | Default quorum set, see `values.yaml`            |
| `quorumSet.thresholdPercent`        | Threshold in percent for the quorum set                             | See above                                        |
| `quorumSet.validators`              | List of node names (prefixed with `$$`) or public keys in this set  | See above                                        |
| `quorumSet.path`                    | Path for sub-quorum-sets                                            | See above                                        |
| `history`                           | Definition for fetching and storing the history of the network      | Default history, see `values.yaml`               |
| `history.$name.get`                 | Command for fetching from the history archive                       | See above                                        |
| `history.$name.put`                 | Command for storing the history in an archive                       | See above                                        |
| `initializeHistoryArchives`         | Set to `true` if you want history archives to be initialized        | `false`                                          |
| `gcloudServiceAccountKey`           | Gcloud service account key for `gcloud` flavor                      | Not set                                          |
| `environment`                       | Additional environment variables for Stellar Core                   | `{}`                                             |
| `postgresql.enabled`                | Enable PostgreSQL database                                          | `true`                                           |
| `postgresql.postgresDatabase`       | PostgreSQL database name                                            | `stellar-core`                                   |
| `postgresql.postgresUser`           | PostgreSQL username                                                 | `postgres`                                       |
| `postgresql.postgresPassword`       | PostgreSQL password                                                 | Random password (see PostgreSQL chart)           |
| `postgresql.persistence`            | PostgreSQL persistence options                                      | See PostgreSQL chart                             |
| `postgresql.*`                      | Any PostgreSQL option                                               | See PostgreSQL chart                             |
| `existingDatabase`                  | Provide existing database (used if `postgresql.enabled` is `false`) |                                                  |
| `existingDatabase.passwordSecret`   | Existing secret with the database password                          | `{name: 'postgresql-core', value: 'password'}`   |
| `existingDatabase.url`              | Existing database URL (use `$(DATABASE_PASSWORD` as the password)   | Not set                                          |
| `image.repository`                  | `stellar-core` image repository                                     | `satoshipay/stellar-core`                        |
| `image.tag`                         | `stellar-core` image tag                                            | `10.0.0-2`                                       |
| `image.flavor`                      | `stellar-core` flavor (e.g., `aws` or `gcloud`)                     | Not set                                          |
| `image.pullPolicy`                  | Image pull policy                                                   | `IfNotPresent`                                   |
| `peerService.type`                  | p2p service type                                                    | `LoadBalancer`                                   |
| `peerService.port`                  | p2p service TCP port                                                | `11625`                                          |
| `peerService.loadBalancerIP`        | p2p service load balancer IP                                        | Not set                                          |
| `peerService.externalTrafficPolicy` | p2p service traffic policy                                          | Not set                                          |
| `httpService.type`                  | Non-public HTTP admin endpoint service type                         | `ClusterIP`                                      |
| `httpService.port`                  | Non-public HTTP admin endpoint TCP port                             | `11626`                                          |
| `persistence.enabled`               | Use a PVC to persist data                                           | `true`                                           |
| `persistence.existingClaim`         | Provide an existing PersistentVolumeClaim                           | Not set                                          |
| `persistence.storageClass`          | Storage class of backing PVC                                        | Not set (uses alpha storage class annotation)    |
| `persistence.accessMode`            | Use volume as ReadOnly or ReadWrite                                 | `ReadWriteOnce`                                  |
| `persistence.annotations`           | Persistent Volume annotations                                       | `{}`                                             |
| `persistence.size`                  | Size of data volume                                                 | `8Gi`                                            |
| `persistence.subPath`               | Subdirectory of the volume to mount at                              | `stellar-core`                                   |
| `persistence.mountPath`             | Mount path of data volume                                           | `/data`                                          |
| `resources`                         | CPU/Memory resource requests/limits                                 | Requests: `512Mi` memory, `100m` CPU             |
| `nodeSelector`                      | Node labels for pod assignment                                      | {}                                               |
| `tolerations`                       | Toleration labels for pod assignment                                | []                                               |
| `affinity`                          | Affinity settings for pod assignment                                | {}                                               |
| `serviceAccount.create`             | Specifies whether a ServiceAccount should be created                | `true`                                           |
| `serviceAccount.name`               | The name of the ServiceAccount to create                            | Generated using the fullname template            |

## Persistence

Both Stellar Core and PostgreSQL (if `postgresql.enabled` is `true`) need to store data and thus this chart creates [Persistent Volumes](http://kubernetes.io/docs/user-guide/persistent-volumes/) by default. Make sure to size them properly for your needs and use an appropriate storage class, e.g. SSDs.

You can also use existing claims with the `persistence.existingClaim` and `postgresql.persistence.existingClaim` options.
