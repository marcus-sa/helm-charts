# `@helm-charts/incubator-istio`

Istio Helm chart for Kubernetes

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | incubator    |
| Chart Name          | istio        |
| Chart Version       | 0.1.6-chart1 |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Install Default RBAC roles and bindings
rbac:
  install: false
  apiVersion: v1beta1

istioRelease: 0.1.6

## Enable Istio auth feature
## This deploys a CA in the namespace and enables mTLS between the services
auth:
  enabled: true

## Mixer configuration
mixer:
  service:
    type: ClusterIP
    annotations: {}
    externalTcpPort: 9091
    externalConfigApiPort: 9094
    externalPrometheusPort: 42422

  deployment:
    name: mixer
    image: docker.io/istio/mixer
    imagePullPolicy: Always
    replicas: 1
    annotations:
      alpha.istio.io/sidecar: ignore
    resources:
      limits:
        cpu: 100m
        memory: 128Mi
      requests:
        cpu: 100m
        memory: 128Mi

## Pilot configuration
pilot:
  name: istio-pilot
  customConfigMap: false

  service:
    type: ClusterIP
    externalHttpDiscovery: 8080
    externalHttpApiServer: 8081

  deployment:
    replicas: 1
    annotations:
      alpha.istio.io/sidecar: ignore

    discovery:
      name: discovery
      image: docker.io/istio/pilot
      imagePullPolicy: Always
      resources:
        limits:
          cpu: 100m
          memory: 128Mi
        requests:
          cpu: 100m
          memory: 128Mi

    apiserver:
      name: apiserver
      image: docker.io/istio/pilot
      imagePullPolicy: Always
      resources:
        limits:
          cpu: 100m
          memory: 128Mi
        requests:
          cpu: 100m
          memory: 128Mi

## Ingress configuration
ingress:
  service:
    type: LoadBalancer
    externalHttpPort: 80
    externalHttpsPort: 443

  deployment:
    name: ingress
    annotations:
      alpha.istio.io/sidecar: ignore
    image: docker.io/istio/proxy_debug
    imagePullPolicy: Always
    replicas: 1
    resources:
      limits:
        cpu: 100m
        memory: 128Mi
      requests:
        cpu: 100m
        memory: 128Mi

## Engress configuration
egress:
  service:
    type: ClusterIP
    externalHttpPort: 80

  deployment:
    name: egress
    annotations:
      alpha.istio.io/sidecar: ignore
    image: docker.io/istio/proxy_debug
    imagePullPolicy: Always
    replicas: 1
    resources:
      limits:
        cpu: 100m
        memory: 128Mi
      requests:
        cpu: 100m
        memory: 128Mi

## CA configuration
## Only installed if auth.enabled
ca:
  deployment:
    name: ca
    annotations:
      # alpha.istio.io/sidecar: ignore
    image: docker.io/istio/istio-ca
    imagePullPolicy: IfNotPresent
    replicas: 1
    resources:
      limits:
        cpu: 100m
        memory: 128Mi
      requests:
        cpu: 100m
        memory: 128Mi

## Addons configuration
## Each addon may be disabled
addons:
  zipkin:
    enabled: true

    service:
      type: ClusterIP
      externalPort: 9411

    deployment:
      name: zipkin
      annotations:
        alpha.istio.io/sidecar: ignore
      image: docker.io/openzipkin/zipkin
      imageTag: latest
      imagePullPolicy: IfNotPresent
      replicas: 1
      resources:
        limits:
          cpu: 100m
          memory: 128Mi
        requests:
          cpu: 100m
          memory: 128Mi

  prometheus:
    enabled: true

    service:
      type: ClusterIP
      externalPort: 9090
      annotations:
        prometheus.io/scrape: 'true'

    deployment:
      name: prometheus
      annotations:
        alpha.istio.io/sidecar: ignore
      image: quay.io/coreos/prometheus
      imageTag: v1.1.1
      imagePullPolicy: IfNotPresent
      replicas: 1
      resources:
        limits:
          cpu: 100m
          memory: 128Mi
        requests:
          cpu: 100m
          memory: 128Mi

  grafana:
    enabled: true

    service:
      type: ClusterIP
      externalPort: 3000

    deployment:
      name: grafana
      annotations:
        alpha.istio.io/sidecar: ignore
      image: docker.io/istio/grafana
      imagePullPolicy: Always
      replicas: 1
      resources:
        limits:
          cpu: 100m
          memory: 128Mi
        requests:
          cpu: 100m
          memory: 128Mi

  servicegraph:
    enabled: true

    service:
      type: ClusterIP
      externalPort: 8088

    deployment:
      name: servicegraph
      annotations:
        alpha.istio.io/sidecar: ignore
      image: gcr.io/istio-testing/servicegraph
      imageTag: latest
      imagePullPolicy: Always
      replicas: 1
      resources:
        limits:
          cpu: 100m
          memory: 128Mi
        requests:
          cpu: 100m
          memory: 128Mi
```

</details>

---

# Istio

[Istio](https://istio.io/), Istio is an open platform that provides a uniform way to connect, manage, and secure microservices. Istio supports managing traffic flows between microservices, enforcing access policies, and aggregating telemetry data, all without requiring changes to the microservice code.

## TL;DR;

> **Note**: Istio pilot currently looks for hardcoded configmap of name "istio" in the installed namespace which means that you can only install the chart once per namespace.

```console
$ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
$ helm install incubator/istio
```

## Introduction

This chart bootstraps a [Istio](https://istio.io/) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.5+
- istioctl

### istioctl installation steps

Run

```console
curl -L https://git.io/getIstio | sh -
```

to download and extract the latest release automatically (on MacOS and Ubuntu), the `istioctl` client will be added to your PATH by the above shell command.

## RBAC

By default the chart is installed without associated RBAC roles and rolebindings. If you would like to install the provided roles and rolebindings please do the following:

```
$ helm install incubator/istio --set rbac.install=true
```

This will install the associated RBAC roles and rolebindings using beta annotations.

To determine if your cluster supports this running the following:

```console
$ kubectl api-versions | grep rbac
```

You also need to have the following parameter on the api server. See the following document for how to enable [RBAC](https://kubernetes.io/docs/admin/authorization/rbac/)

```
--authorization-mode=RBAC
```

If the output contains "beta" or both "alpha" and "beta" you can proceed with normal installation.

### Changing RBAC manifest apiVersion

By default the RBAC resources are generated with the "v1beta1" apiVersion. To use "v1alpha1" do the following:

```console
$ helm install --name my-release incubator/istio --set rbac.install=true,rbac.apiVersion=v1alpha1
```

If it does not. Follow the steps below to disable.

### Disable RBAC role/rolebinding creation

If you don't want the RBAC roles and bindings to be created by the installation of this chart simply install the default chart.

```console
$ helm install --name my-release incubator/istio
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
$ helm install --name my-release incubator/istio
```

The command deploys Istio on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Istio chart and their default values.

> **Tip**: You can use the default [values.yaml](values.yaml)

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|           |             |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install stable/istio --name my-release \
    --set auth.enabled=flase
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install incubator/istio --name my-release -f values.yaml
```

## Custom ConfigMap

When creating a new chart with this chart as a dependency, customConfigMap can be used to override the default config map provided. To use, set the value to true and provide the file `templates/configmap.yaml` for your use case. If you start by copying `configmap.yaml` from this chart and want to access values from this chart you must change all references from `.Values` to `.Values.istio`.

```
pilot:
  customConfigMap: true
```

### Addons

Istio ships with several preconfigured addons

- Grafana
- Prometheus
- ServiceGraph
- Zipkin

These addons can be selectively installed by setting `addons.<addon-name>.enabled=false` in values.yaml or by using the `--set` command
