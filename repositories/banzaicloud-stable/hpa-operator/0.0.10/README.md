# `@helm-charts/banzaicloud-stable-hpa-operator`

A Helm chart for Kubernetes

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | hpa-operator       |
| Chart Version       | 0.0.10             |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
image:
  repository: banzaicloud/hpa-operator
  tag: 0.1.6
  pullPolicy: IfNotPresent

resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 100m
    memory: 128Mi

## Install Default RBAC roles and bindings
rbac:
  install: true
  apiVersion: v1beta1

metricsServer:
  enabled: false

## Node selector
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
nodeSelector: {}

## Affinity
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
affinity: {}

## Tolerations
## ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
tolerations: []

podAnnotations: {}
```

</details>

---

# HPA operator Chart

HPA operator (https://github.com/banzaicloud/hpa-operator) takes care of creating, deleting, updating HPA, with other words keeping in sync with your deployment annotations.

## Installing the Chart

To install the chart:

```
$ helm install banzaicloud-stable/hpa-operator
```

## Notes
