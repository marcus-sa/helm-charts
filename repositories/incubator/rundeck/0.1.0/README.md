# `@helm-charts/incubator-rundeck`

A Rundeck chart for Kubernetes

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | rundeck   |
| Chart Version       | 0.1.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for rundeck.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: rundeck/rundeck
  tag: 3.0.16
  pullPolicy: IfNotPresent

rundeck:
  env:
    RUNDECK_GRAILS_URL: 'http://{{ .Release.Name }}.{{ .Release.Namespace }}.svc.cluster.local'
    RUNDECK_SERVER_FORWARDED: 'true'
    RUNDECK_LOGGING_STRATEGY: 'CONSOLE'
    # RUNDECK_DATABASE_DRIVER: com.mysql.jdbc.Driver
    # RUNDECK_DATABASE_USERNAME: rundeck
    # RUNDECK_DATABASE_PASSWORD: rundeck
    # RUNDECK_DATABASE_URL: jdbc:mysql://mysql/rundeck?autoReconnect=true&useSSL=false
    # RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_NAME: com.rundeck.rundeckpro.amazon-s3
    # RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_BUCKET: ${RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_BUCKET}
    # RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_REGION: ${RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_REGION}
    # RUNDECK_STORAGE_CONVERTER_1_CONFIG_PASSWORD: ${RUNDECK_STORAGE_PASSWORD}
    # RUNDECK_CONFIG_STORAGE_CONVERTER_1_CONFIG_PASSWORD: ${RUNDECK_STORAGE_PASSWORD}
  # sshSecrets: "ssh-secret"
  awsCredentialsSecret: ''

nameOverride: ''
fullnameOverride: ''

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  paths: []
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

# Rundeck Community Helm Chart

Rundeck lets you turn your operations procedures into self-service jobs. Safely give others the control and visibility they need. Read more about Rundeck at [https://www.rundeck.com/open-source](https://www.rundeck.com/open-source).

## Install

    helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
    helm install incubator/rundeck

## Configuration

The following configurations may be set. It is recommended to use values.yaml for overwriting the Riemann config.

| Parameter                    | Description                                                             | Default                                               |
| ---------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------- |
| replicaCount                 | How many replicas to run. Riemann can really only work with one.        | 1                                                     |
| image.repository             | Name of the image to run, without the tag.                              | [rundeck/rundeck](https://github.com/rundeck/rundeck) |
| image.tag                    | The image tag to use.                                                   | 3.0.16                                                |
| image.pullPolicy             | The kubernetes image pull policy.                                       | IfNotPresent                                          |
| service.type                 | The kubernetes service type to use.                                     | ClusterIP                                             |
| service.port                 | The tcp port the service should listen on.                              | 80                                                    |
| ingress                      | Any ingress rules to apply.                                             | None                                                  |
| resources                    | Any resource constraints to apply.                                      | None                                                  |
| rundeck.env                  | The rundeck environment variables that you would want to set            | Default variables provided in docker file             |
| rundeck.sshSecrets           | A reference to the Kubernetes Secret that contains the ssh keys.        | ""                                                    |
| rundeck.awsCredentialsSecret | A reference to the Kubernetes Secret that contains the aws credentials. | ""                                                    |
