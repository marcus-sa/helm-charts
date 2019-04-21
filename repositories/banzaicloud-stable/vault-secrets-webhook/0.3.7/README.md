# `@helm-charts/banzaicloud-stable-vault-secrets-webhook`

A Helm chart that deploys a mutating admission webhook that configures applications to request env vars from Vault Secrets

| Field               | Value                 |
| ------------------- | --------------------- |
| Repository Name     | banzaicloud-stable    |
| Chart Name          | vault-secrets-webhook |
| Chart Version       | 0.3.7                 |
| NPM Package Version | 0.1.0                 |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for spot-config-webhook.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

debug: false

image:
  repository: banzaicloud/vault-secrets-webhook
  tag: 0.4.12
  pullPolicy: IfNotPresent

service:
  name: vault-secrets-webhook
  type: ClusterIP
  externalPort: 443
  internalPort: 8443

env:
  VAULT_IMAGE: vault:latest
  VAULT_ENV_IMAGE: banzaicloud/vault-env:latest

resources: {}

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# Vault Secrets webhook

This chart will install a mutating admission webhook, that injects an executable to containers in a deployment/statefulset which than can request secrets from Vault through environment variable definitions.

## Installing the Chart

```bash
$ helm repo add banzaicloud-stable http://kubernetes-charts.banzaicloud.com/branch/master
$ helm repo update
```

The chart needs to be installed into it's own namespace to overcome recursive mutation issues, that namespace is ignored by the mutating webhook.
See: https://github.com/banzaicloud/banzai-charts/issues/595#issuecomment-452223465 for more information.

```bash
$ helm upgrade --namespace vswh --install vswh banzaicloud-stable/vault-secrets-webhook
```

## Configuration

The following tables lists configurable parameters of the vault-secrets-webhook chart and their default values.

| Parameter            | Description                                   | Default                           |
| -------------------- | --------------------------------------------- | --------------------------------- |
| affinity             | affinities to use                             | {}                                |
| debug                | debug logs for webhook                        | false                             |
| image.pullPolicy     | image pull policy                             | IfNotPresent                      |
| image.repository     | image repo that contains the admission server | banzaicloud/vault-secrets-webhook |
| image.tag            | image tag                                     | latest                            |
| nodeSelector         | node selector to use                          | {}                                |
| replicaCount         | number of replicas                            | 1                                 |
| resources            | resources to request                          | {}                                |
| service.externalPort | webhook service external port                 | 443                               |
| service.internalPort | webhook service external port                 | 443                               |
| service.name         | webhook service name                          | vault-secrets-webhook             |
| service.type         | webhook service type                          | ClusterIP                         |
| tolerations          | tolerations to add                            | []                                |
