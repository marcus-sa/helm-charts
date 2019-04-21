# `@helm-charts/incubator-kubewatch`

Kubewatch notifies your slack rooms when changes to your cluster occur

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | kubewatch |
| Chart Version       | 0.2.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
slack:
  # Slack channel to notify
  channel: ''

  # Slack bots token
  # Ref: https://api.slack.com/docs/token-types#bot
  token: ''

# Resouces to watch
resourcesToWatch:
  {}
  # deployment: true
  # replicationcontroller: true
  # replicaset: true
  # daemonset: true
  # services: true
  # pod: true

image:
  repository: 'tuna/kubewatch'
  tag: 'v0.0.3'
  pullPolicy: 'IfNotPresent'

rbac:
  # If true, create & use RBAC resources
  #
  create: false

  # Ignored if rbac.create is true
  #
  serviceAccountName: default

resources:
  {}
  # limits:
  #   cpu: 100m
  #   memory: 300Mi
  # requests:
  #   cpu: 100m
  #   memory: 300Mi

# Affinity for pod assignment
# Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
# affinity: {}

# Tolerations for pod assignment
# Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
tolerations: []

# Node labels for pod assignment
# Ref: https://kubernetes.io/docs/user-guide/node-selection/
nodeSelector: {}

podAnnotations: {}
podLabels: {}
replicaCount: 1
```

</details>

---

# kubewatch

[kubewatch](https://github.com/skippbox/kubewatch) is a Kubernetes watcher that currently publishes notification to Slack. Run it in your k8s cluster, and you will get event notifications in a slack channel.

## TL;DR;

```console
$ helm install incubator/kubewatch
```

## Introduction

This chart bootstraps a kubewatch deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install incubator/kubewatch --name my-release
```

The command deploys kubewatch on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the kubewatch chart and their default values.

| Parameter                 | Description                                                     | Default          |
| ------------------------- | --------------------------------------------------------------- | ---------------- |
| `affinity`                | node/pod affinities                                             | None             |
| `image.repository`        | Image repository                                                | `tuna/kubewatch` |
| `image.tag`               | Image tag                                                       | `v0.0.3`         |
| `image.pullPolicy`        | Image pull policy                                               | `IfNotPresent`   |
| `nodeSelector`            | node labels for pod assignment                                  | `{}`             |
| `podAnnotations`          | annotations to add to each pod                                  | `{}`             |
| `podLabels`               | additional labesl to add to each pod                            | `{}`             |
| `rbac.create`             | If true, create & use RBAC resources                            | `false`          |
| `rbac.serviceAccountName` | existing ServiceAccount to use (ignored if rbac.create=true)    | `default`        |
| `replicaCount`            | desired number of pods                                          | `1`              |
| `resourcesToWatch`        | list of resources which kubewatch should watch and notify slack | `{}`             |
| `resources`               | pod resource requests & limits                                  | `{}`             |
| `slack.channel`           | slack channel to notify                                         | `""`             |
| `slack.token`             | slack API token                                                 | `""`             |
| `tolerations`             | List of node taints to tolerate (requires Kubernetes >= 1.6)    | `[]`             |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install incubator/kubewatch --name my-release \
  --set=slack.channel="#bots",slack.token="XXXX-XXXX-XXXX"
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install incubator/kubewatch --name my-release -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)
