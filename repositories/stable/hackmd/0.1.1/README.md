# `@helm-charts/stable-hackmd`

Realtime collaborative markdown notes on all platforms.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | hackmd |
| Chart Version       | 0.1.1  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for hackmd.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: hackmdio/hackmd
  tag: 1.0.1-ce-alpine
  pullPolicy: IfNotPresent

service:
  name: hackmd
  type: ClusterIP
  port: 3000

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

persistence:
  enabled: true
  ## hackmd data Persistent Volume access modes
  ## Must match those of existing PV or dynamic provisioner
  ## Ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  accessModes:
    - ReadWriteOnce
  annotations: {}
  existingClaim: ''
  size: 2Gi
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

extraVars: []

nodeSelector: {}

tolerations: []

affinity: {}

## Configuration values for the postgresql dependency.
## ref: https://github.com/kubernetes/charts/blob/master/stable/postgresql/README.md
##
postgresql:
  install: true
  imageTag: '9.6.2'
  postgresUser: 'hackmd'
  postgresDatabase: 'hackmd'
  ## Default: random 10 character string
  # postgresPassword:
```

</details>

---

# HackMD

[HackMD](https://hackmd.io) is a realtime, multiplatform collaborative markdown note editor.

## Introduction

This chart bootstraps a [HackMD](https://github.com/hackmdio/docker-hackmd) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [PostgreSQL](https://github.com/kubernetes/charts/tree/master/stable/postgresql) which is required for bootstrapping a PostgreSQL deployment for the database requirements of the HackMD application.

## Prerequisites

- Kubernetes 1.8+
- PV provisioner support in the underlying infrastructure

## Install

```console
$ git clone https://github.com/hackmdio/docker-hackmd.git
$ helm install stable/hackmd
```

## Configuration

The following configurations may be set. It is recommended to use values.yaml for overwriting the hackmd config.

| Parameter                     | Description                                        | Default                                                      |
| ----------------------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| `replicaCount`                | How many replicas to run.                          | 1                                                            |
| `image.repository`            | Name of the image to run, without the tag.         | [hackmdio/hackmd](https://github.com/hackmdio/docker-hackmd) |
| `image.tag`                   | The image tag to use.                              | 1.0.1-ce                                                     |
| `image.pullPolicy`            | The kubernetes image pull policy.                  | IfNotPresent                                                 |
| `service.name`                | The kubernetes service name to use.                | hackmd                                                       |
| `service.type`                | The kubernetes service type to use.                | ClusterIP                                                    |
| `service.port`                | Service port.                                      | 3000                                                         |
| `ingress.enabled`             | If true, Ingress will be created                   | `false`                                                      |
| `ingress.annotations`         | Ingress annotations                                | `[]`                                                         |
| `ingress.hosts`               | Ingress hostnames                                  | `[]`                                                         |
| `ingress.tls`                 | Ingress TLS configuration (YAML)                   | `[]`                                                         |
| `resources`                   | Resource requests and limits                       | `{}`                                                         |
| `persistence.enabled`         | If true, Persistent Volume Claim will be created   | `true`                                                       |
| `persistence.accessModes`     | Persistent Volume access modes                     | `[ReadWriteOnce]`                                            |
| `persistence.annotations`     | Persistent Volume annotations                      | `{}`                                                         |
| `persistence.existingClaim`   | Persistent Volume existing claim name              | `""`                                                         |
| `persistence.size`            | Persistent Volume size                             | `2Gi`                                                        |
| `persistence.storageClass`    | Persistent Volume Storage Class                    | `unset`                                                      |
| `extraVars`                   | Hackmd's extra environment variables               | `[]`                                                         |
| `postgresql.install`          | Enable PostgreSQL as a chart dependency            | `true`                                                       |
| `postgresql.imageTag`         | The image tag for PostgreSQL                       | `9.6.2`                                                      |
| `postgresql.postgresUser`     | PostgreSQL User to create                          | `hackmd`                                                     |
| `postgresql.postgresHost`     | PostgreSQL host (if `postgresql.install == false`) | `nil`                                                        |
| `postgresql.postgresPassword` | PostgreSQL Password for the new user               | random 10 characters                                         |
| `postgresql.postgresDatabase` | PostgreSQL Database to create                      | `hackmd`                                                     |
