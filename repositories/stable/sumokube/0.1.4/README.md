# `@helm-charts/stable-sumokube`

Sumologic Log Collector

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | sumokube |
| Chart Version       | 0.1.4    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for sumokube.
image:
  name: sumologic/collector
  tag: latest
  pullPolicy: IfNotPresent

sumologic:
  ## You'll need to set this to your Sumologic API access key and access ID
  ## before the agent will run.
  ## ref: https://help.sumologic.com/Manage/Security/Access_Keys
  ##
  # accessId:
  # accessKey:

  collectorName: 'kubernetes-collector'

  ## A full list of configurable JSON source options can be found at:
  ## https://help.sumologic.com/Send_Data/Sources/03Use_JSON_to_Configure_Sources
  # categoryName: "kubernetes"
  # multilineProcessingEnabled:
  # automaticDateParsing:
  # forceTimeZone:
  # pathExpression:

resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 256m
    memory: 256Mi

daemonset:
  tolerations: []
```

</details>

---

# SumoKube ![sumokube](/stable/sumokube/sumokube.jpg)

[Sumo Logic](https://www.sumologic.com/) is a hosted logging platform.

## Introduction

This chart adds the Sumo Logic Collector to all nodes in your cluster via a DaemonSet.

## Prerequisites

- Kubernetes 1.2+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`, retrieve your Sumo Logic Access ID and key from using the instructions found at [Sumo Logic Access Keys](https://help.sumologic.com/Manage/Security/Access_Keys) and run:

```bash
$ helm install --name my-release \
    --set sumologic.accessId=YOUR-ID-HERE,sumologic.accessKey=YOUR-KEY-HERE stable/sumokube
```

After a few minutes, you should see logs available in Sumo Logic.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Sumokube chart and their default values.

| Parameter                              | Description                                                         | Default                             |
| -------------------------------------- | ------------------------------------------------------------------- | ----------------------------------- |
| `sumologic.accessId`                   | Your Sumo Logic access ID key                                       | `Nil` You must provide your own id  |
| `sumologic.accessKey`                  | Your Sumo Logic access key                                          | `Nil` You must provide your own key |
| `sumologic.collectorName`              | Sumo Logic collector name                                           | `kubernetes-collector`              |
| `sumologic.categoryName`               | Source category name                                                | `kubernetes`                        |
| `sumologic.multilineProcessingEnabled` | Enable if working with multi-line messages                          | `false`                             |
| `sumologic.automaticDateParsing`       | Determines if timestamp information is parsed or not                | `true`                              |
| `sumologic.forceTimeZone`              | Force the Source to use a specific time zone                        | `false`                             |
| `sumologic.pathExpression`             | Path to your container logs                                         | `/var/log/containers/*.log`         |
| `image.name`                           | The image repository and name to pull from                          | `sumologic/collector`               |
| `image.tag`                            | The image tag to pull                                               | `latest`                            |
| `imagePullPolicy`                      | Image pull policy                                                   | `IfNotPresent`                      |
| `resources.requests.cpu`               | CPU resource requests                                               | 100m                                |
| `resources.limits.cpu`                 | CPU resource limits                                                 | 256m                                |
| `resources.requests.memory`            | Memory resource requests                                            | 128Mi                               |
| `resources.limits.memory`              | Memory resource limits                                              | 256Mi                               |
| `daemonset.tolerations`                | List of node taints to tolerate (requires Kubernetes >= 1.6)        | []                                  |
| `daemonset.updateStrategy`             | Strategy for applying template changes (requires Kubernetes >= 1.6) | []                                  |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
    --set sumologic.accessId=YOUR-ID-HERE,sumologic.accessKey=YOUR-KEY-HERE,sumologic.categoryName=my-source-category-name \
    stable/sumokube
```

Example of adding daemonset tolerations to run on master nodes. Requires Helm >=2.5

```bash
$ helm install --name my-release \
    --set sumologic.accessId=YOUR-ID-HERE,sumologic.accessKey=YOUR-KEY-HERE,sumologic.categoryName=my-source-category-name,daemonset.tolerations[0].effect=NoSchedule,daemonset.tolerations[0].key=node-role.kubernetes.io/master \
    stable/sumokube
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/sumokube
```

> **Tip**: You can use the default [values.yaml](values.yaml)
