# `@helm-charts/stable-kibana`

Kibana is an open source data visualization plugin for Elasticsearch

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | kibana |
| Chart Version       | 0.5.0  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  repository: 'docker.elastic.co/kibana/kibana-oss'
  tag: '6.0.0'
  pullPolicy: 'IfNotPresent'

commandline:
  args:

env:
  # All Kibana configuration options are adjustable via env vars.
  # To adjust a config option to an env var uppercase + replace `.` with `_`
  # Ref: https://www.elastic.co/guide/en/kibana/current/settings.html
  #
  # ELASTICSEARCH_URL: http://elasticsearch-client:9200
  # SERVER_PORT: 5601
  # LOGGING_VERBOSE: "true"
  # SERVER_DEFAULTROUTE: "/app/kibana"

service:
  type: ClusterIP
  externalPort: 443
  internalPort: 5601
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

resources:
  {}
  # limits:
  #   cpu: 100m
  #   memory: 300Mi
  # requests:
  #   cpu: 100m
  #   memory: 300Mi

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

| Parameter                | Description                                                      | Default        |
| ------------------------ | ---------------------------------------------------------------- | -------------- |
| `affinity`               | node/pod affinities                                              | None           |
| `env`                    | Environment variables to configure Kibana                        | `{}`           |
| `image.pullPolicy`       | Image pull policy                                                | `IfNotPresent` |
| `image.repository`       | Image repository                                                 | `kibana`       |
| `image.tag`              | Image tag                                                        | `6.0.0`        |
| `image.pullSecrets`      | Specify image pull secrets                                       | `nil`          |
| `commandline.args`       | add additional commandline args                                  | `nil`          |
| `ingress.enabled`        | Enables Ingress                                                  | `false`        |
| `ingress.annotations`    | Ingress annotations                                              | None:          |
| `ingress.hosts`          | Ingress accepted hostnames                                       | None:          |
| `ingress.tls`            | Ingress TLS configuration                                        | None:          |
| `nodeSelector`           | node labels for pod assignment                                   | `{}`           |
| `podAnnotations`         | annotations to add to each pod                                   | `{}`           |
| `replicaCount`           | desired number of pods                                           | `1`            |
| `resources`              | pod resource requests & limits                                   | `{}`           |
| `service.externalPort`   | external port for the service                                    | `443`          |
| `service.internalPort`   | internal port for the service                                    | `4180`         |
| `service.externalIPs`    | external IP addresses                                            | None:          |
| `service.loadBalancerIP` | Load Balancer IP address (to use with service.type LoadBalancer) | None:          |
| `service.type`           | type of service                                                  | `ClusterIP`    |
| `service.annotations`    | Kubernetes service annotations                                   | None:          |
| `tolerations`            | List of node taints to tolerate                                  | `[]`           |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install stable/kibana --name my-release \
  --set=image.tag=v0.0.2,resources.limits.cpu=200m
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install stable/kibana --name my-release -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)
