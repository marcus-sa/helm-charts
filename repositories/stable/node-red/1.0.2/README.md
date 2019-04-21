# `@helm-charts/stable-node-red`

Node-RED is flow-based programming for the Internet of Things

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | node-red |
| Chart Version       | 1.0.2    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for node-red.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: nodered/node-red-docker
  tag: 0.19.4-v8
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

flows: 'flows.json'
# nodeOptions: ""
timezone: 'UTC'

service:
  type: ClusterIP
  port: 1880
  ## Specify the nodePort value for the LoadBalancer and NodePort service types.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
  ##
  # nodePort:
  ## Provide any additional annotations which may be required. This can be used to
  ## set the LoadBalancer service type to internal only.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#internal-load-balancer
  ##
  annotations: {}
  labels: {}
  ## Use loadBalancerIP to request a specific static IP,
  ## otherwise leave blank
  ##
  loadBalancerIP:
  # loadBalancerSourceRanges: []
  ## Set the externalTrafficPolicy in the Service to either Cluster or Local
  # externalTrafficPolicy: Cluster

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

persistence:
  enabled: false
  ## node-red data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  ##
  ## If you want to reuse an existing claim, you can pass the name of the PVC using
  ## the existingClaim variable
  # existingClaim: your-claim
  accessMode: ReadWriteOnce
  size: 5Gi

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

# Node-RED

Flow-based programming for the Internet of Things

**This chart is not maintained by the Node-RED project and any issues with the chart should be raised [here](https://github.com/helm/charts/issues/new)**

## TL;DR;

```console
helm install stable/node-red
```

## Introduction

This code is adopted from the [official node-red docker image](https://hub.docker.com/r/nodered/node-red-docker/) which runs the [Node-RED application](https://nodered.org/)

## Installing the Chart

To install the chart with the release name `my-release`:

```console
helm install --name my-release stable/node-red
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
helm delete my-release --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Sentry chart and their default values.

| Parameter                          | Description                                                             | Default                   |
| ---------------------------------- | ----------------------------------------------------------------------- | ------------------------- |
| `image.repository`                 | node-red image                                                          | `nodered/node-red-docker` |
| `image.tag`                        | node-red image tag                                                      | `0.19.4-v8`               |
| `image.pullPolicy`                 | node-red image pull policy                                              | `IfNotPresent`            |
| `flows`                            | Default flows configuration                                             | `flows.json`              |
| `nodeOptions`                      | Node.js runtime arguments                                               | ``                        |
| `timezone`                         | Default timezone                                                        | `UTC`                     |
| `service.type`                     | Kubernetes service type for the GUI                                     | `ClusterIP`               |
| `service.port`                     | Kubernetes port where the GUI is exposed                                | `1880`                    |
| `service.nodePort`                 | Kubernetes nodePort where the GUI is exposed                            | ``                        |
| `service.annotations`              | Service annotations for the GUI                                         | `{}`                      |
| `service.labels`                   | Custom labels                                                           | `{}`                      |
| `service.loadBalancerIP`           | Loadbalance IP for the GUI                                              | `{}`                      |
| `service.loadBalancerSourceRanges` | List of IP CIDRs allowed access to load balancer (if supported)         | None                      |
| `service.externalTrafficPolicy`    | Set the externalTrafficPolicy in the Service to either Cluster or Local | `Cluster`                 |
| `ingress.enabled`                  | Enables Ingress                                                         | `false`                   |
| `ingress.annotations`              | Ingress annotations                                                     | `{}`                      |
| `ingress.path`                     | Ingress path                                                            | `/`                       |
| `ingress.hosts`                    | Ingress accepted hostnames                                              | `chart-example.local`     |
| `ingress.tls`                      | Ingress TLS configuration                                               | `[]`                      |
| `persistence.enabled`              | Use persistent volume to store data                                     | `false`                   |
| `persistence.size`                 | Size of persistent volume claim                                         | `5Gi`                     |
| `persistence.existingClaim`        | Use an existing PVC to persist data                                     | `nil`                     |
| `persistence.storageClass`         | Type of persistent volume claim                                         | `-`                       |
| `persistence.accessModes`          | Persistence access modes                                                | `ReadWriteOnce`           |
| `resources`                        | CPU/Memory resource requests/limits                                     | `{}`                      |
| `nodeSelector`                     | Node labels for pod assignment                                          | `{}`                      |
| `tolerations`                      | Toleration labels for pod assignment                                    | `[]`                      |
| `affinity`                         | Affinity settings for pod assignment                                    | `{}`                      |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
helm install --name my-release \
  --set config.timezone="America/New_York" \
    stable/node-red
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
helm install --name my-release -f values.yaml stable/node-red
```

Read through the [values.yaml](values.yaml) file. It has several commented out suggested values.
