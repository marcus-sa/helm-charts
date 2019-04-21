# `@helm-charts/stable-logstash`

Logstash is an open source, server-side data processing pipeline

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | logstash |
| Chart Version       | 1.4.2    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
replicaCount: 1

podDisruptionBudget:
  maxUnavailable: 1

updateStrategy:
  type: RollingUpdate

terminationGracePeriodSeconds: 30

image:
  repository: docker.elastic.co/logstash/logstash-oss
  tag: 6.5.4
  pullPolicy: IfNotPresent
  ## Add secrets manually via kubectl on kubernetes cluster and reference here
  #  pullSecrets:
  #    - name: "myKubernetesSecret"

service:
  type: ClusterIP
  # clusterIP: None
  # nodePort:
  # Set this to local, to preserve client source ip.  Default stripes out the source ip
  # externalTrafficPolicy: Local
  annotations:
    {}
    ## AWS example for use with LoadBalancer service type.
    # external-dns.alpha.kubernetes.io/hostname: logstash.cluster.local
    # service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: "true"
    # service.beta.kubernetes.io/aws-load-balancer-internal: "true"
  ports:
    # syslog-udp:
    #   port: 1514
    #   targetPort: syslog-udp
    #   protocol: UDP
    # syslog-tcp:
    #   port: 1514
    #   targetPort: syslog-tcp
    #   protocol: TCP
    beats:
      port: 5044
      targetPort: beats
      protocol: TCP
    # http:
    #  port: 8080
    #  targetPort: http
    #  protocol: TCP
    # loadBalancerIP: 10.0.0.1
ports:
  # - name: syslog-udp
  #   containerPort: 1514
  #   protocol: UDP
  # - name: syslog-tcp
  #   containerPort: 1514
  #   protocol: TCP
  - name: beats
    containerPort: 5044
    protocol: TCP
  # - name: http
  #   containerPort: 8080
  #   protocol: TCP

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - logstash.cluster.local
  tls: []
  #  - secretName: logstash-tls
  #    hosts:
  #      - logstash.cluster.local

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

priorityClassName: ''

nodeSelector: {}

tolerations: []

affinity:
  {}
  # podAntiAffinity:
  #   requiredDuringSchedulingIgnoredDuringExecution:
  #     - topologyKey: "kubernetes.io/hostname"
  #       labelSelector:
  #         matchLabels:
  #           release: logstash

podAnnotations:
  {}
  # iam.amazonaws.com/role: "logstash-role"
  # prometheus.io/scrape: "true"
  # prometheus.io/path: "/metrics"
  # prometheus.io/port: "9198"

podLabels:
  {}
  # team: "developers"
  # service: "logstash"

livenessProbe:
  httpGet:
    path: /
    port: monitor
  initialDelaySeconds: 20
  # periodSeconds: 30
  # timeoutSeconds: 30
  # failureThreshold: 6
  # successThreshold: 1

readinessProbe:
  httpGet:
    path: /
    port: monitor
  initialDelaySeconds: 20
  # periodSeconds: 30
  # timeoutSeconds: 30
  # failureThreshold: 6
  # successThreshold: 1

persistence:
  enabled: true
  ## logstash data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 2Gi

volumeMounts:
  - name: data
    mountPath: /usr/share/logstash/data
  - name: patterns
    mountPath: /usr/share/logstash/patterns
  - name: pipeline
    mountPath: /usr/share/logstash/pipeline

volumes:
  []
  # - name: tls
  #   secret:
  #     secretName: logstash-tls
  # - name: pipeline
  #   configMap:
  #     name: logstash-pipeline
  # - name: certs
  #   hostPath:
  #     path: /tmp

exporter:
  logstash:
    enabled: false
    image:
      repository: bonniernews/logstash_exporter
      tag: v0.1.2
      pullPolicy: IfNotPresent
    env: {}
    resources: {}
    path: /metrics
    port: 9198
    target:
      port: 9600
      path: /metrics
    livenessProbe:
      httpGet:
        path: /metrics
        port: ls-exporter
      periodSeconds: 15
      timeoutSeconds: 60
      failureThreshold: 8
      successThreshold: 1
    readinessProbe:
      httpGet:
        path: /metrics
        port: ls-exporter
      periodSeconds: 15
      timeoutSeconds: 60
      failureThreshold: 8
      successThreshold: 1

elasticsearch:
  host: elasticsearch-client.default.svc.cluster.local
  port: 9200

## ref: https://github.com/elastic/logstash-docker/blob/master/build/logstash/env2yaml/env2yaml.go
config:
  config.reload.automatic: 'true'
  path.config: /usr/share/logstash/pipeline
  path.data: /usr/share/logstash/data

  ## ref: https://www.elastic.co/guide/en/logstash/current/persistent-queues.html
  queue.checkpoint.writes: 1
  queue.drain: 'true'
  queue.max_bytes: 1gb # disk capacity must be greater than the value of `queue.max_bytes`
  queue.type: persisted

## Patterns for filters.
## Each YAML heredoc will become a separate pattern file.
patterns:
  # main: |-
  #   TESTING {"foo":.*}$

## NOTE: To achieve multiple pipelines with this chart, current best practice
## is to maintain one pipeline per chart release. In this way configuration is
## simplified and pipelines are more isolated from one another.

inputs:
  main: |-
    input {
      # udp {
      #   port => 1514
      #   type => syslog
      # }
      # tcp {
      #   port => 1514
      #   type => syslog
      # }
      beats {
        port => 5044
      }
      # http {
      #   port => 8080
      # }
      # kafka {
      #   ## ref: https://www.elastic.co/guide/en/logstash/current/plugins-inputs-kafka.html
      #   bootstrap_servers => "kafka-input:9092"
      #   codec => json { charset => "UTF-8" }
      #   consumer_threads => 1
      #   topics => ["source"]
      #   type => "example"
      # }
    }

filters:
  # main: |-
  #   filter {
  #   }

outputs:
  main: |-
    output {
      # stdout { codec => rubydebug }
      elasticsearch {
        hosts => ["${ELASTICSEARCH_HOST}:${ELASTICSEARCH_PORT}"]
        manage_template => false
        index => "%{[@metadata][beat]}-%{+YYYY.MM.dd}"
        document_type => "%{[@metadata][type]}"
      }
      # kafka {
      #   ## ref: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-kafka.html
      #   bootstrap_servers => "kafka-output:9092"
      #   codec => json { charset => "UTF-8" }
      #   compression_type => "lz4"
      #   topic_id => "destination"
      # }
    }
```

</details>

---

# Logstash

[Logstash](https://www.elastic.co/products/logstash) is an open source, server-side data processing pipeline that ingests data from a multitude of sources simultaneously, transforms it, and then sends it to your favorite “stash.”

## TL;DR;

```console
$ helm install stable/logstash
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/logstash
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes nearly all the Kubernetes components associated with the
chart and deletes the release.

## Best Practices

### Release and tune this chart once per Logstash pipeline

To achieve multiple pipelines with this chart, current best practice is to
maintain one pipeline per chart release. In this way configuration is
simplified and pipelines are more isolated from one another.

### Default Pipeline: Beats Input -> Elasticsearch Output

Current best practice for ELK logging is to ship logs from hosts using Filebeat
to logstash where persistent queues are enabled. Filebeat supports structured
(e.g. JSON) and unstructured (e.g. log lines) log shipment.

### Load Beats-generated index template into Elasticsearch

To best utilize the combination of Beats, Logstash and Elasticsearch,
load Beats-generated index templates into Elasticsearch as described [here](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-template.html).

On a remote-to-Kubernetes Linux instance you might run the following command to
load that instance's Beats-generated index template into Elasticsearch
(Elasticsearch hostname will vary).

```
filebeat setup --template -E output.logstash.enabled=false \
  -E 'output.elasticsearch.hosts=["elasticsearch.cluster.local:9200"]'
```

### Links

Please review the following links that expound on current best practices.

- https://www.elastic.co/blog/structured-logging-filebeat
- https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-template.html
- https://www.elastic.co/guide/en/logstash/current/deploying-and-scaling.html
- https://www.elastic.co/guide/en/logstash/current/persistent-queues.html

## Configuration

The following table lists the configurable parameters of the chart and its default values.

| Parameter                       | Description                                        | Default                                          |
| ------------------------------- | -------------------------------------------------- | ------------------------------------------------ |
| `replicaCount`                  | Number of replicas                                 | `1`                                              |
| `podDisruptionBudget`           | Pod disruption budget                              | `maxUnavailable: 1`                              |
| `updateStrategy`                | Update strategy                                    | `type: RollingUpdate`                            |
| `image.repository`              | Container image name                               | `docker.elastic.co/logstash/logstash-oss`        |
| `image.tag`                     | Container image tag                                | `6.5.4`                                          |
| `image.pullPolicy`              | Container image pull policy                        | `IfNotPresent`                                   |
| `service.type`                  | Service type (ClusterIP, NodePort or LoadBalancer) | `ClusterIP`                                      |
| `service.annotations`           | Service annotations                                | `{}`                                             |
| `service.ports`                 | Ports exposed by service                           | beats                                            |
| `service.loadBalancerIP`        | The load balancer IP for the service               | unset                                            |
| `service.clusterIP`             | The cluster IP for the service                     | unset                                            |
| `service.nodePort`              | The nodePort for the service                       | unset                                            |
| `service.externalTrafficPolicy` | Set externalTrafficPolicy                          | unset                                            |
| `ports`                         | Ports exposed by logstash container                | beats                                            |
| `ingress.enabled`               | Enables Ingress                                    | `false`                                          |
| `ingress.annotations`           | Ingress annotations                                | `{}`                                             |
| `ingress.path`                  | Ingress path                                       | `/`                                              |
| `ingress.hosts`                 | Ingress accepted hostnames                         | `["logstash.cluster.local"]`                     |
| `ingress.tls`                   | Ingress TLS configuration                          | `[]`                                             |
| `resources`                     | Pod resource requests & limits                     | `{}`                                             |
| `priorityClassName`             | priorityClassName                                  | `nil`                                            |
| `nodeSelector`                  | Node selector                                      | `{}`                                             |
| `tolerations`                   | Tolerations                                        | `[]`                                             |
| `affinity`                      | Affinity or Anti-Affinity                          | `{}`                                             |
| `podAnnotations`                | Pod annotations                                    | `{}`                                             |
| `podLabels`                     | Pod labels                                         | `{}`                                             |
| `livenessProbe`                 | Liveness probe settings for logstash container     | (see `values.yaml`)                              |
| `readinessProbe`                | Readiness probe settings for logstash container    | (see `values.yaml`)                              |
| `persistence.enabled`           | Enable persistence                                 | `true`                                           |
| `persistence.storageClass`      | Storage class for PVCs                             | unset                                            |
| `persistence.accessMode`        | Access mode for PVCs                               | `ReadWriteOnce`                                  |
| `persistence.size`              | Size for PVCs                                      | `2Gi`                                            |
| `volumeMounts`                  | Volume mounts to configure for logstash container  | (see `values.yaml`)                              |
| `volumes`                       | Volumes to configure for logstash container        | []                                               |
| `terminationGracePeriodSeconds` | Duration the pod needs to terminate gracefully     | `30`                                             |
| `exporter.logstash`             | Prometheus logstash-exporter settings              | (see `values.yaml`)                              |
| `exporter.logstash.enabled`     | Enables Prometheus logstash-exporter               | `false`                                          |
| `elasticsearch.host`            | ElasticSearch hostname                             | `elasticsearch-client.default.svc.cluster.local` |
| `elasticsearch.port`            | ElasticSearch port                                 | `9200`                                           |
| `config`                        | Logstash configuration key-values                  | (see `values.yaml`)                              |
| `patterns`                      | Logstash patterns configuration                    | `nil`                                            |
| `inputs`                        | Logstash inputs configuration                      | beats                                            |
| `filters`                       | Logstash filters configuration                     | `nil`                                            |
| `outputs`                       | Logstash outputs configuration                     | elasticsearch                                    |
