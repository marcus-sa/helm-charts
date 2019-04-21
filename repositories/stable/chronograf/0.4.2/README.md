# `@helm-charts/stable-chronograf`

Open-source web application written in Go and React.js that provides the tools to visualize your monitoring data and easily create alerting and automation rules.

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | chronograf |
| Chart Version       | 0.4.2      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Image Settings
##
image:
  repository: 'docker.io/chronograf'
  tag: '1.3-alpine'
  pullPolicy: 'Always'

## Specify a service type
## ClusterIP is default
## ref: http://kubernetes.io/docs/user-guide/services/
##
service:
  replicas: 1
  type: ClusterIP

## Persist data to a persitent volume
##
persistence:
  enabled: false
  ## chronograf data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 8Gi

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 256Mi
    cpu: 0.1
  limits:
    memory: 2Gi
    cpu: 2

## Configure the ingress object to hook into existing infastructure
## ref : http://kubernetes.io/docs/user-guide/ingress/
## OPTIONALLY you can set .Values.ingress.secretName to set which secret to use
##
ingress:
  enabled: false
  tls: false
  hostname: chronograf.foobar.com
  annotations:
    # kubernetes.io/ingress.class: "nginx"
    # secretName: my-tls-cert
    # kubernetes.io/tls-acme: "true"

## OAuth Settings for OAuth Providers
## More information -> https://github.com/influxdata/chronograf/blob/master/docs/auth.md
##
oauth:
  # Need to set to true to use any of the oauth options
  enabled: false
  # Used for JWT to support running multiple copies of Chronograf
  token_secret: CHANGE_ME
  github:
    enabled: false
    client_id: CHANGE_ME
    client_secret: CHANGE_ME
    # This is a comma separated list of GH organizations (OPTIONAL)
    gh_orgs: ''
  google:
    enabled: false
    client_id: CHANGE_ME
    client_secret: CHANGE_ME
    # eg. http://chronograf.foobar.com
    public_url: ''
    # This is a comma separated list of Google Apps domains (OPTIONAL)
    google_domains: ''
  heroku:
    enabled: false
    client_id: CHANGE_ME
    client_secret: CHANGE_ME
    # This is a comma separated list of Heroku organizations (OPTIONAL)
    he_orgs: ''
```

</details>

---

# Chronograf

## An Open-Source Time Series Visualization Tool

[Chronograf](https://github.com/influxdata/chronograf) is an open-source web application built by the folks over at [InfluxData](https://influxdata.com) and written in Go and React.js that provides the tools to visualize your monitoring data and easily create alerting and automation rules.

## QuickStart

```bash
$ helm install stable/chronograf --name foo --namespace bar
```

## Introduction

This chart bootstraps a Chronograf deployment and service on a Kubernetes cluster using the Helm Package manager.

## Prerequisites

- Kubernetes 1.4+
- PV provisioner support in the underlying infrastructure (optional)

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/chronograf
```

The command deploys Chronograf on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The configurable parameters of the Chronograf chart and
their descriptions can be seen in `values.yaml`. The [full image documentation](https://quay.io/influxdb/chronograf) contains more information about running Chronograf in docker.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set ingress.enabled=true,ingress.hostname=chronograf.foobar.com \
    stable/chronograf
```

The above command enables persistence and changes the size of the requested data volume to 200GB.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/chronograf
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Chronograf](https://quay.io/influxdb/chronograf) image stores data in the `/var/lib/chronograf` directory in the container.

The chart optionally mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) volume at this location. The volume is created using dynamic volume provisioning.
