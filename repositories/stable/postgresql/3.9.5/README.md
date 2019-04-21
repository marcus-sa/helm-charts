# `@helm-charts/stable-postgresql`

Chart for PostgreSQL, an object-relational database management system (ORDBMS) with an emphasis on extensibility and on standards-compliance.

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | postgresql |
| Chart Version       | 3.9.5      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Global Docker image registry
### Please, note that this will override the image registry for all the images, including dependencies, configured to use the global value
###
## global:
##   imageRegistry:

## Bitnami PostgreSQL image version
## ref: https://hub.docker.com/r/bitnami/postgresql/tags/
##
image:
  registry: docker.io
  repository: bitnami/postgresql
  tag: 10.6.0
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

  ## Set to true if you would like to see extra information on logs
  ## It turns BASH and NAMI debugging in minideb
  ## ref:  https://github.com/bitnami/minideb-extras/#turn-on-bash-debugging
  debug: false

##
## Init containers parameters:
## volumePermissions: Change the owner of the persist volume mountpoint to RunAsUser:fsGroup
##
volumePermissions:
  enabled: true
  image:
    registry: docker.io
    repository: bitnami/minideb
    tag: latest
    ## Specify a imagePullPolicy
    ## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
    ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
    ##
    pullPolicy: Always
  ## Init container Security Context
  securityContext:
    runAsUser: 0

## Pod Security Context
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
##
securityContext:
  enabled: true
  fsGroup: 1001
  runAsUser: 1001

replication:
  enabled: false
  user: repl_user
  password: repl_password
  slaveReplicas: 1
  ## Set synchronous commit mode: on, off, remote_apply, remote_write and local
  ## ref: https://www.postgresql.org/docs/9.6/runtime-config-wal.html#GUC-WAL-LEVEL
  synchronousCommit: 'off'
  ## From the number of `slaveReplicas` defined above, set the number of those that will have synchronous replication
  ## NOTE: It cannot be > slaveReplicas
  numSynchronousReplicas: 0
  ## Replication Cluster application name. Useful for defining multiple replication policies
  applicationName: my_application

## PostgreSQL admin user
## ref: https://github.com/bitnami/bitnami-docker-postgresql/blob/master/README.md#setting-the-root-password-on-first-run
postgresqlUsername: postgres

## PostgreSQL password
## ref: https://github.com/bitnami/bitnami-docker-postgresql/blob/master/README.md#setting-the-root-password-on-first-run
##
# postgresqlPassword:

## PostgreSQL password using existing secret
## existingSecret: secret

## Mount PostgreSQL secret as a file instead of passing environment variable
# usePasswordFile: false

## Create a database
## ref: https://github.com/bitnami/bitnami-docker-postgresql/blob/master/README.md#creating-a-database-on-first-run
##
# postgresqlDatabase:

## PostgreSQL configuration
## Specify runtime configuration parameters as a dict, using camelCase, e.g.
## {"sharedBuffers": "500MB"}
## Alternatively, you can put your postgresql.conf under the files/ directory
## ref: https://www.postgresql.org/docs/current/static/runtime-config.html
##
# postgresqlConfiguration:

## PostgreSQL extended configuration
## As above, but _appended_ to the main configuration
## Alternatively, you can put your *.conf under the files/conf.d/ directory
## https://github.com/bitnami/bitnami-docker-postgresql#allow-settings-to-be-loaded-from-files-other-than-the-default-postgresqlconf
##
# postgresqlExtendedConf:

## PostgreSQL client authentication configuration
## Specify content for pg_hba.conf
## Default: do not create pg_hba.conf
## Alternatively, you can put your pg_hba.conf under the files/ directory
# pgHbaConfiguration: |-
#   local all all trust
#   host all all localhost trust
#   host mydatabase mysuser 192.168.0.0/24 md5

## ConfigMap with PostgreSQL configuration
## NOTE: This will override postgresqlConfiguration and pgHbaConfiguration
# configurationConfigMap:

## ConfigMap with PostgreSQL extended configuration
# extendedConfConfigMap:

## initdb scripts
## Specify dictionnary of scripts to be run at first boot
## Alternatively, you can put your scripts under the files/docker-entrypoint-initdb.d directory
##
# initdbScripts:
#   my_init_script.sh:|
#      #!/bin/sh
#      echo "Do something."
#
## ConfigMap with scripts to be run at first boot
## NOTE: This will override initdbScripts
# initdbScriptsConfigMap:

## Optional duration in seconds the pod needs to terminate gracefully.
## ref: https://kubernetes.io/docs/concepts/workloads/pods/pod/#termination-of-pods
##
# terminationGracePeriodSeconds: 30

## PostgreSQL service configuration
service:
  ## PosgresSQL service type
  type: ClusterIP
  # clusterIP: None
  port: 5432

  ## Specify the nodePort value for the LoadBalancer and NodePort service types.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
  ##
  # nodePort:

  ## Provide any additional annotations which may be required. This can be used to
  annotations: {}
  ## Set the LoadBalancer service type to internal only.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#internal-load-balancer
  ##
  # loadBalancerIP:

## PostgreSQL data Persistent Volume Storage Class
## If defined, storageClassName: <storageClass>
## If set to "-", storageClassName: "", which disables dynamic provisioning
## If undefined (the default) or set to null, no storageClassName spec is
##   set, choosing the default provisioner.  (gp2 on AWS, standard on
##   GKE, AWS & OpenStack)
##
persistence:
  enabled: true
  ## A manually managed Persistent Volume and Claim
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:
  mountPath: /bitnami/postgresql
  # storageClass: "-"
  accessModes:
    - ReadWriteOnce
  size: 8Gi
  annotations: {}

## updateStrategy for PostgreSQL StatefulSet and its slaves StatefulSets
## ref: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#update-strategies
updateStrategy:
  type: RollingUpdate

##
## PostgreSQL Master parameters
##
master:
  ## Node, affinity and tolerations labels for pod assignment
  ## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
  ## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
  ## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#taints-and-tolerations-beta-feature
  nodeSelector: {}
  affinity: {}
  tolerations: []

##
## PostgreSQL Slave parameters
##
slave:
  ## Node, affinity and tolerations labels for pod assignment
  ## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
  ## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
  ## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#taints-and-tolerations-beta-feature
  nodeSelector: {}
  affinity: {}
  tolerations: []

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 256Mi
    cpu: 250m

networkPolicy:
  ## Enable creation of NetworkPolicy resources.
  ##
  enabled: false

  ## The Policy model to apply. When set to false, only pods with the correct
  ## client label will have network access to the port PostgreSQL is listening
  ## on. When true, PostgreSQL will accept connections from any source
  ## (with the correct destination port).
  ##
  allowExternal: true

## Configure extra options for liveness and readiness probes
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#configure-probes)
livenessProbe:
  enabled: true
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1

readinessProbe:
  enabled: true
  initialDelaySeconds: 5
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1

## Configure metrics exporter
##
metrics:
  enabled: false
  # resources: {}
  service:
    type: ClusterIP
    annotations:
      prometheus.io/scrape: 'true'
      prometheus.io/port: '9187'
    loadBalancerIP:
  image:
    registry: docker.io
    repository: wrouesnel/postgres_exporter
    tag: v0.4.6
    pullPolicy: IfNotPresent
    ## Optionally specify an array of imagePullSecrets.
    ## Secrets must be manually created in the namespace.
    ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
    ##
    # pullSecrets:
    #   - myRegistrKeySecretName

  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#configure-probes)
  ## Configure extra options for liveness and readiness probes
  livenessProbe:
    enabled: true
    initialDelaySeconds: 5
    periodSeconds: 10
    timeoutSeconds: 5
    failureThreshold: 6
    successThreshold: 1

  readinessProbe:
    enabled: true
    initialDelaySeconds: 5
    periodSeconds: 10
    timeoutSeconds: 5
    failureThreshold: 6
    successThreshold: 1

# Define custom environment variables to pass to the image here
extraEnv: {}
```

</details>

---

# PostgreSQL

[PostgreSQL](https://www.postgresql.org/) is an object-relational database management system (ORDBMS) with an emphasis on extensibility and on standards-compliance.

## TL;DR;

```console
$ helm install stable/postgresql
```

## Introduction

This chart bootstraps a [PostgreSQL](https://github.com/bitnami/bitnami-docker-postgresql) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

## Prerequisites

- Kubernetes 1.10+
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/postgresql
```

The command deploys PostgreSQL on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the PostgreSQL chart and their default values.

| Parameter                                     | Description                                                                                                            | Default                                                  |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `global.imageRegistry`                        | Global Docker Image registry                                                                                           | `nil`                                                    |
| `image.registry`                              | PostgreSQL Image registry                                                                                              | `docker.io`                                              |
| `image.repository`                            | PostgreSQL Image name                                                                                                  | `bitnami/postgresql`                                     |
| `image.tag`                                   | PostgreSQL Image tag                                                                                                   | `{VERSION}`                                              |
| `image.pullPolicy`                            | PostgreSQL Image pull policy                                                                                           | `Always`                                                 |
| `image.pullSecrets`                           | Specify Image pull secrets                                                                                             | `nil` (does not add image pull secrets to deployed pods) |
| `image.debug`                                 | Specify if debug values should be set                                                                                  | `false`                                                  |
| `volumePermissions.image.registry`            | Init container volume-permissions image registry                                                                       | `docker.io`                                              |
| `volumePermissions.image.repository`          | Init container volume-permissions image name                                                                           | `bitnami/minideb`                                        |
| `volumePermissions.image.tag`                 | Init container volume-permissions image tag                                                                            | `latest`                                                 |
| `volumePermissions.image.pullPolicy`          | Init container volume-permissions image pull policy                                                                    | `Always`                                                 |
| `volumePermissions.securityContext.runAsUser` | User ID for the init container                                                                                         | `0`                                                      |
| `usePasswordFile`                             | Have the secrets mounted as a file instead of env vars                                                                 | `false`                                                  |
| `replication.enabled`                         | Would you like to enable replication                                                                                   | `false`                                                  |
| `replication.user`                            | Replication user                                                                                                       | `repl_user`                                              |
| `replication.password`                        | Replication user password                                                                                              | `repl_password`                                          |
| `replication.slaveReplicas`                   | Number of slaves replicas                                                                                              | `1`                                                      |
| `replication.synchronousCommit`               | Set synchronous commit mode. Allowed values: `on`, `remote_apply`, `remote_write`, `local` and `off`                   | `off`                                                    |
| `replication.numSynchronousReplicas`          | Number of replicas that will have synchronous replication. Note: Cannot be greater than `replication.slaveReplicas`.   | `0`                                                      |
| `replication.applicationName`                 | Cluster application name. Useful for advanced replication settings                                                     | `my_application`                                         |
| `existingSecret`                              | Name of existing secret to use for PostgreSQL passwords                                                                | `nil`                                                    |
| `postgresqlUsername`                          | PostgreSQL admin user                                                                                                  | `postgres`                                               |
| `postgresqlPassword`                          | PostgreSQL admin password                                                                                              | _random 10 character alphanumeric string_                |
| `postgresqlDatabase`                          | PostgreSQL database                                                                                                    | `nil`                                                    |
| `postgresqlConfiguration`                     | Runtime Config Parameters                                                                                              | `nil`                                                    |
| `postgresqlExtendedConf`                      | Extended Runtime Config Parameters (appended to main or default configuration)                                         | `nil`                                                    |
| `pgHbaConfiguration`                          | Content of pg_hba.conf                                                                                                 | `nil (do not create pg_hba.conf)`                        |
| `configurationConfigMap`                      | ConfigMap with the PostgreSQL configuration files (Note: Overrides `postgresqlConfiguration` and `pgHbaConfiguration`) | `nil`                                                    |
| `extendedConfConfigMap`                       | ConfigMap with the extended PostgreSQL configuration files                                                             | `nil`                                                    |
| `initdbScripts`                               | List of initdb scripts                                                                                                 | `nil`                                                    |
| `initdbScriptsConfigMap`                      | ConfigMap with the initdb scripts (Note: Overrides `initdbScripts`)                                                    | `nil`                                                    |
| `service.type`                                | Kubernetes Service type                                                                                                | `ClusterIP`                                              |
| `service.port`                                | PostgreSQL port                                                                                                        | `5432`                                                   |
| `service.nodePort`                            | Kubernetes Service nodePort                                                                                            | `nil`                                                    |
| `service.annotations`                         | Annotations for PostgreSQL service                                                                                     | {}                                                       |
| `service.loadBalancerIP`                      | loadBalancerIP if service type is `LoadBalancer`                                                                       | `nil`                                                    |
| `persistence.enabled`                         | Enable persistence using PVC                                                                                           | `true`                                                   |
| `persistence.existingClaim`                   | Provide an existing `PersistentVolumeClaim`                                                                            | `nil`                                                    |
| `persistence.mountPath`                       | Path to mount the volume at                                                                                            | `/bitnami/postgresql`                                    |
| `persistence.storageClass`                    | PVC Storage Class for PostgreSQL volume                                                                                | `nil`                                                    |
| `persistence.accessMode`                      | PVC Access Mode for PostgreSQL volume                                                                                  | `ReadWriteOnce`                                          |
| `persistence.size`                            | PVC Storage Request for PostgreSQL volume                                                                              | `8Gi`                                                    |
| `persistence.annotations`                     | Annotations for the PVC                                                                                                | `{}`                                                     |
| `master.nodeSelector`                         | Node labels for pod assignment (postgresql master)                                                                     | `{}`                                                     |
| `master.affinity`                             | Affinity labels for pod assignment (postgresql master)                                                                 | `{}`                                                     |
| `master.tolerations`                          | Toleration labels for pod assignment (postgresql master)                                                               | `[]`                                                     |
| `slave.nodeSelector`                          | Node labels for pod assignment (postgresql slave)                                                                      | `{}`                                                     |
| `slave.affinity`                              | Affinity labels for pod assignment (postgresql slave)                                                                  | `{}`                                                     |
| `slave.tolerations`                           | Toleration labels for pod assignment (postgresql slave)                                                                | `[]`                                                     |
| `terminationGracePeriodSeconds`               | Seconds the pod needs to terminate gracefully                                                                          | `nil`                                                    |
| `resources`                                   | CPU/Memory resource requests/limits                                                                                    | Memory: `256Mi`, CPU: `250m`                             |
| `securityContext.enabled`                     | Enable security context                                                                                                | `true`                                                   |
| `securityContext.fsGroup`                     | Group ID for the container                                                                                             | `1001`                                                   |
| `securityContext.runAsUser`                   | User ID for the container                                                                                              | `1001`                                                   |
| `livenessProbe.enabled`                       | Would you like a livessProbed to be enabled                                                                            | `true`                                                   |
| `networkPolicy.enabled`                       | Enable NetworkPolicy                                                                                                   | `false`                                                  |
| `networkPolicy.allowExternal`                 | Don't require client label for connections                                                                             | `true`                                                   |
| `livenessProbe.initialDelaySeconds`           | Delay before liveness probe is initiated                                                                               | 30                                                       |
| `livenessProbe.periodSeconds`                 | How often to perform the probe                                                                                         | 10                                                       |
| `livenessProbe.timeoutSeconds`                | When the probe times out                                                                                               | 5                                                        |
| `livenessProbe.failureThreshold`              | Minimum consecutive failures for the probe to be considered failed after having succeeded.                             | 6                                                        |
| `livenessProbe.successThreshold`              | Minimum consecutive successes for the probe to be considered successful after having failed                            | 1                                                        |
| `readinessProbe.enabled`                      | would you like a readinessProbe to be enabled                                                                          | `true`                                                   |
| `readinessProbe.initialDelaySeconds`          | Delay before liveness probe is initiated                                                                               | 5                                                        |
| `readinessProbe.periodSeconds`                | How often to perform the probe                                                                                         | 10                                                       |
| `readinessProbe.timeoutSeconds`               | When the probe times out                                                                                               | 5                                                        |
| `readinessProbe.failureThreshold`             | Minimum consecutive failures for the probe to be considered failed after having succeeded.                             | 6                                                        |
| `readinessProbe.successThreshold`             | Minimum consecutive successes for the probe to be considered successful after having failed                            | 1                                                        |
| `metrics.enabled`                             | Start a prometheus exporter                                                                                            | `false`                                                  |
| `metrics.service.type`                        | Kubernetes Service type                                                                                                | `ClusterIP`                                              |
| `service.clusterIP`                           | Static clusterIP or None for headless services                                                                         | `nil`                                                    |
| `metrics.service.annotations`                 | Additional annotations for metrics exporter pod                                                                        | `{}`                                                     |
| `metrics.service.loadBalancerIP`              | loadBalancerIP if redis metrics service type is `LoadBalancer`                                                         | `nil`                                                    |
| `metrics.image.registry`                      | PostgreSQL Image registry                                                                                              | `docker.io`                                              |
| `metrics.image.repository`                    | PostgreSQL Image name                                                                                                  | `wrouesnel/postgres_exporter`                            |
| `metrics.image.tag`                           | PostgreSQL Image tag                                                                                                   | `{VERSION}`                                              |
| `metrics.image.pullPolicy`                    | PostgreSQL Image pull policy                                                                                           | `IfNotPresent`                                           |
| `metrics.image.pullSecrets`                   | Specify Image pull secrets                                                                                             | `nil` (does not add image pull secrets to deployed pods) |
| `extraEnv`                                    | Any extra environment variables you would like to pass on to the pod                                                   | `{}`                                                     |
| `updateStrategy`                              | Update strategy policy                                                                                                 | `{type: "onDelete"}`                                     |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set postgresqlPassword=secretpassword,postgresqlDatabase=my-database \
    stable/postgresql
```

The above command sets the PostgreSQL `postgres` account password to `secretpassword`. Additionally it creates a database named `my-database`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/postgresql
```

> **Tip**: You can use the default [values.yaml](values.yaml)

### postgresql.conf / pg_hba.conf files as configMap

This helm chart also supports to customize the whole configuration file.

Add your custom file to "files/postgresql.conf" in your working directory. This file will be mounted as configMap to the containers and it will be used for configuring the PostgreSQL server.

Alternatively, you can specify PostgreSQL configuration parameters using the `postgresqlConfiguration` parameter as a dict, using camelCase, e.g. {"sharedBuffers": "500MB"}.

In addition to these options, you can also set an external ConfigMap with all the configuration files. This is done by setting the `configurationConfigMap` parameter. Note that this will override the two previous options.

### Allow settings to be loaded from files other than the default `postgresql.conf`

If you don't want to provide the whole PostgreSQL configuration file and only specify certain parameters, you can add your extended `.conf` files to "files/conf.d/" in your working directory.
Those files will be mounted as configMap to the containers adding/overwriting the default configuration using the `include_dir` directive that allows settings to be loaded from files other than the default `postgresql.conf`.

Alternatively, you can also set an external ConfigMap with all the extra configuration files. This is done by setting the `extendedConfConfigMap` parameter. Note that this will override the previous option.

## Initialize a fresh instance

The [Bitnami PostgreSQL](https://github.com/bitnami/bitnami-docker-postgresql) image allows you to use your custom scripts to initialize a fresh instance. In order to execute the scripts, they must be located inside the chart folder `files/docker-entrypoint-initdb.d` so they can be consumed as a ConfigMap.

Alternatively, you can specify custom scripts using the `initdbScripts` parameter as dict.

In addition to these options, you can also set an external ConfigMap with all the initialization scripts. This is done by setting the `initdbScriptsConfigMap` parameter. Note that this will override the two previous options.

The allowed extensions are `.sh`, `.sql` and `.sql.gz`.

## Production and horizontal scaling

The following repo contains the recommended production settings for PostgreSQL server in an alternative [values file](values-production.yaml). Please read carefully the comments in the values-production.yaml file to set up your environment

To horizontally scale this chart, first download the [values-production.yaml](values-production.yaml) file to your local folder, then:

```console
$ helm install --name my-release -f ./values-production.yaml stable/postgresql
$ kubectl scale statefulset my-postgresql-slave --replicas=3
```

## Persistence

The [Bitnami PostgreSQL](https://github.com/bitnami/bitnami-docker-postgresql) image stores the PostgreSQL data and configurations at the `/bitnami/postgresql` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Metrics

The chart optionally can start a metrics exporter for [prometheus](https://prometheus.io). The metrics endpoint (port 9187) is not exposed and it is expected that the metrics are collected from inside the k8s cluster using something similar as the described in the [example Prometheus scrape configuration](https://github.com/prometheus/prometheus/blob/master/documentation/examples/prometheus-kubernetes.yml).

The exporter allows to create custom metrics from additional SQL queries. See the Chart's `values.yaml` for an example and consult the [exporters documentation](https://github.com/wrouesnel/postgres_exporter#adding-new-metrics-via-a-config-file) for more details.

## NetworkPolicy

To enable network policy for PostgreSQL, install [a networking plugin that implements the Kubernetes NetworkPolicy spec](https://kubernetes.io/docs/tasks/administer-cluster/declare-network-policy#before-you-begin), and set `networkPolicy.enabled` to `true`.

For Kubernetes v1.5 & v1.6, you must also turn on NetworkPolicy by setting the DefaultDeny namespace annotation. Note: this will enforce policy for _all_ pods in the namespace:

```console
$ kubectl annotate namespace default "net.beta.kubernetes.io/network-policy={\"ingress\":{\"isolation\":\"DefaultDeny\"}}"
```

With NetworkPolicy enabled, traffic will be limited to just port 5432.

For more precise policy, set `networkPolicy.allowExternal=false`. This will only allow pods with the generated client label to connect to PostgreSQL.
This label will be displayed in the output of a successful install.

## Upgrade

### 3.0.0

This releases make it possible to specify different nodeSelector, affinity and tolerations for master and slave pods.
It also fixes an issue with `postgresql.master.fullname` helper template not obeying fullnameOverride.

#### Breaking changes

- `affinty` has been renamed to `master.affinity` and `slave.affinity`.
- `tolerations` has been renamed to `master.tolerations` and `slave.tolerations`.
- `nodeSelector` has been renamed to `master.nodeSelector` and `slave.nodeSelector`.

### 2.0.0

In order to upgrade from the `0.X.X` branch to `1.X.X`, you should follow the below steps:

- Obtain the service name (`SERVICE_NAME`) and password (`OLD_PASSWORD`) of the existing postgresql chart. You can find the instructions to obtain the password in the NOTES.txt, the service name can be obtained by running

```console
$ kubectl get svc
```

- Install (not upgrade) the new version

```console
$ helm repo update
$ helm install --name my-release stable/postgresql
```

- Connect to the new pod (you can obtain the name by running `kubectl get pods`):

```console
$ kubectl exec -it NAME bash
```

- Once logged in, create a dump file from the previous database using `pg_dump`, for that we should connect to the previous postgresql chart:

```console
$ pg_dump -h SERVICE_NAME -U postgres DATABASE_NAME > /tmp/backup.sql
```

After run above command you should be prompted for a password, this password is the previous chart password (`OLD_PASSWORD`).
This operation could take some time depending on the database size.

- Once you have the backup file, you can restore it with a command like the one below:

```console
$ psql -U postgres DATABASE_NAME < /tmp/backup.sql
```

In this case, you are accessing to the local postgresql, so the password should be the new one (you can find it in NOTES.txt).

If you want to restore the database and the database schema does not exist, it is necessary to first follow the steps described below.

```console
$ psql -U postgres
postgres=# drop database DATABASE_NAME;
postgres=# create database DATABASE_NAME;
postgres=# create user USER_NAME;
postgres=# alter role USER_NAME with password 'BITNAMI_USER_PASSWORD';
postgres=# grant all privileges on database DATABASE_NAME to USER_NAME;
postgres=# alter database DATABASE_NAME owner to USER_NAME;
```
