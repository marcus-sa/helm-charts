# `@helm-charts/incubator-grafana`

A Helm chart for Kubernetes

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | grafana   |
| Chart Version       | 0.1.2     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
imageName: 'grafana/grafana'
adminUser: 'admin'
adminPassword: 'admin'

# Persist data to a persitent volume
persistence:
  enabled: true
  storageClass: generic
  accessMode: ReadWriteOnce
  size: '1Gi'
```

</details>

---

# Grafana Helm Chart

- Installs the web dashboarding system [Grafana](http://grafana.org/)

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
$ helm install --name my-release incubator/grafana
```

## Configuration

| Parameter                  | Description                     | Default         |
| -------------------------- | ------------------------------- | --------------- |
| `imageName`                | Container image to run          | grafana/grafana |
| `adminUser`                | Admin user username             | admin           |
| `adminPassword`            | Admin user password             | admin           |
| `persistence.enabled`      | Create a volume to store data   | true            |
| `persistence.size`         | Size of persistent volume claim | 1Gi RW          |
| `persistence.storageClass` | Type of persistent volume claim | generic         |
| `persistence.accessMode`   | ReadWriteOnce or ReadOnly       | ReadWriteOnce   |
| `cpu`                      | Container requested cpu         | 100m            |
| `memory`                   | Container requested memory      | 100M            |
