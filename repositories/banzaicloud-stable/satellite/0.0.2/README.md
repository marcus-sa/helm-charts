# `@helm-charts/banzaicloud-stable-satellite`

A Helm chart for satellite

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | satellite          |
| Chart Version       | 0.0.2              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
image:
  repository: banzaicloud/satellite
  tag: 0.0.3
  pullPolicy: IfNotPresent
```

</details>

---

# Satellite Chart

Satellite is a Golang library and RESTful API to determine the host cloud provider with a simple HTTP call. Behind the scenes it uses the file system and provider metadata to properly identify the cloud provider. For further documentation please check the project github page. [Satellite](https://github.com/banzaicloud/satellite)

## Installing the Chart

To install the chart:

```
$ helm install banzaicloud-stable/satellite
```
