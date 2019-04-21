# `@helm-charts/incubator-kubeless`

Kubeless is a Kubernetes-native serverless framework. It runs on top of your Kubernetes cluster and allows you to deploy small unit of code without having to build container images.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | kubeless  |
| Chart Version       | 1.0.1     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for kubeless.
## RBAC configuration
rbac:
  create: false

## Controller configuration
controller:
  deployment:
    replicaCount: 1
    image:
      repository: bitnami/kubeless-controller-manager
      tag: v1.0.0-alpha.2
      pullPolicy: IfNotPresent
  ## Kubeless Controller resource requests and limits
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    {}
    # limits:
    #   cpu: 500m
    #   memory: 512Mi
    # requests:
    #   cpu: 500m
    #   memory: 512Mi

## Kubeless configuration
config:
  builderImage: kubeless/function-image-builder
  builderImagePullSecret: ''
  deploymentTemplate: '{}'
  enableBuildStep: 'false'
  functionRegistryTLSVerify: 'true'
  provisionImage: kubeless/unzip@sha256:f162c062973cca05459834de6ed14c039d45df8cdb76097f50b028a1621b3697
  provisionImagePullSecret: ''
  runtimeImages: |-
    [
      {
        "ID": "python",
        "versions": [
          {
            "name": "python27",
            "version": "2.7",
            "runtimeImage": "kubeless/python@sha256:07cfb0f3d8b6db045dc317d35d15634d7be5e436944c276bf37b1c630b03add8",
            "initImage": "python:2.7"
          },
          {
            "name": "python34",
            "version": "3.4",
            "runtimeImage": "kubeless/python@sha256:f19640c547a3f91dbbfb18c15b5e624029b4065c1baf2892144e07c36f0a7c8f",
            "initImage": "python:3.4"
          },
          {
            "name": "python36",
            "version": "3.6",
            "runtimeImage": "kubeless/python@sha256:0c9f8f727d42625a4e25230cfe612df7488b65f283e7972f84108d87e7443d72",
            "initImage": "python:3.6"
          }
        ],
        "depName": "requirements.txt",
        "fileNameSuffix": ".py"
      },
      {
        "ID": "nodejs",
        "versions": [
          {
            "name": "node6",
            "version": "6",
            "runtimeImage": "kubeless/nodejs@sha256:0a8a72af4cc3bfbfd4fe9bd309cbf486e7493d0dc32a691673b3f0d3fae07487",
            "initImage": "node:6.10"
          },
          {
            "name": "node8",
            "version": "8",
            "runtimeImage": "kubeless/nodejs@sha256:76ee28dc7e3613845fface2d1c56afc2e6e2c6d6392c724795a7ccc2f5e60582",
            "initImage": "node:8"
          }
        ],
        "depName": "package.json",
        "fileNameSuffix": ".js"
      },
      {
        "ID": "ruby",
        "versions": [
          {
            "name": "ruby24",
            "version": "2.4",
            "runtimeImage": "kubeless/ruby@sha256:0dce29c0eb2a246f7d825b6644eeae7957b26f2bfad2b7987f2134cc7b350f2f",
            "initImage": "bitnami/ruby:2.4"
          }
        ],
        "depName": "Gemfile",
        "fileNameSuffix": ".rb"
      },
      {
        "ID": "php",
        "versions": [
          {
            "name": "php72",
            "version": "7.2",
            "runtimeImage": "kubeless/php@sha256:b605bb6b5ae3b1a2a93570939296618904259d7767a14002fa9733e66d59849b",
            "initImage": "composer:1.6"
          }
        ],
        "depName": "composer.json",
        "fileNameSuffix": ".php"
      },
      {
        "ID": "go",
        "compiled": true,
        "versions": [
          {
            "name": "go1.10",
            "version": "1.10",
            "runtimeImage": "kubeless/go@sha256:e2fd49f09b6ff8c9bac6f1592b3119ea74237c47e2955a003983e08524cb3ae5",
            "initImage": "kubeless/go-init@sha256:d0812c4e8351bfd95d0574efd23613cff2664d6a57af4ed0a20ebc651382d476"
          }
        ],
        "depName": "Gopkg.toml",
        "fileNameSuffix": ".go"
      }
    ]

## UI configuration
ui:
  enabled: false
  deployment:
    replicaCount: 1
    ui:
      image:
        repository: bitnami/kubeless-ui
        tag: latest
        pullPolicy: IfNotPresent
    proxy:
      image:
        repository: kelseyhightower/kubectl
        tag: 1.4.0
        pullPolicy: IfNotPresent

  service:
    name: ui-port
    type: NodePort
    externalPort: 3000
```

</details>

---

# Kubeless

[Kubeless](http://kubeless.io/) is a Kubernetes-native serverless framework. It runs on top of your Kubernetes cluster and allows you to deploy small unit of code without having to build container images. With kubeless you can build advanced applications that tie together services using functions.

## TL;DR;

```bash
$ helm repo add incubator https://kubernetes-charts-incubator.storage.googleapis.com/
$ helm install --namespace kubeless incubator/kubeless
```

## Introduction

This chart bootstraps a [Kubeless](https://github.com/kubeless/kubeless) and a [Kubeless-UI](https://github.com/kubeless/kubeless-ui) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.7+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release --namespace kubeless incubator/kubeless
```

> **NOTE**
>
> While the chart supports deploying Kubeless to any namespace, Kubeless expects to be deployed under a namespace named `kubeless`.

The command deploys Kubernetes on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Kubeless chart and their default values.

| Parameter                                | Description                                | Default                               |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------- |
| `config.builderImage`                    | Function builder image                     | `kubeless/function-image-builder`     |
| `config.builderImagePullSecret`          | Secret to pull builder image               | ""                                    |
| `config.builderImage`                    | Provision image                            | `kubeless/unzip`                      |
| `config.builderImagePullSecret`          | Secret to pull provision image             | ""                                    |
| `config.deploymentTemplate`              | Deployment template for functions          | `{}`                                  |
| `config.enableBuildStep`                 | Enable builder functionality               | `false`                               |
| `config.functionRegistryTLSVerify`       | Enable TLS verification for image registry | `{}`                                  |
| `config.runtimeImages`                   | Runtimes available                         | python, nodejs, ruby, php and go      |
| `controller.deployment.image.repository` | Controller image                           | `bitnami/kubeless-controller-manager` |
| `controller.deployment.image.pullPolicy` | Controller image pull policy               | `IfNotPresent`                        |
| `controller.deployment.replicaCount`     | Number of replicas                         | `1`                                   |
| `ui.enabled`                             | Kubeless UI component                      | `false`                               |
| `ui.deployment.ui.image.repository`      | Kubeless UI image                          | `bitnami/kubeless-ui`                 |
| `ui.deployment.ui.image.pullPolicy`      | Kubeless UI image pull policy              | `IfNotPresent`                        |
| `ui.deployment.proxy.image.repository`   | Proxy image                                | `kelseyhightower/kubectl`             |
| `ui.deployment.proxy.image.pullPolicy`   | Proxy image pull policy                    | `IfNotPresent`                        |
| `ui.deployment.replicaCount`             | Number of replicas                         | `1`                                   |
| `ui.service.name`                        | Service name                               | `ui-port`                             |
| `ui.service.type`                        | Kubernetes service name                    | `NodePort`                            |
| `ui.service.externalPort`                | Service external port                      | `3000`                                |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release --set service.name=ui-service,service,externalPort=4000 --namespace kubeless incubator/kubeless
```

The above command sets the Kubeless service name to `ui-service` and the external port to `4000`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml --namespace kubeless incubator/kubeless
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Kubeless UI

The [Kubeless UI](https://github.com/kubeless/kubeless-ui) component is disabled by default. In order to enable it set the ui.enabled property to true. For example,

```bash
$ helm install --name my-release --set ui.enabled=true --namespace kubeless incubator/kubeless
```
