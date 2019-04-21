# `@helm-charts/stable-fluent-bit`

Fast and Lightweight Log/Data Forwarder for Linux, BSD and OSX

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | fluent-bit |
| Chart Version       | 1.4.0      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Minikube stores its logs in a separate directory.
# enable if started in minikube.
on_minikube: false

image:
  fluent_bit:
    repository: fluent/fluent-bit
    tag: 1.0.3
  pullPolicy: IfNotPresent

# When enabled, exposes json and prometheus metrics on {{ .Release.Name }}-metrics service
metrics:
  enabled: false
  service:
    annotations: {}
    # In order for Prometheus to consume metrics automatically use the following annotations:
    # prometheus.io/path: "/api/v1/metrics/prometheus"
    # prometheus.io/port: "2020"
    # prometheus.io/scrape: "true"
    port: 2020
    type: ClusterIP

# When enabled, fluent-bit will keep track of tailing offsets across pod restarts.
trackOffsets: false

backend:
  type: forward
  forward:
    host: fluentd
    port: 24284
    tls: 'off'
    tls_verify: 'on'
    tls_debug: 1
    shared_key:
  es:
    host: elasticsearch
    port: 9200
    # Elastic Index Name
    index: kubernetes_cluster
    type: flb_type
    logstash_prefix: kubernetes_cluster
    replace_dots: 'On'
    time_key: '@timestamp'
    # Optional username credential for Elastic X-Pack access
    http_user:
    # Password for user defined in HTTP_User
    http_passwd:
    # Optional TLS encryption to ElasticSearch instance
    tls: 'off'
    tls_verify: 'on'
    # TLS certificate for the Elastic (in PEM format). Use if tls=on and tls_verify=on.
    tls_ca: ''
    # TLS debugging levels = 1-4
    tls_debug: 1
  splunk:
    host: 127.0.0.1
    port: 8088
    token: ''
    send_raw: 'on'
    tls: 'on'
    tls_verify: 'off'
    tls_debug: 1
    message_key: 'kubernetes'

  ##
  ## Ref: http://fluentbit.io/documentation/current/output/http.html
  ##
  http:
    host: 127.0.0.1
    port: 80
    uri: '/'
    http_user:
    http_passwd:
    tls: 'off'
    tls_verify: 'on'
    tls_debug: 1
    ## Specify the data format to be used in the HTTP request body
    ## Can be either 'msgpack' or 'json'
    format: msgpack

parsers:
  enabled: false
  ## List the respective parsers in key: value format per entry
  ## Regex required fields are name and regex. JSON required field
  ## is name.
  regex: []
  ##  json parser config can be defined by providing an extraEntries field.
  ##  The following entry:
  ## json:
  ##   - extraEntries: |
  ##       Decode_Field_As  escaped log do_next
  ##       Decode_Field_As  json log
  ##
  ##  translates into
  ##
  ##   Command       |  Decoder  | Field | Optional Action   |
  ##   ==============|===========|=======|===================|
  ##   Decode_Field_As  escaped   log  do_next
  ##   Decode_Field_As  json log
  ##
  json: []

env: []

## Annotations to add to the DaemonSet's Pods
podAnnotations: {}

## By default there different 'files' provides in the config
## (fluent-bit.conf, custom_parsers.conf). This defeats
## changing a configmap (since it uses subPath). If this
## variable is set, the user is assumed to have provided,
## in 'existingConfigMap' the entire config (etc/*) of fluent-bit,
## parsers and system config. In this case, no subPath is
## used
fullConfigMap: false

## ConfigMap override where fullname is {{.Release.Name}}-{{.Values.existingConfigMap}}
## Defining existingConfigMap will cause templates/config.yaml
## to NOT generate a ConfigMap resource
##
existingConfigMap: ''

rawConfig: |-
  @INCLUDE fluent-bit-service.conf
  @INCLUDE fluent-bit-input.conf
  @INCLUDE fluent-bit-filter.conf
  @INCLUDE fluent-bit-output.conf

extraEntries:
  input: |-
  #     # >=1 additional Key/Value entrie(s) for existing Input section
  filter: |-
  #     # >=1 additional Key/Value entrie(s) for existing Filter section
  output: |-
#     # >=1 additional Key/Value entrie(s) for existing Ouput section

## Extra ports to add to the daemonset ports section
extraPorts: []

## Extra volumes containing additional files required for fluent-bit to work
## (eg. CA certificates)
## Ref: https://kubernetes.io/docs/concepts/storage/volumes/
##
extraVolumes: []

## Extra volume mounts for the fluent-bit pod.
## Ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-volume-storage/
##
extraVolumeMounts: []

resources:
  {}
  # limits:
  #   cpu: 100m
  #   memory: 128Mi
  # requests:
  #   cpu: 10m
  #   memory: 8Mi

# When enabled, pods will bind to the node's network namespace.
hostNetwork: false

# Which DNS policy to use for the pod.
# Consider switching to 'ClusterFirstWithHostNet' when 'hostNetwork' is enabled.
dnsPolicy: ClusterFirst

## Node tolerations for fluent-bit scheduling to nodes with taints
## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
##
tolerations: []
# - key: "key"
#  operator: "Equal|Exists"
#  value: "value"
#  effect: "NoSchedule|PreferNoSchedule|NoExecute(1.6 only)"

## Node labels for fluent-bit pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}
affinity: {}

input:
  tail:
    memBufLimit: 5MB
    path: /var/log/containers/*.log
  systemd:
    enabled: false
    filters:
      systemdUnit:
        - docker.service
        - kubelet.service
        - node-problem-detector.service
    maxEntries: 1000
    readFromTail: true
    tag: host.*

filter:
  kubeURL: https://kubernetes.default.svc:443
  kubeCAFile: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
  kubeTokenFile: /var/run/secrets/kubernetes.io/serviceaccount/token
  kubeTag: kube
  # If true, check to see if the log field content is a JSON string map, if so,
  # it append the map fields as part of the log structure.
  mergeJSONLog: true

  # If true, enable the use of monitoring for a pod annotation of
  # fluentbit.io/parser: parser_name. parser_name must be the name
  # of a parser contained within parsers.conf
  enableParser: true

  # If true, enable the use of monitoring for a pod annotation of
  # fluentbit.io/exclude: true. If present, discard logs from that pod.
  enableExclude: true

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:
```

</details>

---

# Fluent-Bit Chart

[Fluent Bit](http://fluentbit.io/) is an open source and multi-platform Log Forwarder.

## Chart Details

This chart will do the following:

- Install a configmap for Fluent Bit
- Install a daemonset that provisions Fluent Bit [per-host architecture]

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/fluent-bit
```

When installing this chart on [Minikube](https://kubernetes.io/docs/getting-started-guides/minikube/), it's required to specify that so the DaemonSet will be able to mount the log files properly, make sure to append the _--set on_minikube=true_ option at the end of the _helm_ command, e.g:

```bash
$ helm install --name my-release stable/fluent-bit --set on_minikube=true
```

## Configuration

The following table lists the configurable parameters of the Fluent-Bit chart and the default values.

| Parameter                                                                                                                                                                           | Description                                                                                                                                                               | Default                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Backend Selection**                                                                                                                                                               |
| `backend.type`                                                                                                                                                                      | Set the backend to which Fluent-Bit should flush the information it gathers                                                                                               | `forward`                                                                                                                                        |
| **Forward Backend**                                                                                                                                                                 |
| `backend.forward.host`                                                                                                                                                              | Target host where Fluent-Bit or Fluentd are listening for Forward messages                                                                                                | `fluentd`                                                                                                                                        |
| `backend.forward.port`                                                                                                                                                              | TCP Port of the target service                                                                                                                                            | `24284`                                                                                                                                          |
| `backend.forward.shared_key`                                                                                                                                                        | A key string known by the remote Fluentd used for authorization.                                                                                                          | ``                                                                                                                                               |
| `backend.forward.tls`                                                                                                                                                               | Enable or disable TLS support                                                                                                                                             | `off`                                                                                                                                            |
| `backend.forward.tls_verify`                                                                                                                                                        | Force certificate validation                                                                                                                                              | `on`                                                                                                                                             |
| `backend.forward.tls_debug`                                                                                                                                                         | Set TLS debug verbosity level. It accept the following values: 0-4                                                                                                        | `1`                                                                                                                                              |
| **ElasticSearch Backend**                                                                                                                                                           |
| `backend.es.host`                                                                                                                                                                   | IP address or hostname of the target Elasticsearch instance                                                                                                               | `elasticsearch`                                                                                                                                  |
| `backend.es.port`                                                                                                                                                                   | TCP port of the target Elasticsearch instance.                                                                                                                            | `9200`                                                                                                                                           |
| `backend.es.index`                                                                                                                                                                  | Elastic Index name                                                                                                                                                        | `kubernetes_cluster`                                                                                                                             |
| `backend.es.type`                                                                                                                                                                   | Elastic Type name                                                                                                                                                         | `flb_type`                                                                                                                                       |
| `backend.es.time_key`                                                                                                                                                               | Elastic Time Key                                                                                                                                                          | `@timestamp`                                                                                                                                     |
| `backend.es.logstash_prefix`                                                                                                                                                        | Index Prefix. If Logstash_Prefix is equals to 'mydata' your index will become 'mydata-YYYY.MM.DD'.                                                                        | `kubernetes_cluster`                                                                                                                             |
| `backend.es.replace_dots`                                                                                                                                                           | Enable/Disable Replace_Dots option.                                                                                                                                       | `On`                                                                                                                                             |
| `backend.es.http_user`                                                                                                                                                              | Optional username credential for Elastic X-Pack access.                                                                                                                   | ``                                                                                                                                               |
| `backend.es.http_passwd:`                                                                                                                                                           | Password for user defined in HTTP_User.                                                                                                                                   | ``                                                                                                                                               |
| `backend.es.tls`                                                                                                                                                                    | Enable or disable TLS support                                                                                                                                             | `off`                                                                                                                                            |
| `backend.es.tls_verify`                                                                                                                                                             | Force certificate validation                                                                                                                                              | `on`                                                                                                                                             |
| `backend.es.tls_ca`                                                                                                                                                                 | TLS CA certificate for the Elastic instance (in PEM format). Specify if tls: on.                                                                                          | ``                                                                                                                                               |
| `backend.es.tls_debug`                                                                                                                                                              | Set TLS debug verbosity level. It accept the following values: 0-4                                                                                                        | `1`                                                                                                                                              |
| **HTTP Backend**                                                                                                                                                                    |
| `backend.http.host`                                                                                                                                                                 | IP address or hostname of the target HTTP Server                                                                                                                          | `127.0.0.1`                                                                                                                                      |
| `backend.http.port`                                                                                                                                                                 | TCP port of the target HTTP Server                                                                                                                                        | `80`                                                                                                                                             |
| `backend.http.uri`                                                                                                                                                                  | Specify an optional HTTP URI for the target web server, e.g: /something                                                                                                   | `"/"`                                                                                                                                            |
| `backend.http.http_user`                                                                                                                                                            | Optional username credential for Basic Authentication.                                                                                                                    | ``                                                                                                                                               |
| `backend.http.http_passwd:`                                                                                                                                                         | Password for user defined in HTTP_User.                                                                                                                                   | ``                                                                                                                                               |
| `backend.http.format`                                                                                                                                                               | Specify the data format to be used in the HTTP request body, by default it uses msgpack, optionally it can be set to json.                                                | `msgpack`                                                                                                                                        |
| `backend.http.tls`                                                                                                                                                                  | Enable or disable TLS support                                                                                                                                             | `off`                                                                                                                                            |
| `backend.http.tls_verify`                                                                                                                                                           | Force certificate validation                                                                                                                                              | `on`                                                                                                                                             |
| `backend.http.tls_debug`                                                                                                                                                            | Set TLS debug verbosity level. It accept the following values: 0-4                                                                                                        | `1`                                                                                                                                              |
| **Splunk Backend**                                                                                                                                                                  |
| `backend.splunk.host`                                                                                                                                                               | IP address or hostname of the target Splunk Server                                                                                                                        | `127.0.0.1`                                                                                                                                      |
| `backend.splunk.port`                                                                                                                                                               | TCP port of the target Splunk Server                                                                                                                                      | `8088`                                                                                                                                           |
| `backend.splunk.token`                                                                                                                                                              | Specify the Authentication Token for the HTTP Event Collector interface.                                                                                                  | ``                                                                                                                                               |
| `backend.splunk.send_raw`                                                                                                                                                           | If enabled, record keys and values are set in the main map.                                                                                                               | `off`                                                                                                                                            |
| `backend.splunk.tls`                                                                                                                                                                | Enable or disable TLS support                                                                                                                                             | `on`                                                                                                                                             |
| `backend.splunk.tls_verify`                                                                                                                                                         | Force TLS certificate validation                                                                                                                                          | `off`                                                                                                                                            |
| `backend.splunk.tls_debug`                                                                                                                                                          | Set TLS debug verbosity level. It accept the following values: 0-4                                                                                                        | `1`                                                                                                                                              |
| `backend.splunk.message_key`                                                                                                                                                        | Tag applied to all incoming logs                                                                                                                                          | `kubernetes`                                                                                                                                     |
| **Parsers**                                                                                                                                                                         |
| `parsers.enabled`                                                                                                                                                                   | Enable custom parsers                                                                                                                                                     | `false`                                                                                                                                          |
| `parsers.regex`                                                                                                                                                                     | List of regex parsers                                                                                                                                                     | `NULL`                                                                                                                                           |
| `parsers.json`                                                                                                                                                                      | List of json parsers                                                                                                                                                      | `NULL`                                                                                                                                           |
| **General**                                                                                                                                                                         |
| `annotations`                                                                                                                                                                       | Optional deamonset set annotations                                                                                                                                        | `NULL`                                                                                                                                           |
| `podAnnotations`                                                                                                                                                                    | Optional pod annotations                                                                                                                                                  | `NULL`                                                                                                                                           |
| `fullConfigMap`                                                                                                                                                                     | User has provided entire config (parsers + system)                                                                                                                        | `false`                                                                                                                                          |
| `existingConfigMap`                                                                                                                                                                 | ConfigMap override                                                                                                                                                        | ``                                                                                                                                               |
| `extraEntries.input`                                                                                                                                                                | Extra entries for existing [INPUT] section                                                                                                                                | ``                                                                                                                                               |
| `extraEntries.filter`                                                                                                                                                               | Extra entries for existing [FILTER] section                                                                                                                               | ``                                                                                                                                               |
| `extraEntries.output`                                                                                                                                                               | Extra entries for existing [OUPUT] section                                                                                                                                | ``                                                                                                                                               |
| `extraPorts`                                                                                                                                                                        | List of extra ports                                                                                                                                                       |                                                                                                                                                  |
| `extraVolumeMounts`                                                                                                                                                                 | Mount an extra volume, required to mount ssl certificates when elasticsearch has tls enabled                                                                              |                                                                                                                                                  |
| `extraVolume`                                                                                                                                                                       | Extra volume                                                                                                                                                              |                                                                                                                                                  |
| `filter.enableExclude`                                                                                                                                                              | Enable the use of monitoring for a pod annotation of `fluentbit.io/exclude: true`. If present, discard logs from that pod.                                                | `true`                                                                                                                                           |
| `filter.enableParser`                                                                                                                                                               | Enable the use of monitoring for a pod annotation of `fluentbit.io/parser: parser_name`. parser_name must be the name of a parser contained within parsers.conf           | `true`                                                                                                                                           |
| `filter.kubeURL`                                                                                                                                                                    | Optional custom configmaps                                                                                                                                                | `https://kubernetes.default.svc:443`                                                                                                             |
| `filter.kubeCAFile`                                                                                                                                                                 | Optional custom configmaps                                                                                                                                                | `/var/run/secrets/kubernetes.io/serviceaccount/ca.crt`                                                                                           |
| `filter.kubeTokenFile`                                                                                                                                                              | Optional custom configmaps                                                                                                                                                | `/var/run/secrets/kubernetes.io/serviceaccount/token`                                                                                            |
| `filter.kubeTag`                                                                                                                                                                    | Optional top-level tag for matching in filter                                                                                                                             | `kube`                                                                                                                                           |
| `filter.mergeJSONLog`                                                                                                                                                               | If the log field content is a JSON string map, append the map fields as part of the log structure                                                                         | `true`                                                                                                                                           |
| `image.fluent_bit.repository`                                                                                                                                                       | Image                                                                                                                                                                     | `fluent/fluent-bit`                                                                                                                              |
| `image.fluent_bit.tag`                                                                                                                                                              | Image tag                                                                                                                                                                 | `1.0.3`                                                                                                                                          |
| `image.pullPolicy`                                                                                                                                                                  | Image pull policy                                                                                                                                                         | `IfNotPresent`                                                                                                                                   |
| `image.pullSecrets`                                                                                                                                                                 | Specify image pull secrets                                                                                                                                                | `nil`                                                                                                                                            |
| `input.tail.memBufLimit`                                                                                                                                                            | Specify Mem_Buf_Limit in tail input                                                                                                                                       | `5MB`                                                                                                                                            |
| `input.tail.path`                                                                                                                                                                   | Specify log file(s) through the use of common wildcards.                                                                                                                  | `/var/log/containers/*.log`                                                                                                                      |
| `input.systemd.enabled`                                                                                                                                                             | [Enable systemd input](https://fluentbit.io/documentation/current/input/systemd.html)                                                                                     | `false`                                                                                                                                          |
| `input.systemd.filters.systemdUnit | Please see https://fluentbit.io/documentation/current/input/systemd.html |`[docker.service, kubelet.service`, `node-problem-detector.service]` |
| `input.systemd.maxEntries`                                                                                                                                                          | Please see https://fluentbit.io/documentation/current/input/systemd.html                                                                                                  | `1000`                                                                                                                                           |
| `input.systemd.readFromTail`                                                                                                                                                        | Please see https://fluentbit.io/documentation/current/input/systemd.html                                                                                                  | `true`                                                                                                                                           |
| `input.systemd.tag`                                                                                                                                                                 | Please see https://fluentbit.io/documentation/current/input/systemd.html                                                                                                  | `host.*`                                                                                                                                         |
| `rbac.create`                                                                                                                                                                       | Specifies whether RBAC resources should be created.                                                                                                                       | `true`                                                                                                                                           |
| `serviceAccount.create`                                                                                                                                                             | Specifies whether a ServiceAccount should be created.                                                                                                                     | `true`                                                                                                                                           |
| `serviceAccount.name`                                                                                                                                                               | The name of the ServiceAccount to use.                                                                                                                                    | `NULL`                                                                                                                                           |
| `rawConfig`                                                                                                                                                                         | Raw contents of fluent-bit.conf                                                                                                                                           | `@INCLUDE fluent-bit-service.conf`<br>`@INCLUDE fluent-bit-input.conf`<br>`@INCLUDE fluent-bit-filter.conf`<br>`@INCLUDE fluent-bit-output.conf` |
| `resources`                                                                                                                                                                         | Pod resource requests & limits                                                                                                                                            | `{}`                                                                                                                                             |
| `hostNetwork`                                                                                                                                                                       | Use host's network                                                                                                                                                        | `false`                                                                                                                                          |
| `dnsPolicy`                                                                                                                                                                         | Specifies the dnsPolicy to use                                                                                                                                            | `ClusterFirst`                                                                                                                                   |
| `tolerations`                                                                                                                                                                       | Optional daemonset tolerations                                                                                                                                            | `NULL`                                                                                                                                           |
| `nodeSelector`                                                                                                                                                                      | Node labels for fluent-bit pod assignment                                                                                                                                 | `NULL`                                                                                                                                           |
| `affinity`                                                                                                                                                                          | Expressions for affinity                                                                                                                                                  | `NULL`                                                                                                                                           |
| `metrics.enabled`                                                                                                                                                                   | Specifies whether a service for metrics should be exposed                                                                                                                 | `false`                                                                                                                                          |
| `metrics.service.annotations`                                                                                                                                                       | Optional metrics service annotations                                                                                                                                      | `NULL`                                                                                                                                           |
| `metrics.service.port`                                                                                                                                                              | Port on where metrics should be exposed                                                                                                                                   | `2020`                                                                                                                                           |
| `metrics.service.type`                                                                                                                                                              | Service type for metrics                                                                                                                                                  | `ClusterIP`                                                                                                                                      |
| `trackOffsets`                                                                                                                                                                      | Specify whether to track the file offsets for tailing docker logs. This allows fluent-bit to pick up where it left after pod restarts but requires access to a `hostPath` | `false`                                                                                                                                          |
|                                                                                                                                                                                     |                                                                                                                                                                           |                                                                                                                                                  |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/fluent-bit
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Upgrading

### From < 1.0.0 To 1.0.0

Values `extraInputs`, `extraFilters` and `extraOutputs` have been removed in version `1.0.0` of the fluent-bit chart.
To add additional entries to the existing sections, please use the `extraEntries.input`, `extraEntries.filter` and `extraEntries.output` values.
For entire sections, please use the `rawConfig` value, inserting blocks of text as desired.
