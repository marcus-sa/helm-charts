# `@helm-charts/stable-kube-slack`

Chart for kube-slack, a monitoring service for Kubernetes

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | kube-slack |
| Chart Version       | 0.4.1      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Environment values for the deployment
envVars:
  ## URL of your Incoming Webhook in Slack:
  SLACK_URL: ''
  ## Time to wait after pod becomes not ready before notifying
  NOT_READY_MIN_TIME: '60000' # in ms

## Configuration for the deployment:
image:
  repository: willwill/kube-slack
  tag: v3.6.0
  pullPolicy: IfNotPresent

resources:
  {}
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# kube-slack

Chart for [kube-slack](https://github.com/wongnai/kube-slack), a monitoring service for Kubernetes.

## Introduction

This chart adds a deployment, listening for cluster-wide pod failures and posting them to your slack channel. A cluster-wide [RBAC](https://kubernetes.io/docs/admin/authorization/rbac/) is created by default, but can also be specified.

## Installing the Chart

To install the chart with the release name `my-release`, configure an [Incoming Webhook](https://my.slack.com/apps/A0F7XDUAZ-incoming-webhooks) in Slack, note its url(`webhook-url` here) and run:

```console
$ helm install stable/kube-slack --set slackUrl=webhook-url --name my-release
```

## Uninstalling the Chart

To uninstall/delete the `my-release` release:

```console
$ helm delete my-release
```

## Configuration

All configuration parameters are listed in [`values.yaml`](values.yaml).

The environment values passed to kube-slack can be described in `envVars` parameter. At a minimum, the `envVars.SLACK_URL` value must be set.

## RBAC

By default the chart will install the recommended RBAC roles and rolebindings.

To determine if your cluster supports this running the following:

```console
$ kubectl api-versions | grep rbac
```

Details on how to enable RBAC can be found in the [official documentation](https://kubernetes.io/docs/admin/authorization/rbac/).
