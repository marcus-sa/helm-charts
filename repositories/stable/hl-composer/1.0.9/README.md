# `@helm-charts/stable-hl-composer`

Hyperledger Composer REST Server chart

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | stable      |
| Chart Name          | hl-composer |
| Chart Version       | 1.0.9       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for hl-composer.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

persistence:
  # By default we must set this to false to enable chart to pass tests
  # However, in a proper deployment, you should set this to "true", so that the different components can share data
  enabled: false
  annotations: {}
  capacity: 1Gi
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  storageClass: ''
  accessMode: ReadWriteMany

cli:
  image:
    repository: hyperledger/composer-cli
    tag: 0.20.0
    pullPolicy: IfNotPresent

  secrets:
    {}
    # This should contain the packaged .bna network file.
    # blockchainNetwork: bc--bna
    # We need a secret for the Organisation certificate and key
    # adminCert: hl--peer-admincert
    # adminKey: hl--peer-adminkey
    # Composer Connection JSON
    # hlcConnection: hl--connection

  resources:
    {}
    # We usually recommend not to specify default resources and to leave this as a conscious
    # choice for the user. This also increases chances charts run on environments with little
    # resources, such as Minikube. If you do want to specify resources, uncomment the following
    # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
    # limits:
    #  cpu: 100m
    #  memory: 128Mi
    # requests:
    #  cpu: 100m
    #  memory: 128Mi

  nodeSelector: {}

  tolerations: []

  affinity: {}

rest:
  image:
    repository: hyperledger/composer-rest-server
    tag: 0.20.0
    pullPolicy: IfNotPresent

  service:
    # Cluster IP or LoadBalancer
    type: ClusterIP
    port: 3000

  # Ingress for Composer REST
  ingress:
    enabled: false
    annotations:
      {}
      # kubernetes.io/ingress.class: nginx
      # certmanager.k8s.io/cluster-issuer: "letsencrypt-staging"
    path: /
    hosts: []
    #  - hl-composer-rest.local
    tls: []
    #  - secretName: hl-composer-rest-tls
    #    hosts:
    #      - hl-composer-rest.local

  config:
    # Composer REST server API key
    # apiKey:
    # Card for network connection
    composerRestServerCard: admin@test-network

  resources:
    {}
    # We usually recommend not to specify default resources and to leave this as a conscious
    # choice for the user. This also increases chances charts run on environments with little
    # resources, such as Minikube. If you do want to specify resources, uncomment the following
    # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
    # limits:
    #  cpu: 100m
    #  memory: 128Mi
    # requests:
    #  cpu: 100m
    #  memory: 128Mi

  nodeSelector: {}

  tolerations: []

  affinity: {}

pg:
  enabled: true

  image:
    repository: hyperledger/composer-playground
    tag: 0.20.0
    pullPolicy: IfNotPresent

  service:
    # Cluster IP or LoadBalancer
    type: ClusterIP
    port: 8080

  # Ingress for Composer PlayGround
  ingress:
    enabled: false
    annotations:
      {}
      # kubernetes.io/ingress.class: nginx
      # certmanager.k8s.io/cluster-issuer: "letsencrypt-staging"
    path: /
    hosts: []
    #  - hl-composer-pg.local
    tls: []
    #  - secretName: hl-composer-pg-tls
    #    hosts:
    #      - hl-composer-pg.local

  resources:
    {}
    # We usually recommend not to specify default resources and to leave this as a conscious
    # choice for the user. This also increases chances charts run on environments with little
    # resources, such as Minikube. If you do want to specify resources, uncomment the following
    # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
    # limits:
    #  cpu: 100m
    #  memory: 128Mi
    # requests:
    #  cpu: 100m
    #  memory: 128Mi

  nodeSelector: {}

  tolerations: []

  affinity: {}
```

</details>

---

# Hyperledger Composer

[Hyperledger Composer](https://hyperledger.github.io/composer) is a set of tools to aid in the development of Blockchain solutions using the [Hyperledger](https://www.hyperledger.org/) Fabric permissioned blockchain framework.

## TL;DR;

```bash
$ helm install stable/hl-composer
```

## Introduction

The deployments included in this chart include a Command-Line Interface (CLI), Playground and REST server.

## Prerequisites

- Kubernetes 1.9+
- PV provisioner support in the underlying infrastructure.
- Four K8S secrets containing:
  - the Composer Blockchain Network Archive to deploy and use
  - the Composer Connection JSON file, specifying the locations of the
  - the certificate of the Peer Organisation Admin
  - the private key of the Peer Organisation Admin (needed to join the channel)
- A running Hyperledger Fabric network, either on the cluster (e.g. using the `hlf-ca`, `hlf-ord`, `hlf-peer` and optionally hlf-couchdb charts) or elsewhere.

## Installing the Chart

To install the chart with the release name `hlc`:

```bash
$ helm install stable/hl-composer --name hlc
```

The command deploys the Hyperledger Composer chart on the Kubernetes cluster in the default configuration. The [Configuration](#configuration) section lists the parameters that can be configured during installation.

### Custom parameters

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```bash
$ helm install stable/hl-composer --name hlc --set persistence.enabled=true,presistence.storageClass=azurefile
```

The above command specifies that we wish to use a persistent volume and use the `azurefile` Storage Class to enable the volume to be shared.

Alternatively, a YAML file can be provided while installing the chart. This file specifies values to override those provided in the defualt values.yaml. For example,

```bash
$ helm install stable/hl-composer --name hlc -f my-values.yaml
```

## Updating the chart

When updating the chart, make sure you provide the `rest.config.apiKey`, otherwise `helm update` will generate a new random API key.

```bash
$ export COMPOSER_APIKEY=$(kubectl get secret --namespace {{ .Release.Namespace }} hlc-hl-composer-rest -o jsonpath="{.data.COMPOSER_APIKEY}" | base64 --decode; echo)
$ helm upgrade hlc stable/hlf-ca --set rest.config.apiKey=$COMPOSER_APIKEY
```

## Uninstalling the Chart

To uninstall/delete the `hlc` deployment:

```bash
$ helm delete hlc
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Hyperledger Composer chart and default values.

| Parameter                            | Description                                       | Default                            |
| ------------------------------------ | ------------------------------------------------- | ---------------------------------- |
| `persistence.enabled`                | Is persistence enabled for this chart?            | `false`                            |
| `persistence.accessMode`             | Read and Write permissions to the volume          | `ReadWriteMany`                    |
| `persistence.annotations`            | Persistent Volume annotations                     | `{}`                               |
| `persistence.size`                   | Size of data volume (adjust for production!)      | `1Gi`                              |
| `persistence.storageClass`           | Storage class of backing PVC                      | ``                                 |
| `cli.image.repository`               | `hl-composer` CLI image repository                | `hyperledger/composer-cli`         |
| `cli.image.tag`                      | `hl-composer` CLI image tag                       | `0.20.0`                           |
| `cli.image.pullPolicy`               | Image pull policy                                 | `IfNotPresent`                     |
| `cli.secrets.blockchainNetwork`      | Secret containing Blockchain Network Archive      | ``                                 |
| `cli.secrets.adminCert`              | Secret containing Peer Org admin certificate      | ``                                 |
| `cli.secrets.adminKey`               | Secret containing Peer Org admin private key      | ``                                 |
| `cli.secrets.hlcConnection`          | Secret containing Composer Connection JSON        | ``                                 |
| `cli.resources`                      | CPU/Memory resource requests/limits               | `{}`                               |
| `cli.nodeSelector`                   | Node labels for pod assignment                    | `{}`                               |
| `cli.tolerations`                    | Toleration labels for pod assignment              | `[]`                               |
| `cli.affinity`                       | Affinity settings for pod assignment              | `{}`                               |
| `rest.image.repository`              | `hl-composer` REST image repository               | `hyperledger/composer-rest-server` |
| `rest.image.tag`                     | `hl-composer` REST image tag                      | `0.20.0`                           |
| `rest.image.pullPolicy`              | Image pull policy                                 | `IfNotPresent`                     |
| `rest.service.port`                  | TCP port                                          | `3000`                             |
| `rest.service.type`                  | K8S service type exposing ports, e.g. `ClusterIP` | `ClusterIP`                        |
| `rest.ingress.enabled`               | If true, Ingress will be created                  | `false`                            |
| `rest.ingress.annotations`           | Ingress annotations                               | `{}`                               |
| `rest.ingress.path`                  | Ingress path                                      | `/`                                |
| `rest.ingress.hosts`                 | Ingress hostnames                                 | `[]`                               |
| `rest.ingress.tls`                   | Ingress TLS configuration                         | `[]`                               |
| `rest.config.apiKey`                 | API key for the REST server                       | ``                                 |
| `rest.config.composerRestServerCard` | Card to use to initialise the REST server         | ``                                 |
| `rest.resources`                     | CPU/Memory resource requests/limits               | `{}`                               |
| `rest.nodeSelector`                  | Node labels for pod assignment                    | `{}`                               |
| `rest.tolerations`                   | Toleration labels for pod assignment              | `[]`                               |
| `rest.affinity`                      | Affinity settings for pod assignment              | `{}`                               |
| `pg.image.repository`                | `hl-composer` Playground image repository         | `hyperledger/composer-playground`  |
| `pg.image.tag`                       | `hl-composer` Playground image tag                | `0.20.0`                           |
| `pg.image.pullPolicy`                | Image pull policy                                 | `IfNotPresent`                     |
| `pg.service.port`                    | TCP port                                          | `8080`                             |
| `pg.service.type`                    | K8S service type exposing ports, e.g. `ClusterIP` | `ClusterIP`                        |
| `pg.ingress.enabled`                 | If true, Ingress will be created                  | `false`                            |
| `pg.ingress.annotations`             | Ingress annotations                               | `{}`                               |
| `pg.ingress.path`                    | Ingress path                                      | `/`                                |
| `pg.ingress.hosts`                   | Ingress hostnames                                 | `[]`                               |
| `pg.ingress.tls`                     | Ingress TLS configuration                         | `[]`                               |
| `pg.resources`                       | CPU/Memory resource requests/limits               | `{}`                               |
| `pg.nodeSelector`                    | Node labels for pod assignment                    | `{}`                               |
| `pg.tolerations`                     | Toleration labels for pod assignment              | `[]`                               |
| `pg.affinity`                        | Affinity settings for pod assignment              | `{}`                               |

## Persistence

The volume stores the Hyperledger Composer data and configurations at the `/home/composer/.composer` path of the containers.

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) at this location. The volume is created using dynamic volume provisioning through a PersistentVolumeClaim managed by the chart.

## Feedback and feature requests

This is a work in progress and we are happy to accept feature requests. We are even happier to accept pull requests implementing improvements :-)
