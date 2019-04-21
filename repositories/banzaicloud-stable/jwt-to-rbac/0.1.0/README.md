# `@helm-charts/banzaicloud-stable-jwt-to-rbac`

A Helm chart for Kubernetes

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | jwt-to-rbac        |
| Chart Version       | 0.1.0              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for jwt-to-rbac.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: banzaicloud/jwt-to-rbac
  tag: 0.1.0
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

port:
  name: http
  containerPort: 5555
  protocol: TCP

configDir: /etc/jwt-to-rbac

service:
  type: ClusterIP
  port: 5555

config:
  app:
    addr: ':5555'
  log:
    level: '4'
    format: 'json'
    noColor: true
  tokenhandler:
    caCertPath: ''
    dex:
      clientID: ''
      issuerURL: ''
  rbachandler:
    githubOrg: ''
    customGroups: []

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - chart-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

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
```

</details>

---

# JWT-to-RBAC helm chart

Helm chart for [JWT-to-RBAC](https://github.com/banzaicloud/jwt-to-rbac) that lets you automatically generate RBAC resources based on JWT token.

## Installing the Chart

```bash
$ helm repo add banzaicloud-stable http://kubernetes-charts.banzaicloud.com/branch/master
$ helm repo update
```

Deploying jwt-to-rbac:

```bash
$ helm install --name <name> --set config.tokenhandler.dex.clientID=<client-id> --set config.tokenhandler.dex.issuerURL=<http://dex-url/dex>
```

## Configuration

The following table lists configurable parameters of the dex chart and their default values.

| Parameter                         | Description                                                                                     | Default                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------- |
| image.repository                  | jwt-to-rbac image                                                                               | banzaicloud/jwt-to-rbac |
| image.tag                         | image tag                                                                                       | 0.1.0                   |
| image.pullPolicy                  | image pull policy                                                                               | IfNotPresent            |
| port.name                         | port name                                                                                       | http                    |
| port.containerPort                | port port                                                                                       | 5555                    |
| post.protocol                     | port protocol                                                                                   | TCP                     |
| service.type                      | service type                                                                                    | ClusterIP               |
| service.port                      | service port                                                                                    | 5555                    |
| configDir                         | jwt-to-rbac config directory                                                                    | /etc/jwt-to-rbac        |
| config.app.addr                   | jwt-to-rbac listen address                                                                      | ":5555"                 |
| config.log.level                  | jwt-to-rbac log level                                                                           | "4"                     |
| config.log.format                 | jwt-to-rbac log format                                                                          | "json"                  |
| config.log.noColor                | jwt-to-rbac log noColor                                                                         | true                    |
| config.tokenhandler.caCertPath    | CA cert for Dex used self-signed cert                                                           | ""                      |
| config.tokenhandler.dex.clientID  | client ID for Dex                                                                               | ""                      |
| config.tokenhandler.dex.issuerURL | Dex url                                                                                         | ""                      |
| config.rbachandler.githubOrg      | specified github organization                                                                   | ""                      |
| config.rbachandler.customGroups   | custom group mapping, more details in [JWT-to-RBAC](https://github.com/banzaicloud/jwt-to-rbac) | []                      |
