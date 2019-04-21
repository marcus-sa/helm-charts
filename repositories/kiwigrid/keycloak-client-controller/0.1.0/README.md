# `@helm-charts/kiwigrid-keycloak-client-controller`

A Helm chart for a Kubernetes controller to manage Keycloak clients

| Field               | Value                      |
| ------------------- | -------------------------- |
| Repository Name     | kiwigrid                   |
| Chart Name          | keycloak-client-controller |
| Chart Version       | 0.1.0                      |
| NPM Package Version | 0.1.0                      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for keycloak-client-controller.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: kiwigrid/keycloak-client-controller
  tag: 0.1.0
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

keycloak:
  url: http://localhost:8080/auth/
  user: admin
  pwd: admin

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #   cpu: 100m
  #   memory: 256Mi
  # requests:
  #   cpu: 100m
  #   memory: 192Mi

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# Keycloak Client Controller

The [Keycloak Client Controller](https://github.com/kiwigrid/keycloak-client-controller) manages clients in
a [Keycloak](https://www.keycloak.org) instance via Kubernetes resources.

## Configuration

The following table lists the configurable parameters of the chart and their default values.

| Parameter          | Description                                                | Default                               |
| ------------------ | ---------------------------------------------------------- | ------------------------------------- |
| `image.repository` | keycloak-client-controller image                           | `kiwigrid/keycloak-client-controller` |
| `image.tag`        | keycloak-client-controller image tag                       | `0.1.0`                               |
| `image.pullPolicy` | Image pull policy                                          | `IfNotPresent`                        |
| `keycloak.url`     | URL of the Keycloak instance where clients will be managed | `http://localhost:8080/auth/`         |
| `keycloak.user`    | Name of the Keycloak admin user                            | `admin`                               |
| `keycloak.pwd`     | Password of the Keycloak admin user                        | `admin`                               |
| `resources`        | Resources                                                  | `{}`                                  |
| `nodeSelector`     | NodeSelector                                               | `{}`                                  |
| `tolerations`      | Tolerations                                                | `[]`                                  |
| `affinity`         | Affinity                                                   | `{}`                                  |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml kiwigrid/keycloak-client-controller
```

> **Tip**: You can use the default [values.yaml](values.yaml)
