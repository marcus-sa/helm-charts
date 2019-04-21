# `@helm-charts/ibm-charts-ibm-datapower-dev`

IBM DataPower Gateway

| Field               | Value             |
| ------------------- | ----------------- |
| Repository Name     | ibm-charts        |
| Chart Name          | ibm-datapower-dev |
| Chart Version       | 2.0.0             |
| NPM Package Version | 0.1.0             |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for datapower.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
datapower:
  image:
    # before final checkin remove this comment and make repo and tag be release values
    repository: ibmcom/datapower
    tag: 7.7.0.2.298364
    pullPolicy: IfNotPresent
  resources:
    limits:
      cpu: 8
      memory: 64Gi
    requests:
      # cpu should agree with .Values.datapowerEnv.workerThreads
      cpu: 4
      memory: 8Gi
  env:
    # Should agree with .Values.requests.cpu if set. If not set or is 0 the env var will not be set.
    workerThreads: 4
  replicaCount: 1
  # Gateway MGMT variables
  # This value should either be 'enabled' or 'disabled'. Default is disabled
  webGuiManagementState: 'disabled'
  webGuiManagementPort: 9090
  webGuiManagementLocalAddress: 0.0.0.0
  # This value should either be 'enabled' or 'disabled'. Default is disabled
  gatewaySshState: 'disabled'
  gatewaySshPort: 9022
  gatewaySshLocalAddress: 0.0.0.0
  # This value should either be 'enabled' or 'disabled'. Default is disabled
  restManagementState: 'disabled'
  restManagementPort: 5554
  restManagementLocalAddress: 0.0.0.0
  # This value should either be 'enabled' or 'disabled'. Default is disabled
  xmlManagementState: 'disabled'
  xmlManagementLocalAddress: 0.0.0.0
  xmlManagementPort: 5550
service:
  name: datapower
  type: NodePort

# Patterns requires you to specify .Values.fronstsideKey
# and .Values.frontsideCert for HTTPS to be enabled. If left blank HTTP is used.
crypto:
  frontsideKey:
  frontsideCert:

#-----------------------------------------------------------------------------
# Pattern Section
#
# patternName selects the configuration options appropriate for the
# pattern you want to select - Options are 'RESTProxy' or 'none'
patternName: RESTProxy

#none:
# patternName "none" signifies no pattern was selected
# No config or services are set up when patternName is "none"

RESTProxy:
  backendURL: https://httpbin.org
  containerPort: 8443
```

</details>

---

# IBM DataPower Gateway

![IDG Logo](https://avatars1.githubusercontent.com/u/8836442?v=4&s=200)

[IBM® DataPower Gateway](http://www-03.ibm.com/software/products/en/datapower-gateway) is a purpose-built security and integration gateway that addresses the business needs for mobile, API, web, SOA, B2B, and cloud workloads. It is designed to provide a consistent configuration-based approach to security, governance, integration and routing.

## Introduction

This chart deploys a single IBM DataPower Gateway node with a default pattern into an IBM Cloud Private or other Kubernetes environment. The default pattern, the `RESTProxy` pattern, configures the DataPower node to act as a reverse proxy, directing client requests to the appropriate backend server.

## Installing the Chart

To install the chart with the release name `my-release` and default pattern (See .Values.patternName below):

```bash
$ helm install --name my-release -f <mycrypto.yaml> stable/ibm-datapower-dev
```

Where `<mycrypto.yaml>` is a yaml file that contains the parameters `crypto.frontsideCert` and `crypto.frontsideKey` and their respective base64-encoded values. These values are the base64-encoding of the raw key and certificate file with all whitespace removed.

> **Tip**: List all releases using `helm list`

## Verifying the Chart

See NOTES.txt associated with this chart for verification instructions

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

To completely uninstall/delete the `my-release` deployment:

```bash
$ helm delete --purge my-release
```

## Configuration

The helm chart has the following Values that can be overriden using the install `--set` parameter or by providing your own values file. For example:

`helm install --set image.repository=<myimage> stable/ibm-datapower-dev`

| Value                                 | Description                                | Default             |
| ------------------------------------- | ------------------------------------------ | ------------------- |
| `datapower.replicaCount`              | The replicaCount for the deployment        | 1                   |
| `datapower.image.repository`          | The image to use for this deployment       | ibmcom/datapower    |
| `datapower.image.tag`                 | The image tag to use for this deployment   | latest              |
| `datapower.image.pullPolicy`          | Determines when the image should be pulled | IfNotPresent        |
| `datapower.env.workerThreads`         | Number of DataPower worker threads         | 4                   |
| `datapower.resources.limits.cpu`      | Container CPU limit                        | 8                   |
| `datapower.resources.limits.memory`   | Container memory limit                     | 64Gi                |
| `datapower.resources.requests.cpu`    | Container CPU requested                    | 4                   |
| `datapower.resources.requests.memory` | Container Memory requested                 | 8Gi                 |
| `datapower.webGuiManagementState`     | WebGUI Management admin state              | disabled            |
| `datapower.webGuiManagementPort`      | WebGUI Management port                     | 9090                |
| `datapower.gatewaySshState`           | SSH admin state                            | disabled            |
| `datapower.gatewaySshPort`            | SSH Port                                   | 9022                |
| `datapower.restManagementState`       | REST Management admin state                | disabled            |
| `datapower.restManagementPort`        | REST Management port                       | 5554                |
| `datapower.xmlManagementState`        | XML Management admin state                 | disabled            |
| `datapower.xmlManagementPort`         | XML Management port                        | 5550                |
| `service.name`                        | Name to add to service                     | datapower           |
| `patternName`                         | The name of the datapower pattern to load  | RESTProxy           |
| `RESTProxy.backendURL`                | The backend URL datapower will proxy       | https://www.ibm.com |
| `RESTProxy.containerPort`             | The backend URL datapower will proxy       | 8443                |
| `crypto.frontsideCert`                | base64 encoded certificate                 | N/A                 |
| `crypto.frontsideKey`                 | base64 encoded key                         | N/A                 |

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/ibm-datapower-dev
```

The `patternName` specifies the configuration included with the deployment. Pattern-specific options are prefixed by the `patternName` in values.yaml.
The available patterns are:

- `RESTProxy` : Configures the DataPower Gateway as a proxy for RESTful services, the service is available over HTTP or HTTPS(if crypto parameters are set) at `RESTProxy.containerPort` and proxies to `RESTProxy.backendURL`.
- `none` : Does not include any configuration. You may only interact with the gateway using `kubectl attach`.

> **Tip**: You can use the default [values.yaml](values.yaml)

[View the official IBM DataPower Gateway for Developers Docker Image in Docker Hub](https://hub.docker.com/r/ibmcom/datapower/)

[View the IBM DataPower Gateway Product Page](http://www-03.ibm.com/software/products/en/datapower-gateway)

[View the IBM DataPower Gateway Documentation](https://www.ibm.com/support/knowledgecenter/SS9H2Y)

_Copyright© IBM Corporation 2017. All Rights Reserved._

_The IBM DataPower Gateway logo is copyright IBM and is provided for use for the purposes of IBM Cloud Private. You will not use the IBM DataPower Gateway logo in any way that would diminish the IBM or IBM DataPower Gateway image. IBM reserves the right to end your privilege to use the logo at any time in the future at our sole discretion. Any use of the IBM DataPower Gateway logo affirms that you agree to adhere to these conditions._
