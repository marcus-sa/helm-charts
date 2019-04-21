# `@helm-charts/flagger-grafana`

Grafana dashboards for monitoring Flagger canary deployments

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | flagger |
| Chart Name          | grafana |
| Chart Version       | 1.0.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for grafana.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: grafana/grafana
  tag: 5.4.3
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

resources:
  {}
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}

user: admin
password:

# Istio Prometheus instance
url: http://prometheus:9090

# Weave Cloud instance token
token:
```

</details>

---

# Flagger Grafana

Grafana dashboards for monitoring progressive deployments powered by Istio, Prometheus and Flagger.

![flagger-grafana](https://raw.githubusercontent.com/stefanprodan/flagger/master/docs/screens/grafana-canary-analysis.png)

## Prerequisites

- Kubernetes >= 1.11
- Istio >= 1.0
- Prometheus >= 2.6

## Installing the Chart

Add Flagger Helm repository:

```console
helm repo add flagger https://flagger.app
```

To install the chart with the release name `flagger-grafana`:

```console
helm upgrade -i flagger-grafana flagger/grafana \
--namespace=istio-system \
--set url=http://prometheus:9090 \
--set user=admin \
--set password=admin
```

The command deploys Grafana on the Kubernetes cluster in the default namespace.
The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `flagger-grafana` deployment:

```console
helm delete --purge flagger-grafana
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Grafana chart and their default values.

| Parameter          | Description                                          | Default                  |
| ------------------ | ---------------------------------------------------- | ------------------------ |
| `image.repository` | Image repository                                     | `grafana/grafana`        |
| `image.pullPolicy` | Image pull policy                                    | `IfNotPresent`           |
| `image.tag`        | Image tag                                            | `<VERSION>`              |
| `replicaCount`     | desired number of pods                               | `1`                      |
| `resources`        | pod resources                                        | `none`                   |
| `tolerations`      | List of node taints to tolerate                      | `[]`                     |
| `affinity`         | node/pod affinities                                  | `node`                   |
| `nodeSelector`     | node labels for pod assignment                       | `{}`                     |
| `service.type`     | type of service                                      | `ClusterIP`              |
| `url`              | Prometheus URL, used when Weave Cloud token is empty | `http://prometheus:9090` |
| `token`            | Weave Cloud token                                    | `none`                   |
| `user`             | Grafana admin username                               | `admin`                  |
| `password`         | Grafana admin password                               | `admin`                  |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
helm install flagger/grafana --name flagger-grafana \
--set token=WEAVE-CLOUD-TOKEN
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
helm install flagger/grafana --name flagger-grafana -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)
