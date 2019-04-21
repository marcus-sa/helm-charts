# `@helm-charts/presslabs-mysql-operator`

A Helm chart for mysql operator

| Field               | Value          |
| ------------------- | -------------- |
| Repository Name     | presslabs      |
| Chart Name          | mysql-operator |
| Chart Version       | 0.1.8          |
| NPM Package Version | 0.1.0          |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for mysql-operator.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1
image: quay.io/presslabs/mysql-operator:v0.1.5
imagePullPolicy: IfNotPresent
helperImage: quay.io/presslabs/mysql-helper:v0.1.5

installCRDs: true

resources:
  {}
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}

extraArgs: []

rbac:
  create: true
  serviceAccountName: default

orchestrator:
  orchestratorConf:
    # the operator is handling the registries, do not auto discover
    DiscoverByShowSlaveHosts: false
    # forget missing instances automatically
    UnseenInstanceForgetHours: 1

    InstancePollSeconds: 5
    HostnameResolveMethod: 'none'
    MySQLHostnameResolveMethod: '@@report_host'
    RemoveTextFromHostnameDisplay: ':3306'
    DetectClusterAliasQuery: "SELECT CONCAT(SUBSTRING(@@hostname, 1, LENGTH(@@hostname) - 1 - LENGTH(SUBSTRING_INDEX(@@hostname,'-',-2))),'.',SUBSTRING_INDEX(@@report_host,'.',-1))"
    DetectInstanceAliasQuery: 'SELECT @@hostname'
    SlaveLagQuery: 'SELECT TIMESTAMPDIFF(SECOND,ts,NOW()) as drift FROM sys_operator.heartbeat WHERE server_id <> @@server_id ORDER BY drift ASC LIMIT 1'

    # Automated recovery (this is opt-in, so we need to set these)
    # Prevent recovery flip-flop, by disabling auto-recovery for 5 minutes per
    # cluster
    RecoveryPeriodBlockSeconds: 300
    # Do not ignore any host for auto-recovery
    RecoveryIgnoreHostnameFilters: []
    # Recover both, masters and intermediate masters
    RecoverMasterClusterFilters: ['.*']
    RecoverIntermediateMasterClusterFilters: ['.*']
    # `reset slave all` and `set read_only=0` on promoted master
    ApplyMySQLPromotionAfterMasterFailover: true
    # set downtime on the failed master
    MasterFailoverLostInstancesDowntimeMinutes: 10
    # https://github.com/github/orchestrator/blob/master/docs/configuration-recovery.md#promotion-actions
    # Safety! do not disable unless you know what you are doing
    FailMasterPromotionIfSQLThreadNotUpToDate: true
    DetachLostReplicasAfterMasterFailover: true
```

</details>

---

# mysql-operator

This is the helm chart for [mysql-operator](https://github.com/presslabs/mysql-operator).

## TL;DR

```
helm repo add presslabs https://presslabs.github.io/charts
helm install presslabs/mysql-operator --name mysql-operator
```

## Configuration

The following table contains the configuration parameters for mysql-operator and default values.

| Parameter                 | Description                                                                                                                                                | Default value                             |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `replicaCount`            | replicas for controller                                                                                                                                    | `1`                                       |
| `image`                   | controller container image                                                                                                                                 | `quay.io/presslabs/mysql-operator:v0.1.5` |
| `imagePullPolicy`         | controller image pull policy                                                                                                                               | `IfNotPresent`                            |
| `helperImage`             | mysql helper image                                                                                                                                         | `quay.io/presslabs/mysql-helper:v0.1.5`   |
| `installCRDs`             | whether or not to install CRDS                                                                                                                             | `true`                                    |
| `resources`               | controller pod resources                                                                                                                                   | `{}`                                      |
| `nodeSelector`            | controller pod nodeSelector                                                                                                                                | `{}`                                      |
| `tolerations`             | controller pod tolerations                                                                                                                                 | `{}`                                      |
| `affinity`                | controller pod affinity                                                                                                                                    | `{}`                                      |
| `extraArgs`               | args that are passed to controller                                                                                                                         | `[]`                                      |
| `rbac.create`             | whether or not to create rbac service account, role and roleBinding                                                                                        | `true`                                    |
| `rbac.serviceAccountName` | If `rbac.create` is false then this service account is used.                                                                                               | `default`                                 |
| `orchestrator.replicas`   | Control orchestraotr replicas                                                                                                                              | `3`                                       |
| `orchestrator.image`      | Orchestrator container image                                                                                                                               | `quay.io/presslabs/orchestrator:latest`   |
| `orchestroator.*`         | More ochestrator values that can be tuned. See [values.yaml](https://github.com/presslabs/docker-orchestrator/blob/master/charts/orchestrator/values.yaml) |                                           |
