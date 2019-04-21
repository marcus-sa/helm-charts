# `@helm-charts/rimusz-contour`

A Helm chart for Heptio Contour

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | rimusz  |
| Chart Name          | contour |
| Chart Version       | 0.2.4   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for contour.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

contour:
  image:
    repository: gcr.io/heptio-images/contour
    # Note that by default we use appVersion to get images tag
    # tag:
    pullPolicy: Always

envoy:
  image:
    repository: docker.io/envoyproxy/envoy-alpine
    tag: v1.7.0
    pullPolicy: IfNotPresent
# Contour specific Deployment annotations
annotations:
  prometheus.io/scrape: 'true'
  prometheus.io/port: '9001'
  prometheus.io/path: '/stats'
  prometheus.io/format: 'prometheus'

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

ingressRoutes:
  enabled: false

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
```

</details>

---

# Contour

Contour is an Ingress controller for Kubernetes that works by deploying the [Envoy proxy](https://www.envoyproxy.io/) as a reverse proxy and load balancer.
Unlike other Ingress controllers, Contour supports dynamic configuration updates out of the box while maintaining a lightweight profile.

## Prerequisites

- Kubernetes 1.9+

## Installing the Chart

To install the chart with the release name `contour`:

```console
$ helm install --name contour rimusz/contour
```

By default `contour` uses `HostPort` to expose ports 80/443. You can change to use `LoadBalancer` via `--set` or in `values.yaml`

> **Tip**: List all releases using `helm list`

## Configuration

You can check `contour` configurable parameters in [values.yaml](values.yaml) file.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the configurable parameters can be provided while installing the chart.
For example:

```console
$ helm install --name contour -f values.yaml .
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Uninstalling the Chart

To uninstall/delete the `contour` deployment:

```console
$ helm delete --purge contour
```

The command removes all the Kubernetes components associated with the chart and deletes the release.
