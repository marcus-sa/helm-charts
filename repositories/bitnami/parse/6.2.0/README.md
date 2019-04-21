# `@helm-charts/bitnami-parse`

Parse is a platform that enables users to add a scalable and powerful backend to launch a full-featured app for iOS, Android, JavaScript, Windows, Unity, and more.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | bitnami |
| Chart Name          | parse   |
| Chart Version       | 6.2.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Global Docker image parameters
## Please, note that this will override the image parameters, including dependencies, configured to use the global value
## Current available global Docker image parameters: imageRegistry and imagePullSecrets
##
# global:
#   imageRegistry: myRegistryName
#   imagePullSecrets:
#     - myRegistryKeySecretName

## Kubernetes serviceType for Parse Deployment
## ref: http://kubernetes.io/docs/user-guide/services/#publishing-services---service-types
##
service:
  type: LoadBalancer
  # Parse dashboard HTTP Port
  port: 80
  ## loadBalancerIP:
  ##
  ## nodePorts:
  ##   http: <to set explicitly, choose port between 30000-32767>
  nodePorts:
    http: ''
  ## Enable client source IP preservation
  ## ref http://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/#preserving-the-client-source-ip
  ##
  externalTrafficPolicy: Cluster

## loadBalancerIP for the Parse Service (optional, cloud specific)
## ref: http://kubernetes.io/docs/user-guide/services/#type-loadbalancer
##
#
server:
  ## Bitnami Parse image version
  ## ref: https://hub.docker.com/r/bitnami/parse/tags/
  ##
  image:
    registry: docker.io
    repository: bitnami/parse
    tag: 3.1.3
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
    #   - myRegistryKeySecretName

  ## Parse Server Pod Security Context
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
  ##
  securityContext:
    enabled: true
    fsGroup: 1001
    runAsUser: 1001

  ## Parse Server Port
  ## ref: https://github.com/bitnami/bitnami-docker-parse#configuration
  ##
  port: 1337

  ## Parse API mount path
  ## ref: https://github.com/bitnami/bitnami-docker-parse#configuration
  ##
  mountPath: /parse

  ## Parse Server App ID
  ## ref: https://github.com/bitnami/bitnami-docker-parse#configuration
  ##
  appId: myappID

  ## Parse Server Master Key
  ## ref: https://github.com/bitnami/bitnami-docker-parse#configuration
  ##
  # masterKey:

  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    # requests:
    #   memory: 512Mi
    #   cpu: 300m

dashboard:
  ## Enable deployment of Parse Dashboard
  ##
  enabled: true

  ## Bitnami Parse Dashboard image version
  ## ref: https://hub.docker.com/r/bitnami/parse-dashboard/tags/
  ##
  image:
    registry: docker.io
    repository: bitnami/parse-dashboard
    tag: 1.2.0
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
    #   - myRegistryKeySecretName

  ## Parse Dashboard Pod Security Context
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
  ##
  securityContext:
    enabled: true
    fsGroup: 1001
    runAsUser: 1001

  ## Parse Dashboard application username
  ## ref: https://github.com/bitnami/bitnami-docker-parse-dashboard#configuration
  ##
  username: user

  ## Parse Dashboard application password
  ## Defaults to a random 10-character alphanumeric string if not set
  ## ref: https://github.com/bitnami/bitnami-docker-parse-dashboard#configuration
  ##
  # password:

  ## Parse Dashboard application name
  ## ref: https://github.com/bitnami/bitnami-docker-parse-dashboard#configuration
  ##
  appName: MyDashboard

  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    {}
    # requests:
    #   memory: 512Mi
    #   cpu: 300m

## Configure the ingress resource that allows you to access the
## Parse installation. Set up the URL
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

  dashboard:
    ## The list of hostnames to be covered with this ingress record.
    ## Most likely this will be just one host, but in the event more hosts are needed, this is an array
    hosts:
      - name: parse.local
        path: /

        ## Set this to true in order to enable TLS on the ingress record
        tls: false

        ## Optionally specify the TLS hosts for the ingress record
        ## Useful when the Ingress controller supports www-redirection
        ## If not specified, the above host name will be used
        # tlsHosts:
        # - www.parse.local
        # - parse.local

        ## If TLS is set to true, you must declare what secret will store the key/certificate for TLS
        tlsSecret: parse.local-tls

  server:
    ## The list of hostnames to be covered with this ingress record.
    ## Most likely this will be just one host, but in the event more hosts are needed, this is an array
    hosts:
      - name: parse-server.local
        path: /

        ## Set this to true in order to enable TLS on the ingress record
        tls: false

        ## Optionally specify the TLS hosts for the ingress record
        ## Useful when the Ingress controller supports www-redirection
        ## If not specified, the above host name will be used
        # tlsHosts:
        # - www.parse.local
        # - parse.local

        ## If TLS is set to true, you must declare what secret will store the key/certificate for TLS
        tlsSecret: parse.local-tls

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
  # - name: parse.local-tls
  #   key:
  #   certificate:

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  ## parse data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 8Gi

##
## MongoDB chart configuration
##
## https://github.com/helm/charts/blob/master/stable/mongodb/values.yaml
##
mongodb:
  ## MongoDB Password authentication
  usePassword: true
  ## If the password is not specified, MongoDB will generate a random password
  ##
  # mongodbRootPassword:
  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  persistence:
    enabled: true
    ## mongodb data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 8Gi
```

</details>

---

# Parse

[Parse](https://parse.com/) is an open source version of the Parse backend that can be deployed to any infrastructure that can run Node.js.

## TL;DR;

```console
$ helm install stable/parse
```

## Introduction

This chart bootstraps a [Parse](https://github.com/bitnami/bitnami-docker-parse) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters. This chart has been tested to work with NGINX Ingress, cert-manager, fluentd and Prometheus on top of the [BKPR](https://kubeprod.io/).

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/parse
```

The command deploys Parse on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Parse chart and their default values.

| Parameter                              | Description                                                                          | Default                                                 |
| -------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| `global.imageRegistry`                 | Global Docker image registry                                                         | `nil`                                                   |
| `global.imagePullSecrets`              | Global Docker registry secret names as an array                                      | `[]` (does not add image pull secrets to deployed pods) |
| `service.type`                         | Kubernetes Service type                                                              | `LoadBalancer`                                          |
| `service.port`                         | Service HTTP port (Dashboard)                                                        | `80`                                                    |
| `service.loadBalancerIP`               | `loadBalancerIP` for the Parse Service                                               | `nil`                                                   |
| `service.externalTrafficPolicy`        | Enable client source IP preservation                                                 | `Cluster`                                               |
| `service.nodePorts.http`               | Kubernetes http node port                                                            | `""`                                                    |
| `server.image.registry`                | Parse image registry                                                                 | `docker.io`                                             |
| `server.image.repository`              | Parse image name                                                                     | `bitnami/parse`                                         |
| `server.image.tag`                     | Parse image tag                                                                      | `{VERSION}`                                             |
| `server.image.pullPolicy`              | Image pull policy                                                                    | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `server.image.pullSecrets`             | Specify docker-registry secret names as an array                                     | `[]` (does not add image pull secrets to deployed pods) |
| `server.securityContext.enabled`       | Enable security context for Parse Server                                             | `true`                                                  |
| `server.securityContext.fsGroup`       | Group ID for Parse Server container                                                  | `1001`                                                  |
| `server.securityContext.runAsUser`     | User ID for Parse Server container                                                   | `1001`                                                  |
| `server.port`                          | Parse server server port                                                             | `1337`                                                  |
| `server.mountPath`                     | Parse server API mount path                                                          | `/parse`                                                |
| `server.appId`                         | Parse server App Id                                                                  | `myappID`                                               |
| `server.masterKey`                     | Parse server Master Key                                                              | `random 10 character alphanumeric string`               |
| `server.resources`                     | CPU/Memory resource requests/limits                                                  | Memory: `512Mi`, CPU: `300m`                            |
| `dashboard.enabled`                    | Enable parse dashboard                                                               | `true`                                                  |
| `dashboard.image.registry`             | Dashboard image registry                                                             | `docker.io`                                             |
| `dashboard.image.repository`           | Dashboard image name                                                                 | `bitnami/parse-dashboard`                               |
| `dashboard.image.tag`                  | Dashboard image tag                                                                  | `{VERSION}`                                             |
| `dashboard.image.pullPolicy`           | Image pull policy                                                                    | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `dashboard.securityContext.enabled`    | Enable security context for Dashboard                                                | `true`                                                  |
| `dashboard.securityContext.fsGroup`    | Group ID for Dashboard container                                                     | `1001`                                                  |
| `dashboard.securityContext.runAsUser`  | User ID for Dashboard container                                                      | `1001`                                                  |
| `dashboard.image.pullSecrets`          | Specify docker-registry secret names as an array                                     | `[]` (does not add image pull secrets to deployed pods) |
| `dashboard.username`                   | Dashboard username                                                                   | `user`                                                  |
| `dashboard.password`                   | Dashboard user password                                                              | `random 10 character alphanumeric string`               |
| `dashboard.appName`                    | Dashboard application name                                                           | `MyDashboard`                                           |
| `dashboard.resources`                  | CPU/Memory resource requests/limits                                                  | Memory: `512Mi`, CPU: `300m`                            |
| `persistence.enabled`                  | Enable Parse persistence using PVC                                                   | `true`                                                  |
| `persistence.storageClass`             | PVC Storage Class for Parse volume                                                   | `nil` (uses alpha storage class annotation)             |
| `persistence.accessMode`               | PVC Access Mode for Parse volume                                                     | `ReadWriteOnce`                                         |
| `persistence.size`                     | PVC Storage Request for Parse volume                                                 | `8Gi`                                                   |
| `ingress.enabled`                      | Enable ingress controller resource                                                   | `false`                                                 |
| `ingress.annotations`                  | Ingress annotations                                                                  | `[]`                                                    |
| `ingress.certManager`                  | Add annotations for cert-manager                                                     | `false`                                                 |
| `ingress.dashboard.hosts[0].name`      | Hostname to your Parse Dashboard installation                                        | `ghost.local`                                           |
| `ingress.dashboard.hosts[0].path`      | Path within the url structure                                                        | `/`                                                     |
| `ingress.dashboard.hosts[0].tls`       | Utilize TLS backend in ingress                                                       | `false`                                                 |
| `ingress.dashboard.hosts[0].tlsHosts`  | Array of TLS hosts for ingress record (defaults to `ingress.hosts[0].name` if `nil`) | `nil`                                                   |
| `ingress.dashboard.hosts[0].tlsSecret` | TLS Secret (certificates)                                                            | `ghost.local-tls-secret`                                |
| `ingress.server.hosts[0].name`         | Hostname to your Parse Server installation                                           | `ghost.local`                                           |
| `ingress.server.hosts[0].path`         | Path within the url structure                                                        | `/`                                                     |
| `ingress.server.hosts[0].tls`          | Utilize TLS backend in ingress                                                       | `false`                                                 |
| `ingress.server.hosts[0].tlsHosts`     | Array of TLS hosts for ingress record (defaults to `ingress.hosts[0].name` if `nil`) | `nil`                                                   |
| `ingress.server.hosts[0].tlsSecret`    | TLS Secret (certificates)                                                            | `ghost.local-tls-secret`                                |
| `ingress.secrets[0].name`              | TLS Secret Name                                                                      | `nil`                                                   |
| `ingress.secrets[0].certificate`       | TLS Secret Certificate                                                               | `nil`                                                   |
| `ingress.secrets[0].key`               | TLS Secret Key                                                                       | `nil`                                                   |
| `mongodb.usePassword`                  | Enable MongoDB password authentication                                               | `true`                                                  |
| `mongodb.password`                     | MongoDB admin password                                                               | `nil`                                                   |
| `mongodb.persistence.enabled`          | Enable MongoDB persistence using PVC                                                 | `true`                                                  |
| `mongodb.persistence.storageClass`     | PVC Storage Class for MongoDB volume                                                 | `nil` (uses alpha storage class annotation)             |
| `mongodb.persistence.accessMode`       | PVC Access Mode for MongoDB volume                                                   | `ReadWriteOnce`                                         |
| `mongodb.persistence.size`             | PVC Storage Request for MongoDB volume                                               | `8Gi`                                                   |

The above parameters map to the env variables defined in [bitnami/parse](http://github.com/bitnami/bitnami-docker-parse). For more information please refer to the [bitnami/parse](http://github.com/bitnami/bitnami-docker-parse) image documentation.

> **Note**:
>
> For the Parse application function correctly, you should specify the `parseHost` parameter to specify the FQDN (recommended) or the public IP address of the Parse service.
>
> Optionally, you can specify the `loadBalancerIP` parameter to assign a reserved IP address to the Parse service of the chart. However please note that this feature is only available on a few cloud providers (f.e. GKE).
>
> To reserve a public IP address on GKE:
>
> ```bash
> $ gcloud compute addresses create parse-public-ip
> ```
>
> The reserved IP address can be associated to the Parse service by specifying it as the value of the `loadBalancerIP` parameter while installing the chart.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set dashboard.username=admin,dashboard.password=password \
    stable/parse
```

The above command sets the Parse administrator account username and password to `admin` and `password` respectively.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/parse
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami Parse](https://github.com/bitnami/bitnami-docker-parse) image stores the Parse data and configurations at the `/bitnami/parse` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Upgrading

### To 5.1.0

Parse & Parse Dashboard containers were moved to a non-root approach. There shouldn't be any issue when upgrading since the corresponding `securityContext` is enabled by default. Both container images and chart can be upgraded by running the command below:

```
$ helm upgrade my-release stable/parse
```

If you use a previous container image (previous to **3.1.2-r14** for Parse or **1.2.0-r69** for Parse Dashboard), disable the `securityContext` by running the command below:

```
$ helm upgrade my-release stable/parse --set server.securityContext.enabled=fase,dashboard.securityContext.enabled=fase,server.image.tag=XXX,dashboard.image.tag=YYY
```

### To 3.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 3.0.0. The following example assumes that the release name is parse:

```console
$ kubectl patch deployment parse-parse-dashboard --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
$ kubectl patch deployment parse-parse-server --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
$ kubectl patch deployment parse-mongodb --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
```
