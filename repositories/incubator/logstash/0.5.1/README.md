# `@helm-charts/incubator-logstash`

Logstash is an open source, server-side data processing pipeline

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | logstash  |
| Chart Version       | 0.5.1     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for logstash.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
nodeSelector: {}
image:
  repository: docker.elastic.co/logstash/logstash-oss
  tag: 6.2.1
  pullPolicy: IfNotPresent
service:
  type: ClusterIP
  internalPort: 1514
  ports:
    - name: 'syslog-tcp'
      protocol: TCP
      containerPort: 1514
    - name: 'syslog-udp'
      protocol: UDP
      containerPort: 1514
    - name: 'filebeat-tcp'
      protocol: TCP
      containerPort: 5044

# Extra config options
configData: {}

podAnnotations:
  {}
  # Add custom annotations to pods
  # iam.amazonaws.com/role: "example-role"

podLabels:
  {}
  # Add custom labels to pods
  # team: "developers"
  # service: "logstash"

livenessProbe:
  initialDelaySeconds: 60
  periodSeconds: 20
readinessProbe:
  initialDelaySeconds: 120

ingress:
  enabled: false
  # Used to create an Ingress and Service record.
  # hosts:
  #   - name: "logstash-udp.local"
  #     protocol: UDP
  #     serviceName: logstash-udp
  #     servicePort: 514
  annotations:
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  tls:
    # Secrets must be manually created in the namespace.
    # - secretName: chart-example-tls
    #   hosts:
    #     - chart-example.local
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

elasticsearch:
  host: 'elasticsearch-client.default.svc.cluster.local'
  port: 9200

# patterns for filters
# each element will be turned into it's own pattern file
patterns:
  # testpattern: |-
  #     TESTING {"foo":.*}$

inputs:
  main: |-
    input {
      tcp {
        port => "${SYSLOG_PORT}"
        type => syslog
      }
      udp {
        port => 1514
        type => syslog
      }
      beats {
        port => 5044
      }
    }

filters:
  # main: |-
  #   filter {
  #   }

outputs:
  main: |-
    output {
      elasticsearch {
        hosts => ["${ELASTICSEARCH_HOST}:${ELASTICSEARCH_PORT}"]
      }
    }
```

</details>

---

# Logstash

[Logstash](https://www.elastic.co/products/logstash) is an open source, server-side data processing pipeline that ingests data from a multitude of sources simultaneously, transforms it, and then sends it to your favorite “stash.”

## TL;DR;

```console
$ helm install incubator/logstash
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release incubator/logstash
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes nearly all the Kubernetes components associated with the
chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the drone charts and their default values.

| Parameter                            | Description                                        | Default                                          |
| ------------------------------------ | -------------------------------------------------- | ------------------------------------------------ |
| `replicaCount`                       | Number of replicas                                 | `1`                                              |
| `nodeSelector`                       | Node selectors                                     | `{}`                                             |
| `livenessProbe.initialDelaySeconds`  | initialDelaySeconds of Pod livenessProbe           | `60`                                             |
| `livenessProbe.periodSeconds`        | periodSeconds of Pod livenessProbe                 | `20`                                             |
| `readinessProbe.initialDelaySeconds` | initialDelaySeconds of Pod readinessProbe          | `60`                                             |
| `nodeSelector`                       | Node selectors                                     | `{}`                                             |
| `image.repository`                   | Container image name                               | `docker.elastic.co/logstash/logstash-oss`        |
| `image.tag`                          | Container image tag                                | `6.2.1`                                          |
| `image.pullPolicy`                   | Container image pull policy                        | `IfNotPresent`                                   |
| `service.type`                       | Service type (ClusterIP, NodePort or LoadBalancer) | `ClusterIP`                                      |
| `service.internalPort`               | Logstash internal port                             | `1514`                                           |
| `service.ports`                      | Service open ports                                 | `[TCP/1514, UDP/1514, TCP/5044]`                 |
| `ingress.enabled`                    | Enables Ingress                                    | `false`                                          |
| `ingress.annotations`                | Ingress annotations                                | `{}`                                             |
| `ingress.hosts`                      | Ingress accepted hostnames                         | `[]`                                             |
| `ingress.tls`                        | Ingress TLS configuration                          | `nil`                                            |
| `resources`                          | Pod resource requests & limits                     | `{}`                                             |
| `podAnnotations`                     | Pod annotations                                    | `{}`                                             |
| `podLabels`                          | Pod labels                                         | `{}`                                             |
| `elasticsearch.host`                 | ElasticSearch hostname                             | `elasticsearch-client.default.svc.cluster.local` |
| `elasticsearch.port`                 | ElasticSearch port                                 | `9200`                                           |
| `configData`                         | Extra logstash config                              | `{}`                                             |
| `patterns`                           | Logstash patterns configuration                    | `nil`                                            |
| `inputs`                             | Logstash inputs configuration                      | `(basic)`                                        |
| `filters`                            | Logstash filters configuration                     | `nil`                                            |
| `outputs`                            | Logstash outputs configuration                     | `(basic)`                                        |
