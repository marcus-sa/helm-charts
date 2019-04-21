# `@helm-charts/stable-phpmyadmin`

phpMyAdmin is an mysql administration frontend

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | phpmyadmin |
| Chart Version       | 1.2.0      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Global Docker image registry
## Please, note that this will override the image registry for all the images, including dependencies, configured to use the global value
##
# global:
#   imageRegistry:

## Bitnami WordPress image version
## ref: https://hub.docker.com/r/bitnami/phpmyadmin/tags/
##
image:
  registry: docker.io
  repository: bitnami/phpmyadmin
  tag: 4.8.2-debian-9
  ## Specify a imagePullPolicy
  pullPolicy: IfNotPresent
  ## Optionally specify an array of imagePullSecrets.
  ## Secrets must be manually created in the namespace.
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  ##
  # pullSecrets:
  #   - myRegistrKeySecretName

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-phpmyadmin#environment-variables
##
service:
  type: ClusterIP
  port: 80

db:
  ## using default mysql port explicitly
  port: 3306
  ## if you are deploying it as part of a release, and the db is also in the release
  ## you can pass a suffix that will be used to find the DB in releasename-dbSuffix
  ## please note that this setting precedes dbHost
  # chartName: mariadb
  # host: foo

ingress:
  enabled: false
  annotations:
    ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/rewrite-target: /
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  ## path you want to map the phpmyadmin interface to
  path: /
  # host: foo
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

## Enable liveness and readiness probes
probesEnabled: true

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
```

</details>

---

# phpMyAdmin

[phpMyAdmin](https://www.phpmyadmin.net/) is a free and open source administration tool for MySQL and MariaDB. As a portable web application written primarily in PHP, it has become one of the most popular MySQL administration tools, especially for web hosting services.

## TL;DR

```console
$ helm install stable/phpmyadmin
```

## Introduction

This chart bootstraps a [phpMyAdmin](https://github.com/bitnami/bitnami-docker-phpmyadmin) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/phpmyadmin
```

The command deploys phpMyAdmin on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the phpMyAdmin chart and their default values.

| Parameter              | Description                                     | Default                                                                                    |
| ---------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `global.imageRegistry` | Global Docker image registry                    | `nil`                                                                                      |
| `image.registry`       | phpMyAdmin image registry                       | `docker.io`                                                                                |
| `image.repository`     | phpMyAdmin image name                           | `bitnami/phpmyadmin`                                                                       |
| `image.tag`            | phpMyAdmin image tag                            | `{VERSION}`                                                                                |
| `image.pullPolicy`     | Image pull policy                               | `IfNotPresent`                                                                             |
| `image.pullSecrets`    | Specify image pull secrets                      | `nil`                                                                                      |
| `service.type`         | Type of service for phpMyAdmin frontend         | `ClusterIP`                                                                                |
| `service.port`         | Port to expose service                          | `80`                                                                                       |
| `db.port`              | Database port to use to connect                 | `3306`                                                                                     |
| `db.chartName`         | Database suffix if included in the same release | `nil`                                                                                      |
| `db.host`              | Database host to connect to                     | `nil`                                                                                      |
| `ingress.enabled`      | Ingress resource to be added                    | `false`                                                                                    |
| `ingress.annotations`  | Ingress annotations                             | `{ingress.kubernetes.io/rewrite-target: /, nginx.ingress.kubernetes.io/rewrite-target: /}` |
| `ingress.path`         | Path to access frontend                         | `/`                                                                                        |
| `ingress.host`         | Ingress host                                    | `nil`                                                                                      |
| `ingress.tls`          | TLS for ingress                                 | `[]`                                                                                       |
| `resources`            | CPU/Memory resource requests/limits             | `{}`                                                                                       |
| `nodeSelector`         | Node labels for pod assignment                  | `{}`                                                                                       |
| `tolerations`          | List of node taints to tolerate                 | `[]`                                                                                       |
| `affinity`             | Map of node/pod affinities                      | `{}`                                                                                       |

For more information please refer to the [bitnami/phpmyadmin](http://github.com/bitnami/bitnami-docker-Phpmyadmin) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set db.host=mymariadb,db.port=3306 stable/phpmyadmin
```

The above command sets the phpMyAdmin to connect to a database in `mymariadb` host and `3306` port respectively.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/phpmyadmin
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Upgrading

### To 1.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to `1.0.0`. The following example assumes that the release name is `phpmyadmin`:

```console
$ kubectl patch deployment phpmyadmin-phpmyadmin --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
```
