# `@helm-charts/presslabs-wordpress-operator`

A Helm chart for Kubernetes

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | presslabs          |
| Chart Name          | wordpress-operator |
| Chart Version       | v0.1.0             |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
replicaCount: 1
image: quay.io/presslabs/wordpress-operator:v0.1.0
imagePullPolicy: IfNotPresent
nameOverride: ''
fullnameOverride: ''
rbac:
  create: true
serviceAccount:
  create: true
  name: ''
resources: {}
nodeSelector: {}
tolerations: []
affinity: {}
```

</details>
