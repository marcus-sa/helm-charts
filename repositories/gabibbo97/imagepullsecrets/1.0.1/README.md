# `@helm-charts/gabibbo97-imagepullsecrets`

Declarative configuration for imagepullsecrets

| Field               | Value            |
| ------------------- | ---------------- |
| Repository Name     | gabibbo97        |
| Chart Name          | imagepullsecrets |
| Chart Version       | 1.0.1            |
| NPM Package Version | 0.1.0            |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Sometimes Kubernetes bugs out parsing the JSON
# The solution is adding a auth: <base64 encode of user:pass> to the secret itself
# Set this to true to have this set automatically
addAuthField: true
# Populate this list with your own secrets
imagePullSecrets: []
# Simple username-password
# - registryURL: registry.k8s.example.com:5000
#   secretName: registry-pullsecret
#   username: testUser
#   password: testPassword

# Simple username-password with extra labels and/or annotations
# - registryURL: annotated.registry.k8s.example.com:5000
#   secretName: annotated-registry-pullsecret
#   annotations:
#     example.com/lorem: 'true'
#     example.com/ipsum: '1337'
#   labels:
#     is-private-registry: 'true'
#     is-annotated: 'ofcourseitis'
#   username: testUser
#   password: testPassword
```

</details>

---

# imagepullsecrets

Declarative configuration for imagepullsecrets

## Introduction

This Helm chart is a way to declaratively deploy imagepullsecrets to a Kubernetes cluster to use in a private registry context.

## TL;DR

```bash
helm install gabibbo97/imagepullsecrets \
  --set imagePullSecrets.registryURL=registry.k8s.example.com:5000 \
  --set imagePullSecrets.secretName=registry-pullsecret \
  --set imagePullSecrets.username=user \
  --set imagePullSecrets.password=password
```

## Configuration options

| Parameter                                 | Description                                                | Default |
| ----------------------------------------- | ---------------------------------------------------------- | :-----: |
| `addAuthField`                            | Add `auth: <base64 encode of user:pass>` to the secret     | `true`  |
| `imagePullSecrets[n].registryURL`         | URL of the `n-th` registry                                 |  `""`   |
| `imagePullSecrets[n].secretName`          | Name of the imagepullsecret object for the `n-th` registry |  `""`   |
| `imagePullSecrets[n].username`            | Username for the `n-th` registry                           |  `""`   |
| `imagePullSecrets[n].password`            | Password for the `n-th` registry                           |  `""`   |
| `imagePullSecrets[n].annotations.<<KEY>>` | Annotations to set on the secret for the `n-th` registry   |  `{}`   |
| `imagePullSecrets[n].labels.<<KEY>>`      | Labels to set on the secret for the `n-th` registry        |  `{}`   |

## Usage

After creating a secret `registry-pullsecret` you can use it in two ways

### On a Pod

On the `Pod`, set `spec.imagePullSecrets[0].name=registry-pullsecret`

```yaml
kind: Pod
...
spec:
  ...
  imagePullSecrets:
  - name: registry-pullsecret
  ...
```

### On a ServiceAccount

On the `ServiceAccount`, set `imagePullSecrets[0].name=registry-pullsecret`

```yaml
kind: ServiceAccount
---
imagePullSecrets:
  - name: registry-pullsecret
```

Then on pods that should consume that secret add `spec.serviceAccountName=my-service-account`

```yaml
kind: Pod
...
spec:
  ...
  serviceAccountName: my-service-account
  ...
```
