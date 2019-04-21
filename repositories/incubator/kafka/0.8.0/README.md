# `@helm-charts/incubator-kafka`

Apache Kafka is publish-subscribe messaging rethought as a distributed commit log.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | kafka     |
| Chart Version       | 0.8.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# ------------------------------------------------------------------------------
# Kafka:
# ------------------------------------------------------------------------------

## The StatefulSet installs 3 pods by default
replicas: 3

## The kafka image repository
image: 'confluentinc/cp-kafka'

## The kafka image tag
imageTag: '4.1.1-2'

## Specify a imagePullPolicy
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
imagePullPolicy: 'IfNotPresent'

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
resources:
  {}
  # limits:
  #   cpu: 200m
  #   memory: 1536Mi
  # requests:
  #   cpu: 100m
  #   memory: 1024Mi
kafkaHeapOptions: '-Xmx1G -Xms1G'

## The StatefulSet Update Strategy which Kafka will use when changes are applied.
## ref: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#update-strategies
updateStrategy:
  type: 'OnDelete'

## Start and stop pods in Parallel or OrderedReady (one-by-one.)  Note - Can not change after first release.
## ref: https://kubernetes.io/docs/tutorials/stateful-application/basic-stateful-set/#pod-management-policy
podManagementPolicy: OrderedReady

## If RBAC is enabled on the cluster, the Kafka init container needs a service account
## with permissisions sufficient to apply pod labels
rbac:
  enabled: false

## The name of the storage class which the cluster should use.
# storageClass: default

## The subpath within the Kafka container's PV where logs will be stored.
## This is combined with `persistence.mountPath`, to create, by default: /opt/kafka/data/logs
logSubPath: 'logs'

## Use an alternate scheduler, e.g. "stork".
## ref: https://kubernetes.io/docs/tasks/administer-cluster/configure-multiple-schedulers/
##
# schedulerName:

## Pod scheduling preferences (by default keep pods within a release on separate nodes).
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
## By default we don't set affinity
affinity: {}
## Alternatively, this typical example defines:
## antiAffinity (to keep Kafka pods on separate pods)
## and affinity (to encourage Kafka pods to be collocated with Zookeeper pods)
# affinity:
#   podAntiAffinity:
#     requiredDuringSchedulingIgnoredDuringExecution:
#     - labelSelector:
#         matchExpressions:
#         - key: app
#           operator: In
#           values:
#           - kafka
#       topologyKey: "kubernetes.io/hostname"
#   podAffinity:
#     preferredDuringSchedulingIgnoredDuringExecution:
#      - weight: 50
#        podAffinityTerm:
#          labelSelector:
#            matchExpressions:
#            - key: app
#              operator: In
#              values:
#                - zookeeper
#          topologyKey: "kubernetes.io/hostname"

## Node labels for pod assignment
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
nodeSelector: {}

## Readiness probe config.
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/
##
readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
  successThreshold: 1
  failureThreshold: 3

## Period to wait for broker graceful shutdown (sigterm) before pod is killed (sigkill)
## ref: https://kubernetes-v1-4.github.io/docs/user-guide/production-pods/#lifecycle-hooks-and-termination-notice
## ref: https://kafka.apache.org/10/documentation.html#brokerconfigs controlled.shutdown.*
terminationGracePeriodSeconds: 60

# Tolerations for nodes that have taints on them.
# Useful if you want to dedicate nodes to just run kafka
# https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
tolerations: []
# tolerations:
# - key: "key"
#   operator: "Equal"
#   value: "value"
#   effect: "NoSchedule"

## External access.
##
external:
  enabled: false
  servicePort: 19092
  firstListenerPort: 31090
  domain: cluster.local
  init:
    image: 'lwolf/kubectl_deployer'
    imageTag: '0.4'
    imagePullPolicy: 'IfNotPresent'

## Configuration Overrides. Specify any Kafka settings you would like set on the StatefulSet
## here in map format, as defined in the official docs.
## ref: https://kafka.apache.org/documentation/#brokerconfigs
##
configurationOverrides:
  'offsets.topic.replication.factor': 3
  # "auto.leader.rebalance.enable": true
  # "auto.create.topics.enable": true
  # "controlled.shutdown.enable": true
  # "controlled.shutdown.max.retries": 100
  ## Options required for external access via NodePort
  ## ref:
  ## - http://kafka.apache.org/documentation/#security_configbroker
  ## - https://cwiki.apache.org/confluence/display/KAFKA/KIP-103%3A+Separation+of+Internal+and+External+traffic
  ##
  ## Setting "advertised.listeners" here appends to "PLAINTEXT://${POD_IP}:9092,"
  # "advertised.listeners": |-
  #   EXTERNAL://kafka.cluster.local:$((31090 + ${KAFKA_BROKER_ID}))
  # "listener.security.protocol.map": |-
  #   PLAINTEXT:PLAINTEXT,EXTERNAL:PLAINTEXT

## A collection of additional ports to expose on brokers (formatted as normal containerPort yaml)
# Useful when the image exposes metrics (like prometheus, etc.) through a javaagent instead of a sidecar
additionalPorts: {}

## Persistence configuration. Specify if and how to persist data to a persistent volume.
##
persistence:
  enabled: true

  ## The size of the PersistentVolume to allocate to each Kafka Pod in the StatefulSet. For
  ## production servers this number should likely be much larger.
  ##
  size: '1Gi'

  ## The location within the Kafka container where the PV will mount its storage and Kafka will
  ## store its logs.
  ##
  mountPath: '/opt/kafka/data'

  ## Kafka data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass:

jmx:
  ## Rules to apply to the Prometheus JMX Exporter.  Note while lots of stats have been cleaned and exposed,
  ## there are still more stats to clean up and expose, others will never get exposed.  They keep lots of duplicates
  ## that can be derived easily.  The configMap in this chart cleans up the metrics it exposes to be in a Prometheus
  ## format, eg topic, broker are labels and not part of metric name. Improvements are gladly accepted and encouraged.
  configMap:
    ## Allows disabling the default configmap, note a configMap is needed
    enabled: true

    ## Allows setting values to generate confimap
    ## To allow all metrics through (warning its crazy excessive) comment out below `overrideConfig` and set
    ## `whitelistObjectNames: []`
    overrideConfig:
      {}
      # jmxUrl: service:jmx:rmi:///jndi/rmi://127.0.0.1:5555/jmxrmi
      # lowercaseOutputName: true
      # lowercaseOutputLabelNames: true
      # ssl: false
      # rules:
      # - pattern: ".*"

    ## If you would like to supply your own ConfigMap for JMX metrics, supply the name of that
    ## ConfigMap as an `overrideName` here.
    overrideName: ''

  ## Port the jmx metrics are exposed in native jmx format, not in Prometheus format
  port: 5555

  ## JMX Whitelist Objects, can be set to control which JMX metrics are exposed.  Only whitelisted
  ## values will be exposed via JMX Exporter.  They must also be exposed via Rules.  To expose all metrics
  ## (warning its crazy excessive and they aren't formatted in a prometheus style) (1) `whitelistObjectNames: []`
  ## (2) commented out above `overrideConfig`.
  whitelistObjectNames: # []
    - kafka.controller:*
    - kafka.server:*
    - java.lang:*
    - kafka.network:*
    - kafka.log:*

## Prometheus Exporters / Metrics
##
prometheus:
  ## Prometheus JMX Exporter: exposes the majority of Kafkas metrics
  jmx:
    enabled: false

    ## The image to use for the metrics collector
    image: solsson/kafka-prometheus-jmx-exporter@sha256

    ## The image tag to use for the metrics collector
    imageTag: a23062396cd5af1acdf76512632c20ea6be76885dfc20cd9ff40fb23846557e8

    ## Interval at which Prometheus scrapes metrics, note: only used by Prometheus Operator
    interval: 10s

    ## Port jmx-exporter exposes Prometheus format metrics to scrape
    port: 5556

    resources:
      {}
      # limits:
      #   cpu: 200m
      #   memory: 1Gi
      # requests:
      #   cpu: 100m
      #   memory: 100Mi

  ## Prometheus Kafka Exporter: exposes complimentary metrics to JMX Exporter
  kafka:
    enabled: false

    ## The image to use for the metrics collector
    image: danielqsj/kafka-exporter

    ## The image tag to use for the metrics collector
    imageTag: v1.0.1

    ## Interval at which Prometheus scrapes metrics, note: only used by Prometheus Operator
    interval: 10s

    ## Port kafka-exporter exposes for Prometheus to scrape metrics
    port: 9308

    ## Resource limits
    resources: {}
  #      limits:
  #        cpu: 200m
  #        memory: 1Gi
  #      requests:
  #        cpu: 100m
  #        memory: 100Mi

  operator:
    ## Are you using Prometheus Operator?
    enabled: false

    serviceMonitor:
      # Namespace Prometheus is installed in
      namespace: monitoring

      ## Defaults to whats used if you follow CoreOS [Prometheus Install Instructions](https://github.com/coreos/prometheus-operator/tree/master/helm#tldr)
      ## [Prometheus Selector Label](https://github.com/coreos/prometheus-operator/blob/master/helm/prometheus/templates/prometheus.yaml#L65)
      ## [Kube Prometheus Selector Label](https://github.com/coreos/prometheus-operator/blob/master/helm/kube-prometheus/values.yaml#L298)
      selector:
        prometheus: kube-prometheus

## Topic creation and configuration.
## The job will be run on a deployment only when the config has been changed.
## - If 'partitions' and 'replicationFactor' are specified we create the topic (with --if-not-exists.)
## - If 'partitions' is specified we 'alter' the number of partitions. This will
## silently and safely fail if the new setting isn’t strictly larger than the old (i.e. a NOOP.) Do be aware of the
## implications for keyed topics (ref: https://docs.confluent.io/current/kafka/post-deployment.html#admin-operations)
## - If 'defaultConfig' is specified it's deleted from the topic configuration. If it isn't present,
## it will silently and safely fail.
## - If 'config' is specified it's added to the topic configuration.
##
topics:
  []
  # - name: myExistingTopicConfig
  #   config: "cleanup.policy=compact,delete.retention.ms=604800000"
  # - name: myExistingTopicPartitions
  #   partitions: 8
  # - name: myNewTopicWithConfig
  #   partitions: 8
  #   replicationFactor: 3
  #   defaultConfig: "segment.bytes,segment.ms"
  #   config: "cleanup.policy=compact,delete.retention.ms=604800000"

# ------------------------------------------------------------------------------
# Zookeeper:
# ------------------------------------------------------------------------------

zookeeper:
  ## If true, install the Zookeeper chart alongside Kafka
  ## ref: https://github.com/kubernetes/charts/tree/master/incubator/zookeeper
  enabled: true

  ## Configure Zookeeper resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  resources: ~

  ## The JVM heap size to allocate to Zookeeper
  heap: '1G'

  persistence:
    enabled: false
    ## The amount of PV storage allocated to each Zookeeper pod in the statefulset
    # size: "2Gi"

  ## Specify a Zookeeper imagePullPolicy
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  imagePullPolicy: 'IfNotPresent'

  ## If the Zookeeper Chart is disabled a URL and port are required to connect
  url: ''
  port: 2181

  ## Pod scheduling preferences (by default keep pods within a release on separate nodes).
  ## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
  ## By default we don't set affinity:
  affinity: {} # Criteria by which pod label-values influence scheduling for zookeeper pods.
  # podAntiAffinity:
  #   requiredDuringSchedulingIgnoredDuringExecution:
  #     - topologyKey: "kubernetes.io/hostname"
  #       labelSelector:
  #         matchLabels:
  #           release: zookeeper
```

</details>

---

# Apache Kafka Helm Chart

This is an implementation of Kafka StatefulSet found here:

- https://github.com/Yolean/kubernetes-kafka

## Pre Requisites:

- Kubernetes 1.3 with alpha APIs enabled and support for storage classes

- PV support on underlying infrastructure

- Requires at least `v2.0.0-beta.1` version of helm to support
  dependency management with requirements.yaml

## StatefulSet Details

- https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/

## StatefulSet Caveats

- https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#limitations

## Chart Details

This chart will do the following:

- Implement a dynamically scalable kafka cluster using Kubernetes StatefulSets

- Implement a dynamically scalable zookeeper cluster as another Kubernetes StatefulSet required for the Kafka cluster above

- Expose Kafka protocol endpoints via NodePort services (optional)

### Installing the Chart

To install the chart with the release name `my-kafka` in the default
namespace:

```
$ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
$ helm install --name my-kafka incubator/kafka
```

If using a dedicated namespace(recommended) then make sure the namespace
exists with:

```
$ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
$ kubectl create ns kafka
$ helm install --name my-kafka --set global.namespace=kafka incubator/kafka
```

This chart includes a ZooKeeper chart as a dependency to the Kafka
cluster in its `requirement.yaml` by default. The chart can be customized using the
following configurable parameters:

| Parameter                                      | Description                                                                                                                                                              | Default                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `image`                                        | Kafka Container image name                                                                                                                                               | `confluentinc/cp-kafka`                                            |
| `imageTag`                                     | Kafka Container image tag                                                                                                                                                | `4.0.0`                                                            |
| `imagePullPolicy`                              | Kafka Container pull policy                                                                                                                                              | `IfNotPresent`                                                     |
| `replicas`                                     | Kafka Brokers                                                                                                                                                            | `3`                                                                |
| `component`                                    | Kafka k8s selector key                                                                                                                                                   | `kafka`                                                            |
| `resources`                                    | Kafka resource requests and limits                                                                                                                                       | `{}`                                                               |
| `kafkaHeapOptions`                             | Kafka broker JVM heap options                                                                                                                                            | `-Xmx1G-Xms1G`                                                     |
| `logSubPath`                                   | Subpath under `persistence.mountPath` where kafka logs will be placed.                                                                                                   | `logs`                                                             |
| `schedulerName`                                | Name of Kubernetes scheduler (other than the default)                                                                                                                    | `nil`                                                              |
| `affinity`                                     | Defines affinities and anti-affinities for pods as defined in: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity preferences | `{}`                                                               |
| `tolerations`                                  | List of node tolerations for the pods. https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/                                                           | `[]`                                                               |
| `external.enabled`                             | If True, exposes Kafka brokers via NodePort (PLAINTEXT by default)                                                                                                       | `false`                                                            |
| `external.servicePort`                         | TCP port configured at external services (one per pod) to relay from NodePort to the external listener port.                                                             | '19092'                                                            |
| `external.firstListenerPort`                   | TCP port which is added pod index number to arrive at the port used for NodePort and external listener port.                                                             | '31090'                                                            |
| `external.domain`                              | Domain in which to advertise Kafka external listeners.                                                                                                                   | `cluster.local`                                                    |
| `external.init`                                | External init container settings.                                                                                                                                        | (see `values.yaml`)                                                |
| `rbac.enabled`                                 | Enable a service account and role for the init container to use in an RBAC enabled cluster                                                                               | `false`                                                            |
| `configurationOverrides`                       | `Kafka` [configuration setting][brokerconfigs] overrides in the dictionary format                                                                                        | `{ offsets.topic.replication.factor: 3 }`                          |
| `additionalPorts`                              | Additional ports to expose on brokers. Useful when the image exposes metrics (like prometheus, etc.) through a javaagent instead of a sidecar                            | `{}`                                                               |
| `readinessProbe.initialDelaySeconds`           | Number of seconds before probe is initiated.                                                                                                                             | `30`                                                               |
| `readinessProbe.periodSeconds`                 | How often (in seconds) to perform the probe.                                                                                                                             | `10`                                                               |
| `readinessProbe.timeoutSeconds`                | Number of seconds after which the probe times out.                                                                                                                       | `5`                                                                |
| `readinessProbe.successThreshold`              | Minimum consecutive successes for the probe to be considered successful after having failed.                                                                             | `1`                                                                |
| `readinessProbe.failureThreshold`              | After the probe fails this many times, pod will be marked Unready.                                                                                                       | `3`                                                                |
| `terminationGracePeriodSeconds`                | Wait up to this many seconds for a broker to shut down gracefully, after which it is killed                                                                              | `60`                                                               |
| `updateStrategy`                               | StatefulSet update strategy to use.                                                                                                                                      | `{ type: "OnDelete" }`                                             |
| `podManagementPolicy`                          | Start and stop pods in Parallel or OrderedReady (one-by-one.) Can not change after first release.                                                                        | `OrderedReady`                                                     |
| `persistence.enabled`                          | Use a PVC to persist data                                                                                                                                                | `true`                                                             |
| `persistence.size`                             | Size of data volume                                                                                                                                                      | `1Gi`                                                              |
| `persistence.mountPath`                        | Mount path of data volume                                                                                                                                                | `/opt/kafka/data`                                                  |
| `persistence.storageClass`                     | Storage class of backing PVC                                                                                                                                             | `nil`                                                              |
| `jmx.configMap.enabled`                        | Enable the default ConfigMap for JMX                                                                                                                                     | `true`                                                             |
| `jmx.configMap.overrideConfig`                 | Allows config file to be generated by passing values to ConfigMap                                                                                                        | `{}`                                                               |
| `jmx.configMap.overrideName`                   | Allows setting the name of the ConfigMap to be used                                                                                                                      | `""`                                                               |
| `jmx.port`                                     | The jmx port which JMX style metrics are exposed (note: these are not scrapeable by Prometheus)                                                                          | `5555`                                                             |
| `jmx.whitelistObjectNames`                     | Allows setting which JMX objects you want to expose to via JMX stats to JMX Exporter                                                                                     | (see `values.yaml`)                                                |
| `prometheus.jmx.resources`                     | Allows setting resource limits for jmx sidecar container                                                                                                                 | `{}`                                                               |
| `prometheus.jmx.enabled`                       | Whether or not to expose JMX metrics to Prometheus                                                                                                                       | `false`                                                            |
| `prometheus.jmx.image`                         | JMX Exporter container image                                                                                                                                             | `solsson/kafka-prometheus-jmx-exporter@sha256`                     |
| `prometheus.jmx.imageTag`                      | JMX Exporter container image tag                                                                                                                                         | `a23062396cd5af1acdf76512632c20ea6be76885dfc20cd9ff40fb23846557e8` |
| `prometheus.jmx.interval`                      | Interval that Prometheus scrapes JMX metrics when using Prometheus Operator                                                                                              | `10s`                                                              |
| `prometheus.jmx.port`                          | JMX Exporter Port which exposes metrics in Prometheus format for scraping                                                                                                | `5556`                                                             |
| `prometheus.kafka.enabled`                     | Whether or not to create a separate Kafka exporter                                                                                                                       | `false`                                                            |
| `prometheus.kafka.image`                       | Kafka Exporter container image                                                                                                                                           | `danielqsj/kafka-exporter`                                         |
| `prometheus.kafka.imageTag`                    | Kafka Exporter container image tag                                                                                                                                       | `v1.0.1`                                                           |
| `prometheus.kafka.interval`                    | Interval that Prometheus scrapes Kafka metrics when using Prometheus Operator                                                                                            | `10s`                                                              |
| `prometheus.kafka.port`                        | Kafka Exporter Port which exposes metrics in Prometheus format for scraping                                                                                              | `9308`                                                             |
| `prometheus.kafka.resources`                   | Allows setting resource limits for kafka-exporter pod                                                                                                                    | `{}`                                                               |
| `prometheus.operator`                          | True if using the Prometheus Operator, False if not                                                                                                                      | `false`                                                            |
| `prometheus.operator.serviceMonitor.namespace` | Namespace which Prometheus is running in. Default to kube-prometheus install.                                                                                            | `monitoring`                                                       |
| `prometheus.operator.serviceMonitor.selector`  | Default to kube-prometheus install (CoreOS recommended), but should be set according to Prometheus install                                                               | `{ prometheus: kube-prometheus }`                                  |
| `topics`                                       | List of topics to create & configure. Can specify name, partitions, replicationFactor, config. See values.yaml                                                           | `[]` (Empty list)                                                  |
| `zookeeper.enabled`                            | If True, installs Zookeeper Chart                                                                                                                                        | `true`                                                             |
| `zookeeper.resources`                          | Zookeeper resource requests and limits                                                                                                                                   | `{}`                                                               |
| `zookeeper.heap`                               | JVM heap size to allocate to Zookeeper                                                                                                                                   | `1G`                                                               |
| `zookeeper.storage`                            | Zookeeper Persistent volume size                                                                                                                                         | `2Gi`                                                              |
| `zookeeper.imagePullPolicy`                    | Zookeeper Container pull policy                                                                                                                                          | `IfNotPresent`                                                     |
| `zookeeper.url`                                | URL of Zookeeper Cluster (unneeded if installing Zookeeper Chart)                                                                                                        | `""`                                                               |
| `zookeeper.port`                               | Port of Zookeeper Cluster                                                                                                                                                | `2181`                                                             |
| `zookeeper.affinity`                           | Defines affinities and anti-affinities for pods as defined in: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity preferences | `{}`                                                               |

Specify parameters using `--set key=value[,key=value]` argument to `helm install`

Alternatively a YAML file that specifies the values for the parameters can be provided like this:

```bash
$ helm install --name my-kafka -f values.yaml incubator/kafka
```

### Connecting to Kafka from inside Kubernetes

You can connect to Kafka by running a simple pod in the K8s cluster like this with a configuration like this:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: testclient
  namespace: kafka
spec:
  containers:
    - name: kafka
      image: solsson/kafka:0.11.0.0
      command:
        - sh
        - -c
        - 'exec tail -f /dev/null'
```

Once you have the testclient pod above running, you can list all kafka
topics with:

`kubectl -n kafka exec -ti testclient -- ./bin/kafka-topics.sh --zookeeper my-release-zookeeper:2181 --list`

Where `my-release` is the name of your helm release.

## Extensions

Kafka has a rich ecosystem, with lots of tools. This sections is intended to compile all of those tools for which a corresponding Helm chart has already been created.

- [Schema-registry](https://github.com/kubernetes/charts/tree/master/incubator/schema-registry) - A confluent project that provides a serving layer for your metadata. It provides a RESTful interface for storing and retrieving Avro schemas.

### Connecting to Kafka from outside Kubernetes

Review and optionally override to enable the example text concerned with external access in `values.yaml`.

Once configured, you should be able to reach Kafka via NodePorts, one per replica. In kops where private,
topology is enabled, this feature publishes an internal round-robin DNS record using the following naming
scheme. The external access feature of this chart was tested with kops on AWS using flannel networking.
If you wish to enable external access to Kafka running in kops, your security groups will likely need to
be adjusted to allow non-Kubernetes nodes (e.g. bastion) to access the Kafka external listener port range.

```
{{ .Release.Name }}.{{ .Values.external.domain }}
```

Port numbers for external access used at container and NodePort are unique to each container in the StatefulSet.
Using the default `external.firstListenerPort` number with a `replicas` value of `3`, the following
container and NodePorts will be opened for external access: `31090`, `31091`, `31092`. All of these ports should
be reachable from any host to NodePorts are exposed because Kubernetes routes each NodePort from entry node
to pod/container listening on the same port (e.g. `31091`).

The `external.servicePort` at each external access service (one such service per pod) is a relay toward
the a `containerPort` with a number matching its respective `NodePort`. The range of NodePorts is set, but
should not actually listen, on all Kafka pods in the StatefulSet. As any given pod will listen only one
such port at a time, setting the range at every Kafka pod is a reasonably safe configuration.

## Known Limitations

- Only supports storage options that have backends for persistent volume claims (tested mostly on AWS)
- KAFKA_PORT will be created as an envvar and brokers will fail to start when there is a service named `kafka` in the same namespace. We work around this be unsetting that envvar `unset KAFKA_PORT`.

[brokerconfigs]: https://kafka.apache.org/documentation/#brokerconfigs

## Prometheus Stats

### Prometheus vs Prometheus Operator

Standard Prometheus is the default monitoring option for this chart. This chart also supports the CoreOS Prometheus Operator,
which can provide additional functionality like automatically updating Prometheus and Alert Manager configuration. If you are
interested in installing the Prometheus Operator please see the [CoreOS repository](https://github.com/coreos/prometheus-operator/tree/master/helm) for more information or
read through the [CoreOS blog post introducing the Prometheus Operator](https://coreos.com/blog/the-prometheus-operator.html)

### JMX Exporter

The majority of Kafka statistics are provided via JMX and are exposed via the [Prometheus JMX Exporter](https://github.com/prometheus/jmx_exporter).

The JMX Exporter is a general purpose prometheus provider which is intended for use with any Java application. Because of this, it produces a number of statistics which
may not be of interest. To help in reducing these statistics to their relevant components we have created a curated whitelist `whitelistObjectNames` for the JMX exporter.
This whitelist may be modified or removed via the values configuration.

To accommodate compatibility with the Prometheus metrics, this chart performs transformations of raw JMX metrics. For example, broker names and topics names are incorporated
into the metric name instead of becoming a label. If you are curious to learn more about any default transformations to the chart metrics, please have reference the [configmap template](https://github.com/kubernetes/charts/blob/master/incubator/kafka/templates/jmx-configmap.yaml).

### Kafka Exporter

The [Kafka Exporter](https://github.com/danielqsj/kafka_exporter) is a complimentary metrics exporter to the JMX Exporter. The Kafka Exporter provides additional statistics on Kafka Consumer Groups.
