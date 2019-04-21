# `@helm-charts/ibm-charts-ibm-microclimate`

End to end development environment for rapidly creating, developing and deploying applications.

| Field               | Value            |
| ------------------- | ---------------- |
| Repository Name     | ibm-charts       |
| Chart Name          | ibm-microclimate |
| Chart Version       | 0.1.0            |
| NPM Package Version | 0.1.0            |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
#*******************************************************************************
# Licensed Materials - Property of IBM
# "Restricted Materials of IBM"
#
# Copyright IBM Corp. 2017 All Rights Reserved
#
# US Government Users Restricted Rights - Use, duplication or disclosure
# restricted by GSA ADP Schedule Contract with IBM Corp.
#*******************************************************************************

theia:
  repository: ibmcom/microclimate-theia
  tag: latest
  resources:
    memRequest: 350Mi
    cpuRequest: 30m
    memLimit: 1Gi
    cpuLimit: 500m

filewatcher:
  repository: ibmcom/microclimate-file-watcher
  tag: latest
  resources:
    memRequest: 128Mi
    cpuRequest: 500m
    memLimit: 2Gi
    cpuLimit: 3000m

portal:
  repository: ibmcom/microclimate-portal
  tag: latest
  resources:
    memRequest: 128Mi
    cpuRequest: 300m
    memLimit: 2Gi
    cpuLimit: 500m

jmeter:
  repository: ibmcom/microclimate-jmeter
  tag: latest

imagePullPolicy: Always

persistence:
  enabled: true
  useDynamicProvisioning: true
  size: 2Gi
  storageClassName: ''

ports:
  portal: 9090
  theia: 4191
  filewatcher: 9091

arch:
  amd64: '3 - Most preferred'
  ppc64le: '0 - Do not use'
  s390x: '0 - Do not use'

devops:
  repository: ibmcom/microclimate-devops
  tag: latest
  pullPolicy: Always

service:
  name: devops
  type: ClusterIP
  externalPort: 9191
  internalPort: 9191
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
gitlab-ce:
  gitlabRootPassword: password
  externalUrl: http://gitlab.192.168.99.100.nip.io/
  serviceType: ClusterIP
  ingress:
    enabled: true
    url: gitlab.192.168.99.100.nip.io

jenkins:
  # pipeline section used to modify the default pipeline
  Pipeline:
    # Build step for all pipelines that are built by this Jenkins.
    Build: true
    # Deploy step for all pipelines built by this Jenkins.
    Deploy: true
    #  Setting this to true enables testing in the pipeline.
    Test: true
    #  Setting this to 'true' will prevent temporary namespaces from being deleted after tests are run against them.
    Debug: false
    # registry section points to a docker registry where images that are built via this pipeline are stored
    Registry:
      # The URL of the Docker registry for this pipeline e.g. mycluster.icp:8500/default.
      Url: mycluster.icp:8500/default
      # The name of the Kubernetes secret to be used for registry access.
      Secret: microclimate-icp-secret
    # TargetNamespace is the namespace that the pipeline will deploy to.
    TargetNamespace: 'microclimate-pipeline-deployments'
    # template section defines the location of the Git repository from which the microserviceBuilderPipeline.groovy library is obtained
    Template:
      # repositoryUrl of the pipeline template
      RepositoryUrl: 'https://github.com/WASdev/microservicebuilder.lib.git'
      # version is the branch or tag to be used when downloading the library
      Version: 'microclimate-beta'

  Master:
    ServiceType: ClusterIP
    CustomConfigMap: true
    HostName: jenkins.192.168.99.100.nip.io
    UseSecurity: true
    AdminUser: admin
    AdminPassword: admin
    InstallPlugins:
      - kubernetes:1.3.1
      - workflow-aggregator:2.5
      - workflow-job:2.17
      - credentials-binding:1.15
      - git:3.8.0
```

</details>

---

# Microclimate - Beta

## Introduction

Microclimate is an end to end development environment that lets you rapidly create, edit, and deploy applications.

This chart can be used to install Microclimate into an IBM Cloud Private or Kubernetes environment.

Visit the [Micoclimate landing page](https://microclimate-dev2ops.github.io/) to learn more or visit our [slack channel](https://ibm-cloud-tech.slack.com/messages/C8RS7HBHV/) to ask any Microclimate questions you may have

## Prerequisites

- An active IBM Cloud Private or Kubernetes cluster (including minikube)

## Installing the Chart

**IMPORTANT** - For Microclimate to function correctly, you must first create a secret and patch it to the user account that you wish to install Microclimate with using the account credentials:

#### Create secret

```
kubectl create secret docker-registry microclimate-icp-secret --docker-server=mycluster.icp:8500 --docker-username=<account-name> --docker-password=<account-password> --docker-email=<account-email>
```

For example, to create the secret under the to the default admin account:
`kubectl create secret docker-registry microclimate-icp-secret --docker-server=mycluster.icp:8500 --docker-username=admin --docker-password=admin --docker-email=admin@admin.com`

#### Patch service account

After creating the secret, this needs to be patched to the service account using the following command with the name of the service account (ICP comes with a default service account called "default")

```
kubectl patch serviceaccount <svc-account-name> -p '{"imagePullSecrets": [{"name": "microclimate-icp-secret"}]}'
```

Note: If there are other secrets that need to be associated to this service account, they should be included in the imagePullSecrets array in the command above e.g. `... '{"imagePullSecrets": [{"name": "microclimate-icp-secret"}, {"name": "secret-1"}, ...., {"name": "secret-n"} ]}'`

To install the chart with the release name `microclimate`:

`helm dep update`

this will retrieve the subcharts that Microclimate uses.

`helm install --name microclimate <path_to_this_chart>`

this command deploys Microclimate on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Verifying the Chart

Once the helm install has completed successfully, enter the commands provided at the end of the installation to open your Microclimate instance

## Uninstalling the Chart

To uninstall/delete the `microclimate` deployment:

```bash
$ helm delete microclimate --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

#### Persistent Storage

The Microclimate workspace requires your ICP cluster to provide persistent storage in order to store projects that are created or imported. Persistent storage is enabled by default with a storage size of 2GB. This size should be configured (using the `persistence.size` option) to scale with the number and size of projects expected to be created in Microclimate. As a rough guide, a generated Java project is approximately 128MB.

Dynamic Provisioning is also enabled by default and uses the default storage class set up in the given IBM Cloud Private instance. A different storage class can be used by editing the `persistence.storageClassName` option in the configuration (see below).

Visit the following pages for more information about creating Persistent Storage and enabling Dynamic Provisioning:  
[Cluster Storage](https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0/manage_cluster/cluster_storage.html)
[Working with storage]([https://www.ibm.com/developerworks/community/blogs/fe25b4ef-ea6a-4d86-a629-6f87ccf4649e/entry/Working_with_storage)
[Dynamic Provisioning](https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0/installing/storage_class_all.html)

#### Resource requests and limits

Each Microclimate container has a set of default requests and limits for CPU and Memory usage. These are set at recommended values but should be configured to suit the needs of your IBM Cloud Private instance. See below for how to configure these values.

#### Configuring Microclimate

Microclimate provides a number of configuration options to customise its installation. Below are a list of configurable parameters.

If you are installing in IBM Cloud Private, then these can be configured through the Configuration page when installing Microclimate from the catalog.

If you are installing using the Helm CLI then values can be set using one or more `--set` arguments when doing `helm install`. For example, to configure persistent storage options, you can use the following:

`helm install --name myMicroclimate --set persistence.enabled=true --set persistence.size=2Gi stable/ibm-microclimate`

#### Configuration parameters

| Parameter                            | Description                                                                                                              | Default                                |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| `theia.repository`                   | Image repository for theia                                                                                               | `ibmcom/microclimate-theia`            |
| `theia.tag`                          | Tag for theia image                                                                                                      | `latest`                               |
| `filewatcher.repository`             | Image repository for file-watcher                                                                                        | `ibmcom/microclimate-file-watcher`     |
| `filewatcher.tag`                    | Tag for file-watcher image                                                                                               | `latest`                               |
| `portal.repository`                  | Image repository for portal                                                                                              | `ibmcom/microclimate-portal`           |
| `portal.tag`                         | Tag for portal image                                                                                                     | `latest`                               |
| `imagePullPolicy`                    | Image pull policy used for all images                                                                                    | `Always`                               |
| `persistence.enabled`                | Use persistent storage for microclimate workspace                                                                        | `true`                                 |
| `persistence.useDynamicProvisioning` | Use dynamic provisioning                                                                                                 | `true`                                 |
| `persistence.size`                   | Storage size allowed for microclimate workspace                                                                          | `2Gi`                                  |
| `persistence.storageClassName`       | Storage class name for microclimate workspace                                                                            | `""`                                   |
| `jenkins.Master.HostName`            | URL for the Jenkins component of Microclimate: provide the domain name (including a unique sub-domain for this component | `jenkins.192.168.99.100.nip.io`        |
| `gitlab-ce.ingress.url`              | URL for the Gitlab component of Microclimate: provide the domain name (including a unique sub-domain for this component  | `gitlab.192.168.99.100.nip.io`         |
| `gitlab-ce.externalUrl`              | URL for the Gitlab component of Microclimate: provide the domain name (including a unique sub-domain for this component) | `http://gitlab.192.168.99.100.nip.io/` |
| `gitlab-ce.gitlabRootPassword`       | The password for the `root` user on Gitlab                                                                               | `password`                             |

Resource limits can also be configured for each of the `theia`, `filewatcher` and `portal` containers using the options below (e.g. `theia.resources.cpuRequest`):

| Parameter                              | Description                               | Default                                                                                                            |
| -------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `<containerName>.resources.cpuRequest` | CPU Request size for a given container    | View the ICP configuration page for Microclimate or the values.yaml file to view default values for each container |
| `<containerName>.resources.cpuLimit`   | CPU Limit size for a given container      | View the ICP configuration page for Microclimate or the values.yaml file to view default values for each container |
| `<containerName>.resources.memRequest` | Memory Request size for a given container | View the ICP configuration page for Microclimate or the values.yaml file to view default values for each container |
| `<containerName>.resources.memLimit`   | Memory Limit size for a given container   | View the ICP configuration page for Microclimate or the values.yaml file to view default values for each container |

#### Devops Pipeline Notes

A note on domain names: the use of `<IP>.nip.io` is a convenience for those who don't have a domain name assigned to the Kubernetes cluster.

If you don't have a real domain name associated with your Kubernetes cluster, it's useful to override the Ingress locations so you can access the services.

You can set a command line variable e.g. `INGRESS_IP` with `export INGRESS_IP=$(minikube ip)` or with the IP address of your IBM Cloud Private proxy node.

You can determine the proxy IP address by using the IBM Cloud Private web interface.

You can install the chart with overrides for Ingress with:

`helm install --name microclimate --set jenkins.Master.HostName=jenkins.${INGRESS_IP}.nip.io,gitlab-ce.ingress.url=gitlab.${INGRESS_IP}.nip.io,gitlab-ce.externalUrl=http://gitlab.${INGRESS_IP}.nip.io .`

The Jenkins pod takes a while to start as it is installing plugins. This, in turn, means that the DevOps pod may restart several times whilst it is waiting for GitLab and Jenkins to start.
