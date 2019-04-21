# `@helm-charts/stable-spotify-docker-gc`

A simple Docker container and image garbage collection script.

| Field               | Value             |
| ------------------- | ----------------- |
| Repository Name     | stable            |
| Chart Name          | spotify-docker-gc |
| Chart Version       | 0.1.2             |
| NPM Package Version | 0.1.0             |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  registry: docker.io
  org: spotify
  repository: docker-gc
  tag: latest
  pullPolicy: 'IfNotPresent'

cron:
  schedule: '0 0 * * *'
  log: /var/log/crond.log

env:
  # grace period in seconds before garbage collecting
  gracePeriodSeconds: '0'
  # docker (client) api version to use in container, to match node host (server) api version
  # dockerAPIVersion: "1.23"
# List any image or container exclusions here
# exclude:
#   images: |-
#     spotify/cassandra:latest
#     redis:.*
#     9681260c3ad5
#   containers: |-
#     mariadb-data
#     inimitable_quokka

# Optionally specify an array of imagePullSecrets.
# Secrets must be manually created in the namespace.
# ref: https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod
#
# imagePullSecrets:
#   - name: myRegistryKeySecretName
```

</details>

---

# Spotify's Docker-GC Helm Chart

This chart wraps the [spotify/docker-gc][] Docker image in the form of a [DaemonSet][], so that Docker resource garbage collection occurs on all nodes of a given Kubernetes cluster.

## Chart Details

This chart will do the following:

- Deploy one pod running the [spotify/docker-gc][] container to each node in a Kubernetes cluster, configured with the values provided.

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/spotify-docker-gc
```

## Configuration

The following table lists the configurable parameters of the Spotify Docker GC chart and their default values.

See the [spotify/docker-gc GitHub repository][] for more settings which may be added to this chart as needed.

| Parameter                | Description                              | Default                            |
| ------------------------ | ---------------------------------------- | ---------------------------------- |
| `cron.schedule`          | cron schedule                            | `0 0 * * *` (daily at 12:00AM UTC) |
| `cron.log`               | cron log name                            | `/var/logs/cron.log`               |
| `env.gracePeriodSeconds` | grace period in seconds before gc occurs | `0`                                |
| `env.dockerAPIVersion`   | Docker API Version for docker-gc client  | Not set                            |
| `exclude.images`         | images to be excluded                    | Not set                            |
| `exclude.containers`     | containers to be excluded                | Not set                            |
| `serviceAccount`         | service account to attach to deamonset   | Not set                            |
| `imagePullSecrets`       | Specify image pull secrets               | Not set                            |

## Design/Evolution

The initial approach for wrapping [spotify/docker-gc][] in a Helm chart was to use a [CronJob][]. However, as of this writing, there is [no native support](https://github.com/kubernetes/kubernetes/issues/36601) for [DaemonSet][]-like behavior -- that is, ensuring [Job][]s spawned by a given [CronJob][] run on all nodes in a Kubernetes cluster. Once this feature has been implemented and the [CronJob][] resource itself stabilizes (it is currently in alpha), conversion to this resource would be prudent and will simplify the template/logic.

With regard to the [DaemonSet][] resource, do note that only in Kubernetes version >= 1.6 are pods automatically redeployed via [Rolling Update](https://github.com/kubernetes/kubernetes/issues/22543) when the [DaemonSet][] itself is changed (e.g., via a `helm upgrade`).

[spotify/docker-gc]: https://hub.docker.com/r/spotify/docker-gc/
[spotify/docker-gc github repository]: https://github.com/spotify/docker-gc
[daemonset]: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset
[cronjob]: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/
[job]: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/
