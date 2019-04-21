# `@helm-charts/stable-metricbeat`

A Helm chart to collect Kubernetes logs with metricbeat

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | metricbeat |
| Chart Version       | 0.4.4      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  repository: docker.elastic.co/beats/metricbeat
  tag: 6.5.4
  pullPolicy: IfNotPresent

# The instances created by daemonset retrieve most metrics from the host
daemonset:
  podAnnotations: []
  tolerations:
    - key: node-role.kubernetes.io/master
      operator: Exists
      effect: NoSchedule
  nodeSelector: {}
  config:
    metricbeat.config:
      modules:
        path: ${path.config}/modules.d/*.yml
        reload.enabled: false
    processors:
      - add_cloud_metadata:
    output.file:
      path: '/usr/share/metricbeat/data'
      filename: metricbeat
      rotate_every_kb: 10000
      number_of_files: 5
  modules:
    system:
      enabled: true
      config:
        - module: system
          period: 10s
          metricsets:
            - cpu
            - load
            - memory
            - network
            - process
            - process_summary
            # - core
            # - diskio
            # - socket
          processes: ['.*']
          process.include_top_n:
            by_cpu: 5 # include top 5 processes by CPU
            by_memory: 5 # include top 5 processes by memory
        - module: system
          period: 1m
          metricsets:
            - filesystem
            - fsstat
          processors:
            - drop_event.when.regexp:
                system.filesystem.mount_point: '^/(sys|cgroup|proc|dev|etc|host|lib)($|/)'
    kubernetes:
      enabled: true
      config:
        - module: kubernetes
          metricsets:
            - node
            - system
            - pod
            - container
            - volume
          period: 10s
          host: ${NODE_NAME}
          hosts: ['localhost:10255']
          # If using Red Hat OpenShift remove the previous hosts entry and
          # uncomment these settings:
          # hosts: ["https://${HOSTNAME}:10250"]
          # bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
          # ssl.certificate_authorities:
          # - /var/run/secrets/kubernetes.io/serviceaccount/service-ca.crt
# The instance created by deployment retrieves metrics that are unique for the whole cluster, like Kubernetes events or kube-state-metrics
deployment:
  podAnnotations: []
  tolerations: []
  nodeSelector: {}
  config:
    metricbeat.config:
      modules:
        path: ${path.config}/modules.d/*.yml
        reload.enabled: false
    processors:
      - add_cloud_metadata:
    output.file:
      path: '/usr/share/metricbeat/data'
      filename: metricbeat
      rotate_every_kb: 10000
      number_of_files: 5
  modules:
    kubernetes:
      enabled: true
      config:
        - module: kubernetes
          metricsets:
            - state_node
            - state_deployment
            - state_replicaset
            - state_pod
            - state_container
            # Uncomment this to get k8s events:
            # - event
          period: 10s
          hosts: ['kube-state-metrics:8080']

# List of beat plugins
plugins:
  []
  # - kinesis.so

# additional environment
# extraEnv:
#  - name: test1
#    value: "test1"
#  - name: test2
#    value: "test2"

# Add additional volumes and mounts, for example to read other log files on the host
extraVolumes:
  []
  # - hostPath:
  #     path: /var/log
  #   name: varlog
extraVolumeMounts:
  []
  # - name: varlog
  #   mountPath: /host/var/log
  #   readOnly: true

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 200Mi
  # requests:
  #  cpu: 100m
  #  memory: 100Mi

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:
```

</details>

---

# Metricbeat

[metricbeat](https://www.elastic.co/guide/en/beats/metricbeat/current/index.html) is used to ship Kubernetes and host metrics to multiple outputs.

## Prerequisites

- Kubernetes 1.9+

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/metricbeat
```

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the metricbeat chart and their default values.

| Parameter                           | Description                                                                                                                                                                                                                                                                                 | Default                                                                                     |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `image.repository`                  | The image repository to pull from                                                                                                                                                                                                                                                           | `docker.elastic.co/beats/metricbeat`                                                        |
| `image.tag`                         | The image tag to pull                                                                                                                                                                                                                                                                       | `6.5.1`                                                                                     |
| `image.pullPolicy`                  | Image pull policy                                                                                                                                                                                                                                                                           | `IfNotPresent`                                                                              |
| `rbac.create`                       | If true, create & use RBAC resources                                                                                                                                                                                                                                                        | `true`                                                                                      |
| `serviceAccount.create`             | If true, create & use ServiceAccount                                                                                                                                                                                                                                                        | `true`                                                                                      |
| `serviceAccount.name`               | The name of the ServiceAccount to use. If not set and create is true, a name is generated using the fullname template                                                                                                                                                                       |                                                                                             |
| `config`                            | The content of the configuration file consumed by metricbeat. See the [metricbeat.reference.yml](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-reference-yml.html) for full details                                                                                   |                                                                                             |
| `plugins`                           | List of beat plugins                                                                                                                                                                                                                                                                        |                                                                                             |
| `extraEnv`                          | Additional environment                                                                                                                                                                                                                                                                      |                                                                                             |
| `extraVolumes`, `extraVolumeMounts` | Additional volumes and mounts, for example to provide other configuration files                                                                                                                                                                                                             |                                                                                             |
| `resources.requests.cpu`            | CPU resource requests                                                                                                                                                                                                                                                                       |                                                                                             |
| `resources.limits.cpu`              | CPU resource limits                                                                                                                                                                                                                                                                         |                                                                                             |
| `resources.requests.memory`         | Memory resource requests                                                                                                                                                                                                                                                                    |                                                                                             |
| `resources.limits.memory`           | Memory resource limits                                                                                                                                                                                                                                                                      |                                                                                             |
| `daemonset.modules.<name>.config`   | The content of the modules configuration file consumed by metricbeat deployed as daemonset, which is assumed to collect metrics in each nodes. See the [metricbeat.reference.yml](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-reference-yml.html) for full details  |
| `daemonset.modules.<name>.enabled`  | If true, enable configuration                                                                                                                                                                                                                                                               |                                                                                             |
| `daemonset.podAnnotations`          | Pod annotations for daemonset                                                                                                                                                                                                                                                               |                                                                                             |
| `daemonset.nodeSelector`            | Pod node selector for daemonset                                                                                                                                                                                                                                                             | `{}`                                                                                        |
| `daemonset.tolerations`             | Pod taint tolerations for daemonset                                                                                                                                                                                                                                                         | `[{"key": "node-role.kubernetes.io/master", "operator": "Exists", "effect": "NoSchedule"}]` |
| `deployment.modules.<name>.config`  | The content of the modules configuration file consumed by metricbeat deployed as deployment, which is assumed to collect cluster-level metrics. See the [metricbeat.reference.yml](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-reference-yml.html) for full details |                                                                                             |
| `deployment.modules.<name>.enabled` | If true, enable configuration                                                                                                                                                                                                                                                               |                                                                                             |
| `deployment.podAnnotations`         | Pod annotations for deployment                                                                                                                                                                                                                                                              |                                                                                             |
| `deployment.nodeSelector`           | Pod node selector for deployment                                                                                                                                                                                                                                                            | `{}`                                                                                        |
| `deployment.tolerations`            | Pod taint tolerations for deployment                                                                                                                                                                                                                                                        | `[]`                                                                                        |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
    --set rbac.create=true \
    stable/metricbeat
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/metricbeat
```

> **Tip**: You can use the default [values.yaml](values.yaml)
