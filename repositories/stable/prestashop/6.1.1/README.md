# `@helm-charts/stable-prestashop`

A popular open source ecommerce solution. Professional tools are easily accessible to increase online sales including instant guest checkout, abandoned cart reminders and automated Email marketing.

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | prestashop |
| Chart Version       | 6.1.1      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Global Docker image registry
## Please, note that this will override the image registry for all the images, including dependencies, configured to use the global value
##
# global:
#   imageRegistry:

## Bitnami PrestaShop image version
## ref: https://hub.docker.com/r/bitnami/prestashop/tags/
##
image:
  registry: docker.io
  repository: bitnami/prestashop
  tag: 1.7.5-0
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

## PrestaShop host to create application URLs
## ref: https://github.com/bitnami/bitnami-docker-prestashop#configuration
##
# prestashopHost:

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-prestashop#configuration
##
prestashopUsername: user@example.com

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-prestashop#configuration
##
# prestashopPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-prestashop#configuration
##
prestashopEmail: user@example.com

## First Name
## ref: https://github.com/bitnami/bitnami-docker-prestashop#configuration
##
prestashopFirstName: Bitnami

## Last Name
## ref: https://github.com/bitnami/bitnami-docker-prestashop#configuration
##
prestashopLastName: User

## Cookie Check IP
## ref: https://github.com/bitnami/bitnami-docker-prestashop#configuration
##
prestashopCookieCheckIP: 'no'

## Country
## ref: https://github.com/bitnami/bitnami-docker-prestashop#configuration
##
prestashopCountry: 'us'

## Language
## ref: https://github.com/bitnami/bitnami-docker-prestashop#configuration
##
prestashopLanguage: 'en'

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-prestashop#environment-variables
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
  user: bn_jasperreports

  ## Database password
  password:

  ## Database name
  database: bitnami_prestashop

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-prestashop/#smtp-configuration
##
# smtpHost:
# smtpPort:
# smtpUser:
# smtpPassword:
# smtpProtocol:

##
## MariaDB chart configuration
##
## https://github.com/helm/charts/blob/master/stable/mariadb/values.yaml
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
    name: bitnami_prestashop
    user: bn_prestashop
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
service:
  type: LoadBalancer
  # HTTP Port
  port: 80
  # HTTPS Port
  httpsPort: 443
  ## loadBalancerIP for the PrestaShop Service (optional, cloud specific)
  ## ref: http://kubernetes.io/docs/user-guide/services/#type-loadbalancer
  ## loadBalancerIP
  ##
  ## nodePorts:
  ##   http: <to set explicitly, choose port between 30000-32767>
  ##   https: <to set explicitly, choose port between 30000-32767>
  nodePorts:
    http: ''
    https: ''
  ## Enable client source IP preservation
  ## ref http://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/#preserving-the-client-source-ip
  ##
  externalTrafficPolicy: Local

## Configure the ingress resource that allows you to access the
## PrestaShop installation. Set up the URL
## ref: http://kubernetes.io/docs/user-guide/ingress/
##
ingress:
  ## Set to true to enable ingress record generation
  enabled: false

  ## Set this to true in order to add the corresponding annotations for cert-manager
  certManager: false

  ## Ingress annotations done as key:value pairs
  ## For a full list of possible ingress annotations, please see
  ## ref: https://github.com/kubernetes/ingress-nginx/blob/master/docs/annotations.md
  ##
  ## If tls is set to true, annotation ingress.kubernetes.io/secure-backends: "true" will automatically be set
  ## If certManager is set to true, annotation kubernetes.io/tls-acme: "true" will automatically be set
  annotations:
  #  kubernetes.io/ingress.class: nginx

  ## The list of hostnames to be covered with this ingress record.
  ## Most likely this will be just one host, but in the event more hosts are needed, this is an array
  hosts:
    - name: prestashop.local
      path: /

      # Set this to true in order to enable TLS on the ingress record
      tls: false

      ## If TLS is set to true, you must declare what secret will store the key/certificate for TLS
      tlsSecret: prestashop.local-tls

  secrets:
  ## If you're providing your own certificates, please use this to add the certificates as secrets
  ## key and certificate should start with -----BEGIN CERTIFICATE----- or
  ## -----BEGIN RSA PRIVATE KEY-----
  ##
  ## name should line up with a tlsSecret set further up
  ## If you're using cert-manager, this is unneeded, as it will create the secret for you if it is not set
  ##
  ## It is also possible to create and manage the certificates outside of this helm chart
  ## Please see README.md for more information
  # - name: prestashop.local-tls
  #   key:
  #   certificate:

## Control where client requests go, to the same pod or round-robin
## Values: ClientIP or None
## ref: https://kubernetes.io/docs/user-guide/services/
sessionAffinity: 'None'

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  ## Prestashop Data Persistent Volume Storage Class
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
  initialDelaySeconds: 600
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1
readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 5
  timeoutSeconds: 3
  failureThreshold: 6
  successThreshold: 1

## Pod annotations
## ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
##
podAnnotations: {}

## Prometheus Exporter / Metrics
##
metrics:
  enabled: false
  image:
    registry: docker.io
    repository: lusotycoon/apache-exporter
    tag: v0.5.0
    pullPolicy: IfNotPresent
    ## Optionally specify an array of imagePullSecrets.
    ## Secrets must be manually created in the namespace.
    ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
    ##
    # pullSecrets:
    #   - myRegistrKeySecretName
    ## Metrics exporter pod Annotation and Labels
  podAnnotations:
    prometheus.io/scrape: 'true'
    prometheus.io/port: '9117'
  ## Metrics exporter resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  # resources: {}
```

</details>

---

# PrestaShop

[PrestaShop](https://prestashop.com/) is a popular open source e-commerce solution. Professional tools are easily accessible to increase online sales including instant guest checkout, abandoned cart reminders and automated Email marketing.

## TL;DR;

```console
$ helm install stable/prestashop
```

## Introduction

This chart bootstraps a [PrestaShop](https://github.com/bitnami/bitnami-docker-prestashop) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the PrestaShop application.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

## Prerequisites

- Kubernetes 1.5+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/prestashop
```

The command deploys PrestaShop on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the PrestaShop chart and their default values.

| Parameter                            | Description                                                                                  | Default                                                      |
| ------------------------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `global.imageRegistry`               | Global Docker image registry                                                                 | `nil`                                                        |
| `image.registry`                     | PrestaShop image registry                                                                    | `docker.io`                                                  |
| `image.repository`                   | PrestaShop image name                                                                        | `bitnami/prestashop`                                         |
| `image.tag`                          | PrestaShop image tag                                                                         | `{VERSION}`                                                  |
| `image.pullPolicy`                   | Image pull policy                                                                            | `Always` if `imageTag` is `latest`, else `IfNotPresent`      |
| `image.pullSecrets`                  | Specify docker-registry secret names as an array                                             | `[]` (does not add image pull secrets to deployed pods)      |
| `service.type`                       | Kubernetes Service type                                                                      | `LoadBalancer`                                               |
| `service.port`                       | Service HTTP port                                                                            | `80`                                                         |
| `service.httpsPort`                  | Service HTTPS port                                                                           | `443`                                                        |
| `service.nodePorts.http`             | Kubernetes http node port                                                                    | `""`                                                         |
| `service.nodePorts.https`            | Kubernetes https node port                                                                   | `""`                                                         |
| `service.externalTrafficPolicy`      | Enable client source IP preservation                                                         | `Cluster`                                                    |
| `service.loadBalancerIP`             | LoadBalancer service IP address                                                              | `""`                                                         |
| `ingress.enabled`                    | Enable ingress controller resource                                                           | `false`                                                      |
| `ingress.certManager`                | Add annotations for cert-manager                                                             | `false`                                                      |
| `ingress.annotations`                | Ingress annotations                                                                          | `[]`                                                         |
| `ingress.hosts[0].name`              | Hostname to your PrestaShop installation                                                     | `prestashop.local`                                           |
| `ingress.hosts[0].path`              | Path within the url structure                                                                | `/`                                                          |
| `ingress.hosts[0].tls`               | Utilize TLS backend in ingress                                                               | `false`                                                      |
| `ingress.hosts[0].tlsSecret`         | TLS Secret (certificates)                                                                    | `prestashop.local-tls`                                       |
| `ingress.secrets[0].name`            | TLS Secret Name                                                                              | `nil`                                                        |
| `ingress.secrets[0].certificate`     | TLS Secret Certificate                                                                       | `nil`                                                        |
| `ingress.secrets[0].key`             | TLS Secret Key                                                                               | `nil`                                                        |
| `prestashopHost`                     | PrestaShop host to create application URLs (when ingress, it will be ignored)                | `nil`                                                        |
| `prestashopUsername`                 | User of the application                                                                      | `user@example.com`                                           |
| `prestashopPassword`                 | Application password                                                                         | _random 10 character long alphanumeric string_               |
| `prestashopEmail`                    | Admin email                                                                                  | `user@example.com`                                           |
| `prestashopFirstName`                | First Name                                                                                   | `Bitnami`                                                    |
| `prestashopLastName`                 | Last Name                                                                                    | `Name`                                                       |
| `prestashopCookieCheckIP`            | Whether to check the cookie's IP address or not                                              | `no`                                                         |
| `prestashopCountry`                  | Default country of the store                                                                 | `us`                                                         |
| `prestashopLanguage`                 | Default language of the store (iso code)                                                     | `en`                                                         |
| `smtpHost`                           | SMTP host                                                                                    | `nil`                                                        |
| `smtpPort`                           | SMTP port                                                                                    | `nil`                                                        |
| `smtpUser`                           | SMTP user                                                                                    | `nil`                                                        |
| `smtpPassword`                       | SMTP password                                                                                | `nil`                                                        |
| `smtpProtocol`                       | SMTP protocol [`ssl`, `tls`]                                                                 | `nil`                                                        |
| `allowEmptyPassword`                 | Allow DB blank passwords                                                                     | `yes`                                                        |
| `externalDatabase.host`              | Host of the external database                                                                | `nil`                                                        |
| `externalDatabase.port`              | SMTP protocol [`ssl`, `none`]                                                                | `3306`                                                       |
| `externalDatabase.user`              | Existing username in the external db                                                         | `bn_prestashop`                                              |
| `externalDatabase.password`          | Password for the above username                                                              | `nil`                                                        |
| `externalDatabase.database`          | Name of the existing database                                                                | `bitnami_prestashop`                                         |
| `mariadb.enabled`                    | Whether to use the MariaDB chart                                                             | `true`                                                       |
| `mariadb.db.name`                    | Database name to create                                                                      | `bitnami_prestashop`                                         |
| `mariadb.db.user`                    | Database user to create                                                                      | `bn_prestashop`                                              |
| `mariadb.db.password`                | Password for the database                                                                    | `nil`                                                        |
| `mariadb.rootUser.password`          | MariaDB admin password                                                                       | `nil`                                                        |
| `sessionAffinity`                    | Configures the session affinity                                                              | `None`                                                       |
| `persistence.enabled`                | Enable persistence using PVC                                                                 | `true`                                                       |
| `persistence.storageClass`           | PVC Storage Class for PrestaShop volume                                                      | `nil` (uses alpha storage class annotation)                  |
| `persistence.existingClaim`          | An Existing PVC name for Apache volume                                                       | `nil` (uses alpha storage class annotation)                  |
| `persistence.accessMode`             | PVC Access Mode for PrestaShop volume                                                        | `ReadWriteOnce`                                              |
| `persistence.size`                   | PVC Storage Request for PrestaShop volume                                                    | `8Gi`                                                        |
| `resources`                          | CPU/Memory resource requests/limits                                                          | Memory: `512Mi`, CPU: `300m`                                 |
| `livenessProbe.initialDelaySeconds`  | Delay before liveness probe is initiated                                                     | 600                                                          |
| `livenessProbe.periodSeconds`        | How often to perform the probe                                                               | 3                                                            |
| `livenessProbe.timeoutSeconds`       | When the probe times out                                                                     | 5                                                            |
| `livenessProbe.failureThreshold`     | Minimum consecutive failures for the probe to be considered failed after having succeeded.   | 6                                                            |
| `livenessProbe.successThreshold`     | Minimum consecutive successes for the probe to be considered successful after having failed. | 1                                                            |
| `readinessProbe.initialDelaySeconds` | Delay before readiness probe is initiated                                                    | 30                                                           |
| `readinessProbe.periodSeconds`       | How often to perform the probe                                                               | 3                                                            |
| `readinessProbe.timeoutSeconds`      | When the probe times out                                                                     | 5                                                            |
| `readinessProbe.failureThreshold`    | Minimum consecutive failures for the probe to be considered failed after having succeeded.   | 6                                                            |
| `readinessProbe.successThreshold`    | Minimum consecutive successes for the probe to be considered successful after having failed. | 1                                                            |
| `podAnnotations`                     | Pod annotations                                                                              | `{}`                                                         |
| `metrics.enabled`                    | Start a side-car prometheus exporter                                                         | `false`                                                      |
| `metrics.image.registry`             | Apache exporter image registry                                                               | `docker.io`                                                  |
| `metrics.image.repository`           | Apache exporter image name                                                                   | `lusotycoon/apache-exporter`                                 |
| `metrics.image.tag`                  | Apache exporter image tag                                                                    | `v0.5.0`                                                     |
| `metrics.image.pullPolicy`           | Image pull policy                                                                            | `IfNotPresent`                                               |
| `metrics.image.pullSecrets`          | Specify docker-registry secret names as an array                                             | `[]` (does not add image pull secrets to deployed pods)      |
| `metrics.podAnnotations`             | Additional annotations for Metrics exporter pod                                              | `{prometheus.io/scrape: "true", prometheus.io/port: "9117"}` |
| `metrics.resources`                  | Exporter resource requests/limit                                                             | {}                                                           |

The above parameters map to the env variables defined in [bitnami/prestashop](http://github.com/bitnami/bitnami-docker-prestashop). For more information please refer to the [bitnami/prestashop](http://github.com/bitnami/bitnami-docker-prestashop) image documentation.

> **Note**:
>
> For PrestaShop to function correctly, you should specify the `prestashopHost` parameter to specify the FQDN (recommended) or the public IP address of the PrestaShop service.
>
> Optionally, you can specify the `prestashopLoadBalancerIP` parameter to assign a reserved IP address to the PrestaShop service of the chart. However please note that this feature is only available on a few cloud providers (f.e. GKE).
>
> To reserve a public IP address on GKE:
>
> ```bash
> $ gcloud compute addresses create prestashop-public-ip
> ```
>
> The reserved IP address can be associated to the PrestaShop service by specifying it as the value of the `prestashopLoadBalancerIP` parameter while installing the chart.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set prestashopUsername=admin,prestashopPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/prestashop
```

The above command sets the PrestaShop administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/prestashop
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami PrestaShop](https://github.com/bitnami/bitnami-docker-prestashop) image stores the PrestaShop data and configurations at the `/bitnami/prestashop` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Upgrading

### To 3.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 3.0.0. The following example assumes that the release name is prestashop:

```console
$ kubectl patch deployment prestashop-prestashop --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
$ kubectl delete statefulset prestashop-mariadb --cascade=false
```
