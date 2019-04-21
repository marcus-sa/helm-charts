# `@helm-charts/stable-linkerd`

Service mesh for cloud native apps

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | linkerd |
| Chart Version       | 0.4.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for linkerd.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

linkerd:
  ## linkerd Pod annotations:
  ##
  # annotations:
  #   iam.amazonaws.com/role: linkerd

  ## Additional linkerd container arguments
  ##
  # extraArgs:

  ## linkerd service port
  ##
  httpPort: 80

  ## linkerd service port name
  ## Default: 'admin'
  ##
  # httpPortName: admin

  ## linkerd user service discovery port name
  ## Default: 'http'
  discoveryPortName: http

  ## linkerd Docker image
  ##
  image: buoyantio/linkerd:1.1.2

  ingress:
    ## If true, linkerd Ingress will be created
    ##
    enabled: false

    ## linkerd Ingress annotations
    ##
    # annotations:
    #   kubernetes.io/ingress.class: nginx
    #   kubernetes.io/tls-acme: 'true'
    ## linkerd Ingress hostnames
    ## Must be provided if Ingress is enabled
    ##
    # hosts:
    #   - linkerd.domain.com
    ## linkerd Ingress TLS configuration
    ## Secrets must be manually created in the namespace
    ##
    # tls:
    #   - secretName:
    #     hosts:
    #       - linkerd.domain.com

  ## linkerd container name
  ##
  name: l5d
  # Resource configuration for the linkerd pods
  resources:
    limits:
      cpu: 500m
      memory: 512Mi
    requests:
      cpu: 0
      memory: 512Mi

kubectl:
  image: buoyantio/kubectl:v1.6.2
  # Resource configuration for the kubectl pods
  resources:
    # limits:
    #   cpu: 10m
    #   memory: 32Mi
    requests:
      cpu: 0
      memory: 32Mi

prometheus:
  # Enable Prometheus service metrics
  scrape: true
  # Enable Prometheus endpoint metrics
  probe: true
  # Path for Prometheus metrics
  path: /admin/metrics/prometheus
service:
  # Type of service to use for linkerd
  type: ClusterIP

# linkerd configuration. The default configuration is located inside the ConfigMap.
# Allows to overrides the linkerd configuration
config:
```

</details>

---

# linkerd Chart

[linkerd](https://linkerd.io/) is a resilient service mesh for cloud native apps

## Chart Details

This chart will do the following:

- Install a daemonset that provisions the linkerd [per-host architecture](https://linkerd.io/in-depth/deployment#per-host)

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/linkerd
```

## Configuration

Configurable values are documented in the `values.yaml`.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/linkerd
```

> **Tip**: You can use the default [values.yaml](values.yaml)
