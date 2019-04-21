# `@helm-charts/ibm-charts-ibm-istio`

Helm chart for all istio components

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | ibm-charts |
| Chart Name          | ibm-istio  |
| Chart Version       | 1.0.5      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for ibm-istio-chart.
# Use with Kubernetes 1.9+
# This is a YAML-formatted file.
# Declare name/value pairs to be passed into your templates.
# name: value

# Common settings.
global:
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
    repository: ibmcom/istio-proxyv2
    tag: 1.0.2.1

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

    # If set, newly injected sidecars will have core dumps enabled.
    enableCoreDump: false

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
    #includeInboundPorts: "*"
    excludeInboundPorts: ''

    # This controls the 'policy' in the sidecar injector.
    autoInject: enabled

    # Sets the destination Statsd in envoy (the value of the "--statsdUdpAddress" proxy argument
    # would be <host>:<port>).
    # Can also be disabled (e.g. when Mixer is not installed).
    envoyStatsd:
      enabled: true
      host: istio-statsd-prom-bridge
      port: 9125

  proxy_init:
    # Base name for the proxy_init container, used to configure iptables.
    repository: ibmcom/istio-proxy_init
    tag: 1.0.2.1

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
    []
    # - private-registry-key

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
  kubectl:
    repository: ibmcom/kubectl
    tag: v1.12.4

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

  # istio control plane namespace
  istioNamespace: ''

  # Omit the istio-sidecar-injector configmap when generate a
  # standalone gateway. Gateways may be created in namespaces other
  # than `istio-system` and we don't want to re-create the injector
  # configmap in those.
  omitSidecarInjectorConfigMap: false

  # Specify architecture (amd64, ppc64le, s390x) and weight to be  used for scheduling as follows:
  #   0 - Do not use
  #   1 - Least preferred
  #   2 - No preference
  #   3 - Most preferred
  arch:
    amd64: '2 - No preference'
    ppc64le: '2 - No preference'
    s390x: '2 - No preference'

#
# ingress configuration
#
ingress:
  enabled: false
  replicaCount: 1
  autoscaleMin: 1
  autoscaleMax: 5
  resources: {}
  service:
    annotations: {}
    loadBalancerIP: ''
    type: LoadBalancer #change to NodePort, ClusterIP or LoadBalancer if need be
    ports:
      - port: 80
        name: http
        nodePort: 32000
      - port: 443
        name: https
    selector:
      istio: ingress
  # Specify which node current component will be scheduled to, this option support
  # two values: 'proxy' and 'management', and will only be applied to ICP Cluster.
  # If set to 'proxy', current component will be deployed to ICP proxy node; It will
  # be deployed to ICP management node if set to 'management'.
  nodeRole: proxy
  # Specify extra node selector.
  nodeSelector: {}

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
    # Specify which node current component will be scheduled to, this option support
    # two values: 'proxy' and 'management', and will only be applied to ICP Cluster.
    # If set to 'proxy', current component will be deployed to ICP proxy node; It will
    # be deployed to ICP management node if set to 'management'.
    nodeRole: proxy
    # Specify extra node selector.
    nodeSelector: {}
    cpu:
      targetAverageUtilization: 80
    loadBalancerIP: ''
    serviceAnnotations: {}
    type: LoadBalancer #change to NodePort, ClusterIP or LoadBalancer if need be

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
    resources: {}
    # Specify which node current component will be scheduled to, this option support
    # two values: 'proxy' and 'management', and will only be applied to ICP Cluster.
    # If set to 'proxy', current component will be deployed to ICP proxy node; It will
    # be deployed to ICP management node if set to 'management'.
    nodeRole: proxy
    # Specify extra node selector.
    nodeSelector: {}
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
    # Specify which node current component will be scheduled to, this option support
    # two values: 'proxy' and 'management', and will only be applied to ICP Cluster.
    # If set to 'proxy', current component will be deployed to ICP proxy node; It will
    # be deployed to ICP management node if set to 'management'.
    nodeRole: proxy
    # Specify extra node selector.
    nodeSelector: {}
    cpu:
      targetAverageUtilization: 80
    loadBalancerIP: ''
    serviceAnnotations: {}
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
  image:
    repository: ibmcom/istio-sidecar_injector
    tag: 1.0.2
  enableNamespacesByDefault: false
  resources: {}
  # Specify which node current component will be scheduled to, this option support
  # two values: 'proxy' and 'management', and will only be applied to ICP Cluster.
  # If set to 'proxy', current component will be deployed to ICP proxy node; It will
  # be deployed to ICP management node if set to 'management'.
  nodeRole: management
  # Specify extra node selector.
  nodeSelector: {}

#
# galley configuration
#
galley:
  enabled: true
  replicaCount: 1
  image:
    repository: ibmcom/istio-galley
    tag: 1.0.2
  resources: {}
  # Specify which node current component will be scheduled to, this option support
  # two values: 'proxy' and 'management', and will only be applied to ICP Cluster.
  # If set to 'proxy', current component will be deployed to ICP proxy node; It will
  # be deployed to ICP management node if set to 'management'.
  nodeRole: management
  # Specify extra node selector.
  nodeSelector: {}

#
# mixer configuration
#
mixer:
  enabled: true
  replicaCount: 1
  image:
    repository: ibmcom/istio-mixer
    tag: 1.0.2
  resources: {}
  # Specify which node current component will be scheduled to, this option support
  # two values: 'proxy' and 'management', and will only be applied to ICP Cluster.
  # If set to 'proxy', current component will be deployed to ICP proxy node; It will
  # be deployed to ICP management node if set to 'management'.
  nodeRole: management
  # Specify extra node selector.
  nodeSelector: {}

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
    repository: ibmcom/prom-statsd-exporter
    tag: v0.6.0
    resources: {}

#
# pilot configuration
#
pilot:
  enabled: true
  replicaCount: 1
  autoscaleMin: 1
  autoscaleMax: 5
  image:
    repository: ibmcom/istio-pilot
    tag: 1.0.2.1
  sidecar: true
  traceSampling: 100.0
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
  # Specify which node current component will be scheduled to, this option support
  # two values: 'proxy' and 'management', and will only be applied to ICP Cluster.
  # If set to 'proxy', current component will be deployed to ICP proxy node; It will
  # be deployed to ICP management node if set to 'management'.
  nodeRole: management
  # Specify extra node selector.
  nodeSelector: {}

#
# security configuration
#
security:
  enabled: true
  replicaCount: 1
  image:
    repository: ibmcom/istio-citadel
    tag: 1.0.2
  selfSigned: true # indicate if self-signed CA is used.
  resources: {}
  # Specify which node current component will be scheduled to, this option support
  # two values: 'proxy' and 'management', and will only be applied to ICP Cluster.
  # If set to 'proxy', current component will be deployed to ICP proxy node; It will
  # be deployed to ICP management node if set to 'management'.
  nodeRole: management
  # Specify extra node selector.
  nodeSelector: {}

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
    repository: ibmcom/istio-grafana
    tag: 1.0.2.1
  persist: false
  storageClassName: ''
  security:
    enabled: false
    secretName: grafana
    usernameKey: username
    passphraseKey: passphrase
  service:
    annotations: {}
    name: http
    type: ClusterIP
    externalPort: 3000
  resources: {}
  # Specify which node current component will be scheduled to, this option support
  # two values: 'proxy' and 'management', and will only be applied to ICP Cluster.
  # If set to 'proxy', current component will be deployed to ICP proxy node; It will
  # be deployed to ICP management node if set to 'management'.
  nodeRole: management
  # Specify extra node selector.
  nodeSelector: {}

prometheus:
  enabled: true
  replicaCount: 1
  image:
    repository: ibmcom/prometheus
    tag: v2.3.1-f2
  service:
    annotations: {}
    nodePort:
      enabled: false
      port: 32090
  resources: {}
  # Specify which node current component will be scheduled to, this option support
  # two values: 'proxy' and 'management', and will only be applied to ICP Cluster.
  # If set to 'proxy', current component will be deployed to ICP proxy node; It will
  # be deployed to ICP management node if set to 'management'.
  nodeRole: management
  # Specify extra node selector.
  nodeSelector: {}

servicegraph:
  enabled: false
  replicaCount: 1
  image:
    repository: ibmcom/istio-servicegraph
    tag: 1.0.2
  service:
    annotations: {}
    name: http
    type: ClusterIP
    externalPort: 8088
  ingress:
    enabled: false
    # Used to create an Ingress record.
    hosts:
      []
      # - servicegraph.local
    annotations:
      {}
      # kubernetes.io/ingress.class: nginx
      # kubernetes.io/tls-acme: "true"
    tls:
      []
      # Secrets must be manually created in the namespace.
      # - secretName: servicegraph-tls
      #   hosts:
      #     - servicegraph.local
  resources: {}
  # Specify which node current component will be scheduled to, this option support
  # two values: 'proxy' and 'management', and will only be applied to ICP Cluster.
  # If set to 'proxy', current component will be deployed to ICP proxy node; It will
  # be deployed to ICP management node if set to 'management'.
  nodeRole: management
  # Specify extra node selector.
  nodeSelector: {}
  # prometheus addres
  prometheusAddr: http://prometheus:9090

tracing:
  enabled: false
  provider: jaeger
  jaeger:
    image:
      repository: ibmcom/jaegertracing-all-in-one
      tag: 1.7
    memory:
      max_traces: 50000
    contextPath: /jaeger
    ingress:
      enabled: false
      # Used to create an Ingress record.
      hosts:
        []
        # - jaeger.local
      annotations:
        {}
        # kubernetes.io/ingress.class: nginx
        # kubernetes.io/tls-acme: "true"
      tls:
        []
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
  ingress:
    enabled: false
    # Used to create an Ingress record.
    hosts:
      []
      # - tracing.local
    annotations:
      {}
      # kubernetes.io/ingress.class: nginx
      # kubernetes.io/tls-acme: "true"
    tls:
      []
      # Secrets must be manually created in the namespace.
      # - secretName: tracing-tls
      #   hosts:
      #     - tracing.local
  resources: {}
  # Specify which node current component will be scheduled to, this option support
  # two values: 'proxy' and 'management', and will only be applied to ICP Cluster.
  # If set to 'proxy', current component will be deployed to ICP proxy node; It will
  # be deployed to ICP management node if set to 'management'.
  nodeRole: management
  # Specify extra node selector.
  nodeSelector: {}

kiali:
  enabled: false
  replicaCount: 1
  image:
    repository: ibmcom/kiali
    tag: v0.8.0.1
  contextPath: /kiali
  ingress:
    enabled: false
    ## Used to create an Ingress record.
    hosts:
      []
      # - kiali.local
    annotations:
      {}
      # kubernetes.io/ingress.class: nginx
      # kubernetes.io/tls-acme: "true"
    tls:
      []
      # Secrets must be manually created in the namespace.
      # - secretName: kiali-tls
      #   hosts:
      #     - kiali.local
  dashboard:
    secretName: kiali
    usernameKey: username
    passphraseKey: passphrase

    # Override the automatically detected Grafana URL, usefull when Grafana service has no ExternalIPs
    grafanaURL: ''

    # Override the automatically detected Jaeger URL, usefull when Jaeger service has no ExternalIPs
    jaegerURL: ''
  resources: {}
  # Specify which node current component will be scheduled to, this option support
  # two values: 'proxy' and 'management', and will only be applied to ICP Cluster.
  # If set to 'proxy', current component will be deployed to ICP proxy node; It will
  # be deployed to ICP management node if set to 'management'.
  nodeRole: management
  # Specify extra node selector.
  nodeSelector: {}

# Certmanager uses ACME to sign certificates. Since Istio gateways are
# mounting the TLS secrets the Certificate CRDs must be created in the
# istio-system namespace. Once the certificate has been created, the
# gateway must be updated by adding 'secretVolumes'. After the gateway
# restart, DestinationRules can be created using the ACME-signed certificates.
certmanager:
  enabled: false
  image:
    repository: ibmcom/cert-manager
    tag: v0.3.1
  # Optional additional arguments
  extraArgs: []
  podAnnotations: {}
  podLabels: {}

  # Optional DNS settings, useful if you have a public and private DNS zone for
  # the same domain on Route 53. What follows is an example of ensuring
  # cert-manager can access an ingress or DNS TXT records at all times.
  # NOTE: This requires Kubernetes 1.10 or `CustomPodDNS` feature gate enabled for
  # the cluster to work.
  podDnsPolicy: 'ClusterFirst'
  podDnsConfig: {}
  #   nameservers:
  #     - "1.1.1.1"
  #     - "8.8.8.8"
  email: ''
  resources: {}
  # Specify which node current component will be scheduled to, this option support
  # two values: 'proxy' and 'management', and will only be applied to ICP Cluster.
  # If set to 'proxy', current component will be deployed to ICP proxy node; It will
  # be deployed to ICP management node if set to 'management'.
  nodeRole: management
  # Specify extra node selector.
  nodeSelector: {}
```

</details>

---

# Istio

[Istio](https://istio.io/) is an open platform for providing a uniform way to integrate microservices, manage traffic flow across microservices, enforce policies and aggregate telemetry data.

## Introduction

This chart bootstraps all Istio [components](https://istio.io/docs/concepts/what-is-istio/overview.html) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Chart Details

This chart can install multiple Istio components as subcharts:

| Subchart               | Component                               | Description                                                                                                                                                                                                                                                                                                  | Enabled by Default |
| ---------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| ingress                | Ingress                                 | An [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) implementation with [envoy proxy](https://github.com/envoyproxy/envoy) that allows inbound connections to reach the mesh. This deprecated component is used for legacy Kubernetes Ingress resources with Istio routing rules. | No                 |
| gateways               | Gateways                                | A platform independent [Gateway](https://istio.io/docs/concepts/traffic-management/#gateways) model for ingress & egress proxies that works across Kubernetes and Cloud Foundry and works seamlessly with routing.                                                                                           | Yes                |
| sidecarInjectorWebhook | Automatic Sidecar Injector              | A [mutating webhook](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#admission-webhooks) implementation to automatically inject an envoy sidecar container into application pods.                                                                                  | Yes                |
| galley                 | Galley                                  | The top-level config ingestion, processing and distribution component for Istio, responsible for insulating the rest of the Istio components from the details of obtaining user configuration from the underlying platform.                                                                                  | Yes                |
| mixer                  | Mixer                                   | A centralized component that is leveraged by the proxies and microservices to enforce policies such as authorization, rate limits, quotas, authentication, request tracing and telemetry collection.                                                                                                         | Yes                |
| pilot                  | Pilot                                   | A component responsible for configuring the proxies at runtime.                                                                                                                                                                                                                                              | Yes                |
| security               | Citadel                                 | A centralized component responsible for certificate issuance and rotation.                                                                                                                                                                                                                                   | Yes                |
| telemetrygateway       | Telemetry gateway                       | A gateway for configuring Istio telemetry addons                                                                                                                                                                                                                                                             | No                 |
| grafana                | [Grafana](https://grafana.com/)         | A visualization tool for monitoring and metric analytics & dashboards for Istio                                                                                                                                                                                                                              | No                 |
| prometheus             | [Prometheus](https://prometheus.io/)    | A service monitoring system for Istio that collects metrics from configured targets at given intervals, evaluates rule expressions, displays the results, and can trigger alerts if some condition is observed to be true.                                                                                   | Yes                |
| servicegraph           | Service Graph                           | A small add-on for Istio that generates and visualizes graph representations of service mesh.                                                                                                                                                                                                                | No                 |
| tracing                | [Jaeger](https://www.jaegertracing.io/) | Istio uses Jaeger as a tracing system that is used for monitoring and troubleshooting Istio service mesh.                                                                                                                                                                                                    | No                 |
| kiali                  | Kiali                                   | Kiali works with Istio to visualise the service mesh topology, features like circuit breakers or request rates.                                                                                                                                                                                              | No                 |
| certmanager            | Cert-Manager                            | An Istio add-on to automate the management and issuance of TLS certificates from various issuing sources.                                                                                                                                                                                                    | No                 |

To enable or disable each component, change the corresponding `enabled` flag.

## Prerequisites

- A user with `cluster-admin` ClusterRole is required to install the chart.
- Kubernetes 1.9 or newer cluster with RBAC (Role-Based Access Control) enabled is required.
- To enable automatic sidecar injection, Kubernetes 1.9+ with `admissionregistration` API is required, and the `kube-apiserver` process must have the `admission-control` flag set with the `MutatingAdmissionWebhook` and `ValidatingAdmissionWebhook` admission controllers added and listed in the correct order.

## Resources Required

The chart deploys pods that consume minimum resources as specified in the resources configuration parameter.

## Installing the Chart

1. Install Istio’s [Custom Resource Definitions](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions) via `kubectl apply`, and wait a few seconds for the CRDs to be committed in the kube-apiserver:

   ```
   $ kubectl apply -f https://raw.githubusercontent.com/IBM/charts/master/stable/ibm-istio/templates/crds.yaml
   ```

   or if you have downloaded the chart locally:

   ```
   $ kubectl apply -f ../ibm-istio/templates/crds.yaml
   ```

   **Note**: If you are enabling `certmanager`, you also need to install its CRDs and wait a few seconds for the CRDs to be committed in the kube-apiserver:

   ```
   $ kubectl apply -f https://raw.githubusercontent.com/IBM/charts/master/stable/ibm-istio/charts/certmanager/templates/crds.yaml
   ```

   or if you have downloaded the chart locally:

   ```
   $ kubectl apply -f ../ibm-istio/charts/certmanager/templates/crds.yaml
   ```

2. Create namespace `istio-system` for the chart:

   ```
   $ kubectl create ns istio-system
   ```

3. If you are using security mode for Grafana, create the secret first as follows:
   Encode username, you can change the username to the name as you want:

   ```
   $ echo -n 'admin' | base64
   YWRtaW4=
   ```

   Encode passphrase, you can change the passphrase to the passphrase as you want:

   ```
   $ echo -n '1f2d1e2e67df' | base64
   MWYyZDFlMmU2N2Rm
   ```

   Set the namespace where Istio was installed:

   ```
   $ NAMESPACE=istio-system
   ```

   Create secret for Grafana:

   ```
   $ cat <<EOF | kubectl apply -f -
   apiVersion: v1
   kind: Secret
   metadata:
     name: grafana
     namespace: $NAMESPACE
     labels:
       app: grafana
   type: Opaque
   data:
     username: YWRtaW4=
     passphrase: MWYyZDFlMmU2N2Rm
   EOF
   ```

4. If you are enabling `kiali`, you also need to create the secret that contains the username and passphrase for `kiali` dashboard:

   ```
   $ echo -n 'admin' | base64
   YWRtaW4=
   $ echo -n '1f2d1e2e67df' | base64
   MWYyZDFlMmU2N2Rm
   $ NAMESPACE=istio-system
   $ cat <<EOF | kubectl apply -f -
   apiVersion: v1
   kind: Secret
   metadata:
     name: kiali
     namespace: $NAMESPACE
     labels:
       app: kiali
   type: Opaque
   data:
     username: YWRtaW4=
     passphrase: MWYyZDFlMmU2N2Rm
   EOF
   ```

5. To install the chart with the release name `istio` in namespace `istio-system`:

   - With [automatic sidecar injection](https://istio.io/docs/setup/kubernetes/sidecar-injection/#automatic-sidecar-injection) (requires Kubernetes >=1.9.0):

   ```
   $ helm install ../ibm-istio --name istio --namespace istio-system
   ```

   - Without the sidecar injection webhook:

   ```
   $ helm install ../ibm-istio --name istio --namespace istio-system --set sidecarInjectorWebhook.enabled=false
   ```

**Note**: Currently, only one instance of Istio can be installed on a cluster at a time.

## Configuration

The Helm chart ships with reasonable defaults. There may be circumstances in which defaults require overrides.
To override Helm values, use `--set key=value` argument during the `helm install` command. Multiple `--set` operations may be used in the same Helm operation.

Helm charts expose configuration options which are currently in alpha. The currently exposed options are explained in the following table:

| Parameter                                                    | Description                                                                                                                | Values                                                                          | Default                                                |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `global.k8sIngressSelector`                                  | Specifies the gateway used for legacy k9s ingress resources                                                                | `ingress` or any defined gateway                                                | `ingress`                                              |
| `global.k8sIngressHttps`                                     | Specifies whether to use the https for ingress                                                                             | true/false                                                                      | `false`                                                |
| `global.proxy.repository`                                    | Specifies the proxy image location                                                                                         | valid image repository                                                          | `ibmcom/istio-proxyv2`                                 |
| `global.proxy.tag`                                           | Specifies the proxy image version                                                                                          | valid image tag                                                                 | `1.0.2.1`                                              |
| `global.proxy.resources`                                     | CPU/Memory for resource requests & limits                                                                                  | valid CPU&memory settings                                                       | `{requests.cpu: 10m}`                                  |
| `global.proxy.concurrency`                                   | Controls number of proxy worker threads. If set to 0 (default), then start worker thread for each CPU thread/core          | valid number(>=0)                                                               | `0`                                                    |
| `global.proxy.accessLogFile`                                 | Specifies the access log for each sidecar, an empty string will disable access log for sidecar                             | valid file path or empty string                                                 | `/dev/stdout`                                          |
| `global.proxy.privileged`                                    | Configure privileged securityContext for proxy. If set to true, istio-proxy container will have privileged securityContext | true/false                                                                      | `false`                                                |
| `global.proxy.enableCoreDump`                                | Specifies whether to enable debug information for envoy sidecar                                                            | true/false                                                                      | `false`                                                |
| `global.proxy.includeIPRanges`                               | Specifies istio egress capture whitelist                                                                                   | example: includeIPRanges: "172.30.0.0/16,172.20.0.0/16"                         | `*`                                                    |
| `global.proxy.excludeIPRanges`                               | Specifies istio egress capture blacklist                                                                                   | example: excludeIPRanges: "172.40.0.0/16,172.50.0.0/16"                         | `""`                                                   |
| `global.proxy.excludeInboundPorts`                           | Specifies istio egress capture port blacklist                                                                              | example: excludeInboundPorts: "81:8081"                                         | `""`                                                   |
| `global.proxy.autoInject`                                    | Specifies whether to enable ingress and egress policy for envoy sidecar                                                    | `enabled`/`disabled`                                                            | `enabled`                                              |
| `global.proxy.envoyStatsd.enabled`                           | Specifies whether to enable the destination statsd in envoy                                                                | true/false                                                                      | `true`                                                 |
| `global.proxy.envoyStatsd.host`                              | Specifies host for the destination statsd in envoy                                                                         | destination statsd host                                                         | `istio-statsd-prom-bridge`                             |
| `global.proxy.envoyStatsd.port`                              | Specifies host port for the destination statsd in envoy                                                                    | destination statsd port                                                         | `9125`                                                 |
| `global.proxy_init.repository`                               | Specifies the proxy init image location                                                                                    | valid image repository                                                          | `ibmcom/istio-proxy_init`                              |
| `global.proxy_init.tag`                                      | Specifies the proxy init image version                                                                                     | valid image tag                                                                 | `1.0.2.1`                                              |
| `global.imagePullPolicy`                                     | Specifies the image pull policy                                                                                            | valid image pull policy                                                         | `IfNotPresent`                                         |
| `global.controlPlaneSecurityEnabled`                         | Specifies whether control plane mTLS is enabled                                                                            | true/false                                                                      | `false`                                                |
| `global.disablePolicyChecks`                                 | Specifies whether to disables mixer policy checks                                                                          | true/false                                                                      | `false`                                                |
| `global.enableTracing`                                       | Specifies whether to enables the Tracing                                                                                   | true/false                                                                      | `true`                                                 |
| `global.mtls.enabled`                                        | Specifies whether mTLS is enabled by default between services                                                              | true/false                                                                      | `false`                                                |
| `global.imagePullSecrets`                                    | Specifies image pull secrets for private docker registry                                                                   | array consists of imagePullSecret                                               | []                                                     |
| `global.oneNamespace`                                        | Specifies whether to restrict the applications namespace the controller manages                                            | true/false                                                                      | `false`                                                |
| `global.configValidation`                                    | Specifies whether to perform server-side validation of configuration                                                       | true/false                                                                      | `true`                                                 |
| `global.meshExpansion`                                       | Specifies whether to support mesh expansion                                                                                | true/false                                                                      | `false`                                                |
| `global.meshExpansionILB`                                    | Specifies whether to expose the pilot and citadel mtls and the plain text pilot ports on an internal gateway               | true/false                                                                      | `false`                                                |
| `global.kubectl.repository`                                  | Specifies the kubectl image location                                                                                       | valid image repository                                                          | `ibmcom/kubectl`                                       |
| `global.kubectl.tag`                                         | Specifies the kubectl image version                                                                                        | valid image tag                                                                 | `v1.12.4`                                              |
| `global.priorityClassName`                                   | Specify priority class, it can be 'system-cluster-critical' or 'system-node-critical'                                      | valid priority class name                                                       | `""`                                                   |
| `gobal.defaultResources`                                     | Specifies resources(CPU/Memory) requests & limits applied to all deployments                                               | valid CPU&memory settings                                                       | `{requests.cpu: 10m}`                                  |
| `global.crds`                                                | Specifies whether to include the CRDS when generating the template                                                         | true/false                                                                      | `true`                                                 |
| `global.istioNamespace`                                      | Specifies Istio installation namespace when generate a standalone gateway                                                  | valid namespace                                                                 | `""`                                                   |
| `global.omitSidecarInjectorConfigMap`                        | Specifies whether to omit the istio-sidecar-injector configmap when generate a standalone gateway                          | true/false                                                                      | `false`                                                |
| `global.arch.amd64`                                          | Architecture preference for amd64 node                                                                                     | `0 - Do not use`/`1 - Least preferred`/`2 - No preference`/`3 - Most preferred` | `2 - No preference`                                    |
| `global.arch.ppc64le`                                        | Architecture preference for ppc64le node                                                                                   | `0 - Do not use`/`1 - Least preferred`/`2 - No preference`/`3 - Most preferred` | `2 - No preference`                                    |
| `global.arch.s390x`                                          | Architecture preference for s390x node                                                                                     | `0 - Do not use`/`1 - Least preferred`/`2 - No preference`/`3 - Most preferred` | `2 - No preference`                                    |
| `ingress.enabled`                                            | Specifies whether Ingress should be installed (deprecated)                                                                 | true/false                                                                      | `false`                                                |
| `ingress.replicaCount`                                       | Specifies number of desired pods for Ingress deployment                                                                    | number                                                                          | `1`                                                    |
| `ingress.autoscaleMin`                                       | Specifies lower limit for the number of pods that can be set by the autoscaler                                             | number                                                                          | `1`                                                    |
| `ingress.autoscaleMax`                                       | Specifies upper limit for the number of pods that can be set by the autoscaler                                             | number                                                                          | `5`                                                    |
| `ingress.resources`                                          | CPU/Memory for resource requests & limits                                                                                  | valid CPU&memory settings                                                       | {}                                                     |
| `ingress.service.annotations`                                | Specifies the annotations for Ingress service                                                                              | valid service annotations                                                       | {}                                                     |
| `ingress.service.loadBalancerIP`                             | Specifies load balancer IP if its type is LoadBalancer                                                                     | valid IP address                                                                | `""`                                                   |
| `ingress.service.type`                                       | Specifies service type for Ingress                                                                                         | valid service type                                                              | `LoadBalancer`                                         |
| `ingress.service.ports`                                      | Specifies service ports for Ingress service                                                                                | valid service ports                                                             |                                                        |
| `ingress.service.selector`                                   | Specifies pod selector for Ingress service                                                                                 | valid label selector                                                            | `istio: ingress`                                       |
| `ingress.nodeRole`                                           | Specify which node current component will be scheduled to(effective only on IBM Cloud Private)                             | `proxy`/`management`                                                            | `proxy`                                                |
| `ingress.nodeSelector`                                       | Specifies customized node selector for deployment                                                                          | valid node selector                                                             | {}                                                     |
| `gateways.enabled`                                           | Specifies whether the Istio Gateway should be installed                                                                    | true/false                                                                      | `true`                                                 |
| `gateways.istio-ingressgateway.enabled`                      | Specifies whether the Ingress Gateway should be installed                                                                  | true/false                                                                      | `true`                                                 |
| `gateways.istio-ingressgateway.labels`                       | Specifies labels for Ingress Gateway                                                                                       | valid labels                                                                    | `app: istio-ingressgateway`                            |
| `gateways.istio-ingressgateway.replicaCount`                 | Specifies number of desired pods for Ingress Gateway deployment                                                            | number                                                                          | `1`                                                    |
| `gateways.istio-ingressgateway.autoscaleMin`                 | Specifies lower limit for the number of pods that can be set by the autoscaler                                             | number                                                                          | `1`                                                    |
| `gateways.istio-ingressgateway.autoscaleMax`                 | Specifies upper limit for the number of pods that can be set by the autoscaler                                             | number                                                                          | `5`                                                    |
| `gateways.istio-ingressgateway.resources`                    | CPU/Memory for resource requests & limits                                                                                  | valid CPU&memory settings                                                       | {}                                                     |
| `gateways.istio-ingressgateway.nodeRole`                     | Specify which node current component will be scheduled to(effective only on IBM Cloud Private)                             | `proxy`/`management`                                                            | `proxy`                                                |
| `gateways.istio-ingressgateway.nodeSelector`                 | Specifies customized node selector for deployment                                                                          | valid node selector                                                             | {}                                                     |
| `gateways.istio-ingressgateway.cpu.targetAverageUtilization` | Specify the CPU target average utilization for ingressgateway                                                              | valid CPU utilization                                                           | `80`                                                   |
| `gateways.istio-ingressgateway.loadBalancerIP`               | Specifies load balancer IP if its type is LoadBalancer                                                                     | valid IP address                                                                | `""`                                                   |
| `gateways.istio-ingressgateway.type`                         | Specifies service type for Ingress Gateway                                                                                 | valid service type                                                              | `LoadBalancer`                                         |
| `gateways.istio-ingressgateway.serviceAnnotations`           | Specifies the annotations for Ingress Gateway service                                                                      | valid service annotations                                                       | {}                                                     |
| `gateways.istio-ingressgateway.ports`                        | Specifies service ports settings for Ingress Gateway                                                                       | valid service ports settings                                                    |                                                        |
| `gateways.istio-ingressgateway.secretVolumes`                | Specifies deployment certs volume settings for Ingress Gateway                                                             | valid deployment volume                                                         |                                                        |
| `gateways.istio-egressgateway.enabled`                       | Specifies whether the Egress Gateway should be installed                                                                   | true/false                                                                      | `true`                                                 |
| `gateways.istio-egressgateway.labels`                        | Specifies labels for Egress Gateway                                                                                        | valid labels                                                                    | `app: istio-egressgateway`                             |
| `gateways.istio-egressgateway.replicaCount`                  | Specifies number of desired pods for Egress Gateway deployment                                                             | number                                                                          | `1`                                                    |
| `gateways.istio-egressgateway.autoscaleMin`                  | Specifies lower limit for the number of pods that can be set by the autoscaler                                             | number                                                                          | `1`                                                    |
| `gateways.istio-egressgateway.autoscaleMax`                  | Specifies upper limit for the number of pods that can be set by the autoscaler                                             | number                                                                          | `5`                                                    |
| `gateways.istio-egressgateway.resources`                     | CPU/Memory for resource requests & limits                                                                                  | valid CPU&memory settings                                                       | {}                                                     |
| `gateways.istio-egressgateway.nodeRole`                      | Specify which node current component will be scheduled to(effective only on IBM Cloud Private)                             | `proxy`/`management`                                                            | `proxy`                                                |
| `gateways.istio-egressgateway.nodeSelector`                  | Specifies customized node selector for deployment                                                                          | valid node selector                                                             | {}                                                     |
| `gateways.istio-egressgateway.cpu.targetAverageUtilization`  | Specify the CPU target average utilization for egressgateway                                                               | valid CPU utilization                                                           | `80`                                                   |
| `gateways.istio-egressgateway.serviceAnnotations`            | Specifies the annotations for Egress Gateway service                                                                       | valid service annotations                                                       | {}                                                     |
| `gateways.istio-egressgateway.type`                          | Specifies service type that used for Egress Gateway                                                                        | valid service type                                                              | `ClusterIP`                                            |
| `gateways.istio-egressgateway.ports`                         | Specifies service ports settings for Egress Gateway                                                                        | valid service ports settings                                                    |                                                        |
| `gateways.istio-egressgateway.secretVolumes`                 | Specifies service secretVolumes settings for Egress Gateway                                                                | valid service ports settings                                                    |                                                        |
| `gateways.istio-ilbgateway.enabled`                          | Specifies whether the Mesh ILB Gateway should be installed                                                                 | true/false                                                                      | `false`                                                |
| `gateways.istio-ilbgateway.labels`                           | Specifies labels for ILB Gateway                                                                                           | valid labels                                                                    | `app: istio-ilbgateway`                                |
| `gateways.istio-ilbgateway.replicaCount`                     | Specifies number of desired pods for Mesh ILB Gateway deployment                                                           | number                                                                          | `1`                                                    |
| `gateways.istio-ilbgateway.autoscaleMin`                     | Specifies lower limit for the number of pods that can be set by the autoscaler                                             | number                                                                          | `1`                                                    |
| `gateways.istio-ilbgateway.autoscaleMax`                     | Specifies upper limit for the number of pods that can be set by the autoscaler                                             | number                                                                          | `5`                                                    |
| `gateways.istio-ilbgateway.resources`                        | CPU/Memory for resource requests & limits                                                                                  | valid CPU&memory settings                                                       | `{requests.cpu: 800m, requests.memory: 512Mi}`         |
| `gateways.istio-ilbgateway.nodeRole`                         | Specify which node current component will be scheduled to(effective only on IBM Cloud Private)                             | `proxy`/`management`                                                            | `proxy`                                                |
| `gateways.istio-ilbgateway.nodeSelector`                     | Specifies customized node selector for deployment                                                                          | valid node selector                                                             | {}                                                     |
| `gateways.istio-ilbgateway.cpu.targetAverageUtilization`     | Specify the CPU target average utilization for ilbgateway                                                                  | valid CPU utilization                                                           | `80`                                                   |
| `gateways.istio-ilbgateway.loadBalancerIP`                   | Specifies load balancer IP if its type is LoadBalancer                                                                     | valid IP address                                                                | `""`                                                   |
| `gateways.istio-ilbgateway.serviceAnnotations`               | Specifies the annotations for ILB Gateway service                                                                          | valid service annotations                                                       | {}                                                     |
| `gateways.istio-ilbgateway.type`                             | Specifies service type for ILB Gateway                                                                                     | valid service type                                                              | `LoadBalancer`                                         |
| `gateways.istio-ilbgateway.ports`                            | Specifies service ports settings for Mesh ILB Gateway                                                                      | valid service ports settings                                                    |                                                        |
| `gateways.istio-ilbgateway.secretVolumes`                    | Specifies service secretVolumes settings for Mesh ILB Gateway                                                              | valid service ports settings                                                    |                                                        |
| `sidecarInjectorWebhook.enabled`                             | Specifies whether the automatic sidecar injector should be installed                                                       | true/false                                                                      | `true`                                                 |
| `sidecarInjectorWebhook.replicaCount`                        | Specifies number of desired pods for automatic sidecar injector webhook                                                    | number                                                                          | `1`                                                    |
| `sidecarInjectorWebhook.enableNamespacesByDefault`           | Specifies use the default namespaces for automatic sidecar injector webhook                                                | true/false                                                                      | `false`                                                |
| `sidecarInjectorWebhook.image.repository`                    | Specifies the Automatic Sidecar Injector image location                                                                    | valid image repository                                                          | `ibmcom/istio-sidecar_injector`                        |
| `sidecarInjectorWebhook.image.tag`                           | Specifies the Automatic Sidecar Injector image version                                                                     | valid image tag                                                                 | `1.0.2`                                                |
| `sidecarInjectorWebhook.resources`                           | CPU/Memory for resource requests & limits                                                                                  | valid CPU&memory settings                                                       | {}                                                     |
| `sidecarInjectorWebhook.nodeRole`                            | Specify which node current component will be scheduled to(effective only on IBM Cloud Private)                             | `proxy`/`management`                                                            | `management`                                           |
| `sidecarInjectorWebhook.nodeSelector`                        | Specifies customized node selector for deployment                                                                          | valid node selector                                                             | {}                                                     |
| `galley.enabled`                                             | Specifies whether Galley should be installed                                                                               | true/false                                                                      | `true`                                                 |
| `galley.replicaCount`                                        | Specifies number of desired pods for Galley deployment                                                                     | number                                                                          | `1`                                                    |
| `galley.image.repository`                                    | Specifies the galley image location                                                                                        | valid image repository                                                          | `ibmcom/istio-galley`                                  |
| `galley.image.tag`                                           | Specifies the galley image version                                                                                         | valid image tag                                                                 | `1.0.2`                                                |
| `galley.resources`                                           | CPU/Memory for resource requests & limits                                                                                  | valid CPU&memory settings                                                       | {}                                                     |
| `galley.nodeRole`                                            | Specify which node current component will be scheduled to(effective only on IBM Cloud Private)                             | `proxy`/`management`                                                            | `management`                                           |
| `galley.nodeSelector`                                        | Specifies customized node selector for deployment                                                                          | valid node selector                                                             | {}                                                     |
| `mixer.enabled`                                              | Specifies whether Mixer should be installed                                                                                | true/false                                                                      | `true`                                                 |
| `mixer.replicaCount`                                         | Specifies number of desired pods for Mixer deployment                                                                      | number                                                                          | `1`                                                    |
| `mixer.image.repository`                                     | Specifies the Mixer image location                                                                                         | valid image repository                                                          | `ibmcom/istio-mixer`                                   |
| `mixer.image.tag`                                            | Specifies the Mixer image version                                                                                          | valid image tag                                                                 | `1.0.2`                                                |
| `mixer.resources`                                            | CPU/Memory for resource requests & limits                                                                                  | valid CPU&memory settings                                                       | {}                                                     |
| `mixer.nodeRole`                                             | Specify which node current component will be scheduled to(effective only on IBM Cloud Private)                             | `proxy`/`management`                                                            | `management`                                           |
| `mixer.nodeSelector`                                         | Specifies customized node selector for deployment                                                                          | valid node selector                                                             | {}                                                     |
| `mixer.istio-policy.autoscaleEnabled`                        | Specifies whether to enable auto scaler for the mixer policy checker                                                       | true/false                                                                      | true                                                   |
| `mixer.istio-policy.autoscaleMin`                            | Specifies lower limit for the number of pods that can be set by the autoscaler                                             | number                                                                          | `1`                                                    |
| `mixer.istio-policy.autoscaleMax`                            | Specifies upper limit for the number of pods that can be set by the autoscaler                                             | number                                                                          | `5`                                                    |
| `mixer.istio-policy.cpu.targetAverageUtilization`            | Specifies the average utilization of cpu                                                                                   | number                                                                          | `80`                                                   |
| `mixer.istio-telemetry.autoscaleEnabled`                     | Specifies whether to enable auto scaler for the mixer telemetry                                                            | true/false                                                                      | true                                                   |
| `mixer.istio-telemetry.autoscaleMin`                         | Specifies lower limit for the number of pods that can be set by the autoscaler                                             | number                                                                          | `1`                                                    |
| `mixer.istio-telemetry.autoscaleMax`                         | Specifies upper limit for the number of pods that can be set by the autoscaler                                             | number                                                                          | `5`                                                    |
| `mixer.istio-telemetry.cpu.targetAverageUtilization`         | Specifies the average utilization of cpu                                                                                   | number                                                                          | `80`                                                   |
| `mixer.prometheusStatsdExporter.repository`                  | Specifies the Prometheus Statsd Exporter image location                                                                    | valid image repository                                                          | `ibmcom/prom-statsd-exporter`                          |
| `mixer.prometheusStatsdExporter.tag`                         | Specifies the Prometheus Statsd Exporter image version                                                                     | valid image tag                                                                 | `v0.6.0`                                               |
| `mixer.prometheusStatsdExporter.resources`                   | CPU/Memory for resource requests & limits                                                                                  | valid CPU&memory settings                                                       | {}                                                     |
| `pilot.enabled`                                              | Specifies whether Pilot should be installed                                                                                | true/false                                                                      | `true`                                                 |
| `pilot.replicaCount`                                         | Specifies number of desired pods for Pilot deployment                                                                      | number                                                                          | `1`                                                    |
| `pilot.autoscaleMin`                                         | Specifies lower limit for the number of pods that can be set by the autoscaler                                             | number                                                                          | `1`                                                    |
| `pilot.autoscaleMax`                                         | Specifies upper limit for the number of pods that can be set by the autoscaler                                             | number                                                                          | `5`                                                    |
| `pilot.image.repository`                                     | Specifies the Pilot image location                                                                                         | valid image repository                                                          | `ibmcom/istio-pilot`                                   |
| `pilot.image.tag`                                            | Specifies the Pilot image version                                                                                          | valid image tag                                                                 | `1.0.2.1`                                              |
| `pilot.sidecar`                                              | Specifies whether to enable the envoy sidecar to Pilot                                                                     | true/false                                                                      | `true`                                                 |
| `pilot.traceSampling`                                        | Specifies the number of trace sample for Pilot                                                                             | number                                                                          | `100.0`                                                |
| `pilot.resources`                                            | CPU/Memory for resource requests & limits                                                                                  | valid CPU&memory settings                                                       | `{requests.cpu: 500m, requests.memory: 2048Mi}`        |
| `pilot.env`                                                  | Specifies ENV variable settings for pilot deployment                                                                       | valid env settings                                                              | `{PILOT_PUSH_THROTTLE_COUNT: 100, GODEBUG: gctrace=2}` |
| `pilot.cpu.targetAverageUtilization`                         | Specifies cpu target average utilization for pilot deployment                                                              | number                                                                          | `80`                                                   |
| `pilot.nodeRole`                                             | Specify which node current component will be scheduled to(effective only on IBM Cloud Private)                             | `proxy`/`management`                                                            | `management`                                           |
| `pilot.nodeSelector`                                         | Specifies customized node selector for deployment                                                                          | valid node selector                                                             | {}                                                     |
| `security.enabled`                                           | Specifies whether Citadel should be installed                                                                              | true/false                                                                      | `true`                                                 |
| `security.replicaCount`                                      | Specifies number of desired pods for Citadel deployment                                                                    | number                                                                          | `1`                                                    |
| `security.selfSigned`                                        | Specifies whether self-signed CA is enabled                                                                                | true/false                                                                      | `true`                                                 |
| `security.image.repository`                                  | Specifies the Citadel image location                                                                                       | valid image repository                                                          | `ibmcom/istio-citadel`                                 |
| `security.image.tag`                                         | Specifies the Citadel image version                                                                                        | valid image tag                                                                 | `1.0.2`                                                |
| `security.resources`                                         | CPU/Memory for resource requests & limits                                                                                  | valid CPU&memory settings                                                       | {}                                                     |
| `security.nodeRole`                                          | Specify which node current component will be scheduled to(effective only on IBM Cloud Private)                             | `proxy`/`management`                                                            | `management`                                           |
| `security.nodeSelector`                                      | Specifies customized node selector for deployment                                                                          | valid node selector                                                             | {}                                                     |
| `telemetry-gateway.gatewayName`                              | Specifies name of gateway used for telemetry addons                                                                        | valid gateway name                                                              | `ingressgateway`                                       |
| `telemetry-gateway.grafanaEnabled`                           | Specifies whether enable the gateway for grafana                                                                           | true/false                                                                      | `false`                                                |
| `telemetry-gateway.prometheusEnabled`                        | Specifies whether enable gateway for prometheus                                                                            | true/false                                                                      | `false`                                                |
| `grafana.enabled`                                            | Specifies whether enable grafana addon should be installed                                                                 | true/false                                                                      | `false`                                                |
| `grafana.replicaCount`                                       | Specifies number of desired pods for grafana                                                                               | number                                                                          | `1`                                                    |
| `grafana.image.repository`                                   | Specifies the Grafana image location                                                                                       | valid image repository                                                          | `ibmcom/istio-grafana`                                 |
| `grafana.image.tag`                                          | Specifies the Grafana image version                                                                                        | valid image tag                                                                 | `1.0.2.1`                                              |
| `grafana.persist`                                            | Specifies whether enable date persistence for the grafana deployment                                                       | true/false                                                                      | `false`                                                |
| `grafana.storageClassName`                                   | Specifies storage class name for the grafana deployment                                                                    | valid storage class name                                                        | `""`                                                   |
| `grafana.security.enabled`                                   | Specifies security for the grafana service                                                                                 | true/false                                                                      | `false`                                                |
| `grafana.security.secretName`                                | Specifies secret name that contains username and passphrase for the Grafana dashboard                                      | valid secret name                                                               | `grafana`                                              |
| `grafana.security.usernameKey`                               | Specifies the username key for the secret that contains username for the Grafana dashboard                                 | valid secret key string                                                         | `username`                                             |
| `grafana.security.passphraseKey`                             | Specifies the passphrase key for the secret that contains passphrase for the Grafana dashboard                             | valid secret key string                                                         | `passphrase`                                           |
| `grafana.service.name`                                       | Specifies name for the Grafana service                                                                                     | valid service name                                                              | `http`                                                 |
| `grafana.service.annotations`                                | Specifies the annotation for the Grafana service                                                                           | valid service annotation                                                        | {}                                                     |
| `grafana.service.type`                                       | Specifies type for the Grafana service                                                                                     | valid service type                                                              | `ClusterIP`                                            |
| `grafana.service.externalPort`                               | Specifies external port for the Grafana service                                                                            | valid service port                                                              | `3000`                                                 |
| `grafana.resources`                                          | CPU/Memory for resource requests & limits                                                                                  | valid CPU&memory settings                                                       | {}                                                     |
| `grafana.nodeRole`                                           | Specify which node current component will be scheduled to(effective only on IBM Cloud Private)                             | `proxy`/`management`                                                            | `management`                                           |
| `grafana.nodeSelector`                                       | Specifies customized node selector for deployment                                                                          | valid node selector                                                             | {}                                                     |
| `prometheus.enabled`                                         | Specifies whether Prometheus addon should be installed                                                                     | true/false                                                                      | `true`                                                 |
| `prometheus.replicaCount`                                    | Specifies number of desired pods for Prometheus                                                                            | number                                                                          | `1`                                                    |
| `prometheus.image.repository`                                | Specifies the Prometheus image location                                                                                    | valid image repository                                                          | `ibmcom/prometheus`                                    |
| `prometheus.image.tag`                                       | Specifies the Prometheus image version                                                                                     | valid image tag                                                                 | `v2.3.1-f2`                                            |
| `prometheus.service.annotations`                             | Specifies the annotation for the Prometheus service                                                                        | valid service annotations                                                       | `{}`                                                   |
| `prometheus.service.nodePort.enabled`                        | Specifies whether to enable Node Port for Prometheus service                                                               | true/false                                                                      | `false`                                                |
| `prometheus.service.nodePort.port`                           | Specifies Node Port for Prometheus service                                                                                 | valid service Node Port                                                         | `32090`                                                |
| `prometheus.resources`                                       | CPU/Memory for resource requests & limits                                                                                  | valid CPU&memory settings                                                       | {}                                                     |
| `prometheus.nodeRole`                                        | Specify which node current component will be scheduled to(effective only on IBM Cloud Private)                             | `proxy`/`management`                                                            | `management`                                           |
| `prometheus.nodeSelector`                                    | Specifies customized node selector for deployment                                                                          | valid node selector                                                             | {}                                                     |
| `servicegraph.enabled`                                       | Specifies whether Servicegraph addon should be installed                                                                   | true/false                                                                      | `false`                                                |
| `servicegraph.replicaCount`                                  | Specifies number of desired pods for Servicegraph deployment                                                               | number                                                                          | `1`                                                    |
| `servicegraph.image.repository`                              | Specifies the Servicegraph image location                                                                                  | valid image repository                                                          | `ibmcom/istio-servicegraph`                            |
| `servicegraph.image.tag`                                     | Specifies the Servicegraph image version                                                                                   | valid image tag                                                                 | `1.0.2`                                                |
| `servicegraph.service.annotations`                           | Specifies the annotation for the Servicegraph service                                                                      | valid service annotation                                                        | {}                                                     |
| `servicegraph.service.name`                                  | Specifies name for the Servicegraph service                                                                                | valid service name                                                              | `http`                                                 |
| `servicegraph.service.type`                                  | Specifies type for the Servicegraph service                                                                                | valid service type                                                              | `ClusterIP`                                            |
| `servicegraph.service.externalPort`                          | Specifies external port for the Servicegraph service                                                                       | valid service port                                                              | `8088`                                                 |
| `servicegraph.ingress.enabled`                               | Specifies whether ingress for Servicegraph should be enabled                                                               | true/false                                                                      | `false`                                                |
| `servicegraph.ingress.hosts`                                 | Specify the hosts for Servicegraph ingress                                                                                 | array consists of valid hosts                                                   | []                                                     |
| `servicegraph.ingress.annotations`                           | Specify the annotations for Servicegraph ingress                                                                           | object consists of valid annotations                                            | {}                                                     |
| `servicegraph.ingress.tls`                                   | Specify the TLS settigs for Servicegraph ingress                                                                           | array consists of valid TLS settings                                            | []                                                     |
| `servicegraph.resources`                                     | CPU/Memory for resource requests & limits                                                                                  | valid CPU&memory settings                                                       | {}                                                     |
| `servicegraph.nodeRole`                                      | Specify which node current component will be scheduled to(effective only on IBM Cloud Private)                             | `proxy`/`management`                                                            | `management`                                           |
| `servicegraph.nodeSelector`                                  | Specifies customized node selector for deployment                                                                          | valid node selector                                                             | {}                                                     |
| `servicegraph.prometheusAddr`                                | Specify the prometheus address on Servicegraph                                                                             | valid address                                                                   | `http://prometheus:9090`                               |
| `tracing.enabled`                                            | Specifies whether Tracing addon should be installed                                                                        | true/false                                                                      | `false`                                                |
| `tracing.provider`                                           | Specifies which the provider for tracing service                                                                           | valid tracing provider                                                          | `jaeger`                                               |
| `tracing.jaeger.image.repository`                            | Specifies the jaeger image location                                                                                        | valid image repository                                                          | `ibmcom/jaegertracing-all-in-one`                      |
| `tracing.jaeger.image.tag`                                   | Specifies the jaeger image version                                                                                         | valid image tag                                                                 | `1.7`                                                  |
| `tracing.jaeger.memory.max_traces`                           | Specifies max traces limits for Jaeger                                                                                     | valid number                                                                    | `50000`                                                |
| `tracing.jaeger.ingress.enabled`                             | Specifies whether Jaeger ingress should be enabled                                                                         | true/false                                                                      | `false`                                                |
| `tracing.jaeger.ingress.hosts`                               | Specify the hosts for jaeger ingress                                                                                       | array consists of valid hosts                                                   | []                                                     |
| `tracing.jaeger.ingress.annotations`                         | Specify the annotations for jaeger ingress                                                                                 | object consists of valid annotations                                            | {}                                                     |
| `tracing.jaeger.ingress.tls`                                 | Specify the TLS settigs for jaeger ingress                                                                                 | array consists of valid TLS settings                                            | []                                                     |
| `tracing.replicaCount`                                       | Specifies number of desired pods for Tracing deployment                                                                    | number                                                                          | `1`                                                    |
| `tracing.service.annotations`                                | Specifies annotations for the Tracing service                                                                              | valid service annotations                                                       | `{}`                                                   |
| `tracing.service.name`                                       | Specifies name for the Tracing service                                                                                     | valid service name                                                              | `http`                                                 |
| `tracing.service.type`                                       | Specifies type for the Tracing service                                                                                     | valid service type                                                              | `ClusterIP`                                            |
| `tracing.service.externalPort`                               | Specifies external port for the Tracing service                                                                            | valid service port                                                              | `9411`                                                 |
| `tracing.ingress.enabled`                                    | Specifies whether ingress for Tracing should be enabled                                                                    | true/false                                                                      | `false`                                                |
| `tracing.ingress.hosts`                                      | Specify the hosts for Tracing ingress                                                                                      | array consists of valid hosts                                                   | []                                                     |
| `tracing.ingress.annotations`                                | Specify the annotations for Tracing ingress                                                                                | object consists of valid annotations                                            | {}                                                     |
| `tracing.ingress.tls`                                        | Specify the TLS settigs for Tracing ingress                                                                                | array consists of valid TLS settings                                            | []                                                     |
| `tracing.resources`                                          | CPU/Memory for resource requests & limits                                                                                  | valid CPU&memory settings                                                       | {}                                                     |
| `tracing.nodeRole`                                           | Specify which node current component will be scheduled to(effective only on IBM Cloud Private)                             | `proxy`/`management`                                                            | `management`                                           |
| `tracing.nodeSelector`                                       | Specifies customized node selector for deployment                                                                          | valid node selector                                                             | {}                                                     |
| `kiali.enabled`                                              | Specifies whether kiali addon should be installed                                                                          | true/false                                                                      | `false`                                                |
| `kiali.replicaCount`                                         | Specifies number of desired pods for kiali                                                                                 | number                                                                          | `1`                                                    |
| `kiali.image.repository`                                     | Specifies the kiali image location                                                                                         | valid image repository                                                          | `ibmcom/kiali`                                         |
| `kiali.image.tag`                                            | Specifies the kiali image version                                                                                          | valid image tag                                                                 | `v0.8.0.1`                                             |
| `kiali.ingress.enabled`                                      | Specifies whether the kiali ingress enabled                                                                                | true/false                                                                      | `false`                                                |
| `kiali.ingress.hosts`                                        | Specify the hosts for Kiali ingress                                                                                        | array consists of valid hosts                                                   | []                                                     |
| `kiali.ingress.annotations`                                  | Specify the annotations for Kiali ingress                                                                                  | object consists of valid annotations                                            | {}                                                     |
| `kiali.ingress.tls`                                          | Specify the TLS settigs for Kiali ingress                                                                                  | array consists of valid TLS settings                                            | []                                                     |
| `kiali.dashboard.secretName`                                 | Specifies secret name that contains username and passphrase for the Kiali dashboard                                        | valid secret name                                                               | `kiali`                                                |
| `kiali.dashboard.usernameKey`                                | Specifies the username key for the secret that contains username for the Kiali dashboard                                   | valid secret key string                                                         | `username`                                             |
| `kiali.dashboard.passphraseKey`                              | Specifies the passphrase key for the secret that contains passphrase for the Kiali dashboard                               | valid secret key string                                                         | `passphrase`                                           |
| `kiali.resources`                                            | CPU/Memory for resource requests & limits                                                                                  | valid CPU&memory settings                                                       | {}                                                     |
| `kiali.nodeRole`                                             | Specify which node current component will be scheduled to(effective only on IBM Cloud Private)                             | `proxy`/`management`                                                            | `management`                                           |
| `kiali.nodeSelector`                                         | Specifies customized node selector for deployment                                                                          | valid node selector                                                             | {}                                                     |
| `certmanager.enabled`                                        | Specifies whether the Cert Manager addon should be installed                                                               | true/false                                                                      | `false`                                                |
| `certmanager.image.repository`                               | Specifies the Cert Manager image location                                                                                  | valid image repository                                                          | `ibmcom/cert-manager`                                  |
| `certmanager.image.tag`                                      | Specifies the Cert Manager image version                                                                                   | valid image tag                                                                 | `v0.3.1`                                               |
| `certmanager.extraArgs`                                      | Specifies the extra argument for Cert Manager                                                                              | valid arguments                                                                 | []                                                     |
| `certmanager.podAnnotations`                                 | Specifies the annotations for Cert Manager pod                                                                             | valid annotation                                                                | {}                                                     |
| `certmanager.podLabels`                                      | Specifies the labels for Cert Manager pod                                                                                  | valid label                                                                     | {}                                                     |
| `certmanager.podDnsPolicy`                                   | Specifies the pod DNS policy                                                                                               | valid DNS policy                                                                | `ClusterFirst`                                         |
| `certmanager.podDnsConfig`                                   | Specifies the pod DNS configuration                                                                                        | valid Configuration                                                             | {}                                                     |
| `certmanager.email`                                          | Specifies the email for certmanager                                                                                        | valid email                                                                     | `""`                                                   |
| `certmanager.resources`                                      | CPU/Memory for resource requests & limits                                                                                  | valid CPU&memory settings                                                       | {}                                                     |
| `certmanager.nodeRole`                                       | Specify which node current component will be scheduled to(effective only on IBM Cloud Private)                             | `proxy`/`management`                                                            | `management`                                           |
| `certmanager.nodeSelector`                                   | Specifies customized node selector for deployment                                                                          | valid node selector                                                             | {}                                                     |

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

And then remove the CRDs by running the command:

```
$ kubectl delete -f ../ibm-istio/templates/crds.yaml
```

If you have enabled `certmanager`, you also need to remove its CRDs:

```
$ kubectl delete -f ../ibm-istio/charts/certmanager/templates/crds.yaml
```

## Limitations

- In a [multicluster deployment](https://istio.io/docs/setup/kubernetes/multicluster-install) the mixer-telemetry and mixer-policy components do not connect to the Kubernetes API endpoints of any of the remote clusters. This results in a loss of telemetry fidelity as some of the metadata associated with workloads on remote clusters is incomplete.

- Currently ICP Catalog UI doesn't support input type of `array` and `object`, any customization for field of these two types should be done via helm command-line instead of ICP Catalog UI.
