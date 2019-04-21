# `@helm-charts/stable-kube-state-metrics`

Install kube-state-metrics to generate and expose cluster-level metrics

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | stable             |
| Chart Name          | kube-state-metrics |
| Chart Version       | 0.4.0              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for kube-state-metrics.
prometheusScrape: true
image:
  repository: gcr.io/google_containers/kube-state-metrics
  tag: v1.1.0
  pullPolicy: IfNotPresent
service:
  port: 8080
  # Default to clusterIP for backward compatibility
  type: ClusterIP
  nodePort: 0
  loadBalancerIP: ''
rbac:
  # If true, create & use RBAC resources
  create: false
  # Ignored if rbac.create is true
  serviceAccountName: default

# Available collectors for kube-state-metrics. By default all available
# collectors are enabled.
collectors:
  daemonsets: true
  deployments: true
  limitranges: true
  nodes: true
  pods: true
  replicasets: true
  replicationcontrollers: true
  resourcequotas: true
  services: true
  jobs: true
  cronjobs: true
  statefulsets: true
  persistentvolumeclaims: true
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

| Parameter                           | Description                                             | Default                                     |
| ----------------------------------- | ------------------------------------------------------- | ------------------------------------------- |
| `image.repository`                  | The image repository to pull from                       | gcr.io/google_containers/kube-state-metrics |
| `image.tag`                         | The image tag to pull from                              | v1.0.1                                      |
| `image.pullPolicy`                  | Image pull policy                                       | IfNotPresent                                |
| `service.port`                      | The port of the container                               | 8080                                        |
| `prometheusScrape`                  | Whether or not enable prom scrape                       | True                                        |
| `rbac.create`                       | If true, create & use RBAC resources                    | False                                       |
| `rbac.serviceAccountName`           | ServiceAccount to be used (ignored if rbac.create=true) | default                                     |
| `resources`                         | kube-state-metrics resource requests and limits         | {}                                          |
| `collectors.daemonsets`             | Enable the daemonsets collector.                        | true                                        |
| `collectors.deployments`            | Enable the deployments collector.                       | true                                        |
| `collectors.limitranges`            | Enable the limitranges collector.                       | true                                        |
| `collectors.nodes`                  | Enable the nodes collector.                             | true                                        |
| `collectors.pods`                   | Enable the pods collector.                              | true                                        |
| `collectors.replicasets`            | Enable the replicasets collector.                       | true                                        |
| `collectors.replicationcontrollers` | Enable the replicationcontrollers collector.            | true                                        |
| `collectors.resourcequotas`         | Enable the resourcequotas collector.                    | true                                        |
| `collectors.services`               | Enable the services collector.                          | true                                        |
| `collectors.jobs`                   | Enable the jobs collector.                              | true                                        |
| `collectors.cronjobs`               | Enable the cronjobs collector.                          | true                                        |
| `collectors.statefulsets`           | Enable the statefulsets collector.                      | true                                        |
| `collectors.persistentvolumeclaims` | Enable the persistentvolumeclaims collector.            | true                                        |
