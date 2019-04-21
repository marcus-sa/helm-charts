# `@helm-charts/agones-agones`

a library for hosting, running and scaling dedicated game servers on Kubernetes.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | agones   |
| Chart Name          | agones   |
| Chart Version       | 0.7.0-rc |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Copyright 2018 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Declare variables to be passed into your templates.

agones:
  metrics:
    enabled: true
    prometheusServiceDiscovery: true
  rbacEnabled: true
  crds:
    install: true
    cleanupOnDelete: true
  serviceaccount:
    controller: agones-controller
    sdk: agones-sdk
  controller:
    resources: {}
    generateTLS: true
    safeToEvict: false
    http:
      port: 8080
    healthCheck:
      initialDelaySeconds: 3
      periodSeconds: 3
      failureThreshold: 3
      timeoutSeconds: 1
  ping:
    install: true
    replicas: 2
    http:
      expose: true
      response: ok
      port: 80
      serviceType: LoadBalancer
    udp:
      expose: true
      rateLimit: 20
      port: 50000
      serviceType: LoadBalancer
    healthCheck:
      initialDelaySeconds: 3
      periodSeconds: 3
      failureThreshold: 3
      timeoutSeconds: 1
  image:
    registry: gcr.io/agones-images
    tag: 0.7.0-rc
    controller:
      name: agones-controller
      pullPolicy: IfNotPresent
    sdk:
      name: agones-sdk
      cpuRequest: 30m
      cpuLimit: 0
      alwaysPull: false
    ping:
      name: agones-ping
      pullPolicy: IfNotPresent

gameservers:
  namespaces:
    - default
  minPort: 7000
  maxPort: 8000
```

</details>

---

# Install Agones using Helm

This chart install the Agones application and defines deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- [Helm](https://docs.helm.sh/helm/) package manager 2.10.0+
- Kubernetes 1.11+
- Role-based access controls (RBAC) activated
- MutatingAdmissionWebhook and ValidatingAdmissionWebhook admission controllers activated, see [recommendation](https://kubernetes.io/docs/admin/admission-controllers/#is-there-a-recommended-set-of-admission-controllers-to-use)

## Installing the Chart

> If you don't have `Helm` installed locally, or `Tiller` installed in your Kubernetes cluster, read the [Using Helm](https://docs.helm.sh/using_helm/) documentation to get started.

To install the chart with the release name `my-release` using our stable helm repository:

```bash
$ helm repo add agones https://agones.dev/chart/stable
$ helm install --name my-release --namespace agones-system agones/agones
```

_We recommend to install Agones in its own namespaces (like `agones-system` as shown above)
you can use the helm `--namespace` parameter to specify a different namespace._

The command deploys Agones on the Kubernetes cluster with the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

> If you are installing a development build of Agones (i.e. not the 0.4.0 release), you will need to install Agones the following way:

```bash
$ cd install/helm/
$ helm install --name my-release --namespace agones-system agones --set agones.image.tag=0.4.0-481970d
```

The full list of available tags is [here](https://console.cloud.google.com/gcr/images/agones-images/)

---

## Namespaces

By default Agones is configured to work with game servers deployed in the `default` namespace. If you are planning to use other namespace you can configure Agones via the parameter `gameservers.namespaces`.

For example to use `default` **and** `xbox` namespaces:

```bash
$ kubectl create namespace xbox
$ helm install --set "gameservers.namespaces={default,xbox}" --namespace agones-system --name my-release agones/agones
```

> You need to create your namespaces before installing Agones.

If you want to add a new namespace afterward simply upgrade your release:

```bash
$ kubectl create namespace ps4
$ helm upgrade --set "gameservers.namespaces={default,xbox,ps4}" my-release agones/agones
```

## RBAC

By default, `agones.rbacEnabled` is set to true. This enable RBAC support in Agones and must be true if RBAC is enabled in your cluster.

The chart will take care of creating the required service accounts and roles for Agones.

If you have RBAC disabled, or to put it another way, ABAC enabled, you should set this value to `false`.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Agones chart and their default values.

| Parameter                                           | Description                                                                                                                                                   | Default                |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `agones.rbacEnabled`                                | Creates RBAC resources. Must be set for any cluster configured with RBAC                                                                                      | `true`                 |
| `agones.crds.install`                               | Install the CRDs with this chart. Useful to disable if you want to subchart (since crd-install hook is broken), so you can copy the CRDs into your own chart. | `true`                 |
| `agones.crds.cleanupOnDelete`                       | Run the pre-delete hook to delete all GameServers and their backing Pods when deleting the helm chart, so that all CRDs can be removed on chart deletion      | `true`                 |
| `agones.metrics.enabled`                            | Enables controller metrics on port `8080` and path `/metrics`                                                                                                 | `true`                 |
| `agones.metrics.prometheusServiceDiscovery`         | Adds annotations for Prometheus ServiceDiscovery (and also Strackdriver)                                                                                      | `true`                 |
| `agones.serviceaccount.controller`                  | Service account name for the controller                                                                                                                       | `agones-controller`    |
| `agones.serviceaccount.sdk`                         | Service account name for the sdk                                                                                                                              | `agones-sdk`           |
| `agones.image.registry`                             | Global image registry for all images                                                                                                                          | `gcr.io/agones-images` |
| `agones.image.tag`                                  | Global image tag for all images                                                                                                                               | `0.4.0`                |
| `agones.image.controller.name`                      | Image name for the controller                                                                                                                                 | `agones-controller`    |
| `agones.image.controller.pullPolicy`                | Image pull policy for the controller                                                                                                                          | `IfNotPresent`         |
| `agones.image.controller.pullSecret`                | Image pull secret for the controller                                                                                                                          | ``                     |
| `agones.image.sdk.name`                             | Image name for the sdk                                                                                                                                        | `agones-sdk`           |
| `agones.image.sdk.cpuRequest`                       | The [cpu request][constraints] for sdk server container                                                                                                       | `30m`                  |
| `agones.image.sdk.cpuLimit`                         | The [cpu limit][constraints] for the sdk server container                                                                                                     | `0` (none)             |
| `agones.image.sdk.alwaysPull`                       | Tells if the sdk image should always be pulled                                                                                                                | `false`                |
| `agones.image.ping.name`                            | ( ⚠️ release candidate feature ⚠️ ) Image name for the ping service                                                                                           | `agones-ping`          |
| `agones.image.ping.pullPolicy`                      | ( ⚠️ release candidate feature ⚠️ ) Image pull policy for the ping service                                                                                    | `IfNotPresent`         |
| `agones.controller.http.port`                       | Port to use for liveness probe service and metrics                                                                                                            | `8080`                 |
| `agones.controller.healthCheck.initialDelaySeconds` | Initial delay before performing the first probe (in seconds)                                                                                                  | `3`                    |
| `agones.controller.healthCheck.periodSeconds`       | Seconds between every liveness probe (in seconds)                                                                                                             | `3`                    |
| `agones.controller.healthCheck.failureThreshold`    | Number of times before giving up (in seconds)                                                                                                                 | `3`                    |
| `agones.controller.healthCheck.timeoutSeconds`      | Number of seconds after which the probe times out (in seconds)                                                                                                | `1`                    |
| `agones.controller.resources`                       | Controller resource requests/limit                                                                                                                            | `{}`                   |
| `agones.controller.generateTLS`                     | Set to true to generate TLS certificates or false to provide your own certificates in `certs/*`                                                               | `true`                 |
| `agones.ping.install`                               | ( ⚠️ release candidate feature ⚠️ ) Whether to install the [ping service][ping]                                                                               | `true`                 |
| `agones.ping.replicas`                              | ( ⚠️ release candidate feature ⚠️ ) The number of replicas to run in the deployment                                                                           | `2`                    |
| `agones.ping.http.expose`                           | ( ⚠️ release candidate feature ⚠️ ) Expose the http ping service via a Service                                                                                | `true`                 |
| `agones.ping.http.response`                         | ( ⚠️ release candidate feature ⚠️ ) The string response returned from the http service                                                                        | `ok`                   |
| `agones.ping.http.port`                             | ( ⚠️ release candidate feature ⚠️ ) The port to expose on the service                                                                                         | `80`                   |
| `agones.ping.http.serviceType`                      | ( ⚠️ release candidate feature ⚠️ ) The [Service Type][service] of the HTTP Service                                                                           | `LoadBalancer`         |
| `agones.ping.udp.expose`                            | ( ⚠️ release candidate feature ⚠️ ) Expose the udp ping service via a Service                                                                                 | `true`                 |
| `agones.ping.udp.rateLimit`                         | ( ⚠️ release candidate feature ⚠️ ) Number of UDP packets the ping service handles per instance, per second, per sender                                       | `20`                   |
| `agones.ping.udp.port`                              | ( ⚠️ release candidate feature ⚠️ ) The port to expose on the service                                                                                         | `80`                   |
| `agones.ping.udp.serviceType`                       | ( ⚠️ release candidate feature ⚠️ ) The [Service Type][service] of the UDP Service                                                                            | `LoadBalancer`         |
| `agones.ping.healthCheck.initialDelaySeconds`       | ( ⚠️ release candidate feature ⚠️ ) Initial delay before performing the first probe (in seconds)                                                              | `3`                    |
| `agones.ping.healthCheck.periodSeconds`             | ( ⚠️ release candidate feature ⚠️ ) Seconds between every liveness probe (in seconds)                                                                         | `3`                    |
| `agones.ping.healthCheck.failureThreshold`          | ( ⚠️ release candidate feature ⚠️ ) Number of times before giving up (in seconds)                                                                             | `3`                    |
| `agones.ping.healthCheck.timeoutSeconds`            | ( ⚠️ release candidate feature ⚠️ ) Number of seconds after which the probe times out (in seconds)                                                            | `1`                    |
| `gameservers.namespaces`                            | a list of namespaces you are planning to use to deploy game servers                                                                                           | `["default"]`          |
| `gameservers.minPort`                               | Minimum port to use for dynamic port allocation                                                                                                               | `7000`                 |
| `gameservers.maxPort`                               | Maximum port to use for dynamic port allocation                                                                                                               | `8000`                 |

[constraints]: https://kubernetes.io/docs/tasks/administer-cluster/manage-resources/cpu-constraint-namespace/
[ping]: ../../../docs/ping_service.md
[service]: https://kubernetes.io/docs/concepts/services-networking/service/

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release --namespace agones-system \
  --set agones.namespace=mynamespace,gameservers.minPort=1000,gameservers.maxPort=5000 agones
```

The above command sets the namespace where Agones is deployed to `mynamespace`. Additionally Agones will use a dynamic port allocation range of 1000-5000.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release --namespace agones-system -f values.yaml agones/agones
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## TLS Certificates

By default agones chart generates tls certificates used by the adminission controller, while this is handy, it requires the agones controller to restart on each `helm upgrade` command.
For most used cases the controller would have required a restart anyway (eg: controller image updated). However if you really need to avoid restarts we suggest that you turn off tls automatic generation (`agones.controller.generateTLS` to `false`) and provide your own certificates (`certs/server.crt`,`certs/server.key`).

> **Tip**: You can use our script located at `cert/cert.sh` to generates them.

## Confirm Agones is running

To confirm Agones is up and running, [go to the next section](../../README.md#confirming-agones-started-successfully)
