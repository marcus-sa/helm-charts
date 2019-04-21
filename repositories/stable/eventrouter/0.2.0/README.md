# `@helm-charts/stable-eventrouter`

A Helm chart for eventruter (https://github.com/heptiolabs/eventrouter)

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | stable      |
| Chart Name          | eventrouter |
| Chart Version       | 0.2.0       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for eventrouter.

image:
  repository: gcr.io/heptio-images/eventrouter
  tag: v0.2
  pullPolicy: IfNotPresent
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

tolerations: []

nodeSelector: {}

sink: glog

podAnnotations: {}

containerPorts: []
```

</details>

---

# eventrouter

[eventrouter](https://github.com/heptiolabs/eventrouter) simple introspective kubernetes service that forwards events to a specified sink.

# Installation:

```console
$ helm install stable/eventrouter --name my-release
```

## Configuration

The following table lists the configurable parameters of the eventrouter chart and their default values.

| Parameter               | Description                                                                                                                 | Default                            |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `image.repository`      | Container image name                                                                                                        | `gcr.io/heptio-images/eventrouter` |
| `image.tag`             | Container image tag                                                                                                         | `v0.2`                             |
| `rbac.create`           | If `true`, create and use RBAC resources                                                                                    | `true`                             |
| `serviceAccount.name`   | Service account to be used. If not set and serviceAccount.create is `true`, a name is generated using the fullname template | ``                                 |
| `serviceAccount.create` | If true, create a new service account                                                                                       | `true`                             |
| `tolerations`           | List of node taints to tolerate                                                                                             | `[]`                               |
| `nodeSelector`          | Node labels for pod assignment                                                                                              | `{}`                               |
| `sink`                  | Sink to send the events to                                                                                                  | `glog`                             |
| `podAnnotations`        | Annotations for pod metadata                                                                                                | `{}`                               |
| `containerPorts`        | List of ports for the container                                                                                             | `[]`                               |
