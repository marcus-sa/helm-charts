# `@helm-charts/incubator-drone`

Drone CI

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | drone     |
| Chart Version       | 0.1.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
appVersion: '0.8.1'

## The official drone image, change tag to use a different version.
## https://hub.docker.com/r/drone/drone/tags/
##
image:
  repository: 'docker.io/drone/drone'
  tag: '0.8.1'
  pullPolicy: 'IfNotPresent'

## Since version 8.x drone splitted agent and server into two
## different images.
##
## NOTE: Older versions of drone are **not** supported.
## https://hub.docker.com/r/drone/agent/tags/
##
agentImage:
  repository: 'docker.io/drone/agent'
  tag: '0.8.1'
  pullPolicy: 'IfNotPresent'

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
  ## If true, Drone Ingress will be created.
  ##
  enabled: false

  ## Drone Ingress annotations
  ##
  # annotations:
  #   kubernetes.io/ingress.class: nginx
  #   kubernetes.io/tls-acme: 'true'
  ## Drone hostnames must be provided if Ingress is enabled
  ##
  # hosts:
  #   - drone.domain.io
  ## Drone Ingress TLS configuration secrets
  ## Must be manually created in the namespace
  ##
  # tls:
  #   - secretName: drone-tls
  #     hosts:
  #       - drone.domain.io

server:
  ## If not set, it will be autofilled with the cluster host.
  ##
  # host: "https://drone.domain.io"

  ## Drone server configuration.
  ## Values in here get injected as environment variables.
  ## http://readme.drone.io/admin/installation-reference
  ##
  env:
    DRONE_DEBUG: 'false'
    DRONE_DATABASE_DRIVER: 'sqlite3'
    DRONE_DATABASE_DATASOURCE: 'drone.sqlite'

    ## Drone requires some environment variables to bootstrap the
    ## git service or it won't start up.
    ## Uncomment this and add your own custom configuration.
    ##
    # DRONE_PROVIDER: "github"
    # DRONE_OPEN: "true"
    # DRONE_GITHUB: "true"
    # DRONE_ORGS: "my-github-org,my-other-github-org"
    # DRONE_ADMIN:"admin-1,admin-2"
    # DRONE_GITHUB_CLIENT: "github-oauth2-client-id"
    # DRONE_GITHUB_SECRET: "github-oauth2-client-secret"

  ## CPU and memory limits for drone server
  ##
  resources: {}
  #  requests:
  #    memory: 32Mi
  #    cpu: 40m
  #  limits:
  #    memory: 2Gi
  #    cpu: 1

agent:
  ## Drone agent configuration.
  ## Values in here get injected as environment variables.
  ## http://readme.drone.io/admin/installation-reference
  ##
  env:
    DRONE_DEBUG: 'false'

  ## CPU and memory limits for drone agent
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
# sharedSecret: supersecret
```

</details>

---

# Drone.io

[Drone](http://readme.drone.io/) is a Continuous Integration platform built on container technology.

## TL;DR;

```console
$ helm install incubator/drone
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release incubator/drone
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes nearly all the Kubernetes components associated with the
chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the drone charts and their default values.

| Parameter               | Description                                                                                   | Default                 |
| ----------------------- | --------------------------------------------------------------------------------------------- | ----------------------- |
| `image.repository`      | Drone **server** image                                                                        | `docker.io/drone/drone` |
| `image.tag`             | Drone **server** image tag                                                                    | `0.8.1`                 |
| `image.pullPolicy`      | Drone **server** image pull policy                                                            | `IfNotPresent`          |
| `agentImage.repository` | Drone **agent** image                                                                         | `docker.io/drone/agent` |
| `agentImage.tag`        | Drone **agent** image tag                                                                     | `0.8.1`                 |
| `agentImage.pullPolicy` | Drone **agent** image pull policy                                                             | `IfNotPresent`          |
| `service.httpPort`      | Drone's Web GUI HTTP port                                                                     | `80`                    |
| `service.nodePort`      | If `service.type` is `NodePort` and this is non-empty, sets the http node port of the service | `32015`                 |
| `service.type`          | Service type (ClusterIP, NodePort or LoadBalancer)                                            | `ClusterIP`             |
| `ingress.enabled`       | Enables Ingress for Drone                                                                     | `false`                 |
| `ingress.annotations`   | Ingress annotations                                                                           | `{}`                    |
| `ingress.hosts`         | Ingress accepted hostnames                                                                    | `nil`                   |
| `ingress.tls`           | Ingress TLS configuration                                                                     | `[]`                    |
| `server.host`           | Drone **server** hostname                                                                     | `(internal hostname)`   |
| `server.env`            | Drone **server** environment variables                                                        | `(default values)`      |
| `server.resources`      | Drone **server** pod resource requests & limits                                               | `{}`                    |
| `agent.env`             | Drone **agent** environment variables                                                         | `(default values)`      |
| `agent.resources`       | Drone **agent** pod resource requests & limits                                                | `{}`                    |
| `sharedSecret`          | Drone server and agent shared secret                                                          | `(random value)`        |
