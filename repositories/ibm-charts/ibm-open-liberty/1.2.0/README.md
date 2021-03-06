# `@helm-charts/ibm-charts-ibm-open-liberty`

Open Liberty is an open source runtime for Java microservices and cloud-native apps.

| Field               | Value            |
| ------------------- | ---------------- |
| Repository Name     | ibm-charts       |
| Chart Name          | ibm-open-liberty |
| Chart Version       | 1.2.0            |
| NPM Package Version | 0.1.0            |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
###############################################################################
# Copyright (c) 2017 IBM Corp.
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
###############################################################################

###############################################################################
## Common image variables
###############################################################################
image:
  repository: open-liberty
  tag: latest
  pullPolicy: IfNotPresent

service:
  type: NodePort
  name: openliberty
  port: 9443
  targetPort: 9443

ssl:
  enabled: true
  useClusterSSLConfiguration: false
  createClusterSSLConfiguration: false

ingress:
  enabled: false
  secureBackends: true
  rewriteTarget: '/'
  path: '/openliberty'

###############################################################################
## Persistence Storage
###############################################################################

## Persistence is disabled by default, set Enabled: true to use
persistence:
  name: 'liberty-pvc'
  ## Tranlog requires a Persistence Storage volume size minimum of 1Gi
  size: '1Gi'

  useDynamicProvisioning: true

  ## Specify the name of the StorageClass
  ## Setting StorageClass: "" will use whatever storageClass is currently
  ## setup as the Default
  storageClassName: ''

  # if your not using dynamic provisioning, you can use selectors to
  # refine the binding process. You cannot specify a selector if your using dynamic provisioning!
  selector:
    label: ''
    value: ''

###############################################################################
## Logs
###############################################################################
logs:
  persistLogs: false
  persistTransactionLogs: false
  consoleFormat: json
  consoleLogLevel: info
  consoleSource: message,trace,accessLog,ffdc

###############################################################################
## MicroProfile
###############################################################################
microprofile:
  health:
    enabled: false

###############################################################################
## Auto scaling
###############################################################################
replicaCount: 1
autoscaling:
  enabled: false
  minReplicas: 1
  maxReplicas: 10
  targetCPUUtilizationPercentage: 50

###############################################################################
## Resource constraints
###############################################################################
resources:
  constraints:
    enabled: false
  requests:
    cpu: 500m
    memory: 512Mi
  limits:
    cpu: 500m
    memory: 512Mi

# Specify architecture (amd64, ppc64le, s390x) and weight to be  used for scheduling as follows :
#   0 - Do not use
#   1 - Least preferred
#   2 - No preference
#   3 - Most preferred
#arch:
#  amd64: "2 - No preference"
#  ppc64le: "2 - No preference"
#  s390x: "2 - No preference"

###############################################################################
## Environmental variables
###############################################################################
env:
  jvmArgs:
```

</details>

---

# Open Liberty Helm Chart

Open Liberty provides developers with proven Java EE 7 technology and the latest Eclipse MicroProfile??? capabilities for building microservices. Building cloud-native apps and microservices has never been more efficient, since you only have to run what you need. Our goal is to give you just enough to get the job done without getting in your way.

## Requirements

A persistent volume is required, if you plan on using the transaction service within Liberty. The `server.xml` Liberty configuration file must be configured to place the transaction log on this volume so that it persists, if the server fails and restarts.

## Accessing Open Liberty

From a browser, use http://*external-ip*:*nodeport* to access the application.

## Configuration

### Parameters

The Helm chart has the following values that can be overridden by using `--set name=value`. For example:

- `helm repo add ibm-charts https://raw.githubusercontent.com/IBM/charts/master/repo/stable/`
- `helm install --name open-liberty --set resources.constraints.enabled=true --set autoscaling.enabled=true --set autoscaling.minReplicas=2 ibm-charts/ibm-open-liberty --debug`

#### Common Parameters

| Qualifier      | Parameter                        | Definition                                                                                                                                                                                                                                                                                                                                               | Allowed Value                                                                                                                                                                                                                         |
| -------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `image`        | `pullPolicy`                     | Image Pull Policy.                                                                                                                                                                                                                                                                                                                                       | `Always`, `Never`, or `IfNotPresent`. Defaults to `Always` if the `:latest` tag is specified, or `IfNotPresent` otherwise. See Kubernetes - [Updating Images](https://kubernetes.io/docs/concepts/containers/images/#updating-images) |
|                | `repository`                     | Name of image, including repository prefix (if required).                                                                                                                                                                                                                                                                                                | See Docker - [Extended tag description](https://docs.docker.com/engine/reference/commandline/tag/#parent-command)                                                                                                                     |
|                | `tag`                            | Docker image tag.                                                                                                                                                                                                                                                                                                                                        | See Docker - [Tag](https://docs.docker.com/engine/reference/commandline/tag/)                                                                                                                                                         |
| `service`      | `name`                           | The name of the port service.                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                       |
|                | `type`                           | Specify type of service.                                                                                                                                                                                                                                                                                                                                 | Valid options are `ClusterIP` and `NodePort`. See [Publishing services - service types](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services---service-types)                                         |
|                | `port`                           | The port that this container exposes.                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                       |
|                | `targetPort`                     | Port that will be exposed externally by the pod.                                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                       |
| `ssl`          | `enabled`                        | Specifies whether SSL is enabled. Set to `true` if SSL will be enabled via the generated SSL configuration or if Liberty is configured to use SSL in the Docker image.                                                                                                                                                                                   | `true` (default) or `false`                                                                                                                                                                                                           |
|                | `useClusterSSLConfiguration`     | Set to `true` if you want to use the SSL ConfigMap and secrets generated by the `createClusterSSLConfiguration` option. Set to `false` if the Docker image already has SSL configured.                                                                                                                                                                   | `false` (default) or `true`                                                                                                                                                                                                           |
|                | `createClusterSSLConfiguration`  | Specifies whether to automatically generate SSL ConfigMap and secrets. The generated ConfigMap is: `liberty-config`. The generated secrets are: `mb-keystore`, `mb-keystore-password`, `mb-truststore`, and `mb-truststore-password`. Only generate the SSL configuration one time. If you generate the configuration a second time, errors might occur. | `false` (default) or `true`                                                                                                                                                                                                           |
| `ingress`      | `enabled`                        | Specifies whether to use Ingress.                                                                                                                                                                                                                                                                                                                        | `false` (default) or `true`                                                                                                                                                                                                           |
|                | `secureBackends`                 | By default, NGINX uses the HTTP protocol to reach the services. Turning on `secureBackends` changes the protocol to HTTPS.                                                                                                                                                                                                                               | `true` (default) or `false`                                                                                                                                                                                                           |
|                | `rewriteTarget`                  | Specifies the target URI where the traffic must be redirected.                                                                                                                                                                                                                                                                                           | See Kubernetes - Annotation `ingress.kubernetes.io/rewrite-target` - [Rewrite Target](https://github.com/kubernetes/ingress-nginx/tree/master/docs/examples/rewrite)                                                                  |
|                | `path`                           | Specifies the path for the Ingress HTTP rule.                                                                                                                                                                                                                                                                                                            | See Kubernetes - [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)                                                                                                                                          |
| `persistence`  | `name`                           | Descriptive name that will be used as prefix for the generated persistence volume claim. A volume is only bound if either `logs.persistTransactionLogs` or `logs.persistLogs` is set to `true`.                                                                                                                                                          |                                                                                                                                                                                                                                       |
|                | `useDynamicProvisioning`         | If `true`, the persistent volume claim will use the `storageClassName` to bind the volume. If `storageClassName` is not set then it will use the default StorageClass setup by kube Administrator. If `false`, the selector will be used for the binding process.                                                                                        | `true` (default) or `false`                                                                                                                                                                                                           |
|                | `storageClassName`               | Specifies a StorageClass pre-created by the Kubernetes sysadmin. When set to `""`, then the PVC is bound to the default StorageClass setup by kube Administrator.                                                                                                                                                                                        |                                                                                                                                                                                                                                       |
|                | `selector.label`                 | When matching a PV, the label is used to find a match on the key.                                                                                                                                                                                                                                                                                        | See Kubernetes - [Labels and Selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/).                                                                                                                   |  |
|                | `selector.value`                 | When matching a PV, the value is used to find a match on the values.                                                                                                                                                                                                                                                                                     | See Kubernetes - [Labels and Selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/).                                                                                                                   |  |
|                | `size`                           | Size of the volume to hold all the persisted data.                                                                                                                                                                                                                                                                                                       | Size in `Gi` (default is `1Gi`)                                                                                                                                                                                                       |
| `logs`         | `persistLogs`                    | When `true`, the server logs will be persisted to the volume bound according to the persistence parameters.                                                                                                                                                                                                                                              | `false` (default) or `true`                                                                                                                                                                                                           |
|                | `persistTransactionLogs`         | When `true`, the transaction logs will be persisted to the volume bound according to the persistence parameters.                                                                                                                                                                                                                                         | `false` (default) or `true`                                                                                                                                                                                                           |
|                | `consoleFormat`                  | _[18.0.0.1+]_ Specifies container log output format.                                                                                                                                                                                                                                                                                                     | `json` (default) or `basic`                                                                                                                                                                                                           |
|                | `consoleLogLevel`                | _[18.0.0.1+]_ Controls the granularity of messages that go to the container log.                                                                                                                                                                                                                                                                         | `info` (default), `audit`, `warning`, `error` or off                                                                                                                                                                                  |
|                | `consoleSource`                  | _[18.0.0.1+]_ Specifies the sources that are written to the container log. Use a comma separated list for multiple sources. This property only applies when `consoleFormat` is set to `json`.                                                                                                                                                            | `message`, `trace`, `accessLog`, `ffdc` (default)                                                                                                                                                                                     |
| `microprofile` | `health.enabled`                 | Specifies whether to use the [MicroProfile Health](https://microprofile.io/project/eclipse/microprofile-health) endpoint (`/health`) for readiness probe of the container.                                                                                                                                                                               | `false` (default) or `true`                                                                                                                                                                                                           |
| `replicaCount` |                                  | Describes the number of desired replica pods running at the same time.                                                                                                                                                                                                                                                                                   | Default is `1`. See [Replica Sets](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset)                                                                                                                              |
| `autoscaling`  | `enabled`                        | Specifies whether a horizontal pod autoscaler (HPA) is deployed. Note that enabling this field disables the `replicaCount` field.                                                                                                                                                                                                                        | `false` (default) or `true`                                                                                                                                                                                                           |
|                | `minReplicas`                    | Lower limit for the number of pods that can be set by the autoscaler.                                                                                                                                                                                                                                                                                    | Positive integer (default to `1`)                                                                                                                                                                                                     |
|                | `maxReplicas`                    | Upper limit for the number of pods that can be set by the autoscaler. Cannot be lower than `minReplicas`.                                                                                                                                                                                                                                                | Positive integer (default to `10`)                                                                                                                                                                                                    |
|                | `targetCPUUtilizationPercentage` | Target average CPU utilization (represented as a percentage of requested CPU) over all the pods.                                                                                                                                                                                                                                                         | Integer between `1` and `100` (default to `50`)                                                                                                                                                                                       |
| `resources`    | `constraints.enabled`            | Specifies whether the resource constraints specified in this Helm chart are enabled.                                                                                                                                                                                                                                                                     | `false` (default) or `true`                                                                                                                                                                                                           |
|                | `limits.cpu`                     | Describes the maximum amount of CPU allowed.                                                                                                                                                                                                                                                                                                             | Default is `500m`. See Kubernetes - [meaning of CPU](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-cpu)                                                                            |
|                | `limits.memory`                  | Describes the maximum amount of memory allowed.                                                                                                                                                                                                                                                                                                          | Default is `512Mi`. See Kubernetes - [meaning of Memory](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-memory)                                                                     |
|                | `requests.cpu`                   | Describes the minimum amount of CPU required. If not specified, the CPU amount will default to the limit (if specified) or the implementation-defined value.                                                                                                                                                                                             | Default is `500m`. See Kubernetes - [meaning of CPU](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-cpu)                                                                            |
|                | `requests.memory`                | Describes the minimum amount of memory required. If not specified, the memory amount will default to the limit (if specified) or the implementation-defined value.                                                                                                                                                                                       | Default is `512Mi`. See Kubernetes - [meaning of Memory](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-memory)                                                                     |
| `env`          | `jvmArgs`                        | Specifies the `JVM_ARGS` environmental variable for the Liberty runtime.                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                       |

### Configuring Open Liberty within IBM Cloud Private

#### Open Liberty Docker image requirements

The Helm chart requires the Docker image to have certain directories linked. The `open-liberty` image from Docker Hub will already have the expected links. If you are not using that image, you must add the following to your Dockerfile:

```shell
ENV PATH /opt/ol/wlp/bin:/opt/ol/docker/:$PATH
ENV LOG_DIR /logs
ENV WLP_OUTPUT_DIR /opt/ol/wlp/output

RUN mkdir /logs \
    && mkdir -p $WLP_OUTPUT_DIR/defaultServer \
    && ln -s $WLP_OUTPUT_DIR/defaultServer /output \
    && ln -s /opt/ol/wlp/usr/servers/defaultServer /config \
    && ln -s /logs $WLP_OUTPUT_DIR/defaultServer/logs
```

#### Transaction logs

If the server fails and restarts, then to persist the transaction logs (preserve them through server restarts) you must set `logs.persistTransactionLogs` to `true` and configure persistence in the Helm chart. You must also add the following to your `server.xml` in your Docker image.

```xml
<transaction recoverOnStartup="true" waitForRecovery="true" />
```

#### Persisting logs

Create a persistent volume (PV) in a shared storage, NFS for example, with the following specification:

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: <persistent volume name>
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  storageClassName: <optional - must match PVC>
  nfs:
    server: <NFS Server IP>
    path: <NFS PATH>
```

_Note:_ For NFS PATH you need to create your directory manually before deploying the persistent volume.

You can create a PV using the above template by executing:

```shell
kubectl create -f <yaml-file>
```

You can also create a PV from IBM Cloud Private UI by following these steps:

1. From the Dashboard panel, click Create resource.
2. Copy and paste the PV template.
3. Click Create.

#### Analyzing Liberty messages

Logging in JSON format is enabled by default. Log events are forwarded to Elasticsearch automatically. Use Kibana to monitor and analyze the log events. Sample Kibana dashboards are provided at the Helm chart's [additionalFiles](https://github.com/IBM/charts/tree/master/stable/ibm-open-liberty/additionalFiles/) folder.

#### SSL configuration

SSL is enabled by default. Only the secure port (`9443`) is exposed. Therefore, all applications must be accessed via HTTPS. It is highly recommended to set `createClusterSSLConfiguration` and `useClusterSSLConfiguration` to `true` to establish trust between applications.

The Helm chart by default requires the Liberty Docker image to have the `ssl-1.0` feature installed (default `open-liberty` Docker image includes `ssl-1.0`).

To turn off SSL:

1. Change `service.port` and `service.targetPort` to the non-secure port. (default is `9080`)
2. Set `ssl.enabled` to `false`.
3. If using Ingress, set `ingress.secureBackends` to `false`.

## More information

See [Open Liberty website](https://openliberty.io/) for configuration options for deploying the Open Liberty server.

## Service information

This Helm chart installs the open source product Open Liberty. Refer to the [Open Liberty website](https://openliberty.io/) to get service for Open Liberty.
