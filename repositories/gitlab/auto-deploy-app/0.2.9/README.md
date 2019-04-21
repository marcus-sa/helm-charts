# `@helm-charts/gitlab-auto-deploy-app`

GitLab's Auto-deploy Helm Chart

| Field               | Value           |
| ------------------- | --------------- |
| Repository Name     | gitlab          |
| Chart Name          | auto-deploy-app |
| Chart Version       | 0.2.9           |
| NPM Package Version | 0.1.0           |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for chart.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
image:
  repository: gitlab.example.com/group/project
  tag: stable
  pullPolicy: Always
  secrets:
    - name: gitlab-registry
podAnnotations: {}
application:
  track: stable
  tier: web
  migrateCommand:
  initializeCommand:
  secretName:
  secretChecksum:
gitlab:
  app:
  env:
service:
  enabled: true
  annotations: {}
  name: web
  type: ClusterIP
  url: http://my.host.com/
  additionalHosts:
  commonName:
  externalPort: 5000
  internalPort: 5000
ingress:
  tls:
    enabled: true
    secretName: ''
  annotations:
    kubernetes.io/tls-acme: 'true'
    kubernetes.io/ingress.class: 'nginx'
livenessProbe:
  path: '/'
  initialDelaySeconds: 15
  timeoutSeconds: 15
  scheme: 'HTTP'
readinessProbe:
  path: '/'
  initialDelaySeconds: 5
  timeoutSeconds: 3
  scheme: 'HTTP'
postgresql:
  enabled: true
resources:
#  limits:
#    cpu: 100m
#    memory: 128Mi
#  requests:
#    cpu: 100m
#    memory: 128Mi

## Configure PodDisruptionBudget
## ref: https://kubernetes.io/docs/concepts/workloads/pods/disruptions/
#
podDisruptionBudget:
  enabled: false
  # minAvailable: 1
  maxUnavailable: 1
```

</details>

---

# GitLab's Auto-deploy Helm Chart

## Requirements

- Helm `2.9.0` and above is required in order support `"helm.sh/hook-delete-policy": before-hook-creation` for migrations

## Configuration

| Parameter                          | Description                                                                                                                                                                                                                                                                                                                 | Default                                                                  |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| replicaCount                       |                                                                                                                                                                                                                                                                                                                             | `1`                                                                      |
| image.repository                   |                                                                                                                                                                                                                                                                                                                             | `gitlab.example.com/group/project`                                       |
| image.tag                          |                                                                                                                                                                                                                                                                                                                             | `stable`                                                                 |
| image.pullPolicy                   |                                                                                                                                                                                                                                                                                                                             | `Always`                                                                 |
| image.secrets                      |                                                                                                                                                                                                                                                                                                                             | `[name: gitlab-registry]`                                                |
| podAnnotations                     | Pod annotations                                                                                                                                                                                                                                                                                                             | `{}`                                                                     |
| application.track                  |                                                                                                                                                                                                                                                                                                                             | `stable`                                                                 |
| application.tier                   |                                                                                                                                                                                                                                                                                                                             | `web`                                                                    |
| application.migrateCommand         | If present, this variable will run as a shell command within an application Container as a Helm pre-upgrade Hook. Intended to run migration commands.                                                                                                                                                                       | `nil`                                                                    |
| application.initializeCommand      | If present, this variable will run as shall command within an application Container as a Helm post-install Hook. Intended to run database initialization commands.                                                                                                                                                          | `nil`                                                                    |
| application.secretName             | Pass in the name of a Secret which the deployment will [load all key-value pairs from the Secret as environment variables](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/#configure-all-key-value-pairs-in-a-configmap-as-container-environment-variables) in the application container. | `nil`                                                                    |
| application.secretChecksum         | Pass in the checksum of the secrets referenced by `application.secretName`.                                                                                                                                                                                                                                                 | `nil`                                                                    |
| gitlab.env                         | GitLab environment.                                                                                                                                                                                                                                                                                                         | `nil`                                                                    |
| gitlab.app                         | GitLab project slug.                                                                                                                                                                                                                                                                                                        | `nil`                                                                    |
| service.enabled                    |                                                                                                                                                                                                                                                                                                                             | `true`                                                                   |
| service.annotations                | Service annotations                                                                                                                                                                                                                                                                                                         | `{}`                                                                     |
| service.name                       |                                                                                                                                                                                                                                                                                                                             | `web`                                                                    |
| service.type                       |                                                                                                                                                                                                                                                                                                                             | `ClusterIP`                                                              |
| service.url                        |                                                                                                                                                                                                                                                                                                                             | `http://my.host.com/`                                                    |
| service.additionalHosts            | If present, this list will add additional hostnames to the server configuration.                                                                                                                                                                                                                                            | `nil`                                                                    |
| service.commonName                 | If present, this will define the ssl certificate common name to be used by CertManager. `service.url` and `service.additionalHosts` will be added as Subject Alternative Names (SANs)                                                                                                                                       | `nil`                                                                    |
| service.externalPort               |                                                                                                                                                                                                                                                                                                                             | `5000`                                                                   |
| service.internalPort               |                                                                                                                                                                                                                                                                                                                             | `5000`                                                                   |
| ingress.tls.enabled                | If true, enables SSL                                                                                                                                                                                                                                                                                                        | `true`                                                                   |
| ingress.tls.secretName             | Name of the secret used to terminate SSL traffic                                                                                                                                                                                                                                                                            | `""`                                                                     |
| ingress.annotations                | Ingress annotations                                                                                                                                                                                                                                                                                                         | `{kubernetes.io/tls-acme: "true", kubernetes.io/ingress.class: "nginx"}` |
| livenessProbe.path                 | Path to access on the HTTP server on periodic probe of container liveness.                                                                                                                                                                                                                                                  | `/`                                                                      |
| livenessProbe.scheme               | Scheme to access the HTTP server (HTTP or HTTPS).                                                                                                                                                                                                                                                                           | `HTTP`                                                                   |
| livenessProbe.initialDelaySeconds  | # of seconds after the container has started before liveness probes are initiated.                                                                                                                                                                                                                                          | `15`                                                                     |
| livenessProbe.timeoutSeconds       | # of seconds after which the liveness probe times out.                                                                                                                                                                                                                                                                      | `15`                                                                     |
| readinessProbe.path                | Path to access on the HTTP server on periodic probe of container readiness.                                                                                                                                                                                                                                                 | `/`                                                                      |
| readinessProbe.scheme              | Scheme to access the HTTP server (HTTP or HTTPS).                                                                                                                                                                                                                                                                           | `HTTP`                                                                   |
| readinessProbe.initialDelaySeconds | # of seconds after the container has started before readiness probes are initiated.                                                                                                                                                                                                                                         | `5`                                                                      |
| readinessProbe.timeoutSeconds      | # of seconds after which the readiness probe times out.                                                                                                                                                                                                                                                                     | `3`                                                                      |
| postgresql.enabled                 |                                                                                                                                                                                                                                                                                                                             | `true`                                                                   |
| podDisruptionBudget.enabled        |                                                                                                                                                                                                                                                                                                                             | `false`                                                                  |
| podDisruptionBudget.maxUnavailable |                                                                                                                                                                                                                                                                                                                             | `1`                                                                      |
| podDisruptionBudget.minAvailable   | If present, this variable will configure minAvailable in the PodDisruptionBudget. :warning: if you have `replicaCount: 1` and `podDisruptionBudget.minAvailable: 1` `kubectl drain` will be blocked.                                                                                                                        | `nil`                                                                    |
