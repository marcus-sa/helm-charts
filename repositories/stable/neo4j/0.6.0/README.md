# `@helm-charts/stable-neo4j`

Neo4j is the world's leading graph database

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | neo4j  |
| Chart Version       | 0.6.0  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for Neo4j.
# This is a YAML-formatted file.
# Declare name/value pairs to be passed into your templates.
# name: value

name: 'neo4j'

# Specs for the Neo4j docker image
image: 'neo4j'
imageTag: '3.2.3-enterprise'
imagePullPolicy: 'IfNotPresent'
# imagePullSecret: registry-secret

# Use password authentication
authEnabled: true

## Specify password for neo4j user
## Defaults to a random 10-character alphanumeric string if not set and authEnabled is true
# neo4jPassword:

# Specs for the images used for running tests against the Helm package
testImage: 'markhneedham/k8s-kubectl'
testImageTag: 'master'

# Cores
core:
  numberOfServers: 3
  persistentVolume:
    ## core server data Persistent Volume mount root path
    ##
    mountPath: /data

    ## core server data Persistent Volume size
    ##
    size: 10Gi

    ## core server data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ## storageClass: "-"

    ## Subdirectory of core server data Persistent Volume to mount
    ## Useful if the volume's root directory is not empty
    ##
    subPath: ''

  ## Pass extra environment variables to the Neo4j container.
  ##
  # extraVars:
  # - name: EXTRA_VAR_1
  #   value: extra-var-value-1
  # - name: EXTRA_VAR_2
  #   value: extra-var-value-2

  sidecarContainers: {}
  ## Additional containers to be added to the Neo4j core pod.
  #  - name: my-sidecar
  #    image: nginx:latest

  initContainers: {}
  ## init containers to run before the Neo4j core pod e.g. to install plugins
  # - name: init-plugins
  #   image: "appropriate/curl:latest"
  #   imagePullPolicy: "IfNotPresent"
  #   volumeMounts:
  #   - name: plugins
  #     mountPath: /plugins
  #   command:
  #     - "/bin/sh"
  #     - "-c"
  #     - |
  #       curl -L https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases/download/3.2.0.3/apoc-3.2.0.3-all.jar -O
  #       cp apoc-3.2.0.3-all.jar /plugins/

# Read Replicas
readReplica:
  numberOfServers: 0
  ## Pass extra environment variables to the Neo4j container.
  ##
  # extraVars:
  # - name: EXTRA_VAR_1
  #   value: extra-var-value-1
  # - name: EXTRA_VAR_2
  #   value: extra-var-value-2

  initContainers: {}
  ## init containers to run before the Neo4j replica pod e.g. to install plugins
  # - name: init-plugins
  #   image: "appropriate/curl:latest"
  #   imagePullPolicy: "IfNotPresent"
  #   volumeMounts:
  #   - name: plugins
  #     mountPath: /plugins
  #   command:
  #     - "/bin/sh"
  #     - "-c"
  #     - |
  #       curl -L https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases/download/3.2.0.3/apoc-3.2.0.3-all.jar -O
  #       cp apoc-3.2.0.3-all.jar /plugins/

resources: {}
# limits:
#   cpu: 100m
#   memory: 512Mi
# requests:
#   cpu: 100m
#   memory: 512Mi
```

</details>

---

# Neo4j

[Neo4j](https://neo4j.com/) is a highly scalable native graph database that
leverages data relationships as first-class entities, helping enterprises build
intelligent applications to meet today’s evolving data challenges.

## TL;DR;

```bash
$ helm install stable/neo4j
```

## Introduction

This chart bootstraps a [Neo4j](https://github.com/neo4j/docker-neo4j)
deployment on a [Kubernetes](http://kubernetes.io) cluster using the
[Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.6+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `neo4j-helm`:

```bash
$ helm install --name neo4j-helm stable/neo4j --set neo4jPassword=mySecretPassword
```

The command deploys Neo4j on the Kubernetes cluster in the default configuration
but with the password set to `mySecretPassword`. The
[configuration](#configuration) section lists the parameters that can be
configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `neo4j-helm` deployment:

```bash
$ helm delete neo4j-helm --purge
```

The command removes all the Kubernetes components associated with the chart and
deletes the release.

## Configuration

The following tables lists the configurable parameters of the Neo4j chart and
their default values.

| Parameter                            | Description                                                                                                                             | Default                                         |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `image`                              | Neo4j image                                                                                                                             | `neo4j`                                         |
| `imageTag`                           | Neo4j version                                                                                                                           | `{VERSION}`                                     |
| `imagePullPolicy`                    | Image pull policy                                                                                                                       | `IfNotPresent`                                  |
| `authEnabled`                        | Is login/password required?                                                                                                             | `true`                                          |
| `core.numberOfServers`               | Number of machines in CORE mode                                                                                                         | `3`                                             |
| `core.sideCarContainers`             | Sidecar containers to add to the core pod. Example use case is a sidecar which identifies and labels the leader when using the http API | `{}`                                            |
| `core.initContainers`                | Init containers to add to the core pod. Example use case is a script that installs the APOC library                                     | `{}`                                            |
| `core.persistentVolume.storageClass` | Storage class of backing PVC                                                                                                            | `standard` (uses beta storage class annotation) |
| `core.persistentVolume.size`         | Size of data volume                                                                                                                     | `10Gi`                                          |
| `core.persistentVolume.mountPath`    | Persistent Volume mount root path                                                                                                       | `/data`                                         |
| `core.persistentVolume.annotations`  | Persistent Volume Claim annotations                                                                                                     | `{}`                                            |
| `readReplica.numberOfServers`        | Number of machines in READ_REPLICA mode                                                                                                 | `0`                                             |
| `readReplica.initContainers`         | Init containers to add to the replica pod. Example use case is a script that installs the APOC library                                  | `{}`                                            |
| `resources`                          | Resources required (e.g. CPU, memory)                                                                                                   | `{}`                                            |

The above parameters map to the env variables defined in the
[Neo4j docker image](https://github.com/neo4j/docker-neo4j).

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name neo4j-helm --set core.numberOfServers=5,readReplica.numberOfServers=3 stable/neo4j
```

The above command creates a cluster containing 5 core servers and 3 read
replicas.

Alternatively, a YAML file that specifies the values for the parameters can be
provided while installing the chart. For example,

```bash
$ helm install --name neo4j-helm -f values.yaml stable/neo4j
```

> **Tip**: You can use the default [values.yaml](values.yaml)
