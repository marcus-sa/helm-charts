# `@helm-charts/stable-kibana`

Kibana is an open source data visualization plugin for Elasticsearch

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | kibana |
| Chart Version       | 0.14.4 |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  repository: 'docker.elastic.co/kibana/kibana-oss'
  tag: '6.4.1'
  pullPolicy: 'IfNotPresent'

commandline:
  args:

env:
  {}
  # All Kibana configuration options are adjustable via env vars.
  # To adjust a config option to an env var uppercase + replace `.` with `_`
  # Ref: https://www.elastic.co/guide/en/kibana/current/settings.html
  #
  # ELASTICSEARCH_URL: http://elasticsearch-client:9200
  # SERVER_PORT: 5601
  # LOGGING_VERBOSE: "true"
  # SERVER_DEFAULTROUTE: "/app/kibana"

files:
  kibana.yml:
    ## Default Kibana configuration from kibana-docker.
    server.name: kibana
    server.host: '0'
    elasticsearch.url: http://elasticsearch:9200

    ## Custom config properties below
    ## Ref: https://www.elastic.co/guide/en/kibana/current/settings.html
    # server.port: 5601
    # logging.verbose: "true"
    # server.defaultRoute: "/app/kibana"

service:
  type: ClusterIP
  externalPort: 443
  internalPort: 5601
  # authProxyPort: 5602 To be used with authProxyEnabled and a proxy extraContainer
  ## External IP addresses of service
  ## Default: nil
  ##
  # externalIPs:
  # - 192.168.0.1
  #
  ## LoadBalancer IP if service.type is LoadBalancer
  ## Default: nil
  ##
  # loadBalancerIP: 10.2.2.2
  annotations:
    # Annotation example: setup ssl with aws cert when service.type is LoadBalancer
    # service.beta.kubernetes.io/aws-load-balancer-ssl-cert: arn:aws:acm:us-east-1:EXAMPLE_CERT
  labels:
    ## Label example: show service URL in `kubectl cluster-info`
    # kubernetes.io/cluster-service: "true"

ingress:
  enabled: false
  # hosts:
  # - chart-example.local
  # annotations:
  #   kubernetes.io/ingress.class: nginx
  #   kubernetes.io/tls-acme: "true"
  # tls:
  # - secretName: chart-example-tls
  #   hosts:
  #     - chart-example.local

# service account that will run the pod. Leave commented to use the default service account.
# serviceAccountName: kibana

livenessProbe:
  enabled: false
  initialDelaySeconds: 30
  timeoutSeconds: 10

readinessProbe:
  enabled: false
  initialDelaySeconds: 30
  timeoutSeconds: 10

# Enable an authproxy. Specify container in extraContainers
authProxyEnabled: false

extraContainers: |
# - name: proxy
#   image: quay.io/gambol99/keycloak-proxy:latest
#   args:
#     - --resource=uri=/*
#     - --discovery-url=https://discovery-url
#     - --client-id=client
#     - --client-secret=secret
#     - --listen=0.0.0.0:5602
#     - --upstream-url=http://127.0.0.1:5601
#   ports:
#     - name: web
#       containerPort: 9090
resources:
  {}
  # limits:
  #   cpu: 100m
  #   memory: 300Mi
  # requests:
  #   cpu: 100m
  #   memory: 300Mi

priorityClassName: ''

# Affinity for pod assignment
# Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
# affinity: {}

# Tolerations for pod assignment
# Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
tolerations: []

# Node labels for pod assignment
# Ref: https://kubernetes.io/docs/user-guide/node-selection/
nodeSelector: {}

podAnnotations: {}
replicaCount: 1
revisionHistoryLimit: 3

# to export a dashboard from a running kibana 6.3.x use:
# curl --user <username>:<password> -XGET https://kibana.yourdomain.com:5601/api/kibana/dashboards/export?dashboard=<some-dashboard-uuid> > my-dashboard.json
# you can find an example dashboard for kubernests with fluentd-elasticsearch chart here: https://github.com/monotek/kibana-dashboards/blob/master/k8s-fluentd-elasticsearch.json
dashboardImport:
  xpackauth:
    enabled: false
    username: myuser
    password: mypass
  dashboards: {}

# List of pluginns to install using initContainer
plugins:
  # - https://github.com/sivasamyk/logtrail/releases/download/v0.1.29/logtrail-6.4.0-0.1.29.zip
  # - other_plugin
```

</details>

---

# kibana

[kibana](https://github.com/elastic/kibana) is your window into the Elastic Stack. Specifically, it's an open source (Apache Licensed), browser-based analytics and search dashboard for Elasticsearch.

## TL;DR;

```console
$ helm install stable/kibana
```

## Introduction

This chart bootstraps a kibana deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install stable/kibana --name my-release
```

The command deploys kibana on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the kibana chart and their default values.

| Parameter                            | Description                                                     | Default                               |
| ------------------------------------ | --------------------------------------------------------------- | ------------------------------------- |
| `affinity`                           | node/pod affinities                                             | None                                  |
| `env`                                | Environment variables to configure Kibana                       | `{}`                                  |
| `files`                              | Kibana configuration files                                      | None                                  |
| `image.pullPolicy`                   | Image pull policy                                               | `IfNotPresent`                        |
| `image.repository`                   | Image repository                                                | `docker.elastic.co/kibana/kibana-oss` |
| `image.tag`                          | Image tag                                                       | `6.4.1`                               |
| `image.pullSecrets`                  | Specify image pull secrets                                      | `nil`                                 |
| `commandline.args`                   | add additional commandline args                                 | `nil`                                 |
| `ingress.enabled`                    | Enables Ingress                                                 | `false`                               |
| `ingress.annotations`                | Ingress annotations                                             | None:                                 |
| `ingress.hosts`                      | Ingress accepted hostnames                                      | None:                                 |
| `ingress.tls`                        | Ingress TLS configuration                                       | None:                                 |
| `nodeSelector`                       | node labels for pod assignment                                  | `{}`                                  |
| `podAnnotations`                     | annotations to add to each pod                                  | `{}`                                  |
| `replicaCount`                       | desired number of pods                                          | `1`                                   |
| `revisionHistoryLimit`               | revisionHistoryLimit                                            | `3`                                   |
| `serviceAccountName`                 | serviceAccount that will run the pod                            | `nil`                                 |
| `authProxyEnabled`                   | enables authproxy. Create container in extracontainers          | `false`                               |
| `extraContainers`                    | Sidecar containers to add to the kibana pod                     | `{}`                                  |
| `resources`                          | pod resource requests & limits                                  | `{}`                                  |
| `priorityClassName`                  | priorityClassName                                               | `nil`                                 |
| `service.externalPort`               | external port for the service                                   | `443`                                 |
| `service.internalPort`               | internal port for the service                                   | `4180`                                |
| `service.authProxyPort`              | port to use when using sidecar authProxy                        | None:                                 |
| `service.externalIPs`                | external IP addresses                                           | None:                                 |
| `service.loadBalancerIP`             | Load Balancer IP address                                        | None:                                 |
| `service.nodePort`                   | NodePort value if service.type is NodePort                      | None:                                 |
| `service.type`                       | type of service                                                 | `ClusterIP`                           |
| `service.annotations`                | Kubernetes service annotations                                  | None:                                 |
| `service.labels`                     | Kubernetes service labels                                       | None:                                 |
| `tolerations`                        | List of node taints to tolerate                                 | `[]`                                  |
| `dashboardImport.xpackauth.enabled`  | Enable Xpack auth                                               | `false`                               |
| `dashboardImport.xpackauth.username` | Optional Xpack username                                         | `myuser`                              |
| `dashboardImport.xpackauth.password` | Optional Xpack password                                         | `mypass`                              |
| `dashboardImport.dashboards`         | Dashboards                                                      | `{}`                                  |
| `plugins`                            | List of URLs pointing to zip files of Kibana plugins to install | None:                                 |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

- The Kibana configuration files config properties can be set through the `env` parameter too.
- All the files listed under this variable will overwrite any existing files by the same name in kibana config directory.
- Files not mentioned under this variable will remain unaffected.

```console
$ helm install stable/kibana --name my-release \
  --set=image.tag=v0.0.2,resources.limits.cpu=200m
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install stable/kibana --name my-release -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)
