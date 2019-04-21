# `@helm-charts/stable-sumologic-fluentd`

Sumologic Log Collector

| Field               | Value             |
| ------------------- | ----------------- |
| Repository Name     | stable            |
| Chart Name          | sumologic-fluentd |
| Chart Version       | 0.3.0             |
| NPM Package Version | 0.1.0             |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for sumologic-fluentd.
image:
  name: sumologic/fluentd-kubernetes-sumologic
  tag: v1.6
  pullPolicy: IfNotPresent

## Annotations to add to the DaemonSet's Pods
podAnnotations: {}
#  scheduler.alpha.kubernetes.io/tolerations: '[{"key": "example", "value": "foo"}]'

## Allow the DaemonSet to schedule on tainted nodes (requires Kubernetes >= 1.6)
tolerations: []
#   - key: node.alpha.kubernetes.io/role
#     effect: NoSchedule
#     operator: "Exists"

## Allow the DaemonSet to perform a rolling update on helm update
## ref: https://kubernetes.io/docs/tasks/manage-daemon/update-daemon-set/
updateStrategy: OnDelete

sumologic:
  ## You'll need to set this to sumo collector, before the agent will run.
  ## ref: https://github.com/SumoLogic/fluentd-kubernetes-sumologic#sumologic
  collectorUrl: ''

  ## The source of fluentd logs, either file or systemd
  fluentdSource: file

  ## A directory of user-defined fluentd configuration files, which must be in the "*.conf" directory
  ## in the container (Default "/fluentd/conf.d/user")
  fluentdUserConfigDir: ''

  ## Provide user-defined fluentd configuration files
  ## Each key will become a file in `fluentdUserConfigDir`
  ##
  # fluentdUserConfig:
  #   source.systemd.conf: |-
  #     <source>
  #        ...
  #     </source>

  ## How frequently to push logs to SumoLogic (default 5s)
  ## ref: https://github.com/SumoLogic/fluentd-kubernetes-sumologic#options
  # flushInterval: 5

  ## Increase number of http threads to Sumo. May be required in heavy logging clusters (default 1)
  # numThreads: 1

  ## Set the _sourceName metadata field in SumoLogic. (Default "%{namespace}.%{pod}.%{container}")
  sourceName: ''

  ## Set the _sourceHost metadata field in SumoLogic. (Default Nil)
  sourceHost: ''

  ## Set the _sourceCategory metadata field in SumoLogic. (Default "%{namespace}/%{pod_name}")
  sourceCategory: ''

  ## Set the prefix, for _sourceCategory metadata. (Default nil)
  sourceCategoryPrefix: ''

  ## Used to replace - with another character. (default /)
  sourceCategoryReplaceDash: ''

  ## Format to post logs into Sumo. json, json_merge, or text (default json)
  logFormat: json

  ## Include or exclude Kubernetes metadata such as namespace and pod_name if
  ## using json log format. (default true)
  kubernetesMeta: true

  ## A ruby regex for containers. All matching containers will be excluded
  ## from Sumo Logic. The logs will still be sent to FluentD
  ## ref: http://rubular.com/
  ## ref: https://github.com/SumoLogic/fluentd-kubernetes-sumologic#options
  excludeContainerRegex: ''

  ## Files matching this pattern will be ignored by the in_tail plugin, and will
  ## not be sent to Kubernetes or Sumo Logic. This can be a comma separated list.
  ## ref: http://docs.fluentd.org/v0.12/articles/in_tail#excludepath
  excludePath: ''

  ## A ruby regex for hosts. All matching hosts will be excluded from Sumo
  ## Logic. The logs will still be sent to FluentD
  ## ref: http://rubular.com/
  ## ref: https://github.com/SumoLogic/fluentd-kubernetes-sumologic#options
  excludeHostRegex: ''

  ## A ruby regex for namespaces. All matching namespaces will be excluded
  ## from Sumo Logic. The logs will still be sent to FluentD
  ## ref: http://rubular.com/
  ## ref: https://github.com/SumoLogic/fluentd-kubernetes-sumologic#options
  excludeNamespaceRegex: ''

  ## A ruby regex for pods. All matching pods will be excluded from Sumo
  ## Logic. The logs will still be sent to FluentD
  ## ref: http://rubular.com/
  excludePodRegex: ''

  ## A ruby regex for systemd units. All matching facilities will be excluded from
  ## Sumo Logic. The logs will still be sent to FluentD
  ## ref: http://rubular.com/
  ## ref: https://github.com/SumoLogic/fluentd-kubernetes-sumologic#options
  excludeFacilityRegex: ''

  ## A ruby regex for syslog priorities, which are integers represented as
  ## strings. All matching priorities will be excluded from
  ## Sumo Logic. The logs will still be sent to FluentD
  ## ref: http://rubular.com/
  ## ref: https://github.com/SumoLogic/fluentd-kubernetes-sumologic#options
  excludePriorityRegex: ''

  ## A ruby regex for systemd units. All matching hosts will be excluded from
  ## Sumo Logic. The logs will still be sent to FluentD
  ## ref: http://rubular.com/
  ## ref: https://github.com/SumoLogic/fluentd-kubernetes-sumologic#options
  excludeUnitRegex: ''

  ## Fluentd command line options
  ## ref: http://docs.fluentd.org/v0.12/articles/command-line-option
  fluentdOpt: ''

  ## Verify SumoLogic HTTPS certificates (Default true)
  verifySsl: true

  ## The regular expression for the "concat" plugin to use when merging multi-line messages
  ## (Default "/^\w{3} \d{1,2}, \d{4}/", i.e. Julian dates)
  multilineStartRegexp: ''

  ## Start to read the logs from the head of file, not bottom.
  ## Only applies to containers log files. See in_tail doc for more information (Default true)
  readFromHead: true

  ## The character to use to delimit lines within the final concatenated message.
  ## Most multi-line messages contain a newline at the end of each line (Default Nil)
  concatSeparator: ''

  ## Define the path to the Kubernetes Audit Log (Default "/mnt/log/kube-apiserver-audit.log")
  ## ref: https://kubernetes.io/docs/tasks/debug-application-cluster/audit/
  auditLogPath: ''

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

rbac:
  ## If true, create and use RBAC resources
  create: false

  ## Ignored if rbac.create is true
  serviceAccountName: default
```

</details>

---

# SumoLogicFluentd

![sumologic-fluentd](/stable/sumologic-fluentd/sumologic-fluentd.jpg)

[Sumo Logic](https://www.sumologic.com/) is a hosted logging platform.

## Introduction

This chart adds the Sumo Logic Collector to all nodes in your cluster as a
DaemonSet. The image supports fluentd `file` and `systemd` log sources.

After you have installed the chart, each pod, deployment, etc. can be optionally
[configured](https://github.com/SumoLogic/fluentd-kubernetes-sumologic#options)
to specify its log format, source category, source name, or exclude itself from
SumoLogic.

### Configure an individual pod

    annotations:
      sumologic.com/format: "text"
      sumologic.com/sourceCategory: "mywebsite/nginx"
      sumologic.com/sourceName: "mywebsite_nginx"

### Prevent an individual pod from logging

    annotations:
      sumologic.com/exclude: "true"

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

| Parameter                             | Description                                                                                                                                     | Default                                      |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `podAnnotations`                      | Annotations to add to the DaemonSet's Pods                                                                                                      | `{}`                                         |
| `tolerations`                         | List of node taints to tolerate (requires Kubernetes >= 1.6)                                                                                    | `[]`                                         |
| `updateStrategy`                      | `OnDelete` or `RollingUpdate` (requires Kubernetes >= 1.6)                                                                                      | `OnDelete`                                   |
| `sumologic.collectorUrl`              | An HTTP collector in SumoLogic that the container can send logs to via HTTP                                                                     | `Nil` You must provide your own              |
| `sumologic.fluentdSource`             | The fluentd input source, `file` or `systemd`                                                                                                   | `file`                                       |
| `sumologic.fluentdUserConfigDir`      | A directory of user-defined fluentd configuration files, which must be in the `*.conf` directory in the container                               | `/fluentd/conf.d/user`                       |
| `sumologic.flushInterval`             | How frequently to push logs to sumo, in seconds                                                                                                 | `5`                                          |
| `sumologic.numThreads`                | The number of http threads sending data to sumo                                                                                                 | `1`                                          |
| `sumologic.sourceName`                | Set the sumo `_sourceName`                                                                                                                      | `%{namespace}.%{pod}.%{container}`           |
| `sumologic.sourceHost`                | Set the sumo `_sourceHost`                                                                                                                      | `Nil`                                        |
| `sumologic.sourceCategory`            | Set the sumo `_sourceCategory`                                                                                                                  | `%{namespace}/%{pod_name}`                   |
| `sumologic.sourceCategoryPrefix`      | Define a prefix, for `_sourceCategory`                                                                                                          | `Nil`                                        |
| `sumologic.sourceCategoryReplaceDash` | Used to replace `-` with another character                                                                                                      | `/`                                          |
| `sumologic.logFormat`                 | Format to post logs, into sumo (`json`, `json_merge`, or `text`)                                                                                | `json`                                       |
| `sumologic.kubernetesMeta`            | Include or exclude kubernetes metadata, with `json` format                                                                                      | `true`                                       |
| `sumologic.excludeContainerRegex`     | All matching containers will not be sent to sumo                                                                                                | `Nil`                                        |
| `sumologic.excludeFacilityRegex`      | All matching facilities will not be sent to sumo                                                                                                | `Nil`                                        |
| `sumologic.excludeHostRegex`          | All matching hosts will not be sent to sumo                                                                                                     | `Nil`                                        |
| `sumologic.excludeNamespaceRegex`     | All matching namespaces will not be sent to sumo                                                                                                | `Nil`                                        |
| `sumologic.excludePath`               | Files in this pattern will not be sent to sumo, ie `"[\"/var/log/containers/*.log\", \"/var/log/*.log\"]`                                       | `Nil`                                        |
| `sumologic.excludePodRegex`           | All matching pods will not be sent to sumo                                                                                                      | `Nil`                                        |
| `sumologic.excludePriorityRegex`      | All matching priorities will not be sent to sumo                                                                                                | `Nil`                                        |
| `sumologic.excludeUnitRegex`          | All matching systemd units will not be sent to sumo                                                                                             | `Nil`                                        |
| `sumologic.fluentdOpt`                | Additional command line options, sent to fluentd                                                                                                | `Nil`                                        |
| `sumologic.verifySsl`                 | Verify SumoLogic HTTPS certificates                                                                                                             | `true`                                       |
| `sumologic.multilineStartRegexp`      | The regular expression for the `concat` plugin to use when merging multi-line messages                                                          | `/^\w{3} \d{1,2}, \d{4}/`, i.e. Julian dates |
| `sumologic.readFromHead`              | Start to read the logs from the head of file, not bottom. Only applies to containers log files. See in_tail doc for more information            | `true`                                       |
| `sumologic.concatSeparator`           | The character to use to delimit lines within the final concatenated message. Most multi-line messages contain a newline at the end of each line | `Nil`                                        |
| `sumologic.auditLogPath`              | Define the path to the [Kubernetes Audit Log](https://kubernetes.io/docs/tasks/debug-application-cluster/audit/)                                | `/mnt/log/kube-apiserver-audit.log`          |
| `image.name`                          | The image repository and name to pull from                                                                                                      | `sumologic/fluentd-kubernetes-sumologic`     |
| `image.tag`                           | The image tag to pull                                                                                                                           | `v1.6`                                       |
| `imagePullPolicy`                     | Image pull policy                                                                                                                               | `IfNotPresent`                               |
| `persistence.enabled`                 | Boolean value, used to turn on or off fluentd position file persistence, on nodes                                                               | `false`                                      |
| `persistence.hostPath`                | The path, on each node, to a directory for fluentd pos files. You must create the directory on each node first.                                 | `/var/run/fluentd-pos`                       |
| `resources.requests.cpu`              | CPU resource requests                                                                                                                           | 100m                                         |
| `resources.limits.cpu`                | CPU resource limits                                                                                                                             | 256m                                         |
| `resources.requests.memory`           | Memory resource requests                                                                                                                        | 128Mi                                        |
| `resources.limits.memory`             | Memory resource limits                                                                                                                          | 256Mi                                        |
| `rbac.create`                         | Is Role Based Authentication enabled in the cluster                                                                                             | `false`                                      |
| `rbac.serviceAccountName`             | RBAC service account name                                                                                                                       | {{ fullname }}                               |

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

### RBAC

By default the chart will not install the associated RBAC rolebinding,
using beta annotations.

To determine if your cluster supports this running the following:

```console
$ kubectl api-versions | grep rbac
```

You also need to have the following parameter on the api server. See the
following document for how to enable
[RBAC](https://kubernetes.io/docs/admin/authorization/rbac/)

```
--authorization-mode=RBAC
```

If the output contains "beta" or both "alpha" and "beta" you can enable rbac.

### Enable RBAC role/rolebinding creation

To enable the creation of RBAC resources, do the following

```console
$ helm install --name my-release stable/sumologic-fluentd --set rbac.create=true
```
