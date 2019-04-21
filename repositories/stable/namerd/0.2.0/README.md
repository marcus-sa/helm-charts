# `@helm-charts/stable-namerd`

Service that manages routing for multiple linkerd instances

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | namerd |
| Chart Version       | 0.2.0  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for namerd.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 3
namerd:
  image:
    repository: buoyantio/namerd:0.9.1
    pullPolicy: IfNotPresent
  resources:
    limits:
      cpu: 500m
      memory: 512Mi
    requests:
      cpu: 0
      memory: 512Mi
kubectl:
  image:
    repository: buoyantio/kubectl:v1.4.0
    pullPolicy: IfNotPresent
  resources:
    # limits:
    #   cpu: 10m
    #   memory: 32Mi
    requests:
      cpu: 0
      memory: 32Mi
service:
  type: ClusterIP
  syncPort: 4100
  apiPort: 4180
  adminPort: 9991
```

</details>

---

# namerd Chart

[namerd](https://linkerd.io/in-depth/namerd/) is a service that manages routing for multiple [linkerd](https://github.com/kubernetes/charts/tree/master/stable/linkerd) instances.

## Chart Details

This chart will do the following:

- Install a deployment that provisions namerd with a default configuration and three replicas for HA.

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/namerd
```

## Configuration

Configurable values are documented in the `values.yaml`.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/namerd
```

> **Tip**: You can use the default [values.yaml](values.yaml)
