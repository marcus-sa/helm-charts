# `@helm-charts/incubator-gocd`

DEPRECATED GoCD is an open-source continuous delivery server to model and visualize complex workflows with ease.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | gocd      |
| Chart Version       | 0.2.4     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for gocd.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

rbac:
  # Specifies whether rbac resources must be created.
  create: true
  # The API version to use while creating the rbac resources. Use `kubectl api-versions | grep rbac` to find which abi versions are supported for your cluster.
  apiVersion: v1beta1
  # Create a cluster role binding with the existing role, do not create a new one. If left blank, a new cluster role is created.
  roleRef:

serviceAccount:
  # Specifies whether a service account should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  # If create if false and a name is not specified, the default service account is used for the cluster role binding.
  name:

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
    initialDelaySeconds: 90
    # server.healthCheck.periodSeconds is the health check interval duration
    periodSeconds: 15
    # server.healthCheck.failureThreshold is the number of unsuccessful attempts made to the GoCD server health check endpoint before the container is restarted (for liveness) or marked as unready (for readiness)
    failureThreshold: 10
  env:
    # server.env.goServerSystemProperties is a list of Java system properties, which needs to be provided to the GoCD Server, typically prefixed with -D unless otherwise stated.
    # Example: "-Xmx4096mb -Dfoo=bar"
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
    # server.ingress.enabled is the toggle to enable/disable GoCD Server Ingress
    enabled: true
    # server.ingress.hosts is used to create an Ingress record.
  #    hosts:
  #      - foo.go.cd

  persistence:
    # server.persistence.enabled is the toggle for server volume persistence.
    enabled: true
    accessMode: 'ReadWriteOnce'
    # The storage space that should be claimed from the persistent volume
    size: 2Gi
    # If defined, storageClassName: <storageClass>
    # If set to "-", storageClassName: "", which disables dynamic provisioning
    # If undefined (the default) or set to null, no storageClassName spec is
    # set, choosing 'standard' storage class available with the default provisioner (gcd-pd on GKE, hostpath on minikube, etc).

    #    storageClass: "-"

    # A manually managed Persistent Volume and Claim
    # If defined, PVC must be created manually before volume will be bound
    existingClaim:
    # To choose a suitable persistent volume from available static persistent volumes, selectors are used.
    pvSelector:
    #      matchLabels:
    #        volume-type: ssd
    subpath:
      # godata is where the config, db, plugins are stored
      godata: godata
      # homego can be used for storing and mounting secrets
      homego: homego
      # custom entrypoint scripts that should be run before starting the GoCD server inside the container.
      dockerEntryPoint: scripts

agent:
  # agent.replicaCount is the GoCD Agent replicas Count. Specify the number of GoCD agents to run
  replicaCount: 0
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
    # If defined, storageClassName: <storageClass>
    # If set to "-", storageClassName: "", which disables dynamic provisioning
    # If undefined (the default) or set to null, no storageClassName spec is
    # set, choosing 'standard' storage class available with the default provisioner (gcd-pd on GKE, hostpath on minikube, etc).

    #   storageClass: "-"

    # A manually managed Persistent Volume and Claim
    # If defined, PVC must be created manually before volume will be bound
    existingClaim:
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
    initialDelaySeconds: 60
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

[GoCD](https://www.gocd.org/) is an open-source continuous delivery server to model and visualize complex workflow with ease.

# Deprecation

The GoCD Helm chart has been moved the stable. This chart in incubator will no longer be maintained. Please switch to the stable GoCD Helm chart.

# Introduction

This chart bootstraps a single node GoCD server and GoCD agents on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure
- LoadBalancer support or Ingress Controller
- Ensure that the service account used for starting tiller has enough permissions to create a role.

## Setup

Because of the [known issue](https://github.com/kubernetes/helm/issues/2224) while creating a role, in order for the `helm install` to work, please ensure to do the following:

- On minikube

```bash
$ minikube start --bootstrapper kubeadm
```

- On GKE, if tiller's in the kube-system namespace

```bash

$ kubectl create clusterrolebinding clusterRoleBinding \                                                                                                               1 ???
  --clusterrole=cluster-admin \
  --serviceaccount=kube-system:default
```

## Installing the Chart

To install the chart with the release name `gocd-app`:

```bash
$ helm repo add incubator https://kubernetes-charts-incubator.storage.googleapis.com/
$ helm install --name gocd-app --namespace gocd incubator/gocd
```

The command deploys GoCD on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `gocd-app` deployment:

```bash
$ helm delete --purge gocd-app
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables list the configurable parameters of the GoCD chart and their default values.

### GoCD Server

| Parameter                                | Description                                                                                                                                             | Default             |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `server.enabled`                         | Enable GoCD Server. Supported values are `true`, `false`. When enabled, the GoCD server deployment is done on helm install.                             | `true`              |
| `server.image.repository`                | GoCD server image                                                                                                                                       | `gocd/gocd-server`  |
| `server.image.tag`                       | GoCD server image tag                                                                                                                                   | `.Chart.appVersion` |
| `server.image.pullPolicy`                | Image pull policy                                                                                                                                       | `IfNotPresent`      |
| `server.resources`                       | GoCD server resource requests and limits                                                                                                                | `{}`                |
| `server.nodeSelector`                    | GoCD server nodeSelector for pod labels                                                                                                                 | `{}`                |
| `server.env.goServerSystemProperties`    | GoCD Server system properties                                                                                                                           | `nil`               |
| `server.env.extraEnvVars`                | GoCD Server extra Environment variables                                                                                                                 | `nil`               |
| `server.service.type`                    | Type of GoCD server Kubernetes service                                                                                                                  | `NodePort`          |
| `server.service.httpPort`                | GoCD server service HTTP port                                                                                                                           | `8153`              |
| `server.service.httpsPort`               | GoCD server service HTTPS port                                                                                                                          | `8154`              |
| `server.service.nodeHttpPort`            | GoCD server service node HTTP port. **Note**: A random nodePort will get assigned if not specified                                                      | `nil`               |
| `server.service.nodeHttpsPort`           | GoCD server service node HTTPS port. **Note**: A random nodePort will get assigned if not specified                                                     | `nil`               |
| `server.ingress.enabled`                 | Enable/disable GoCD ingress. Allow traffic from outside the cluster via http. Do `kubectl describe ing` to get the public ip to access the gocd server. | `true`              |
| `server.ingress.hosts`                   | GoCD ingress hosts records.                                                                                                                             | `nil`               |
| `server.healthCheck.initialDelaySeconds` | Initial delays in seconds to start the health checks. **Note**:GoCD server start up time.                                                               | `90`                |
| `server.healthCheck.periodSeconds`       | GoCD server heath check interval period.                                                                                                                | `15`                |
| `server.healthCheck.failureThreshold`    | Number of unsuccessful attempts made to the GoCD server health check endpoint before restarting.                                                        | `10`                |

### GoCD Agent

| Parameter                                 | Description                                                                                                                                                                      | Default                      |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `agent.replicaCount`                      | GoCD Agent replicas Count. By default, no agents are provided.                                                                                                                   | `0`                          |
| `agent.image.repository`                  | GoCD agent image                                                                                                                                                                 | `gocd/gocd-agent-alpine-3.6` |
| `agent.image.tag`                         | GoCD agent image tag                                                                                                                                                             | `.Chart.appVersion`          |
| `agent.image.pullPolicy`                  | Image pull policy                                                                                                                                                                | `IfNotPresent`               |
| `agent.resources`                         | GoCD agent resource requests and limits                                                                                                                                          | `{}`                         |
| `agent.nodeSelector`                      | GoCD agent nodeSelector for pod labels                                                                                                                                           | `{}`                         |
| `agent.env.goServerUrl`                   | GoCD Server Url. If nil, discovers the GoCD server service if its available on the Kubernetes cluster                                                                            | `nil`                        |
| `agent.env.agentAutoRegisterKey`          | GoCD Agent autoregister key                                                                                                                                                      | `nil`                        |
| `agent.env.agentAutoRegisterResources`    | Comma separated list of GoCD Agent resources                                                                                                                                     | `nil`                        |
| `agent.env.agentAutoRegisterEnvironemnts` | Comma separated list of GoCD Agent environments                                                                                                                                  | `nil`                        |
| `agent.env.agentAutoRegisterHostname`     | GoCD Agent hostname                                                                                                                                                              | `nil`                        |
| `agent.env.goAgentBootstrapperArgs`       | GoCD Agent Bootstrapper Args. It can be used to [Configure end-to-end transport security](https://docs.gocd.org/current/installation/ssl_tls/end_to_end_transport_security.html) | `nil`                        |
| `agent.env.goAgentBootstrapperJvmArgs`    | GoCD Agent Bootstrapper JVM Args.                                                                                                                                                | `nil`                        |
| `agent.healthCheck.enabled`               | Enable use of GoCD agent health checks.                                                                                                                                          | `false`                      |
| `agent.healthCheck.initialDelaySeconds`   | GoCD agent start up time.                                                                                                                                                        | `60`                         |
| `agent.healthCheck.periodSeconds`         | GoCD agent heath check interval period.                                                                                                                                          | `60`                         |
| `agent.healthCheck.failureThreshold`      | GoCD agent heath check failure threshold. Number of unsuccessful attempts made to the GoCD server health check endpoint before restarting.                                       | `60`                         |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --namespace gocd --name gocd-app -f values.yaml incubator/gocd
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

By default, the GoCD helm chart supports dynamic volume provisioning. This means that the standard storage class with a default provisioner provided by various cloud platforms used.
Refer to the [Kubernetes blog](http://blog.kubernetes.io/2017/03/dynamic-provisioning-and-storage-classes-kubernetes.html) to know more about the default provisioners across platforms.

> **Note**: The recalim policy for most default volume provisioners is `delete`. This means that, the persistent volume provisioned using the default provisioner will be deleted along with the data when the PVC gets deleted.

One can change the storage class to be used by overriding `server.persistence.storageClass` and `agent.persistence.storageClass` like below:

```bash
$ helm install --namespace gocd --name gocd-app --set server.persistence.stoageClass=STORAGE_CLASS_NAME incubator/gocd
```

#### Static Volumes

Alternatively, a static persistent volume can be specified. This must be manually managed by the cluster admin outside of the helm scope.
For binding with a static persistent volume, dynamic volume provisioning must be **disabled** by setting `server.persistence.storageClass` or `agent.persistence.storageClass` to `-` .
The value pvSelector must be specified so that the right persistence volume will be bound.

#### Existing PersistentVolumeClaim

1. Create the PersistentVolume
2. Create the PersistentVolumeClaim
3. Install the chart

```
$ helm install --name gocd-app --set server.persistence.existingClaim=PVC_NAME incubator/gocd
```

### Server persistence Values

| Parameter                                     | Description                                         | Default         |
| --------------------------------------------- | --------------------------------------------------- | --------------- |
| `server.persistence.enabled`                  | Enable the use of a GoCD server PVC                 | `true`          |
| `server.persistence.accessMode`               | The PVC access mode                                 | `ReadWriteOnce` |
| `server.persistence.size`                     | The size of the PVC                                 | `2Gi`           |
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

## RBAC and Service Accounts

The RBAC section is for users who want to use the Kubernetes Elastic Agent Plugin with GoCD. The Kubernetes elastic agent plugin for GoCD brings up pods on demand while running a job.
If RBAC is enabled,

1.  A cluster role is created by default and the following privileges are provided.
    Privileges:

    - nodes: list, get
    - events: list, watch
    - namespace: list, get
    - pods, pods/log: \*

2.  A cluster role binding to bind the specified service account with the cluster role.

3.  A gocd service account . This service account is bound to a cluster role.
    If `rbac.create=true` and `serviceAccount.create=false`, the `default` service account in the namespace will be used for cluster role binding.

| Parameter               | Description                                                         | Default   |
| ----------------------- | ------------------------------------------------------------------- | --------- |
| `rbac.create`           | If true, a gocd service account, role, and role binding is created. | `true`    |
| `rbac.apiVersion`       | The Kubernetes API version                                          | `v1beta1` |
| `rbac.roleRef`          | An existing role that can be bound to the gocd service account.     | `nil`     |
| `serviceAccount.create` | Specifies whether a service account should be created.              | `true`    |
| `serviceAccount.name`   | Name of the service account.                                        | `nil`     |

If `rbac.create=false`, the service account that will be used, either the default or one that's created, will not have the cluster scope or pod privileges to use with the Kubernetes EA plugin.
A cluster role binding must be created like below:

```
kubectl create clusterrolebinding clusterRoleBinding \
--clusterrole=CLUSTER_ROLE_WITH_NECESSARY_PRIVILEGES \
--serviceaccount=NAMESPACED_SERVICE_ACCOUNT

```

#### Existing role references:

The gocd service account can be associated with an existing role in the namespace that has privileges to create and delete pods. To use an existing role,

```bash
helm install --namespace gocd --name gocd-app --set rbac.roleRef=ROLE_NAME incubator/gocd
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
