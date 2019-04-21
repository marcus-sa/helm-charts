# `@helm-charts/bitnami-mediawiki`

Extremely powerful, scalable software and a feature-rich wiki implementation that uses PHP to process and display data stored in a database.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | bitnami   |
| Chart Name          | mediawiki |
| Chart Version       | 4.0.3     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami DokuWiki image version
## ref: https://hub.docker.com/r/bitnami/mediawiki/tags/
##
image:
  registry: docker.io
  repository: bitnami/mediawiki
  tag: 1.31.1-debian-9
  ## Specify a imagePullPolicy
  ## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  ##
  pullPolicy: Always
  ## Optionally specify an array of imagePullSecrets.
  ## Secrets must be manually created in the namespace.
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  ##
  # pullSecrets:
  #   - myRegistrKeySecretName

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-mediawiki#environment-variables
##
mediawikiUser: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-mediawiki#environment-variables
##
# mediawikiPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-mediawiki#environment-variables
##
mediawikiEmail: user@example.com

## Name for the wiki
## ref: https://github.com/bitnami/bitnami-docker-mediawiki#environment-variables
##
mediawikiName: My Wiki

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-mediawiki#environment-variables
allowEmptyPassword: 'yes'

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-mediawiki#smtp-configuration
##
# smtpHost:
# smtpPort:
# smtpHostID:
# smtpUser:
# smtpPassword:

##
## External database configuration
##
externalDatabase:
  ## Database host
  host:

  ## Database port
  port: 3306

  ## Database user
  user: bn_mediawiki

  ## Database password
  password:

  ## Database name
  database: bitnami_mediawiki

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
    name: bitnami_mediawiki
    user: bn_mediawiki
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

## Kubernetes svc configuration
## For minikube, set this to NodePort, elsewhere use LoadBalancer
##
## Use serviceLoadBalancerIP to request a specific static IP,
## otherwise leave blank
##
service:
  ## Kubernetes svc type
  ## For minikube, set this to NodePort, elsewhere use LoadBalancer
  ##
  type: LoadBalancer
  ## Use serviceLoadBalancerIP to request a specific static IP,
  ## otherwise leave blank
  ##
  # loadBalancerIP:
  ## Use nodePorts to requets some specific ports when usin NodePort
  ## nodePorts:
  ##   http: <to set explicitly, choose port between 30000-32767>
  ##   https: <to set explicitly, choose port between 30000-32767>
  ##
  nodePorts:
    http: ''
    https: ''
  ## Enable client source IP preservation
  ## ref http://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/#preserving-the-client-source-ip
  ##
  externalTrafficPolicy: Cluster

## Configure the ingress resource that allows you to access the
## Mediawiki installation. Set up the URL
## ref: http://kubernetes.io/docs/user-guide/ingress/
##
ingress:
  ## Set to true to enable ingress record generation
  enabled: false

  ## The list of hostnames to be covered with this ingress record.
  ## Most likely this will be just one host, but in the event more hosts are needed, this is an array
  hosts:
    - name: mediawiki.local

      ## Set this to true in order to enable TLS on the ingress record
      ## A side effect of this will be that the backend mediawiki service will be connected at port 443
      tls: false

      ## If TLS is set to true, you must declare what secret will store the key/certificate for TLS
      tlsSecret: mediawiki.local-tls

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
  # - name: mediawiki.local-tls
  #   key:
  #   certificate:

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  apache:
    ## Apache data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 1Gi
  mediawiki:
    ## Mediawiki data Persistent Volume Storage Class
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

## Configure extra options for liveness and readiness probes
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#configure-probes)
livenessProbe:
  enabled: true
  initialDelaySeconds: 120
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1
readinessProbe:
  enabled: true
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1
```

</details>

---

# MediaWiki

[MediaWiki](https://www.mediawiki.org) is an extremely powerful, scalable software and a feature-rich wiki implementation that uses PHP to process and display data stored in a database, such as MySQL.

## TL;DR;

```console
$ helm install stable/mediawiki
```

## Introduction

This chart bootstraps a [MediaWiki](https://github.com/bitnami/bitnami-docker-mediawiki) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the MediaWiki application.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/mediawiki
```

The command deploys MediaWiki on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the MediaWiki chart and their default values.

| Parameter                            | Description                                                 | Default                                        |
| ------------------------------------ | ----------------------------------------------------------- | ---------------------------------------------- |
| `image.registry`                     | MediaWiki image registry                                    | `docker.io`                                    |
| `image.repository`                   | MediaWiki Image name                                        | `bitnami/mediawiki`                            |
| `image.tag`                          | MediaWiki Image tag                                         | `{VERSION}`                                    |
| `image.pullPolicy`                   | Image pull policy                                           | `Always`                                       |
| `image.pullSecrets`                  | Specify image pull secrets                                  | `nil`                                          |
| `mediawikiUser`                      | User of the application                                     | `user`                                         |
| `mediawikiPassword`                  | Application password                                        | _random 10 character long alphanumeric string_ |
| `mediawikiEmail`                     | Admin email                                                 | `user@example.com`                             |
| `mediawikiName`                      | Name for the wiki                                           | `My Wiki`                                      |
| `allowEmptyPassword`                 | Allow DB blank passwords                                    | `yes`                                          |
| `smtpHost`                           | SMTP host                                                   | `nil`                                          |
| `smtpPort`                           | SMTP port                                                   | `nil`                                          |
| `smtpHostID`                         | SMTP host ID                                                | `nil`                                          |
| `smtpUser`                           | SMTP user                                                   | `nil`                                          |
| `smtpPassword`                       | SMTP password                                               | `nil`                                          |
| `externalDatabase.host`              | Host of the external database                               | `nil`                                          |
| `externalDatabase.user`              | Existing username in the external db                        | `bn_mediawiki`                                 |
| `externalDatabase.password`          | Password for the above username                             | `nil`                                          |
| `externalDatabase.database`          | Name of the existing database                               | `bitnami_mediawiki`                            |
| `mariadb.enabled`                    | Use or not the mariadb chart                                | `true`                                         |
| `mariadb.rootUser.password`          | MariaDB admin password                                      | `nil`                                          |
| `mariadb.db.name`                    | Database name to create                                     | `bitnami_mediawiki`                            |
| `mariadb.db.user`                    | Database user to create                                     | `bn_mediawiki`                                 |
| `mariadb.db.password`                | Password for the database                                   | _random 10 character long alphanumeric string_ |
| `service.type`                       | Kubernetes Service type                                     | `LoadBalancer`                                 |
| `service.loadBalancer`               | Kubernetes LoadBalancerIP to request                        | `nil`                                          |
| `service.externalTrafficPolicy`      | Enable client source IP preservation                        | `Cluster`                                      |
| `service.nodePorts.http`             | Kubernetes http node port                                   | `""`                                           |
| `service.nodePorts.https`            | Kubernetes https node port                                  | `""`                                           |
| `ingress.enabled`                    | Enable ingress controller resource                          | `false`                                        |
| `ingress.hosts[0].name`              | Hostname to your Mediawiki installation                     | `mediawiki.local`                              |
| `ingress.hosts[0].path`              | Path within the url structure                               | `/`                                            |
| `ingress.hosts[0].tls`               | Utilize TLS backend in ingress                              | `false`                                        |
| `ingress.hosts[0].tlsSecret`         | TLS Secret (certificates)                                   | `mediawiki.local-tls-secret`                   |
| `ingress.hosts[0].annotations`       | Annotations for this host's ingress record                  | `[]`                                           |
| `ingress.secrets[0].name`            | TLS Secret Name                                             | `nil`                                          |
| `ingress.secrets[0].certificate`     | TLS Secret Certificate                                      | `nil`                                          |
| `ingress.secrets[0].key`             | TLS Secret Key                                              | `nil`                                          |
| `persistence.enabled`                | Enable persistence using PVC                                | `true`                                         |
| `persistence.apache.storageClass`    | PVC Storage Class for Apache volume                         | `nil` (uses alpha storage class annotation)    |
| `persistence.apache.accessMode`      | PVC Access Mode for Apache volume                           | `ReadWriteOnce`                                |
| `persistence.apache.size`            | PVC Storage Request for Apache volume                       | `1Gi`                                          |
| `persistence.mediawiki.storageClass` | PVC Storage Class for MediaWiki volume                      | `nil` (uses alpha storage class annotation)    |
| `persistence.mediawiki.accessMode`   | PVC Access Mode for MediaWiki volume                        | `ReadWriteOnce`                                |
| `persistence.mediawiki.size`         | PVC Storage Request for MediaWiki volume                    | `8Gi`                                          |
| `resources`                          | CPU/Memory resource requests/limits                         | Memory: `512Mi`, CPU: `300m`                   |
| `livenessProbe.enabled`              | Enable/disable the liveness probe (ingest nodes pod)        | `true`                                         |
| `livenessProbe.initialDelaySeconds`  | Delay before liveness probe is initiated (ingest nodes pod) | 120                                            |
| `livenessProbe.periodSeconds`        | How often to perform the probe (ingest nodes pod)           | 10                                             |
| `livenessProbe.timeoutSeconds`       | When the probe times out (ingest nodes pod)                 | 5                                              |
| `livenessProbe.failureThreshold`     | Minimum consecutive failures to be considered failed        | 6                                              |
| `livenessProbe.successThreshold`     | Minimum consecutive successes to be considered successful   | 1                                              |
| `readinessProbe.enabled`             | would you like a readinessProbe to be enabled               | `true`                                         |
| `readinessProbe.initialDelaySeconds` | Delay before readinessProbe is initiated (ingest nodes pod) | 30                                             |
| `readinessProbe.periodSeconds`       | How often to perform the probe (ingest nodes pod)           | 10                                             |
| `readinessProbe.timeoutSeconds`      | When the probe times out (ingest nodes pod)                 | 5                                              |
| `readinessProbe.failureThreshold`    | Minimum consecutive failures to be considered failed        | 6                                              |
| `readinessProbe.successThreshold`    | Minimum consecutive successes to be considered successful   | 1                                              |

The above parameters map to the env variables defined in [bitnami/mediawiki](http://github.com/bitnami/bitnami-docker-mediawiki). For more information please refer to the [bitnami/mediawiki](http://github.com/bitnami/bitnami-docker-mediawiki) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set mediawikiUser=admin,mediawikiPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/mediawiki
```

The above command sets the MediaWiki administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/mediawiki
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami MediaWiki](https://github.com/bitnami/bitnami-docker-mediawiki) image stores the MediaWiki data and configurations at the `/bitnami/mediawiki` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Upgrading

### To 4.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 4.0.0. The following example assumes that the release name is mediawiki:

```console
$ kubectl patch deployment mediawiki-mediawiki --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
$ kubectl delete statefulset mediawiki-mariadb --cascade=false
```
