# `@helm-charts/stable-bitcoind`

Bitcoin is an innovative payment network and a new kind of money.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | bitcoind |
| Chart Version       | 0.1.0    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for bitcoind.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

image:
  repository: kuberstack/bitcoind
  tag: 0.15.1
  pullPolicy: IfNotPresent

service:
  rpcPort: 8332
  p2pPort: 8333
  testnetPort: 18332
  testnetP2pPort: 18333
  selector: tx-broadcast-svc

persistence:
  enabled: true
  ## database data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 300Gi

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources: {}
#  requests:
#    memory: 512Mi
#    cpu: 300m

# Custom bitcoind configuration file used to override default bitcoind settings
configurationFile:
  bitcoin.conf: |-
    server=1
    printtoconsole=1
    rpcuser=rpcuser
    rpcpassword=rpcpassword
```

</details>

---

# Bitcoind

[Bitcoin](https://bitcoin.org/) uses peer-to-peer technology to operate with no central authority or banks;
managing transactions and the issuing of bitcoins is carried out collectively by the network.

## Introduction

This chart bootstraps a single node Bitcoin deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.
Docker image was taken from [Bitcoind for Docker](https://github.com/kylemanna/docker-bitcoind) - many thanks!

## Prerequisites

- Kubernetes 1.8+
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/bitcoind
```

The command deploys bitcoind on the Kubernetes cluster in the default configuration.
The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the bitcoind chart and their default values.

| Parameter                | Description                         | Default               |
| ------------------------ | ----------------------------------- | --------------------- |
| `image.repository`       | Image source repository name        | `kuberstack/bitcoind` |
| `image.tag`              | `bitcoind` release tag.             | `0.15.1`              |
| `image.pullPolicy`       | Image pull policy                   | `IfNotPresent`        |
| `service.rpcPort`        | RPC port                            | `8332`                |
| `service.p2pPort`        | P2P port                            | `8333`                |
| `service.testnetPort`    | Testnet port                        | `18332`               |
| `service.testnetP2pPort` | Testnet p2p ports                   | `18333`               |
| `service.selector`       | Node selector                       | `tx-broadcast-svc`    |
| `persistence.enabled`    | Create a volume to store data       | `true`                |
| `persistence.accessMode` | ReadWriteOnce or ReadOnly           | `ReadWriteOnce`       |
| `persistence.size`       | Size of persistent volume claim     | `300Gi`               |
| `resources`              | CPU/Memory resource requests/limits | `{}`                  |
| `configurationFile`      | Config file ConfigMap entry         |

For more information about Bitcoin configuration please see [Bitcoin.conf_Configuration_File](https://en.bitcoin.it/wiki/Running_Bitcoin#Bitcoin.conf_Configuration_File).

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/bitcoind
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The bitcoind image stores the Bitcoind node data (Blockchain and wallet) and configurations at the `/bitcoin` path of the container.

By default a PersistentVolumeClaim is created and mounted into that directory. In order to disable this functionality
you can change the values.yaml to disable persistence and use an emptyDir instead.

> _"An emptyDir volume is first created when a Pod is assigned to a Node, and exists as long as that Pod is running on that node. When a Pod is removed from a node for any reason, the data in the emptyDir is deleted forever."_

!!! WARNING !!!

Please NOT use emptyDir for production cluster! Your wallets will be lost on container restart!

## Customize bitcoind configuration file

```yaml
configurationFile:
  bitcoind.conf: |-
    server=1
    printtoconsole=1
    rpcuser=rpcuser
    rpcpassword=rpcpassword
```
