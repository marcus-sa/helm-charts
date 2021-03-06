# `@helm-charts/stable-sapho`

A micro application development and integration platform that enables organizations to create and deliver secure micro applications that tie into existing business systems and track changes to key business data.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | sapho  |
| Chart Version       | 0.1.8  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for sapho.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
image: sapho/ops-docker-tomcat:8-jre8

mysql:
  persistence:
    enabled: true
    ## mysql data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 8Gi
  resources:
    requests:
      memory: 512Mi
      cpu: 250m

service:
  name: sapho
  type: LoadBalancer
  externalPort: 80
  internalPort: 8080

resources:
  #  limits:
  #    cpu: 500m
  #    memory: 2048Mi
  requests:
    cpu: 250m
    memory: 2048Mi
saphoDBport: 3306
saphoDBtype: mysql
saphoDBuser: root
```

</details>

---

# Sapho

The Sapho Micro App Platform is the best way to put actionable business information into your employeesâ€™ hands. This micro application development and integration platform enables organizations to create and deliver secure micro apps that tie into existing business systems and track changes to key business data. The result is a work feed that keeps employees up-to-date with important information and their associated actions. Employees benefits from real time data updates and one-click task completion from a single unified app, browser, or messenger client. All of this runs on Azure, connects to your existing infrastructure, and integrates with your existing identity and access control solutions to maintain security. For more information, please visit [Sapho](https://www.sapho.com/).

## Introduction

This chart bootstraps a [Sapho](https://bitbucket.org/sapho/ops-docker-tomcat/) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [MySQL chart](https://github.com/kubernetes/charts/tree/master/stable/mysql) which is required for bootstrapping a MySQL deployment for the database requirements of the Sapho application.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart:

```console
$ helm install --name my-release stable/sapho
```

> **Tip**: List all releases using `helm list`

The command deploys Sapho on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment, use `helm list` command to obtain the release name, then :

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Sapho chart and their default values.

| Parameter                        | Description                   | Default                                                  |
| -------------------------------- | ----------------------------- | -------------------------------------------------------- |
| `image`                          | Sapho image                   | `sapho/ops-docker-tomcat:{VERSION}`                      |
| `imagePullPolicy`                | Image pull policy             | `Always` if `image` tag is `latest`, else `IfNotPresent` |
| `saphoDBuser`                    | User of the application       | `user`                                                   |
| `saphoDBpass`                    | MySQL DB Password             | `nil`                                                    |
| `saphoDBtype`                    | Sapho DB Type                 | `mysql`                                                  |
| `saphoDBhost`                    | Sapho DB HostName             | `nil`                                                    |
| `mysql.mysqlRootPassword`        | MySQL admin password          | `nil`                                                    |
| `serviceType`                    | Kubernetes Service type       | `LoadBalancer`                                           |
| `mysql.persistence.enabled`      | Enable persistence using PVC  | `true`                                                   |
| `mysql.persistence.storageClass` | The PVC storage class to use. | `nil` (uses alpha storage class annotation)              |

The above parameters map to the env variables defined in [sapho/ops-docker-tomcat](https://bitbucket.org/sapho/ops-docker-tomcat). For more information please refer to the [sapho/ops-docker-tomcat](https://bitbucket.org/sapho/ops-docker-tomcat) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --set saphoDBuser=root,saphoDBpass=password,mysql.mysqlRootPassword=password sapho
```

The above command sets Sapho's JDBC connection's username and password to `root` and `password` respectively. Additionally it sets the MySQL `root` user password to `password`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml sapho
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [MySQL](https://hub.docker.com/_/mysql/) image stores the data at the `/var/lib/mysql` path of the container which is mounted to a PVC.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
