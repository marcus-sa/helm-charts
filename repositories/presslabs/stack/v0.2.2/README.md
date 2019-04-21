# `@helm-charts/presslabs-stack`

Open-Source WordPress Infrastructure on Kubernetes

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | presslabs |
| Chart Name          | stack     |
| Chart Version       | v0.2.2    |
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
  controller:
    config:
      custom-http-errors: 400,401,403,404,415,500,502,503,504
  defaultBackend:
    image:
      repository: quay.io/presslabs/default-backend
      tag: v0.2.2
cert-manager:
  enabled: true
prometheus-operator:
  enabled: true
```

</details>
