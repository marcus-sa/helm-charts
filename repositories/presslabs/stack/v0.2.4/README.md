# `@helm-charts/presslabs-stack`

Open-Source WordPress Infrastructure on Kubernetes

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | presslabs |
| Chart Name          | stack     |
| Chart Version       | v0.2.4    |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
letsencrypt:
  enabled: false
  email: ''
  server: https://acme-v02.api.letsencrypt.org/directory
wordpress-operator:
  enabled: true
mysql-operator:
  enabled: true
  orchestrator:
    topologyPassword: this-must-be-set-in-stone-because-of-mysql-operator-bug-75
    image: quay.io/presslabs/orchestrator:v3.0.14-r37
    replicas: 1
nginx-ingress:
  enabled: true
  controller:
    config:
      custom-http-errors: 400,401,403,404,415,500,502,503,504
    publishService:
      enabled: true
  defaultBackend:
    image:
      repository: quay.io/presslabs/default-backend
      tag: v0.2.4
      pullPolicy: Always
cert-manager:
  enabled: true
prometheus-operator:
  enabled: true
```

</details>
