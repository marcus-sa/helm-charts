# `@helm-charts/stable-newrelic-infrastructure`

A Helm chart to deploy the New Relic Infrastructure Agent as a DaemonSet

| Field               | Value                   |
| ------------------- | ----------------------- |
| Repository Name     | stable                  |
| Chart Name          | newrelic-infrastructure |
| Chart Version       | 0.4.3                   |
| NPM Package Version | 0.1.0                   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# IMPORTANT: Specify your New Relic API key here.
# licenseKey:

# IMPORTANT: The Kubernetes cluster name
# https://docs.newrelic.com/docs/kubernetes-monitoring-integration
# cluster: ""

# kubeStateMetricsUrl - if provided, the discovery process for kube-state-metrics endpoint won't be triggered
# Only HTTP is accepted. This is an example value: http://172.17.0.3:8080
# kubeStateMetricsUrl:

verboseLog: false

# This can be set, the default is shown below
# logFile: /var/log/nr-infra.log

image:
  repository: newrelic/infrastructure-k8s
  tag: 1.0.0
  pullPolicy: IfNotPresent

resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 100m
    memory: 128Mi

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

# If you wish to provide additional labels to apply to the pod(s), specify
# them here
# podLabels:

# If you wish to provide your own newrelic.yml file include it under config:
# the sample config file is included here as an example. Three options have
# been omitted because they are handled either by variables, or a secret. They
# are license_key, log_file and verbose.
# config:
#
# New Relic Infrastructure configuration file
#
# Lines that begin with # are comment lines and are ignored by the
# Infrastructure agent. If options have command line equivalents, New Relic
# will use the command line option to override any value set in this file.
#

#
# Option : display_name
# Value  : Hostname to replace the automatically generated hostname for
#          reporting.
# Default: Automatically generated hostname
#
# display_name: new_name

#
# Option : proxy
# Value  : Useful if your firewall rules require the agent to use a
#          proxy URL (HTTP or HTTPS) to communicate with New Relic.
# Default: none
#
# proxy: https://user:password@hostname:port

#
# Option : Optional custom attributes
# Use optional key-value pairs to build filter sets, group your results,ª
# annotate your Insights data, etc.
#
# custom_attributes:
#  environment: production
#  service: login service
#  team: alpha-team
#

# Node labels for pod assignment
# Ref: https://kubernetes.io/docs/user-guide/node-selection/
nodeSelector: {}

tolerations: []

updateStrategy: RollingUpdate
```

</details>

---

# newrelic-infrastructure

## Chart Details

This chart will deploy the New Relic Infrastructure agent as a Daemonset.

## Configuration

| Parameter             | Description                                                                                                                        | Default                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `cluster`             | The cluster name for the Kubernetes cluster.                                                                                       |                           |
| `licenseKey`          | The [license key](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/license-key) for your New Relic Account. |                           |
| `config`              | A `newrelic.yml` file if you wish to provide.                                                                                      |                           |
| `kubeStateMetricsUrl` | If provided, the discovery process for kube-state-metrics endpoint won't be triggered. Example: http://172.17.0.3:8080             |                           |
| `image.name`          | The container to pull.                                                                                                             | `newrelic/infrastructure` |
| `image.pullPolicy`    | The pull policy.                                                                                                                   | `IfNotPresent`            |
| `image.tag`           | The version of the container to pull.                                                                                              | `1.0.0`                   |
| `resources`           | Any resources you wish to assign to the pod.                                                                                       | See Resources below       |
| `verboseLog`          | Should the agent log verbosely. (Boolean)                                                                                          | `false`                   |
| `nodeSelector`        | Node label to use for scheduling                                                                                                   | `nil`                     |
| `tolerations`         | List of node taints to tolerate (requires Kubernetes >= 1.6)                                                                       | `nil`                     |
| `updateStrategy`      | Strategy for DaemonSet updates (requires Kubernetes >= 1.6)                                                                        | `RollingUpdate`           |

## Example

```sh
helm install stable/newrelic-infrastructure \
--set licenseKey=<enter_new_relic_license_key> \
--set cluster=my-k8s-cluster
```

## Resources

The default set of resources assigned to the pods is shown below:

    resources:
      limits:
        cpu: 100m
        memory: 128Mi
      requests:
        cpu: 100m
        memory: 128Mi

# Config file

If you wish to provide your own `newrelic.yml` you may do so under `config`. There are a few notable exceptions you should be aware of. Three options have been omitted because they are handled either by variables, or a secret. They are license_key, log_file and verbose.
