# `@helm-charts/stable-cert-manager`

A Helm chart for cert-manager

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | stable       |
| Chart Name          | cert-manager |
| Chart Version       | v0.6.6       |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for cert-manager.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
global:
  ## Reference to one or more secrets to be used when pulling images
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  ##
  imagePullSecrets: []
  # - name: "image-pull-secret"

  # Optional priority class to be used for the cert-manager pods
  priorityClassName: ''

replicaCount: 1

strategy:
  {}
  # type: RollingUpdate
  # rollingUpdate:
  #   maxSurge: 0
  #   maxUnavailable: 1

image:
  repository: quay.io/jetstack/cert-manager-controller
  tag: v0.6.2
  pullPolicy: IfNotPresent

# Override the namespace used to store DNS provider credentials etc. for ClusterIssuer
# resources. By default, the same namespace as cert-manager is deployed within is
# used. This namespace will not be automatically created by the Helm chart.
clusterResourceNamespace: ''

leaderElection:
  # Override the namespace used to store the ConfigMap for leader election
  namespace: ''

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

extraEnv: []
# - name: SOME_VAR
#   value: 'some value'

resources:
  {}
  # requests:
  #   cpu: 10m
  #   memory: 32Mi

# Pod Security Context
# ref: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
securityContext:
  enabled: false
  fsGroup: 1001
  runAsUser: 1001

podAnnotations: {}

podLabels: {}
# Optional DNS settings, useful if you have a public and private DNS zone for
# the same domain on Route 53. What follows is an example of ensuring
# cert-manager can access an ingress or DNS TXT records at all times.
# NOTE: This requires Kubernetes 1.10 or `CustomPodDNS` feature gate enabled for
# the cluster to work.
# podDnsPolicy: "None"
# podDnsConfig:
#   nameservers:
#     - "1.1.1.1"
#     - "8.8.8.8"

nodeSelector: {}

ingressShim:
  {}
  # defaultIssuerName: ""
  # defaultIssuerKind: ""
  # defaultACMEChallengeType: ""
  # defaultACMEDNS01ChallengeProvider: ""

webhook:
  enabled: true

# Use these variables to configure the HTTP_PROXY environment variables
# http_proxy: "http://proxy:8080"
# http_proxy: "http://proxy:8080"
# no_proxy: 127.0.0.1,localhost

# expects input structure as per specification https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/#affinity-v1-core
# for example:
#   affinity:
#     nodeAffinity:
#      requiredDuringSchedulingIgnoredDuringExecution:
#        nodeSelectorTerms:
#        - matchExpressions:
#          - key: foo.bar.com/role
#            operator: In
#            values:
#            - master
affinity: {}

# expects input structure as per specification https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/#toleration-v1-core
# for example:
#   tolerations:
#   - key: foo.bar.com/role
#     operator: Equal
#     value: master
#     effect: NoSchedule
tolerations: []
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
## IMPORTANT: you MUST install the cert-manager CRDs **before** installing the
## cert-manager Helm chart
$ kubectl apply \
    -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.6/deploy/manifests/00-crds.yaml

##??IMPORTANT: if you are deploying into a namespace that **already exists**,
## you MUST ensure the namespace has an additional label on it in order for
## the deployment to succeed
$ kubectl label namespace <deployment-namespace> certmanager.k8s.io/disable-validation="true"

## Install the cert-manager helm chart
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

## Upgrading the Chart

Special considerations may be required when upgrading the Helm chart, and these
are documented in our full [upgrading guide](https://cert-manager.readthedocs.io/en/latest/admin/upgrading/index.html).
Please check here before perform upgrades!

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the cert-manager chart and their default values.

| Parameter                                       | Description                                                                                                                              | Default                                    |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `global.imagePullSecrets`                       | Reference to one or more secrets to be used when pulling images                                                                          | `[]`                                       |
| `image.repository`                              | Image repository                                                                                                                         | `quay.io/jetstack/cert-manager-controller` |
| `image.tag`                                     | Image tag                                                                                                                                | `v0.6.2`                                   |
| `image.pullPolicy`                              | Image pull policy                                                                                                                        | `IfNotPresent`                             |
| `replicaCount`                                  | Number of cert-manager replicas                                                                                                          | `1`                                        |
| `clusterResourceNamespace`                      | Override the namespace used to store DNS provider credentials etc. for ClusterIssuer resources                                           | Same namespace as cert-manager pod         |
| `leaderElection.Namespace`                      | Override the namespace used to store the ConfigMap for leader election                                                                   | Same namespace as cert-manager pod         |
| `extraArgs`                                     | Optional flags for cert-manager                                                                                                          | `[]`                                       |
| `extraEnv`                                      | Optional environment variables for cert-manager                                                                                          | `[]`                                       |
| `rbac.create`                                   | If `true`, create and use RBAC resources                                                                                                 | `true`                                     |
| `serviceAccount.create`                         | If `true`, create a new service account                                                                                                  | `true`                                     |
| `serviceAccount.name`                           | Service account to be used. If not set and `serviceAccount.create` is `true`, a name is generated using the fullname template            |                                            |
| `resources`                                     | CPU/memory resource requests/limits                                                                                                      |                                            |
| `securityContext.enabled`                       | Enable security context                                                                                                                  | `false`                                    |
| `securityContext.fsGroup`                       | Group ID for the container                                                                                                               | `1001`                                     |
| `securityContext.runAsUser`                     | User ID for the container                                                                                                                | `1001`                                     |
| `nodeSelector`                                  | Node labels for pod assignment                                                                                                           | `{}`                                       |
| `affinity`                                      | Node affinity for pod assignment                                                                                                         | `{}`                                       |
| `tolerations`                                   | Node tolerations for pod assignment                                                                                                      | `[]`                                       |
| `ingressShim.defaultIssuerName`                 | Optional default issuer to use for ingress resources                                                                                     |                                            |
| `ingressShim.defaultIssuerKind`                 | Optional default issuer kind to use for ingress resources                                                                                |                                            |
| `ingressShim.defaultACMEChallengeType`          | Optional default challenge type to use for ingresses using ACME issuers                                                                  |                                            |
| `ingressShim.defaultACMEDNS01ChallengeProvider` | Optional default DNS01 challenge provider to use for ingresses using ACME issuers with DNS01                                             |                                            |
| `podAnnotations`                                | Annotations to add to the cert-manager pod                                                                                               | `{}`                                       |
| `podDnsPolicy`                                  | Optional cert-manager pod [DNS policy](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pods-dns-policy)         |                                            |
| `podDnsConfig`                                  | Optional cert-manager pod [DNS configurations](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pods-dns-config) |                                            |
| `podLabels`                                     | Labels to add to the cert-manager pod                                                                                                    | `{}`                                       |
| `priorityClassName`                             | Priority class name for cert-manager and webhook pods                                                                                    | `""`                                       |
| `http_proxy`                                    | Value of the `HTTP_PROXY` environment variable in the cert-manager pod                                                                   |                                            |
| `https_proxy`                                   | Value of the `HTTPS_PROXY` environment variable in the cert-manager pod                                                                  |                                            |
| `no_proxy`                                      | Value of the `NO_PROXY` environment variable in the cert-manager pod                                                                     |                                            |
| `webhook.enabled`                               | Toggles whether the validating webhook component should be installed                                                                     | `true`                                     |
| `webhook.replicaCount`                          | Number of cert-manager webhook replicas                                                                                                  | `1`                                        |
| `webhook.podAnnotations`                        | Annotations to add to the webhook pods                                                                                                   | `{}`                                       |
| `webhook.extraArgs`                             | Optional flags for cert-manager webhook component                                                                                        | `[]`                                       |
| `webhook.resources`                             | CPU/memory resource requests/limits for the webhook pods                                                                                 |                                            |
| `webhook.image.repository`                      | Webhook image repository                                                                                                                 | `quay.io/jetstack/cert-manager-webhook`    |
| `webhook.image.tag`                             | Webhook image tag                                                                                                                        | `v0.6.2`                                   |
| `webhook.image.pullPolicy`                      | Webhook image pull policy                                                                                                                | `IfNotPresent`                             |
| `webhook.caSyncImage.repository`                | CA sync image repository                                                                                                                 | `quay.io/munnerz/apiextensions-ca-helper`  |
| `webhook.caSyncImage.tag`                       | CA sync image tag                                                                                                                        | `v0.1.0`                                   |
| `webhook.caSyncImage.pullPolicy`                | CA sync image pull policy                                                                                                                | `IfNotPresent`                             |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml .
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Contributing

This chart is maintained at [github.com/jetstack/cert-manager](https://github.com/jetstack/cert-manager/tree/master/deploy/charts/cert-manager).
