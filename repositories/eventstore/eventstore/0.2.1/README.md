# `@helm-charts/eventstore-eventstore`

A Helm chart for Kubernetes EventStore.

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | eventstore |
| Chart Name          | eventstore |
| Chart Version       | 0.2.1      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Default values for Event Store.
## Duplicate this file and customize.

## Event Store image repository.
## ref: https://hub.docker.com/r/eventstore/eventstore/
image: eventstore/eventstore
##
## Event Store image tag
imageTag: release-4.1.1-hotfix1
##
## Specify a imagePullPolicy
## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
imagePullPolicy: IfNotPresent
##
## Optionally specify an array of imagePullSecrets.
## Secrets must be manually created in the namespace.
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
##
# imagePullSecrets:
#   - myRegistrKeySecretName
##
## The number of nodes in the cluster. When setting up a cluster,
## you generally want an odd number of nodes as Event Store uses a
## quorum based algorithm to handle high availability. We recommended
## you define an odd number of nodes to avoid split brain problems.
## Common values for the `clusterSize` setting are 3 or 5
## (to have a majority of 2 nodes and a majority of 3 nodes).
## ref: https://eventstore.org/docs/server/cluster-without-manager-nodes/index.html
clusterSize: 3
##
## Configure the HTTP admin API. The admin password is set
## using a post-install hook that makes a POST request to the
## Event Store HTTP API. The `admin.password` value should be
## set in a separate `creds-values.yaml` file so that you can
## keep it out of source control and read during deployment.
## See the `ci` directory in this repo for the default values.
## ref: https://eventstore.org/docs/http-api/security/index.html
## ref: https://github.com/helm/helm/blob/master/docs/charts_hooks.md
admin:
  ##
  ## Image with curl installed to make POST request for setting credentials.
  jobImage: tutum/curl
  jobImageTag: latest
  ##
  ## Admin password. Set using a separate `values.yaml` file
  ## or using `--set admin.password=<your admin password>.
  # password: changeit
  ##
  ## Service type for admin interface.
  serviceType: ClusterIP
  ##
  ## NGINX image used for admin interface proxy.
  proxyImage: nginx
  proxyImageTag: latest
  ##
  ## The dns resolver which is being used in the cluster (e.g., kube-dns, coredns)
  dnsResolver: kube-dns
##
## Configure a pod disruption budget for the Event Store StatefulSet.
## ref: https://kubernetes.io/docs/tasks/run-application/configure-pdb/
podDisruptionBudget:
  ##
  ## Enable a pod disruption budget.
  enabled: false
  ##
  ## Number of pods that must still be available after eviction.
  minAvailable: 2
  ##
  ## Number of pods that can be unavailable after eviction.
  # maxUnavailable: 1
##
## External IP Address. Remove or set to `null` to disable connections from outside the cluster.
extIp: 0.0.0.0
##
## Internal HTTP port.
intHttpPort: 2112
##
## External HTTP port.
extHttpPort: 2113
##
## Internal TCP port.
intTcpPort: 1112
##
## External TCP port.
extTcpPort: 1113
##
## The amount of drift, in ms, between clocks on nodes allowed before gossip is rejected.
gossipAllowedDiffMs: 600000
## Additional Event Store parameters as environment variables.
## ref: https://eventstore.org/docs/server/command-line-arguments/index.html#parameter-list
## example:
##  EVENTSTORE_RUN_PROJECTIONS: System
eventStoreConfig: {}

##
## Schedule a scavenging CronJob
## ref: https://eventstore.org/docs/server/scavenging/
scavenging:
  enabled: false
  schedule: 0 2 * * *

## Persist data to a persistent volume
persistence:
  enabled: false

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
  accessMode: ReadWriteOnce
  size: 8Gi
  mountPath: /var/lib/eventstore
  annotations: {}

resources:
  {}
  ## If you want to specify resources, uncomment the following
  ## lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  ##
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

podAnnotations: {}

tolerations: []

affinity: {}
```

</details>

---

# Event Store

[Event Store](https://eventstore.org/) is an open-source,
functional database with Complex Event Processing in JavaScript.

## TL;DR;

```shell
helm repo add eventstore https://eventstore.github.io/EventStore.Charts
helm repo update
```

> The default username and password for the admin interface
> is `admin:changeit`.

## Introduction

This chart bootstraps a [Event Store](https://hub.docker.com/r/eventstore/eventstore/)
deployment on a [Kubernetes](http://kubernetes.io) cluster
using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure (Only when persisting data)

## Installing the Chart

Add the Event Store Charts repository.

```shell
helm repo add eventstore https://eventstore.github.io/EventStore.Charts
helm repo update
```

To install the Event Store chart with the release name `eventstore`:

```shell
helm install -n eventstore eventstore/eventstore
```

To install the Event Store chart with a custom admin password:

```shell
helm install -n eventstore eventstore/eventstore --set 'admin.password=<your admin password>'
```

This triggers Helm to run a post-install Job which resets the admin password using
the Event Store HTTP API. You can then use the username `admin` and the password set
in the above command to log into the admin interface.

The above commands install Event Store with the default configuration.
The [configuration](#configuration) section below lists the parameters
that can be configured during installation.

## Deleting the Chart

Delete the `eventstore` release.

```shell
helm delete eventstore --purge
```

This command removes all the Kubernetes components
associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Event Store chart and their default values.

| Parameter                            | Description                                                                   | Default                      |
| ------------------------------------ | ----------------------------------------------------------------------------- | ---------------------------- |
| `image`                              | Container image name                                                          | `eventstore/eventstore`      |
| `imageTag`                           | Container image tag                                                           | `release-4.1.1-hotfix1`      |
| `imagePullPolicy`                    | Container pull policy                                                         | `IfNotPresent`               |
| `imagePullSecrets`                   | Specify image pull secrets                                                    | `nil`                        |
| `clusterSize`                        | The number of nodes in the cluster                                            | `3`                          |
| `admin.jobImage`                     | Post install Job image with `curl` installed for setting admin password       | `tutum/curl`                 |
| `admin.jobImageTag`                  | Post install Job image tag                                                    | `latest`                     |
| `admin.password`                     | Custom password for admin interface (should be set in separate file)          | `nil`                        |
| `admin.serviceType`                  | Service type for the admin interface                                          | `ClusterIP`                  |
| `admin.proxyImage`                   | NGINX image for admin interface proxy                                         | `nginx`                      |
| `admin.proxyImageTag`                | NGINX image tag                                                               | `latest`                     |
| `podDisruptionBudget.enabled`        | Enable a pod disruption budget for nodes                                      | `false`                      |
| `podDisruptionBudget.minAvailable`   | Number of pods that must still be available after eviction                    | `2`                          |
| `podDisruptionBudget.maxUnavailable` | Number of pods that can be unavailable after eviction                         | `nil`                        |
| `intHttpPort`                        | Internal HTTP port                                                            | `2112`                       |
| `extHttpPort`                        | External HTTP port                                                            | `2113`                       |
| `intTcpPort`                         | Internal TCP port                                                             | `1112`                       |
| `extTcpPort`                         | External TCP port                                                             | `1113`                       |
| `gossipAllowedDiffMs`                | The amount of drift, in ms, between clocks on nodes before gossip is rejected | `600000`                     |
| `eventStoreConfig`                   | Additional Event Store parameters                                             | `{}`                         |
| `scavenging.enabled`                 | Enable the scavenging CronJob for all nodes                                   | `false`                      |
| `scavenging.schedule`                | The schedule to use for the scavenging CronJob                                | `0 2 * * *`                  |
| `persistence.enabled`                | Enable persistence using PVC                                                  | `false`                      |
| `persistence.existingClaim`          | Provide an existing PVC                                                       | `nil`                        |
| `persistence.accessMode`             | Access Mode for PVC                                                           | `ReadWriteOnce`              |
| `persistence.size`                   | Size of data volume                                                           | `8Gi`                        |
| `persistence.mountPath`              | Mount path of data volume                                                     | `/var/lib/eventstore`        |
| `persistence.annotations`            | Annotations for PVC                                                           | `{}`                         |
| `resources`                          | CPU/Memory resource request/limits                                            | Memory: `256Mi`, CPU: `100m` |
| `nodeSelector`                       | Node labels for pod assignment                                                | `{}`                         |
| `podAnnotations`                     | Pod annotations                                                               | `{}`                         |
| `tolerations`                        | Toleration labels for pod assignment                                          | `[]`                         |
| `affinity`                           | Affinity settings for pod assignment                                          | `{}`                         |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`
or create a `values.yaml` file and use `helm install --values values.yaml`.

## Additional Resources

- [Event Store Docs](https://eventstore.org/docs/)
- [Event Store Parameters](https://eventstore.org/docs/server/command-line-arguments/index.html#parameter-list)
- [Event Store Docker Container](https://github.com/EventStore/eventstore-docker)
