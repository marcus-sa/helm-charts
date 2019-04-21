# `@helm-charts/stable-cert-manager`

A Helm chart for cert-manager

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | stable       |
| Chart Name          | cert-manager |
| Chart Version       | v0.3.1       |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for cert-manager.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1

image:
  repository: quay.io/jetstack/cert-manager-controller
  tag: v0.3.0
  pullPolicy: IfNotPresent

createCustomResource: true

# Override the namespace used to store DNS provider credentials etc. for ClusterIssuer
# resources. By default, the same namespace as cert-manager is deployed within is
# used. This namespace will not be automatically created by the Helm chart.
clusterResourceNamespace: ''

leaderElection:
  # Override the namespace used to store the ConfigMap for leader election
  namespace: ''

certificateResourceShortNames: ['cert', 'certs']

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a service account should be created
  create: true
  # The name of the service account to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

# Optional additional arguments
extraArgs:
  []
  # Use this flag to set a namespace that cert-manager will use to store
  # supporting resources required for each ClusterIssuer (default is kube-system)
  # - --cluster-resource-namespace=kube-system

resources:
  {}
  # requests:
  #   cpu: 10m
  #   memory: 32Mi

podAnnotations: {}

podLabels: {}

nodeSelector: {}

ingressShim:
  {}
  # defaultIssuerName: ""
  # defaultIssuerKind: ""
  # defaultACMEChallengeType: ""
  # defaultACMEDNS01ChallengeProvider: ""

# This is used by the static manifest generator in order to create a static
# namespace manifest for the namespace that cert-manager is being installed
# within. It should **not** be used if you are using Helm for deployment.
createNamespaceResource: false
```

</details>

---

# cert-manager

cert-manager is a Kubernetes addon to automate the management and issuance of
TLS certificates from various issuing sources.

It will ensure certificates are valid and up to date periodically, and attempt
to renew certificates at an appropriate time before expiry.

## Prerequisites

- Kubernetes 1.7+

## Installing the Chart

Full installation instructions, including details on how to configure extra
functionality in cert-manager can be found in the [getting started docs](https://cert-manager.readthedocs.io/en/latest/getting-started/).

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/cert-manager
```

In order to begin issuing certificates, you will need to set up a ClusterIssuer
or Issuer resource (for example, by creating a 'letsencrypt-staging' issuer).

More information on the different types of issuers and how to configure them
can be found in our documentation:

https://cert-manager.readthedocs.io/en/latest/reference/issuers.html

For information on how to configure cert-manager to automatically provision
Certificates for Ingress resources, take a look at the `ingress-shim`
documentation:

https://cert-manager.readthedocs.io/en/latest/reference/ingress-shim.html

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the cert-manager chart and their default values.

| Parameter                                       | Description                                                                                                                   | Default                                    |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `image.repository`                              | Image repository                                                                                                              | `quay.io/jetstack/cert-manager-controller` |
| `image.tag`                                     | Image tag                                                                                                                     | `v0.3.0`                                   |
| `image.pullPolicy`                              | Image pull policy                                                                                                             | `IfNotPresent`                             |
| `replicaCount`                                  | Number of cert-manager replicas                                                                                               | `1`                                        |
| `createCustomResource`                          | Create CRD/TPR with this release                                                                                              | `true`                                     |
| `clusterResourceNamespace`                      | Override the namespace used to store DNS provider credentials etc. for ClusterIssuer resources                                | Same namespace as cert-manager pod         |
| `leaderElection.Namespace`                      | Override the namespace used to store the ConfigMap for leader election                                                        | Same namespace as cert-manager pod         |
| `certificateResourceShortNames`                 | Custom aliases for Certificate CRD                                                                                            | `["cert", "certs"]`                        |
| `extraArgs`                                     | Optional flags for cert-manager                                                                                               | `[]`                                       |
| `rbac.create`                                   | If `true`, create and use RBAC resources                                                                                      | `true`                                     |
| `serviceAccount.create`                         | If `true`, create a new service account                                                                                       | `true`                                     |
| `serviceAccount.name`                           | Service account to be used. If not set and `serviceAccount.create` is `true`, a name is generated using the fullname template | ``                                         |
| `resources`                                     | CPU/memory resource requests/limits                                                                                           | `requests: {cpu: 10m, memory: 32Mi}`       |
| `nodeSelector`                                  | Node labels for pod assignment                                                                                                | `{}`                                       |
| `affinity`                                      | Node affinity for pod assignment                                                                                              | `{}`                                       |
| `tolerations`                                   | Node tolerations for pod assignment                                                                                           | `[]`                                       |
| `ingressShim.defaultIssuerName`                 | Optional default issuer to use for ingress resources                                                                          |                                            |
| `ingressShim.defaultIssuerKind`                 | Optional default issuer kind to use for ingress resources                                                                     |                                            |
| `ingressShim.defaultACMEChallengeType`          | Optional default challenge type to use for ingresses using ACME issuers                                                       |                                            |
| `ingressShim.defaultACMEDNS01ChallengeProvider` | Optional default DNS01 challenge provider to use for ingresses using ACME issuers with DNS01                                  |                                            |
| `podAnnotations`                                | Annotations to add to the cert-manager pod                                                                                    | `{}`                                       |
| `podLabels`                                     | Labels to add to the cert-manager pod                                                                                         | `{}`                                       |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml .
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Contributing

This chart is maintained at [github.com/jetstack/cert-manager](https://github.com/jetstack/cert-manager/tree/master/contrib/charts/cert-manager).
