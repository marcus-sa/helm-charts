# `@helm-charts/banzaicloud-stable-vault-operator`

A Helm chart for banzaicloud/bank-vaults operator

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | vault-operator     |
| Chart Version       | 0.2.8              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for vault-operator.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: banzaicloud/vault-operator
  tag: 0.4.14
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  externalPort: 80
  internalPort: 8080

nameOverride: ''
fullnameOverride: ''

crdAnnotations: {}

# The namespace where the operator watches for vault CRD objects, if not defined
# all namespaces are watched
watchNamespace: ''
syncPeriod: '1m'

resources:
  limits:
    cpu: 100m
    memory: 256Mi
  requests:
    cpu: 100m
    memory: 128Mi

affinity: {}

terminationGracePeriodSeconds: 10

probePath: /
livenessProbe:
  initialDelaySeconds: 60
  periodSeconds: 10
  successThreshold: 1
  timeoutSeconds: 1
readinessProbe:
  periodSeconds: 10
  successThreshold: 1
  timeoutSeconds: 1

etcd-operator:
  enabled: false
  etcdOperator:
    image:
      tag: v0.9.1
  backupOperator:
    image:
      tag: v0.9.1
  restoreOperator:
    image:
      tag: v0.9.1
```

</details>

---

# Vault Operator Helm Chart

This directory contains a Kubernetes Helm chart to deploy the Banzai Cloud Vault Operator.

## Prerequisites Details

- Kubernetes 1.6+

## Chart Details

This chart will do the following:

- Install the Vault operator

Please note that a backend service for Vault (for example, Consul) must
be deployed beforehand and configured with the `vault.config` option. YAML
provided under this option will be converted to JSON for the final vault
`config.json` file.

> See https://github.com/banzaicloud/bank-vaults/tree/master/operator for more information on the Operator
> See https://www.vaultproject.io/docs/configuration/ for more information on storage options for Vault.

## Installing the Chart

To install the chart, use the following, this backs Vault with a Consul cluster:

```bash
helm init -c
helm repo add banzaicloud-stable http://kubernetes-charts.banzaicloud.com/branch/master
helm install vault-operator
```

To install the chart backed with a cluster-wide Etcd Operator, use the following:

```bash
helm upgrade --install vault-operator . \
--set=etcd-operator.enabled=true \
--set=etcd-operator.etcdOperator.commandArgs.cluster-wide=true
```

## Configuration

The following tables lists the configurable parameters of the vault chart and their default values.

| Parameter                 | Description                   | Default                      |
| ------------------------- | ----------------------------- | ---------------------------- |
| `image.pullPolicy`        | Container pull policy         | `IfNotPresent`               |
| `image.repository`        | Container image to use        | `banzaicloud/vault-operator` |
| `image.tag`               | Container image tag to deploy | `0.4.2`                      |
| `replicaCount`            | k8s replicas                  | `1`                          |
| `resources.limits.cpu`    | Container requested CPU       | `nil`                        |
| `resources.limits.memory` | Container requested memory    | `nil`                        |
| `crdAnnotations`          | Annotations for the Vault CRD | `{}`                         |
| `etcd-operator.enabled`   | Install etcd operator as well | `false`                      |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

## Using Vault Operator

To deploy different Vault configurations (single node, HA, with AWS unsealing, with etcd backend, ...) see: https://github.com/banzaicloud/bank-vaults/tree/master/operator/deploy for more examples.

```bash
kubectl apply -f https://raw.githubusercontent.com/banzaicloud/bank-vaults/master/operator/deploy/cr-etcd-ha.yaml
```

Once the Vault pods are ready (in HA setup always one is ready), it can be accessed using a `kubectl port-forward`:

```bash
$ kubectl port-forward vault-pod 8200
$ export VAULT_ADDR=https://127.0.0.1:8200
$ export VAULT_SKIP_VERIFY=true
$ vault status
```

## Credits

Thanks to Cosmin Cojocar for the original Vault Operator Helm chart!
