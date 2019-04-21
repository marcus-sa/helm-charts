# `@helm-charts/stable-linkerd`

Service mesh for cloud native apps

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | linkerd |
| Chart Version       | 0.1.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for linkerd.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
image:
  linkerd:
    # Image repository and tag to use for linkerd
    repository: buoyantio/linkerd
    tag: 0.8.4
  kubectl:
    # Image repository and tag to use for kubectl sidecar
    repository: buoyantio/kubectl
    tag: v1.4.0
  pullPolicy: IfNotPresent
linkerd:
  # Port name that linkerd will use for endpoint discovery
  portName: http
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
resources:
  # Memory limits and requests for linkerd container
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 500m
    memory: 512Mi
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
