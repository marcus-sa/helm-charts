# `@helm-charts/banzaicloud-stable-kafka`

Kafka cluster for kubernetes with native etcd support

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | kafka              |
| Chart Version       | 0.3.2              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
statefullset:
  annotations:
    prometheus.io/scrape: 'true'
    prometheus.io/probe: kafka
    prometheus.io/port: '9020'
  labels: {}

jmx:
  enabled: false
  port: 5555

port: 9092

image:
  repository: banzaicloud/kafka
  tag: 2.12-2.0.0-etcd-0.0.3
  pullPolicy: IfNotPresent
```

</details>
