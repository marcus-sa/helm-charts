# `@helm-charts/buildkite-agent`

Buildkite Agent Chart

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | buildkite |
| Chart Name          | agent     |
| Chart Version       | 0.3.6     |
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
  # Note that by default we use appVersion to get image tag version
  # tag:
  pullPolicy: IfNotPresent

# Buildkite Agent settings
agent:
  # Your Buildkite agent token, it must be set
  token: ''
  # Agent meta-data, which can be used to assign jobs
  meta: 'role=agent'

# Enable mounting the hosts docker socket into the agent container
enableHostDocker: true

# Extra env vars to be passed
# If you do want to pass extra env vars to the agent, uncomment the following
# lines, adjust them as necessary.
extraEnv:
#  - name: test1
#    value: "test1"
#  - name: test2
#    value: "test2"

# Mount extra Secrets
# If you do want to mount extra Secrets via volume mounts to the agent container,
# uncomment the following lines, adjust them as necessary.
#
volumeMounts: {}
#  - name: my-secrets
#    value: "/chamber-of-secrets"
#
volumes: {}
#  - name: my-secrets
#    secret:
#      secretName: "some-k8s-secret"

# Your ssh private key if you want to access private git repository
privateSshKey: ''

# Docker registries credentials
registryCreds:
  # GCP credentials for GCR
  # base64 encoded GCP Service account json key file
  gcrServiceAccountKey: ''
  # base64 encoded private registry docker config.json file
  # for quay.io, docker hub, ecr and etc to mount over the container,
  # not to be used with imagePullSecrets
  dockerConfig: ''
  # base64 encoded private registry docker config.json file
  # to be used with imagePullSecrets
  dockerconfigjson: ''

  # Uncomment below to enable docker socket liveness probe
livenessProbe:
  # initialDelaySeconds: 15
  # timeoutSeconds: 1
  # exec:
  #   command:
  #   - docker
  #   - ps

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

nodeSelector: {}

tolerations: []

affinity: {}

# RBAC manifests management
rbac:
  enabled: true

podDisruptionBudget:
  enabled: false
  maxUnavailable: 1
  minAvailable: null
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

```console
helm install --name bk-agent --namespace buildkite buildkite/agent \
    --set agent.token="BUILDKITE_AGENT_TOKEN"
```

To install the chart with the release name `bk-agent` and set Agent meta-data and git repo SSH key:

```console
helm install --name bk-agent --namespace buildkite buildkite/agent \
  --set agent.token="$(cat buildkite.token)",agent.meta="role=production" \
  --set privateSshKey="$(cat buildkite.key)"  \
  --set registryCreds.gcrServiceAccountKey: "$(cat gcr_service_account.key | base64)"
```

Where `--set` values contain:

```
agentToken: Buildkite token read from file
agentMeta: tagging agent with - role=production (to add multiple tags, you must separate them with an escaped comma, like this: role=production\,queue=kubernetes)
privateSshKey: private SSH key read from file
registryCreds.gcrServiceAccountKey: base64 encoded gcr_service_account.key json file
```

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `bk-agent` release:

```console
helm delete bk-agent
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `buildkite` chart and their default values.

| Parameter                            | Description                         | Default           |
| ------------------------------------ | ----------------------------------- | ----------------- |
| `replicaCount`                       | Replicas count                      | 1                 |
| `image.repository`                   | Image repository                    | `buildkite/agent` |
| `image.tag`                          | Image tag                           | ``                |
| `image.pullPolicy`                   | Image pull policy                   | `IfNotPresent`    |
| `agent.token`                        | Agent token                         | Must be specified |
| `agent.meta`                         | Agent meta-data                     | `role=agent`      |
| `enableHostDocker`                   | Mount docker socket                 | `true`            |
| `extraEnv`                           | Agent extra env vars                | `nil`             |
| `privateSshKey`                      | Agent ssh key for git access        | `nil`             |
| `registryCreds.gcrServiceAccountKey` | GCP Service account json key        | `nil`             |
| `registryCreds.dockerConfig`         | Private registry docker config.json | `nil`             |
| `volumeMounts`                       | Extra volumeMounts configuration    | `nil`             |
| `volumes`                            | Extra volumes configuration         | `nil`             |
| `resources`                          | Liveness probe for docker socket    | `{}`              |
| `livenessProbe`                      | Pod resource requests & limits      | `{}`              |
| `nodeSelector`                       | Node labels for pod assignment      | `{}`              |
| `tolerations`                        | Node tolerations for pod assignment | `{}`              |
| `affinity`                           | Node/pod affinity                   | `{}`              |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example:

```console
helm install --name bk-agent --namespace buildkite buildkite/agent -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml) file

## Buildkite pipeline examples

Check for examples of `pipeline.yml` and `build/deploy` scripts [here](pipeline-examples).
