# `@helm-charts/stable-quassel`

Quassel IRC is a modern, cross-platform, distributed IRC client.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | quassel |
| Chart Version       | 0.2.6   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for quassel.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

# imagePullSecrets:

image:
  repository: linuxserver/quassel-core
  tag: 92
  pullPolicy: IfNotPresent

# User and Group IDs to run Quassel as
uid: 1000
gid: 1000

service:
  port: 4242
  type: ClusterIP
  # nodePort:
  externalIPs: []

persistence:
  enabled: true
  ## Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"

  ## A manually managed Persistent Volume and Claim
  ## Requires persistence.enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:

  accessMode: ReadWriteOnce
  size: 1Gi

resources:
  {}
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}

## Configuration values for the postgresql dependency.
## ref: https://github.com/kubernetes/charts/blob/master/stable/postgresql/README.md
##
postgresql:
  ## Use the PostgreSQL chart dependency.
  ##
  enabled: false

  ### PostgreSQL User to create.
  ##
  postgresUser: quassel

  ## PostgreSQL Password for the new user.
  ## If not set, a random 10 characters password will be used.
  ##
  # postgresPassword: quassel

  ## PostgreSQL Database to create.
  ##
  postgresDatabase: quassel

  ## Persistent Volume Storage configuration.
  ## ref: https://kubernetes.io/docs/user-guide/persistent-volumes
  ##
  persistence:
    ## Enable PostgreSQL persistence using Persistent Volume Claims.
    ##
    enabled: true
    ## Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"

    ## A manually managed Persistent Volume and Claim
    ## Requires persistence.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    # existingClaim:

    accessMode: ReadWriteOnce
    size: 1Gi
```

</details>

---

# Quassel

[Quassel IRC](https://quassel-irc.org/) is a modern, cross-platform,
distributed IRC client, meaning that one (or multiple) client(s) can attach to
and detach from a central core.

## TL;DR;

```console
$ helm install stable/quassel
```

## Introduction

This chart bootstraps a [Quassel](https://quassel-irc.org/) deployment on a
[Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh)
package manager.

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install stable/quassel --name my-release
```

The command deploys Quassel on the Kubernetes cluster in the default
configuration. The [configuration](#configuration) section lists the parameters
that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and
deletes the release.

## Configuration

The following table lists the configurable parameters of the quassel chart and
their default values.

| Parameter                              | Description                                                                                      | Default                                                  |
| :------------------------------------- | :----------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| `imagePullSecrets`                     | Specify image pull secrets                                                                       | `nil` (does not add image pull secrets to deployed pods) |
| `image.repository`                     | The image repository to pull from                                                                | `linuxserver/quassel-core`                               |
| `image.tag`                            | The image tag to pull from                                                                       | `92`                                                     |
| `image.pullPolicy`                     | Image pull policy                                                                                | `IfNotPresent`                                           |
| `uid`                                  | User ID to run Quassel as                                                                        | `1000`                                                   |
| `gid`                                  | Group ID to run Quassel as                                                                       | `1000`                                                   |
| `service.port`                         | TCP port on which the Quassel service is exposed                                                 | `4242`                                                   |
| `service.type`                         | service type                                                                                     | `ClusterIP`                                              |
| `service.nodePort`                     | if `service.type` is `NodePort` and this is non-empty, sets the Quassel node port of the service | `nil`                                                    |
| `persistence.enabled`                  | Enable config persistence using PVC                                                              | `true`                                                   |
| `persistence.storageClass`             | PVC Storage Class for config volume                                                              | `nil`                                                    |
| `persistence.existingClaim`            | Name of an existing PVC to use for config                                                        | `nil`                                                    |
| `persistence.accessMode`               | PVC Access Mode for config volume                                                                | `ReadWriteOnce`                                          |
| `persistence.size`                     | PVC Storage Request for config volume                                                            | `1Gi`                                                    |
| `resources`                            | Resoure limits for Quassel pod                                                                   | `{}`                                                     |
| `nodeSelector`                         | Map of node labels for pod assignment                                                            | `{}`                                                     |
| `tolerations`                          | List of node taints to tolerate                                                                  | `[]`                                                     |
| `affinity`                             | Map of node/pod affinities                                                                       | `{}`                                                     |
| `postgresql.enabled`                   | Enable PostgreSQL deployment                                                                     | `false`                                                  |
| `postgresql.postgresUser`              | PostgreSQL User to create                                                                        | `quassel`                                                |
| `postgresql.postgresPassword`          | PostgreSQL Password for the new user                                                             | `nil` (Password will be randomly generated)              |
| `postgresql.postgresDatabase`          | PostgreSQL Database to create                                                                    | `quassel`                                                |
| `postgresql.persistence.enabled`       | Enable PostgreSQL persistence using PVC                                                          | `true`                                                   |
| `postgresql.persistence.storageClass`  | PVC Storage Class for PostgreSQL volume                                                          | `nil`                                                    |
| `postgresql.persistence.existingClaim` | Name of an existing PVC to use for PostgreSQL                                                    | `nil`                                                    |
| `postgresql.persistence.accessMode`    | PVC Access Mode for PostgreSQL volume                                                            | `ReadWriteOnce`                                          |
| `postgresql.persistence.size`          | PVC Storage Request for PostgreSQL volume                                                        | `1Gi`                                                    |

> Additional PostgreSQL paramaters are available - refer to the
> [PostgreSQL chart](../../stable/postgresql) for more details.

```console
$ helm install stable/quassel --name my-release \
  --set=image.tag=86,resources.limits.cpu=200m
```

Alternatively, a YAML file that specifies the values for the above parameters
can be provided while installing the chart. For example,

```console
$ helm install stable/quassel --name my-release -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml) as an example

## Persistence

The [quassel-core](https://hub.docker.com/r/linuxserver/quassel-core) image
stores it's configuration data, and if using SQLite, it's SQLite database at the
`/config` path of the container.

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/)
at this location. The volume is created using dynamic volume provisioning.
If the PersistentVolumeClaim should not be managed by the chart, define
`persistence.existingClaim` or disable persistence with `persistence.enabled`.

### Existing PersistentVolumeClaims

1. Create the PersistentVolume
1. Create the PersistentVolumeClaim
1. Install the chart

```bash
$ helm install stable/quassel --set persistence.existingClaim=PVC_NAME
```

> This process can be repeated for the PostgreSQL volume if desired
