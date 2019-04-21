# `@helm-charts/incubator-fluentd-cloudwatch`

A Fluentd CloudWatch Helm chart for Kubernetes.

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | incubator          |
| Chart Name          | fluentd-cloudwatch |
| Chart Version       | 0.1.2              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image: fluent/fluentd-kubernetes-daemonset
imageTag: v0.12.33-cloudwatch

## Specify an imagePullPolicy (Required)
## It's recommended to change this to 'Always' if the image tag is 'latest'
## ref: http://kubernetes.io/docs/user-guide/images/#updating-images
imagePullPolicy: IfNotPresent

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  limits:
    cpu: 100m
    memory: 200Mi
  requests:
    cpu: 100m
    memory: 200Mi

# hostNetwork: false

annotations: {}

awsRegion: us-east-1
logGroupName: kubernetes

fluentdConfig: |
  <match fluent.**>
    type null
  </match>

  <source>
    type tail
    path /var/log/containers/*.log
    pos_file /var/log/fluentd-containers.log.pos
    time_format %Y-%m-%dT%H:%M:%S.%NZ
    tag kubernetes.*
    format json
    read_from_head true
  </source>

  <source>
    type tail
    format /^(?<time>[^ ]* [^ ,]*)[^\[]*\[[^\]]*\]\[(?<severity>[^ \]]*) *\] (?<message>.*)$/
    time_format %Y-%m-%d %H:%M:%S
    path /var/log/salt/minion
    pos_file /var/log/fluentd-salt.pos
    tag salt
  </source>

  <source>
    type tail
    format syslog
    path /var/log/startupscript.log
    pos_file /var/log/fluentd-startupscript.log.pos
    tag startupscript
  </source>

  <source>
    type tail
    format /^time="(?<time>[^)]*)" level=(?<severity>[^ ]*) msg="(?<message>[^"]*)"( err="(?<error>[^"]*)")?( statusCode=($<status_code>\d+))?/
    path /var/log/docker.log
    pos_file /var/log/fluentd-docker.log.pos
    tag docker
  </source>

  <source>
    type tail
    format none
    path /var/log/etcd.log
    pos_file /var/log/fluentd-etcd.log.pos
    tag etcd
  </source>

  <source>
    type tail
    format kubernetes
    multiline_flush_interval 5s
    path /var/log/kubelet.log
    pos_file /var/log/fluentd-kubelet.log.pos
    tag kubelet
  </source>

  <source>
    type tail
    format kubernetes
    multiline_flush_interval 5s
    path /var/log/kube-proxy.log
    pos_file /var/log/fluentd-kube-proxy.log.pos
    tag kube-proxy
  </source>

  <source>
    type tail
    format kubernetes
    multiline_flush_interval 5s
    path /var/log/kube-apiserver.log
    pos_file /var/log/fluentd-kube-apiserver.log.pos
    tag kube-apiserver
  </source>

  <source>
    type tail
    format kubernetes
    multiline_flush_interval 5s
    path /var/log/kube-controller-manager.log
    pos_file /var/log/fluentd-kube-controller-manager.log.pos
    tag kube-controller-manager
  </source>

  <source>
    type tail
    format kubernetes
    multiline_flush_interval 5s
    path /var/log/kube-scheduler.log
    pos_file /var/log/fluentd-kube-scheduler.log.pos
    tag kube-scheduler
  </source>

  <source>
    type tail
    format kubernetes
    multiline_flush_interval 5s
    path /var/log/rescheduler.log
    pos_file /var/log/fluentd-rescheduler.log.pos
    tag rescheduler
  </source>

  <source>
    type tail
    format kubernetes
    multiline_flush_interval 5s
    path /var/log/glbc.log
    pos_file /var/log/fluentd-glbc.log.pos
    tag glbc
  </source>

  <source>
    type tail
    format kubernetes
    multiline_flush_interval 5s
    path /var/log/cluster-autoscaler.log
    pos_file /var/log/fluentd-cluster-autoscaler.log.pos
    tag cluster-autoscaler
  </source>

  <filter kubernetes.**>
    type kubernetes_metadata
  </filter>

  <match **>
    type cloudwatch_logs
    log_group_name "#{ENV['LOG_GROUP_NAME']}"
    auto_create_stream true
    use_tag_as_stream true
  </match>
```

</details>

---

# Fluentd CloudWatch

- Installs [Fluentd](https://www.fluentd.org/) [Cloudwatch](https://aws.amazon.com/cloudwatch/) log forwarder.

## TL;DR;

```console
$ helm install incubator/fluentd-cloudwatch
```

## Introduction

This chart bootstraps a [Fluentd](https://www.fluentd.org/) [Cloudwatch](https://aws.amazon.com/cloudwatch/) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ # edit secrets/aws_access_key_id and secrets/aws_access_key_id with the key/password of a AWS user with a policy to access  Cloudwatch
$ helm install --name my-release incubator/fluentd-cloudwatch
```

The command deploys Fluentd Cloudwatch on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Fluentd Cloudwatch chart and their default values.

| Parameter                       | Description              | Default                                     |
| ------------------------------- | ------------------------ | ------------------------------------------- |
| `image`                         | Image                    | `fluent/fluentd-kubernetes-daemonset`       |
| `imageTag`                      | Image tag                | `v0.12.33-cloudwatch`                       |
| `imagePullPolicy`               | Image pull policy        | `Always` if `imageTag` is `imagePullPolicy` |
| `resources.limits.cpu`          | CPU limit                | `100m`                                      |
| `resources.limits.memory`       | Memory limit             | `200Mi`                                     |
| `resources.requests.cpu`        | CPU request              | `100m`                                      |
| `resources.requests.memory`     | Memory request           | `200Mi`                                     |
| `hostNetwork`                   | Host network             | `false`                                     |
| `annotations` (removed for now) | Annotations              | `nil`                                       |
| `awsRegion`                     | AWS Cloudwatch region    | `us-east-1`                                 |
| `fluentdConfig`                 | Fluentd configuration    | `example configuration`                     |
| `logGroupName`                  | AWS Cloudwatch log group | `kubernetes`                                |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set awsRegion=us-east-1 \
    incubator/fluentd-cloudwatch
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml incubator/fluentd-cloudwatch
```
