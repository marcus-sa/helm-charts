# `@helm-charts/banzaicloud-stable-instance-termination-handler`

Instance Termination Handler Helm chart for Kubernetes

| Field               | Value                        |
| ------------------- | ---------------------------- |
| Repository Name     | banzaicloud-stable           |
| Chart Name          | instance-termination-handler |
| Chart Version       | 0.0.4                        |
| NPM Package Version | 0.1.0                        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for instance-termination-handler
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

## The official Banzai Instance Termination Handler image, change tag to use a different version.
## https://hub.docker.com/r/banzaicloud/instance-termination-handler/tags/
##
image:
  repository: 'banzaicloud/instance-termination-handler'
  tag: '0.0.4'

  ## Specify an imagePullPolicy (Required)
  ## It's recommended to change this to 'Always' if the image tag is 'latest'
  ## ref: http://kubernetes.io/docs/user-guide/images/#updating-images
  imagePullPolicy: IfNotPresent

log:
  format: 'logfmt'
  level: 'info'

http:
  listenPort: 8081

termdetect:
  defaultSecondsUntilTermination: 30

termnotifier:
  triggerEnabled: true
  triggerEndpoint: '/terminate'

asgInstanceTermNotifier:
  enabled: true
  hookName: 'instance-termination-handler'
  hookTimeoutSeconds: 30
  drainWaitTimeoutSeconds: 120
  pollingIntervalSeconds: 10

asgInstanceDetacher:
  enabled: true
  asgLabelName: 'bzc:detach-asg-instance-on-termination'

metrics:
  enabled: true
  endpoint: '/metrics'

drainer:
  enabled: true
  drainWithTaint: true
  gracePeriodSeconds: -1
  timeout: 0

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 256Mi
    cpu: 120m

nodeSelector: {}
tolerations:
  - operator: Exists
affinity: {}
extraAnnotations: {}
```

</details>

---

# Instance termination handler

[Instance Termination Handler](https://github.com/banzaicloud/instance-termination-handler)

## tl;dr

```bash
$ helm repo add banzaicloud-stable http://kubernetes-charts.banzaicloud.com/branch/master
$ helm repo update
$ helm install banzaicloud-stable/instance-termination-handler
```

## Introduction

This chart bootstraps a Banzai Cloud [Instance Termination Handler](https://github.com/banzaicloud/banzai-charts/instance-termination-handler) deployment to a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release banzaicloud-stable/instance-termination-handler
```

The command deploys Instance Termination Handler on the Kubernetes cluster with the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The available configuration values defined in the `values.yaml` file.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example:

```bash
$ helm install --name my-release -f values.yaml banzaicloud-incubator/instance-termination-handler
```

> **Tip**: You can use the default [values.yaml](values.yaml)
