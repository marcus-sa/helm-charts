# `@helm-charts/stable-apm-server`

The server receives data from the Elastic APM agents and stores the data into a datastore like Elasticsearch

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | apm-server |
| Chart Version       | 1.0.0      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  repository: docker.elastic.co/apm/apm-server
  tag: 6.6.2
  pullPolicy: IfNotPresent

config:
  apm-server: {}
  ### Defines the host and port the server is listening on
  # host: "localhost:8200"

  ## Maximum permitted size in bytes of an unzipped request accepted by the server to be processed.
  # max_unzipped_size: 52428800
  ## Maximum permitted size in bytes of a request's header accepted by the server to be processed.
  # max_header_size: 1048576

  ## Maximum permitted duration in seconds for reading an entire request.
  # read_timeout: 2s
  ## Maximum permitted duration in seconds for writing a response.
  # write_timeout: 2s

  ## Maximum duration in seconds before releasing resources when shutting down the server.
  # shutdown_timeout: 5s

  ## Maximum number of requests permitted to be sent to the server concurrently.
  # concurrent_requests: 40

  ## Authorization token to be checked. If a token is set here the agents must
  ## send their token in the following format: Authorization: Bearer <secret-token>.
  ## It is recommended to use an authorization token in combination with SSL enabled.
  # secret_token:
  # ssl.enabled: false
  # ssl.certificate : "path/to/cert"
  # ssl.key : "path/to/private_key"

  queue:
    {}
    ## Queue type by name (default 'mem')
    ## The memory queue will present all available events (up to the outputs
    ## bulk_max_size) to the output, the moment the output is ready to server
    ## another batch of events.
    # mem:
    ## Max number of events the queue can buffer.
    # events: 4096
    ## Hints the minimum number of events stored in the queue,
    ## before providing a batch of events to the outputs.
    ## A value of 0 (the default) ensures events are immediately available
    ## to be sent to the outputs.
    # flush.min_events: 2048
    ## Maximum duration after which events are available to the outputs,
    ## if the number of events stored in the queue is < min_flush_events.
    # flush.timeout: 1s

  # When a key contains a period, use this format for setting values on the command line:
  # --set config."output\.file".enabled=false
  output.file:
    path: '/usr/share/apm-server/data'
    filename: apm-server
    rotate_every_kb: 10000
    number_of_files: 5

  # output.elasticsearch:
  #  hosts: ["elasticsearch:9200"]
  #  protocol: "https"
  #  username: "elastic"
  #  password: "changeme"

# List of beat plugins
plugins:
  []
  # - kinesis.so

# Additional container arguments
extraArgs:
  []
  # - -d
  # - *

# A map of additional environment variables
extraVars:
  {}
  # test1: "test2"

# Add additional volumes and mounts, for example to read other log files on the host
extraVolumes:
  []
  # - hostPath:
  #     path: /var/log
  #   name: varlog
extraVolumeMounts:
  []
  # - name: varlog
  #   mountPath: /host/var/log
  #   readOnly: true

## Labels to be added to pods
podLabels: {}

## Annotations to be added to pods
podAnnotations: {}

resources:
  {}
  ## We usually recommend not to specify default resources and to leave this as a conscious
  ## choice for the user. This also increases chances charts run on environments with little
  ## resources, such as Minikube. If you do want to specify resources, uncomment the following
  ## lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 200Mi
  # requests:
  #  cpu: 100m
  #  memory: 100Mi

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
nodeSelector: {}

## Affinity configuration for pod assignment
## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
affinity: {}

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:
```

</details>

---

# apm-server

[apm-server](https://www.elastic.co/guide/en/apm/server/current/index.html) is the server receives data from the Elastic APM agents and stores the data into a datastore like Elasticsearch.

## Introduction

This chart deploys apm-server agents to all the nodes in your cluster via a DaemonSet.

By default this chart only ships a single output to a file on the local system. Users should set config.output.file.enabled=false and configure their own outputs as [documented](https://www.elastic.co/guide/en/apm/get-started/current/install-and-run.html)

## Prerequisites

- Kubernetes 1.9+

## Installing the Chart

To install the chart with the release name `my-release`, run:

```bash
$ helm install --name my-release stable/apm-server
```

After a few minutes, you should see service statuses being written to the configured output, which is a log file inside the apm-server container.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the apm-server chart and their default values.

| Parameter                           | Description                                                                                                                                                                                               | Default                            |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `image.repository`                  | The image repository to pull from                                                                                                                                                                         | `docker.elastic.co/apm/apm-server` |
| `image.tag`                         | The image tag to pull                                                                                                                                                                                     | `6.2.4`                            |
| `image.pullPolicy`                  | Image pull policy                                                                                                                                                                                         | `IfNotPresent`                     |
| `rbac.create`                       | If true, create & use RBAC resources                                                                                                                                                                      | `true`                             |
| `rbac.serviceAccount`               | existing ServiceAccount to use (ignored if rbac.create=true)                                                                                                                                              | `default`                          |
| `config`                            | The content of the configuration file consumed by apm-server. See the [apm-server documentation](https://www.elastic.co/guide/en/beats/apm-server/current/apm-server-reference-yml.html) for full details |                                    |
| `plugins`                           | List of apm-server plugins                                                                                                                                                                                |                                    |
| `extraVars`                         | A map of additional environment variables                                                                                                                                                                 |                                    |
| `extraVolumes`, `extraVolumeMounts` | Additional volumes and mounts, for example to provide other configuration files                                                                                                                           |                                    |
| `resources.requests.cpu`            | CPU resource requests                                                                                                                                                                                     |                                    |
| `resources.limits.cpu`              | CPU resource limits                                                                                                                                                                                       |                                    |
| `resources.requests.memory`         | Memory resource requests                                                                                                                                                                                  |                                    |
| `resources.limits.memory`           | Memory resource limits                                                                                                                                                                                    |                                    |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
    --set rbac.create=true \
    stable/apm-server
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/apm-server
```

> **Tip**: You can use the default [values.yaml](values.yaml)
