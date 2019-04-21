# `@helm-charts/stable-metrics-server`

Metrics Server is a cluster-wide aggregator of resource usage data.

| Field               | Value          |
| ------------------- | -------------- |
| Repository Name     | stable         |
| Chart Name          | metrics-server |
| Chart Version       | 2.5.1          |
| NPM Package Version | 0.1.0          |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
rbac:
  # Specifies whether RBAC resources should be created
  create: true
  pspEnabled: false

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

hostNetwork:
  # Specifies if metrics-server should be started in hostNetwork mode.
  #
  # You would require this enabled if you use alternate overlay networking for pods and
  # API server unable to communicate with metrics-server. As an example, this is required
  # if you use Weave netwok on EKS
  enabled: false

image:
  repository: gcr.io/google_containers/metrics-server-amd64
  tag: v0.3.1
  pullPolicy: IfNotPresent

args:
  - --logtostderr
# enable this if you have self-signed certificates, see: https://github.com/kubernetes-incubator/metrics-server
#  - --kubelet-insecure-tls

resources: {}

nodeSelector: {}

tolerations: []

affinity: {}

replicas: 1

podAnnotations: {}
#  scheduler.alpha.kubernetes.io/critical-pod: ''

# priorityClassName: system-node-critical

extraVolumeMounts: []
#  - name: secrets
#    mountPath: /etc/kubernetes/secrets
#    readOnly: true

extraVolumes: []
#  - name: secrets
#    secret:
#      secretName: kube-apiserver
```

</details>

---

# metrics-server

[Metrics Server](https://github.com/kubernetes-incubator/metrics-server) is a cluster-wide aggregator of resource usage data.

## Configuration

| Parameter               | Description                                                                                                                   | Default                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `rbac.create`           | Enable Role-based authentication                                                                                              | `true`                                          |
| `rbac.pspEnabled`       | Enable pod security policy support                                                                                            | `false`                                         |
| `serviceAccount.create` | If `true`, create a new service account                                                                                       | `true`                                          |
| `serviceAccount.name`   | Service account to be used. If not set and `serviceAccount.create` is `true`, a name is generated using the fullname template | ``                                              |
| `apiService.create`     | Create the v1beta1.metrics.k8s.io API service                                                                                 | `true`                                          |
| `hostNetwork.enabled`   | Enable hostNetwork mode                                                                                                       | `false`                                         |
| `image.repository`      | Image repository                                                                                                              | `gcr.io/google_containers/metrics-server-amd64` |
| `image.tag`             | Image tag                                                                                                                     | `v0.3.1`                                        |
| `image.pullPolicy`      | Image pull policy                                                                                                             | `IfNotPresent`                                  |
| `args`                  | Command line arguments                                                                                                        | `--logtostderr`                                 |
| `resources`             | CPU/Memory resource requests/limits.                                                                                          | `{}`                                            |
| `tolerations`           | List of node taints to tolerate (requires Kubernetes >=1.6)                                                                   | `[]`                                            |
| `nodeSelector`          | Node labels for pod assignment                                                                                                | `{}`                                            |
| `affinity`              | Node affinity                                                                                                                 | `{}`                                            |
| `replicas`              | Number of replicas                                                                                                            | `1`                                             |
| `extraVolumeMounts`     | Ability to provide volume mounts to the pod                                                                                   | `[]`                                            |
| `extraVolumes`          | Ability to provide volumes to the pod                                                                                         | `[]`                                            |
| `podAnnotations`        | annotations to be added to pods                                                                                               | `{}`                                            |
| `priorityClassName`     | priorityClassName to be added to pods                                                                                         | `""`                                            |
