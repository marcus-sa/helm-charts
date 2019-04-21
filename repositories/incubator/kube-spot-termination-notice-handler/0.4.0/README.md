# `@helm-charts/incubator-kube-spot-termination-notice-handler`

Watch and action AWS spot termination events

| Field               | Value                                |
| ------------------- | ------------------------------------ |
| Repository Name     | incubator                            |
| Chart Name          | kube-spot-termination-notice-handler |
| Chart Version       | 0.4.0                                |
| NPM Package Version | 0.1.0                                |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for kube-spot-termination-notice-handler.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
image:
  repository: kubeaws/kube-spot-termination-notice-handler
  tag: 1.10.8-1
  pullPolicy: IfNotPresent

# Poll the metadata every pollInterval seconds for termination events:
pollInterval: 5

# Send notifications to a Slack webhook URL - replace with your own value and uncomment:
# slackUrl: https://hooks.slack.com/services/EXAMPLE123/EXAMPLE123/example1234567

# Set the cluster name to be reported in a Slack message
# clusterName: test

# Silence logspout by default - set to true to enable logs arriving in logspout
enableLogspout: false

resources: {}
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

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a service account should be created
  create: true
  # The name of the service account to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

tolerations:
  []
  # key: "dedicated"
  # operator: "Equal"
  # value: "gpu"
  # effect: "NoSchedule"
```

</details>

---

# Kubernetes AWS EC2 Spot Termination Notice Handler

This chart installs the [kube-spot-termination-notice-handler](https://github.com/kube-aws/kube-spot-termination-notice-handler) as a daemonset across the cluster nodes.

## Purpose

The handler watches for Spot termination events, and will do the following if detected:

- Drain the affected node

- [Optional] Send a message to a Slack channel informing that a termination notice has been received.

## Installation

You should install into the `kube-system` namespace, but this is not a requirement. The following example assumes this has been chosen.

```
helm install incubator/kube-spot-termination-notice-handler --name-space kube-system
```

## Configuration

You may set these options in your values file:

- `enableLogspout` - if you use Logspout to capture logs, this option will ensure your logs are captured. The logs are noisy, and as such are disabled from Logspout by default.

- `slackUrl` - optional - put a slack webhook URL here to get messaged when a termination notice is received.

- `clusterName` - optional - when slack is configured use this cluster name for reports

- `pollInterval` - how often to query the EC2 metadata for termination notices. Defaults to every `5` seconds.

- `rbac.create` - Specifies whether RBAC resources should be created. Defaults to `true`.

- `serviceAccount.create` - Specifies whether a ServiceAccount should be created. Defaults to `true`.

- `serviceAccount.name` - The name of the ServiceAccount to use. If not set and create is true, a name is generated using the fullname template.
