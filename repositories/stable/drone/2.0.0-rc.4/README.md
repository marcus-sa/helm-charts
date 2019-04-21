# `@helm-charts/stable-drone`

Drone is a Continuous Delivery system built on container technology

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | drone      |
| Chart Version       | 2.0.0-rc.4 |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
images:
  ## The official drone (server) image, change tag to use a different version.
  ## ref: https://hub.docker.com/r/drone/drone/tags/
  ##
  server:
    repository: 'docker.io/drone/drone'
    tag: 1.0.0-rc.4
    pullPolicy: IfNotPresent

  ## The official drone (agent) image, change tag to use a different version.
  ## ref: https://hub.docker.com/r/drone/agent/tags/
  ##
  agent:
    repository: 'docker.io/drone/agent'
    tag: 1.0.0-rc.4
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

  ## Specify a load balancer IP address to use if your provider supports it.
  # loadBalancerIP:

  ## Drone Service annotations
  ##
  # annotations:
  #   service.beta.kubernetes.io/aws-load-balancer-backend-protocol: http
  #   service.beta.kubernetes.io/aws-load-balancer-ssl-cert: arn:aws:acm:xx-xxxx-x:xxxxxxxxxxx:certificate/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx
  #   external-dns.alpha.kubernetes.io/hostname: drone.domain.tld.

  ## set to true if you want to expose drone's GRPC via the service (for external access)
  exposeGRPC: false

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

sourceControl:
  ## your source control provider: github,gitlab,gitea,gogs,bitbucketCloud,bitbucketServer
  provider:
  ## secret containing your source control provider secrets, keys provided below.
  ## if left blank will assume a secret based on the release name of the chart.
  secret:
  ## Fill in the correct values for your chosen source control provider
  ## Any key in this list with the suffix `Key` will be fetched from the
  ## secret named above, if not provided the secret will default to
  ## `<fullName>-source-control`
  github:
    clientID:
    clientSecretKey: clientSecret
    server: https://github.com
  gitlab:
    clientID:
    clientSecretKey: clientSecret
    server:
  gitea:
    server:
  gogs:
    server:
  bitbucketCloud:
    clientID:
    clientSecret: clientSecret
  bitbucketServer:
    server:
    consumerKey: consumerKey
    privateKey: privateKey
    username:
    passwordKey: password

server:
  ## If not set, it will be autofilled with the cluster host.
  ## Host shoud be just the hostname.
  ##
  # host: "drone.domain.io"

  ## protocol should be http or https
  protocol: http

  ## Initial admin user
  ## Leaving this blank may make it impossible to log into drone.
  ## Set to a valid oauth user from your git/oauth server
  ## For more complex user creation you can use env variables below instead.
  adminUser:

  ## Configures Drone to authenticate when cloning public repositories. This is only required
  ## when your source code management system (e.g. GitHub Enterprise) has private mode enabled.
  alwaysAuth: false

  ## Configures drone to use kubernetes to run pipelines rather than agents, if enabled
  ## will not deploy any agents.
  kubernetes:
    ## set to true if you want drone to use kubernetes to run pipelines
    enabled: true
    ## you can run pipeline jobs in another namespace, if you choose to do this
    ## you'll need to create that namespace manually.
    # namespace:
    ## alternative service account to create to create drone pipelines. this account
    ## will be given cluster-admin rights.
    ## if not set the rights will be given to the default drone service account name.
    # pipelineServiceAccount:

  ## Drone server configuration.
  ## Values in here get injected as environment variables.
  ## You can set up remote database servers etc using environment
  ## variables.
  ## ref: https://docs.drone.io/reference/server/
  ##
  env:
    DRONE_LOGS_DEBUG: 'false'
    DRONE_DATABASE_DRIVER: 'sqlite3'
    DRONE_DATABASE_DATASOURCE: '/var/lib/drone/drone.sqlite'

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
  ## ref: https://docs.drone.io/reference/agent/
  ##
  env:
    DRONE_LOGS_DEBUG: 'false'

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
  ## drone agent does not currently have a health endpoint to check against.
  livenessProbe: {}
  readinessProbe: {}

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

[Drone](http://readme.drone.io/) v1 is a Continuous Integration platform built on container technology with native Kubernetes support.

> It is not recommended to upgrade from earlier (0.8.x) versions of Drone due to the large amount of breaking changes both in the product and in the helm charts.

## TL;DR;

```console
helm install stable/drone
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
helm install --name my-release stable/drone
```

> note: The chart will not install the drone server until you have configured a source control option. If this is the case it will print out notes on how to configure it in place using `helm upgrade`.

An example (secrets redacted) working install of the chart using github as the source control provider:

```console
helm install --name drone --namespace drone stable/drone

kubectl create secret generic drone-server-secrets \
      --namespace=cicd-drone \
      --from-literal=clientSecret="XXXXXXXXXXXXXXXXXXXXXXXX"

helm upgrade drone \
  --reuse-values --set 'service.type=LoadBalancer' \
  --set 'service.loadBalancerIP=2.1.60.3' --set 'sourceControl.provider=github' \
  --set 'sourceControl.github.clientID=XXXXXXXX' \
  --set 'sourceControl.secret=drone-server-secrets' --set 'server.host=drone.example.com' \
  stable/drone
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
helm delete --purge my-release
```

The command removes nearly all the Kubernetes components associated with the
chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the drone charts and their default values.

| Parameter                                         | Description                                                                                                                                         | Default                    |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `images.server.repository`                        | Drone **server** image                                                                                                                              | `docker.io/drone/drone`    |
| `images.server.tag`                               | Drone **server** image tag                                                                                                                          | `0.8.9`                    |
| `images.server.pullPolicy`                        | Drone **server** image pull policy                                                                                                                  | `IfNotPresent`             |
| `images.agent.repository`                         | Drone **agent** image                                                                                                                               | `docker.io/drone/agent`    |
| `images.agent.tag`                                | Drone **agent** image tag                                                                                                                           | `0.8.6`                    |
| `images.agent.pullPolicy`                         | Drone **agent** image pull policy                                                                                                                   | `IfNotPresent`             |
| `images.dind.repository`                          | Docker **dind** image                                                                                                                               | `docker.io/library/docker` |
| `images.dind.tag`                                 | Docker **dind** image tag                                                                                                                           | `18.06.1-ce-dind`          |
| `images.dind.pullPolicy`                          | Docker **dind** image pull policy                                                                                                                   | `IfNotPresent`             |
| `service.annotations`                             | Service annotations                                                                                                                                 | `{}`                       |
| `service.httpPort`                                | Drone's Web GUI HTTP port                                                                                                                           | `80`                       |
| `service.nodePort`                                | If `service.type` is `NodePort` and this is non-empty, sets the http node port of the service                                                       | `32015`                    |
| `service.type`                                    | Service type (ClusterIP, NodePort or LoadBalancer)                                                                                                  | `ClusterIP`                |
| `ingress.enabled`                                 | Enables Ingress for Drone                                                                                                                           | `false`                    |
| `ingress.annotations`                             | Ingress annotations                                                                                                                                 | `{}`                       |
| `ingress.hosts`                                   | Ingress accepted hostnames                                                                                                                          | `nil`                      |
| `ingress.tls`                                     | Ingress TLS configuration                                                                                                                           | `[]`                       |
| `sourceControl.provider`                          | name of source control provider [github,gitlab,gitea,gogs,bitbucketCloud,bitbucketServer]                                                           | ``                         |
| `sourceControl.secret`                            | name of secret containing source control keys and passwords                                                                                         | ``                         |
| `sourceControl.github`                            | values to configure github                                                                                                                          | see values.yaml            |
| `sourceControl.gitlab`                            | values to configure gitlab                                                                                                                          | see values.yaml            |
| `sourceControl.gitea`                             | values to configure gitea                                                                                                                           | see values.yaml            |
| `sourceControl.gogs`                              | values to configure gogs                                                                                                                            | see values.yaml            |
| `sourceControl.bitbucketCloud`                    | values to configure bitbucket cloud                                                                                                                 | see values.yaml            |
| `sourceControl.bitbucketServer`                   | values to configure bitbucket server (stash)                                                                                                        | see values.yaml            |
| `server.host`                                     | Drone **server** hostname (should match callback url in oauth config)                                                                               | `(internal hostname)`      |
| `server.protocol`                                 | Drone **server** scheme/protocol [http,https]                                                                                                       | `http`                     |
| `server.env`                                      | Drone **server** environment variables                                                                                                              | `(default values)`         |
| `server.envSecrets`                               | Drone **server** secret environment variables                                                                                                       | `(default values)`         |
| `server.adminUser`                                | Initial user to create and set as admin                                                                                                             | ``                         |
| `server.alwaysAuth`                               | whether to authenticate when cloning public repositories                                                                                            | `false`                    |
| `server.kubernetes.enabled`                       | whether to use kubernetes to run pipelines (if `false` will run agents instead)                                                                     | `true`                     |
| `server.kubernetes.namespace`                     | namespace in which to run pipelines, defaults to release namespace.                                                                                 | ``                         |
| `server.kubernetes.pipelineServiceAccount`        | if rbac is enabled, what should name of pipeline service account be?                                                                                | ``                         |
| `server.annotations`                              | Drone **server** annotations                                                                                                                        | `{}`                       |
| `server.resources`                                | Drone **server** pod resource requests & limits                                                                                                     | `{}`                       |
| `server.schedulerName`                            | Drone **server** alternate scheduler name                                                                                                           | `nil`                      |
| `server.affinity`                                 | Drone **server** scheduling preferences                                                                                                             | `{}`                       |
| `server.nodeSelector`                             | Drone **server** node labels for pod assignment                                                                                                     | `{}`                       |
| `server.extraContainers`                          | Additional sidecar containers                                                                                                                       | `""`                       |
| `server.extraVolumes`                             | Additional volumes for use in extraContainers                                                                                                       | `""`                       |
| `agent.env`                                       | Drone **agent** environment variables                                                                                                               | `(default values)`         |
| `agent.replicas`                                  | Drone **agent** replicas                                                                                                                            | `1`                        |
| `agent.annotations`                               | Drone **agent** annotations                                                                                                                         | `{}`                       |
| `agent.resources`                                 | Drone **agent** pod resource requests & limits                                                                                                      | `{}`                       |
| `agent.schedulerName`                             | Drone **agent** alternate scheduler name                                                                                                            | `nil`                      |
| `agent.affinity`                                  | Drone **agent** scheduling preferences                                                                                                              | `{}`                       |
| `agent.nodeSelector`                              | Drone **agent** node labels for pod assignment                                                                                                      | `{}`                       |
| `agent.livenessProbe`                             | Not currently used.                                                                                                                                 | `{}`                       |
| `agent.readinessProbe`                            | Not currently used                                                                                                                                  | `{}`                       |
| `dind.enabled`                                    | Enable or disable **DinD**                                                                                                                          | `true`                     |
| `dind.driver`                                     | **DinD** storage driver                                                                                                                             | `overlay2`                 |
| `dind.resources`                                  | **DinD** pod resource requests & limits                                                                                                             | `{}`                       |
| `dind.env`                                        | **DinD** environment variables                                                                                                                      | `nil`                      |
| `dind.command`                                    | **DinD** custom command instead of default entry point                                                                                              | `nil`                      |
| `dind.args`                                       | **DinD** arguments for custom command or entry point                                                                                                | `nil`                      |
| `metrics.prometheus.enabled`                      | Enable Prometheus metrics endpoint                                                                                                                  | `false`                    |
| `persistence.enabled`                             | Use a PVC to persist data                                                                                                                           | `true`                     |
| `persistence.existingClaim`                       | Use an existing PVC to persist data                                                                                                                 | `nil`                      |
| `persistence.storageClass`                        | Storage class of backing PVC                                                                                                                        | `nil`                      |
| `persistence.accessMode`                          | Use volume as ReadOnly or ReadWrite                                                                                                                 | `ReadWriteOnce`            |
| `persistence.size`                                | Size of data volume                                                                                                                                 | `1Gi`                      |
| `sharedSecret`                                    | Drone server and agent shared secret (Note: The Default random value changes on every `helm upgrade` causing a rolling update of server and agents) | `(random value)`           |
| `rbac.create`                                     | Specifies whether RBAC resources should be created.                                                                                                 | `true`                     |
| `rbac.apiVersion`                                 | RBAC API version                                                                                                                                    | `v1`                       |
| `serviceAccount.create`                           | Specifies whether a ServiceAccount should be created.                                                                                               | `true`                     |
| `serviceAccount.name`                             | The name of the ServiceAccount to use. If not set and create is true, a name is generated using the fullname template.                              | `(fullname template)`      |
