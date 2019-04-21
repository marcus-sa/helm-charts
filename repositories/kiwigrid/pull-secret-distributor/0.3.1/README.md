# `@helm-charts/kiwigrid-pull-secret-distributor`

A Helm chart to distribute pull secret across namespaces

| Field               | Value                   |
| ------------------- | ----------------------- |
| Repository Name     | kiwigrid                |
| Chart Name          | pull-secret-distributor |
| Chart Version       | 0.3.1                   |
| NPM Package Version | 0.1.0                   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for pull-secret-distributor.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

image:
  repository: kiwigrid/pull-secret-distributor
  tag: 25
  pullPolicy: IfNotPresent
# csv list of secrets
pullSecrets: ''
# pullSecrets: "secret1,secret2

ignoreNamespaces: 'kube-system,kube-public'
rbac:
  enabled: true

resources:
  {}
  # limits:
  #   cpu: 50m
  #   memory: 20Mi
  # requests:
  #   cpu: 20m
  #   memory: 20Mi

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# Pull secret distributor

This chart was renamed and is therefore deprecated.

Please use [secret-replicator](https://github.com/kiwigrid/helm-charts/tree/master/charts/secret-replicator) instead.
