# `@helm-charts/stable-ambassador`

A Helm chart for Datawire Ambassador

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | ambassador |
| Chart Version       | 1.1.0      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for ambassador.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1
daemonSet: false

ambassador:
  id: default

namespace:
  single: false
  # name: default

# Additional container environment variable
env:
  {}
  # Exposing statistics via StatsD
  # STATSD_ENABLED: true
  # STATSD_HOST: statsd-sink
  # sets the minimum number of seconds between Envoy restarts
  # AMBASSADOR_RESTART_TIME: 15
  # sets the number of seconds that the Envoy will wait for open connections to drain on a restart
  # AMBASSADOR_DRAIN_TIME: 5
  # sets the number of seconds that Ambassador will wait for the old Envoy to clean up and exit on a restart
  # AMBASSADOR_SHUTDOWN_TIME: 10
  # sets the number of seconds that Ambassador will wait for the old Envoy to clean up and exit on a restart
  # AMBASSADOR_SINGLE_NAMESPACE: true

imagePullSecrets: []

securityContext:
  runAsUser: 8888

image:
  repository: quay.io/datawire/ambassador
  tag: 0.50.1
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

service:
  type: LoadBalancer

  # Note that target http ports need to match your ambassador configurations service_port
  # https://www.getambassador.io/reference/modules/#the-ambassador-module
  http:
    enabled: true
    port: 80
    targetPort: 8080
    # nodePort: 30080

  https:
    enabled: true
    port: 443
    targetPort: 8443
    # nodePort: 30443

  annotations:
    getambassador.io/config: |
      ---
      apiVersion: ambassador/v1
      kind: Module
      name: ambassador
      config:
        service_port: 8080
  #       diagnostics:
  #         enabled: false
  # externalTrafficPolicy:
  # loadBalancerSourceRanges:
  #   - YOUR_IP_RANGE

adminService:
  create: true
  type: ClusterIP
  port: 8877
  # NodePort used if type is NodePort
  # nodePort: 38877

rbac:
  # Specifies whether RBAC resources should be created
  create: true
  namespaced: false

serviceAccount:
  # Specifies whether a service account should be created
  create: true
  # The name of the service account to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

volumes: []

volumeMounts: []

podAnnotations:
  {}
  # prometheus.io/scrape: "true"
  # prometheus.io/port: "9102"

resources:
  {}
  # If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}

# Enabling the prometheus exporter creates a sidecar and configures ambassador to use it
prometheusExporter:
  enabled: false
  repository: prom/statsd-exporter
  tag: v0.8.1
  pullPolicy: IfNotPresent
  # You can configure the statsd exporter to modify the behavior of mappings and other features.
  # See documentation: https://github.com/prometheus/statsd_exporter/tree/v0.8.1#metric-mapping-and-configuration
  # Uncomment the following line if you wish to specify a custom configuration:
  # configuration: |
  #   ---
  #   mappings:
  #   - match: 'envoy.cluster.*.upstream_cx_connect_ms'
  #     name: "envoy_cluster_upstream_cx_connect_time"
  #     timer_type: 'histogram'
  #     labels:
  #       cluster_name: "$1"

ambassadorConfig: ''
```

</details>

---

# Ambassador

Ambassador is an open source, Kubernetes-native [microservices API gateway](https://www.getambassador.io/about/microservices-api-gateways) built on the [Envoy Proxy](https://www.envoyproxy.io/).

## TL;DR;

```console
$ helm install stable/ambassador
```

## Introduction

This chart bootstraps an [Ambassador](https://www.getambassador.io) deployment on
a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.7+

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/ambassador
```

The command deploys Ambassador API gateway on the Kubernetes cluster in the default configuration.
The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete --purge my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Ambassador chart and their default values.

| Parameter                       | Description                                                                     | Default                       |
| ------------------------------- | ------------------------------------------------------------------------------- | ----------------------------- |
| `adminService.create`           | If `true`, create a service for Ambassador's admin UI                           | `true`                        |
| `adminService.nodePort`         | If explicit NodePort for admin service is required                              | `true`                        |
| `adminService.type`             | Ambassador's admin service type to be used                                      | `ClusterIP`                   |
| `ambassador.id`                 | Set the identifier of the Ambassador instance                                   | `default`                     |
| `ambassadorConfig`              | Config thats mounted to `/ambassador/ambassador-config`                         | `""`                          |
| `daemonSet`                     | If `true`, Create a daemonSet. By default Deployment controller will be created | `false`                       |
| `env`                           | Any additional environment variables for ambassador pods                        | `{}`                          |
| `image.pullPolicy`              | Image pull policy                                                               | `IfNotPresent`                |
| `image.repository`              | Image                                                                           | `quay.io/datawire/ambassador` |
| `image.tag`                     | Image tag                                                                       | `0.50.1`                      |
| `imagePullSecrets`              | Image pull secrets                                                              | `[]`                          |
| `namespace.name`                | Set the `AMBASSADOR_NAMESPACE` environment variable                             | `metadata.namespace`          |
| `podAnnotations`                | Additional annotations for ambassador pods                                      | `{}`                          |
| `prometheusExporter.enabled`    | Prometheus exporter side-car enabled                                            | `false`                       |
| `prometheusExporter.pullPolicy` | Image pull policy                                                               | `IfNotPresent`                |
| `prometheusExporter.repository` | Prometheus exporter image                                                       | `prom/statsd-exporter`        |
| `prometheusExporter.tag`        | Prometheus exporter image                                                       | `v0.8.1`                      |
| `rbac.create`                   | If `true`, create and use RBAC resources                                        | `true`                        |
| `rbac.namespaced`               | If `true`, permissions are namespace-scoped rather than cluster-scoped          | `false`                       |

| `replicaCount` | Number of Ambassador replicas | `1` |
| `resources` | CPU/memory resource requests/limits | `{}` |
| `securityContext` | Set security context for pod | `{ "runAsUser": "8888" }` |
| `service.annotations` | Annotations to apply to Ambassador service | `{"getambassador.io/config":"---\napiVersion: ambassador/v1\nkind: Module\nname: ambassador\nconfig:\n service_port: 8080"}` |
| `service.externalTrafficPolicy` | Sets the external traffic policy for the service | `""` |
| `service.http.enabled` | if port 80 should be opened for service | `true` |
| `service.http.nodePort` | If explicit NodePort is required | None |
| `service.http.port` | if port 443 should be opened for service | `true` |
| `service.http.targetPort` | Sets the targetPort that maps to the service's cleartext port | `8080` |
| `service.https.enabled` | if port 443 should be opened for service | `true` |
| `service.https.nodePort` | If explicit NodePort is required | None |
| `service.https.port` | if port 443 should be opened for service | `true` |
| `service.https.targetPort` | Sets the targetPort that maps to the service's TLS port | `8443` |
| `service.loadBalancerIP` | IP address to assign (if cloud provider supports it) | `""` |
| `service.loadBalancerSourceRanges` | Passed to cloud provider load balancer if created (e.g: AWS ELB) | None |
| `service.type` | Service type to be used | `LoadBalancer` |
| `serviceAccount.create` | If `true`, create a new service account | `true` |
| `serviceAccount.name` | Service account to be used | `ambassador` |
| `volumeMounts` | Volume mounts for the ambassador service | `[]` |
| `volumes` | Volumes for the ambassador service | `[]` |

**NOTE:** Make sure the configured `service.http.targetPort` and `service.https.targetPort` ports match your [Ambassador Module's](https://www.getambassador.io/reference/modules/#the-ambassador-module) `service_port` and `redirect_cleartext_from` configurations.

If you intend to use `service.annotations`, remember to include the annotation key, for example:

```
service:
  type: LoadBalancer

  http:
    port: 80
    targetPort: 8080

  annotations:
    getambassador.io/config: |
      ---
      apiVersion: ambassador/v1
      kind: Module
      name: ambassador
      config:
        redirect_cleartext_from: 8080
```

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm upgrade --install --wait my-release \
    --set adminService.type=NodePort \
    stable/ambassador
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm upgrade --install --wait my-release -f values.yaml stable/ambassador
```

---

# Upgrading

## Migrating from `datawire/ambassador` chart (chart version 0.40.0 or 0.50.0)

Chart now runs ambassador as non-root by default, so you might need to update your ambassador module config to match this.

### Timings

Timings values have been removed in favor of setting the env variables using `env??

| Parameter         | Env variables              |
| ----------------- | -------------------------- |
| `timing.restart`  | `AMBASSADOR_RESTART_TIME`  |
| `timing.drain`    | `AMBASSADOR_DRAIN_TIME`    |
| `timing.shutdown` | `AMBASSADOR_SHUTDOWN_TIME` |

### Single namespace

| Parameter          | Env variables                 |
| ------------------ | ----------------------------- |
| `namespace.single` | `AMBASSADOR_SINGLE_NAMESPACE` |

### Renamed values

Service ports values have changed names and target ports have new defaults.

| Previous parameter          | New parameter              | New default value |
| --------------------------- | -------------------------- | ----------------- |
| `service.enableHttp`        | `service.http.enabled`     |                   |
| `service.httpPort`          | `service.http.port`        |                   |
| `service.httpNodePort`      | `service.http.nodePort`    |                   |
| `service.targetPorts.http`  | `service.http.targetPort`  | `8080`            |
| `service.enableHttps`       | `service.https.enabled`    |                   |
| `service.httpsPort`         | `service.https.port`       |                   |
| `service.httpsNodePort`     | `service.https.nodePort`   |                   |
| `service.targetPorts.https` | `service.https.targetPort` | `8443`            |

### Exporter sidecar

Pre version `0.50.0` ambassador was using socat and required a sidecar to export statsd metrics. In `0.50.0` ambassador no longer uses socat and doesn't need a sidecar anymore to export its statsd metrics. Statsd metrics are disabled by default and can be enabled by setting environment `STATSD_ENABLED`, this will (in 0.50) send metrics to a service named `statsd-sink`, if you want to send it to another service or namespace it can be changed by setting `STATSD_HOST`

If you are using prometheus the chart allows you to enable a sidecar which can export to prometheus see the `prometheusExporter` values.
