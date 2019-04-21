# `@helm-charts/incubator-orientdb`

A Helm chart for Distributed OrientDB

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | orientdb  |
| Chart Version       | 0.1.2     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
replicaCount: 1

# random if not set
# rootPassword: root123

image:
  name: orientdb
  tag: 3.0.13
  pullPolicy: IfNotPresent

# distributed settings for default-distributed-db-config.json
distributed:
  enabled: false
  autoDeploy: true
  executionMode: undefined
  readQuorum: 1
  writeQuorum: majority
  newNodeStrategy: static
  readYourWrites: true

service:
  type: ClusterIP
  orientHttp: 2480
  hazelcast: 2434
  orientBinary: 2424
  gremlinWebsocket: 8182

ingress:
  enabled: false
  annotations: {}

resources:
  requests:
    cpu: '500m'
    memory: '2Gi'
  limits:
    cpu: '2000m'
    memory: '8Gi'

jvm: {}
# Optional jvm settings:
#  memory: "-Xms800m -Xmx800m"
#  options: "-Djna.nosys=true -XX:+HeapDumpOnOutOfMemoryError -Djava.awt.headless=true -Dfile.encoding=UTF8 -Drhino.opt.level=9"
#  settings: "-Dstorage.diskCache.bufferSize=7200"

nodeSelector: {}

tolerations: []

affinity: {}

readinessProbe:
  enabled: true

livenessProbe:
  enabled: true

hazelcast:
  groupName: orientdb
  groupPassword: orientdb

persistence:
  enabled: true
  storage:
    accessMode:
      - ReadWriteOnce
    size: 10Gi
  backup:
    accessMode:
      - ReadWriteOnce
    size: 2Gi

config:
  overrideHazelcastConfig: true
  overrideOrientdbServerConfig: true
  overrideGremlinServerConfig: true
  overrideDistributedDbConfig: true

testing:
  enabled: false
```

</details>

---

# Infinity OrientDB helm chart

Orient DB helm chart

## Installation:

`helm install . --name <RELEASE-NAME> --namespace <NAMESPACE> --set rootpassword=<PASSWORD>`

If rootPassword is not set, a random one will be used.

## Scaling:

Get the name of your statefulset:

`kubectl get statefulsets -n <NAMESPACE>`

Then scale it:

`kubectl scale <STATEFULSET-NAME> --replicas=<DESIRED-SIZE>`

This scaling is possible due to the hazelcast plugin used for node discovery. For more information check the config file under config/hazelcast.xml and at http://docs.hazelcast.org/docs/3.0/manual/html/ch12s02.html

## Testing:

`helm test <RELEASE-NAME> --cleanup --timeout 1000`

## Accessing the UI

`kubectl port-forward <POD-NAME> 2480:2480 -n <NAMESPACE>`

Note: POD-NAME is any pod from the statefulset.

## Editing the hazelcast configuration

The hazelcast configuration can be edited at runtime by editing the config.yaml file in the templates of the orient. As of right now only the hazelcast file can be edited dynamically

## Maintainers

Product Engineering Team (AKA The Sommeliers) @ [B-yond](https://www.b-yond.com)
E: <sommeliers@b-yond.com>
