# `@helm-charts/incubator-vault`

A Helm chart for Vault, a tool for managing secrets

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | vault     |
| Chart Version       | 0.17.1    |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for vault.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 3
## The name of the secret to use if pulling images from a private registry.
# imagePullSecret:
image:
  repository: vault
  tag:
  pullPolicy: IfNotPresent

vaultExporter:
  enabled: false
  repository: grapeshot/vault_exporter
  tag: v0.1.2
  pullPolicy: IfNotPresent
  vaultAddress: 127.0.0.1:8200
  # tlsCAFile: /vault/tls/ca.crt
consulAgent:
  repository: consul
  tag: 1.4.0
  pullPolicy: IfNotPresent
  # If you set join to a consul server endpoint, a consul agent will
  # be started in the vault pod.  If unset, no agent container is
  # deployed.
  # join: consul.service.consul
  #
  # If your consul server uses encrypted gossip, specify the secret
  # name here.  Format should match the stable/consul chart.
  # gossipKeySecretName: gossip-key
  #
  # Optionally override the agent's http port
  HttpPort: 8500
service:
  name: vault
  type: ClusterIP
  # type: LoadBalancer
  # Assign a static LB IP
  # loadBalancerIP: 203.0.113.32
  loadBalancerSourceRanges: []
  #  - 10.0.0.0/8
  #  - 130.211.204.2/32
  externalPort: 8200
  port: 8200
  # clusterExternalPort: 8201
  clusterPort: 8201
  # clusterIP: None
  annotations: {}
  #   cloud.google.com/load-balancer-type: "Internal"
  #
  # An example using type:loadbalancer and AWS internal ELB on kops
  # type: LoadBalancer
  # annotations:
  #   dns.alpha.kubernetes.io/internal: vault.internal.domain.name
  #   service.beta.kubernetes.io/aws-load-balancer-internal: 0.0.0.0/0
ingress:
  enabled: false
  labels: {}
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
resources:
  {}
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

## Node selector
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
nodeSelector: {}

## Affinity
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
affinity: |
  podAntiAffinity:
    preferredDuringSchedulingIgnoredDuringExecution:
    - weight: 100
      podAffinityTerm:
        topologyKey: kubernetes.io/hostname
        labelSelector:
          matchLabels:
            app: {{ template "vault.name" . }}
            release: {{ .Release.Name }}

## Tolerations
## ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
tolerations: []

## Deployment annotations
annotations: {}

## Extra Deployment labels
labels: {}

podAnnotations: {}
##    Read more about kube2iam to provide access to s3 https://github.com/jtblin/kube2iam
#     iam.amazonaws.com/role: role-arn

## Sample for unsealing vault on startup
## if automation saves your unseal keys to a k8s secret on deploy
## writing a script to do this would be trivial and solves the
## issues of scaling up if deployed in HA.
# lifecycle: |
#   postStart:
#     exec:
#       command: ["./unseal -s my-unseal-keys"]

vault:
  # Only used to enable dev mode. When in dev mode, the rest of this config
  # section below is not used to configure Vault. See
  # https://www.vaultproject.io/intro/getting-started/dev-server.html for more
  # information.
  dev: true
  # Allows the mounting of various custom secrets th enable production vault
  # configurations. The comments show an example usage for mounting a TLS
  # secret. The two fields required are a secretName indicating the name of
  # the Kubernetes secret (created outside of this chart), and the mountPath
  # at which it should be mounted in the Vault container.
  customSecrets:
    []
    # - secretName: vault-tls
    #   mountPath: /vault/tls
  #
  # Configure additional environment variables for the Vault containers
  extraEnv: {}
  #   - name: VAULT_API_ADDR
  #     value: "https://vault.internal.domain.name:8200"
  extraContainers: {}
  ## Additional containers to be added to the Vault pod
  # - name: vault-sidecar
  #   image: vault-sidecar:latest
  #   volumeMounts:
  #   - name: some-mount
  #     mountPath: /some/path
  extraVolumes: {}
  extraInitContainers: {}
  ## Init containers to be added
  # - name: do-something
  #   image: busybox
  #   command: ['do', 'something']
  # Log level
  # https://www.vaultproject.io/docs/commands/server.html#log-level
  logLevel: 'info'
  ## Additional volumes to the vault pod.
  # - name: extra-volume
  #   secret:
  #     secretName: some-secret
  liveness:
    aliveIfUninitialized: true
    aliveIfSealed: true
    initialDelaySeconds: 30
    periodSeconds: 10
  readiness:
    readyIfSealed: false
    readyIfStandby: true
    readyIfUninitialized: true
    initialDelaySeconds: 10
    periodSeconds: 10
  ## Use an existing config in a named ConfigMap
  # existingConfigName: vault-cm
  config:
    # A YAML representation of a final vault config.json file.
    # See https://www.vaultproject.io/docs/configuration/ for more information.
    listener:
      tcp:
        address: '[::]:8200'
        cluster_address: '[::]:8201'
        tls_disable: true
        tls_prefer_server_cipher_suites: true
        tls_cipher_suites: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA,TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA,TLS_RSA_WITH_AES_128_GCM_SHA256,TLS_RSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_128_CBC_SHA,TLS_RSA_WITH_AES_256_CBC_SHA
        # tls_cert_file: /vault/tls/server.crt
        # tls_key_file: /vault/tls/server.key
    # See https://www.vaultproject.io/docs/configuration/storage/ for storage backends
    storage:
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
      #   # Use a custom secret to mount this file.
      #   credentials_file: ""
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
- Optionally, deploy a consul agent in the pod

Please note that a backend service for Vault (for example, Consul) must
be deployed beforehand and configured with the `vault.config` option. YAML
provided under this option will be converted to JSON for the final Vault
`config.json` file.

> See https://www.vaultproject.io/docs/configuration/ for more information.

## Installing the Chart

To install the chart, use the following, this backs Vault with a Consul cluster:

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

The following table lists the configurable parameters of the Vault chart and their default values.

| Parameter                          | Description                                                      | Default                             |
| ---------------------------------- | ---------------------------------------------------------------- | ----------------------------------- |
| `imagePullSecret`                  | The name of the secret to use if pulling from a private registry | `nil`                               |
| `image.pullPolicy`                 | Container pull policy                                            | `IfNotPresent`                      |
| `image.repository`                 | Container image to use                                           | `vault`                             |
| `image.tag`                        | Container image tag to deploy                                    | `.Chart.appVersion`                 |
| `vault.dev`                        | Use Vault in dev mode                                            | true (set to false in production)   |
| `vault.extraEnv`                   | Extra env vars for Vault pods                                    | `{}`                                |
| `vault.extraContainers`            | Sidecar containers to add to the vault pod                       | `{}`                                |
| `vault.extraInitContainers`        | Init containers to be added to the vault pod                     | `{}`                                |
| `vault.extraVolumes`               | Additional volumes to the controller pod                         | `{}`                                |
| `vault.customSecrets`              | Custom secrets available to Vault                                | `[]`                                |
| `vault.existingConfigName`         | Location of existing Vault configuration                         | nil                                 |
| `vault.config`                     | Vault configuration                                              | No default backend                  |
| `replicaCount`                     | k8s replicas                                                     | `3`                                 |
| `resources.limits.cpu`             | Container requested CPU                                          | `nil`                               |
| `resources.limits.memory`          | Container requested memory                                       | `nil`                               |
| `affinity`                         | Affinity settings                                                | See values.yaml                     |
| `service.loadBalancerIP`           | Assign a static IP to the loadbalancer                           | `nil`                               |
| `service.loadBalancerSourceRanges` | IP whitelist for service type loadbalancer                       | `[]`                                |
| `service.annotations`              | Annotations for service                                          | `{}`                                |
| `service.externalPort`             | External port for the service                                    | `8200`                              |
| `service.port`                     | The API port Vault is using                                      | `8200`                              |
| `service.clusterExternalPort`      | External cluster port for the service                            | `nil`                               |
| `service.clusterPort`              | The cluster port Vault is using                                  | `8201`                              |
| `annotations`                      | Annotations for deployment                                       | `{}`                                |
| `labels`                           | Extra labels for deployment                                      | `{}`                                |
| `ingress.labels`                   | Labels for ingress                                               | `{}`                                |
| `podAnnotations`                   | Annotations for pods                                             | `{}`                                |
| `consulAgent.join`                 | If set, start start a consul agent                               | `nil`                               |
| `consulAgent.repository`           | Container image for consul agent                                 | `consul`                            |
| `consulAgent.tag`                  | Container image tag for consul agent                             | `1.4.0`                             |
| `consulAgent.pullPolicy`           | Container pull policy for consul agent                           | `IfNotPresent`                      |
| `consulAgent.gossipKeySecretName`  | k8s secret containing gossip key                                 | `nil` (see values.yaml for details) |
| `consulAgent.HttpPort`             | HTTP port for consul agent API                                   | `8500`                              |
| `vaultExporter.enabled`            | Enable or disable vault exporter                                 | `false`                             |
| `vaultExporter.repository`         | Container image for vault exporter                               | `grapeshot/vault_exporter`          |
| `vaultExporter.tag`                | Container image tag for vault exporter                           | `v0.1.2`                            |
| `vaultExporter.pullPolicy`         | Image pull policy that sould be used                             | `IfNotPresent`                      |
| `vaultExporter.vaultAddress`       | Vault address that exporter should use                           | `127.0.0.1:8200`                    |
| `vaultExporter.tlsCAFile`          | Vault TLS CA certificate mount path                              | `/vault/tls/ca.crt`                 |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

## Optional Consul Agent

If you are using the consul storage for vault, you might want a local
consul agent to handle health checks. By setting `consulAgent.join`
to your consul server, an agent will be started in the vault pod. In
this case, you should configure vault to connect to consul over
`localhost`. For example:

```yaml
vault:
  dev: False
  config:
    storage:
      consul:
        address: 'localhost:8500'
consulAgent:
  join: consul.service.consul
```

If you are using the `stable/consul` helm chart, consul communications
are encrypted with a gossip key. You can configure a secret with the
same format as that chart and specify it in the
`consulAgent.gossipKeySecretName` parameter.

## Optional Vault Exporter

If you want to monitor Vault with Prometheus you can simply enable the Vault exporter
which then runs as a sidecar container within the same pod as Vault itself. To use the
exporter just set `vaultExporter.enabled` to true and set the other variables according to
your needs.

If your Vault is set up with TLS make sure to specify the CA certificate path properly.
This is done through the parameter `vaultExporter.tlsCAFile`.

## Using Vault

Once the Vault pod is ready, it can be accessed using a `kubectl port-forward`:

```console
$ kubectl port-forward vault-pod 8200
$ export VAULT_ADDR=http://127.0.0.1:8200
$ vault status
```
