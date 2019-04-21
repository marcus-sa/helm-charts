# `@helm-charts/stable-kafka-manager`

A tool for managing Apache Kafka.

| Field               | Value         |
| ------------------- | ------------- |
| Repository Name     | stable        |
| Chart Name          | kafka-manager |
| Chart Version       | 1.1.2         |
| NPM Package Version | 0.1.0         |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# ------------------------------------------------------------------------------
# Kafka Manager:
# ------------------------------------------------------------------------------

## Service account configuration
## Ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
##
serviceAccount:
  create: true
  ## Define serviceAccount name. Defaults to fully qualified name or "default"
  ## when create is false
  ##
  name: ''

## Specs for the Kafka-manager image
##
image:
  repository: zenko/kafka-manager
  tag: 1.3.3.22
  pullPolicy: IfNotPresent

## Kafka-manager zookeeper hosts. Default to localhost:2181 or
## the bundled zookeeper chart service url if enabled (see below).
## This value can be a template
##
zkHosts: ''

## Clusters to be added through the kafka-manager api
##
clusters:
  ## Name of your cluster
  # - name: "default"
  ## Cluster zookeeper hosts. It will default to the
  ## Kafka-manager zookeeper hosts if not specified
  ##
  # zkHosts: ""
  ## The following parameters can be configured for your cluster.
  ## See '_helpers.tpl' for the default values
  ##
  # kafkaVersion: ""
  # jmxEnabled: ""
  # jmxUser: ""
  # jmxPass: ""
  # jmxSsl: ""
  # logkafkaEnabled: ""
  # pollConsumers: ""
  # filterConsumers: ""
  # activeOffsetCacheEnabled: ""
  # displaySizeEnabled: ""
  # securityProtocol: ""
  ## Additional cluster tunning. It is mandatory that this value exists,
  ## even if it's empty '{}'.
  ##
  # tuning: {}
  # brokerViewUpdatePeriodSeconds:
  # clusterManagerThreadPoolSize:
  # clusterManagerThreadPoolQueueSize:
  # kafkaCommandThreadPoolSize:
  # kafkaCommandThreadPoolQueueSize:
  # logkafkaCommandThreadPoolSize:
  # logkafkaCommandThreadPoolQueueSize:
  # logkafkaUpdatePeriodSeconds:
  # partitionOffsetCacheTimeoutSecs:
  # brokerViewThreadPoolSize:
  # brokerViewThreadPoolQueueSize:
  # offsetCacheThreadPoolSize:
  # offsetCacheThreadPoolQueueSize:
  # kafkaAdminClientThreadPoolSize:
  # kafkaAdminClientThreadPoolQueueSize:
  # kafkaManagedOffsetMetadataCheckMillis:
  # kafkaManagedOffsetGroupCacheSize:
  # kafkaManagedOffsetGroupExpireDays:

## Application secret. Defaults to a random 10-character alphanumeric string
##
applicationSecret: ''

## Basic Auth configuration
##
basicAuth:
  enabled: false
  username: 'admin'
  ## Defaults to a random 10-character alphanumeric string if not set
  ##
  password: ''

## Java runtime options. Passed through the JAVA_OPTS environmental variable
##
javaOptions: ''

## Service configuration
## Ref: http://kubernetes.io/docs/user-guide/services/
##
service:
  type: ClusterIP
  port: 9000

## Ingress configuration
## Ref: https://kubernetes.io/docs/concepts/services-networking/ingress/
##
ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - kafka-manager.local
  tls:
    []
    # - secretName: kafka-manager-tls
    #   hosts:
    #     - kafka-manager.local

## Pod resource requests and limits
## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources: {}
#  limits:
#    cpu: 100m
#    memory: 128Mi
#  requests:
#    cpu: 100m
#    memory: 128Mi

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}

## Tolerations for pod assignment
## Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
##
tolerations: []

## Affinity for pod assignment
## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
##
affinity: {}

# ------------------------------------------------------------------------------
# Zookeeper:
# ------------------------------------------------------------------------------

zookeeper:
  enabled: false

  ## Environmental variables to set in Zookeeper
  ##
  env:
    ## The JVM heap size to allocate to Zookeeper
    ZK_HEAP_SIZE: '1G'

  ## Configure Zookeeper persistence
  persistence:
    enabled: false
```

</details>

---

# Kafka Manager Helm Chart

[Kafka Manager](https://github.com/yahoo/kafka-manager) is a tool for managing [Apache Kafka](http://kafka.apache.org/).

## TL;DR;

```bash
$ helm install stable/kafka-manager
```

## Prerequisites

- Kubernetes 1.9+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/kafka-manager
```

The command deploys Kafka Manager on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Kafka Manager chart and their default values.

| Parameter               | Description                                         | Default                        |
| ----------------------- | --------------------------------------------------- | ------------------------------ |
| `serviceAccount.create` | If true, create a service account for kafka-manager | `true`                         |
| `serviceAccount.name`   | Name of the service account to create or use        | `{{ kafka-manager.fullname }}` |
| `image.repository`      | Container image repository                          | `zenko/kafka-manager`          |
| `image.tag`             | Container image tag                                 | `1.3.3.22`                     |
| `image.pullPolicy`      | Container image pull policy                         | `IfNotPresent`                 |
| `zkHosts`               | Zookeeper hosts required by the kafka-manager       | `localhost:2181`               |
| `clusters`              | Configuration of the clusters to manage             | `{}`                           |
| `applicationSecret`     | Kafka-manager application secret                    | `""`                           |
| `basicAuth.enabled`     | If ture, enable basic authentication                | `false`                        |
| `basicAuth.username`    | Username for basic auth                             | `admin`                        |
| `basicAuth.password`    | Paswword for basic auth                             | `""`                           |
| `javaOptions`           | Java runtime options                                | `""`                           |
| `service.type`          | Kafka-manager service type                          | `ClusterIP`                    |
| `service.port`          | Kafka-manager service port                          | `9000`                         |
| `ingress.enabled`       | If true, create an ingress resource                 | `false`                        |
| `ingress.annotations`   | Optional ingress annotations                        | `{}`                           |
| `ingress.path`          | Ingress path                                        | `/`                            |
| `ingress.hosts`         | Ingress hostnames                                   | `kafka-manager.local`          |
| `ingress.tls`           | Ingress TLS configuration                           | `[]`                           |
| `resources`             | Pod resource requests and limits                    | `{}`                           |
| `nodeSelector`          | Node labels for pod assignment                      | `{}`                           |
| `tolerations`           | Tolerations for pod assignment                      | `[]`                           |
| `affinity`              | Affinity for pod assignment                         | `{}`                           |
| `zookeeper.enabled`     | If true, deploy Zookeeper                           | `false`                        |
| `zookeeper.env`         | Enviromental variables for Zookeeper                | `ZK_HEAP_SIZE: "1G"`           |
| `zookeeper.persistence` | If true, enable persistence for Zookeeper           | `false`                        |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install stable/kafka-manager --name my-release \
    --set ingress.enabled=true
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install stable/kafka-manager --name my-release -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)
