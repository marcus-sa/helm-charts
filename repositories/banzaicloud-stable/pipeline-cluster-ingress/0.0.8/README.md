# `@helm-charts/banzaicloud-stable-pipeline-cluster-ingress`

Ingress controller to deploy on clusters managed by Banzai Cloud Pipeline

| Field               | Value                    |
| ------------------- | ------------------------ |
| Repository Name     | banzaicloud-stable       |
| Chart Name          | pipeline-cluster-ingress |
| Chart Version       | 0.0.8                    |
| NPM Package Version | 0.1.0                    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for pipeline-cluster-ingress
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

traefik:
  serviceType: LoadBalancer
  kubernetes:
    ingressEndpoint:
      useDefaultPublishedService: true
  acme:
    persistence:
      # This size is required because specific cloud provider requires at least 20Gi for storage
      size: 20Gi
  rbac:
    enabled: true
  ssl:
    enabled: true
    insecureSkipVerify: true
  metrics:
    prometheus:
      enabled: true
  resources:
    limits:
      cpu: 200m
      memory: 250Mi
```

</details>
