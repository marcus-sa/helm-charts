# `@helm-charts/stable-chaoskube`

Chaoskube periodically kills random pods in your Kubernetes cluster.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | chaoskube |
| Chart Version       | 0.9.1     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# container name
name: chaoskube

# docker image
image: quay.io/linki/chaoskube

# docker image tag
imageTag: v0.9.0

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

# Enable debug logging
debug: false

# Set values for exempting specific week days from Chaoskube Actions
excludedWeekdays:

# Set values for exempting specific times of day from Chaoskube Actions
excludedTimesOfDay:

# Set values for exempting specific days of the year from Chaoskube Actions (Dec24,Jan1)
excludedDaysOfYear:

# Set specific Timezone for Actions to take place
timezone: UTC

priorityClassName: ''

# create service account with permission to list and kill pods
rbac:
  create: false

  # only used when create is false
  serviceAccountName: default

resources:
  {}
  ## We usually recommend not to specify default resources and to leave this as a conscious
  ## choice for the user. This also increases chances charts run on environments with little
  ## resources, such as Minikube. If you do want to specify resources, uncomment the following
  ## lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #   cpu: 100m
  #   memory: 128Mi
  # requests:
  #   cpu: 100m
  #   memory: 128Mi

nodeSelector: {}

tolerations: []

affinity:
  {}
  ## Suggested antiAffinity, as each CA should be on a separate Node for resilience
  # podAntiAffinity:
  #   requiredDuringSchedulingIgnoredDuringExecution:
  #     - topologyKey: "kubernetes.io/hostname"
  #       labelSelector:
  #         matchLabels:
  #           app: chaoskube
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

| Parameter                 | Description                                         | Default                          |
| ------------------------- | --------------------------------------------------- | -------------------------------- |
| `name`                    | container name                                      | chaoskube                        |
| `image`                   | docker image                                        | quay.io/linki/chaoskube          |
| `imageTag`                | docker image tag                                    | v0.9.0                           |
| `replicas`                | number of replicas to run                           | 1                                |
| `interval`                | interval between pod terminations                   | 10m                              |
| `labels`                  | label selector to filter pods by                    | "" (matches everything)          |
| `annotations`             | annotation selector to filter pods by               | "" (matches everything)          |
| `namespaces`              | namespace selector to filter pods by                | "" (all namespaces)              |
| `dryRun`                  | don't kill pods, only log what would have been done | true                             |
| `debug`                   | Enable debug logging mode, for detailed logs        | false                            |
| `timezone`                | Set timezone for running actions (Optional)         | "" (UTC)                         |
| `excludedWeekdays`        | Set Days of the Week to avoid actions (Optional)    | "" (Don't skip any weekdays)     |
| `excludedTimesOfDay`      | Set Time Range to avoid actions (Optional)          | "" (Don't skip any times of day) |
| `excludedDaysOfYear`      | Set Days of the Year to avoid actions (Optional)    | "" (Don't skip any days)         |
| `priorityClassName`       | priorityClassName                                   | `nil`                            |
| `rbac.create`             | create rbac service account and roles               | false                            |
| `rbac.serviceAccountName` | name of serviceAccount to use when create is false  | default                          |
| `resources`               | CPU/Memory resource requests/limits                 | `{}`                             |
| `nodeSelector`            | Node labels for pod assignment                      | `{}`                             |
| `tolerations`             | Toleration labels for pod assignment                | `[]`                             |
| `affinity`                | Affinity settings for pod assignment                | `{}`                             |

Setting label and namespaces selectors from the shell can be tricky but is possible (example with zsh):

```console
$ helm install \
  --set labels='app=mate\,stage!=prod',namespaces='!kube-system\,!production' \
  stable/chaoskube --debug --dry-run | grep -A7 args
    args:
    - --interval=10m
    - --labels=app=foo,stage!=prod
    - --namespaces=!kube-system,!production
    - --timezone=America/New_York
    - --excludedWeekdays="Sat,Tue"
    - --excludedTimesOfDay="12:00-18:00"
    - --excludedDaysOfYear="Apr1,Dec24"
```
