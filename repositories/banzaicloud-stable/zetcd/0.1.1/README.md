# `@helm-charts/banzaicloud-stable-zetcd`

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | zetcd              |
| Chart Version       | 0.1.1              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
zetcd:
  name: zetcd
  replicaCount: 2

  resources: {}

  nodeSelector: {}

  image:
    repository: quay.io/coreos/zetcd
    tag: v0.0.4
    pullPolicy: IfNotPresent

  service:
    name: zetcd-service
    type: ClusterIP
    port: 2181

  etcd:
    endpoint: etcd-cluster-client:2379
```

</details>
