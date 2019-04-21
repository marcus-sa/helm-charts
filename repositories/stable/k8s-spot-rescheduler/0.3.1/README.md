# `@helm-charts/stable-k8s-spot-rescheduler`

A k8s-spot-rescheduler Helm chart for Kubernetes

| Field               | Value                |
| ------------------- | -------------------- |
| Repository Name     | stable               |
| Chart Name          | k8s-spot-rescheduler |
| Chart Version       | 0.3.1                |
| NPM Package Version | 0.1.0                |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for k8s-spot-rescheduler.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1

image:
  repository: quay.io/pusher/k8s-spot-rescheduler
  tag: v0.2.0
  pullPolicy: IfNotPresent

# The full list of available options https://github.com/pusher/k8s-spot-rescheduler#flags
cmdOptions:
  v: 2
  running-in-cluster: true
  kube-api-content-type: application/vnd.kubernetes.protobuf
  housekeeping-interval: 10s
  node-drain-delay: 10m
  pod-eviction-timeout: 2m
  max-graceful-termination: 2m
  listen-address: 0.0.0.0:9235
  on-demand-node-label: node-role.kubernetes.io/worker
  spot-node-label: node-role.kubernetes.io/spot-worker
  delete-non-replicated-pods: false

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

# Affinity for pod assignment
# Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
affinity: {}

tolerations: []

# Node labels for pod assignment
# Ref: https://kubernetes.io/docs/user-guide/node-selection/
nodeSelector: {}

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:
```

</details>

---

# Kubernetes AWS EC2 Spot Rescheduler

This chart installs the [k8s-spot-rescheduler](https://github.com/pusher/k8s-spot-rescheduler).

## Purpose

Spot rescheduler will reschedule pods that are already running on on-demand instances. Based on worker labels it will move pods to spot instances. It can work together with [Cluster Autoscaler](https://github.com/kubernetes/charts/tree/master/stable/cluster-autoscaler) if you want to scale on-demand instances back to zero.

## Installation

You should install this chart into the `kube-system` namespace:

```
helm install \
  --namespace kube-system \
  stable/k8s-spot-rescheduler
```

If your cluster has RBAC enabled, run this command:

```
helm install \
  --namespace kube-system \
  --set rbac.create=true \
  stable/k8s-spot-rescheduler
```

## Configuration

Add the parameters to `cmdOptions` which you want to use. Here is [the full list of available options](https://github.com/pusher/k8s-spot-rescheduler#flags).
