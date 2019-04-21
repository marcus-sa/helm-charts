# `@helm-charts/stable-datadog`

DataDog Agent

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | datadog |
| Chart Version       | 0.7.1   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for datadog.
image:
  repository: datadog/docker-dd-agent
  tag: latest
  pullPolicy: IfNotPresent

# NB! Normally you need to keep Datadog DaemonSet enabled!
# The exceptional case could be a situation when you need to run
# single DataDog pod per every namespace, but you do not need to
# re-create a DaemonSet for every non-default namespace install.
# Note, that StatsD and DogStatsD work over UDP, so you may not
# get guaranteed delivery of the metrics in Datadog-per-namespace setup!
daemonset:
  enabled: true
  ## Annotations to add to the DaemonSet's Pods
  # podAnnotations:
  #   scheduler.alpha.kubernetes.io/tolerations: '[{"key": "example", "value": "foo"}]'
  ## Allow the DaemonSet to schedule on tainted nodes (requires Kubernetes >= 1.6)
  # tolerations: []

# Apart from DaemonSet, deploy Datadog agent pods and related service for
# applications that want to send custom metrics. Provides DogStasD service.
#
# HINT: If you want to use datadog.collectEvents, keep deployment.replicas set to 1.
deployment:
  enabled: false
  replicas: 1

## deploy the kube-state-metrics deployment
## ref: https://github.com/kubernetes/charts/tree/master/stable/kube-state-metrics
##
kubeStateMetrics.enabled: true

datadog:
  ## You'll need to set this to your Datadog API key before the agent will run.
  ## ref: https://app.datadoghq.com/account/settings#agent/kubernetes
  ##
  # apiKey:

  ## dd-agent container name
  ##
  name: dd-agent

  ## Set logging verbosity.
  ## ref: https://github.com/DataDog/docker-dd-agent#environment-variables
  ##
  logLevel: WARNING

  ## Un-comment this to make each node accept non-local statsd traffic.
  ## ref: https://github.com/DataDog/docker-dd-agent#environment-variables
  ##
  # nonLocalTraffic: true

  ## Set host tags.
  ## ref: https://github.com/DataDog/docker-dd-agent#environment-variables
  ##
  # tags:

  ## Enables event collection from the kubernetes API
  ## ref: https://github.com/DataDog/docker-dd-agent#environment-variables
  ##
  collectEvents: False

  ## Un-comment this to enable APM and tracing, on ports 7777 and 8126
  ## ref: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
  ##
  # apmEnabled: true

  ## The dd-agent supports many environment variables
  ## ref: https://github.com/DataDog/docker-dd-agent#environment-variables
  ##
  # env:
  #   - name:
  #     value:

  ## Provide additonal service definitions
  ## Each key will become a file in /conf.d/auto_conf
  ## ref: https://github.com/DataDog/docker-dd-agent#configuration-files
  ##
  autoconf:
    kubernetes_state.yaml: |-
      docker_images:
        - kube-state-metrics
      init_config:
      instances:
        - kube_state_url: http://%%host%%:%%port%%/metrics

  ## Provide additonal service definitions
  ## Each key will become a file in /conf.d
  ## ref: https://github.com/DataDog/docker-dd-agent#configuration-files
  ##
  # confd:
  #   redisdb.yaml: |-
  #     init_config:
  #     instances:
  #       - host: "name"
  #         port: "6379"

  ## Provide additonal service checks
  ## Each key will become a file in /checks.d
  ## ref: https://github.com/DataDog/docker-dd-agent#configuration-files
  ##
  # checksd:
  #   service.py: |-

  ## dd-agent resource requests and limits
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    requests:
      cpu: 100m
      memory: 128Mi
    limits:
      cpu: 256m
      memory: 512Mi
```

</details>

---

# Datadog

[Datadog](https://www.datadoghq.com/) is a hosted infrastructure monitoring platform.

## Introduction

This chart adds the DataDog Agent to all nodes in your cluster via a DaemonSet. It also depends on the [kube-state-metrics chart](https://github.com/kubernetes/charts/tree/master/stable/kube-state-metrics).

## Prerequisites

- Kubernetes 1.2+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`, retrieve your DataDog API key from your [Agent Installation Instructions](https://app.datadoghq.com/account/settings#agent/kubernetes) and run:

```bash
$ helm install --name my-release \
    --set datadog.apiKey=YOUR-KEY-HERE stable/datadog
```

After a few minutes, you should see hosts and metrics being reported in DataDog.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Datadog chart and their default values.

| Parameter                   | Description                                                  | Default                             |
| --------------------------- | ------------------------------------------------------------ | ----------------------------------- |
| `datadog.apiKey`            | Your Datadog API key                                         | `Nil` You must provide your own key |
| `image.repository`          | The image repository to pull from                            | `datadog/docker-dd-agent`           |
| `image.tag`                 | The image tag to pull                                        | `latest`                            |
| `image.pullPolicy`          | Image pull policy                                            | `IfNotPresent`                      |
| `datadog.env`               | Additional Datadog environment variables                     | `nil`                               |
| `datadog.apmEnabled`        | Enable tracing from the host                                 | `nil`                               |
| `datadog.autoconf`          | Additional Datadog service discovery configurations          | `nil`                               |
| `datadog.checksd`           | Additional Datadog service checks                            | `nil`                               |
| `datadog.confd`             | Additional Datadog service configurations                    | `nil`                               |
| `resources.requests.cpu`    | CPU resource requests                                        | `100m`                              |
| `resources.limits.cpu`      | CPU resource limits                                          | `256m`                              |
| `resources.requests.memory` | Memory resource requests                                     | `128Mi`                             |
| `resources.limits.memory`   | Memory resource limits                                       | `512Mi`                             |
| `kubeStateMetrics.enabled`  | If true, create kube-state-metrics                           | `true`                              |
| `daemonset.podAnnotations`  | Annotations to add to the DaemonSet's Pods                   | `nil`                               |
| `daemonset.tolerations`     | List of node taints to tolerate (requires Kubernetes >= 1.6) | `nil`                               |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
    --set datadog.apiKey=YOUR-KEY-HERE,datadog.logLevel=DEBUG \
    stable/datadog
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/datadog
```

> **Tip**: You can use the default [values.yaml](values.yaml)

### Image tags

Datadog offers a multitude of [tags](https://hub.docker.com/r/datadog/docker-dd-agent/tags/), including alpine based agents and JMX.

### DaemonSet and Deployment

By default installs Datadog agent inside a DaemonSet. You may also use Datadog agent inside a Deployment, if you want to collect Kubernetes API events or send custom metrics to DogStatsD endpoint.

### confd and checksd

The Datadog entrypoint will copy files found in `/conf.d` and `/check.d` to
`/etc/dd-agent/conf.d` and `/etc/dd-agent/check.d` respectively. The keys for
`datadog.confd`, `datadog.autoconf`, and `datadog.checksd` should mirror the content found in their
respective ConfigMaps, ie

```yaml
datadog:
  autoconf:
    redisdb.yaml: |-
      docker_images:
        - redis
        - bitnami/redis
      init_config:
      instances:
        - host: "%%host%%"
          port: "%%port%%"
    jmx.yaml: |-
      docker_images:
        - openjdk
      instance_config:
      instances:
        - host: "%%host%%"
          port: "%%port_0%%"
  confd:
    redisdb.yaml: |-
      init_config:
      instances:
        - host: "outside-k8s.example.com"
          port: 6379
```
