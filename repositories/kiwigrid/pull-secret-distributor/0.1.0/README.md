# `@helm-charts/kiwigrid-pull-secret-distributor`

A Helm chart to distribute pull secret across namespaces

| Field               | Value                   |
| ------------------- | ----------------------- |
| Repository Name     | kiwigrid                |
| Chart Name          | pull-secret-distributor |
| Chart Version       | 0.1.0                   |
| NPM Package Version | 0.1.0                   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for pull-secret-distributor.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

image:
  repository: kiwigrid/pull-secret-distributor
  tag: 10
  pullPolicy: IfNotPresent
# csv list of secrets
pullSecrets: ''
# pullSecrets: "secret1,secret2"
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

# Pull secret distributor

- **Source:** https://github.com/kiwigrid/pull-secret-distributor

## Introduction

This chart distibutes pull secrets across namespaces.

## Installing the Chart

Install from remote URL with the release name `pull-secret-distributor` into namespace `default`:

```console
$ helm upgrade -i pull-secret-distributor kiwigrid/pull-secret-distributor
```

## Uninstalling the Chart

To uninstall/delete the `pull-secret-distributor` deployment:

```console
$ helm delete pull-secret-distributor --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the chart and their default values.

| Parameter          | Description             | Default                            |
| ------------------ | ----------------------- | ---------------------------------- |
| `image.repository` | image name              | `kiwigrid/pull-secret-distributor` |
| `image.tag`        | image tag               | `10`                               |
| `image.pullPolicy` | Image pull policy       | `IfNotPresent`                     |
| `pullSecrets`      | list of pull secrets    | empty string                       |
| `resources`        | Resource limits for pod | `{}`                               |
| `nodeSelector`     | NodeSelector            | `{}`                               |
| `tolerations`      | Tolerations             | `[]`                               |
| `affinity`         | Affinity                | `{}`                               |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml kiwigrid/pull-secret-distributor
```

> **Tip**: You can use the default [values.yaml](values.yaml)
