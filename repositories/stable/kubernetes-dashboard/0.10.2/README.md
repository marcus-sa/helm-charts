# `@helm-charts/stable-kubernetes-dashboard`

General-purpose web UI for Kubernetes clusters

| Field               | Value                |
| ------------------- | -------------------- |
| Repository Name     | stable               |
| Chart Name          | kubernetes-dashboard |
| Chart Version       | 0.10.2               |
| NPM Package Version | 0.1.0                |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for kubernetes-dashboard
# This is a YAML-formatted file.
# Declare name/value pairs to be passed into your templates.
# name: value

image:
  repository: k8s.gcr.io/kubernetes-dashboard-amd64
  tag: v1.10.1
  pullPolicy: IfNotPresent

replicaCount: 1

## Here annotations can be added to the kubernetes dashboard deployment
annotations: {}
## Here labels can be added to the kubernetes dashboard deployment
##
labels: {}
# kubernetes.io/cluster-service: "true"
# kubernetes.io/name: "Kubernetes Dashboard"

## Serve application over HTTP without TLS
enableInsecureLogin: false

## Additional container arguments
##
# extraArgs:
#   - --enable-insecure-login
#   - --system-banner="Welcome to Kubernetes"

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}

## List of node taints to tolerate (requires Kubernetes >= 1.6)
tolerations: []
#  - key: "key"
#    operator: "Equal|Exists"
#    value: "value"
#    effect: "NoSchedule|PreferNoSchedule|NoExecute"

## Affinity
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
affinity: {}

service:
  type: ClusterIP
  externalPort: 443

  ## This allows an override of the heapster service name
  ## Default: {{ .Chart.Name }}
  ##
  # nameOverride:

  ## Kubernetes Dashboard Service annotations
  ##
  annotations: {}
  # foo.io/bar: "true"

  ## Here labels can be added to the Kubernetes Dashboard service
  ##
  labels: {}
  # kubernetes.io/name: "Kubernetes Dashboard"

resources:
  limits:
    cpu: 100m
    memory: 100Mi
  requests:
    cpu: 100m
    memory: 100Mi

ingress:
  ## If true, Kubernetes Dashboard Ingress will be created.
  ##
  enabled: false

  ## Kubernetes Dashboard Ingress annotations
  ##
  # annotations:
  #   kubernetes.io/ingress.class: nginx
  #   kubernetes.io/tls-acme: 'true'
  ## If you plan to use TLS backend with enableInsecureLogin set to false
  ## (default), you need to uncomment the below.
  ## If you use ingress-nginx < 0.21.0
  #   nginx.ingress.kubernetes.io/secure-backends: "true"
  ## if you use ingress-nginx >= 0.21.0
  #   nginx.ingress.kubernetes.io/backend-protocol: "HTTPS"

  ## Kubernetes Dashboard Ingress path
  ##
  path: /

  ## Kubernetes Dashboard Ingress hostnames
  ## Must be provided if Ingress is enabled
  ##
  # hosts:
  #   - kubernetes-dashboard.domain.com
  ## Kubernetes Dashboard Ingress TLS configuration
  ## Secrets must be manually created in the namespace
  ##
  # tls:
  #   - secretName: kubernetes-dashboard-tls
  #     hosts:
  #       - kubernetes-dashboard.domain.com

rbac:
  # Specifies whether RBAC resources should be created
  create: true

  # Specifies whether cluster-admin ClusterRole will be used for dashboard
  # ServiceAccount (NOT RECOMMENDED).
  clusterAdminRole: false

serviceAccount:
  # Specifies whether a service account should be created
  create: true
  # The name of the service account to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

livenessProbe:
  # Number of seconds to wait before sending first probe
  initialDelaySeconds: 30
  # Number of seconds to wait for probe response
  timeoutSeconds: 30
```

</details>

---

# kubernetes-dashboard

[Kubernetes Dashboard](https://github.com/kubernetes/dashboard) is a general purpose, web-based UI for Kubernetes clusters. It allows users to manage applications running in the cluster and troubleshoot them, as well as manage the cluster itself.

## TL;DR;

```console
$ helm install stable/kubernetes-dashboard
```

## Introduction

This chart bootstraps a [Kubernetes Dashboard](https://github.com/kubernetes/dashboard) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install stable/kubernetes-dashboard --name my-release
```

The command deploys kubernetes-dashboard on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Access control

It is critical for the Kubernetes cluster to correctly setup access control of Kubernetes Dashboard. See this [guide](https://github.com/kubernetes/dashboard/wiki/Access-control) for best practises.

It is highly recommended to use RBAC with minimal privileges needed for Dashboard to run.

## Configuration

The following table lists the configurable parameters of the kubernetes-dashboard chart and their default values.

| Parameter                           | Description                                                                                                                 | Default                                                                    |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `image.repository`                  | Repository for container image                                                                                              | `k8s.gcr.io/kubernetes-dashboard-amd64`                                    |
| `image.tag`                         | Image tag                                                                                                                   | `v1.10.1`                                                                  |
| `image.pullPolicy`                  | Image pull policy                                                                                                           | `IfNotPresent`                                                             |
| `annotations`                       | Annotations for deployment                                                                                                  | `{}`                                                                       |
| `replicaCount`                      | Number of replicas                                                                                                          | `1`                                                                        |
| `extraArgs`                         | Additional container arguments                                                                                              | `[]`                                                                       |
| `nodeSelector`                      | node labels for pod assignment                                                                                              | `{}`                                                                       |
| `tolerations`                       | List of node taints to tolerate (requires Kubernetes >= 1.6)                                                                | `[]`                                                                       |
| `affinity`                          | Affinity for pod assignment                                                                                                 | `[]`                                                                       |
| `enableInsecureLogin`               | Serve application over HTTP without TLS                                                                                     | `false`                                                                    |
| `service.externalPort`              | Dashboard external port                                                                                                     | 443                                                                        |
| `service.internalPort`              | Dashboard internal port                                                                                                     | 443                                                                        |
| `ingress.annotations`               | Specify ingress class                                                                                                       | `kubernetes.io/ingress.class: nginx`                                       |
| `ingress.enabled`                   | Enable ingress controller resource                                                                                          | `false`                                                                    |
| `ingress.path`                      | Path to match against incoming requests. Must begin with a '/'                                                              | `/`                                                                        |
| `ingress.hosts`                     | Dashboard Hostnames                                                                                                         | `nil`                                                                      |
| `ingress.tls`                       | Ingress TLS configuration                                                                                                   | `[]`                                                                       |
| `resources`                         | Pod resource requests & limits                                                                                              | `limits: {cpu: 100m, memory: 100Mi}, requests: {cpu: 100m, memory: 100Mi}` |
| `rbac.create`                       | Create & use RBAC resources                                                                                                 | `true`                                                                     |
| `rbac.clusterAdminRole`             | "cluster-admin" ClusterRole will be used for dashboard ServiceAccount ([NOT RECOMMENDED](#access-control))                  | `false`                                                                    |
| `serviceAccount.create`             | Whether a new service account name that the agent will use should be created.                                               | `true`                                                                     |
| `serviceAccount.name`               | Service account to be used. If not set and serviceAccount.create is `true` a name is generated using the fullname template. |                                                                            |
| `livenessProbe.initialDelaySeconds` | Number of seconds to wait before sending first probe                                                                        | 30                                                                         |
| `livenessProbe.timeoutSeconds`      | Number of seconds to wait for probe response                                                                                | 30                                                                         |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install stable/kubernetes-dashboard --name my-release \
  --set=service.externalPort=8080,resources.limits.cpu=200m
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install stable/kubernetes-dashboard --name my-release -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Using the dashboard with 'kubectl proxy'

When running 'kubectl proxy', the address `localhost:8001/ui` automatically expands to `http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/`. For this to reach the dashboard, the name of the service must be 'kubernetes-dashboard', not any other value as set by Helm. You can manually specify this using the value 'fullnameOverride':

```
fullnameOverride: 'kubernetes-dashboard'
```
