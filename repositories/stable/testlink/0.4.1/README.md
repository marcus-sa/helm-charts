# `@helm-charts/stable-testlink`

Web-based test management system that facilitates software quality assurance.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | testlink |
| Chart Version       | 0.4.1    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami TestLink image version
## ref: https://hub.docker.com/r/bitnami/testlink/tags/
##
image: bitnami/testlink:1.9.14-r4

## Specify a imagePullPolicy
## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
# imagePullPolicy:

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

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-testlink#smtp-configuration
##
# smtpEnable: true
# smtpHost: smtp.example.com
# smtpPort: 587
# smtpUser: mailer@example.com
# smtpPassword: mailerpassword
# smtpConnectionMode: tls

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
  apache:
    storageClass: generic
    accessMode: ReadWriteOnce
    size: 1Gi
  testlink:
    storageClass: generic
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

The following tables lists the configurable parameters of the TestLink chart and their default values.

| Parameter                           | Description                             | Default                                                 |
| ----------------------------------- | --------------------------------------- | ------------------------------------------------------- |
| `image`                             | TestLink image                          | `bitnami/testlink:{VERSION}`                            |
| `imagePullPolicy`                   | Image pull policy                       | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `testlinkUsername`                  | Admin username                          | `user`                                                  |
| `testlinkPassword`                  | Admin user password                     | _random 10 character long alphanumeric string_          |
| `testlinkEmail`                     | Admin user email                        | `user@example.com`                                      |
| `smtpEnable`                        | Enable SMTP                             | `false`                                                 |
| `smtpHost`                          | SMTP host                               | `nil`                                                   |
| `smtpPort`                          | SMTP port                               | `nil`                                                   |
| `smtpUser`                          | SMTP user                               | `nil`                                                   |
| `smtpPassword`                      | SMTP password                           | `nil`                                                   |
| `smtpConnectionMode`                | SMTP connection mode [`ssl`, `tls`]     | `nil`                                                   |
| `mariadb.mariadbRootPassword`       | MariaDB admin password                  | `nil`                                                   |
| `serviceType`                       | Kubernetes Service type                 | `LoadBalancer`                                          |
| `persistence.enabled`               | Enable persistence using PVC            | `true`                                                  |
| `persistence.apache.storageClass`   | PVC Storage Class for Apache volume     | `generic`                                               |
| `persistence.apache.accessMode`     | PVC Access Mode for Apache volume       | `ReadWriteOnce`                                         |
| `persistence.apache.size`           | PVC Storage Request for Apache volume   | `1Gi`                                                   |
| `persistence.testlink.storageClass` | PVC Storage Class for TestLink volume   | `generic`                                               |
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

The above command sets the TestLink administrator account username and password to `admin` and `password` respectively. Additionally it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/testlink
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami TestLink](https://github.com/bitnami/bitnami-docker-testlink) image stores the TestLink data and configurations at the `/bitnami/testlink` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
