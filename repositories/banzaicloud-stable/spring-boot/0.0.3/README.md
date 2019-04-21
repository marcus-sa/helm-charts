# `@helm-charts/banzaicloud-stable-spring-boot`

Run the simple spring-boot application

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | spring-boot        |
| Chart Version       | 0.0.3              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  repository: 'openjdk'
  tag: '8-jdk-alpine'
  pullPolicy: 'IfNotPresent'

artifactUrl: ''

replicas: 1

resources:
  requests:
    memory: 250Mi
    cpu: 40m
  limits:
    memory: 2Gi
    cpu: 1

env: {}
#  - name: "JAVA_OPTS2"
#    value: "-Dserver.port=8080"

service:
  name: tomcat
  type: ClusterIP
  internalPort: 8080
  externalPort: 8080
  ## Service annotations
  ##
  annotations: {}

## Annotations to be added to Application pods
##
podAnnotations:
  prometheus.io/scrape: 'true'
  prometheus.io/port: '9030'
  prometheus.io/path: '/'

## alertmanager Ingress hostnames with optinal path
## Must be provided if Ingress is enabled
##

ingress:
  ## If true, Application Ingress will be created
  ##
  enabled: false
  hosts:
    - /
  #    - /hello-world
  #    - foo.example.com/hello-world

  ## Ingress annotations
  ##
  annotations:
    kubernetes.io/ingress.class: traefik
    traefik.frontend.rule.type: PathPrefixStrip
```

</details>
