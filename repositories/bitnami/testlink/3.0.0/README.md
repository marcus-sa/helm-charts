# `@helm-charts/bitnami-testlink`

Web-based test management system that facilitates software quality assurance.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | bitnami  |
| Chart Name          | testlink |
| Chart Version       | 3.0.0    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami TestLink image version
## ref: https://hub.docker.com/r/bitnami/testlink/tags/
##
image:
  registry: docker.io
  repository: bitnami/testlink
  tag: 1.9.17-debian-9
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

## List of nodeSelectors to limit where testlink can run
## i.e
##
## nodeSelector:
##   kops.k8s.io/instancegroup: my-ig
nodeSelector: {}

## Admin username
## ref: https://github.com/bitnami/bitnami-docker-testlink#environment-variables
##
testlinkUsername: user

## Admin user password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-testlink#environment-variables
##
# testlinkPassword:

## Admin user email
## ref: https://github.com/bitnami/bitnami-docker-testlink#environment-variables
##
testlinkEmail: user@example.com

## Default Language
## ref: https://github.com/bitnami/bitnami-docker-testlink#environment-variables
##
testlinkLanguage: en_US

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-testlink#environment-variables
allowEmptyPassword: 'yes'

##
## External database configuration
##
externalDatabase:
  ## Database host
  host:

  ## Database host
  port: 3306

  ## Database user
  user: bn_testlink

  ## Database password
  password:

  ## Database name
  database: bitnami_testlink

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-testlink#smtp-configuration
##
smtpEnable: false
smtpHost:
smtpPort:
smtpUser:
smtpPassword:
smtpConnectionMode:

##
## MariaDB chart configuration
##
mariadb:
  ## Whether to deploy a mariadb server to satisfy the applications database requirements. To use an external database set this to false and configure the externalDatabase parameters
  enabled: true
  ## Disable MariaDB replication
  replication:
    enabled: false

  ## Create a database and a database user
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  db:
    name: bitnami_testlink
    user: bn_testlink
    ## If the password is not specified, mariadb will generates a random password
    ##
    # password:

  ## MariaDB admin password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#setting-the-root-password-on-first-run
  ##
  # rootUser:
  #   password:

  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  master:
    persistence:
      enabled: true
      ## mariadb data Persistent Volume Storage Class
      ## If defined, storageClassName: <storageClass>
      ## If set to "-", storageClassName: "", which disables dynamic provisioning
      ## If undefined (the default) or set to null, no storageClassName spec is
      ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
      ##   GKE, AWS & OpenStack)
      ##
      # storageClass: "-"
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
  apache:
    ## apache data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 1Gi
  testlink:
    ## testlink data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 8Gi

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 512Mi
    cpu: 300m
```

</details>

---

# TestLink

[TestLink](http://www.testlink.org) is a web-based test management system that facilitates software quality assurance. It is developed and maintained by Teamtest. The platform offers support for test cases, test suites, test plans, test projects and user management, as well as various reports and statistics.

## TL;DR;

```console
$ helm install stable/testlink
```

## Introduction

This chart bootstraps a [TestLink](https://github.com/bitnami/bitnami-docker-testlink) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the TestLink application.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/testlink
```

The command deploys TestLink on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the TestLink chart and their default values.

| Parameter                           | Description                             | Default                                                 |
| ----------------------------------- | --------------------------------------- | ------------------------------------------------------- |
| `image.registry`                    | TestLink image registry                 | `docker.io`                                             |
| `image.repository`                  | TestLink image name                     | `bitnami/testlink`                                      |
| `image.tag`                         | TestLink image tag                      | `{VERSION}`                                             |
| `image.pullPolicy`                  | Image pull policy                       | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`                 | Specify image pull secrets              | `nil`                                                   |
| `testlinkUsername`                  | Admin username                          | `user`                                                  |
| `testlinkPassword`                  | Admin user password                     | _random 10 character long alphanumeric string_          |
| `testlinkEmail`                     | Admin user email                        | `user@example.com`                                      |
| `smtpEnable`                        | Enable SMTP                             | `false`                                                 |
| `smtpHost`                          | SMTP host                               | `nil`                                                   |
| `smtpPort`                          | SMTP port                               | `nil`                                                   |
| `smtpUser`                          | SMTP user                               | `nil`                                                   |
| `smtpPassword`                      | SMTP password                           | `nil`                                                   |
| `smtpConnectionMode`                | SMTP connection mode [`ssl`, `tls`]     | `nil`                                                   |
| `allowEmptyPassword`                | Allow DB blank passwords                | `yes`                                                   |
| `externalDatabase.host`             | Host of the external database           | `nil`                                                   |
| `externalDatabase.port`             | Port of the external database           | `3306`                                                  |
| `externalDatabase.user`             | Existing username in the external db    | `bn_testlink`                                           |
| `externalDatabase.password`         | Password for the above username         | `nil`                                                   |
| `externalDatabase.database`         | Name of the existing database           | `bitnami_testlink`                                      |
| `mariadb.enabled`                   | Whether to use the MariaDB chart        | `true`                                                  |
| `mariadb.db.name`                   | Database name to create                 | `bitnami_testlink`                                      |
| `mariadb.db.user`                   | Database user to create                 | `bn_testlink`                                           |
| `mariadb.db.password`               | Password for the database               | `nil`                                                   |
| `mariadb.rootUser.password`         | MariaDB admin password                  | `nil`                                                   |
| `serviceType`                       | Kubernetes Service type                 | `LoadBalancer`                                          |
| `persistence.enabled`               | Enable persistence using PVC            | `true`                                                  |
| `persistence.apache.storageClass`   | PVC Storage Class for Apache volume     | `nil` (uses alpha storage class annotation)             |
| `persistence.apache.accessMode`     | PVC Access Mode for Apache volume       | `ReadWriteOnce`                                         |
| `persistence.apache.size`           | PVC Storage Request for Apache volume   | `1Gi`                                                   |
| `persistence.testlink.storageClass` | PVC Storage Class for TestLink volume   | `nil` (uses alpha storage class annotation)             |
| `persistence.testlink.accessMode`   | PVC Access Mode for TestLink volume     | `ReadWriteOnce`                                         |
| `persistence.testlink.size`         | PVC Storage Request for TestLink volume | `8Gi`                                                   |
| `resources`                         | CPU/Memory resource requests/limits     | Memory: `512Mi`, CPU: `300m`                            |

The above parameters map to the env variables defined in [bitnami/testlink](http://github.com/bitnami/bitnami-docker-testlink). For more information please refer to the [bitnami/testlink](http://github.com/bitnami/bitnami-docker-testlink) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set testlinkUsername=admin,testlinkPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/testlink
```

The above command sets the TestLink administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/testlink
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami TestLink](https://github.com/bitnami/bitnami-docker-testlink) image stores the TestLink data and configurations at the `/bitnami/testlink` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Upgrading

### To 3.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 3.0.0. The following example assumes that the release name is testlink:

```console
$ kubectl patch deployment testlink-testlink --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
$ kubectl delete statefulset testlink-mariadb --cascade=false
```
