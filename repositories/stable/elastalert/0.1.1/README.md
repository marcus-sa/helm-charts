# `@helm-charts/stable-elastalert`

ElastAlert is a simple framework for alerting on anomalies, spikes, or other patterns of interest from data in Elasticsearch.

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | elastalert |
| Chart Version       | 0.1.1      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# number of replicas to run
replicaCount: 1
# number of helm release revisions to retain
revisionHistoryLimit: 5

image:
  # docker image
  repository: quay.io/pickledrick/elastalert
  # docker image tag
  tag: stable
  pullPolicy: IfNotPresent
resources: {}

elasticsearch:
  # elasticsearch endpoint e.g. (svc.namespace||svc)
  host: elasticsearch
  # elasticsearch port
  port: 80

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
```

</details>

---

# Elastalert Helm Chart

[elastalert](https://github.com/Yelp/elastalert) a simple framework for alerting on anomalies, spikes, or other patterns of interest from data in Elasticsearch.

## TL;DR;

```console
$ helm install stable/elastalert
```

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

| Parameter            | Description                                 | Default                         |
| -------------------- | ------------------------------------------- | ------------------------------- |
| `image.repository`   | docker image                                | quay.io/pickledrick/elastalert  |
| `image.tag`          | docker image tag                            | latest                          |
| `image.pullPolicy`   | image pull policy                           | IfNotPresent                    |
| `replicaCount`       | number of replicas to run                   | 1                               |
| `elasticsearch.host` | elasticsearch endpoint to use               | elasticsearch                   |
| `elasticsearch.port` | elasticsearch port to use                   | 80                              |
| `resources`          | Container resource requests and limits      | {}                              |
| `rules`              | Rule and alert configuration for Elastalert | {} example shown in values.yaml |
