# `@helm-charts/banzaicloud-stable-istio`

Helm chart for all istio components

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | istio              |
| Chart Version       | 1.0.5              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Common settings.
global:
  # Default hub for Istio images.
  # Releases are published to docker hub under 'istio' project.
  # Daily builds from prow are on gcr.io, and nightly builds from circle on docker.io/istionightly
  hub: docker.io/istio

  # Default tag for Istio images.
  tag: 1.0.5

  # Gateway used for legacy k8s Ingress resources. By default it is
  # using 'istio:ingress', to match 0.8 config. It requires that
  # ingress.enabled is set to true. You can also set it
  # to ingressgateway, or any other gateway you define in the 'gateway'
  # section.
  k8sIngressSelector: ingress

  # k8sIngressHttps will add port 443 on the ingress and ingressgateway.
  # It REQUIRES that the certificates are installed  in the
  # expected secrets - enabling this option without certificates
  # will result in LDS rejection and the ingress will not work.
  k8sIngressHttps: false

  proxy:
    image: proxyv2

    # Resources for the sidecar.
    resources:
      requests:
        cpu: 10m
      #  memory: 128Mi
      # limits:
      #   cpu: 100m
      #   memory: 128Mi

    # Controls number of Proxy worker threads.
    # If set to 0 (default), then start worker thread for each CPU thread/core.
    concurrency: 0

    # Configures the access log for each sidecar. Setting it to an empty string will
    # disable access log for sidecar.
    accessLogFile: '/dev/stdout'

    #If set to true, istio-proxy container will have privileged securityContext
    privileged: false

    # If set, newly injected sidecars will have core dumps enabled. Core dumps will always be written to the same
    # file to prevent storage filling up indefinitely. Add a timestamp option to core_pattern to keep all cores:
    # e.g. sysctl -w kernel.core_pattern=/var/lib/istio/core.%e.%p.%t
    enableCoreDump: false

    # Default port for Pilot agent health checks. A value of 0 will disable health checking.
    # statusPort: 15020
    statusPort: 0

    # The initial delay for readiness probes in seconds.
    readinessInitialDelaySeconds: 1

    # The period between readiness probes.
    readinessPeriodSeconds: 2

    # The number of successive failed probes before indicating readiness failure.
    readinessFailureThreshold: 30

    # istio egress capture whitelist
    # https://istio.io/docs/tasks/traffic-management/egress.html#calling-external-services-directly
    # example: includeIPRanges: "172.30.0.0/16,172.20.0.0/16"
    # would only capture egress traffic on those two IP Ranges, all other outbound traffic would
    # be allowed by the sidecar
    includeIPRanges: '*'
    excludeIPRanges: ''

    # istio ingress capture whitelist
    # examples:
    #     Redirect no inbound traffic to Envoy:    --includeInboundPorts=""
    #     Redirect all inbound traffic to Envoy:   --includeInboundPorts="*"
    #     Redirect only selected ports:            --includeInboundPorts="80,8080"
    includeInboundPorts: '*'
    excludeInboundPorts: ''

    # This controls the 'policy' in the sidecar injector.
    autoInject: enabled

    # Sets the destination Statsd in envoy (the value of the "--statsdUdpAddress" proxy argument
    # would be <host>:<port>).
    # Disabled by default.
    # The istio-statsd-prom-bridge is deprecated and should not be used moving forward.
    envoyStatsd:
      # If enabled is set to true, host and port must also be provided. Istio no longer provides a statsd collector.
      enabled: false
      host: # example: statsd-svc
      port: # example: 9125

    # This controls the stats collection for proxies. To disable stats
    # collection, set the prometheusPort to 0.
    stats:
      prometheusPort: 15090

  proxy_init:
    # Base name for the proxy_init container, used to configure iptables.
    image: proxy_init

  # imagePullPolicy is applied to istio control plane components.
  # local tests require IfNotPresent, to avoid uploading to dockerhub.
  # TODO: Switch to Always as default, and override in the local tests.
  imagePullPolicy: IfNotPresent

  # controlPlaneMtls enabled. Will result in delays starting the pods while secrets are
  # propagated, not recommended for tests.
  controlPlaneSecurityEnabled: false

  # disablePolicyChecks disables mixer policy checks.
  # Will set the value with same name in istio config map - pilot needs to be restarted to take effect.
  disablePolicyChecks: false

  # policyCheckFailOpen allows traffic in cases when the mixer policy service cannot be reached.
  # Default is false which means the traffic is denied when the client is unable to connect to Mixer.
  policyCheckFailOpen: false

  # EnableTracing sets the value with same name in istio config map, requires pilot restart to take effect.
  enableTracing: true

  # Default mtls policy. If true, mtls between services will be enabled by default.
  mtls:
    # Default setting for service-to-service mtls. Can be set explicitly using
    # destination rules or service annotations.
    enabled: false

  # ImagePullSecrets for all ServiceAccount, list of secrets in the same namespace
  # to use for pulling any images in pods that reference this ServiceAccount.
  # Must be set for any clustser configured with privte docker registry.
  imagePullSecrets:
    # - private-registry-key

  # Specify pod scheduling arch(amd64, ppc64le, s390x) and weight as follows:
  #   0 - Never scheduled
  #   1 - Least preferred
  #   2 - No preference
  #   3 - Most preferred
  arch:
    amd64: 2
    s390x: 2
    ppc64le: 2

  # Whether to restrict the applications namespace the controller manages;
  # If not set, controller watches all namespaces
  oneNamespace: false

  # Whether to perform server-side validation of configuration.
  configValidation: true

  # If set to true, the pilot and citadel mtls will be exposed on the
  # ingress gateway
  meshExpansion: false

  # If set to true, the pilot and citadel mtls and the plain text pilot ports
  # will be exposed on an internal gateway
  meshExpansionILB: false

  # A minimal set of requested resources to applied to all deployments so that
  # Horizontal Pod Autoscaler will be able to function (if set).
  # Each component can overwrite these default values by adding its own resources
  # block in the relevant section below and setting the desired resources values.
  defaultResources:
    requests:
      cpu: 10m
    #   memory: 128Mi
    # limits:
    #   cpu: 100m
    #   memory: 128Mi

  # Not recommended for user to configure this. Hyperkube image to use when creating custom resources
  hyperkube:
    hub: quay.io/coreos
    tag: v1.7.6_coreos.0

  # Kubernetes >=v1.11.0 will create two PriorityClass, including system-cluster-critical and
  # system-node-critical, it is better to configure this in order to make sure your Istio pods
  # will not be killed because of low prioroty class.
  # Refer to https://kubernetes.io/docs/concepts/configuration/pod-priority-preemption/#priorityclass
  # for more detail.
  priorityClassName: ''

  # Include the crd definition when generating the template.
  # For 'helm template' and helm install > 2.10 it should be true.
  # For helm < 2.9, crds must be installed ahead of time with
  # 'kubectl apply -f install/kubernetes/helm/istio/templates/crds.yaml
  # and this options must be set off.
  crds: true

#
# ingress configuration
#
ingress:
  enabled: false
  replicaCount: 1
  autoscaleMin: 1
  autoscaleMax: 5
  service:
    annotations: {}
    loadBalancerIP: ''
    type: LoadBalancer #change to NodePort, ClusterIP or LoadBalancer if need be
    # Uncomment the following line to preserve client source ip.
    # externalTrafficPolicy: Local
    ports:
      - port: 80
        name: http
        nodePort: 32000
      - port: 443
        name: https
    selector:
      istio: ingress

#
# Gateways Configuration
# By default (if enabled) a pair of Ingress and Egress Gateways will be created for the mesh.
# You can add more gateways in addition to the defaults but make sure those are uniquely named
# and that NodePorts are not conflicting.
# Disable specifc gateway by setting the `enabled` to false.
#
gateways:
  enabled: true

  istio-ingressgateway:
    enabled: true
    labels:
      app: istio-ingressgateway
      istio: ingressgateway
    replicaCount: 1
    autoscaleMin: 1
    autoscaleMax: 5
    resources:
      {}
      # limits:
      #  cpu: 100m
      #  memory: 128Mi
      #requests:
      #  cpu: 1800m
      #  memory: 256Mi
    cpu:
      targetAverageUtilization: 80
    loadBalancerIP: ''
    serviceAnnotations: {}
    type: LoadBalancer #change to NodePort, ClusterIP or LoadBalancer if need be
    # Uncomment the following line to preserve client source ip.
    # externalTrafficPolicy: Local

    ports:
      ## You can add custom gateway ports
      - port: 80
        targetPort: 80
        name: http2
        nodePort: 31380
      - port: 443
        name: https
        nodePort: 31390
      - port: 31400
        name: tcp
        nodePort: 31400
      # Pilot and Citadel MTLS ports are enabled in gateway - but will only redirect
      # to pilot/citadel if global.meshExpansion settings are enabled.
      - port: 15011
        targetPort: 15011
        name: tcp-pilot-grpc-tls
      - port: 8060
        targetPort: 8060
        name: tcp-citadel-grpc-tls
      - port: 853
        targetPort: 853
        name: tcp-dns-tls
      - port: 15030
        targetPort: 15030
        name: http2-prometheus
      - port: 15031
        targetPort: 15031
        name: http2-grafana
    secretVolumes:
      - name: ingressgateway-certs
        secretName: istio-ingressgateway-certs
        mountPath: /etc/istio/ingressgateway-certs
      - name: ingressgateway-ca-certs
        secretName: istio-ingressgateway-ca-certs
        mountPath: /etc/istio/ingressgateway-ca-certs

  istio-egressgateway:
    enabled: true
    labels:
      app: istio-egressgateway
      istio: egressgateway
    replicaCount: 1
    autoscaleMin: 1
    autoscaleMax: 5
    cpu:
      targetAverageUtilization: 80
    serviceAnnotations: {}
    type: ClusterIP #change to NodePort or LoadBalancer if need be
    ports:
      - port: 80
        name: http2
      - port: 443
        name: https
    secretVolumes:
      - name: egressgateway-certs
        secretName: istio-egressgateway-certs
        mountPath: /etc/istio/egressgateway-certs
      - name: egressgateway-ca-certs
        secretName: istio-egressgateway-ca-certs
        mountPath: /etc/istio/egressgateway-ca-certs

  # Mesh ILB gateway creates a gateway of type InternalLoadBalancer,
  # for mesh expansion. It exposes the mtls ports for Pilot,CA as well
  # as non-mtls ports to support upgrades and gradual transition.
  istio-ilbgateway:
    enabled: false
    labels:
      app: istio-ilbgateway
      istio: ilbgateway
    replicaCount: 1
    autoscaleMin: 1
    autoscaleMax: 5
    resources:
      requests:
        cpu: 800m
        memory: 512Mi
      #limits:
      #  cpu: 1800m
      #  memory: 256Mi
    cpu:
      targetAverageUtilization: 80
    loadBalancerIP: ''
    serviceAnnotations:
      cloud.google.com/load-balancer-type: 'internal'
    type: LoadBalancer
    ports:
      ## You can add custom gateway ports - google ILB default quota is 5 ports,
      - port: 15011
        name: grpc-pilot-mtls
      # Insecure port - only for migration from 0.8. Will be removed in 1.1
      - port: 15010
        name: grpc-pilot
      - port: 8060
        targetPort: 8060
        name: tcp-citadel-grpc-tls
      # Port 853 is reserved for the kube-dns gateway
      - port: 853
        name: tcp-dns
    secretVolumes:
      - name: ilbgateway-certs
        secretName: istio-ilbgateway-certs
        mountPath: /etc/istio/ilbgateway-certs
      - name: ilbgateway-ca-certs
        secretName: istio-ilbgateway-ca-certs
        mountPath: /etc/istio/ilbgateway-ca-certs

#
# sidecar-injector webhook configuration
#
sidecarInjectorWebhook:
  enabled: true
  replicaCount: 1
  image: sidecar_injector
  enableNamespacesByDefault: false

#
# galley configuration
#
galley:
  enabled: true
  replicaCount: 1
  image: galley

#
# mixer configuration
#
mixer:
  enabled: true
  replicaCount: 1
  autoscaleMin: 1
  autoscaleMax: 5
  image: mixer

  env:
    GODEBUG: gctrace=2

  istio-policy:
    autoscaleEnabled: true
    autoscaleMin: 1
    autoscaleMax: 5
    cpu:
      targetAverageUtilization: 80

  istio-telemetry:
    autoscaleEnabled: true
    autoscaleMin: 1
    autoscaleMax: 5
    cpu:
      targetAverageUtilization: 80

  prometheusStatsdExporter:
    hub: docker.io/prom
    tag: v0.6.0

#
# pilot configuration
#
pilot:
  enabled: true
  replicaCount: 1
  autoscaleMin: 1
  autoscaleMax: 5
  image: pilot
  sidecar: true
  traceSampling: 1.0
  # Resources for a small pilot install
  resources:
    requests:
      cpu: 500m
      memory: 2048Mi
  env:
    PILOT_PUSH_THROTTLE_COUNT: 100
    GODEBUG: gctrace=2
  cpu:
    targetAverageUtilization: 80

#
# security configuration
#
security:
  replicaCount: 1
  image: citadel
  selfSigned: true # indicate if self-signed CA is used.

#
# addons configuration
#
telemetry-gateway:
  gatewayName: ingressgateway
  grafanaEnabled: false
  prometheusEnabled: false

grafana:
  enabled: false
  replicaCount: 1
  image:
    repository: grafana/grafana
    tag: 5.2.3
  persist: false
  storageClassName: ''
  accessMode: ReadWriteMany
  security:
    enabled: false
    adminUser: admin
    adminPassword: admin
  service:
    annotations: {}
    name: http
    type: ClusterIP
    externalPort: 3000
    internalPort: 3000

prometheus:
  enabled: false
  replicaCount: 1
  hub: docker.io/prom
  tag: v2.3.1

  service:
    annotations: {}
    nodePort:
      enabled: false
      port: 32090

servicegraph:
  enabled: false
  replicaCount: 1
  image: servicegraph
  service:
    annotations: {}
    name: http
    type: ClusterIP
    externalPort: 8088
    internalPort: 8088
  ingress:
    enabled: false
    # Used to create an Ingress record.
    hosts:
      - servicegraph.local
    annotations:
      # kubernetes.io/ingress.class: nginx
      # kubernetes.io/tls-acme: "true"
    tls:
      # Secrets must be manually created in the namespace.
      # - secretName: servicegraph-tls
      #   hosts:
      #     - servicegraph.local
  # prometheus addres
  prometheusAddr: http://prometheus:9090

tracing:
  enabled: false
  provider: jaeger
  jaeger:
    hub: docker.io/jaegertracing
    tag: 1.5
    memory:
      max_traces: 50000
    ui:
      port: 16686
    ingress:
      enabled: false
      # Used to create an Ingress record.
      hosts:
        - jaeger.local
      annotations:
        # kubernetes.io/ingress.class: nginx
        # kubernetes.io/tls-acme: "true"
      tls:
        # Secrets must be manually created in the namespace.
        # - secretName: jaeger-tls
        #   hosts:
        #     - jaeger.local
  replicaCount: 1
  service:
    annotations: {}
    name: http
    type: ClusterIP
    externalPort: 9411
    internalPort: 9411
  ingress:
    enabled: false
    # Used to create an Ingress record.
    hosts:
      - tracing.local
    annotations:
      # kubernetes.io/ingress.class: nginx
      # kubernetes.io/tls-acme: "true"
    tls:
      # Secrets must be manually created in the namespace.
      # - secretName: tracing-tls
      #   hosts:
      #     - tracing.local

kiali:
  enabled: false
  replicaCount: 1
  hub: docker.io/kiali
  tag: v0.10
  ingress:
    enabled: false
    ## Used to create an Ingress record.
    # hosts:
    #  - kiali.local
    annotations:
      # kubernetes.io/ingress.class: nginx
      # kubernetes.io/tls-acme: "true"
    tls:
      # Secrets must be manually created in the namespace.
      # - secretName: kiali-tls
      #   hosts:
      #     - kiali.local
  dashboard:
    username: admin
    # Default admin passphrase for kiali. Must be set during setup, and
    # changed by overriding the secret
    passphrase: admin

    # Override the automatically detected Grafana URL, usefull when Grafana service has no ExternalIPs
    # grafanaURL:
    # Override the automatically detected Jaeger URL, usefull when Jaeger service has no ExternalIPs
    # jaegerURL:

# Certmanager uses ACME to sign certificates. Since Istio gateways are
# mounting the TLS secrets the Certificate CRDs must be created in the
# istio-system namespace. Once the certificate has been created, the
# gateway must be updated by adding 'secretVolumes'. After the gateway
# restart, DestinationRules can be created using the ACME-signed certificates.
certmanager:
  enabled: false
  hub: quay.io/jetstack
  tag: v0.3.1
  resources: {}
```

</details>

---

# Istio

[Istio](https://istio.io/) is an open platform for providing a uniform way to integrate microservices, manage traffic flow across microservices, enforce policies and aggregate telemetry data.

## Introduction

This chart bootstraps all istio [components](https://istio.io/docs/concepts/what-is-istio/overview.html) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Chart Details

This chart can install multiple istio components as subcharts:

- ingress
- ingressgateway
- egressgateway
- sidecarInjectorWebhook
- galley
- mixer
- pilot
- security(citadel)
- grafana
- prometheus
- servicegraph
- tracing(jaeger)
- kiali

To enable or disable each component, change the corresponding `enabled` flag.

## Prerequisites

- Kubernetes 1.9 or newer cluster with RBAC (Role-Based Access Control) enabled is required
- Helm 2.7.2 or newer or alternately the ability to modify RBAC rules is also required
- If you want to enable automatic sidecar injection, Kubernetes 1.9+ with `admissionregistration` API is required, and `kube-apiserver` process must have the `admission-control` flag set with the `MutatingAdmissionWebhook` and `ValidatingAdmissionWebhook` admission controllers added and listed in the correct order.

## Resources Required

The chart deploys pods that consume minimum resources as specified in the resources configuration parameter.

## Installing the Chart

Use the `banzaicloud-stable` repo:

```
$ helm repo add banzaicloud-stable http://kubernetes-charts.banzaicloud.com/branch/master
$ helm repo update
```

Install the chart:

```
helm install --name istio --namespace istio-system banzaicloud-stable/istio
```

## Configuration

The Helm chart ships with reasonable defaults. There may be circumstances in which defaults require overrides.
To override Helm values, use `--set key=value` argument during the `helm install` command. Multiple `--set` operations may be used in the same Helm operation.

Helm charts expose configuration options which are currently in alpha. The currently exposed options are explained in the following table:

| Parameter                               | Description                                                                                                                                                                      | Values                                                                | Default           |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------- |
| `global.hub`                            | Specifies the HUB for most images used by Istio                                                                                                                                  | registry/namespace                                                    | `docker.io/istio` |
| `global.tag`                            | Specifies the TAG for most images used by Istio                                                                                                                                  | valid image tag                                                       | `0.8.latest`      |
| `global.proxy.image`                    | Specifies the proxy image name                                                                                                                                                   | valid proxy name                                                      | `proxyv2`         |
| `global.proxy.concurrency`              | Specifies the number of proxy worker threads                                                                                                                                     | number, 0 = auto                                                      | `0`               |
| `global.imagePullPolicy`                | Specifies the image pull policy                                                                                                                                                  | valid image pull policy                                               | `IfNotPresent`    |
| `global.controlPlaneSecurityEnabled`    | Specifies whether control plane mTLS is enabled                                                                                                                                  | true/false                                                            | `false`           |
| `global.mtls.enabled`                   | Specifies whether mTLS is enabled by default between services                                                                                                                    | true/false                                                            | `false`           |
| `global.rbacEnabled`                    | Specifies whether to create Istio RBAC rules or not                                                                                                                              | true/false                                                            | `true`            |
| `global.refreshInterval`                | Specifies the mesh discovery refresh interval                                                                                                                                    | integer followed by s                                                 | `10s`             |
| `global.arch.amd64`                     | Specifies the scheduling policy for `amd64` architectures                                                                                                                        | 0 = never, 1 = least preferred, 2 = no preference, 3 = most preferred | `2`               |
| `global.arch.s390x`                     | Specifies the scheduling policy for `s390x` architectures                                                                                                                        | 0 = never, 1 = least preferred, 2 = no preference, 3 = most preferred | `2`               |
| `global.arch.ppc64le`                   | Specifies the scheduling policy for `ppc64le` architectures                                                                                                                      | 0 = never, 1 = least preferred, 2 = no preference, 3 = most preferred | `2`               |
| `ingress.enabled`                       | Specifies whether Ingress should be installed                                                                                                                                    | true/false                                                            | `true`            |
| `gateways.istio-ingressgateway.enabled` | Specifies whether Ingress gateway should be installed                                                                                                                            | true/false                                                            | `true`            |
| `gateways.istio-egressgateway.enabled`  | Specifies whether Egress gateway should be installed                                                                                                                             | true/false                                                            | `true`            |
| `sidecarInjectorWebhook.enabled`        | Specifies whether automatic sidecar-injector should be installed                                                                                                                 | `true`                                                                |
| `galley.enabled`                        | Specifies whether Galley should be installed for server-side config validation                                                                                                   | true/false                                                            | `true`            |
| `mixer.enabled`                         | Specifies whether Mixer should be installed                                                                                                                                      | true/false                                                            | `true`            |
| `pilot.enabled`                         | Specifies whether Pilot should be installed                                                                                                                                      | true/false                                                            | `true`            |
| `grafana.enabled`                       | Specifies whether Grafana addon should be installed                                                                                                                              | true/false                                                            | `false`           |
| `grafana.persist`                       | Specifies whether Grafana addon should persist config data                                                                                                                       | true/false                                                            | `false`           |
| `grafana.storageClassName`              | If `grafana.persist` is true, specifies the [`StorageClass`](https://kubernetes.io/docs/concepts/storage/storage-classes/) to use for the `PersistentVolumeClaim`                | `StorageClass`                                                        | ""                |
| `grafana.accessMode`                    | If `grafana.persist` is true, specifies the [`Access Mode`](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes) to use for the `PersistentVolumeClaim` | RWO/ROX/RWX                                                           | `ReadWriteMany`   |
| `prometheus.enabled`                    | Specifies whether Prometheus addon should be installed                                                                                                                           | true/false                                                            | `false`           |
| `servicegraph.enabled`                  | Specifies whether Servicegraph addon should be installed                                                                                                                         | true/false                                                            | `false`           |
| `tracing.enabled`                       | Specifies whether Tracing(jaeger) addon should be installed                                                                                                                      | true/false                                                            | `false`           |
| `kiali.enabled`                         | Specifies whether Kiali addon should be installed                                                                                                                                | true/false                                                            | `false`           |

## Uninstalling the Chart

To uninstall/delete the `istio` release:

```
$ helm delete istio
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

To uninstall/delete the `istio` release completely and make its name free for later use:

```
$ helm delete istio --purge
```
