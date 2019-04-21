# `@helm-charts/stable-redmine`

A flexible project management web application.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | redmine |
| Chart Version       | 0.3.7   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami Redmine image version
## ref: https://hub.docker.com/r/bitnami/redmine/tags/
##
image: bitnami/redmine:3.3.1-r8

## Specify a imagePullPolicy
## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
# imagePullPolicy:

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-redmine/#environment-variables
##
redmineUsername: user

## Application password
## ref: https://github.com/bitnami/bitnami-docker-redmine/#environment-variables
##
redminePassword: bitnami

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-redmine/#environment-variables
##
redmineEmail: user@example.com

## Redmine default data language
## ref: https://github.com/bitnami/bitnami-docker-redmine/#environment-variables
##
redmineLanguage: en

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-redmine/#smtp-configuration
##
# smtpHost:
# smtpPort:
# smtpUser:
# smtpPassword:
# smtpTls:

##
## MariaDB chart configuration
##
mariadb:
  ## MariaDB admin password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#setting-the-root-password-on-first-run
  ##
  # mariadbRootPassword:

  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  persistence:
    enabled: true
    storageClass: generic
    accessMode: ReadWriteOnce
    size: 8Gi

## Kubernetes configuration
## For minikube, set this to NodePort, elsewhere use LoadBalancer
##
serviceType: LoadBalancer

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  storageClass: generic
  accessMode: ReadWriteOnce
  size: 8Gi
```

</details>

---

# Redmine

[Redmine](http://www.redmine.org) is a free and open source, web-based project management and issue tracking tool.

## TL;DR;

```bash
$ helm install stable/redmine
```

## Introduction

This chart bootstraps a [Redmine](https://github.com/bitnami/bitnami-docker-redmine) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the Redmine application.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/redmine
```

The command deploys Redmine on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Redmine chart and their default values.

| Parameter                     | Description                   | Default                                                  |
| ----------------------------- | ----------------------------- | -------------------------------------------------------- |
| `image`                       | Redmine image                 | `bitnami/redmine:{VERSION}`                              |
| `imagePullPolicy`             | Image pull policy             | `Always` if `image` tag is `latest`, else `IfNotPresent` |
| `redmineUsername`             | User of the application       | `user`                                                   |
| `redminePassword`             | Application password          | `bitnami`                                                |
| `redmineEmail`                | Admin email                   | `user@example.com`                                       |
| `redmineLanguage`             | Redmine default data language | `en`                                                     |
| `smtpHost`                    | SMTP host                     | `nil`                                                    |
| `smtpPort`                    | SMTP port                     | `nil`                                                    |
| `smtpUser`                    | SMTP user                     | `nil`                                                    |
| `smtpPassword`                | SMTP password                 | `nil`                                                    |
| `smtpTls`                     | Use TLS encryption with SMTP  | `nil`                                                    |
| `mariadb.mariadbRootPassword` | MariaDB admin password        | `nil`                                                    |
| `serviceType`                 | Kubernetes Service type       | `LoadBalancer`                                           |
| `persistence.enabled`         | Enable persistence using PVC  | `true`                                                   |
| `persistence.storageClass`    | PVC Storage Class             | `generic`                                                |
| `persistence.accessMode`      | PVC Access Mode               | `ReadWriteOnce`                                          |
| `persistence.size`            | PVC Storage Request           | `8Gi`                                                    |

The above parameters map to the env variables defined in [bitnami/redmine](http://github.com/bitnami/bitnami-docker-redmine). For more information please refer to the [bitnami/redmine](http://github.com/bitnami/bitnami-docker-redmine) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set redmineUsername=admin,redminePassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/redmine
```

The above command sets the Redmine administrator account username and password to `admin` and `password` respectively. Additionally it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/redmine
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami Redmine](https://github.com/bitnami/bitnami-docker-redmine) image stores the Redmine data and configurations at the `/bitnami/redmine` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
