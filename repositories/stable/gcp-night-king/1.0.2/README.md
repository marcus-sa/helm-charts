# `@helm-charts/stable-gcp-night-king`

A Helm chart for GCP Night King

| Field               | Value          |
| ------------------- | -------------- |
| Repository Name     | stable         |
| Chart Name          | gcp-night-king |
| Chart Version       | 1.0.2          |
| NPM Package Version | 0.1.0          |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for gcp-night-king.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
image:
  repository: itamarost/gcp-night-king
  tag: v1-golang
  pullPolicy: IfNotPresent
## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}
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

# GCE project ID for GCE API usage - mandatory parameter
projectID: 'MUST PROVIDE PROJECT ID'
# Pub/Sub subscription name to listen on
# subscriptionName: your-pubsub-subscription-name
```

</details>

---

# GCP Night King Helm Chart

This directory contains a Kubernetes chart to deploy a
[GCP Night King](https://github.com/itamaro/gcp-go-night-king) service.

## TL;DR;

```console
$ helm install stable/gcp-night-king --set projectID=$( gcloud config get-value project )
```

## Chart Details

This chart will do the following:

- Install a service (K8s Deployment) that listens on a Pub/Sub subscription for instance preemption
  messages and resurrects preempted instances once they are terminated.

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/gcp-night-king
```

## Uninstalling the Chart

To uninstall/delete the my-release deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of this chart and their default values.

| Parameter          | Description                            | Default                    |
| ------------------ | -------------------------------------- | -------------------------- |
| `image.pullPolicy` | Container pull policy                  | `IfNotPresent`             |
| `image.repository` | Container image to use                 | `itamarost/gcp-night-king` |
| `image.tag`        | Container image tag to deploy          | `v1-golang`                |
| `replicaCount`     | k8s replicas                           | `1`                        |
| `resources`        | Service resource requests and limits   | `nil`                      |
| `projectID`        | GCE project ID for GCE API             | Mandatory parameter        |
| `subscriptionName` | Pub/Sub subscription name to listen on | `nil`                      |
| `nodeSelector`     | Node labels for pod assignment         | `{}`                       |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.
