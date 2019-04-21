# `@helm-charts/stable-unifi`

Ubiquiti Network's Unifi Controller

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | unifi  |
| Chart Version       | 0.2.1  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for unifi.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: jacobalberty/unifi
  tag: 5.9.29
  pullPolicy: IfNotPresent

guiService:
  type: ClusterIP
  port: 8443
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

controllerService:
  type: NodePort
  port: 8080
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

stunService:
  type: NodePort
  port: 3478 # udp
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

discoveryService:
  type: NodePort
  port: 10001 # udp
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

timezone: UTC

runAsRoot:
  false
  # define an external mongoDB instead of using the built-in mongodb
mongodb:
  enabled: false
  dbUri: mongodb://mongo/unifi
  statDbUri: mongodb://mongo/unifi_stat
  databaseName: unifi

persistence:
  enabled: true
  ## unifi data Persistent Volume Storage Class
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

# Ubiqiti Network's Unifi Controller

This is a helm chart for [Ubiqiti Network's](https://www.ubnt.com/) [Unifi Controller](https://unifi-sdn.ubnt.com/)

## TL;DR;

```console
helm install stable/unifi
```

## Introduction

This code is adopted from [this original repo](https://github.com/jacobalberty/unifi-docker)

## Installing the Chart

To install the chart with the release name `my-release`:

```console
helm install --name my-release stable/unifi
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
helm delete my-release --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Sentry chart and their default values.

| Parameter                                    | Description                                                                                                            | Default                      |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `image.repository`                           | Image repository                                                                                                       | `jacobalberty/unifi`         |
| `image.tag`                                  | Image tag. Possible values listed [here](https://hub.docker.com/r/jacobalberty/unifi/tags/).                           | `5.8.23`                     |
| `image.pullPolicy`                           | Image pull policy                                                                                                      | `IfNotPresent`               |
| `guiService.type`                            | Kubernetes service type for the Unifi GUI                                                                              | `ClusterIP`                  |
| `guiService.port`                            | Kubernetes port where the Unifi GUI is exposed                                                                         | `8443`                       |
| `guiService.annotations`                     | Service annotations for the Unifi GUI                                                                                  | `{}`                         |
| `guiService.labels`                          | Custom labels                                                                                                          | `{}`                         |
| `guiService.loadBalancerIP`                  | Loadbalance IP for the Unifi GUI                                                                                       | `{}`                         |
| `guiService.loadBalancerSourceRanges`        | List of IP CIDRs allowed access to load balancer (if supported)                                                        | None                         |
| `guiService.externalTrafficPolicy`           | Set the externalTrafficPolicy in the Service to either Cluster or Local                                                | `Cluster`                    |
| `controllerService.type`                     | Kubernetes service type for the Unifi Controller communication                                                         | `NodePort`                   |
| `controllerService.port`                     | Kubernetes port where the Unifi Controller is exposed - this needs to be reachable by the unifi devices on the network | `8080`                       |
| `controllerService.annotations`              | Service annotations for the Unifi Controller                                                                           | `{}`                         |
| `controllerService.labels`                   | Custom labels                                                                                                          | `{}`                         |
| `controllerService.loadBalancerIP`           | Loadbalance IP for the Unifi Controller                                                                                | `{}`                         |
| `controllerService.loadBalancerSourceRanges` | List of IP CIDRs allowed access to load balancer (if supported)                                                        | None                         |
| `controllerService.externalTrafficPolicy`    | Set the externalTrafficPolicy in the Service to either Cluster or Local                                                | `Cluster`                    |
| `stunService.type`                           | Kubernetes service type for the Unifi STUN                                                                             | `NodePort`                   |
| `stunService.port`                           | Kubernetes UDP port where the Unifi STUN is exposed                                                                    | `3478`                       |
| `stunService.annotations`                    | Service annotations for the Unifi STUN                                                                                 | `{}`                         |
| `stunService.labels`                         | Custom labels                                                                                                          | `{}`                         |
| `stunService.loadBalancerIP`                 | Loadbalance IP for the Unifi STUN                                                                                      | `{}`                         |
| `stunService.loadBalancerSourceRanges`       | List of IP CIDRs allowed access to load balancer (if supported)                                                        | None                         |
| `stunService.externalTrafficPolicy`          | Set the externalTrafficPolicy in the Service to either Cluster or Local                                                | `Cluster`                    |
| `discoveryService.type`                      | Kubernetes service type for AP discovery                                                                               | `NodePort`                   |
| `discoveryService.port`                      | Kubernetes UDP port for AP discovery                                                                                   | `10001`                      |
| `discoveryService.annotations`               | Service annotations for AP discovery                                                                                   | `{}`                         |
| `discoveryService.labels`                    | Custom labels                                                                                                          | `{}`                         |
| `discoveryService.loadBalancerIP`            | Loadbalance IP for AP discovery                                                                                        | `{}`                         |
| `discoveryService.loadBalancerSourceRanges`  | List of IP CIDRs allowed access to load balancer (if supported)                                                        | None                         |
| `discoveryService.externalTrafficPolicy`     | Set the externalTrafficPolicy in the Service to either Cluster or Local                                                | `Cluster`                    |
| `ingress.enabled`                            | Enables Ingress                                                                                                        | `false`                      |
| `ingress.annotations`                        | Ingress annotations                                                                                                    | `{}`                         |
| `ingress.labels`                             | Custom labels                                                                                                          | `{}`                         |
| `ingress.path`                               | Ingress path                                                                                                           | `/`                          |
| `ingress.hosts`                              | Ingress accepted hostnames                                                                                             | `chart-example.local`        |
| `ingress.tls`                                | Ingress TLS configuration                                                                                              | `[]`                         |
| `timezone`                                   | Timezone the Unifi controller should run as, e.g. 'America/New York'                                                   | `UTC`                        |
| `runAsRoot`                                  | Run the controller as UID0 (root user)                                                                                 | `false`                      |
| `mongodb.enabled`                            | Use external MongoDB for data storage                                                                                  | `false`                      |
| `mongodb.dbUri`                              | external MongoDB URI                                                                                                   | `mongodb://mongo/unifi`      |
| `mongodb.statDbUri`                          | external MongoDB statdb URI                                                                                            | `mongodb://mongo/unifi_stat` |
| `mongodb.databaseName`                       | external MongoDB database name                                                                                         | `unifi`                      |
| `persistence.enabled`                        | Use persistent volume to store data                                                                                    | `true`                       |
| `persistence.size`                           | Size of persistent volume claim                                                                                        | `5Gi`                        |
| `persistence.existingClaim`                  | Use an existing PVC to persist data                                                                                    | `nil`                        |
| `persistence.storageClass`                   | Type of persistent volume claim                                                                                        | `-`                          |
| `persistence.accessModes`                    | Persistence access modes                                                                                               | `[]`                         |
| `resources`                                  | CPU/Memory resource requests/limits                                                                                    | `{}`                         |
| `nodeSelector`                               | Node labels for pod assignment                                                                                         | `{}`                         |
| `tolerations`                                | Toleration labels for pod assignment                                                                                   | `[]`                         |
| `affinity`                                   | Affinity settings for pod assignment                                                                                   | `{}`                         |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
helm install --name my-release \
  --set timezone="America/New York" \
    stable/unifi
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
helm install --name my-release -f values.yaml stable/unifi
```

Read through the [values.yaml](values.yaml) file. It has several commented out suggested values.

## Regarding the services

- `guiService`: represents the main web UI and is what one would normally point the ingress to
- `controllerService`: This is needed in order for the unifi devices to talk to the controller and must be otherwise exposed to the network where the unifi devices run. If you run this as a NodePort (the default setting), make sure that there is an external loadbalancer that is directing traffic from port 8080 to the NodePort for this service
- `discoveryService`: This needs to be reachable by the unifi devices on the network similar to the controllerService but only during the discovery phase. This is a UDP service
- `stunService`: Also used periodically by the unifi devices to communicate with the controller using UDP. See [this article](https://help.ubnt.com/hc/en-us/articles/204976094-UniFi-What-protocol-does-the-controller-use-to-communicate-with-the-UAP-) and [this other article](https://help.ubnt.com/hc/en-us/articles/115015457668-UniFi-Troubleshooting-STUN-Communication-Errors) for more information
