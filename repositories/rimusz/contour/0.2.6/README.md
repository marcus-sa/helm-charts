# `@helm-charts/rimusz-contour`

A Helm chart for Heptio Contour

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | rimusz  |
| Chart Name          | contour |
| Chart Version       | 0.2.6   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for contour.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

# Contour Deployment specific annotations
annotations:
  prometheus.io/scrape: 'true'
  prometheus.io/port: '9001'
  prometheus.io/path: '/stats'
  prometheus.io/format: 'prometheus'

controller:
  image:
    repository: gcr.io/heptio-images/contour
    # Note that by default we use appVersion to get images tag
    # tag:
    pullPolicy: IfNotPresent
  # Enable statsd metrics
  statsd:
    enabled: false
  stats:
    {}
    # address: 0.0.0.0
    # port: 8002

proxy:
  image:
    repository: docker.io/envoyproxy/envoy-alpine
    tag: v1.7.0
    pullPolicy: IfNotPresent

service:
  type: LoadBalancer
  loadBalancerIP: ''
  # Contour specific Service annotations
  annotations: {}
  # This annotation puts the AWS ELB into "TCP" mode so that it does not
  # do HTTP negotiation for HTTPS connections at the ELB edge.
  # The downside of this is the remote IP address of all connections will
  # appear to be the internal address of the ELB. See docs/proxy-proto.md
  # for information about enabling the PROXY protocol on the ELB to recover
  # the original remote IP address.
  # service.beta.kubernetes.io/aws-load-balancer-backend-protocol: tcp

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

# RBAC manifests management
rbac:
  enabled: true

nodeSelector: {}

tolerations: {}

# Enable and set Pod Disruption Budget
podDisruptionBudget:
  enabled: false
  maxUnavailable: 1
  minAvailable: null
```

</details>

---

# Heptio Contour

[Heptio Contour](https://github.com/heptio/contour) is an Ingress controller for Kubernetes that works by deploying the [Envoy proxy](https://www.envoyproxy.io/) as a reverse proxy and load balancer.
Unlike other Ingress controllers, Contour supports dynamic configuration updates out of the box while maintaining a lightweight profile.

## Prerequisites

- Kubernetes 1.10+
- RBAC must be enabled.

## Installing the Chart

To install the chart with the release name `contour`:

```console
$ helm upgrade --install contour --namespace heptio-contour rimusz/contour
```

By default `contour` uses `LoadBalancer` to expose ports 80/443. You can change the `service type` via `--set` or in `values.yaml` file.

> **Tip**: List all releases using `helm list`

## Configuration

The following table lists the configurable parameters of the `Contour` chart and their default values.

| Parameter                            | Description                                        | Default                             |
| ------------------------------------ | -------------------------------------------------- | ----------------------------------- |
| `replicaCount`                       | Default replicaCount                               | `1`                                 |
| `annotationsprometheus.io/scrape`    | Enable Prometheus scrape                           | `true`                              |
| `annotationsprometheus.io/port`      | Set Prometheus scrape port                         | `9001`                              |
| `annotationsprometheus.io/path`      | Set Prometheus scrape path                         | `stats`                             |
| `annotationsprometheus.io/format`    | Set Prometheus scrape format                       | `prometheus`                        |
| `controller.image.repository`        | Set Controller image repository                    | `gcr.io/heptio-images/contour`      |
| `controller.image.PullPolicy`        | Set Controller image pull policy                   | `IfNotPresent`                      |
| `controller.statsd.enabled`          | Enable Controller `statsd`                         | `false`                             |
| `controller.stats`                   | Set Controller `stats`                             | `{}`                                |
| `proxy.image.repository`             | Set Proxy image repository                         | `docker.io/envoyproxy/envoy-alpine` |
| `proxy.image.tag`                    | Set Proxy image tag                                | `v1.8.0`                            |
| `proxy.image.PullPolicy`             | Set Proxy image pull policy                        | `IfNotPresent`                      |
| `service.type`                       | Service type                                       | `LoadBalancer`                      |
| `service.loadBalancerIP`             | Loadbalancer IP                                    | ``                                  |
| `service.annotations`                | Service annotations                                | `{}`                                |
| `ingressRoutes.enabled`              | If true, Enable ingressRoutes CRD will be created  | `false`                             |
| `resources`                          | Set Compute resources                              | `{}`                                |
| `rbac.enabled`                       | Specifies whether RBAC resources should be created | `true`                              |
| `nodeSelector`                       | Set node selector                                  | `{}`                                |
| `tolerations`                        | Set node tolerations                               | `[]`                                |
| `podDisruptionBudget.enabled`        | Enables Pod Disruption Budget                      | `false`                             |
| `podDisruptionBudget.maxUnavailable` | Max unavailable Pods                               | `1`                                 |
| `podDisruptionBudget.minAvailable`   | min unavailable Pods                               | ``                                  |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install/upgrade`.

Alternatively, a YAML file that specifies the values for the configurable parameters can be provided while installing the chart.
For example:

```console
$ helm upgrade --install contour --namespace heptio-contour rimusz/contour -f values.yaml .
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Uninstalling the Chart

To uninstall/delete the `contour` deployment:

```console
$ helm delete --purge contour
```

The command removes all the Kubernetes components associated with the chart and deletes the release.
