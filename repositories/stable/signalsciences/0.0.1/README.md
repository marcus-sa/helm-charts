# `@helm-charts/stable-signalsciences`

SignalSciences is a web application firewall. This chart is the installable agent.

| Field               | Value          |
| ------------------- | -------------- |
| Repository Name     | stable         |
| Chart Name          | signalsciences |
| Chart Version       | 0.0.1          |
| NPM Package Version | 0.1.0          |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for signalsciences.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: marc/sigsci-agent
  tag: 3.12.1
  pullPolicy: IfNotPresent

daemonset:
  {}
  ## Annotations to add to the DaemonSet's Pods
  # podAnnotations:
  #   scheduler.alpha.kubernetes.io/tolerations: '[{"key": "example", "value": "foo"}]'
  ## Allow the DaemonSet to schedule on tainted nodes (requires Kubernetes >= 1.6)
  # tolerations: []
  ## Allow the DaemonSet to schedule on selected nodes
  # Ref: https://kubernetes.io/docs/user-guide/node-selection/
  # nodeSelector: {}
  ## Allow the DaemonSet to schedule ussing affinity rules
  # Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
  # affinity: {}
  ## Allow the DaemonSet to perform a rolling update on helm update
  ## ref: https://kubernetes.io/docs/tasks/manage-daemon/update-daemon-set/
  # updateStrategy: RollingUpdate

signalsciences:
  ## You'll need to set this to your agent accessKeyId before the agent will run
  ## ref: https://docs.signalsciences.net/install-guides/#step-1-agent-installation
  ##
  # accessKeyId:

  ## Use existing Secret which stores accessKeyId instead of creating a new one
  # accessKeyIdExistingSecret:

  ## You'll need to set this to your agent secretAccessKey before the agent will run
  ## ref: https://docs.signalsciences.net/install-guides/#step-1-agent-installation
  # secretAccessKey:

  ## Use existing Secret which stores the secretAccessKey instead of creating a new one
  # secretAccessKeyExistingSecret:

  ## Directory to mount and create the shared unix socket file for mdule installation
  socketDir: /var/run/sigsci

  ## Filename of the shared socket file
  socketFile: sigsci.sock

  resources:
    requests:
      cpu: 200m
      memory: 256Mi
    limits:
      cpu: 200m
      memory: 256Mi
```

</details>

---

# SignalSciences

[SignalSciences](https://www.signalsciences.com/) is a hosted web application firewall.

## Introduction

This chart adds the SignalSciences agent to all nodes in your cluster via a DaemonSet. This chart exposes a shared unix socket file on every node for your application code to connect to the agent with.

## Prerequisites

Kubernetes 1.4+.

## Installing the Chart

To install the chart with the release name `my-release`, retrieve your SignalSciences accessKeyId and secretAccessKey from your [Agent Installation Instructions](https://dashboard.signalsciences.net) and run:

```bash
$ helm install --name my-release \
    --set signalsciences.accessKeyId=YOUR-ACCESS-KEY-ID \
    --set signalsciences.secretAccessKey=YOUR-SECRET-ACCESS-KEY \
    stable/signalsciences
```

After a few minutes, you should see the agent in your SignalSciences dashboard.

**Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the SignalSciences chart and their default values.

| Parameter                                      | Description                                                               | Default                                         |
| ---------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------- |
| `signalsciences.accessKeyId`                   | Your SignalSciences accessKeyId                                           | `Nil` You must provide your own accessKeyId     |
| `signalsciences.accessKeyIdExistingSecret`     | If set, use the secret with a provided name instead of creating a new one | `nil`                                           |
| `signalsciences.secretAccessKey`               | Your SignalSciences secretAccessKey                                       | `Nil` You must provide your own secretAccessKey |
| `signalsciences.secretAccessKeyExistingSecret` | If set, use the secret with a provided name instead of creating a new one | `nil`                                           |
| `image.repository`                             | The image repository to pull from                                         | `marc/sigsci-agent`                             |
| `image.tag`                                    | The image tag to pull                                                     | `3.12.1`                                        |
| `image.pullPolicy`                             | Image pull policy                                                         | `IfNotPresent`                                  |
| `signalsciences.resources.requests.cpu`        | CPU resource requests                                                     | `200m`                                          |
| `signalsciences.resources.limits.cpu`          | CPU resource limits                                                       | `200m`                                          |
| `signalsciences.resources.requests.memory`     | Memory resource requests                                                  | `256Mi`                                         |
| `signalsciences.resources.limits.memory`       | Memory resource limits                                                    | `256Mi`                                         |
| `daemonset.podAnnotations`                     | Annotations to add to the DaemonSet's Pods                                | `nil`                                           |
| `daemonset.tolerations`                        | List of node taints to tolerate (requires Kubernetes >= 1.6)              | `nil`                                           |
| `daemonset.nodeSelector`                       | Node selectors                                                            | `nil`                                           |
| `daemonset.affinity`                           | Node affinities                                                           | `nil`                                           |
| `daemonset.updateStrategy`                     | Node affinities                                                           | `nil`                                           |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
    --set signalsciences.accessKeyId=YOUR-ACCESS-KEY-ID,signalsciences.secretAccessKey=YOUR-SECRET-ACCESS-KEY \
    stable/signalsciences
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f my-values.yaml stable/signalsciences
```

**Tip**: You can copy and customize the default [values.yaml](values.yaml)

### Secret

By default, this Chart creates two Secrets and puts the accessKeyId and secretAccessKey in those Secrets.
However, you can use manually created secret by setting the `sginalsciences.accessKeyIdExistingSecret` and `signalsciences.secretAccessKeyExistingSecret` values.
