# `@helm-charts/hazelcast-hazelcast-jet`

Hazelcast Jet is an application embeddable, distributed computing engine built on top of Hazelcast In-Memory Data Grid (IMDG). With Hazelcast IMDG providing storage functionality, Hazelcast Jet performs parallel execution to enable data-intensive applications to operate in near real-time.

| Field               | Value         |
| ------------------- | ------------- |
| Repository Name     | hazelcast     |
| Chart Name          | hazelcast-jet |
| Chart Version       | 1.0.3         |
| NPM Package Version | 0.1.0         |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Hazelcast Jet image version
## ref: https://hub.docker.com/r/hazelcast/hazelcast-jet/tags/
##
image:
  # repository is the Hazelcast Jet image name
  repository: 'hazelcast/hazelcast-jet'
  # tag is the Hazelcast Jet image tag
  tag: '3.0'
  # pullPolicy is the Docker image pull policy
  # It's recommended to change this to 'Always' if the image tag is 'latest'
  # ref: http://kubernetes.io/docs/user-guide/images/#updating-images
  #
  pullPolicy: IfNotPresent
  # pullSecrets is an array of docker-registry secret names
  # Secrets must be manually created in the namespace.
  # ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  # pullSecrets:
  # - myRegistryKeySecretName

# Cluster settings
cluster:
  # memberCount is the number Hazelcast Jet members
  memberCount: 2

# Hazelcast Jet properties
jet:
  # rest is a flag used to enable REST endpoints for Hazelcast Jet member
  rest: true
  # javaOpts are additional JAVA_OPTS properties for Hazelcast Jet member
  javaOpts:
  # configurationFiles are Hazelcast Jet configuration files
  configurationFiles:
    hazelcast.xml: |-
      <?xml version="1.0" encoding="UTF-8"?>
      <hazelcast xsi:schemaLocation="http://www.hazelcast.com/schema/config hazelcast-config-3.10.xsd"
                     xmlns="http://www.hazelcast.com/schema/config"
                     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
        <properties>
          <property name="hazelcast.discovery.enabled">true</property>
        </properties>
        <network>
          <join>
            <multicast enabled="false"/>
            <tcp-ip enabled="false" />
            <discovery-strategies>
              <discovery-strategy enabled="true" class="com.hazelcast.kubernetes.HazelcastKubernetesDiscoveryStrategy">
                <properties>
                  <property name="service-name">${serviceName}</property>
                  <property name="namespace">${namespace}</property>
                </properties>
              </discovery-strategy>
            </discovery-strategies>
          </join>
        </network>
      </hazelcast>
    hazelcast-jet.xml: |-
      <?xml version="1.0" encoding="UTF-8"?>
      <hazelcast-jet xsi:schemaLocation="http://www.hazelcast.com/schema/jet-config hazelcast-jet-config-0.8.xsd"
                    xmlns="http://www.hazelcast.com/schema/jet-config"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
          <instance>
              <!-- number of threads in the cooperative thread pool -->
            <cooperative-thread-count>8</cooperative-thread-count>
              <!-- period between flow control packets in milliseconds -->
            <flow-control-period>100</flow-control-period>
              <!-- number of backup copies to configure for Hazelcast IMaps used internally in a Jet job -->
            <backup-count>1</backup-count>
          </instance>
          <!-- custom properties which can be read in the user code -->
          <properties>
            <property name="custom.property">custom property</property>
          </properties>
          <edge-defaults>
              <!-- capacity of the concurrent SPSC queue between each two processors -->
            <queue-size>1024</queue-size>
              <!-- network packet size limit in bytes, only applies to distributed edges -->
            <packet-size-limit>16384</packet-size-limit>
              <!-- receive window size multiplier, only applies to distributed edges -->
            <receive-window-multiplier>3</receive-window-multiplier>
          </edge-defaults>
          <!-- whether metrics collection is enabled -->
          <metrics enabled="true">
              <!-- the number of seconds the metrics will be retained on the instance -->
              <retention-seconds>120</retention-seconds>
              <!-- the metrics collection interval in seconds -->
              <collection-interval-seconds>5</collection-interval-seconds>
              <!-- whether metrics should be collected for data structures. Metrics
                  collection can have some overhead if there is a large number of data
                  structures -->
              <metrics-for-data-structures>false</metrics-for-data-structures>
          </metrics>
      </hazelcast-jet>

# nodeSelector is an array of Hazelcast Node labels for POD assignments
# ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
nodeSelector: {}

gracefulShutdown:
  enabled: true
  maxWaitSeconds: 600

# Hazelcast Liveness probe
livenessProbe:
  # enabled is a flag to used to enable liveness probe
  enabled: true
  # initialDelaySeconds is a delay before liveness probe is initiated
  initialDelaySeconds: 30
  # periodSeconds decides how often to perform the probe
  periodSeconds: 10
  # timeoutSeconds decides when the probe times out
  timeoutSeconds: 5
  # successThreshold is the minimum consecutive successes for the probe to be considered successful after having failed
  successThreshold: 1
  # failureThreshold is the minimum consecutive failures for the probe to be considered failed after having succeeded
  failureThreshold: 3

# Hazelcast Readiness probe
readinessProbe:
  # enabled is a flag to used to enable readiness probe
  enabled: true
  # initialDelaySeconds is a delay before readiness probe is initiated
  initialDelaySeconds: 30
  # periodSeconds decides how often to perform the probe
  periodSeconds: 10
  # timeoutSeconds decides when the probe times out
  timeoutSeconds: 1
  # successThreshold is the minimum consecutive successes for the probe to be considered successful after having failed
  successThreshold: 1
  # failureThreshold is the minimum consecutive failures for the probe to be considered failed after having succeeded
  failureThreshold: 3

# Configure resource requests and limits
# ref: http://kubernetes.io/docs/user-guide/compute-resources/
#
# resources:
#   requests:
#     memory: 256Mi
#     cpu: 100m

# Hazelcast Service properties
service:
  # type defines the Kubernetes service type ('ClusterIP', 'LoadBalancer', or 'NodePort')
  type: ClusterIP
  # port is the Kubernetes service port
  port: 5701
  # clusterIP set to None makes the service headless
  # It is required if DNS Lookup is used (https://github.com/hazelcast/hazelcast-kubernetes#dns-lookup)
  # clusterIP: "None"

# Role-based Access Control
rbac:
  # Specifies whether RBAC resources should be created
  # It is not required if DNS Lookup is used (https://github.com/hazelcast/hazelcast-kubernetes#dns-lookup)
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

# Security Context properties
securityContext:
  # enabled is a flag to enable Security Context
  enabled: true
  # runAsUser is the user ID used to run the container
  runAsUser: 1001
  # fsGroup is the group ID associated with the container
  fsGroup: 1001

# Hazelcast Jet Management Center application properties
managementcenter:
  # enabled is a flag to enable Hazelcast Jet Management Center application
  enabled: true
  ## Hazelcast Jet Management Center image version
  ## ref: https://hub.docker.com/r/hazelcast/hazelcast-jet-management-center/tags/
  ##
  image:
    # repository is the Hazelcast Jet Management Center image name
    repository: 'hazelcast/hazelcast-jet-management-center'
    # tag is the Hazelcast Jet Management Center image tag
    tag: '3.0'
    # pullPolicy is the Docker image pull policy
    # It's recommended to change this to 'Always' if the image tag is 'latest'
    # ref: http://kubernetes.io/docs/user-guide/images/#updating-images
    #
    pullPolicy: IfNotPresent
    # pullSecrets is an array of docker-registry secret names
    # Secrets must be manually created in the namespace.
    # ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
    # pullSecrets:
    # - myRegistryKeySecretName

  # javaOpts are additional JAVA_OPTS properties for Hazelcast Jet Management Center
  javaOpts:

  # licenseKey is the license key for Hazelcast Jet Management Center
  # if not provided, it can be filled in the Management Center web interface
  licenseKey:
  # licenseKeySecretName is the name of the secret where the Hazelcast Jet Management Center License Key is stored (can be used instead of licenseKey)
  # licenseKeySecretName:

  # nodeSelector is an array of Hazelcast Jet Management Center Node labels for POD assignments
  # ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
  nodeSelector: {}

  # configurationFiles are Hazelcast Jet Client configuration files which will be used by Hazelcast Jet Management Center
  configurationFiles:
    hazelcast-client.xml: |-
      <?xml version="1.0" encoding="UTF-8"?>
      <hazelcast-client xsi:schemaLocation="http://www.hazelcast.com/schema/client-config hazelcast-client-config-3.10.xsd"
                        xmlns="http://www.hazelcast.com/schema/client-config"
                        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
        <properties>
          <property name="hazelcast.discovery.enabled">true</property>
        </properties>
        <network>
          <discovery-strategies>
            <discovery-strategy enabled="true" class="com.hazelcast.kubernetes.HazelcastKubernetesDiscoveryStrategy">
              <properties>
                <property name="service-name">${serviceName}</property>
                <property name="namespace">${namespace}</property>
              </properties>
            </discovery-strategy>
          </discovery-strategies>
        </network>
      </hazelcast-client>

  # Configure resource requests and limits
  # ref: http://kubernetes.io/docs/user-guide/compute-resources/
  #
  # resources:
  #   requests:
  #     memory: 256Mi
  #     cpu: 100m

  # Hazelcast Jet Management Center Service properties
  service:
    # type defines the Kubernetes service type ('ClusterIP', 'LoadBalancer', or 'NodePort')
    type: LoadBalancer
    # port is the Kubernetes service port
    port: 8081

  # Hazelcast Jet Management Center Liveness probe
  livenessProbe:
    # enabled is a flag to used to enable liveness probe
    enabled: true
    # initialDelaySeconds is a delay before liveness probe is initiated
    initialDelaySeconds: 30
    # periodSeconds decides how often to perform the probe
    periodSeconds: 10
    # timeoutSeconds decides when the probe times out
    timeoutSeconds: 5
    # successThreshold is the minimum consecutive successes for the probe to be considered successful after having failed
    successThreshold: 1
    # failureThreshold is the minimum consecutive failures for the probe to be considered failed after having succeeded
    failureThreshold: 3

  # Hazelcast Jet Management Center Readiness probe
  readinessProbe:
    # enabled is a flag to used to enable readiness probe
    enabled: true
    # initialDelaySeconds is a delay before readiness probe is initiated
    initialDelaySeconds: 30
    # periodSeconds decides how often to perform the probe
    periodSeconds: 10
    # timeoutSeconds decides when the probe times out
    timeoutSeconds: 1
    # successThreshold is the minimum consecutive successes for the probe to be considered successful after having failed
    successThreshold: 1
    # failureThreshold is the minimum consecutive failures for the probe to be considered failed after having succeeded
    failureThreshold: 3
```

</details>

---

# Hazelcast Jet

[Hazelcast Jet](http://jet.hazelcast.org) is a distributed computing
platform built for high-performance stream processing and fast batch
processing. It embeds Hazelcast In-Memory Data Grid (IMDG) to provide
a lightweight, simple-to-deploy package that includes scalable
in-memory storage.

Visit [jet.hazelcast.org](http://jet.hazelcast.org) to learn more
about the architecture and use cases.

## Quick Start

```bash
$ helm repo add hazelcast https://hazelcast.github.io/charts/
$ helm repo update
$ helm install hazelcast/hazelcast-jet
```

## Introduction

This chart bootstraps a [Hazelcast Jet](https://github.com/hazelcast/hazelcast-jet-docker) and [Hazelcast Jet Management Center](https://github.com/hazelcast/hazelcast-jet-management-center-docker) deployments on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.9+

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release hazelcast/hazelcast-jet
```

The command deploys Hazelcast Jet on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Hazelcast chart and their default values.

| Parameter                                             | Description                                                                                                                  | Default                                     |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `image.repository`                                    | Hazelcast Jet Image name                                                                                                     | `hazelcast/hazelcast-jet`                   |
| `image.tag`                                           | Hazelcast Jet Image tag                                                                                                      | `{VERSION}`                                 |
| `image.pullPolicy`                                    | Image pull policy                                                                                                            | `IfNotPresent`                              |
| `image.pullSecrets`                                   | Specify docker-registry secret names as an array                                                                             | `nil`                                       |
| `cluster.memberCount`                                 | Number of Hazelcast Jet members                                                                                              | 2                                           |
| `jet.rest`                                            | Enable REST endpoints for Hazelcast Jet member                                                                               | `true`                                      |
| `jet.javaOpts`                                        | Additional JAVA_OPTS properties for Hazelcast Jet member                                                                     | `nil`                                       |
| `jet.configurationFiles`                              | Hazelcast configuration files                                                                                                | `{DEFAULT_HAZELCAST_XML}`                   |
| `nodeSelector`                                        | Hazelcast Node labels for pod assignment                                                                                     | `nil`                                       |
| `gracefulShutdown.enabled`                            | Turn on and off Graceful Shutdown                                                                                            | `true`                                      |
| `gracefulShutdown.maxWaitSeconds`                     | Maximum time to wait for the Hazelcast Jet POD to shut down                                                                  | `600`                                       |
| `livenessProbe.enabled`                               | Turn on and off liveness probe                                                                                               | `true`                                      |
| `livenessProbe.initialDelaySeconds`                   | Delay before liveness probe is initiated                                                                                     | `30`                                        |
| `livenessProbe.periodSeconds`                         | How often to perform the probe                                                                                               | `10`                                        |
| `livenessProbe.timeoutSeconds`                        | When the probe times out                                                                                                     | `5`                                         |
| `livenessProbe.successThreshold`                      | Minimum consecutive successes for the probe to be considered successful after having failed                                  | `1`                                         |
| `livenessProbe.failureThreshold`                      | Minimum consecutive failures for the probe to be considered failed after having succeeded.                                   | `3`                                         |
| `readinessProbe.enabled`                              | Turn on and off readiness probe                                                                                              | `true`                                      |
| `readinessProbe.initialDelaySeconds`                  | Delay before readiness probe is initiated                                                                                    | `30`                                        |
| `readinessProbe.periodSeconds`                        | How often to perform the probe                                                                                               | `10`                                        |
| `readinessProbe.timeoutSeconds`                       | When the probe times out                                                                                                     | `1`                                         |
| `readinessProbe.successThreshold`                     | Minimum consecutive successes for the probe to be considered successful after having failed                                  | `1`                                         |
| `readinessProbe.failureThreshold`                     | Minimum consecutive failures for the probe to be considered failed after having succeeded.                                   | `3`                                         |
| `resources`                                           | CPU/Memory resource requests/limits                                                                                          | `nil`                                       |
| `service.type`                                        | Kubernetes service type ('ClusterIP', 'LoadBalancer', or 'NodePort')                                                         | `ClusterIP`                                 |
| `service.port`                                        | Kubernetes service port                                                                                                      | `5701`                                      |
| `rbac.create`                                         | Enable installing RBAC Role authorization                                                                                    | `true`                                      |
| `serviceAccount.create`                               | Enable installing Service Account                                                                                            | `true`                                      |
| `serviceAccount.name`                                 | Name of Service Account, if not set, the name is generated using the fullname template                                       | `nil`                                       |
| `securityContext.enabled`                             | Enables Security Context for Hazelcast Jet and Hazelcast Jet Management Center                                               | `true`                                      |
| `securityContext.runAsUser`                           | User ID used to run the Hazelcast Jet and Hazelcast Jet Management Center containers                                         | `1001`                                      |
| `securityContext.fsGroup`                             | Group ID associated with the Hazelcast Jet and Hazelcast Jet Management Center container                                     | `1001`                                      |
| `managementcenter.enabled`                            | Turn on and off Hazelcast Jet Management Center application                                                                  | `true`                                      |
| `managementcenter.image.repository`                   | Hazelcast Jet Management Center Image name                                                                                   | `hazelcast/hazelcast-jet-management-center` |
| `managementcenter.image.tag`                          | Hazelcast Jet Management Center Image tag (NOTE: must be the same or one minor release greater than Hazelcast image version) | `{VERSION}`                                 |
| `managementcenter.image.pullPolicy`                   | Image pull policy                                                                                                            | `IfNotPresent`                              |
| `managementcenter.image.pullSecrets`                  | Specify docker-registry secret names as an array                                                                             | `nil`                                       |
| `managementcenter.javaOpts`                           | Additional JAVA_OPTS properties for Hazelcast Jet Management Center                                                          | `nil`                                       |
| `managementcenter.licenseKey`                         | License Key for Hazelcast Jet Management Center                                                                              | `nil`                                       |
| `managementcenter.licenseKeySecretName`               | Kubernetes Secret Name, where Jet Management Center License Key is stored (can be used instead of licenseKey)                | `nil`                                       |
| `managementcenter.nodeSelector`                       | Hazelcast Jet Management Center node labels for pod assignment                                                               | `nil`                                       |
| `managementcenter.resources`                          | CPU/Memory resource requests/limits                                                                                          | `nil`                                       |
| `managementcenter.service.type`                       | Kubernetes service type ('ClusterIP', 'LoadBalancer', or 'NodePort')                                                         | `ClusterIP`                                 |
| `managementcenter.service.port`                       | Kubernetes service port                                                                                                      | `8081`                                      |
| `managementcenter.livenessProbe.enabled`              | Turn on and off liveness probe                                                                                               | `true`                                      |
| `managementcenter.livenessProbe.initialDelaySeconds`  | Delay before liveness probe is initiated                                                                                     | `30`                                        |
| `managementcenter.livenessProbe.periodSeconds`        | How often to perform the probe                                                                                               | `10`                                        |
| `managementcenter.livenessProbe.timeoutSeconds`       | When the probe times out                                                                                                     | `5`                                         |
| `managementcenter.livenessProbe.successThreshold`     | Minimum consecutive successes for the probe to be considered successful after having failed                                  | `1`                                         |
| `managementcenter.livenessProbe.failureThreshold`     | Minimum consecutive failures for the probe to be considered failed after having succeeded.                                   | `3`                                         |
| `managementcenter.readinessProbe.enabled`             | Turn on and off readiness probe                                                                                              | `true`                                      |
| `managementcenter.readinessProbe.initialDelaySeconds` | Delay before readiness probe is initiated                                                                                    | `30`                                        |
| `managementcenter.readinessProbe.periodSeconds`       | How often to perform the probe                                                                                               | `10`                                        |
| `managementcenter.readinessProbe.timeoutSeconds`      | When the probe times out                                                                                                     | `1`                                         |
| `managementcenter.readinessProbe.successThreshold`    | Minimum consecutive successes for the probe to be considered successful after having failed                                  | `1`                                         |
| `managementcenter.readinessProbe.failureThreshold`    | Minimum consecutive failures for the probe to be considered failed after having succeeded.                                   | `3`                                         |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set cluster.memberCount=3,serviceAccount.create=false \
    hazelcast/hazelcast-jet
```

The above command sets number of Hazelcast Jet members to 3 and disables REST endpoints.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml hazelcast/hazelcast-jet
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Custom Hazelcast IMDG and Jet configuration

Custom Hazelcast IMDG and Hazelcast Jet configuration can be specified inside `values.yaml`, as the `jet.configurationFiles.hazelcast.xml` and `jet.configurationFiles.hazelcast-jet.xml` properties.

```yaml
jet:
  configurationFiles:
    hazelcast.xml: |-
      <?xml version="1.0" encoding="UTF-8"?>
      <hazelcast xsi:schemaLocation="http://www.hazelcast.com/schema/config hazelcast-config-3.10.xsd"
                     xmlns="http://www.hazelcast.com/schema/config"
                     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

        <properties>
          <property name="hazelcast.discovery.enabled">true</property>
        </properties>
        <network>
          <join>
            <multicast enabled="false"/>
            <tcp-ip enabled="false" />
            <discovery-strategies>
              <discovery-strategy enabled="true" class="com.hazelcast.kubernetes.HazelcastKubernetesDiscoveryStrategy">
                <properties>
                  <property name="service-name">${serviceName}</property>
                  <property name="namespace">${namespace}</property>
                </properties>
              </discovery-strategy>
            </discovery-strategies>
          </join>
        </network>
        <!-- Custom Configuration Placeholder -->
      </hazelcast>
    hazelcast-jet.xml: |-
      <?xml version="1.0" encoding="UTF-8"?>
      <hazelcast-jet xsi:schemaLocation="http://www.hazelcast.com/schema/jet-config hazelcast-jet-config-0.8.xsd"
                    xmlns="http://www.hazelcast.com/schema/jet-config"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
          <instance>
              <!-- number of threads in the cooperative thread pool -->
            <cooperative-thread-count>8</cooperative-thread-count>
              <!-- period between flow control packets in milliseconds -->
            <flow-control-period>100</flow-control-period>
              <!-- number of backup copies to configure for Hazelcast IMaps used internally in a Jet job -->
            <backup-count>1</backup-count>
          </instance>
          <!-- custom properties which can be read in the user code -->
          <properties>
            <property name="custom.property">custom property</property>
          </properties>
          <edge-defaults>
              <!-- capacity of the concurrent SPSC queue between each two processors -->
            <queue-size>1024</queue-size>
              <!-- network packet size limit in bytes, only applies to distributed edges -->
            <packet-size-limit>16384</packet-size-limit>
              <!-- receive window size multiplier, only applies to distributed edges -->
            <receive-window-multiplier>3</receive-window-multiplier>
          </edge-defaults>
          <!-- whether metrics collection is enabled -->
          <metrics enabled="true">
              <!-- the number of seconds the metrics will be retained on the instance -->
              <retention-seconds>120</retention-seconds>
              <!-- the metrics collection interval in seconds -->
              <collection-interval-seconds>5</collection-interval-seconds>
              <!-- whether metrics should be collected for data structures. Metrics
                  collection can have some overhead if there is a large number of data
                  structures -->
              <metrics-for-data-structures>false</metrics-for-data-structures>
          </metrics>
      </hazelcast-jet>
```
