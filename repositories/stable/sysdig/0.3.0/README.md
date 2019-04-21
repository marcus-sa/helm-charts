# `@helm-charts/stable-sysdig`

Sysdig Monitor Agent.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | sysdig |
| Chart Version       | 0.3.0  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for Sysdig Monitor Helm package.

rbac:
  # true here enables creation of rbac resources
  install: false
  # rbac version
  apiVersion: v1beta1

image:
  repository: 'sysdig/agent'
  tag: 'latest'
  pullPolicy: 'Always'

sysdig:
  # Required: You need your Sysdig Monitor access key before running agents.
  #AccessKey: ""

  # Optional: Key-value agent tags following the format "key:val,key2:val2".
  AgentTags: ''

  serviceAccountName: 'sysdig-account'

resources:
  requests:
    cpu: 100m
    memory: 512Mi
  limits:
    cpu: 500m
    memory: 768Mi

# Allow sysdig to run on Kubernetes 1.6 masters.
tolerations:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
```

</details>

---

# Sysdig

[Sysdig Monitor](https://www.sysdig.com/) is a container native monitoring and troubleshooting platform.

## Introduction

This chart adds the Sysdig Monitor Agent to all nodes in your cluster via a DaemonSet.

## Prerequisites

- Kubernetes 1.2+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`, retrieve your Sysdig Monitor Access Key from your [Account Settings](https://app.sysdigcloud.com/#/settings/user) and run:

```bash
$ helm install --name my-release \
    --set sysdig.AccessKey=YOUR-KEY-HERE stable/sysdig
```

After a few minutes, you should see hosts and containers appearing in Sysdig Monitor.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Sysdig chart and their default values.

| Parameter          | Description                       | Default                                     |
| ------------------ | --------------------------------- | ------------------------------------------- |
| `sysdig.AccessKey` | Your Sysdig Monitor Access Key    | `Nil` You must provide your own key         |
| `sysdig.AgentTags` | String with tags for the agent    | Empty                                       |
| `image.repository` | The image repository to pull from | `sysdig/agent`                              |
| `image.tag`        | The image tag to pull             | `latest`                                    |
| `image.pullPolicy` | The Image pull policy             | `Always`                                    |
| `tolerations`      | The tolerations for scheduling    | `node-role.kubernetes.io/master:NoSchedule` |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
    --set sysdig.AccessKey=YOUR-KEY-HERE,sysdig.AgentTags="role:webserver,location:europe" \
    stable/sysdig
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/sysdig
```

> **Tip**: You can use the default [values.yaml](values.yaml)
