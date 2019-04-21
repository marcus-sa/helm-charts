# `@helm-charts/incubator-gocd`

A GoCD Helm chart for Kubernetes. GoCD is an Open source continuous delivery server to model and visualize complex workflows with ease.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | gocd      |
| Chart Version       | 0.2.1     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for gocd.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

server:
  # server.enabled is the toggle to run GoCD Server. Change to false for Agent Only Deployment.
  enabled: true
  image:
    # server.image.repository is the GoCD Server image name
    repository: 'gocd/gocd-server'
    # server.image.tag is the GoCD Server image's tag
    tag:
    # server.image.pullPolicy is the GoCD Server image's pull policy
    pullPolicy: 'IfNotPresent'

  ## Configure GoCD server resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources: {}
  #   requests:
  #     memory: 512Mi
  #     cpu: 300m
  #   limits:
  #     cpu: 100m
  #     memory: 128Mi

  ## Additional GoCD server pod labels
  ## ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
  nodeSelector: {}

  healthCheck:
    # server.healthCheck.initialDelaySeconds is the initial delays in seconds to start the health checks
    initialDelaySeconds: 180
    # server.healthCheck.periodSeconds is the health check interval duration
    periodSeconds: 5
  env:
    # server.env.goServerSystemProperties is the GoCD Server system properties
    goServerSystemProperties:
    #  server.env.extraEnvVars is the list of environment variables passed to GoCD Server
    extraEnvVars:
      - name: GOCD_PLUGIN_INSTALL_kubernetes-elastic-agents
        value: https://github.com/gocd/kubernetes-elastic-agents/releases/download/v0.0.1/kubernetes-elastic-agent-0.0.1-0.jar
  service:
    # server.service.type is the GoCD Server service type
    type: 'NodePort'
    # server.service.httpPort is the GoCD Server HTTP port
    httpPort: 8153
    # server.service.httpPort is the GoCD Server HTTPS port
    httpsPort: 8154
    # Provide the nodeHttpPort and nodeHttpsPort if you want the service to be exposed on specific ports. Without this, random node ports will be assigned.
    # server.service.nodeHttpPort is the GoCD Server Service Node HTTP port
    nodeHttpPort:
    # server.service.nodeHttpPort is the GoCD Server Service Node HTTPS port
    nodeHttpsPort:
  ingress:
    # server.ingress.enabled is the toggle to enable GoCD Server Ingress
    enabled: false
    # server.ingress.hosts is used to create an Ingress record.
  #    hosts:
  #      - foo.go.cd

  persistence:
    # server.persistence.enabled is the toggle for server volume persistence. Change to true if a persistent volume is available and configured manually.
    enabled: false
    accessMode: 'ReadWriteOnce'
    size: 1Gi
    storageClass:
    ExistingClaim:
    pvSelector:
    #      matchLabels:
    #        volume-type: ssd
    subpath:
      godata: godata
      homego: homego
      dockerEntryPoint: scripts

agent:
  # agent.replicaCount is the GoCD Agent replicas Count. Specify the number of GoCD agents to run
  replicaCount: 1
  image:
    # agent.image.repository is the GoCD Agent image name
    repository: 'gocd/gocd-agent-alpine-3.6'
    # agent.image.tag is the GoCD Agent image's tag
    tag:
    # agent.image.pullPolicy is the GoCD Agent image's pull policy
    pullPolicy: 'IfNotPresent'
  env:
    # agent.env.goServerUrl is the GoCD Server Url
    goServerUrl:
    # agent.env.agentAutoRegisterKey is the GoCD Agent auto-register key
    agentAutoRegisterKey:
    # agent.env.agentAutoRegisterResources is the GoCD Agent auto-register resources
    agentAutoRegisterResources:
    # agent.env.agentAutoRegisterEnvironments is the GoCD Agent auto-register Environments
    agentAutoRegisterEnvironemnts:
    # agent.env.agentAutoRegisterHostname is the GoCD Agent auto-register hostname
    agentAutoRegisterHostname:
    # agent.env.goAgentSystemProperties is the GoCD Agent system properties
    goAgentSystemProperties:
    # agent.env.goAgentBootstrapperArgs is the GoCD Agent bootstrapper args
    goAgentBootstrapperArgs:
    # agent.env.goAgentBootstrapperJvmArgs is the GoCD Agent bootstrapper JVM args
    goAgentBootstrapperJvmArgs:
  persistence:
    # agent.persistence.enabled is the toggle for agent volume persistence. Change to true if a persistent volume is available and configured manually.
    enabled: false
    accessMode: 'ReadWriteOnce'
    size: 1Gi
    storageClass:
    ExistingClaim:
    pvSelector:
    #      matchLabels:
    #        app: godata-gocd-agent
    subpath:
      homego: homego
      dockerEntryPoint: scripts

  healthCheck:
    # agent.healthCheck.enable is the toggle for GoCD agent health checks
    enabled: false
    # agent.healthCheck.initialDelaySeconds is the initial delays in seconds to start the health checks
    initialDelaySeconds: 180
    # agent.healthCheck.periodSeconds is the health check interval duration
    periodSeconds: 60
    # agent.healthCheck.failureThreshold is the health check failure threshold of GoCD agent
    failureThreshold: 60

  ## Configure GoCD agent resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources: {}
  #   requests:
  #     memory: 512Mi
  #     cpu: 300m
  #   limits:
  #     cpu: 100m
  #     memory: 128Mi

  ## Additional GoCD agent pod labels
  ## ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
  nodeSelector: {}
```

</details>

---

# GoCD Helm Chart

[![Join the chat at https://gitter.im/gocd/gocd](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gocd/gocd?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A GoCD Helm chart for Kubernetes. [GoCD](https://www.gocd.org/) is an Open source continuous delivery server to model and visualize complex workflow with ease.

# Introduction

This chart bootstraps a single node GoCD server and a GoCD Agent deployment with configurable agent count on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release incubator/gocd
```

The command deploys GoCD on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the GoCD chart and their default values.

### GoCD Server

| Parameter                                | Description                                                                                                  | Default             |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------- |
| `server.enabled`                         | Enable GoCD Server. Supported values are `true`: `Agent-Server Deployment`, `false`: `Agent Only Deployment` | `true`              |
| `server.image.repository`                | GoCD server image                                                                                            | `gocd/gocd-server`  |
| `server.image.tag`                       | GoCD server image tag                                                                                        | `.Chart.appVersion` |
| `server.image.pullPolicy`                | Image pull policy                                                                                            | `IfNotPresent`      |
| `server.resources`                       | GoCD server resource requests and limits                                                                     | `{}`                |
| `server.nodeSelector`                    | GoCD server nodeSelector for pod labels                                                                      | `{}`                |
| `server.env.goServerSystemProperties`    | GoCD Server system properties                                                                                | `nil`               |
| `server.env.extraEnvVars`                | GoCD Server extra Environment variables                                                                      | `nil`               |
| `server.service.type`                    | Type of GoCD server Kubernetes service                                                                       | `NodePort`          |
| `server.service.httpPort`                | GoCD server service HTTP port                                                                                | `8153`              |
| `server.service.httpsPort`               | GoCD server service HTTPS port                                                                               | `8154`              |
| `server.service.nodeHttpPort`            | GoCD server service node HTTP port. **Note**: A random nodePort will get assigned if not specified           | `nil`               |
| `server.service.nodeHttpsPort`           | GoCD server service node HTTPS port. **Note**: A random nodePort will get assigned if not specified          | `nil`               |
| `server.ingress.enabled`                 | Enable GoCD ingress.                                                                                         | `false`             |
| `server.ingress.hosts`                   | GoCD ingress hosts records.                                                                                  | `nil`               |
| `server.healthCheck.initialDelaySeconds` | Initial delays in seconds to start the health checks. **Note**:GoCD server start up time.                    | `180`               |
| `server.healthCheck.periodSeconds`       | GoCD server heath check interval period.                                                                     | `5`                 |

### GoCD Agent

| Parameter                                 | Description                                                                                                                                                                      | Default                      |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `agent.replicaCount`                      | GoCD Agent replicas Count                                                                                                                                                        | `1`                          |
| `agent.image.repository`                  | GoCD agent image                                                                                                                                                                 | `gocd/gocd-agent-alpine-3.6` |
| `agent.image.tag`                         | GoCD agent image tag                                                                                                                                                             | `.Chart.appVersion`          |
| `agent.image.pullPolicy`                  | Image pull policy                                                                                                                                                                | `IfNotPresent`               |
| `agent.resources`                         | GoCD agent resource requests and limits                                                                                                                                          | `{}`                         |
| `agent.nodeSelector`                      | GoCD agent nodeSelector for pod labels                                                                                                                                           | `{}`                         |
| `agent.env.goServerUrl`                   | GoCD Server Url                                                                                                                                                                  | `nil`                        |
| `agent.env.agentAutoRegisterKey`          | GoCD Agent autoregister key                                                                                                                                                      | `nil`                        |
| `agent.env.agentAutoRegisterResources`    | Comma separated list of GoCD Agent resources                                                                                                                                     | `nil`                        |
| `agent.env.agentAutoRegisterEnvironemnts` | Comma separated list of GoCD Agent environments                                                                                                                                  | `nil`                        |
| `agent.env.agentAutoRegisterHostname`     | GoCD Agent hostname                                                                                                                                                              | `nil`                        |
| `agent.env.goAgentBootstrapperArgs`       | GoCD Agent Bootstrapper Args. It can be used to [Configure end-to-end transport security](https://docs.gocd.org/current/installation/ssl_tls/end_to_end_transport_security.html) | `nil`                        |
| `agent.env.goAgentBootstrapperJvmArgs`    | GoCD Agent Bootstrapper JVM Args.                                                                                                                                                | `nil`                        |
| `agent.healthCheck.enabled`               | Enable use of GoCD agent health checks.                                                                                                                                          | `false`                      |
| `agent.healthCheck.initialDelaySeconds`   | GoCD agent start up time.                                                                                                                                                        | `180`                        |
| `agent.healthCheck.periodSeconds`         | GoCD agent heath check interval period.                                                                                                                                          | `60`                         |
| `agent.healthCheck.failureThreshold`      | GoCD agent heath check failure threshold. After failure threshold timeout, agent will be restarted.                                                                              | `60`                         |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml incubator/gocd
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## persistence

The GoCD server image stores persistence under `/godata` path of the container. A dynamically managed Persistent Volume
Claim is used to keep the data across deployments, by default. This is known to work in minikube. Alternatively,
a previously configured Persistent Volume Claim can be used.

### Server persistence Values

| Parameter                                     | Description                                         | Default         |
| --------------------------------------------- | --------------------------------------------------- | --------------- |
| `server.persistence.enabled`                  | Enable the use of a GoCD server PVC                 | `false`         |
| `server.persistence.accessMode`               | The PVC access mode                                 | `ReadWriteOnce` |
| `server.persistence.size`                     | The size of the PVC                                 | `1Gi`           |
| `server.persistence.storageClass`             | The PVC storage class name                          | `nil`           |
| `server.persistence.pvSelector`               | The godata Persistence Volume Selectors             | `nil`           |
| `server.persistence.subpath.godata`           | The /godata path on Persistence Volume              | `godata`        |
| `server.persistence.subpath.homego`           | The /home/go path on Persistence Volume             | `homego`        |
| `server.persistence.subpath.dockerEntryPoint` | The /docker-entrypoint.d path on Persistence Volume | `scripts`       |

### Agent persistence Values

| Parameter                                    | Description                                         | Default         |
| -------------------------------------------- | --------------------------------------------------- | --------------- |
| `agent.persistence.enabled`                  | Enable the use of a GoCD agent PVC                  | `false`         |
| `agent.persistence.accessMode`               | The PVC access mode                                 | `ReadWriteOnce` |
| `agent.persistence.size`                     | The size of the PVC                                 | `1Gi`           |
| `agent.persistence.storageClass`             | The PVC storage class name                          | `nil`           |
| `agent.persistence.pvSelector`               | The godata Persistence Volume Selectors             | `nil`           |
| `agent.persistence.subpath.homego`           | The /home/go path on Persistence Volume             | `homego`        |
| `agent.persistence.subpath.dockerEntryPoint` | The /docker-entrypoint.d path on Persistence Volume | `scripts`       |

##### Note:

`/home/go` directory shared between multiple agents implies:

1. That packages being cached here is shared between all the agents.
2. That all the agents sharing this directory are privy to all the secrets in `/home/go`

### Existing PersistentVolumeClaim

1. Create the PersistentVolume
2. Create the PersistentVolumeClaim
3. Install the chart

```
$ helm install --name my-release --set server.persistence.godata.existingClaim=PVC_NAME incubator/gocd
```

# License

```plain
Copyright 2018 ThoughtWorks, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

[0]: https://www.gocd.org/download/
