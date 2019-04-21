# `@helm-charts/incubator-haproxy-ingress`

Ingress controller implementation for haproxy loadbalancer.

| Field               | Value           |
| ------------------- | --------------- |
| Repository Name     | incubator       |
| Chart Name          | haproxy-ingress |
| Chart Version       | 0.0.11          |
| NPM Package Version | 0.1.0           |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Enable RBAC
rbac:
  create: true
  security:
    enable: false

# Create ServiceAccount
serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

controller:
  name: controller
  image:
    repository: quay.io/jcmoraisjr/haproxy-ingress
    tag: 'v0.7.1'
    pullPolicy: IfNotPresent

  ## Additional command line arguments to pass to haproxy-ingress-controller
  ## E.g. to specify the default SSL certificate you can use
  ## extraArgs:
  ##   default-ssl-certificate: "<namespace>/<secret_name>"
  ##   reload-strategy: "reusesocket"
  extraArgs: {}

  ## Additional environment variables to set
  extraEnvs: []
  # extraEnvs:
  #   - name: FOO
  #     valueFrom:
  #       secretKeyRef:
  #         key: FOO
  #         name: secret-resource

  ## Additional containers that can initialize the pod.
  initContainers: []

  # custom haproxy template
  template: ''

  ## Required only if defaultBackend.enabled = false
  ## Must be <namespace>/<service_name>
  ##
  defaultBackendService: ''

  ## Name of the ingress class to route through this controller
  ##
  ingressClass: haproxy

  healthzPort: 10253

  ## Liveness and readiness probe values
  ## Ref: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#container-probes
  ##
  livenessProbe:
    path: /healthz
    port: 10253
    failureThreshold: 3
    initialDelaySeconds: 10
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 1
  readinessProbe:
    path: /healthz
    port: 10253
    failureThreshold: 3
    initialDelaySeconds: 10
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 1

  ## Annotations to be added to controller pods
  ##
  podAnnotations: {}

  ## Labels to be added to the controller pods
  ##
  podLabels: {}

  ## Affinity to be added to controller pods
  ##
  podAffinity: {}

  ## Priority Class to be used
  ##
  priorityClassName: ''

  ## Security context settings to be added to the controller pods
  ##
  securityContext: {}
  #  sysctls:
  #  - name: net.ipv4.ip_local_port_range
  #    value: "1024 65535"

  # ConfigMap to configure haproxy ingress
  config: {}

  # Required for use with CNI based kubernetes installations (such as ones set up by kubeadm),
  # since CNI and hostport don't mix yet. Can be deprecated once https://github.com/kubernetes/kubernetes/issues/23920
  # is merged
  hostNetwork: false

  # Optionally change this to ClusterFirstWithHostNet in case you have 'hostNetwork: true'.
  # By default, while using host network, name resolution uses the host's DNS. If you wish nginx-controller
  # to keep resolving names inside the k8s network, use ClusterFirstWithHostNet.
  dnsPolicy: ClusterFirst

  ## DaemonSet or Deployment
  ##
  kind: Deployment

  # TCP service key:value pairs
  # <port>: <namespace>/<servicename>:<portnumber>[:[<in-proxy>][:<out-proxy>]]
  # https://github.com/jcmoraisjr/haproxy-ingress/tree/v0.6#tcp-services-configmap
  tcp: {}
  #  8080: "default/example-tcp-svc:9000"

  # optionally disable static ports, including the default 80 and 443
  enableStaticPorts: true

  ## Use host ports 80 and 443
  daemonset:
    useHostPort: false

    hostPorts:
      http: 80
      https: 443
      # List of ports from controller.tcp map
      tcp: []

  # The update strategy to apply to the Deployment or DaemonSet
  ##
  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1

  # minReadySeconds to avoid killing pods before we are ready
  ##
  minReadySeconds: 0

  # Deployment
  replicaCount: 1

  # PodDisruptionBudget
  minAvailable: 1

  resources: {}
  #  limits:
  #    cpu: 100m
  #    memory: 64Mi
  #  requests:
  #    cpu: 100m
  #    memory: 64Mi

  autoscaling:
    enabled: false
    #  minReplicas: 1
    #  maxReplicas: 11
    #  targetCPUUtilizationPercentage: 50
    #  targetMemoryUtilizationPercentage: 50
    customMetrics: []

  ## Node tolerations for server scheduling to nodes with taints
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
  ##
  tolerations: []
  #  - key: "key"
  #    operator: "Equal|Exists"
  #    value: "value"
  #    effect: "NoSchedule|PreferNoSchedule|NoExecute(1.6 only)"

  affinity: {}

  ## Node labels for controller pod assignment
  ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
  ##
  nodeSelector: {}

  accessLogsSidecar: true

  service:
    annotations: {}
    labels: {}
    clusterIP: ''

    ## List of IP addresses at which the controller services are available
    ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
    ##
    externalIPs: []

    loadBalancerIP: ''
    loadBalancerSourceRanges: []

    httpPorts:
      - port: 80
      # nodePort:
    httpsPorts:
      - port: 443
      # nodePort:

    ## Set external traffic policy to: "Local" to preserve source IP on
    ## providers supporting it
    ## Ref: https://kubernetes.io/docs/tutorials/services/source-ip/#source-ip-for-services-with-typeloadbalancer
    externalTrafficPolicy: ''

    healthCheckNodePort: 0

    type: LoadBalancer

  stats:
    enabled: false
    port: 1936

    service:
      annotations: {}
      clusterIP: ''

      ## List of IP addresses at which the stats service is available
      ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
      ##
      externalIPs: []

      loadBalancerIP: ''
      loadBalancerSourceRanges: []
      servicePort: 1936
      type: ClusterIP

  ## If controller.stats.enabled = true and controller.metrics.enabled = true, Prometheus metrics will be exported
  ##
  metrics:
    enabled: false

    # prometheus exporter for haproxy
    # https://github.com/prometheus/haproxy_exporter
    # (scrapes the stats port and exports metrics to prometheus)
    image:
      repository: quay.io/prometheus/haproxy-exporter
      tag: 'v0.9.0'
      pullPolicy: IfNotPresent

    service:
      annotations: {}
      # prometheus.io/scrape: "true"
      # prometheus.io/port: "10254"

      clusterIP: ''

      ## List of IP addresses at which the stats-exporter service is available
      ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
      ##
      externalIPs: []

      loadBalancerIP: ''
      loadBalancerSourceRanges: []
      servicePort: 9101
      type: ClusterIP

# Default 404 backend
defaultBackend:
  ## If false, controller.defaultBackendService must be provided
  ##
  enabled: true

  name: default-backend
  image:
    repository: gcr.io/google_containers/defaultbackend
    tag: '1.0'
    pullPolicy: IfNotPresent

  ## Node tolerations for server scheduling to nodes with taints
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
  ##
  tolerations: []
  #  - key: "key"
  #    operator: "Equal|Exists"
  #    value: "value"
  #    effect: "NoSchedule|PreferNoSchedule|NoExecute(1.6 only)"

  affinity: {}

  ## Node labels for default backend pod assignment
  ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
  ##
  nodeSelector: {}

  ## Annotations to be added to default backend pods
  ##
  podAnnotations: {}

  # labels to add to the pod container metadata
  podLabels: {}
  #  key: value

  # Deployment
  replicaCount: 1

  # PodDisruptionBudget
  minAvailable: 1

  resources:
    limits:
      cpu: 10m
      memory: 20Mi
  # requests:
  #   cpu: 10m
  #   memory: 20Mi

  service:
    name: ingress-default-backend
    annotations: {}
    clusterIP: ''

    ## List of IP addresses at which the default backend service is available
    ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
    ##
    externalIPs: []

    loadBalancerIP: ''
    loadBalancerSourceRanges: []
    servicePort: 8080
    type: ClusterIP
```

</details>

---

# haproxy-ingress

[haproxy-ingress](https://github.com/jcmoraisjr/haproxy-ingress) is an Ingress controller that uses ConfigMap to store the global haproxy configuration, and ingress annotations to configure per-backend settings.

## Introduction

This chart bootstraps an haproxy-ingress deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release incubator/haproxy-ingress
```

The command deploys haproxy-ingress on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete --purge my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the haproxy-ingress chart and their default values.

| Parameter                                                  | Description                                                                                                                                                                                      | Default                                   |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| `rbac.create`                                              | If true, create & use RBAC resources                                                                                                                                                             | `true`                                    |
| `rbac.security.enable`                                     | If true, and rbac.create is true, create & use PSP resources                                                                                                                                     | `false`                                   |
| `serviceAccount.create`                                    | If true, create serviceAccount                                                                                                                                                                   | `true`                                    |
| `serviceAccount.name`                                      | ServiceAccount to be used                                                                                                                                                                        | ``                                        |
| `controller.name`                                          | name of the controller component                                                                                                                                                                 | `controller`                              |
| `controller.image.repository`                              | controller container image repository                                                                                                                                                            | `quay.io/jcmoraisjr/haproxy-ingress`      |
| `controller.image.tag`                                     | controller container image tag                                                                                                                                                                   | `v0.7.1`                                  |
| `controller.image.pullPolicy`                              | controller container image pullPolicy                                                                                                                                                            | `IfNotPresent`                            |
| `controller.initContainers`                                | extra containers that can initialize the haproxy-ingress-controller                                                                                                                              | `[]`                                      |
| `controller.extraArgs`                                     | extra command line arguments for the haproxy-ingress-controller                                                                                                                                  | `{}`                                      |
| `controller.extraEnv`                                      | extra environment variables for the haproxy-ingress-controller                                                                                                                                   | `{}`                                      |
| `controller.template`                                      | custom template for haproxy-ingress-controller                                                                                                                                                   | `{}`                                      |
| `controller.defaultBackendService`                         | backend service if defualtBackend.enabled==false                                                                                                                                                 | `""`                                      |
| `controller.ingressClass`                                  | name of the ingress class to route through this controller                                                                                                                                       | `happroxy`                                |
| `controller.healthzPort`                                   | The haproxy health check (monitoring) port                                                                                                                                                       | `10253`                                   |
| `controller.livenessProbe.path`                            | The liveness probe path                                                                                                                                                                          | `/healthz`                                |
| `controller.livenessProbe.port`                            | The livneness probe port                                                                                                                                                                         | `10253`                                   |
| `controller.livenessProbe.failureThreshold`                | The livneness probe failure threshold                                                                                                                                                            | `3`                                       |
| `controller.livenessProbe.initialDelaySeconds`             | The livneness probe initial delay (in seconds)                                                                                                                                                   | `10`                                      |
| `controller.livenessProbe.periodSeconds`                   | The livneness probe period (in seconds)                                                                                                                                                          | `10`                                      |
| `controller.livenessProbe.successThreshold`                | The livneness probe success threshold                                                                                                                                                            | `1`                                       |
| `controller.livenessProbe.timeoutSeconds`                  | The livneness probe timeout (in seconds)                                                                                                                                                         | `1`                                       |
| `controller.readinessProbe.path`                           | The readiness probe path                                                                                                                                                                         | `/healthz`                                |
| `controller.readinessProbe.port`                           | The readiness probe port                                                                                                                                                                         | `10253`                                   |
| `controller.readinessProbe.failureThreshold`               | The readiness probe failure threshold                                                                                                                                                            | `3`                                       |
| `controller.readinessProbe.initialDelaySeconds`            | The readiness probe initial delay (in seconds)                                                                                                                                                   | `10`                                      |
| `controller.readinessProbe.periodSeconds`                  | The readiness probe period (in seconds)                                                                                                                                                          | `10`                                      |
| `controller.readinessProbe.successThreshold`               | The readiness probe success threshold                                                                                                                                                            | `1`                                       |
| `controller.readinessProbe.timeoutSeconds`                 | The readiness probe timeout (in seconds)                                                                                                                                                         | `1`                                       |
| `controller.podAnnotations`                                | Annotations for the haproxy-ingress-conrtoller pod                                                                                                                                               | `{}`                                      |
| `controller.podLabels`                                     | Labels for the haproxy-ingress-conrtoller pod                                                                                                                                                    | `{}`                                      |
| `controller.podAffinity`                                   | Add affinity to the controller pods to control scheduling                                                                                                                                        | `{}`                                      |
| `controller.priorityClassName`                             | Priority Class to be used                                                                                                                                                                        | ``                                        |
| `controller.securityContext`                               | Security context settings for the haproxy-ingress-conrtoller pod                                                                                                                                 | `{}`                                      |
| `controller.config`                                        | additional haproxy-ingress [ConfigMap entries](https://github.com/jcmoraisjr/haproxy-ingress/blob/v0.6/README.md#configmap)                                                                      | `{}`                                      |
| `controller.hostNetwork`                                   | Optionally set to true when using CNI based kubernetes installations                                                                                                                             | `false`                                   |
| `controller.dnsPolicy`                                     | Optionally change this to ClusterFirstWithHostNet in case you have 'hostNetwork: true'                                                                                                           | `ClusterFirst`                            |
| `controller.kind`                                          | Type of deployment, DaemonSet or Deployment                                                                                                                                                      | `Deployment`                              |
| `controller.tcp`                                           | TCP [service ConfigMap](https://github.com/jcmoraisjr/haproxy-ingress/blob/v0.6/README.md#tcp-services-configmap): `<port>: <namespace>/<servicename>:<portnumber>[:[<in-proxy>][:<out-proxy>]]` | `{}`                                      |
| `controller.enableStaticPorts`                             | Set to `false` to only rely on ports from `controller.tcp`                                                                                                                                       | `true`                                    |
| `controller.daemonset.useHostPort`                         | Set to true to use host ports 80 and 443                                                                                                                                                         | `false`                                   |
| `controller.daemonset.hostPorts.http`                      | If `controller.daemonset.useHostPort` is `true` and this is non-empty sets the hostPort for http                                                                                                 | `"80"`                                    |
| `controller.daemonset.hostPorts.https`                     | If `controller.daemonset.useHostPort` is `true` and this is non-empty sets the hostPort for https                                                                                                | `"443"`                                   |
| `controller.daemonset.hostPorts.tcp`                       | If `controller.daemonset.useHostPort` is `true` use hostport for these ports from `tcp`                                                                                                          | `[]`                                      |
| `controller.updateStrategy`                                | the update strategy settings                                                                                                                                                                     | _see defaults below_                      |
| `controller.updateStrategy.type`                           | the update strategy type to use                                                                                                                                                                  | `RollingUpdate`                           |
| `controller.updateStrategy.rollingUpdate.maxUnavailable`   | the max number of unavailable controllers when doing rolling updates                                                                                                                             | `1`                                       |
| `controller.minReadySeconds`                               | seconds to avoid killing pods before we are ready                                                                                                                                                | `0`                                       |
| `controller.replicaCount`                                  | the number of replicas to deploy (when `controller.kind` is `Deployment`)                                                                                                                        | `1`                                       |
| `controller.minAvailable`                                  | PodDisruptionBudget minimum available controller pods                                                                                                                                            | `1`                                       |
| `controller.resources`                                     | controller pod resource requests & limits                                                                                                                                                        | `{}`                                      |
| `controller.autoscaling.enabled`                           | enabling controller horizontal pod autoscaling (when `controller.kind` is `Deployment`)                                                                                                          | `false`                                   |
| `controller.autoscaling.minReplicas`                       | minimum number of replicas                                                                                                                                                                       |
| `controller.autoscaling.maxReplicas`                       | maximum number of replicas                                                                                                                                                                       |
| `controller.autoscaling.targetCPUUtilizationPercentage`    | target cpu utilization                                                                                                                                                                           |
| `controller.autoscaling.targetMemoryUtilizationPercentage` | target memory utilization                                                                                                                                                                        |
| `controller.autoscaling.customMetrics`                     | Extra custom metrics to add to the HPA                                                                                                                                                           | `[]`                                      |
| `controller.tolerations`                                   | to control scheduling to servers with taints                                                                                                                                                     | `[]`                                      |
| `controller.affinity`                                      | to control scheduling                                                                                                                                                                            | `{}`                                      |
| `controller.nodeSelector`                                  | to control scheduling                                                                                                                                                                            | `{}`                                      |
| `controller.accessLogsSidecar`                             | enable a sidecar container that collects access logs from haproxy and outputs to stdout                                                                                                          | `true`                                    |
| `controller.service.annotations`                           | annotations for controller service                                                                                                                                                               | `{}`                                      |
| `controller.service.labels`                                | labels for controller service                                                                                                                                                                    | `{}`                                      |
| `controller.service.clusterIP`                             | internal controller cluster service IP                                                                                                                                                           | `""`                                      |
| `controller.service.externalTrafficPolicy`                 | external traffic policy                                                                                                                                                                          | `Cluster`                                 |
| `controller.service.externalIPs`                           | list of IP addresses at which the controller services are available                                                                                                                              | `[]`                                      |
| `controller.service.loadBalancerIP`                        | IP address to assign to load balancer (if supported)                                                                                                                                             | `""`                                      |
| `controller.service.loadBalancerSourceRanges`              |                                                                                                                                                                                                  | `[]`                                      |
| `controller.service.httpPorts`                             | The http ports to open, that map to the Ingress' port 80. Each entry specifies a `port` and an optional `nodePort`.                                                                              | `[ port: 80 ]`                            |
| `controller.service.httpsPorts`                            | The https ports to open, that map to the Ingress' port 443. Each entry specifies a `port` and an optional `nodePort`.                                                                            | `[ port: 443 ]`                           |
| `controller.service.type`                                  | type of controller service to create                                                                                                                                                             | `LoadBalancer`                            |
| `controller.stats.enabled`                                 | whether to enable exporting stats                                                                                                                                                                | `false`                                   |
| `controller.stats.port`                                    | The port number used haproxy-ingress-controller for haproxy statistics                                                                                                                           | `1936`                                    |
| `controller.stats.service.annotations`                     | annotations for stats service                                                                                                                                                                    | `{}`                                      |
| `controller.stats.service.clusterIP`                       | internal stats cluster service IP                                                                                                                                                                | `""`                                      |
| `controller.stats.service.externalIPs`                     | list of IP addresses at which the stats service is available                                                                                                                                     | `[]`                                      |
| `controller.stats.service.loadBalancerIP`                  | IP address to assign to load balancer (if supported)                                                                                                                                             | `""`                                      |
| `controller.stats.service.loadBalancerSourceRanges`        |                                                                                                                                                                                                  | `[]`                                      |
| `controller.stats.service.servicePort`                     | the port number exposed by the stats service                                                                                                                                                     | `1936`                                    |
| `controller.stats.service.type`                            | type of controller service to create                                                                                                                                                             | `ClusterIP`                               |
| `controller.metrics.enabled`                               | If `controller.stats.enabled = true` and `controller.metrics.enabled = true`, Prometheus metrics will be exported                                                                                | `false`                                   |
| `controller.metrics.image.repository`                      | prometheus exporter container image repository                                                                                                                                                   | `quay.io/prometheus/haproxy-exporter`     |
| `controller.metrics.image.tag`                             | prometheus exporter image tag                                                                                                                                                                    | `v0.9.0`                                  |
| `controller.metrics.image.pullPolicy`                      | prometheus exporter image pullPolicy                                                                                                                                                             | `IfNotPresent`                            |
| `controller.metrics.service.annotations`                   | annotations for metrics service                                                                                                                                                                  | `{}`                                      |
| `controller.metrics.service.clusterIP`                     | internal metrics cluster service IP                                                                                                                                                              | `""`                                      |
| `controller.metrics.service.externalIPs`                   | list of IP addresses at which the metrics service is available                                                                                                                                   | `[]`                                      |
| `controller.metrics.service.loadBalancerIP`                | IP address to assign to load balancer (if supported)                                                                                                                                             | `""`                                      |
| `controller.metrics.service.loadBalancerSourceRanges`      |                                                                                                                                                                                                  | `[]`                                      |
| `controller.metrics.service.servicePort`                   | the port number exposed by the metrics service                                                                                                                                                   | `1936`                                    |
| `controller.metrics.service.type`                          | type of controller service to create                                                                                                                                                             | `ClusterIP`                               |
| `defaultBackend.enabled`                                   | whether to use the default backend component                                                                                                                                                     | `true`                                    |
| `defaultBackend.name`                                      | name of the default backend component                                                                                                                                                            | `default-backend`                         |
| `defaultBackend.image.repository`                          | default backend container image repository                                                                                                                                                       | `gcr.io/google_containers/defaultbackend` |
| `defaultBackend.image.tag`                                 | default backend container image repository tag                                                                                                                                                   | `1.0`                                     |
| `defaultBackend.image.pullPolicy`                          | default backend container image pullPolicy                                                                                                                                                       | `IfNotPresent`                            |
| `defaultBackend.tolerations`                               | to control scheduling to servers with taints                                                                                                                                                     | `[]`                                      |
| `defaultBackend.affinity`                                  | to control scheduling                                                                                                                                                                            | `{}`                                      |
| `defaultBackend.nodeSelector`                              | to control scheduling                                                                                                                                                                            | `{}`                                      |
| `defaultBackend.podAnnotations`                            | Annotations for the default backend pod                                                                                                                                                          | `{}`                                      |
| `defaultBackend.podLabels`                                 | Labels for the default backend pod                                                                                                                                                               | `{}`                                      |
| `defaultBackend.replicaCount`                              | the number of replicas to deploy (when `controller.kind` is `Deployment`)                                                                                                                        | `1`                                       |
| `defaultBackend.minAvailable`                              | PodDisruptionBudget minimum available default backend pods                                                                                                                                       | `1`                                       |
| `defaultBackend.resources`                                 | default backend pod resources                                                                                                                                                                    | _see defaults below_                      |
| `defaultBackend.resources.limits.cpu`                      | default backend cpu resources limit                                                                                                                                                              | `10m`                                     |
| `defaultBackend.resources.limits.memory`                   | default backend memory resources limit                                                                                                                                                           | `20Mi`                                    |
| `defaultBackend.service.name`                              | name of default backend service to create                                                                                                                                                        | `ingress-default-backend`                 |
| `defaultBackend.service.annotations`                       | annotations for metrics service                                                                                                                                                                  | `{}`                                      |
| `defaultBackend.service.clusterIP`                         | internal metrics cluster service IP                                                                                                                                                              | `""`                                      |
| `defaultBackend.service.externalIPs`                       | list of IP addresses at which the metrics service is available                                                                                                                                   | `[]`                                      |
| `defaultBackend.service.loadBalancerIP`                    | IP address to assign to load balancer (if supported)                                                                                                                                             | `""`                                      |
| `defaultBackend.service.loadBalancerSourceRanges`          |                                                                                                                                                                                                  | `[]`                                      |
| `defaultBackend.service.servicePort`                       | the port number exposed by the metrics service                                                                                                                                                   | `1936`                                    |
| `defaultBackend.service.type`                              | type of controller service to create                                                                                                                                                             | `ClusterIP`                               |
