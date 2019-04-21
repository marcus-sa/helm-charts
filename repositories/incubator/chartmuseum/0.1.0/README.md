# `@helm-charts/incubator-chartmuseum`

Helm Chart Repository with support for Amazon S3 and Google Cloud Storage

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | incubator   |
| Chart Name          | chartmuseum |
| Chart Version       | 0.1.0       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
replicaCount: 1
image:
  repository: chartmuseum/chartmuseum
  tag: v0.1.0
  pullPolicy: IfNotPresent
service:
  type: ClusterIP
  externalPort: 8080
  internalPort: 8080
resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 80m
    memory: 64Mi
```

</details>

---

# ChartMuseum Helm Chart

Work in progress...

Please see https://github.com/chartmuseum/chartmuseum
