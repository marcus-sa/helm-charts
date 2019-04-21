# `@helm-charts/stable-kube-state-metrics`

Install kube-state-metrics to generate and expose cluster-level metrics

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | stable             |
| Chart Name          | kube-state-metrics |
| Chart Version       | 0.12.1             |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for kube-state-metrics.
prometheusScrape: true
image:
  repository: quay.io/coreos/kube-state-metrics
  tag: v1.4.0
  pullPolicy: IfNotPresent
service:
  port: 8080
  # Default to clusterIP for backward compatibility
  type: ClusterIP
  nodePort: 0
  loadBalancerIP: ''
rbac:
  # If true, create & use RBAC resources
  create: true
  # Ignored if rbac.create is true
  serviceAccountName: default

securityContext:
  enabled: true
  runAsUser: 65534
  fsGroup: 65534

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
nodeSelector: {}

## Tolerations for pod assignment
## Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
tolerations: []

# Annotations to be added to the pod
podAnnotations: {}

## Assign a PriorityClassName to pods if set
# priorityClassName: ""

# Available collectors for kube-state-metrics. By default all available
# collectors are enabled.
collectors:
  cronjobs: true
  daemonsets: true
  deployments: true
  endpoints: true
  horizontalpodautoscalers: true
  jobs: true
  limitranges: true
  namespaces: true
  nodes: true
  persistentvolumeclaims: true
  persistentvolumes: true
  pods: true
  replicasets: true
  replicationcontrollers: true
  resourcequotas: true
  services: true
  statefulsets: true
# Namespace to be enabled for collecting resources. By default all namespaces are collected.
# namespace: ""
```

</details>

---

# kube-state-metrics Helm Chart

- Installs the [kube-state-metrics agent](https://github.com/kubernetes/kube-state-metrics).

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install stable/kube-state-metrics
```

## Configuration

| Parameter                             | Description                                             | Default                           |
| ------------------------------------- | ------------------------------------------------------- | --------------------------------- |
| `image.repository`                    | The image repository to pull from                       | quay.io/coreos/kube-state-metrics |
| `image.tag`                           | The image tag to pull from                              | `v1.4.0`                          |
| `image.pullPolicy`                    | Image pull policy                                       | IfNotPresent                      |
| `service.port`                        | The port of the container                               | 8080                              |
| `prometheusScrape`                    | Whether or not enable prom scrape                       | true                              |
| `rbac.create`                         | If true, create & use RBAC resources                    | true                              |
| `rbac.serviceAccountName`             | ServiceAccount to be used (ignored if rbac.create=true) | default                           |
| `securityContext.enabled`             | Enable security context                                 | `true`                            |
| `securityContext.fsGroup`             | Group ID for the container                              | `65534`                           |
| `securityContext.runAsUser`           | User ID for the container                               | `65534`                           |
| `priorityClassName`                   | Name of Priority Class to assign pods                   | `nil`                             |
| `nodeSelector`                        | Node labels for pod assignment                          | {}                                |
| `tolerations`                         | Tolerations for pod assignment                          | []                                |
| `podAnnotations`                      | Annotations to be added to the pod                      | {}                                |
| `resources`                           | kube-state-metrics resource requests and limits         | {}                                |
| `collectors.cronjobs`                 | Enable the cronjobs collector.                          | true                              |
| `collectors.daemonsets`               | Enable the daemonsets collector.                        | true                              |
| `collectors.deployments`              | Enable the deployments collector.                       | true                              |
| `collectors.endpoints`                | Enable the endpoints collector.                         | true                              |
| `collectors.horizontalpodautoscalers` | Enable the horizontalpodautoscalers collector.          | true                              |
| `collectors.jobs`                     | Enable the jobs collector.                              | true                              |
| `collectors.limitranges`              | Enable the limitranges collector.                       | true                              |
| `collectors.namespaces`               | Enable the namespaces collector.                        | true                              |
| `collectors.nodes`                    | Enable the nodes collector.                             | true                              |
| `collectors.persistentvolumeclaims`   | Enable the persistentvolumeclaims collector.            | true                              |
| `collectors.persistentvolumes`        | Enable the persistentvolumes collector.                 | true                              |
| `collectors.pods`                     | Enable the pods collector.                              | true                              |
| `collectors.replicasets`              | Enable the replicasets collector.                       | true                              |
| `collectors.replicationcontrollers`   | Enable the replicationcontrollers collector.            | true                              |
| `collectors.resourcequotas`           | Enable the resourcequotas collector.                    | true                              |
| `collectors.services`                 | Enable the services collector.                          | true                              |
| `collectors.statefulsets`             | Enable the statefulsets collector.                      | true                              |
