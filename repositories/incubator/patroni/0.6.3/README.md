# `@helm-charts/incubator-patroni`

Highly available elephant herd: HA PostgreSQL cluster.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | patroni   |
| Chart Version       | 0.6.3     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
Name: patroni

Component: patroni
ImagePullPolicy: IfNotPresent

# The image to use. Spilo is the dockerized Patroni
Spilo:
  # this image was built from https://github.com/zalando/spilo/tree/master/postgres-appliance
  Image: registry.opensource.zalan.do/acid/spilo-9.6
  Version: 1.3-p4

# How many postgres containers to spawn
Replicas: 5

# Resource limits per replica
Resources:
  Cpu: 100m
  Memory: 512Mi

# Node selector for Patroni pods
# NodeSelector:
#  cloud.google.com/gke-nodepool: highmem-pool

# Credentials used by Patroni
# * more information: https://github.com/zalando/patroni/blob/master/docs/SETTINGS.rst#postgresql
Credentials:
  Superuser: tea
  Standby: pinacolada

## Distribution Configuration stores. Please note that only one of the following stores should be selected.
Etcd:
  Enable: true
  DeployChart: true
  # if not deploying etcd chart, fill-in value for etcd host (etcd.default.svc.cluster.local)
  Host:
  # leave blank to use vendored etcd chart
  Discovery:
Zookeeper:
  Enable: false
  DeployChart: false
  # if not deploying etcd chart, fill-in list of ZooKeeper cluster members in format: 'host1:port1','host2:port2','etc...'
  Hosts:

WalE:
  Enable: false
  Schedule_Cron_Job: 00 01 * * *
  Retain_Backups: 2
  S3_Bucket:
  GCS_Bucket:
  Kubernetes_Secret:
  Backup_Threshold_Megabytes: 1024
  Backup_Threshold_Percentage: 30

persistentVolume:
  size: 1G
  storageClass: ''
  subPath: ''
  mountPath: '/home/postgres/pgdata'
  annotations: {}
  accessModes:
    - ReadWriteOnce

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:
```

</details>

---

# Patroni Helm Chart

This directory contains a Kubernetes chart to deploy a five node patroni cluster using a statefulset.

## Prerequisites Details

- Kubernetes 1.5
- PV support on the underlying infrastructure

## Statefulset Details

- https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/

## Statefulset Caveats

- https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#limitations

## Todo

- Make namespace configurable

## Chart Details

This chart will do the following:

- Implement a HA scalable PostgreSQL cluster using Kubernetes PetSets

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm repo add incubator https://kubernetes-charts-incubator.storage.googleapis.com/
$ helm dependency update
$ helm install --name my-release incubator/patroni
```

## Connecting to Postgres

Your access point is a cluster IP. In order to access it spin up another pod:

```console
$ kubectl run -i --tty ubuntu --image=ubuntu:16.04 --restart=Never -- bash -il
```

Then, from inside the pod, connect to postgres:

```console
$ apt-get update && apt-get install postgresql-client -y
$ psql -U admin -h my-release-patroni.default.svc.cluster.local postgres
<admin password from values.yaml>
postgres=>
```

## Configuration

The following table lists the configurable parameters of the patroni chart and their default values.

| Parameter                          | Description                                                                                                                    | Default                                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| `Name`                             | Service name                                                                                                                   | `patroni`                                           |
| `Spilo.Image`                      | Container image name                                                                                                           | `registry.opensource.zalan.do/acid/spilo-9.5`       |
| `Spilo.Version`                    | Container image tag                                                                                                            | `1.0-p5`                                            |
| `ImagePullPolicy`                  | Container pull policy                                                                                                          | `IfNotPresent`                                      |
| `Replicas`                         | k8s statefulset replicas                                                                                                       | `5`                                                 |
| `NodeSelector`                     | nodeSelector map                                                                                                               | Empty                                               |
| `Component`                        | k8s selector key                                                                                                               | `patroni`                                           |
| `Resources.Cpu`                    | container requested cpu                                                                                                        | `100m`                                              |
| `Resources.Memory`                 | container requested memory                                                                                                     | `512Mi`                                             |
| `Credentials.Superuser`            | password for the superuser                                                                                                     | `tea`                                               |
| `Credentials.Standby`              | password for the replication user                                                                                              | `pinacolada`                                        |
| `Etcd.Enable`                      | using etcd as DCS                                                                                                              | `true`                                              |
| `Etcd.DeployChart`                 | deploy etcd chart                                                                                                              | `true`                                              |
| `Etcd.Host`                        | host name of etcd cluster                                                                                                      | not used (Etcd.Discovery is used instead)           |
| `Etcd.Discovery`                   | domain name of etcd cluster                                                                                                    | `<release-name>-etcd.<namespace>.svc.cluster.local` |
| `Zookeeper.Enable`                 | using zookeeper as DCS                                                                                                         | `false`                                             |
| `Zookeeper.DeployChart`            | deploy zookeeper chart                                                                                                         | `false`                                             |
| `Zookeeper.Hosts`                  | list of zookeeper cluster members                                                                                              | 'host1:port1','host2:port2','etc...'                |
| `WalE.Enable`                      | use of wal-e tool for base backup/restore                                                                                      | `false`                                             |
| `WalE.Schedule_Cron_Job`           | schedule of wal-e backups                                                                                                      | `00 01 * * *`                                       |
| `WalE.Retain_Backups`              | number of backups to retain                                                                                                    | `2`                                                 |
| `WalE.S3_Bucket:`                  | Amazon S3 bucket used for wal-e backups                                                                                        | ``                                                  |
| `WalE.GCS_Bucket`                  | Google cloud plataform storage used for wal-e backups                                                                          | ``                                                  |
| `WalE.Kubernetes_Secret`           | kubernetes secret for provider bucket                                                                                          | ``                                                  |
| `WalE.Backup_Threshold_Megabytes`  | maximum size of the WAL segments accumulated after the base backup to consider WAL-E restore instead of pg_basebackup          | `1024`                                              |
| `WalE.Backup_Threshold_Percentage` | maximum ratio (in percents) of the accumulated WAL files to the base backup to consider WAL-E restore instead of pg_basebackup | `30`                                                |
| `persistentVolume.accessModes`     | Persistent Volume access modes                                                                                                 | `[ReadWriteOnce]`                                   |
| `persistentVolume.annotations`     | Annotations for Persistent Volume Claim`|`{}`                                                                                  |
| `persistentVolume.mountPath`       | Persistent Volume mount root path                                                                                              | `/home/postgres/pgdata`                             |
| `persistentVolume.size`            | Persistent Volume size                                                                                                         | `2Gi`                                               |
| `persistentVolume.storageClass`    | Persistent Volume Storage Class                                                                                                | `volume.alpha.kubernetes.io/storage-class: default` |
| `persistentVolume.subPath`         | Subdirectory of Persistent Volume to mount                                                                                     | `""`                                                |
| `rbac.create`                      | create required role and rolebindings                                                                                          | `true`                                              |
| `serviceAccount.create`            | If true, create a new service account                                                                                          | `true`                                              |
| `serviceAccount.name`              | Service account to be used. If not set and serviceAccount.create is `true`, a name is generated using the fullname template    | ``                                                  |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml incubator/patroni
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Cleanup

In order to remove everything you created a simple `helm delete <release-name>` isn't enough (as of now), but you can do the following:

```console
$ release=<release-name>
$ helm delete $release
$ grace=$(kubectl get po $release-patroni-0 --template '{{.spec.terminationGracePeriodSeconds}}')
$ kubectl delete statefulset,po -l release=$release
$ sleep $grace
$ kubectl delete pvc -l release=$release
```

## Internals

Patroni is responsible for electing a Postgres master pod by leveraging etcd.
It then exports this master via a Kubernetes service and a label query that filters for `spilo-role=master`.
This label is dynamically set on the pod that acts as the master and removed from all other pods.
Consequently, the service endpoint will point to the current master.

```console
$ kubectl get pods -l spilo-role -L spilo-role
NAME                   READY     STATUS    RESTARTS   AGE       SPILO-ROLE
my-release-patroni-0   1/1       Running   0          9m        replica
my-release-patroni-1   1/1       Running   0          9m        master
my-release-patroni-2   1/1       Running   0          8m        replica
my-release-patroni-3   1/1       Running   0          8m        replica
my-release-patroni-4   1/1       Running   0          8m        replica
```
