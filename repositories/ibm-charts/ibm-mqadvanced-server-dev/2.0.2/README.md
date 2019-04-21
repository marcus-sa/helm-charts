# `@helm-charts/ibm-charts-ibm-mqadvanced-server-dev`

IBM MQ queue manager

| Field               | Value                     |
| ------------------- | ------------------------- |
| Repository Name     | ibm-charts                |
| Chart Name          | ibm-mqadvanced-server-dev |
| Chart Version       | 2.0.2                     |
| NPM Package Version | 0.1.0                     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# © Copyright IBM Corporation 2017, 2018
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# license must be set to "accept" to accept the terms of the IBM license
license: 'not accepted'

image:
  # repository is the container repository to use, which must contain IBM MQ Advanced for Developers
  repository: ibmcom/mq
  # tag is the tag to use for the container repository
  tag: 9.1.0.0
  # pullSecret is the secret to use when pulling the image from a private registry
  pullSecret:
  # pullPolicy is either IfNotPresent or Always (https://kubernetes.io/docs/concepts/containers/images/)
  pullPolicy: IfNotPresent

# Specify architecture (amd64, ppc64le, s390x) and weight to be  used for scheduling as follows :
#   0 - Do not use
#   1 - Least preferred
#   2 - No preference
#   3 - Most preferred
arch:
  amd64: '2 - No preference'
  ppc64le: '2 - No preference'
  s390x: '2 - No preference'

# persistence section specifies persistence settings which apply to the whole chart
persistence:
  # enabled is whether to use Persistent Volumes or not
  enabled: true
  # useDynamicProvisioning is whether or not to use Storage Classes to dynamically create Persistent Volumes
  useDynamicProvisioning: true

# dataPVC section specifies settings for the main Persistent Volume Claim, which is used for data in /var/mqm
dataPVC:
  # name sets part of the name for this Persistent Volume Claim
  name: 'data'
  ## storageClassName is the name of the Storage Class to use, or an empty string for no Storage Class
  storageClassName: ''
  ## size is the minimum size of the Persistent Volume
  size: 2Gi

service:
  type: ClusterIP

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 500m
    memory: 512Mi

# queueManager section specifies settings for the MQ Queue Manager
queueManager:
  # name allows you to specify the name to use for the queue manager.  Defaults to the Helm release name.
  name:
  # dev section specifies settings for the MQ developer defaults available in the MQ Advanced for Developers image.
  dev:
    # adminPassword sets the password of the admin user
    adminPassword:
    # appPassword sets the password of the app user
    appPassword:

# log section specifies settings for MQ error logs
log:
  format: basic

# metrics section specifies settings for generating queue manager metrics
metrics:
  enabled: true

# livenessProbe section specifies setting for the MQ liveness probe, which checks for a running Queue Manager
livenessProbe:
  # initialDelaySeconds should be raised if your system cannot start the Queue Manager in 60 seconds
  initialDelaySeconds: 60
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 1

# readinessProbe section specifies setting for the MQ readiness probe, which checks when the MQ listener is running
readinessProbe:
  initialDelaySeconds: 10
  periodSeconds: 5
  timeoutSeconds: 3
  failureThreshold: 1

# nameOverride can be set to partially override the name of the resources created by this chart
nameOverride: ''
```

</details>

---

# IBM MQ Advanced for Developers

## Introduction

This chart deploys a single IBM® MQ Advanced for Developers server (Queue Manager). IBM MQ is messaging middleware that simplifies and accelerates the integration of diverse applications and business data across multiple platforms. It uses message queues to facilitate the exchanges of information and offers a single messaging solution for cloud, mobile, Internet of Things (IoT) and on-premises environments.

## Chart Details

This chart will do the following:

- Create a single MQ server (Queue Manager) using a [StatefulSet](http://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/) with exactly one replica. Kubernetes will ensure that if it fails for some reason, it will be restarted, possibly on a different worker node.
- Create a [Service](https://kubernetes.io/docs/concepts/services-networking/service/). This is used to ensure that MQ client applications have a consistent IP address to connect to, regardless of where the Queue Manager is actually running.
- Create a [Secret](https://kubernetes.io/docs/concepts/configuration/secret/). This is used to store passwords used for the default developer configuration.

## Prerequisites

- Kubernetes 1.6 or greater, with beta APIs enabled
- If persistence is enabled (see [configuration](#configuration)), then you either need to create a PersistentVolume, or specify a Storage Class if classes are defined in your cluster.

## Resources Required

This chart uses the following resources by default:

- 0.5 CPU core
- 0.5 Gi memory
- 2 Gi persistent volume.

See the [configuration](#configuration) section for how to configure these values.

## Installing the Chart

You can install the chart with the release name `foo` as follows:

```sh
helm install --name foo stable/ibm-mqadvanced-server-dev --set license=accept
```

This command accepts the [IBM MQ Advanced for Developers license](LICENSES/LICENSE_ILAN) and deploys an MQ Advanced for Developers server on the Kubernetes cluster. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: See all the resources deployed by the chart using `kubectl get all -l release=foo`

### Uninstalling the Chart

You can uninstall/delete the `foo` release as follows:

```sh
helm delete foo
```

The command removes all the Kubernetes components associated with the chart, except any Persistent Volume Claims (PVCs). This is the default behavior of Kubernetes, and ensures that valuable data is not deleted.

## Configuration

The following table lists the configurable parameters of the `ibm-mqadvanced-server-dev` chart and their default values.

| Parameter                            | Description                                                                                                                                                                 | Default                                                                                       |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `license`                            | Set to `accept` to accept the terms of the IBM license                                                                                                                      | `"not accepted"`                                                                              |
| `image.repository`                   | Image full name including repository                                                                                                                                        | `ibmcom/mq`                                                                                   |
| `image.tag`                          | Image tag                                                                                                                                                                   | `9`                                                                                           |
| `image.pullPolicy`                   | Image pull policy                                                                                                                                                           | `IfNotPresent`                                                                                |
| `image.pullSecret`                   | Image pull secret, if you are using a private Docker registry                                                                                                               | `nil`                                                                                         |
| `arch.amd64`                         | Preference for installation on worker nodes with the `amd64` CPU architecture. One of: "0 - Do not use", "1 - Least preferred", "2 - No preference", "3 - Most preferred"   | `2 - No preference` - worker node is chosen by scheduler                                      |
| `arch.ppc64le`                       | Preference for installation on worker nodes with the `ppc64le` CPU architecture. One of: "0 - Do not use", "1 - Least preferred", "2 - No preference", "3 - Most preferred" | `2 - No preference` - worker node is chosen by scheduler                                      |
| `arch.s390x`                         | Preference for installation on worker nodes with the `s390x` CPU architecture. One of: "0 - Do not use", "1 - Least preferred", "2 - No preference", "3 - Most preferred"   | `2 - No preference` - worker node is chosen by scheduler                                      |
| `persistence.enabled`                | Use persistent volumes for all defined volumes                                                                                                                              | `true`                                                                                        |
| `persistence.useDynamicProvisioning` | Use dynamic provisioning (storage classes) for all volumes                                                                                                                  | `true`                                                                                        |
| `dataPVC.name`                       | Suffix for the PVC name                                                                                                                                                     | `"data"`                                                                                      |
| `dataPVC.storageClassName`           | Storage class of volume for main MQ data (under `/var/mqm`)                                                                                                                 | `""`                                                                                          |
| `dataPVC.size`                       | Size of volume for main MQ data (under `/var/mqm`)                                                                                                                          | `2Gi`                                                                                         |
| `service.name`                       | Name of the Kubernetes service to create                                                                                                                                    | `"qmgr"`                                                                                      |
| `service.type`                       | Kubernetes service type exposing ports, e.g. `NodePort`                                                                                                                     | `ClusterIP`                                                                                   |
| `metrics.enabled`                    | Enable Prometheus metrics for the Queue Manager                                                                                                                             | `true`                                                                                        |
| `resources.limits.cpu`               | Kubernetes CPU limit for the Queue Manager container                                                                                                                        | `500m`                                                                                        |
| `resources.limits.memory`            | Kubernetes memory limit for the Queue Manager container                                                                                                                     | `512Mi`                                                                                       |
| `resources.requests.cpu`             | Kubernetes CPU request for the Queue Manager container                                                                                                                      | `500m`                                                                                        |
| `resources.requests.memory`          | Kubernetes memory request for the Queue Manager container                                                                                                                   | `512Mi`                                                                                       |
| `queueManager.name`                  | MQ Queue Manager name                                                                                                                                                       | Helm release name                                                                             |
| `queueManager.dev.adminPassword`     | Developer defaults - administrator password                                                                                                                                 | Random generated string. See the notes that appear when you install for how to retrieve this. |
| `queueManager.dev.appPassword`       | Developer defaults - app password                                                                                                                                           | `nil` (no password required to connect an MQ client)                                          |
| `nameOverride`                       | Set to partially override the resource names used in this chart                                                                                                             | `ibm-mq`                                                                                      |
| `livenessProbe.initialDelaySeconds`  | The initial delay before starting the liveness probe. Useful for slower systems that take longer to start the Queue Manager.                                                | 60                                                                                            |
| `livenessProbe.periodSeconds`        | How often to run the probe                                                                                                                                                  | 10                                                                                            |
| `livenessProbe.timeoutSeconds`       | Number of seconds after which the probe times out                                                                                                                           | 5                                                                                             |
| `livenessProbe.failureThreshold`     | Minimum consecutive failures for the probe to be considered failed after having succeeded                                                                                   | 1                                                                                             |
| `readinessProbe.initialDelaySeconds` | The initial delay before starting the readiness probe                                                                                                                       | 10                                                                                            |
| `readinessProbe.periodSeconds`       | How often to run the probe                                                                                                                                                  | 5                                                                                             |
| `readinessProbe.timeoutSeconds`      | Number of seconds after which the probe times out                                                                                                                           | 3                                                                                             |
| `readinessProbe.failureThreshold`    | Minimum consecutive failures for the probe to be considered failed after having succeeded                                                                                   | 1                                                                                             |
| `log.format`                         | Error log format on container's console. Either `json` or `basic`                                                                                                           | `basic`                                                                                       |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart.

> **Tip**: You can use the default [values.yaml](values.yaml)

## Storage

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) for the storage of MQ configuration data and messages. By using a Persistent Volume based on network-attached storage, Kubernetes can re-schedule the MQ server onto a different worker node. You should not use "hostPath" or "local" volumes, because this will not allow moving between nodes.

Performance requirements will vary widely based on workload, but as a guideline, use a Storage Class which allows for at least 200 IOPS (based on 16 KB block size with a 50/50 read/write mix).

## Limitations

It is not generally recommended that you change the number of replicas in the StatefulSet from the default value of 1. Setting the number of replicas creates multiple Queue Managers. The recommended way to scale MQ is by deploying this chart multiple times and connecting the Queue Managers together using MQ configuration — see [Architectures based on multiple queue managers](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_9.0.0/com.ibm.mq.pla.doc/q004720_.htm). If you choose to set a different number of replicas on the StatefulSet, connections to each Queue Manager will be routed via a single IP address from the Kubernetes Service. Connections to multiple replicas via a Service are load balanced, typically on a round-robin basis. If you do this, you need to take great care not to create an affinity between an MQ client and server, because a client might get disconnected, and then re-connect to a different server. See Chapter 7 of the [IBM MQ as a Service Redpaper](https://www.redbooks.ibm.com/redpapers/pdfs/redp5209.pdf)

It is not recommended to change the number of replicas in the StatefulSet after initial deployment. This will cause the addition or deletion of Queue Managers, which can result in loss of messages.

## Documentation

### JSON log output

By default, the MQ container output for the MQ Advanced for Developers image is in a basic human-readable format. You can change this to JSON format, to better integrate with log aggregation services.

### Connecting to the web console

The MQ Advanced for Developers image includes the MQ web server. The web server runs the web console, and the MQ REST APIs. By default, the MQ server deployed by this chart is accessible via a `ClusterIP` [Service](https://kubernetes.io/docs/concepts/services-networking/service/), which is only accessible from within the Kubernetes cluster. If you want to access the web console from a web browser, then you need to select a different type of Service. For example, a `NodePort` service will expose the web console port on each worker node.

## Copyright

© Copyright IBM Corporation 2017, 2018
