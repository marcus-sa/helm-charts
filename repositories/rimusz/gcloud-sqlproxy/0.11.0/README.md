# `@helm-charts/rimusz-gcloud-sqlproxy`

Google Cloud SQL Proxy

| Field               | Value           |
| ------------------- | --------------- |
| Repository Name     | rimusz          |
| Chart Name          | gcloud-sqlproxy |
| Chart Version       | 0.11.0          |
| NPM Package Version | 0.1.0           |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Google Cloud SQL Proxy image
## ref: https://cloud.google.com/sql/docs/mysql/sql-proxy
## ref: https://cloud.google.com/sql/docs/postgres/sql-proxy
image: b.gcr.io/cloudsql-docker/gce-proxy
imageTag: '1.13'

## Specify a imagePullPolicy
## 'Always' if imageTag is 'latest', else set to 'IfNotPresent'
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent

## Replicas Set count
replicasCount: 1

## Set the GCP service account key JSON file.
## Service account has access be set to Cloud SQL instances
## the key must be encoded with base64
## e.g. `cat service-account.json | base64`
## only used if no existing secret is specified
##
serviceAccountKey: ''

## Specify an existing secret holding the cloud-sql service account credentials
existingSecret: ''
## The key in the existing secret that stores the credenials
existingSecretKey: ''

## serviceAccountName to specify the service account name that will be generated
serviceAccountName: ''

## usingGCPController to control if the service account should be generated and injected
usingGCPController: false

## SQL connection settings
##
cloudsql:
  ## PostgreSQL/MySQL instances:
  ## update with your GCP project, the region of your Cloud SQL instance
  ## and the name of your Cloud SQL instance
  ## PostgreSQL port 5432 or MySQL port 3306, or other port you set for your SQL instance.
  ## Use different ports for different instances.
  instances:
    # GCP instance name.
    - instance: 'instance'
      # Optional abbreviation used to override the truncated instance name if the
      # 15 character instance name prefix is not unique for use as a port
      # identifier.
      instanceShortName: ''
      # GCP project where the instance exists.
      project: 'project'
      # GCP region where the instance exists.
      region: 'region'
      # Port number for the proxy to expose for this instance.
      port: 5432

rbac:
  create: false

networkPolicy:
  ## Specifies whether a NetworkPolicy should be created
  ##
  enabled: true

  ingress:
    from: []
    # # List of sources which should be able to access the pods selected for this rule.
    # # Items in this list are combined using a logical OR operation.
    # # If this field is empty or missing, this rule matches all sources (traffic not restricted by source).
    # # If this field is present and contains at least on item,
    # # this rule allows traffic only if the traffic matches at least one item in the from list.
    #   - podSelector:           # chooses pods with gcloud-sqlproxy-client="true"
    #       matchLabels:
    #         gcloud-sqlproxy-client: "true"

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
## Resources are commente out as sometimes Memory/CPU limit causes spikes in query times
## https://github.com/GoogleCloudPlatform/cloudsql-proxy/issues/168#issuecomment-394099416
resources: {}
#  requests:
#    cpu: 100m
#    memory: 100Mi
#  limits:
#    memory: 256Mi
#    cpu: 256m

## Node selector
nodeSelector: {}

## Tolerations
tolerations: []

## Affinity
affinity: {}

podDisruptionBudget: |
  maxUnavailable: 1

## Additional container arguments
extraArgs: {}
```

</details>

---

# GCP SQL Proxy

[sql-proxy](https://cloud.google.com/sql/docs/postgres/sql-proxy) The Cloud SQL Proxy provides secure access to your Cloud SQL Postgres/MySQL instances without having to whitelist IP addresses or configure SSL.

Accessing your Cloud SQL instance using the Cloud SQL Proxy offers these advantages:

- Secure connections: The proxy automatically encrypts traffic to and from the database; SSL certificates are used to verify client and server identities.
- Easier connection management: The proxy handles authentication with Google Cloud SQL, removing the need to provide static IP addresses of your GKE/GCE Kubernetes nodes.

## Introduction

This chart creates a Google Cloud SQL proxy deployment and service on a Kubernetes cluster using the Helm package manager.
You need to enable Cloud SQL Administration API and create a service account for the proxy as per these [instructions](https://cloud.google.com/sql/docs/postgres/connect-container-engine).

## Prerequisites

- Kubernetes cluster on Google Container Engine (GKE)
- Kubernetes cluster on Google Compute Engine (GCE)
- Cloud SQL Administration API enabled
- GCP Service account for the proxy with `Cloud SQL Admin` role, and `Cloud SQL Admin API` enabled.

## Installing the Chart

Install from remote URL with the release name `pg-sqlproxy` into namespace `sqlproxy`, set GCP service account and SQL instances and ports:

```console
$ helm upgrade pg-sqlproxy rimusz/gcloud-sqlproxy --namespace sqlproxy \
    --set serviceAccountKey="$(cat service-account.json | base64 | tr -d '\n')" \
    --set cloudsql.instances[0].instance=INSTANCE \
    --set cloudsql.instances[0].project=PROJECT \
    --set cloudsql.instances[0].region=REGION \
    --set cloudsql.instances[0].port=5432 -i
```

Replace Postgres/MySQL host with: if access is from the same namespace with `pg-sqlproxy-gcloud-sqlproxy` or if it is from a different namespace with `pg-sqlproxy-gcloud-sqlproxy.sqlproxy`, the rest database connections settings do not have to be changed.

> **Tip**: List all releases using `helm list`

> **Tip**: If you encounter a YAML parse error on `gcloud-sqlproxy/templates/secrets.yaml`, you might need to set `-w 0` option to `base64` command.

> **Tip**: If you are using a MySQL instance, you may want to replace `pg-sqlproxy` with `mysql-sqlproxy` and `5432` with `3306`.

> **Tip**: Because of limitations on the length of port names, the `instance` value for each of the instances must be unique for the first 15 characters.

## Uninstalling the Chart

To uninstall/delete the `my-release-name` deployment:

```console
$ helm delete my-release-name
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `gcloud-sqlproxy` chart and their default values.

| Parameter                    | Description                                                                                                   | Default                                                                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `image`                      | SQLProxy image                                                                                                | `b.gcr.io/cloudsql-docker/gce-proxy`                                                                                                        |
| `imageTag`                   | SQLProxy image tag                                                                                            | `1.13`                                                                                                                                      |
| `imagePullPolicy`            | Image pull policy                                                                                             | `IfNotPresent`                                                                                                                              |
| `replicasCount`              | Replicas count                                                                                                | `1`                                                                                                                                         |
| `serviceAccountKey`          | Service account key JSON file                                                                                 | Must be provided and base64 encoded when no existing secret is used, in this case a new secret will be created holding this service account |
| `existingSecret`             | Name of an existing secret to be used for the cloud-sql credentials                                           | `""`                                                                                                                                        |
| `existingSecretKey`          | The key to use in the provided existing secret                                                                | `""`                                                                                                                                        |
| `usingGCPController`         | enable the use of the GCP Service Account Controller                                                          | `false`                                                                                                                                     |
| `serviceAccountName`         | specify a service account name to use                                                                         | `""`                                                                                                                                        |
| `cloudsql.instances`         | List of PostgreSQL/MySQL instances                                                                            | [{instance: `instance`, project: `project`, region: `region`, port: 5432}] must be provided                                                 |
| `resources`                  | CPU/Memory resource requests/limits                                                                           | Memory: `100/150Mi`, CPU: `100/150m`                                                                                                        |
| `nodeSelector`               | Node Selector                                                                                                 |                                                                                                                                             |
| `rbac.create`                | Create RBAC configuration w/ SA                                                                               | `false`                                                                                                                                     |
| `networkPolicy.enabled`      | Enable NetworkPolicy                                                                                          | `false`                                                                                                                                     |
| `networkPolicy.ingress.from` | List of sources which should be able to access the pods selected for this rule. If empty, allows all sources. | `[]`                                                                                                                                        |
| `extraArgs`                  | Additional container arguments                                                                                | `{}`                                                                                                                                        |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml rimusz/gcloud-sqlproxy
```

> **Tip**: You can use the default [values.yaml](values.yaml)

### Auto generating the gcp service account

By enabling the flag `usingGCPController` and having a GCP Service Account Controller deployed in your cluster, it is possible to autogenerate and inject the service account used for connecting to the database. For more information see https://github.com/kiwigrid/helm-charts/tree/master/charts/gcp-serviceaccount-controller

## Documentation

- [Cloud SQL Proxy for Postgres](https://cloud.google.com/sql/docs/postgres/sql-proxy)
- [Cloud SQL Proxy for MySQL](https://cloud.google.com/sql/docs/mysql/sql-proxy)
- [GKE samples](https://github.com/GoogleCloudPlatform/container-engine-samples/tree/master/cloudsql)

## Upgrading

**From < 0.10.0 to >= 0.10.0**

Please note, if chart name is included in release name, it will now be used as full name.
E.g. service `gcloud-sqlproxy-gcloud-sqlproxy` will now show up as `gcloud-sqlproxy`.

**From < 0.11.0 to >= 0.11.0**

Please note, as of `0.11.0` recommended labels are used. Please take into anything that may target your release's objects via labels.
