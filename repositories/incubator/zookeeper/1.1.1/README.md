# `@helm-charts/incubator-zookeeper`

Centralized service for maintaining configuration information, naming, providing distributed synchronization, and providing group services.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | zookeeper |
| Chart Version       | 1.1.1     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## As weighted quorums are not supported, it is imperative that an odd number of replicas
## be chosen. Moreover, the number of replicas should be either 1, 3, 5, or 7.
##
## ref: https://github.com/kubernetes/contrib/tree/master/statefulsets/zookeeper#stateful-set
replicaCount: 3 # Desired quantity of ZooKeeper pods. This should always be (1,3,5, or 7)

podDisruptionBudget:
  maxUnavailable: 1 # Limits how many Zokeeper pods may be unavailable due to voluntary disruptions.

terminationGracePeriodSeconds: 1800 # Duration in seconds a Zokeeper pod needs to terminate gracefully.

## OnDelete requires you to manually delete each pod when making updates.
## This approach is at the moment safer than RollingUpdate because replication
## may be incomplete when replication source pod is killed.
##
## ref: http://blog.kubernetes.io/2017/09/kubernetes-statefulsets-daemonsets.html
updateStrategy:
  type: OnDelete # Pods will only be created when you manually delete old pods.

## refs:
## - https://github.com/kubernetes/contrib/tree/master/statefulsets/zookeeper
## - https://github.com/kubernetes/contrib/blob/master/statefulsets/zookeeper/Makefile#L1
image:
  repository: gcr.io/google_samples/k8szk # Container image repository for zookeeper container.
  tag: v3 # Container image tag for zookeeper container.
  pullPolicy: IfNotPresent # Image pull criteria for zookeeper container.

service:
  type: ClusterIP # Exposes zookeeper on a cluster-internal IP.
  annotations:
    {} # Arbitrary non-identifying metadata for zookeeper service.
    ## AWS example for use with LoadBalancer service type.
    # external-dns.alpha.kubernetes.io/hostname: zookeeper.cluster.local
    # service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: "true"
    # service.beta.kubernetes.io/aws-load-balancer-internal: "true"
  ports:
    client:
      port: 2181 # Service port number for client port.
      targetPort: client # Service target port for client port.
      protocol: TCP # Service port protocol for client port.

## Headless service.
##
headless:
  annotations: {}

ports:
  client:
    containerPort: 2181 # Port number for zookeeper container client port.
    protocol: TCP # Protocol for zookeeper container client port.
  election:
    containerPort: 3888 # Port number for zookeeper container election port.
    protocol: TCP # Protocol for zookeeper container election port.
  server:
    containerPort: 2888 # Port number for zookeeper container server port.
    protocol: TCP # Protocol for zookeeper container server port.

resources:
  {} # Optionally specify how much CPU and memory (RAM) each zookeeper container needs.
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

priorityClassName: ''

nodeSelector: {} # Node label-values required to run zookeeper pods.

tolerations: [] # Node taint overrides for zookeeper pods.

affinity:
  {} # Criteria by which pod label-values influence scheduling for zookeeper pods.
  # podAntiAffinity:
  #   requiredDuringSchedulingIgnoredDuringExecution:
  #     - topologyKey: "kubernetes.io/hostname"
  #       labelSelector:
  #         matchLabels:
  #           release: zookeeper

podAnnotations:
  {} # Arbitrary non-identifying metadata for zookeeper pods.
  # prometheus.io/scrape: "true"
  # prometheus.io/path: "/metrics"
  # prometheus.io/port: "9141"

podLabels:
  {} # Key/value pairs that are attached to zookeeper pods.
  # team: "developers"
  # service: "zookeeper"

livenessProbe:
  exec:
    command:
      - zkOk.sh
  initialDelaySeconds: 20
  # periodSeconds: 30
  # timeoutSeconds: 30
  # failureThreshold: 6
  # successThreshold: 1

readinessProbe:
  exec:
    command:
      - zkOk.sh
  initialDelaySeconds: 20
  # periodSeconds: 30
  # timeoutSeconds: 30
  # failureThreshold: 6
  # successThreshold: 1

securityContext:
  fsGroup: 1000
  runAsUser: 1000

persistence:
  enabled: true
  ## zookeeper data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 5Gi

## Exporters query apps for metrics and make those metrics available for
## Prometheus to scrape.
exporters:
  jmx:
    enabled: false
    image:
      repository: sscaling/jmx-prometheus-exporter
      tag: 0.3.0
      pullPolicy: IfNotPresent
    config:
      lowercaseOutputName: false
      ## ref: https://github.com/prometheus/jmx_exporter/blob/master/example_configs/zookeeper.yaml
      rules:
        - pattern: "org.apache.ZooKeeperService<name0=ReplicatedServer_id(\\d+)><>(\\w+)"
          name: 'zookeeper_$2'
        - pattern: "org.apache.ZooKeeperService<name0=ReplicatedServer_id(\\d+), name1=replica.(\\d+)><>(\\w+)"
          name: 'zookeeper_$3'
          labels:
            replicaId: '$2'
        - pattern: "org.apache.ZooKeeperService<name0=ReplicatedServer_id(\\d+), name1=replica.(\\d+), name2=(\\w+)><>(\\w+)"
          name: 'zookeeper_$4'
          labels:
            replicaId: '$2'
            memberType: '$3'
        - pattern: "org.apache.ZooKeeperService<name0=ReplicatedServer_id(\\d+), name1=replica.(\\d+), name2=(\\w+), name3=(\\w+)><>(\\w+)"
          name: 'zookeeper_$4_$5'
          labels:
            replicaId: '$2'
            memberType: '$3'
      startDelaySeconds: 30
    env: {}
    resources: {}
    path: /metrics
    ports:
      jmxxp:
        containerPort: 9404
        protocol: TCP
    livenessProbe:
      httpGet:
        path: /metrics
        port: jmxxp
      initialDelaySeconds: 30
      periodSeconds: 15
      timeoutSeconds: 60
      failureThreshold: 8
      successThreshold: 1
    readinessProbe:
      httpGet:
        path: /metrics
        port: jmxxp
      initialDelaySeconds: 30
      periodSeconds: 15
      timeoutSeconds: 60
      failureThreshold: 8
      successThreshold: 1

  zookeeper:
    ## refs:
    ## - https://github.com/carlpett/zookeeper_exporter
    ## - https://hub.docker.com/r/josdotso/zookeeper-exporter/
    ## - https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics/#zookeeper-metrics
    enabled: false
    image:
      repository: josdotso/zookeeper-exporter
      tag: v1.1.2
      pullPolicy: IfNotPresent
    config:
      logLevel: info
      resetOnScrape: 'true'
    env: {}
    resources: {}
    path: /metrics
    ports:
      zookeeperxp:
        containerPort: 9141
        protocol: TCP
    livenessProbe:
      httpGet:
        path: /metrics
        port: zookeeperxp
      initialDelaySeconds: 30
      periodSeconds: 15
      timeoutSeconds: 60
      failureThreshold: 8
      successThreshold: 1
    readinessProbe:
      httpGet:
        path: /metrics
        port: zookeeperxp
      initialDelaySeconds: 30
      periodSeconds: 15
      timeoutSeconds: 60
      failureThreshold: 8
      successThreshold: 1

## Use an alternate scheduler, e.g. "stork".
## ref: https://kubernetes.io/docs/tasks/administer-cluster/configure-multiple-schedulers/
##
# schedulerName:

## ref: https://github.com/kubernetes/contrib/tree/master/statefulsets/zookeeper
env:
  ## Options related to JMX exporter.
  ## ref: https://github.com/apache/zookeeper/blob/master/bin/zkServer.sh#L36
  JMXAUTH: 'false'
  JMXDISABLE: 'false'
  JMXPORT: 1099
  JMXSSL: 'false'

  ## The port on which the server will accept client requests.
  ZK_CLIENT_PORT: 2181

  ## The port on which the ensemble performs leader election.
  ZK_ELECTION_PORT: 3888

  ## The JVM heap size.
  ZK_HEAP_SIZE: 2G

  ## The number of Ticks that an ensemble member is allowed to perform leader
  ## election.
  ZK_INIT_LIMIT: 5

  ## The Log Level that for the ZooKeeper processes logger.
  ## Choices are `TRACE,DEBUG,INFO,WARN,ERROR,FATAL`.
  ZK_LOG_LEVEL: INFO

  ## The maximum number of concurrent client connections that
  ## a server in the ensemble will accept.
  ZK_MAX_CLIENT_CNXNS: 60

  ## The maximum session timeout that the ensemble will allow a client to request.
  ## Upstream default is `20 * ZK_TICK_TIME`
  ZK_MAX_SESSION_TIMEOUT: 40000

  ## The minimum session timeout that the ensemble will allow a client to request.
  ## Upstream default is `2 * ZK_TICK_TIME`.
  ZK_MIN_SESSION_TIMEOUT: 4000

  ## The delay, in hours, between ZooKeeper log and snapshot cleanups.
  ZK_PURGE_INTERVAL: 0

  ## The port on which the leader will send events to followers.
  ZK_SERVER_PORT: 2888

  ## The number of snapshots that the ZooKeeper process will retain if
  ## `ZK_PURGE_INTERVAL` is set to a value greater than `0`.
  ZK_SNAP_RETAIN_COUNT: 3

  ## The number of Tick by which a follower may lag behind the ensembles leader.
  ZK_SYNC_LIMIT: 10

  ## The number of wall clock ms that corresponds to a Tick for the ensembles
  ## internal time.
  ZK_TICK_TIME: 2000

jobs:
  ## ref: http://zookeeper.apache.org/doc/r3.4.10/zookeeperProgrammers.html#ch_zkSessions
  chroots:
    enabled: false
    activeDeadlineSeconds: 300
    backoffLimit: 5
    completions: 1
    config:
      create:
        []
        # - /kafka
        # - /ureplicator
    env: []
    parallelism: 1
    resources: {}
    restartPolicy: Never
```

</details>

---

# incubator/zookeeper

This helm chart provides an implementation of the ZooKeeper [StatefulSet](http://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/) found in Kubernetes Contrib [Zookeeper StatefulSet](https://github.com/kubernetes/contrib/tree/master/statefulsets/zookeeper).

## Prerequisites

- Kubernetes 1.6+
- PersistentVolume support on the underlying infrastructure
- A dynamic provisioner for the PersistentVolumes
- A familiarity with [Apache ZooKeeper 3.4.x](https://zookeeper.apache.org/doc/current/)

## Chart Components

This chart will do the following:

- Create a fixed size ZooKeeper ensemble using a [StatefulSet](http://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/).
- Create a [PodDisruptionBudget](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-disruption-budget/) so kubectl drain will respect the Quorum size of the ensemble.
- Create a [Headless Service](https://kubernetes.io/docs/concepts/services-networking/service/) to control the domain of the ZooKeeper ensemble.
- Create a Service configured to connect to the available ZooKeeper instance on the configured client port.
- Optionally apply a [Pod Anti-Affinity](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#inter-pod-affinity-and-anti-affinity-beta-feature) to spread the ZooKeeper ensemble across nodes.
- Optionally start JMX Exporter and Zookeeper Exporter containers inside Zookeeper pods.
- Optionally create a job which creates Zookeeper chroots (e.g. `/kafka1`).

## Installing the Chart

You can install the chart with the release name `zookeeper` as below.

```console
$ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
$ helm install --name zookeeper incubator/zookeeper
```

If you do not specify a name, helm will select a name for you.

### Installed Components

You can use `kubectl get` to view all of the installed components.

```console{%raw}
$ kubectl get all -l app=zookeeper
NAME:   zookeeper
LAST DEPLOYED: Wed Apr 11 17:09:48 2018
NAMESPACE: default
STATUS: DEPLOYED

RESOURCES:
==> v1beta1/PodDisruptionBudget
NAME       MIN AVAILABLE  MAX UNAVAILABLE  ALLOWED DISRUPTIONS  AGE
zookeeper  N/A            1                1                    2m

==> v1/Service
NAME                TYPE       CLUSTER-IP     EXTERNAL-IP  PORT(S)                     AGE
zookeeper-headless  ClusterIP  None           <none>       2181/TCP,3888/TCP,2888/TCP  2m
zookeeper           ClusterIP  10.98.179.165  <none>       2181/TCP                    2m

==> v1beta1/StatefulSet
NAME       DESIRED  CURRENT  AGE
zookeeper  3        3        2m
```

1. `statefulsets/zookeeper` is the StatefulSet created by the chart.
1. `po/zookeeper-<0|1|2>` are the Pods created by the StatefulSet. Each Pod has a single container running a ZooKeeper server.
1. `svc/zookeeper-headless` is the Headless Service used to control the network domain of the ZooKeeper ensemble.
1. `svc/zookeeper` is a Service that can be used by clients to connect to an available ZooKeeper server.

## Configuration

You can specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml incubator/zookeeper
```

## Default Values

- You can find all user-configurable settings, their defaults and commentary about them in [values.yaml](values.yaml).

## Deep Dive

## Image Details

The image used for this chart is based on Ubuntu 16.04 LTS. This image is larger than Alpine or BusyBox, but it provides glibc, rather than ulibc or mucl, and a JVM release that is built against it. You can easily convert this chart to run against a smaller image with a JVM that is built against that image's libc. However, as far as we know, no Hadoop vendor supports, or has verified, ZooKeeper running on such a JVM.

## JVM Details

The Java Virtual Machine used for this chart is the OpenJDK JVM 8u111 JRE (headless).

## ZooKeeper Details

The ZooKeeper version is the latest stable version (3.4.10). The distribution is installed into /opt/zookeeper-3.4.10. This directory is symbolically linked to /opt/zookeeper. Symlinks are created to simulate a rpm installation into /usr.

## Failover

You can test failover by killing the leader. Insert a key:

```console
$ kubectl exec zookeeper-0 -- /opt/zookeeper/bin/zkCli.sh create /foo bar;
$ kubectl exec zookeeper-2 -- /opt/zookeeper/bin/zkCli.sh get /foo;
```

Watch existing members:

```console
$ kubectl run --attach bbox --image=busybox --restart=Never -- sh -c 'while true; do for i in 0 1 2; do echo zk-${i} $(echo stats | nc <pod-name>-${i}.<headless-service-name>:2181 | grep Mode); sleep 1; done; done';

zk-2 Mode: follower
zk-0 Mode: follower
zk-1 Mode: leader
zk-2 Mode: follower
```

Delete Pods and wait for the StatefulSet controller to bring them back up:

```console
$ kubectl delete po -l app=zookeeper
$ kubectl get po --watch-only
NAME          READY     STATUS    RESTARTS   AGE
zookeeper-0   0/1       Running   0          35s
zookeeper-0   1/1       Running   0         50s
zookeeper-1   0/1       Pending   0         0s
zookeeper-1   0/1       Pending   0         0s
zookeeper-1   0/1       ContainerCreating   0         0s
zookeeper-1   0/1       Running   0         19s
zookeeper-1   1/1       Running   0         40s
zookeeper-2   0/1       Pending   0         0s
zookeeper-2   0/1       Pending   0         0s
zookeeper-2   0/1       ContainerCreating   0         0s
zookeeper-2   0/1       Running   0         19s
zookeeper-2   1/1       Running   0         41s
```

Check the previously inserted key:

```console
$ kubectl exec zookeeper-1 -- /opt/zookeeper/bin/zkCli.sh get /foo
ionid = 0x354887858e80035, negotiated timeout = 30000

WATCHER::

WatchedEvent state:SyncConnected type:None path:null
bar
```

## Scaling

ZooKeeper can not be safely scaled in versions prior to 3.5.x. This chart currently uses 3.4.x. There are manual procedures for scaling a 3.4.x ensemble, but as noted in the [ZooKeeper 3.5.2 documentation](https://zookeeper.apache.org/doc/r3.5.2-alpha/zookeeperReconfig.html) these procedures require a rolling restart, are known to be error prone, and often result in a data loss.

While ZooKeeper 3.5.x does allow for dynamic ensemble reconfiguration (including scaling membership), the current status of the release is still alpha, and 3.5.x is therefore not recommended for production use.

## Limitations

- StatefulSet and PodDisruptionBudget are beta resources.
- Only supports storage options that have backends for persistent volume claims.
