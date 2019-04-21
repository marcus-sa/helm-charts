# `@helm-charts/stable-k8s-spot-termination-handler`

The K8s Spot Termination handler handles draining AWS Spot Instances in response to termination requests.

| Field               | Value                        |
| ------------------- | ---------------------------- |
| Repository Name     | stable                       |
| Chart Name          | k8s-spot-termination-handler |
| Chart Version       | 1.1.0                        |
| NPM Package Version | 0.1.0                        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for k8s-spot-termination-handler.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

image:
  repository: kubeaws/kube-spot-termination-notice-handler
  tag: 1.13.0-1
  pullPolicy: IfNotPresent

# Poll the metadata every pollInterval seconds for termination events:
pollInterval: 5

# Send notifications to a Slack webhook URL - replace with your own value and uncomment:
# slackUrl: https://hooks.slack.com/services/EXAMPLE123/EXAMPLE123/example1234567

# Set the cluster name to be reported in a Slack message
# clusterName: test

# Silence logspout by default - set to true to enable logs arriving in logspout
enableLogspout: false

# Trigger instance removal from AutoScaling Group on termination notice
detachAsg: false

# Grace period for node draining
gracePeriod: 120

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
  #   cpu: 10m
  #   memory: 32Mi

nodeSelector:
  {}
  # "node-role.kubernetes.io/spot-worker": "true"

tolerations:
  []
  # - key: "dedicated"
  #   operator: "Equal"
  #   value: "gpu"
  #   effect: "NoSchedule"

affinity: {}
```

</details>

---

# Kubernetes AWS EC2 Spot Termination Notice Handler

This chart installs the [k8s-spot-termination-handler](https://github.com/kube-aws/kube-spot-termination-notice-handler)
as a daemonset across the cluster nodes.

## Purpose

Spot instances on EC2 come with significant cost savings, but with the burden of instance being terminated if
the market price goes higher than the maximum price you have configured.

The termination handler watches the AWS Metadata API for termination requests and starts draining the node
so that it can be terminated safely. Optionally it can also send a message to a Slack channel informing that
a termination notice has been received.

## Installation

You should install into the `kube-system` namespace, but this is not a requirement. The following example assumes this has been chosen.

```
helm install stable/k8s-spot-termination-handler --namespace kube-system
```

## Configuration

The following table lists the configurable parameters of the k8s-spot-termination-handler chart and their default values.

| Parameter               | Description                                                                                                                                | Default                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| `image.repository`      | container image repository                                                                                                                 | `kubeaws/kube-spot-termination-notice-handler` |
| `image.tag`             | container image tag                                                                                                                        | `1.13.0-1`                                     |
| `image.pullPolicy`      | container image pull policy                                                                                                                | `IfNotPresent`                                 |
| `pollInterval`          | the interval in seconds between attempts to poll EC2 metadata API for termination events                                                   | `"5"`                                          |
| `slackUrl`              | Slack webhook URL to send messages when a termination notice is received                                                                   | _not defined_                                  |
| `clusterName`           | if `slackUrl` is set - use this cluster name in Slack messages                                                                             | _not defined_                                  |
| `enableLogspout`        | if `true`, enable the Logspout log capturing. Logspout should be deployed separately                                                       | `false`                                        |
| `rbac.create`           | if `true`, create & use RBAC resources                                                                                                     | `true`                                         |
| `serviceAccount.create` | if `true`, create a service account                                                                                                        | `true`                                         |
| `serviceAccount.name`   | the name of the service account to use. If not set and `create` is `true`, a name is generated using the fullname template.                | ``                                             |
| `detachAsg`             | if `true`, the spot termination handler will detect (standard) AutoScaling Group, and initiate detach when termination notice is detected. | `false`                                        |
| `gracePeriod`           | Grace period for node draining                                                                                                             | `120`                                          |
| `resources`             | pod resource requests & limits                                                                                                             | `{}`                                           |
| `nodeSelector`          | node labels for pod assignment                                                                                                             | `{}`                                           |
| `tolerations`           | node taints to tolerate (requires Kubernetes >=1.6)                                                                                        | `[]`                                           |
| `affinity`              | node/pod affinities (requires Kubernetes >=1.6)                                                                                            | `{}`                                           |
