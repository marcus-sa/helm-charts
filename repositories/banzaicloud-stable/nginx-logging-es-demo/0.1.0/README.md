# `@helm-charts/banzaicloud-stable-nginx-logging-es-demo`

A Demo application for the logging-operator

| Field               | Value                 |
| ------------------- | --------------------- |
| Repository Name     | banzaicloud-stable    |
| Chart Name          | nginx-logging-es-demo |
| Chart Version       | 0.1.0                 |
| NPM Package Version | 0.1.0                 |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for nginx-logging-es-demo.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: nginx
  tag: stable
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  hosts:
    - host: chart-example.local
      paths: []

  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #   cpu: 100m
  #   memory: 128Mi
  # requests:
  #   cpu: 100m
  #   memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# Logging Operator Nginx & Elasticsearch output demonstration Chart

[Logging Operator](https://github.com/banzaicloud/logging-operator) is a managed centralized logging component based on fluentd and fluent-bit.

## tl;dr:

```bash
$ helm repo add banzaicloud-stable https://kubernetes-charts.banzaicloud.com/
$ helm repo update
$ helm install banzaicloud-stable/nginx-logging-es-demo
```

## Introduction

This chart demonstrates the use of the [Logging Operator](https://github.com/banzaicloud/banzai-charts/logging-operator) with an Nginx deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- [Logging Operator](https://github.com/banzaicloud/logging-operator) available on the cluster

## Installing the Chart

To install the chart with the release name `log-test-nginx`:

```bash
$ helm install --name log-test-nginx banzaicloud-stable/nginx-logging-es-demo
```

## Uninstalling the Chart

To uninstall/delete the `log-test-nginx` deployment:

```bash
$ helm delete log-test-nginx
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the nginx-logging-es-demo chart and their default values.

| Parameter          | Description                                   | Default        |
| ------------------ | --------------------------------------------- | -------------- |
| `image.repository` | Container image repository                    | `nginx`        |
| `image.tag`        | Container image tag                           | `stable`       |
| `image.pullPolicy` | Container pull policy                         | `IfNotPresent` |
| `nameOverride`     | Override name of app                          | ``             |
| `fullnameOverride` | Override full name of app                     | ``             |
| `affinity`         | Node Affinity                                 | `{}`           |
| `resources`        | CPU/Memory resource requests/limits           | `{}`           |
| `tolerations`      | Node Tolerations                              | `[]`           |
| `nodeSelector`     | Define which Nodes the Pods are scheduled on. | `{}`           |

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example:

```bash
$ helm install --name my-release -f values.yaml banzaicloud-stable/nginx-logging-es-demo
```

> **Tip**: You can use the default [values.yaml](values.yaml)
