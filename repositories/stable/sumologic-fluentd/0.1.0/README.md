# `@helm-charts/stable-sumologic-fluentd`

Sumologic Log Collector

| Field               | Value             |
| ------------------- | ----------------- |
| Repository Name     | stable            |
| Chart Name          | sumologic-fluentd |
| Chart Version       | 0.1.0             |
| NPM Package Version | 0.1.0             |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for sumologic-fluentd.
image:
  name: sumologic/fluentd-kubernetes-sumologic
  tag: latest
  pullPolicy: Always

sumologic:
  ## You'll need to set this to sumo collector, before the agent will run.
  ## ref: https://github.com/SumoLogic/fluentd-kubernetes-sumologic#sumologic
  collectorUrl:

  ## How frequently to push logs to SumoLogic (default 5s)
  ## ref: https://github.com/SumoLogic/fluentd-kubernetes-sumologic#options
  # flushInterval: 5
  ## Increase number of http threads to Sumo. May be required in heavy logging clusters (default 1)
  # numThreads: 1
  ## Set the _sourceName metadata field in SumoLogic. (Default "%{namespace}.%{pod}.%{container}")
  # sourceName:
  ## Set the _sourceCategory metadata field in SumoLogic. (Default "%{namespace}/%{pod_name}")
  # sourceCategory:
  ## Set the prefix, for _sourceCategory metadata. (Default nil)
  # sourceCategoryPrefix:
  ## Used to replace - with another character. (default /)
  # sourceCategoryReplaceDash:
  ## Format to post logs into Sumo. json, json_merge, or text (default json)
  # logFormat: json
  ## Include or exclude Kubernetes metadata such as namespace and pod_name if
  ## using json log format. (default true)
  # kubernetesMeta: true
  ## Files matching this pattern will be ignored by the in_tail plugin, and will
  ## not be sent to Kubernetes or Sumo Logic. This can be a comma separated list.
  ## ref: http://docs.fluentd.org/v0.12/articles/in_tail#excludepath
  # excludePath:
  ## A ruby regex for namespaces. All matching namespaces will be excluded
  ## from Sumo Logic. The logs will still be sent to FluentD
  ## ref: http://rubular.com/
  # excludeNamespaceRegex:
  ## A ruby regex for pods. All matching pods will be excluded from Sumo
  ## Logic. The logs will still be sent to FluentD
  ## ref: http://rubular.com/
  # excludePodRegex:
  ## A ruby regex for containers. All matching containers will be excluded
  ## from Sumo Logic. The logs will still be sent to FluentD
  ## ref: http://rubular.com/
  # excludeContainerRegex:
  ## A ruby regex for hosts. All matching hosts will be excluded from Sumo
  ## Logic. The logs will still be sent to FluentD
  ## ref: http://rubular.com/
  # excludeHostRegex:
  ## Fluentd command line options
  ## ref: http://docs.fluentd.org/v0.12/articles/command-line-option
  # fluentdOpt:

## By default, the daemonset will store position files, for logs tailed, in an
## emptyDir. If you have a directory, on the host, to store pos files, specify
## it here.
persistence:
  enabled: false
  hostPath: /var/run/fluentd-pos

resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 256m
    memory: 256Mi

rbac: {}
```

</details>

---

# SumoLogicFluentd

![sumologic-fluentd](/stable/sumologic-fluentd/sumologic-fluentd.jpg)

[Sumo Logic](https://www.sumologic.com/) is a hosted logging platform.

## Introduction

This chart adds the Sumo Logic Collector to all nodes in your cluster via a
DaemonSet. After you have installed the chart, each pod, deployment, etc. can be
optionally
[configured](https://github.com/SumoLogic/fluentd-kubernetes-sumologic#options)
to specify its log format, source category, source name, or exclude itself from
SumoLogic.

    annotations:
      sumologic.com/format: "text"
      sumologic.com/sourceCategory: "mywebsite/nginx"
      sumologic.com/sourceName: "mywebsite_nginx"
      sumologic.com/exclude: "true"

### Systemd

The current docker image, for [fluentd-kubernetes-sumologic](https://github.com/SumoLogic/fluentd-kubernetes-sumologic)
does not support systemd. The only logs available to SumoLogic are those in
`/var/log/containers`. Logs generated in the `kube-system` namespace can only be
excluded using `EXCLUDE_NAMESPACE` and `EXCLUDE_CONTAINER`. The `EXPORT_PATH`
option is not relevant on a systemd OS.

## Prerequisites

- Kubernetes 1.2+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`, create your Sumo Logic [HTTP Collector](http://help.sumologic.com/Send_Data/Sources/02Sources_for_Hosted_Collectors/HTTP_Source) and run:

```bash
$ helm install --name my-release \
    --set sumologic.collectorUrl=YOUR-URL-HERE stable/sumologic-fluentd
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

The following tables lists the configurable parameters of the sumologic-fluentd chart and their default values.

| Parameter                             | Description                                                                                                     | Default                                  |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `sumologic.collectorUrl`              | An HTTP collector in SumoLogic that the container can send logs to via HTTP                                     | `Nil` You must provide your own          |
| `sumologic.flushInterval`             | How frequently to push logs to sumo, in seconds                                                                 | `5`                                      |
| `sumologic.numThreads`                | The number of http threads sending data to sumo                                                                 | `1`                                      |
| `sumologic.sourceName`                | Set the sumo `_sourceName`                                                                                      | `%{namespace}.%{pod}.%{container}`       |
| `sumologic.sourceCategory`            | Set the sumo `_sourceCategory`                                                                                  | `%{namespace}/%{pod_name}`               |
| `sumologic.sourceCategoryPrefix`      | Define a prefix, for `_sourceCategory`                                                                          | `Nil`                                    |
| `sumologic.sourceCategoryReplaceDash` | Used to replace `-` with another character                                                                      | `/`                                      |
| `sumologic.logFormat`                 | Format to post logs, into sumo (`json`, `json_merge`, or `text`)                                                | `json`                                   |
| `sumologic.kubernetesMeta`            | Include or exclude kubernetes metadata, with `json` format                                                      | `true`                                   |
| `sumologic.excludePath`               | Files in this pattern will not be sent to sumo, ie `"[\"/var/log/containers/*.log\", \"/var/log/*.log\"]`       | `Nil`                                    |
| `sumologic.excludeNamespaceRegex`     | All matching namespaces will not be sent to sumo                                                                | `Nil`                                    |
| `sumologic.excludePodRegex`           | All matching pods will not be sent to sumo                                                                      | `Nil`                                    |
| `sumologic.excludeContainerRegex`     | All matching containers will not be sent to sumo                                                                | `Nil`                                    |
| `sumologic.excludeHostRegex`          | All matching hosts will not be sent to sumo                                                                     | `Nil`                                    |
| `sumologic.fluentdOpt`                | Additional command line options, sent to fluentd                                                                | `Nil`                                    |
| `sumologic.verifySsl`                 | Verify SumoLogic HTTPS certificates                                                                             | `true`                                   |
| `image.name`                          | The image repository and name to pull from                                                                      | `sumologic/fluentd-kubernetes-sumologic` |
| `image.tag`                           | The image tag to pull                                                                                           | `latest`                                 |
| `imagePullPolicy`                     | Image pull policy                                                                                               | `IfNotPresent`                           |
| `persistence.enabled`                 | Boolean value, used to turn on or off fluentd position file persistence, on nodes                               | `false`                                  |
| `persistence.hostPath`                | The path, on each node, to a directory for fluentd pos files. You must create the directory on each node first. | `/var/run/fluentd-pos`                   |
| `resources.requests.cpu`              | CPU resource requests                                                                                           | 100m                                     |
| `resources.limits.cpu`                | CPU resource limits                                                                                             | 256m                                     |
| `resources.requests.memory`           | Memory resource requests                                                                                        | 128Mi                                    |
| `resources.limits.memory`             | Memory resource limits                                                                                          | 256Mi                                    |
| `rbac.serviceAccountName`             | RBAC service account name                                                                                       | {{ fullname }}                           |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
    --set sumologic.collectorUrl=YOUR-URL-HERE \
    stable/sumologic-fluentd
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/sumologic-fluentd
```

> **Tip**: You can use the default [values.yaml](values.yaml)

### Persistence

By default, the fluentd position files will be written to an ephemeral
`emptyDir`. Each time the pods die, new position files will be created, all of
the logs in the cluster will be sent to sumologic again. To avoid unnecessary
re-transmissions, pos directories can be maintained as a `hostPath`. Create a
directory, on each of the nodes, and point `persistence.hostPath` at that
directory.

```bash
$ helm install --name my-release \
    --set sumologic.collectorUrl=URL,persistence.hostPath=/var/run/fluentd \
    stable/sumologic-fluentd
```
