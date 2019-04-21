# `@helm-charts/yourls-yourls`

Your Own URL Shortener

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | yourls |
| Chart Name          | yourls |
| Chart Version       | 1.1.0  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## YOURLS image version
## ref: https://hub.docker.com/_/yourls?tab=tags
##
image:
  registry: docker.io
  repository: yourls
  tag: 1.7.3
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

## Site of the application
## Used to construct short URLs
## ref: https://hub.docker.com/_/yourls
##
yourlsSite: http://yourls

## User of the application
## ref: https://hub.docker.com/_/yourls
##
yourlsUsername: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://hub.docker.com/_/yourls
##
# yourlsPassword:

## Table prefix
## ref: https://hub.docker.com/_/yourls
##
yourlsTablePrefix: yourls_

# Extra environment variables which will be saved in a release-specific secret
# or retrieved via valueFrom.
# extraEnv:
# - name: SECRET_TO_SAVE
#   value: secret_value
# - name: AWS_ACCESS_KEY_ID
#   valueFrom:
#     secretKeyRef:
#       name: existing-secret
#       key: access-key-id
extraEnv: []

replicaCount: 1

externalDatabase:
  ## All of these values are only used when mariadb.enabled is set to false
  ## Database host
  host: localhost:3306

  ## non-root Username for YOURLS Database
  user: yourls

  ## Database password
  password: ''

  ## Database name
  database: yourls

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
    name: yourls
    user: yourls
    ## If the password is not specified, mariadb will generates a random password
    ##
    # password:

  service:
    port: 3306

  ## MariaDB admin password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#setting-the-root-password-on-first-run
  ##
  # rootUser:
  #   password:

## Kubernetes configuration
## For minikube, set this to NodePort, elsewhere use LoadBalancer or ClusterIP
##
service:
  type: LoadBalancer
  ## When using web.service.type: LoadBalancer, sets the user-specified load balancer IP
  # loadBalancerIP: ""
  ## When using web.service.type: ClusterIP, sets the user-specified cluster IP
  # clusterIP: ""
  # HTTP Port
  port: 80
  # HTTPS Port
  httpsPort: 443
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
  externalTrafficPolicy: Cluster
  annotations: {}

## Allow health checks to be pointed at the https port
healthcheckHttps: false

## Configure extra options for liveness and readiness probes
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#configure-probes)
livenessProbe:
  initialDelaySeconds: 120
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1
readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1

## Configure the ingress resource that allows you to access the
## YOURLS installation. Set up the URL
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
    - name: yourls.local
      path: /

      # Set this to true in order to enable TLS on the ingress record
      tls: false

      ## If TLS is set to true, you must declare what secret will store the key/certificate for TLS
      tlsSecret: yourls.local-tls

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
  # - name: yourls.local-tls
  #   key:
  #   certificate:

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  ## yourls data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  ##
  ## If you want to reuse an existing claim, you can pass the name of the PVC using
  ## the existingClaim variable
  # existingClaim: your-claim
  accessMode: ReadWriteOnce
  size: 10Gi

## Enable additional Persistent Volumes
##
# volumes:
#  - hostPath:
#      path: /etc/passwd
#    name: passwd
# volumeMounts:
#   - name: passwd
#     mountPath: /etc/passwd
#     readOnly: true

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

## Tolerations for pod assignment
## Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
##
tolerations: []

## Affinity for pod assignment
## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
##
affinity: {}

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

# YOURLS

[YOURLS](https://yourls.org/) is a set of PHP scripts that will allow you to run Your Own URL Shortener.

## TL;DR;

```console
$ helm install yourls/yourls
```

## Introduction

This chart bootstraps a [YOURLS](https://hub.docker.com/_/yourls) deployment on a [Kubernetes](https://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the YOURLS application.

Charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release yourls/yourls
```

The command deploys YOURLS on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the YOURLS chart and their default values.

| Parameter                        | Description                                      | Default                                                      |
| -------------------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| `image.registry`                 | YOURLS image registry                            | `docker.io`                                                  |
| `image.repository`               | YOURLS image name                                | `yourls`                                                     |
| `image.tag`                      | YOURLS image tag                                 | `{VERSION}`                                                  |
| `image.pullPolicy`               | Image pull policy                                | `Always` if `imageTag` is `latest`, else `IfNotPresent`      |
| `image.pullSecrets`              | Specify image pull secrets                       | `nil`                                                        |
| `yourlsSite`                     | Short URLs site refering to the app              | `http://yourls`                                              |
| `yourlsUsername`                 | User of the application                          | `user`                                                       |
| `yourlsPassword`                 | Application password                             | _random 10 character long alphanumeric string_               |
| `yourlsTablePrefix`              | Table prefix                                     | `yourls_`                                                    |
| `extraEnv`                       | Additional environment variables                 | `[]`                                                         |
| `replicaCount`                   | Number of YOURLS Pods to run                     | `1`                                                          |
| `mariadb.enabled`                | Deploy MariaDB container(s)                      | `true`                                                       |
| `mariadb.rootUser.password`      | MariaDB admin password                           | `nil`                                                        |
| `mariadb.db.name`                | Database name to create                          | `yourls`                                                     |
| `mariadb.db.user`                | Database user to create                          | `yourls`                                                     |
| `mariadb.db.password`            | Password for the database                        | _random 10 character long alphanumeric string_               |
| `mariadb.service.port`           | Port for the database                            | `3306`                                                       |
| `externalDatabase.host`          | Host of the external database                    | `localhost:3306`                                             |
| `externalDatabase.user`          | Existing username in the external db             | `yourls`                                                     |
| `externalDatabase.password`      | Password for the above username                  | `nil`                                                        |
| `externalDatabase.database`      | Name of the existing database                    | `yourls`                                                     |
| `service.annotations`            | Service annotations                              | `{}`                                                         |
| `service.type`                   | Kubernetes Service type                          | `LoadBalancer`                                               |
| `service.loadBalancerIP`         | Load balancer IP                                 | `LoadBalancer`                                               |
| `service.clusterIP`              | Cluster IP                                       | `LoadBalancer`                                               |
| `service.port`                   | Service HTTP port                                | `80`                                                         |
| `service.httpsPort`              | Service HTTPS port                               | `443`                                                        |
| `service.externalTrafficPolicy`  | Enable client source IP preservation             | `Cluster`                                                    |
| `nodePorts.http`                 | Kubernetes http node port                        | `""`                                                         |
| `nodePorts.https`                | Kubernetes https node port                       | `""`                                                         |
| `healthcheckHttps`               | Use https for liveliness and readiness           | `false`                                                      |
| `ingress.enabled`                | Enable ingress controller resource               | `false`                                                      |
| `ingress.certManager`            | Add annotations for cert-manager                 | `false`                                                      |
| `ingress.annotations`            | Ingress annotations                              | `[]`                                                         |
| `ingress.hosts[0].name`          | Hostname to your YOURLS installation             | `yourls.local`                                               |
| `ingress.hosts[0].path`          | Path within the url structure                    | `/`                                                          |
| `ingress.hosts[0].tls`           | Utilize TLS backend in ingress                   | `false`                                                      |
| `ingress.hosts[0].tlsSecret`     | TLS Secret (certificates)                        | `yourls.local-tls-secret`                                    |
| `ingress.secrets[0].name`        | TLS Secret Name                                  | `nil`                                                        |
| `ingress.secrets[0].certificate` | TLS Secret Certificate                           | `nil`                                                        |
| `ingress.secrets[0].key`         | TLS Secret Key                                   | `nil`                                                        |
| `persistence.enabled`            | Enable persistence using PVC                     | `true`                                                       |
| `persistence.existingClaim`      | Enable persistence using an existing PVC         | `nil`                                                        |
| `persistence.storageClass`       | PVC Storage Class                                | `nil` (uses alpha storage class annotation)                  |
| `persistence.accessMode`         | PVC Access Mode                                  | `ReadWriteOnce`                                              |
| `persistence.size`               | PVC Storage Request                              | `10Gi`                                                       |
| `volumes`                        | Additional volumes                               | `nil`                                                        |
| `volumeMounts`                   | Additional volumeMounts                          | `nil`                                                        |
| `nodeSelector`                   | Node labels for pod assignment                   | `{}`                                                         |
| `tolerations`                    | List of node taints to tolerate                  | `[]`                                                         |
| `affinity`                       | Map of node/pod affinities                       | `{}`                                                         |
| `podAnnotations`                 | Pod annotations                                  | `{}`                                                         |
| `metrics.enabled`                | Start a side-car prometheus exporter             | `false`                                                      |
| `metrics.image.registry`         | Apache exporter image registry                   | `docker.io`                                                  |
| `metrics.image.repository`       | Apache exporter image name                       | `lusotycoon/apache-exporter`                                 |
| `metrics.image.tag`              | Apache exporter image tag                        | `v0.5.0`                                                     |
| `metrics.image.pullPolicy`       | Image pull policy                                | `IfNotPresent`                                               |
| `metrics.image.pullSecrets`      | Specify docker-registry secret names as an array | `nil`                                                        |
| `metrics.podAnnotations`         | Additional annotations for Metrics exporter pod  | `{prometheus.io/scrape: "true", prometheus.io/port: "9117"}` |
| `metrics.resources`              | Exporter resource requests/limit                 | {}                                                           |

The above parameters map to the env variables defined in [YOURLS](https://hub.docker.com/_/yourls). For more information please refer to the [YOURLS](https://hub.docker.com/_/yourls) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set yourlsUsername=admin,yourlsPassword=password,mariadb.mariadbRootPassword=secretpassword \
    yourls/yourls
```

The above command sets the YOURLS administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml yourls/yourls
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [YOURLS](https://hub.docker.com/_/yourls) image stores the YOURLS data and configurations at the `/yourls` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Using an external database

Sometimes you may want to have YOURLS connect to an external database rather than installing one inside your cluster, e.g. to use a managed database service, or use run a single database server for all your applications. To do this, the chart allows you to specify credentials for an external database under the [`externalDatabase` parameter](#configuration). You should also disable the MariaDB installation with the `mariadb.enabled` option. For example:

```console
$ helm install yourls/yourls \
    --set mariadb.enabled=false,externalDatabase.host=myexternalhost:3306,externalDatabase.user=myuser,externalDatabase.password=mypassword,externalDatabase.database=mydatabase
```

Note also if you disable MariaDB per above you MUST supply values for the `externalDatabase` connection.

## Ingress

This chart provides support for ingress resources. If you have an
ingress controller installed on your cluster, such as [nginx-ingress](https://kubeapps.com/charts/stable/nginx-ingress)
or [traefik](https://kubeapps.com/charts/stable/traefik) you can utilize
the ingress controller to serve your YOURLS application.

To enable ingress integration, please set `ingress.enabled` to `true`

### Hosts

Most likely you will only want to have one hostname that maps to this
YOURLS installation, however, it is possible to have more than one
host. To facilitate this, the `ingress.hosts` object is an array.

For each item, please indicate a `name`, `tls`, `tlsSecret`, and any
`annotations` that you may want the ingress controller to know about.

Indicating TLS will cause YOURLS to generate HTTPS URLs, and
YOURLS will be connected to at port 443. The actual secret that
`tlsSecret` references do not have to be generated by this chart.
However, please note that if TLS is enabled, the ingress record will not
work until this secret exists.

For annotations, please see [this document](https://github.com/kubernetes/ingress-nginx/blob/master/docs/annotations.md).
Not all annotations are supported by all ingress controllers, but this
document does a good job of indicating which annotation is supported by
many popular ingress controllers.

### TLS Secrets

This chart will facilitate the creation of TLS secrets for use with the
ingress controller, however, this is not required. There are three
common use cases:

- helm generates/manages certificate secrets
- user generates/manages certificates separately
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

If you are going to use Helm to manage the certificates, please copy
these values into the `certificate` and `key` values for a given
`ingress.secrets` entry.

If you are going to manage TLS secrets outside of Helm, please
know that you can create a TLS secret by doing the following:

```
kubectl create secret tls yourls.local-tls --key /path/to/key.key --cert /path/to/cert.crt
```

Please see [this example](https://github.com/kubernetes/contrib/tree/master/ingress/controllers/nginx/examples/tls)
for more information.
