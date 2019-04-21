# `@helm-charts/banzaicloud-stable-pipeline-ui`

Helm chart for Kubernetes. Provides the Graphical User Interface for Pipeline PaaS

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | pipeline-ui        |
| Chart Version       | 1.0.0              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for pipeline-ui.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: banzaicloud/pipeline-web
  tag: 0.6.2
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  annotations:
    {}
    #kubernetes.io/ingress.class: traefik
    #ingress.kubernetes.io/ssl-redirect: "false"
    #traefik.frontend.rule.type: PathPrefix
  hosts:
    # - "/"
    # - "domain.com/xyz"
    # - "domain.com"
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

resources: #{}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  requests:
    cpu: 250m
    memory: 256Mi

nodeSelector: {}

tolerations: []

affinity: {}

## Additional deployment labels and annotations
## ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
deploymentLabels: {}
deploymentAnnotations: {}

apiUrl: http://localhost
tag: local

cloudinfoUrl:
recommenderUrl:

formspreeFormId: ''

googleAnalyticsTrackingID: ''

extraEnvs: []
```

</details>
