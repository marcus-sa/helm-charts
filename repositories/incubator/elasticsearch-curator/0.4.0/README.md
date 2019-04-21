# `@helm-charts/incubator-elasticsearch-curator`

A Helm chart for Elasticsearch Curator

| Field               | Value                 |
| ------------------- | --------------------- |
| Repository Name     | incubator             |
| Chart Name          | elasticsearch-curator |
| Chart Version       | 0.4.0                 |
| NPM Package Version | 0.1.0                 |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for elasticsearch-curator.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

cronjob:
  # At 01:00 every day
  schedule: '0 1 * * *'
  annotations: {}
  concurrencyPolicy: ''
  failedJobsHistoryLimit: ''
  successfulJobsHistoryLimit: ''

pod:
  annotations: {}

image:
  repository: quay.io/pires/docker-elasticsearch-curator
  tag: 5.5.4
  pullPolicy: IfNotPresent

config:
  elasticsearch:
    hosts:
      - CHANGEME.host
    port: 9200

configMaps:
  # Delete indices older than 7 days
  action_file_yml: |-
    ---
    actions:
      1:
        action: delete_indices
        description: "Clean up ES by deleting old indices"
        options:
          timeout_override:
          continue_if_exception: False
          disable_action: False
          ignore_empty_list: True
        filters:
        - filtertype: age
          source: name
          direction: older
          timestring: '%Y.%m.%d'
          unit: days
          unit_count: 7
          field:
          stats_result:
          epoch:
          exclude: False
  # Having config_yaml WILL override the other config
  # config_yml: |-
  #   ---
  #   client:
  #     hosts:
  #       - elasticsearch-logging-cluster
  #     port: 9200
  #     url_prefix:
  #     use_ssl: True
  #     certificate:
  #     client_cert:
  #     client_key:
  #     ssl_no_validate: True
  #     http_auth:
  #     timeout: 30
  #     master_only: False
  #   logging:
  #     loglevel: INFO
  #     logfile:
  #     logformat: default
  #     blacklist: ['elasticsearch', 'urllib3']

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
# extraVolumes and extraVolumeMounts allows you to mount other volumes
# Example Use Case: mount ssl certificates when elasticsearch has tls enabled
# extraVolumes:
#   - name: es-certs
#     secret:
#       defaultMode: 420
#       secretName: es-certs
# extraVolumeMounts:
#   - name: es-certs
#     mountPath: /certs
#     readOnly: true
```

</details>

---

# Elasticsearch Curator Helm Chart

This directory contains a Kubernetes chart to deploy the [Elasticsearch Curator](https://github.com/elastic/curator).

## Prerequisites Details

- Elasticsearch

- The `elasticsearch-curator` cron job requires [K8s CronJob](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/) support:
  > You need a working Kubernetes cluster at version >= 1.8 (for CronJob). For previous versions of cluster (< 1.8) you need to explicitly enable `batch/v2alpha1` API by passing `--runtime-config=batch/v2alpha1=true` to the API server ([see Turn on or off an API version for your cluster for more](https://kubernetes.io/docs/admin/cluster-management/#turn-on-or-off-an-api-version-for-your-cluster)).

## Chart Details

This chart will do the following:

- Create a CronJob which runs the Curator

## Installing the Chart

To install the chart, use the following:

```console
$ helm install incubator/elasticsearch-curator
```

## Configuration

The following table lists the configurable parameters of the docker-registry chart and
their default values.

| Parameter                            | Description                                           | Default                                      |
| :----------------------------------- | :---------------------------------------------------- | :------------------------------------------- |
| `image.pullPolicy`                   | Container pull policy                                 | `IfNotPresent`                               |
| `image.repository`                   | Container image to use                                | `quay.io/pires/docker-elasticsearch-curator` |
| `image.tag`                          | Container image tag to deploy                         | `5.5.4`                                      |
| `cronjob.schedule`                   | Schedule for the CronJob                              | `0 1 * * *`                                  |
| `cronjob.annotations`                | Annotations to add to the cronjob                     | {}                                           |
| `cronjob.concurrencyPolicy`          | `Allow|Forbid|Replace` concurrent jobs                | `nil`                                        |
| `cronjob.failedJobsHistoryLimit`     | Specify the number of failed Jobs to keep             | `nil`                                        |
| `cronjob.successfulJobsHistoryLimit` | Specify the number of completed Jobs to keep          | `nil`                                        |
| `pod.annotations`                    | Annotations to add to the pod                         | {}                                           |
| `config.elasticsearch.hosts`         | Array of Elasticsearch hosts to curate                | - CHANGEME.host                              |
| `config.elasticsearch.port`          | Elasticsearch port to connect too                     | 9200                                         |
| `configMaps.action_file_yml`         | Contents of the Curator action_file.yml               | See values.yaml                              |
| `configMaps.config_yml`              | Contents of the Curator config.yml (overrides config) | See values.yaml                              |
| `resources`                          | Resource requests and limits                          | {}                                           |
| `priorityClassName`                  | priorityClassName                                     | `nil`                                        |
| `extraVolumeMounts`                  | Mount extra volume(s),                                |                                              |
| `extraVolumes`                       | Extra volumes                                         |                                              |

Specify each parameter using the `--set key=value[,key=value]` argument to
`helm install`.
