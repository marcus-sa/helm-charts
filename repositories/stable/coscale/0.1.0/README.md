# `@helm-charts/stable-coscale`

CoScale Agent

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | coscale |
| Chart Version       | 0.1.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for CoScale Helm package.

image:
  repository: 'coscale/coscale-agent'
  tag: '3.10.11'
  pullPolicy: 'IfNotPresent'

coscale:
  # Required: You need a CoScale AppId before running agents.
  appId: ''

  # Required: You need a CoScale AccessToken before running agents.
  accessToken: ''

  # Required: You need a CoScale TemplateId before running agents.
  templateId: ''

resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 256m
    memory: 512Mi
```

</details>

---

# CoScale

[CoScale](https://www.coscale.com/) offers full-stack monitoring for containers and microservices.

## Introduction

This chart adds the CoScale Agent to all nodes in your cluster via a DaemonSet.

## Prerequisites

- Kubernetes 1.2+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`, retrieve your CoScale details from your [Agent page](https://app.coscale.com/) and run:

```bash
$ helm install \
    --name my-release \
    --set coscale.appId=YOUR-APP-ID,coscale.accessToken=YOUR-ACCESS-TOKEN,coscale.templateId=YOUR-TEMPLATE-ID \
    stable/coscale
```

After a few minutes, you should see hosts and containers appearing in the CoScale UI.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the CoScale chart and their default values.

| Parameter             | Description                       | Default                         |
| --------------------- | --------------------------------- | ------------------------------- |
| `coscale.appId`       | Your CoScale Application Id       | `Nil` You must provide your own |
| `coscale.accessToken` | Your CoScale Access Token         | `Nil` You must provide your own |
| `coscale.templateId`  | Your CoScale Agent Template Id    | `Nil` You must provide your own |
| `image.repository`    | The image repository to pull from | `coscale/coscale-agent`         |
| `image.tag`           | The image tag to pull             | `3.10.11`                       |
| `image.pullPolicy`    | The Image pull policy             | `IfNotPresent`                  |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/coscale
```

> **Tip**: You can use the default [values.yaml](values.yaml)
