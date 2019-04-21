# `@helm-charts/stable-metabase`

The easy, open source way for everyone in your company to ask questions and learn from data.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | metabase |
| Chart Version       | 0.4.5    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Currently Metabase is not horizontly scalable. See
# https://github.com/metabase/metabase/issues/1446 and
# https://github.com/metabase/metabase/issues/2754
# NOTE: Should remain 1
replicaCount: 1
image:
  repository: metabase/metabase
  tag: v0.31.2
  pullPolicy: IfNotPresent

# Config Jetty web server
listen:
  host: '0.0.0.0'
  port: 3000
ssl:
  # If you have an ssl certificate and would prefer to have Metabase run over HTTPS
  enabled: false
  # port: 8443
  # keyStore: |-
  #   << JKS KEY STORE >>
  # keyStorePassword: storepass

# Backend database
database:
  # Database type (h2 / mysql / postgres), default: h2
  type: h2
  # encryptionKey: << YOUR ENCRYPTION KEY >>
  ## Only need when you use mysql / postgres
  # host:
  # port:
  # dbname:
  # username:
  # password:
  ## Alternatively, use a connection URI for full configurability. Example for SSL enabled Postgres.
  # connectionURI: postgres://user:password@host:port/database?ssl=true&sslmode=require&sslfactory=org.postgresql.ssl.NonValidatingFactory"

password:
  # Changing Metabase password complexity:
  # weak: no character constraints
  # normal: at least 1 digit (default)
  # strong: minimum 8 characters w/ 2 lowercase, 2 uppercase, 1 digit, and 1 special character
  complexity: normal
  length: 6

timeZone: UTC
emojiLogging: true
# javaToolOptions:
# pluginsDirectory:

service:
  name: metabase
  type: ClusterIP
  externalPort: 80
  internalPort: 3000
  annotations:
    # Used to add custom annotations to the Service.
    # service.beta.kubernetes.io/aws-load-balancer-internal: "0.0.0.0/0"
ingress:
  enabled: false
  # Used to create Ingress record (should used with service.type: ClusterIP).
  hosts:
    # - metabase.domain.com
  # The ingress path. Useful to host metabase on a subpath, such as `/metabase`.
  path: /
  labels:
    # Used to add custom labels to the Ingress
    # Useful if for example you have multiple Ingress controllers and want your Ingress controllers to bind to specific Ingresses
    # traffic: internal
  annotations:
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  tls:
    # Secrets must be manually created in the namespace.
    # - secretName: metabase-tls
    #   hosts:
    #     - metabase.domain.com
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
```

</details>

---

# Metabase

[Metabase](http://metabase.com) is the easy, open source way for everyone in your company to ask questions and learn from data.

## TL;DR;

```bash
$ helm install stable/metabase
```

## Introduction

This chart bootstraps a [Metabase](https://github.com/metabase/metabase) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/metabase
```

The command deploys Metabase on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Metabase chart and their default values.

| Parameter              | Description                                                 | Default           |
| ---------------------- | ----------------------------------------------------------- | ----------------- |
| replicaCount           | desired number of controller pods                           | 1                 |
| image.repository       | controller container image repository                       | metabase/metabase |
| image.tag              | controller container image tag                              | v0.31.2           |
| image.pullPolicy       | controller container image pull policy                      | IfNotPresent      |
| listen.host            | Listening on a specific network host                        | 0.0.0.0           |
| listen.port            | Listening on a specific network port                        | 3000              |
| ssl.enabled            | Enable SSL to run over HTTPS                                | false             |
| ssl.port               | SSL port                                                    | null              |
| ssl.keyStore           | The key store in JKS format                                 | null              |
| ssl.keyStorePassword   | The password for key Store                                  | null              |
| database.type          | Backend database type                                       | h2                |
| database.encryptionKey | Secret key for encrypt sensitive information into database  | null              |
| database.connectionURI | Database connection URI (alternative to the below settings) | null              |
| database.host          | Database host                                               | null              |
| database.port          | Database port                                               | null              |
| database.dbname        | Database name                                               | null              |
| database.username      | Database username                                           | null              |
| database.password      | Database password                                           | null              |
| password.complexity    | Complexity requirement for Metabase account's password      | normal            |
| password.length        | Minimum length required for Metabase account's password     | 6                 |
| timeZone               | Service time zone                                           | UTC               |
| emojiLogging           | Get a funny emoji in service log                            | true              |
| javaToolOptions        | JVM options                                                 | null              |
| pluginsDirectory       | A directory with Metabase plugins                           | null              |
| service.type           | ClusterIP, NodePort, or LoadBalancer                        | ClusterIP         |
| service.externalPort   | Service external port                                       | 80                |
| service.internalPort   | Service internal port, should be the same as `listen.port`  | 3000              |
| service.annotations    | Service annotations                                         | {}                |
| ingress.enabled        | Enable ingress controller resource                          | false             |
| ingress.hosts          | Ingress resource hostnames                                  | null              |
| ingress.path           | Ingress path                                                | /                 |
| ingress.labels         | Ingress labels configuration                                | null              |
| ingress.annotations    | Ingress annotations configuration                           | null              |
| ingress.tls            | Ingress TLS configuration                                   | null              |
| resources              | Server resource requests and limits                         | {}                |

The above parameters map to the env variables defined in [metabase](http://github.com/metabase/metabase). For more information please refer to the [metabase documentations](http://www.metabase.com/docs/v0.24.2/).

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set timeZone=US/Pacific,password.complexity=strong,password.length=10 \
    stable/metabase
```

The above command sets the time zone to `US/Pacific`, `strong` user password complexity and minimum length at `10`

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/metabase
```

> **Tip**: You can use the default [values.yaml](values.yaml)
