# `@helm-charts/stable-kube-state-metrics`

Install kube-state-metrics to generate and expose cluster-level metrics

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | stable             |
| Chart Name          | kube-state-metrics |
| Chart Version       | 0.2.3              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for kube-state-metrics.
prometheusScrape: true
image:
  repository: gcr.io/google_containers/kube-state-metrics
  tag: v1.0.1
  pullPolicy: IfNotPresent
service:
  port: 8080
rbac:
  # If true, create & use RBAC resources
  create: false
  # Ignored if rbac.create is true
  serviceAccountName: default
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

| Parameter                 | Description                                             | Default                                     |
| ------------------------- | ------------------------------------------------------- | ------------------------------------------- |
| `image.repository`        | The image repository to pull from                       | gcr.io/google_containers/kube-state-metrics |
| `image.tag`               | The image tag to pull from                              | v1.0.1                                      |
| `image.pullPolicy`        | Image pull policy                                       | IfNotPresent                                |
| `service.port`            | The port of the container                               | 8080                                        |
| `prometheusScrape`        | Whether or not enable prom scrape                       | True                                        |
| `rbac.create`             | If true, create & use RBAC resources                    | False                                       |
| `rbac.serviceAccountName` | ServiceAccount to be used (ignored if rbac.create=true) | default                                     |
