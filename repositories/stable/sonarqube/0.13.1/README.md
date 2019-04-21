# `@helm-charts/stable-sonarqube`

Sonarqube is an open sourced code quality scanning tool

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | sonarqube |
| Chart Version       | 0.13.1    |
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
  tag: 7.4-community
  # If using a private repository, the name of the imagePullSecret to use
  # pullSecret: my-repo-secret
# Starting 6.7.6 and 7.4 official sonarqube docker image, command is not required
# anymore. For older images, uncomment the following lines.
# command: [
#   "sh",
#   "-ce",
#   "mkdir /scripts &&
#   cp /tmp-script/startup.sh /scripts/startup.sh &&
#   chmod 0755 /scripts/startup.sh &&
#   /scripts/startup.sh
#   "
#   ]

# Set security context for sonarqube pod
securityContext:
  fsGroup: 999

service:
  name: sonarqube
  type: LoadBalancer
  externalPort: 9000
  internalPort: 9000
  labels:
  annotations: {}
  # May be used in example for internal load balancing in GCP:
  # cloud.google.com/load-balancer-type: Internal
  loadBalancerSourceRanges:
    - 0.0.0.0/0
  # loadBalancerIP: 1.2.3.4
ingress:
  enabled: false
  # Used to create an Ingress record.
  hosts:
    - sonar.organization.com
  annotations: {}
  # kubernetes.io/ingress.class: nginx
  # kubernetes.io/tls-acme: "true"
  # This property allows for reports up to a certain size to be uploaded to SonarQube
  # nginx.ingress.kubernetes.io/proxy-body-size: "8m"
  tls: {}
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

# hostAliases allows the modification of the hosts file inside a container
hostAliases: []
# - ip: "192.168.1.10"
#   hostnames:
#   - "example.com"
#   - "www.example.com"

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

## Configuration value to select database type
## Option to use "postgresql" or "mysql" database type, by default "postgresql" is chosen
## Set the "enable" field to true of the database type you select (if you want to use internal database) and false of the one you don't select
database:
  type: 'postgresql'

## Configuration values for postgresql dependency
## ref: https://github.com/kubernetes/charts/blob/master/stable/postgresql/README.md
postgresql:
  # Enable to deploy the PostgreSQL chart
  enabled: true
  # To use an external PostgreSQL instance, set enabled to false and uncomment
  # the line below:
  # postgresServer: ""
  # To use an external secret for the password for an external PostgreSQL
  # instance, set enabled to false and provide the name of the secret on the
  # line below:
  # postgresPasswordSecret: ""
  postgresUser: 'sonarUser'
  postgresPassword: 'sonarPass'
  postgresDatabase: 'sonarDB'
  # Specify the TCP port that PostgreSQL should use
  service:
    port: 5432

## Configuration values for the mysql dependency
## ref: https://github.com/kubernetes/charts/blob/master/stable/mysql/README.md
##
mysql:
  # Enable to deploy the mySQL chart
  enabled: false
  # To use an external mySQL instance, set enabled to false and uncomment
  # the line below:
  # mysqlServer: ""
  # To use an external secret for the password for an external mySQL instance,
  # set enabled to false and provide the name of the secret on the line below:
  # mysqlPasswordSecret: ""
  mysqlUser: 'sonarUser'
  mysqlPassword: 'sonarPass'
  mysqlDatabase: 'sonarDB'
  # mysqlParams:
  #   useSSL: "true"
  # Specify the TCP port that mySQL should use
  service:
    port: 3306
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

| Parameter                           | Description                                                      | Default                                        |
| ----------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------- |
| `image.repository`                  | image repository                                                 | `sonarqube`                                    |
| `image.tag`                         | `sonarqube` image tag.                                           | 6.5                                            |
| `image.pullPolicy`                  | Image pull policy                                                | `IfNotPresent`                                 |
| `image.pullSecret`                  | imagePullSecret to use for private repository                    |                                                |
| `command`                           | command to run in the container                                  | `nil` (need to be set prior to 6.7.6, and 7.4) |
| `securityContext.fsGroup`           | Group applied to mounted directories/files                       | `999`                                          |
| `ingress.enabled`                   | Flag for enabling ingress                                        | false                                          |
| `service.type`                      | Kubernetes service type                                          | `LoadBalancer`                                 |
| `service.labels`                    | Kubernetes service labels                                        | None                                           |
| `service.annotations`               | Kubernetes service annotations                                   | None                                           |
| `service.loadBalancerSourceRanges`  | Kubernetes service LB Allowed inbound IP addresses               | 0.0.0.0/0                                      |
| `service.loadBalancerIP`            | Kubernetes service LB Optional fixed external IP                 | None                                           |
| `persistence.enabled`               | Flag for enabling persistent storage                             | false                                          |
| `persistence.storageClass`          | Storage class to be used                                         | "-"                                            |
| `persistence.accessMode`            | Volumes access mode to be set                                    | `ReadWriteOnce`                                |
| `persistence.size`                  | Size of the volume                                               | None                                           |
| `sonarProperties`                   | Custom `sonar.properties` file                                   | None                                           |
| `database.type`                     | Set to "mysql" to use mysql database                             | `postgresql`                                   |
| `postgresql.enabled`                | Set to `false` to use external server / mysql database           | `true`                                         |
| `postgresql.postgresServer`         | Hostname of the external Postgresql server                       | `null`                                         |
| `postgresql.postgresPasswordSecret` | Secret containing the password of the external Postgresql server | `null`                                         |
| `postgresql.postgresUser`           | Postgresql database user                                         | `sonarUser`                                    |
| `postgresql.postgresPassword`       | Postgresql database password                                     | `sonarPass`                                    |
| `postgresql.postgresDatabase`       | Postgresql database name                                         | `sonarDB`                                      |
| `postgresql.service.port`           | Postgresql port                                                  | `5432`                                         |
| `mysql.enabled`                     | Set to `false` to use external server / postgresql database      | `false`                                        |
| `mysql.mysqlServer`                 | Hostname of the external Mysql server                            | `null`                                         |
| `mysql.mysqlPasswordSecret`         | Secret containing the password of the external Mysql server      | `null`                                         |
| `mysql.mysqlUser`                   | Mysql database user                                              | `sonarUser`                                    |
| `mysql.mysqlPassword`               | Mysql database password                                          | `sonarPass`                                    |
| `mysql.mysqlDatabase`               | Mysql database name                                              | `sonarDB`                                      |
| `mysql.mysqlParams`                 | Mysql parameters for JDBC connection string                      | `{}`                                           |
| `mysql.service.port`                | Mysql port                                                       | `3306`                                         |
| `resources`                         | Sonarqube Pod resource requests & limits                         | `{}`                                           |
| `affinity`                          | Node / Pod affinities                                            | `{}`                                           |
| `nodeSelector`                      | Node labels for pod assignment                                   | `{}`                                           |
| `hostAliases`                       | Aliases for IPs in /etc/hosts                                    | `[]`                                           |
| `tolerations`                       | List of node taints to tolerate                                  | `[]`                                           |
| `plugins.install`                   | List of plugins to install                                       | `[]`                                           |
| `plugins.resources`                 | Plugin Pod resource requests & limits                            | `{}`                                           |

You can also configure values for the PostgreSQL / MySQL database via the Postgresql [README.md](https://github.com/kubernetes/charts/blob/master/stable/postgresql/README.md) / MySQL [README.md](https://github.com/kubernetes/charts/blob/master/stable/mysql/README.md)

For overriding variables see: [Customizing the chart](https://docs.helm.sh/using_helm/#customizing-the-chart-before-installing)
