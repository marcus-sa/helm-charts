# `@helm-charts/stable-hubot`

Hubot chatbot for Slack

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | hubot  |
| Chart Version       | 0.0.1  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for hubot.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: minddocdev/hubot
  tag: 0.1.9
  pullPolicy: IfNotPresent

service:
  type: NodePort
  port: 80

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - hubot.local
  tls: []
  #  - secretName: hubot-tls
  #    hosts:
  #      - hubot.local

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}

hubot:
  config: {}

  scriptsFolder: /minddocbot/scripts

  scripts:
    health.coffee: |
      # Description
      #   A hubot script that exposes a health endpoint
      module.exports = (robot) ->
        robot.router.get '/health', (req, res) -> res.status(200).end()

  slackToken: ''
```

</details>

---

# Hubot

Hubot 3 chatbot with the Slack adaptor

Learn more: https://github.com/mind-doc/hubot

## TL;DR;

```bash
$ helm install stable/hubot
```

## Introduction

This chart creates a Hubot deployment on a [Kubernetes](http://kubernetes.io)
cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/hubot
```

The command deploys Hubot on the Kubernetes cluster using the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete --purge my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Hubot chart and their default values.

| Parameter             | Description                                 | Default                               |
| --------------------- | ------------------------------------------- | ------------------------------------- |
| `namespace`           | namespace to use                            | `default`                             |
| `replicaCount`        | desired number of pods                      | `1`                                   |
| `image.repository`    | container image repository                  | `minddocdev/hubot`                    |
| `image.tag`           | container image tag                         | `latest`                              |
| `image.pullPolicy`    | container image pull policy                 | `Always`                              |
| `service.type`        | type of service to create                   | `NodePort`                            |
| `service.httpPort`    | port for the http service                   | `80`                                  |
| `ingress.enabled`     | flag to add ingress functionality           | `false`                               |
| `ingress.annotations` | ingress load balancer annotations           | `Always`                              |
| `ingress.path`        | proxied path                                | `/`                                   |
| `ingress.hosts`       | proxied hosts                               | `[ hubot.local ]`                     |
| `ingress.tls`         | tls certificate secrets                     | `[]`                                  |
| `resources`           | resource requests & limits                  | `{}`                                  |
| `nodeSelector`        | node selector logic                         | `{}`                                  |
| `tolerations`         | resource tolerations                        | `{}`                                  |
| `affinity`            | node affinity                               | `{}`                                  |
| `hubot.config`        | hubot configuration (environment variables) | `{}`                                  |
| `hubot.scriptsFolder` | hubot scripts folder path                   | `/minddocbot/scripts`                 |
| `hubot.scripts`       | custom hubot scripts                        | `{ health.coffee: <script content> }` |
| `hubot.slackToken`    | slack hubot integration token               | `''`                                  |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
    --set key_1=value_1,key_2=value_2 \
    stable/hubot
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
# example for staging
$ helm install --name my-release -f values.yaml stable/hubot
```

> **Tip**: You can use the default [values.yaml](values.yaml)

### Specific hubot settings

#### Config

With the `hubot.config` parameter you can provide a hash that will be used as environment variables by hubot. These environment variables will be picked by hubot's scripts.

For instance:

```
hubot:
  config:
    HUBOT_STANDUP_PREPEND: '@channel'
```

#### Scripts

In addition, you can add your own scripts, which will be created in the scripts folder, with `.js` or `.coffee` format. See [Hubot Scripting](https://hubot.github.com/docs/scripting/).

By default, this chart adds a health endpoint so Kubernetes can probe the pod.

```
hubot:
  scripts:
    health.coffee: |
      # Description
      #   A hubot script that exposes a health endpoint
      module.exports = (robot) ->
        robot.router.get '/health', (req, res) -> res.status(200).end()
```

You can follow the same format for creating your own hubot scripts

```
hubot:
  scripts:
    hithere.coffee: |
      # Description
      #   A hubot script that is an example for this chart
      module.exports = (robot) ->
        robot.respond /hi my bot/i, (msg) ->
          msg.send 'Hi there my human'
```
