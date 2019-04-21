# `@helm-charts/banzaicloud-stable-spark-rss`

A Helm chart for Spark RSS in Kubernetes

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | spark-rss          |
| Chart Version       | 0.0.5              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for spark-rss
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: banzaicloud/spark-resource-staging-server
  tag: v2.2.1-k8s-1.0.35
  pullPolicy: IfNotPresent

service:
  name: spark-rss
  port: 10000
  internalPort: 10000
  type: ClusterIP

ingress:
  enabled: false
  annotations:
    {}
    #kubernetes.io/ingress.class: traefik
    #ingress.kubernetes.io/ssl-redirect: "false"
  #traefik.frontend.rule.type: PathPrefix
  hosts:
    - '/'
  # - "domain.com/xyz"
  # - "domain.com"
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

## Spark RSS resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
resources:
  requests:
    cpu: 500m
    memory: 512Mi

  limits:
    cpu: 500m
    memory: 512Mi

tls:
  enabled: false
  name: spark-rss-tls-secret

serviceAccount:
  ## Specifies whether a ServiceAccount should be created
  ##
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

rbac:
  ## Specifies whether RBAC resources should be created
  ##
  create: true

  role:
    rules: #[]
      - apiGroups:
          - 'extensions'
        resources:
          - 'podsecuritypolicies'
        resourceNames:
          - 'spark-shuffle-service-pod-security-policy'
        verbs:
          - 'use'
      - apiGroups:
          - '' # "" indicates the core API group
        resources:
          - 'pods'
        verbs:
          - 'get'
          - 'list'
          - 'watch'

podSecurityPolicy:
  create: true
```

</details>

---

# Spark Resource Staging Server Chart

[Spark-RSS](https://apache-spark-on-k8s.github.io/userdocs/running-on-kubernetes.html) The Resource Staging Server (RSS) watches Spark driver pods to detect completed Spark applications so it knows when to safely delete resource bundles of the applications.

## Chart Details

## Installing the Chart

To install the chart:

```
$ helm install .
```

## Configuration

The following tables lists the configurable parameters of the Zeppelin chart and their default values.

| Parameter | Description | Default |
| --------- | ----------- | ------- |

