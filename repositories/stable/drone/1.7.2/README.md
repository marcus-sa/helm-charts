# `@helm-charts/stable-drone`

Drone is a Continuous Delivery system built on container technology

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | drone  |
| Chart Version       | 1.7.2  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
appVersion: '0.8.6'

images:
  ## The official drone (server) image, change tag to use a different version.
  ## ref: https://hub.docker.com/r/drone/drone/tags/
  ##
  server:
    repository: 'docker.io/drone/drone'
    tag: 0.8.6
    pullPolicy: IfNotPresent

  ## The official drone (agent) image, change tag to use a different version.
  ## ref: https://hub.docker.com/r/drone/agent/tags/
  ##
  agent:
    repository: 'docker.io/drone/agent'
    tag: 0.8.6
    pullPolicy: IfNotPresent

  ## The official docker (dind) image, change tag to use a different version.
  ## ref: https://hub.docker.com/r/library/docker/tags/
  ##
  dind:
    repository: 'docker.io/library/docker'
    tag: 18.06.1-ce-dind
    pullPolicy: IfNotPresent

service:
  httpPort: 80

  ## If service.type is not set to NodePort, the following statement
  ## will be ignored.
  ##
  # nodePort: 32015

  ## Service type can be set to ClusterIP, NodePort or LoadBalancer.
  ##
  type: ClusterIP

  ## Drone Service annotations
  ##
  # annotations:
  #   service.beta.kubernetes.io/aws-load-balancer-backend-protocol: http
  #   service.beta.kubernetes.io/aws-load-balancer-ssl-cert: arn:aws:acm:xx-xxxx-x:xxxxxxxxxxx:certificate/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx
  #   external-dns.alpha.kubernetes.io/hostname: drone.domain.tld.

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
  ## Host must be in "<scheme>://<hostname>" format.
  ##
  # host: "https://drone.domain.io"

  ## Drone server configuration.
  ## Values in here get injected as environment variables.
  ## ref: http://readme.drone.io/admin/installation-reference
  ##
  env:
    DRONE_DEBUG: 'false'
    DRONE_DATABASE_DRIVER: 'sqlite3'
    DRONE_DATABASE_DATASOURCE: '/var/lib/drone/drone.sqlite'

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

  ## Secret environment variables are configured in `server.envSecrets`.
  ## Each item in `server.envSecrets` references a Kubernetes Secret.
  ## These Secrets should be created before they are referenced.
  ##
  # envSecrets:
  #   # The name of a Kubernetes Secret
  #   drone-server-secrets:
  #     # A list of Secret keys to include as environment variables
  #     - DRONE_GITHUB_SECRET

  ## Additional server annotations.
  ## ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
  ##
  annotations: {}

  ## CPU and memory limits for drone server
  ##
  resources: {}
  #  requests:
  #    memory: 32Mi
  #    cpu: 40m
  #  limits:
  #    memory: 2Gi
  #    cpu: 1

  ## Use an alternate scheduler, e.g. "stork".
  ## ref: https://kubernetes.io/docs/tasks/administer-cluster/configure-multiple-schedulers/
  ##
  # schedulerName:

  ## Pod scheduling preferences.
  ## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
  ##
  affinity: {}

  ## Node labels for pod assignment
  ## ref: https://kubernetes.io/docs/user-guide/node-selection
  ##
  nodeSelector: {}

  ## additional siecar containers, e. g. for a database proxy, such as Google's cloudsql-proxy.
  ## ex: https://github.com/kubernetes/charts/tree/master/stable/keycloak
  ##
  extraContainers: |

  ## additional volumes, e. g. for secrets used in an extraContainers.
  ##
  extraVolumes: |

agent:
  ## Drone agent configuration.
  ## Values in here get injected as environment variables.
  ## ref: http://readme.drone.io/admin/installation-reference
  ##
  env:
    DRONE_DEBUG: 'false'

  ## Number of drone agent replicas
  replicas: 1

  ## Additional agent annotations.
  ## ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
  ##
  annotations: {}

  ## CPU and memory limits for drone agent
  ##
  resources: {}
  #  requests:
  #    memory: 32Mi
  #    cpu: 40m
  #  limits:
  #    memory: 2Gi
  #    cpu: 1

  ## Liveness and readiness probe values
  ## Ref: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#container-probes
  livenessProbe:
    enabled: true
    failureThreshold: 3
    initialDelaySeconds: 0
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 1
  readinessProbe:
    enabled: true
    failureThreshold: 3
    initialDelaySeconds: 0
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 1

  ## Use an alternate scheduler, e.g. "stork".
  ## ref: https://kubernetes.io/docs/tasks/administer-cluster/configure-multiple-schedulers/
  ##
  # schedulerName:

  ## Pod scheduling preferences.
  ## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
  ##
  affinity: {}

  ## Node labels for pod assignment
  ## ref: https://kubernetes.io/docs/user-guide/node-selection
  ##
  nodeSelector: {}

dind:
  ## Enable or disable DinD
  ## If disabled, the drone agent will spawn docker containers on the host. Pay
  ## attention to the fact that we can't enforce resource constraints in that case.
  ##
  enabled: true

  ## Values in here get injected as environment variables to DinD.
  ## ref: http://readme.drone.io/admin/installation-reference
  ##
  #  env:
  #    DRONE_DEBUG: "false"

  ## Allowing custom command and args to DinD
  ## ref: https://discourse.drone.io/t/docker-mtu-problem/1207
  ##
  #  command: '["/bin/sh"]'
  #  args: '["-c", "dockerd --host=unix:///var/run/docker.sock --host=tcp://127.0.0.1:2375 --mtu=1350"]'

  ## Docker storage driver.
  ## Your DinD instance should be using the same driver as your host.
  ## ref: https://docs.docker.com/engine/userguide/storagedriver/selectadriver/
  ##
  driver: overlay2

  ## CPU and memory limits for dind
  ##
  resources: {}
  #  requests:
  #    memory: 32Mi
  #    cpu: 40m
  #  limits:
  #    memory: 2Gi
  #    cpu: 1

## Enable scraping of the /metrics endpoint for Prometheus
metrics:
  prometheus:
    enabled: false

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true

  ## A manually managed Persistent Volume and Claim
  ## Requires persistence.enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:

  ## rabbitmq data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 1Gi

## Uncomment this if you want to set a specific shared secret between
## the agents and servers, otherwise this will be auto-generated.
##
# sharedSecret: supersecret

rbac:
  ## Specifies whether RBAC resources should be created
  create: true
  ## RBAC api version (v1, v1beta1, or v1alpha1)
  apiVersion: v1

serviceAccount:
  ## Specifies whether a ServiceAccount should be created
  create: true
  ## The name of the ServiceAccount to use.
  ## If not set and create is true, a name is generated using the fullname template
  name:
```

</details>

---

# Drone.io

[Drone](http://readme.drone.io/) is a Continuous Integration platform built on container technology.

## TL;DR;

```console
$ helm install stable/drone
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/drone
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes nearly all the Kubernetes components associated with the
chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the drone charts and their default values.

| Parameter                                  | Description                                                                                                                                         | Default                    |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `images.server.repository`                 | Drone **server** image                                                                                                                              | `docker.io/drone/drone`    |
| `images.server.tag`                        | Drone **server** image tag                                                                                                                          | `0.8.6`                    |
| `images.server.pullPolicy`                 | Drone **server** image pull policy                                                                                                                  | `IfNotPresent`             |
| `images.agent.repository`                  | Drone **agent** image                                                                                                                               | `docker.io/drone/agent`    |
| `images.agent.tag`                         | Drone **agent** image tag                                                                                                                           | `0.8.6`                    |
| `images.agent.pullPolicy`                  | Drone **agent** image pull policy                                                                                                                   | `IfNotPresent`             |
| `images.dind.repository`                   | Docker **dind** image                                                                                                                               | `docker.io/library/docker` |
| `images.dind.tag`                          | Docker **dind** image tag                                                                                                                           | `18.06.1-ce-dind`          |
| `images.dind.pullPolicy`                   | Docker **dind** image pull policy                                                                                                                   | `IfNotPresent`             |
| `service.annotations`                      | Service annotations                                                                                                                                 | `{}`                       |
| `service.httpPort`                         | Drone's Web GUI HTTP port                                                                                                                           | `80`                       |
| `service.nodePort`                         | If `service.type` is `NodePort` and this is non-empty, sets the http node port of the service                                                       | `32015`                    |
| `service.type`                             | Service type (ClusterIP, NodePort or LoadBalancer)                                                                                                  | `ClusterIP`                |
| `ingress.enabled`                          | Enables Ingress for Drone                                                                                                                           | `false`                    |
| `ingress.annotations`                      | Ingress annotations                                                                                                                                 | `{}`                       |
| `ingress.hosts`                            | Ingress accepted hostnames                                                                                                                          | `nil`                      |
| `ingress.tls`                              | Ingress TLS configuration                                                                                                                           | `[]`                       |
| `server.host`                              | Drone **server** scheme and hostname                                                                                                                | `(internal hostname)`      |
| `server.env`                               | Drone **server** environment variables                                                                                                              | `(default values)`         |
| `server.envSecrets`                        | Drone **server** secret environment variables                                                                                                       | `(default values)`         |
| `server.annotations`                       | Drone **server** annotations                                                                                                                        | `{}`                       |
| `server.resources`                         | Drone **server** pod resource requests & limits                                                                                                     | `{}`                       |
| `server.schedulerName`                     | Drone **server** alternate scheduler name                                                                                                           | `nil`                      |
| `server.affinity`                          | Drone **server** scheduling preferences                                                                                                             | `{}`                       |
| `server.nodeSelector`                      | Drone **server** node labels for pod assignment                                                                                                     | `{}`                       |
| `server.extraContainers`                   | Additional sidecar containers                                                                                                                       | `""`                       |
| `server.extraVolumes`                      | Additional volumes for use in extraContainers                                                                                                       | `""`                       |
| `agent.env`                                | Drone **agent** environment variables                                                                                                               | `(default values)`         |
| `agent.replicas`                           | Drone **agent** replicas                                                                                                                            | `1`                        |
| `agent.annotations`                        | Drone **agent** annotations                                                                                                                         | `{}`                       |
| `agent.resources`                          | Drone **agent** pod resource requests & limits                                                                                                      | `{}`                       |
| `agent.schedulerName`                      | Drone **agent** alternate scheduler name                                                                                                            | `nil`                      |
| `agent.affinity`                           | Drone **agent** scheduling preferences                                                                                                              | `{}`                       |
| `agent.nodeSelector`                       | Drone **agent** node labels for pod assignment                                                                                                      | `{}`                       |
| `agent.livenessProbe.initialDelaySeconds`  | Delay before liveness probe is initiated                                                                                                            | 0                          |
| `agent.livenessProbe.periodSeconds`        | How often to perform the probe                                                                                                                      | 10                         |
| `agent.livenessProbe.timeoutSeconds`       | When the probe times out                                                                                                                            | 1                          |
| `agent.livenessProbe.successThreshold`     | Minimum consecutive successes for the probe to be considered successful after having failed.                                                        | 1                          |
| `agent.livenessProbe.failureThreshold`     | Minimum consecutive failures for the probe to be considered failed after having succeeded.                                                          | 3                          |
| `agent.readinessProbe.initialDelaySeconds` | Delay before readiness probe is initiated                                                                                                           | 0                          |
| `agent.readinessProbe.periodSeconds`       | How often to perform the probe                                                                                                                      | 10                         |
| `agent.readinessProbe.timeoutSeconds`      | When the probe times out                                                                                                                            | 1                          |
| `agent.readinessProbe.successThreshold`    | Minimum consecutive successes for the probe to be considered successful after having failed.                                                        | 1                          |
| `agent.readinessProbe.failureThreshold`    | Minimum consecutive failures for the probe to be considered failed after having succeeded.                                                          | 3                          |
| `dind.enabled`                             | Enable or disable **DinD**                                                                                                                          | `true`                     |
| `dind.driver`                              | **DinD** storage driver                                                                                                                             | `overlay2`                 |
| `dind.resources`                           | **DinD** pod resource requests & limits                                                                                                             | `{}`                       |
| `dind.env`                                 | **DinD** environment variables                                                                                                                      | `nil`                      |
| `dind.command`                             | **DinD** custom command instead of default entry point                                                                                              | `nil`                      |
| `dind.args`                                | **DinD** arguments for custom command or entry point                                                                                                | `nil`                      |
| `metrics.prometheus.enabled`               | Enable Prometheus metrics endpoint                                                                                                                  | `false`                    |
| `persistence.enabled`                      | Use a PVC to persist data                                                                                                                           | `true`                     |
| `persistence.existingClaim`                | Use an existing PVC to persist data                                                                                                                 | `nil`                      |
| `persistence.storageClass`                 | Storage class of backing PVC                                                                                                                        | `nil`                      |
| `persistence.accessMode`                   | Use volume as ReadOnly or ReadWrite                                                                                                                 | `ReadWriteOnce`            |
| `persistence.size`                         | Size of data volume                                                                                                                                 | `1Gi`                      |
| `sharedSecret`                             | Drone server and agent shared secret (Note: The Default random value changes on every `helm upgrade` causing a rolling update of server and agents) | `(random value)`           |
| `rbac.create`                              | Specifies whether RBAC resources should be created.                                                                                                 | `true`                     |
| `rbac.apiVersion`                          | RBAC API version                                                                                                                                    | `v1`                       |
| `serviceAccount.create`                    | Specifies whether a ServiceAccount should be created.                                                                                               | `true`                     |
| `serviceAccount.name`                      | The name of the ServiceAccount to use. If not set and create is true, a name is generated using the fullname template.                              | `(fullname template)`      |
