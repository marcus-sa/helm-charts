# `@helm-charts/stable-kube-hunter`

A Helm chart for Kube-hunter

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | stable      |
| Chart Name          | kube-hunter |
| Chart Version       | 1.0.1       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# D:efault values for elasticsearch-curator.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

cronjob:
  # At 01:00 every day
  schedule: '0 1 * * *'
  annotations: {}
  concurrencyPolicy: 'Forbid'
  failedJobsHistoryLimit: '1'
  successfulJobsHistoryLimit: '1'

customArguments: []

pod:
  annotations: {}

image:
  repository: aquasec/kube-hunter
  tag: 34
  pullPolicy: IfNotPresent

resources:
  {}
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

priorityClassName: ''
```

</details>

---

# Kube-hunter Helm Chart

This directory contains a Kubernetes chart to deploy [Kube-hunter](https://github.com/aquasecurity/kube-hunter).

## Chart Details

This chart will do the following:

- Create a CronJob which runs Kube-hunter in [Pod](https://github.com/aquasecurity/kube-hunter#pod) mode.

## Installing the Chart

To install the chart, use the following:

```console
$ helm install stable/kube-hunter
```

## Configuration

The following table lists the configurable parameters of the docker-registry chart and
their default values.

| Parameter                            | Description                                        | Default               |
| :----------------------------------- | :------------------------------------------------- | :-------------------- |
| `customArguments`                    | Additional custom arguments to give to kube-hunter | `[]`                  |
| `image.pullPolicy`                   | Container pull policy                              | `IfNotPresent`        |
| `image.repository`                   | Container image to use                             | `aquasec/kube-hunter` |
| `image.tag`                          | Container image tag to deploy                      | `34`                  |
| `cronjob.schedule`                   | Schedule for the CronJob                           | `0 1 * * *`           |
| `cronjob.annotations`                | Annotations to add to the cronjob                  | {}                    |
| `cronjob.concurrencyPolicy`          | `Allow|Forbid|Replace` concurrent jobs             | `Forbid`              |
| `cronjob.failedJobsHistoryLimit`     | Specify the number of failed Jobs to keep          | `1`                   |
| `cronjob.successfulJobsHistoryLimit` | Specify the number of completed Jobs to keep       | `1`                   |
| `pod.annotations`                    | Annotations to add to the pod                      | {}                    |
| `resources`                          | Resource requests and limits                       | {}                    |
| `priorityClassName`                  | priorityClassName                                  | `nil`                 |

Specify each parameter using the `--set key=value[,key=value]` argument to
`helm install`.
