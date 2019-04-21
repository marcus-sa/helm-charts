# `@helm-charts/bitnami-consul`

Highly available and distributed service discovery and key-value store designed with support for the modern data center to make distributed systems and configuration easy.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | bitnami |
| Chart Name          | consul  |
| Chart Version       | 1.1.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami Consul image version
## ref: https://hub.docker.com/r/bitnami/consul/tags/
##
image:
  registry: docker.io
  repository: bitnami/consul
  tag: 1.0.6
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

## Consul replicas
replicas: 3

## Consul service ports
httpPort: 8500
rpcPort: 8400
serflanPort: 8301
serverPort: 8300
consulDnsPort: 8600
uiPort: 80

## Datacenter name for consul. If not supplied, will use the consul
## default 'dc1'
datacenterName: dc1

## Predefined value for gossip key.
## The key must be 16-bytes, can be generated with $(consul keygen)
# gossipKey: 887Syd/BOvbtvRAKviazMg==

## Use TLS to verify the authenticity of servers and clients.
## Check README for more information.
# tlsEncryptionSecretName: your-already-created-secret

## Extra configuration that will be added to the default one.
#localConfig: |-
#  {
#    "key": "value"
#  }

## Consul domain name.
domain: consul

## Consul raft multiplier.
raftMultiplier: '1'

## Consul data Persistent Volume Storage Class
## If defined, storageClassName: <storageClass>
## If set to "-", storageClassName: "", which disables dynamic provisioning
## If undefined (the default) or set to null, no storageClassName spec is
##   set, choosing the default provisioner.  (gp2 on AWS, standard on
##   GKE, AWS & OpenStack)
##
persistence:
  enabled: true
  # storageClass: "-"
  accessModes:
    - ReadWriteOnce
  size: 8Gi
  annotations: {}

resources: {}
#  requests:
#    memory: 256Mi
#    cpu: 100m

## Setting maxUnavailable will create a pod disruption budget that will prevent
## voluntarty cluster administration from taking down too many consul pods. If
## you set maxUnavailable, you should set it to ceil((n/2) - 1), where
## n = Replicas. For example, if you have 5 or 6 Replicas, you'll want to set
## maxUnavailable = 2. If you are using the default of 3 Replicas, you'll want
## to set maxUnavailable to 1.
maxUnavailable: 1

## nodeAffinity settings
# nodeAffinity:
#   requiredDuringSchedulingIgnoredDuringExecution:
#     nodeSelectorTerms:
#     - matchExpressions:
#       - key: cloud.google.com/gke-preemptible
#         operator: NotIn
#         values:
#         - true

## Anti-Affinity setting. The default "hard" will use pod anti-affinity that is
## requiredDuringSchedulingIgnoredDuringExecution to ensure 2 services don't
## end up on the same node. Setting this to "soft" will use
## preferredDuringSchedulingIgnoredDuringExecution. If set to anything else,
## no anti-affinity rules will be configured.
antiAffinity: 'soft'

## Create dedicated UI service
##
ui:
  service:
    enabled: true
    type: 'ClusterIP'

  ## Configure the ingress resource that allows you to access the
  ## Consul user interface. Set up the URL
  ## ref: http://kubernetes.io/docs/user-guide/ingress/
  ##
  ingress:
    ## Set to true to enable ingress record generation
    enabled: false

    ## The list of hostnames to be covered with this ingress record.
    ## Most likely this will be just one host, but in the event more hosts are needed, this is an array
    hosts:
      - name: consul-ui.local

        ## Set this to true in order to enable TLS on the ingress record
        ## A side effect of this will be that the backend consul service will be connected at port 443
        tls: false

        ## If TLS is set to true, you must declare what secret will store the key/certificate for TLS
        tlsSecret: consul-ui.local-tls

        ## Ingress annotations done as key:value pairs
        ## If you're using kube-lego, you will want to add:
        ## kubernetes.io/tls-acme: true
        ##
        ## For a full list of possible ingress annotations, please see
        ## ref: https://github.com/kubernetes/ingress-nginx/blob/master/docs/annotations.md
        ##
        ## If tls is set to true, annotation ingress.kubernetes.io/secure-backends: "true" will automatically be set
        annotations:
        #  kubernetes.io/ingress.class: nginx
        #  kubernetes.io/tls-acme: true
    secrets:
    ## If you're providing your own certificates, please use this to add the certificates as secrets
    ## key and certificate should start with -----BEGIN CERTIFICATE----- or
    ## -----BEGIN RSA PRIVATE KEY-----
    ##
    ## name should line up with a tlsSecret set further up
    ## If you're using kube-lego, this is unneeded, as it will create the secret for you if it is not set
    ##
    ## It is also possible to create and manage the certificates outside of this helm chart
    ## Please see README.md for more information
    # - name: consul-ui.local-tls
    #   key:
    #   certificate:

## Consul configmap
#configmap: |
#    {
#    "datacenter":"dc2",
#    "domain":"consul",
#    "data_dir":"/opt/bitnami/consul/data",
#    "pid_file":"/opt/bitnami/consul/tmp/consul.pid",
#    "server":true,
#    "ui":false,
#    "bootstrap_expect":3,
#    "addresses": {
#        "http":"0.0.0.0"
#    },
#    "ports": {
#        "http":8500,
#        "dns":8600,
#        "serf_lan":8301,
#        "server":8300
#    },
#    "serf_lan":"0.0.0.0"
#    }

metrics:
  enabled: false
  image:
    registry: docker.io
    repository: prom/consul-exporter
    tag: v0.3.0
    pullPolicy: IfNotPresent
  resources: {}
  annotations: {}

## Node selector
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
nodeSelector: {'beta.kubernetes.io/arch': 'amd64'}

## Configure extra options for liveness and readiness probes
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#configure-probes)
livenessProbe:
  enabled: true
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1

readinessProbe:
  enabled: true
  initialDelaySeconds: 5
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1
```

</details>

---

# Consul Helm Chart

[Consul](https://www.consul.io/) has multiple components, but as a whole, it is a tool for discovering and configuring services in your infrastructure

## TL;DR

```console
$ helm repo add bitnami https://charts.bitnami.com/incubator
$ helm install bitnami/consul
```

## Introduction

This chart bootstraps a [Consul](https://github.com/bitnami/bitnami-docker-consul) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release bitnami/consul
```

The command deploys Consul on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release. Remove also the chart using `--purge` option:

```console
$ helm delete --purge my-release
```

## Configuration

The following tables lists the configurable parameters of the Consul chart and their default values.

| Parameter                            | Description                                                                                  | Default                                     |
| ------------------------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `image.registry`                     | Consul image registry                                                                        | `docker.io`                                 |
| `image.repository`                   | Consul image name                                                                            | `bitnami/consul`                            |
| `image.tag`                          | Consul image tag                                                                             | `{VERSION}`                                 |
| `image.pullPolicy`                   | Image pull policy                                                                            | `Always`                                    |
| `image.pullSecrets`                  | Specify image pull secrets                                                                   | `nil`                                       |
| `replicas`                           | Number of replicas                                                                           | `3`                                         |
| `httpPort`                           | Consul http listening port                                                                   | `8500`                                      |
| `rpcPort`                            | Consul rpc listening port                                                                    | `8400`                                      |
| `serflanPort`                        | Container serf lan listening port                                                            | `8301`                                      |
| `serverPort`                         | Container server listening port                                                              | `8300`                                      |
| `consulDnsPort`                      | Container dns listening port                                                                 | `8600`                                      |
| `uiPort`                             | Consul UI port                                                                               | `80`                                        |
| `datacenterName`                     | Consul datacenter name                                                                       | `dc1`                                       |
| `gossipKey`                          | Gossip key for all members                                                                   | `nil`                                       |
| `domain`                             | Consul domain                                                                                | `consul`                                    |
| `clientAddress`                      | Address in which Consul will bind client interfaces                                          | `0.0.0.0`                                   |
| `serflanAddress`                     | Address used for Serf LAN communications                                                     | `0.0.0.0`                                   |
| `raftMultiplier`                     | Multiplier used to scale key Raft timing parameters                                          | `10Gi`                                      |
| `persistence.enabled`                | Use a PVC to persist data                                                                    | `true`                                      |
| `persistence.storageClass`           | Storage class of backing PVC                                                                 | `nil` (uses alpha storage class annotation) |
| `persistence.accessMode`             | Use volume as ReadOnly or ReadWrite                                                          | `ReadWriteOnce`                             |
| `persistence.size`                   | Size of data volume                                                                          | `8Gi`                                       |
| `persistence.annotations`            | Annotations for the persistent volume                                                        | `nil`                                       |
| `resources`                          | Container resource requests and limits                                                       | `{}`                                        |
| `maxUnavailable`                     | Pod disruption Budget maxUnavailable                                                         | `1`                                         |
| `nodeAffinity`                       | Consul pod node-affinity setting                                                             | `nil`                                       |
| `antiAffinity`                       | Consul pod anti-affinity setting                                                             | `soft`                                      |
| `ui.service.enabled`                 | Use a service to access Consul Ui                                                            | `true`                                      |
| `ui.service.type`                    | Kubernetes Service Type                                                                      | `ClusterIP`                                 |
| `ui.ingress.enabled`                 | Enable ingress controller resource                                                           | `false`                                     |
| `ui.ingress.hosts[0].name`           | Hostname to your Consul installation                                                         | `consul-ui.local`                           |
| `ui.ingress.hosts[0].path`           | Path within the url structure                                                                | `/`                                         |
| `ui.ingress.hosts[0].tls`            | Utilize TLS backend in ingress                                                               | `false`                                     |
| `ui.ingress.hosts[0].tlsSecret`      | TLS Secret (certificates)                                                                    | `consul-ui.local-tls`                       |
| `ui.ingress.hosts[0].annotations`    | Annotations for this host's ingress record                                                   | `[]`                                        |
| `ui.ingress.secrets[0].name`         | TLS Secret Name                                                                              | `nil`                                       |
| `ui.ingress.secrets[0].certificate`  | TLS Secret Certificate                                                                       | `nil`                                       |
| `ui.ingress.secrets[0].key`          | TLS Secret Key                                                                               | `nil`                                       |
| `configmap`                          | Consul configuration to be injected as ConfigMap                                             | `nil`                                       |
| `metrics.enabled`                    | Start a side-car prometheus exporter                                                         | `false`                                     |
| `metrics.image`                      | Exporter image                                                                               | `prom/consul-exporter`                      |
| `metrics.imageTag`                   | Exporter image tag                                                                           | `v0.3.0`                                    |
| `metrics.imagePullPolicy`            | Exporter image pull policy                                                                   | `IfNotPresent`                              |
| `metrics.resources`                  | Exporter resource requests/limit                                                             | `{}`                                        |
| `metrics.annotations`                | Exporter annotations                                                                         | `{}`                                        |
| `nodeSelector`                       | Node labels for pod assignment                                                               | `{}`                                        |
| `livenessProbe.initialDelaySeconds`  | Delay before liveness probe is initiated                                                     | 30                                          |
| `livenessProbe.periodSeconds`        | How often to perform the probe                                                               | 10                                          |
| `livenessProbe.timeoutSeconds`       | When the probe times out                                                                     | 5                                           |
| `livenessProbe.successThreshold`     | Minimum consecutive successes for the probe to be considered successful after having failed. | 1                                           |
| `livenessProbe.failureThreshold`     | Minimum consecutive failures for the probe to be considered failed after having succeeded.   | 6                                           |
| `readinessProbe.initialDelaySeconds` | Delay before readiness probe is initiated                                                    | 5                                           |
| `readinessProbe.periodSeconds`       | How often to perform the probe                                                               | 10                                          |
| `readinessProbe.timeoutSeconds`      | When the probe times out                                                                     | 5                                           |
| `readinessProbe.successThreshold`    | Minimum consecutive successes for the probe to be considered successful after having failed. | 1                                           |
| `readinessProbe.failureThreshold`    | Minimum consecutive failures for the probe to be considered failed after having succeeded.   | 6                                           |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release --set domain=consul-domain,gossipKey=secretkey bitnami/consul
```

The above command sets the Consul domain to `consul-domain` and sets the gossip key to `secretkey`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml bitnami/consul
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami Consul](https://github.com/bitnami/bitnami-docker-consul) image stores the Consul data at the `/bitnami` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Ingress

This chart provides support for ingress resources. If you have an
ingress controller installed on your cluster, such as [nginx-ingress](https://kubeapps.com/charts/stable/nginx-ingress)
or [traefik](https://kubeapps.com/charts/stable/traefik) you can utilize
the ingress controller to service your Consul UI application.

To enable ingress integration, please set `ingress.enabled` to `true`

### Hosts

Most likely you will only want to have one hostname that maps to this
Consul installation, however it is possible to have more than one
host. To facilitate this, the `ingress.hosts` object is an array.

For each item, please indicate a `name`, `tls`, `tlsSecret`, and any
`annotations` that you may want the ingress controller to know about.

Indicating TLS will cause Consul to generate HTTPS urls, and
Consul will be connected to at port 443. The actual secret that
`tlsSecret` references does not have to be generated by this chart.
However, please note that if TLS is enabled, the ingress record will not
work until this secret exists.

For annotations, please see [this document](https://github.com/kubernetes/ingress-nginx/blob/master/docs/annotations.md).
Not all annotations are supported by all ingress controllers, but this
document does a good job of indicating which annotation is supported by
many popular ingress controllers.

### TLS Secrets

This chart will facilitate the creation of TLS secrets for use with the
ingress controller, however this is not required. There are three
common use cases:

- helm generates / manages certificate secrets
- user generates / manages certificates separately
- an additional tool (like [kube-lego](https://kubeapps.com/charts/stable/kube-lego))
  manages the secrets for the application

In the first two cases, one will need a certificate and a key. We would
expect them to look like this:

- certificate files should look like (and there can be more than one
  certificate if there is a certificate chain)

```
-----BEGIN CERTIFICATE-----
MIID6TCCAtGgAwIBAgIJAIaCwivkeB5EMA0GCSqGSIb3DQEBCwUAMFYxCzAJBgNV
...
jScrvkiBO65F46KioCL9h5tDvomdU1aqpI/CBzhvZn1c0ZTf87tGQR8NK7v7
-----END CERTIFICATE-----
```

- keys should look like:

```
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAvLYcyu8f3skuRyUgeeNpeDvYBCDcgq+LsWap6zbX5f8oLqp4
...
wrj2wDbCDCFmfqnSJ+dKI3vFLlEz44sAV8jX/kd4Y6ZTQhlLbYc=
-----END RSA PRIVATE KEY-----
```

If you are going to use helm to manage the certificates, please copy
these values into the `certificate` and `key` values for a given
`ingress.secrets` entry.

If you are going to manage TLS secrets outside of helm, please
know that you can create a TLS secret by doing the following:

```
kubectl create secret tls consul.local-tls --key /path/to/key.key --cert /path/to/cert.crt
```

Please see [this example](https://github.com/kubernetes/contrib/tree/master/ingress/controllers/nginx/examples/tls)
for more information.

## Enable TLS encryption between servers

You must manually create a secret containing your PEM-encoded certificate authority, your PEM-encoded certificate, and your PEM-encoded private key.

```
kubectl create secret generic consul-tls-encryption \
  --from-file=ca.pem \
  --from-file=consul.pem \
  --from-file=consul-key.pem
```

> Take into account that you will need to create a config map with the proper configuration.

If the secret is specified, the chart will locate those files at `/opt/bitnami/consul/certs/`, so you will want to use the below snippet to configure Consul TLS encryption in your config map:

```
  "ca_file": "/opt/bitnami/consul/certs/ca.pem",
  "cert_file": "/opt/bitnami/consul/certs/consul.pem",
  "key_file": "/opt/bitnami/consul/certs/consul-key.pem",
  "verify_incoming": true,
  "verify_outgoing": true,
  "verify_server_hostname": true,
```

After creating the secret, you can install the helm chart specyfing the secret name:

```
helm install bitnami/consul --set tlsEncryptionSecretName=consul-tls-encryption
```

## Metrics

The chart can optionally start a metrics exporter endpoint on port `9107` for [prometheus](https://prometheus.io). The data exposed by the endpoint is intended to be consumed by a prometheus chart deployed within the cluster and as such the endpoint is not exposed outside the cluster.
