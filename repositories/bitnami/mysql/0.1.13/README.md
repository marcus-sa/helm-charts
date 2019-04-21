# `@helm-charts/bitnami-mysql`

MySQL is a fast, reliable, scalable, and easy to use open-source relational database system. MySQL Server is intended for mission-critical, heavy-load production systems as well as for embedding into mass-deployed software.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | bitnami |
| Chart Name          | mysql   |
| Chart Version       | 0.1.13  |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami MySQL image version
## ref: https://hub.docker.com/r/bitnami/mysql/tags/
##
## Default: none
image:
  registry: docker.io
  repository: bitnami/mysql
  tag: 5.7.18
  ## Specify a imagePullPolicy
  ## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  ##
  pullPolicy: IfNotPresent
  ## Optionally specify an array of imagePullSecrets.
  ## Secrets must be manually created in the namespace.
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  ##
  # pullSecrets:
  #   - myRegistrKeySecretName

## Specify an imagePullPolicy (Required)
## It's recommended to change this to 'Always' if the image tag is 'latest'
## ref: http://kubernetes.io/docs/user-guide/images/#updating-images
imagePullPolicy: IfNotPresent

## Specify password for root user
## ref: https://github.com/bitnami/bitnami-docker-mysql/blob/master/README.md#setting-the-root-password-on-first-run
##
# mysqlRootPassword:

## Create a database user
## ref: https://github.com/bitnami/bitnami-docker-mysql/blob/master/README.md#creating-a-database-user-on-first-run
##
# mysqlUser:
# mysqlPassword:

## Create a database
## ref: https://github.com/bitnami/bitnami-docker-mysql/blob/master/README.md#creating-a-database-on-first-run
##
# mysqlDatabase:

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  ## If defined, volume.beta.kubernetes.io/storage-class: <storageClass>
  ## Default: volume.alpha.kubernetes.io/storage-class: default
  ##
  # storageClass:
  accessMode: ReadWriteOnce
  size: 8Gi

## Configure MySQL with a custom my.cnf file
## ref: https://mysql.com/kb/en/mysql/configuring-mysql-with-mycnf/#example-of-configuration-file
##
# config: |-
# [mysqld]
# innodb_buffer_pool_size=2G

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 256Mi
    cpu: 250m
```

</details>

---

# MySQL

[MySQL](https://mysql.com) MySQL is a fast, reliable, scalable, and easy to use open-source relational database system. MySQL Server is intended for mission-critical, heavy-load production systems as well as for embedding into mass-deployed software.

## TL;DR;

```bash
$ helm install bitnami/mysql
```

## Introduction

This chart bootstraps a [MySQL](https://github.com/bitnami/bitnami-docker-mysql) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release bitnami/mysql
```

The command deploys MySQL on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the MySQL chart and their default values.

| Parameter                  | Description                                | Default                                                  |
| -------------------------- | ------------------------------------------ | -------------------------------------------------------- |
| `image.registry`           | MySQL image registry                       | `docker.io`                                              |
| `image.repository`         | MySQL Image name                           | `bitnami/mysql`                                          |
| `image.tag`                | MySQL Image tag                            | `{VERSION}`                                              |
| `image.pullPolicy`         | MySQL image pull policy                    | `Always` if `imageTag` is `latest`, else `IfNotPresent`  |
| `image.pullSecrets`        | Specify image pull secrets                 | `nil` (does not add image pull secrets to deployed pods) |
| `mysqlRootPassword`        | Password for the `root` user.              | `nil`                                                    |
| `mysqlUser`                | Username of new user to create.            | `nil`                                                    |
| `mysqlPassword`            | Password for the new user.                 | `nil`                                                    |
| `mysqlDatabase`            | Name for new database to create.           | `nil`                                                    |
| `persistence.enabled`      | Use a PVC to persist data                  | `true`                                                   |
| `persistence.storageClass` | Storage class of backing PVC               | `nil` (uses alpha storage class annotation)              |
| `persistence.accessMode`   | Use volume as ReadOnly or ReadWrite        | `ReadWriteOnce`                                          |
| `persistence.size`         | Size of data volume                        | `8Gi`                                                    |
| `resources`                | CPU/Memory resource requests/limits        | Memory: `256Mi`, CPU: `250m`                             |
| `config`                   | Multi-line string for my.cnf configuration | `nil`                                                    |

The above parameters map to the env variables defined in [bitnami/mysql](http://github.com/bitnami/bitnami-docker-mysql). For more information please refer to the [bitnami/mysql](http://github.com/bitnami/bitnami-docker-mysql) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set mysqlRootPassword=secretpassword,mysqlUser=my-user,mysqlPassword=my-password,mysqlDatabase=my-database \
    bitnami/mysql
```

The above command sets the MySQL `root` account password to `secretpassword`. Additionally it creates a standard database user named `my-user`, with the password `my-password`, who has access to a database named `my-database`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml bitnami/mysql
```

> **Tip**: You can use the default [values.yaml](values.yaml)

### Custom my.cnf configuration

The Bitnami MySQL image allows you to provide a custom `my.cnf` file for configuring MySQL.
This Chart uses the `config` value to mount a custom `my.cnf` using a [ConfigMap](http://kubernetes.io/docs/user-guide/configmap/).
You can configure this by creating a YAML file that defines the `config` property as a multi-line string in the format of a `my.cnf` file.
For example:

```bash
cat > mysql-values.yaml <<EOF
config: |-
  [mysqld]
  max_allowed_packet = 64M
  sql_mode=STRICT_ALL_TABLES
  ft_stopword_file=/etc/mysql/stopwords.txt
  ft_min_word_len=3
  ft_boolean_syntax=' |-><()~*:""&^'
  innodb_buffer_pool_size=2G
EOF

helm install --name my-release -f mysql-values.yaml bitnami/mysql
```

## Persistence

The [Bitnami MySQL](https://github.com/bitnami/bitnami-docker-mysql) image stores the MySQL data and configurations at the `/bitnami/mysql` path of the container.

The chart mounts a [Persistent Volume](kubernetes.io/docs/user-guide/persistent-volumes/) volume at this location. The volume is created using dynamic volume provisioning.
