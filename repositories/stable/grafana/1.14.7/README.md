# `@helm-charts/stable-grafana`

The leading tool for querying and visualizing time series and metrics.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | grafana |
| Chart Version       | 1.14.7  |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
rbac:
  create: true
  pspEnabled: true
serviceAccount:
  create: true
  name:

replicas: 1

deploymentStrategy: RollingUpdate

image:
  repository: grafana/grafana
  tag: 5.2.4
  pullPolicy: IfNotPresent

  ## Optionally specify an array of imagePullSecrets.
  ## Secrets must be manually created in the namespace.
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  ##
  # pullSecrets:
  #   - myRegistrKeySecretName

securityContext:
  runAsUser: 472
  fsGroup: 472

downloadDashboardsImage:
  repository: appropriate/curl
  tag: latest
  pullPolicy: IfNotPresent

## Pod Annotations
# podAnnotations: {}

## Deployment annotations
# annotations: {}

## Expose the grafana service to be accessed from outside the cluster (LoadBalancer service).
## or access it from within the cluster (ClusterIP service). Set the service type and the port to serve it.
## ref: http://kubernetes.io/docs/user-guide/services/
##
service:
  type: ClusterIP
  port: 80
  annotations: {}
  labels: {}

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  labels: {}
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

## Use an alternate scheduler, e.g. "stork".
## ref: https://kubernetes.io/docs/tasks/administer-cluster/configure-multiple-schedulers/
##
# schedulerName:

## Extra environment variables that will be pass onto deployment pods
env: {}

## The name of a secret in the same kubernetes namespace which contain values to be added to the environment
## This can be useful for auth tokens, etc
envFromSecret: ''

## Additional grafana server secret mounts
# Defines additional mounts with secrets. Secrets must be manually created in the namespace.
extraSecretMounts:
  []
  # - name: secret-files
  #   mountPath: /etc/secrets
  #   secretName: grafana-secret-files
  #   readOnly: true

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
## `path` must be /var/lib/grafana/dashboards/<provider_name>
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
#        path: /var/lib/grafana/dashboards/default

## Configure grafana dashboard to import
## NOTE: To use dashboards you must also enable/configure dashboardProviders
## ref: https://grafana.com/dashboards
##
## dashboards per provider, use provider name as key.
##
dashboards: {}
#  default:
#    some-dashboard:
#      json: |
#        $RAW_JSON
#    prometheus-stats:
#      gnetId: 2
#      revision: 2
#      datasource: Prometheus
#    local-dashboard:
#      url: https://example.com/repository/test.json

## Reference to external ConfigMap per provider. Use provider name as key and ConfiMap name as value.
## A provider dashboards must be defined either by external ConfigMaps or in values.yaml, not in both.
## ConfigMap data example:
##
## data:
##   example-dashboard.json: |
##     RAW_JSON
##
dashboardsConfigMaps: {}
#  default: ""

## Grafana's primary configuration
## NOTE: values in map will be converted to ini format
## ref: http://docs.grafana.org/installation/configuration/
##
grafana.ini:
  paths:
    data: /var/lib/grafana/data
    logs: /var/log/grafana
    plugins: /var/lib/grafana/plugins
    provisioning: /etc/grafana/provisioning
  analytics:
    check_for_updates: true
  log:
    mode: console
  grafana_net:
    url: https://grafana.net
## LDAP Authentication can be enabled with the following values on grafana.ini
## NOTE: Grafana will fail to start if the value for ldap.toml is invalid
# auth.ldap:
#   enabled: true
#   allow_sign_up: true
#   config_file: /etc/grafana/ldap.toml

## Grafana's LDAP configuration
## Templated by the template in _helpers.tpl
## NOTE: To enable the grafana.ini must be configured with auth.ldap.enabled
## ref: http://docs.grafana.org/installation/configuration/#auth-ldap
## ref: http://docs.grafana.org/installation/ldap/#configuration
ldap:
  # `existingSecret` is a reference to an existing secret containing the ldap configuration
  # for Grafana in a key `ldap-toml`.
  existingSecret: ''
  # `config` is the content of `ldap.toml` that will be stored in the created secret
  config: ''
  # config: |-
  #   verbose_logging = true
  #   [[servers]]
  #   host = "my-ldap-server"
  #   port = 636
  #   use_ssl = true
  #   start_tls = false
  #   ssl_skip_verify = false
  #   bind_dn = "uid=%s,ou=users,dc=myorg,dc=com"

## Grafana's SMTP configuration
## NOTE: To enable, grafana.ini must be configured with smtp.enabled
## ref: http://docs.grafana.org/installation/configuration/#smtp
smtp:
  # `existingSecret` is a reference to an existing secret containing the smtp configuration
  # for Grafana in keys `user` and `password`.
  existingSecret: ''

## Sidecars that collect the configmaps with specified label and stores the included files them into the respective folders
## Requires at least Grafana 5 to work and can't be used together with parameters dashboardProviders, datasources and dashboards
sidecar:
  image: kiwigrid/k8s-sidecar:0.0.3
  imagePullPolicy: IfNotPresent
  resources:
  #   limits:
  #     cpu: 100m
  #     memory: 100Mi
  #   requests:
  #     cpu: 50m
  #     memory: 50Mi
  dashboards:
    enabled: false
    # label that the configmaps with dashboards are marked with
    label: grafana_dashboard
    # folder in the pod that should hold the collected dashboards
    folder: /tmp/dashboards
  datasources:
    enabled: false
    # label that the configmaps with datasources are marked with
    label: grafana_datasource
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

| Parameter                      | Description                                                                                                                   | Default                              |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `replicas`                     | Number of nodes                                                                                                               | `1`                                  |
| `deploymentStrategy`           | Deployment strategy                                                                                                           | `RollingUpdate`                      |
| `securityContext`              | Deployment securityContext                                                                                                    | `{"runAsUser": 472, "fsGroup": 472}` |
| `image.repository`             | Image repository                                                                                                              | `grafana/grafana`                    |
| `image.tag`                    | Image tag. (`Must be >= 5.0.0`)                                                                                               | `5.2.4`                              |
| `image.pullPolicy`             | Image pull policy                                                                                                             | `IfNotPresent`                       |
| `service.type`                 | Kubernetes service type                                                                                                       | `ClusterIP`                          |
| `service.port`                 | Kubernetes port where service is exposed                                                                                      | `80`                                 |
| `service.annotations`          | Service annotations                                                                                                           | `{}`                                 |
| `service.labels`               | Custom labels                                                                                                                 | `{}`                                 |
| `ingress.enabled`              | Enables Ingress                                                                                                               | `false`                              |
| `ingress.annotations`          | Ingress annotations                                                                                                           | `{}`                                 |
| `ingress.labels`               | Custom labels                                                                                                                 | `{}`                                 |
| `ingress.hosts`                | Ingress accepted hostnames                                                                                                    | `[]`                                 |
| `ingress.tls`                  | Ingress TLS configuration                                                                                                     | `[]`                                 |
| `resources`                    | CPU/Memory resource requests/limits                                                                                           | `{}`                                 |
| `nodeSelector`                 | Node labels for pod assignment                                                                                                | `{}`                                 |
| `tolerations`                  | Toleration labels for pod assignment                                                                                          | `[]`                                 |
| `affinity`                     | Affinity settings for pod assignment                                                                                          | `{}`                                 |
| `persistence.enabled`          | Use persistent volume to store data                                                                                           | `false`                              |
| `persistence.size`             | Size of persistent volume claim                                                                                               | `10Gi`                               |
| `persistence.existingClaim`    | Use an existing PVC to persist data                                                                                           | `nil`                                |
| `persistence.storageClassName` | Type of persistent volume claim                                                                                               | `nil`                                |
| `persistence.accessModes`      | Persistence access modes                                                                                                      | `[]`                                 |
| `persistence.subPath`          | Mount a sub dir of the persistent volume                                                                                      | `""`                                 |
| `schedulerName`                | Alternate scheduler name                                                                                                      | `nil`                                |
| `env`                          | Extra environment variables passed to pods                                                                                    | `{}`                                 |
| `envFromSecret`                | Name of a Kubenretes secret (must be manually created in the same namespace) containing values to be added to the environment | `""`                                 |
| `extraSecretMounts`            | Additional grafana server secret mounts                                                                                       | `[]`                                 |
| `datasources`                  | Configure grafana datasources                                                                                                 | `{}`                                 |
| `dashboardProviders`           | Configure grafana dashboard providers                                                                                         | `{}`                                 |
| `dashboards`                   | Dashboards to import                                                                                                          | `{}`                                 |
| `dashboardsConfigMaps`         | ConfigMaps reference that contains dashboards                                                                                 | `{}`                                 |
| `grafana.ini`                  | Grafana's primary configuration                                                                                               | `{}`                                 |
| `ldap.existingSecret`          | The name of an existing secret containing the `ldap.toml` file, this must have the key `ldap-toml`.                           | `""`                                 |
| `ldap.config`                  | Grafana's LDAP configuration                                                                                                  | `""`                                 |
| `annotations`                  | Deployment annotations                                                                                                        | `{}`                                 |
| `podAnnotations`               | Pod annotations                                                                                                               | `{}`                                 |
| `sidecar.dashboards.enabled`   | Enabled the cluster wide search for dashboards and adds/updates/deletes them in grafana                                       | `false`                              |
| `sidecar.dashboards.label`     | Label that config maps with dashboards should have to be added                                                                | `false`                              |
| `sidecar.datasources.enabled`  | Enabled the cluster wide search for datasources and adds/updates/deletes them in grafana                                      | `false`                              |
| `sidecar.datasources.label`    | Label that config maps with datasources should have to be added                                                               | `false`                              |
| `smtp.existingSecret`          | The name of an existing secret containing the SMTP credentials, this must have the keys `user` and `password`.                | `""`                                 |

## Sidecar for dashboards

If the parameter `sidecar.dashboards.enabled` is set, a sidecar container is deployed in the grafana pod. This container watches all config maps in the cluster and filters out the ones with a label as defined in `sidecar.dashboards.label`. The files defined in those configmaps are written to a folder and accessed by grafana. Changes to the configmaps are monitored and the imported dashboards are deleted/updated. A recommendation is to use one configmap per dashboard, as an reduction of multiple dashboards inside one configmap is currently not properly mirrored in grafana.
Example dashboard config:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: sample-grafana-dashboard
  labels:
     grafana_dashboard: 1
data:
  k8s-dashboard.json: |-
  [...]
```

## Sidecar for datasources

If the parameter `sidecar.datasource.enabled` is set, a sidecar container is deployed in the grafana pod. This container watches all config maps in the cluster and filters out the ones with a label as defined in `sidecar.datasources.label`. The files defined in those configmaps are written to a folder and accessed by grafana on startup. Using these yaml files, the data sources in grafana can be modified.

Example datasource config adapted from [Grafana](http://docs.grafana.org/administration/provisioning/#example-datasource-config-file):

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: sample-grafana-datasource
  labels:
     grafana_datasource: 1
data:
	datasource.yaml: |-
		# config file version
		apiVersion: 1

		# list of datasources that should be deleted from the database
		deleteDatasources:
		  - name: Graphite
		    orgId: 1

		# list of datasources to insert/update depending
		# whats available in the database
		datasources:
		  # <string, required> name of the datasource. Required
		- name: Graphite
		  # <string, required> datasource type. Required
		  type: graphite
		  # <string, required> access mode. proxy or direct (Server or Browser in the UI). Required
		  access: proxy
		  # <int> org id. will default to orgId 1 if not specified
		  orgId: 1
		  # <string> url
		  url: http://localhost:8080
		  # <string> database password, if used
		  password:
		  # <string> database user, if used
		  user:
		  # <string> database name, if used
		  database:
		  # <bool> enable/disable basic auth
		  basicAuth:
		  # <string> basic auth username
		  basicAuthUser:
		  # <string> basic auth password
		  basicAuthPassword:
		  # <bool> enable/disable with credentials headers
		  withCredentials:
		  # <bool> mark as default datasource. Max one per org
		  isDefault:
		  # <map> fields that will be converted to json and stored in json_data
		  jsonData:
		     graphiteVersion: "1.1"
		     tlsAuth: true
		     tlsAuthWithCACert: true
		  # <string> json object of data that will be encrypted.
		  secureJsonData:
		    tlsCACert: "..."
		    tlsClientCert: "..."
		    tlsClientKey: "..."
		  version: 1
		  # <bool> allow users to edit datasources from the UI.
		  editable: false

```
