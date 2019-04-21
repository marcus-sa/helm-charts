# `@helm-charts/bitnami-external-dns`

ExternalDNS is a Kubernetes addon that configures public DNS servers with information about exposed Kubernetes services to make them discoverable.

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | bitnami      |
| Chart Name          | external-dns |
| Chart Version       | 1.3.2        |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Global Docker image registry
## Please, note that this will override the image registry for all the images, including dependencies, configured to use the global value
##
# global:
#   imageRegistry:

## Bitnami external-dns image version
## ref: https://hub.docker.com/r/bitnami/external-dns/tags/
##
image:
  registry: docker.io
  repository: bitnami/external-dns
  tag: 0.5.10
  ## Specify a imagePullPolicy
  ## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  ##
  pullPolicy: Always

  ## Optionally specify an array of imagePullSecrets.
  ## Secrets must be manually created in the namespace.
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  ##
  # pullSecrets:
  #   - myRegistrKeySecretName

  ## Set to true if you would like to see extra information on logs
  ## It turns BASH and NAMI debugging in minideb
  ## ref:  https://github.com/bitnami/minideb-extras/#turn-on-bash-debugging
  debug: false

## K8s resources type to be observed for new DNS entries by ExternalDNS
sources:
  - service
  - ingress

## DNS provider where the DNS records will be created. Available providers are:
## - aws, azure, cloudflare, google
# provider: aws

# Whether to publish DNS records for ClusterIP services or not (optional)
publishInternalServices: false

## Method to syncrhonise DNS records between sources and providers. Available methos are:
## - sync, upsert-only
policy: upsert-only

## Registry Type. Available types are: txt, noop
## ref: https://github.com/kubernetes-incubator/external-dns/blob/master/docs/proposal/registry.md
registry: 'txt'

## TXT Registry Identifier
txtOwnerId: 'default'
## Prefix to create a TXT record with a name following the pattern prefix.<CNAME record>
# txtPrefix: ""

## Verbosity of the ExternalDNS logs. Available values are:
## - panic, debug, info, warn, error, fatal
logLevel: info

## Limit possible target zones by domain suffixes (optional)
domainFilters: []
## Filter sources managed by external-dns via annotation using label selector semantics (optional)
# annotationFilter: ""

## Extra Arguments to passed to external-dns
extraArgs: {}
## Extra env. variable to set on external-dns container
extraEnv: {}

# AWS credentials to be set via arguments/env. variables
aws:
  secretKey: ''
  accessKey: ''
  roleArn: ''
  region: 'us-east-1'
  # Zone Filter. Available values are: public, private
  zoneType: ''

# Azure credentials to be set via arguments/env. variables
azure:
  resoureGroup: ''

# Cloudflare credentials to be set via env. variables
cloudflare:
  apiKey: ''
  email: ''

# GCE credentials to be set via arguments/env. variables
google:
  project: ''
  serviceAccountSecret: ''

## Kubernetes svc configutarion
##
service:
  ## Kubernetes svc type
  ##
  type: ClusterIP
  port: 7979
  ## Specify the nodePort value for the LoadBalancer and NodePort service types for the client port
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
  ##
  # nodePort:
  ## Provide any additional annotations which may be required. This can be used to
  ## set the LoadBalancer service type to internal only.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#internal-load-balancer
  ##
  annotations: {}
  ## Use loadBalancerIP to request a specific static IP,
  ## otherwise leave blank
  ##
  # loadBalancerIP:

## RBAC parameteres
## https://kubernetes.io/docs/reference/access-authn-authz/rbac/
##
rbac:
  create: false
  ## Service Account for pods
  ## https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
  ##
  serviceAccountName: default
  ## RBAC API version
  apiVersion: v1beta1

## Kubernetes Security Context
## https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
##
securityContext:
  enabled: true
  fsGroup: 1001
  runAsUser: 1001

## Node labels and tolerations for pod assignment
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#taints-and-tolerations-beta-feature
nodeSelector: {}
tolerations: []

## Annotations for external-dns pods
podAnnotations: {}

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources: {}
#  limits:
#    cpu: 50m
#    memory: 100Mi
#  requests:
#    memory: 50Mi
#    cpu: 10m

## Replica count
replicas: 1

## Configure extra options for liveness and readiness probes
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#configure-probes)
livenessProbe:
  enabled: true
  initialDelaySeconds: 10
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 2
  successThreshold: 1
readinessProbe:
  enabled: true
  initialDelaySeconds: 5
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1

metrics:
  enabled: false
  podAnnotations:
    prometheus.io/scrape: 'true'
    prometheus.io/port: '7979'
```

</details>

---

# external-dns

[ExternalDNS](https://github.com/kubernetes-incubator/external-dns) is a Kubernetes addon that configures public DNS servers with information about exposed Kubernetes services to make them discoverable.

## TL;DR;

```console
$ helm install bitnami/external-dns
```

## Introduction

This chart bootstraps a [ExternalDNS](https://github.com/bitnami/bitnami-docker-external-dns) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release bitnami/external-dns
```

The command deploys ExternalDNS on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the external-dns chart and their default values.

| Parameter                            | Description                                                                                          | Default                                                     |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `global.imageRegistry`               | Global Docker image registry                                                                         | `nil`                                                       |
| `image.registry`                     | ExternalDNS image registry                                                                           | `docker.io`                                                 |
| `image.repository`                   | ExternalDNS Image name                                                                               | `bitnami/external-dns`                                      |
| `image.tag`                          | ExternalDNS Image tag                                                                                | `{VERSION}`                                                 |
| `image.pullPolicy`                   | ExternalDNS image pull policy                                                                        | `Always`                                                    |
| `image.pullSecrets`                  | Specify docker-registry secret names as an array                                                     | `[]` (does not add image pull secrets to deployed pods)     |
| `image.debug`                        | Specify if debug values should be set                                                                | `false`                                                     |
| `sources`                            | List of resource types to be observed for new DNS entries by ExternalDNS                             | `[service, ingress]`                                        |
| `provider`                           | DNS provider where the DNS records will be created (mandatory). E.g.: aws, azure, google, ...        | `nil`                                                       |
| `publishInternalServices`            | Whether to publish DNS records for ClusterIP services or not                                         | `false`                                                     |
| `policy`                             | Method to synchronise DNS records between sources and providers (accepted values: sync, upsert-only) | `upsert-only`                                               |
| `registry`                           | Registry type (accepted values: txt, noop)                                                           | `txt`                                                       |
| `txtOwnerId`                         | TXT Registry Identifier                                                                              | `"default"`                                                 |
| `txtPrefix`                          | Prefix to create a TXT record with a name following the pattern prefix.<CNAME record>                | `nil`                                                       |
| `logLevel`                           | Verbosity of the ExternalDNS logs (accepted values: panic, debug, info, warn, error, fatal)          | `info`                                                      |
| `domainFilters`                      | Limit possible target zones by domain suffixes                                                       | `[]`                                                        |
| `annotationFilter`                   | Filter sources managed by external-dns via annotation using label selector semantics                 | `nil`                                                       |
| `extraArgs`                          | Extra Arguments to passed to external-dns                                                            | `{}`                                                        |
| `extraEnv`                           | Extra env. variable to set on external-dns container                                                 | `{}`                                                        |
| `aws.accessKey`                      | `AWS_ACCESS_KEY_ID` to set (only if provider == 'aws')                                               | `""`                                                        |
| `aws.secretKey`                      | `AWS_SECRET_ACCESS_KEY` to set (only if provider == 'aws')                                           | `""`                                                        |
| `aws.region`                         | `AWS_DEFAULT_REGION` to set (only if provider == 'aws')                                              | `us-east-1`                                                 |
| `aws.roleArn`                        | Use this `role_arn` if role credentials are used (only if provider == 'aws')                         | `""`                                                        |
| `aws.zoneType`                       | Filter for zones of this type (only if provider == 'aws', accepted values: public, private)          | `""`                                                        |
| `azure.resoureGroup`                 | Azure Resource Group (only if provider == 'azure')                                                   | `""`                                                        |
| `cloudflare.apiKey`                  | `CF_API_KEY` to set in the environment (only if provider == 'cloudflare')                            | `""`                                                        |
| `cloudflare.email`                   | `CF_API_EMAIL` to set in the environment (only if provider == 'cloudflare')                          | `""`                                                        |
| `google.project`                     | Google project (only if provider == 'google')                                                        | `""`                                                        |
| `google.serviceAccountSecret`        | Secret which contains credentials.json for Google (only if provider == 'google')                     | `""`                                                        |
| `service.type`                       | Kubernetes Service type                                                                              | `ClusterIP`                                                 |
| `service.port`                       | ExternalDNS client port                                                                              | `7979`                                                      |
| `service.nodePort`                   | Port to bind to for NodePort service type (client port)                                              | `nil`                                                       |
| `service.annotations`                | Annotations for ExternalDNS service                                                                  | {}                                                          |
| `service.loadBalancerIP`             | loadBalancerIP if ExternalDNS service type is `LoadBalancer`                                         | `nil`                                                       |
| `rbac.create`                        | Wether to create & use RBAC resources or not                                                         | `false`                                                     |
| `rbac.serviceAccountName`            | ServiceAccount (ignored if rbac.create == true)                                                      | `default`                                                   |
| `rbac.apiVersion`                    | Version of the RBAC API                                                                              | `v1beta1`                                                   |
| `securityContext.enabled`            | Enable security context                                                                              | `true`                                                      |
| `securityContext.fsGroup`            | Group ID for the container                                                                           | `1001`                                                      |
| `securityContext.runAsUser`          | User ID for the container                                                                            | `1001`                                                      |
| `nodeSelector`                       | Node labels for pod assignment                                                                       | `{}`                                                        |
| `tolerations`                        | Toleration labels for pod assignment                                                                 | `[]`                                                        |
| `podAnnotations`                     | Additional annotations to apply to the pod.                                                          | `{}`                                                        |
| `replicas`                           | Desired number of ExternalDNS replicas                                                               | `1`                                                         |
| `resources`                          | CPU/Memory resource requests/limits                                                                  | Memory: `256Mi`, CPU: `250m`                                |
| `livenessProbe.enabled`              | Turn on and off liveness probe                                                                       | `true`                                                      |
| `livenessProbe.initialDelaySeconds`  | Delay before liveness probe is initiated                                                             | 10                                                          |
| `livenessProbe.periodSeconds`        | How often to perform the probe                                                                       | 10                                                          |
| `livenessProbe.timeoutSeconds`       | When the probe times out                                                                             | 5                                                           |
| `livenessProbe.failureThreshold`     | Minimum consecutive failures for the probe to be considered failed after having succeeded.           | 2                                                           |
| `livenessProbe.successThreshold`     | Minimum consecutive successes for the probe to be considered successful after having failed          | 1                                                           |
| `readinessProbe.enabled`             | Turn on and off readiness probe                                                                      | `true`                                                      |
| `readinessProbe.initialDelaySeconds` | Delay before liveness probe is initiated                                                             | 5                                                           |
| `readinessProbe.periodSeconds`       | How often to perform the probe                                                                       | 10                                                          |
| `readinessProbe.timeoutSeconds`      | When the probe times out                                                                             | 5                                                           |
| `readinessProbe.failureThreshold`    | Minimum consecutive failures for the probe to be considered failed after having succeeded.           | 6                                                           |
| `readinessProbe.successThreshold`    | Minimum consecutive successes for the probe to be considered successful after having failed          | 1                                                           |
| `metrics.enabled`                    | Enable prometheus to access external-dns metrics endpoint                                            | `false`                                                     |
| `metrics.podAnnotations`             | Annotations for enabling prometheus to access the metrics endpoint                                   | {`prometheus.io/scrape: "true",prometheus.io/port: "7979"`} |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set auth.rootPassword=secretpassword bitnami/external-dns
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml bitnami/external-dns
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Tutorials

Find information about the requirements for each DNS provider on the link below:

- [ExternalDNS Tutorials](https://github.com/kubernetes-incubator/external-dns/tree/master/docs/tutorials)

For instance, to install ExternalDNS on AWS, you need to:

- Provide the K8s worker node which runs the cluster autoscaler with a minimum IAM policy (check [IAM permissions docs](https://github.com/kubernetes-incubator/external-dns/blob/master/docs/tutorials/aws.md#iam-permissions) for more information).
- Setup a hosted zone on Route53 and annotate the Hosted Zone ID and its associated "nameservers" as described on [these docs](https://github.com/kubernetes-incubator/external-dns/blob/master/docs/tutorials/aws.md#set-up-a-hosted-zone).
- Install ExternalDNS chart using the command below:

> Note: replace the placeholder HOSTED_ZONE_NAME with your hosted zoned name.

```bash
$ helm install --name my-release \
  --set provider=aws \
  --set aws.zoneType=public \
  --set domainFilters=HOSTED_ZONE_NAME \
  bitnami/external-dns
```

## Upgrading

### To 1.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 1.0.0. The following example assumes that the release name is external-dns:

```console
$ kubectl patch deployment externaldns --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
```
