# `@helm-charts/stable-dokuwiki`

DokuWiki is a standards-compliant, simple to use wiki optimized for creating documentation. It is targeted at developer teams, workgroups, and small companies. All data is stored in plain text files, so no database is required.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | dokuwiki |
| Chart Version       | 0.1.0    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami DokuWiki image version
## ref: https://hub.docker.com/r/bitnami/dokuwiki/tags/
##
image: bitnami/dokuwiki:20160626a-r3

## Specify a imagePullPolicy
## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
# imagePullPolicy:

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-dokuwiki#environment-variables
##
dokuwikiUsername: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-dokuwiki#environment-variables
# dokuwikiPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-dokuwiki#environment-variables
##
dokuwikiEmail: user@example.com

## User's Full Name
## ref: https://github.com/bitnami/bitnami-docker-dokuwiki#environment-variables
##
dokuwikiFullName: Full Name

## Name of the Wiki
## ref: https://github.com/bitnami/bitnami-docker-dokuwiki#environment-variables
##
dokuwikiWikiName: My Wiki

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
  dokuwiki:
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

# DokuWiki

[DokuWiki](https://www.dokuwiki.org) DokuWiki is a standards-compliant, simple to use wiki optimized for creating documentation. It is targeted at developer teams, workgroups, and small companies. All data is stored in plain text files, so no database is required.

## TL;DR;

```console
$ helm install stable/dokuwiki
```

## Introduction

This chart bootstraps a [DokuWiki](https://github.com/bitnami/bitnami-docker-dokuwiki) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/dokuwiki
```

The command deploys DokuWiki on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the DokuWiki chart and their default values.

| Parameter                           | Description                             | Default                                                 |
| ----------------------------------- | --------------------------------------- | ------------------------------------------------------- |
| `image`                             | DokuWiki image                          | `bitnami/dokuwiki:{VERSION}`                            |
| `imagePullPolicy`                   | Image pull policy                       | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `dokuwikiUsername`                  | User of the application                 | `user`                                                  |
| `dokuwikiFullName`                  | User's full name                        | `Full Name`                                             |
| `dokuwikiPassword`                  | Application password                    | _random 10 character alphanumeric string_               |
| `dokuwikiEmail`                     | User email                              | `user@example.com`                                      |
| `dokuwikiWikiName`                  | Wiki name                               | `My Wiki`                                               |
| `serviceType`                       | Kubernetes Service type                 | `LoadBalancer`                                          |
| `persistence.enabled`               | Enable persistence using PVC            | `true`                                                  |
| `persistence.apache.storageClass`   | PVC Storage Class for apache volume     | `generic`                                               |
| `persistence.apache.accessMode`     | PVC Access Mode for apache volume       | `ReadWriteOnce`                                         |
| `persistence.apache.size`           | PVC Storage Request for apache volume   | `1Gi`                                                   |
| `persistence.dokuwiki.storageClass` | PVC Storage Class for DokuWiki volume   | `generic`                                               |
| `persistence.dokuwiki.accessMode`   | PVC Access Mode for DokuWiki volume     | `ReadWriteOnce`                                         |
| `persistence.dokuwiki.size`         | PVC Storage Request for DokuWiki volume | `8Gi`                                                   |
| `resources`                         | CPU/Memory resource requests/limits     | Memory: `512Mi`, CPU: `300m`                            |

The above parameters map to the env variables defined in [bitnami/dokuwiki](http://github.com/bitnami/bitnami-docker-dokuwiki). For more information please refer to the [bitnami/dokuwiki](http://github.com/bitnami/bitnami-docker-dokuwiki) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set dokuwikiUsername=admin,dokuwikiPassword=password \
    stable/dokuwiki
```

The above command sets the DokuWiki administrator account username and password to `admin` and `password` respectively.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/dokuwiki
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami DokuWiki](https://github.com/bitnami/bitnami-docker-dokuwiki) image stores the DokuWiki data and configurations at the `/bitnami/dokuwiki` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
