# `@helm-charts/banzaicloud-stable-cloudinfo`

A Helm chart for Kubernetes

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | cloudinfo          |
| Chart Version       | 0.4.19             |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for cloudinfo.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: banzaicloud/cloudinfo
  tag: 0.4.10
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80
  internalPort: 8080

ingress:
  enabled: false
  annotations:
    {}
    #kubernetes.io/ingress.class: traefik
    #ingress.kubernetes.io/ssl-redirect: "false"
    #traefik.frontend.rule.type: PathPrefix
  hosts:
    - '/'
    # - "domain.com/xyz"
    # - "domain.com"
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

resources: #{}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  requests:
    cpu: 100m
    memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}

app:
  logLevel: 'info'
  basePath: ''

providers:
  google:
    enabled: false
    gceApiKey: ''
    gceCredentials: ''
  amazon:
    enabled: false
    awsAccessKeyId: ''
    awsSecretAccessKey: ''
  azure:
    enabled: false
    azureSubscriptionId: ''
    azureCredentials: ''
  oracle:
    enabled: false
    ociUser: ''
    ociTenancy: ''
    ociRegion: ''
    ociFingerprint: ''
    ociKey: ''
  alibaba:
    enabled: false
    alibabaAccessKeyId: ''
    alibabaAccessKeySecret: ''
    alibabaRegionId: 'eu-central-1'

## Additional deployment labels and annotations
## ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
deploymentLabels: {}
deploymentAnnotations: {}

metrics:
  enabled: true
  name: metrics
  port: 9900
  serviceMonitor:
    enabled: false
    additionalLabels: {}
```

</details>

---

# Cloudinfo Chart

[Cloudinfo](https://github.com/banzaicloud/cloudinfo) Provides resource and pricing information about products available on supported cloud providers - it is a building block of the Hollowtrees project.

## tl;dr:

```bash
$ helm repo add banzaicloud-stable http://kubernetes-charts.banzaicloud.com/branch/master
$ helm repo update
$ helm install banzaicloud-stable/cloudinfo
```

## Introduction

This chart bootstraps an [Cloudinfo](https://github.com/banzaicloud/banzai-charts/stable/cloudinfo) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release banzaicloud-stable/cloudinfo
```

The command deploys **cloudinfo** on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the cloudinfo chart and their default values.

| Parameter                                 | Description                                            | Default                 |
| ----------------------------------------- | ------------------------------------------------------ | ----------------------- |
| `image.repository`                        | Container image repository                             | `banzaicloud/cloudinfo` |
| `image.tag`                               | Container image tag                                    | `latest`                |
| `image.pullPolicy`                        | Container pull policy                                  | `Always`                |
| `service.type`                            | The kubernetes service type to use                     | `ClusterIP`             |
| `service.name`                            | The kubernetes service name to use                     | `cloudinfo`             |
| `service.port`                            | Port to bind to for NodePort service type              | `nil`                   |
| `service.annotations`                     | The kubernetes service annotations                     | `nil`                   |
| `app.logLevel`                            | Log level                                              | `info`                  |
| `app.basePath`                            | Application base path                                  | `/`                     |
| `auth.awsAccessKeyId`                     | Amazon Access Key ID                                   | ""                      |
| `auth.awsSecretAccessKey`                 | Amazon Secret Access Key                               | ""                      |
| `auth.gceApiKey`                          | GCE API Key                                            | ""                      |
| `auth.gceCredentials`                     | GCE Credential file (encoded by base64)                | ""                      |
| `auth.azureSubscriptionId`                | Azure Subscription GUID                                | ""                      |
| `auth.azureCredentials`                   | Azure Credential file (encoded by base64)              | ""                      |
| `auth.ociUser`                            | The OCID of the user                                   | ""                      |
| `auth.ociTenancy`                         | The OCID of the tenancy                                | ""                      |
| `auth.ociRegion`                          | Specific region for OCI                                | ""                      |
| `auth.ociKey`                             | The key pair must be in PEM format. (encode by base64) | ""                      |
| `auth.ociFingerprint`                     | Fingerprint for the key pair being used                | ""                      |
| `auth.alibabaAccessKeyId`                 | Alibaba Access Key ID                                  | ""                      |
| `auth.alibabaAccessKeySecret`             | Alibaba Access Key Secret                              | ""                      |
| `auth.alibabaRegionId`                    | Alibaba Region ID                                      | ""                      |
| `deploymentLabels`                        | Additional deployment labels                           | `{}`                    |
| `deploymentAnnotations`                   | Additional deployment annotations                      | `{}`                    |
| `metrics.enabled`                         | Enable application metrics                             | `true`                  |
| `metrics.name`                            | Metrics service name                                   | `name`                  |
| `metrics.port`                            | Metrics service type port                              | `9900`                  |
| `metrics.serviceMonitor.enabled`          | Enable serviceMonitor                                  | `true`                  |
| `metrics.serviceMonitor.additionalLabels` | ServiceMonitor additional labels                       | `{}`                    |

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example:

```bash
$ helm install --name my-release -f values.yaml banzaicloud-stable/cloudinfo
```

> **Tip**: You can use the default [values.yaml](values.yaml)

```

```
