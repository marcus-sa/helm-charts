# `@helm-charts/bitnami-moodle`

Moodle is a learning platform designed to provide educators, administrators and learners with a single robust, secure and integrated system to create personalised learning environments

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | bitnami |
| Chart Name          | moodle  |
| Chart Version       | 1.0.3   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami Moodle image version
## ref: https://hub.docker.com/r/bitnami/moodle/tags/
##
image:
  registry: docker.io
  repository: bitnami/moodle
  tag: 3.5.0
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
## ref: https://github.com/bitnami/bitnami-docker-moodle#configuration
##
moodleUsername: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-moodle#configuration
##
# moodlePassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-moodle#configuration
moodleEmail: user@example.com

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-moodle#environment-variables
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
  user: bn_moodle

  ## Database password
  password:

  ## Database name
  database: bitnami_moodle

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-moodle/#smtp-configuration
# smtpHost:
# smtpPort:
# smtpUser:
# smtpPassword:
# smtpProtocol:

##
## MariaDB chart configuration
##
mariadb:
  ## Whether to deploy a mariadb server to satisfy the applications database requirements. To use an external database set this to false and configure the externalDatabase parameters
  enabled: true

  ## Create a database
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-on-first-run
  ##
  mariadbDatabase: bitnami_moodle

  ## Create a database user
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  mariadbUser: bn_moodle

  ## Password for mariadbUser
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  # mariadbPassword:

  ## MariaDB admin password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#setting-the-root-password-on-first-run
  ##
  # mariadbRootPassword:

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
#    existingClaim: ""

## Define affinity for the pod
## Sometimes required when persistent volumes are defined externally
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
#  affinity:
#    nodeAffinity:
#      requiredDuringSchedulingIgnoredDuringExecution:
#        nodeSelectorTerms:
#        - matchExpressions:
#          - key: node-role.kubernetes.io/master
#            operator: Exists
#            values:
#            - machine01
#      preferredDuringSchedulingIgnoredDuringExecution:
#      - weight: 1
#        preference:
#          matchExpressions:
#          - key: another-node-label-key
#            operator: In
#            values:
#            - another-node-label-value
#
#  resources:
#    requests:
#      memory: 768Mi
#      cpu: 750m

## Kubernetes configuration
## For minikube, set this to NodePort, for ingress ClusterIP, elsewhere use LoadBalancer
##
serviceType: LoadBalancer

## Optionally, create ingress controller
ingress:
  ## If true, Moodle server Ingress will be created
  ##
  enabled: false

  ## Moodle server Ingress annotations
  ##
  annotations: {}
  #   kubernetes.io/ingress.class: nginx
  #   kubernetes.io/tls-acme: 'true'

  ## Moodle server Ingress hostnames
  ## Must be provided if Ingress is enabled
  ##
  hosts: []
  #   - moodle.domain.com

  ## Moodle server Ingress TLS configuration
  ## Secrets must be manually created in the namespace
  ## kubectl create secret tls moodle-server-tls --cert=tls.crt --key=tls.key
  ##
  tls: []
  #   - secretName: moodle-server-tls
  #     hosts:
  #       - moodle.domain.com

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
  size: 8Gi
  # existingClaim: ""

## Define affinity for the moodle pod
## Sometimes required when persistent volumes are defined externally
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
# affinity:
#   nodeAffinity:
#     requiredDuringSchedulingIgnoredDuringExecution:
#       nodeSelectorTerms:
#       - matchExpressions:
#         - key: node-role.kubernetes.io/master
#           operator: In
#           values:
#           - machine01
#     preferredDuringSchedulingIgnoredDuringExecution:
#     - weight: 1
#       preference:
#         matchExpressions:
#         - key: another-node-label-key
#           operator: In
#           values:
#           - another-node-label-value

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

# Moodle

[Moodle](https://www.moodle.org) is a learning platform designed to provide educators, administrators and learners with a single robust, secure and integrated system to create personalized learning environments

## TL;DR;

```console
$ helm install stable/moodle
```

## Introduction

This chart bootstraps a [Moodle](https://github.com/bitnami/bitnami-docker-moodle) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the Moodle application.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/moodle
```

The command deploys Moodle on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Moodle chart and their default values.

| Parameter                           | Description                             | Default                                                 |
| ----------------------------------- | --------------------------------------- | ------------------------------------------------------- |
| `image.registry`                    | Moodle image registry                   | `docker.io`                                             |
| `image.repository`                  | Moodle Image name                       | `bitnami/moodle`                                        |
| `image.tag`                         | Moodle Image tag                        | `{VERSION}`                                             |
| `image.pullPolicy`                  | Image pull policy                       | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`                 | Specify image pull secrets              | `nil`                                                   |
| `moodleUsername`                    | User of the application                 | `user`                                                  |
| `moodlePassword`                    | Application password                    | _random 10 character alphanumeric string_               |
| `moodleEmail`                       | Admin email                             | `user@example.com`                                      |
| `smtpHost`                          | SMTP host                               | `nil`                                                   |
| `smtpPort`                          | SMTP port                               | `nil` (but moodle internal default is 25)               |
| `smtpProtocol`                      | SMTP Protocol (options: ssl,tls, nil)   | `nil`                                                   |
| `smtpUser`                          | SMTP user                               | `nil`                                                   |
| `smtpPassword`                      | SMTP password                           | `nil`                                                   |
| `serviceType`                       | Kubernetes Service type                 | `LoadBalancer`                                          |
| `ingress.enabled`                   | If ingress should be created            | `false`                                                 |
| `ingress.annotations`               | Any ingress annotations                 | `nil`                                                   |
| `ingress.hosts`                     | List of Ingress hosts                   | `nil`                                                   |
| `ingress.tls`                       | List of certs. If defined, https is set | `nil`                                                   |
| `affinity`                          | Set affinity for the moodle pods        | `nil`                                                   |
| `resources`                         | CPU/Memory resource requests/limits     | Memory: `512Mi`, CPU: `300m`                            |
| `persistence.enabled`               | Enable persistence using PVC            | `true`                                                  |
| `persistence.storageClass`          | PVC Storage Class for Moodle volume     | `nil` (uses alpha storage class annotation)             |
| `persistence.accessMode`            | PVC Access Mode for Moodle volume       | `ReadWriteOnce`                                         |
| `persistence.size`                  | PVC Storage Request for Moodle volume   | `8Gi`                                                   |
| `persistence.existingClaim`         | If PVC exists&bounded for Moodle        | `nil` (when nil, new one is requested)                  |
| `allowEmptyPassword`                | Allow DB blank passwords                | `yes`                                                   |
| `externalDatabase.host`             | Host of the external database           | `nil`                                                   |
| `externalDatabase.port`             | Port of the external database           | `3306`                                                  |
| `externalDatabase.user`             | Existing username in the external db    | `bn_moodle`                                             |
| `externalDatabase.password`         | Password for the above username         | `nil`                                                   |
| `externalDatabase.database`         | Name of the existing database           | `bitnami_moodle`                                        |
| `mariadb.enabled`                   | Whether to install the MariaDB chart    | `true`                                                  |
| `mariadb.mariadbDatabase`           | Database name to create                 | `bitnami_moodle`                                        |
| `mariadb.mariadbUser`               | Database user to create                 | `bn_moodle`                                             |
| `mariadb.mariadbPassword`           | Password for the database               | `nil`                                                   |
| `mariadb.mariadbRootPassword`       | MariaDB admin password                  | `nil`                                                   |
| `mariadb.persistence.enabled`       | Enable MariaDB persistence using PVC    | `true`                                                  |
| `mariadb.persistence.storageClass`  | PVC Storage Class for MariaDB volume    | `generic`                                               |
| `mariadb.persistence.accessMode`    | PVC Access Mode for MariaDB volume      | `ReadWriteOnce`                                         |
| `mariadb.persistence.size`          | PVC Storage Request for MariaDB volume  | `8Gi`                                                   |
| `mariadb.persistence.existingClaim` | If PVC exists&bounded for MariaDB       | `nil` (when nil, new one is requested)                  |
| `mariadb.affinity`                  | Set affinity for the MariaDB pods       | `nil`                                                   |
| `mariadb.resources`                 | CPU/Memory resource requests/limits     | Memory: `256Mi`, CPU: `250m`                            |

The above parameters map to the env variables defined in [bitnami/moodle](http://github.com/bitnami/bitnami-docker-moodle). For more information please refer to the [bitnami/moodle](http://github.com/bitnami/bitnami-docker-moodle) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set moodleUsername=admin,moodlePassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/moodle
```

The above command sets the Moodle administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/moodle
```

> **Tip**: You can use the default [values.yaml](values.yaml)

### Ingress without TLS

For using ingress (example without TLS):

```console
$ helm install --name my-release \
  --set ingress.enabled=True,ingress.hosts[0]=moodle.domain.com,serviceType=ClusterIP,moodleUsername=admin,moodlePassword=password,mariadb.mariadbRootPassword=secretpassword stable/moodle
```

These are the _3 mandatory parameters_ when _Ingress_ is desired:
`ingress.enabled=True,ingress.hosts[0]=moodle.domain.com,serviceType=ClusterIP`

### Ingress TLS

If your cluster allows automatic creation/retrieval of TLS certificates (e.g. [kube-lego](https://github.com/jetstack/kube-lego)), please refer to the documentation for that mechanism.

To manually configure TLS, first create/retrieve a key & certificate pair for the address(es) you wish to protect. Then create a TLS secret in the namespace:

```console
$ kubectl create secret tls moodle-server-tls --cert=path/to/tls.cert --key=path/to/tls.key
```

Include the secret's name, along with the desired hostnames, in the Ingress TLS section of your custom `values.yaml` file:

```console
ingress:
  ## If true, Moodle server Ingress will be created
  ##
  enabled: true

  ## Moodle server Ingress annotations
  ##
  annotations: {}
  #   kubernetes.io/ingress.class: nginx
  #   kubernetes.io/tls-acme: 'true'

  ## Moodle server Ingress hostnames
  ## Must be provided if Ingress is enabled
  ##
  hosts:
    - moodle.domain.com

  ## Moodle server Ingress TLS configuration
  ## Secrets must be manually created in the namespace
  ##
  tls:
    - secretName: moodle-server-tls
      hosts:
        - moodle.domain.com
```

## Persistence

The [Bitnami Moodle](https://github.com/bitnami/bitnami-docker-moodle) image stores the Moodle data and configurations at the `/bitnami/moodle` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, vpshere, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
You may want to review the [PV reclaim policy](https://kubernetes.io/docs/tasks/administer-cluster/change-pv-reclaim-policy/) and update as required. By default, it's set to delete, and when Moodle is uninstalled, data is also removed.
