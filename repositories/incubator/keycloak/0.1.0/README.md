# `@helm-charts/incubator-keycloak`

Open Source Identity and Access Management For Modern Applications and Services

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | keycloak  |
| Chart Version       | 0.1.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  ## Keycloak image.
  ##
  repository: jboss/keycloak

  ## keycloak image version.
  ## ref: https://hub.docker.com/r/jboss/keycloak/tags/
  ##
  tag: 3.3.0.Final

  ## Specify a imagePullPolicy: 'Always' if imageTag is 'latest', else set to 'IfNotPresent'.
  ## ref: https://kubernetes.io/docs/user-guide/images/#pre-pulling-image
  ##
  pullPolicy: IfNotPresent

keycloak:
  ## First keycloak username
  ## This user has full admin access
  username: keycloak

  ## Keycloak Password for the first user.
  ## If not set, a random 10 characters password will be used.
  ##
  # password: keycloak

  ## Keycloak logging level
  loglevel: INFO

  ## Configure resource requests and limits.
  ## ref: https://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    # limits:
    #   cpu: "100m"
    #   memory: "1024Mi"
    # requests:
    #   cpu: "100m"
    #   memory: "1024Mi"

  ## Ingress configuration.
  ## ref: https://kubernetes.io/docs/user-guide/ingress/
  ##
  ingress:
    ## Enable Ingress.
    ##
    enabled: false

    ## Annotations to be added to the ingress.
    ##
    # annotations:
    #   kubernetes.io/ingress.class: nginx
    #   kubernetes.io/tls-acme: 'true'

    ## Hostnames.
    ## Must be provided if Ingress is enabled.
    ##
    hostname: keycloak.example.com

    ## TLS configuration.
    ## Secrets must be manually created in the namespace.
    ##
    # tls:
    # - secretName: keycloak.example.com-tls
    #   hosts:
    #   - keycloak.example.com
    #
    #
  service:
    # annotations:
    #   service.beta.kubernetes.io/aws-load-balancer-internal: "0.0.0.0/0"
    # labels:
    #   key: value

    ## ServiceType
    ## ref: https://kubernetes.io/docs/user-guide/services/#publishing-services---service-types
    ##
    type: ClusterIP

    ## nodePort port number
    ## Is not required, but allows for static port assignment with
    ## serviceType NodePort.
    ## Default: nil
    # nodePort: 30000

    port: 80

postgresql:
  ### PostgreSQL User to create.
  ##
  postgresUser: keycloak

  ## PostgreSQL Password for the new user.
  ## If not set, a random 10 characters password will be used.
  ##
  # postgresPassword: keycloak

  ## PostgreSQL Database to create.
  ##
  postgresDatabase: keycloak

  ## Persistent Volume Storage configuration.
  ## ref: https://kubernetes.io/docs/user-guide/persistent-volumes
  ##
  persistence:
    ## Enable PostgreSQL persistence using Persistent Volume Claims.
    ##
    enabled: true
```

</details>

---

# Keycloak

[Keycloak](http://www.keycloak.org/) is an open source identity and access management for modern applications and services.

## TL;DR;

```console
$ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
$ helm install incubator/keycloak
```

## Introduction

This chart bootstraps a [Keycloak](http://www.keycloak.org/) deployment on a [Kubernetes](https://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites Details

- PV support on underlying infrastructure (if persistence is required)

## Installing the Chart

To install the chart with the release name `keycloak` into the namespace keycloak-system:

```console
$ helm install --name keycloak incubator/keycloak --namespace keycloak-system
```

## Uninstalling the Chart

To uninstall/delete the `keycloak` deployment:

```console
$ helm delete keycloak
```

## Chart Details

This chart will provision a fully functional and fully featured Keycloak installation.
For more information on Keycloak and its capabilities, see it's [documentation](http://www.keycloak.org/documentation.html).

## Configuration

Configurable values are documented in the `values.yaml`.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name keycloak -f values.yaml incubator/keycloak
```

> **Tip**: You can use the default [values.yaml](values.yaml)
