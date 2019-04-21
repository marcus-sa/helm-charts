# `@helm-charts/incubator-vault`

A Helm chart for Vault, a tool for managing secrets

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | vault     |
| Chart Version       | 0.1.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for vault.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
image:
  repository: vault
  tag: 0.8.2
  pullPolicy: IfNotPresent
service:
  name: vault
  type: ClusterIP
  port: 8200
ingress:
  enabled: false
  # Used to create Ingress record (should used with service.type: ClusterIP).
  #hosts:
  #  - chart-example.local
  #annotations:
  # kubernetes.io/ingress.class: nginx
  # kubernetes.io/tls-acme: "true"
  #tls:
  # Secrets must be manually created in the namespace.
  # - secretName: chart-example-tls
  #   hosts:
  #     - chart-example.local
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
vault:
  # Only used to enable dev mode. When in dev mode, the rest of this config
  # section below is not used to configure Vault. See
  # https://www.vaultproject.io/intro/getting-started/dev-server.html for more
  # information.
  dev: true
  config:
    # A YAML representation of a final vault config.json file.
    # See https://www.vaultproject.io/docs/configuration/ for more information.
    listener:
      tcp:
        address: '[::]:8200'
        tls_disable: 1
    # See https://www.vaultproject.io/docs/configuration/storage/ for storage backends
    storage:
      #consul:
      #  address: ""
      #  path: ""
      #
      #etcd:
      #  address: ""
      #  path: "vault/"
      #
      #s3:
      #  bucket: ""
      #  region: ""
      #  access_key: ""
      #  secret_key: ""
      #  endpoint: "" # When not using AWS S3
```

</details>

---

# Vault Helm Chart

This directory contains a Kubernetes chart to deploy a Vault server.

## Prerequisites Details

- Kubernetes 1.6+

## Chart Details

This chart will do the following:

- Implement a Vault deployment

Please note that a backend service for Vault (for example, Consul) must
be deployed beforehand and configured with the `vault.config` option. YAML
provided under this option will be converted to JSON for the final vault
`config.json` file.

> See https://www.vaultproject.io/docs/configuration/ for more information.

## Installing the Chart

To install the chart, use the following, this backs vault with a Consul cluster:

```console
$ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
$ helm install incubator/vault --set vault.dev=false --set vault.config.storage.consul.address="myconsul-svc-name:8500",vault.config.storage.consul.path="vault"
```

An alternative example using the Amazon S3 backend can be specified using:

```
vault:
  config:
    storage:
      s3:
        access_key: "AWS-ACCESS-KEY"
        secret_key: "AWS-SECRET-KEY"
        bucket: "AWS-BUCKET"
        region: "eu-central-1"
```

## Configuration

The following tables lists the configurable parameters of the vault chart and their default values.

| Parameter                 | Description                   | Default                           |
| ------------------------- | ----------------------------- | --------------------------------- |
| `image.pullPolicy`        | Container pull policy         | `IfNotPresent`                    |
| `image.repository`        | Container image to use        | `vault`                           |
| `image.tag`               | Container image tag to deploy | `0.8.2`                           |
| `vault.dev`               | Use Vault in dev mode         | true (set to false in production) |
| `vault.config`            | Vault configuration           | No default backend                |
| `replicaCount`            | k8s replicas                  | `1`                               |
| `resources.limits.cpu`    | Container requested CPU       | `nil`                             |
| `resources.limits.memory` | Container requested memory    | `nil`                             |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

## Using Vault

Once the Vault pod is ready, it can be accessed using a `kubectl port-forward`:

```console
$ kubectl port-forward vault-pod 8200
$ export VAULT_ADDR=http://127.0.0.1:8200
$ vault status
```
