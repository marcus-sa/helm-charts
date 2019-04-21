# `@helm-charts/stable-gitlab-ee`

GitLab Enterprise Edition

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | gitlab-ee |
| Chart Version       | 0.1.8     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## GitLab EE image
## ref: https://hub.docker.com/r/gitlab/gitlab-ee/tags/
##
image: gitlab/gitlab-ee:9.4.1-ee.0

## Specify a imagePullPolicy
## 'Always' if imageTag is 'latest', else set to 'IfNotPresent'
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
# imagePullPolicy:

## The URL (with protocol) that your users will use to reach the install.
## ref: https://docs.gitlab.com/omnibus/settings/configuration.html#configuring-the-external-url-for-gitlab
##
#externalUrl: http://your-domain.com/

## Change the initial default admin password if set. If not set, you'll be
## able to set it when you first visit your install.
##
#gitlabRootPassword: ""

## For minikube, set this to NodePort, elsewhere use LoadBalancer
## ref: http://kubernetes.io/docs/user-guide/services/#publishing-services---service-types
##
serviceType: LoadBalancer

## Configure external service ports
## ref: http://kubernetes.io/docs/user-guide/services/
sshPort: 22
httpPort: 80
httpsPort: 443

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  ## GitLab requires a good deal of resources. We have split out Postgres and
  ## redis, which helps some. Refer to the guidelines for larger installs.
  ## ref: https://docs.gitlab.com/ee/install/requirements.html#hardware-requirements
  requests:
    memory: 1Gi
    cpu: 500m
  limits:
    memory: 2Gi
    cpu: 1

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
## ref: https://docs.gitlab.com/ee/install/requirements.html#storage
##
persistence:
  ## This volume persists generated configuration files, keys, and certs.
  ##
  gitlabEtc:
    enabled: true
    size: 1Gi
    ## If defined, volume.beta.kubernetes.io/storage-class: <storageClass>
    ## Default: volume.alpha.kubernetes.io/storage-class: default
    ##
    # storageClass:
    accessMode: ReadWriteOnce
  ## This volume is used to store git data and other project files.
  ## ref: https://docs.gitlab.com/omnibus/settings/configuration.html#storing-git-data-in-an-alternative-directory
  ##
  gitlabData:
    enabled: true
    size: 10Gi
    ## If defined, volume.beta.kubernetes.io/storage-class: <storageClass>
    ## Default: volume.alpha.kubernetes.io/storage-class: default
    ##
    # storageClass:
    accessMode: ReadWriteOnce

## Configuration values for the postgresql dependency.
## ref: https://github.com/kubernetes/charts/blob/master/stable/postgresql/README.md
##
postgresql:
  # 9.6 is the newest supported version for the GitLab container
  imageTag: '9.6'
  cpu: 1000m
  memory: 1Gi

  postgresUser: gitlab
  postgresPassword: gitlab
  postgresDatabase: gitlab

  persistence:
    size: 10Gi

## Configuration values for the redis dependency.
## ref: https://github.com/kubernetes/charts/blob/master/stable/redis/README.md
##
redis:
  redisPassword: 'gitlab'

  resources:
    requests:
      memory: 1Gi

  persistence:
    size: 10Gi
```

</details>

---

# GitLab Enterprise Edition

[GitLab Enterprise Edition](https://about.gitlab.com/) is an application to code, test, and deploy code together. It provides Git repository management with fine grained access controls, code reviews, issue tracking, activity feeds, wikis, and continuous integration.

## Introduction

This chart stands up a GitLab Enterprise Edition install. This includes:

- A [GitLab Omnibus](https://docs.gitlab.com/omnibus/) Pod
- Redis
- Postgresql

## Prerequisites

- _At least_ 3 GB of RAM available on your cluster, in chunks of 1 GB
- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure
- The ability to point a DNS entry or URL at your GitLab install

## Installing the Chart

To install the chart with the release name `my-release` run:

```bash
$ helm install --name my-release \
    --set externalUrl=http://your-domain.com/ stable/gitlab-ee
```

Note that you _must_ pass in externalUrl, or you'll end up with a non-functioning release.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

Refer to [values.yaml](values.yaml) for the full run-down on defaults. These are a mixture of Kubernetes and GitLab-related directives.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
    --set externalUrl=http://your-domain.com/,gitlabRootPassword=pass1234 \
    stable/gitlab-ee
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/gitlab-ee
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

By default, persistence of GitLab data and configuration happens using PVCs. If you know that you'll need a larger amount of space, make _sure_ to look at the `persistence` section in [values.yaml](values.yaml).

> _"If you disable persistence, the contents of your volume(s) will only last as long as the Pod does. Upgrading or changing certain settings may lead to data loss without persistence."_
