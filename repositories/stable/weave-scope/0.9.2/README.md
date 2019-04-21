# `@helm-charts/stable-weave-scope`

A Helm chart for the Weave Scope cluster visualizer.

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | stable      |
| Chart Name          | weave-scope |
| Chart Version       | 0.9.2       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Where defaults exist, the values are set to them here.
# Values with no preferred or common defaults are set to empty strings.
global:
  # global.image: the image that will be used for this release
  image:
    repository: weaveworks/scope
    tag: '1.6.5'
    # global.image.pullPolicy: must be Always, IfNotPresent, or Never
    pullPolicy: 'IfNotPresent'
  # global.service.*: the configuration of the service used to access the frontend
  service:
    # global.service.name: the short name desired for the frontend service
    # global.service.name may be specified if you need to use a specific service name, but will be generated if not specified
    # global.service.name is a global so we can access its value easily from the agent subchart
    # name: "weave-scope-app"
    # global.service.port: (required if frontend.enabled == true) the port exposed by the Scope frontend service
    # global.service.port is a global so we can access its value easily from the agent subchart
    port: 80
    # global.service.type: (required if frontend.enabled == true) the type of the frontend service -- must be ClusterIP, NodePort or LoadBalancer
    # global.service.type is a global to keep it with the other values for configuring the frontend service
    type: 'ClusterIP'

# weave-scope-frontend.* controls how the Scope frontend is installed
weave-scope-frontend:
  enabled:
    true
    # weave-scope-frontend.resources.*: controls requests/limits for the frontend
    # weave-scope-frontend.resources.* values are all optional but should not be set to empty values
    # resources:
    # requests:
    # weave-scope-frontend.resources.requests.cpu: CPU req. in MHz (m)
    # cpu: ""
    # weave-scope-frontend.resources.requests.memory: memory req. in MiB (Mi)
    # memory: ""
    # limits:
    # weave-scope-frontend.resources.limits.cpu: CPU limit in MHz (m)
    # cpu: ""
    # weave-scope-frontend.resources.limits.memory: memory limit in MiB (Mi)
    # memory: ""

# weave-scope-agent.* controls how the Weave Scope node agent pods are installed
weave-scope-agent:
  enabled: true
  # weave-scope-agent.dockerBridge: (required if agent.enabled == true) the name of the Docker bridge interface
  dockerBridge: 'docker0'
  # weave-scope-agent.scopeFrontendAddr: the host:port of a Scope frontend to send data to
  # weave-scope-agent.scopeFrontendAddr is only needed for some cases where the frontend is deployed separately from the agent
  scopeFrontendAddr: ''
  # weave-scope-agent.probeToken: the token used to connect to Weave Cloud
  # weave-scope-agent.probeToken is not needed for connecting to non-cloud Scope frontends
  probeToken: ''
  # weave-scope-agent.rbac.*: controls RBAC resource creation/use
  rbac:
    # weave-scope-agent.rbac.create: whether RBAC resources should be created
    # weave-scope-agent.rbac.create *must* be set to false if RBAC is not enabled in the cluster
    # weave-scope-agent.rbac.create *may* be set to false in an RBAC-enabled cluster to allow for external management of RBAC
    create: true
  serviceAccount:
    # Specifies whether a ServiceAccount should be created
    create: true
    # The name of the ServiceAccount to use.
    # If not set and create is true, a name is generated using the fullname template
    # name: "weave-scope"
  # weave-scope-agent.resources.*: controls requests/limits for the agent
  # weave-scope-agent.resources.* values are all optional but should not be set to empty values
  # resources:
  # requests:
  # weave-scope-agent.resources.requests.cpu: CPU req. in MHz (m)
  # cpu: ""
  # weave-scope-agent.resources.requests.memory: memory req. in MiB (Mi)
  # memory: ""
  # limits:
  # weave-scope-agent.resources.limits.cpu: CPU limit in MHz (m)
  # cpu: ""
  # weave-scope-agent.resources.limits.memory: memory limit in MiB (Mi)
  # memory: ""
```

</details>

---

# Weave Scope

## About this chart

This chart contains two subcharts (_weave-scope-frontend_ and _weave-scope-agent_) which deploy the corresponding components of Weave Scope, an interactive container monitoring and visualization application.

Either subchart can be deployed on its own (set the "enabled" value to "false" for the chart you want to suppress) or the two can be deployed together (the default).

## Compatibility notes

- This chart is designed and tested with Weave Scope 1.6.2 and 1.6.5 and Kubernetes 1.7.
- Weave Scope 1.6.2 was originally released by WeaveWorks for Kubernetes 1.6 but seems to work fine on 1.7.
- On Kubernetes 1.6 Weave Scope versions as old as 1.3.0 will probably work.

## Prerequisites

- The service account, cluster role, cluster role binding and service specified in the rendered version of this chart must not already exist.

## Values templated in this chart

Note that most of this documentation is repeated in `values.yaml`; if you're in a hurry you can skip this part here and read it there. Values with no default noted have no default.

### Global values

|            Parameter | Description                                                                                                                                                                                                   | Default            |
| -------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------- |
|         **image.\*** | the parameters of the image pulls for this release                                                                                                                                                            |                    |
| **image.repository** | the image that will be used for this release (required)                                                                                                                                                       | "weaveworks/scope" |
|        **image.tag** | the version of Weave Scope desired for this release (required)                                                                                                                                                | "1.6.5"            |
| **image.pullPolicy** | the imagePullPolicy for the container (required): IfNotPresent, Always, or Never                                                                                                                              | IfNotPresent       |
|       **service.\*** | the configuration of the service used to access the frontend                                                                                                                                                  |                    |
|     **service.name** | the short name desired for the frontend service (optional, but if not specified by the user a value will be calculated) -- this is a global so we can access its value easily from the agent subchart         | "weave-scope-app"  |
|     **service.port** | the port exposed by the Scope frontend service (required if weave-scope-frontend is enabled) -- this is a global so we can access its value easily from the agent subchart                                    | 80                 |
|     **service.type** | the type of the frontend service (required if weave-scope-frontend is enabled): ClusterIP, NodePort or LoadBalancer -- this is a global to keep it with the other values for configuring the frontend service | "ClusterIP"        |

### Weave Scope frontend values

The **weave-scope-frontend** section controls how the Scope frontend is installed.

|                     Parameter | Description                                                               | Default |
| ----------------------------: | :------------------------------------------------------------------------ | :------ |
|                   **enabled** | controls whether the frontend is deployed                                 | true    |
|              **resources.\*** | controls requests/limits for the frontend (these values are all optional) |         |
|    **resources.requests.cpu** | CPU request in MHz (m)                                                    |         |
| **resources.requests.memory** | memory request in MiB (Mi)                                                |         |
|      **resources.limits.cpu** | CPU limit in MHz (m)                                                      |         |
|   **resources.limits.memory** | memory limit in MiB (Mi)                                                  |         |

### Weave Scope agent

The **agent** section controls how the Weave Scope node agent pods are installed.

|                     Parameter | Description                                                                                                                                                                                                              | Default   |
| ----------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------- |
|                   **enabled** | controls whether the agent is deployed                                                                                                                                                                                   | true      |
|              **dockerBridge** | the name of the Docker bridge interface                                                                                                                                                                                  | "docker0" |
|         **scopeFrontendAddr** | the host:port of a Scope frontend to send data to -- this is only needed in cases where the frontend is deployed separately from the agent (e.g. an install outside the cluster or a pre-existing install inside it)     |           |
|                **probeToken** | the token used to connect to Weave Cloud -- this is not needed for connecting to non-cloud Scope frontends                                                                                                               |           |
|                   **rbac.\*** | controls RBAC resource creation/use                                                                                                                                                                                      |           |
|               **rbac.create** | whether RBAC resources should be created (required) -- this **must** be set to false if RBAC is not enabled in the cluster; it _may_ be set to false in an RBAC-enabled cluster to allow for external management of RBAC | true      |
|     **serviceAccount.create** | whether a new service account name that the agent will use should be created.                                                                                                                                            | true      |
|       **serviceAccount.name** | service account to be used. If not set and serviceAccount.create is `true` a name is generated using the fullname template.                                                                                              |           |
|              **resources.\*** | controls requests/limits for the agent (these values are all optional)                                                                                                                                                   |           |
|    **resources.requests.cpu** | CPU request in MHz (m)                                                                                                                                                                                                   |           |
| **resources.requests.memory** | memory request in MiB (Mi)                                                                                                                                                                                               |           |
|      **resources.limits.cpu** | CPU limit in MHz (m)                                                                                                                                                                                                     |           |
|   **resources.limits.memory** | memory limit in MiB (Mi)                                                                                                                                                                                                 |           |

## Other notes

- The Deployment for the frontend specifies a single replica; multiple replicas of the frontend, although they may run, probably will not work as expected since different agents may end up talking to different replicas.
