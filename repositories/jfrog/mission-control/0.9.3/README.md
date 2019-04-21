# `@helm-charts/jfrog-mission-control`

A Helm chart for JFrog Mission Control

| Field               | Value           |
| ------------------- | --------------- |
| Repository Name     | jfrog           |
| Chart Name          | mission-control |
| Chart Version       | 0.9.3           |
| NPM Package Version | 0.1.0           |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for Mission Control.
# This is a YAML-formatted file.
# Beware when changing values here. You should know what you are doing!
# Access the values with {{ .Values.key.subkey }}

# Common
initContainerImage: 'alpine:3.8'
imagePullPolicy: IfNotPresent

uid: 1050
uname: jfmc

imagePullSecrets:

## Role Based Access Control
## Ref: https://kubernetes.io/docs/admin/authorization/rbac/
rbac:
  create: true
  role:
    ## Rules to create. It follows the role specification
    rules:
      - apiGroups:
          - ''
        resources:
          - services
          - endpoints
          - pods
        verbs:
          - get
          - watch
          - list

## Service Account
## Ref: https://kubernetes.io/docs/admin/service-accounts-admin/
##
serviceAccount:
  create: true
  ## The name of the ServiceAccount to use.
  ## If not set and create is true, a name is generated using the fullname template
  name:

## Details required for initialization/setup of database
dbSetup:
  mongodb:
    image:
      repository: mvertes/alpine-mongo
      tag: 3.6.3-0
      pullPolicy: IfNotPresent
  postgresql:
    image:
      repository: postgres
      tag: 9.6.11-alpine
      pullPolicy: IfNotPresent

# Sub charts
## Configuration values for the mongodb dependency
## ref: https://github.com/kubernetes/charts/blob/master/stable/mongodb/README.md
##
mongodb:
  enabled: false
  image:
    tag: 3.6.8-debian-9
    pullPolicy: IfNotPresent
  persistence:
    size: 50Gi
  resources: {}
  #  requests:
  #    memory: "2Gi"
  #    cpu: "100m"
  #  limits:
  #    memory: "2Gi"
  #    cpu: "250m"
  ## Make sure the --wiredTigerCacheSizeGB is no more than half the memory limit!
  ## This is critical to protect against OOMKill by Kubernetes!
  mongodbExtraFlags:
    - '--wiredTigerCacheSizeGB=1'
  usePassword: false
  db:
    adminUser: admin
    adminPassword:
    mcUser: mission_platform
    mcPassword:
    insightUser: jfrog_insight
    insightPassword:
    insightSchedulerDb: insight_scheduler
    insightExecutorDb: insight_executor
    insightServerDb: insight_team
    missionControl: mission_platform
  livenessProbe:
    initialDelaySeconds: 40
  readinessProbe:
    initialDelaySeconds: 30

# PostgreSQL
## Configuration values for the postgresql dependency
## ref: https://github.com/kubernetes/charts/blob/master/stable/postgresql/README.md
##
postgresql:
  enabled: true
  imageTag: '9.6.11'
  postgresUsername: postgres
  postgresPassword:
  postgresConfig:
    maxConnections: '1500'
  db:
    name: mission_control
    sslmode: 'false'
    tablespace: 'pg_default'
    jfmcUsername: jfmc
    jfisUsername: jfis
    jfscUsername: jfsc
    jfexUsername: jfex
    jfmcPassword:
    jfisPassword:
    jfscPassword:
    jfexPassword:
    jfmcSchema: jfmc_server
    jfisSchema: insight_server
    jfscSchema: insight_scheduler
    jfexSchema: insight_executor
  service:
    port: 5432
  persistence:
    enabled: true
    size: 50Gi
    existingClaim:
  resources: {}
  #  requests:
  #    memory: "1Gi"
  #    cpu: "250m"
  #  limits:
  #    memory: "2Gi"
  #    cpu: "1"
  nodeSelector: {}
  affinity: {}
  tolerations: []

### If NOT using the PostgreSQL in this chart (postgresql.enabled=false),
## specify custom database details here or leave empty
database:
  type: postgresql
  host:
  port:
  ## Please make sure these are created under the provided database
  name: mission_control
  jfisSchema: insight_server
  jfmcSchema: jfmc_server
  jfscSchema: insight_scheduler
  jfexSchema: insight_executor
  ## If you would like to use single user and password for all the services
  user:
  password:
  ## If you have existing Kubernetes secrets containing db credentials, use
  ## these values
  secrets: {}
  #  user:
  #    name: "database-creds"
  #    key: "db-user"
  #  password:
  #    name: "database-creds"
  #    key: "db-password"
  ## If you want to use different credentials for each service
  ## Mission-Control
  jfmcUsername: jfmc
  jfmcPassword:
  ## Insight-Server
  jfisUsername: jfis
  jfisPassword:
  ## Insight-Scheduler
  jfscUsername: jfsc
  jfscPassword:
  ## Insight-Executor
  jfexUsername: jfex
  jfexPassword:

elasticsearch:
  enabled: true
  persistence:
    size: 50Gi
  resources: {}
  #  requests:
  #    memory: "2Gi"
  #    cpu: "100m"
  #  limits:
  #    memory: "2Gi"
  #    cpu: "500m"
  ## ElasticSearch xms and xmx should be same!
  javaOpts: {}
  #  xms: "2g"
  #  xmx: "2g"
  env:
    clusterName: 'es-cluster'
    esUsername: 'elastic'
    esPassword:

  service:
    port: 9200

podRestartTime:

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

logger:
  image:
    repository: busybox
    tag: 1.30

missionControl:
  replicaCount: 1
  name: mission-control
  appName: jfmc-server
  home: /var/opt/jfrog/mission-control
  image: docker.bintray.io/jfrog/mission-control
  # Set this to true if you want to override credentials in mission-control.properties on startup
  propertyOverride: false
  ## Note that by default we use appVersion to get image tag
  # version:

  ## Add custom init containers
  customInitContainers: |
  #  - name: "custom-setup"
  #    image: "{{ .Values.initContainerImage }}"
  #    imagePullPolicy: "{{ .Values.imagePullPolicy }}"
  #    command:
  #      - 'sh'
  #      - '-c'
  #      - 'touch {{ .Values.missionControl.persistence.mountPath }}/example-custom-setup'
  #    volumeMounts:
  #      - mountPath: "{{ .Values.missionControl.persistence.mountPath }}"
  #        name: mission-control-data

  ## Add any of the loggers to a sidecar if you want to be able to see them with kubectl logs or a log collector in your k8s cluster
  loggers: []
  # - audit.log
  # - http.log
  # - init-debug.log
  # - init-err.log
  # - init.log
  # - jfmc-server-debug.log
  # - jfmc-server-err.log
  # - jfmc-server.log
  # - monitoring.log

  missionControlUrl:
  podRestartTime:
  repository: jfrog-mission-control
  package: mc-docker-installer
  dist: helm
  osVersion: 'NA'
  osType: 'NA'
  osDist: 'NA'

  persistence:
    enabled: true
    ## A manually managed Persistent Volume and Claim
    ## Requires persistence.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    # existingClaim:

    mountPath: '/var/opt/jfrog/mission-control'
    accessMode: ReadWriteOnce
    size: 100Gi
    ## Mission Control data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"

  ## Control Java options (JAVA_OPTIONS)
  ## IMPORTANT: keep resources.limits.memory higher than javaOpts.xmx by 0.5G
  javaOpts:
    other: '-server -XX:+UseG1GC -Dfile.encoding=UTF8'
  #  xms: "2g"
  #  xmx: "3g"
  resources: {}
  #  requests:
  #    memory: "2Gi"
  #    cpu: "100m"
  #  limits:
  #    memory: "3.5Gi"
  #    cpu: "1"
  nodeSelector: {}

  tolerations: []

  affinity: {}

  service:
    type: LoadBalancer
  internalPort: 8080
  externalPort: 80

insightServer:
  replicaCount: 1
  name: insight-server
  home: /opt/jfrog
  image: docker.bintray.io/jfrog/insight-server
  ## Note that by default we use appVersion to get image tag
  # version:
  internalHttpPort: 8082
  ## This can be used to whitelist the range of IPs allowed to be served by Insight Server service
  ## The value must follow CIDR format
  allowIP: '0.0.0.0/0'
  resources: {}
  #  requests:
  #    memory: "500Mi"
  #    cpu: "100m"
  #  limits:
  #    memory: "1Gi"
  #    cpu: "1"

  # Persistence for the logs
  persistence:
    enabled: false
    ## A manually managed Persistent Volume and Claim
    ## Requires persistence.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    # existingClaim:

    mountPath: '/opt/jfrog/insight-server/logs'
    accessMode: ReadWriteOnce
    size: 10Gi
    ## Insight Server logs Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"

  ## Add any of the loggers to a sidecar if you want to be able to see them with kubectl logs or a log collector in your k8s cluster
  loggers: []
  # - insight-server.log

insightScheduler:
  replicaCount: 1
  name: insight-scheduler
  home: /opt/jfrog
  image: docker.bintray.io/jfrog/insight-scheduler
  ## Note that by default we use appVersion to get image tag
  # version:
  internalPort: 8085

  ## Control Java options (JFMC_EXTRA_JAVA_OPTS)
  ## IMPORTANT: keep resources.limits.memory higher than javaOpts.xmx by 0.5G
  javaOpts: {}
  #  other:
  #  xms: "500m"
  #  xmx: "3g"
  resources: {}
  #  requests:
  #    memory: "500Mi"
  #    cpu: "100m"
  #  limits:
  #    memory: "3.5Gi"
  #    cpu: "1"

  # Persistence for the logs
  persistence:
    enabled: false
    ## A manually managed Persistent Volume and Claim
    ## Requires persistence.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    # existingClaim:

    mountPath: '/opt/jfrog/insight-scheduler/logs'
    accessMode: ReadWriteOnce
    size: 10Gi
    ## Insight Scheduler logs Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"

  ## Add any of the loggers to a sidecar if you want to be able to see them with kubectl logs or a log collector in your k8s cluster
  loggers: []
  # - insight-scheduler.log
  # - access.log

insightExecutor:
  replicaCount: 1
  name: insight-executor
  home: /opt/jfrog
  image: docker.bintray.io/jfrog/insight-executor
  ## Note that by default we use appVersion to get image tag
  # version:
  internalPort: 8087

  ## Control Java options (JFMC_EXTRA_JAVA_OPTS)
  ## IMPORTANT: keep resources.limits.memory higher than javaOpts.xmx by 0.5G
  javaOpts: {}
  #  other:
  #  xms: "500m"
  #  xmx: "3g"
  resources: {}
  #  requests:
  #    memory: "500Mi"
  #    cpu: "100m"
  #  limits:
  #    memory: "3.5Gi"
  #    cpu: "1"

  # Persistence for the logs
  persistence:
    enabled: false
    ## A manually managed Persistent Volume and Claim
    ## Requires persistence.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    # existingClaim:

    mountPath: '/opt/jfrog/insight-executor/logs'
    accessMode: ReadWriteOnce
    size: 10Gi
    ## Insight Executor logs Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"

  ## Add any of the loggers to a sidecar if you want to be able to see them with kubectl logs or a log collector in your k8s cluster
  loggers: []
  # - insight-executor.log
  # - access.log
```

</details>

---

# JFrog Mission-Control Helm Chart

## Prerequisites Details

- Kubernetes 1.8+

## Chart Details

This chart will do the following:

- Deploy PostgreSQL database.
- Deploy Elasticsearch.
- Deploy Mission Control.

## Requirements

- A running Kubernetes cluster
- Dynamic storage provisioning enabled
- Default StorageClass set to allow services using the default StorageClass for persistent storage
- A running Artifactory Enterprise
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) installed and setup to use the cluster
- [Helm](https://helm.sh/) installed and setup to use the cluster (helm init)

## Add JFrog Helm repository

Before installing JFrog helm charts, you need to add the [JFrog helm repository](https://charts.jfrog.io/) to your helm client

```bash
helm repo add jfrog https://charts.jfrog.io
```

### Installing the Chart

```bash
helm install --name mission-control jfrog/mission-control
```

## Set Mission Control base URL

- Get mission-control url by running following commands:
  `export SERVICE_IP=$(kubectl get svc --namespace default mission-control-mission-control -o jsonpath='{.status.loadBalancer.ingress[0].ip}')`

`export MISSION_CONTROL_URL="http://$SERVICE_IP:8080/"`

- Set mission-control by running helm upgrade command:

```
helm upgrade --name mission-control --set missionControl.missionControlUrl=$MISSION_CONTROL_URL jfrog/mission-control
```

### Accessing Mission Control

**NOTE:** It might take a few minutes for Mission Control's public IP to become available, and the nodes to complete initial setup.
Follow the instructions outputted by the install command to get the Mission Control IP and URL to access it.

### Updating Mission Control

Once you have a new chart version, you can update your deployment with

```
helm upgrade mission-control jfrog/mission-control
```

### Use an external Database

There are cases where you will want to use an external **PostgreSQL** and not the enclosed **PostgreSQL**.
See more details on [configuring the database](https://www.jfrog.com/confluence/display/MC/Using+External+Databases#UsingExternalDatabases-ExternalizingPostgreSQL)

This can be done with the following parameters

```bash
...
--set postgresql.enabled=false \
--set database.host=${DB_HOST} \
--set database.port=${DB_PORT} \
--set database.user=${DB_USER} \
--set database.password=${DB_PASSWORD} \
...
```

**NOTE:** You must set `postgresql.enabled=false` in order for the chart to use the `database.*` parameters. Without it, they will be ignored!

#### Use existing secrets for PostgreSQL connection details

You can use already existing secrets for managing the database connection details.

Pass them to the install command with the following parameters

```bash
export POSTGRES_USERNAME_SECRET_NAME=
export POSTGRES_USERNAME_SECRET_KEY=
export POSTGRES_PASSWORD_SECRET_NAME=
export POSTGRES_PASSWORD_SECRET_KEY=
...
    --set database.secrets.user.name=${POSTGRES_USERNAME_SECRET_NAME} \
    --set database.secrets.user.key=${POSTGRES_USERNAME_SECRET_KEY} \
    --set database.secrets.password.name=${POSTGRES_PASSWORD_SECRET_NAME} \
    --set database.secrets.password.key=${POSTGRES_PASSWORD_SECRET_KEY} \
...
```

### Logger sidecars

This chart provides the option to add sidecars to tail various logs from Mission Control containers. See the available values in `values.yaml`

Get list of containers in the pod

```bash
kubectl get pods -n <NAMESPACE> <POD_NAME> -o jsonpath='{.spec.containers[*].name}' | tr ' ' '\n'
```

View specific log

```bash
kubectl logs -n <NAMESPACE> <POD_NAME> -c <LOG_CONTAINER_NAME>
```

### Custom init containers

There are cases where a special, unsupported init processes is needed like checking something on the file system or testing something before spinning up the main container.

For this, there is a section for writing a custom init container in the [values.yaml](values.yaml). By default it's commented out

```
missionControl:
  ## Add custom init containers
  customInitContainers: |
    ## Init containers template goes here ##
```

## Configuration

The following table lists the configurable parameters of the mission-control chart and their default values.

| Parameter                                    | Description                                                     | Default                                     |
| -------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------- |
| `initContainerImage`                         | Init Container Image                                            | `alpine:3.6`                                |
| `imagePullPolicy`                            | Container pull policy                                           | `IfNotPresent`                              |
| `imagePullSecrets`                           | Docker registry pull secret                                     |                                             |
| `serviceAccount.create`                      | Specifies whether a ServiceAccount should be created            | `true`                                      |
| `serviceAccount.name`                        | The name of the ServiceAccount to create                        | Generated using the fullname template       |
| `rbac.create`                                | Specifies whether RBAC resources should be created              | `true`                                      |
| `rbac.role.rules`                            | Rules to create                                                 | `[]`                                        |
| `mongodb.enabled`                            | Enable Mongodb                                                  | `false`                                     |
| `mongodb.image.tag`                          | Mongodb docker image tag                                        | `3.6.8-debian-9`                            |
| `mongodb.image.pullPolicy`                   | Mongodb Container pull policy                                   | `IfNotPresent`                              |
| `mongodb.persistence.enabled`                | Mongodb persistence volume enabled                              | `true`                                      |
| `mongodb.persistence.existingClaim`          | Use an existing PVC to persist data                             | `nil`                                       |
| `mongodb.persistence.storageClass`           | Storage class of backing PVC                                    | `generic`                                   |
| `mongodb.persistence.size`                   | Mongodb persistence volume size                                 | `50Gi`                                      |
| `mongodb.livenessProbe.initialDelaySeconds`  | Mongodb delay before liveness probe is initiated                | `40`                                        |
| `mongodb.readinessProbe.initialDelaySeconds` | Mongodb delay before readiness probe is initiated               | `30`                                        |
| `mongodb.mongodbExtraFlags`                  | MongoDB additional command line flags                           | `["--wiredTigerCacheSizeGB=1"]`             |
| `mongodb.usePassword`                        | Enable password authentication                                  | `false`                                     |
| `mongodb.db.adminUser`                       | Mongodb Database Admin User                                     | `admin`                                     |
| `mongodb.db.adminPassword`                   | Mongodb Database Password for Admin user                        | ``                                          |
| `mongodb.db.mcUser`                          | Mongodb Database Mission Control User                           | `mission_platform`                          |
| `mongodb.db.mcPassword`                      | Mongodb Database Password for Mission Control user              | ``                                          |
| `mongodb.db.insightUser`                     | Mongodb Database Insight User                                   | `jfrog_insight`                             |
| `mongodb.db.insightPassword`                 | Mongodb Database password for Insight User                      | ``                                          |
| `mongodb.db.insightSchedulerDb`              | Mongodb Database for Scheduler                                  | `insight_scheduler`                         |
| `postgresql.enabled`                         | Enable PostgreSQL                                               | `true`                                      |
| `postgresql.imageTag`                        | PostgreSQL docker image tag                                     | `9.6.11`                                    |
| `postgresql.image.pullPolicy`                | PostgreSQL Container pull policy                                | `IfNotPresent`                              |
| `postgresql.persistence.enabled`             | PostgreSQL persistence volume enabled                           | `true`                                      |
| `postgresql.persistence.existingClaim`       | Use an existing PVC to persist data                             | `nil`                                       |
| `postgresql.persistence.size`                | PostgreSQL persistence volume size                              | `50Gi`                                      |
| `postgresql.postgresUsername`                | PostgreSQL admin username                                       | `postgres`                                  |
| `postgresql.postgresPassword`                | PostgreSQL admin password                                       | ``                                          |
| `postgresql.db.name`                         | PostgreSQL Database name                                        | `mission_control`                           |
| `postgresql.db.sslmode`                      | PostgreSQL Database SSL Mode                                    | `false`                                     |
| `postgresql.db.tablespace`                   | PostgreSQL Database Tablespace                                  | `pg_default`                                |
| `postgresql.db.jfmcUsername`                 | PostgreSQL Database mission control User                        | `jfmc`                                      |
| `postgresql.db.jfisUsername`                 | PostgreSQL Database insight server User                         | `jfis`                                      |
| `postgresql.db.jfscUsername`                 | PostgreSQL Database insight scheduler User                      | `jfsc`                                      |
| `postgresql.db.jfexUsername`                 | PostgreSQL Database mission executor User                       | `jfex`                                      |
| `postgresql.db.jfmcPassword`                 | PostgreSQL Database mission control Password                    | ``                                          |
| `postgresql.db.jfisPassword`                 | PostgreSQL Database insight server Password                     | ``                                          |
| `postgresql.db.jfscPassword`                 | PostgreSQL Database insight scheduler Password                  | ``                                          |
| `postgresql.db.jfexPassword`                 | PostgreSQL Database mission executor Password                   | ``                                          |
| `postgresql.db.jfmcSchema`                   | PostgreSQL Database mission control Schema                      | `jfmc_server`                               |
| `postgresql.db.jfisSchema`                   | PostgreSQL Database insight server Schema                       | `insight_server`                            |
| `postgresql.db.jfscSchema`                   | PostgreSQL Database insight scheduler Schema                    | `insight_scheduler`                         |
| `postgresql.db.jfexSchema`                   | PostgreSQL Database mission executor Schema                     | `insight_executor`                          |
| `postgresql.service.port`                    | PostgreSQL Database Port                                        | `5432`                                      |
| `database.type`                              | External database type (`postgresql`)                           | `postgresql`                                |
| `database.host`                              | External database Connection Host                               | ``                                          |
| `database.port`                              | External database Connection Port                               | ``                                          |
| `database.name`                              | External database name                                          | `mission_control`                           |
| `database.user`                              | External database user                                          | ``                                          |
| `database.password`                          | External database password                                      | ``                                          |
| `database.jfmcUsername`                      | External database mission control User                          | `jfmc`                                      |
| `database.jfisUsername`                      | External database insight server User                           | `jfis`                                      |
| `database.jfscUsername`                      | External database insight scheduler User                        | `jfsc`                                      |
| `database.jfexUsername`                      | External database mission executor User                         | `jfex`                                      |
| `database.jfmcPassword`                      | External database mission control Password                      | ``                                          |
| `database.jfisPassword`                      | External database insight server Password                       | ``                                          |
| `database.jfscPassword`                      | External database insight scheduler Password                    | ``                                          |
| `database.jfexPassword`                      | External database mission executor Password                     | ``                                          |
| `database.jfmcSchema`                        | External database mission control Schema                        | `jfmc_server`                               |
| `database.jfisSchema`                        | External database insight server Schema                         | `insight_server`                            |
| `database.jfscSchema`                        | External database insight scheduler Schema                      | `insight_scheduler`                         |
| `database.jfexSchema`                        | External database mission executor Schema                       | `insight_executor`                          |
| `database.secrets.user.name`                 | External database username `Secret` name                        |                                             |
| `database.secrets.user.key`                  | External database username `Secret` key                         |                                             |
| `database.secrets.password.name`             | External database password `Secret` name                        |                                             |
| `database.secrets.password.key`              | External database password `Secret` key                         |                                             |
| `elasticsearch.enabled`                      | Enable Elasticsearch                                            | `true`                                      |
| `elasticsearch.persistence.enabled`          | Elasticsearch persistence volume enabled                        | `true`                                      |
| `elasticsearch.persistence.existingClaim`    | Use an existing PVC to persist data                             | `nil`                                       |
| `elasticsearch.persistence.storageClass`     | Storage class of backing PVC                                    | `generic`                                   |
| `elasticsearch.persistence.size`             | Elasticsearch persistence volume size                           | `50Gi`                                      |
| `elasticsearch.javaOpts.xms`                 | Elasticsearch ES_JAVA_OPTS -Xms                                 | ``                                          |
| `elasticsearch.javaOpts.xmx`                 | Elasticsearch ES_JAVA_OPTS -Xmx                                 | ``                                          |
| `elasticsearch.env.clusterName`              | Elasticsearch Cluster Name                                      | `es-cluster`                                |
| `logger.image.repository`                    | repository for logger image                                     | `busybox`                                   |
| `logger.image.tag`                           | tag for logger image                                            | `1.30`                                      |
| `missionControl.name`                        | Mission Control name                                            | `mission-control`                           |
| `missionControl.image`                       | Container image                                                 | `docker.jfrog.io/jfrog/mission-control`     |
| `missionControl.version`                     | Container image tag                                             | `.Chart.AppVersion`                         |
| `missionControl.customInitContainers`        | Custom init containers                                          | ``                                          |
| `missionControl.service.type`                | Mission Control service type                                    | `LoadBalancer`                              |
| `missionControl.externalPort`                | Mission Control service external port                           | `80`                                        |
| `missionControl.internalPort`                | Mission Control service internal port                           | `8080`                                      |
| `missionControl.missionControlUrl`           | Mission Control URL                                             | ``                                          |
| `missionControl.persistence.mountPath`       | Mission Control persistence volume mount path                   | `"/var/opt/jfrog/mission-control"`          |
| `missionControl.persistence.storageClass`    | Storage class of backing PVC                                    | `nil (uses alpha storage class annotation)` |
| `missionControl.persistence.existingClaim`   | Provide an existing PersistentVolumeClaim                       | `nil`                                       |
| `missionControl.persistence.enabled`         | Mission Control persistence volume enabled                      | `true`                                      |
| `missionControl.persistence.accessMode`      | Mission Control persistence volume access mode                  | `ReadWriteOnce`                             |
| `missionControl.persistence.size`            | Mission Control persistence volume size                         | `100Gi`                                     |
| `missionControl.javaOpts.other`              | Mission Control JAVA_OPTIONS                                    | `-server -XX:+UseG1GC -Dfile.encoding=UTF8` |
| `missionControl.javaOpts.xms`                | Mission Control JAVA_OPTIONS -Xms                               | ``                                          |
| `missionControl.propertyOverride`            | Force write of properties on mc startup                         | ``                                          |
| `missionControl.loggers`                     | Mission Control loggers (see values.yaml for possible values)   | ``                                          |
| `insightServer.name`                         | Insight Server name                                             | `insight-server`                            |
| `insightServer.image`                        | Container image                                                 | `docker.jfrog.io/jfrog/insight-server`      |
| `insightServer.version`                      | Container image tag                                             | `.Chart.AppVersion`                         |
| `insightServer.service.type`                 | Insight Server service type                                     | `ClusterIP`                                 |
| `insightServer.externalHttpPort`             | Insight Server service external port                            | `8082`                                      |
| `insightServer.internalHttpPort`             | Insight Server service internal port                            | `8082`                                      |
| `insightServer.allowIP`                      | Range of IPs allowed to be served by Insight Server service     | `"0.0.0.0/0"`                               |
| `insightServer.loggers`                      | Insight Server loggers (see values.yaml for possible values)    | ``                                          |
| `insightScheduler.name`                      | Insight Scheduler name                                          | `insight-scheduler`                         |
| `insightScheduler.image`                     | Container image                                                 | `docker.jfrog.io/jfrog/insight-scheduler`   |
| `insightScheduler.version`                   | Container image tag                                             | `.Chart.AppVersion`                         |
| `insightScheduler.service.type`              | Insight Scheduler service type                                  | `ClusterIP`                                 |
| `insightScheduler.externalPort`              | Insight Scheduler service external port                         | `8080`                                      |
| `insightScheduler.internalPort`              | Insight Scheduler service internal port                         | `8080`                                      |
| `insightScheduler.javaOpts.other`            | Insight Scheduler JFMC_EXTRA_JAVA_OPTS                          | ``                                          |
| `insightScheduler.javaOpts.xms`              | Insight Scheduler JFMC_EXTRA_JAVA_OPTS -Xms                     | ``                                          |
| `insightScheduler.javaOpts.xmx`              | Insight Scheduler JFMC_EXTRA_JAVA_OPTS -Xmx                     | ``                                          |
| `insightScheduler.loggers`                   | Insight Scheduler loggers (see values.yaml for possible values) | ``                                          |
| `insightExecutor.name`                       | Insight Executor name                                           | `insight-scheduler`                         |
| `insightExecutor.image`                      | Container image                                                 | `docker.jfrog.io/jfrog/insight-executor`    |
| `insightExecutor.version`                    | Container image tag                                             | `.Chart.AppVersion`                         |
| `insightExecutor.service.type`               | Insight Executor service type                                   | `ClusterIP`                                 |
| `insightExecutor.externalPort`               | Insight Executor service external port                          | `8080`                                      |
| `insightExecutor.internalPort`               | Insight Executor service internal port                          | `8080`                                      |
| `insightExecutor.javaOpts.other`             | Insight Executor JFMC_EXTRA_JAVA_OPTS                           | ``                                          |
| `insightExecutor.javaOpts.xms`               | Insight Executor JFMC_EXTRA_JAVA_OPTS -Xms                      | ``                                          |
| `insightExecutor.javaOpts.xmx`               | Insight Executor JFMC_EXTRA_JAVA_OPTS -Xmx                      | ``                                          |
| `insightExecutor.loggers`                    | Insight Executor loggers (see values.yaml for possible values)  | ``                                          |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

## Useful links

- https://www.jfrog.com
- https://www.jfrog.com/confluence/
- https://www.jfrog.com/confluence/display/EP/Getting+Started
