# `@helm-charts/incubator-cockroachdb`

CockroachDB Helm chart for Kubernetes.

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | incubator   |
| Chart Name          | cockroachdb |
| Chart Version       | 0.1.0       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for cockroachdb.
# This is a YAML-formatted file.
# Declare name/value pairs to be passed into your templates.
# name: value

Name: 'cockroachdb'
Image: 'cockroachdb/cockroach'
ImageTag: 'latest' # Keep at latest until 1.0, then switch to a specific version
ImagePullPolicy: 'Always'
BootstrapImage: 'cockroachdb/cockroach-k8s-init'
BootstrapImageTag: '0.1'
Replicas: 3
Component: 'cockroachdb'
GrpcPort: 26257
HttpPort: 8080
Resources:
  requests:
    cpu: '100m'
    memory: '512Mi'
Storage: '1Gi'
StorageClass: 'anything'
```

</details>

---

# CockroachDB Helm Chart

## Prerequisites Details

- Kubernetes 1.4 with alpha APIs enabled
- PV support on the underlying infrastructure

## PetSet Details

- http://kubernetes.io/docs/user-guide/petset/

## PetSet Caveats

- http://kubernetes.io/docs/user-guide/petset/#alpha-limitations

## Todo

- Support setting up clusters with certificate-based authentication

## Chart Details

This chart will do the following:

- Set up a dynamically scalable CockroachDB cluster using a Kubernetes PetSet

## Installing the Chart

To install the chart with the release name `my-release`:

```shell
helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
helm install --name my-release incubator/cockroachdb
```

## Configuration

The following tables lists the configurable parameters of the CockroachDB chart and their default values.

| Parameter         | Description                      | Default                 |
| ----------------- | -------------------------------- | ----------------------- |
| `Name`            | Chart name                       | `cockroachdb`           |
| `Image`           | Container image name             | `cockroachdb/cockroach` |
| `ImageTag`        | Container image tag              | `latest`                |
| `ImagePullPolicy` | Container pull policy            | `Always`                |
| `Replicas`        | k8s petset replicas              | `3`                     |
| `Component`       | k8s selector key                 | `cockroachdb`           |
| `GrpcPort`        | CockroachDB primary serving port | `26257`                 |
| `HttpPort`        | CockroachDB HTTP port            | `8080`                  |
| `Cpu`             | Container requested cpu          | `100m`                  |
| `Memory`          | Container requested memory       | `512Mi`                 |
| `Storage`         | Persistent volume size           | `1Gi`                   |
| `StorageClass`    | Persistent volume class          | `anything`              |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```shell
helm install --name my-release -f values.yaml incubator/cockroachdb
```

> **Tip**: You can use the default [values.yaml](values.yaml)

# Deep dive

## Connecting to the CockroachDB cluster

Once you've created the cluster, you can start talking to it it by connecting
to its "public" service. CockroachDB is PostgreSQL wire protocol compatible so
there's a [wide variety of supported
clients](https://www.cockroachlabs.com/docs/install-client-drivers.html). For
the sake of example, we'll open up a SQL shell using CockroachDB's built-in
shell and play around with it a bit, like this (likely needing to replace
"my-release-cockroachdb-public" with the name of the "-public" service that
was created with your installed chart):

```console
$ kubectl run -it --rm cockroach-client \
    --image=cockroachdb/cockroach \
    --restart=Never \
    --command -- ./cockroach sql --host my-release-cockroachdb-public
Waiting for pod default/cockroach-client to be running, status is Pending,
pod ready: false
If you don't see a command prompt, try pressing enter.
root@my-release-cockroachdb-public:26257> SHOW DATABASES;
+--------------------+
|      Database      |
+--------------------+
| information_schema |
| pg_catalog         |
| system             |
+--------------------+
(3 rows)
root@my-release-cockroachdb-public:26257> CREATE DATABASE bank;
CREATE DATABASE
root@my-release-cockroachdb-public:26257> CREATE TABLE bank.accounts (id INT
PRIMARY KEY, balance DECIMAL);
CREATE TABLE
root@my-release-cockroachdb-public:26257> INSERT INTO bank.accounts VALUES
(1234, 10000.50);
INSERT 1
root@my-release-cockroachdb-public:26257> SELECT * FROM bank.accounts;
+------+---------+
|  id  | balance |
+------+---------+
| 1234 | 10000.5 |
+------+---------+
(1 row)
root@my-release-cockroachdb-public:26257> \q
Waiting for pod default/cockroach-client to terminate, status is Running
pod "cockroach-client" deleted
```

## Cluster health

Because our pod spec includes regular health checks of the CockroachDB processes,
simply running `kubectl get pods` and looking at the `STATUS` column is sufficient
to determine the health of each instance in the cluster.

If you want more detailed information about the cluster, the best place to look
is the admin UI.

## Accessing the admin UI

If you want to see information about how the cluster is doing, you can try
pulling up the CockroachDB admin UI by port-forwarding from your local machine
to one of the pods (replacing "release-cockroachdb-0" with one of your pods' names):

```shell
kubectl port-forward release-cockroachdb-0 8080
```

Once you???ve done that, you should be able to access the admin UI by visiting
http://localhost:8080/ in your web browser.

## Failover

If any CockroachDB member fails it gets restarted or recreated automatically by
the Kubernetes infrastructure, and will rejoin the cluster automatically when
it comes back up. You can test this scenario by killing any of the pets:

```shell
kubectl delete pod my-release-cockroachdb-1
```

```shell
$ kubectl get pods -l "component=my-release-cockroachdb"
NAME                      READY     STATUS        RESTARTS   AGE
my-release-cockroachdb-0  1/1       Running       0          5m
my-release-cockroachdb-2  1/1       Running       0          5m
```

After a while:

```console
$ kubectl get pods -l "component=my-release-cockroachdb"
NAME                      READY     STATUS        RESTARTS   AGE
my-release-cockroachdb-0  1/1       Running       0          5m
my-release-cockroachdb-1  1/1       Running       0          20s
my-release-cockroachdb-2  1/1       Running       0          5m
```

You can check state of re-joining from the new pod's logs:

```console
$ kubectl logs my-release-cockroachdb-1
[...]
I161028 19:32:09.754026 1 server/node.go:586  [n1] node connected via gossip and
verified as part of cluster {"35ecbc27-3f67-4e7d-9b8f-27c31aae17d6"}
[...]
cockroachdb-0.my-release-cockroachdb.default.svc.cluster.local:26257
build:      beta-20161027-55-gd2d3c7f @ 2016/10/28 19:27:25 (go1.7.3)
admin:      http://0.0.0.0:8080
sql:
postgresql://root@my-release-cockroachdb-1.my-release-cockroachdb.default.svc.cluster.local:26257?sslmode=disable
logs:       cockroach-data/logs
store[0]:   path=cockroach-data
status:     restarted pre-existing node
clusterID:  {35ecbc27-3f67-4e7d-9b8f-27c31aae17d6}
nodeID:     2
[...]
```

## Scaling

Scaling should typically be managed via the `helm upgrade` command, but PetSets
don't yet work with `helm upgrade`. In the meantime until `helm upgrade` works,
if you want to change the number of replicas, you can use the `kubectl patch`
command with the desired number of replicas, as shown below (or see the
[PetSet documentation](http://kubernetes.io/docs/user-guide/petset/#scaling-a-petset)
for more options):

```shell
kubectl patch petset my-release-cockroachdb -p '{"spec":{"replicas":4}}'
```
