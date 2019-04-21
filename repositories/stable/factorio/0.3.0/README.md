# `@helm-charts/stable-factorio`

Factorio dedicated server.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | factorio |
| Chart Version       | 0.3.0    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Factorio image version
# ref: https://quay.io/repository/games_on_k8s/factorio?tab=tags
image: quay.io/games_on_k8s/factorio
imageTag: '0.14.22'

# Configure resource requests and limits
# ref: http://kubernetes.io/docs/user-guide/compute-resources/
resources:
  requests:
    memory: 512Mi
    cpu: 500m

# Most of these map to environment variables. See docker-factorio for details:
# https://github.com/games-on-k8s/docker-factorio/blob/master/README.md#environment-variable-reference
factorioServer:
  name: Kubernetes Server
  description: Factorio running on Kubernetes
  port: 34197
  # Lock this server down with a password.
  #password: change.me
  maxPlayers: 255
  # Publishes this server in the server browser if true.
  # You'll want to set Factorio.User below if true, as it becomes required.
  isPublic: false
  verifyIdentity: false
  # Allows or disallows console commands. Must be one of: `true`, `false`, or `admins-only`.
  allowCommands: admins-only
  # Pause the server when nobody is connected?
  noAutoPause: 'false'
  # You'll want to change this to NodePort if you are on AWS.
  serviceType: LoadBalancer

  autosave:
    # Auto-save interval in minutes.
    interval: 2
    slots: 3

  rcon:
    enabled: false
    port: 27015
    # Empty value here enables an auto-generated password.
    password: ''
    serviceType: LoadBalancer

factorio:
  # Your factorio.com User/pass is needed if factorioServer.IsPublic is true.
  user:
    username: your.username
    password: your.password

persistence:
  ## factorio data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  savedGames:
    # Set this to false if you don't care to persist saved games between restarts.
    enabled: true
    size: 1Gi
  mods:
    enabled: false
    size: 128Mi
```

</details>

---

# Factorio

[Factorio](https://www.factorio.com/) is a game in which you build and maintain factories.

## Introduction

This chart creates a single [Factorio Headless](https://www.factorio.com/download-headless) Pod, plus Services for the Factorio server and RCON.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Provider-specific Prerequisites

Amazon's Elastic Loadbalancer lacks support for UDP. You'll need to set `factorioServer.ServiceType` to `NodePort` and expose the port that gets selected (see `kubectl describe svc <servicename>`) via a security group. You may need to do something similar for certain bare metal deployments.

You need not worry about this on Google Cloud Platform.

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/factorio
```

This command deploys a Factorio dedicated server with sane defaults.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

Refer to [values.yaml](values.yaml) for the full run-down on defaults. These are a mixture of Kubernetes and Factorio-related directives that map to environment variables in [docker-factorio](https://github.com/games-on-k8s/docker-factorio).

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set factorioServer.factorioServer=My Server,ImageTag=0.14.15 \
    stable/factorio
```

The above command deploys Factorio dedicated with a server name of `My Server` and docker-factorio image version `0.14.15`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/factorio
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [docker-factorio](https://github.com/games-on-k8s/docker-factorio) image stores the saved games and mods under /opt/factorio.

By default a PersistentVolumeClaim is created and mounted for saves but not mods. In order to disable this functionality
you can change the values.yaml to disable persistence under the sub-sections under `Persistence`.

> _"An emptyDir volume is first created when a Pod is assigned to a Node, and exists as long as that Pod is running on that node. When a Pod is removed from a node for any reason, the data in the emptyDir is deleted forever."_
