# `@helm-charts/incubator-docker-registry`

A Helm chart for Docker Registry

| Field               | Value           |
| ------------------- | --------------- |
| Repository Name     | incubator       |
| Chart Name          | docker-registry |
| Chart Version       | 0.2.3           |
| NPM Package Version | 0.1.0           |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for docker-registry.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
image:
  repository: registry
  tag: 2.6.2
  pullPolicy: IfNotPresent
service:
  name: registry
  type: ClusterIP
  port: 5000
ingress:
  enabled: false
  # Used to create an Ingress record.
  hosts:
    - chart-example.local
  annotations:
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  tls:
    # Secrets must be manually created in the namespace.
    # - secretName: chart-example-tls
    #   hosts:
    #     - chart-example.local
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
  accessMode: 'ReadWriteOnce'
  enabled: false
  size: 10Gi
  # storageClass: '-'
```

</details>

---

# Docker Registry Helm Chart

This directory contains a Kubernetes chart to deploy a private Docker Registry.

## Prerequisites Details

- PV support on underlying infrastructure (if persistence is required)

## Chart Details

This chart will do the following:

- Implement a Docker registry deployment

## Installing the Chart

To install the chart, use the following:

```console
$ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
$ helm install incubator/docker-registry
```

## Configuration

The following tables lists the configurable parameters of the vault chart and
their default values.

| Parameter                                                             | Description                                 | Default        |
| --------------------------------------------------------------------- | ------------------------------------------- | -------------- |
| `image.pullPolicy`                                                    | Container pull policy                       | `IfNotPresent` |
| `image.repository`                                                    | Container image to use                      | `registry`     |
| `image.tag`                                                           | Container image tag to deploy               | `2.6.2`        |
| `persistence.accessMode | Access mode to use for PVC |`ReadWriteOnce` |
| `persistence.enabled`                                                 | Whether to use a PVC for the Docker storage | `false`        |
| `persistence.size`                                                    | Amount of space to claim for PVC            | `10Gi`         |
| `persistence.storageClass`                                            | Storage Class to use for PVC                | `-`            |
| `replicaCount`                                                        | k8s replicas                                | `1`            |
| `resources.limits.cpu`                                                | Container requested CPU                     | `nil`          |
| `resources.limits.memory`                                             | Container requested memory                  | `nil`          |

Specify each parameter using the `--set key=value[,key=value]` argument to
`helm install`.
