# `@helm-charts/stable-opa`

Open source, general-purpose policy engine. Enforce fine-grained invariants over arbitrary Kubernetes resources.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | opa    |
| Chart Version       | 0.4.0  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for opa.
# -----------------------
#
# The 'opa' key embeds an OPA configuration file. See
# https://www.openpolicyagent.org/docs/configuration.html for more details.
opa:
  services:
    controller:
      url: 'https://www.openpolicyagent.org'
  bundle:
    service: controller
    name: 'helm-kubernetes-quickstart'
  default_decision: '/helm_kubernetes_quickstart/main'

# To enforce mutating policies, change to MutatingWebhookConfiguration.
admissionControllerKind: ValidatingWebhookConfiguration

# To _fail closed_ on failures, change to Fail. During initial testing, we
# recommend leaving the failure policy as Ignore.
admissionControllerFailurePolicy: Ignore

# To restrict the kinds of operations and resources that are subject to OPA
# policy checks, see the settings below. By default, all resources and
# operations are subject to OPA policy checks.
admissionControllerRules:
  - operations: ['*']
    apiGroups: ['*']
    apiVersions: ['*']
    resources: ['*']

# The helm Chart will automatically generate a CA and server certificate for
# the OPA. If you want to supply your own certificates, set the field below to
# false and add the PEM encoded CA certificate and server key pair below.
#
# WARNING: The common name name in the server certificate MUST match the
# hostname of the service that exposes the OPA to the apiserver. For example.
# if the service name is created in the "default" nanamespace with name "opa"
# the common name MUST be set to "opa.default.svc".
#
# If the common name is not set correctly, the apiserver will refuse to
# communicate with the OPA.
generateAdmissionControllerCerts: true
admissionControllerCA: ''
admissionControllerCert: ''
admissionControllerKey: ''

authz:
  # Disable if you don't want authorization.
  # Mostly useful for debugging.
  enabled: true

# Docker image and tag to deploy.
image: openpolicyagent/opa
imageTag: 0.10.5
imagePullPolicy: IfNotPresent

mgmt:
  enabled: true
  image: openpolicyagent/kube-mgmt
  imageTag: 0.8
  imagePullPolicy: IfNotPresent
  extraArgs: []
  configmapPolicies:
    enabled: false
    namespaces: [opa, kube-federation-scheduling-policy]
    requireLabel: true
  replicate:
    # NOTE IF you use these, remember to update the RBAC rules above to allow
    #      permissions to replicate these things
    cluster: []
    #     - [group/]version/resource
    namespace: []
    #     - [group/]version/resource
    path: kubernetes

# Number of OPA replicas to deploy. OPA maintains an eventually consistent
# cache of policies and data. If you want high availability you can deploy two
# or more replicas.
replicas: 1

# To control how the OPA is scheduled on the cluster, set the tolerations and
# nodeSelector values below. For example, to deploy OPA onto the master nodes:
#
# tolerations: [{key: "node-role.kubernetes.io/master", effect: NoSchedule, operator: Exists}]
# nodeSelector: {"kubernetes.io/role": "master"}
tolerations: []
nodeSelector: {}

# To control the CPU and memory resource limits and requests for OPA, set the
# field below.
resources: {}

rbac:
  # If true, create & use RBAC resources
  #
  create: true
  rules:
    cluster: []
    # - apiGroups:
    #     - ""
    #   resources:
    #   - namespaces
    #   verbs:
    #   - get
    #   - list
    #   - watch

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

# This proxy allows opa to make Kubernetes SubjectAccessReview checks against the
# Kubernetes API. You can get a rego function at github.com/open-policy-agent/library
sar:
  enabled: false
  image: lachlanevenson/k8s-kubectl
  imageTag: latest
  imagePullPolicy: IfNotPresent

# To control the liveness and readiness probes change the fields below.
readinessProbe:
  httpGet:
    path: /
    scheme: HTTPS
    port: 443
    initialDelaySeconds: 3
    periodSeconds: 5
livenessProbe:
  httpGet:
    path: /
    scheme: HTTPS
    port: 443
    initialDelaySeconds: 3
    periodSeconds: 5
```

</details>

---

# OPA

[OPA](https://www.openpolicyagent.org) is an open source general-purpose policy
engine designed for cloud-native environments.

## Prerequisites

- Kubernetes 1.9 (or newer) for validating and mutating webhook admission
  controller support.

## Overview

This helm chart installs OPA as a [Kubernetes admission
controller](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/).
Using OPA, you can enforce fine-grained invariants over arbitrary resources in
your Kubernetes cluster.

## Kick the tires

If you just want to see something run, install the chart without any
configuration.

```bash
helm install stable/opa
```

Once installed, the OPA will download a sample bundle from
https://www.openpolicyagent.org. The sample bundle contains a simple policy that
restricts the hostnames that can be specified on Ingress objects created in the
`opa-example` namespace. You can download the bundle and inspect it yourself:

```bash
mkdir example && cd example
curl -s -L https://www.openpolicyagent.org/bundles/kubernetes/admission | tar xzv
```

See the [NOTES.txt](./templates/NOTES.txt) file for examples of how to exercise
the admission controller.

## Configuration

All configuration settings are contained and described in
[values.yaml](values.yaml).

You should set the URL and credentials for the OPA to use to download policies.
The URL should identify an HTTP endpoint that implements the [OPA Bundle
API](https://www.openpolicyagent.org/docs/bundles.html).

- `opa.services.controller.url` specifies the base URL of the OPA control plane.

- `opa.services.controller.credentials.bearer.token` specifies a bearer token
  for the OPA to use to authenticate with the control plane.

For more information on OPA-specific configuration see the [OPA Configuration
Reference](https://www.openpolicyagent.org/docs/configuration.html).

| Parameter                          | Description                                              | Default                          |
| ---------------------------------- | -------------------------------------------------------- | -------------------------------- |
| `admissionControllerKind`          | Type of admission controller to install.                 | `ValidatingWebhookConfiguration` |
| `admissionControllerFailurePolicy` | Fail-open (`Ignore`) or fail-closed (`Fail`)?            | `Ignore`                         |
| `admissionControllerRules`         | Types of operations resources to check.                  | `*`                              |
| `generateAdmissionControllerCerts` | Auto-generate TLS certificates for admission controller. | `true`                           |
| `admissionControllerCA`            | Manually set admission controller certificate CA.        | Unset                            |
| `admissionControllerCert`          | Manually set admission controller certificate.           | Unset                            |
| `admissionControllerKey`           | Manually set admission controller key.                   | Unset                            |
| `image`                            | OPA image to deploy.                                     | `openpolicyagent/opa`            |
| `imageTag`                         | OPA image tag to deploy.                                 | See [values.yaml](values.yaml)   |
| `replicas`                         | Number of admission controller replicas to deploy.       | `1`                              |
| `tolerations`                      | List of node taint tolerations.                          | `[]`                             |
| `nodeSelector`                     | Node labels for pod assignment.                          | `{}`                             |
| `resources`                        | CPU and memory limits for OPA Pod.                       | `{}`                             |
| `readinessProbe`                   | HTTP readiness probe for OPA container.                  | See [values.yaml](values.yaml)   |
| `livenessProbe`                    | HTTP liveness probe for OPA container.                   | See [values.yaml](values.yaml)   |
| `opa`                              | OPA configuration.                                       | See [values.yaml](values.yaml)   |
