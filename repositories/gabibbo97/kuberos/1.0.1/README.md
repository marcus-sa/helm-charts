# `@helm-charts/gabibbo97-kuberos`

OIDC authentication helper for Kubernetes

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | gabibbo97 |
| Chart Name          | kuberos   |
| Chart Version       | 1.0.1     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for kuberos.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: negz/kuberos
  tag: 7bc1e72
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  paths: []
  hosts:
    - chart-example.local
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

# Config options
clusterName: k8s
clusterAPIEndpoint: https://k8s.example.com:6443
OIDCIssuerURL: https://auth.example.com
OIDCClientID: kuberos
OIDCClientSecret: secret
OIDCExtraScopes: []
OIDCIssuerX509Secret: ''
```

</details>

---

# kuberos

[kuberos](https://github.com/negz/kuberos) is an OIDC authentication helper for Kubernetes

## TL;DR

```bash
helm install gabibbo97/kuberos \
    --set ingress.enabled='true' \
    --set ingress.paths[0]='/' \
    --set ingress.hosts[0]='https://cluster.auth.example.com' \
    --set ingress.tls[0].secretName='kuberos-tls' \
    --set ingress.tls[0].hosts[0]='https://cluster.auth.example.com' \
    --set clusterName='my-k8s-cluster' \
    --set clusterAPIEndpoint='https://k8s.example.com:6443' \
    --set OIDCIssuerURL='https://auth.example.com' \
    --set OIDCClientID='kuberos' \
    --set OIDCClientSecret='secret'
```

## Introduction

This chart bootstraps an in-cluster dex identity provider

## Configuration options

| Parameter              | Description                                    |            Default             |
| ---------------------- | ---------------------------------------------- | :----------------------------: |
| `clusterName`          | The cluster name to set in kubeconfig          |             `k8s`              |
| `clusterAPIEndpoint`   | The cluster API endpoint                       | `https://k8s.example.com:6443` |
| `OIDCIssuerURL`        | The URL for the OIDC issuer                    |   `https://auth.example.com`   |
| `OIDCIssuerX509Secret` | A secret containing the issuer TLS certificate |              `""`              |
| `OIDCClientID`         | The OIDC client id                             |           `kuberos`            |
| `OIDCClientSecret`     | The OIDC client secret                         |            `secret`            |
| `OIDCExtraScopes`      | Extra scopes to add to authentication token    |              `[]`              |
