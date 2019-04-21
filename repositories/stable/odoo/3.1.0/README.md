# `@helm-charts/stable-odoo`

A suite of web based open source business apps.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | odoo   |
| Chart Version       | 3.1.0  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami Odoo image version
## ref: https://hub.docker.com/r/bitnami/odoo/tags/
##
image:
  registry: docker.io
  repository: bitnami/odoo
  tag: 11.0.20180915-debian-9
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

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-odoo#configuration
##
odooUsername: user@example.com

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-odoo#configuration
##
odooEmail: user@example.com

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-odoo#configuration
##
# odooPassword:

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-odoo/#smtp-configuration
# smtpHost:
# smtpPort:
# smtpUser:
# smtpPassword:
# smtpProtocol:

##
## PostgreSQL chart configuration
##
postgresql:
  ## PostgreSQL password
  ## ref: https://hub.docker.com/_/postgres/
  ##
  # postgresPassword:

  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  persistence:
    enabled: true
    ## postgresql data Persistent Volume Storage Class
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

  ## Use nodePort to requets some specific port when usin NodePort
  ##
  nodePort: ''

  ## Enable client source IP preservation
  ## ref http://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/#preserving-the-client-source-ip
  ##
  externalTrafficPolicy: Cluster

## Configure the ingress resource that allows you to access the
## Odoo installation. Set up the URL
## ref: http://kubernetes.io/docs/user-guide/ingress/
##
ingress:
  ## Set to true to enable ingress record generation
  enabled: false

  ## The list of hostnames to be covered with this ingress record.
  ## Most likely this will be just one host, but in the event more hosts are needed, this is an array
  hosts:
    - name: odoo.local

      ## Set this to true in order to enable TLS on the ingress record
      ## A side effect of this will be that the backend odoo service will be connected at port 443
      tls: false

      ## Set this to true in order to add the corresponding annotations for cert-manager
      certManager: false

      ## If TLS is set to true, you must declare what secret will store the key/certificate for TLS
      tlsSecret: odoo.local-tls

      ## Ingress annotations done as key:value pairs
      ## For a full list of possible ingress annotations, please see
      ## ref: https://github.com/kubernetes/ingress-nginx/blob/master/docs/annotations.md
      ##
      ## If tls is set to true, annotation ingress.kubernetes.io/secure-backends: "true" will automatically be set
      ## If certManager is set to true, annotation kubernetes.io/tls-acme: "true" will automatically be set
      annotations:
      #  kubernetes.io/ingress.class: nginx
      #  kubernetes.io/tls-acme: true

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
  # - name: odoo.local-tls
  #   key:
  #   certificate:

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  ## odoo data Persistent Volume Storage Class
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
  initialDelaySeconds: 300
  periodSeconds: 30
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

# Odoo

[Odoo](https://www.odoo.com/) is a suite of web-based open source business apps. The main Odoo Apps include an Open Source CRM, Website Builder, eCommerce, Project Management, Billing & Accounting, Point of Sale, Human Resources, Marketing, Manufacturing, Purchase Management, ...

Odoo Apps can be used as stand-alone applications, but they also integrate seamlessly so you get a full-featured Open Source ERP when you install several Apps.

## TL;DR;

```console
$ helm install stable/odoo
```

## Introduction

This chart bootstraps a [Odoo](https://github.com/bitnami/bitnami-docker-odoo) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/odoo
```

The command deploys Odoo on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Odoo chart and their default values.

| Parameter                             | Description                                               | Default                                        |
| ------------------------------------- | --------------------------------------------------------- | ---------------------------------------------- |
| `image.registry`                      | Odoo image registry                                       | `docker.io`                                    |
| `image.repository`                    | Odoo Image name                                           | `bitnami/odoo`                                 |
| `image.tag`                           | Odoo Image tag                                            | `{VERSION}`                                    |
| `image.pullPolicy`                    | Image pull policy                                         | `Always`                                       |
| `image.pullSecrets`                   | Specify image pull secrets                                | `nil`                                          |
| `odooUsername`                        | User of the application                                   | `user@example.com`                             |
| `odooPassword`                        | Admin account password                                    | _random 10 character long alphanumeric string_ |
| `odooEmail`                           | Admin account email                                       | `user@example.com`                             |
| `smtpHost`                            | SMTP host                                                 | `nil`                                          |
| `smtpPort`                            | SMTP port                                                 | `nil`                                          |
| `smtpUser`                            | SMTP user                                                 | `nil`                                          |
| `smtpPassword`                        | SMTP password                                             | `nil`                                          |
| `smtpProtocol`                        | SMTP protocol [`ssl`, `tls`]                              | `nil`                                          |
| `service.type`                        | Kubernetes Service type                                   | `LoadBalancer`                                 |
| `service.loadBalancer`                | Kubernetes LoadBalancerIP to request                      | `nil`                                          |
| `service.externalTrafficPolicy`       | Enable client source IP preservation                      | `Cluster`                                      |
| `service.nodePort`                    | Kubernetes http node port                                 | `""`                                           |
| `ingress.enabled`                     | Enable ingress controller resource                        | `false`                                        |
| `ingress.hosts[0].name`               | Hostname to your Odoo installation                        | `odoo.local`                                   |
| `ingress.hosts[0].path`               | Path within the url structure                             | `/`                                            |
| `ingress.hosts[0].tls`                | Utilize TLS backend in ingress                            | `false`                                        |
| `ingress.hosts[0].certManager`        | Add annotations for cert-manager                          | `false`                                        |
| `ingress.hosts[0].tlsSecret`          | TLS Secret (certificates)                                 | `odoo.local-tls-secret`                        |
| `ingress.hosts[0].annotations`        | Annotations for this host's ingress record                | `[]`                                           |
| `ingress.secrets[0].name`             | TLS Secret Name                                           | `nil`                                          |
| `ingress.secrets[0].certificate`      | TLS Secret Certificate                                    | `nil`                                          |
| `ingress.secrets[0].key`              | TLS Secret Key                                            | `nil`                                          |
| `resources`                           | CPU/Memory resource requests/limits                       | Memory: `512Mi`, CPU: `300m`                   |
| `persistence.storageClass`            | PVC Storage Class                                         | `nil` (uses alpha storage class annotation)    |
| `persistence.accessMode`              | PVC Access Mode                                           | `ReadWriteOnce`                                |
| `persistence.size`                    | PVC Storage Request                                       | `8Gi`                                          |
| `postgresql.postgresqlPassword`       | PostgreSQL password                                       | `nil`                                          |
| `postgresql.persistence.enabled`      | Enable PostgreSQL persistence using PVC                   | `true`                                         |
| `postgresql.persistence.storageClass` | PVC Storage Class for PostgreSQL volume                   | `nil` (uses alpha storage class annotation)    |
| `postgresql.persistence.accessMode`   | PVC Access Mode for PostgreSQL volume                     | `ReadWriteOnce`                                |
| `postgresql.persistence.size`         | PVC Storage Request for PostgreSQL volume                 | `8Gi`                                          |
| `livenessProbe.enabled`               | Enable/disable the liveness probe                         | `true`                                         |
| `livenessProbe.initialDelaySeconds`   | Delay before liveness probe is initiated                  | 300                                            |
| `livenessProbe.periodSeconds`         | How often to perform the probe                            | 30                                             |
| `livenessProbe.timeoutSeconds`        | When the probe times out                                  | 5                                              |
| `livenessProbe.failureThreshold`      | Minimum consecutive failures to be considered failed      | 6                                              |
| `livenessProbe.successThreshold`      | Minimum consecutive successes to be considered successful | 1                                              |
| `readinessProbe.enabled`              | Enable/disable the readiness probe                        | `true`                                         |
| `readinessProbe.initialDelaySeconds`  | Delay before readinessProbe is initiated                  | 30                                             |
| `readinessProbe.periodSeconds`        | How often to perform the probe                            | 10                                             |
| `readinessProbe.timeoutSeconds`       | When the probe times out                                  | 5                                              |
| `readinessProbe.failureThreshold`     | Minimum consecutive failures to be considered failed      | 6                                              |
| `readinessProbe.successThreshold`     | Minimum consecutive successes to be considered successful | 1                                              |

The above parameters map to the env variables defined in [bitnami/odoo](http://github.com/bitnami/bitnami-docker-odoo). For more information please refer to the [bitnami/odoo](http://github.com/bitnami/bitnami-docker-odoo) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set odooPassword=password,postgresql.postgresPassword=secretpassword \
    stable/odoo
```

The above command sets the Odoo administrator account password to `password` and the PostgreSQL `postgres` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/odoo
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami Odoo](https://github.com/bitnami/bitnami-docker-odoo) image stores the Odoo data and configurations at the `/bitnami/odoo` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Upgrading

### To 3.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 3.0.0. The following example assumes that the release name is odoo:

```console
$ kubectl patch deployment odoo-odoo --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
$ kubectl patch deployment odoo-postgresql --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
```
