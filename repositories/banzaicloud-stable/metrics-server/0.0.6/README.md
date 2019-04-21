# `@helm-charts/banzaicloud-stable-metrics-server`

Metrics Server is a cluster-wide aggregator of resource usage data.

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | metrics-server     |
| Chart Version       | 0.0.6              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

apiService:
  # Specifies if the v1beta1.metrics.k8s.io API service should be created.
  #
  # You typically want this enabled! If you disable API service creation you have to
  # manage it outside of this chart for e.g horizontal pod autoscaling to
  # work with this release.
  create: true

image:
  repository: k8s.gcr.io/metrics-server-amd64
  tag: v0.3.1
  pullPolicy: IfNotPresent

## Node selector
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
nodeSelector: {}

## Affinity
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
affinity: {}

## Tolerations
## ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
tolerations: []
```

</details>

---

# metric-server

Metrics Server is a cluster-wide aggregator of resource usage data.

## Configuration

| Parameter               | Description                                                                                                                   | Default                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `rbac.create`           | Enable Role-based authentication                                                                                              | `true`                                          |
| `serviceAccount.create` | If `true`, create a new service account                                                                                       | `true`                                          |
| `serviceAccount.name`   | Service account to be used. If not set and `serviceAccount.create` is `true`, a name is generated using the fullname template | ``                                              |
| `apiService.create`     | Create the v1beta1.metrics.k8s.io API service                                                                                 | `true`                                          |
| `image.repository`      | Image repository                                                                                                              | `gcr.io/google_containers/metrics-server-amd64` |
| `image.tag`             | Image tag                                                                                                                     | `v0.2.1`                                        |
| `image.pullPolicy`      | Image pull policy                                                                                                             | `IfNotPresent`                                  |
| `nodeSelector`          | Node labels for pod assignment                                                                                                | {}                                              |
| `affinity`              | Affinity for pod assignment                                                                                                   | {}                                              |
| `tolerations`           | Toleration labels for pod assignment                                                                                          | {}                                              |
