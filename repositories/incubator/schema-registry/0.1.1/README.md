# `@helm-charts/incubator-schema-registry`

Schema Registry provides a serving layer for your metadata. It provides a RESTful interface for storing and retrieving Avro schemas. It stores a versioned history of all schemas, provides multiple compatibility settings and allows evolution of schemas according to the configured compatibility setting. It provides serializers that plug into Kafka clients that handle schema storage and retrieval for Kafka messages that are sent in the Avro format.

| Field               | Value           |
| ------------------- | --------------- |
| Repository Name     | incubator       |
| Chart Name          | schema-registry |
| Chart Version       | 0.1.1           |
| NPM Package Version | 0.1.0           |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for Confluent Schema-Registry
# This is a YAML-formatted file.
# Declare name/value pairs to be passed into your templates.
# name: value

## schema-registry repository
image: 'confluentinc/cp-schema-registry'
## The container tag to use
imageTag: '4.0.0'
## Specify a imagePullPolicy
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
imagePullPolicy: 'IfNotPresent'

## Number of Schema Registry Pods to Deploy
replicaCount: 1

## Schema Registry Settings Overrides
## Configuration Options can be found here: https://docs.confluent.io/current/schema-registry/docs/config.html
configurationOverrides: {}

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
## Confluent has production deployment guidelines here:
## ref: https://github.com/confluentinc/schema-registry/blob/master/docs/deployment.rst
##
resources:
  {}
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

## The port on which the SchemaRegistry will be available and serving requests
servicePort: 8081

## Kafka Settings
kafka:
  ## This is enabled only to allow installations of this chart without arguments
  enabled: true
  ## Install only a single Kafka pod in the StatefulSet
  Replicas: 1
  ## Install only a single Zookeeper pod in the StatefulSet
  zookeeper:
    Servers: 1
  ## If `Kafka.Enabled` is `false`, the Zookeeper url servicing the Kafka cluster must be provided
  zookeeperUrl: ''
  ## If `Kafka.Enabled` is `false`, the Zookeeper port servicing the Kafka cluster must be provided
  zookeeperPort: 2181
```

</details>

---

# Schema-Registry Helm Chart

This helm chart creates a [Confluent Schema-Registry server](https://github.com/confluentinc/schema-registry).

## Prerequisites

- Kubernetes 1.6
- A running Kafka Installation
- A running Zookeeper Installation

## Chart Components

This chart will dot he following:

- Create a Schema-Registry deployment
- Create a Service configured to connect to the available Schema-Registry pods on the configured
  client port.

## Installing the Chart

You can install the chart with the release name `mysr` as below.

```console
$ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
$ helm install --name mysr incubator/schema-registry
```

If you do not specify a name, helm will select a name for you.

### Installed Components

You can use `kubectl get` to view all of the installed components.

```console{%raw}
$ kubectl get all -l app=schema-registry
NAME                          DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deploy/mysr-schema-registry   1         1         1            1           23m

NAME                                DESIRED   CURRENT   READY     AGE
rs/mysr-schema-registry-bcb4c994c   1         1         1         23m

NAME                                      READY     STATUS    RESTARTS   AGE
po/mysr-schema-registry-bcb4c994c-qjqbj   1/1       Running   1          23m
```

1. `deploy/mysr-schema-registry` is the Deployment created by this chart.
1. `rs/mysr-schema-registry-bcb4c994c` is the ReplicaSet created by this Chart's Deployment.
1. `po/mysr-schema-registry-bcb4c994c-qjqbj` is the Pod created by the ReplicaSet under this Chart's Deployment.

## Configuration

You can specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml incubator/schema-registry
```

> **Tip**: You can use the default [values.yaml](values.yaml)

### Parameters

The following table lists the configurable parameters of the SchemaRegistry chart and their default values.

| Parameter                 | Description                                                                                                                                                                                          | Default                           |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `image`                   | The `SchemaRegistry` image repository                                                                                                                                                                | `confluentinc/cp-schema-registry` |
| `imageTag`                | The `SchemaRegistry` image tag                                                                                                                                                                       | `4.0.0`                           |
| `imagePullPolicy`         | Image Pull Policy                                                                                                                                                                                    | `IfNotPresent`                    |
| `replicaCount`            | The number of `SchemaRegistry` Pods in the Deployment                                                                                                                                                | `1`                               |
| `configurationOverrides`  | `SchemaRegistry` [configuration setting](https://github.com/confluentinc/schema-registry/blob/master/docs/config.rst#configuration-options) overrides in the dictionary format `setting.name: value` | `{}`                              |
| `resources`               | CPU/Memory resource requests/limits                                                                                                                                                                  | `{}`                              |
| `servicePort`             | The port on which the SchemaRegistry server will be exposed.                                                                                                                                         | `8081`                            |
| `kafka.enabled`           | If `true`, install Kafka/Zookeeper alongside the `SchemaRegistry`. This is intended for testing and argument-less helm installs of this chart only and should not be used in Production.             | `true`                            |
| `kafka.replicas`          | The number of Kafka Pods to install as part of the `StatefulSet` if `kafka.Enabled` is `true`                                                                                                        | `1`                               |
| `kafka.zookeeper.servers` | The number of Zookeeper Pods to install as part of the `StatefulSet` if `kafka.Enabled` is `true`                                                                                                    | `1`                               |
| `kafka.ZookeeperUrl`      | The URL of the Zookeeper servicing the Kafka installation if `Kafka.Enabled` is `false`                                                                                                              | `""`                              |
| `kafka.ZookeeperPort`     | The Port of the Zookeeper servicing the Kafka installation if `Kafka.Enabled` is `false`                                                                                                             | `2181`                            |
