# `@helm-charts/stable-stolon`

Stolon - PostgreSQL cloud native High Availability.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | stolon |
| Chart Version       | 0.2.1  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  repository: sorintlab/stolon
  tag: v0.11.0-pg10
  pullPolicy: IfNotPresent

# used by create-cluster-job when store.backend is etcd
etcdImage:
  repository: k8s.gcr.io/etcd-amd64
  tag: 2.2.5
  pullPolicy: IfNotPresent

debug: false

persistence:
  enabled: true
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  storageClassName: ''
  accessModes:
    - ReadWriteOnce
  size: 10Gi

rbac:
  create: true

serviceAccount:
  create: true
  # The name of the ServiceAccount to use. If not set and create is true, a name is generated using the fullname template
  name:

superuserUsername: 'stolon'

## password for the superuser (REQUIRED)
superuserPassword:

replicationUsername: 'repluser'

## password for the replication user (REQUIRED)
replicationPassword:

## backend could be one of the following: consul, etcdv2, etcdv3 or kubernetes
store:
  backend: kubernetes
  #  endpoints: "http://stolon-consul:8500"
  kubeResourceKind: configmap

pgParameters: {}

ports:
  stolon:
    containerPort: 5432
  metrics:
    containerPort: 8080

keeper:
  replicaCount: 2
  annotations: {}
  resources: {}
  service:
    type: ClusterIP
    annotations: {}
    ports:
      keeper:
        port: 5432
        targetPort: 5432
        protocol: TCP
  nodeSelector: {}
  affinity: {}
  tolerations: []

proxy:
  replicaCount: 2
  annotations: {}
  resources: {}
  service:
    type: ClusterIP
    #    loadBalancerIP: ""
    annotations: {}
    ports:
      proxy:
        port: 5432
        targetPort: 5432
        protocol: TCP
  nodeSelector: {}
  affinity: {}
  tolerations: []

sentinel:
  replicaCount: 2
  annotations: {}
  resources: {}
  nodeSelector: {}
  affinity: {}
  tolerations: []
```

</details>

---

# Stolon Helm Chart

- Installs [Stolon](https://github.com/sorintlab/stolon) (HA PostgreSQL cluster)
- Inspired by [this](https://github.com/lwolf/stolon-chart) and [stolon examples](https://github.com/sorintlab/stolon/tree/master/examples/kubernetes/statefulset)

## TL;DR;

```console
$ helm install stable/stolon
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/stolon
```

## Backend

Kubernetes is the default store backend. `consul`, `etcdv2` or `etcdv3` can also be used as the store backend.

## Configuration

| Parameter                      | Description                                                      | Default                                                                |
| ------------------------------ | ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `image.repository`             | `stolon` image repository                                        | `sorintlab/stolon`                                                     |
| `image.tag`                    | `stolon` image tag                                               | `v0.11.0-pg10`                                                         |
| `image.pullPolicy`             | `stolon` image pull policy                                       | `IfNotPresent`                                                         |
| `etcdImage.repository`         | `etcd` image repository                                          | `k8s.gcr.io/etcd-amd64`                                                |
| `etcdImage.tag`                | `etcd` image tag                                                 | `2.2.5`                                                                |
| `etcdImage.pullPolicy`         | `etcd` image pull policy                                         | `IfNotPresent`                                                         |
| `debug`                        | Debug mode                                                       | `false`                                                                |
| `persistence.enabled`          | Use a PVC to persist data                                        | `true`                                                                 |
| `persistence.storageClassName` | Storage class name of backing PVC                                | `""`                                                                   |
| `persistence.accessModes`      | Perisistent volumes access modes                                 | `["ReadWriteOnce"]`                                                    |
| `persistence.size`             | Size of data volume                                              | `10Gi`                                                                 |
| `rbac.create`                  | Specifies if RBAC resources should be created                    | `true`                                                                 |
| `serviceAccount.create`        | Specifies if ServiceAccount should be created                    | `true`                                                                 |
| `serviceAccount.name`          | Name of the generated serviceAccount                             | Defaults to fullname template                                          |
| `superuserUsername`            | Postgres superuser username                                      | `stolon`                                                               |
| `superuserPassword`            | Postgres superuser password                                      | random 40 characters                                                   |
| `replicationUsername`          | Replication username                                             | `repluser`                                                             |
| `replicationPassword`          | Replication password                                             | random 40 characters                                                   |
| `store.backend`                | Store backend (kubernetes/consul/etcd)                           | `kubernetes`                                                           |
| `store.endpoints`              | Store backend endpoints                                          | `nil`                                                                  |
| `store.kubeResourceKind`       | Kubernetes resource kind (only for kubernetes)                   | `configmap`                                                            |
| `pgParameters`                 | [`postgresql.conf`][pgconf] options used during cluster creation | `{}`                                                                   |
| `ports`                        | Ports to expose on pods                                          | `{"stolon":{"containerPort": 5432},"metrics":{"containerPort": 8080}}` |
| `keeper.replicaCount`          | Number of keeper nodes                                           | `2`                                                                    |
| `keeper.resources`             | Keeper resource requests/limit                                   | `{}`                                                                   |
| `keeper.nodeSelector`          | Node labels for keeper pod assignment                            | `{}`                                                                   |
| `keeper.affinity`              | Affinity settings for keeper pod assignment                      | `{}`                                                                   |
| `keeper.tolerations`           | Toleration labels for keeper pod assignment                      | `[]`                                                                   |
| `proxy.replicaCount`           | Number of proxy nodes                                            | `2`                                                                    |
| `proxy.resources`              | Proxy resource requests/limit                                    | `{}`                                                                   |
| `proxy.nodeSelector`           | Node labels for proxy pod assignment                             | `{}`                                                                   |
| `proxy.affinity`               | Affinity settings for proxy pod assignment                       | `{}`                                                                   |
| `proxy.tolerations`            | Toleration labels for proxy pod assignment                       | `[]`                                                                   |
| `sentinel.replicaCount`        | Number of sentinel nodes                                         | `2`                                                                    |
| `sentinel.resources`           | Sentinel resource requests/limit                                 | `{}`                                                                   |
| `sentinel.nodeSelector`        | Node labels for sentinel pod assignment                          | `{}`                                                                   |
| `sentinel.affinity`            | Affinity settings for sentinel pod assignment                    | `{}`                                                                   |
| `sentinel.tolerations`         | Toleration labels for sentinel pod assignment                    | `[]`                                                                   |

[pgconf]: https://github.com/postgres/postgres/blob/master/src/backend/utils/misc/postgresql.conf.sample
