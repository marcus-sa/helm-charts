# `@helm-charts/stable-chaoskube`

Chaoskube periodically kills random pods in your Kubernetes cluster.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | chaoskube |
| Chart Version       | 0.6.1     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# container name
name: chaoskube

# docker image
image: quay.io/linki/chaoskube

# docker image tag
imageTag: v0.6.1

# number of replicas to run
replicas: 1

# interval between pod terminations
interval: 10m

# label selector to filter pods by, e.g. app=foo,stage!=prod
labels:

# annotation selector to filter pods by, e.g. chaos.alpha.kubernetes.io/enabled=true
annotations:

# namespace selector to filter pods by, e.g. '!kube-system,!production' (use quotes)
namespaces:

# don't kill pods, only log what would have been done
dryRun: true

# resource requests and limits
resources:
  cpu: 10m
  memory: 16Mi

# create service account with permission to list and kill pods
rbac:
  create: false

  # only used when create is false
  serviceAccountName: default
```

</details>

---

# Chaoskube Helm Chart

[chaoskube](https://github.com/linki/chaoskube) periodically kills random pods in your Kubernetes cluster.

## TL;DR;

```console
$ helm install stable/chaoskube
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/chaoskube
```

The command deploys chaoskube on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the my-release deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

By default `chaoskube` runs in dry-run mode so it doesn't actually kill anything.
If you're sure you want to use it run `helm` with:

```console
$ helm install stable/chaoskube --set dryRun=false
```

| Parameter                 | Description                                         | Default                 |
| ------------------------- | --------------------------------------------------- | ----------------------- |
| `name`                    | container name                                      | chaoskube               |
| `image`                   | docker image                                        | quay.io/linki/chaoskube |
| `imageTag`                | docker image tag                                    | v0.6.1                  |
| `replicas`                | number of replicas to run                           | 1                       |
| `interval`                | interval between pod terminations                   | 10m                     |
| `labels`                  | label selector to filter pods by                    | "" (matches everything) |
| `annotations`             | annotation selector to filter pods by               | "" (matches everything) |
| `namespaces`              | namespace selector to filter pods by                | "" (all namespaces)     |
| `dryRun`                  | don't kill pods, only log what would have been done | true                    |
| `resources.cpu`           | cpu resource requests and limits                    | 10m                     |
| `resources.memory`        | memory resource requests and limits                 | 16Mi                    |
| `rbac.create`             | create rbac service account and roles               | false                   |
| `rbac.serviceAccountName` | name of serviceAccount to use when create is false  | default                 |

Setting label and namespaces selectors from the shell can be tricky but is possible (example with zsh):

```console
$ helm install \
  --set labels='app=mate\,stage!=prod',namespaces='!kube-system\,!production' \
  stable/chaoskube --debug --dry-run | grep -A4 args
    args:
    - --in-cluster
    - --interval=10m
    - --labels=app=foo,stage!=prod
    - --namespaces=!kube-system,!production
```
