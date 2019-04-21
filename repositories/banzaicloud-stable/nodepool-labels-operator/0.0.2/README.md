# `@helm-charts/banzaicloud-stable-nodepool-labels-operator`

Banzai K8s Nodepool Labels Operator

| Field               | Value                    |
| ------------------- | ------------------------ |
| Repository Name     | banzaicloud-stable       |
| Chart Name          | nodepool-labels-operator |
| Chart Version       | 0.0.2                    |
| NPM Package Version | 0.1.0                    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for nodepool-labels-operator.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: banzaicloud/nodepool-labels-operator
  tag: 0.0.2
  pullPolicy: IfNotPresent

healthcheck:
  port: 8882
  endpoint: /healthz

configuration:
  log:
    format: 'logfmt'
    level: 'debug'

  labeler:
    managedLabelsAnnotation: 'nodepool.banzaicloud.io/managed-labels'
    forbiddenLabelDomains:
      - 'kubernetes.io'
      - 'k8s.io'
      - 'google.com'

  controller:
    namespace: 'default'
    nodepoolNameLabels:
      - 'nodepool.banzaicloud.io/name'
      - 'cloud.google.com/gke-nodepool'
      - 'agentpool'

rbac:
  enabled: true

nameOverride: ''
fullnameOverride: ''

resources: {}
nodeSelector: {}
tolerations: []
affinity: {}
podAnnotations: {}
```

</details>
