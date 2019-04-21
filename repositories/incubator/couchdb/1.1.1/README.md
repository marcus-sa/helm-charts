# `@helm-charts/incubator-couchdb`

A database featuring seamless multi-master sync, that scales from big data to mobile, with an intuitive HTTP/JSON API and designed for reliability.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | couchdb   |
| Chart Version       | 1.1.1     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## clusterSize is the initial size of the CouchDB cluster.
clusterSize: 3

## If allowAdminParty is enabled the cluster will start up without any database
## administrator account; i.e., all users will be granted administrative
## access. Otherwise, the system will look for a Secret called
## <ReleaseName>-couchdb containing `adminUsername`, `adminPassword` and
## `cookieAuthSecret` keys. See the `createAdminSecret` flag.
## ref: https://kubernetes.io/docs/concepts/configuration/secret/
allowAdminParty: false

## If createAdminSecret is enabled a Secret called <ReleaseName>-couchdb will
## be created containing auto-generated credentials. Users who prefer to set
## these values themselves have a couple of options:
##
## 1) The `adminUsername`, `adminPassword`, and `cookieAuthSecret` can be
##    defined directly in the chart's values. Note that all of a chart's values
##    are currently stored in plaintext in a ConfigMap in the tiller namespace.
##
## 2) This flag can be disabled and a Secret with the required keys can be
##    created ahead of time.
createAdminSecret: true

adminUsername: admin
# adminPassword: this_is_not_secure
# cookieAuthSecret: neither_is_this

## The storage volume used by each Pod in the StatefulSet. If a
## persistentVolume is not enabled, the Pods will use `emptyDir` ephemeral
## local storage. Setting the storageClass attribute to "-" disables dynamic
## provisioning of Persistent Volumes; leaving it unset will invoke the default
## provisioner.
persistentVolume:
  enabled: false
  accessModes:
    - ReadWriteOnce
  size: 10Gi
  # storageClass: "-"

## The CouchDB image
image:
  repository: couchdb
  tag: 2.3.0
  pullPolicy: IfNotPresent

## Sidecar that connects the individual Pods into a cluster
helperImage:
  repository: kocolosk/couchdb-statefulset-assembler
  tag: 1.2.0
  pullPolicy: IfNotPresent

initImage:
  repository: busybox
  tag: latest
  pullPolicy: Always

## CouchDB is happy to spin up cluster nodes in parallel, but if you encounter
## problems you can try setting podManagementPolicy to the StatefulSet default
## `OrderedReady`
podManagementPolicy: Parallel

## To better tolerate Node failures, we can prevent Kubernetes scheduler from
## assigning more than one Pod of CouchDB StatefulSet per Node using podAntiAffinity.
affinity:
  # podAntiAffinity:
  #   requiredDuringSchedulingIgnoredDuringExecution:
  #     - labelSelector:
  #         matchExpressions:
  #           - key: "app"
  #             operator: In
  #             values:
  #             - couchdb
  #       topologyKey: "kubernetes.io/hostname"

## A StatefulSet requires a headless Service to establish the stable network
## identities of the Pods, and that Service is created automatically by this
## chart without any additional configuration. The Service block below refers
## to a second Service that governs how clients connect to the CouchDB cluster.
service:
  enabled: true
  type: ClusterIP
  externalPort: 5984

## An Ingress resource can provide name-based virtual hosting and TLS
## termination among other things for CouchDB deployments which are accessed
## from outside the Kubernetes cluster.
## ref: https://kubernetes.io/docs/concepts/services-networking/ingress/
ingress:
  enabled: false
  hosts:
    - chart-example.local
  annotations:
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  tls:
    # Secrets must be manually created in the namespace.
    # - secretName: chart-example-tls
    #   hosts:
    #     - chart-example.local

## Optional resource requests and limits for the CouchDB container
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
resources:
  {}
  # requests:
  #  cpu: 100m
  #  memory: 128Mi
  # limits:
  #  cpu: 56
  #  memory: 256Gi

## erlangFlags is a map that is passed to the Erlang VM as flags using the
## ERL_FLAGS env. `name` and `setcookie` flags are minimally required to
## establish connectivity between cluster nodes.
## ref: http://erlang.org/doc/man/erl.html#init_flags
erlangFlags:
  name: couchdb
  setcookie: monster

## couchdbConfig will override default CouchDB configuration settings.
## The contents of this map are reformatted into a .ini file laid down
## by a ConfigMap object.
## ref: http://docs.couchdb.org/en/latest/config/index.html
couchdbConfig:
  # cluster:
  #   q: 8 # Create 8 shards for each database
  chttpd:
    bind_address: any
    # chttpd.require_valid_user disables all the anonymous requests to the port
    # 5984 when is set to true.
    require_valid_user: false
```

</details>

---

# CouchDB

Apache CouchDB is a database featuring seamless multi-master sync, that scales
from big data to mobile, with an intuitive HTTP/JSON API and designed for
reliability.

This chart deploys a CouchDB cluster as a StatefulSet. It creates a ClusterIP
Service in front of the Deployment for load balancing by default, but can also
be configured to deploy other Service types or an Ingress Controller. The
default persistence mechanism is simply the ephemeral local filesystem, but
production deployments should set `persistentVolume.enabled` to `true` to attach
storage volumes to each Pod in the Deployment.

## TL;DR

```bash
$ helm install incubator/couchdb --set allowAdminParty=true
```

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
$ helm install --name my-release incubator/couchdb
```

This will create a Secret containing the admin credentials for the cluster.
Those credentials can be retrieved as follows:

```bash
$ kubectl get secret my-release-couchdb -o go-template='{{ .data.adminPassword }}' | base64 --decode
```

If you prefer to configure the admin credentials directly you can create a
Secret containing `adminUsername`, `adminPassword` and `cookieAuthSecret` keys:

```bash
$  kubectl create secret generic my-release-couchdb --from-literal=adminUsername=foo --from-literal=adminPassword=bar --from-literal=cookieAuthSecret=baz
```

and then install the chart while overriding the `createAdminSecret` setting:

```bash
$ helm install --name my-release --set createAdminSecret=false incubator/couchdb
```

This Helm chart deploys CouchDB on the Kubernetes cluster in a default
configuration. The [configuration](#configuration) section lists
the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` Deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and
deletes the release.

## Upgrading an existing Release to a new major version

A major chart version change (like v0.2.3 -> v1.0.0) indicates that there is an
incompatible breaking change needing manual actions.

### 1.0.0

This version removes the `chart` and `heritage` labels from the
`volumeClaimTemplates` which is immutable and prevents chart from being upgraded
(see https://github.com/helm/charts/issues/7803 for details).

In order to upgrade, delete the CouchDB StatefulSet before upgrading:

```bash
$ kubectl delete statefulsets --cascade=false my-release-couchdb
```

## Configuration

The following table lists the most commonly configured parameters of the
CouchDB chart and their default values:

| Parameter                  | Description                                             | Default                            |
| -------------------------- | ------------------------------------------------------- | ---------------------------------- |
| `clusterSize`              | The initial number of nodes in the CouchDB cluster      | 3                                  |
| `couchdbConfig`            | Map allowing override elements of server .ini config    | chttpd.bind_address=any            |
| `allowAdminParty`          | If enabled, start cluster without admin account         | false (requires creating a Secret) |
| `createAdminSecret`        | If enabled, create an admin account and cookie secret   | true                               |
| `erlangFlags`              | Map of flags supplied to the underlying Erlang VM       | name: couchdb, setcookie: monster  |
| `persistentVolume.enabled` | Boolean determining whether to attach a PV to each node | false                              |
| `persistentVolume.size`    | If enabled, the size of the persistent volume to attach | 10Gi                               |

A variety of other parameters are also configurable. See the comments in the
`values.yaml` file for further details:

| Parameter                       | Default                                |
| ------------------------------- | -------------------------------------- |
| `adminUsername`                 | admin                                  |
| `adminPassword`                 | auto-generated                         |
| `cookieAuthSecret`              | auto-generated                         |
| `helperImage.repository`        | kocolosk/couchdb-statefulset-assembler |
| `helperImage.tag`               | 1.2.0                                  |
| `helperImage.pullPolicy`        | IfNotPresent                           |
| `image.repository`              | couchdb                                |
| `image.tag`                     | 2.3.0                                  |
| `image.pullPolicy`              | IfNotPresent                           |
| `initImage.repository`          | busybox                                |
| `initImage.tag`                 | latest                                 |
| `initImage.pullPolicy`          | Always                                 |
| `ingress.enabled`               | false                                  |
| `ingress.hosts`                 | chart-example.local                    |
| `ingress.annotations`           |                                        |
| `ingress.tls`                   |                                        |
| `persistentVolume.accessModes`  | ReadWriteOnce                          |
| `persistentVolume.storageClass` | Default for the Kube cluster           |
| `podManagementPolicy`           | Parallel                               |
| `affinity`                      |                                        |
| `resources`                     |                                        |
| `service.enabled`               | true                                   |
| `service.type`                  | ClusterIP                              |
| `service.externalPort`          | 5984                                   |
