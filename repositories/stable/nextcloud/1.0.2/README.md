# `@helm-charts/stable-nextcloud`

A file sharing server that puts the control and security of your own data back into your hands.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | nextcloud |
| Chart Version       | 1.0.2     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Official nextcloud image version
## ref: https://hub.docker.com/r/library/nextcloud/tags/
##
image:
  repository: nextcloud
  tag: 15.0.2-apache
  pullPolicy: IfNotPresent
  # pullSecrets:
  #   - myRegistrKeySecretName

nameOverride: ''
fullnameOverride: ''

# Number of replicas to be deployed
replicaCount: 1

## Allowing use of ingress controllers
## ref: https://kubernetes.io/docs/concepts/services-networking/ingress/
##
ingress:
  enabled: false
  annotations: {}
  #  nginx.ingress.kubernetes.io/proxy-body-size: 4G
  #  kubernetes.io/tls-acme: "true"
  #  certmanager.k8s.io/cluster-issuer: letsencrypt-prod
  #  nginx.ingress.kubernetes.io/server-snippet: |-
  #    add_header Strict-Transport-Security "max-age=15768000; includeSubDomains; preload;";
  #    add_header X-Robots-Tag none;
  #    add_header X-Download-Options noopen;
  #    add_header X-Permitted-Cross-Domain-Policies none;
  #    add_header X-Content-Type-Options nosniff;
  #    add_header X-XSS-Protection "1; mode=block";
  #    add_header Referrer-Policy no-referrer;
  #    rewrite ^/.well-known/webfinger /public.php?service=webfinger last;
  #    rewrite ^/.well-known/host-meta /public.php?service=host-meta last;
  #    rewrite ^/.well-known/host-meta.json /public.php?service=host-meta-json;
  #    location = /.well-known/carddav {
  #      return 301 $scheme://$host/remote.php/dav;
  #    }
  #    location = /.well-known/caldav {
  #      return 301 $scheme://$host/remote.php/dav;
  #    }
  #    location = /robots.txt {
  #      allow all;
  #      log_not_found off;
  #      access_log off;
  #    }
  #    location ~ \.(?:png|html|ttf|ico|jpg|jpeg)$ {
  #      try_files $uri /index.php$request_uri;
  #      # Optional: Don't log access to other assets
  #      access_log off;
  #    }
  #    location / {
  #      rewrite ^ /index.php$request_uri;
  #    }
  #    location ~ ^/(?:build|tests|config|lib|3rdparty|templates|data)/ {
  #      deny all;
  #    }
  #    location ~ ^/(?:\.|autotest|occ|issue|indie|db_|console) {
  #      deny all;
  #    }
  #  tls:
  #    - secretName: nextcloud-tls
  #      hosts:
  #        - nextcloud.kube.home

nextcloud:
  host: nextcloud.kube.home
  username: admin
  password: changeme

internalDatabase:
  enabled: true
  name: nextcloud

##
## External database configuration
##
externalDatabase:
  enabled: false

  ## Database host
  host:

  ## Database user
  user: nextcloud

  ## Database password
  password:

  ## Database name
  database: nextcloud

##
## MariaDB chart configuration
##
mariadb:
  ## Whether to deploy a mariadb server to satisfy the applications database requirements. To use an external database set this to false and configure the externalDatabase parameters
  enabled: false

  db:
    name: nextcloud
    user: nextcloud
    password: changeme

  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  persistence:
    enabled: false
    accessMode: ReadWriteOnce
    size: 8Gi

service:
  type: ClusterIP
  port: 8080
  loadBalancerIP: nil

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: false
  ## nextcloud data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"

  ## A manually managed Persistent Volume and Claim
  ## Requires persistence.enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:

  accessMode: ReadWriteOnce
  size: 8Gi

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# nextcloud

[nextcloud](https://nextcloud.com/) is a file sharing server that puts the control and security of your own data back into your hands.

## TL;DR;

```console
$ helm install stable/nextcloud
```

## Introduction

This chart bootstraps an [nextcloud](https://hub.docker.com/_/nextcloud/) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the nextcloud application.

## Prerequisites

- Kubernetes 1.9+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/nextcloud
```

The command deploys nextcloud on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the nextcloud chart and their default values.

| Parameter                   | Description                                  | Default                                                 |
| --------------------------- | -------------------------------------------- | ------------------------------------------------------- |
| `image.repository`          | nextcloud Image name                         | `nextcloud`                                             |
| `image.tag`                 | nextcloud Image tag                          | `{VERSION}`                                             |
| `image.pullPolicy`          | Image pull policy                            | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`         | Specify image pull secrets                   | `nil`                                                   |
| `ingress.enabled`           | Enable use of ingress controllers            | `false`                                                 |
| `ingress.servicePort`       | Ingress' backend servicePort                 | `http`                                                  |
| `ingress.annotations`       | An array of service annotations              | `nil`                                                   |
| `ingress.tls`               | Ingress TLS configuration                    | `[]`                                                    |
| `nextcloud.host`            | nextcloud host to create application URLs    | `nextcloud.kube.home`                                   |
| `nextcloud.username`        | User of the application                      | `admin`                                                 |
| `nextcloud.password`        | Application password                         | `changeme`                                              |
| `internalDatabase.enabled`  | Whether to use internal sqlite database      | `true`                                                  |
| `internalDatabase.database` | Name of the existing database                | `nextcloud`                                             |
| `externalDatabase.enabled`  | Whether to use external database             | `false`                                                 |
| `externalDatabase.host`     | Host of the external database                | `nil`                                                   |
| `externalDatabase.database` | Name of the existing database                | `nextcloud`                                             |
| `externalDatabase.user`     | Existing username in the external db         | `nextcloud`                                             |
| `externalDatabase.password` | Password for the above username              | `nil`                                                   |
| `mariadb.enabled`           | Whether to use the MariaDB chart             | `false`                                                 |
| `mariadb.db.name`           | Database name to create                      | `nextcloud`                                             |
| `mariadb.db.password`       | Password for the database                    | `changeme`                                              |
| `mariadb.db.user`           | Database user to create                      | `nextcloud`                                             |
| `mariadb.rootUser.password` | MariaDB admin password                       | `nil`                                                   |
| `service.type`              | Kubernetes Service type                      | `ClusterIp`                                             |
| `service.loadBalancerIP`    | LoadBalancerIp for service type LoadBalancer | `nil`                                                   |
| `persistence.enabled`       | Enable persistence using PVC                 | `false`                                                 |
| `persistence.storageClass`  | PVC Storage Class for nextcloud volume       | `nil` (uses alpha storage class annotation)             |
| `persistence.existingClaim` | An Existing PVC name for nextcloud volume    | `nil` (uses alpha storage class annotation)             |
| `persistence.accessMode`    | PVC Access Mode for nextcloud volume         | `ReadWriteOnce`                                         |
| `persistence.size`          | PVC Storage Request for nextcloud volume     | `8Gi`                                                   |
| `resources`                 | CPU/Memory resource requests/limits          | `{}`                                                    |

> **Note**:
>
> For nextcloud to function correctly, you should specify the `nextcloud.host` parameter to specify the FQDN (recommended) or the public IP address of the nextcloud service.
>
> Optionally, you can specify the `service.loadBalancerIP` parameter to assign a reserved IP address to the nextcloud service of the chart. However please note that this feature is only available on a few cloud providers (f.e. GKE).
>
> To reserve a public IP address on GKE:
>
> ```bash
> $ gcloud compute addresses create nextcloud-public-ip
> ```
>
> The reserved IP address can be associated to the nextcloud service by specifying it as the value of the `service.loadBalancerIP` parameter while installing the chart.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set nextcloud.username=admin,nextcloud.password=password,mariadb.rootUser.password=secretpassword \
    stable/nextcloud
```

The above command sets the nextcloud administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/nextcloud
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Nextcloud](https://hub.docker.com/_/nextcloud/) image stores the nextcloud data and configurations at the `/var/www/html` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to enable persistence and configuration of the PVC.
