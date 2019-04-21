# `@helm-charts/stable-openiban`

OpenIBAN is a self-hosted, free and open-source IBAN validation API.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | openiban |
| Chart Version       | 1.0.0    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for openiban.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: fourcube/openiban
  tag: 1.0.1
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 8080

securityContext:
  enabled: true
  runAsUser: 1000
  fsGroup: 1000

## For RBAC support:
rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true

  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

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

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# OpenIBAN

[OpenIBAN](https://github.com/fourcube/goiban-service) implements a basic REST Web-service for validating IBAN account numbers in GO.

## TL;DR;

```bash
$ helm install stable/openiban
```

## Introduction

This chart bootstraps an [OpenIBAN](https://github.com/fourcube/goiban-service) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.9+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm update --install my-release stable/openiban
```

The command deploys OpenIBAN on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Redmine chart and their default values.

| Parameter                   | Description                                | Default             |
| --------------------------- | ------------------------------------------ | ------------------- |
| `replicaCount`              | Number of replicas to start                | `1`                 |
| `image.repository`          | Image name                                 | `fourcube/openiban` |
| `image.tag`                 | Image tag                                  | `1.0.1`             |
| `image.pullPolicy`          | Image pull policy                          | `IfNotPresent`      |
| `service.type`              | Desired service type                       | `ClusterIP`         |
| `service.port`              | Service exposed port                       | `8080`              |
| `rbac.create`               | Use Role-based Access Control              | `true`              |
| `serviceAccount.create`     | Should we create a ServiceAccount          | `true`              |
| `serviceAccount.name`       | Name of the ServiceAccount to use          | `null`              |
| `ingress.enabled`           | Enable or disable the ingress              | `false`             |
| `ingress.hosts`             | The virtual host name(s)                   | `{}`                |
| `ingress.annotations`       | An array of service annotations            | `nil`               |
| `ingress.tls[i].secretName` | The secret kubernetes.io/tls               | `nil`               |
| `ingress.tls[i].hosts[j]`   | The virtual host name                      | `nil`               |
| `resources`                 | Resources allocation (Requests and Limits) | `{}`                |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm upgrade --install my-release \
  --set replicaCount=2 \
    stable/openiban
```

The above command enables starts 2 replicas.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```bash
$ helm upgrade --install my-release -f values.yaml stable/openiban
```

> **Tip**: You can use the default [values.yaml](values.yaml)
