# `@helm-charts/stable-grafana`

The leading tool for querying and visualizing time series and metrics.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | grafana |
| Chart Version       | 1.0.1   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
replicas: 1

image:
  repository: grafana/grafana
  tag: 5.0.4
  pullPolicy: IfNotPresent

downloadDashboardsImage:
  repository: appropriate/curl
  tag: latest
  pullPolicy: IfNotPresent
## Expose the grafana service to be accessed from outside the cluster (LoadBalancer service).
## or access it from within the cluster (ClusterIP service). Set the service type and the port to serve it.
## ref: http://kubernetes.io/docs/user-guide/services/
##
service:
  type: ClusterIP
  port: 80
  annotations: {}

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - chart-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

resources: {}
#  limits:
#    cpu: 100m
#    memory: 128Mi
#  requests:
#    cpu: 100m
#    memory: 128Mi

## Node labels for pod assignment
## ref: https://kubernetes.io/docs/user-guide/node-selection/
#
nodeSelector: {}

## Tolerations for pod assignment
## ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
##
tolerations: []

## Affinity for pod assignment
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
##
affinity: {}

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: false
  # storageClassName: default
  # accessModes:
  #   - ReadWriteOnce
  # size: 10Gi
  # annotations: {}
  # subPath: ""
  # existingClaim:

adminUser: admin
# adminPassword: strongpassword

## Extra environment variables that will be pass onto deployment pods
env: {}

# Pass the plugins you want installed as a comma separated list.
# plugins: "digrich-bubblechart-panel,grafana-clock-panel"
plugins: ''

## Configure grafana datasources
## ref: http://docs.grafana.org/administration/provisioning/#datasources
##
datasources: {}
#  datasources.yaml:
#    apiVersion: 1
#    datasources:
#    - name: Prometheus
#      type: prometheus
#      url: http://prometheus-prometheus-server
#      access: proxy
#      isDefault: true

## Configure grafana dashboard providers
## ref: http://docs.grafana.org/administration/provisioning/#dashboards
##
dashboardProviders: {}
#  dashboardproviders.yaml:
#    apiVersion: 1
#    providers:
#    - name: 'default'
#      orgId: 1
#      folder: ''
#      type: file
#      disableDeletion: false
#      editable: true
#      options:
#        path: /var/lib/grafana/dashboards

## Configure grafana dashboard to import
## NOTE: To use dashboards you must also enable/configure dashboardProviders
## ref: https://grafana.com/dashboards
##
dashboards: {}
#  some-dashboard:
#    json: |
#      $RAW_JSON
#  prometheus-stats:
#    gnetId: 2
#    revision: 2
#    datasource: Prometheus

## Grafana's primary configuration
## NOTE: values in map will be converted to ini format
## ref: http://docs.grafana.org/installation/configuration/
##
grafana.ini:
  paths:
    data: /var/lib/grafana/data
    logs: /var/log/grafana
    plugins: /var/lib/grafana/plugins
  analytics:
    check_for_updates: true
  log:
    mode: console
  grafana_net:
    url: https://grafana.net
```

</details>

---

# Grafana Helm Chart

- Installs the web dashboarding system [Grafana](http://grafana.org/)

## TL;DR;

```console
$ helm install stable/grafana
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/grafana
```

## Uninstalling the Chart

To uninstall/delete the my-release deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

| Parameter                   | Description                                                                                                    | Default           |
| --------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------- |
| `replicas`                  | Number of nodes                                                                                                | `1`               |
| `image.repository`          | Image repository                                                                                               | `grafana/grafana` |
| `image.tag`                 | Image tag. (`Must be >= 5.0.0`) Possible values listed [here](https://hub.docker.com/r/grafana/grafana/tags/). | `5.0.4`           |
| `image.pullPolicy`          | Image pull policy                                                                                              | `IfNotPresent`    |
| `service.type`              | Kubernetes service type                                                                                        | `ClusterIP`       |
| `service.port`              | Kubernetes port where service is exposed                                                                       | `9000`            |
| `service.annotations`       | Service annotations                                                                                            | `80`              |
| `ingress.enabled`           | Enables Ingress                                                                                                | `false`           |
| `ingress.annotations`       | Ingress annotations                                                                                            | `{}`              |
| `ingress.hosts`             | Ingress accepted hostnames                                                                                     | `[]`              |
| `ingress.tls`               | Ingress TLS configuration                                                                                      | `[]`              |
| `resources`                 | CPU/Memory resource requests/limits                                                                            | `{}`              |
| `nodeSelector`              | Node labels for pod assignment                                                                                 | `{}`              |
| `tolerations`               | Toleration labels for pod assignment                                                                           | `[]`              |
| `affinity`                  | Affinity settings for pod assignment                                                                           | `{}`              |
| `persistence.enabled`       | Use persistent volume to store data                                                                            | `false`           |
| `persistence.size`          | Size of persistent volume claim                                                                                | `10Gi`            |
| `persistence.existingClaim` | Use an existing PVC to persist data                                                                            | `nil`             |
| `persistence.storageClass`  | Type of persistent volume claim                                                                                | `generic`         |
| `persistence.accessModes`   | Persistence access modes                                                                                       | `[]`              |
| `persistence.subPath`       | Mount a sub directory of the persistent volume if set                                                          | `""`              |
| `env`                       | Extra environment variables passed to pods                                                                     | `{}`              |
| `datasource`                | Configure grafana datasources                                                                                  | `{}`              |
| `dashboardProviders`        | Configure grafana dashboard providers                                                                          | `{}`              |
| `dashboards`                | Dashboards to import                                                                                           | `{}`              |
| `grafana.ini`               | Grafana's primary configuration                                                                                | `{}`              |
