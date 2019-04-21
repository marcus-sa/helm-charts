# `@helm-charts/incubator-goldfish`

A Helm chart for Goldfish - Vault UI

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | goldfish  |
| Chart Version       | 0.2.6     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for goldfish.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
image:
  repository: caiyeon/goldfish
  tag: 0.9.0
  pullPolicy: IfNotPresent
service:
  name: goldfish
  type: ClusterIP
  externalPort: 80
  internalPort: 8000
ingress:
  enabled: false
  # Used to create an Ingress record.
  hosts:
    - chart-example.local
  annotations:
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  tls:
    # Secrets must be manually created in the namespace.
    # - secretName: chart-example-tls
    #   hosts:
    #     - chart-example.local
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
config:
  listener:
    tcp:
      address: 0.0.0.0:8000
      tls_disable: 1
  vault:
    address: http://vault:8200
    tls_skip_verify: 1
    runtime_config: secret/goldfish
    approle_login: auth/approle/login
    approle_id: goldfish
  disable_mlock: 1

secrets:
  vault-token: ''
```

</details>

---

# Helm chart for GoldFish service

This Helm chart simplifies the deployment of [goldfish](https://github.com/Caiyeon/goldfish) on Kubernetes.

## Pre-requisites

- Requires (and tested with) vault `0.8.1` or above.

### Vault

- Use the [vault](https://github.com/kubernetes/charts/tree/master/incubator/vault) helm chart (still incubating)
- Use the [vault-operator](https://github.com/kubernetes/charts/tree/master/incubator/vault-operator) helm chart (pending PR)

Alternately, use an existing Vault and provide an endpoint. For more information on how to install Vault, check [here](https://www.vaultproject.io/docs/install/index.html).

## Chart Details

This chart will do the following:

- Create a Kubernetes Deployment for goldfish
- Expose goldfish on the specified `hosts` via ingress

### Installing the Chart

To install the chart with the release name `goldfish` in the default namespace:

```bash
helm install -n goldfish .
```

| Parameter              | Description                       | Default               |
| ---------------------- | --------------------------------- | --------------------- |
| `Name`                 | Name                              | `core`                |
| `replicaCount`         | Number of replicas                | `1`                   |
| `image.repository`     | Image and registry name           | `caiyeon/goldfish`    |
| `image.tag`            | Container image tag               | `0.9.0`               |
| `image.pullPolicy`     | Container image tag               | `Always`              |
| `service.type`         | k8s service type                  | `ClusterIP`           |
| `service.externalPort` | external port                     | `80`                  |
| `service.internalPort` | pod-listened port                 | `8000`                |
| `ingress.enabled`      | Enable ingress usage              | `false`               |
| `ingress.hosts`        | service hostname                  | `chart-example.local` |
| `config.*`             | variables to generate config file | see `values.yaml`     |
| `secrets.*`            | variables to be created as `ENV`  | see `values.yaml`     |

Specify parameters using `--set key=value[,key=value]` argument to `helm install`

```bash
helm install -n goldfish . --set \
  config.vault.address="http://vault:8200"
```

Alternatively a YAML file that specifies the values for the parameters can be provided like this:

```bash
$ helm install --name goldfish -f values.yaml .
```

### Upgrading and Rollbacks

Refer to official docs on [Upgrading a release and recovering on failure](https://github.com/kubernetes/helm/blob/master/docs/using_helm.md#helm-upgrade-and-helm-rollback-upgrading-a-release-and-recovering-on-failure).

Use `helm history` to see previous releases

```bash
helm history goldfish
```

Use `helm upgrade --reuse-values` to keep previous secrets

```
helm upgrade --reuse-values goldfish .
```

Use `helm get values` to get current User Supplied values

```
helm get values goldfish
```

Use `helm rollback [RELEASE] [REVISION]` to roll back to previous release

```
helm rollback goldfish 1

helm history goldfish
REVISION        UPDATED                         STATUS          CHART                   DESCRIPTION
1               Thu Apr  6 16:25:13 2017        SUPERSEDED      goldfish-0.1.0        Install complete
2               Thu May  4 11:57:05 2017        SUPERSEDED      goldfish-0.1.0        Upgrade complete
3               Tue Jun  6 18:24:31 2017        SUPERSEDED      goldfish-0.1.0        Rollback to 1
```
