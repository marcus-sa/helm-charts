# `@helm-charts/stable-buildkite`

Agent for Buildkite

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | buildkite |
| Chart Version       | 0.1.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for bk-agent.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: buildkite/agent
  tag: 3.0
  pullPolicy: IfNotPresent

# Buildkite Agent settings
agent:
  # Your Buildkite agent token, it must be set
  token: ''
  # Agent meta-data, which can be used to assign jobs
  meta: 'role=agent'

# Extra env vars to be passed
# If you do want to xxtra env vars to pass to agent, uncomment the following
# lines, adjust them as necessary.
#extraEnv:
#  - name: test1
#    value: "test1"
#  - name: test2
#    value: "test2"

# Your ssh private key if you want to access private git repository
privateSshKey: ''

# Docker registries credentials
registryCreds:
  # GCP credentials for GCR
  # base64 encoded GCP Service account json key file
  gcrServiceAccountKey: ''
  # base64 encoded private registry docker config.json file
  # for quay.io, docker hub, ecr and etc
  dockerConfig: ''

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 500m
  #  memory: 1024Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
nodeSelector: {}
```

</details>

---

# Running Buildkite agent

The [buildkite agent](https://buildkite.com/docs/agent) is a small, reliable and cross-platform build runner that makes it easy to run automated builds on your own infrastructure. Its main responsibilities are polling buildkite.com for work, running build jobs, reporting back the status code and output log of the job, and uploading the job's artefacts.
It is simple, lightweight hosted [Buildkite](https://buildkite.com) CI/CD system which only requires to host agents in your Kubernetes cluster.

## Introduction

This chart bootstraps a [buildkite agent](https://github.com/buildkite/docker-buildkite-agent) builder on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.
As it sets `service account` it can be used to build Docker images and deploy them using `kubectl` and `helm` clients in the same cluster where agents run, without any extra setup.

## Installing the Chart

In order for the chart to configure the Buildkite Agent properly during the installation process, you must provide some minimal configuration which can't rely on defaults. This includes at least one element in the _agent_ list `token`:

To install the chart with the release name `bk-agent`:

```bash
$ helm install stable/buildkite --name bk-agent --namespace buildkite --set agent.token="BUILDKITE_AGENT_TOKEN"
```

To install the chart with the release name `bk-agent` and set Agent meta-data and git repo SSH key:

```console
$ helm install stable/buildkite --name bk-agent --namespace buildkite \
  --set agent.token="$(cat buildkite.token)",agent.meta="role=production",privateSshKey="$(cat buildkite.key)"
```

Where `--set` values contain:

```
agentToken: Buildkite token read from file
agentMeta: tagging agent with - role=production
privateSshKey: private SSH key read from file
```

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `bk-agent` release:

```bash
$ helm delete bk-agent
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `buildkite` chart and their default values.

| Parameter                            | Description                         | Default           |
| ------------------------------------ | ----------------------------------- | ----------------- |
| `replicaCount`                       | Replicas count                      | 1                 |
| `image.repository`                   | Image                               | `buildkite/agent` |
| `image.tag`                          | Image tag                           | `3.0`             |
| `image.pullPolicy`                   | Image pull policy                   | `IfNotPresent`    |
| `agent.token`                        | Agent token                         | Must be specified |
| `agent.meta`                         | Agent meta-data                     | `role=agent`      |
| `extraEnv`                           | Agent extra env vars                | `nil`             |
| `privateSshKey`                      | Agent ssh key for git access        | `nil`             |
| `registryCreds.gcrServiceAccountKey` | GCP Service account json key        | `nil`             |
| `registryCreds.dockerConfig`         | Private registry docker config.json | `nil`             |
| `resources`                          | pod resource requests & limits      | `{}`              |
| `nodeSelector`                       | node labels for pod assignment      | `{}`              |

## Buildkite pipeline examples

Check for examples of `pipeline.yml` and `build/deploy` scripts [here](pipeline-examples).
