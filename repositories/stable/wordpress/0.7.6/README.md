# `@helm-charts/stable-wordpress`

Web publishing platform for building blogs and websites.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | wordpress |
| Chart Version       | 0.7.6     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami WordPress image version
## ref: https://hub.docker.com/r/bitnami/wordpress/tags/
##
image: bitnami/wordpress:4.9.1-r0

## Specify a imagePullPolicy
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
##
wordpressUsername: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
##
# wordpressPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
##
wordpressEmail: user@example.com

## First name
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
##
wordpressFirstName: FirstName

## Last name
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
##
wordpressLastName: LastName

## Blog name
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
##
wordpressBlogName: User's Blog!

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
allowEmptyPassword: yes

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-wordpress/#smtp-configuration
##
# smtpHost:
# smtpPort:
# smtpUser:
# smtpPassword:
# smtpUsername:
# smtpProtocol:

externalDatabase:
  ## All of these values are only used when mariadb.enabled is set to false
  ## Database host
  host: localhost

  ## Database Root User (so wordpress can create the db schema etc)
  # rootPassword:

  ## non-root Username for Wordpress Database
  user: bn_wordpress

  ## Database password
  # password:

  ## Database name
  database: bitnami_wordpress

  ## Database port number
  port: 3306

##
## MariaDB chart configuration
##
mariadb:
  ## Whether to use the database specified as a requirement or not.
  ## If you want to use an external database set this to false and supply details to externalDatabase above
  enabled: true

  ## MariaDB admin password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#setting-the-root-password-on-first-run
  ##
  # mariadbRootPassword:

  ## Create a database
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-on-first-run
  ##
  mariadbDatabase: bitnami_wordpress

  ## Create a database user
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  mariadbUser: bn_wordpress

  ## Password for mariadbUser
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  # mariadbPassword:

  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
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

## Allow health checks to be pointed at the https port
healthcheckHttps: false

## Configure ingress resource that allow you to access the
## Wordpress instalation. Set up the URL
## ref: http://kubernetes.io/docs/user-guide/ingress/
##
ingress:
  ## Set to true to enable ingress record generation
  enabled: false

  ## The list of hostnames to be covered with this ingress record.
  ## Most likely this will be just one host, but in the event more hosts are needed, this is an array
  hosts:
    - name: wordpress.local

      ## Set this to true in order to enable TLS on the ingress record
      ## A side effect of this will be that the backend wordpress service will be connected at port 443
      tls: false

      ## If TLS is set to true, you must declare what secret will store the key/certificate for TLS
      tlsSecret: wordpress.local-tls

      ## Ingress annotations done as key:value pairs
      ## If you're using kube-lego, you will want to add:
      ## kubernetes.io/tls-acme: true
      ##
      ## For a full list of possible ingress annotations, please see
      ## ref: https://github.com/kubernetes/ingress-nginx/blob/master/docs/annotations.md
      ##
      ## If tls is set to true, annotation ingress.kubernetes.io/secure-backends: "true" will automatically be set
      annotations:
      #  kubernetes.io/ingress.class: nginx
      #  kubernetes.io/tls-acme: true

  secrets:
  ## If you're providing your own certificates, please use this to add the certificates as secrets
  ## key and certificate should start with -----BEGIN CERTIFICATE----- or
  ## -----BEGIN RSA PRIVATE KEY-----
  ##
  ## name should line up with a tlsSecret set further up
  ## If you're using kube-lego, this is unneeded, as it will create the secret for you if it is not set
  ##
  ## It is also possible to create and manage the certificates outside of this helm chart
  ## Please see README.md for more information
  # - name: wordpress.local-tls
  #   key:
  #   certificate:

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  ## wordpress data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 10Gi

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 512Mi
    cpu: 300m

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}
```

</details>

---

# WordPress

[WordPress](https://wordpress.org/) is one of the most versatile open source content management systems on the market. A publishing platform for building blogs and websites.

## TL;DR;

```console
$ helm install stable/wordpress
```

## Introduction

This chart bootstraps a [WordPress](https://github.com/bitnami/bitnami-docker-wordpress) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the WordPress application.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/wordpress
```

The command deploys WordPress on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the WordPress chart and their default values.

| Parameter                        | Description                                | Default                                        |
| -------------------------------- | ------------------------------------------ | ---------------------------------------------- |
| `image`                          | WordPress image                            | `bitnami/wordpress:{VERSION}`                  |
| `imagePullPolicy`                | Image pull policy                          | `IfNotPresent`                                 |
| `wordpressUsername`              | User of the application                    | `user`                                         |
| `wordpressPassword`              | Application password                       | _random 10 character long alphanumeric string_ |
| `wordpressEmail`                 | Admin email                                | `user@example.com`                             |
| `wordpressFirstName`             | First name                                 | `FirstName`                                    |
| `wordpressLastName`              | Last name                                  | `LastName`                                     |
| `wordpressBlogName`              | Blog name                                  | `User's Blog!`                                 |
| `allowEmptyPassword`             | Allow DB blank passwords                   | `yes`                                          |
| `smtpHost`                       | SMTP host                                  | `nil`                                          |
| `smtpPort`                       | SMTP port                                  | `nil`                                          |
| `smtpUser`                       | SMTP user                                  | `nil`                                          |
| `smtpPassword`                   | SMTP password                              | `nil`                                          |
| `smtpUsername`                   | User name for SMTP emails                  | `nil`                                          |
| `smtpProtocol`                   | SMTP protocol [`tls`, `ssl`]               | `nil`                                          |
| `mariadb.enabled`                | Deploy MariaDB container(s)                | `true`                                         |
| `mariadb.mariadbRootPassword`    | MariaDB admin password                     | `nil`                                          |
| `mariadb.mariadbDatabase`        | Database name to create                    | `bitnami_wordpress`                            |
| `mariadb.mariadbUser`            | Database user to create                    | `bn_wordpress`                                 |
| `mariadb.mariadbPassword`        | Password for the database                  | _random 10 character long alphanumeric string_ |
| `externalDatabase.host`          | Host of the external database              | `localhost`                                    |
| `externalDatabase.rootPassword`  | DB Root users password (schema creation)   | `nil`                                          |
| `externalDatabase.user`          | Existing username in the external db       | `bn_wordpress`                                 |
| `externalDatabase.password`      | Password for the above username            | `nil`                                          |
| `externalDatabase.database`      | Name of the existing database              | `bitnami_wordpress`                            |
| `externalDatabase.port`          | Database port number                       | `3306`                                         |
| `serviceType`                    | Kubernetes Service type                    | `LoadBalancer`                                 |
| `healthcheckHttps`               | Use https for liveliness and readiness     | `false`                                        |
| `ingress.enabled`                | Enable ingress controller resource         | `false`                                        |
| `ingress.hosts[0].name`          | Hostname to your WordPress installation    | `wordpress.local`                              |
| `ingress.hosts[0].path`          | Path within the url structure              | `/`                                            |
| `ingress.hosts[0].tls`           | Utilize TLS backend in ingress             | `false`                                        |
| `ingress.hosts[0].tlsSecret`     | TLS Secret (certificates)                  | `wordpress.local-tls-secret`                   |
| `ingress.hosts[0].annotations`   | Annotations for this host's ingress record | `[]`                                           |
| `ingress.secrets[0].name`        | TLS Secret Name                            | `nil`                                          |
| `ingress.secrets[0].certificate` | TLS Secret Certificate                     | `nil`                                          |
| `ingress.secrets[0].key`         | TLS Secret Key                             | `nil`                                          |
| `persistence.enabled`            | Enable persistence using PVC               | `true`                                         |
| `persistence.storageClass`       | PVC Storage Class                          | `nil` (uses alpha storage class annotation)    |
| `persistence.accessMode`         | PVC Access Mode                            | `ReadWriteOnce`                                |
| `persistence.size`               | PVC Storage Request                        | `10Gi`                                         |
| `nodeSelector`                   | Node labels for pod assignment             | `{}`                                           |

The above parameters map to the env variables defined in [bitnami/wordpress](http://github.com/bitnami/bitnami-docker-wordpress). For more information please refer to the [bitnami/wordpress](http://github.com/bitnami/bitnami-docker-wordpress) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set wordpressUsername=admin,wordpressPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/wordpress
```

The above command sets the WordPress administrator account username and password to `admin` and `password` respectively. Additionally it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/wordpress
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami WordPress](https://github.com/bitnami/bitnami-docker-wordpress) image stores the WordPress data and configurations at the `/bitnami` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Using an external database

Sometimes you may want to have Wordpress connect to an external database rather than installing one inside your cluster, e.g. to use a managed database service, or use run a single database server for all your applications. To do this, the chart allows you to specify credentials for an external database under the [`externalDatabase` parameter](#configuration). You should also disable the MariaDB installation with the `mariadb.enabled` option. For example:

```console
$ helm install stable/wordpress \
    --set mariadb.enabled=false,externalDatabase.host=myexternalhost,externalDatabase.rootPassword=rootpassword,externalDatabase.user=myuser,externalDatabase.password=mypassword,externalDatabase.database=mydatabase,externalDatabase.port=3306
```

Note also if you disable MariaDB per above you MUST supply values for externalDatabase.rootPassword & externalDatabase.password.

## Ingress

This chart provides support for ingress resources. If you have an
ingress controller installed on your cluster, such as [nginx-ingress](https://kubeapps.com/charts/stable/nginx-ingress)
or [traefik](https://kubeapps.com/charts/stable/traefik) you can utilize
the ingress controller to service your WordPress application.

To enable ingress integration, please set `ingress.enabled` to `true`

### Hosts

Most likely you will only want to have one hostname that maps to this
WordPress installation, however it is possible to have more than one
host. To facilitate this, the `ingress.hosts` object is an array.

For each item, please indicate a `name`, `tls`, `tlsSecret`, and any
`annotations` that you may want the ingress controller to know about.

Indicating TLS will cause WordPress to generate HTTPS urls, and
WordPress will be connected to at port 443. The actual secret that
`tlsSecret` references does not have to be generated by this chart.
However, please note that if TLS is enabled, the ingress record will not
work until this secret exists.

For annotations, please see [this document](https://github.com/kubernetes/ingress-nginx/blob/master/docs/annotations.md).
Not all annotations are supported by all ingress controllers, but this
document does a good job of indicating which annotation is supported by
many popular ingress controllers.

### TLS Secrets

This chart will facilitate the creation of TLS secrets for use with the
ingress controller, however this is not required. There are three
common use cases:

- helm generates / manages certificate secrets
- user generates / manages certificates separately
- an additional tool (like [kube-lego](https://kubeapps.com/charts/stable/kube-lego))
  manages the secrets for the application

In the first two cases, one will need a certificate and a key. We would
expect them to look like this:

- certificate files should look like (and there can be more than one
  certificate if there is a certificate chain)

```
-----BEGIN CERTIFICATE-----
MIID6TCCAtGgAwIBAgIJAIaCwivkeB5EMA0GCSqGSIb3DQEBCwUAMFYxCzAJBgNV
...
jScrvkiBO65F46KioCL9h5tDvomdU1aqpI/CBzhvZn1c0ZTf87tGQR8NK7v7
-----END CERTIFICATE-----
```

- keys should look like:

```
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAvLYcyu8f3skuRyUgeeNpeDvYBCDcgq+LsWap6zbX5f8oLqp4
...
wrj2wDbCDCFmfqnSJ+dKI3vFLlEz44sAV8jX/kd4Y6ZTQhlLbYc=
-----END RSA PRIVATE KEY-----
```

If you are going to use helm to manage the certificates, please copy
these values into the `certificate` and `key` values for a given
`ingress.secrets` entry.

If you are going are going to manage TLS secrets outside of helm, please
know that you can create a TLS secret by doing the following:

```
kubectl create secret tls wordpress.local-tls --key /path/to/key.key --cert /path/to/cert.crt
```

Please see [this example](https://github.com/kubernetes/contrib/tree/master/ingress/controllers/nginx/examples/tls)
for more information.
