# `@helm-charts/incubator-cassandra`

Apache Cassandra is a free and open-source distributed database management system designed to handle large amounts of data across many commodity servers, providing high availability with no single point of failure.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | cassandra |
| Chart Version       | 0.11.1    |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Cassandra image version
## ref: https://hub.docker.com/r/library/cassandra/
image:
  repo: cassandra
  tag: 3.11.3
  pullPolicy: IfNotPresent
  ## Specify ImagePullSecrets for Pods
  ## ref: https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod
  # pullSecrets: myregistrykey

## Specify a service type
## ref: http://kubernetes.io/docs/user-guide/services/
service:
  type: ClusterIP

## Persist data to a persistent volume
persistence:
  enabled: true
  ## cassandra data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 10Gi

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
## Minimum memory for development is 4GB and 2 CPU cores
## Minimum memory for production is 8GB and 4 CPU cores
## ref: http://docs.datastax.com/en/archived/cassandra/2.0/cassandra/architecture/architecturePlanningHardware_c.html
resources:
  {}
  # requests:
  #   memory: 4Gi
  #   cpu: 2
  # limits:
  #   memory: 4Gi
  #   cpu: 2

## Change cassandra configuration parameters below:
## ref: http://docs.datastax.com/en/cassandra/3.0/cassandra/configuration/configCassandra_yaml.html
## Recommended max heap size is 1/2 of system memory
## Recommended heap new size is 1/4 of max heap size
## ref: http://docs.datastax.com/en/cassandra/3.0/cassandra/operations/opsTuneJVM.html
config:
  cluster_domain: cluster.local
  cluster_name: cassandra
  cluster_size: 3
  seed_size: 2
  num_tokens: 256
  # If you want Cassandra to use this datacenter and rack name,
  # you need to set endpoint_snitch to GossipingPropertyFileSnitch.
  # Otherwise, these values are ignored and datacenter1 and rack1
  # are used.
  dc_name: DC1
  rack_name: RAC1
  endpoint_snitch: SimpleSnitch
  max_heap_size: 2048M
  heap_new_size: 512M
  start_rpc: false
  ports:
    cql: 9042
    thrift: 9160
    # If a JVM Agent is in place
    # agent: 61621

## Cassandra config files overrides
configOverrides: {}

## Cassandra docker command overrides
commandOverrides: []

## Cassandra docker args overrides
argsOverrides: []

## Custom env variables.
## ref: https://hub.docker.com/_/cassandra/
env: {}

## Liveness and Readiness probe values.
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/
livenessProbe:
  initialDelaySeconds: 90
  periodSeconds: 30
  timeoutSeconds: 5
  successThreshold: 1
  failureThreshold: 3
readinessProbe:
  initialDelaySeconds: 90
  periodSeconds: 30
  timeoutSeconds: 5
  successThreshold: 1
  failureThreshold: 3

## Configure node selector. Edit code below for adding selector to pods
## ref: https://kubernetes.io/docs/user-guide/node-selection/
# selector:
# nodeSelector:
# cloud.google.com/gke-nodepool: pool-db

## Additional pod annotations
## ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
podAnnotations: {}

## Additional pod labels
## ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
podLabels: {}

## Additional pod-level settings
podSettings:
  # Change this to give pods more time to properly leave the cluster when not using persistent storage.
  terminationGracePeriodSeconds: 30

## Pod distruption budget
podDisruptionBudget:
  {}
  # maxUnavailable: 1
  # minAvailable: 2

podManagementPolicy: OrderedReady
updateStrategy:
  type: OnDelete

## Pod Security Context
securityContext:
  enabled: false
  fsGroup: 999
  runAsUser: 999

## Affinity for pod assignment
## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
affinity: {}

## Node tolerations for pod assignment
## Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
tolerations: []

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  # name:

# Use host network for Cassandra pods
# You must pass seed list into config.seeds property if set to true
hostNetwork: false

## Backup cronjob configuration
## Ref: https://github.com/maorfr/cain
backup:
  enabled: false

  # Schedule to run jobs. Must be in cron time format
  # Ref: https://crontab.guru/
  schedule:
    - keyspace: keyspace1
      cron: '0 7 * * *'
    - keyspace: keyspace2
      cron: '30 7 * * *'

  annotations:
    # Example for authorization to AWS S3 using kube2iam
    # Can also be done using environment variables
    iam.amazonaws.com/role: cain

  image:
    repository: maorfr/cain
    tag: 0.6.0

  # Additional arguments for cain
  # Ref: https://github.com/maorfr/cain#usage
  extraArgs: []

  # Add additional environment variables
  env:
    # Example environment variable required for AWS credentials chain
    - name: AWS_REGION
      value: us-east-1

  resources:
    requests:
      memory: 1Gi
      cpu: 1
    limits:
      memory: 1Gi
      cpu: 1

  # Name of the secret containing the credentials of the service account used by GOOGLE_APPLICATION_CREDENTIALS, as a credentials.json file
  # google:
  # serviceAccountSecret:

  # Destination to store the backup artifacts
  # Supported cloud storage services: AWS S3, Minio S3, Azure Blob Storage, Google Cloud Storage
  # Additional support can added. Visit this repository for details
  # Ref: https://github.com/maorfr/skbn
  destination: s3://bucket/cassandra

## Cassandra exported configuration
## ref: https://github.com/criteo/cassandra_exporter
exporter:
  enabled: false
  image:
    repo: criteord/cassandra_exporter
    tag: 2.0.2
  port: 5556
  jvmOpts: ''
  resources:
    {}
    # limits:
    #   cpu: 1
    #   memory: 1Gi
    # requests:
    #   cpu: 1
    #   memory: 1Gi
```

</details>

---

# Cassandra

A Cassandra Chart for Kubernetes

## Install Chart

To install the Cassandra Chart into your Kubernetes cluster (This Chart requires persistent volume by default, you may need to create a storage class before install chart. To create storage class, see [Persist data](#persist_data) section)

```bash
helm install --namespace "cassandra" -n "cassandra" incubator/cassandra
```

After installation succeeds, you can get a status of Chart

```bash
helm status "cassandra"
```

If you want to delete your Chart, use this command

```bash
helm delete  --purge "cassandra"
```

## Persist data

You need to create `StorageClass` before able to persist data in persistent volume.
To create a `StorageClass` on Google Cloud, run the following

```bash
kubectl create -f sample/create-storage-gce.yaml
```

And set the following values in `values.yaml`

```yaml
persistence:
  enabled: true
```

If you want to create a `StorageClass` on other platform, please see documentation here [https://kubernetes.io/docs/user-guide/persistent-volumes/](https://kubernetes.io/docs/user-guide/persistent-volumes/)

When running a cluster without persistence, the termination of a pod will first initiate a decommissioning of that pod.
Depending on the amount of data stored inside the cluster this may take a while. In order to complete a graceful
termination, pods need to get more time for it. Set the following values in `values.yaml`:

```yaml
podSettings:
  terminationGracePeriodSeconds: 1800
```

## Install Chart with specific cluster size

By default, this Chart will create a cassandra with 3 nodes. If you want to change the cluster size during installation, you can use `--set config.cluster_size={value}` argument. Or edit `values.yaml`

For example:
Set cluster size to 5

```bash
helm install --namespace "cassandra" -n "cassandra" --set config.cluster_size=5 incubator/cassandra/
```

## Install Chart with specific resource size

By default, this Chart will create a cassandra with CPU 2 vCPU and 4Gi of memory which is suitable for development environment.
If you want to use this Chart for production, I would recommend to update the CPU to 4 vCPU and 16Gi. Also increase size of `max_heap_size` and `heap_new_size`.
To update the settings, edit `values.yaml`

## Install Chart with specific node

Sometime you may need to deploy your cassandra to specific nodes to allocate resources. You can use node selector by edit `nodes.enabled=true` in `values.yaml`
For example, you have 6 vms in node pools and you want to deploy cassandra to node which labeled as `cloud.google.com/gke-nodepool: pool-db`

Set the following values in `values.yaml`

```yaml
nodes:
  enabled: true
  selector:
    nodeSelector:
      cloud.google.com/gke-nodepool: pool-db
```

## Configuration

The following table lists the configurable parameters of the Cassandra chart and their default values.

| Parameter                            | Description                                                                                  | Default                                                                     |
| ------------------------------------ | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `image.repo`                         | `cassandra` image repository                                                                 | `cassandra`                                                                 |
| `image.tag`                          | `cassandra` image tag                                                                        | `3.11.3`                                                                    |
| `image.pullPolicy`                   | Image pull policy                                                                            | `Always` if `imageTag` is `latest`, else `IfNotPresent`                     |
| `image.pullSecrets`                  | Image pull secrets                                                                           | `nil`                                                                       |
| `config.cluster_domain`              | The name of the cluster domain.                                                              | `cluster.local`                                                             |
| `config.cluster_name`                | The name of the cluster.                                                                     | `cassandra`                                                                 |
| `config.cluster_size`                | The number of nodes in the cluster.                                                          | `3`                                                                         |
| `config.seed_size`                   | The number of seed nodes used to bootstrap new clients joining the cluster.                  | `2`                                                                         |
| `config.seeds`                       | The comma-separated list of seed nodes.                                                      | Automatically generated according to `.Release.Name` and `config.seed_size` |
| `config.num_tokens`                  | Initdb Arguments                                                                             | `256`                                                                       |
| `config.dc_name`                     | Initdb Arguments                                                                             | `DC1`                                                                       |
| `config.rack_name`                   | Initdb Arguments                                                                             | `RAC1`                                                                      |
| `config.endpoint_snitch`             | Initdb Arguments                                                                             | `SimpleSnitch`                                                              |
| `config.max_heap_size`               | Initdb Arguments                                                                             | `2048M`                                                                     |
| `config.heap_new_size`               | Initdb Arguments                                                                             | `512M`                                                                      |
| `config.ports.cql`                   | Initdb Arguments                                                                             | `9042`                                                                      |
| `config.ports.thrift`                | Initdb Arguments                                                                             | `9160`                                                                      |
| `config.ports.agent`                 | The port of the JVM Agent (if any)                                                           | `nil`                                                                       |
| `config.start_rpc`                   | Initdb Arguments                                                                             | `false`                                                                     |
| `configOverrides`                    | Overrides config files in /etc/cassandra dir                                                 | `{}`                                                                        |
| `commandOverrides`                   | Overrides default docker command                                                             | `[]`                                                                        |
| `argsOverrides`                      | Overrides default docker args                                                                | `[]`                                                                        |
| `env`                                | Custom env variables                                                                         | `{}`                                                                        |
| `persistence.enabled`                | Use a PVC to persist data                                                                    | `true`                                                                      |
| `persistence.storageClass`           | Storage class of backing PVC                                                                 | `nil` (uses alpha storage class annotation)                                 |
| `persistence.accessMode`             | Use volume as ReadOnly or ReadWrite                                                          | `ReadWriteOnce`                                                             |
| `persistence.size`                   | Size of data volume                                                                          | `10Gi`                                                                      |
| `resources`                          | CPU/Memory resource requests/limits                                                          | Memory: `4Gi`, CPU: `2`                                                     |
| `service.type`                       | k8s service type exposing ports, e.g. `NodePort`                                             | `ClusterIP`                                                                 |
| `podManagementPolicy`                | podManagementPolicy of the StatefulSet                                                       | `OrderedReady`                                                              |
| `podDisruptionBudget`                | Pod distruption budget                                                                       | `{}`                                                                        |
| `podAnnotations`                     | pod annotations for the StatefulSet                                                          | `{}`                                                                        |
| `updateStrategy.type`                | UpdateStrategy of the StatefulSet                                                            | `OnDelete`                                                                  |
| `livenessProbe.initialDelaySeconds`  | Delay before liveness probe is initiated                                                     | `90`                                                                        |
| `livenessProbe.periodSeconds`        | How often to perform the probe                                                               | `30`                                                                        |
| `livenessProbe.timeoutSeconds`       | When the probe times out                                                                     | `5`                                                                         |
| `livenessProbe.successThreshold`     | Minimum consecutive successes for the probe to be considered successful after having failed. | `1`                                                                         |
| `livenessProbe.failureThreshold`     | Minimum consecutive failures for the probe to be considered failed after having succeeded.   | `3`                                                                         |
| `readinessProbe.initialDelaySeconds` | Delay before readiness probe is initiated                                                    | `90`                                                                        |
| `readinessProbe.periodSeconds`       | How often to perform the probe                                                               | `30`                                                                        |
| `readinessProbe.timeoutSeconds`      | When the probe times out                                                                     | `5`                                                                         |
| `readinessProbe.successThreshold`    | Minimum consecutive successes for the probe to be considered successful after having failed. | `1`                                                                         |
| `readinessProbe.failureThreshold`    | Minimum consecutive failures for the probe to be considered failed after having succeeded.   | `3`                                                                         |
| `rbac.create`                        | Specifies whether RBAC resources should be created                                           | `true`                                                                      |
| `serviceAccount.create`              | Specifies whether a ServiceAccount should be created                                         | `true`                                                                      |
| `serviceAccount.name`                | The name of the ServiceAccount to use                                                        |                                                                             |
| `backup.enabled`                     | Enable backup on chart installation                                                          | `false`                                                                     |
| `backup.schedule`                    | Keyspaces to backup, each with cron time                                                     |                                                                             |
| `backup.annotations`                 | Backup pod annotations                                                                       | iam.amazonaws.com/role: `cain`                                              |
| `backup.image.repository`            | Backup image repository                                                                      | `maorfr/cain`                                                               |
| `backup.image.tag`                   | Backup image tag                                                                             | `0.6.0`                                                                     |
| `backup.extraArgs`                   | Additional arguments for cain                                                                | `[]`                                                                        |
| `backup.env`                         | Backup environment variables                                                                 | AWS_REGION: `us-east-1`                                                     |
| `backup.resources`                   | Backup CPU/Memory resource requests/limits                                                   | Memory: `1Gi`, CPU: `1`                                                     |
| `backup.destination`                 | Destination to store backup artifacts                                                        | `s3://bucket/cassandra`                                                     |
| `backup.google.serviceAccountSecret` | Secret containing credentials if GCS is used as destination                                  |                                                                             |
| `exporter.enabled`                   | Enable Cassandra exporter                                                                    | `false`                                                                     |
| `exporter.image.repo`                | Exporter image repository                                                                    | `criteord/cassandra_exporter`                                               |
| `exporter.image.tag`                 | Exporter image tag                                                                           | `2.0.2`                                                                     |
| `exporter.port`                      | Exporter port                                                                                | `5556`                                                                      |
| `exporter.jvmOpts`                   | Exporter additional JVM options                                                              |                                                                             |
| `exporter.resources`                 | Exporter CPU/Memory resource requests/limits                                                 | `{}`                                                                        |
| `affinity`                           | Kubernetes node affinity                                                                     | `{}`                                                                        |
| `tolerations`                        | Kubernetes node tolerations                                                                  | `[]`                                                                        |

## Scale cassandra

When you want to change the cluster size of your cassandra, you can use the helm upgrade command.

```bash
helm upgrade --set config.cluster_size=5 cassandra incubator/cassandra
```

## Get cassandra status

You can get your cassandra cluster status by running the command

```bash
kubectl exec -it --namespace cassandra $(kubectl get pods --namespace cassandra -l app=cassandra-cassandra -o jsonpath='{.items[0].metadata.name}') nodetool status
```

Output

```bash
Datacenter: asia-east1
======================
Status=Up/Down
|/ State=Normal/Leaving/Joining/Moving
--  Address    Load       Tokens       Owns (effective)  Host ID                               Rack
UN  10.8.1.11  108.45 KiB  256          66.1%             410cc9da-8993-4dc2-9026-1dd381874c54  a
UN  10.8.4.12  84.08 KiB  256          68.7%             96e159e1-ef94-406e-a0be-e58fbd32a830  c
UN  10.8.3.6   103.07 KiB  256          65.2%             1a42b953-8728-4139-b070-b855b8fff326  b
```

## Benchmark

You can use [cassandra-stress](https://docs.datastax.com/en/cassandra/3.0/cassandra/tools/toolsCStress.html) tool to run the benchmark on the cluster by the following command

```bash
kubectl exec -it --namespace cassandra $(kubectl get pods --namespace cassandra -l app=cassandra-cassandra -o jsonpath='{.items[0].metadata.name}') cassandra-stress
```

Example of `cassandra-stress` argument

- Run both read and write with ration 9:1
- Operator total 1 million keys with uniform distribution
- Use QUORUM for read/write
- Generate 50 threads
- Generate result in graph
- Use NetworkTopologyStrategy with replica factor 2

```bash
cassandra-stress mixed ratio\(write=1,read=9\) n=1000000 cl=QUORUM -pop dist=UNIFORM\(1..1000000\) -mode native cql3 -rate threads=50 -log file=~/mixed_autorate_r9w1_1M.log -graph file=test2.html title=test revision=test2 -schema "replication(strategy=NetworkTopologyStrategy, factor=2)"
```
