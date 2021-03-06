# `@helm-charts/ibm-charts-ibm-eventstreams-dev`

IBM Event Streams based on Apache Kafka.

| Field               | Value                |
| ------------------- | -------------------- |
| Repository Name     | ibm-charts           |
| Chart Name          | ibm-eventstreams-dev |
| Chart Version       | 1.1.0                |
| NPM Package Version | 0.1.0                |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
###############################################################################
#
# Licensed Materials - Property of IBM
#
# (C) Copyright IBM Corp. 2018. All Rights Reserved.
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
      kafkaTag: 2018-11-23-09.03.09-f51c694
      healthcheckTag: 2018-11-21-16.21.30-9947d87
      kafkaMetricsProxyTag: 2018-11-22-13.44.45-932c41b
      metricsReporterTag: 2018-11-15-16.03.55-fc56475
      zookeeperTag: 2018-11-15-16.04.27-97fcd55
      kafkaProxyTag: 2018-11-21-09.10.49-192cd69
      proxyTag: 2018-11-21-09.10.54-83bacb7
      uiTag: 2018-11-23-14.41.34-5551d4d
      codegenTag: 2018-11-21-11.58.59-4a844ff
      oauthTag: 2018-11-15-16.06.08-0e82f45
      roleMappingsTag: 2018-11-15-16.06.41-a193f91
      restTag: 2018-11-23-10.08.32-1d3a9a6
      elasticSearchTag: 2018-11-15-16.07.36-41f575c
      indexmgrTag: 2018-11-21-12.49.59-6879c17
      telemetryTag: 2018-11-15-16.08.19-17b74dc
      accessControllerTag: 2018-11-23-11.54.42-58ce6ac
      kubectlTag: 2018-11-15-16.27.22-6a75737
      certGenTag: 2018-11-15-16.09.38-317444b
      redisTag: 2018-11-22-17.05.03-8dfe09e
      busyboxTag: 2018-11-15-16.10.31-12d2260
      alpineTag: 2018-11-21-15.56.28-ebba125

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
  # The inter.broker.protocol.version to use when running Kafka brokers
  interBrokerProtocolVersion: '2.0'
  # The log.message.format.version to use when running Kafka brokers
  logMessageFormatVersion: '2.0'
  # Any extra arguments to pass to the JVM when running Kafka brokers
  heapOpts: '-XX:+UseContainerSupport'

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
# license must be set to "accept" to accept the terms of the IBM license
###############################################################################

license: 'not_accepted'
```

</details>

---

# IBM Event Streams Community Edition

[IBM Event Streams](https://ibm.github.io/event-streams/) is a high-throughput, fault-tolerant, pub-sub technology for building event-driven applications. It's built on top of [Apache Kafka??](https://kafka.apache.org/) version 2.0.1.

## Introduction

This chart deploys Apache Kafka?? and supporting infrastructure such as Apache ZooKeeper???. Further information about IBM Event Streams can be found [here](https://ibm.github.io/event-streams/about/overview/).

## Chart Details

This Helm chart will install the following:

- An Apache Kafka?? cluster using a [StatefulSet](http://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/) with a configurable number of replicas (default 3)
- An Apache ZooKeeper??? ensemble using a [StatefulSet](http://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/) with 3 replicas
- An administration user interface using a [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- An administration server using a [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) to support the administration tools
- A network proxy as a [Service](https://kubernetes.io/docs/concepts/services-networking/service/) to enable connection by clients
- Pod network access rules as a [NetworkPolicy](https://kubernetes.io/docs/concepts/services-networking/network-policies) to control how pods are allowed to communicate
- An access controller as a [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) to support Kafka authorization
- An Elasticsearch cluster using a [StatefulSet](http://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/) with 2 replicas to support the user interface
- An index manager as a [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) to provide access to the Elasticsearch nodes

## Prerequisites

If you prefer to install from the command prompt, you will need:

- The `cloudctl`, `kubectl` and `helm` commands available
- Your environment configured to connect to the target cluster

The installation environment has the following prerequisites:

- Kubernetes 1.11
- A namespace dedicated for use by IBM Event Streams (see "Create a Namespace" below)
- PersistentVolume support in the underlying infrastructure if `persistence.enabled=true` (See "Create Persistent Volumes" below)

## Resources Required

The following table lists the resource requirements of the IBM Event Streams Helm chart. For details about the requirements for each pod and their containers, see the tables in the [product documentation](https://ibm.github.io/event-streams/installing/prerequisites/#helm-resource-requirements).

| Pod                   | Number of replicas | Total CPU per pod | Total memory per pod (Gi) |
| --------------------- | ------------------ | ----------------- | ------------------------- |
| Kafka                 | 3\*                | 1\*               | 3.5\*                     |
| ZooKeeper             | 3                  | 0.1\*             | 1\*                       |
| Administration UI     | 1                  | 1                 | 1                         |
| Administration server | 1                  | 4.5               | 2.5                       |
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

## PodSecurityPolicy Requirements

Any active PodSecurityPolicy must allow the following capabilities. If any of these are blocked, Event Streams will not operate correctly or may be unable to start.

- Access to the following volume types:

  - configMapName
  - emptyDir
  - persistentVolumeClaim
  - projected

- fsGroup support for the following group ids:

  - 1000
  - 1001

- runAsUser support for the following user ids:

  - 1000
  - 1001
  - 65534

- readOnlyRootFilesystem must be false

- Retain default settings for the following capabilities:
  - SELinux
  - AppArmor
  - seccomp
  - sysctl

## Installing the Chart

There are four steps to install IBM Event Streams in your environment:

- Create a namespace
- Create persistent volumes (Optional)
- Create a ConfigMap for Kafka static configuration (Optional)
- Install IBM Event Streams

### Create a Namespace

You must use a [namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) dedicated for use by IBM Event Streams to ensure that the network access policies created by the chart are only applied to the Event Streams installation. Installation to the default namespace is not supported.

To create a namespace, you must have the Cluster administrator role. Choose a name for your namespace and run this command using your chosen name:

```
kubectl create namespace <namespace_name>
```

### Create Persistent Volumes

Persistence is not enabled by default so no persistent volumes are required. If you are not using persistence, you can skip this section.

Enable persistence if you want messages sent to topics and configuration to be retained in the event of a restart. If persistence is enabled, one physical volume will be required for each Kafka broker and ZooKeeper server.

To create physical volumes, you must have the Cluster administrator role.

You can find more information about storage requirements below.

For volumes that support ownership management, specify the group ID of the group owning the persistent volumes' file systems using the `global.fsGroupGid` parameter.

### Create a ConfigMap for Kafka static configuration

You can override the default values for Kafka static configuration using a ConfigMap. These values are then supplied to the Kafka brokers using their `server.properties` files. This mechanism enables you to make changes to Kafka's read-only configuration properties.

To create a ConfigMap, you must have the Operator, Administrator or Cluster administrator role. Create a ConfigMap from an existing Kafka `server.properties` file by running the following command:

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

To install the chart, your user id must have the Cluster administrator role.

Add the IBM Cloud Private internal Helm repository called `local-charts` to the Helm CLI as an external repository, as described [here](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_3.1.0/app_center/add_int_helm_repo_to_cli.html).

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

## Verifying the Chart

See the NOTES.txt file associated with this chart for verification instructions.

## Uninstalling the Chart

To uninstall IBM Event Streams:

```
helm delete <release_name>??--purge --tls
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

| Parameter                         | Description                                                                     | Default |
| --------------------------------- | ------------------------------------------------------------------------------- | ------- |
| `kafka.resources.limits.cpu`      | CPU limit for Kafka brokers                                                     | `1000m` |
| `kafka.resources.limits.memory`   | Memory limit for Kafka brokers                                                  | `2Gi`   |
| `kafka.resources.requests.cpu`    | CPU request for Kafka brokers                                                   | `1000m` |
| `kafka.resources.requests.memory` | Memory request for Kafka brokers                                                | `2Gi`   |
| `kafka.brokers`                   | Number of brokers in the Kafka cluster, minimum 3                               | `3`     |
| `kafka.configMapName`             | Optional ConfigMap used to apply static configuration to brokers in the cluster | `nil`   |

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

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, you can use a YAML file to specify the values for the parameters.

## Storage

If persistence is enabled, each Kafka broker and ZooKeeper server requires one Physical Volume. You either need to create a
[persistent volume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#static) for each Kafka broker and ZooKeeper server, or specify a
storage class that supports [dynamic provisioning](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#dynamic). Kafka and ZooKeeper can
use different storage classes to control how physical volumes are allocated.

If these persistent volumes are to be created manually, this must be done by the system administrator who will add these to a central pool before the Helm chart can be installed. The installation will then claim the required number of persistent volumes from this pool. For manual creation, 'dynamic provisioning' must be disabled in the Helm chart when it is installed. It is up to the administrator to provide appropriate storage to back these physical volumes.

If these persistent volumes are to be created automatically at the time of installation, the system administrator must enable support for this prior to installing the Helm chart. For automatic creation 'dynamic provisioning' should be enabled in the Helm chart when it is installed and storage class names provided to define which types of Persistent Volume get allocated to the deployment.

More information about persistent volumes and the system administration steps required can be found [here](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).

## Limitations

- The chart must be deployed into a namespace dedicated for use by IBM Event Streams.
- The chart can be deployed by an Administrator or Cluster administrator.
- Linux on Power (ppc64le) is not supported.
- Mixed worker node architecture deployments are not supported.

## Documentation

Find out more about [IBM Event Streams](https://ibm.github.io/event-streams/about/overview/).
