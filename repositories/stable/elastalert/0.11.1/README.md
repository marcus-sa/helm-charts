# `@helm-charts/stable-elastalert`

ElastAlert is a simple framework for alerting on anomalies, spikes, or other patterns of interest from data in Elasticsearch.

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | elastalert |
| Chart Version       | 0.11.1     |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# number of replicas to run
replicaCount: 1

# number of helm release revisions to retain
revisionHistoryLimit: 5

# Default internal between alert checks against the elasticsearch datasource, in minutes
runIntervalMins: 1

# Default rule buffer duration, in minutes
bufferTimeMins: 15

# Amount of time to retry and deliver failed alerts (1440 minutes per day)
alertRetryLimitMins: 2880

# Default time before realerting, in minutes
realertIntervalMins: ''

# For ES 5: The name of the index which stores elastalert's statuses
# For ES 6: The prefix of the names of indices which store elastalert's statuses.
#
# See https://github.com/Yelp/elastalert/commit/c250100b7be07c68a53789569a86f87193ec37f4 for more details about this differentiation.
#
# CAUTION: It is recommended to set this to `elastalert` for ES6+. Otherwise elastalert produces confusing index names due to https://github.com/Yelp/elastalert/issues/1479#issuecomment-356380179
writebackIndex: elastalert_status

image:
  # docker image
  repository: jertel/elastalert-docker
  # docker image tag
  tag: 0.1.38
  pullPolicy: IfNotPresent
resources: {}

elasticsearch:
  # elasticsearch endpoint e.g. (svc.namespace||svc)
  host: ''
  # elasticsearch port
  port: 80
  # whether or not to connect to es_host using TLS
  useSsl: 'False'
  # Username if authenticating to ES with basic auth
  username: ''
  # Password if authenticating to ES with basic auth
  password: ''
  # whether or not to verify TLS certificates
  verifyCerts: 'True'
  # Enable certificate based authentication
  # path to a PEM certificate to use as the client certificate
  # clientCert: "/certs/client.pem"
  # path to a private key file to use as the client key
  # clientKey: "/certs/client-key.pem"
  # path to a CA cert bundle to use to verify SSL connections
  # caCerts: "/certs/ca.pem"
  # # certs volumes, required to mount ssl certificates when elasticsearch has tls enabled
  # certsVolumes:
  #   - name: es-certs
  #     secret:
  #       defaultMode: 420
  #       secretName: es-certs
  # # mount certs volumes, required to mount ssl certificates when elasticsearch has tls enabled
  # certsVolumeMounts:
  #   - name: es-certs
  #     mountPath: /certs
  #     readOnly: true

extraConfigOptions:
  {}
  # # Options to propagate to all rules, e.g. a common slack_webhook_url or kibana_url
  # # Please note at the time of implementing this value, it will not work for required_locals
  # # Which MUST be set at the rule level, these are: ['alert', 'type', 'name', 'index']
  # generate_kibana_link: true
  # kibana_url: https://kibana.yourdomain.com
  # slack_webhook_url: dummy

# Command and args override for container e.g. (https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/)
# command: ["YOUR_CUSTOM_COMMAND"]
# args: ["YOUR", "CUSTOM", "ARGS"]

# rule configurations e.g. (http://elastalert.readthedocs.io/en/latest/)
rules:
  {}
  # deadman_slack: |-
  #   ---
  #   name: Deadman Switch Slack
  #   type: frequency
  #   index: containers-*
  #   num_events: 3
  #   timeframe:
  #     minutes: 3
  #   filter:
  #   - term:
  #       message: "deadmanslack"
  #   alert:
  #   - "slack"
  #   slack:
  #   slack_webhook_url: dummy
  # deadman_pagerduty: |-
  #   ---
  #   name: Deadman Switch PagerDuty
  #   type: frequency
  #   index: containers-*
  #   num_events: 3
  #   timeframe:
  #     minutes: 3
  #   filter:
  #   - term:
  #       message: "deadmanpd"
  #   alert:
  #   - "pagerduty"
  #   pagerduty:
  #   pagerduty_service_key: dummy
  #   pagerduty_client_name: Elastalert Deadman Switch

# Support using node selectors and tolerations
# nodeSelector:
#   "node-role.kubernetes.io/infra_worker": "true"
nodeSelector: {}
# tolerations:
#   - key: "node_role"
#     operator: "Equal"
#     value: "infra_worker"
#     effect: "NoSchedule"
tolerations: []
```

</details>

---

# Elastalert Helm Chart

[elastalert](https://github.com/Yelp/elastalert) is a simple framework for alerting on anomalies, spikes, or other patterns of interest from data in Elasticsearch.

## TL;DR;

For ES 5.x:

```console
$ helm install stable/elastalert
```

For ES 6.x:

```console
$ helm install stable/elastalert --set writebackIndex=elastalert

# Open Dev Tools on Kibana and send the below.
# Otherwise elastalert ends up with errors like "RequestError: TransportError(400, u'search_phase_execution_exception', u'No mapping found for [alert_time] in order to sort on')"
PUT /elastalert/_mapping/elastalert
{
  "properties": {
      "alert_time": {"type": "date"}
  }
}
```

See the comment in the default `values.yaml` to know why `writebackIndex` is required for ES 6.x.

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/elastalert
```

The command deploys elastalert on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the my-release deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

| Parameter                         | Description                                                                                | Default                         |
| --------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------- |
| `image.repository`                | docker image                                                                               | jertel/elastalert-docker        |
| `image.tag`                       | docker image tag                                                                           | 0.1.38                          |
| `image.pullPolicy`                | image pull policy                                                                          | IfNotPresent                    |
| `command`                         | command override for container                                                             | `NULL`                          |
| `args`                            | args override for container                                                                | `NULL`                          |
| `replicaCount`                    | number of replicas to run                                                                  | 1                               |
| `elasticsearch.host`              | elasticsearch endpoint to use                                                              | elasticsearch                   |
| `elasticsearch.port`              | elasticsearch port to use                                                                  | 80                              |
| `elasticsearch.useSsl`            | whether or not to connect to es_host using SSL                                             | False                           |
| `elasticsearch.username`          | Username for ES with basic auth                                                            | `NULL`                          |
| `elasticsearch.password`          | Password for ES with basic auth                                                            | `NULL`                          |
| `elasticsearch.verifyCerts`       | whether or not to verify TLS certificates                                                  | True                            |
| `elasticsearch.clientCert`        | path to a PEM certificate to use as the client certificate                                 | /certs/client.pem               |
| `elasticsearch.clientKey`         | path to a private key file to use as the client key                                        | /certs/client-key.pem           |
| `elasticsearch.caCerts`           | path to a CA cert bundle to use to verify SSL connections                                  | /certs/ca.pem                   |
| `elasticsearch.certsVolumes`      | certs volumes, required to mount ssl certificates when elasticsearch has tls enabled       | `NULL`                          |
| `elasticsearch.certsVolumeMounts` | mount certs volumes, required to mount ssl certificates when elasticsearch has tls enabled | `NULL`                          |
| `extraConfigOptions`              | Additional options to propagate to all rules, cannot be `alert`, `type`, `name` or `index` | `{}`                            |
| `resources`                       | Container resource requests and limits                                                     | {}                              |
| `rules`                           | Rule and alert configuration for Elastalert                                                | {} example shown in values.yaml |
| `runIntervalMins`                 | Default interval between alert checks, in minutes                                          | 1                               |
| `realertIntervalMins`             | Time between alarms for same rule, in minutes                                              | `NULL`                          |
| `alertRetryLimitMins`             | Time to retry failed alert deliveries, in minutes                                          | 2880 (2 days)                   |
| `bufferTimeMins`                  | Default rule buffer time, in minutes                                                       | 15                              |
| `writebackIndex`                  | Name or prefix of elastalert index(es)                                                     | elastalert_status               |
| `nodeSelector`                    | Node selector for deployment                                                               | {}                              |
| `tolerations`                     | Tolerations for deployment                                                                 | []                              |
