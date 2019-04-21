# `@helm-charts/stable-voyager`

Voyager provides controller for Ingress and Certificates for Kubernetes developed by AppsCode.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | voyager |
| Chart Version       | 1.1.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
##
## Voyager chart configuration
##
image: appscode/voyager
imageTag: 3.0.0
## Use cloud provider here. Read details https://github.com/appscode/voyager/blob/master/docs/user-guide/README.md
cloudProvider: cloud_provider
## The path to the cloud provider configuration file. Empty string for no configuration file.
## ie. for azure use /etc/kubernetes/azure.json
# cloudConfig: /etc/kubernetes/azure.json
## Log level for voyager
logLevel: 3
persistence:
  enabled: false
  hostPath: /etc/kubernetes

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}
```

</details>

---

# Voyager

[Voyager](https://github.com/appscode/voyager) provides controller for Ingress and Certificates for Kubernetes developed by AppsCode.

## TL;DR;

```bash
$ helm install stable/voyager
```

## Introduction

This chart bootstraps an [ingress controller](https://github.com/appscode/voyager) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.3+

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/voyager
```

The command deploys Voyager Controller on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release`:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Voyager chart and their default values.

| Parameter              | Description                      | Default            |
| ---------------------- | -------------------------------- | ------------------ |
| `image`                | Container image to run           | `appscode/voyager` |
| `imageTag`             | Image tag of container           | `3.0.0`            |
| `cloudProvider`        | Name of cloud provider           | ``                 |
| `cloudConfig`          | Path to cloud config             | ``                 |
| `logLevel`             | Log level for operator           | `3`                |
| `persistence.enabled`  | Enable mounting cloud config     | `false`            |
| `persistence.hostPath` | Host mount path for cloud config | `/etc/kubernetes`  |
| `nodeSelector`         | Node labels for pod assignment   | `{}`               |

`
