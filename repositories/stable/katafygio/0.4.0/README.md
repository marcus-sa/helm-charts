# `@helm-charts/stable-katafygio`

Continuously backup Kubernetes objets as YAML files in git

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | katafygio |
| Chart Version       | 0.4.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for the katafygio chart.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

# gitUrl (optional) is a remote git repository that Katafygio can clone, and where
# it can push changes. If gitUrl is not defined, Katafygio will still maintain a
# pod-local git repository, which can be on a persistent volume (see above).
# gitUrl: https://user:token@github.com/myorg/myrepos.git

# noGit disable git versioning when true (will only keep an unversioned local dump up-to-date).
noGit: false

# healthcheckPort is the TCP port Katafygio will listen for health check requests.
healthcheckPort: 8080

# logLevel can be info, warning, error, or fatal.
logLevel: warning
# logOutput can be stdout, stderr, or syslog.
logOutput: stdout
# logServer (optional) provide the address of a remote syslog server.
# logServer: "localhost:514"

# filter is an (optional) label selector used to restrict backups to selected objects.
# filter: "app in (foo, bar)"

# excludeKind is an array of excluded (not backuped) Kubernetes objects kinds.
excludeKind:
  - replicaset
  - endpoints
  - event

# excludeObject is an array of specific Kubernetes objects to exclude from dumps
# (the format is: objectkind:namespace/objectname).
# excludeObject:
#  - "configmap:kube-system/leader-elector"

# resyncInterval is the interval (in seconds) between full catch-up resyncs
# (to catch possibly missed events). Set to 0 to disable resyncs.
resyncInterval: 300

# localDir is the path where we'll dump and commit cluster objects.
localDir: '/var/lib/katafygio/data'

# persistence for the localDir dump directory. Note that configuring gitUrl
# is an other way to achieve persistence.
persistence:
  enabled: true
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  storageClass: ''
  accessMode: ReadWriteOnce
  size: 1Gi
  # existingClaim: ""

# rbac allow to enable or disable RBAC role and binding. Katafygio needs
# read-only access to all Kubernetes API groups and resources.
rbac:
  # Specifies whether RBAC resources should be created
  create: true

# serviceAccount is used to provide a dedicated serviceAccount when using RBAC
# (or to fallback to the namespace's "default" SA if name is left empty).
serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

image:
  repository: bpineau/katafygio
  tag: v0.7.1
  pullPolicy: IfNotPresent

# resources define the deployment's cpu and memory resources.
# Katafygio only needs about 50Mi of memory as a baseline, and more depending
# on the cluster's content. For instance, on a 45 nodes cluster with about 2k
# pods and 1k services, Katafygio use about 250Mi.
resources:
  {}
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

replicaCount: 1

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# Katafygio

[Katafygio](https://github.com/bpineau/katafygio) discovers Kubernetes objects (deployments, services, ...), and continuously saves them as YAML files in a Git repository. This provides real-time, continuous backups, and keeps detailed changes history.

## TL;DR;

```bash
$ helm install stable/katafygio
```

## Introduction

This chart installs a [Katafygio](https://github.com/bpineau/katafygio) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.9+

## Chart Details

You may filter out irrelevant objects using the `excludeKind` and `excludeObject` options, to keep your backups' repository lean.

By default, the chart will dump (and version) the clusters content in /var/lib/katafygio/data (configurable with `localDir`).
This can be useful as is, to keep a local changes history. To benefit from long term, out of cluster, and centrally reachable persistence, you may provide the address of a remote Git repository (with `gitUrl`), where all changes will be pushed.

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/katafygio
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Katafygio chart and their default values.

| Parameter               | Description                                                 | Default                              |
| ----------------------- | ----------------------------------------------------------- | ------------------------------------ |
| `replicaCount`          | Desired number of pods                                      | `1`                                  |
| `image.repository`      | Katafygio container image name                              | `bpineau/katafygio`                  |
| `image.tag`             | Katafygio container image tag                               | `v0.7.1`                             |
| `image.pullPolicy`      | Katafygio container image pull policy                       | `IfNotPresent`                       |
| `localDir`              | Container's local path where Katafygio will dump and commit | `/tmp/kf-dump`                       |
| `gitUrl`                | Optional remote repository where changes will be pushed     | `nil`                                |
| `noGit`                 | Disable Git versioning                                      | `false`                              |
| `filter`                | Label selector to dump only matched objects                 | `nil`                                |
| `healthcheckPort`       | The port Katafygio will listen for health checks requests   | `8080`                               |
| `excludeKind`           | Object kinds to ignore                                      | `{"replicaset","endpoints","event"}` |
| `excludeObject`         | Specific objects to ignore (eg. "configmap:default/foo")    | `nil`                                |
| `rbac.create`           | Enable or disable RBAC roles and bindings                   | `true`                               |
| `serviceAccount.create` | Whether a ServiceAccount should be created                  | `true`                               |
| `serviceAccount.name`   | Service account to be used                                  | `nil`                                |
| `resyncInterval`        | Seconds between full catch-up resyncs. 0 to disable         | `300`                                |
| `logLevel`              | Log verbosity (ie. info, warning, error)                    | `warning`                            |
| `logOutput`             | Logs destination (stdout, stderr or syslog)                 | `stdout`                             |
| `logServer`             | Syslog server address (eg. "rsyslog:514")                   | `nil`                                |
| `resources`             | CPU/Memory resource requests/limits                         | `{}`                                 |
| `tolerations`           | List of node taints to tolerate                             | `[]`                                 |
| `affinity`              | Node affinity for pod assignment                            | `{}`                                 |
| `nodeSelector`          | Node labels for pod assignment                              | `{}`                                 |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/katafygio
```

> **Tip**: You can use the default [values.yaml](values.yaml)
