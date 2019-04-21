# `@helm-charts/stable-prometheus-mysql-exporter`

A Helm chart for prometheus mysql exporter with cloudsqlproxy

| Field               | Value                     |
| ------------------- | ------------------------- |
| Repository Name     | stable                    |
| Chart Name          | prometheus-mysql-exporter |
| Chart Version       | 0.2.1                     |
| NPM Package Version | 0.1.0                     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for prometheus-mysql-exporter.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: 'prom/mysqld-exporter'
  tag: 'v0.11.0'
  pullPolicy: 'IfNotPresent'

service:
  name: mysql-exporter
  type: ClusterIP
  externalPort: 9104
  internalPort: 9104

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

annotations:
  prometheus.io/scrape: 'true'
  prometheus.io/path: '/metrics'
  prometheus.io/port: '9104'

# mysql connection params which build the DATA_SOURCE_NAME env var of the docker container
mysql:
  db: ''
  host: 'localhost'
  param: ''
  pass: 'password'
  port: 3306
  protocol: ''
  user: 'exporter'

# cloudsqlproxy https://cloud.google.com/sql/docs/mysql/sql-proxy
cloudsqlproxy:
  enabled: false
  image:
    repo: 'gcr.io/cloudsql-docker/gce-proxy'
    tag: '1.11'
    pullPolicy: 'IfNotPresent'
  instanceConnectionName: 'project:us-central1:dbname'
  port: '3306'
  credentials: '{
    "type": "service_account",
    "project_id": "project",
    "private_key_id": "KEYID1",
    "private_key": "-----BEGIN PRIVATE KEY-----\sdajsdnasd\n-----END PRIVATE KEY-----\n",
    "client_email": "user@project.iam.gserviceaccount.com",
    "client_id": "111111111",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/user%40project.iam.gserviceaccount.com"
    }'
```

</details>

---

# Prometheus Mysql Exporter

- Installs prometheus [mysql exporter](https://github.com/prometheus/mysqld_exporter)

## TL;DR;

```console
$ helm install stable/prometheus-mysql-exporter
```

## Introduction

This chart bootstraps a prometheus [mysql exporter](http://github.com/prometheus/mysql_exporter) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager. The exporter can connect to mysql directly or using the [Cloud SQL Proxy](https://cloud.google.com/sql/docs/mysql/sql-proxy).

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/prometheus-mysql-exporter --set datasource="username:password@(db:3306)/"
```

The command deploys a mysql exporter on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the mysql exporter chart and their default values.

| Parameter                              | Description                                         | Default                            |
| -------------------------------------- | --------------------------------------------------- | ---------------------------------- |
| `replicaCount`                         | Amount of pods for the deployment                   | `1`                                |
| `image.repository`                     | Image repository                                    | `prom/mysqld-exporter`             |
| `image.tag`                            | Image tag                                           | `v0.11.0`                          |
| `image.pullPolicy`                     | Image pull policy                                   | `IfNotPresent`                     |
| `service.name`                         | Service name                                        | `mysql-exporter`                   |
| `service.type`                         | Service type                                        | `ClusterIP`                        |
| `service.externalport`                 | The service port                                    | `9104`                             |
| `service.internalPort`                 | The target port of the container                    | `9104`                             |
| `resources`                            | CPU/Memory resource requests/limits                 | `{}`                               |
| `annotations`                          | pod annotations for easier discovery                | `see values.yaml`                  |
| `mysql.db`                             | MySQL connection db (optional)                      | `""`                               |
| `mysql.host`                           | MySQL connection host                               | `localhost`                        |
| `mysql.param`                          | MySQL connection parameters (optional)              | `"tcp"`                            |
| `mysql.pass`                           | MySQL connection password                           | `password`                         |
| `mysql.port`                           | MySQL connection port                               | `3306`                             |
| `mysql.protocol`                       | MySQL connection protocol (optional)                | `""`                               |
| `mysql.user`                           | MySQL connection username                           | `exporter`                         |
| `cloudsqlproxy.enabled`                | Flag to enable the connection using Cloud SQL Proxy | `false`                            |
| `cloudsqlproxy.image.repo`             | Cloud SQL Proxy image repository                    | `gcr.io/cloudsql-docker/gce-proxy` |
| `cloudsqlproxy.image.tag`              | Cloud SQL Proxy image tag                           | `1.11`                             |
| `cloudsqlproxy.image.pullPolicy`       | Cloud SQL Proxy image pull policy                   | `IfNotPresent`                     |
| `cloudsqlproxy.instanceConnectionName` | Google Cloud instance connection name               | `project:us-central1:dbname`       |
| `cloudsqlproxy.port`                   | Cloud SQL Proxy listening port                      | `3306`                             |
| `cloudsqlproxy.credentials`            | Cloud SQL Proxy service account credentials         | `bogus credential file`            |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set mysql.user="username",mysql.password="password",mysql.host="localhost",mysql.port="3306"  \
    stable/prometheus-mysql-exporter
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/prometheus-mysql-exporter
```

Documentation for the MySQL Exporter can be found here: (https://github.com/prometheus/mysqld_exporter)
A mysql params overview can be found here: (https://github.com/go-sql-driver/mysql#dsn-data-source-name)
