# `@helm-charts/appscode-searchlight`

Searchlight by AppsCode - Alerts for Kubernetes

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | appscode    |
| Chart Name          | searchlight |
| Chart Version       | 0.3.0       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for searchlight.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

operator:
  image: appscode/searchlight
  tag: 5.0.0

ido:
  image: appscode/postgres
  tag: 9.5-alpine

icinga:
  image: appscode/icinga
  tag: 5.0.0-k8s

## Optionally specify an array of imagePullSecrets.
## Secrets must be manually created in the namespace.
## ref: https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod
##
# imagePullSecrets:

#   - name: myRegistryKeySecretName
## Specify a imagePullPolicy
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}

## Log level for proxy
logLevel: 3

## Icinga configaration
## https://github.com/appscode/searchlight/blob/master/docs/icinga2/deployment.md#create-deployment
icinga2web:
  password: changeit

notifier:
  hipchat:
    authToken: ''
  mailgun:
    domain: ''
    apiKey: ''
    publicAPIKey: ''
    from: ''
  smtp:
    host: ''
    port: ''
    insecureSkipVerify: ''
    username: ''
    password: ''
    from: ''
  twilio:
    accountSid: ''
    authToken: ''
    from: ''
  slack:
    authToken: ''
    channel: ''
  plivo:
    authId: ''
    authToken: ''
    from: ''

## Installs Searchlight operator as critical addon
## https://kubernetes.io/docs/tasks/administer-cluster/guaranteed-scheduling-critical-addon-pods/
criticalAddon: false

## Install Default RBAC roles and bindings
rbac:
  ## If true, create & use RBAC resources
  create: false
  ## Ignored if rbac.create is true
  serviceAccountName: default
```

</details>

---

# Searchlight

[Searchlight by AppsCode](https://github.com/appscode/searchlight) is an alert manager for Kubernetes built around Icinga2.

## TL;DR;

```bash
$ helm install stable/searchlight
```

## Introduction

This chart bootstraps a [Searchlight controller](https://github.com/appscode/searchlight) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.7+

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/searchlight
```

The command deploys Searchlight controller on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release`:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Searchlight chart and their default values.

| Parameter                 | Description                                                       | Default                                                  |
| ------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------- |
| `operator.image`          | operator container image                                          | `appscode/searchlight`                                   |
| `operator.tag`            | operator image tag                                                | `5.0.0`                                                  |
| `icinga.image`            | icinga container image                                            | `appscode/icinga`                                        |
| `icinga.tag`              | icinga container image tag                                        | `5.0.0-k8s`                                              |
| `ido.image`               | ido container image                                               | `appscode/postgress`                                     |
| `ido.tag`                 | ido container image tag                                           | `9.5-alpine`                                             |
| `imagePullSecrets`        | Specify image pull secrets                                        | `nil` (does not add image pull secrets to deployed pods) |
| `imagePullPolicy`         | Image pull policy                                                 | `IfNotPresent`                                           |
| `criticalAddon`           | If true, installs Searchlight operator as critical addon          | `false`                                                  |
| `logLevel`                | Log level for operator                                            | `3`                                                      |
| `nodeSelector`            | Node labels for pod assignment                                    | `{}`                                                     |
| `rbac.create`             | install required rbac service account, roles and rolebindings     | `false`                                                  |
| `rbac.serviceAccountName` | ServiceAccount Searchlight will use (ignored if rbac.create=true) | `default`                                                |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install --name my-release --set image.tag=v0.2.1 stable/searchlight
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install --name my-release --values values.yaml stable/searchlight
```

## RBAC

By default the chart will not install the recommended RBAC roles and rolebindings.

You need to have the flag `--authorization-mode=RBAC` on the api server. See the following document for how to enable [RBAC](https://kubernetes.io/docs/admin/authorization/rbac/).

To determine if your cluster supports RBAC, run the the following command:

```console
$ kubectl api-versions | grep rbac
```

If the output contains "beta", you may install the chart with RBAC enabled (see below).

### Enable RBAC role/rolebinding creation

To enable the creation of RBAC resources (On clusters with RBAC). Do the following:

```console
$ helm install --name my-release stable/searchlight --set rbac.create=true
```
