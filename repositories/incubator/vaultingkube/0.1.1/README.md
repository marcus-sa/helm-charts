# `@helm-charts/incubator-vaultingkube`

vaultingkube takes config maps and secrets stored inside Hashicorp Vault and syncs them to your Kubernetes cluster.

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | incubator    |
| Chart Name          | vaultingkube |
| Chart Version       | 0.1.1        |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for vaultingkube.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

# replicaCount is the replicas count of the vaultingkube pod. More than 1 is
# supported and you can use this to increase the availability of the vaultingkube
# agent in case of a pod crash.
replicaCount: 1

image:
  # Image repository
  # ref: https://hub.docker.com/r/sunshinekitty/vaultingkube/
  repository: sunshinekitty/vaultingkube
  # Image version
  # ref: https://hub.docker.com/r/sunshinekitty/vaultingkube/tags/
  tag: v0.1.0
  # Specify a imagePullPolicy
  # Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
  # ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  # pullPolicy:

# vaultAddress is the address of the Vault that vaultingkube will query.
vaultAddress:
# vaultToken is the token used by vaultingkube to query Vault.
# You should use a read-only token.
vaultToken:
# Setting deleteOld to true will make vaultingkube delete K8s managed secrets
# that aren't in Vault anymore.
deleteOld: 'true'
# syncPeriod will set the frequency at which vaultingkube will check Vault for
# new or removed secrets.
syncPeriod: '60'
# vaultRootMountPath is the secret path in Vault that vaultingkube will sync
# from and must contain the following
# structure: vaultRootMountPath/NAMESPACE/(secrets|configmaps)/NAME
# ref: https://github.com/sunshinekitty/vaultingkube#how-it-works
vaultRootMountPath:

# CPU and memory limits for the vaultingkube agent
resources:
  {}
  # limits:
  #  cpu: 100m
  #  memory: 64Mi
  # requests:
  #  cpu: 100m
  #  memory: 64Mi

nodeSelector: {}

tolerations: []

affinity: {}

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

# vaultingkube

[vaultingkube](https://github.com/sunshinekitty/vaultingkube) takes config maps
and secrets stored inside Hashicorp Vault and syncs them to your Kubernetes
cluster.

## TL;DR;

```console
$ helm install incubator/vaultingkube
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release incubator/vaultingkube
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes nearly all the Kubernetes components associated with the
chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the vaultingkube chart and their default values.

| Parameter               | Description                                                                                                                   | Default                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `replicaCount`          | Number of replicas of the vaultingkube pod                                                                                    | `1`                                                     |
| `images.repository`     | vaultingkube image repository                                                                                                 | `sunshinekitty/vaultingkube`                            |
| `images.tag`            | vaultingkube image tag                                                                                                        | `v0.1.0`                                                |
| `images.pullPolicy`     | vaultingkube image pull policy                                                                                                | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `vaultAddress`          | Address of the Vault that vaultingkube will query                                                                             | None. You _must_ supply one.                            |
| `vaultToken`            | Token used by vaultingkube to query Vault                                                                                     | None. You _must_ supply one.                            |
| `deleteOld`             | Enable deletion of K8s managed secrets that were deleted from Vault                                                           | `"true"`                                                |
| `syncPeriod`            | Frequency at which vaultingkube will check Vault new or removed secrets                                                       | `"60"`                                                  |
| `vaultRootMountPath`    | Secret path in Vault that vaultingkube will sync from                                                                         | None. You _must_ supply one                             |
| `nodeSelector`          | Node labels for pod assignment                                                                                                | `{}`                                                    |
| `tolerations`           | List of node taints to tolerate                                                                                               | `[]`                                                    |
| `affinity`              | Affinity settings for pod assignment                                                                                          | `{}`                                                    |
| `rbac.create`           | If `true`, create and use RBAC resources                                                                                      | `true`                                                  |
| `serviceAccount.create` | If `true`, create a new service account                                                                                       | `true`                                                  |
| `serviceAccount.name`   | Service account to be used. If not set and `serviceAccount.create` is `true`, a name is generated using the fullname template | ``                                                      |
