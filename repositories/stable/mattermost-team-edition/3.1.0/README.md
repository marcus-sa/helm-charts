# `@helm-charts/stable-mattermost-team-edition`

Mattermost Team Edition server.

| Field               | Value                   |
| ------------------- | ----------------------- |
| Repository Name     | stable                  |
| Chart Name          | mattermost-team-edition |
| Chart Version       | 3.1.0                   |
| NPM Package Version | 0.1.0                   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for mattermost-team-edition.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
image:
  repository: mattermost/mattermost-team-edition
  tag: 5.9.0
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

service:
  type: ClusterIP
  externalPort: 8065
  internalPort: 8065

ingress:
  enabled: false
  path: /
  annotations: {}
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


## If use this please disable the mysql chart by setting mysql.enable to false
externalDB:
  enabled: false

  ## postgres or mysql
  externalDriverType: ""

  ## postgres:  "postgres://<USERNAME>:<PASSWORD>@<HOST>:5432/<DATABASE_NAME>?sslmode=disable&connect_timeout=10"
  ## mysql:     "<USERNAME>:<PASSWORD>@tcp(<HOST>:3306)/<DATABASE_NAME>?charset=utf8mb4,utf8&readTimeout=30s&writeTimeout=30s"
  externalConnectionString: ""

mysql:
  enabled: true
  mysqlRootPassword: ""
  mysqlUser: ""
  mysqlPassword: ""
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
    storageClass: ""
    accessMode: ReadWriteOnce
    size: 10Gi
  # existingClaim: ""

## Additional env vars
extraEnvVars: []
  # This is an example of extra env vars when using with the deployment with GitLab Helm Charts
  # - name: POSTGRES_PASSWORD_GITLAB
  #   valueFrom:
  #     secretKeyRef:
  #       # NOTE: Needs to be manually created
  #       # kubectl create secret generic gitlab-postgresql-password --namespace <NAMESPACE> --from-literal postgres-password=<PASSWORD>
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
extraInitContainers: []
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

# NOTE: These acts as the default values for the config.json file read by the
# mattermost server itself. You can override the configJSON object just like any
# Helm template value. Since it is an object, the object you provide will merge
# with these defaults. Also note that this is YAML, so you can choose to use
# either JSON or YAML as JSON is a subset of YAML. No matter what you choose,
# the config.json file that will be generated will be correctly JSON formatted.
configJSON: {
  "ServiceSettings": {
    "SiteURL": "",
    "LicenseFileLocation": "",
    "ListenAddress": ":8065",
    "ConnectionSecurity": "",
    "TLSCertFile": "",
    "TLSKeyFile": "",
    "UseLetsEncrypt": false,
    "LetsEncryptCertificateCacheFile": "./config/letsencrypt.cache",
    "Forward80To443": false,
    "ReadTimeout": 300,
    "WriteTimeout": 300,
    "MaximumLoginAttempts": 10,
    "GoroutineHealthThreshold": -1,
    "GoogleDeveloperKey": "",
    "EnableOAuthServiceProvider": false,
    "EnableIncomingWebhooks": true,
    "EnableOutgoingWebhooks": true,
    "EnableCommands": true,
    "EnableOnlyAdminIntegrations": false,
    "EnablePostUsernameOverride": false,
    "EnablePostIconOverride": false,
    "EnableLinkPreviews": false,
    "EnableTesting": false,
    "EnableDeveloper": false,
    "EnableSecurityFixAlert": true,
    "EnableInsecureOutgoingConnections": false,
    "EnableMultifactorAuthentication": false,
    "EnforceMultifactorAuthentication": false,
    "AllowCorsFrom": "",
    "SessionLengthWebInDays": 30,
    "SessionLengthMobileInDays": 30,
    "SessionLengthSSOInDays": 30,
    "SessionCacheInMinutes": 10,
    "WebsocketSecurePort": 443,
    "WebsocketPort": 80,
    "WebserverMode": "gzip",
    "EnableCustomEmoji": false,
    "RestrictCustomEmojiCreation": "all",
    "RestrictPostDelete": "all",
    "AllowEditPost": "always",
    "PostEditTimeLimit": 300,
    "TimeBetweenUserTypingUpdatesMilliseconds": 5000,
    "EnablePostSearch": true,
    "EnableUserTypingMessages": true,
    "EnableUserStatuses": true,
    "ClusterLogTimeoutMilliseconds": 2000
  },
  "TeamSettings": {
    "SiteName": "Mattermost",
    "MaxUsersPerTeam": 50000,
    "EnableTeamCreation": true,
    "EnableUserCreation": true,
    "EnableOpenServer": true,
    "RestrictCreationToDomains": "",
    "EnableCustomBrand": false,
    "CustomBrandText": "",
    "CustomDescriptionText": "",
    "RestrictDirectMessage": "any",
    "RestrictTeamInvite": "all",
    "RestrictPublicChannelManagement": "all",
    "RestrictPrivateChannelManagement": "all",
    "RestrictPublicChannelCreation": "all",
    "RestrictPrivateChannelCreation": "all",
    "RestrictPublicChannelDeletion": "all",
    "RestrictPrivateChannelDeletion": "all",
    "RestrictPrivateChannelManageMembers": "all",
    "UserStatusAwayTimeout": 300,
    "MaxChannelsPerTeam": 50000,
    "MaxNotificationsPerChannel": 1000
  },
  "SqlSettings": {
    "DriverName": "",
    "DataSource": "",
    "DataSourceReplicas": [],
    "DataSourceSearchReplicas": [],
    "MaxIdleConns": 20,
    "MaxOpenConns": 35,
    "Trace": false,
    "AtRestEncryptKey": "",
    "QueryTimeout": 30
  },
  "LogSettings": {
    "EnableConsole": true,
    "ConsoleLevel": "INFO",
    "EnableFile": true,
    "FileLevel": "INFO",
    "FileFormat": "",
    "FileLocation": "",
    "EnableWebhookDebugging": true,
    "EnableDiagnostics": true
  },
  "PasswordSettings": {
    "MinimumLength": 5,
    "Lowercase": false,
    "Number": false,
    "Uppercase": false,
    "Symbol": false
  },
  "FileSettings": {
    "EnableFileAttachments": true,
    "MaxFileSize": 52428800,
    "DriverName": "local",
    "Directory": "./data/",
    "EnablePublicLink": false,
    "PublicLinkSalt": "",
    "ThumbnailWidth": 120,
    "ThumbnailHeight": 100,
    "PreviewWidth": 1024,
    "PreviewHeight": 0,
    "ProfileWidth": 128,
    "ProfileHeight": 128,
    "InitialFont": "luximbi.ttf",
    "AmazonS3AccessKeyId": "",
    "AmazonS3SecretAccessKey": "",
    "AmazonS3Bucket": "",
    "AmazonS3Region": "",
    "AmazonS3Endpoint": "s3.amazonaws.com",
    "AmazonS3SSL": false,
    "AmazonS3SignV2": false
  },
  "EmailSettings": {
    "EnableSignUpWithEmail": true,
    "EnableSignInWithEmail": true,
    "EnableSignInWithUsername": true,
    "SendEmailNotifications": false,
    "RequireEmailVerification": false,
    "FeedbackName": "",
    "FeedbackEmail": "",
    "FeedbackOrganization": "",
    "SMTPUsername": "",
    "SMTPPassword": "",
    "EnableSMTPAuth": "",
    "SMTPServer": "",
    "SMTPPort": "",
    "ConnectionSecurity": "",
    "InviteSalt": "",
    "SendPushNotifications": true,
    "PushNotificationServer": "https://push-test.mattermost.com",
    "PushNotificationContents": "generic",
    "EnableEmailBatching": false,
    "EmailBatchingBufferSize": 256,
    "EmailBatchingInterval": 30,
    "SkipServerCertificateVerification": false
  },
  "RateLimitSettings": {
    "Enable": false,
    "PerSec": 10,
    "MaxBurst": 100,
    "MemoryStoreSize": 10000,
    "VaryByRemoteAddr": true,
    "VaryByHeader": ""
  },
  "PrivacySettings": {
    "ShowEmailAddress": true,
    "ShowFullName": true
  },
  "SupportSettings": {
    "TermsOfServiceLink": "https://about.mattermost.com/default-terms/",
    "PrivacyPolicyLink": "https://about.mattermost.com/default-privacy-policy/",
    "AboutLink": "https://about.mattermost.com/default-about/",
    "HelpLink": "https://about.mattermost.com/default-help/",
    "ReportAProblemLink": "https://about.mattermost.com/default-report-a-problem/",
    "SupportEmail": "feedback@mattermost.com"
  },
  "AnnouncementSettings": {
    "EnableBanner": false,
    "BannerText": "",
    "BannerColor": "#f2a93b",
    "BannerTextColor": "#333333",
    "AllowBannerDismissal": true
  },
  "GitLabSettings": {
    "Enable": false,
    "Secret": "",
    "Id": "",
    "Scope": "",
    "AuthEndpoint": "",
    "TokenEndpoint": "",
    "UserApiEndpoint": ""
  },
  "LocalizationSettings": {
    "DefaultServerLocale": "en",
    "DefaultClientLocale": "en",
    "AvailableLocales": ""
  },
  "NativeAppSettings": {
    "AppDownloadLink": "https://about.mattermost.com/downloads/",
    "AndroidAppDownloadLink": "https://about.mattermost.com/mattermost-android-app/",
    "IosAppDownloadLink": "https://about.mattermost.com/mattermost-ios-app/"
  },
  "AnalyticsSettings": {
    "MaxUsersForStatistics": 2500
  },
  "WebrtcSettings": {
    "Enable": false,
    "GatewayWebsocketUrl": "",
    "GatewayAdminUrl": "",
    "GatewayAdminSecret": "",
    "StunURI": "",
    "TurnURI": "",
    "TurnUsername": "",
    "TurnSharedKey": ""
  },
  "DisplaySettings": {
    "CustomUrlSchemes": [],
    "ExperimentalTimezone": true
  },
  "TimezoneSettings": {
    "SupportedTimezonesPath": "timezones.json"
  },
  "PluginSettings": {
    "Enable": true,
    "EnableUploads": true,
    "Directory": "./plugins",
    "ClientDirectory": "./client/plugins",
    "Plugins": {},
    "PluginStates": {}
  }
}

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

## Upgrading the Chart to 3.0.0+

Breaking Helm chart changes was introduced with version 3.0.0. The easiest
method of resolving them is to simply upgrade the chart and let it fail with and
provide you with a custom message on what you need to change in your
configuration. Note that this failure will occur before any changes have been
made to the k8s cluster.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Mattermost Team Edition chart and their default values.

| Parameter                             | Description                                                                                                                                                                                                                                                                                                                                         | Default                                                                                                                  |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `configJSON`                          | The `config.json` configuration to be used by the mattermost server. The values you provide will by using Helm's merging behavior override individual default values only. See the [example configuration](#example-configuration) and the [Mattermost documentation](https://docs.mattermost.com/administration/config-settings.html) for details. | See `configJSON` in [values.yaml](https://github.com/helm/charts/blob/master/stable/mattermost-team-edition/values.yaml) |
| `image.repository`                    | Container image repository                                                                                                                                                                                                                                                                                                                          | `mattermost/mattermost-team-edition`                                                                                     |
| `image.tag`                           | Container image tag                                                                                                                                                                                                                                                                                                                                 | `5.9.0`                                                                                                                  |
| `image.imagePullPolicy`               | Container image pull policy                                                                                                                                                                                                                                                                                                                         | `IfNotPresent`                                                                                                           |
| `initContainerImage.repository`       | Init container image repository                                                                                                                                                                                                                                                                                                                     | `appropriate/curl`                                                                                                       |
| `initContainerImage.tag`              | Init container image tag                                                                                                                                                                                                                                                                                                                            | `latest`                                                                                                                 |
| `initContainerImage.imagePullPolicy`  | Container image pull policy                                                                                                                                                                                                                                                                                                                         | `IfNotPresent`                                                                                                           |
| `revisionHistoryLimit`                | How many old ReplicaSets for Mattermost Deployment you want to retain                                                                                                                                                                                                                                                                               | `1`                                                                                                                      |
| `ingress.enabled`                     | If `true`, an ingress is created                                                                                                                                                                                                                                                                                                                    | `false`                                                                                                                  |
| `ingress.hosts`                       | A list of ingress hosts                                                                                                                                                                                                                                                                                                                             | `[mattermost.example.com]`                                                                                               |
| `ingress.tls`                         | A list of [ingress tls](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls) items                                                                                                                                                                                                                                                 | `[]`                                                                                                                     |
| `mysql.enabled`                       | Enables deployment of a mysql server                                                                                                                                                                                                                                                                                                                | `true`                                                                                                                   |
| `mysql.mysqlRootPassword`             | Root Password for Mysql (Optional)                                                                                                                                                                                                                                                                                                                  | ""                                                                                                                       |
| `mysql.mysqlUser`                     | Username for Mysql (Required)                                                                                                                                                                                                                                                                                                                       | ""                                                                                                                       |
| `mysql.mysqlPassword`                 | User Password for Mysql (Required)                                                                                                                                                                                                                                                                                                                  | ""                                                                                                                       |
| `mysql.mysqlDatabase`                 | Database name (Required)                                                                                                                                                                                                                                                                                                                            | "mattermost"                                                                                                             |
| `externalDB.enabled`                  | Enables use of an preconfigured external database server                                                                                                                                                                                                                                                                                            | `false`                                                                                                                  |
| `externalDB.externalDriverType`       | `"postgres"` or `"mysql"`                                                                                                                                                                                                                                                                                                                           | ""                                                                                                                       |
| `externalDB.externalConnectionString` | See the section about [external databases](#External-Databases).                                                                                                                                                                                                                                                                                    | ""                                                                                                                       |
| `extraEnvVars`                        | Extra environments variables to be used in the deployments                                                                                                                                                                                                                                                                                          | `[]`                                                                                                                     |
| `extraInitContainers`                 | Additional init containers                                                                                                                                                                                                                                                                                                                          | `[]`                                                                                                                     |

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

### Example configuration

A basic example of a `.yaml` file with values that could be passed to the `helm`
command with the `-f` or `--values` flag to get started.

```yaml
ingress:
  enabled: true
  hosts:
    - mattermost.example.com

configJSON:
  ServiceSettings:
    SiteURL: 'https://mattermost.example.com'
  TeamSettings:
    SiteName: 'Mattermost on Example.com'
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
