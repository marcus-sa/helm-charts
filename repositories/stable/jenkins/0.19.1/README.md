# `@helm-charts/stable-jenkins`

Open source continuous integration server. It supports multiple SCM tools including CVS, Subversion and Git. It can execute Apache Ant and Apache Maven-based projects as well as arbitrary scripts.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | jenkins |
| Chart Version       | 0.19.1  |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for jenkins.
# This is a YAML-formatted file.
# Declare name/value pairs to be passed into your templates.
# name: value

## Overrides for generated resource names
# See templates/_helpers.tpl
# nameOverride:
# fullnameOverride:

Master:
  Name: jenkins-master
  Image: 'jenkins/jenkins'
  ImageTag: 'lts'
  ImagePullPolicy: 'Always'
  # ImagePullSecret: jenkins
  Component: 'jenkins-master'
  UseSecurity: true
  HostNetworking: false
  AdminUser: admin
  # AdminPassword: <defaults to random>
  resources:
    requests:
      cpu: '50m'
      memory: '256Mi'
    limits:
      cpu: '2000m'
      memory: '2048Mi'
  # Environment variables that get added to the init container (useful for e.g. http_proxy)
  # InitContainerEnv:
  #   - name: http_proxy
  #     value: "http://192.168.64.1:3128"
  # ContainerEnv:
  #   - name: http_proxy
  #     value: "http://192.168.64.1:3128"
  # Set min/max heap here if needed with:
  # JavaOpts: "-Xms512m -Xmx512m"
  # JenkinsOpts: ""
  # JenkinsUriPrefix: "/jenkins"
  # Enable pod security context (must be `true` if RunAsUser or FsGroup are set)
  UsePodSecurityContext: true
  # Set RunAsUser to 1000 to let Jenkins run as non-root user 'jenkins' which exists in 'jenkins/jenkins' docker image.
  # When setting RunAsUser to a different value than 0 also set FsGroup to the same value:
  # RunAsUser: <defaults to 0>
  # FsGroup: <will be omitted in deployment if RunAsUser is 0>
  ServicePort: 8080
  # For minikube, set this to NodePort, elsewhere use LoadBalancer
  # Use ClusterIP if your setup includes ingress controller
  ServiceType: LoadBalancer
  # Master Service annotations
  ServiceAnnotations: {}
  #   service.beta.kubernetes.io/aws-load-balancer-backend-protocol: https
  # Used to create Ingress record (should used with ServiceType: ClusterIP)
  # HostName: jenkins.cluster.local
  # NodePort: <to set explicitly, choose port between 30000-32767
  # Enable Kubernetes Liveness and Readiness Probes
  # ~ 2 minutes to allow Jenkins to restart when upgrading plugins. Set ReadinessTimeout to be shorter than LivenessTimeout.
  HealthProbes: true
  HealthProbesLivenessTimeout: 90
  HealthProbesReadinessTimeout: 60
  HealthProbeLivenessFailureThreshold: 12
  SlaveListenerPort: 50000
  DisabledAgentProtocols:
    - JNLP-connect
    - JNLP2-connect
  CSRF:
    DefaultCrumbIssuer:
      Enabled: true
      ProxyCompatability: true
  CLI: false
  # Kubernetes service type for the JNLP slave service
  # SETTING THIS TO "LoadBalancer" IS A HUGE SECURITY RISK: https://github.com/kubernetes/charts/issues/1341
  SlaveListenerServiceType: ClusterIP
  SlaveListenerServiceAnnotations: {}
  LoadBalancerSourceRanges:
    - 0.0.0.0/0
  # Optionally assign a known public LB IP
  # LoadBalancerIP: 1.2.3.4
  # Optionally configure a JMX port
  # requires additional JavaOpts, ie
  # JavaOpts: >
  #   -Dcom.sun.management.jmxremote.port=4000
  #   -Dcom.sun.management.jmxremote.authenticate=false
  #   -Dcom.sun.management.jmxremote.ssl=false
  # JMXPort: 4000
  # List of plugins to be install during Jenkins master start
  InstallPlugins:
    - kubernetes:1.12.4
    - workflow-job:2.24
    - workflow-aggregator:2.5
    - credentials-binding:1.16
    - git:3.9.1
  # Used to approve a list of groovy functions in pipelines used the script-security plugin. Can be viewed under /scriptApproval
  # ScriptApproval:
  #   - "method groovy.json.JsonSlurperClassic parseText java.lang.String"
  #   - "new groovy.json.JsonSlurperClassic"
  # List of groovy init scripts to be executed during Jenkins master start
  InitScripts:
  #  - |
  #    print 'adding global pipeline libraries, register properties, bootstrap jobs...'
  # Kubernetes secret that contains a 'credentials.xml' for Jenkins
  # CredentialsXmlSecret: jenkins-credentials
  # Kubernetes secret that contains files to be put in the Jenkins 'secrets' directory,
  # useful to manage encryption keys used for credentials.xml for instance (such as
  # master.key and hudson.util.Secret)
  # SecretsFilesSecret: jenkins-secrets
  # Jenkins XML job configs to provision
  # Jobs: |-
  #   test: |-
  #     <<xml here>>
  CustomConfigMap: false
  # By default, the configMap is only used to set the initial config the first time
  # that the chart is installed.  Setting `OverwriteConfig` to `true` will overwrite
  # the jenkins config with the contents of the configMap every time the pod starts.
  OverwriteConfig: false
  # Node labels and tolerations for pod assignment
  # ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
  # ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#taints-and-tolerations-beta-feature
  NodeSelector: {}
  Tolerations: {}
  PodAnnotations: {}

  Ingress:
    ApiVersion: extensions/v1beta1
    Annotations: {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"

    TLS:
    # - secretName: jenkins.cluster.local
    #   hosts:
    #     - jenkins.cluster.local

Agent:
  Enabled: true
  Image: jenkins/jnlp-slave
  ImageTag: 3.10-1
  CustomJenkinsLabels: []
  # ImagePullSecret: jenkins
  Component: 'jenkins-slave'
  Privileged: false
  resources:
    requests:
      cpu: '200m'
      memory: '256Mi'
    limits:
      cpu: '200m'
      memory: '256Mi'
  # You may want to change this to true while testing a new image
  AlwaysPullImage: false
  # Controls how slave pods are retained after the Jenkins build completes
  # Possible values: Always, Never, OnFailure
  PodRetention: Never
  # You can define the volumes that you want to mount for this container
  # Allowed types are: ConfigMap, EmptyDir, HostPath, Nfs, Pod, Secret
  # Configure the attributes as they appear in the corresponding Java class for that type
  # https://github.com/jenkinsci/kubernetes-plugin/tree/master/src/main/java/org/csanchez/jenkins/plugins/kubernetes/volumes
  volumes:
  # - type: Secret
  #   secretName: mysecret
  #   mountPath: /var/myapp/mysecret
  NodeSelector: {}
  # Key Value selectors. Ex:
  # jenkins-agent: v1

Persistence:
  Enabled: true
  ## A manually managed Persistent Volume and Claim
  ## Requires Persistence.Enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # ExistingClaim:

  ## jenkins data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # StorageClass: "-"

  Annotations: {}
  AccessMode: ReadWriteOnce
  Size: 8Gi
  volumes:
  #  - name: nothing
  #    emptyDir: {}
  mounts:
  #  - mountPath: /var/nothing
  #    name: nothing
  #    readOnly: true

NetworkPolicy:
  # Enable creation of NetworkPolicy resources.
  Enabled: false
  # For Kubernetes v1.4, v1.5 and v1.6, use 'extensions/v1beta1'
  # For Kubernetes v1.7, use 'networking.k8s.io/v1'
  ApiVersion: extensions/v1beta1

## Install Default RBAC roles and bindings
rbac:
  install: false
  serviceAccountName: default
  # Role reference
  roleRef: cluster-admin
  # Role kind (RoleBinding or ClusterRoleBinding)
  roleBindingKind: ClusterRoleBinding
```

</details>

---

# Jenkins Helm Chart

Jenkins master and slave cluster utilizing the Jenkins Kubernetes plugin

- https://wiki.jenkins-ci.org/display/JENKINS/Kubernetes+Plugin

Inspired by the awesome work of Carlos Sanchez <mailto:carlos@apache.org>

## Chart Details

This chart will do the following:

- 1 x Jenkins Master with port 8080 exposed on an external LoadBalancer
- All using Kubernetes Deployments

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/jenkins
```

## Configuration

The following tables list the configurable parameters of the Jenkins chart and their default values.

### Jenkins Master

| Parameter                                           | Description                                                                      | Default                                                                                          |
| --------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `nameOverride`                                      | Override the resource name prefix                                                | `jenkins`                                                                                        |
| `fullnameOverride`                                  | Override the full resource names                                                 | `jenkins-{release-name}` (or `jenkins` if release-name is `jenkins`)                             |
| `Master.Name`                                       | Jenkins master name                                                              | `jenkins-master`                                                                                 |
| `Master.Image`                                      | Master image name                                                                | `jenkinsci/jenkins`                                                                              |
| `Master.ImageTag`                                   | Master image tag                                                                 | `lts`                                                                                            |
| `Master.ImagePullPolicy`                            | Master image pull policy                                                         | `Always`                                                                                         |
| `Master.ImagePullSecret`                            | Master image pull secret                                                         | Not set                                                                                          |
| `Master.Component`                                  | k8s selector key                                                                 | `jenkins-master`                                                                                 |
| `Master.UseSecurity`                                | Use basic security                                                               | `true`                                                                                           |
| `Master.AdminUser`                                  | Admin username (and password) created as a secret if useSecurity is true         | `admin`                                                                                          |
| `Master.AdminPassword`                              | Admin password (and user) created as a secret if useSecurity is true             | Random value                                                                                     |
| `Master.JenkinsAdminEmail`                          | Email address for the administrator of the Jenkins instance                      | Not set                                                                                          |
| `Master.resources`                                  | Resources allocation (Requests and Limits)                                       | `{requests: {cpu: 50m, memory: 256Mi}, limits: {cpu: 2000m, memory: 2048Mi}}`                    |
| `Master.InitContainerEnv`                           | Environment variables for Init Container                                         | Not set                                                                                          |
| `Master.ContainerEnv`                               | Environment variables for Jenkins Container                                      | Not set                                                                                          |
| `Master.UsePodSecurityContext`                      | Enable pod security context (must be `true` if `RunAsUser` or `FsGroup` are set) | `true`                                                                                           |
| `Master.RunAsUser`                                  | uid that jenkins runs with                                                       | `0`                                                                                              |
| `Master.FsGroup`                                    | uid that will be used for persistent volume                                      | `0`                                                                                              |
| `Master.ServiceAnnotations`                         | Service annotations                                                              | `{}`                                                                                             |
| `Master.ServiceType`                                | k8s service type                                                                 | `LoadBalancer`                                                                                   |
| `Master.ServicePort`                                | k8s service port                                                                 | `8080`                                                                                           |
| `Master.NodePort`                                   | k8s node port                                                                    | Not set                                                                                          |
| `Master.HealthProbes`                               | Enable k8s liveness and readiness probes                                         | `true`                                                                                           |
| `Master.HealthProbesLivenessTimeout`                | Set the timeout for the liveness probe                                           | `120`                                                                                            |
| `Master.HealthProbesReadinessTimeout`               | Set the timeout for the readiness probe                                          | `60`                                                                                             |
| `Master.HealthProbeLivenessFailureThreshold`        | Set the failure threshold for the liveness probe                                 | `12`                                                                                             |
| `Master.SlaveListenerPort`                          | Listening port for agents                                                        | `50000`                                                                                          |
| `Master.DisabledAgentProtocols`                     | Disabled agent protocols                                                         | `JNLP-connect JNLP2-connect`                                                                     |
| `Master.CSRF.DefaultCrumbIssuer.Enabled`            | Enable the default CSRF Crumb issuer                                             | `true`                                                                                           |
| `Master.CSRF.DefaultCrumbIssuer.ProxyCompatability` | Enable proxy compatibility                                                       | `true`                                                                                           |
| `Master.CLI`                                        | Enable CLI over remoting                                                         | `false`                                                                                          |
| `Master.LoadBalancerSourceRanges`                   | Allowed inbound IP addresses                                                     | `0.0.0.0/0`                                                                                      |
| `Master.LoadBalancerIP`                             | Optional fixed external IP                                                       | Not set                                                                                          |
| `Master.JMXPort`                                    | Open a port, for JMX stats                                                       | Not set                                                                                          |
| `Master.CustomConfigMap`                            | Use a custom ConfigMap                                                           | `false`                                                                                          |
| `Master.OverwriteConfig`                            | Replace config w/ ConfigMap on boot                                              | `false`                                                                                          |
| `Master.Ingress.Annotations`                        | Ingress annotations                                                              | `{}`                                                                                             |
| `Master.Ingress.TLS`                                | Ingress TLS configuration                                                        | `[]`                                                                                             |
| `Master.InitScripts`                                | List of Jenkins init scripts                                                     | Not set                                                                                          |
| `Master.CredentialsXmlSecret`                       | Kubernetes secret that contains a 'credentials.xml' file                         | Not set                                                                                          |
| `Master.SecretsFilesSecret`                         | Kubernetes secret that contains 'secrets' files                                  | Not set                                                                                          |
| `Master.Jobs`                                       | Jenkins XML job configs                                                          | Not set                                                                                          |
| `Master.InstallPlugins`                             | List of Jenkins plugins to install                                               | `kubernetes:1.12.0 workflow-aggregator:2.5 credentials-binding:1.16 git:3.9.1 workflow-job:2.23` |
| `Master.ScriptApproval`                             | List of groovy functions to approve                                              | Not set                                                                                          |
| `Master.NodeSelector`                               | Node labels for pod assignment                                                   | `{}`                                                                                             |
| `Master.Affinity`                                   | Affinity settings                                                                | `{}`                                                                                             |
| `Master.Tolerations`                                | Toleration labels for pod assignment                                             | `{}`                                                                                             |
| `Master.PodAnnotations`                             | Annotations for master pod                                                       | `{}`                                                                                             |
| `NetworkPolicy.Enabled`                             | Enable creation of NetworkPolicy resources.                                      | `false`                                                                                          |
| `NetworkPolicy.ApiVersion`                          | NetworkPolicy ApiVersion                                                         | `extensions/v1beta1`                                                                             |
| `rbac.install`                                      | Create service account and ClusterRoleBinding for Kubernetes plugin              | `false`                                                                                          |
| `rbac.roleRef`                                      | Cluster role name to bind to                                                     | `cluster-admin`                                                                                  |
| `rbac.roleBindingKind`                              | Role kind (`RoleBinding` or `ClusterRoleBinding`)                                | `ClusterRoleBinding`                                                                             |

### Jenkins Agent

| Parameter                   | Description                                     | Default                                                                      |
| --------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- |
| `Agent.AlwaysPullImage`     | Always pull agent container image before build  | `false`                                                                      |
| `Agent.CustomJenkinsLabels` | Append Jenkins labels to the agent              | `{}`                                                                         |
| `Agent.Enabled`             | Enable Kubernetes plugin jnlp-agent podTemplate | `true`                                                                       |
| `Agent.Image`               | Agent image name                                | `jenkinsci/jnlp-slave`                                                       |
| `Agent.ImagePullSecret`     | Agent image pull secret                         | Not set                                                                      |
| `Agent.ImageTag`            | Agent image tag                                 | `2.62`                                                                       |
| `Agent.Privileged`          | Agent privileged container                      | `false`                                                                      |
| `Agent.resources`           | Resources allocation (Requests and Limits)      | `{requests: {cpu: 200m, memory: 256Mi}, limits: {cpu: 200m, memory: 256Mi}}` |
| `Agent.volumes`             | Additional volumes                              | `nil`                                                                        |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/jenkins
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Mounting volumes into your Agent pods

Your Jenkins Agents will run as pods, and it's possible to inject volumes where needed:

```yaml
Agent:
  volumes:
    - type: Secret
      secretName: jenkins-mysecrets
      mountPath: /var/run/secrets/jenkins-mysecrets
```

The supported volume types are: `ConfigMap`, `EmptyDir`, `HostPath`, `Nfs`, `Pod`, `Secret`. Each type supports a different set of configurable attributes, defined by [the corresponding Java class](https://github.com/jenkinsci/kubernetes-plugin/tree/master/src/main/java/org/csanchez/jenkins/plugins/kubernetes/volumes).

## NetworkPolicy

To make use of the NetworkPolicy resources created by default,
install [a networking plugin that implements the Kubernetes
NetworkPolicy spec](https://kubernetes.io/docs/tasks/administer-cluster/declare-network-policy#before-you-begin).

For Kubernetes v1.5 & v1.6, you must also turn on NetworkPolicy by setting
the DefaultDeny namespace annotation. Note: this will enforce policy for _all_ pods in the namespace:

    kubectl annotate namespace default "net.beta.kubernetes.io/network-policy={\"ingress\":{\"isolation\":\"DefaultDeny\"}}"

Install helm chart with network policy enabled:

    $ helm install stable/jenkins --set NetworkPolicy.Enabled=true

## Persistence

The Jenkins image stores persistence under `/var/jenkins_home` path of the container. A dynamically managed Persistent Volume
Claim is used to keep the data across deployments, by default. This is known to work in GCE, AWS, and minikube. Alternatively,
a previously configured Persistent Volume Claim can be used.

It is possible to mount several volumes using `Persistence.volumes` and `Persistence.mounts` parameters.

### Persistence Values

| Parameter                   | Description                     | Default         |
| --------------------------- | ------------------------------- | --------------- |
| `Persistence.Enabled`       | Enable the use of a Jenkins PVC | `true`          |
| `Persistence.ExistingClaim` | Provide the name of a PVC       | `nil`           |
| `Persistence.AccessMode`    | The PVC access mode             | `ReadWriteOnce` |
| `Persistence.Size`          | The size of the PVC             | `8Gi`           |
| `Persistence.volumes`       | Additional volumes              | `nil`           |
| `Persistence.mounts`        | Additional mounts               | `nil`           |

#### Existing PersistentVolumeClaim

1. Create the PersistentVolume
1. Create the PersistentVolumeClaim
1. Install the chart

```bash
$ helm install --name my-release --set Persistence.ExistingClaim=PVC_NAME stable/jenkins
```

## Custom ConfigMap

When creating a new parent chart with this chart as a dependency, the `CustomConfigMap` parameter can be used to override the default config.xml provided.
It also allows for providing additional xml configuration files that will be copied into `/var/jenkins_home`. In the parent chart's values.yaml,
set the `jenkins.Master.CustomConfigMap` value to true like so

```yaml
jenkins:
  Master:
    CustomConfigMap: true
```

and provide the file `templates/config.tpl` in your parent chart for your use case. You can start by copying the contents of `config.yaml` from this chart into your parent charts `templates/config.tpl` as a basis for customization. Finally, you'll need to wrap the contents of `templates/config.tpl` like so:

```yaml
{{- define "override_config_map" }}
    <CONTENTS_HERE>
{{ end }}
```

## RBAC

If running upon a cluster with RBAC enabled you will need to do the following:

- `helm install stable/jenkins --set rbac.install=true`
- Create a Jenkins credential of type Kubernetes service account with service account name provided in the `helm status` output.
- Under configure Jenkins -- Update the credentials config in the cloud section to use the service account credential you created in the step above.

## Run Jenkins as non root user

The default settings of this helm chart let Jenkins run as root user with uid `0`.
Due to security reasons you may want to run Jenkins as a non root user.
Fortunately the default jenkins docker image `jenkins/jenkins` contains a user `jenkins` with uid `1000` that can be used for this purpose.

Simply use the following settings to run Jenkins as `jenkins` user with uid `1000`.

```yaml
jenkins:
  Master:
    RunAsUser: 1000
    FsGroup: 1000
```

## Providing jobs xml

Jobs can be created (and overwritten) by providing jenkins config xml within the `values.yaml` file.
The keys of the map will become a directory within the jobs directory.
The values of the map will become the `config.xml` file in the respective directory.

Below is an example of a `values.yaml` file and the directory structure created:

#### values.yaml

```yaml
Master:
  Jobs:
    test-job: |-
      <?xml version='1.0' encoding='UTF-8'?>
      <project>
        <keepDependencies>false</keepDependencies>
        <properties/>
        <scm class="hudson.scm.NullSCM"/>
        <canRoam>false</canRoam>
        <disabled>false</disabled>
        <blockBuildWhenDownstreamBuilding>false</blockBuildWhenDownstreamBuilding>
        <blockBuildWhenUpstreamBuilding>false</blockBuildWhenUpstreamBuilding>
        <triggers/>
        <concurrentBuild>false</concurrentBuild>
        <builders/>
        <publishers/>
        <buildWrappers/>
      </project>
    test-job-2: |-
      <?xml version='1.0' encoding='UTF-8'?>
      <project>
        <keepDependencies>false</keepDependencies>
        <properties/>
        <scm class="hudson.scm.NullSCM"/>
        <canRoam>false</canRoam>
        <disabled>false</disabled>
        <blockBuildWhenDownstreamBuilding>false</blockBuildWhenDownstreamBuilding>
        <blockBuildWhenUpstreamBuilding>false</blockBuildWhenUpstreamBuilding>
        <triggers/>
        <concurrentBuild>false</concurrentBuild>
        <builders/>
        <publishers/>
        <buildWrappers/>
```

#### Directory structure of jobs directory

```
.
├── _test-job-1
|   └── config.xml
├── _test-job-2
|   └── config.xml
```

Docs taken from https://github.com/jenkinsci/docker/blob/master/Dockerfile:
_Jenkins is run with user `jenkins`, uid = 1000. If you bind mount a volume from the host or a data container,ensure you use the same uid_

## Running behind a forward proxy

The master pod uses an Init Container to install plugins etc. If you are behind a corporate proxy it may be useful to set `Master.InitContainerEnv` to add environment variables such as `http_proxy`, so that these can be downloaded.

Additionally, you may want to add env vars for the Jenkins container, and the JVM (`Master.JavaOpts`).

```yaml
Master:
  InitContainerEnv:
    - name: http_proxy
      value: 'http://192.168.64.1:3128'
    - name: https_proxy
      value: 'http://192.168.64.1:3128'
    - name: no_proxy
      value: ''
  ContainerEnv:
    - name: http_proxy
      value: 'http://192.168.64.1:3128'
    - name: https_proxy
      value: 'http://192.168.64.1:3128'
  JavaOpts: >-
    -Dhttp.proxyHost=192.168.64.1
    -Dhttp.proxyPort=3128
    -Dhttps.proxyHost=192.168.64.1
    -Dhttps.proxyPort=3128
```
