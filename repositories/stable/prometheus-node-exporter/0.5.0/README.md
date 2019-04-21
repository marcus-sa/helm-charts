# `@helm-charts/stable-prometheus-node-exporter`

A Helm chart for prometheus node-exporter

| Field               | Value                    |
| ------------------- | ------------------------ |
| Repository Name     | stable                   |
| Chart Name          | prometheus-node-exporter |
| Chart Version       | 0.5.0                    |
| NPM Package Version | 0.1.0                    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for prometheus-node-exporter.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
image:
  repository: quay.io/prometheus/node-exporter
  tag: v0.16.0
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 9100
  targetPort: 9100
  annotations:
    prometheus.io/scrape: 'true'

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #   cpu: 200m
  #    memory: 50Mi
  # requests:
  #   cpu: 100m
  #   memory: 30Mi

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:
  imagePullSecrets: []

rbac:
  ## If true, create & use RBAC resources
  ##
  create: true
  ## If true, create & use Pod Security Policy resources
  ## https://kubernetes.io/docs/concepts/policy/pod-security-policy/
  pspEnabled: true

# for deployments that have node_exporter deployed outside of the cluster, list
# their addresses here
endpoints: []

tolerations:
  - effect: NoSchedule
    operator: Exists

## Additional container arguments
##
extraArgs: {}
#   - --collector.diskstats.ignored-devices=^(ram|loop|fd|(h|s|v)d[a-z]|nvme\\d+n\\d+p)\\d+$

## Additional mounts from the host
##
extraHostVolumeMounts: {}
#  - name: <mountName>
#    hostPath: <hostPath>
#    mountPath: <mountPath>
#    readOnly: true|false
```

</details>

---

# Prometheus Node Exporter

- Installs prometheus [node exporter](https://github.com/prometheus/node_exporter)

## TL;DR;

```console
$ helm install stable/prometheus-node-exporter
```

## Introduction

This chart bootstraps a prometheus [node exporter](http://github.com/prometheus/node_exporter) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/prometheus-node-exporter
```

The command deploys node exporter on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Node Exporter chart and their default values.

| Parameter                         | Description                                                                                                                   | Default                                 |     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | --- |
| `image.repository`                | Image repository                                                                                                              | `quay.io/prometheus/node-exporter`      |     |
| `image.tag`                       | Image tag                                                                                                                     | `v0.16.0`                               |     |
| `image.pullPolicy`                | Image pull policy                                                                                                             | `IfNotPresent`                          |     |
| `extraArgs`                       | Additional container arguments                                                                                                | `[]`                                    |     |
| `extraHostVolumeMounts`           | Additional host volume mounts                                                                                                 | {}                                      |     |
| `podLabels`                       | Additional labels to be added to pods                                                                                         | {}                                      |     |
| `rbac.create`                     | If true, create & use RBAC resources                                                                                          | `true`                                  |     |
| `rbac.pspEnabled`                 | Specifies whether a PodSecurityPolicy should be created.                                                                      | `true`                                  |     |
| `resources`                       | CPU/Memory resource requests/limits                                                                                           | `{}`                                    |     |
| `service.type`                    | Service type                                                                                                                  | `ClusterIP`                             |     |
| `service.port`                    | The service port                                                                                                              | `9100`                                  |     |
| `service.targetPort`              | The target port of the container                                                                                              | `9100`                                  |     |
| `service.annotations`             | Kubernetes service annotations                                                                                                | `{prometheus.io/scrape: "true"}`        |
| `serviceAccount.create`           | Specifies whether a service account should be created.                                                                        | `true`                                  |     |
| `serviceAccount.name`             | Service account to be used. If not set and `serviceAccount.create` is `true`, a name is generated using the fullname template |                                         |     |
| `serviceAccount.imagePullSecrets` | Specify image pull secrets                                                                                                    | `[]`                                    |     |
| `tolerations`                     | List of node taints to tolerate                                                                                               | `- effect: NoSchedule operator: Exists` |     |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set serviceAccount.name=node-exporter  \
    stable/prometheus-node-exporter
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/prometheus-node-exporter
```
