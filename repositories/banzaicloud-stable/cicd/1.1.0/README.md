# `@helm-charts/banzaicloud-stable-cicd`

Pipeline CI/CD

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | cicd               |
| Chart Version       | 1.1.0              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
appVersion: '0.7.0'

## CI/CD server and agent Deplyoment annotations
##
annotations: {}

## CI/CD server and agent Deplyoment labels
##
labels: {}

## Resource definitions for Kubernetes resources
replicaCount: 1
# Upgrade strategy
strategy: {}

## The official CI/CD image, change tag to use a different version.
## https://hub.docker.com/r/banzaicloud/cicd/tags/
##
image:
  repository: 'banzaicloud/cicd'
  tag: '0.8.6'
  pullPolicy: 'IfNotPresent'

global:
  auth:
    clientsecret: ''
    clientid: ''

service:
  httpPort: 80

  ## If service.type is not set to NodePort, the following statement
  ## will be ignored.
  ##
  # nodePort: 32015

  ## Service type can be set to ClusterIP, NodePort or LoadBalancer.
  ##
  type: ClusterIP

ingress:
  ## If true, CI/CD Ingress will be created.
  ##
  enabled: false

  ## CI/CD Ingress annotations
  ##
  # annotations:
  #   kubernetes.io/ingress.class: nginx
  #   kubernetes.io/tls-acme: 'true'
  ## CI/CD hostnames must be provided if Ingress is enabled
  ##
  # hosts:
  #   - build.domain.io
  ## CI/CD Ingress TLS configuration secrets
  ## Must be manually created in the namespace
  ##
  # tls:
  #   - secretName: pipeline-cicd-tls
  #     hosts:
  #       - build.domain.io

server:
  ## If not set, it will be autofilled with the cluster host.
  ##
  # host: "https://build.domain.io"

  ## CI/CD server configuration.
  ## Values in here get injected as environment variables.
  ## https://beta.banzaicloud.io/docs/cicd/environment/
  ##
  env:
    CICD_DEBUG: 'true'
    CICD_OPEN: 'true'
    CICD_REPO_CONFIG: '.banzaicloud/pipeline.yaml'
    # CICD_DATABASE_DRIVER: "sqlite3"
    # CICD_DATABASE_DATASOURCE: "/var/lib/cicd/cicd.sqlite"
    ## CI/CD requires some environment variables to bootstrap the
    ## git service or it won't start up.
    ## Uncomment this and add your own custom configuration.
    ##
    # CICD_PROVIDER: "github"
    # CICD_OPEN: "true"
    # CICD_GITHUB: "true"
    # CICD_ORGS: "my-github-org,my-other-github-org"
    # CICD_ADMIN:"admin-1,admin-2"
    # CICD_GITHUB_CLIENT: "github-oauth2-client-id"
    # CICD_GITHUB_SECRET: "github-oauth2-client-secret"

  persistentVolume:
    enabled: true

    ## A manually managed Persistent Volume and Claim
    ## Requires persistence.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    # existingClaim:

    ## Pipeline StateStore data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessModes:
      - ReadWriteOnce

    ## CI/CD server data Persistent Volume existing claim name
    ## Requires server.persistentVolume.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    existingClaim: ''

    ## CI/CD server data Persistent Volume size
    ##
    size: 1Gi

    ## CI/CD server data Persistent Volume annotations
    ##
    annotations: {}
  ## CPU and memory limits for CI/CD server
  ##
  resources: {}
  #  requests:
  #    memory: 32Mi
  #    cpu: 40m
  #  limits:
  #    memory: 2Gi
  #    cpu: 1

##
## MysqlSQL configuration
##
mysql:
  enabled: true
  host: 'mysql'
  port: 3306
  mysqlUser: 'pipeline-rw'
  mysqlDatabase: 'drone'
  existingSecret: 'mysql'

##
## CloudSQL configuration
##
cloudsql:
  enabled: false
  instance: ''
  dbName: 'drone'
  dbUserName: ''
  dbUserPass: ''
  existingSecret: ''
  image:
    repository: gcr.io/cloudsql-docker/gce-proxy
    tag: 1.11
    pullPolicy: IfNotPresent

agent:
  ## CI/CD  agent configuration.
  ## Values in here get injected as environment variables.
  ## https://beta.banzaicloud.io/docs/cicd/environment/
  ##
  env:
    CICD_DEBUG: 'false'
    CICD_MAX_PROCS: '16'

  ## CPU and memory limits for CI/CD agent
  ##
  resources: {}
  #  requests:
  #    memory: 32Mi
  #    cpu: 40m
  #  limits:
  #    memory: 2Gi
  #    cpu: 1

## Uncomment this if you want to set a specific shared secret between
## the agents and servers, otherwise this will be auto-generated.
##
sharedSecret: 'ss'
```

</details>

---

# Pipeline CI/CD

[Pipeline CI/CD](https://beta.banzaicloud.io/docs/cicd/getting_started/ is a Continuous Integration platform built on Kubernetes.

## Installing the Chart

Checkout the repository and execute:

```console
$ cd pipeline-cicd
$ helm upgrade --install cicd . --set global.auth.clientid=$GITHUB_CLIENT_ID --set global.auth.clientsecret=$GITHUB_CLIENT_SECRET
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete --purge cicd
```

The command removes nearly all the Kubernetes components associated with the
chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the chart and their default values.

| Parameter               | Description                                                                                   | Default               |
| ----------------------- | --------------------------------------------------------------------------------------------- | --------------------- |
| `image.repository`      | CI/CD **server** image                                                                        | `banzaicloud/cicd`    |
| `image.tag`             | CI/CD **server** image tag                                                                    | `0.8.1``              |
| `image.pullPolicy`      | CI/CD **server** image pull policy                                                            | `IfNotPresent`        |
| `agentImage.repository` | CI/CD **agent** image                                                                         | `banzaicloud/cicd`    |
| `agentImage.tag`        | CI/CD **agent** image tag                                                                     | `0.8.1`               |
| `agentImage.pullPolicy` | CI/CD **agent** image pull policy                                                             | `IfNotPresent`        |
| `service.httpPort`      | CI/CD's Web GUI HTTP port                                                                     | `80`                  |
| `service.nodePort`      | If `service.type` is `NodePort` and this is non-empty, sets the http node port of the service | `32015`               |
| `service.type`          | Service type (ClusterIP, NodePort or LoadBalancer)                                            | `ClusterIP`           |
| `ingress.enabled`       | Enables Ingress for CI/CD                                                                     | `false`               |
| `ingress.annotations`   | Ingress annotations                                                                           | `{}`                  |
| `ingress.hosts`         | Ingress accepted hostnames                                                                    | `nil`                 |
| `ingress.tls`           | Ingress TLS configuration                                                                     | `[]`                  |
| `server.host`           | CI/CD **server** hostname                                                                     | `(internal hostname)` |
| `server.env`            | CI/CD **server** environment variables                                                        | `(default values)`    |
| `server.resources`      | CI/CD **server** pod resource requests & limits                                               | `{}`                  |
| `agent.env`             | CI/CD **agent** environment variables                                                         | `(default values)`    |
| `agent.resources`       | CI/CD **agent** pod resource requests & limits                                                | `{}`                  |
| `sharedSecret`          | CI/CD server and agent shared secret                                                          | `(random value)`      |
