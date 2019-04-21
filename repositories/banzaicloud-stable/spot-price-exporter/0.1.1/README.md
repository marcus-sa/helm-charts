# `@helm-charts/banzaicloud-stable-spot-price-exporter`

A Helm chart for Kubernetes

| Field               | Value               |
| ------------------- | ------------------- |
| Repository Name     | banzaicloud-stable  |
| Chart Name          | spot-price-exporter |
| Chart Version       | 0.1.1               |
| NPM Package Version | 0.1.0               |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for spot-price-exporter.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: banzaicloud/spot-price-exporter
  tag: 0.0.1
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 8080
  internalPort: 8080

ingress:
  enabled: false
  annotations: {}
  # kubernetes.io/ingress.class: traefik
  # ingress.kubernetes.io/ssl-redirect: "false"
  # traefik.frontend.rule.type: PathPrefix
  hosts:
  # - "/"
  # - "domain.com/xyz"
  # - "domain.com"
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

podAnnotations:
  {}
  # prometheus.io/scrape: "true"
  # prometheus.io/path: "/metrics"
  # prometheus.io/port: "9999"

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}

auth:
  awsAccessKeyId: ''
  awsSecretAccessKey: ''
```

</details>

---

# AWS Spot price exporter Chart

[AWS Spot price exporter](https://github.com/banzaicloud/spot-price-exporter) Prometheus exporter for AWS spot prices..

## tl;dr:

## Add banzai-stable chart repo from specific branch

```bash
$ helm repo add banzaicloud-stable http://kubernetes-charts.banzaicloud.com/branch/[branch-name]
```

## Introduction

This chart bootstraps an [AWS Spot price exporter](https://github.com/banzaicloud/spot-price-exporter) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release banzaicloud-stable/spot-price-exporter
```

The command deploys AWS Spot price exporter on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of this chart and their default values.

| Parameter                 | Description                    | Default                          |
| ------------------------- | ------------------------------ | -------------------------------- |
| `image.repository`        | Container image repository     | `banzaicloud/spot-price-exporter |
| `image.tag`               | Container image tag            | `0.0.1`                          |
| `image.pullPolicy`        | Container pull policy          | `IfNotPresent`                   |
| `podAnnotations`          | The kubernetes pod annotations | `nil`                            |
| `auth.awsAccessKeyId`     | Amazon Access Key ID           | ""                               |
| `auth.awsSecretAccessKey` | Amazon Secret Access Key       | ""                               |

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example:

```bash
$ helm install --name my-release -f values.yaml banzaicloud-stable/spot-price-exporter
```

> **Tip**: You can use the default [values.yaml](values.yaml)

```

```
