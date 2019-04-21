# `@helm-charts/stable-datadog`

DataDog Agent

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | datadog |
| Chart Version       | 1.26.1  |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Default values for Datadog Agent
## See Datadog helm documentation to learn more:
## https://docs.datadoghq.com/agent/kubernetes/helm/

## @param image - object - required
## Define the Datadog image to work with.
#
image:
  ## @param repository - string - required
  ## Define the repository to use:
  ## use "datadog/agent" for Datadog Agent 6
  ## use "datadog/dogstatsd" for Standalone Datadog Agent DogStatsD6
  #
  repository: datadog/agent

  ## @param tag - string - required
  ## Define the Agent version to use.
  ## Use 6.9.0-jmx to enable jmx fetch collection
  #
  tag: 6.10.1

  ## @param pullPolicy - string - required
  ## The Kubernetes pull policy.
  #
  pullPolicy: IfNotPresent

  ## @param pullSecrets - list of key:value strings - optional
  ## It is possible to specify docker registry credentials
  ## See https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod
  #
  # pullSecrets:
  #   - name: "<REG_SECRET>"

nameOverride: ''
fullnameOverride: ''

datadog:
  ## @param apiKey - string - required
  ## Set this to your Datadog API key before the Agent runs.
  ## ref: https://app.datadoghq.com/account/settings#agent/kubernetes
  #
  apiKey: <DATADOG_API_KEY>

  ## @param apiKeyExistingSecret - string - optional
  ## Use existing Secret which stores API key instead of creating a new one.
  ## If set, this parameter takes precedence over "apiKey".
  #
  # apiKeyExistingSecret: <DATADOG_API_KEY_SECRET>

  ## @param appKey - string - optional
  ## If you are using clusterAgent.metricsProvider.enabled = true, you must set
  ## a Datadog application key for read access to your metrics.
  #
  # appKey: <DATADOG_APP_KEY>

  ## @param appKeyExistingSecret - string - optional
  ## Use existing Secret which stores APP key instead of creating a new one
  ## If set, this parameter takes precedence over "appKey".
  #
  # appKeyExistingSecret: <DATADOG_APP_KEY_SECRET>

  ## @param securityContext - object - optional
  ## You can modify the security context used to run the containers by
  ## modifying the label type below:
  #
  # securityContext:
  #   seLinuxOptions:
  #     seLinuxLabel: "spc_t"

  ## @param clusterName - string - optional
  ## Set a unique cluster name to allow scoping hosts and Cluster Checks easily
  #
  # clusterName: <CLUSTER_NAME>

  ## @param name - string - required
  ## Daemonset/Deployment container name
  ## See clusterAgent.containerName if clusterAgent.enabled = true
  #
  name: datadog

  ## @param site - string - optional - default: 'datadoghq.com'
  ## The site of the Datadog intake to send Agent data to.
  ## Set to 'datadoghq.eu' to send data to the EU site.
  #
  # site: datadoghq.com

  ## @param dd_url - string - optional - default: 'https://app.datadoghq.com'
  ## The host of the Datadog intake server to send Agent data to, only set this option
  ## if you need the Agent to send data to a custom URL.
  ## Overrides the site setting defined in "site".
  #
  # dd_url: https://app.datadoghq.com

  ## @param logLevel - string - required
  ## Set logging verbosity, valid log levels are:
  ## trace, debug, info, warn, error, critical, and off
  #
  logLevel: INFO

  ## @param podLabelsAsTags - list of key:value strings - optional
  ## Provide a mapping of Kubernetes Labels to Datadog Tags.
  #
  # podLabelsAsTags:
  #   app: kube_app
  #   release: helm_release
  #   <KUBERNETES_LABEL>: <DATADOG_TAG_KEY>

  ## @param podAnnotationsAsTags - list of key:value strings - optional
  ## Provide a mapping of Kubernetes Annotations to Datadog Tags
  #
  # podAnnotationsAsTags:
  #   iam.amazonaws.com/role: kube_iamrole
  #   <KUBERNETES_ANNOTATIONS>: <DATADOG_TAG_KEY>

  ## @param tags  - list of key:value elements - optional
  ## List of tags to attach to every metric, event and service check collected by this Agent.
  ##
  ## Learn more about tagging: https://docs.datadoghq.com/tagging/
  #
  # tags:
  #   - <KEY_1>:<VALUE_1>
  #   - <KEY_2>:<VALUE_2>

  ## @param useCriSocketVolume - boolean - required
  ## Enable container runtime socket volume mounting
  #
  useCriSocketVolume: true

  ## @param dogstatsdOriginDetection - boolean - optional
  ## Enable origin detection for container tagging
  ## https://docs.datadoghq.com/developers/dogstatsd/unix_socket/#using-origin-detection-for-container-tagging
  #
  # dogstatsdOriginDetection: true

  ## @param useDogStatsDSocketVolume - boolean - optional
  ## Enable dogstatsd over Unix Domain Socket
  ## ref: https://docs.datadoghq.com/developers/dogstatsd/unix_socket/
  #
  # useDogStatsDSocketVolume: true

  ## @param nonLocalTraffic - boolean - optional - default: false
  ## Enable this to make each node accept non-local statsd traffic.
  ## ref: https://github.com/DataDog/docker-dd-agent#environment-variables
  #
  # nonLocalTraffic: false

  ## @param collectEvents - boolean - optional - default: false
  ## Enables this to start event collection from the kubernetes API
  ## ref: https://docs.datadoghq.com/agent/kubernetes/event_collection/
  #
  # collectEvents: false

  ## @param leaderElection - boolean - optional - default: false
  ## Enables leader election mechanism for event collection.
  #
  # leaderElection: false

  ## @param leaderLeaseDuration - integer - optional - default: 60
  ## Set the lease time for leader election in second.
  #
  # leaderLeaseDuration: 60

  ## @param logsEnabled - boolean - optional - default: false
  ## Enables this to activate Datadog Agent log collection.
  ## ref: https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#log-collection-setup
  #
  # logsEnabled: false

  ## @param logsConfigContainerCollectAll - boolean - optional - default: false
  ## Enable this to allow log collection for all containers.
  ## ref: https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#log-collection-setup
  #
  # logsConfigContainerCollectAll: false

  ## @param apmEnabled - boolean - optional - default: false
  ## Enable this to enable APM and tracing, on port 8126
  ## ref: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
  #
  # apmEnabled: false

  ## @param processAgentEnabled - boolean - optional - default: false
  ## Enable this to activate live process monitoring.
  ## Note: /etc/passwd is automatically mounted to allow username resolution.
  ## ref: https://docs.datadoghq.com/graphing/infrastructure/process/#kubernetes-daemonset
  #
  # processAgentEnabled: false

  ## @param env - list of object - optional
  ## The dd-agent supports many environment variables
  ## ref: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#environment-variables
  #
  # env:
  #   - name: <ENV_VAR_NAME>
  #     value: <ENV_VAR_VALUE>

  ## @param volumes - list of objects - optional
  ## Specify additional volumes to mount in the dd-agent container
  #
  # volumes:
  #   - hostPath:
  #     path: <HOST_PATH>
  #     name: <VOLUME_NAME>

  ## @param volumeMounts - list of objects - optional
  ## Specify additional volumes to mount in the dd-agent container
  #
  # volumeMounts:
  #   - name: <VOLUME_NAME>
  #     mountPath: <CONTAINER_PATH>
  #     readOnly: true

  ## @param confd - list of objects - optional
  ## Provide additional check configurations (static and Autodiscovery)
  ## Each key becomes a file in /conf.d
  ## ref: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#optional-volumes
  ## ref: https://docs.datadoghq.com/agent/autodiscovery/
  #
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

  ## @param checksd - list of key:value strings - optional
  ## Provide additional custom checks as python code
  ## Each key becomes a file in /checks.d
  ## ref: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#optional-volumes
  #
  # checksd:
  #   service.py: |-

  ## @param criSocketPath - string - optional
  ## Path to the container runtime socket (if different from Docker)
  ## This is supported starting from agent 6.6.0
  #
  # criSocketPath: /var/run/containerd/containerd.sock

  ## @param livenessProbe - object - optional
  ## Override the agent's liveness probe logic from the default:
  ## In case of issues with the probe, you can disable it with the
  ## following values, to allow easier investigating:
  #
  # livenessProbe:
  #   exec:
  #     command: ["/bin/true"]

  ## @param resources - object -required
  ## datadog-agent resource requests and limits
  ## Make sure to keep requests and limits equal to keep the pods in the Guaranteed QoS class
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  #
  resources:
    requests:
      cpu: 200m
      memory: 256Mi
    limits:
      cpu: 200m
      memory: 256Mi

## @param clusterAgent - object - required
## This is the Datadog Cluster Agent implementation that handles cluster-wide
## metrics more cleanly, separates concerns for better rbac, and implements
## the external metrics API so you can autoscale HPAs based on datadog metrics
## ref: https://docs.datadoghq.com/agent/kubernetes/cluster/
#
clusterAgent:
  ## @param enabled - boolean - required
  ## Set this to true to enable Datadog Cluster Agent
  #
  enabled: false

  containerName: cluster-agent
  image:
    repository: datadog/cluster-agent
    tag: 1.2.0
    pullPolicy: IfNotPresent

  ## @param token - string - required
  ## This needs to be at least 32 characters a-zA-z
  ## It is a preshared key between the node agents and the cluster agent
  ## ref:
  #
  token: ''

  replicas: 1

  ## @param metricsProvider - object - required
  ## Enable the metricsProvider to be able to scale based on metrics in Datadog
  #
  metricsProvider:
    enabled: false

  ## @param clusterChecks - object - required
  ## Enable the Cluster Checks feature on both the cluster-agents and the daemonset
  ## ref: https://docs.datadoghq.com/agent/autodiscovery/clusterchecks/
  ## Autodiscovery via Kube Service annotations is automatically enabled
  #
  clusterChecks:
    enabled: false

  ## @param confd - list of objects - optional
  ## Provide additional cluster check configurations
  ## Each key will become a file in /conf.d
  ## ref: https://docs.datadoghq.com/agent/autodiscovery/
  #
  # confd:
  #   mysql.yaml: |-
  #     cluster_check: true
  #     instances:
  #       - server: '<EXTERNAL_IP>'
  #         port: 3306
  #         user: datadog
  #         pass: '<YOUR_CHOSEN_PASSWORD>'

  ## @param resources - object -required
  ## Datadog cluster-agent resource requests and limits.
  #
  resources:
    requests:
      cpu: 200m
      memory: 256Mi
    limits:
      cpu: 200m
      memory: 256Mi

  ## @param livenessProbe - object - optional
  ## Override the agent's liveness probe logic from the default:
  ## In case of issues with the probe, you can disable it with the
  ## following values, to allow easier investigating:
  #
  # livenessProbe:
  #   exec:
  #     command: ["/bin/true"]
  ## @param readinessProbe - object - optional
  ## Override the cluster-agent's readiness probe logic from the default:
  #
  # readinessProbe:

rbac:
  ## @param created - boolean - required
  ## If true, create & use RBAC resources
  #
  create: true

  ## @param serviceAccountName - string - required
  ## Ignored if rbac.create is true
  #
  serviceAccountName: default

tolerations: []

kubeStateMetrics:
  ## @param enabled - boolean - required
  ## If true, deploys the kube-state-metrics deployment.
  ## ref: https://github.com/kubernetes/charts/tree/master/stable/kube-state-metrics
  #
  enabled: true

kube-state-metrics:
  rbac:
    ## @param created - boolean - required
    ## If true, create & use RBAC resources
    #
    create: true

    ## @param serviceAccountName - string - required
    ## Ignored if rbac.create is true
    #
    serviceAccountName: default

daemonset:
  ## @param enabled - boolean - required
  ## You should keep Datadog DaemonSet enabled!
  ## The exceptional case could be a situation when you need to run
  ## single DataDog pod per every namespace, but you do not need to
  ## re-create a DaemonSet for every non-default namespace install.
  ## Note: StatsD and DogStatsD work over UDP, so you may not
  ## get guaranteed delivery of the metrics in Datadog-per-namespace setup!
  #
  enabled: true

  ## @param useHostNetwork - boolean - optional
  ## Bind ports on the hostNetwork. Useful for CNI networking where hostPort might
  ## not be supported. The ports need to be available on all hosts. It Can be
  ## used for custom metrics instead of a service endpoint.
  ##
  ## WARNING: Make sure that hosts using this are properly firewalled otherwise
  ## metrics and traces are accepted from any host able to connect to this host.
  #
  # useHostNetwork: true
  ## @param useHostPort - boolean - optional
  ## Sets the hostPort to the same value of the container port. Needs to be used
  ## to receive traces in a standard APM set up. Can be used as for sending custom metrics.
  ## The ports need to be available on all hosts.
  ##
  ## WARNING: Make sure that hosts using this are properly firewalled otherwise
  ## metrics and traces are accepted from any host able to connect to this host.
  #
  # useHostPort: true
  ## @param useHostPID - boolean - optional
  ## Run the agent in the host's PID namespace. This is required for Dogstatsd origin
  ## detection to work. See https://docs.datadoghq.com/developers/dogstatsd/unix_socket/
  #
  # useHostPID: true
  ## @param podAnnotations - list of key:value strings - optional
  ## Annotations to add to the DaemonSet's Pods
  #
  # podAnnotations:
  #   <POD_ANNOTATION>: '[{"key": "<KEY>", "value": "<VALUE>"}]'
  ## @param tolerations - array - optional
  ## Allow the DaemonSet to schedule on tainted nodes (requires Kubernetes >= 1.6)
  #
  # tolerations: []
  ## @param nodeSelector - object - optional
  ## Allow the DaemonSet to schedule on selected nodes
  ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
  #
  # nodeSelector: {}
  ## @param affinity - object - optional
  ## Allow the DaemonSet to schedule using affinity rules
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
  #
  # affinity: {}
  ## @param updateStrategy - string - optional
  ## Allow the DaemonSet to perform a rolling update on helm update
  ## ref: https://kubernetes.io/docs/tasks/manage-daemon/update-daemon-set/
  #
  # updateStrategy: RollingUpdate
  ## @param priorityClassName - string - optional
  ## Sets PriorityClassName if defined.
  #
  # priorityClassName:

deployment:
  ## @param enabled - boolean - required
  ## Apart from DaemonSet, deploy Datadog agent pods and related service for
  ## applications that want to send custom metrics. Provides DogStasD service.
  #
  enabled: false

  ## @param replicas - integer - required
  ## If you want to use datadog.collectEvents, keep deployment.replicas set to 1.
  #
  replicas: 1

  ## @param affinity - object - required
  ## Affinity for pod assignment
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
  #
  affinity: {}

  ## @param tolerations - array - required
  ## Tolerations for pod assignment
  ## Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
  #
  tolerations: []

  ## @param dogstatsdNodePort - integer - optional
  ## If you're using a NodePort-type service and need a fixed port, set this parameter.
  #
  # dogstatsdNodePort: 8125

  ## @param traceNodePort - integer - optional
  ## If you're using a NodePort-type service and need a fixed port, set this parameter.
  #
  # traceNodePort: 8126

  ## @param service - object - required
  ##
  #
  service:
    type: ClusterIP
    annotations: {}

  ## @param priorityClassName - string - optional
  ## Sets PriorityClassName if defined.
  #
  # priorityClassName:

clusterchecksDeployment:
  ## @param enabled - boolean - required
  ## If true, deploys agent dedicated for running the Cluster Checks instead of running in the Daemonset's agents.
  ## ref: https://docs.datadoghq.com/agent/autodiscovery/clusterchecks/
  #
  enabled: false

  ## @param replicas - integer - required
  ## If you want to deploy the cluckerchecks agent in HA, keep at least clusterchecksDeployment.replicas set to 2.
  ## And increase the clusterchecksDeployment.replicas according to the number of Cluster Checks.
  #
  replicas: 2

  ## @param resources - object -required
  ## Datadog clusterchecks-agent resource requests and limits.
  #
  resources:
    requests:
      cpu: 200m
      memory: 500Mi
    limits:
      cpu: 200m
      memory: 500Mi

  ## @param affinity - object - optional
  ## Allow the ClusterChecks Deployment to schedule using affinity rules.
  ## By default, ClusterChecks Deployment Pods are forced to run on different Nodes.
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
  #
  # affinity:

  ## @param nodeSelector - object - optional
  ## Allow the ClusterChecks Deploument to schedule on selected nodes
  ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
  #
  # nodeSelector: {}

  ## @param tolerations - array - required
  ## Tolerations for pod assignment
  ## Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
  #
  tolerations: []
  ## @param livenessProbe - object - optional
  ## Override the agent's liveness probe logic from the default:
  ## In case of issues with the probe, you can disable it with the
  ## following values, to allow easier investigating:
  #
  # livenessProbe:
  #   exec:
  #     command: ["/bin/true"]
  ## @param env - list of object - optional
  ## The dd-agent supports many environment variables
  ## ref: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#environment-variables
  #
  # env:
  #   - name: <ENV_VAR_NAME>
  #     value: <ENV_VAR_VALUE>
```

</details>

---

# Datadog

[Datadog](https://www.datadoghq.com/) is a hosted infrastructure monitoring platform. This chart adds the Datadog Agent to all nodes in your cluster via a DaemonSet. It also optionally depends on the [kube-state-metrics chart](https://github.com/kubernetes/charts/tree/master/stable/kube-state-metrics). For more information about monitoring Kubernetes with Datadog, please refer to the [Datadog documentation website](https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/).

Datadog [offers two variants](https://hub.docker.com/r/datadog/agent/tags/), switch to a `-jmx` tag if you need to run JMX/java integrations. The chart also supports running [the standalone dogstatsd image](https://hub.docker.com/r/datadog/dogstatsd/tags/).

See the [Datadog JMX integration](https://docs.datadoghq.com/integrations/java/) to learn more.

## Prerequisites

Kubernetes 1.4+ or OpenShift 3.4+, note that:

- the Datadog Agent supports Kubernetes 1.3+
- The Datadog chart's defaults are tailored to Kubernetes 1.7.6+, see [Datadog Agent legacy Kubernetes versions documentation](https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#legacy-kubernetes-versions) for adjustments you might need to make for older versions

## Quick start

By default, the Datadog Agent runs in a DaemonSet. It can alternatively run inside a Deployment for special use cases.

**Note:** simultaneous DaemonSet + Deployment installation within a single release will be deprecated in a future version, requiring two releases to achieve this.

### Installing the Datadog Chart

To install the chart with the release name `<RELEASE_NAME>`, retrieve your Datadog API key from your [Agent Installation Instructions](https://app.datadoghq.com/account/settings#agent/kubernetes) and run:

```bash
helm install --name <RELEASE_NAME> \
  --set datadog.apiKey=<DATADOG_API_KEY> stable/datadog
```

By default, this Chart creates a Secret and puts an API key in that Secret.
However, you can use manually created secret by setting the `datadog.apiKeyExistingSecret` value. After a few minutes, you should see hosts and metrics being reported in Datadog.

### Enabling the Datadog Cluster Agent

Read about the Datadog Cluster Agent in the [official documentation](https://docs.datadoghq.com/agent/kubernetes/cluster/).

Run the following if you want to deploy the chart with the Datadog Cluster Agent:

```bash
helm install --name datadog-monitoring \
    --set datadog.apiKey=<DATADOG_API_KEY> \
    --set datadog.appKey=<DATADOG_APP_KEY \
    --set clusterAgent.enabled=true \
    --set clusterAgent.metricsProvider.enabled=true \
    stable/datadog
```

**Note**: Specifying `clusterAgent.metricsProvider.enabled=true` enables the External Metrics Server.
If you want to learn to use this feature, you can check out this [Datadog Cluster Agent walkthrough](https://github.com/DataDog/datadog-agent/blob/master/docs/cluster-agent/CUSTOM_METRICS_SERVER.md).

The Leader Election is enabled by default in the chart for the Cluster Agent. Only the Cluster Agent(s) participate in the election, in case you have several replicas configured (using `clusterAgent.replicas`.

#### Cluster Agent Token

You can specify the Datadog Cluster Agent token used to secure the communication between the Cluster Agent(s) and the Agents with `clusterAgent.token`.

**If you don't specify a token, a random one is generated at each deployment so you must use `--recreate-pods` to ensure all pod use the same token.** see[Datadog Chart notes](https://github.com/helm/charts/blob/57d3030941ad2ec2d6f97c86afdf36666658a884/stable/datadog/templates/NOTES.txt#L49-L59) to learn more.

### Upgrading

#### From 1.19.0 onwards

Version `1.19.0` introduces the use of release name as full name if it contains the chart name(`datadog` in this case).
E.g. with a release name of `datadog`, this renames the `DaemonSet` from `datadog-datadog` to `datadog`.
The suggested approach is to delete the release and reinstall it.

#### From 1.0.0 onwards

Starting with version 1.0.0, this chart does not support deploying Agent 5.x anymore. If you cannot upgrade to Agent 6.x, you can use a previous version of the chart by calling helm install with `--version 0.18.0`.

See [0.18.1's README](https://github.com/helm/charts/blob/847f737479bb78d89f8fb650db25627558fbe1f0/stable/datadog/README.md) to see which options were supported at the time.

### Uninstalling the Chart

To uninstall/delete the `<RELEASE_NAME>` deployment:

```bash
helm delete <RELEASE_NAME> --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

As a best practice, a YAML file that specifies the values for the chart parameters should be provided to configure the chart:

1.  **Copy the default [`datadog-values.yaml`](/values.yaml) value file.**
2.  Set the `apiKey` parameter with your [Datadog API key](https://app.datadoghq.com/account/settings#api).
3.  Upgrade the Datadog Helm chart with the new `datadog-values.yaml` file:

```bash
helm upgrade -f datadog-values.yaml <RELEASE_NAME> stable/datadog --recreate-pods
```

See the [All configuration options](#all-configuration-options) section to discover all possibilities offered by the Datadog chart.

### Enabling Log Collection

Update your [datadog-values.yaml](/values.yaml) file with the following log collection configuration:

```
datadog:
  (...)
 logsEnabled: true
 logsConfigContainerCollectAll: true
```

then upgrade your Datadog Helm chart:

```bash
helm upgrade -f datadog-values.yaml <RELEASE_NAME> stable/datadog --recreate-pods
```

### Enabling Process Collection

Update your [datadog-values.yaml](/values.yaml) file with the process collection configuration:

```
datadog:
  (...)
  processAgentEnabled: true
```

then upgrade your Datadog Helm chart:

```bash
helm upgrade -f datadog-values.yaml <RELEASE_NAME> stable/datadog --recreate-pods
```

### Kubernetes event collection

Use the [Datadog Cluster Agent](#enabling-the-datadog-cluster-agent) to collect Kubernetes events. Please read [the official documentation](https://docs.datadoghq.com/agent/kubernetes/event_collection/) for more context.

Alternatively set the `datadog.leaderElection`, `datadog.collectEvents` and `rbac.create` options to `true` in order to enable Kubernetes event collection.

### conf.d and checks.d

The Datadog [entrypoint](https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/agent/entrypoint/89-copy-customfiles.sh) copies files with a `.yaml` extension found in `/conf.d` and files with `.py` extension in `/check.d` to `/etc/datadog-agent/conf.d` and `/etc/datadog-agent/checks.d` respectively.

The keys for `datadog.confd` and `datadog.checksd` should mirror the content found in their respective ConfigMaps. Update your [datadog-values.yaml](/values.yaml) file with the check configurations:

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

then upgrade your Datadog Helm chart:

```bash
helm upgrade -f datadog-values.yaml <RELEASE_NAME> stable/datadog --recreate-pods
```

For more details, please refer to [the documentation](https://docs.datadoghq.com/agent/kubernetes/integrations/).

### Kubernetes Labels and Annotations

To map Kubernetes pod labels and annotations to Datadog tags, provide a dictionary with kubernetes labels/annotations as keys and Datadog tags key as values in your [datadog-values.yaml](/values.yaml) file:

```yaml
podAnnotationsAsTags:
  iam.amazonaws.com/role: kube_iamrole
```

```yaml
podLabelsAsTags:
  app: kube_app
  release: helm_release
```

then upgrade your Datadog Helm chart:

```bash
helm upgrade -f datadog-values.yaml <RELEASE_NAME> stable/datadog --recreate-pods
```

### CRI integration

As of the version 6.6.0, the Datadog Agent supports collecting metrics from any container runtime interface used in your cluster. Configure the location path of the socket with `datadog.criSocketPath` and make sure you allow the socket to be mounted into the pod running the agent by setting `datadog.useCriSocketVolume` to `True`.
Standard paths are:

- Containerd socket: `/var/run/containerd/containerd.sock`
- Cri-o socket: `/var/run/crio/crio.sock`

## All configuration options

The following table lists the configurable parameters of the Datadog chart and their default values. Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
helm install --name <RELEASE_NAME> \
  --set datadog.apiKey=<DATADOG_API_KEY>,datadog.logLevel=DEBUG \
  stable/datadog
```

| Parameter                                           | Description                                                                                                                                               | Default                                   |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `datadog.apiKey`                                    | Your Datadog API key                                                                                                                                      | `Nil` You must provide your own key       |
| `datadog.apiKeyExistingSecret`                      | If set, use the secret with a provided name instead of creating a new one                                                                                 | `nil`                                     |
| `datadog.appKey`                                    | Datadog APP key required to use metricsProvider                                                                                                           | `Nil` You must provide your own key       |
| `datadog.appKeyExistingSecret`                      | If set, use the secret with a provided name instead of creating a new one                                                                                 | `nil`                                     |
| `image.repository`                                  | The image repository to pull from                                                                                                                         | `datadog/agent`                           |
| `image.tag`                                         | The image tag to pull                                                                                                                                     | `6.10.1`                                  |
| `image.pullPolicy`                                  | Image pull policy                                                                                                                                         | `IfNotPresent`                            |
| `image.pullSecrets`                                 | Image pull secrets                                                                                                                                        | `nil`                                     |
| `nameOverride`                                      | Override name of app                                                                                                                                      | `nil`                                     |
| `fullnameOverride`                                  | Override full name of app                                                                                                                                 | `nil`                                     |
| `rbac.create`                                       | If true, create & use RBAC resources                                                                                                                      | `true`                                    |
| `rbac.serviceAccount`                               | existing ServiceAccount to use (ignored if rbac.create=true)                                                                                              | `default`                                 |
| `datadog.name`                                      | Container name if Daemonset or Deployment                                                                                                                 | `datadog`                                 |
| `datadog.site`                                      | Site ('datadoghq.com' or 'datadoghq.eu')                                                                                                                  | `nil`                                     |
| `datadog.dd_url`                                    | Datadog intake server                                                                                                                                     | `nil`                                     |
| `datadog.env`                                       | Additional Datadog environment variables                                                                                                                  | `nil`                                     |
| `datadog.logsEnabled`                               | Enable log collection                                                                                                                                     | `nil`                                     |
| `datadog.logsConfigContainerCollectAll`             | Collect logs from all containers                                                                                                                          | `nil`                                     |
| `datadog.logsPointerHostPath`                       | Host path to store the log tailing state in                                                                                                               | `/var/lib/datadog-agent/logs`             |
| `datadog.apmEnabled`                                | Enable tracing from the host                                                                                                                              | `nil`                                     |
| `datadog.processAgentEnabled`                       | Enable live process monitoring                                                                                                                            | `nil`                                     |
| `datadog.checksd`                                   | Additional custom checks as python code                                                                                                                   | `nil`                                     |
| `datadog.confd`                                     | Additional check configurations (static and Autodiscovery)                                                                                                | `nil`                                     |
| `datadog.criSocketPath`                             | Path to the container runtime socket (if different from Docker)                                                                                           | `nil`                                     |
| `datadog.tags`                                      | Set host tags                                                                                                                                             | `nil`                                     |
| `datadog.nonLocalTraffic`                           | Enable statsd reporting from any external ip                                                                                                              | `False`                                   |
| `datadog.useCriSocketVolume`                        | Enable mounting the container runtime socket in Agent containers                                                                                          | `True`                                    |
| `datadog.dogstatsdOriginDetection`                  | Enable origin detection for container tagging                                                                                                             | `False`                                   |
| `datadog.useDogStatsDSocketVolume`                  | Enable dogstatsd over Unix Domain Socket                                                                                                                  | `False`                                   |
| `datadog.volumes`                                   | Additional volumes for the daemonset or deployment                                                                                                        | `nil`                                     |
| `datadog.volumeMounts`                              | Additional volumeMounts for the daemonset or deployment                                                                                                   | `nil`                                     |
| `datadog.podAnnotationsAsTags`                      | Kubernetes Annotations to Datadog Tags mapping                                                                                                            | `nil`                                     |
| `datadog.podLabelsAsTags`                           | Kubernetes Labels to Datadog Tags mapping                                                                                                                 | `nil`                                     |
| `datadog.resources.requests.cpu`                    | CPU resource requests                                                                                                                                     | `200m`                                    |
| `datadog.resources.limits.cpu`                      | CPU resource limits                                                                                                                                       | `200m`                                    |
| `datadog.resources.requests.memory`                 | Memory resource requests                                                                                                                                  | `256Mi`                                   |
| `datadog.resources.limits.memory`                   | Memory resource limits                                                                                                                                    | `256Mi`                                   |
| `datadog.securityContext`                           | Allows you to overwrite the default securityContext applied to the container                                                                              | `nil`                                     |
| `datadog.livenessProbe`                             | Overrides the default liveness probe                                                                                                                      | http port 5555                            |
| `datadog.hostname`                                  | Set the hostname (write it in datadog.conf)                                                                                                               | `nil`                                     |
| `datadog.acInclude`                                 | Include containers based on image name                                                                                                                    | `nil`                                     |
| `datadog.acExclude`                                 | Exclude containers based on image name                                                                                                                    | `nil`                                     |
| `daemonset.podAnnotations`                          | Annotations to add to the DaemonSet's Pods                                                                                                                | `nil`                                     |
| `daemonset.tolerations`                             | List of node taints to tolerate (requires Kubernetes >= 1.6)                                                                                              | `nil`                                     |
| `daemonset.nodeSelector`                            | Node selectors                                                                                                                                            | `nil`                                     |
| `daemonset.affinity`                                | Node affinities                                                                                                                                           | `nil`                                     |
| `daemonset.useHostNetwork`                          | If true, use the host's network                                                                                                                           | `nil`                                     |
| `daemonset.useHostPID`.                             | If true, use the host's PID namespace                                                                                                                     | `nil`                                     |
| `daemonset.useHostPort`                             | If true, use the same ports for both host and container                                                                                                   | `nil`                                     |
| `daemonset.priorityClassName`                       | Which Priority Class to associate with the daemonset                                                                                                      | `nil`                                     |
| `datadog.leaderElection`                            | Enable the leader Election feature                                                                                                                        | `false`                                   |
| `datadog.leaderLeaseDuration`                       | The duration for which a leader stays elected.                                                                                                            | 60 sec, 15 if Cluster Checks enabled      |
| `datadog.collectEvents`                             | Enable Kubernetes event collection. Requires leader election.                                                                                             | `false`                                   |
| `deployment.affinity`                               | Node / Pod affinities                                                                                                                                     | `{}`                                      |
| `deployment.tolerations`                            | List of node taints to tolerate                                                                                                                           | `[]`                                      |
| `deployment.priorityClassName`                      | Which Priority Class to associate with the deployment                                                                                                     | `nil`                                     |
| `kubeStateMetrics.enabled`                          | If true, create kube-state-metrics                                                                                                                        | `true`                                    |
| `kube-state-metrics.rbac.create`                    | If true, create & use RBAC resources for kube-state-metrics                                                                                               | `true`                                    |
| `kube-state-metrics.rbac.serviceAccount`            | existing ServiceAccount to use (ignored if rbac.create=true) for kube-state-metrics                                                                       | `default`                                 |
| `clusterAgent.enabled`                              | Use the cluster-agent for cluster metrics (Kubernetes 1.10+ only)                                                                                         | `false`                                   |
| `clusterAgent.token`                                | A cluster-internal secret for agent-to-agent communication. Must be 32+ characters a-zA-Z                                                                 | Generates a random value                  |
| `clusterAgent.containerName`                        | The container name for the Cluster Agent                                                                                                                  | `cluster-agent`                           |
| `clusterAgent.image.repository`                     | The image repository for the cluster-agent                                                                                                                | `datadog/cluster-agent`                   |
| `clusterAgent.image.tag`                            | The image tag to pull                                                                                                                                     | `1.2.0`                                   |
| `clusterAgent.image.pullPolicy`                     | Image pull policy                                                                                                                                         | `IfNotPresent`                            |
| `clusterAgent.image.pullSecrets`                    | Image pull secrets                                                                                                                                        | `nil`                                     |
| `clusterAgent.metricsProvider.enabled`              | Enable Datadog metrics as a source for HPA scaling                                                                                                        | `false`                                   |
| `clusterAgent.clusterChecks.enabled`                | Enable Cluster Checks on both the Cluster Agent and the Agent daemonset                                                                                   | `false`                                   |
| `clusterAgent.confd`                                | Additional check configurations (static and Autodiscovery)                                                                                                | `nil`                                     |
| `clusterAgent.resources.requests.cpu`               | CPU resource requests                                                                                                                                     | `200m`                                    |
| `clusterAgent.resources.limits.cpu`                 | CPU resource limits                                                                                                                                       | `200m`                                    |
| `clusterAgent.resources.requests.memory`            | Memory resource requests                                                                                                                                  | `256Mi`                                   |
| `clusterAgent.resources.limits.memory`              | Memory resource limits                                                                                                                                    | `256Mi`                                   |
| `clusterAgent.tolerations`                          | List of node taints to tolerate                                                                                                                           | `[]`                                      |
| `clusterAgent.livenessProbe`                        | Overrides the default liveness probe                                                                                                                      | http port 443 if external metrics enabled |
| `clusterAgent.readinessProbe`                       | Overrides the default readiness probe                                                                                                                     | http port 443 if external metrics enabled |
| `clusterchecksDeployment.enabled`                   | Enable Datadog agent deployment dedicated for running Cluster Checks. It allows having different resources (Request/Limit) for Cluster Checks agent pods. | `false`                                   |
| `clusterchecksDeployment.env`                       | Additional Datadog environment variables for Cluster Checks Deployment                                                                                    | `nil`                                     |
| `clusterchecksDeployment.resources.requests.cpu`    | CPU resource requests                                                                                                                                     | `200m`                                    |
| `clusterchecksDeployment.resources.limits.cpu`      | CPU resource limits                                                                                                                                       | `200m`                                    |
| `clusterchecksDeployment.resources.requests.memory` | Memory resource requests                                                                                                                                  | `256Mi`                                   |
| `clusterchecksDeployment.resources.limits.memory`   | Memory resource limits                                                                                                                                    | `256Mi`                                   |
| `clusterchecksDeployment.nodeSelector`              | Node selectors                                                                                                                                            | `nil`                                     |
| `clusterchecksDeployment.affinity`                  | Node affinities                                                                                                                                           | avoid running pods on the same node       |
| `clusterchecksDeployment.livenessProbe`             | Overrides the default liveness probe                                                                                                                      | http port 5555                            |
