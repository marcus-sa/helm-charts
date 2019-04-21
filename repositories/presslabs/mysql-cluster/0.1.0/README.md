# `@helm-charts/presslabs-mysql-cluster`

A Helm chart for easy deployment of a MySQL cluster with MySQL operator.

| Field               | Value         |
| ------------------- | ------------- |
| Repository Name     | presslabs     |
| Chart Name          | mysql-cluster |
| Chart Version       | 0.1.0         |
| NPM Package Version | 0.1.0         |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for mysql-cluster.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

## The cluster number of nodes
replicas: 1

## MySQL connect credentials, thoses credentials will be provisioned in the cluster
# rootPassword:
# appUser:
# appPassword:
# appDatabase:

podSpec:
mysqlConf:
volumeSpec:

backupSchedule:
backupURL:
backupSecretName:
backupCredentials:
  # AWS_ACCESS_KEY_ID: ?
  # AWS_SECRET_KEY: ?
  # AWS_REGION: us-east-1
  # AWS_ACL: ?
  # GCS_SERVICE_ACCOUNT_JSON_KEY: ?
  # GCS_PROJECT_ID: ?
  # GCS_OBJECT_ACL: ?
  # GCS_BUCKET_ACL: ?
  # GCS_LOCATION: ?
  # GCS_STORAGE_CLASS: MULTI_REGIONAL
  # HTTP_URL: ?
```

</details>
