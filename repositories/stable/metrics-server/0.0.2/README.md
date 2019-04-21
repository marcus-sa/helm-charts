# `@helm-charts/stable-metrics-server`

Metrics Server is a cluster-wide aggregator of resource usage data.

| Field               | Value          |
| ------------------- | -------------- |
| Repository Name     | stable         |
| Chart Name          | metrics-server |
| Chart Version       | 0.0.2          |
| NPM Package Version | 0.1.0          |

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
  repository: gcr.io/google_containers/metrics-server-amd64
  tag: v0.2.1
  pullPolicy: IfNotPresent
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
