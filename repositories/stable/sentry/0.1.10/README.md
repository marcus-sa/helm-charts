# `@helm-charts/stable-sentry`

Sentry is a cross-platform crash reporting and aggregation platform.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | sentry |
| Chart Version       | 0.1.10 |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for sentry.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
image:
  repository: sentry
  tag: '8.20'
  pullPolicy: IfNotPresent

# How many web UI instances to run
web:
  replicacount: 1
  resources:
    limits:
      cpu: 500m
      memory: 500Mi
    requests:
      cpu: 300m
      memory: 300Mi
  env:
    - name: GITHUB_APP_ID
      value:
    - name: GITHUB_API_SECRET
      value:

# How many cron instances to run
cron:
  replicacount: 1
  resources:
    limits:
      cpu: 200m
      memory: 200Mi
    requests:
      cpu: 100m
      memory: 100Mi

# How many worker instances to run
worker:
  replicacount: 2
  resources:
    limits:
      cpu: 300m
      memory: 500Mi
    requests:
      cpu: 100m
      memory: 100Mi

# Initial admin user to create
user:
  email: admin@sentry.local

# BYO Email server
# TODO: Add exim4 template
# https://docs.sentry.io/server/installation/docker/#outbound-email
email:
  from_address: sentry@sentry.local
  host: smtp
  port: 25
  use_tls: false
  user:
  password:
  enable_replies: false

# Name of the service and what port to expose on the pod
# Don't change these unless you know what you're doing
service:
  name: sentry
  type: LoadBalancer
  externalPort: 9000
  internalPort: 9000

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  ## database data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 10Gi

  # Where to store sentry files
  # https://docs.sentry.io/server/filestore/
  filestore_dir: /var/lib/sentry/files

## Configure ingress resource that allow you to access the
## Sentry installation. Set up the URL
## ref: http://kubernetes.io/docs/user-guide/ingress/
##
ingress:
  enabled: false
  hostname: sentry.local

  ## Ingress annotations
  ##
  annotations: {}
  #   kubernetes.io/ingress.class: nginx
  #   kubernetes.io/tls-acme: 'true'

  ## Ingress TLS configuration
  ## Secrets must be manually created in the namespace
  ##
  tls: []
  #   - secretName: sentry.local-tls
  #     hosts:
  #       - sentry.local

# TODO: add support for plugins https://docs.sentry.io/server/plugins/

postgresql:
  postgresDatabase: sentry
  postgresUser: sentry
  imageTag: '9.5'
  persistence:
    enabled: true

redis:
  persistence:
    enabled: true
```

</details>

---

# Sentry

[Sentry](https://sentry.io/) is a cross-platform crash reporting and aggregation platform.

## TL;DR;

```console
$ helm install --wait stable/sentry
```

## Introduction

This chart bootstraps a [Sentry](https://sentry.io/) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [PostgreSQL](https://github.com/kubernetes/charts/tree/master/stable/postgresql) and [Redis](https://github.com/kubernetes/charts/tree/master/stable/redis) which are required for Sentry.

> **Warning**: This chart does not yet allow for you to specify your own database host or redis host.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- helm >= v2.3.0 to run "weighted" hooks in right order.
- PV provisioner support in the underlying infrastructure (with persistence storage enabled)

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release --wait stable/sentry
```

> **Note**: We have to use the --wait flag for initial creation because the database creation takes longer than the default 300 seconds

The command deploys Sentry on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

> **Warning**: Jobs are not deleted automatically. They need to be manually deleted

```consule
$ kubectl delete job/sentry-db-init job/sentry-user-create
```

## Configuration

The following table lists the configurable parameters of the Sentry chart and their default values.

| Parameter                  | Description                             | Default                                     |
| -------------------------- | --------------------------------------- | ------------------------------------------- |
| `image.repository`         | Sentry image                            | `library/sentry:{VERSION}`                  |
| `image.tag`                | Sentry image tag                        | `8.17`                                      |
| `imagePullPolicy`          | Image pull policy                       | `IfNotPresent`                              |
| `web.replicacount`         | Amount of web pods to run               | `1`                                         |
| `user.email`               | Username for default admin              | `admin@sentry.local`                        |
| `email.from_address`       | Email notifications are from            | `smtp`                                      |
| `email.host`               | SMTP host for sending email             | `smtp`                                      |
| `email.port`               | SMTP port                               | `25`                                        |
| `email.user`               | SMTP user                               | `nil`                                       |
| `email.password`           | SMTP password                           | `nil`                                       |
| `email.use_tls`            | SMTP TLS for security                   | `false`                                     |
| `email.enable_replies`     | Allow email replies                     | `false`                                     |
| `service.type`             | Kubernetes service type                 | `LoadBalancer`                              |
| `service.name`             | Kubernetes service name                 | `sentry`                                    |
| `service.externalPort`     | Kubernetes external service port        | `9000`                                      |
| `service.internalPort`     | Kubernetes internal service port        | `9000`                                      |
| `ingress.enabled`          | Enable ingress controller resource      | `false`                                     |
| `ingress.annotations`      | Ingress annotations                     | `{}`                                        |
| `ingress.hostname`         | URL to address your Sentry installation | `sentry.local`                              |
| `ingress.tls`              | Ingress TLS configuration               | `[]`                                        |
| `persistence.enabled`      | Enable persistence using PVC            | `true`                                      |
| `persistence.storageClass` | PVC Storage Class                       | `nil` (uses alpha storage class annotation) |
| `persistence.accessMode`   | PVC Access Mode                         | `ReadWriteOnce`                             |
| `persistence.size`         | PVC Storage Request                     | `10Gi`                                      |

Dependent charts can also have values overwritten. Preface values with postgresql._ or redis._

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set persistence.enabled=false,email.host=email \
    stable/sentry
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/sentry
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Sentry](https://github.com/getsentry/docker-sentry) image stores the Sentry data at the `/var/lib/sentry/files` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Ingress

This chart provides support for Ingress resource. If you have available an Ingress Controller such as Nginx or Traefik you maybe want to set up `ingress.enabled` to true and choose a `ingress.hostname` for the URL. Then, you should be able to access the installation using that address.
