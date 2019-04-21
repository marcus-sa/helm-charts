# `@helm-charts/stable-ignite`

Apache Ignite is an open-source distributed database, caching and processing platform designed to store and compute on large volumes of data across a cluster of nodes.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | ignite |
| Chart Version       | 1.0.0  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for ignite.
replicaCount: 2

image:
  repository: apacheignite/ignite
  tag: 2.7.0
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

rbac:
  create: true

serviceAccount:
  create: true
  name:

env:
  OPTION_LIBS: 'ignite-kubernetes,ignite-rest-http'
  IGNITE_QUIET: 'false'
  JVM_OPTS: '-Djava.net.preferIPv4Stack=true'
peerClassLoadingEnabled: false

persistence:
  enabled: false
  persistenceVolume:
    size: 8Gi
    provisioner: kubernetes.io/aws-ebs
    provisionerParameters:
      type: gp2
      fsType: ext4
  walVolume:
    size: 8Gi
    provisioner: kubernetes.io/aws-ebs
    provisionerParameters:
      type: gp2
      fsType: ext4

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

# apache-ignite

This is a helm chart for [Apache Ignite](https://ignite.apache.org/)

Apache Ignite is an open-source distributed database, caching and processing
platform designed to store and compute on large volumes of data across a
cluster of nodes.

## Install

```console
$ helm install --name my-release stable/ignite
```

## Configuring persistence

Data persistence and WAL persistence can be enabled by specifying appropriate
variables. Please note that default persistence configuration is for AWS EBS.

```console
helm install --name my-release \
    --set persistence.enabled=true \
    --set persistence.size=100Gi \
    --set wal_persistence.enabled=true \
    --set wal_persistence.size=8Gi \
    stable/ignite
```

To configure persistence for other volume plugins you should edit
`persistence.provisioner` and `persistence.provisioner_parameters` variables.
(and the same variables for `wal_persistence` section).
