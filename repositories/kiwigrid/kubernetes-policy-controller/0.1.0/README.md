# `@helm-charts/kiwigrid-kubernetes-policy-controller`

A Helm chart for Kubernetes Policy Controller and the open policy agent to manage your cluster policies

| Field               | Value                        |
| ------------------- | ---------------------------- |
| Repository Name     | kiwigrid                     |
| Chart Name          | kubernetes-policy-controller |
| Chart Version       | 0.1.0                        |
| NPM Package Version | 0.1.0                        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for kubernetes-policy-controller.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  opa:
    repository: openpolicyagent/opa
    tag: 0.10.1
    pullPolicy: IfNotPresent
  kubeMgmt:
    repository: openpolicyagent/kube-mgmt
    tag: 0.6
    pullPolicy: IfNotPresent
  kubernetesPolicyController:
    repository: nikhilbh/kubernetes-policy-controller
    tag: 1.2
    pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

service:
  type: ClusterIP
  port: 443

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

# To enforce mutating policies, change to MutatingWebhookConfiguration, ValidatingWebhookConfiguration
admissionControllerKind: MutatingWebhookConfiguration
admissionControllerFailurePolicy: Ignore

generateAdmissionControllerCerts: true
admissionControllerCA: ''
admissionControllerCert: ''
admissionControllerKey: ''

admissionControllerRules:
  - operations: ['CREATE', 'UPDATE']
    apiGroups: ['*']
    apiVersions: ['*']
    resources: ['*']
```

</details>

---

# Kubernetes Policy Controller

- **Source:** https://github.com/open-policy-agent/kubernetes-policy-controller

## Introduction

This chart creates a Kubernetes Policy Controller deployment on a Kubernetes cluster using the Helm package manager.

See also the docs for [Kubernetes Policy Controller](https://github.com/open-policy-agent/kubernetes-policy-controller).

## Installing the Chart

Install from remote URL with the release name `kubernetes-policy-controller` into namespace `opa`:

```console
$ helm upgrade -i kubernetes-policy-controller kiwigrid/kubernetes-policy-controller --namespace opa
```

## Uninstalling the Chart

To uninstall/delete the `kubernetes-policy-controller` deployment:

```console
$ helm delete kubernetes-policy-controller --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the kubernetes policy chart controller and their default values.

| Parameter                                    | Description                                                                        | Default                                 |
| -------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------- |
| `opa.image`                                  | opa image                                                                          | `openpolicyagent/opa`                   |
| `opa.imageTag`                               | opa image tag                                                                      | `0.10.1`                                |
| `opa.imagePullPolicy`                        | Image pull policy                                                                  | `IfNotPresent`                          |
| `kubeMgmt.image`                             | kube mgmt image                                                                    | `openpolicyagent/kube-mgmt`             |
| `kubeMgmt.imageTag`                          | kube mgmt image tag                                                                | `0.6`                                   |
| `kubeMgmt.imagePullPolicy`                   | Image pull policy                                                                  | `IfNotPresent`                          |
| `kubernetesPolicyController.image`           | opa image                                                                          | `nikhilbh/kubernetes-policy-controller` |
| `kubernetesPolicyController.imageTag`        | gcp service account controller image tag                                           | `1.2`                                   |
| `kubernetesPolicyController.imagePullPolicy` | Image pull policy                                                                  | `IfNotPresent`                          |
| `admissionControllerKind`                    | admission controller kind                                                          | `MutatingWebhookConfiguration`          |
| `admissionControllerFailurePolicy`           | admission controller failure policy                                                | `Ignore`                                |
| `generateAdmissionControllerCerts`           | auto generate admission controller certs                                           | `true`                                  |
| `admissionControllerCA`                      | admission controller ca only used if generateAdmissionControllerCerts is `false`   |                                         |
| `admissionControllerCert`                    | admission controller cert only used if generateAdmissionControllerCerts is `false` |                                         |
| `admissionControllerKey`                     | admission controller key only used if generateAdmissionControllerCerts is `false`  |                                         |
| `admissionControllerRules`                   | admission controller rules                                                         |                                         |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml kiwigrid/kubernetes-policy-controller
```

> **Tip**: You can use the default [values.yaml](values.yaml)
