# `@helm-charts/stable-sonarqube`

Sonarqube is an open sourced code quality scanning tool

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | sonarqube |
| Chart Version       | 0.5.6     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for sonarqube.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
image:
  repository: sonarqube
  tag: 6.7.3
service:
  name: sonarqube
  type: LoadBalancer
  externalPort: 9000
  internalPort: 9000
  annotations:
  # May be used in example for internal load balancing in GCP:
  # cloud.google.com/load-balancer-type: Internal
ingress:
  enabled: false
  # Used to create an Ingress record.
  hosts:
    - sonar.organization.com
  annotations:
  # kubernetes.io/ingress.class: nginx
  # kubernetes.io/tls-acme: "true"
  tls:
  # Secrets must be manually created in the namespace.
  # - secretName: chart-example-tls
  #   hosts:
  #     - chart-example.local

# Affinity for pod assignment
# Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
affinity: {}

# Tolerations for pod assignment
# Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
tolerations: []

# Node labels for pod assignment
# Ref: https://kubernetes.io/docs/user-guide/node-selection/
nodeSelector: {}

readinessProbe:
  initialDelaySeconds: 60
  periodSeconds: 30
  failureThreshold: 6
livenessProbe:
  initialDelaySeconds: 60
  periodSeconds: 30

# Set extra env variables. Like proxy settings.
extraEnv: {}

resources: {}
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
persistence:
  enabled: false
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  # accessMode: ReadWriteOnce
  # size: 10Gi

# List of plugins to install.
# For example:
# plugins:
#  install:
#    - "https://github.com/AmadeusITGroup/sonar-stash/releases/download/1.3.0/sonar-stash-plugin-1.3.0.jar"
#    - "https://github.com/SonarSource/sonar-ldap/releases/download/2.2-RC3/sonar-ldap-plugin-2.2.0.601.jar"
plugins:
  install: []
  resources: {}
  # We allow the plugins init container to have a separate resources declaration because
  # the initContainer does not take as much resources.

# A custom sonar.properties file can be provided using a multiline YAML string.
# For example:
# sonarProperties: |
#   sonar.forceAuthentication=true
#   sonar.security.realm=LDAP
#   ldap.url=ldaps://organization.com

## Configuration values for the postgresql dependency
## ref: https://github.com/kubernetes/charts/blob/master/stable/postgresql/README.md
##
postgresql:
  # Enable to deploy the PostgreSQL chart
  enabled: true
  # To use an external PostgreSQL instance, set enabled to false and uncomment
  # the line below:
  # postgresServer: ""
  postgresUser: 'sonarUser'
  postgresPassword: 'sonarPass'
  postgresDatabase: 'sonarDB'
  # Specify the TCP port that PostgreSQL should use
  service:
    port: 5432
```

</details>

---

# SonarQube

[SonarQube](https://www.sonarqube.org/) is an open sourced code quality scanning tool.

## Introduction

This chart bootstraps a SonarQube instance with a PostgreSQL database.

## Prerequisites

- Kubernetes 1.6+

## Installing the chart:

To install the chart :

```bash
$ helm install stable/sonarqube
```

The above command deploys Sonarqube on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

The default login is admin/admin.

## Uninstalling the chart

To uninstall/delete the deployment:

```bash
$ helm list
NAME       	REVISION	UPDATED                 	STATUS  	CHART          	NAMESPACE
kindly-newt	1       	Mon Oct  2 15:05:44 2017	DEPLOYED	sonarqube-0.1.0	default
$ helm delete kindly-newt
```

## Configuration

The following table lists the configurable parameters of the Sonarqube chart and their default values.

| Parameter                     | Description                                | Default         |
| ----------------------------- | ------------------------------------------ | --------------- |
| `image.repository`            | image repository                           | `sonarqube`     |
| `image.tag`                   | `sonarqube` image tag.                     | 6.5             |
| `image.pullPolicy`            | Image pull policy                          | `IfNotPresent`  |
| `ingress.enabled`             | Flag for enabling ingress                  | false           |
| `service.type`                | Kubernetes service type                    | `LoadBalancer`  |
| `service.annotations`         | Kubernetes service annotations             | None            |
| `persistence.enabled`         | Flag for enabling persistent storage       | false           |
| `persistence.storageClass`    | Storage class to be used                   | "-"             |
| `persistence.accessMode`      | Volumes access mode to be set              | `ReadWriteOnce` |
| `persistence.size`            | Size of the volume                         | `10Gi`          |
| `sonarProperties`             | Custom `sonar.properties` file             | None            |
| `postgresql.enabled`          | Set to `false` to use external server      | `true`          |
| `postgresql.postgresServer`   | Hostname of the external Postgresql server | `null`          |
| `postgresql.postgresUser`     | Postgresql database user                   | `sonarUser`     |
| `postgresql.postgresPassword` | Postgresql database password               | `sonarPass`     |
| `postgresql.postgresDatabase` | Postgresql database name                   | `sonarDB`       |
| `postgresql.service.port`     | Postgresql port                            | `5432`          |
| `resources`                   | Sonarqube Pod resource requests & limits   | `{}`            |
| `affinity`                    | Node / Pod affinities                      | `{}`            |
| `nodeSelector`                | Node labels for pod assignment             | `{}`            |
| `tolerations`                 | List of node taints to tolerate            | `[]`            |
| `plugins.install`             | List of plugins to install                 | `[]`            |
| `plugins.resources`           | Plugin Pod resource requests & limits      | `{}`            |

You can also configure values for the PostgreSQL database via the Postgresql [README.md](https://github.com/kubernetes/charts/blob/master/stable/postgresql/README.md).

For overriding variables see: [Customizing the chart](https://docs.helm.sh/using_helm/#customizing-the-chart-before-installing)
