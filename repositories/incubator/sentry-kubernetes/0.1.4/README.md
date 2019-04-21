# `@helm-charts/incubator-sentry-kubernetes`

A Helm chart for sentry-kubernetes (https://github.com/getsentry/sentry-kubernetes)

| Field               | Value             |
| ------------------- | ----------------- |
| Repository Name     | incubator         |
| Chart Name          | sentry-kubernetes |
| Chart Version       | 0.1.4             |
| NPM Package Version | 0.1.0             |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for sentry-kubernetes.

sentry:
  dsn: <change-me>
image:
  repository: getsentry/sentry-kubernetes
  tag: latest
  pullPolicy: Always
resources:
  {}
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

rbac:
  # Specifies whether RBAC resources should be created
  create: true
```

</details>

---

# sentry-kubernetes

[sentry-kubernetes](https://github.com/getsentry/sentry-kubernetes) is a utility that pushes Kubernetes events to [Sentry](https://sentry.io).

# Installation:

```console
$ helm install incubator/sentry-kubernetes --name my-release --set sentry.dsn=<your-dsn>
```

## Configuration

The following table lists the configurable parameters of the sentry-kubernetes chart and their default values.

| Parameter               | Description                                                                                                                 | Default                       |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `sentry.dsn`            | Sentry dsn                                                                                                                  | Empty                         |
| `image.repository`      | Container image name                                                                                                        | `getsentry/sentry-kubernetes` |
| `image.tag`             | Container image tag                                                                                                         | `latest`                      |
| `rbac.create`           | If `true`, create and use RBAC resources                                                                                    | `true`                        |
| `serviceAccount.name`   | Service account to be used. If not set and serviceAccount.create is `true`, a name is generated using the fullname template | ``                            |
| `serviceAccount.create` | If true, create a new service account                                                                                       | `true`                        |
