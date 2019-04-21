# `@helm-charts/bitnami-nats`

An open-source, cloud-native messaging system

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | bitnami |
| Chart Name          | nats    |
| Chart Version       | 1.2.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Global Docker image registry
## Please, note that this will override the image registry for all the images, including dependencies, configured to use the global value
##
# global:
#   imageRegistry:

## Bitnami NATS image version
## ref: https://hub.docker.com/r/bitnami/nats/tags/
##
image:
  registry: docker.io
  repository: bitnami/nats
  tag: 1.3.0
  ## Specify a imagePullPolicy
  ## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  ##
  pullPolicy: Always
  ## Optionally specify an array of imagePullSecrets.
  ## Secrets must be manually created in the namespace.
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  ##
  # pullSecrets:
  #   - name: myRegistrKeySecretName

## NATS replicas
replicaCount: 1

## NATS Pod Security Context
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
##
securityContext:
  enabled: true
  fsGroup: 1001
  runAsUser: 1001

## NATS Node selector and tolerations for pod assignment
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#taints-and-tolerations-beta-feature
##
# nodeSelector: {"beta.kubernetes.io/arch": "amd64"}
# tolerations: []

## Use an alternate scheduler, e.g. "stork".
## ref: https://kubernetes.io/docs/tasks/administer-cluster/configure-multiple-schedulers/
##
# schedulerName:

## Pods anti-affinity
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
##
antiAffinity: soft

## Pod annotations
## ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
##
podAnnotations: {}

## Additional pod labels
## ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
##
podLabels: {}

## Update strategy, can be set to RollingUpdate or OnDelete by default.
## https://kubernetes.io/docs/tutorials/stateful-application/basic-stateful-set/#updating-statefulsets
statefulset:
  updateStrategy: OnDelete
  ## Partition update strategy
  ## https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#partitions
  # rollingUpdatePartition:

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources: {}
# limits:
#   cpu: 500m
#   memory: 512Mi
# requests:
#   cpu: 100m
#   memory: 256Mi

## Configure extra options for liveness and readiness probes
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#configure-probes)
livenessProbe:
  enabled: true
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1
readinessProbe:
  enabled: true
  initialDelaySeconds: 5
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1

## Client Authentication
## ref: https://github.com/nats-io/gnatsd#authentication
##
auth:
  enabled: true
  user: nats_client
  # password:
  # token:

## Cluster Authentication
## ref: https://github.com/nats-io/gnatsd#authentication
##
clusterAuth:
  enabled: true
  user: nats_cluster
  # password:
  # token:

## Logging parameters
## ref: https://github.com/nats-io/gnatsd#command-line-arguments
##
debug:
  enabled: false
  trace: false
  logtime: false

## System overrides parameters
## ref: https://github.com/nats-io/gnatsd#configuration-file
##
# maxConnections: 100
# maxControlLine: 512
# maxPayload: 65536
# writeDeadline: "2s"

## Network pullPolicy
## https://kubernetes.io/docs/concepts/services-networking/network-policies/
##
networkPolicy:
  ## Enable creation of NetworkPolicy resources.
  enabled: false

  ## The Policy model to apply. When set to false, only pods with the correct
  ## client labels will have network access to the port NATS is listening
  ## on. When true, NATS will accept connections from any source
  ## (with the correct destination port).
  ##
  allowExternal: true

## NATS svc used for client connections
## ref: https://github.com/nats-io/gnatsd#running
##
clientService:
  ## Kubernetes service type
  type: ClusterIP
  port: 4222
  ## Specify the nodePort value for the LoadBalancer and NodePort service types.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
  ##
  # nodePort:
  ## Provide any additional annotations which may be required. This can be used to
  ## set the LoadBalancer service type to internal only.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#internal-load-balancer
  ##
  annotations: {}
  ## Use loadBalancerIP to request a specific static IP,
  ## otherwise leave blank
  ##
  # loadBalancerIP:
## Kubernetes svc used for clustering
## ref: https://github.com/nats-io/gnatsd#clustering
##
clusterService:
  ## Kubernetes service type
  type: ClusterIP
  port: 6222
  ## Specify the nodePort value for the LoadBalancer and NodePort service types.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
  ##
  # nodePort:
  ## Provide any additional annotations which may be required. This can be used to
  ## set the LoadBalancer service type to internal only.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#internal-load-balancer
  ##
  annotations: {}
  ## Use loadBalancerIP to request a specific static IP,
  ## otherwise leave blank
  ##
  # loadBalancerIP:
## NATS svc used for monitoring
## ref: https://github.com/nats-io/gnatsd#monitoring
##
monitoringService:
  ## Kubernetes service type
  type: ClusterIP
  port: 8222
  ## Specify the nodePort value for the LoadBalancer and NodePort service types.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
  ##
  # nodePort:
  ## Provide any additional annotations which may be required. This can be used to
  ## set the LoadBalancer service type to internal only.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#internal-load-balancer
  ##
  annotations: {}
  ## Use loadBalancerIP to request a specific static IP,
  ## otherwise leave blank
  ##
  loadBalancerIP:

## Configure the ingress resource that allows you to access the
## NATS Monitoring. Set up the URL
## ref: http://kubernetes.io/docs/user-guide/ingress/
##
ingress:
  enabled: false
  # The list of hostnames to be covered with this ingress record.
  # Most likely this will be just one host, but in the event more hosts are needed, this is an array
  hosts:
    - name: nats.local

      ## Set this to true in order to enable TLS on the ingress record
      tls: false

      ## If TLS is set to true, you must declare what secret will store the key/certificate for TLS
      tlsSecret: nats.local-tls

      ## Ingress annotations done as key:value pairs
      ## If you're using kube-lego, you will want to add:
      ## kubernetes.io/tls-acme: true
      ##
      ## For a full list of possible ingress annotations, please see
      ## ref: https://github.com/kubernetes/ingress-nginx/blob/master/docs/annotations.md
      ##
      ## If tls is set to true, annotation ingress.kubernetes.io/secure-backends: "true" will automatically be set
      annotations:
      #  kubernetes.io/ingress.class: nginx
      #  kubernetes.io/tls-acme: true

  secrets:
  ## If you're providing your own certificates, please use this to add the certificates as secrets
  ## key and certificate should start with -----BEGIN CERTIFICATE----- or
  ## -----BEGIN RSA PRIVATE KEY-----
  ##
  ## name should line up with a tlsSecret set further up
  ## If you're using kube-lego, this is unneeded, as it will create the secret for you if it is not set
  ##
  ## It is also possible to create and manage the certificates outside of this helm chart
  ## Please see README.md for more information
  # - name: nats.local-tls
  #   key:
  #   certificate:

sidecars:
## Add sidecars to the pod.
## e.g.
# - name: your-image-name
# image: your-image
# imagePullPolicy: Always
# ports:
# - name: portname
#   containerPort: 1234

## Prometheus Exporter / Metrics
##
metrics:
  enabled: false
  image:
    registry: docker.io
    repository: appcelerator/prometheus-nats-exporter
    tag: 0.17.0
    pullPolicy: IfNotPresent
    ## Optionally specify an array of imagePullSecrets.
    ## Secrets must be manually created in the namespace.
    ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
    ##
    # pullSecrets:
    #   - myRegistrKeySecretName
    ## Metrics exporter resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  # resources: {}
  ## Metrics exporter pod Annotation
  podAnnotations:
    prometheus.io/scrape: 'true'
    prometheus.io/port: '7777'
```

</details>

---

# NATS

[NATS](https://nats.io/) is an open-source, cloud-native messaging system. It provides a lightweight server that is written in the Go programming language.

## TL;DR

```bash
$ helm install stable/nats
```

## Introduction

This chart bootstraps a [NATS](https://github.com/bitnami/bitnami-docker-nats) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/nats
```

The command deploys NATS on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the NATS chart and their default values.

| Parameter                            | Description                                                                                  | Default                                 |
| ------------------------------------ | -------------------------------------------------------------------------------------------- | --------------------------------------- |
| `global.imageRegistry`               | Global Docker image registry                                                                 | `nil`                                   |
| `image.registry`                     | NATS image registry                                                                          | `docker.io`                             |
| `image.repository`                   | NATS Image name                                                                              | `bitnami/nats`                          |
| `image.tag`                          | NATS Image tag                                                                               | `{VERSION}`                             |
| `image.pullPolicy`                   | Image pull policy                                                                            | `Always`                                |
| `image.pullSecrets`                  | Specify image pull secrets                                                                   | `nil`                                   |
| `auth.enabled`                       | Switch to enable/disable client authentication                                               | `true`                                  |
| `auth.user`                          | Client authentication user                                                                   | `nats_cluster`                          |
| `auth.password`                      | Client authentication password                                                               | `random alhpanumeric string (10)`       |
| `auth.token`                         | Client authentication token                                                                  | `nil`                                   |
| `clusterAuth.enabled`                | Switch to enable/disable cluster authentication                                              | `true`                                  |
| `clusterAuth.user`                   | Cluster authentication user                                                                  | `nats_cluster`                          |
| `clusterAuth.password`               | Cluster authentication password                                                              | `random alhpanumeric string (10)`       |
| `clusterAuth.token`                  | Cluster authentication token                                                                 | `nil`                                   |
| `debug.enabled`                      | Switch to enable/disable debug on logging                                                    | `false`                                 |
| `debug.trace`                        | Switch to enable/disable trace debug level on logging                                        | `false`                                 |
| `debug.logtime`                      | Switch to enable/disable logtime on logging                                                  | `false`                                 |
| `maxConnections`                     | Max. number of client connections                                                            | `nil`                                   |
| `maxControlLine`                     | Max. protocol control line                                                                   | `nil`                                   |
| `maxPayload`                         | Max. payload                                                                                 | `nil`                                   |
| `writeDeadline`                      | Duration the server can block on a socket write to a client                                  | `nil`                                   |
| `replicaCount`                       | Number of NATS nodes                                                                         | `1`                                     |
| `securityContext.enabled`            | Enable security context                                                                      | `true`                                  |
| `securityContext.fsGroup`            | Group ID for the container                                                                   | `1001`                                  |
| `securityContext.runAsUser`          | User ID for the container                                                                    | `1001`                                  |
| `statefulset.updateStrategy`         | Statefulsets Update strategy                                                                 | `OnDelete`                              |
| `rollingUpdatePartition`             | Partition for Rolling Update strategy                                                        | `nil`                                   |
| `podLabels`                          | Additional labels to be added to pods                                                        | {}                                      |
| `podAnnotations`                     | Annotations to be added to pods                                                              | {}                                      |
| `nodeSelector`                       | Node labels for pod assignment                                                               | `nil`                                   |
| `schedulerName`                      | Name of an alternate                                                                         | `nil`                                   |
| `antiAffinity`                       | Anti-affinity for pod assignment                                                             | `soft`                                  |
| `tolerations`                        | Toleration labels for pod assignment                                                         | `nil`                                   |
| `resources`                          | CPU/Memory resource requests/limits                                                          | {}                                      |
| `livenessProbe.initialDelaySeconds`  | Delay before liveness probe is initiated                                                     | `30`                                    |
| `livenessProbe.periodSeconds`        | How often to perform the probe                                                               | `10`                                    |
| `livenessProbe.timeoutSeconds`       | When the probe times out                                                                     | `5`                                     |
| `livenessProbe.successThreshold`     | Minimum consecutive successes for the probe to be considered successful after having failed. | `1`                                     |
| `livenessProbe.failureThreshold`     | Minimum consecutive failures for the probe to be considered failed after having succeeded.   | `6`                                     |
| `readinessProbe.initialDelaySeconds` | Delay before readiness probe is initiated                                                    | `5`                                     |
| `readinessProbe.periodSeconds`       | How often to perform the probe                                                               | `10`                                    |
| `readinessProbe.timeoutSeconds`      | When the probe times out                                                                     | `5`                                     |
| `readinessProbe.failureThreshold`    | Minimum consecutive failures for the probe to be considered failed after having succeeded.   | `6`                                     |
| `readinessProbe.successThreshold`    | Minimum consecutive successes for the probe to be considered successful after having failed. | `1`                                     |
| `clientService.type`                 | Kubernetes Service type (NATS client)                                                        | `ClusterIP`                             |
| `clientService.port`                 | NATS client port                                                                             | `4222`                                  |
| `clientService.nodePort`             | Port to bind to for NodePort service type (NATS client)                                      | `nil`                                   |
| `clientService.annotations`          | Annotations for NATS client service                                                          | {}                                      |
| `clientService.loadBalancerIP`       | loadBalancerIP if NATS client service type is `LoadBalancer`                                 | `nil`                                   |
| `clusterService.type`                | Kubernetes Service type (NATS cluster)                                                       | `ClusterIP`                             |
| `clusterService.port`                | NATS cluster port                                                                            | `6222`                                  |
| `clusterService.nodePort`            | Port to bind to for NodePort service type (NATS cluster)                                     | `nil`                                   |
| `clusterService.annotations`         | Annotations for NATS cluster service                                                         | {}                                      |
| `clusterService.loadBalancerIP`      | loadBalancerIP if NATS cluster service type is `LoadBalancer`                                | `nil`                                   |
| `monitoringService.type`             | Kubernetes Service type (NATS monitoring)                                                    | `ClusterIP`                             |
| `monitoringService.port`             | NATS monitoring port                                                                         | `8222`                                  |
| `monitoringService.nodePort`         | Port to bind to for NodePort service type (NATS monitoring)                                  | `nil`                                   |
| `monitoringService.annotations`      | Annotations for NATS monitoring service                                                      | {}                                      |
| `monitoringService.loadBalancerIP`   | loadBalancerIP if NATS monitoring service type is `LoadBalancer`                             | `nil`                                   |
| `ingress.enabled`                    | Enable ingress controller resource                                                           | `false`                                 |
| `ingress.hosts[0].name`              | Hostname for NATS monitoring                                                                 | `nats.local`                            |
| `ingress.hosts[0].path`              | Path within the url structure                                                                | `/`                                     |
| `ingress.hosts[0].tls`               | Utilize TLS backend in ingress                                                               | `false`                                 |
| `ingress.hosts[0].tlsSecret`         | TLS Secret (certificates)                                                                    | `nats.local-tls-secret`                 |
| `ingress.hosts[0].annotations`       | Annotations for this host's ingress record                                                   | `[]`                                    |
| `ingress.secrets[0].name`            | TLS Secret Name                                                                              | `nil`                                   |
| `ingress.secrets[0].certificate`     | TLS Secret Certificate                                                                       | `nil`                                   |
| `ingress.secrets[0].key`             | TLS Secret Key                                                                               | `nil`                                   |
| `networkPolicy.enabled`              | Enable NetworkPolicy                                                                         | `false`                                 |
| `networkPolicy.allowExternal`        | Allow external connections                                                                   | `true`                                  |
| `sidecars`                           | Attach additional containers to the pod.                                                     | `nil`                                   |
| `metrics.enabled`                    | Start a side-car prometheus exporter                                                         | `false`                                 |
| `metrics.image.registry`             | MongoDB exporter image registry                                                              | `docker.io`                             |
| `metrics.image.repository`           | MongoDB exporter image name                                                                  | `appcelerator/prometheus-nats-exporter` |
| `metrics.image.tag`                  | MongoDB exporter image tag                                                                   | `0.17.0`                                |
| `metrics.image.pullPolicy`           | Image pull policy                                                                            | `IfNotPresent`                          |
| `metrics.image.pullSecrets`          | Specify docker-registry secret names as an array                                             | `nil`                                   |
| `metrics.podAnnotations`             | Additional annotations for Metrics exporter pod                                              | {}                                      |
| `metrics.resources`                  | Exporter resource requests/limit                                                             | Memory: `256Mi`, CPU: `100m`            |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set auth.enabled=true,auth.user=my-user,auth.password=T0pS3cr3t \
    stable/nats
```

The above command enables NATS client authentication with `my-user` as user and `T0pS3cr3t` as password credentials.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/nats
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Sidecars

If you have a need for additional containers to run within the same pod as NATS (e.g. an additional metrics or logging exporter), you can do so via the `sidecars` config parameter. Simply define your container according to the Kubernetes container spec.

```yaml
sidecars:
- name: your-image-name
  image: your-image
  imagePullPolicy: Always
  ports:
  - name: portname
   containerPort: 1234
```

## Production settings and horizontal scaling

The [values-production.yaml](values-production.yaml) file consists a configuration to deploy a scalable and high-available NATS deployment for production environments. We recommend that you base your production configuration on this template and adjust the parameters appropriately.

```console
$ curl -O https://raw.githubusercontent.com/kubernetes/charts/master/stable/nats/values-production.yaml
$ helm install --name my-release -f ./values-production.yaml stable/nats
```

To horizontally scale this chart, run the following command to scale the number of nodes in your NATS replica set.

```console
$ kubectl scale statefulset my-release-nats --replicas=3
```

## Upgrading

### To 1.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 1.0.0. The following example assumes that the release name is nats:

```console
$ kubectl delete statefulset nats-nats --cascade=false
```
