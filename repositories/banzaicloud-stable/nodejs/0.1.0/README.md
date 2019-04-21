# `@helm-charts/banzaicloud-stable-nodejs`

Universal helm chart for Node.js applications

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | nodejs             |
| Chart Version       | 0.1.0              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for node.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 3

image:
  repository: banzaicloud/nodejs-example
  tag: latest
  pullPolicy: IfNotPresent

podAnnotations:
  {}
  # prometheus.io/scrape: "true"
  # prometheus.io/path: "/metrics"
  # prometheus.io/port: "9999"

extraVolumes: []
extraVolumeMounts: []

env:
  []
  # - name: MONGODB_USERNAME
  #   value: user
  # - name: MONGODB_URI
  #   value: "mongodb://localhost/your-database"

envFrom:
  []
  # - secretRef:
  #     name: secret-name

secret: {}
#    MONGODB_PASSWORD: YourBase64EncodedPassword=

readinessProbe:
  httpGet:
    path: /health
    port: 3001
  initialDelaySeconds: 2
  periodSeconds: 2
  failureThreshold: 2
  successThreshold: 1 # default
  timeoutSeconds: 1 # default

livenessProbe:
  httpGet:
    path: /health
    port: 3001
  initialDelaySeconds: 5
  periodSeconds: 10
  failureThreshold: 3 # default
  successThreshold: 1 # default
  timeoutSeconds: 1 # default

extraPorts:
  # Prometheus metrics
  - name: prometheus
    containerPort: 9999
    protocol: TCP

service:
  type: ClusterIP
  internalPort: 3001
  externalPort: 80

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: traefik
    # ingress.kubernetes.io/ssl-redirect: "false"
    # traefik.frontend.rule.type: PathPrefixStrip
  hosts:
    # - "/"
    # - "domain.com/xyz"
    # - "domain.com"
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

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

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# Node.js

### Generic Node.js Application chart

[Node.js](https://nodejs.org/en/) application

## How to add repo chart repo

Please read this [README.md][https://github.com/banzaicloud/banzai-charts]

## tl;dr:

```bash
$ helm install banzaicloud-stable/nodejs
```

## Introduction for example

This chart bootstraps [Node.js application](https://github.com/banzaicloud/banzai-charts/stable/ingressauthgenerator) deployment to a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release banzaicloud-stable/nodejs
```

The command deploys Node.js to a Kubernetes cluster with the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

Soon.

```bash
$ helm install --name my-release -f values.yaml banzaicloud-stable/nodejs
```

> **Tip**: You can use the default [values.yaml](values.yaml)

```

```
