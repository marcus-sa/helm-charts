# `@helm-charts/presslabs-wordpress-operator`

Presslabs WordPress Operator Helm Chart

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | presslabs          |
| Chart Name          | wordpress-operator |
| Chart Version       | v0.1.8             |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for wordpress-operator.
replicaCount: 1

image: quay.io/presslabs/wordpress-operator:v0.1.8
imagePullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

crd:
  install: true

rbac:
  create: true

serviceAccount:
  create: true
  name: ''

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}

defaultRuntime:
  install: true
  image: quay.io/presslabs/wordpress-runtime:4.9.8-php71
```

</details>
