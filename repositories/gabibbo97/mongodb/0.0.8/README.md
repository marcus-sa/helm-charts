# `@helm-charts/gabibbo97-mongodb`

MongoDB Object Oriented database

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | gabibbo97 |
| Chart Name          | mongodb   |
| Chart Version       | 0.0.8     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
nameOverride: ''
fullnameOverride: ''

# Images
images:
  database:
    repository: mongo
    tag: '4.0.6'
    pullPolicy: IfNotPresent
  tls:
    repository: debian
    tag: '9'
    pullPolicy: Always

# Topology configuration
topology:
  # How many config servers
  configServers: 3
  shards:
    # How many shards
    count: 1
    # How many servers for each shard
    servers: 3
  # How many routers
  routers: 2

# Do not allow clients to communicate directly with cluster members
isolateClusterWithNetworkPolicy: true

# Pod disruption policies
podDisruptionPolicies:
  configServers: 2
  shardServers: 2
  routers: 1

# TLS
tls:
  ca:
    # Choose between
    #   manual        TLS certificate generation is manual
    #   script        Use scripts to generate certificates
    managementMode: script

# Persistent volumes
persistentVolumeClaims:
  enabled: false
  size: 2Gi
```

</details>

---

# mongodb

This is ALPHA QUALITY SOFTWARE, DO NOT INSTALL UNLESS YOU WANT TO ENGAGE IN DEVELOPMENT

[mongodb](https://www.mongodb.com) is an Object Oriented database that provides easy clustering capabilities

## TL;DR

```bash
helm install gabibbo97/mongodb
```

## Configuration options

| Parameter                             | Description                                                  | Default  |
| ------------------------------------- | ------------------------------------------------------------ | :------: |
| `isolateClusterWithNetworkPolicy`     | Isolate the cluster from the other services                  |  `true`  |
| `podDisruptionPolicies.configServers` | How many config servers should be kept available             |   `2`    |
| `podDisruptionPolicies.routers`       | How many routers should be kept available                    |   `1`    |
| `podDisruptionPolicies.shardServers`  | How many shard servers should be kept available              |   `2`    |
| `tls.ca.managementMode`               | How to generate root CA for X509 authentication              | `script` |
| `topology.configServers`              | How many servers to include in the configuration replica set |   `3`    |
| `topology.routers`                    | How many routers to deploy                                   |   `2`    |
| `topology.shards.count`               | How many shards to deploy                                    |   `3`    |
| `topology.shards.servers`             | How many servers to deploy for each shard                    |   `3`    |

## How the different parts interact

```text
+----------------+
| MongoDB Client |
+-------+--------+
        |
        |
        v           Ask about shard distribution
+-------+--------+------------------------------> +-----------------------+
| MongoDB Router |                                | MongoDB Config Server |
+-------+--------+ <------------------------------+-----------------------+
        |           Reply with shard configuration
        |
        |
+-------v--------+
| MongoDB Shard  |
+----------------+
```
