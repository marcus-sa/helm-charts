# `@helm-charts/stable-node-problem-detector`

Installs the node-problem-detector daemonset for monitoring extra attributes on nodes

| Field               | Value                 |
| ------------------- | --------------------- |
| Repository Name     | stable                |
| Chart Name          | node-problem-detector |
| Chart Version       | 1.4.0                 |
| NPM Package Version | 0.1.0                 |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
settings:
  # Custom monitor definitions to add to Node Problem Detector - to be
  # mounted at /custom-config. These are in addition to pre-packaged monitor
  # definitions provided within the default docker image available at /config:
  # https://github.com/kubernetes/node-problem-detector/tree/master/config
  custom_monitor_definitions:
    {}
    # docker-monitor-filelog.json: |
    #   {
    #     "plugin": "filelog",
    #     "pluginConfig": {
    #       "timestamp": "^time=\"(\\S*)\"",
    #       "message": "msg=\"([^\n]*)\"",
    #       "timestampFormat": "2006-01-02T15:04:05.999999999-07:00"
    #     },
    #     "logPath": "/var/log/docker.log",
    #     "lookback": "5m",
    #     "bufferSize": 10,
    #     "source": "docker-monitor",
    #     "conditions": [],
    #     "rules": [
    #       {
    #         "type": "temporary",
    #         "reason": "CorruptDockerImage",
    #         "pattern": "Error trying v2 registry: failed to register layer: rename /var/lib/docker/image/(.+) /var/lib/docker/image/(.+): directory not empty.*"
    #       }
    #     ]
    #   }
  log_monitors:
    - /config/kernel-monitor.json
    - /config/docker-monitor.json
    # An example of activating a custom log monitor definition in
    # Node Problem Detector
    # - /custom-config/docker-monitor-filelog.json
  custom_plugin_monitors: []

hostpath:
  logdir: /var/log/

image:
  repository: k8s.gcr.io/node-problem-detector
  tag: v0.6.1
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

rbac:
  create: true

# Flag to run Node Problem Detector on the host's network. This is typically
# not recommended, but may be useful for certain use cases.
hostNetwork: false

priorityClassName: ''

resources: {}

annotations: {}

tolerations: []

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

affinity: {}
```

</details>

---

# Kubernetes Node Problem Detector

This chart installs a [node-problem-detector](https://github.com/kubernetes/node-problem-detector) daemonset. This tool aims to make various node problems visible to the upstream layers in cluster management stack. It is a daemon which runs on each node, detects node problems and reports them to apiserver.

## TL;DR;

```console
$ helm install stable/node-problem-detector
```

## Prerequisites

- Kubernetes 1.9+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release` and default configuration:

```console
$ helm install --name my-release stable/node-problem-detector
```

## Uninstalling the Chart

To delete the chart:

```console
$ helm delete my-release
```

## Configuration

Custom System log monitor config files can be created, see [here](https://github.com/kubernetes/node-problem-detector/tree/master/config) for examples.

The following table lists the configurable parameters for this chart and their default values.

| Parameter                             | Description                                | Default                                                      |
| ------------------------------------- | ------------------------------------------ | ------------------------------------------------------------ |
| `affinity`                            | Map of node/pod affinities                 | `{}`                                                         |
| `annotations`                         | Optional daemonset annotations             | `{}`                                                         |
| `fullnameOverride`                    | Override the fullname of the chart         | `nil`                                                        |
| `image.pullPolicy`                    | Image pull policy                          | `IfNotPresent`                                               |
| `image.repository`                    | Image                                      | `k8s.gcr.io/node-problem-detector`                           |
| `image.tag`                           | Image tag                                  | `v0.6.1`                                                     |
| `nameOverride`                        | Override the name of the chart             | `nil`                                                        |
| `rbac.create`                         | RBAC                                       | `true`                                                       |
| `hostNetwork`                         | Run pod on host network                    | `false`                                                      |
| `priorityClassName`                   | Priority class name                        | `""`                                                         |
| `resources`                           | Pod resource requests and limits           | `{}`                                                         |
| `settings.custom_monitor_definitions` | User-specified custom monitor definitions  | `{}`                                                         |
| `settings.log_monitors`               | System log monitor config files            | `/config/kernel-monitor.json`, `/config/docker-monitor.json` |
| `settings.custom_plugin_monitors`     | Custom plugin monitor config files         | `[]`                                                         |
| `serviceAccount.create`               | Whether a ServiceAccount should be created | `true`                                                       |
| `serviceAccount.name`                 | Name of the ServiceAccount to create       | Generated value from template                                |
| `tolerations`                         | Optional daemonset tolerations             | `[]`                                                         |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install` or provide a YAML file containing the values for the above parameters:

```console
$ helm install --name my-release stable/node-problem-detector --values values.yaml
```
