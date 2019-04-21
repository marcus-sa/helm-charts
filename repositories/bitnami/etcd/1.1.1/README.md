# `@helm-charts/bitnami-etcd`

etcd is a distributed key value store that provides a reliable way to store data across a cluster of machines

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | bitnami |
| Chart Name          | etcd    |
| Chart Version       | 1.1.1   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami etcd image version
## ref: https://hub.docker.com/r/bitnami/etcd/tags/
##
image:
  registry: docker.io
  repository: bitnami/etcd
  tag: 3.3.8
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
  #   - myRegistrKeySecretName

  ## Set to true if you would like to see extra information on logs
  ## It turns BASH and NAMI debugging in minideb
  ## ref:  https://github.com/bitnami/minideb-extras/#turn-on-bash-debugging
  debug: false

statefulset:
  ## Update strategy, can be set to RollingUpdate or OnDelete by default.
  ## https://kubernetes.io/docs/tutorials/stateful-application/basic-stateful-set/#updating-statefulsets
  ##
  updateStrategy: RollingUpdate
  ## Partition update strategy
  ## https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#partitions
  ##
  # rollingUpdatePartition:
  ## Pod management policy
  ## https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#pod-management-policies
  ##
  podManagementPolicy: OrderedReady
  ## Number od replicas
  ##
  replicaCount: 1

## Take into account that if you use a config map you need to provide the whole configuration
## as the env vars defined in the statefulset.yaml will not be applied
##
useConfigmap: false

## etcd docker image available customizations
## https://github.com/bitnami/bitnami-docker-etcd#configuration
##
## Allow to use etcd without configuring RBAC authentication
allowNoneAuthentication: true

## Authentication parameteres
## https://github.com/bitnami/bitnami-docker-etcd#security
##
auth:
  rbac:
    enabled: true
    ## etcd root user password. The root user is always `root`.
    # rootPassword:
    ## Name of the existing secret containing credentials for the root user.
    # existingSecret:

  client:
    ## Switch to encrypt client communication using TLS certificates
    secureTransport: false
    ## Switch to automatically create the TLS certificates
    useAutoTLS: false
    ## Switch to enable host authentication using TLS certificates. Requires existing secret.
    enableAuthentication: false
    ## Name of the existing secret containing cert files for client communication.
    # existingSecret:

  peer:
    ## Switch to encrypt client communication using TLS certificates
    secureTransport: false
    ## Switch to automatically create the TLS certificates
    useAutoTLS: false
    ## Switch to enable host authentication using TLS certificates. Requires existing secret.
    enableAuthentication: false
    ## Name of the existing secret containing cert files for client communication.
    # existingSecret:

## Kubernetes Security Context
## https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
##
securityContext:
  enabled: true
  fsGroup: 1001
  runAsUser: 1001

## Kubernetes configuration
## For minikube, set this to NodePort, elsewhere use LoadBalancer
##
service:
  type: ClusterIP
  port: 2379
  ## Specify the nodePort value for the LoadBalancer and NodePort service types for the client port
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
  ##
  # nodePort:
  peerPort: 2380
  ## Specify the nodePort value for the LoadBalancer and NodePort service types for the peer port
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
  ##
  # peerNodePort:
  ## Provide any additional annotations which may be required. This can be used to
  ## set the LoadBalancer service type to internal only.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#internal-load-balancer
  ##
  annotations: {}
  ## Use loadBalancerIP to request a specific static IP,
  ## otherwise leave blank
  ##
  # loadBalancerIP:

## etcd data Persistent Volume Storage Class
## If defined, storageClassName: <storageClass>
## If set to "-", storageClassName: "", which disables dynamic provisioning
## If undefined (the default) or set to null, no storageClassName spec is
##   set, choosing the default provisioner.  (gp2 on AWS, standard on
##   GKE, AWS & OpenStack)
##
persistence:
  enabled: true
  # storageClass: "-"
  accessModes:
    - ReadWriteOnce
  size: 8Gi
  annotations: {}

## Node labels and tolerations for pod assignment
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#taints-and-tolerations-beta-feature
nodeSelector: {}
tolerations: []

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
#  limits:
#    cpu: 200m
#    memory: 1Gi
#  requests:
#    memory: 256Mi
#    cpu: 250m

## Configure extra options for liveness and readiness probes
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#configure-probes)
livenessProbe:
  enabled: false
  initialDelaySeconds: 10
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 2
  successThreshold: 1

readinessProbe:
  enabled: false
  initialDelaySeconds: 5
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1
```

</details>

---

# etcd

[etcd](https://www.etcd.org/) is an object-relational database management system (ORDBMS) with an emphasis on extensibility and on standards-compliance.

## TL;DR;

```console
$ helm install bitnami/etcd
```

## Introduction

This chart bootstraps a [etcd](https://github.com/bitnami/bitnami-docker-etcd) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release bitnami/etcd
```

The command deploys etcd on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the etcd chart and their default values.

| Parameter                            | Description                                                                                 | Default                                                  |
| ------------------------------------ | ------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `image.registry`                     | etcd image registry                                                                         | `docker.io`                                              |
| `image.repository`                   | etcd Image name                                                                             | `bitnami/etcd`                                           |
| `image.tag`                          | etcd Image tag                                                                              | `{VERSION}`                                              |
| `image.pullPolicy`                   | etcd image pull policy                                                                      | `Always`                                                 |
| `image.pullSecrets`                  | Specify image pull secrets                                                                  | `nil` (does not add image pull secrets to deployed pods) |
| `image.debug`                        | Specify if debug values should be set                                                       | `false`                                                  |
| `statefulset.updateStrategy`         | Update strategy for the stateful set                                                        | `RollingUpdate`                                          |
| `statefulset.rollingUpdatePartition` | Partition for Rolling Update strategy                                                       | `nil`                                                    |
| `statefulset.podManagementPolicy`    | Pod management policy for the stateful set                                                  | `OrderedReady`                                           |
| `statefulset.replicaCount`           | Number of etcd nodes                                                                        | `1`                                                      |
| `useConfigmap`                       | Switch to use the config map for etcd                                                       | `false`                                                  |
| `allowNoneAuthentication`            | Allow to use etcd without configuring RBAC authentication                                   | `true`                                                   |
| `auth.rbac.enabled`                  | Switch to enable the etcd authentication.                                                   | `false`                                                  |
| `auth.rbac.rootPassword`             | Password for the root user                                                                  | `false`                                                  |
| `auth.rbac.existingSecret`           | Name of the existing secret containing the root password                                    | `false`                                                  |
| `auth.client.secureTransport`        | Switch to encrypt client communication using TLS certificates                               | `false`                                                  |
| `auth.client.useAutoTLS`             | Switch to automatically create the TLS certificates                                         | `false`                                                  |
| `auth.client.enableAuthentication`   | Switch to enable host authentication using TLS certificates. Requires existing secret.      | `secret`                                                 |
| `auth.client.existingSecret`         | Name of the existing secret containing cert files for client communication.                 | `nil`                                                    |
| `auth.peer.secureTransport`          | Switch to encrypt peer communication using TLS certificates                                 | `false`                                                  |
| `auth.peer.useAutoTLS`               | Switch to automatically create the TLS certificates                                         | `false`                                                  |
| `auth.peer.enableAuthentication`     | Switch to enable host authentication using TLS certificates. Requires existing secret.      | `false`                                                  |
| `auth.peer.existingSecret`           | Name of the existing secret containing cert files for peer communication.                   | `nil`                                                    |
| `securityContext.enabled`            | Enable security context                                                                     | `true`                                                   |
| `securityContext.fsGroup`            | Group ID for the container                                                                  | `1001`                                                   |
| `securityContext.runAsUser`          | User ID for the container                                                                   | `1001`                                                   |
| `service.type`                       | Kubernetes Service type                                                                     | `ClusterIP`                                              |
| `service.port`                       | etcd client port                                                                            | `2379`                                                   |
| `service.nodePort`                   | Port to bind to for NodePort service type (client port)                                     | `nil`                                                    |
| `service.peerPort`                   | etcd peer port                                                                              | `2380`                                                   |
| `service.peerNodePort`               | Port to bind to for NodePort service type (peer port)                                       | `nil`                                                    |
| `service.annotations`                | Annotations for etcd service                                                                | {}                                                       |
| `service.loadBalancerIP`             | loadBalancerIP if etcd service type is `LoadBalancer`                                       | `nil`                                                    |
| `persistence.enabled`                | Enable persistence using PVC                                                                | `true`                                                   |
| `persistence.storageClass`           | PVC Storage Class for etcd volume                                                           | `nil`                                                    |
| `persistence.accessMode`             | PVC Access Mode for etcd volume                                                             | `ReadWriteOnce`                                          |
| `persistence.size`                   | PVC Storage Request for etcd volume                                                         | `8Gi`                                                    |
| `persistence.annotations`            | Annotations for the PVC                                                                     | `{}`                                                     |
| `nodeSelector`                       | Node labels for pod assignment                                                              | `{}`                                                     |
| `tolerations`                        | Toleration labels for pod assignment                                                        | `[]`                                                     |
| `resources`                          | CPU/Memory resource requests/limits                                                         | Memory: `256Mi`, CPU: `250m`                             |
| `livenessProbe.enabled`              | Turn on and off liveness probe                                                              | `true`                                                   |
| `livenessProbe.initialDelaySeconds`  | Delay before liveness probe is initiated                                                    | 10                                                       |
| `livenessProbe.periodSeconds`        | How often to perform the probe                                                              | 10                                                       |
| `livenessProbe.timeoutSeconds`       | When the probe times out                                                                    | 5                                                        |
| `livenessProbe.failureThreshold`     | Minimum consecutive failures for the probe to be considered failed after having succeeded.  | 2                                                        |
| `livenessProbe.successThreshold`     | Minimum consecutive successes for the probe to be considered successful after having failed | 1                                                        |
| `readinessProbe.enabled`             | Turn on and off readiness probe                                                             | `true`                                                   |
| `readinessProbe.initialDelaySeconds` | Delay before liveness probe is initiated                                                    | 5                                                        |
| `readinessProbe.periodSeconds`       | How often to perform the probe                                                              | 10                                                       |
| `readinessProbe.timeoutSeconds`      | When the probe times out                                                                    | 5                                                        |
| `readinessProbe.failureThreshold`    | Minimum consecutive failures for the probe to be considered failed after having succeeded.  | 6                                                        |
| `readinessProbe.successThreshold`    | Minimum consecutive successes for the probe to be considered successful after having failed | 1                                                        |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set auth.rootPassword=secretpassword bitnami/etcd
```

The above command sets the etcd `etcd` account password to `secretpassword`. Additionally it creates a database named `my-database`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml bitnami/etcd
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Production and horizontal scaling

The following repo contains the recommended production settings for etcd server in an alternative [values file](values-production.yaml). Please read carefully the comments in the values-production.yaml file to set up your environment.

```console
$ helm install --name my-release -f ./values-production.yaml bitnami/etcd
```

To horizontally scale this chart once it has been deployed:

```console
$ kubectl scale statefulset my-etcd --replicas=5
```

## Enable security for etcd

### Configure RBAC

In order to enable [Role-based access control for etcd](https://coreos.com/etcd/docs/latest/op-guide/authentication.html) you can run the following command:

```console
$ helm install --name my-release --set auth.rbac.enabled --set auth.rbac.rootPassword=YOUR-PASSWORD bitnami/etcd

```

The previous command will deploy etcd creating a `root` user with its associate `root` role with access to everything.
The rest of users will use the `guest` role and won't have permissions to do anything.

### Configure certificated for peer communication

In order to enable secure transport between peer nodes deploy the helm chart with these options:

```console
$ helm install --name my-release --set auth.peer.secureTransport=true --set auth.peer.useAutoTLS=true bitnami/etcd

```

### Configure certificates for client comminication

In order to enable secure transport between client and server you have to create a secret containing the cert and key files and the CA used to sign those client certificates.

You can create that secret with this command:

```console
$ kubectl create secret generic etcd-client-certs --from-file=ca.crt=path/to/ca.crt --from-file=cert.pem=path/to/cert.pem --from-file=key.pem=path/to/key.pem
```

Once the secret is created, you can deploy the helm chart with these options:

```console
$ helm install --name my-release --set auth.client.secureTransport=true --set auth.client.enableAuthentication=true --set auth.client.existingSecret=etcd-client-certs bitnami/etcd

```

> Ref: [etcd security model](https://coreos.com/etcd/docs/latest/op-guide/security.html)
>
> Ref: [Generate self-signed certificagtes for etcd](https://coreos.com/os/docs/latest/generate-self-signed-certificates.html)

## Persistence

The [Bitnami etcd](https://github.com/bitnami/bitnami-docker-etcd) image stores the etcd data at the `/bitnami/etcd` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Upgrading

### To 1.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 1.0.0. The following example assumes that the release name is etcd:

```console
$ kubectl delete statefulset etcd --cascade=false
```
