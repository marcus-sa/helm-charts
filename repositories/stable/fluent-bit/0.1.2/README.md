# `@helm-charts/stable-fluent-bit`

Fast and Lightweight Log/Data Forwarder for Linux, BSD and OSX

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | fluent-bit |
| Chart Version       | 0.1.2      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Minikube stores its logs in a seperate directory.
# enable if started in minikube.
on_minikube: false

image:
  fluent_bit:
    repository: fluent/fluent-bit
    tag: 0.11.11
  pullPolicy: IfNotPresent

backend:
  type: forward
  forward:
    host: fluentd
    port: 24284
  es:
    host: elasticsearch
    port: 9200

env: []

resources:
  limits:
    memory: 100Mi
  requests:
    cpu: 100m
    memory: 100Mi
```

</details>

---

# Fluent-Bit Chart

[Fluent Bit](http://fluentbit.io/) is an open source and multi-platform Log Forwarder.

## Chart Details

This chart will do the following:

- Install a configmap for Fluent Bit
- Install a daemonset that provisions Fluent Bit [per-host architecture]

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/fluent-bit
```

When installing this chart on [Minikube](https://kubernetes.io/docs/getting-started-guides/minikube/), it's required to specify that so the DaemonSet will be able to mount the log files properly, make sure to append the _--set on_minikube=true_ option at the end of the _helm_ command, e.g:

```bash
$ helm install --name my-release stable/fluent-bit --set on_minikube=true
```

## Configuration

Configurable values are documented in the `values.yaml`.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/fluent-bit
```

> **Tip**: You can use the default [values.yaml](values.yaml)
