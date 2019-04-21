# `@helm-charts/incubator-kube-registry-proxy`

Installs the kubernetes-registry-proxy cluster addon.

| Field               | Value               |
| ------------------- | ------------------- |
| Repository Name     | incubator           |
| Chart Name          | kube-registry-proxy |
| Chart Version       | 0.1.0               |
| NPM Package Version | 0.1.0               |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  repository: gcr.io/google_containers/kube-registry-proxy
  tag: 0.4
  pullPolicy: IfNotPresent

registry:
  host: 'gcr.io'
  port: ''
```

</details>

---

# kube-registry-proxy Helm Chart

- Installs the [kube-registry-proxy cluster addon](https://github.com/kubernetes/kubernetes/tree/master/cluster/addons/registry).

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
$ helm install --name my-release incubator/kube-registry-proxy
```

## Configuration

| Parameter          | Description                         | Default                                      |
| ------------------ | ----------------------------------- | -------------------------------------------- |
| `image.repository` | The image repository to pull from   | gcr.io/google_containers/kube-registry-proxy |
| `image.tag`        | The image tag to pull from          | 0.4                                          |
| `image.pullPolicy` | Image pull policy                   | IfNotPresent                                 |
| `registry.host`    | The hostname of the target registry | "gcr.io"                                     |
| `registry.port`    | The port of the target registry     | \<blank>                                     |
