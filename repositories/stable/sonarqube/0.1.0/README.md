# `@helm-charts/stable-sonarqube`

Sonarqube is an open sourced code quality scanning tool

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | sonarqube |
| Chart Version       | 0.1.0     |
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
  tag: 6.5
service:
  name: sonarqube
  type: LoadBalancer
  externalPort: 9000
  internalPort: 9000
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
  # dataVolumeSize: 8Gi
  # confVolumeSize: 1Gi
  # extensionsVolumeSize: 2Gi

## Configuration values for the postgresql dependency
## ref: https://github.com/kubernetes/charts/blob/master/stable/postgressql/README.md
##
postgresql:
  postgresUser: 'sonarUser'
  postgresPassword: 'sonarPass'
  postgresDatabase: 'sonarDB'
```

</details>

---

# SonarQube

[SonarQube](https://www.sonarqube.org/) is an open sourced code quality scanning tool

## Introduction

This chart bootstraps a SonarQube instance with a PostgreSQL database

## Prerequisites

- Kubernetes 1.6+

## Installing the chart:

To install the chart :

```bash
$ helm install stable/sonarqube
```

The above command deploys Sonarqube on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation

The default login is admin/admin

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

| Parameter                          | Description                          | Default         |
| ---------------------------------- | ------------------------------------ | --------------- |
| `imageTag`                         | `sonarqube` image tag.               | 6.5             |
| `imagePullPolicy`                  | Image pull policy                    | `IfNotPresent`  |
| `ingress.enabled`                  | Flag for enabling ingress            | false           |
| `service.type`                     | Kubernetes service type              | `LoadBalancer`  |
| `persistence.enabled`              | Flag for enabling persistent storage | false           |
| `persistence.storageClass`         | Storage class to be used             | "-"             |
| `persistence.accessMode`           | Volumes access mode to be set        | `ReadWriteOnce` |
| `persistence.dataVolumeSize`       | Size of the data volume              | `8Gi`           |
| `persistence.confVolumeSize`       | Size of the conf volume              | `1Gi`           |
| `persistence.extensionsVolumeSize` | Size of the extension volume         | `2Gi`           |
| `postgresql.postgresUser`          | Postgresql database user             | `sonarUser`     |
| `postgresql.postgresPassword`      | Postgresql database password         | `sonarPass`     |
| `postgresql.postgresDatabase`      | Postgresql database name             | `sonarDB`       |

You can also configure values for the PostgreSQL database via the Postgresql [README.md](https://github.com/kubernetes/charts/blob/master/stable/postgresql/README.md)

For overriding variables see: [Customizing the chart](https://docs.helm.sh/using_helm/#customizing-the-chart-before-installing)
