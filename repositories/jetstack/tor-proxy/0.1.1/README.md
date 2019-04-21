# `@helm-charts/jetstack-tor-proxy`

A Helm chart for Kubernetes

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | jetstack  |
| Chart Name          | tor-proxy |
| Chart Version       | 0.1.1     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for tor-proxy.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 3
tor:
  image:
    repository: simonswine/tor
    tag: 0.2.8.12
    pullPolicy: Always
  resources:
    limits:
      cpu: 500m
      memory: 128Mi
    requests:
      cpu: 10m
      memory: 32Mi
  serverAuth: {}

privoxy:
  image:
    repository: simonswine/privoxy
    tag: 3.0.24
    pullPolicy: Always
  resources:
    limits:
      cpu: 500m
      memory: 128Mi
    requests:
      cpu: 10m
      memory: 32Mi

service:
  name: polipo
  type: ClusterIP
  externalPort: 8123
  internalPort: 8123
```

</details>
