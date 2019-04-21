# `@helm-charts/banzaicloud-stable-zookeeper-operator`

Pravega Zookeeper-operator Helm chart for Kubernetes

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | zookeeper-operator |
| Chart Version       | 0.0.1              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for zookeeper-operator.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: pravega/zookeeper-operator
  tag: 0.2.0
  pullPolicy: IfNotPresent

rbac:
  enabled: true
  apiVersion: v1beta1

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

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# Zookeeper-operator Chart

[Zookeeper](https://zookeeper.apache.org/) is a centralized service for maintaining configuration information, naming, providing distributed synchronization, and providing group services.

This chart installs [Zookeeper Operator](https://github.com/pravega/zookeeper-operator), which can install Zookeeper 3.5 cluster.

## Chart Details

## Installing the Chart

To install the chart:

```
$ helm repo add banzaicloud-stable http://kubernetes-charts.banzaicloud.com/branch/master
$ helm install banzaicloud-stable/zookeeper-operator
```

## Configuration

The following tables lists the configurable parameters of the Zookeeper Oparator chart and their default values.

| Parameter        | Required | Description                                                                                                               | Default value              |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| replicaCount     | yes      | describes how many pods should handle the workload (Note because of a bug in Operator SDK version 0.3.0 only 1 will work) | 1                          |
| image.repository | yes      | describes the image repository                                                                                            | pravega/zookeeper-operator |
| image.tag        | yes      | describes the image tag                                                                                                   | 0.2.0                      |
| image.pullPolicy | yes      | describes the image pullPolicy                                                                                            | IfNotPresent               |
| rbac.enabled     | yes      | describes if the rbac is enabled in the cluster                                                                           | true                       |
| rbac.apiversion  | yes      | describes rbac api version                                                                                                | v1beta1                    |
| resources        | no       | resources can be specified to operator pods                                                                               | {}                         |
| nodeSelector     | no       | nodeSelector can be specified to operator pods                                                                            | {}                         |
| tolerations      | no       | tolerations can be specified to operator pods                                                                             | {}                         |
| affinity         | no       | affinity can be specified to operator pods                                                                                | {}                         |

## Install Zookeeper Cluster

To install a Zookeeper cluster with 3 nodes:

```
kubectl create -f - <<EOF
apiVersion: zookeeper.pravega.io/v1beta1
kind: ZookeeperCluster
metadata:
  name: example-zookeepercluster
spec:
  # Add fields here
  replicas: 3
EOF
```
