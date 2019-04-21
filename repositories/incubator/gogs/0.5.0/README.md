# `@helm-charts/incubator-gogs`

Gogs: Go Git Service

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | gogs      |
| Chart Version       | 0.5.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Override the name of the Chart.
##
# nameOverride:

## Kubernetes configuration
## For minikube, set this to NodePort, elsewhere use LoadBalancer
##
serviceType: NodePort

replicaCount: 1

image: gogs/gogs
imageTag: 0.11.29
imagePullPolicy: IfNotPresent

service:
  ## Override the components name (defaults to service).
  ##
  # nameOverride:

  ## HTTP listen port.
  ## ref: https://gogs.io/docs/advanced/configuration_cheat_sheet
  ##
  httpPort: 80

  ## SSH listen port.
  ## ref: https://gogs.io/docs/advanced/configuration_cheat_sheet
  ##
  sshPort: 22

  ## SSH_DOMAIN - Domain name to be exposed in SSH clone URL.
  ## ref: https://gogs.io/docs/advanced/configuration_cheat_sheet
  ##
  sshDomain: localhost

  ## Gogs configuration values
  ## ref: https://gogs.io/docs/advanced/configuration_cheat_sheet
  ##
  gogs:
    ## Application name, can be your company or team name.
    ##
    appName: 'Gogs'

    ## Either "dev", "prod" or "test".
    ##
    runMode: 'prod'

    ## Force every new repository to be private.
    ##
    forcePrivate: false

    ## Indicates whether or not to disable Git clone through HTTP/HTTPS. When
    ## disabled, users can only perform Git operations via SSH.
    ##
    disableHttpGit: false

    ## Indicates whether or not to enable repository file upload feature.
    ##
    repositoryUploadEnabled: true

    ## File types that are allowed to be uploaded, e.g. image/jpeg|image/png.
    ## Leave empty means allow any file typ
    ##
    repositoryUploadAllowedTypes:

    ## Maximum size of each file in MB.
    ##
    repositoryUploadMaxFileSize: 3

    ## Maximum number of files per upload.
    ##
    repositoryUploadMaxFiles: 5

    ## Enable this to use captcha validation for registration.
    ##
    serviceEnableCaptcha: true

    ## Users need to confirm e-mail for registration
    ##
    serviceRegisterEmailConfirm: false

    ## Weather or not to allow users to register.
    ##
    serviceDisableRegistration: false

    ## Weather or not sign in is required to view anything.
    ##
    serviceRequireSignInView: false

    ## Mail notification
    ##
    serviceEnableNotifyMail: false

    ## Either "memory", "redis", or "memcache", default is "memory"
    ##
    cacheAdapter: memory

    ## For "memory" only, GC interval in seconds, default is 60
    ##
    cacheInterval: 60

    ## For "redis" and "memcache", connection host address
    ## redis: network=tcp,addr=:6379,password=macaron,db=0,pool_size=100,idle_timeout=180
    ## memcache: `127.0.0.1:11211`
    ##
    cacheHost:

    ## Enable this to use captcha validation for registration.
    ##
    serverDomain: gogs.example.com

    ## Full public URL of Gogs server.
    ##
    serverRootUrl: http://gogs.example.com/

    ## Landing page for non-logged users, can be "home" or "explore"
    ##
    serverLandingPage: home

    ## Either "mysql", "postgres" or "sqlite3", you can connect to TiDB with
    ## MySQL protocol.  Default is to use the postgresql configuration included
    ## with this chart.
    ##
    databaseType: postgres

    ## Database host.  Unused unless `postgresql.install` is false.
    ##
    databaseHost:

    ## Database user.  Unused unless `postgresql.install` is false.
    ##
    databaseUser:

    ## Database password.  Unused unless `postgresql.install` is false.
    ##
    databasePassword:

    ## Database password.  Unused unless `postgresql.install` is false.
    ##
    databaseName:

    ## Hook task queue length, increase if webhook shooting starts hanging
    ##
    webhookQueueLength: 1000

    ## Deliver timeout in seconds
    ##
    webhookDeliverTimeout: 5

    ## Allow insecure certification
    ##
    webhookSkipTlsVerify: true

    ## Number of history information in each page
    ##
    webhookPagingNum: 10

    ## Can be "console" and "file", default is "console"
    ## Use comma to separate multiple modes, e.g. "console, file"
    ##
    logMode: console

    ## Either "Trace", "Info", "Warn", "Error", "Fatal", default is "Trace"
    ##
    logLevel: Trace

    ## Undocumented, but you can take a guess.
    ##
    otherShowFooterBranding: false

    ## Show version information about Gogs and Go in the footer
    ##
    otherShowFooterVersion: true

    ## Show time of template execution in the footer
    ##
    otherShowFooterTemplateLoadTime: true

    ## Change this value for your installation.
    ##
    securitySecretKey: 'changeme'

    ## Number of repositories that are showed in one explore page
    ##
    uiExplorePagingNum: 20

    ## Number of issues that are showed in one page
    ##
    uiIssuePagingNum: 10

    ## Number of maximum commits showed in one activity feed.
    ## NOTE: This value is also used in how many commits a webhook will send.
    ##
    uiFeedMaxCommitNum: 5

  ## Ingress configuration.
  ## ref: https://kubernetes.io/docs/user-guide/ingress/
  ##
  ingress:
    ## Enable Ingress.
    ##
    enabled: false

    ## Annotations.
    ##
    # annotations:
    #   kubernetes.io/ingress.class: nginx
    #   kubernetes.io/tls-acme: 'true'
    ## Hostnames.
    ## Must be provided if Ingress is enabled.
    ##
    # hosts:
    #   - gogs.domain.com
    ## TLS configuration.
    ## Secrets must be manually created in the namespace.
    ##
    # tls:
    #   - secretName: gogs-tls
    #     hosts:
    #       - gogs.domain.com

## Persistent Volume Storage configuration.
## ref: https://kubernetes.io/docs/user-guide/persistent-volumes
##
persistence:
  ## Enable persistence using Persistent Volume Claims.
  ##
  enabled: true

  ## gogs data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"

  ## Persistent Volume Access Mode.
  ##
  accessMode: ReadWriteOnce

  ## Persistent Volume Storage Size.
  ##
  size: 1Gi

## Configuration values for the postgresql dependency.
## ref: https://github.com/kubernetes/charts/blob/master/stable/postgresql/README.md
##
postgresql:
  ### Install PostgreSQL dependency
  ##
  install: true

  ### PostgreSQL User to create.
  ##
  postgresUser: gogs

  ## PostgreSQL Password for the new user.
  ## If not set, a random 10 characters password will be used.
  ##
  postgresPassword: gogs

  ## PostgreSQL Database to create.
  ##
  postgresDatabase: gogs

  ## Persistent Volume Storage configuration.
  ## ref: https://kubernetes.io/docs/user-guide/persistent-volumes
  ##
  persistence:
    ## Enable PostgreSQL persistence using Persistent Volume Claims.
    ##
    enabled: true
```

</details>

---

# Gogs Helm Chart

[Gogs][] is a painless self-hosted Git service.

## TL;DR;

```console
$ helm install incubator/gogs
```

## Introduction

This chart bootstraps a [Gogs][] deployment on a [Kubernetes][] cluster using
the [Helm][] package manager.

## Prerequisites Details

- PV support on underlying infrastructure (if persistence is required)

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release incubator/gogs
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes nearly all the Kubernetes components associated with the
chart and deletes the release.

## Configuration

The following tables lists some of the configurable parameters of the Gogs
chart and their default values.

| Parameter                        | Description                                                  | Default                                                 |
| -------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| `imageRepository`                | Gogs image                                                   | `gogs/gogs`                                             |
| `imageTag`                       | Gogs image version                                           | `0.11.29`                                               |
| `imagePullPolicy`                | Gogs image pull policy                                       | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `postgresql.install`             | Weather or not to install PostgreSQL dependency              | `true`                                                  |
| `postgresql.postgresHost`        | PostgreSQL host (if `postgresql.install == false`)           | `nil`                                                   |
| `postgresql.postgresUser`        | PostgreSQL User to create                                    | `gogs`                                                  |
| `postgresql.postgresPassword`    | PostgreSQL Password for the new user                         | `gogs`                                                  |
| `postgresql.postgresDatabase`    | PostgreSQL Database to create                                | `gogs`                                                  |
| `postgresql.persistence.enabled` | Enable PostgreSQL persistence using Persistent Volume Claims | `true`                                                  |

See [values.yaml](values.yaml) for a more complete list, and links to the Gogs documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to
`helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be
provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml incubator/gogs
```

> **Tip**: You can use the default [values.yaml](values.yaml)

[gogs]: https://github.com/gogits/gogs
[kubernetes]: https://kubernetes.io
[helm]: https://helm.sh