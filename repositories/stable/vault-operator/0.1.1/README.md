# `@helm-charts/stable-vault-operator`

CoreOS vault-operator Helm chart for Kubernetes

| Field               | Value          |
| ------------------- | -------------- |
| Repository Name     | stable         |
| Chart Name          | vault-operator |
| Chart Version       | 0.1.1          |
| NPM Package Version | 0.1.0          |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Default values for the image
name: vault-operator
replicaCount: 1
image:
  repository: quay.io/coreos/vault-operator
  tag: 0.1.9
  pullPolicy: IfNotPresent

## Install Default RBAC roles and bindings
rbac:
  create: true

## Service account names and whether to create them
serviceAccount:
  create: true
  name:

resources:
  {}
  # limits:
  #   cpu: 100m
  #   memory: 128Mi
  # requests:
  #   cpu: 100m
  #   memory: 128Mi

## additional command arguments go here; will be translated to `--key=value` form
## e.g., analytics: true
commandArgs: {}

## Configurable health checks against the /readyz endpoint that vault-operator exposes
readinessProbe:
  enabled: false
  initialDelaySeconds: 0
  periodSeconds: 10
  timeoutSeconds: 1
  successThreshold: 1
  failureThreshold: 3
livenessProbe:
  enabled: false
  initialDelaySeconds: 0
  periodSeconds: 10
  timeoutSeconds: 1
  successThreshold: 1
  failureThreshold: 3

nodeSelector: {}

tolerations: []

affinity: {}

###
# All of the config variables related to setting up the etcd-operator
# Disabled by default
# If you want more information about the variables exposed, please visit:
#   https://github.com/kubernetes/charts/tree/master/stable/etcd-operator#configuration
###
etcd-operator:
  enabled: false
  deployments:
    etcdOperator: true
    backupOperator: true
    restoreOperator: true
  serviceAccount:
    etcdOperatorServiceAccount:
      create: true
    backupOperatorServiceAccount:
      create: true
    restoreOperatorServiceAccount:
      create: true
  etcdOperator:
    image:
      tag: v0.9.2
  backupOperator:
    image:
      tag: v0.9.2
  restoreOperator:
    image:
      tag: v0.9.2
```

</details>

---

# CoreOS vault-operator

[vault-operator](https://coreos.com/blog/introducing-vault-operator-project) Simplify vault cluster
configuration and management.

**DISCLAIMER:** While this chart has been well-tested, the vault-operator is still currently in beta.
Current project status is available [here](https://github.com/coreos/vault-operator).

## Introduction

This chart bootstraps a vault-operator and allows the deployment of vault cluster(s). It depends on the `etcd-operator` being installed.

## Official Documentation

Official project documentation found [here](https://github.com/coreos/vault-operator)

## Pre-requisites

- Kubernetes 1.9+
- **Suggested:** RBAC setup for the Kubernetes cluster
- [`etcd-operator`](https://github.com/kubernetes/charts/tree/master/stable/etcd-operator)

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install stable/vault-operator --name my-release
```

If you do not want to deploy the `etcd-operator` manually, you can deploy it at the same time as when you deploy the `vault-operator`:

```bash
$ helm install stable/vault-operator --name my-release --set etcd-operator.enabled=true
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components EXCEPT the persistent volume.

## Configuration

The following table lists the configurable parameters of the vault-operator chart and their default values.

| Parameter               | Description                                                   | Default                         |
| ----------------------- | ------------------------------------------------------------- | ------------------------------- |
| `name`                  | name of the deployment                                        | `vault-operator`                |
| `replicaCount`          | Number of operator replicas to create (only 1 is supported)   | `1`                             |
| `image.repository`      | vault-operator container image                                | `quay.io/coreos/vault-operator` |
| `image.tag`             | vault-operator container image tag                            | `0.1.9`                         |
| `image.pullPolicy`      | vault-operator container image pull policy                    | `Always`                        |
| `rbac.create`           | install required RBAC service account, roles and rolebindings | `true`                          |
| `rbac.apiVersion`       | RBAC api version `v1alpha1|v1beta1`                           | `v1beta1`                       |
| `serviceAccount.create` | create a new service account for the vault-operator           | `true`                          |
| `serviceAccount.name`   | Name of the service account resource when RBAC is enabled     | `vault-operator-sa`             |
| `resources.cpu`         | CPU limit per vault-operator pod                              | `100m`                          |
| `resources.memory`      | Memory limit per vault-operator pod                           | `128mi`                         |
| `nodeSelector`          | Node labels for vault-operator pod assignment                 | `{}`                            |
| `commandArgs`           | Additional command arguments                                  | `{}`                            |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```bash
$ helm install --name my-release --set image.tag=v0.1.9 stable/vault-operator
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm install --name my-release --values values.yaml stable/vault-operator
```

## RBAC

By default the chart will install the recommended RBAC roles and rolebindings.

To determine if your cluster supports this running the following:

```bash
$ kubectl api-versions | grep rbac
```

You also need to have the following parameter on the api server. See the following document for how to enable [RBAC](https://kubernetes.io/docs/admin/authorization/rbac/)

```bash
--authorization-mode=RBAC
```

If the output contains "beta" or both "alpha" and "beta" you can may install rbac by default, if not, you may turn RBAC off as described below.

### RBAC Role/RoleBinding Creation

RBAC resources are enabled by default. To disable RBAC do the following:

```bash
$ helm install --name my-release stable/vault-operator --set rbac.create=false
```

### Changing RBAC Manifest apiVersion

By default the RBAC resources are generated with the "v1beta1" apiVersion. To use "v1alpha1" do the following:

```bash
$ helm install --name my-release stable/vault-operator --set rbac.install=true,rbac.apiVersion=v1alpha1
```

## Creating a Vault

### Deploy a CRD

```yaml
apiVersion: 'vault.security.coreos.com/v1alpha1'
kind: 'VaultService'
metadata:
  name: 'example'
spec:
  nodes: 2
  version: '0.9.1-0'
```

### Initialize Vault

```bash
kubectl -n <namespace> get vault example -o jsonpath='{.status.vaultStatus.sealed[0]}' | xargs -0 -I {} kubectl -n <namespace> port-forward {} 8200
vault init
```

### Unseal the Vault

Repeat as many times as nodes created. Run the `vault unseal` command three times.

```bash
kubectl -n <namespace> get vault example -o jsonpath='{.status.vaultStatus.sealed[0]}' | xargs -0 -I {} kubectl -n <namespace> port-forward {} 8200
vault unseal
```
