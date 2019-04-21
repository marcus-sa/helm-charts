# `@helm-charts/incubator-artifactory`

Universal Repository Manager supporting all major packaging formats, build tools and CI servers.

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | incubator   |
| Chart Name          | artifactory |
| Chart Version       | 5.2.0       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for Artifactory.
# This is a YAML-formatted file.
# Declare name/value pairs to be passed into your templates.
# name: value

Name: artifactory
Component: 'Artifactory'

## Uncomment following line if you want to run Artifactory-Pro
#image: "docker.bintray.io/jfrog/artifactory-pro"
image: 'docker.bintray.io/jfrog/artifactory-oss'
imageTag: '5.2.0'
imagePullPolicy: 'Always'
replicaCount: 1
httpPort: 8081
## Kubernetes configuration
## For minikube, set this to NodePort, elsewhere use LoadBalancer
##
ServiceType: ClusterIP
resources:
  requests:
    memory: 2048Mi
    cpu: 200m

## Persist data to a persitent volume
persistence:
  enabled: true
  storageClass: generic
  accessMode: ReadWriteOnce
  size: 8Gi
```

</details>

---

# JFrog Artifactory Helm Chart

## Prerequisites Details

- Artifactory Pro trial license [get one from here](https://www.jfrog.com/artifactory/free-trial/)

## Todo

- Implement Support of Reverse proxy for Docker Repo using Nginx
- Smarter upscaling/downscaling

## Chart Details

This chart will do the following:

- Deploy Artifactory-oss
- Deploy Artifactory-Pro

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release incubator/artifactory
```

Note: By default it will run Artifactory-oss to run Artifactory-Pro uncomment image in value.yaml or use following command

```bash
$ helm install --name my-release --set image=docker.bintray.io/jfrog/artifactory-pro incubator/artifactory
```

## Deleting the Charts

Deletion of the PetSet doesn't cascade to deleting associated Pods and PVCs. To delete them:

```
 $ helm delete my-release
```

## Configuration

The following tables lists the configurable parameters of the artifactory chart and their default values.

| Parameter         | Description           | Default                                   |
| ----------------- | --------------------- | ----------------------------------------- |
| `Image`           | Container image name  | `docker.bintray.io/jfrog/artifactory-oss` |
| `ImageTag`        | Container image tag   | `5.2.0`                                   |
| `ImagePullPolicy` | Container pull policy | `Always`                                  |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

## Useful links

https://www.jfrog.com
https://www.jfrog.com/confluence/
