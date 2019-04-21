# `@helm-charts/stable-rabbitmq-ha`

Highly available RabbitMQ cluster, the open source message broker software that implements the Advanced Message Queuing Protocol (AMQP).

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | stable      |
| Chart Name          | rabbitmq-ha |
| Chart Version       | 1.11.1      |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## RabbitMQ application credentials
## Ref: http://rabbitmq.com/access-control.html
##
rabbitmqUsername: guest
# rabbitmqPassword:

## RabbitMQ Management user used for health checks
managementUsername: management
managementPassword: E9R3fjZm4ejFkVFE

## Place any additional key/value configuration to add to rabbitmq.conf
## Ref: https://www.rabbitmq.com/configure.html#config-items
extraConfig: |
#  queue_master_locator = min-masters

## Sets the policies in definitions.json. This can be used to control the high
## availability of queues by mirroring them to multiple nodes.
## Ref: https://www.rabbitmq.com/ha.html
policies: |-
#  {
#    "name": "ha-all",
#    "pattern": ".*",
#    "vhost": "/",
#    "definition": {
#      "ha-mode": "all",
#      "ha-sync-mode": "automatic",
#      "ha-sync-batch-size": 1
#    }
#  }

## RabbitMQ default VirtualHost
## Ref: https://www.rabbitmq.com/vhosts.html
##
rabbitmqVhost: '/'

## Erlang cookie to determine whether different nodes are allowed to communicate with each other
## Ref: https://www.rabbitmq.com/clustering.html
##
# rabbitmqErlangCookie:

## RabbitMQ Memory high watermark
## Ref: http://www.rabbitmq.com/memory.html
##
rabbitmqMemoryHighWatermark: 256MB
rabbitmqMemoryHighWatermarkType: absolute

## EPMD port for peer discovery service used by RabbitMQ nodes and CLI tools
## Ref: https://www.rabbitmq.com/clustering.html
##
rabbitmqEpmdPort: 4369

## Node port
rabbitmqNodePort: 5672

## Manager port
rabbitmqManagerPort: 15672

## Set to true to precompile parts of RabbitMQ with HiPE, a just-in-time
## compiler for Erlang. This will increase server throughput at the cost of
## increased startup time. You might see 20-50% better performance at the cost
## of a few minutes delay at startup.
rabbitmqHipeCompile: false

## SSL certificates
## Red: http://www.rabbitmq.com/ssl.html
rabbitmqCert:
  enabled: false

  # Specifies an existing secret to be used for SSL Certs
  existingSecret: ''

  ## Create a new secret using these values
  cacertfile: |
  certfile: |
  keyfile: |

## Authentication mechanism
## Ref: http://www.rabbitmq.com/authentication.html
rabbitmqAuth:
  enabled: false

  config: |
    # auth_mechanisms.1 = PLAIN
    # auth_mechanisms.2 = AMQPLAIN
    # auth_mechanisms.3 = EXTERNAL

## Authentication backend
## Ref: https://github.com/rabbitmq/rabbitmq-auth-backend-http
rabbitmqAuthHTTP:
  enabled: false

  config: |
    # auth_backends.1 = http
    # auth_http.user_path     = http://some-server/auth/user
    # auth_http.vhost_path    = http://some-server/auth/vhost
    # auth_http.resource_path = http://some-server/auth/resource
    # auth_http.topic_path    = http://some-server/auth/topic

## LDAP Plugin
## Ref: http://www.rabbitmq.com/ldap.html
rabbitmqLDAPPlugin:
  enabled: false

  ## LDAP configuration:
  config: |
    # auth_backends.1 = ldap
    # auth_ldap.servers.1  = my-ldap-server
    # auth_ldap.user_dn_pattern = cn=${username},ou=People,dc=example,dc=com
    # auth_ldap.use_ssl    = false
    # auth_ldap.port       = 389
    # auth_ldap.log        = false

## MQTT Plugin
## Ref: http://www.rabbitmq.com/mqtt.html
rabbitmqMQTTPlugin:
  enabled: false

  ## MQTT configuration:
  config: |
    # mqtt.default_user     = guest
    # mqtt.default_pass     = guest
    # mqtt.allow_anonymous  = true

## Web MQTT Plugin
## Ref: http://www.rabbitmq.com/web-mqtt.html
rabbitmqWebMQTTPlugin:
  enabled: false

  ## Web MQTT configuration:
  config: |
    # web_mqtt.ssl.port       = 12345
    # web_mqtt.ssl.backlog    = 1024
    # web_mqtt.ssl.certfile   = /etc/cert/cacert.pem
    # web_mqtt.ssl.keyfile    = /etc/cert/cert.pem
    # web_mqtt.ssl.cacertfile = /etc/cert/key.pem
    # web_mqtt.ssl.password   = changeme

## STOMP Plugin
## Ref: http://www.rabbitmq.com/stomp.html
rabbitmqSTOMPPlugin:
  enabled: false

  ## STOMP configuration:
  config: |
    # stomp.default_user = guest
    # stomp.default_pass = guest

## Web STOMP Plugin
## Ref: http://www.rabbitmq.com/web-stomp.html
rabbitmqWebSTOMPPlugin:
  enabled: false

  ## Web STOMP configuration:
  config: |
    # web_stomp.ws_frame = binary
    # web_stomp.cowboy_opts.max_keepalive = 10

## AMQPS support
## Ref: http://www.rabbitmq.com/ssl.html
rabbitmqAmqpsSupport:
  enabled: false

  # NodePort
  amqpsNodePort: 5671

  # SSL configuration
  config: |
    # listeners.ssl.default             = 5671
    # ssl_options.cacertfile            = /etc/cert/cacert.pem
    # ssl_options.certfile              = /etc/cert/cert.pem
    # ssl_options.keyfile               = /etc/cert/key.pem
    # ssl_options.verify                = verify_peer
    # ssl_options.fail_if_no_peer_cert  = false

## Number of replicas
replicaCount: 3

image:
  repository: rabbitmq
  tag: 3.7-alpine
  pullPolicy: IfNotPresent
  ## Optionally specify an array of imagePullSecrets.
  ## Secrets must be manually created in the namespace.
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  ##
  # pullSecrets:
  #   - myRegistrKeySecretName

## Duration in seconds the pod needs to terminate gracefully
terminationGracePeriodSeconds: 10

service:
  annotations: {}
  clusterIP: None

  ## List of IP addresses at which the service is available
  ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
  ##
  externalIPs: []

  loadBalancerIP: ''
  loadBalancerSourceRanges: []
  type: ClusterIP

## Statefulsets rolling update update strategy
## Ref: https://kubernetes.io/docs/tutorials/stateful-application/basic-stateful-set/#rolling-update
##
updateStrategy: OnDelete

## Statefulsets Pod Priority
## Ref: https://kubernetes.io/docs/concepts/configuration/pod-priority-preemption/#priorityclass
## priorityClassName: ""

## We usually recommend not to specify default resources and to leave this as
## a conscious choice for the user. This also increases chances charts run on
## environments with little resources, such as Minikube. If you do want to
## specify resources, uncomment the following lines, adjust them as necessary,
## and remove the curly braces after 'resources:'.
## If you decide to set the memory limit, make sure to also change the
## rabbitmqMemoryHighWatermark following the formula:
##   rabbitmqMemoryHighWatermark = 0.4 * resources.limits.memory
##
resources:
  {}
  # limits:
  #   cpu: 100mm
  #   memory: 1Gi
  # requests:
  #   cpu: 100mm
  #   memory: 1Gi
initContainer:
  resources: {}
  #   limits:
  #     cpu: 100mm
  #     memory: 128Mi
  #   requests:
  #     cpu: 100mm
  #     memory: 128Mi

## Data Persistency
persistentVolume:
  enabled: false
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  name: data
  accessModes:
    - ReadWriteOnce
  size: 8Gi
  annotations: {}

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
##
nodeSelector: {}

## Node tolerations for pod assignment
## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#taints-and-tolerations-beta-feature
##
tolerations: []

## Extra Annotations to be added to pod
podAnnotations: {}

## Pod affinity
## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
podAntiAffinity: soft

## Create default configMap
##
existingConfigMap: false

## Add additional labels to all resources
##
extraLabels: {}

## Role Based Access
## Ref: https://kubernetes.io/docs/admin/authorization/rbac/
##
rbac:
  create: true

## Service Account
## Ref: https://kubernetes.io/docs/admin/service-accounts-admin/
##
serviceAccount:
  create: true
  ## The name of the ServiceAccount to use.
  ## If not set and create is true, a name is generated using the fullname template
  # name:

ingress:
  ## Set to true to enable ingress record generation
  enabled: false

  path: /

  ## The list of hostnames to be covered with this ingress record.
  ## Most likely this will be just one host, but in the event more hosts are needed, this is an array
  ## hostName: foo.bar.com

  ## Set this to true in order to enable TLS on the ingress record
  tls: false

  ## If TLS is set to true, you must declare what secret will store the key/certificate for TLS
  tlsSecret: myTlsSecret

  ## Ingress annotations done as key:value pairs
  annotations:
  #  kubernetes.io/ingress.class: nginx

livenessProbe:
  initialDelaySeconds: 120
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6

readinessProbe:
  failureThreshold: 6
  initialDelaySeconds: 20
  timeoutSeconds: 3
  periodSeconds: 5

# Specifies an existing secret to be used for RMQ password and Erlang Cookie
existingSecret: ''

prometheus:
  ## Configures Prometheus Exporter to expose and scrape stats.
  exporter:
    enabled: false
    env: {}
    image:
      repository: kbudde/rabbitmq-exporter
      tag: v0.28.0
      pullPolicy: IfNotPresent

    ## Port Prometheus scrapes for metrics
    port: 9090
    ## Comma-separated list of extended scraping capabilities supported by the target RabbitMQ server
    capabilities: 'bert,no_sort'

    ## Allow overriding of container resources
    resources:
      {}
      # limits:
      #   cpu: 200m
      #   memory: 1Gi
      # requests:
      #   cpu: 100m
      #   memory: 100Mi

  ## Prometheus is using Operator.  Setting to true will create Operator specific resources like ServiceMonitors and Alerts
  operator:
    ## Are you using Prometheus Operator? [Blog Post](https://coreos.com/blog/the-prometheus-operator.html)
    enabled: true

    ## Configures Alerts, which will be setup via Prometheus Operator / ConfigMaps.
    alerts:
      ## Prometheus exporter must be enabled as well
      enabled: true

      ## Selector must be configured to match Prometheus Install, defaulting to whats done by Prometheus Operator
      ## See [CoreOS Prometheus Chart](https://github.com/coreos/prometheus-operator/tree/master/helm)
      selector:
        role: alert-rules
      labels: {}

    serviceMonitor:
      ## Interval at which Prometheus scrapes RabbitMQ Exporter
      interval: 10s

      # Namespace Prometheus is installed in
      namespace: monitoring

      ## Defaults to whats used if you follow CoreOS [Prometheus Install Instructions](https://github.com/coreos/prometheus-operator/tree/master/helm#tldr)
      ## [Prometheus Selector Label](https://github.com/coreos/prometheus-operator/blob/master/helm/prometheus/templates/prometheus.yaml#L65)
      ## [Kube Prometheus Selector Label](https://github.com/coreos/prometheus-operator/blob/master/helm/kube-prometheus/values.yaml#L298)
      selector:
        prometheus: kube-prometheus
```

</details>

---

# RabbitMQ High Available

[RabbitMQ](https://www.rabbitmq.com) is an open source message broker software
that implements the Advanced Message Queuing Protocol (AMQP).

## TL;DR;

```bash
$ helm install stable/rabbitmq-ha
```

## Introduction

This chart bootstraps a [RabbitMQ](https://hub.docker.com/r/_/rabbitmq)
deployment on a [Kubernetes](http://kubernetes.io) cluster using the
[Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.5+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/rabbitmq-ha
```

The command deploys RabbitMQ on the Kubernetes cluster in the default
configuration. The [configuration](#configuration) section lists the parameters
that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Upgrading the Chart

To upgrade the chart, you need to make sure that you are using the same value
of the `rabbitmqErlangCookie` amongst the releases. If you didn't define it at
the first place, you can upgrade using the following command:

```
$ export ERLANGCOOKIE=$(kubectl get secrets -n <NAMESPACE> <HELM_RELEASE_NAME>-rabbitmq-ha -o jsonpath="{.data.rabbitmq-erlang-cookie}" | base64 --decode)
$ helm upgrade \
    --set rabbitmqErlangCookie=$ERLANGCOOKIE \
    <HELM_RELEASE_NAME> stable/rabbitmq-ha
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and
deletes the release.

## Configuration

The following table lists the configurable parameters of the RabbitMQ chart
and their default values.

| Parameter                                      | Description                                                                                                                                                                                           | Default                                                  |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `existingConfigMap`                            | Use an existing ConfigMap                                                                                                                                                                             | `false`                                                  |
| `existingSecret`                               | Use an existing secret for password & erlang cookie                                                                                                                                                   | `""`                                                     |
| `extraConfig`                                  | Additional configuration to add to default configmap                                                                                                                                                  | ``                                                       |
| `image.pullPolicy`                             | Image pull policy                                                                                                                                                                                     | `Always` if `image` tag is `latest`, else `IfNotPresent` |
| `image.repository`                             | RabbitMQ container image repository                                                                                                                                                                   | `rabbitmq`                                               |
| `image.tag`                                    | RabbitMQ container image tag                                                                                                                                                                          | `3.7-alpine`                                             |
| `image.pullSecrets`                            | Specify docker-registry secret names as an array                                                                                                                                                      | `[]`                                                     |
| `managementPassword`                           | Management user password. Should be changed from default                                                                                                                                              | `E9R3fjZm4ejFkVFE`                                       |
| `managementUsername`                           | Management user with minimal permissions used for health checks                                                                                                                                       | `management`                                             |
| `nodeSelector`                                 | Node labels for pod assignment                                                                                                                                                                        | `{}`                                                     |
| `persistentVolume.accessMode`                  | Persistent volume access modes                                                                                                                                                                        | `[ReadWriteOnce]`                                        |
| `persistentVolume.annotations`                 | Persistent volume annotations                                                                                                                                                                         | `{}`                                                     |
| `persistentVolume.enabled`                     | If `true`, persistent volume claims are created                                                                                                                                                       | `false`                                                  |
| `persistentVolume.name`                        | Persistent volume name                                                                                                                                                                                | `data`                                                   |
| `persistentVolume.size`                        | Persistent volume size                                                                                                                                                                                | `8Gi`                                                    |
| `persistentVolume.storageClass`                | Persistent volume storage class                                                                                                                                                                       | `-`                                                      |
| `podAntiAffinity`                              | Pod antiaffinity, `hard` or `soft`                                                                                                                                                                    | `hard`                                                   |
| `policies`                                     | HA policies to add to definitions.json                                                                                                                                                                | ``                                                       |
| `prometheus.exporter.enabled`                  | Configures Prometheus Exporter to expose and scrape stats                                                                                                                                             | `false`                                                  |
| `prometheus.exporter.env`                      | Environment variables to set for Exporter container                                                                                                                                                   | `{}`                                                     |
| `prometheus.exporter.image.repository`         | Prometheus Exporter repository                                                                                                                                                                        | `kbudde/rabbitmq-exporter`                               |
| `prometheus.exporter.image.tag`                | Image Tag                                                                                                                                                                                             | `v0.28.0`                                                |
| `prometheus.exporter.image.pullPolicy`         | Image Pull Policy                                                                                                                                                                                     | `IfNotPresent`                                           |
| `prometheus.exporter.port`                     | Port Prometheus scrapes for metrics                                                                                                                                                                   | `9090`                                                   |
| `prometheus.exporter.capabilities`             | Comma-separated list of extended scraping capabilities supported by the target RabbitMQ server. [Click here for details.](https://github.com/kbudde/rabbitmq_exporter#extended-rabbitmq-capabilities) | `bert,no_sort`                                           |
| `prometheus.exporter.resources`                | Resource Limits for Prometheus Exporter                                                                                                                                                               | `{}`                                                     |
| `prometheus.operator.enabled`                  | Are you using Prometheus Operator? [Blog Post](https://coreos.com/blog/the-prometheus-operator.html)                                                                                                  | `true`                                                   |
| `prometheus.operator.alerts.enabled`           | Create default Alerts for RabbitMQ                                                                                                                                                                    | `true`                                                   |
| `prometheus.operator.alerts.selector`          | Selector to find ConfigMaps and create Prometheus Alerts                                                                                                                                              | `alert-rules`                                            |
| `prometheus.operator.alerts.labels`            | Labels to add to Alerts                                                                                                                                                                               | `{}`                                                     |
| `prometheus.operator.serviceMonitor.interval`  | How often Prometheus Scrapes metrics                                                                                                                                                                  | `10s`                                                    |
| `prometheus.operator.serviceMonitor.namespace` | Namespace which Prometheus is installed                                                                                                                                                               | `monitoring`                                             |
| `prometheus.operator.serviceMonitor.selector`  | Label Selector for Prometheus to find ServiceMonitors                                                                                                                                                 | `{ prometheus: kube-prometheus }`                        |
| `rabbitmqCert.enabled`                         | Mount a Secret container certificates                                                                                                                                                                 | `false`                                                  |
| `rabbitmqCert.cacertfile`                      | base64 encoded CA certificate (overwrites existing Secret)                                                                                                                                            | ``                                                       |
| `rabbitmqCert.certfile`                        | base64 encoded server certificate (overwrites existing Secret)                                                                                                                                        | ``                                                       |
| `rabbitmqCert.existingSecret`                  | Name of an existing `Secret` to mount for amqps                                                                                                                                                       | `""`                                                     |
| `rabbitmqCert.keyfile`                         | base64 encoded server private key (overwrites existing Secret)                                                                                                                                        | ``                                                       |
| `rabbitmqEpmdPort`                             | EPMD port used for cross cluster replication                                                                                                                                                          | `4369`                                                   |
| `rabbitmqErlangCookie`                         | Erlang cookie                                                                                                                                                                                         | _random 32 character long alphanumeric string_           |
| `rabbitmqHipeCompile`                          | Precompile parts of RabbitMQ using HiPE                                                                                                                                                               | `false`                                                  |
| `rabbitmqMQTTPlugin.config`                    | MQTT configuration                                                                                                                                                                                    | ``                                                       |
| `rabbitmqMQTTPlugin.enabled`                   | Enable MQTT plugin                                                                                                                                                                                    | `false`                                                  |
| `rabbitmqManagerPort`                          | RabbitMQ Manager port                                                                                                                                                                                 | `15672`                                                  |
| `rabbitmqMemoryHighWatermark`                  | Memory high watermark                                                                                                                                                                                 | `256MB`                                                  |
| `rabbitmqMemoryHighWatermarkType`              | Memory high watermark type. Either absolute or relative                                                                                                                                               | `absolute`                                               |
| `rabbitmqNodePort`                             | Node port                                                                                                                                                                                             | `5672`                                                   |
| `rabbitmqPassword`                             | RabbitMQ application password                                                                                                                                                                         | _random 10 character long alphanumeric string_           |
| `rabbitmqSTOMPPlugin.config`                   | STOMP configuration                                                                                                                                                                                   | ``                                                       |
| `rabbitmqSTOMPPlugin.enabled`                  | Enable STOMP plugin                                                                                                                                                                                   | `false`                                                  |
| `rabbitmqUsername`                             | RabbitMQ application username                                                                                                                                                                         | `guest`                                                  |
| `rabbitmqVhost`                                | RabbitMQ application vhost                                                                                                                                                                            | `/`                                                      |
| `rabbitmqWebMQTTPlugin.config`                 | MQTT over websocket configuration                                                                                                                                                                     | ``                                                       |
| `rabbitmqWebMQTTPlugin.enabled`                | Enable MQTT over websocket plugin                                                                                                                                                                     | `false`                                                  |
| `rabbitmqWebSTOMPPlugin.config`                | STOMP over websocket configuration                                                                                                                                                                    | ``                                                       |
| `rabbitmqWebSTOMPPlugin.enabled`               | Enable STOMP over websocket plugin                                                                                                                                                                    | `false`                                                  |
| `rbac.create`                                  | If true, create & use RBAC resources                                                                                                                                                                  | `true`                                                   |
| `replicaCount`                                 | Number of replica                                                                                                                                                                                     | `3`                                                      |
| `resources`                                    | CPU/Memory resource requests/limits                                                                                                                                                                   | `{}`                                                     |
| `serviceAccount.create`                        | Create service account                                                                                                                                                                                | `true`                                                   |
| `serviceAccount.name`                          | Service account name to use                                                                                                                                                                           | _name of the release_                                    |
| `service.annotations`                          | Annotations to add to the service                                                                                                                                                                     | `{}`                                                     |
| `service.clusterIP`                            | IP address to assign to the service                                                                                                                                                                   | `None`                                                   |
| `service.externalIPs`                          | Service external IP addresses                                                                                                                                                                         | `[]`                                                     |
| `service.loadBalancerIP`                       | IP address to assign to load balancer (if supported)                                                                                                                                                  | `""`                                                     |
| `service.loadBalancerSourceRanges`             | List of IP CIDRs allowed access to load balancer (if supported)                                                                                                                                       | `[]`                                                     |
| `service.type`                                 | Type of service to create                                                                                                                                                                             | `ClusterIP`                                              |
| `tolerations`                                  | Toleration labels for pod assignment                                                                                                                                                                  | `[]`                                                     |
| `podAnnotations`                               | Extra annotations to add to pod                                                                                                                                                                       | `{}`                                                     |
| `terminationGracePeriodSeconds`                | Duration pod needs to terminate gracefully                                                                                                                                                            | `10`                                                     |
| `updateStrategy`                               | Statefulset update strategy                                                                                                                                                                           | `OnDelete`                                               |
| `priorityClassName`                            | Statefulsets Pod Priority                                                                                                                                                                             | ``                                                       |
| `extraLabels`                                  | Labels to add to the Resources                                                                                                                                                                        | `{}`                                                     |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set rabbitmqUsername=admin,rabbitmqPassword=secretpassword,rabbitmqErlangCookie=secretcookie \
    stable/rabbitmq-ha
```

The above command sets the RabbitMQ admin username and password to `admin` and
`secretpassword` respectively. Additionally the secure erlang cookie is set to
`secretcookie`.

Alternatively, a YAML file that specifies the values for the parameters can be
provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/rabbitmq-ha
```

> **Tip**: You can use the default [values.yaml](values.yaml)

### Custom ConfigMap

When creating a new chart with this chart as a dependency, `existingConfigMap`
can be used to override the default [configmap.yaml](templates/configmap.yaml)
provided. It also allows for providing additional configuration files that will
be mounted into `/etc/rabbitmq`. In the parent chart's values.yaml, set the
value to true and provide the file [templates/configmap.yaml][] for your use
case.

Example of using RabbitMQ definition to setup users, permissions or policies:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-release-rabbitmq-ha
data:
  enabled_plugins: |
    [
      rabbitmq_consistent_hash_exchange,
      rabbitmq_federation,
      rabbitmq_federation_management,
      rabbitmq_management,
      rabbitmq_peer_discovery_k8s,
      rabbitmq_shovel,
      rabbitmq_shovel_management
    ].
  rabbitmq.conf: |
    # ....
    management.load_definitions = /etc/rabbitmq/definitions.json
  definitions.json: |
    {
      "permissions": [],
      "users": [],
      "policies: []
    }
```

Then, install the chart with the above configuration:

```
$ helm install --name my-release --set existingConfigMap=true stable/rabbitmq-ha
```

### Custom Secret

Similar to custom ConfigMap, `existingSecret` can be used to override the default secret.yaml provided, and
`rabbitmqCert.existingSecret` can be used to override the default certificates.

### Prometheus Monitoring & Alerts

Prometheus and its features can be enabled by setting `prometheus.enabled` to `true`. See values.yaml for more details and configuration options
