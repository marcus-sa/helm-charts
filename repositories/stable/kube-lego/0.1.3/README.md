# `@helm-charts/stable-kube-lego`

Automatically requests certificates from Let's Encrypt

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | kube-lego |
| Chart Version       | 0.1.3     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
global:
  ## hyperkube image to use when deleting kube-lego service
  ##
  hyperkube:
    repository: quay.io/coreos/hyperkube
    tag: v1.5.2_coreos.1
    pullPolicy: IfNotPresent

## kube-lego configuration
## Ref: https://github.com/jetstack/kube-lego
##
config:
  ## Email address to use for registration with Let's Encrypt
  ##
  LEGO_EMAIL: my@email.tld

  ## Let's Encrypt API endpoint
  ## Production: https://acme-v01.api.letsencrypt.org/directory
  ## Staging: https://acme-staging.api.letsencrypt.org/directory
  ##
  LEGO_URL: https://acme-staging.api.letsencrypt.org/directory

  ## kube-lego port
  ##
  LEGO_PORT: 8080

## kube-lego image
##
image:
  repository: jetstack/kube-lego
  tag: 0.1.3
  pullPolicy: IfNotPresent

## kube-lego resource limits & requests
## Ref: https://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  # limits:
  #   cpu: 20m
  #   memory: 8Mi
  requests:
    cpu: 20m
    memory: 8Mi
```

</details>

---

# kube-lego

[kube-lego](https://github.com/jetstack/kube-lego) automatically requests certificates for Kubernetes Ingress resources from Let's Encrypt.

## TL;DR;

```console
$ helm install stable/kube-lego
```

## Introduction

This chart bootstraps a kube-lego deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/kube-lego
```

The command deploys kube-lego on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Prometheus chart and their default values.

| Parameter                     | Description                                                                  | Default                                                        |
| ----------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `global.hyperkube.image`      | hyperkube container image repository (used when deleting kube-lego service)  | `quay.io/coreos/hyperkube`                                     |
| `global.hyperkube.tag`        | hyperkube container image tag (used when deleting kube-lego service)         | `v1.5.2_coreos.1`                                              |
| `global.hyperkube.pullPolicy` | hyperkube container image pull policy (used when deleting kube-lego service) | `IfNotPresent`                                                 |
| `config.LEGO_EMAIL`           | email address to use for registration with Let's Encrypt                     | none                                                           |
| `config.LEGO_URL`             | Let's Encrypt API endpoint                                                   | `https://acme-staging.api.letsencrypt.org/directory` (staging) |
| `config.LEGO_PORT`            | kube-lego port                                                               | `8080`                                                         |
| `image.repository`            | kube-lego container image repository                                         | `jetstack/kube-lego`                                           |
| `image.tag`                   | kube-lego container image tag                                                | `0.1.3`                                                        |
| `image.pullPolicy`            | kube-lego container image pull policy                                        | `IfNotPresent`                                                 |
| `resources`                   | kube-lego resource requests and limits (YAML)                                | `requests: {cpu: 20m, memory: 8Mi}`                            |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set config.LEGO_EMAIL=you@domain.tld \
    stable/kube-lego
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/kube-lego
```

> **Tip**: You can use the default [values.yaml](values.yaml)
