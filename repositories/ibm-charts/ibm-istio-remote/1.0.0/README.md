# `@helm-charts/ibm-charts-ibm-istio-remote`

Helm chart needed for remote Kubernetes clusters to join the main Istio control plane

| Field               | Value            |
| ------------------- | ---------------- |
| Repository Name     | ibm-charts       |
| Chart Name          | ibm-istio-remote |
| Chart Version       | 1.0.0            |
| NPM Package Version | 0.1.0            |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for ibm-istio-remote-chart.
# Use with Kubernetes 1.9+
# This is a YAML-formatted file.
# Declare name/value pairs to be passed into your templates.
# name: value

# Common settings.
global:
  proxy:
    repository: ibmcom/istio-proxyv2
    tag: 1.0.0

    resources:
      requests:
        cpu: 100m
        memory: 128Mi
      # limits:
      #   cpu: 100m
      #   memory: 128Mi

    # Configures the access log for each sidecar. Setting it to an empty string will
    # disable access log for sidecar.
    accessLogFile: '/dev/stdout'

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
    # For remote clusters the host should be the statsd prom bridge in the primary control plane cluster.
    envoyStatsd:
      enabled: false
      host: ''
      port: 9125

  # proxy_init image is the image used to configure iptables.
  proxyInit:
    repository: ibmcom/istio-proxy_init
    tag: 1.0.0

  # imagePullPolicy is applied to istio control plane components.
  imagePullPolicy: IfNotPresent

  # Not recommended for user to configure this. Hyperkube image to use when creating custom resources
  kubectl:
    repository: ibmcom/kubectl
    tag: v1.10.0

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

  # If true, create a headless service and endpoint for istio-pilot with the remotePilotAddress and
  # sets the MeshConfig configmap discoveryAddress to 'istio-pilot.<namespace>'
  remotePilotCreateSvcEndpoint: false

  # Remote Istio endpoints. Can be hostnames or IP addresses
  # The Pilot address is required. The others are optional.
  remotePilotAddress: ''
  remotePolicyAddress: ''
  remoteTelemetryAddress: ''
  remoteZipkinAddress: ''

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

  # Omit the istio-sidecar-injector configmap when generate a
  # standalone gateway. Gateways may be created in namespaces other
  # than `istio-system` and we don't want to re-create the injector
  # configmap in those.
  omitSidecarInjectorConfigMap: false

  # Kubernetes >=v1.11.0 will create two PriorityClass, including system-cluster-critical and
  # system-node-critical, it is better to configure this in order to make sure your Istio pods
  # will not be killed because of low prioroty class.
  # Refer to https://kubernetes.io/docs/concepts/configuration/pod-priority-preemption/#priorityclass
  # for more detail.
  priorityClassName: ''

  # Specify(true or false) whether to scheduled to proxy node with label: "proxy"="true" :
  proxyNode: true
  # Specify(true or false) whether to scheduled to dedicated node as addon :
  dedicated: true
  # Specify extra node selector.
  extraNodeSelector: {}
  # Specify architecture and weight to be  used for scheduling as follows :
  #   0 - Do not use
  #   1 - Least preferred
  #   2 - No preference
  #   3 - Most preferred
  arch:
    amd64: '2 - No preference'

#
# sidecar-injector webhook configuration
#
sidecarinjectorwebhook:
  enabled: true
  replicaCount: 1
  enableNamespacesByDefault: false
  image:
    repository: ibmcom/istio-sidecar_injector
    tag: 1.0.0
  resources: {}

#
# security configuration
#
security:
  replicaCount: 1
  selfSigned: true # indicate if self-signed CA is used.
  image:
    repository: ibmcom/istio-citadel
    tag: 1.0.0
  resources: {}
```

</details>

---

# Istio-Remote

[Istio](https://istio.io/) is an open platform for providing a uniform way to integrate microservices, manage traffic flow across microservices, enforce policies and aggregate telemetry data.

## Introduction

This chart is installed on remote clusters to connect with the Istio control plane on a local cluster, to support the [Istio multi-cluster](https://istio.io/docs/setup/kubernetes/multicluster-install/) feature.

Multicluster functions by enabling Kubernetes control planes running a remote configuration to connect to **one** Istio control plane. Once one or more remote Kubernetes clusters are connected to the Istio control plane, Envoy can then communicate with the **single** Istio control plane and form a mesh network across multiple Kubernetes clusters.

## Chart Details

This chart will install the security (Citadel) and sidecar injector webhook(optional) components and create a headless service and endpoint for `istio-pilot` with the `remotePilotAddress`.

## Prerequisites

- A user with `cluster-admin` ClusterRole is required to install the chart.
- Kubernetes 1.9 or newer cluster with RBAC (Role-Based Access Control) enabled is required.
- Wait for the Istio control plane to finish initializing and then run these operations on the Istio control plane cluster to capture the Istio control-plane service endpoints–e.g. `Pilot`, `Policy`, and `Statsd` Pod IP endpoints.

```
export PILOT_POD_IP=$(kubectl -n istio-system get pod -l istio=pilot -o jsonpath='{.items[0].status.podIP}')
export POLICY_POD_IP=$(kubectl -n istio-system get pod -l istio-mixer-type=policy -o jsonpath='{.items[0].status.podIP}')
export STATSD_POD_IP=$(kubectl -n istio-system get pod -l istio=statsd-prom-bridge -o jsonpath='{.items[0].status.podIP}')
export TELEMETRY_POD_IP=$(kubectl -n istio-system get pod -l istio-mixer-type=telemetry -o jsonpath='{.items[0].status.podIP}')
export ZIPKIN_POD_IP=$(kubectl -n istio-system get pod -l app=jaeger -o jsonpath='{range .items[*]}{.status.podIP}{end}')
```

Then copy these environment variables to each node before using Helm to connect the remote cluster to the Istio control plane.

## Resources Required

The chart deploys pods that consume minimum resources as specified in the resources configuration parameters.

## Installing the Chart

1. Create namespace `istio-system` for the chart:

```
$ kubectl create ns istio-system
```

2. To install the chart with the release name `istio-remote` in namespace `istio-system`:

```
$ helm install ../ibm-istio-remote --name istio-remote  --namespace istio-system --set global.remotePilotAddress=${PILOT_POD_IP} --set global.remotePolicyAddress=${POLICY_POD_IP} --set global.remoteTelemetryAddress=${TELEMETRY_POD_IP} --set global.proxy.envoyStatsd.enabled=true --set global.proxy.envoyStatsd.host=${STATSD_POD_IP} --set global.remoteZipkinAddress=${ZIPKIN_POD_IP}
```

**Note**: Currently, only one instance of Istio or Istio-Remote can be installed on a cluster at a time.

## Configuration

The `istio-remote` helm chart requires the four specific variables to be configured as defined in the following table:

| Parameter                                          | Description                                                                                                           | Values                                                                          | Default                                        |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------- |
| `global.proxy.repository`                          | Specifies the proxy image location                                                                                    | valid image repository                                                          | `ibmcom/istio-proxyv2`                         |
| `global.proxy.tag`                                 | Specifies the proxy image version                                                                                     | valid image tag                                                                 | `1.0.0`                                        |
| `global.proxy.resources`                           | CPU/Memory for resource requests & limits                                                                             | valid CPU&memory settings                                                       | `{requests.cpu: 100m, requests.memory: 128Mi}` |
| `global.proxy.accessLogFile`                       | Specifies the access log for each sidecar, an empty string will disable access log for sidecar                        | valid file path or empty string                                                 | `/dev/stdout`                                  |
| `global.proxy.enableCoreDump`                      | Specifies whether to enable debug information for envoy sidecar                                                       | true/false                                                                      | `false`                                        |
| `global.proxy.includeIPRanges`                     | Specifies istio egress capture whitelist                                                                              | example: includeIPRanges: "172.30.0.0/16,172.20.0.0/16"                         | `*`                                            |
| `global.proxy.excludeIPRanges`                     | Specifies istio egress capture blacklist                                                                              | example: excludeIPRanges: "172.40.0.0/16,172.50.0.0/16"                         | `""`                                           |
| `global.proxy.excludeInboundPorts`                 | Specifies istio egress capture port blacklist                                                                         | example: excludeInboundPorts: "81:8081"                                         | `""`                                           |
| `global.proxy.autoInject`                          | Specifies whether to enable ingress and egress policy for envoy sidecar                                               | `enabled`/`disabled`                                                            | `enabled`                                      |
| `global.proxy.envoyStatsd.enabled`                 | Specifies whether to enable the destination statsd in envoy                                                           | true/false                                                                      | `true`                                         |
| `global.proxy.envoyStatsd.host`                    | Specifies host for the destination statsd in envoy                                                                    | destination statsd host                                                         | `istio-statsd-prom-bridge`                     |
| `global.proxy.envoyStatsd.port`                    | Specifies host port for the destination statsd in envoy                                                               | destination statsd port                                                         | `9125`                                         |
| `global.proxyInit.repository`                      | Specifies the proxy init image location                                                                               | valid image repository                                                          | `ibmcom/istio-proxy_init`                      |
| `global.proxyInit.tag`                             | Specifies the proxy init image version                                                                                | valid image tag                                                                 | `1.0.0`                                        |
| `global.imagePullPolicy`                           | Specifies the image pull policy                                                                                       | valid image pull policy                                                         | `IfNotPresent`                                 |
| `global.kubectl.repository`                        | Specifies the kubectl image location                                                                                  | valid image repository                                                          | `ibmcom/kubectl`                               |
| `global.kubectl.tag`                               | Specifies the kubectl image version                                                                                   | valid image tag                                                                 | `v1.10.0`                                      |
| `global.controlPlaneSecurityEnabled`               | Specifies whether control plane mTLS is enabled                                                                       | true/false                                                                      | `false`                                        |
| `global.disablePolicyChecks`                       | Specifies whether to disables mixer policy checks                                                                     | true/false                                                                      | `false`                                        |
| `global.enableTracing`                             | Specifies whether to enables the Tracing                                                                              | true/false                                                                      | `true`                                         |
| `global.mtls.enabled`                              | Specifies whether mTLS is enabled by default between services                                                         | true/false                                                                      | `false`                                        |
| `global.imagePullSecrets`                          | Specifies image pull secrets for private docker registry                                                              | array consists of imagePullSecret                                               | []                                             |
| `global.remotePilotCreateSvcEndpoint`              | Specifies whether to create a headless service and endpoint for `istio-pilot` with the `remotePilotAddress`           | true/false                                                                      | `false`                                        |
| `global.remotePilotAddress`                        | Specifies the pilot Pod IP address for the Istio control plane                                                        | valid pod IP address                                                            | `""`                                           |
| `global.remotePolicyAddress`                       | Specifies the mixer policy Pod IP address for the Istio control plane                                                 | valid pod IP address                                                            | `""`                                           |
| `global.remoteTelemetryAddress`                    | Specifies the mixer telemetry Pod IP address for the Istio control plane                                              | valid pod IP address                                                            | `""`                                           |
| `global.remoteZipkinAddress`                       | Specifies the tracing Pod IP address for the Istio control plane                                                      | valid pod IP address                                                            | `""`                                           |
| `gobal.defaultResources`                           | Specifies resources(CPU/Memory) requests & limits applied to all deployments                                          | valid CPU&memory settings                                                       | `{requests.cpu: 10m}`                          |
| `global.omitSidecarInjectorConfigMap`              | Specifies whether to omit the istio-sidecar-injector configmap when generate a standalone gateway                     | true/false                                                                      | `false`                                        |
| `global.priorityClassName`                         | Specifies priority class to make sure Istio pods will not be evicted because of low prioroty class                    | valid priority class name                                                       | `""`                                           |
| `global.proxyNode`                                 | Specifies whether to deploy to proxy node with labels `proxy=true`(effective only on IBM Cloud Private)               | true/false                                                                      | `true`                                         |
| `global.dedicated`                                 | Specifies whether to deploy to dedicated node with taint `dedicated=:NoSchedule`(effective only on IBM Cloud Private) | true/false                                                                      | `true`                                         |
| `global.extraNodeSelector`                         | Specifies customized node selector for all components                                                                 | valid node selector                                                             | {}                                             |
| `global.arch.amd64`                                | Architecture preference for amd64 node                                                                                | `0 - Do not use`/`1 - Least preferred`/`2 - No preference`/`3 - Most preferred` | `2 - No preference`                            |
| `sidecarinjectorwebhook.enabled`                   | Specifies whether the Automatic Sidecar Injector should be installed                                                  | true/false                                                                      | `true`                                         |
| `sidecarinjectorwebhook.replicaCount`              | Specifies number of desired pods for Automatic Sidecar Injector Webhook                                               | number                                                                          | `1`                                            |
| `sidecarinjectorwebhook.enableNamespacesByDefault` | Specifies use the default namespaces for Automatic Sidecar Injector Webhook                                           | true/false                                                                      | `false`                                        |
| `sidecarinjectorwebhook.image.repository`          | Specifies the Automatic Sidecar Injector image location                                                               | valid image repository                                                          | `ibmcom/istio-sidecar_injector`                |
| `sidecarinjectorwebhook.image.tag`                 | Specifies the Automatic Sidecar Injector image version                                                                | valid image tag                                                                 | `1.0.0`                                        |
| `sidecarinjectorwebhook.resources`                 | CPU/Memory for resource requests & limits                                                                             | valid CPU&memory settings                                                       | {}                                             |
| `security.replicaCount`                            | Specifies number of desired pods for Citadel deployment                                                               | number                                                                          | `1`                                            |
| `security.selfSigned`                              | Specifies whether self-signed CA is enabled                                                                           | true/false                                                                      | `true`                                         |
| `security.image.repository`                        | Specifies the Citadel image location                                                                                  | valid image repository                                                          | `ibmcom/istio-citadel`                         |
| `security.image.tag`                               | Specifies the Citadel image version                                                                                   | valid image tag                                                                 | `1.0.0`                                        |
| `security.resources`                               | CPU/Memory for resource requests & limits                                                                             | valid CPU&memory settings                                                       | {}                                             |

## Uninstalling the Chart

To uninstall/delete the `istio-remote` release:

```
$ helm delete istio-remote
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

To uninstall/delete the `istio-remote` release completely and make its name free for later use:

```
$ helm delete istio-remote --purge
```

## Limitations

- In a [multicluster deployment](https://istio.io/docs/setup/kubernetes/multicluster-install) the mixer-telemetry and mixer-policy components do not connect to the Kubernetes API endpoints of any of the remote clusters. This results in a loss of telemetry fidelity as some of the metadata associated with workloads on remote clusters is incomplete.

- The `pilotEndpoint`, `policyEndpoint`, `statsdEndpoint`, `zipkinEndpoint` endpoints need to be resolvable via Kubernetes. The simplest approach to enabling resolution for these variables is to specify the Pod IP of the various services. One problem with this is Pod IPs change during the lifetime of the service.

- Currently ICP Catalog UI doesn't support input type of `array` and `object`, customization for these fields should be done via helm command-line instead of ICP Catalog UI.
