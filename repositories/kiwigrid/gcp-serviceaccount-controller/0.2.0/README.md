# `@helm-charts/kiwigrid-gcp-serviceaccount-controller`

A Helm chart for a Kubernetes Controller to create secrets for GCP Service Accounts

| Field               | Value                         |
| ------------------- | ----------------------------- |
| Repository Name     | kiwigrid                      |
| Chart Name          | gcp-serviceaccount-controller |
| Chart Version       | 0.2.0                         |
| NPM Package Version | 0.1.0                         |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
replicaCount: 1

image:
  repository: kiwigrid/gcp-serviceaccount-controller
  tag: 0.2.1
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

gcpCredentials: ''
disableRestrictionCheck: false
service:
  type: ClusterIP
  port: 80

resources: {}
#  limits:
#    cpu: 100m
#    memory: 30Mi
#  requests:
#    cpu: 100m
#    memory: 20Mi

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# Gcp Service Account Controller

- **Source:** https://github.com/kiwigrid/gcp-serviceaccount-controller

[gcp-serviceaccount-controller](https://github.com/kiwigrid/gcp-serviceaccount-controller) The Gcp service account controller creates services accounts and handles the roles and the secrets for kubernetes.

## Introduction

This chart creates a kubernetes controller deployment on a Kubernetes cluster using the Helm package manager.

See also the docs for [service account mangement](https://cloud.google.com/iam/docs/creating-managing-service-accounts)
and [key management](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).

## Installing the Chart

Install from remote URL with the release name `gcp-account-controller` into namespace `infra`:

```console
$ helm upgrade -i gcp-account-controller kiwigrid/gcp-serviceaccount-controller --namespace infra \
    --set gcpCredentials="$(cat service-account.json | base64)"
```

## Uninstalling the Chart

To uninstall/delete the `my-release-name` deployment:

```console
$ helm delete my-release-name --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the GCP serviceaccount chart and their default values.

| Parameter         | Description                              | Default                                                                                                                                       |
| ----------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `image`           | gcp service account controller image     | `kiwigrid/gcp-serviceaccount-controller`                                                                                                      |
| `imageTag`        | gcp service account controller image tag | `24`                                                                                                                                          |
| `imagePullPolicy` | Image pull policy                        | `IfNotPresent`                                                                                                                                |
| `gcpCredentials`  | Service account key JSON file            | Should be provided and base64 encoded when no existing secret is used, in this case a new secret will be created holding this service account |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml kiwigrid/gcp-serviceaccount-controller
```

> **Tip**: You can use the default [values.yaml](values.yaml)
