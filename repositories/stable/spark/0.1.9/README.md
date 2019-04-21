# `@helm-charts/stable-spark`

Fast and general-purpose cluster computing system.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | spark  |
| Chart Version       | 0.1.9  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for spark.
# This is a YAML-formatted file.
# Declare name/value pairs to be passed into your templates.
# name: value

Master:
  Name: master
  Image: 'k8s.gcr.io/spark'
  ImageTag: '1.5.1_v3'
  Replicas: 1
  Component: 'spark-master'
  Cpu: '100m'
  Memory: '512Mi'
  ServicePort: 7077
  ContainerPort: 7077
  # Set Master JVM memory. Default 1g
  # DaemonMemory: 1g

WebUi:
  Name: webui
  ServicePort: 8080
  ContainerPort: 8080

Worker:
  Name: worker
  Image: 'k8s.gcr.io/spark'
  ImageTag: '1.5.1_v3'
  Replicas: 3
  Component: 'spark-worker'
  Cpu: '100m'
  Memory: '512Mi'
  ContainerPort: 8081
  # Set Worker JVM memory. Default 1g
  # DaemonMemory: 1g
  # Set how much total memory workers have to give executors
  # ExecutorMemory: 1g

Zeppelin:
  Name: zeppelin
  Image: 'apache/zeppelin'
  ImageTag: '0.7.3'
  Replicas: 1
  Component: 'zeppelin'
  Cpu: '100m'
  ServicePort: 8080
  ContainerPort: 8080
```

</details>

---

# Apache Spark Helm Chart

Apache Spark is a fast and general-purpose cluster computing system including Apache Zeppelin.

- http://spark.apache.org/
- https://zeppelin.apache.org/

Inspired from Helm Classic chart https://github.com/helm/charts

## Chart Details

This chart will do the following:

- 1 x Spark Master with port 8080 exposed on an external LoadBalancer
- 3 x Spark Workers with HorizontalPodAutoscaler to scale to max 10 pods when CPU hits 50% of 100m
- 1 x Zeppelin with port 8080 exposed on an external LoadBalancer
- All using Kubernetes Deployments

## Prerequisites

- Assumes that serviceAccount tokens are available under hostname metadata. (Works on GKE by default) URL -- http://metadata/computeMetadata/v1/instance/service-accounts/default/token

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/spark
```

## Configuration

The following tables lists the configurable parameters of the Spark chart and their default values.

### Spark Master

| Parameter              | Description                   | Default            |
| ---------------------- | ----------------------------- | ------------------ |
| `Master.Name`          | Spark master name             | `spark-master`     |
| `Master.Image`         | Container image name          | `k8s.gcr.io/spark` |
| `Master.ImageTag`      | Container image tag           | `1.5.1_v3`         |
| `Master.Replicas`      | k8s deployment replicas       | `1`                |
| `Master.Component`     | k8s selector key              | `spark-master`     |
| `Master.Cpu`           | container requested cpu       | `100m`             |
| `Master.Memory`        | container requested memory    | `512Mi`            |
| `Master.ServicePort`   | k8s service port              | `7077`             |
| `Master.ContainerPort` | Container listening port      | `7077`             |
| `Master.DaemonMemory`  | Master JVM Xms and Xmx option | `1g`               |

### Spark WebUi

| Parameter             | Description              | Default       |
| --------------------- | ------------------------ | ------------- |
| `WebUi.Name`          | Spark webui name         | `spark-webui` |
| `WebUi.ServicePort`   | k8s service port         | `8080`        |
| `WebUi.ContainerPort` | Container listening port | `8080`        |

### Spark Worker

| Parameter                    | Description                          | Default            |
| ---------------------------- | ------------------------------------ | ------------------ |
| `Worker.Name`                | Spark worker name                    | `spark-worker`     |
| `Worker.Image`               | Container image name                 | `k8s.gcr.io/spark` |
| `Worker.ImageTag`            | Container image tag                  | `1.5.1_v3`         |
| `Worker.Replicas`            | k8s hpa and deployment replicas      | `3`                |
| `Worker.ReplicasMax`         | k8s hpa max replicas                 | `10`               |
| `Worker.Component`           | k8s selector key                     | `spark-worker`     |
| `Worker.Cpu`                 | container requested cpu              | `100m`             |
| `Worker.Memory`              | container requested memory           | `512Mi`            |
| `Worker.ContainerPort`       | Container listening port             | `7077`             |
| `Worker.CpuTargetPercentage` | k8s hpa cpu targetPercentage         | `50`               |
| `Worker.DaemonMemory`        | Worker JVM Xms and Xmx setting       | `1g`               |
| `Worker.ExecutorMemory`      | Worker memory available for executor | `1g`               |

### Zeppelin

| Parameter                | Description              | Default               |
| ------------------------ | ------------------------ | --------------------- |
| `Zeppelin.Name`          | Zeppelin name            | `zeppelin-controller` |
| `Zeppelin.Image`         | Container image name     | `apache/zeppelin`     |
| `Zeppelin.ImageTag`      | Container image tag      | `0.7.3`               |
| `Zeppelin.Replicas`      | k8s deployment replicas  | `1`                   |
| `Zeppelin.Component`     | k8s selector key         | `zeppelin`            |
| `Zeppelin.Cpu`           | container requested cpu  | `100m`                |
| `Zeppelin.ServicePort`   | k8s service port         | `8080`                |
| `Zeppelin.ContainerPort` | Container listening port | `8080`                |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/spark
```

> **Tip**: You can use the default [values.yaml](values.yaml)
