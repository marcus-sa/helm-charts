# `@helm-charts/incubator-aws-alb-ingress-controller`

A Helm chart for AWS ALB Ingress Controller

| Field               | Value                      |
| ------------------- | -------------------------- |
| Repository Name     | incubator                  |
| Chart Name          | aws-alb-ingress-controller |
| Chart Version       | 0.1.7                      |
| NPM Package Version | 0.1.0                      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for aws-alb-ingress-controller.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

## Resources created by the ALB Ingress controller will be prefixed with this string
## Required
clusterName: k8s

## AWS region of k8s cluster, required if ec2metadata is unavailable from controller pod
## Required if autoDiscoverAwsRegion != true
awsRegion: 'us-east-2'

## Auto Discover awsRegion from ec2metadata, set this to true and omit awsRegion when ec2metadata is available.
autoDiscoverAwsRegion: false

## VPC ID of k8s cluster, required if ec2metadata is unavailable from controller pod
## Required if autoDiscoverAwsVpcID != true
awsVpcID: 'vpc-xxx'

## Auto Discover awsVpcID from ec2metadata, set this to true and omit awsVpcID: " when ec2metadata is available.
autoDiscoverAwsVpcID: false

scope:
  ## If provided, the ALB ingress controller will only act on Ingress resources annotated with this class
  ## Ref: https://github.com/kubernetes-sigs/aws-alb-ingress-controller/blob/master/docs/guide/controller/config.md#limiting-ingress-class
  ingressClass: alb

  ## If true, the ALB ingress controller will only act on Ingress resources in a single namespace
  ## Default: false; watch all namespaces
  singleNamespace: false

  ## If scope.singleNamespace=true, the ALB ingress controller will only act on Ingress resources in this namespace
  ## Ref: https://github.com/kubernetes-sigs/aws-alb-ingress-controller/blob/master/docs/guide/controller/config.md#limiting-namespaces
  ## Default: namespace of the ALB ingress controller
  watchNamespace: ''

extraArgs: {}

extraEnv:
  {}
  # AWS_ACCESS_KEY_ID: ""
  # AWS_SECRET_ACCESS_KEY: ""

podAnnotations:
  {}
  # iam.amazonaws.com/role: alb-ingress-controller

podLabels: {}

# whether configure readinessProbe on controller pod
enableReadinessProbe: false

# How often (in seconds) to check controller readiness
readinessProbeInterval: 60

# How long to wait before timeout (in seconds) when checking controller readiness
readinessProbeTimeout: 3

# How long to wait (in seconds) before checking the readiness probe
readinessProbeInitialDelay: 30

# whether configure livenessProbe on controller pod
enableLivenessProbe: false

# How long to wait (in seconds) before checking the liveness probe
livenessProbeInitialDelay: 30

rbac:
  ## If true, create & use RBAC resources
  ##
  create: true
  serviceAccountName: default

image:
  repository: docker.io/amazon/aws-alb-ingress-controller
  tag: 'v1.1.2'
  pullPolicy: IfNotPresent

replicaCount: 1
nameOverride: ''
fullnameOverride: ''

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector:
  {}
  # node-role.kubernetes.io/node: "true"
  # tier: cs

tolerations:
  []
  #  - key: "node-role.kubernetes.io/master"
  #    effect: NoSchedule

affinity: {}
```

</details>

---

# aws-alb-ingress-controller

[aws-alb-ingress-controller](https://github.com/kubernetes-sigs/aws-alb-ingress-controller) satisfies Kubernetes ingress resources by provisioning Application Load Balancers.

## TL;DR:

```bash
helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
helm install incubator/aws-alb-ingress-controller --set clusterName=MyClusterName --set autoDiscoverAwsRegion=true --set autoDiscoverAwsVpcID=true
```

## Introduction

This chart bootstraps an alb-ingress-controller deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.9+ with Beta APIs enabled

## Enable helm incubator repository

```bash
helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
```

## Installing the Chart

To install the chart with the release name `my-release` into `kube-system`:

```bash
helm install incubator/aws-alb-ingress-controller --set clusterName=MyClusterName --set autoDiscoverAwsRegion=true --set autoDiscoverAwsVpcID=true --name my-release --namespace kube-system
```

The command deploys alb-ingress-controller on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the alb-ingress-controller chart and their default values.

| Parameter                 | Description                                                                                                    | Default                                                                   |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `clusterName`             | (REQUIRED) Resources created by the ALB Ingress controller will be prefixed with this string                   | N/A                                                                       |
| `awsRegion`               | AWS region of k8s cluster, required if ec2metadata is unavailable from controller pod                          | `us-west-2`                                                               |
| `autoDiscoverAwsRegion`   | auto discover awsRegion from ec2metadata, omit awsRegion when this set to true                                 | false                                                                     |
| `awsVpcID`                | AWS VPC ID of k8s cluster, required if ec2metadata is unavailable from controller pod                          | `vpc-xxx`                                                                 |
| `autoDiscoverAwsVpcID`    | auto discover awsVpcID from ec2metadata, omit awsRegion when this set to true                                  | false                                                                     |
| `image.repository`        | controller container image repository                                                                          | `894847497797.dkr.ecr.us-west-2.amazonaws.com/aws-alb-ingress-controller` |
| `image.tag`               | controller container image tag                                                                                 | `v1.0.1`                                                                  |
| `image.pullPolicy`        | controller container image pull policy                                                                         | `IfNotPresent`                                                            |
| `enableReadinessProbe`    | enable readinessProbe on controller pod                                                                        | `false`                                                                   |
| `enableLivenessProbe`     | enable livenessProbe on controller pod                                                                         | `false`                                                                   |
| `extraEnv`                | map of environment variables to be injected into the controller pod                                            | `{}`                                                                      |
| `nodeSelector`            | node labels for controller pod assignment                                                                      | `{}`                                                                      |
| `tolerations`             | controller pod toleration for taints                                                                           | `{}`                                                                      |
| `podAnnotations`          | annotations to be added to controller pod                                                                      | `{}`                                                                      |
| `podLabels`               | labels to be added to controller pod                                                                           | `{}`                                                                      |
| `resources`               | controller pod resource requests & limits                                                                      | `{}`                                                                      |
| `rbac.create`             | If true, create & use RBAC resources                                                                           | `true`                                                                    |
| `rbac.serviceAccountName` | ServiceAccount ALB ingress controller will use (ignored if rbac.create=true)                                   | `default`                                                                 |
| `scope.ingressClass`      | If provided, the ALB ingress controller will only act on Ingress resources annotated with this class           | `alb`                                                                     |
| `scope.singleNamespace`   | If true, the ALB ingress controller will only act on Ingress resources in a single namespace                   | `false` (watch all namespaces)                                            |
| `scope.watchNamespace`    | If scope.singleNamespace=true, the ALB ingress controller will only act on Ingress resources in this namespace | `""` (namespace of the ALB ingress controller)                            |

```bash
helm install incubator/aws-alb-ingress-controller --set clusterName=MyClusterName --set autoDiscoverAwsRegion=true --set autoDiscoverAwsVpcID=true --name my-release --namespace kube-system
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
helm install incubator/aws-alb-ingress-controller --name my-release -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)

> **Tip**: If you use `aws-alb-ingress-controller` as releaseName, the generated pod name will be shorter.(e.g. `aws-alb-ingress-controller-66cc9fb67c-7mg4w` instead of `my-release-aws-alb-ingress-controller-66cc9fb67c-7mg4w`)
