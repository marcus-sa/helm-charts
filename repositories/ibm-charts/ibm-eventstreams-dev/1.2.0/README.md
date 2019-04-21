# `@helm-charts/ibm-charts-ibm-eventstreams-dev`

IBM Event Streams based on Apache Kafka.

| Field               | Value                |
| ------------------- | -------------------- |
| Repository Name     | ibm-charts           |
| Chart Name          | ibm-eventstreams-dev |
| Chart Version       | 1.2.0                |
| NPM Package Version | 0.1.0                |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
###############################################################################
#
# Licensed Materials - Property of IBM
#
# 5737-H33
#
# (C) Copyright IBM Corp. 2018, 2019  All Rights Reserved.
#
# US Government Users Restricted Rights - Use, duplication or
# disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
#
###############################################################################
###############################################################################
############################# IBM EVENT STREAMS ###############################
###############################################################################

###############################################################################
# values that are needed for all Event Streams charts
###############################################################################
global:
  #
  # settings for how Docker images are pulled
  image:
    # repository is the container repository to use, which must contain the IBM Event Streams images
    repository: ibmcom
    # pullSecret is the secret to use when pulling the image from a private registry
    #  optional when pulling from Docker registries that don't require authentication
    pullSecret:
    # pullPolicy is either IfNotPresent or Always
    #  (https://kubernetes.io/docs/concepts/containers/images/)
    pullPolicy: IfNotPresent
    imageTags:
      accessControllerTag: 2019-03-20-11.25.28-1d89571-exp
      baseTag: 2019-03-05-12.09.02-cc73c89
      certGenTag: 2019-03-18-13.46.42-1a75c91
      codegenTag: 2019-03-21-11.45.04-281fccb
      collectorTag: 2019-03-06-20.55.15-b69dbc7
      databaseTag: 2019-03-05-13.13.30-c555546
      elasticSearchTag: 2019-03-21-11.46.00-d2715ff
      healthcheckTag: 2019-03-12-10.46.32-d7b7fec-exp
      indexmgrTag: 2019-03-06-20.58.28-f48c433
      initTag: 2019-03-05-13.13.21-fada307
      kafkaTag: 2019-03-21-12.08.24-a6ed1b3
      kafkaMetricsProxyTag: 2019-03-21-16.32.52-04f82a1
      kafkaProxyTag: 2019-03-21-16.25.28-b14b7b5
      kubectlTag: 2019-03-21-11.47.24-907f62c
      metricsReporterTag: 2019-03-06-14.41.51-15c4003
      oauthTag: 2019-03-21-11.47.54-3355c78
      restProducerTag: 2019-03-06-14.40.56-caaed13
      restTag: 2019-03-21-11.50.01-155e6dc
      restProxyTag: 2019-03-11-10.17.10-8ecc145
      roleMappingsTag: 2019-03-21-11.48.49-8cacb16
      telemetryTag: 2019-03-05-12.08.21-62af42f
      uiTag: 2019-03-22-10.58.02-17f70bf
      zookeeperTag: 2019-03-06-14.45.05-e2ebde0

  # gid for the secondary group the containers should run in so that they can access NFS storage.
  fsGroupGid:
  # Architecture of worker nodes that IBM Event Streams will be deployed to
  arch: amd64

# must be set to 'enable' for install to be tracked
telemetry:
  enabled: false

###############################################################################
# Kafka-specific settings
###############################################################################
kafka:
  # resource limits to apply to the Kafka broker containers
  # ref: http://kubernetes.io/docs/user-guide/compute-resources/
  resources:
    limits:
      cpu: 1000m
      memory: 2Gi
    requests:
      cpu: 1000m
      memory: 2Gi

  # resource limits to apply to the Kafka metrics-reporter containers
  metricsReporterResources:
    limits:
      memory: 1500Mi
    requests:
      memory: 1500Mi

  # Number of Kafka brokers in the cluster
  brokers: 3
  # Name of configmap containing equivalent key=value to kafka's server.properties
  configMapName: ''
  # Any extra arguments to pass to the JVM when running Kafka brokers
  heapOpts: '-XX:+UseContainerSupport'
  # Whether to open kafka to JMX connections from cluster
  openJMX: false

#
# Persistence settings which apply to the Kafka broker pods
persistence:
  # whether to use Persistent Volumes for the Kafka pods
  enabled: false
  # whether to use Storage Classes to dynamically create Persistent Volumes for the Kafka pods
  useDynamicProvisioning: false
  #
  # settings for the Kafka pod Persistent Volume Claims,
  #   which each pod uses for data in /var/data
  dataPVC:
    # prefix for names for this Persistent Volume Claim
    name: 'datadir'
    # name of the Storage Class to use, or an empty string for no Storage Class
    storageClassName: ''
    # minimum size of the Persistent Volume
    size: 4Gi

###############################################################################
# ZooKeeper-specific settings
###############################################################################
zookeeper:
  # resource limits to apply to the ZooKeeper pods
  # ref: http://kubernetes.io/docs/user-guide/compute-resources/
  resources:
    limits:
      cpu: 100m
      memory: 1Gi
    requests:
      cpu: 100m
      memory: 750Mi

  #
  # Persistence settings which apply to the ZooKeeper pods
  persistence:
    # whether to use Persistent Volumes for the ZooKeeper pods
    enabled: false
    # whether to use Storage Classes to dynamically create Persistent Volumes for the ZooKeeper pods
    useDynamicProvisioning: false

  #
  # settings for the ZooKeeper Persistent Volume Claims
  #  which each pod uses for data in /var/lib/zookeeper
  dataPVC:
    # prefix for names for this Persistent Volume Claim
    name: 'datadir'
    # name of the Storage Class to use, or an empty string for no Storage Class
    storageClassName: ''
    # minimum size of the Persistent Volume
    size: 2Gi

###############################################################################
# Kafka external access configuration
###############################################################################
proxy:
  # external IP address for access that the proxy should use
  externalEndpoint: ''
# Secure connection settings for the proxy
tls:
  type: 'selfsigned'
  key:
  cert:
  cacert:

###############################################################################
# Message Indexing configuration
###############################################################################
messageIndexing:
  # Whether to enable indexing of messages to enhance viewing
  messageIndexingEnabled: true
  # Resource limits for index manager nodes
  resources:
    limits:
      memory: 4Gi

###############################################################################
# External monitoring configuration
###############################################################################
externalMonitoring:
  datadog: {}

###############################################################################
# license must be set to "accept" to accept the terms of the IBM license
###############################################################################
license: 'not_accepted'

###############################################################################
# Check chart is being installed on a supported platform
# If this is set to false you could be installing an unsupported version of Event Streams
###############################################################################
checkSupportedPlatform: true
```

</details>

---

# IBM Event Streams Community Edition

[IBM Event Streams](https://ibm.github.io/event-streams/) is a high-throughput, fault-tolerant, pub-sub technology for building event-driven applications. It's built on top of [Apache Kafka®](https://kafka.apache.org/) version 2.1.1.

## Introduction

This chart deploys Apache Kafka® and supporting infrastructure such as Apache ZooKeeper™. For more information about IBM Event Streams, see the [product documentation](https://ibm.github.io/event-streams/about/overview/).

## Chart Details

This Helm chart will install the following:

- An Apache Kafka® cluster using a [StatefulSet](http://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/) with a configurable number of replicas (default is 3)
- An Apache ZooKeeper™ ensemble using a [StatefulSet](http://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/) with 3 replicas
- An administration user interface using a [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- An administration server using a [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) to support the administration tools
- A REST producer server using a [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) to support the sending of messages to IBM Event Streams by using a HTTP POST request
- A REST proxy as a [Service](https://kubernetes.io/docs/concepts/services-networking/service/) to enable connection by REST clients
- A network proxy as a [Service](https://kubernetes.io/docs/concepts/services-networking/service/) to enable connection by kafka clients
- Pod network access rules as a [NetworkPolicy](https://kubernetes.io/docs/concepts/services-networking/network-policies) to control how pods are allowed to communicate
- An access controller as a [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) to support Kafka authorization
- An Elasticsearch cluster using a [StatefulSet](http://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/) with 2 replicas to support the user interface
- An index manager as a [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) to provide access to the Elasticsearch nodes
- A Collector as a [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) to provide monitoring metrics to Prometheus

## Prerequisites

To install using the command line, ensure you have the following:

- The `cloudctl`, `kubectl` and `helm` commands available
- Your environment configured to connect to the target cluster

The installation environment has the following prerequisites:

- Kubernetes 1.11
- A namespace dedicated for use by IBM Event Streams (see "Create a Namespace" below)
- PersistentVolume support in the underlying infrastructure if `persistence.enabled=true` (See "Create Persistent Volumes" below)

### PodSecurityPolicy Requirements

To install the Event Streams chart, you must have the [`ibm-restricted-psp`](https://ibm.biz/cpkspec-psp) PodSecurityPolicy selected for the target namespace.

You can define the PodSecurityPolicy when creating the namespace for your installation.

Custom PodSecurityPolicy definition:

```
apiVersion: extensions/v1beta1
kind: PodSecurityPolicy
metadata:
  annotations:
    kubernetes.io/description: "This policy is the most restrictive,
      requiring pods to run with a non-root UID, and preventing pods from accessing the host."
    #apparmor.security.beta.kubernetes.io/allowedProfileNames: runtime/default
    #apparmor.security.beta.kubernetes.io/defaultProfileName: runtime/default
    seccomp.security.alpha.kubernetes.io/allowedProfileNames: docker/default
    seccomp.security.alpha.kubernetes.io/defaultProfileName: docker/default
  name: ibm-restricted-psp
spec:
  allowPrivilegeEscalation: false
  forbiddenSysctls:
  - '*'
  fsGroup:
    ranges:
    - max: 65535
      min: 1
    rule: MustRunAs
  requiredDropCapabilities:
  - ALL
  runAsUser:
    rule: MustRunAsNonRoot
  seLinux:
    rule: RunAsAny
  supplementalGroups:
    ranges:
    - max: 65535
      min: 1
    rule: MustRunAs
  volumes:
  - configMap
  - emptyDir
  - projected
  - secret
  - downwardAPI
  - persistentVolumeClaim
```

Custom ClusterRole:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  annotations:
  name: ibm-restricted-clusterrole
rules:
- apiGroups:
  - extensions
  resourceNames:
  - ibm-restricted-psp
  resources:
  - podsecuritypolicies
  verbs:
  - use
```

Event Streams applies network policies to control the traffic within the namespace where it is deployed, limiting the traffic to that required by Event Streams. For more information about the network policies and the the traffic they permit, see the [product documentation](https://ibm.github.io/event-streams/security/network-policies/).

For more information about PodSecurityPolicy definitions, see the [IBM Cloud Private documentation](https://www.ibm.com/support/knowledgecenter/SSBS6K_3.1.2/manage_cluster/security.html).

## Resources Required

The following table lists the resource requirements of the IBM Event Streams Helm chart. For details about the requirements for each pod and their containers, see the tables in the [product documentation](https://ibm.github.io/event-streams/installing/prerequisites/#helm-resource-requirements).

| Pod                   | Number of replicas | Total CPU per pod | Total memory per pod (Gi) |
| --------------------- | ------------------ | ----------------- | ------------------------- |
| Kafka                 | 3\*                | 1\*               | 3.5\*                     |
| ZooKeeper             | 3                  | 0.1\*             | 1\*                       |
| Administration UI     | 1                  | 1                 | 1                         |
| Administration server | 1                  | 4.5               | 2.5                       |
| REST producer server  | 1                  | 4                 | 2                         |
| REST proxy            | 1                  | unlimited         | unlimited                 |
| Collector             | 1                  | 1                 | 1                         |
| Network proxy         | 2                  | unlimited         | unlimited                 |
| Access controller     | 1                  | 0.1               | 0.25                      |
| Index manager         | 1                  | unlimited         | unlimited                 |
| Elasticsearch         | 2                  | unlimited         | 4                         |

The settings marked with an asterisk (\*) can be configured.

The CPU and memory limits for the network proxy are not limited by the chart, so will inherit the resource limits for the namespace that the chart is being installed into. If there are no resource limits set for the namespace, the network proxy pod will run with unbounded CPU and memory limits.

Persistence is not enabled by default and no persistent volumes are required. If you are going to enable persistence, you can find more information about storage requirements below.

If you enable message indexing (which is enabled by default), then you must have the `vm.max_map_count` property set to at least `262144` on all IBM Cloud Private nodes in your cluster (not only the master node). Please note this property may have already been updated by other workloads to be higher than the minimum required. Run the following commands on each node:

```
sudo sysctl -w vm.max_map_count=262144
```

```
echo "vm.max_map_count=262144" | tee -a /etc/sysctl.conf
```

## Installing the Chart

There are four steps to install IBM Event Streams in your environment:

- Create a namespace
- Create persistent volumes (Optional)
- Create a ConfigMap for Kafka static configuration (Optional)
- Install IBM Event Streams

### Create a Namespace

You must use a [namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) dedicated for use by IBM Event Streams to ensure that the network access policies created by the chart are only applied to the Event Streams installation. Installation to the default namespace is not supported.

To create a namespace, you must have the Cluster Administrator role. Ensure that the namespace has the correct [PodSecurityPolicy set](#podsecuritypolicy-requirements).

Choose a name for your namespace and run this command using your chosen name:

```
kubectl create namespace <namespace_name>
```

### Create Persistent Volumes

Persistence is not enabled by default so no persistent volumes are required. If you are not using persistence, you can skip this section.

Enable persistence if you want messages sent to topics and configuration to be retained in the event of a restart. If persistence is enabled, one physical volume will be required for each Kafka broker and ZooKeeper server.

To create physical volumes, you must have the Cluster Administrator role.

You can find more information about storage requirements below.

For volumes that support ownership management, specify the group ID of the group owning the persistent volumes' file systems using the `global.fsGroupGid` parameter.

### Create a ConfigMap for Kafka static configuration

You can override the default values for Kafka static configuration using a ConfigMap. These values are then supplied to the Kafka brokers using their `server.properties` files. This mechanism enables you to make changes to Kafka's read-only configuration properties.

To create a ConfigMap, you must have the Operator, Administrator or Cluster Administrator role. Create a ConfigMap from an existing Kafka `server.properties` file by running the following command:

```
kubectl -n <namespace_name> create configmap <configmap_name> --from-env-file=<path/to/server.properties>
```

Alternatively, you can create a blank ConfigMap for future configuration updates, run this command instead:

```
kubectl -n <namespace_name> create configmap <configmap_name>
```

Be sure to specify your config map name in the `kafka.configMapName` parameter during release configuration.

If you choose to omit this step, you may create the ConfigMap after installation and apply it using Helm's upgrade mechanism as shown below:

```
helm upgrade --reuse-values --set kafka.configMapName=<configmap_name> <release_name> ibm-eventstreams-dev --tls
```

### Install IBM Event Streams

To install the chart, your user id must have the Cluster Administrator role.

Add the IBM Cloud Private internal Helm repository called `local-charts` to the Helm CLI as an external repository, as described in the [IBM Cloud Private documentation](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_3.1.2/app_center/add_int_helm_repo_to_cli.html).

Install the chart, specifying the release name and namespace with the following command:

```
helm install --name <release_name> --namespace=<namespace_name> --set license=accept ibm-eventstreams-dev --tls
```

NOTE: The release name should consist of lower-case alphanumeric characters and not start with a digit or contain a space.

The command deploys IBM Event Streams on the Kubernetes cluster with the default configuration.

The Configuration section lists the parameters that can be overridden during installation by adding them to the Helm install command as follows:

```
--set key=value[,key=value]
```

### Verifying the Chart

See the NOTES.txt file associated with this chart for verification instructions.

### Uninstalling the Chart

To uninstall IBM Event Streams:

```
helm delete <release_name> --purge --tls
```

This command removes all the Kubernetes components associated with the chart, except any persistent volume claims (PVCs). This is the default behavior of Kubernetes, and ensures that valuable data is not deleted. In order to delete the Kafka and ZooKeeper data, you can delete the PVC using the following command:

```
kubectl delete pvc -l release=<release_name>
```

WARNING: This will remove any existing data from the underlying physical volumes.

## Configuration

The following tables list the configurable parameters of the `ibm-eventstreams-dev` chart and their default values.

### Global install settings

| Parameter                 | Description                                                              | Default        |
| ------------------------- | ------------------------------------------------------------------------ | -------------- |
| `license`                 | Set to 'accept' to indicate that you accept the terms of the IBM license | `Not accepted` |
| `global.image.repository` | Docker image registry                                                    | `ibmcom`       |
| `global.image.pullSecret` | Image pull secret, if using a Docker registry that requires credentials  | `nil`          |
| `global.image.pullPolicy` | Image pull policy                                                        | `IfNotPresent` |
| `global.fsGroupGid`       | File system group ID for volumes that support ownership management       | `nil`          |
| `global.arch`             | The worker node architecture where IBM Event Streams will be deployed    | `amd64`        |

### Insights - help us improve our product

| Parameter           | Description                                                              | Default |
| ------------------- | ------------------------------------------------------------------------ | ------- |
| `telemetry.enabled` | Allow IBM to use in-application code to transmit product usage analytics | `false` |

### Kafka broker settings

| Parameter                         | Description                                                                                        | Default |
| --------------------------------- | -------------------------------------------------------------------------------------------------- | ------- |
| `kafka.resources.limits.cpu`      | CPU limit for Kafka brokers                                                                        | `1000m` |
| `kafka.resources.limits.memory`   | Memory limit for Kafka brokers                                                                     | `2Gi`   |
| `kafka.resources.requests.cpu`    | CPU request for Kafka brokers                                                                      | `1000m` |
| `kafka.resources.requests.memory` | Memory request for Kafka brokers                                                                   | `2Gi`   |
| `kafka.brokers`                   | Number of brokers in the Kafka cluster, minimum 3                                                  | `3`     |
| `kafka.configMapName`             | Optional ConfigMap used to apply static configuration to brokers in the cluster                    | `nil`   |
| `kafka.openJMX`                   | Open each Kafka broker's JMX port for secure connections from inside the IBM Cloud Private cluster | `false` |

### Kafka persistent storage settings

| Parameter                              | Description                                                            | Default   |
| -------------------------------------- | ---------------------------------------------------------------------- | --------- |
| `persistence.enabled`                  | Enable persistent storage for Apache Kafka                             | `false`   |
| `persistence.useDynamicProvisioning`   | Use dynamic provisioning for Apache Kafka                              | `false`   |
| `persistence.dataPVC.name`             | Prefix for the name of persistent volume claims used for Apache Kafka  | `datadir` |
| `persistence.dataPVC.storageClassName` | Storage class of the persistent volume claims created for Apache Kafka | `nil`     |
| `persistence.dataPVC.size`             | Size of the persistent volume claims created for Apache Kafka          | `4Gi`     |

### ZooKeeper settings

| Parameter                                      | Description                                                                 | Default   |
| ---------------------------------------------- | --------------------------------------------------------------------------- | --------- |
| `zookeeper.resources.limits.cpu`               | CPU limit for ZooKeeper servers                                             | `100m`    |
| `zookeeper.resources.requests.cpu`             | CPU request for ZooKeeper servers                                           | `100m`    |
| `zookeeper.persistence.enabled`                | Enable persistent storage for ZooKeeper servers                             | `false`   |
| `zookeeper.persistence.useDynamicProvisioning` | Use dynamic provisioning for ZooKeeper servers                              | `false`   |
| `zookeeper.dataPVC.name`                       | Prefix for the name of the persistent volume claims for ZooKeeper servers   | `datadir` |
| `zookeeper.dataPVC.storageClassName`           | Storage class of the persistent volume claims created for ZooKeeper servers | `nil`     |
| `zookeeper.dataPVC.size`                       | Size of the persistent volume claims created for ZooKeeper servers          | `2Gi`     |

### External access settings

| Parameter                | Description                                                                                    | Default |
| ------------------------ | ---------------------------------------------------------------------------------------------- | ------- |
| `proxy.externalEndpoint` | External hostname or IP address to be used by external clients, default to cluster master node | `nil`   |

### Secure connection settings

| Parameter    | Description                                                                                                     | Default      |
| ------------ | --------------------------------------------------------------------------------------------------------------- | ------------ |
| `tls.type`   | Type of certificate, specify 'selfsigned' to have one generated on install, or 'provided' if providing your own | `selfsigned` |
| `tls.key`    | If tls.type is 'provided', base64-encoded TLS private key                                                       | `nil`        |
| `tls.cert`   | If tls.type is 'provided', base64-encoded TLS certificate                                                       | `nil`        |
| `tls.cacert` | If tls.type is 'provided', base64-encoded CA certificate/bundle                                                 | `nil`        |

### Message indexing settings

| Parameter                                 | Description                                                        | Default |
| ----------------------------------------- | ------------------------------------------------------------------ | ------- |
| `messageIndexing.messageIndexingEnabled`  | Enable message indexing to enhance browsing the messages on topics | `true`  |
| `messageIndexing.resources.limits.memory` | Memory limits for Index Manager nodes                              | `2Gi`   |

### External monitoring settings

| Parameter                                     | Description                                                                                  | Default |
| --------------------------------------------- | -------------------------------------------------------------------------------------------- | ------- |
| `externalMonitoring.datadog.<check_template>` | JSON string for the required Datadog® Autodiscovery check template used for Kafka monitoring | `nil`   |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, you can use a YAML file to specify the values for the parameters.

## Storage

If persistence is enabled, each Kafka broker and ZooKeeper server requires one Physical Volume. The number of Kafka brokers and ZooKeeper servers depends on your setup. For default requirements, see the [resource requirements table](#resources-required). You either need to create a
[persistent volume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#static) for each Kafka broker and ZooKeeper server, or specify a
storage class that supports [dynamic provisioning](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#dynamic). Kafka and ZooKeeper can
use different storage classes to control how physical volumes are allocated.

If these persistent volumes are to be created manually, this must be done by the system administrator who will add these to a central pool before the Helm chart can be installed. The installation will then claim the required number of persistent volumes from this pool. For manual creation, 'dynamic provisioning' must be disabled in the Helm chart when it is installed. It is up to the administrator to provide appropriate storage to back these physical volumes.

If these persistent volumes are to be created automatically at the time of installation, the system administrator must enable support for this prior to installing the Helm chart. For automatic creation 'dynamic provisioning' should be enabled in the Helm chart when it is installed and storage class names provided to define which types of Persistent Volume get allocated to the deployment.

More information about persistent volumes and the system administration steps required can be found in the [Kubernetes documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).

## Limitations

- The chart must be deployed into a namespace dedicated for use by IBM Event Streams.
- The chart can only be deployed by a Cluster Administrator.
- Linux on Power (ppc64le) is not supported.
- Mixed worker node architecture deployments are not supported.

## Documentation

Find out more about [IBM Event Streams](https://ibm.github.io/event-streams/about/overview/).
