# `@helm-charts/stable-jenkins`

Open source continuous integration server. It supports multiple SCM tools including CVS, Subversion and Git. It can execute Apache Ant and Apache Maven-based projects as well as arbitrary scripts.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | jenkins |
| Chart Version       | 0.9.1   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for jenkins.
# This is a YAML-formatted file.
# Declare name/value pairs to be passed into your templates.
# name: value

Master:
  Name: jenkins-master
  Image: 'jenkinsci/jenkins'
  ImageTag: '2.67'
  ImagePullPolicy: 'Always'
  Component: 'jenkins-master'
  UseSecurity: true
  AdminUser: admin
  # AdminPassword: <defaults to random>
  Cpu: '200m'
  Memory: '256Mi'
  # Set min/max heap here if needed with:
  # JavaOpts: "-Xms512m -Xmx512m"
  # JenkinsOpts: ""
  # JenkinsUriPrefix: "/jenkins"
  ServicePort: 8080
  # For minikube, set this to NodePort, elsewhere use LoadBalancer
  # Use ClusterIP if your setup includes ingress controller
  ServiceType: LoadBalancer
  # Master Service annotations
  ServiceAnnotations:
    {}
    #   service.beta.kubernetes.io/aws-load-balancer-backend-protocol: https
  # Used to create Ingress record (should used with ServiceType: ClusterIP)
  # HostName: jenkins.cluster.local
  # NodePort: <to set explicitly, choose port between 30000-32767
  ContainerPort: 8080
  SlaveListenerPort: 50000
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
    - kubernetes:0.11
    - workflow-aggregator:2.5
    - workflow-job:2.13
    - credentials-binding:1.12
    - git:3.4.0
  # Used to approve a list of groovy functions in pipelines used the script-security plugin. Can be viewed under /scriptApproval
  # ScriptApproval:
  #   - "method groovy.json.JsonSlurperClassic parseText java.lang.String"
  #   - "new groovy.json.JsonSlurperClassic"
  # List of groovy init scripts to be executed during Jenkins master start
  InitScripts:
  #  - |
  #    print 'adding global pipeline libraries, register properties, bootstrap jobs...'
  CustomConfigMap: false
  # Node labels and tolerations for pod assignment
  # ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
  # ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#taints-and-tolerations-beta-feature
  NodeSelector: {}
  Tolerations: {}

  Ingress:
    Annotations:
      # kubernetes.io/ingress.class: nginx
      # kubernetes.io/tls-acme: "true"

    TLS:
      # - secretName: jenkins.cluster.local
      #   hosts:
      #     - jenkins.cluster.local

Agent:
  Enabled: true
  Image: jenkinsci/jnlp-slave
  ImageTag: 2.62
  Component: 'jenkins-slave'
  Privileged: false
  Cpu: '200m'
  Memory: '256Mi'
  # You may want to change this to true while testing a new image
  AlwaysPullImage: false
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
  # RBAC api version (currently either v1beta1 or v1alpha1)
  apiVersion: v1beta1
  # Cluster role reference
  roleRef: cluster-admin
```

</details>

---

# Jenkins Helm Chart

Jenkins master and slave cluster utilizing the Jenkins Kubernetes plugin

- https://wiki.jenkins-ci.org/display/JENKINS/Kubernetes+Plugin

Inspired by the awesome work of Carlos Sanchez <carlos@apache.org>

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

The following tables lists the configurable parameters of the Jenkins chart and their default values.

### Jenkins Master

| Parameter                         | Description                                                              | Default                                                                      |
| --------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| `Master.Name`                     | Jenkins master name                                                      | `jenkins-master`                                                             |
| `Master.Image`                    | Master image name                                                        | `jenkinsci/jenkins`                                                          |
| `Master.ImageTag`                 | Master image tag                                                         | `2.46.1`                                                                     |
| `Master.ImagePullPolicy`          | Master image pull policy                                                 | `Always`                                                                     |
| `Master.Component`                | k8s selector key                                                         | `jenkins-master`                                                             |
| `Master.UseSecurity`              | Use basic security                                                       | `true`                                                                       |
| `Master.AdminUser`                | Admin username (and password) created as a secret if useSecurity is true | `admin`                                                                      |
| `Master.Cpu`                      | Master requested cpu                                                     | `200m`                                                                       |
| `Master.Memory`                   | Master requested memory                                                  | `256Mi`                                                                      |
| `Master.ServiceType`              | k8s service type                                                         | `LoadBalancer`                                                               |
| `Master.ServicePort`              | k8s service port                                                         | `8080`                                                                       |
| `Master.NodePort`                 | k8s node port                                                            | Not set                                                                      |
| `Master.ContainerPort`            | Master listening port                                                    | `8080`                                                                       |
| `Master.SlaveListenerPort`        | Listening port for agents                                                | `50000`                                                                      |
| `Master.LoadBalancerSourceRanges` | Allowed inbound IP addresses                                             | `0.0.0.0/0`                                                                  |
| `Master.LoadBalancerIP`           | Optional fixed external IP                                               | Not set                                                                      |
| `Master.JMXPort`                  | Open a port, for JMX stats                                               | Not set                                                                      |
| `Master.CustomConfigMap`          | Use a custom ConfigMap                                                   | `false`                                                                      |
| `Master.Ingress.Annotations`      | Ingress annotations                                                      | `{}`                                                                         |
| `Master.Ingress.TLS`              | Ingress TLS configuration                                                | `[]`                                                                         |
| `Master.InitScripts`              | List of Jenkins init scripts                                             | Not set                                                                      |
| `Master.InstallPlugins`           | List of Jenkins plugins to install                                       | `kubernetes:0.11 workflow-aggregator:2.5 credentials-binding:1.11 git:3.2.0` |
| `Master.ScriptApproval`           | List of groovy functions to approve                                      | Not set                                                                      |
| `Master.NodeSelector`             | Node labels for pod assignment                                           | `{}`                                                                         |
| `Master.Tolerations`              | Toleration labels for pod assignment                                     | `{}`                                                                         |
| `rbac.install`                    | Create service account and ClusterRoleBinding for Kubernetes plugin      | `false`                                                                      |
| `rbac.apiVersion`                 | RBAC API version                                                         | `v1beta1`                                                                    |
| `rbac.roleRef`                    | Cluster role name to bind to                                             | `cluster-admin`                                                              |

### Jenkins Agent

| Parameter               | Description                                     | Default                |
| ----------------------- | ----------------------------------------------- | ---------------------- |
| `Agent.AlwaysPullImage` | Always pull agent container image before build  | `false`                |
| `Agent.Enabled`         | Enable Kubernetes plugin jnlp-agent podTemplate | `true`                 |
| `Agent.Image`           | Agent image name                                | `jenkinsci/jnlp-slave` |
| `Agent.ImageTag`        | Agent image tag                                 | `2.62`                 |
| `Agent.Privileged`      | Agent privileged container                      | `false`                |
| `Agent.Cpu`             | Agent requested cpu                             | `200m`                 |
| `Agent.Memory`          | Agent requested memory                          | `256Mi`                |
| `Agent.volumes`         | Additional volumes                              | `nil`                  |

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

The suported volume types are: `ConfigMap`, `EmptyDir`, `HostPath`, `Nfs`, `Pod`, `Secret`. Each type supports a different set of configurable attributes, defined by [the corresponding Java class](https://github.com/jenkinsci/kubernetes-plugin/tree/master/src/main/java/org/csanchez/jenkins/plugins/kubernetes/volumes).

## NetworkPolicy

To make use of the NetworkPolicy resources created by default,
install [a networking plugin that implements the Kubernetes
NetworkPolicy spec](https://kubernetes.io/docs/tasks/administer-cluster/declare-network-policy#before-you-begin).

For Kubernetes v1.5 & v1.6, you must also turn on NetworkPolicy by setting
the DefaultDeny namespace annotation. Note: this will enforce policy for _all_ pods in the namespace:

    kubectl annotate namespace default "net.beta.kubernetes.io/network-policy={\"ingress\":{\"isolation\":\"DefaultDeny\"}}"

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

When creating a new chart with this chart as a dependency, CustomConfigMap can be used to override the default config.xml provided.
It also allows for providing additional xml configuration files that will be copied into `/var/jenkins_home`. In the parent chart's values.yaml,
set the value to true and provide the file `templates/config.yaml` for your use case. If you start by copying `config.yaml` from this chart and
want to access values from this chart you must change all references from `.Values` to `.Values.jenkins`.

```
jenkins:
  Master:
    CustomConfigMap: true
```

## RBAC

If running upon a cluster with RBAC enabled you will need to do the following:

- `helm install stable/jenkins --set rbac.install=true`
- Create a Jenkins credential of type Kubernetes service account with service account name provided in the `helm status` output.
- Under configure Jenkins -- Update the credentials config in the cloud section to use the service account credential you created in the step above.
