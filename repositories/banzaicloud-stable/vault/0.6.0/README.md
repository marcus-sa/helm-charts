# `@helm-charts/banzaicloud-stable-vault`

A Helm chart for Vault, a tool for managing secrets

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | vault              |
| Chart Version       | 0.6.0              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for vault.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
strategy:
  type: RollingUpdate
image:
  repository: vault
  tag: 1.1.0
  pullPolicy: IfNotPresent
service:
  name: vault
  type: ClusterIP
  port: 8200
  # annotations:
  #   cloud.google.com/load-balancer-type: "Internal"
ingress:
  enabled: false
  # Used to create Ingress record (should used with service.type: ClusterIP).
  # hosts:
  #  - chart-example.local
  # annotations:
  #   kubernetes.io/ingress.class: nginx
  #   kubernetes.io/tls-acme: "true"
  # tls:
  #   Secrets must be manually created in the namespace.
  #   - secretName: chart-example-tls
  #     hosts:
  #       - chart-example.local
persistence:
  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  enabled: false
  ## Vault data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ## set, choosing the default provisioner. (gp2 on AWS, standard on
  ## GKE, AWS & OpenStack)
  # storageClass: "-"
  # Used for hostPath persistence if left empty, "emptyDir" will be used
  hostPath: ""
  ## Set default PVC size
  size: 10G
  ## Set default PVC access mode: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes
  accessMode: ReadWriteOnce
podAnnotations:
  prometheus.io/scrape: "true"
  prometheus.io/path: "/metrics"
  prometheus.io/port: "9102"
resources: {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #   cpu: 100m
  #   memory: 128Mi
  # requests:
  #   cpu: 100m
  #   memory: 128Mi
vault:
  # Allows the mounting of various custom secrets to enable production vault
  # configurations. The comments show an example usage for mounting a TLS
  # secret. The two fields required are a secretName indicating the name of
  # the Kuberentes secret (created outside of this chart), and the mountPath
  # at which it should be mounted in the Vault container.
  customSecrets: []
    # - secretName: vault-tls
    #   mountPath: /vault/tls
  externalConfig:
    # Allows creating policies in Vault which can be used later on in roles
    # for the Kubernetes based authentication.
    # See https://www.vaultproject.io/docs/concepts/policies.html for more information.
    policies:
      - name: allow_secrets
        rules: path "secret/*" {
                capabilities = ["create", "read", "update", "delete", "list"]
              }
    auth:
      - type: kubernetes
        # Allows creating roles in Vault which can be used later on for the Kubernetes based
        # authentication.
        # See https://www.vaultproject.io/docs/auth/kubernetes.html#creating-a-role for
        # more information.
        roles:
          # Allow every pod in the default namespace to use the secret kv store
          - name: default
            bound_service_account_names: default
            bound_service_account_namespaces: default
            policies: allow_secrets
            ttl: 1h
    secrets:
      - path: secret
        type: kv
        description: General secrets.
        options:
          version: 2
  config:
    # A YAML representation of a final vault config.json file.
    # See https://www.vaultproject.io/docs/configuration/ for more information.
    listener:
      tcp:
        address: '[::]:8200'
        # tls_disable: true
        tls_cert_file: /vault/tls/server.crt
        tls_key_file: /vault/tls/server.key

    telemetry:
      statsd_address: localhost:9125

    ui: true

    # See https://www.vaultproject.io/docs/configuration/storage/ for storage backends
    storage: {}
      # file:
      #   path: "/vault/file"
      # consul:
      #   address: ""
      #   path: ""
      #
      # etcd:
      #   address: ""
      #   path: "vault/"
      #
      # s3:
      #   bucket: ""
      #   region: ""
      #   access_key: ""
      #   secret_key: ""
      #   endpoint: "" # When not using AWS S3
      #
      # gcs:
      #   bucket: ""
      #   credentials_file: ""
      #   ha_enabled: "true"
    # api_addr: http://localhost:8200

  # Until this issue is fixed: https://github.com/kubernetes/helm/issues/3117
  # we have to workaround the default storage problem.
  defaultStorage:
    storage:
      file:
        path: "/vault/file"

  logLevel: info

unsealer:
  image:
    repository: banzaicloud/bank-vaults
    tag: 0.4.13
    pullPolicy: IfNotPresent
  args: [
      "--mode",
      "k8s",
      "--k8s-secret-namespace",
      "default",
      "--k8s-secret-name",
      "bank-vaults"
  ]
  metrics:
    enabled: true
    debug: true
    name: metrics
    type: ClusterIP
    port: 9091
    serviceMonitor:
      enabled: false
      additionalLabels: {}
    annotations:
      prometheus.io/scrape: "true"
      prometheus.io/path: "/metrics"
      prometheus.io/port: "9091"

statsd:
  metrics:
    enabled: true
    port: 9102
    serviceMonitor:
      enabled: false
      additionalLabels: {}
  config:
    mappings:
    - match: vault.route.*.*
      name: "vault_route"
      labels:
        method: "$1"
        path: "$2"

```

</details>

---

# Vault Helm Chart

This directory contains a Kubernetes Helm chart to deploy a Vault server. For further details of how are we using Vault read this [post](https://banzaicloud.com/blog/oauth2-vault/).

## Prerequisites Details

- Kubernetes 1.6+

## Chart Details

This chart will do the following:

- Implement a Vault deployment

Please note that a backend service for Vault (for example, Consul) must
be deployed beforehand and configured with the `vault.config` option. YAML
provided under this option will be converted to JSON for the final vault
`config.json` file.

Please also note that scaling to more than 1 replicas can be made successfully only with a configured HA Storage backend. By default this chart uses `file` backend, which is not HA.

> See https://www.vaultproject.io/docs/configuration/ for more information.

## Installing the Chart

To install the chart, use the following, this backs Vault with a Consul cluster:

```bash
helm init -c;
helm repo add banzaicloud-stable http://kubernetes-charts.banzaicloud.com/branch/master
helm install vault
```

To install the chart backed with a Consul cluster, use the following:

```bash
helm install banzaicloud-stable/vault --set vault.config.storage.consul.address="myconsul-svc-name:8500",vault.config.storage.consul.path="vault"
```

An alternative `values.yaml` example using the Amazon S3 backend can be specified using:

```yaml
vault:
  config:
    storage:
      s3:
        access_key: 'AWS-ACCESS-KEY'
        secret_key: 'AWS-SECRET-KEY'
        bucket: 'AWS-BUCKET'
        region: 'eu-central-1'
```

An alternate example using Amazon custom secrets passed as environment variables to Vault:

```bash
# Create an aws secret with your AWS credentials
kubectl create secret generic aws --from-literal=AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID --from-literal=AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY

# Tell the chart to pass these as env vars to Vault and as a file mount if needed
helm install banzaicloud-stable/vault --set "vault.customSecrets[0].secretName=aws" --set "vault.customSecrets[0].mountPath=/vault/aws"
```

## Configuration

The following tables lists the configurable parameters of the vault chart and their default values.

| Parameter                 | Description                       | Default                                                                                      |
| ------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------- |
| `image.pullPolicy`        | Container pull policy             | `IfNotPresent`                                                                               |
| `image.repository`        | Container image to use            | `vault`                                                                                      |
| `image.tag`               | Container image tag to deploy     | `1.0.3`                                                                                      |
| `vault.customSecrets`     | Custom secrets available to Vault | `[]`                                                                                         |
| `vault.config`            | Vault configuration               | No default backend                                                                           |
| `vault.externalConfig`    | Vault API based configuration     | No default backend                                                                           |
| `replicaCount`            | k8s replicas                      | `1`                                                                                          |
| `resources.limits.cpu`    | Container requested CPU           | `nil`                                                                                        |
| `resources.limits.memory` | Container requested memory        | `nil`                                                                                        |
| `unsealer.args`           | Bank Vaults args                  | `["--mode", "k8s", "--k8s-secret-namespace", "default", "--k8s-secret-name", "bank-vaults"]` |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

## Using Vault

Once the Vault pod is ready, it can be accessed using a `kubectl port-forward`:

```bash
$ kubectl port-forward vault-pod 8200
$ export VAULT_ADDR=http://127.0.0.1:8200
$ vault status
```
