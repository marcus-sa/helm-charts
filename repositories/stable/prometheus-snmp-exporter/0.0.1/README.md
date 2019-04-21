# `@helm-charts/stable-prometheus-snmp-exporter`

Prometheus SNMP Exporter

| Field               | Value                    |
| ------------------- | ------------------------ |
| Repository Name     | stable                   |
| Chart Name          | prometheus-snmp-exporter |
| Chart Version       | 0.0.1                    |
| NPM Package Version | 0.1.0                    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
restartPolicy: Always

image:
  repository: prom/snmp-exporter
  tag: v0.14.0
  pullPolicy: IfNotPresent

nodeSelector: {}
tolerations: []
affinity: {}

# config:

## For RBAC support:
rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true

  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

resources:
  {}
  # limits:
  #   memory: 300Mi
  # requests:
  #   memory: 50Mi

service:
  annotations: {}
  type: ClusterIP
  port: 9116

## An Ingress resource can provide name-based virtual hosting and TLS
## termination among other things for CouchDB deployments which are accessed
## from outside the Kubernetes cluster.
## ref: https://kubernetes.io/docs/concepts/services-networking/ingress/
ingress:
  enabled: false
  hosts:
    []
    # - chart-example.local
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  tls:
    []
    # Secrets must be manually created in the namespace.
    # - secretName: chart-example-tls
    #   hosts:
    #     - chart-example.local

podAnnotations: {}

extraArgs: []
#  --history.limit=1000

replicas: 1
## Monitors ConfigMap changes and POSTs to a URL
## Ref: https://github.com/jimmidyson/configmap-reload
##
configmapReload:
  ## configmap-reload container name
  ##
  name: configmap-reload

  ## configmap-reload container image
  ##
  image:
    repository: jimmidyson/configmap-reload
    tag: v0.2.2
    pullPolicy: IfNotPresent

  ## configmap-reload resource requests and limits
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources: {}
```

</details>

---

# Prometheus SNMP Exporter

Prometheus exporter for snmp monitoring

Learn more: [https://github.com/prometheus/snmp_exporter](https://github.com/prometheus/snmp_exporter)

## TL;DR;

```bash
$ helm install stable/prometheus-snmp-exporter
```

## Introduction

This chart creates a SNMP-Exporter deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/prometheus-snmp-exporter
```

The command deploys SNMP Exporter on the Kubernetes cluster using the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete --purge my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the SNMP-Exporter chart and their default values.

| Parameter                              | Description                                     | Default                       |
| -------------------------------------- | ----------------------------------------------- | ----------------------------- |
| `config`                               | Prometheus SNMP configuration                   | {}                            |
| `configmapReload.name`                 | configmap-reload container name                 | `configmap-reload`            |
| `configmapReload.image.repository`     | configmap-reload container image repository     | `jimmidyson/configmap-reload` |
| `configmapReload.image.tag`            | configmap-reload container image tag            | `v0.2.2`                      |
| `configmapReload.image.pullPolicy`     | configmap-reload container image pull policy    | `IfNotPresent`                |
| `configmapReload.extraArgs`            | Additional configmap-reload container arguments | `{}`                          |
| `configmapReload.extraConfigmapMounts` | Additional configmap-reload configMap mounts    | `[]`                          |
| `configmapReload.resources`            | configmap-reload pod resource requests & limits | `{}`                          |
| `extraArgs`                            | Optional flags for exporter                     | `[]`                          |
| `image.repository`                     | container image repository                      | `prom/snmp-exporter`          |
| `image.tag`                            | container image tag                             | `v0.12.0`                     |
| `image.pullPolicy`                     | container image pull policy                     | `IfNotPresent`                |
| `ingress.annotations`                  | Ingress annotations                             | None                          |
| `ingress.enabled`                      | Enables Ingress                                 | `false`                       |
| `ingress.hosts`                        | Ingress accepted hostnames                      | None                          |
| `ingress.tls`                          | Ingress TLS configuration                       | None                          |
| `nodeSelector`                         | node labels for pod assignment                  | `{}`                          |
| `tolerations`                          | node tolerations for pod assignment             | `[]`                          |
| `affinity`                             | node affinity for pod assignment                | `{}`                          |
| `podAnnotations`                       | annotations to add to each pod                  | `{}`                          |
| `resources`                            | pod resource requests & limits                  | `{}`                          |
| `restartPolicy`                        | container restart policy                        | `Always`                      |
| `service.annotations`                  | annotations for the service                     | `{}`                          |
| `service.labels`                       | additional labels for the service               | None                          |
| `service.type`                         | type of service to create                       | `ClusterIP`                   |
| `service.port`                         | port for the snmp http service                  | `9116`                        |
| `service.externalIPs`                  | list of external ips                            | []                            |
| `rbac.create`                          | Use Role-based Access Control                   | `true`                        |
| `serviceAccount.create`                | Should we create a ServiceAccount               | `true`                        |
| `serviceAccount.name`                  | Name of the ServiceAccount to use               | `null`                        |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
    --set key_1=value_1,key_2=value_2 \
    stable/prometheus-snmp-exporter
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
# example for staging
$ helm install --name my-release -f values.yaml stable/prometheus-snmp-exporter
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Prometheus Configuration

The snmp exporter needs to be passed the address as a parameter, this can be done with relabelling.

Example config:

```
scrape_configs:
  - job_name: 'snmp'
    static_configs:
      - targets:
        - 192.168.1.2  # SNMP device.
    metrics_path: /snmp
    params:
      module: [if_mib]
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: my-service-name:9116  # The SNMP exporter's Service name and port.
```

See [prometheus/snmp_exporter/README.md](https://github.com/prometheus/snmp_exporter/) for further information.
