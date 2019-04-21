# `@helm-charts/stable-superset`

Apache Superset (incubating) is a modern, enterprise-ready business intelligence web application

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | superset |
| Chart Version       | 1.1.4    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for superset.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

## Set default image, imageTag, and imagePullPolicy.
image:
  repository: 'amancevice/superset'
  tag: '0.28.1'
  pullPolicy: 'IfNotPresent'
  pullSecrets: []

initFile: |-
  /usr/local/bin/superset-init --username admin --firstname admin --lastname user --email admin@fab.org --password admin
  superset runserver

configFile: |-
  #---------------------------------------------------------
  # Superset specific config
  #---------------------------------------------------------
  ROW_LIMIT = 5000
  SUPERSET_WORKERS = 2

  SUPERSET_WEBSERVER_PORT = 8088
  #---------------------------------------------------------

  #---------------------------------------------------------
  # Flask App Builder configuration
  #---------------------------------------------------------
  # Your App secret key
  SECRET_KEY = '\2\1thisismyscretkey\1\2\e\y\y\h'

  # The SQLAlchemy connection string to your database backend
  # This connection defines the path to the database that stores your
  # superset metadata (slices, connections, tables, dashboards, ...).
  # Note that the connection information to connect to the datasources
  # you want to explore are managed directly in the web UI
  SQLALCHEMY_DATABASE_URI = 'sqlite:////var/lib/superset/superset.db'


  # Flask-WTF flag for CSRF
  WTF_CSRF_ENABLED = True
  # Add endpoints that need to be exempt from CSRF protection
  WTF_CSRF_EXEMPT_LIST = []

  # Set this API key to enable Mapbox visualizations
  MAPBOX_API_KEY = ''

## Extra confiuguration files and their content to be made available next to the config file
extraConfigFiles:
  {}
  ## custom_sso_security_manager.py: |-
  ##   from superset.security import SupersetSecurityManager
  ##   ...

## Extra environment variables that will be passed onto deployment pod
##
extraEnv: {}

## The name of a secret in the same kubernetes namespace which contain values to be added to the environment
## This can be useful for secret keys, etc
##
extraEnvFromSecret: ''

persistence:
  ## If true, superset server will create/use a Persistent Volume Claim
  ## If false, use emptyDir
  ##
  enabled: false

  ## superset data Persistent Volume access modes
  ## Must match those of existing PV or dynamic provisioner
  ## Ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  accessModes:
    - ReadWriteOnce

  ## superset data Persistent Volume size
  ##
  size: 8Gi

  ## superset server data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"

  ## Superset data Persistent Volume existing claim name
  ## Requires server.persistence.enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  existingClaim: ''

## Expose the superset service to be accessed from outside the cluster (LoadBalancer service).
## or access it from within the cluster (ClusterIP service). Set the service type and the port to serve it.
## ref: http://kubernetes.io/docs/user-guide/services/
##
service:
  type: ClusterIP
  port: 9000

  ## service annotations
  annotations:
    {}
    # service.beta.kubernetes.io/aws-load-balancer-internal: "true"
    # external-dns.alpha.kubernetes.io/hostname: "superset.domain.com"

  ## loadbalancer source ranges. only used when service.type is "LoadBalancer"
  loadBalancerSourceRanges: []
  # - 172.31.0.0/16

ingress:
  ## If true, superset Ingress will be created
  ##
  enabled: false

  ## superset Ingress annotations
  annotations: {}
  # kubernetes.io/ingress.class: nginx
  # kubernetes.io/tls-acme: 'true'

  ## superset Ingress hostnames
  ## Must be provided if Ingress is enabled
  ##
  hosts:
    - superset.domain.com

  ## superset Ingress path
  ## Optional, allows specifying paths for more flexibility
  ## E.g. Traefik ingress likes paths
  ##
  path: /

  ## superset Ingress TLS configuration
  ## Secrets must be manually created in the namespace
  ##
  tls: []
  #   - secretName: superset-server-tls
  #     hosts:
  #       - superset.domain.com

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}

## Tolerations
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#taints-and-tolerations-beta-feature
tolerations: []

## Affinity and anti-affinity
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
affinity: {}

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources: {}
#  requests:
#    cpu: 50m
#    memory: 256Mi
#  limits:
#    cpu: 500m
#    memory: 750Mi

## Configure liveness/readiness params
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/
##
livenessProbe:
  httpGet:
    path: /health
    port: http
  initialDelaySeconds: 80
  timeoutSeconds: 5
  periodSeconds: 10
  failureThreshold: 2
readinessProbe:
  httpGet:
    path: /health
    port: http
  initialDelaySeconds: 60
  timeoutSeconds: 5
  periodSeconds: 10
  failureThreshold: 2
```

</details>

---

# Apache superset

## Introduction

This chart bootstraps an [Apache superset](https://superset.incubator.apache.org/) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## TL;DR;

```bash
$ helm install stable/superset
```

## Prerequisites

- Kubernetes 1.9+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure (Only when persisting data)

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/superset
```

The command deploys Superset on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

| Parameter                   | Description                                                                                                                            | Default                                                    |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `image.repository`          | `superset` image repository                                                                                                            | `amancevice/superset`                                      |
| `image.tag`                 | `superset` image tag                                                                                                                   | `0.28.1`                                                   |
| `image.pullPolicy`          | Image pull policy                                                                                                                      | `IfNotPresent`                                             |
| `image.pullSecrets`         | Secrets for private registry                                                                                                           | `[]`                                                       |
| `configFile`                | Content of [`superset_config.py`](https://superset.incubator.apache.org/installation.html)                                             | See values.yaml](./values.yaml)                            |
| `extraConfigFiles`          | Content of additional configuration files. Let the dictionary key name represent the name of the file and its value the files content. | `{}`                                                       |
| `initFile`                  | Content of init shell script                                                                                                           | See [values.yaml](./values.yaml)                           |
| `replicas`                  | Number of replicas of superset                                                                                                         | `1`                                                        |
| `extraEnv`                  | Extra environment variables passed to pods                                                                                             | `{}`                                                       |
| `extraEnvFromSecret`        | The name of a Kubernetes secret (must be manually created in the same namespace) containing values to be added to the environment      | `""`                                                       |
| `persistence.enabled`       | Enable persistence                                                                                                                     | `false`                                                    |
| `persistence.existingClaim` | Provide an existing PersistentVolumeClaim                                                                                              | `""`                                                       |
| `persistence.storageClass`  | Storage class of backing PVC                                                                                                           | `nil` (uses alpha storage class annotation)                |
| `persistence.accessMode`    | Use volume as ReadOnly or ReadWrite                                                                                                    | `ReadWriteOnce`                                            |
| `persistence.size`          | Size of data volume                                                                                                                    | `8Gi`                                                      |
| `resources`                 | CPU/Memory resource requests/limits                                                                                                    | Memory: `256Mi`, CPU: `50m` / Memory: `500Mi`, CPU: `500m` |
| `service.port`              | TCP port                                                                                                                               | `9000`                                                     |
| `service.type`              | k8s service type exposing ports, e.g. `NodePort`                                                                                       | `ClusterIP`                                                |
| `nodeSelector`              | Node labels for pod assignment                                                                                                         | `{}`                                                       |
| `tolerations`               | Toleration labels for pod assignment                                                                                                   | `[]`                                                       |
| `livenessProbe`             | Parameter for liveness probe                                                                                                           | See [values.yaml](./values.yaml)                           |
| `readinessProbe`            | Parameter for readiness probe                                                                                                          | See [values.yaml](./values.yaml)                           |
| `ingress.enabled`           | Create an ingress resource when true                                                                                                   | `false`                                                    |
| `ingress.annotations`       | ingress annotations                                                                                                                    | `{}`                                                       |
| `ingress.hosts`             | ingress hosts                                                                                                                          | `[superset.domain.com]`                                    |
| `ingress.path`              | ingress path                                                                                                                           | `\`                                                        |
| `ingress.tls`               | ingress tls                                                                                                                            | `[]`                                                       |

see [values.yaml](./values.yaml)

## Init script

There is a script (`init_superset.sh`) which is called at the entrypoint of the container. It initialzes the db and creates an user account. You can configure the content with `initFile`. E.g. in order to change admin password and load examples:

```yaml
initFile: |-
  /usr/local/bin/superset-init --username admin --firstname myfirstname --lastname mylastname --email admin@fab.org --password mypassword
  superset load_examples
  superset runserver
```

## Persistence

The [superset image](https://hub.docker.com/r/amancevice/superset/) mounts the SQLite DB file (`superset.db`) on path `/var/lib/superset`. The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) at this location. The volume is created using dynamic volume provisioning. If the PersistentVolumeClaim should not be managed by the chart, define `persistence.existingClaim`.

### Existing PersistentVolumeClaims

1. Create the PersistentVolumeClaim with name `superset-pvc` in the same namespace
1. Install the chart

```bash
$ helm install --set persistence.enabled=true,persistence.existingClaim=superset-pvc stable/superset
```
