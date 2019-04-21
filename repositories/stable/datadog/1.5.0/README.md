# `@helm-charts/stable-datadog`

DataDog Agent

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | datadog |
| Chart Version       | 1.5.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for datadog.
image:
  # This chart is compatible with different images, please choose one
  repository: datadog/agent # Agent6
  # repository: datadog/dogstatsd         # Standalone DogStatsD6
  tag: 6.5.2 # Use 6.5.2-jmx to enable jmx fetch collection
  pullPolicy: IfNotPresent
  ## It is possible to specify docker registry credentials
  ## See https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod
  # pullSecrets:
  #    - name: regsecret

# NB! Normally you need to keep Datadog DaemonSet enabled!
# The exceptional case could be a situation when you need to run
# single DataDog pod per every namespace, but you do not need to
# re-create a DaemonSet for every non-default namespace install.
# Note, that StatsD and DogStatsD work over UDP, so you may not
# get guaranteed delivery of the metrics in Datadog-per-namespace setup!
daemonset:
  enabled: true
  ## Bind ports on the hostNetwork. Useful for CNI networking where hostPort might
  ## not be supported. The ports will need to be available on all hosts. Can be
  ## used for custom metrics instead of a service endpoint.
  ## WARNING: Make sure that hosts using this are properly firewalled otherwise
  ## metrics and traces will be accepted from any host able to connect to this host.
  # useHostNetwork: true
  ## Sets the hostPort to the same value of the container port. Can be used as
  ## for sending custom metrics. The ports will need to be available on all
  ## hosts.
  ## WARNING: Make sure that hosts using this are properly firewalled otherwise
  ## metrics and traces will be accepted from any host able to connect to this host.
  # useHostPort: true
  ## Run the agent in the host's PID namespace. This is required for Dogstatsd origin
  ## detection to work. See https://docs.datadoghq.com/developers/dogstatsd/unix_socket/
  # useHostPID: true
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

# Apart from DaemonSet, deploy Datadog agent pods and related service for
# applications that want to send custom metrics. Provides DogStasD service.
#
# HINT: If you want to use datadog.collectEvents, keep deployment.replicas set to 1.
deployment:
  enabled: false
  replicas: 1
  # Affinity for pod assignment
  # Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
  affinity: {}
  # Tolerations for pod assignment
  # Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
  tolerations: []
  # If you're using a NodePort-type service and need a fixed port, set this parameter.
  # dogstatsdNodePort: 8125
  # traceNodePort: 8126

## deploy the kube-state-metrics deployment
## ref: https://github.com/kubernetes/charts/tree/master/stable/kube-state-metrics
##

# service:
# type: LoadBalancer
# annotations: {}

kubeStateMetrics:
  enabled: true

# This is the new cluster agent implementation that handles cluster-wide
# metrics more cleanly, separates concerns for better rbac, and implements
# the external metrics API so you can autoscale HPAs based on datadog
# metrics
clusterAgent:
  image:
    repository: datadog/cluster-agent
    tag: 0.10.0
    pullPolicy: IfNotPresent
  enabled: false
  ## This needs to be at least 32 characters a-zA-z
  ## It is a preshared key between the node agents and the cluster agent
  token: ''
  replicas: 1
  ## Enable the metricsProvider to be able to scale based on metrics in Datadog
  metricsProvider:
    enabled: false
  resources:
    requests:
      cpu: 200m
      memory: 256Mi
    limits:
      cpu: 200m
      memory: 256Mi

datadog:
  ## You'll need to set this to your Datadog API key before the agent will run.
  ## ref: https://app.datadoghq.com/account/settings#agent/kubernetes
  ##
  # apiKey:

  ## Use existing Secret which stores API key instead of creating a new one
  # apiKeyExistingSecret:

  ## If you are using clusterAgent.metricsProvider.enabled = true, you'll need
  ## a datadog app key for read access to the metrics
  # appKey:

  ## Use existing Secret which stores APP key instead of creating a new one
  # appKeyExistingSecret:

  ## dd-agent container name
  ##
  name: dd-agent

  ## Set logging verbosity.
  ## ref: https://github.com/DataDog/docker-dd-agent#environment-variables
  ## Note: For Agent6 (image `datadog/agent`) the valid log levels are
  ## trace, debug, info, warn, error, critical, and off
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
  collectEvents: false

  ## Enables log collection
  ## ref: https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#log-collection-setup
  ##
  # logsEnabled: false
  # logsConfigContainerCollectAll: false

  ## Un-comment this to enable APM and tracing, on port 8126
  ## ref: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
  ##
  # apmEnabled: true

  ## Un-comment this to enable live process monitoring
  ## ref: https://docs.datadoghq.com/graphing/infrastructure/process/#kubernetes-daemonset
  ##
  # processAgentEnabled: true

  ## The dd-agent supports many environment variables
  ## ref: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#environment-variables
  ##
  # env:
  #   - name:
  #     value:

  ## The dd-agent supports detailed process and container monitoring and
  ## requires control over the volume and volumeMounts for the daemonset
  ## or deployment.
  ## ref: https://docs.datadoghq.com/guides/process/
  ##
  # volumes:
  #  - hostPath:
  #      path: /etc/passwd
  #    name: passwd
  # volumeMounts:
  #   - name: passwd
  #     mountPath: /etc/passwd
  #     readOnly: true

  ## Enable leader election mechanism for event collection
  ##
  leaderElection: false

  ## Set the lease time for leader election
  ##
  # leaderLeaseDuration: 600

  ## Provide additional check configurations (static and Autodiscovery)
  ## Each key will become a file in /conf.d
  ## ref: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#optional-volumes
  ## ref: https://docs.datadoghq.com/agent/autodiscovery/
  ##
  # confd:
  #   redisdb.yaml: |-
  #     init_config:
  #     instances:
  #       - host: "name"
  #         port: "6379"
  #   kubernetes_state.yaml: |-
  #     ad_identifiers:
  #       - kube-state-metrics
  #     init_config:
  #     instances:
  #       - kube_state_url: http://%%host%%:8080/metrics

  ## Provide additional custom checks as python code
  ## Each key will become a file in /checks.d
  ## ref: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#optional-volumes
  ##
  # checksd:
  #   service.py: |-

  ## datadog-agent resource requests and limits
  ## Make sure to keep requests and limits equal to keep the pods in the Guaranteed QoS class
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    requests:
      cpu: 200m
      memory: 256Mi
    limits:
      cpu: 200m
      memory: 256Mi

rbac:
  ## If true, create & use RBAC resources
  create: true

  ## Ignored if rbac.create is true
  serviceAccountName: default

tolerations: []

kube-state-metrics:
  rbac:
    create: true

    ## Ignored if rbac.create is true
    serviceAccountName: default
```

</details>

---

# Datadog

[Datadog](https://www.datadoghq.com/) is a hosted infrastructure monitoring platform.

## Introduction

This chart adds the Datadog Agent to all nodes in your cluster via a DaemonSet. It also optionally depends on the [kube-state-metrics chart](https://github.com/kubernetes/charts/tree/master/stable/kube-state-metrics). For more information about monitoring Kubernetes with Datadog, please refer to the [Datadog documentation website](https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/).

## Prerequisites

Kubernetes 1.4+ or OpenShift 3.4+ (1.3 support is currently partial, full support is planned for 6.4.0).

## Installing the Chart

To install the chart with the release name `my-release`, retrieve your DataDog API key from your [Agent Installation Instructions](https://app.datadoghq.com/account/settings#agent/kubernetes) and run:

```bash
$ helm install --name my-release \
    --set datadog.apiKey=YOUR-KEY-HERE stable/datadog
```

After a few minutes, you should see hosts and metrics being reported in DataDog.

**Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Datadog chart and their default values.

| Parameter                                | Description                                                                               | Default                               |
| ---------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------- |
| `datadog.apiKey`                         | Your Datadog API key                                                                      | `Nil` You must provide your own key   |
| `datadog.apiKeyExistingSecret`           | If set, use the secret with a provided name instead of creating a new one                 | `nil`                                 |
| `datadog.appKey`                         | Datadog APP key required to use metricsProvider                                           | `Nil` You must provide your own key   |
| `datadog.appKeyExistingSecret`           | If set, use the secret with a provided name instead of creating a new one                 | `nil`                                 |
| `image.repository`                       | The image repository to pull from                                                         | `datadog/agent`                       |
| `image.tag`                              | The image tag to pull                                                                     | `6.5.2`                               |
| `image.pullPolicy`                       | Image pull policy                                                                         | `IfNotPresent`                        |
| `image.pullSecrets`                      | Image pull secrets                                                                        | `nil`                                 |
| `rbac.create`                            | If true, create & use RBAC resources                                                      | `true`                                |
| `rbac.serviceAccount`                    | existing ServiceAccount to use (ignored if rbac.create=true)                              | `default`                             |
| `datadog.env`                            | Additional Datadog environment variables                                                  | `nil`                                 |
| `datadog.logsEnabled`                    | Enable log collection                                                                     | `nil`                                 |
| `datadog.logsConfigContainerCollectAll`  | Collect logs from all containers                                                          | `nil`                                 |
| `datadog.apmEnabled`                     | Enable tracing from the host                                                              | `nil`                                 |
| `datadog.processAgentEnabled`            | Enable live process monitoring                                                            | `nil`                                 |
| `datadog.checksd`                        | Additional custom checks as python code                                                   | `nil`                                 |
| `datadog.confd`                          | Additional check configurations (static and Autodiscovery)                                | `nil`                                 |
| `datadog.tags`                           | Set host tags                                                                             | `nil`                                 |
| `datadog.volumes`                        | Additional volumes for the daemonset or deployment                                        | `nil`                                 |
| `datadog.volumeMounts`                   | Additional volumeMounts for the daemonset or deployment                                   | `nil`                                 |
| `datadog.resources.requests.cpu`         | CPU resource requests                                                                     | `200m`                                |
| `datadog.resources.limits.cpu`           | CPU resource limits                                                                       | `200m`                                |
| `datadog.resources.requests.memory`      | Memory resource requests                                                                  | `256Mi`                               |
| `datadog.resources.limits.memory`        | Memory resource limits                                                                    | `256Mi`                               |
| `daemonset.podAnnotations`               | Annotations to add to the DaemonSet's Pods                                                | `nil`                                 |
| `daemonset.tolerations`                  | List of node taints to tolerate (requires Kubernetes >= 1.6)                              | `nil`                                 |
| `daemonset.nodeSelector`                 | Node selectors                                                                            | `nil`                                 |
| `daemonset.affinity`                     | Node affinities                                                                           | `nil`                                 |
| `daemonset.useHostNetwork`               | If true, use the host's network                                                           | `nil`                                 |
| `daemonset.useHostPID`.                  | If true, use the host's PID namespace                                                     | `nil`                                 |
| `daemonset.useHostPort`                  | If true, use the same ports for both host and container                                   | `nil`                                 |
| `datadog.leaderElection`                 | Enable the leader Election feature                                                        | `false`                               |
| `datadog.leaderLeaseDuration`            | The duration for which a leader stays elected.                                            | `nil`                                 |
| `datadog.collectEvents`                  | Enable Kubernetes event collection. Requires leader election.                             | `false`                               |
| `deployment.affinity`                    | Node / Pod affinities                                                                     | `{}`                                  |
| `deployment.tolerations`                 | List of node taints to tolerate                                                           | `[]`                                  |
| `kubeStateMetrics.enabled`               | If true, create kube-state-metrics                                                        | `true`                                |
| `kube-state-metrics.rbac.create`         | If true, create & use RBAC resources for kube-state-metrics                               | `true`                                |
| `kube-state-metrics.rbac.serviceAccount` | existing ServiceAccount to use (ignored if rbac.create=true) for kube-state-metrics       | `default`                             |
| `clusterAgent.enabled`                   | Use the cluster-agent for cluster metrics (Kubernetes 1.10+ only)                         | `false`                               |
| `clusterAgent.token`                     | A cluster-internal secret for agent-to-agent communication. Must be 32+ characters a-zA-Z | `Nil` You must provide your own token |
| `clusterAgent.image.repository`          | The image repository for the cluster-agent                                                | `datadog/cluster-agent`               |
| `clusterAgent.image.tag`                 | The image tag to pull                                                                     | `0.10.0`                              |
| `clusterAgent.image.pullPolicy`          | Image pull policy                                                                         | `IfNotPresent`                        |
| `clusterAgent.image.pullSecrets`         | Image pull secrets                                                                        | `nil`                                 |
| `clusterAgent.metricsProvider.enabled`   | Enable Datadog metrics as a source for HPA scaling                                        | `false`                               |
| `clusterAgent.resources.requests.cpu`    | CPU resource requests                                                                     | `200m`                                |
| `clusterAgent.resources.limits.cpu`      | CPU resource limits                                                                       | `200m`                                |
| `clusterAgent.resources.requests.memory` | Memory resource requests                                                                  | `256Mi`                               |
| `clusterAgent.resources.limits.memory`   | Memory resource limits                                                                    | `256Mi`                               |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
    --set datadog.apiKey=YOUR-KEY-HERE,datadog.logLevel=DEBUG \
    stable/datadog
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f my-values.yaml stable/datadog
```

**Tip**: You can copy and customize the default [values.yaml](values.yaml)

### Image repository and tag

Datadog [offers two variants](https://hub.docker.com/r/datadog/agent/tags/), switch to a `-jmx` tag if you need to run JMX/java integrations. The chart also supports running [the standalone dogstatsd image](https://hub.docker.com/r/datadog/dogstatsd/tags/).

Starting with version 1.0.0, this chart does not support deploying Agent 5.x anymore. If you cannot upgrade to Agent 6.x, you can use a previous version of the chart by calling helm install with `--version 0.18.0`.

### DaemonSet and Deployment

By default, the Datadog Agent runs in a DaemonSet. It can alternatively run inside a Deployment for special use cases.

**Note:** simultaneous DaemonSet + Deployment installation within a single release will be deprecated in a future version, requiring two releases to achieve this.

### Secret

By default, this Chart creates a Secret and puts an API key in that Secret.
However, you can use manually created secret by setting the `datadog.apiKeyExistingSecret` value.

### confd and checksd

The Datadog [entrypoint
](https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/agent/entrypoint/89-copy-customfiles.sh)
will copy files with a `.yaml` extension found in `/conf.d` and files with `.py` extension in
`/check.d` to `/etc/datadog-agent/conf.d` and `/etc/datadog-agent/checks.d` respectively. The keys for
`datadog.confd` and `datadog.checksd` should mirror the content found in their
respective ConfigMaps, ie

```yaml
datadog:
  confd:
    redisdb.yaml: |-
      ad_identifiers:
        - redis
        - bitnami/redis
      init_config:
      instances:
        - host: "%%host%%"
          port: "%%port%%"
    jmx.yaml: |-
      ad_identifiers:
        - openjdk
      instance_config:
      instances:
        - host: "%%host%%"
          port: "%%port_0%%"
    redisdb.yaml: |-
      init_config:
      instances:
        - host: "outside-k8s.example.com"
          port: 6379
```

### Kubernetes event collection

To enable event collection, you will need to set the `datadog.leaderElection`, `datadog.collectEvents` and `rbac.create` options to `true`.

Please read [the official documentation](https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#event-collection) for more context.
