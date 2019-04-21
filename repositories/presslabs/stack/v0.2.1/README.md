# `@helm-charts/presslabs-stack`

Open-Source WordPress Infrastructure on Kubernetes

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | presslabs |
| Chart Name          | stack     |
| Chart Version       | v0.2.1    |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
wordpress-operator:
  enabled: true

mysql-operator:
  enabled: true
  orchestrator:
    replicas: 1

nginx-ingress:
  enabled: true

cert-manager:
  enabled: true

prometheus-operator:
  enabled: true
```

</details>
