# `@helm-charts/stable-sonatype-nexus`

Sonatype Nexus is an open source repository manager

| Field               | Value          |
| ------------------- | -------------- |
| Repository Name     | stable         |
| Chart Name          | sonatype-nexus |
| Chart Version       | 1.7.0          |
| NPM Package Version | 0.1.0          |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
replicaCount: 1

nexus:
  imageName: quay.io/travelaudience/docker-nexus
  imageTag: 3.12.1
  imagePullPolicy: IfNotPresent
  env:
    - name: install4jAddVmParams
      value: '-Xms1200M -Xmx1200M -XX:MaxDirectMemorySize=2G -XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap'
  # nodeSelector:
  #   cloud.google.com/gke-nodepool: default-pool
  resources:
    {}
    # requests:
    ## Based on https://support.sonatype.com/hc/en-us/articles/115006448847#mem
    ## and https://twitter.com/analytically/status/894592422382063616:
    ##   Xms == Xmx
    ##   Xmx <= 4G
    ##   MaxDirectMemory >= 2G
    ##   Xmx + MaxDirectMemory <= RAM * 2/3 (hence the request for 4800Mi)
    ##   MaxRAMFraction=1 is not being set as it would allow the heap
    ##     to use all the available memory.
    # cpu: 250m
    # memory: 4800Mi
  # The ports should only be changed if the nexus image uses a different port
  dockerPort: 5003
  nexusPort: 8081
  serviceType: NodePort
  # annotations: {}
  # securityContext:
  #   fsGroup: 2000
  livenessProbe:
    initialDelaySeconds: 30
    periodSeconds: 30
    failureThreshold: 6
    path: /
  readinessProbe:
    initialDelaySeconds: 30
    periodSeconds: 30
    failureThreshold: 6
    path: /
  # hostAliases allows the modification of the hosts file inside a container
  hostAliases: []
  # - ip: "192.168.1.10"
  #   hostnames:
  #   - "example.com"
  #   - "www.example.com"

nexusProxy:
  imageName: quay.io/travelaudience/docker-nexus-proxy
  imageTag: 2.1.0
  imagePullPolicy: IfNotPresent
  port: 8080
  env:
    nexusDockerHost:
    nexusHttpHost:
    enforceHttps: false
    cloudIamAuthEnabled: false
  ## If cloudIamAuthEnabled is set to true uncomment the variables below and remove this line
  #   clientId: ""
  #   clientSecret: ""
  #   organizationId: ""
  #   redirectUrl: ""
  # secrets:
  #   keystore: ""
  #   password: ""
  resources:
    {}
    # requests:
    # cpu: 100m
    # memory: 256Mi
    # limits:
    # cpu: 200m
    # memory: 512Mi
persistence:
  enabled: true
  accessMode: ReadWriteOnce
  ## If defined, storageClass: <storageClass>
  ## If set to "-", storageClass: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClass spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # existingClaim:
  # annotations:
  #  "helm.sh/resource-policy": keep
  # storageClass: "-"
  storageSize: 8Gi

nexusBackup:
  enabled: false
  imageName: quay.io/travelaudience/docker-nexus-backup
  imageTag: 1.2.0
  imagePullPolicy: IfNotPresent
  env:
    targetBucket:
  nexusAdminPassword: 'admin123'
  persistence:
    enabled: true
    # existingClaim:
    # annotations:
    #  "helm.sh/resource-policy": keep
    accessMode: ReadWriteOnce
    # See comment above for information on setting the backup storageClass
    # storageClass: "-"
    storageSize: 8Gi

ingress:
  enabled: false
  path: /
  annotations: {}
  # # NOTE: Can't use 'false' due to https://github.com/jetstack/kube-lego/issues/173.
  # kubernetes.io/ingress.allow-http: true
  # kubernetes.io/ingress.class: gce
  # kubernetes.io/ingress.global-static-ip-name: ""
  # kubernetes.io/tls-acme: true
  tls:
    enabled: true
    secretName: nexus-tls
```

</details>

---

# Nexus

[Nexus OSS](https://www.sonatype.com/nexus-repository-oss) is a free open source repository manager. It supports a wide range of package formats and it's used by hundreds of tech companies.

## Introduction

This chart bootstraps a Nexus OSS deployment on a cluster using Helm.
This setup is best configured in [GCP](https://cloud.google.com/) since:

- [google cloud storage](https://cloud.google.com/storage/) is used for backups
- [GCE Ingress controller](https://github.com/kubernetes/ingress/blob/master/docs/faq/gce.md) is used for using a pre-allocated static IP in GCE.

There is also the option of using a [proxy for Nexus](https://github.com/travelaudience/nexus-proxy) that authenticates Nexus against an external identity provider (only GCP IAM at the moment) which is **disabled** by default.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure
- [Fulfill Nexus kubernetes requirements](https://github.com/travelaudience/kubernetes-nexus#pre-requisites)

### With GCP IAM enabled

All the [Prerequisites](#Prerequisites) should be in place, plus:

- [Fulfill GCP IAM requirements](https://github.com/travelaudience/kubernetes-nexus/blob/master/docs/admin/configuring-nexus-proxy.md#pre-requisites)

## Testing the Chart

To test the chart:

```bash
$ helm install --dry-run --debug ./
```

To test the chart with your own values:

```bash
$ helm install --dry-run --debug -f my_values.yaml ./
```

## Installing the Chart

To install the chart:

```bash
$ helm install stable/sonatype-nexus
```

The above command deploys Nexus on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

The default login is admin/admin123

## Uninstalling the Chart

To uninstall/delete the deployment:

```bash
$ helm list
NAME           	REVISION	UPDATED                 	STATUS  	CHART      	NAMESPACE
plinking-gopher	1       	Fri Sep  1 13:19:50 2017	DEPLOYED	sonatype-nexus-0.1.0	default
$ helm delete plinking-gopher
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Nexus chart and their default values.

| Parameter                                  | Description                                                                                                                                                                                        | Default                                                                                                                                      |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `replicaCount`                             | Number of Nexus service replicas                                                                                                                                                                   | `1`                                                                                                                                          |
| `nexus.imageName`                          | Nexus image                                                                                                                                                                                        | `quay.io/travelaudience/docker-nexus`                                                                                                        |
| `nexus.imageTag`                           | Version of Nexus                                                                                                                                                                                   | `3.9.0`                                                                                                                                      |
| `nexus.imagePullPolicy`                    | Nexus image pull policy                                                                                                                                                                            | `IfNotPresent`                                                                                                                               |
| `nexus.env`                                | Nexus environment variables                                                                                                                                                                        | `[{install4jAddVmParams: -Xms1200M -Xmx1200M -XX:MaxDirectMemorySize=2G -XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap}]` |
| `nexus.resources`                          | Nexus resource requests and limits                                                                                                                                                                 | `{}`                                                                                                                                         |
| `nexus.dockerPort`                         | Port to access docker                                                                                                                                                                              | `5003`                                                                                                                                       |
| `nexus.nexusPort`                          | Internal port for Nexus service                                                                                                                                                                    | `8081`                                                                                                                                       |
| `nexus.serviceType`                        | Service for Nexus                                                                                                                                                                                  | `NodePort`                                                                                                                                   |
| `nexus.securityContext`                    | Security Context (for enabling official image use `fsGroup: 2000`)                                                                                                                                 | `{}`                                                                                                                                         |
| `nexus.livenessProbe.initialDelaySeconds`  | LivenessProbe initial delay                                                                                                                                                                        | 30                                                                                                                                           |
| `nexus.livenessProbe.periodSeconds`        | Seconds between polls                                                                                                                                                                              | 30                                                                                                                                           |
| `nexus.livenessProbe.failureThreshold`     | Number of attempts before failure                                                                                                                                                                  | 6                                                                                                                                            |
| `nexus.livenessProbe.path`                 | Path for LivenessProbe                                                                                                                                                                             | /                                                                                                                                            |
| `nexus.readinessProbe.initialDelaySeconds` | ReadinessProbe initial delay                                                                                                                                                                       | 30                                                                                                                                           |
| `nexus.readinessProbe.periodSeconds`       | Seconds between polls                                                                                                                                                                              | 30                                                                                                                                           |
| `nexus.readinessProbe.failureThreshold`    | Number of attempts before failure                                                                                                                                                                  | 6                                                                                                                                            |
| `nexus.readinessProbe.path`                | Path for ReadinessProbe                                                                                                                                                                            | /                                                                                                                                            |
| `nexus.hostAliases`                        | Aliases for IPs in /etc/hosts                                                                                                                                                                      | []                                                                                                                                           |
| `nexusProxy.port`                          | Port for exposing Nexus                                                                                                                                                                            | `8080`                                                                                                                                       |
| `nexusProxy.imageName`                     | Proxy image                                                                                                                                                                                        | `quay.io/travelaudience/docker-nexus-proxy`                                                                                                  |
| `nexusProxy.imageTag`                      | Proxy image version                                                                                                                                                                                | `2.1.0`                                                                                                                                      |
| `nexusProxy.imagePullPolicy`               | Proxy image pull policy                                                                                                                                                                            | `IfNotPresent`                                                                                                                               |
| `nexusProxy.resources`                     | Proxy resource requests and limits                                                                                                                                                                 | `{}`                                                                                                                                         |
| `nexusProxy.env.nexusHttpHost`             | Nexus url to access Nexus                                                                                                                                                                          | `nil`                                                                                                                                        |
| `nexusProxy.env.nexusDockerHost`           | Containers url to be used with docker                                                                                                                                                              | `nil`                                                                                                                                        |
| `nexusProxy.env.enforceHttps`              | Allow only https access or not                                                                                                                                                                     | `false`                                                                                                                                      |
| `nexusProxy.env.cloudIamAuthEnabled`       | Enable GCP IAM authentication in Nexus proxy                                                                                                                                                       | `false`                                                                                                                                      |
| `persistence.enabled`                      | Create a volume for storage                                                                                                                                                                        | `true`                                                                                                                                       |
| `persistence.accessMode`                   | ReadWriteOnce or ReadOnly                                                                                                                                                                          | `ReadWriteOnce`                                                                                                                              |
| `persistence.storageClass`                 | Storage class of Nexus PVC                                                                                                                                                                         | `nil`                                                                                                                                        |
| `persistence.storageSize`                  | Size of Nexus data volume                                                                                                                                                                          | `8Gi`                                                                                                                                        |
| `persistence.annotations`                  | Persistent Volume annotations                                                                                                                                                                      | `{}`                                                                                                                                         |
| `persistence.existingClaim`                | Existing persistent volume name                                                                                                                                                                    | `nil`                                                                                                                                        |
| `nexusBackup.enabled`                      | Nexus backup process                                                                                                                                                                               | `false`                                                                                                                                      |
| `nexusBackup.imageName`                    | Nexus backup image                                                                                                                                                                                 | `quay.io/travelaudience/docker-nexus-backup`                                                                                                 |
| `nexusBackup.imageTag`                     | Nexus backup image version                                                                                                                                                                         | `1.2.0`                                                                                                                                      |
| `nexusBackup.imagePullPolicy`              | Backup image pull policy                                                                                                                                                                           | `IfNotPresent`                                                                                                                               |
| `nexusBackup.env.targetBucket`             | Required if `nexusBackup` is enabled. Google Cloud Storage bucker for backups format `gs://BACKUP_BUCKET`                                                                                          | `nil`                                                                                                                                        |
| `nexusBackup.nexusAdminPassword`           | Nexus admin password used by the backup container to access Nexus API. This password should match the one that gets chosen by the user to replace the default admin password after the first login | `admin123`                                                                                                                                   |
| `nexusBackup.persistence.enabled`          | Create a volume for backing Nexus configuration                                                                                                                                                    | `true`                                                                                                                                       |
| `nexusBackup.persistence.accessMode`       | ReadWriteOnce or ReadOnly                                                                                                                                                                          | `ReadWriteOnce`                                                                                                                              |
| `nexusBackup.persistence.storageClass`     | Storage class of Nexus backup PVC                                                                                                                                                                  | `nil`                                                                                                                                        |
| `nexusBackup.persistence.storageSize`      | Size of Nexus backup data volume                                                                                                                                                                   | `8Gi`                                                                                                                                        |
| `nexusBackup.persistence.annotations`      | PV annotations for backup                                                                                                                                                                          | `{}`                                                                                                                                         |
| `nexusBackup.persistence.existingClaim`    | Existing PV name for backup                                                                                                                                                                        | `nil`                                                                                                                                        |
| `ingress.enabled`                          | Create an ingress for Nexus                                                                                                                                                                        | `true`                                                                                                                                       |
| `ingress.annotations`                      | Annotations to enhance ingress configuration                                                                                                                                                       | `{}`                                                                                                                                         |
| `ingress.tls.enabled`                      | Enable TLS                                                                                                                                                                                         | `false`                                                                                                                                      |
| `ingress.tls.secretName`                   | Name of the secret storing TLS cert, `false` to use the Ingress' default certificate                                                                                                               | `nexus-tls`                                                                                                                                  |
| `ingress.path`                             | Path for ingress rules. GCP users should set to `/*`                                                                                                                                               | `/`                                                                                                                                          |

If `nexusProxy.env.cloudIamAuthEnabled` is set to `true` the following variables need to be configured

| Parameter                       | Description                                                                                                                    | Default |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `nexusProxy.env.clientId`       | GCP OAuth client ID                                                                                                            | `nil`   |
| `nexusProxy.env.clientSecret`   | GCP OAuth client Secret                                                                                                        | `nil`   |
| `nexusProxy.env.organizationId` | GCP organization ID                                                                                                            | `nil`   |
| `nexusProxy.env.redirectUrl`    | OAuth callback url. example `https://nexus.example.com/oauth/callback`                                                         | `nil`   |
| `nexusProxy.secrets.keystore`   | base-64 encoded value of the keystore file needed for the proxy to sign user tokens. Example: cat keystore.jceks &#124; base64 | `nil`   |
| `nexusProxy.secrets.password`   | Password to the Java Keystore file                                                                                             | `nil`   |

```bash
$ helm install --name my-release --set persistence.enabled=false stable/sonatype-nexus
```

The above example turns off the persistence. Data will not be kept between restarts or deployments

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f my-values.yaml stable/sonatype-nexus
```

### Persistence

By default a PersistentVolumeClaim is created and mounted into the `/nexus-data` directory. In order to disable this functionality
you can change the `values.yaml` to disable persistence which will use an `emptyDir` instead.

> _"An emptyDir volume is first created when a Pod is assigned to a Node, and exists as long as that Pod is running on that node. When a Pod is removed from a node for any reason, the data in the emptyDir is deleted forever."_

### Recommended settings

As a minimum for running in production, the following settings are advised:

```yaml
nexusProxy:
  env:
    nexusDockerHost: container.example.com
    nexusHttpHost: nexus.example.com

nexusBackup:
  env:
    targetBucket: 'gs://my-nexus-backup'
  persistence:
    storageClass: standard

ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: gce
    kubernetes.io/tls-acme: true

persistence:
  storageClass: standard
  storageSize: 1024Gi

resources:
  requests:
    cpu: 250m
    # Based on https://support.sonatype.com/hc/en-us/articles/115006448847#mem
    # and https://twitter.com/analytically/status/894592422382063616:
    #   Xms == Xmx
    #   Xmx <= 4G
    #   MaxDirectMemory >= 2G
    #   Xmx + MaxDirectMemory <= RAM * 2/3 (hence the request for 4800Mi)
    #   MaxRAMFraction=1 is not being set as it would allow the heap
    #     to use all the available memory.
    memory: 4800Mi
```

## After Installing the Chart

After installing the chart a couple of actions need still to be done in order to use nexus. Please follow the instructions below.

### Nexus Configuration

The following steps need to be executed in order to use Nexus:

- [Configure Nexus](https://github.com/travelaudience/kubernetes-nexus/blob/master/docs/admin/configuring-nexus.md)
- [Configure Backups](https://github.com/travelaudience/kubernetes-nexus/blob/master/docs/admin/configuring-nexus.md#configure-backup)

and if GCP IAM authentication is enabled, please also check:

- [Enable GCP IAM authentication in Nexus ](https://github.com/travelaudience/kubernetes-nexus/blob/master/docs/admin/configuring-nexus-proxy.md#enable-gcp-iam-auth)

### Nexus Usage

To see how to use Nexus with different tools like Docker, Maven, Python, and so on please check:

- [Nexus Usage](https://github.com/travelaudience/kubernetes-nexus#usage)

### Disaster Recovery

In a disaster recovery scenario, the latest backup made by the nexus-backup container should be restored. In order to achieve this please follow the procedure described below:

- [Restore Backups](https://github.com/travelaudience/kubernetes-nexus#restore)
