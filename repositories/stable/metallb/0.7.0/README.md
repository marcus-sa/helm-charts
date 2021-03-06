# `@helm-charts/stable-metallb`

MetalLB is a load-balancer implementation for bare metal Kubernetes clusters

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | metallb |
| Chart Version       | 0.7.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for metallb.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

# To configure MetalLB, you must specify ONE of the following two
# options.

# existingConfigMap specifies the name of an externally-defined
# ConfigMap to use as the configuration. Helm will not manage the
# contents of this ConfigMap, it is your responsibility to create it.
existingConfigMap: metallb-config

# configInline specifies MetalLB's configuration directly, in yaml
# format. When configInline is used, Helm manages MetalLB's
# configuration ConfigMap as part of the release, and
# existingConfigMap is ignored.
#
# Refer to https://metallb.universe.tf/configuration/ for
# available options.
configInline:

rbac:
  # create specifies whether to install and use RBAC rules.
  create: true

prometheus:
  # scrape annotations specifies whether to add Prometheus metric
  # auto-collection annotations to pods. See
  # https://github.com/prometheus/prometheus/blob/release-2.1/documentation/examples/prometheus-kubernetes.yml
  # for a corresponding Prometheus configuration. Alternatively, you
  # may want to use the Prometheus Operator
  # (https://github.com/coreos/prometheus-operator) for more powerful
  # monitoring configuration. If you use the Prometheus operator, this
  # can be left at false.
  scrapeAnnotations: false

serviceAccounts:
  controller:
    # Specifies whether a ServiceAccount should be created
    create: true
    # The name of the ServiceAccount to use.  If not set and create is
    # true, a name is generated using the fullname template
    name: ''
  speaker:
    # Specifies whether a ServiceAccount should be created
    create: true
    # The name of the ServiceAccount to use.  If not set and create is
    # true, a name is generated using the fullname template
    name: ''

# controller contains configuration specific to the MetalLB cluster
# controller.
controller:
  image:
    repository: metallb/controller
    tag: v0.6.2
    pullPolicy: IfNotPresent
  resources:
    {}
    # limits:
    # cpu: 100m
    # memory: 100Mi
  nodeSelector: {}
  tolerations: []
  affinity: {}

# speaker contains configuration specific to the MetalLB speaker
# daemonset.
speaker:
  image:
    repository: metallb/speaker
    tag: v0.6.2
    pullPolicy: IfNotPresent
  resources:
    {}
    # limits:
    # cpu: 100m
    # memory: 100Mi
  nodeSelector: {}
  tolerations: []
  affinity: {}
```

</details>

---

## MetalLB

MetalLB is a load-balancer implementation for bare metal [Kubernetes][k8s-home]
clusters, using standard routing protocols.

## TL;DR;

```console
$ helm install --name metallb stable/metallb
```

## Introduction

This chart bootstraps a [MetalLB][metallb-home] installation on
a [Kubernetes][k8s-home] cluster using the [Helm][helm-home] package manager.
This chart provides an implementation for LoadBalancer Service objects.

MetalLB is a cluster service, and as such can only be deployed as a
cluster singleton. Running multiple installations of MetalLB in a
single cluster is not supported.

## Prerequisites

- Kubernetes 1.9+

## Installing the Chart

The chart can be installed as follows:

```console
$ helm install --name metallb stable/metallb
```

The command deploys MetalLB on the Kubernetes cluster. This chart does
not provide a default configuration; MetalLB will not act on your
Kubernetes Services until you provide
one. The [configuration](#configuration) section lists various ways to
provide this configuration.

## Uninstalling the Chart

To uninstall/delete the `metallb` deployment:

```console
$ helm delete metallb
```

The command removes all the Kubernetes components associated with the
chart, but will not remove the release metadata from `helm` ??? this will prevent
you, for example, if you later try to create a release also named `metallb`). To
fully delete the release and release history, simply [include the `--purge`
flag][helm-usage]:

```console
$ helm delete --purge metallb
```

## Configuration

See `values.yaml` for configuration notes. Specify each parameter
using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name metallb \
  --set rbac.create=false \
    stable/metallb
```

The above command disables the use of RBAC rules.

Alternatively, a YAML file that specifies the values for the above
parameters can be provided while installing the chart. For example,

```console
$ helm install --name metallb -f values.yaml stable/metallb
```

By default, this chart does not install a configuration for MetalLB, and simply
warns you that you must follow [the configuration instructions on MetalLB's
website][metallb-config] to create an appropriate ConfigMap.

For simple setups that only use MetalLB's [ARP mode][metallb-arpndp-concepts],
you can specify a single IP range using the `arpAddresses` parameter to have the
chart install a working configuration for you:

```console
$ helm install --name metallb \
  --set arpAddresses=192.168.16.240/30 \
  stable/metallb
```

If you have a more complex configuration and want Helm to manage it for you, you
can provide it in the `config` parameter. The configuration format is
[documented on MetalLB's website][metallb-config].

```console
$ cat values.yaml
config:
  peers:
  - peer-address: 10.0.0.1
    peer-asn: 64512
    my-asn: 64512
  address-pools:
  - name: default
    protocol: bgp
    cidr:
    - 198.51.100.0/24

$ helm install --name metallb -f values.yaml stable/metallb
```

[helm-home]: https://helm.sh
[helm-usage]: https://docs.helm.sh/using_helm/
[k8s-home]: https://kubernetes.io
[metallb-arpndp-concepts]: https://metallb.universe.tf/concepts/arp-ndp/
[metallb-config]: https://metallb.universe.tf/configuration/
[metallb-home]: https://metallb.universe.tf
