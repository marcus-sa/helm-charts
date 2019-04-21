# `@helm-charts/stable-weave-cloud`

Weave Cloud is a add-on to Kubernetes which provides Continuous Delivery, along with hosted Prometheus Monitoring and a visual dashboard for exploring & debugging microservices

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | stable      |
| Chart Name          | weave-cloud |
| Chart Version       | 0.2.0       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for weave-cloud.

token: ''

agent:
  name: weave-agent

image:
  repository: quay.io/weaveworks/launcher-agent
  tag: 1.0.0
  pullPolicy: IfNotPresent

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a service account should be created
  create: true
  # The name of the service account to use.
  # If not set and create is true, a name is generated using the fullname template
  name:
```

</details>

---

# Weave Cloud Agents

> **_NOTE: This chart is for Kubernetes version 1.6 and later._**

Weave Cloud is a add-on to Kubernetes which provides Continuous Delivery, along with hosted Prometheus Monitoring and a visual dashboard for exploring & debugging microservices.

This package contains the agents which connect your cluster to Weave Cloud.

_To learn more and sign up please visit [Weaveworks website](https://weave.works)._

You will need a service token which you can get from [cloud.weave.works](https://cloud.weave.works/).

## Installing the Chart

To install the chart:

```console
$ helm install --name weave-cloud \
--namespace weave \
--set token=<YOUR_WEAVE_CLOUD_SERVICE_TOKEN> \
stable/weave-cloud
```

To view the pods installed:

```console
$ kubectl get pods -n weave
```

To upgrade the chart:

```console
$ helm upgrade --reuse-values weave-cloud stable/weave-cloud
```

## Uninstalling the Chart

To uninstall/delete the `weave-cloud` chart:

```console
$ helm delete --purge weave-cloud
```

Delete the `weave` namespace:

```console
$ kubectl delete namespace weave
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Weave Cloud Agents chart and their default values.

| Parameter               | Description                              | Default                    |
| ----------------------- | ---------------------------------------- | -------------------------- |
| `token`                 | Weave Cloud service token                | _none_ _(**must be set**)_ |
| `rbac.create`           | If `true`, create and use RBAC resources | `true`                     |
| `serviceAccount.create` | If `true`, create a new service account  | `true`                     |
