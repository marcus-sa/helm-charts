# `@helm-charts/stable-nginx-ingress`

An nginx Ingress controller that uses ConfigMap to store the nginx configuration.

| Field               | Value         |
| ------------------- | ------------- |
| Repository Name     | stable        |
| Chart Name          | nginx-ingress |
| Chart Version       | 0.8.2         |
| NPM Package Version | 0.1.0         |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## nginx configuration
## Ref: https://github.com/kubernetes/ingress/blob/master/controllers/nginx/configuration.md
##
controller:
  name: controller
  image:
    repository: gcr.io/google_containers/nginx-ingress-controller
    tag: '0.9.0-beta.12'
    pullPolicy: IfNotPresent

  config: {}

  # Required for use with CNI based kubernetes installations (such as ones set up by kubeadm),
  # since CNI and hostport don't mix yet. Can be deprecated once https://github.com/kubernetes/kubernetes/issues/23920
  # is merged
  hostNetwork: false

  ## Required only if defaultBackend.enabled = false
  ## Must be <namespace>/<service_name>
  ##
  defaultBackendService: ''

  ## Optionally specify the secret name for default SSL certificate
  ## Must be <namespace>/<secret_name>
  ##
  defaultSSLCertificate: ''

  ## Election ID to use for status update
  ##
  electionID: ingress-controller-leader

  ## Name of the ingress class to route through this controller
  ##
  ingressClass: nginx

  ## Allows customization of the external service
  ## the ingress will be bound to via DNS
  publishService:
    enabled: false
    ## Allows overriding of the publish service to bind to
    ## Must be <namespace>/<service_name>
    ##
    pathOverride: ''

  ## Limit the scope of the controller
  ##
  scope:
    enabled: false
    namespace: '' # defaults to .Release.Namespace

  extraArgs: {}

  ## DaemonSet or Deployment
  ##
  kind: Deployment

  ## Node labels for controller pod assignment
  ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
  ##
  nodeSelector: {}

  ## Annotations to be added to controller pods
  ##
  podAnnotations: {}

  replicaCount: 1

  resources:
    {}
    # limits:
    #   cpu: 100m
    #   memory: 64Mi
    # requests:
    #   cpu: 100m
    #   memory: 64Mi

  service:
    annotations: {}
    clusterIP: ''

    ## List of IP addresses at which the controller services are available
    ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
    ##
    externalIPs: []

    loadBalancerIP: ''
    loadBalancerSourceRanges: []

    ## Set external traffic policy to: "Local" to preserve source IP on
    ## providers supporting it
    ## Ref: https://kubernetes.io/docs/tutorials/services/source-ip/#source-ip-for-services-with-typeloadbalancer
    externalTrafficPolicy: ''

    targetPorts:
      http: 80
      https: 443

    type: LoadBalancer

    # type: NodePort
    # nodePorts:
    #   http: 32080
    #   https: 32443
    nodePorts:
      http: ''
      https: ''

  stats:
    enabled: false

    service:
      annotations: {}
      clusterIP: ''

      ## List of IP addresses at which the stats service is available
      ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
      ##
      externalIPs: []

      loadBalancerIP: ''
      loadBalancerSourceRanges: []
      servicePort: 18080
      type: ClusterIP

## Default 404 backend
##
defaultBackend:
  ## If false, controller.defaultBackendService must be provided
  ##
  enabled: true

  name: default-backend
  image:
    repository: gcr.io/google_containers/defaultbackend
    tag: '1.3'
    pullPolicy: IfNotPresent

  extraArgs: {}

  ## Node labels for default backend pod assignment
  ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
  ##
  nodeSelector: {}

  ## Annotations to be added to default backend pods
  ##
  podAnnotations: {}

  replicaCount: 1

  resources:
    {}
    # limits:
    #   cpu: 10m
    #   memory: 20Mi
    # requests:
    #   cpu: 10m
    #   memory: 20Mi

  service:
    annotations: {}
    clusterIP: ''

    ## List of IP addresses at which the default backend service is available
    ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
    ##
    externalIPs: []

    loadBalancerIP: ''
    loadBalancerSourceRanges: []
    servicePort: 80
    type: ClusterIP

## Enable RBAC as per https://github.com/kubernetes/ingress/tree/master/examples/rbac/nginx and https://github.com/kubernetes/ingress/issues/266
rbac:
  create: false
  serviceAccountName: default

## If controller.stats.enabled = true, Prometheus metrics will be exported
## Ref: https://github.com/hnlq715/nginx-vts-exporter
##
statsExporter:
  name: stats-exporter
  image:
    repository: quay.io/cy-play/vts-nginx-exporter
    tag: v0.0.3
    pullPolicy: IfNotPresent

  endpoint: /metrics
  extraArgs: {}
  metricsNamespace: nginx
  statusPage: http://localhost:18080/nginx_status/format/json

  resources:
    {}
    # limits:
    #   cpu: 10m
    #   memory: 20Mi
    # requests:
    #   cpu: 10m
    #   memory: 20Mi

  service:
    annotations: {}
    clusterIP: ''

    ## List of IP addresses at which the stats-exporter service is available
    ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
    ##
    externalIPs: []

    loadBalancerIP: ''
    loadBalancerSourceRanges: []
    servicePort: 9913
    type: ClusterIP

# TCP service key:value pairs
# Ref: https://github.com/kubernetes/contrib/tree/master/ingress/controllers/nginx/examples/tcp
##
tcp:
  {}
  # 8080: "default/example-tcp-svc:9000"

# UDP service key:value pairs
# Ref: https://github.com/kubernetes/contrib/tree/master/ingress/controllers/nginx/examples/udp
##
udp:
  {}
  # 53: "kube-system/kube-dns:53"
```

</details>

---

# nginx-ingress

[nginx-ingress](https://github.com/kubernetes/ingress/tree/master/controllers/nginx) is an Ingress controller that uses ConfigMap to store the nginx configuration.

To use, add the `kubernetes.io/ingress.class: nginx` annotation to your Ingress resources.

## TL;DR;

```console
$ helm install stable/nginx-ingress
```

## Introduction

This chart bootstraps an nginx-ingress deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/nginx-ingress
```

The command deploys nginx-ingress on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the nginx-ingress chart and their default values.

| Parameter                                           | Description                                                                                                               | Default                                             |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `controller.name`                                   | name of the controller component                                                                                          | `controller`                                        |
| `controller.image.repository`                       | controller container image repository                                                                                     | `gcr.io/google_containers/nginx-ingress-controller` |
| `controller.image.tag`                              | controller container image tag                                                                                            | `0.8.3`                                             |
| `controller.image.pullPolicy`                       | controller container image pull policy                                                                                    | `IfNotPresent`                                      |
| `controller.config`                                 | nginx ConfigMap entries                                                                                                   | none                                                |
| `controller.hostNetwork`                            | If the nginx deployment / daemonset should run on the host's network namespace                                            | false                                               |
| `controller.defaultBackendService`                  | default 404 backend service; required only if `defaultBackend.enabled = false`                                            | `""`                                                |
| `controller.electionID`                             | election ID to use for the status update                                                                                  | `ingress-controller-leader`                         |
| `controller.ingressClass`                           | name of the ingress class to route through this controller                                                                | `nginx`                                             |
| `controller.scope.enabled`                          | limit the scope of the ingress controller                                                                                 | `false` (watch all namespaces)                      |
| `controller.scope.namespace`                        | namespace to watch for ingress                                                                                            | `""` (use the release namespace)                    |
| `controller.extraArgs`                              | Additional controller container arguments                                                                                 | `{}`                                                |
| `controller.kind`                                   | install as Deployment or DaemonSet                                                                                        | `Deployment`                                        |
| `controller.nodeSelector`                           | node labels for pod assignment                                                                                            | `{}`                                                |
| `controller.podAnnotations`                         | annotations to be added to pods                                                                                           | `{}`                                                |
| `controller.replicaCount`                           | desired number of controller pods                                                                                         | `1`                                                 |
| `controller.resources`                              | controller pod resource requests & limits                                                                                 | `{}`                                                |
| `controller.service.annotations`                    | annotations for controller service                                                                                        | `{}`                                                |
| `controller.publishService.enabled`                 | if true, the controller will set the endpoint records on the ingress objects to reflect those on the service              | `false`                                             |
| `controller.publishService.pathOverride`            | override of the default publish-service name                                                                              | `""`                                                |
| `controller.service.clusterIP`                      | internal controller cluster service IP                                                                                    | `""`                                                |
| `controller.service.externalIPs`                    | controller service external IP addresses                                                                                  | `[]`                                                |
| `controller.service.loadBalancerIP`                 | IP address to assign to load balancer (if supported)                                                                      | `""`                                                |
| `controller.service.loadBalancerSourceRanges`       | list of IP CIDRs allowed access to load balancer (if supported)                                                           | `[]`                                                |
| `controller.service.targetPorts.http`               | Sets the targetPort that maps to the Ingress' port 80                                                                     | `80`                                                |
| `controller.service.targetPorts.https`              | Sets the targetPort that maps to the Ingress' port 443                                                                    | `443`                                               |
| `controller.service.type`                           | type of controller service to create                                                                                      | `LoadBalancer`                                      |
| `controller.service.nodePorts.http`                 | If `controller.service.type` is `NodePort` and this is non-empty, it sets the nodePort that maps to the Ingress' port 80  | `""`                                                |
| `controller.service.nodePorts.https`                | If `controller.service.type` is `NodePort` and this is non-empty, it sets the nodePort that maps to the Ingress' port 443 | `""`                                                |
| `controller.stats.enabled`                          | if true, enable "vts-status" page & Prometheus metrics                                                                    | `false`                                             |
| `controller.stats.service.annotations`              | annotations for controller stats service                                                                                  | `{}`                                                |
| `controller.stats.service.clusterIP`                | internal controller stats cluster service IP                                                                              | `""`                                                |
| `controller.stats.service.externalIPs`              | controller service stats external IP addresses                                                                            | `[]`                                                |
| `controller.stats.service.loadBalancerIP`           | IP address to assign to load balancer (if supported)                                                                      | `""`                                                |
| `controller.stats.service.loadBalancerSourceRanges` | list of IP CIDRs allowed access to load balancer (if supported)                                                           | `[]`                                                |
| `controller.stats.service.type`                     | type of controller stats service to create                                                                                | `ClusterIP`                                         |
| `defaultBackend.name`                               | name of the default backend component                                                                                     | `default-backend`                                   |
| `defaultBackend.image.repository`                   | default backend container image repository                                                                                | `gcr.io/google_containers/defaultbackend`           |
| `defaultBackend.image.tag`                          | default backend container image tag                                                                                       | `1.2`                                               |
| `defaultBackend.image.pullPolicy`                   | default backend container image pull policy                                                                               | `IfNotPresent`                                      |
| `defaultBackend.extraArgs`                          | Additional default backend container arguments                                                                            | `{}`                                                |
| `defaultBackend.nodeSelector`                       | node labels for pod assignment                                                                                            | `{}`                                                |
| `defaultBackend.podAnnotations`                     | annotations to be added to pods                                                                                           | `{}`                                                |
| `defaultBackend.replicaCount`                       | desired number of default backend pods                                                                                    | `1`                                                 |
| `defaultBackend.resources`                          | default backend pod resource requests & limits                                                                            | `{}`                                                |
| `defaultBackend.service.annotations`                | annotations for default backend service                                                                                   | `{}`                                                |
| `defaultBackend.service.clusterIP`                  | internal default backend cluster service IP                                                                               | `""`                                                |
| `defaultBackend.service.externalIPs`                | default backend service external IP addresses                                                                             | `[]`                                                |
| `defaultBackend.service.loadBalancerIP`             | IP address to assign to load balancer (if supported)                                                                      | `""`                                                |
| `defaultBackend.service.loadBalancerSourceRanges`   | list of IP CIDRs allowed access to load balancer (if supported)                                                           | `[]`                                                |
| `defaultBackend.service.type`                       | type of default backend service to create                                                                                 | `ClusterIP`                                         |
| `rbac.create`                                       | If true, create & use RBAC resources                                                                                      | `false`                                             |
| `rbac.serviceAccountName`                           | ServiceAccount to be used (ignored if rbac.create=true)                                                                   | `default`                                           |
| `statsExporter.name`                                | name of the Prometheus metrics exporter component                                                                         | `stats-exporter`                                    |
| `statsExporter.image.repository`                    | Prometheus metrics exporter container image repository                                                                    | `quay.io/cy-play/vts-nginx-exporter`                |
| `statsExporter.image.tag`                           | Prometheus metrics exporter image tag                                                                                     | `v0.0.3`                                            |
| `statsExporter.image.pullPolicy`                    | Prometheus metrics exporter image pull policy                                                                             | `IfNotPresent`                                      |
| `statsExporter.endpoint`                            | path at which Prometheus metrics are exposed                                                                              | `/metrics`                                          |
| `statsExporter.extraArgs`                           | Additional Prometheus metrics exporter container arguments                                                                | `{}`                                                |
| `statsExporter.metricsNamespace`                    | namespace used for metrics labeling                                                                                       | `nginx`                                             |
| `statsExporter.statusPage`                          | URL of "vts-stats" page exposed by controller                                                                             | `http://localhost:18080/nginx_status/format/json`   |
| `statsExporter.resources`                           | Prometheus metrics exporter resource requests & limits                                                                    | `{}`                                                |
| `statsExporter.service.annotations`                 | annotations for Prometheus metrics exporter service                                                                       | `{}`                                                |
| `statsExporter.service.clusterIP`                   | cluster IP address to assign to service                                                                                   | `""`                                                |
| `statsExporter.service.externalIPs`                 | Prometheus metrics exporter service external IP addresses                                                                 | `[]`                                                |
| `statsExporter.service.loadBalancerIP`              | IP address to assign to load balancer (if supported)                                                                      | `""`                                                |
| `statsExporter.service.loadBalancerSourceRanges`    | list of IP CIDRs allowed access to load balancer (if supported)                                                           | `[]`                                                |
| `statsExporter.service.servicePort`                 | Prometheus metrics exporter service port                                                                                  | `9913`                                              |
| `statsExporter.service.type`                        | type of Prometheus metrics exporter service to create                                                                     | `ClusterIP`                                         |
| `tcp`                                               | TCP service key:value pairs                                                                                               | `{}`                                                |
| `udp`                                               | UDP service key:value pairs                                                                                               | `{}`                                                |

```console
$ helm install stable/nginx-ingress --name my-release \
    --set controller.stats.enabled=true
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install stable/nginx-ingress --name my-release -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)
