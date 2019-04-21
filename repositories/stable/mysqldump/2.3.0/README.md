# `@helm-charts/stable-mysqldump`

A Helm chart to help backup MySQL databases using mysqldump

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | mysqldump |
| Chart Version       | 2.3.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for mysqldump.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

image:
  repository: monotek/gcloud-mysql
  tag: '8'
  pullPolicy: IfNotPresent

mysql:
  ## Without a host set, this chart will not do anything as it is expected
  ## to be used only when there's an existing database to backup.
  host:
  username: root
  password:
  port: 3306
  # db for single db backup
  db: dbname

# use --all-databases
allDatabases:
  enabled: true
  # creates single backup file with all databases
  singleBackupFile: false

# options to pass to mysqldump
options: '--opt --single-transaction'

# save sql backup to a directory named like the database or "alldatabases"
saveToDirectory: false

## set to `now` to get a one time job, or a cronjob schedule like `0 0 * * *`
## to get a cronjob.
schedule: '0 3 * * *'

# enable some debug options
debug: false

# cronjob history
successfulJobsHistoryLimit: 5
failedJobsHistoryLimit: 5

## set persistentVolumeClaim to use a PVC that already exists.
## if set will override any settings under `persistence` otherwise
## if not set and `persistence.enabled` set to true, will create a PVC.
# persistentVolumeClaim: <existing-PVC>

persistence:
  enabled: true
  size: 8Gi
  accessMode: ReadWriteOnce
  reclaimPolicy: delete
  subPath:
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"

# delete backups older than 10 days
housekeeping:
  enabled: true
  keepDays: 10

# upload backup
upload:
  googlestoragebucket:
    enabled: false
    # bucketname with gs:// prefix
    bucketname: gs://mybucket/test
    # jsonKeyfile of you serviceaccount as string
    jsonKeyfile: ''
    # secretFileName specifies the keyfile name inside the secret
    secretFileName: keyfile.json
    # existingSecret can be enabled to use an existing secret
    # existingSecret: mysecret
    # serviceAccountName to set a specific service account name
    # serviceAccountName
    # usingGCPController to enable autogeneration and injection of the service account
    usingGCPController: false
  ssh:
    enabled: false
    user: backup
    host: yourdomain.com
    dir: /backup
    # id_rsa private key as string
    privatekey: ''

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

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# mysqldump

mysqldump is a tool for creating backups of MySQL databases in the form of a .sql file.

## TL;DR;

```console
$ helm install stable/mysqldump \
  --set mysql.host=mysql;mysql.username=root,mysql.password=password,persistence.enabled=true
```

## Introduction

This chart helps set up a cronjob or one time job to backup a MySQL database with mysqldump into a Persistent Volume. You can specify an existing PVC, or helm will create one for you.

## Prerequisites

- Kubernetes 1.8

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install stable/mysqldump \
  --set mysql.host=mysql,mysql.username=root,mysql.password=password,persistence.enabled=true
```

This command will create a cronjob to run a job once a day to backup the databases found on the host `mysql`

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the mysqldump chart and their default values.

| Parameter                                     | Description                                                                    | Default                      |
| --------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------- |
| image.repository                              | Name of image to use                                                           | monotek/gcloud-mysql         |
| image.tag                                     | Version of image to use                                                        | "6"                          |
| image.pullPolicy                              | Pull Policy to use for image                                                   | IfNotPresent                 |
| mysql.db                                      | single mysql db to backup (optional)                                           | mysql                        |
| mysql.host                                    | mysql host to backup                                                           | mysql                        |
| mysql.username                                | mysql username                                                                 | root                         |
| mysql.password                                | mysql password                                                                 | ""                           |
| mysql.port                                    | mysql port                                                                     | 3306                         |
| schedule                                      | crontab schedule to run on. set as `now` to run as a one time job              | "0/5 \* \* \* \*"            |
| options                                       | options to pass onto MySQL                                                     | "--opt --single-transaction" |
| debug                                         | print some extra debug logs during backup                                      | false                        |
| successfulJobsHistoryLimit                    | number of successful jobs to remember                                          | 5                            |
| failedJobsHistoryLimit                        | number of failed jobs to remember                                              | 5                            |
| persistentVolumeClaim                         | existing Persistent Volume Claim to backup to, leave blank to create a new one |                              |
| persistence.enabled                           | create new PVC (unless `persistentVolumeClaim` is set)                         | true                         |
| persistence.size                              | size of PVC to create                                                          | 8Gi                          |
| persistence.accessMode                        | accessMode to use for PVC                                                      | ReadWriteOnce                |
| persistence.storageClass                      | storage class to use for PVC                                                   |                              |
| persistence.reclaimPolicy                     | used PV reclaim policy                                                         | "delete"                     |
| persistence.subPath                           | subPath for PVC                                                                |                              |
| allDatabases.enabled                          | backup all databases                                                           | true                         |
| allDatabases.SingleSqlFile                    | backup all databases to singel file                                            | false                        |
| housekeeping.enabled                          | delete olf backups in pvc                                                      | true                         |
| housekeeping.keepDays                         | keep last x days of backups in PVC                                             | 10                           |
| saveToDirectory                               | saves the sql backup to a directory named like the database or alldatabases    | false                        |
| upload.googlestoragebucket.enabled            | upload backups to google storage                                               | false                        |
| upload.googlestoragebucket.bucketname         | google storage address                                                         | gs://mybucket/test           |
| upload.googlestoragebucket.jsonKeyfile        | json keyfile for serviceaccount                                                | ""                           |
| upload.googlestoragebucket.existingSecret     | specify a secretname to use                                                    | nil                          |
| upload.googlestoragebucket.usingGCPController | enable the use of the GCP Service Account Controller                           | false                        |
| upload.googlestoragebucket.serviceAccountName | specify a service account name to use                                          | nil                          |
| upload.ssh.enabled                            | upload backups via ssh                                                         | false                        |
| upload.ssh.user                               | ssh user                                                                       | backup                       |
| upload.ssh.host                               | ssh server url                                                                 | yourdomain.com               |
| upload.ssh.dir                                | directory on server                                                            | /backup                      |
| upload.ssh.privatekey                         | ssh user private key                                                           | ""                           |
| resources                                     | resource definitions                                                           | {}                           |
| nodeSelector                                  | node selector                                                                  | {}                           |
| tolerations                                   | tolerations                                                                    | \[]                          |
| affinity                                      | affinity                                                                       | {}                           |

### Auto generating the gcp service account

By enabling the flag `upload.googlestoragebucket.usingGCPController` and having a GCP Service Account Controller deployed in your cluster, it is possible to autogenerate and inject the service account used for the storage bucket access. For more information see <https://github.com/kiwigrid/helm-charts/tree/master/charts/gcp-serviceaccount-controller>

```console
$ helm install stable/mysqldump --name my-release \
    --set persistentVolumeClaim=name-of-existing-pvc
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install stable/mysqldump --name my-release -f values.yaml
```
