# `@helm-charts/banzaicloud-stable-kubeless`

A Helm chart for Kubeless

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | kubeless           |
| Chart Version       | 0.0.3              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for kubeless.

## Controller configuration
controller:
  deployment:
    replicaCount: 1
    image:
      repository: bitnami/kubeless-controller@sha256
      tag: 53592e0f023353665569313a1662a3aff18141e48caf4beca54d68436e71e0dc
      pullPolicy: IfNotPresent
```

</details>
