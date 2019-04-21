# `@helm-charts/stable-tomcat`

Deploy a basic tomcat application server with sidecar as web archive container

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | tomcat |
| Chart Version       | 0.2.0  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for the chart.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1

image:
  webarchive:
    repository: ananwaresystems/webarchive
    tag: '1.0'
  tomcat:
    repository: tomcat
    tag: '7.0'
  pullPolicy: IfNotPresent
  pullSecrets: []

deploy:
  directory: /usr/local/tomcat/webapps

service:
  name: http
  type: LoadBalancer
  externalPort: 80
  internalPort: 8080

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - chart-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

readinessProbe:
  path: '/sample'
  initialDelaySeconds: 60
  periodSeconds: 30
  failureThreshold: 6
livenessProbe:
  path: '/sample'
  initialDelaySeconds: 60
  periodSeconds: 30

resources: {}
#  limits:
#    cpu: 100m
#    memory: 256Mi
#  requests:
#    cpu: 100m
#    memory: 256Mi

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# Tomcat

[Tomcat](http://tomcat.apache.org) is is an open source implementation of the Java Servlet, JavaServer Pages, Java Expression Language and Java WebSocket technologies.

## Introduction

This chart creates a [tomcat application server](http://tomcat.apache.org) Deployment, plus http Services for the server.
The chart offers an optimization for application updates running in a servlet container-type engines like tomcat and [Jboss](http://jbossas.jboss.org). The chart uses the WAR, EAR, and other deployable components outside of the Servlet engine as sidecar container so application upgrades requires the sidecar container image only to be updated and not the Servlet engine as if both would run at the same image.

## Prerequisites

- Kubernetes 1.8+

## Provider-specific Prerequisites

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/tomcat
```

This command deploys a tomcat dedicated server with sane defaults.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the tomcat chart and their default values.

| Parameter                     | Description                          | Default                      |
| ----------------------------- | ------------------------------------ | ---------------------------- |
| `image.webarchive.repository` | Sidecar image source repository name | `ananwaresystems/webarchive` |
| `image.webarchive.tag`        | `webarchive` release tag.            | `1.0`                        |
| `image.tomcat.repository`     | Tomact image source repository name  | `tomcat`                     |
| `image.tomcat.tag`            | `tomcat` release tag.                | `7.0`                        |
| `image.pullPolicy`            | Image pull policy                    | `IfNotPresent`               |
| `image.pullSecrets`           | Image pull secrets                   | `[]`                         |
| `deploy.directory`            | Webarchive deployment directory      | `/usr/local/tomcat/webapps`  |
| `service.name`                | Tomcat service name                  | `http`                       |
| `service.externalPort`        | Kubernetes service port              | `80`                         |
| `service.internalPort`        | Tomcat front port                    | `8080`                       |
| `service.type`                | Kubernetes service type              | `LoadBalancer`               |
| `readinessProbe.path`         | HTTP path to check for readiness     | `/sample`                    |
| `livenessProbe.path`          | HTTP path to check for readiness     | `/sample`                    |
| `resources`                   | CPU/Memory resource requests/limits  | `{}`                         |
| `nodeSelector`                | Node affinity                        | `{}`                         |
| `tolerations`                 | Node tolerations                     | `{}`                         |

Refer to [values.yaml](values.yaml) for the full run-down on defaults. These are a mixture of Kubernetes and tomcat-related directives that map to environment variables.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set Values.someval=My Server,ImageTag=1.0 \
    stable/tomcat
```

The above command deploys Tomcat dedicated with a server name of `My Server` and docker-tomcat image version `1.0`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/stable
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

> _"An emptyDir volume is first created when a Pod is assigned to a Node, and exists as long as that Pod is running on that node. When a Pod is removed from a node for any reason, the data in the emptyDir is deleted forever."_

## Credits

[Java Web Application with Tomcat and Sidecar Container](https://github.com/kubernetes/examples/tree/master/staging/javaweb-tomcat-sidecar)
