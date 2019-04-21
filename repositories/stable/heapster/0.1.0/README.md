# `@helm-charts/stable-heapster`

Heapster enables Container Cluster Monitoring and Performance Analysis.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | heapster |
| Chart Version       | 0.1.0    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Default values for heapster.
##
replicaCount: 1
image:
  repository: gcr.io/google_containers/heapster
  tag: v1.3.0
  pullPolicy: IfNotPresent
service:
  type: ClusterIP
  externalPort: 8082
  internalPort: 8082
  ## This allows an overide of the heapster service name
  ## Default: {{ template "fullname" . }}
  # nameOverride:
resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 100m
    memory: 128Mi

## Heapster command and arguments
## Default source=kubernetes.summary_api:''
## ref: https://github.com/kubernetes/heapster/blob/master/docs/source-configuration.md
##
## By default sink not set
## ref: https://github.com/kubernetes/heapster/blob/master/docs/sink-configuration.md
##
command:
  - '/heapster'
  - "--source=kubernetes.summary_api:''"

## Resizer scales resources linearly with the number of nodes in the cluster
## Resizer is enabled by default
##
resizer:
  enabled: true
  image:
    repository: gcr.io/google_containers/addon-resizer
    tag: 1.7
    pullPolicy: IfNotPresent
  resources:
    limits:
      cpu: 50m
      memory: 90Mi
    requests:
      cpu: 50m
      memory: 90Mi

  ## Flags used for /pod_nanny command
  ## container and deployment flags already determined chart name
  ## ref: https://github.com/kubernetes/contrib/blob/master/addon-resizer/README.md
  ##
  flags:
    - '--cpu=150m'
    - '--extra-cpu=10m'
    - '--memory=200Mi'
    - '--extra-memory=6Mi'
    - '--threshold=5'
    - '--poll-period=300000'
```

</details>

---

# Heapster

[Heapster](https://github.com/kubernetes/heapster) enables Container Cluster Monitoring and Performance Analysis. It collects and interprets various signals like compute resource usage, lifecycle events, etc, and exports cluster metrics via REST endpoints.

## QuickStart

```bash
$ helm install stable/heapster
```

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/heapster
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The default configuration values for this chart are listed in `values.yaml`.

| Parameter              | Description                    | Default                                       |
| ---------------------- | ------------------------------ | --------------------------------------------- |
| `image.repository`     | Repository for container image | gcr.io/google_containers/heapster             |
| `image.tag`            | Container image tag            | v1.3.0                                        |
| `image.pullPolicy`     | Image pull policy              | IfNotPresent                                  |
| `service.name`         | Service port name              | api                                           |
| `service.type`         | Type for the service           | ClusterIP                                     |
| `service.externalPort` | Service external port          | 8082                                          |
| `service.internalPort` | Service internal port          | 8082                                          |
| `resources.limits`     | Server resource limits         | requests: {cpu: 100m, memory: 128Mi}          |
| `resources.requests`   | Server resource requests       | requests: {cpu: 100m, memory: 128Mi}          |
| `command`              | Commands for heapster pod      | "/heapster --source=kubernetes.summary_api:'' |
| `resizer.enabled`      | If enabled, scale resources    | true                                          |

The table below is only applicable if `resizer.enabled` is `true`. More information on resizer can be found [here](https://github.com/kubernetes/contrib/blob/master/addon-resizer/README.md).

| Parameter                    | Description                    | Default                                |
| ---------------------------- | ------------------------------ | -------------------------------------- |
| `resizer.image.repository`   | Repository for container image | gcr.io/google_containers/addon-resizer |
| `resizer.image.tag`          | Container image tag            | 1.7                                    |
| `resizer.image.pullPolicy`   | Image pull policy              | IfNotPresent                           |
| `resizer.resources.limits`   | Server resource limits         | requests: {cpu: 50m, memory: 90Mi}     |
| `resizer.resources.requests` | Server resource requests       | requests: {cpu: 50m, memory: 90Mi}     |
| `resizer.flags`              | Flags for pod nanny command    | Defaults set in values.yaml            |
