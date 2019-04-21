# `@helm-charts/incubator-kafka`

Apache Kafka is publish-subscribe messaging rethought as a distributed commit log.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | kafka     |
| Chart Version       | 0.4.8     |
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
imageTag: '4.0.0'

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

## The StatefulSet Update Strategy which Kafka will use when changes are applied.
## ref: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#update-strategies
updateStrategy:
  type: 'OnDelete'

## The name of the storage class which the cluster should use.
# storageClass: default

## The subpath within the Kafka container's PV where logs will be stored.
## This is combined with `persistence.mountPath`, to create, by default: /opt/kafka/data/logs
logSubPath: 'logs'

## Use an alternate scheduler, e.g. "stork".
## ref: https://kubernetes.io/docs/tasks/administer-cluster/configure-multiple-schedulers/
##
# schedulerName:

## Pod scheduling preferences.
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
##
affinity: {}

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

## The jmx port to use for brokers.  Will expose both the port and set the KAFKA_JMX_PORT env variable
# jmxPort: 9998

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

# ------------------------------------------------------------------------------
# Zookeeper:
# ------------------------------------------------------------------------------

zookeeper:
  ## If true, install the Zookeeper chart alongside Kafka
  ## ref: https://github.com/kubernetes/charts/tree/master/incubator/zookeeper
  enabled: true

  ## Configure Zookeeper resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  resources: {}

  ## The JVM heap size to allocate to Zookeeper
  heap: '1G'

  ## The amount of PV storage allocated to each Zookeeper pod in the statefulset
  storage: '2Gi'

  ## Specify a Zookeeper imagePullPolicy
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  imagePullPolicy: 'IfNotPresent'

  ## If the Zookeeper Chart is disabled a URL and port are required to connect
  url: ''
  port: 2181
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
$ kubectl create ns kafka
$ helm install --name my-kafka --set global.namespace=kafka incubator/kafka
```

This chart includes a ZooKeeper chart as a dependency to the Kafka
cluster in its `requirement.yaml` by default. The chart can be customized using the
following configurable parameters:

| Parameter                            | Description                                                                                                                                   | Default                                   |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `image`                              | Kafka Container image name                                                                                                                    | `confluentinc/cp-kafka`                   |
| `imageTag`                           | Kafka Container image tag                                                                                                                     | `4.0.0`                                   |
| `imagePullPolicy`                    | Kafka Container pull policy                                                                                                                   | `IfNotPresent`                            |
| `replicas`                           | Kafka Brokers                                                                                                                                 | `3`                                       |
| `component`                          | Kafka k8s selector key                                                                                                                        | `kafka`                                   |
| `resources`                          | Kafka resource requests and limits                                                                                                            | `{}`                                      |
| `logSubPath`                         | Subpath under `persistence.mountPath` where kafka logs will be placed.                                                                        | `logs`                                    |
| `schedulerName`                      | Name of Kubernetes scheduler (other than the default)                                                                                         | `nil`                                     |
| `affinity`                           | Pod scheduling preferences                                                                                                                    | `{}`                                      |
| `tolerations`                        | List of node tolerations for the pods. https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/                                | `[]`                                      |
| `external.enabled`                   | If True, exposes Kafka brokers via NodePort (PLAINTEXT by default)                                                                            | `false`                                   |
| `external.servicePort`               | TCP port configured at external services (one per pod) to relay from NodePort to the external listener port.                                  | '19092'                                   |
| `external.firstListenerPort`         | TCP port which is added pod index number to arrive at the port used for NodePort and external listener port.                                  | '31090'                                   |
| `external.domain`                    | Domain in which to advertise Kafka external listeners.                                                                                        | `cluster.local`                           |
| `external.init`                      | External init container settings.                                                                                                             | (see `values.yaml`)                       |
| `configurationOverrides`             | `Kafka` [configuration setting][brokerconfigs] overrides in the dictionary format                                                             | `{ offsets.topic.replication.factor: 3 }` |
| `jmxPort`                            | The jmx port to use for brokers. Will expose both the port and set the KAFKA_JMX_PORT env variable.                                           | blank                                     |
| `additionalPorts`                    | Additional ports to expose on brokers. Useful when the image exposes metrics (like prometheus, etc.) through a javaagent instead of a sidecar | `{}`                                      |
| `readinessProbe.initialDelaySeconds` | Number of seconds before probe is initiated.                                                                                                  | `30`                                      |
| `readinessProbe.periodSeconds`       | How often (in seconds) to perform the probe.                                                                                                  | `10`                                      |
| `readinessProbe.timeoutSeconds`      | Number of seconds after which the probe times out.                                                                                            | `5`                                       |
| `readinessProbe.successThreshold`    | Minimum consecutive successes for the probe to be considered successful after having failed.                                                  | `1`                                       |
| `readinessProbe.failureThreshold`    | After the probe fails this many times, pod will be marked Unready.                                                                            | `3`                                       |
| `updateStrategy`                     | StatefulSet update strategy to use.                                                                                                           | `{ type: "OnDelete" }`                    |
| `persistence.enabled`                | Use a PVC to persist data                                                                                                                     | `true`                                    |
| `persistence.size`                   | Size of data volume                                                                                                                           | `1Gi`                                     |
| `persistence.mountPath`              | Mount path of data volume                                                                                                                     | `/opt/kafka/data`                         |
| `persistence.storageClass`           | Storage class of backing PVC                                                                                                                  | `nil`                                     |
| `zookeeper.enabled`                  | If True, installs Zookeeper Chart                                                                                                             | `true`                                    |
| `zookeeper.resources`                | Zookeeper resource requests and limits                                                                                                        | `{}`                                      |
| `zookeeper.heap`                     | JVM heap size to allocate to Zookeeper                                                                                                        | `1G`                                      |
| `zookeeper.storage`                  | Zookeeper Persistent volume size                                                                                                              | `2Gi`                                     |
| `zookeeper.imagePullPolicy`          | Zookeeper Container pull policy                                                                                                               | `IfNotPresent`                            |
| `zookeeper.url`                      | URL of Zookeeper Cluster (unneeded if installing Zookeeper Chart)                                                                             | `""`                                      |
| `zookeeper.port`                     | Port of Zookeeper Cluster                                                                                                                     | `2181`                                    |

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

- Topic creation is not automated
- Only supports storage options that have backends for persistent volume claims (tested mostly on AWS)

[brokerconfigs]: https://kafka.apache.org/documentation/#brokerconfigs
