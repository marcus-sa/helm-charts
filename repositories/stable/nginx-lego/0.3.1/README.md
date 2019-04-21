# `@helm-charts/stable-nginx-lego`

Chart for nginx-ingress-controller and kube-lego

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | nginx-lego |
| Chart Version       | 0.3.1      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## nginx-lego spins up a scalable ingress provider that can also provision SSL certs
## See https://github.com/jetstack/kube-lego/tree/master/examples/nginx for more information on implementation

## Nginx configuration
## ref: https://github.com/kubernetes/contrib/tree/master/ingress/controllers/nginx#automated-certificate-management-with-kube-lego
##
nginx:
  replicaCount: 1
  image:
    repository: k8s.gcr.io/nginx-ingress-controller
    tag: '0.8.3'
    pullPolicy: IfNotPresent
  service:
    type: LoadBalancer
  monitoring: false
  resources:
    limits:
      cpu: 1
      memory: 2Gi
    requests:
      cpu: 1
      memory: 128Mi
  configmap:
    proxy_connect_timeout: '30'
    proxy_read_timeout: '600'
    proxy_send_imeout: '600'
    hsts_include_subdomains: 'false'
    body_size: '64m'
    server_name_hash_bucket_size: '256'
    # TODO: figure out how to expose `{nginx_addr}:8080/nginx_status`, on existing service or create new one?
    enable_vts_status: 'false'

## Default Backend configuration
## To run a different 404 page for the managed domains please see the documentation below
## ref: https://github.com/kubernetes/contrib/tree/master/404-server
##
default:
  replicaCount: 1
  image:
    repository: k8s.gcr.io/defaultbackend
    tag: '1.0'
    pullPolicy: IfNotPresent
  resources:
    limits:
      cpu: 1
      memory: 2Gi
    requests:
      cpu: 1
      memory: 128Mi

## kube-lego configuration
## ref: https://github.com/jetstack/kube-lego
##
lego:
  enabled: false
  replicaCount: 1
  image:
    repository: jetstack/kube-lego
    tag: '0.1.3'
    pullPolicy: IfNotPresent
  configmap:
    email: 'my@email.tld'
    # Production Let's Encrypt server
    # url: "https://acme-v01.api.letsencrypt.org/directory"
    # Test Let's Encrypt server
    url: 'https://acme-staging.api.letsencrypt.org/directory '
  resources:
    limits:
      cpu: 1
      memory: 2Gi
    requests:
      cpu: 1
      memory: 128Mi
```

</details>

---

# nginx-lego

**This chart has been deprecated as of version 0.2.1 and will not be updated. Please use the nginx-ingress and (optional) kube-lego charts instead.**

[nginx-lego](https://github.com/jetstack/kube-lego/tree/master/examples/nginx) is a chart for an [`nginx` ingress](https://github.com/kubernetes/contrib/tree/master/ingress/controllers/nginx) with optional support for automatically generating `SSL` cert for the managed routes.

To use this ingress contoller add the following annotations to the `ingress` resources you would like to route through it:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  namespace: foo
  annotations:
    # Add to route through the nginx service
    kubernetes.io/ingress.class: nginx
    # Add to generate certificates for this ingress
    kubernetes.io/tls-acme: 'true'
spec:
  tls:
    # With this configuration kube-lego will generate a secret in namespace foo called `example-tls`
    # for the URL `www.example.com`
    - hosts:
        - 'www.example.com'
      secretName: example-tls
```

## TL;DR;

```bash
$ helm install stable/kube-lego
```

## Introduction

This chart bootstraps an nginx-lego deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/nginx-lego
```

The command deploys nginx-lego on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

See `values.yaml` for configuration notes. Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set lego.enabled=false \
    stable/nginx-lego
```

Installs the chart without kube-lego and the ability to generate certs.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/nginx-lego
```

> **Tip**: You can use the default [values.yaml](values.yaml)
