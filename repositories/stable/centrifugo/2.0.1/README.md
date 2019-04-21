# `@helm-charts/stable-centrifugo`

Centrifugo is a real-time messaging server.

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | centrifugo |
| Chart Version       | 2.0.1      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
replicaCount: 1

image:
  repository: centrifugo/centrifugo
  tag: 1.7.3
  pullPolicy: IfNotPresent

service:
  annotations: {}
  clusterIP: ''
  externalIPs: []
  loadBalancerIP: ''
  loadBalancerSourceRanges: []
  type: ClusterIP
  port: 8000
  nodePort: ''

ingress:
  enabled: false
  hosts: []
  annotations:
    kubernetes.io/ingress.class: nginx
    ingress.kubernetes.io/upstream-fail-timeout: 60
    ingress.kubernetes.io/upstream-max-fails: 2
    ingress.kubernetes.io/proxy-read-timeout: 3600
    ingress.kubernetes.io/proxy-send-timeout: 3600

config:
  web: true
  namespaces:
    - name: public
      anonymous: true
      publish: true
      watch: true
      presence: true
      join_leave: true
      history_size: 10
      history_lifetime: 30
      recover: true

## Centrifugo secret
## Defaults to a random 10-character alphanumeric string if not set
secret: ''
admin:
  ## Centrifugo admin secret
  ## Defaults to a random 10-character alphanumeric string if not set
  secret: ''
  ## Centrifugo admin password
  ## Defaults to a random 10-character alphanumeric string if not set
  password: ''

args:
  - --web=true

resources: {}
```

</details>

---

# Centrifugo

[Centrifugo](https://github.com/centrifugal/centrifugo) is a real-time messaging server. It's language-agnostic and can be used in conjunction with application backend written in any language - Python, Ruby, Perl, PHP, Javascript, Java, Objective-C etc.

## TL;DR;

```bash
$ helm install stable/centrifugo
```

## Introduction

This chart bootstraps a [Centrifugo](https://hub.docker.com/r/centrifugo/centrifugo/) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/centrifugo
```

The command deploys Centrifugo on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Centrifugo chart and their default values.

| Parameter         | Description                         | Default                           |
| ----------------- | ----------------------------------- | --------------------------------- |
| `image`           | Cetrifugo image                     | `centrifugo/centrifugo:{VERSION}` |
| `imagePullPolicy` | Image pull policy                   | `IfNotPresent`                    |
| `resources`       | CPU/Memory resource requests/limits | `{}`                              |
| `config`          | Centrifugo config                   | `default`                         |
| `args`            | Centrifugo args                     | `--web=true`                      |

For more information please refer to the [documentation](https://fzambia.gitbooks.io/centrifugal/content/index.html).

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set ingress.enabled=true \
    stable/centrifugo
```

The above command disable ingress for Centrifugo.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/centrifugo
```

> **Tip**: You can use the default [values.yaml](values.yaml)
