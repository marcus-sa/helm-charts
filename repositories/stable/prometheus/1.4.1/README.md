# `@helm-charts/stable-prometheus`

A Prometheus Helm chart for Kubernetes. Prometheus is a monitoring system and time series database.

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | prometheus |
| Chart Version       | 1.4.1      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
alertmanager:
  ## Alertmanager service port
  ##
  httpPort: 80

  ## Alertmanager service port name
  ## Default: 'http'
  ##
  # httpPortName: http

  ## Alertmanager Docker image
  ##
  image: prom/alertmanager:v0.5.1

  ingress:
    ## If true, Alertmanager Ingress will be created
    ##
    enabled: false

    ## Alertmanager Ingress annotations
    ##
    # annotations:
    #   kubernetes.io/ingress.class: nginx
    #   kubernetes.io/tls-acme: 'true'
    ## Alertmanager Ingress hostnames
    ## Must be provided if Ingress is enabled
    ##
    # hosts:
    #   - alertmanager.domain.com
    ## Alertmanager Ingress TLS configuration
    ## Secrets must be manually created in the namespace
    ##
    # tls:
    #   - secretName: prometheus-alerts-tls
    #     hosts:
    #       - alertmanager.domain.com

  ## Alertmanager container name
  ##
  name: alertmanager

  persistentVolume:
    ## If true, AlertManager will create a Persistent Volume Claim
    ## If false, use emptyDir
    ##
    enabled: true

    ## AlertManager data Persistent Volume access modes
    ## Must match those of existing PV or dynamic provisioner
    ## Ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
    ##
    accessModes:
      - ReadWriteOnce

    ## AlertManager data Persistent Volume annotations
    ##
    # annotations:

    ## AlertManager data Persistent Volume size
    ##
    size: 2Gi

    ## AlertManager data Persistent Volume Storage Class
    ## If defined, volume.beta.kubernetes.io/storage-class: <storageClass>
    ## Default: volume.alpha.kubernetes.io/storage-class: default
    ##
    # storageClass:

  ## Alertmanager resource requests and limits
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    # limits:
    #   cpu: 10m
    #   memory: 32Mi
    requests:
      cpu: 10m
      memory: 32Mi

  ## Alertmanager service type
  ##
  serviceType: ClusterIP

  ## Alertmanager data storage path
  ## Default: '/data'
  ##
  # storagePath: /data

## Monitors ConfigMap changes and POSTs to a URL
## Ref: https://github.com/jimmidyson/configmap-reload
##
configmapReload:
  ## Configmap-reload Docker image
  ##
  image: jimmidyson/configmap-reload:v0.1

  ## Configmap-reload container name
  ##
  name: configmap-reload

## Global imagePullPolicy
## Default: 'Always' if image tag is 'latest', else 'IfNotPresent'
## Ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
# imagePullPolicy:

kubeStateMetrics:
  ## Kube-state-metrics service port
  ##
  httpPort: 80

  ## Kube-state-metrics service port name
  ## Default: 'http'
  ##
  # httpPortName: http

  ## Kube-state-metrics Docker image
  ##
  image: gcr.io/google_containers/kube-state-metrics:v0.3.0

  ## Kube-state-metrics container name
  ##
  name: kube-state-metrics

  ## Kube-state-metrics resource requests and limits
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    # limits:
    #   cpu: 10m
    #   memory: 16Mi
    requests:
      cpu: 10m
      memory: 16Mi

  ## Kube-state-metrics service type
  ##
  serviceType: ClusterIP

server:
  ## Server Pod annotations:
  ##
  # annotations:
  #   iam.amazonaws.com/role: prometheus

  ## Additional Server container arguments
  ##
  # extraArgs:

  ## Server service port
  ##
  httpPort: 80

  ## Server service port name
  ## Default: 'http'
  ##
  # httpPortName: http

  ## Server Docker image
  ##
  image: prom/prometheus:v1.4.1

  ingress:
    ## If true, Server Ingress will be created
    ##
    enabled: false

    ## Server Ingress annotations
    ##
    # annotations:
    #   kubernetes.io/ingress.class: nginx
    #   kubernetes.io/tls-acme: 'true'
    ## Server Ingress hostnames
    ## Must be provided if Ingress is enabled
    ##
    # hosts:
    #   - prometheus.domain.com
    ## Server Ingress TLS configuration
    ## Secrets must be manually created in the namespace
    ##
    # tls:
    #   - secretName: prometheus-server-tls
    #     hosts:
    #       - prometheus.domain.com

  ## Server container name
  ##
  name: server

  persistentVolume:
    ## If true, Server will create a Persistent Volume Claim
    ## If false, use emptyDir
    ##
    enabled: true

    ## Server data Persistent Volume access modes
    ## Must match those of existing PV or dynamic provisioner
    ## Ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
    ##
    accessModes:
      - ReadWriteOnce

    ## Server data Persistent Volume annotations
    ##
    # annotations:

    ## Server data Persistent Volume size
    ##
    size: 8Gi

    ## AlertManager data Persistent Volume Storage Class
    ## If defined, volume.beta.kubernetes.io/storage-class: <storageClass>
    ## Default: volume.alpha.kubernetes.io/storage-class: default
    ##
    # storageClass:

  ## Server resource requests and limits
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    # limits:
    #   cpu: 500m
    #   memory: 512Mi
    requests:
      cpu: 500m
      memory: 512Mi

  ## Server service type
  ##
  serviceType: ClusterIP

  ## Server local data storage path
  ## Default: '/data'
  ##
  # storageLocalPath: /data
  ## Server Pod termination grace period
  ## Default: 300s (5m)
  ##
  # terminationGracePeriodSeconds: 300

## Alertmanager ConfigMap entries
##
alertmanagerFiles:
  alertmanager.yml: |
    global:
      # slack_api_url: ''

    receivers:
      - name: default-receiver
        # slack_configs:
        #  - channel: '@you'
        #    send_resolved: true

    route:
      group_wait: 10s
      group_interval: 5m
      receiver: default-receiver
      repeat_interval: 3h

## Server ConfigMap entries
##
serverFiles:
  alerts: ''
  rules: ''

  prometheus.yml: |
    global:
      scrape_interval:     15s
      evaluation_interval: 15s

    rule_files:
      - /etc/config/rules
      - /etc/config/alerts

    scrape_configs:
      - job_name: prometheus
        static_configs:
          - targets:
            - localhost:9090

      # Scrape configurations for running Prometheus on a Kubernetes cluster.
      # This uses separate scrape configs for cluster components (i.e. API server, node)
      # and services to allow each to use different authentication configs.
      #
      # Kubernetes labels will be added as Prometheus labels on metrics via the
      # `labelmap` relabeling action.

      # Scrape config for API servers.
      - job_name: kubernetes-apiservers

        # Default to scraping over https. If required, just disable this or change to
        # `http`.
        scheme: https

        # This TLS & bearer token file config is used to connect to the actual scrape
        # endpoints for cluster components. This is separate to discovery auth
        # configuration (`in_cluster` below) because discovery & scraping are two
        # separate concerns in Prometheus.
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
          # If your node certificates are self-signed or use a different CA to the
          # master CA, then disable certificate verification below. Note that
          # certificate verification is an integral part of a secure infrastructure
          # so this should only be disabled in a controlled environment. You can
          # disable certificate verification by uncommenting the line below.
          #
          # insecure_skip_verify: true
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

        # Keep only the default/kubernetes service endpoints for the https port. This
        # will add targets for each API server which Kubernetes adds an endpoint to
        # the default/kubernetes service.
        relabel_configs:
          - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
            action: keep
            regex: default;kubernetes;https

      - job_name: kubernetes-nodes

        # Default to scraping over https. If required, just disable this or change to
        # `http`.
        scheme: https

        # This TLS & bearer token file config is used to connect to the actual scrape
        # endpoints for cluster components. This is separate to discovery auth
        # configuration (`in_cluster` below) because discovery & scraping are two
        # separate concerns in Prometheus.
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
          # If your node certificates are self-signed or use a different CA to the
          # master CA, then disable certificate verification below. Note that
          # certificate verification is an integral part of a secure infrastructure
          # so this should only be disabled in a controlled environment. You can
          # disable certificate verification by uncommenting the line below.
          #
          # insecure_skip_verify: true
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

        kubernetes_sd_configs:
          - role: node

        relabel_configs:
          - action: labelmap
            regex: __meta_kubernetes_node_label_(.+)

      # Scrape config for service endpoints.
      #
      # The relabeling allows the actual service scrape endpoint to be configured
      # via the following annotations:
      #
      # * `prometheus.io/scrape`: Only scrape services that have a value of `true`
      # * `prometheus.io/scheme`: If the metrics endpoint is secured then you will need
      # to set this to `https` & most likely set the `tls_config` of the scrape config.
      # * `prometheus.io/path`: If the metrics path is not `/metrics` override this.
      # * `prometheus.io/port`: If the metrics are exposed on a different port to the
      # service then set this appropriately.
      - job_name: 'kubernetes-service-endpoints'

        kubernetes_sd_configs:
          - role: endpoints

        relabel_configs:
          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]
            action: keep
            regex: true
          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scheme]
            action: replace
            target_label: __scheme__
            regex: (https?)
          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_path]
            action: replace
            target_label: __metrics_path__
            regex: (.+)
          - source_labels: [__address__, __meta_kubernetes_service_annotation_prometheus_io_port]
            action: replace
            target_label: __address__
            regex: (.+)(?::\d+);(\d+)
            replacement: $1:$2
          - action: labelmap
            regex: __meta_kubernetes_service_label_(.+)
          - source_labels: [__meta_kubernetes_service_namespace]
            action: replace
            target_label: kubernetes_namespace
          - source_labels: [__meta_kubernetes_service_name]
            action: replace
            target_label: kubernetes_name

      # Example scrape config for probing services via the Blackbox Exporter.
      #
      # The relabeling allows the actual service scrape endpoint to be configured
      # via the following annotations:
      #
      # * `prometheus.io/probe`: Only probe services that have a value of `true`
      # - job_name: 'kubernetes-services'
      #
      #   metrics_path: /probe
      #   params:
      #     module: [http_2xx]
      #
      #   kubernetes_sd_configs:
      #     - role: service
      #
      #   relabel_configs:
      #     - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_probe]
      #       action: keep
      #       regex: true
      #     - source_labels: [__address__]
      #       target_label: __param_target
      #     - target_label: __address__
      #       replacement: blackbox
      #     - source_labels: [__param_target]
      #       target_label: instance
      #     - action: labelmap
      #       regex: __meta_kubernetes_service_label_(.+)
      #     - source_labels: [__meta_kubernetes_service_namespace]
      #       target_label: kubernetes_namespace
      #     - source_labels: [__meta_kubernetes_service_name]
      #       target_label: kubernetes_name

      # Example scrape config for pods
      #
      # The relabeling allows the actual pod scrape endpoint to be configured via the
      # following annotations:
      #
      # * `prometheus.io/scrape`: Only scrape pods that have a value of `true`
      # * `prometheus.io/path`: If the metrics path is not `/metrics` override this.
      # * `prometheus.io/port`: Scrape the pod on the indicated port instead of the default of `9102`.
      - job_name: 'kubernetes-pods'

        kubernetes_sd_configs:
          - role: pod

        relabel_configs:
          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
            action: keep
            regex: true
          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
            action: replace
            target_label: __metrics_path__
            regex: (.+)
          - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
            action: replace
            regex: (.+):(?:\d+);(\d+)
            replacement: ${1}:${2}
            target_label: __address__
          - action: labelmap
            regex: __meta_kubernetes_pod_label_(.+)
          - source_labels: [__meta_kubernetes_pod_namespace]
            action: replace
            target_label: kubernetes_namespace
          - source_labels: [__meta_kubernetes_pod_name]
            action: replace
            target_label: kubernetes_pod_name
```

</details>

---

# Prometheus

[Prometheus](https://prometheus.io/), a [Cloud Native Computing Foundation](https://cncf.io/) project, is a systems and service monitoring system. It collects metrics from configured targets at given intervals, evaluates rule expressions, displays the results, and can trigger alerts if some condition is observed to be true.

## TL;DR;

```console
$ helm install stable/prometheus
```

## Introduction

This chart bootstraps a [Prometheus](https://prometheus.io/) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.3+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/prometheus
```

The command deploys Prometheus on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Prometheus chart and their default values.

| Parameter                                    | Description                                                 | Default                                              |
| -------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------- |
| `alertmanager.httpPort`                      | Alertmanager Service port                                   | `80`                                                 |
| `alertmanager.httpPortName`                  | Alertmanager service port name                              | `http`                                               |
| `alertmanager.image`                         | Alertmanager Docker image                                   | `prom/alertmanager:${VERSION}`                       |
| `alertmanager.ingress.enabled`               | If true, Alertmanager Ingress will be created               | `false`                                              |
| `alertmanager.ingress.annotations`           | Alertmanager Ingress annotations                            | `{}`                                                 |
| `alertmanager.ingress.hosts`                 | Alertmanager Ingress hostnames                              | `[]`                                                 |
| `alertmanager.ingress.tls`                   | Alertmanager Ingress TLS configuration (YAML)               | `[]`                                                 |
| `alertmanager.name`                          | Alertmanager container name                                 | `alertmanager`                                       |
| `alertmanager.persistentVolume.enabled`      | If true, AlertManager will create a Persistent Volume Claim | `true`                                               |
| `alertmanager.persistentVolume.accessModes`  | AlertManager data Persistent Volume access modes            | `[ReadWriteOnce]`                                    |
| `alertmanager.persistentVolume.size`         | AlertManager data Persistent Volume size                    | `2Gi`                                                |
| `alertmanager.persistentVolume.storageClass` | AlertManager data Persistent Volume Storage Class           | `volume.alpha.kubernetes.io/storage-class: default`  |
| `alertmanager.resources`                     | Alertmanager resource requests and limits (YAML)            | `requests: {cpu: 10m, memory: 32Mi}`                 |
| `alertmanager.serviceType`                   | Alertmanager service type                                   | `ClusterIP`                                          |
| `alertmanager.storagePath`                   | Alertmanager data storage path                              | `/data`                                              |
| `configmapReload.image`                      | Configmap-reload Docker image                               | `jimmidyson/configmap-reload:${VERSION}`             |
| `configmapReload.name`                       | Configmap-reload container name                             | `configmap-reload`                                   |
| `imagePullPolicy`                            | Global image pull policy                                    | `Always` if image tag is latest, else `IfNotPresent` |
| `kubeStateMetrics.httpPort`                  | Kube-state-metrics service port                             | `80`                                                 |
| `kubeStateMetrics.httpPortName`              | Kube-state-metrics service port name                        | `http`                                               |
| `kubeStateMetrics.image`                     | Kube-state-metrics Docker image                             | `gcr.io/google_containers/kube-state-metrics:v0.3.0` |
| `kubeStateMetrics.name`                      | Kube-state-metrics container name                           | `kube-state-metrics`                                 |
| `kubeStateMetrics.resources`                 | Kube-state-metrics resource requests and limits (YAML)      | `requests: {cpu: 10m, memory:16Mi}`                  |
| `kubeStateMetrics.serviceType`               | Kube-state-metrics service type                             | `ClusterIP`                                          |
| `server.annotations`                         | Server Pod annotations                                      | `[]`                                                 |
| `server.extraArgs`                           | Additional Server container arguments                       | `[]`                                                 |
| `server.httpPort`                            | Server service port                                         | `80`                                                 |
| `server.httpPortName`                        | Server service port name                                    | `http`                                               |
| `server.image`                               | Server Docker image                                         | `prom/prometheus:${VERSION}`                         |
| `server.ingress.enabled`                     | If true, Server Ingress will be created                     | `false`                                              |
| `server.ingress.annotations`                 | Server Ingress annotations                                  | `[]`                                                 |
| `server.ingress.hosts`                       | Server Ingress hostnames                                    | `[]`                                                 |
| `server.ingress.tls`                         | Server Ingress TLS configuration (YAML)                     | `[]`                                                 |
| `server.name`                                | Server container name                                       | `server`                                             |
| `server.persistentVolume.enabled`            | If true, Server will create a Persistent Volume Claim       | `false`                                              |
| `server.persistentVolume.accessModes`        | Server data Persistent Volume access modes                  | `[ReadWriteOnce]`                                    |
| `server.persistentVolume.annotations`        | Server data Persistent Volume annotations                   | `[]`                                                 |
| `server.persistentVolume.size`               | Server data Persistent Volume size                          | `8Gi`                                                |
| `server.persistentVolume.storageClass`       | Server data Persistent Volume Storage Class                 | `volume.alpha.kubernetes.io/storage-class: default`  |
| `server.resources`                           | Server resource requests and limits                         | `requests: {cpu: 500m, memory: 512Mi}`               |
| `server.serviceType`                         | Server service type                                         | `ClusterIP`                                          |
| `server.storageLocalPath`                    | Server local data storage path                              | `/data`                                              |
| `server.terminationGracePeriodSeconds`       | Server Pod termination grace period                         | `300`                                                |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set server.storageLocalPath=/prometheus \
    stable/prometheus
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/prometheus
```

> **Tip**: You can use the default [values.yaml](values.yaml)

### ConfigMap Files

AlertManager is configured through [alertmanager.yml](https://prometheus.io/docs/alerting/configuration/). This file (and any others listed in `alertmanagerFiles`) will be mounted into the `alertmanager` pod.

Prometheus is configured through [prometheus.yml](https://prometheus.io/docs/operating/configuration/). This file (and any others listed in `serverFiles`) will be mounted into the `server` pod.

### Ingress TLS

If your cluster allows automatic creation/retrieval of TLS certificates (e.g. [kube-lego](https://github.com/jetstack/kube-lego)), please refer to the documentation for that mechanism.

To manually configure TLS, first create/retrieve a key & certificate pair for the address(es) you wish to protect. Then create a TLS secret in the namespace:

```console
kubectl create secret tls prometheus-server-tls --cert=path/to/tls.cert --key=path/to/tls.key
```

Include the secret's name, along with the desired hostnames, in the alertmanager/server Ingress TLS section of your custom `values.yaml` file:

```
server:
  ingress:
    ## If true, Server Ingress will be created
    ##
    enabled: true

    ## Server Ingress hostnames
    ## Must be provided if Ingress is enabled
    ##
    hosts:
      - prometheus.domain.com

    ## Server Ingress TLS configuration
    ## Secrets must be manually created in the namespace
    ##
    tls:
      - secretName: prometheus-server-tls
        hosts:
          - prometheus.domain.com
```
