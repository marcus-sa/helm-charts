# `@helm-charts/banzaicloud-stable-pvc-operator`

A Helm chart for pvc-operator

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | pvc-operator       |
| Chart Version       | 0.0.7              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
image:
  repository: banzaicloud/pvc-operator
  tag: 0.0.5
  pullPolicy: IfNotPresent

operator:
  watchedNamespace: ''
  ownerReferenceName: ''

nfs:
  namespace: ''
  serviceAccount:
    name: ''
    create: true

## Install Default RBAC roles and bindings
rbac:
  enabled: true

## Node selector
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
nodeSelector: {}

## Affinity
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
affinity: {}

## Tolerations
## ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
tolerations: []
```

</details>

---

# PVC operator Chart

PVC operator (https://github.com/banzaicloud/pvc-operator) takes care of creating, reusing Storageclass required by the submitted PersistentVolumeClaim. For further documentation please check the project github page.agege

## Installing the Chart

To install the chart:

```
$ helm install banzaicloud-stable/pvc-operator
```
