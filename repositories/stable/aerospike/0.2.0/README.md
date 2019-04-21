# `@helm-charts/stable-aerospike`

A Helm chart for Aerospike in Kubernetes

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | aerospike |
| Chart Version       | 0.2.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for aerospike.
terminationGracePeriodSeconds: 30
replicaCount: 1
nodeSelector: {}
image:
  repository: aerospike/aerospike-server
  tag: 3.14.1.2
  pullPolicy: IfNotPresent

# pass custom command. This is equivalent of Entrypoint in docker
command: []

# pass custom args. This is equivalent of Cmd in docker
args: []

# Set as empty object {} if no volumes need to be created
# See confFile below
persistentVolume:
  {}
  # - mountPath: /opt/aerospike/data
  #   name: aerospike-data
  #   template:
  #     accessModes: [ "ReadWriteOnce" ]
  #     # storageClassName:  "standard"
  #     resources:
  #       requests:
  #         storage: "36G"
  #     selector:
  #       matchLabels:
  #         diskname: "aerospike-data"

service:
  type: ClusterIP
  annotations: {}
  loadBalancerIP:
  clusterIP: None
  # This field takes a list of IP CIDR ranges, which Kubernetes will use to configure firewall exceptions
  # loadBalancerSourceRanges:
  # - 10.0.0.0/8

meshService:
  annotations: {}

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

confFile: |-
  #default config file
  service {
      user root
      group root
      paxos-single-replica-limit 1
      pidfile /var/run/aerospike/asd.pid
      service-threads 4
      transaction-queues 4
      transaction-threads-per-queue 4
      proto-fd-max 15000
  }
  logging {
      file /var/log/aerospike/aerospike.log {
      context any info
      }

      console {
      context any info
      }
  }
  network {
      service {
      address any
      port 3000
      }
      heartbeat {
      address any
      interval 150
      #REPLACE_THIS_LINE_WITH_MESH_CONFIG
      mode mesh
      port 3002
      timeout 20
      protocol v3

      }
      fabric {
      port 3001
      }

      info {
      port 3003
      }
  }

  namespace test {
      replication-factor 2
      memory-size 1G
      default-ttl 5d
      storage-engine device {
      file /opt/aerospike/data/test.dat
      filesize 4G
      }
  }
```

</details>

---

# Aerospike Helm Chart

This is an implementation of Aerospike StatefulSet found here:

- https://github.com/aerospike/aerospike-kubernetes

## Pre Requisites:

- Kubernetes 1.7+ with beta APIs enabled and support for statefulsets

- PV support on underlying infrastructure (only if you are provisioning persistent volume).

- Requires at least `v2.5.0` version of helm to support

## StatefulSet Details

- https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/

## StatefulSet Caveats

- https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#limitations

## Chart Details

This chart will do the following:

- Implement a dynamically scalable Aerospike cluster using Kubernetes StatefulSets

### Installing the Chart

To install the chart with the release name `my-aerospike` using a dedicated namespace(recommended):

```
$ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
$ helm install --name my-aerospike --namespace aerospike stable/aerospike
```

The chart can be customized using the following configurable parameters:

| Parameter                       | Description                                                     | Default                      |
| ------------------------------- | --------------------------------------------------------------- | ---------------------------- |
| `image.repository`              | Aerospike Container image name                                  | `aerospike/aerospike-server` |
| `image.tag`                     | Aerospike Container image tag                                   | `3.14.1.2`                   |
| `image.pullPolicy`              | Aerospike Container pull policy                                 | `Always`                     |
| `replicaCount`                  | Aerospike Brokers                                               | `1`                          |
| `command`                       | Custom command (Docker Entrypoint)                              | `[]`                         |
| `args`                          | Custom args (Docker Cmd)                                        | `[]`                         |
| `persistentVolume`              | config of persistent volumes for storage-engine                 | `{}`                         |
| `confFile`                      | config filename. This file should be included in the chart path | `aerospike.conf`             |
| `resources`                     | resource requests and limits                                    | `{}`                         |
| `nodeSelector`                  | Labels for pod assignment                                       | `{}`                         |
| `terminationGracePeriodSeconds` | wit time before forcefully terminating container                | `30`                         |

Specify parameters using `--set key=value[,key=value]` argument to `helm install`

Alternatively a YAML file that specifies the values for the parameters can be provided like this:

```bash
$ helm install --name my-aerospike -f values.yaml stable/aerospike
```

### Conf files for Aerospike

There is one conf file added to each Aerospike release. This conf file can be replaced with a custom file and updating the `confFile` value.

If you modify the `aerospike.conf` (and you use more than 1 replica), you want to add the `#REPLACE_THIS_LINE_WITH_MESH_CONFIG` comment to the config file (see the default conf file). This will update your mesh to connect each replica.

## Known Limitations

- Persistent volume claims tested only on GCP
- Aerospike cluster is not accessible via an external endpoint
