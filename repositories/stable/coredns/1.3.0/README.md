# `@helm-charts/stable-coredns`

CoreDNS is a DNS server that chains plugins and provides Kubernetes DNS Services

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | coredns |
| Chart Version       | 1.3.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for coredns.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: coredns/coredns
  tag: '1.4.0'
  pullPolicy: IfNotPresent

resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 100m
    memory: 128Mi

serviceType: 'ClusterIP'

service:
  # clusterIP: ""
  annotations:
    prometheus.io/scrape: 'true'
    prometheus.io/port: '9153'

serviceAccount:
  create: false
  # The name of the ServiceAccount to use
  # If not set and create is true, a name is generated using the fullname template
  name:

rbac:
  # If true, create & use RBAC resources
  create: true
  # If true, create and use PodSecurityPolicy
  pspEnable: false
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  # name:

# isClusterService specifies whether chart should be deployed as cluster-service or normal k8s app.
isClusterService: true

servers:
  - zones:
      - zone: .
    port: 53
    plugins:
      - name: cache
        parameters: 30
      - name: errors
      - name: health
      - name: kubernetes
        parameters: cluster.local
      - name: loadbalance
        parameters: round_robin
      - name: prometheus
        parameters: 0.0.0.0:9153
      - name: forward
        parameters: . /etc/resolv.conf

# Complete example with all the options:
# - zones:                 # the `zones` block can be left out entirely, defaults to "."
#   - zone: hello.world.   # optional, defaults to "."
#     scheme: tls://       # optional, defaults to "" (which equals "dns://" in CoreDNS)
#   port: 12345            # optional, defaults to "" (which equals 53 in CoreDNS)
#   plugins:               # the plugins to use for this server block
#   - name: kubernetes     # name of plugin, if used multiple times ensure that the plugin supports it!
#     parameters: foo bar  # list of parameters after the plugin
#     configBlock: |-      # if the plugin supports extra block style config, supply it here
#       hello world
#       foo bar

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

# Node labels for pod assignment
# Ref: https://kubernetes.io/docs/user-guide/node-selection/
nodeSelector: {}

# expects input structure as per specification https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/#toleration-v1-core
# for example:
#   tolerations:
#   - key: foo.bar.com/role
#     operator: Equal
#     value: master
#     effect: NoSchedule
tolerations: []

# configure custom zone files as per https://coredns.io/2017/05/08/custom-dns-entries-for-kubernetes/
zoneFiles: []
#  - filename: example.db
#    domain: example.com
#    contents: |
#      example.com.   IN SOA sns.dns.icann.com. noc.dns.icann.com. 2015082541 7200 3600 1209600 3600
#      example.com.   IN NS  b.iana-servers.net.
#      example.com.   IN NS  a.iana-servers.net.
#      example.com.   IN A   192.168.99.102
#      *.example.com. IN A   192.168.99.102
```

</details>

---

# CoreDNS

CoreDNS is a DNS server that chains plugins and provides DNS Services

## TL;DR;

```console
$ helm install --name coredns --namespace=kube-system stable/coredns
```

## Introduction

This chart bootstraps a [CoreDNS](https://github.com/coredns/coredns) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager. This chart will provide DNS Services and can be deployed in multiple configuration to support various scenarios listed below:

- CoreDNS as a cluster dns service and a drop-in replacement for Kube/SkyDNS. This is the default mode and CoreDNS is deployed as cluster-service in kube-system namespace. This mode is chosen by setting `isClusterService` to true.
- CoreDNS as an external dns service. In this mode CoreDNS is deployed as any kubernetes app in user specified namespace. The CoreDNS service can be exposed outside the cluster by using using either the NodePort or LoadBalancer type of service. This mode is chosen by setting `isClusterService` to false.
- CoreDNS as an external dns provider for kubernetes federation. This is a sub case of 'external dns service' which uses etcd plugin for CoreDNS backend. This deployment mode as a dependency on `etcd-operator` chart, which needs to be pre-installed.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled

## Installing the Chart

The chart can be installed as follows:

```console
$ helm install --name coredns --namespace=kube-system stable/coredns
```

The command deploys CoreDNS on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists various ways to override default configuration during deployment.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete coredns
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

See `values.yaml` for configuration notes. Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name coredns \
  --set rbac.create=false \
    stable/coredns
```

The above command disables automatic creation of RBAC rules.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name coredns -f values.yaml stable/coredns
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Caveats

The chart will automatically determine which protocols to listen on based on
the protocols you define in your zones. This means that you could potentially
use both "TCP" and "UDP" on a single port.
Some cloud environments like "GCE" or "Azure container service" cannot
create external loadbalancers with both "TCP" and "UDP" protocols. So
When deploying CoreDNS with `serviceType="LoadBalancer"` on such cloud
environments, make sure you do not attempt to use both protocols at the same
time.
