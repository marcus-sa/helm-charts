# `@helm-charts/stable-mattermost-team-edition`

Mattermost Team Edition server.

| Field               | Value                   |
| ------------------- | ----------------------- |
| Repository Name     | stable                  |
| Chart Name          | mattermost-team-edition |
| Chart Version       | 2.3.0                   |
| NPM Package Version | 0.1.0                   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for mattermost-team-edition.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
image:
  repository: mattermost/mattermost-team-edition
  tag: 5.8.0
  imagePullPolicy: IfNotPresent

initContainerImage:
  repository: appropriate/curl
  tag: latest
  imagePullPolicy: IfNotPresent

## How many old ReplicaSets for Mattermost Deployment you want to retain
revisionHistoryLimit: 1

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
## ref: https://docs.gitlab.com/ee/install/requirements.html#storage
##
persistence:
  ## This volume persists generated data from users, like images, attachments...
  ##
  data:
    enabled: true
    size: 10Gi
    ## If defined, volume.beta.kubernetes.io/storage-class: <storageClass>
    ## Default: volume.alpha.kubernetes.io/storage-class: default
    ##
    # storageClass:
    accessMode: ReadWriteOnce
  # existingClaim: ""

# Mattermost configuration:
config:
  siteUrl: ''
  siteName: 'Mattermost'
  filesAccessKey:
  filesSecretKey:
  fileBucketName:
  smtpServer:
  smtpPort:
  # empty, TLS, or STARTTLS
  smtpConnection:
  smtpUsername:
  smtpPassword:
  feedbackEmail:
  feedbackName:
  enableSignUpWithEmail: true

service:
  type: ClusterIP
  externalPort: 8065
  internalPort: 8065

ingress:
  enabled: false
  path: /
  annotations:
    # kubernetes.io/ingress.class: nginx
    # certmanager.k8s.io/issuer:  your-issuer
    # nginx.ingress.kubernetes.io/proxy-body-size: 50m
    # nginx.ingress.kubernetes.io/proxy-send-timeout: "600"
    # nginx.ingress.kubernetes.io/proxy-read-timeout: "600"
    # nginx.ingress.kubernetes.io/proxy-buffering: "on"
    # nginx.ingress.kubernetes.io/configuration-snippet: |
    #   proxy_cache mattermost_cache;
    #   proxy_cache_revalidate on;
    #   proxy_cache_min_uses 2;
    #   proxy_cache_use_stale timeout;
    #   proxy_cache_lock on;
    #### To use the nginx cache you will need to set an http-snippet in the ingress-nginx configmap
    #### http-snippet: |
    ####     proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=mattermost_cache:10m max_size=3g inactive=120m use_temp_path=off;
  hosts:
    - mattermost.example.com
  tls:
    # - secretName: mattermost.example.com-tls
    #   hosts:
    #     - mattermost.example.com

auth:
  gitlab:
  #   Enable: "false"
  #   Secret: ""
  #   Id: ""
  #   Scope: ""
  #   AuthEndpoint:
  #   TokenEndpoint:
  #   UserApiEndpoint:

## If use this please disable the mysql chart, setting the config mysql.enable to false
externalDB:
  enabled: false
  # externalDriverType: "postgres" #or mysql
  # externalConnectionString: "postgres://<USERNAME>:<PASSWORD>@<HOST>:5432/<DATABASE_NAME>?sslmode=disable&connect_timeout=10"
  # for mysql: "<USERNAME>:<PASSWORD>@tcp(<HOST>:3306)/<DATABASE_NAME>?charset=utf8mb4,utf8&readTimeout=30s&writeTimeout=30s"
  # When using existingUser and ExistingSecret (for example when configuring to use MM with Gitlab helm charts) you will need to
  # define a initContainer to read those configs and create the database in the existing gitlab and set the config.json
  # See the initContainer example below
  # existingUser: gitlab
  # existingSecret: "gitlab-postgresql-password"

mysql:
  enabled: true
  mysqlRootPassword: ''
  mysqlUser: ''
  mysqlPassword: ''
  mysqlDatabase: mattermost

  repository: mysql
  tag: 5.7
  imagePullPolicy: IfNotPresent

  persistence:
    enabled: true
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    storageClass: ''
    accessMode: ReadWriteOnce
    size: 10Gi
  # existingClaim: ""

## Additional env vars
extraEnvVars:
  # This is an example of extra env vars when using with the deployment with GitLab Helm Charts
  # - name: POSTGRES_PASSWORD_GITLAB
  #   valueFrom:
  #     secretKeyRef:
  #       name: gitlab-postgresql-password
  #       key: postgres-password
  # - name: POSTGRES_USER_GITLAB
  #   value: gitlab
  # - name: POSTGRES_HOST_GITLAB
  #   value: gitlab-postgresql
  # - name: POSTGRES_PORT_GITLAB
  #   value: "5432"
  # - name: POSTGRES_DB_NAME_MATTERMOST
  #   value: mm5
  # - name: MM_SQLSETTINGS_DRIVERNAME
  #   value: "postgres"
  # - name: MM_SQLSETTINGS_DATASOURCE
  #   value: postgres://$(POSTGRES_USER_GITLAB):$(POSTGRES_PASSWORD_GITLAB)@$(POSTGRES_HOST_GITLAB):$(POSTGRES_PORT_GITLAB)/$(POSTGRES_DB_NAME_MATTERMOST)?sslmode=disable&connect_timeout=10

## Additional init containers
extraInitContainers: |

# This is an example of extra Init Container when using with the deployment with GitLab Helm Charts
# - name: bootstrap-database
#   image: "postgres:9.6-alpine"
#   imagePullPolicy: IfNotPresent
#   env:
#     - name: POSTGRES_PASSWORD_GITLAB
#       valueFrom:
#         secretKeyRef:
#           name: gitlab-postgresql-password
#           key: postgres-password
#     - name: POSTGRES_USER_GITLAB
#       value: gitlab
#     - name: POSTGRES_HOST_GITLAB
#       value: gitlab-postgresql
#     - name: POSTGRES_PORT_GITLAB
#       value: "5432"
#     - name: POSTGRES_DB_NAME_MATTERMOST
#       value: mm5
#   command:
#     - sh
#     - "-c"
#     - |
#       if PGPASSWORD=$POSTGRES_PASSWORD_GITLAB psql -h $POSTGRES_HOST_GITLAB -p $POSTGRES_PORT_GITLAB -U $POSTGRES_USER_GITLAB -lqt | cut -d \| -f 1 | grep -qw $POSTGRES_DB_NAME_MATTERMOST; then
#       echo "database already exist, exiting initContainer"
#       exit 0
#       else
#       echo "Database does not exist. creating...."
#       PGPASSWORD=$POSTGRES_PASSWORD_GITLAB createdb -h $POSTGRES_HOST_GITLAB -p $POSTGRES_PORT_GITLAB -U $POSTGRES_USER_GITLAB $POSTGRES_DB_NAME_MATTERMOST
#       echo "Done"
#       fi
```

</details>

---

# Mattermost Team Edition

[Mattermost](https://mattermost.com/) is a hybrid cloud enterprise messaging workspace that brings your messaging and tools together to get more done, faster.

## TL;DR;

```bash
$ helm install stable/mattermost-team-edition \
  --set mysql.mysqlUser=sampleUser \
  --set mysql.mysqlPassword=samplePassword \
```

## Introduction

This chart creates a [Mattermost Team Edition](https://mattermost.com/) deployment on a [Kubernetes](http://kubernetes.io)
cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/mattermost-team-edition
```

The command deploys Mattermost on the Kubernetes cluster in the default configuration. The [configuration](#configuration)
section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Mattermost Team Edition chart and their default values.

| Parameter                            | Description                                                                                                          | Default                              |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `image.repository`                   | container image repository                                                                                           | `mattermost/mattermost-team-edition` |
| `image.tag`                          | container image tag                                                                                                  | `5.8.0`                              |
| `image.imagePullPolicy`              | container image pull policy                                                                                          | `IfNotPresent`                       |
| `initContainerImage.repository`      | init container image repository                                                                                      | `appropriate/curl`                   |
| `initContainerImage.tag`             | init container image tag                                                                                             | `latest`                             |
| `initContainerImage.imagePullPolicy` | container image pull policy                                                                                          | `IfNotPresent`                       |
| `revisionHistoryLimit`               | How many old ReplicaSets for Mattermost Deployment you want to retain                                                | `1`                                  |
| `config.SiteUrl`                     | The URL that users will use to access Mattermost. ie `https://mattermost.mycompany.com`                              | ``                                   |
| `config.SiteName`                    | Name of service shown in login screens and UI                                                                        | `Mattermost`                         |
| `config.FilesAccessKey`              | The AWS Access Key, if you want store the files on S3                                                                | ``                                   |
| `config.FilesSecretKey`              | The AWS Secret Key                                                                                                   | ``                                   |
| `config.FileBucketName`              | The S3 bucket name                                                                                                   | ``                                   |
| `config.SMTPHost`                    | Location of SMTP email server                                                                                        | ``                                   |
| `config.SMTPPort`                    | Port of SMTP email server                                                                                            | ``                                   |
| `config.SMTPUsername`                | The username for authenticating to the SMTP server                                                                   | ``                                   |
| `config.SMTPPassword`                | The password associated with the SMTP username                                                                       | ``                                   |
| `config.FeedbackEmail`               | Address displayed on email account used when sending notification emails from Mattermost system                      | ``                                   |
| `config.FeedbackName`                | Name displayed on email account used when sending notification emails from Mattermost system                         | ``                                   |
| `config.enableSignUpWithEmail`       | Allow team creation and account signup using email and password.                                                     | `true`                               |
| `ingress.enabled`                    | if `true`, an ingress is created                                                                                     | `false`                              |
| `ingress.hosts`                      | a list of ingress hosts                                                                                              | `[mattermost.example.com]`           |
| `ingress.tls`                        | a list of [IngressTLS](https://v1-8.docs.kubernetes.io/docs/api-reference/v1.8/#ingresstls-v1beta1-extensions) items | `[]`                                 |
| `mysql.mysqlRootPassword`            | Root Password for Mysql (Opcional)                                                                                   | ""                                   |
| `mysql.mysqlUser`                    | Username for Mysql (Required)                                                                                        | ""                                   |
| `mysql.mysqlPassword`                | User Password for Mysql (Required)                                                                                   | ""                                   |
| `mysql.mysqlDatabase`                | Database name (Required)                                                                                             | "mattermost"                         |
| `extraEnvVars`                       | Extra environments variables to be used in the deployments                                                           |
| `extraInitContainers`                | Additional init containers. Passed through the `tpl` function                                                        | ``                                   |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set image.tag=5.7.0 \
  --set mysql.mysqlUser=sampleUser \
  --set mysql.mysqlPassword=samplePassword \
  stable/mattermost-team-edition
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/mattermost-team-edition
```

### External Databases

There is an option to use external database services (PostgreSQL or MySQL) for your Mattermost installation.
If you use an external Database you will need to disable the MySQL chart in the `values.yaml`

```Bash
mysql:
  enabled: false
```

#### PostgreSQL

To use an external **PostgreSQL**, You need to set Mattermost **externalDB** config

**IMPORTANT:** Make sure the DB is already created before deploying Mattermost services

```Bash
externalDB:
  enabled: true
  externalDriverType: "postgres"
  externalConnectionString: "postgres://<USERNAME>:<PASSWORD>@<HOST>:5432/<DATABASE_NAME>?sslmode=disable&connect_timeout=10"
```

#### MySQL

To use an external **MySQL**, You need to set Mattermost **externalDB** config

**IMPORTANT:** Make sure the DB is already created before deploying Mattermost services

```Bash
externalDB:
  enabled: true
  externalDriverType: "mysql"
  externalConnectionString: "<USERNAME>:<PASSWORD>@tcp(<HOST>:3306)/<DATABASE_NAME>?charset=utf8mb4,utf8&readTimeout=30s&writeTimeout=30s"
```

#### Limitations

For the Team Edition you can have just one replica running.
