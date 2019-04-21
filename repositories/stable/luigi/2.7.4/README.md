# `@helm-charts/stable-luigi`

Luigi is a Python module that helps you build complex pipelines of batch jobs. It handles dependency resolution, workflow management, visualization etc. It also comes with Hadoop support built in.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | luigi  |
| Chart Version       | 2.7.4  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for luigi.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
image:
  repository: axiom/docker-luigi
  tag: 2.7.2-alpine
  pullPolicy: IfNotPresent

service:
  name: luigi
  type: LoadBalancer
  externalPort: 80

  # Luigi config: these values should mattch the luigi documentation
  # https://luigi.readthedocs.io/en/stable/configuration.html
  config: |
    [core]
    logging_conf_file=/etc/luigi/logging.cfg

    [scheduler]
    record_task_history=true
    state-path=/luigi/state/luigi-state.pickle

    [task_history]
    db_connection=mysql://luigi-mysql/luigidb

# creates a persistent volume claim for
# luigi state pickel
persistence:
  enabled: false
  size: 1G
  accessMode: ReadWriteOnce

# Ingress for ui access for use with authentication like oauth-proxy
# depending on the authentication you use. You may only need one ingress.
ingressUI:
  enabled: false
  path: /
  # Used to create an Ingress record.
  # hosts:
  # - chart-example.local
  # annotations:
  #   kubernetes.io/ingress.class: nginx
  #   kubernetes.io/tls-acme: "true"
  # tls:
  # Secrets must be manually created in the namespace.
  # - secretName: chart-example-tls
  #   hosts:
  #     - chart-example.local

# Ingress for api access viahttps and whatever authentication you use
ingressAPI:
  enabled: false
  path: /
  # Used to create an Ingress record.
  # hosts:
  # - chart-example.local
  # annotations:
  #   kubernetes.io/ingress.class: nginx
  #   kubernetes.io/tls-acme: "true"
  # tls:
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

mysql:
  mysqlDatabase: luigidb
  mysqlAllowEmptyPassword: true
  persistence:
    enabled: false
```

</details>

---

# Luigi Scheduler

[Luigi](https://github.com/spotify/luigi) is a Python module that helps you build complex pipelines of batch jobs. It handles dependency resolution, workflow management, visualization etc. It also comes with Hadoop support built in.

## TL;DR;

```console
$ helm install incubator/luigi
```

## Introduction

This chart bootstraps a [Luigi](https://github.com/spotify/luigi) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/luigi
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Luigi Configuration

[Luigi](https://github.com/spotify/luigi) configs are set as a block of text through a configmap and mouted as a file in /etc/luigi. Any value in this text block should match the defined luigi configuration. There are several values here that will have to match our kubernetes configuration.

## Configuration

The following table lists the configurable parameters of the Sentry chart and their default values.

| Parameter              | Description               | Default                                   |
| ---------------------- | ------------------------- | ----------------------------------------- |
| `image.repository`     | Luigi image               | `getpolymorph/luigi`                      |
| `image.tag`            | Luigi image tag           | `2.7.2`                                   |
| `image.pullPolicy`     | Luigi image pull policy   | `IfNotPresent`                            |
| `service.name`         | Luigi service name        | `luigi`                                   |
| `service.type`         | The kube service type     | `LoadBalancer`                            |
| `service.externalPort` | The service external port | `3000`                                    |
| `service.internalPort` | The service internal port | `8082`                                    |
| `service.config`       | The luigi service configs | View this default in the values.yaml file |
| `persistence.enabled`  | Persistence flag          | `false`                                   |
| `ingressUI.enabled`    | UI Ingress Flag           | `false`                                   |
| `ingressAPI.enabled`   | API Ingress Flag          | `false`                                   |

Dependent charts can also have values overwritten. Preface values with postgresql._ or redis._

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set persistence.enabled=false,email.host=email \
    stable/luigi
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/luigi
```

Read through the [values.yaml](values.yaml) file. It has several commented out suggested values.

## Persistence

Luigi requires a pickled state file. To maintain state after a restart you'll need to enable persistence.
`--set persistence.enabled=true`

## Ingress

This chart provides support for two Ingress resources. This is to allow authentication in the ui via reverse proxy with something like oauth-proxy and a separate form of authentication for luigi worker access.
