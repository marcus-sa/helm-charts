# `@helm-charts/stable-chaoskube`

A Helm chart for chaoskube

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | chaoskube |
| Chart Version       | 0.3.1     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# container name
name: chaoskube

# docker image
image: quay.io/linki/chaoskube

# docker image tag
imageTag: v0.3.1

# number of replicas to run
replicas: 1

# interval between pod terminations
interval: 10m

# don't kill pods, only log what would have been done
dryRun: true

# resource requests and limits
resources:
  cpu: 10m
  memory: 16Mi
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

| Parameter          | Description                                         | Default                 |
| ------------------ | --------------------------------------------------- | ----------------------- |
| `name`             | container name                                      | chaoskube               |
| `image`            | docker image                                        | quay.io/linki/chaoskube |
| `imageTag`         | docker image tag                                    | v0.3.1                  |
| `replicas`         | number of replicas to run                           | 1                       |
| `interval`         | interval between pod terminations                   | 10m                     |
| `dryRun`           | don't kill pods, only log what would have been done | true                    |
| `resources.cpu`    | cpu resource requests and limits                    | 10m                     |
| `resources.memory` | memory resource requests and limits                 | 16Mi                    |
