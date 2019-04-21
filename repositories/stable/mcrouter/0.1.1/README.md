# `@helm-charts/stable-mcrouter`

Mcrouter is a memcached protocol router for scaling memcached deployments.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | mcrouter |
| Chart Version       | 0.1.1    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Container image
image: jphalip/mcrouter:0.36.0

## Memcached chart parameters
memcached:
  ## If true, the Memcached chart will be installed as a dependency
  enabled: true
  ## Number of Memcached replicas
  replicaCount: 3

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 256m
    memory: 512Mi

## Parameters for the mcrouter command
mcrouterCommandParams:
  port: 5000
  ## Pass a custom JSON config, if not specified one will be generated per the number of memcached replicas
  ## https://github.com/facebook/mcrouter/wiki/Config-Files
  # configFile:

## Information about the memcached service
memcachedService:
  # serviceName: "memcached"
  # replicaCount: 3
  port: 11211
  namespace: 'default'

## Pod controller. Possible values: "daemonset", "statefulset".
controller: 'daemonset'

## Values for the daemonset controller
daemonset:
  ## Host port for the mcrouter pod
  hostPort: 5000

## Values for the statefulset controller
statefulset:
  ## Number of replicas
  replicas: 1
  ## Select AntiAffinity as either hard or soft, default is hard
  antiAffinity: 'hard'
```

</details>

---

# Mcrouter Helm Chart

Helm chart for [Mcrouter](https://github.com/facebook/mcrouter), a Memcached protocol router for scaling memcached deployments.

## Configuration

The following table lists the configurable parameters of the Mcrouter chart and their default values.

| Parameter                          | Description                                                                                                                                                     | Default                                                                                                                                                                                                                                                                                       |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `controller`                       | Controller used for deploying the Mcrouter pods. Possible values: `daemonset` or `statefulset`                                                                  | `daemonset`                                                                                                                                                                                                                                                                                   |
| `daemonset.hostPort`               | Host port used by the DaemonSet controller                                                                                                                      | `5000`                                                                                                                                                                                                                                                                                        |
| `image`                            | Container's image                                                                                                                                               | `jphalip/mcrouter:0.36.0`<br>Note: Third-party image (see [source](https://github.com/jphalip/mcrouter-docker))<br>It is recommended to build a new, up-to-date image based on the [official Dockerfile](https://github.com/facebook/mcrouter/blob/master/mcrouter/scripts/docker/Dockerfile) |
| `mcrouterCommandParams.configFile` | The config file to use for the mcrouter command. If not provided, then a config file will automatically be generated based on the Memcached chart's parameters. | No value                                                                                                                                                                                                                                                                                      |
| `mcrouterCommandParams.port`       | Port(s) to listen on (comma separated)                                                                                                                          | `5000`                                                                                                                                                                                                                                                                                        |
| `memcached.enabled`                | If true, the Memcached chart will be installed as a dependency                                                                                                  | `true`                                                                                                                                                                                                                                                                                        |
| `resources.limits.cpu`             | CPU resource limits                                                                                                                                             | `256m`                                                                                                                                                                                                                                                                                        |
| `resources.limits.memory`          | Memory resource limits                                                                                                                                          | `512Mi`                                                                                                                                                                                                                                                                                       |
| `resources.requests.cpu`           | CPU resource requests                                                                                                                                           | `100m`                                                                                                                                                                                                                                                                                        |
| `resources.requests.memory`        | Memory resource requests                                                                                                                                        | `128Mi`                                                                                                                                                                                                                                                                                       |
| `statefulset.antiAffinity`         | Pod anti-affinity logic used by the StatefulSet controller. Possible values: `hard`, `soft`                                                                     | `hard`                                                                                                                                                                                                                                                                                        |
| `statefulset.replicas`             | Number of pod replicas used by the StatefulSet controller                                                                                                       | `1`                                                                                                                                                                                                                                                                                           |

## Controllers

This chart allows the use of two different controllers: DaemonSet (default) and StatefulSet.

If using the DaemonSet controller then each Mcrouter pods will connect to a port on their respective node' host (defaults to `5000`). Each of your application pods may then connect to the same port on their respective node. To access the node's name, you may expose that name via an environment variable with the `spec.nodeName` entry in your application's PodSpec as described in the Kubernetes [documentation](https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information/).

If using the StatefulSet controller then the service can be accessed by default on port `5000` on the following DNS name from within your cluster: `<release name>-mcrouter.<namespace>.svc.cluster.local`.

## Testing

Install the Mcrouter chart:

    helm install stable/mcrouter --name=myproxy

Connect to one of the Mcrouter pods and start a telnet session:

    MCROUTER_POD_IP=$(kubectl get pods -l app=myproxy-mcrouter -o jsonpath="{.items[0].status.podIP}")

    kubectl run -it --rm alpine --image=alpine --restart=Never telnet $MCROUTER_POD_IP 5000

In the telnet prompt enter the following commands:

    set mykey 0 0 5

    hello

    get mykey

    quit
