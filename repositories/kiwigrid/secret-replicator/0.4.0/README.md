# `@helm-charts/kiwigrid-secret-replicator`

A Helm chart to replicate secret across namespaces

| Field               | Value             |
| ------------------- | ----------------- |
| Repository Name     | kiwigrid          |
| Chart Name          | secret-replicator |
| Chart Version       | 0.4.0             |
| NPM Package Version | 0.1.0             |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for secret-replicator.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

image:
  repository: kiwigrid/secret-replicator
  tag: 0.1.0
  pullPolicy: IfNotPresent
# csv list of secrets
secretList: ''
# secretList: "secret1,secret2

ignoreNamespaces: 'kube-system,kube-public'
rbac:
  enabled: true

resources:
  {}
  # limits:
  #   cpu: 50m
  #   memory: 20Mi
  # requests:
  #   cpu: 20m
  #   memory: 20Mi

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# Secret Replicator

- **Source:** https://github.com/kiwigrid/secret-replicator

## Introduction

This chart distibutes existing secrets especially pull secrets across namespaces.

## Installing the Chart

Install from remote URL with the release name `secret-replicator` into namespace `default`:

```console
$ helm upgrade -i secret-replicator kiwigrid/secret-replicator
```

## Uninstalling the Chart

To uninstall/delete the `secret-replicator` deployment:

```console
$ helm delete secret-replicator --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the chart and their default values.

| Parameter          | Description                                   | Default                      |
| ------------------ | --------------------------------------------- | ---------------------------- |
| `image.repository` | image name                                    | `kiwigrid/secret-replicator` |
| `image.tag`        | image tag                                     | `10`                         |
| `image.pullPolicy` | Image pull policy                             | `IfNotPresent`               |
| `secretList`       | list of pull secrets                          | empty string                 |
| `ignoreNamespaces` | namespaces which should be excluded from sync | `kube-system,kube-pulic`     |
| `resources`        | Resource limits for pod                       | `{}`                         |
| `nodeSelector`     | NodeSelector                                  | `{}`                         |
| `tolerations`      | Tolerations                                   | `[]`                         |
| `affinity`         | Affinity                                      | `{}`                         |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml kiwigrid/secret-replicator
```

> **Tip**: You can use the default [values.yaml](values.yaml)
