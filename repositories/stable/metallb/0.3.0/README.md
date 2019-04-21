# `@helm-charts/stable-metallb`

MetalLB is a load-balancer implementation for bare metal Kubernetes clusters

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | metallb |
| Chart Version       | 0.3.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for metallb.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

# config is the MetalLB configuration, in YAML format. Refer to
# https://metallb.universe.tf/configuration/ for available options.
config:

# When arpAddresses is specified instead of config, the chart will
# install a trivial "quick start" MetalLB configuration that uses ARP
# mode. Refer to https://metallb.universe.tf/ for more
# information. For production configurations, use of the `config`
# field is recommended instead of arpAddresses.
arpAddresses:

rbac:
  # create specifies whether to install and use RBAC rules.
  create: true

prometheus:
  # scrape annotations specifies whether to add Prometheus metric
  # auto-collection annotations to pods. See
  # https://github.com/prometheus/prometheus/blob/release-2.1/documentation/examples/prometheus-kubernetes.yml
  # for a corresponding Prometheus configuration.  Alternatively, you
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
    name:
  speaker:
    # Specifies whether a ServiceAccount should be created
    create: true
    # The name of the ServiceAccount to use.  If not set and create is
    # true, a name is generated using the fullname template
    name:

# controller contains configuration specific to the MetalLB cluster
# controller.
controller:
  image:
    repository: metallb/controller
    tag: v0.5.0
    pullPolicy: IfNotPresent
  resources:
    # limits:
    # cpu: 100m
    # memory: 100Mi

# controller contains configuration specific to the MetalLB speaker
# daemonset.
speaker:
  image:
    repository: metallb/speaker
    tag: v0.5.0
    pullPolicy: IfNotPresent
  resources:
    # limits:
    # cpu: 100m
    # memory: 100Mi
```

</details>

---

## MetalLB

MetalLB is a load-balancer implementation for bare
metal [Kubernetes](https://kubernetes.io) clusters, using standard
routing protocols.

## TL;DR;

```console
$ helm install --name metallb stable/metallb
```

## Introduction

This chart bootstraps a [MetalLB](https://metallb.universe.tf)
installation on a [Kubernetes](http://kubernetes.io) cluster using
the [Helm](https://helm.sh) package manager. This chart provides an
implementation for LoadBalancer Service objects.

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
not provide a default configuration, MetalLB will not act on your
Kubernetes Services until you provide
one. The [configuration](#configuration) section lists various ways to
provide this configuration.

## Uninstalling the Chart

To uninstall/delete the `metallb` deployment:

```console
$ helm delete metallb
```

The command removes all the Kubernetes components associated with the
chart and deletes the release.

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

By default, this chart does not install a configuration for MetalLB,
and simply warns you that you must
follow
[the configuration instructions on MetalLB's website](https://metallb.universe.tf/configuration/) to
create an appropriate ConfigMap.

For simple setups that only use
MetalLB's [ARP mode](https://metallb.universe.tf/concepts/arp-ndp/),
you can specify a single IP range using the `arpAddresses` parameter
to have the chart install a working configuration for you:

```console
$ helm install --name metallb \
  --set arpAddresses=192.168.16.240/30 \
  stable/metallb
```

If you have a more complex configuration and want Helm to manage it
for you, you can provide it in the `config` parameter. The
configuration format
is
[documented on MetalLB's website](https://metallb.universe.tf/configuration/).

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
