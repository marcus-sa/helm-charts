# `@helm-charts/stable-elastic-stack`

A Helm chart for ELK

| Field               | Value         |
| ------------------- | ------------- |
| Repository Name     | stable        |
| Chart Name          | elastic-stack |
| Chart Version       | 1.3.0         |
| NPM Package Version | 0.1.0         |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for elk.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
elasticsearch:
  enabled: true

kibana:
  env:
    ELASTICSEARCH_URL: http://http.default.svc.cluster.local:9200

logstash:
  enabled: true
  # elasticsearch:
  #   host: elastic-stack-elasticsearch-client

filebeat:
  enabled: false
  # config:
  #   output.file.enabled: false
  #   output.logstash:
  #     hosts: ["elastic-stack-logstash:5044"]
  # indexTemplateLoad:
  #   - elastic-stack-elasticsearch-client:9200

fluentd:
  enabled: false

fluent-bit:
  enabled: false

fluentd-elasticsearch:
  enabled: false

nginx-ldapauth-proxy:
  enabled: false
  # Example config to get it working with ELK. Adjust as you need to.
  # proxy:
  #   port: 5601
  #   # This is the internal hostname for the kibana service
  #   host: "elk-kibana.default.svc.cluster.local"
  #   authName: "ELK:Infrastructure:LDAP"
  #   ldapHost: "ldap.example.com"
  #   ldapDN: "dc=example,dc=com"
  #   ldapFilter: "objectClass=organizationalPerson"
  #   ldapBindDN: "cn=reader,dc=example,dc=com"
  #   requires:
  #     - name: "ELK-USER"
  #       filter: "cn=elkuser,ou=groups,dc=example,dc=com"
  # ingress:
  #   enabled: true
  #   hosts:
  #     - "elk.example.com"
  #   annotations:
  #     kubernetes.io/ingress.class: nginx
  #   tls:
  #     - hosts:
  #       - elk.example.com
  #       secretName: example-elk-tls
  # secrets:
  #   ldapBindPassword: PASSWORD
elasticsearch-curator:
  enabled: false

elasticsearch-exporter:
  enabled: false
```

</details>

---

# Elastic-stack Helm Chart

This chart installs an elasticsearch cluster with kibana and logstash by default.
You can optionally disable logstash and install Fluentd if you prefer. It also optionally installs filebeat, nginx-ldapauth-proxy and elasticsearch-curator.

## Prerequisites Details

- Kubernetes 1.8+
- PV dynamic provisioning support on the underlying infrastructure

## Chart Details

This chart will do the following:

- Implemented a dynamically scalable elasticsearch cluster using Kubernetes StatefulSets/Deployments
- Multi-role deployment: master, client (coordinating) and data nodes
- Statefulset Supports scaling down without degrading the cluster

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/elastic-stack
```

## Deleting the Charts

Delete the Helm deployment as normal

```
$ helm delete my-release
```

Deletion of the StatefulSet doesn't cascade to deleting associated PVCs. To delete them:

```
$ kubectl delete pvc -l release=my-release,component=data
```

## Configuration

Each requirement is configured with the options provided by that Chart.
Please consult the relevant charts for their configuration options.
