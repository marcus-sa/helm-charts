# `@helm-charts/stable-gce-ingress`

A GCE Ingress Controller

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | stable      |
| Chart Name          | gce-ingress |
| Chart Version       | 1.0.0       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for gce-ingress.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

nameOverride: ''
fullnameOverride: ''

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

# gce-ingress needs credentials to log into GCE.  Create a secret with the key
# of key.json with the contents of a GCE service account that has permissions to create
# and modify load balancers.  The key should be in the JSON format.
# Example:
# Your secret should look like:
# apiVersion: v1
# kind: Secret
# metadata:
#   name: gce-key
# type: Opaque
# data:
#   key.json: < base64 encoded JSON service account key>
secret: ~

# gce config, replace values to match your environment
config:
  projectID:
  network:
  subnetwork:
  nodeInstancePrefix:
  nodeTags:
  # tokenUrl should probably be left as nil
  tokenUrl: 'nil'

controller:
  replicaCount: 1
  image:
    repository: k8s.gcr.io/ingress-gce-glbc-amd64
    tag: v1.1.1
    pullPolicy: IfNotPresent
  resources:
    {}
    # requests:
    #   cpu: 10m
    #   memory: 50Mi
  nodeSelector: {}
  tolerations: []
  affinity: {}

defaultBackend:
  replicaCount: 1
  image:
    repository: k8s.gcr.io/defaultbackend
    tag: '1.4'
    pullPolicy: IfNotPresent
  resources:
    {}
    # limits:
    #   cpu: 10m
    #   memory: 20Mi
    # requests:
    #   cpu: 10m
    #   memory: 20Mi
  nodeSelector: {}
  tolerations: []
  affinity: {}

service:
  type: NodePort
  port: 80
```

</details>

---

# gce-ingress

[gce-ingress](https://github.com/kubernetes/gce-gce) is an Ingress controller that configures GCE loadbalancers

To use, add the `kubernetes.io/ingress.class: "gce"` annotation to your Ingress resources.

## TL;DR;

```console
$ helm install stable/gce-ingress
```

## Introduction

This chart bootstraps a gce-ingress deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.9+

## Installing the Chart

To install the chart with the release name `my-release` into the `kube-system` namespace:

```console
$ helm install --namespace kube-system --name my-release stable/gce-ingress
```

The command deploys gce-ingress on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the gce-ingress chart and their default values.

| Parameter                         | Description                                         | Default                             |
| --------------------------------- | --------------------------------------------------- | ----------------------------------- |
| `controller.name`                 | name of the controller component                    | `controller`                        |
| `controller.image.repository`     | controller container image repository               | `k8s.gcr.io/ingress-gce-glbc-amd64` |
| `controller.image.tag`            | controller container image tag                      | `v1.1.1`                            |
| `controller.image.pullPolicy`     | controller container image pull policy              | `IfNotPresent`                      |
| `controller.config`               | gce ConfigMap entries                               | none                                |
| `controller.tolerations`          | node taints to tolerate (requires Kubernetes >=1.6) | `[]`                                |
| `controller.affinity`             | node/pod affinities (requires Kubernetes >=1.6)     | `{}`                                |
| `controller.nodeSelector`         | node labels for pod assignment                      | `{}`                                |
| `controller.replicaCount`         | desired number of controller pods                   | `1`                                 |
| `controller.resources`            | controller pod resource requests & limits           | `{}`                                |
| `defaultBackend.name`             | name of the default backend component               | `default-backend`                   |
| `defaultBackend.image.repository` | default backend container image repository          | `k8s.gcr.io/defaultbackend`         |
| `defaultBackend.image.tag`        | default backend container image tag                 | `1.4`                               |
| `defaultBackend.image.pullPolicy` | default backend container image pull policy         | `IfNotPresent`                      |
| `defaultBackend.tolerations`      | node taints to tolerate (requires Kubernetes >=1.6) | `[]`                                |
| `defaultBackend.affinity`         | node/pod affinities (requires Kubernetes >=1.6)     | `{}`                                |
| `defaultBackend.nodeSelector`     | node labels for pod assignment                      | `{}`                                |
| `defaultBackend.replicaCount`     | desired number of default backend pods              | `1`                                 |
| `defaultBackend.resources`        | default backend pod resource requests & limits      | `{}`                                |
| `rbac.enabled`                    | use RBAC ?                                          | `true`                              |

```console
$ helm install stable/gce-ingress --name my-release
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install stable/gce-ingress --name my-release -f values.yaml
```

```console
$ helm install stable/gce-ingress --set controller.extraArgs.v=2
```
