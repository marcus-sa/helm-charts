# `@helm-charts/banzaicloud-stable-argo`

A Helm chart for Argo workflow engine

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | argo               |
| Chart Version       | 0.2.2              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
images:
  namespace: argoproj
  controller: workflow-controller
  ui: argoui
  executor: argoexec
  tag: v2.1.1

crdVersion: v1alpha1

init:
  # By default the installation will not set an explicit one, which will mean it uses `default` for the namespace the chart is
  # being deployed to.  In RBAC clusters, that will almost certainly fail.  See the NOTES: section of the readme for more info.
  serviceAccount: ''

controller:
  # podAnnotations is an optional map of annotations to be applied to the controller Pods
  podAnnotations: {}
  serviceAccount: argo
  name: workflow-controller
  workflowNamespaces:
    - default
  instanceID:
    # `instanceID.enabled` configures the controller to filter workflow submissions
    # to only those which have a matching instanceID attribute.
    enabled: false
    # NOTE: If `instanceID.enabled` is set to `true` then either `instanceID.userReleaseName`
    # or `instanceID.explicitID` must be defined.
    # useReleaseName: true
    # explicitID: unique-argo-controller-identifier
  logging:
    level: info
    globallevel: '0'

ui:
  # optional map of annotations to be applied to the ui Pods
  podAnnotations: {}
  name: ui
  # Enables ability to SSH into pod using web UI
  enableWebConsole: false
  serviceType: ClusterIP
  servicePort: 80
  serviceAccount: argo-ui
  # Annotations to be applied to the UI Service
  serviceAnnotations: {}

  ## Ingress configuration.
  ## ref: https://kubernetes.io/docs/user-guide/ingress/
  ##
  ingress:
    enabled: false
    ## Annotations to be added to the web ingress.
    ##
    # annotations:
    #   kubernetes.io/ingress.class: nginx
    #   kubernetes.io/tls-acme: "true"
    ## Hostnames.
    ## Must be provided if Ingress is enabled.
    ##
    # hosts:
    #   - argo.domain.com
    ## TLS configuration.
    ## Secrets must be manually created in the namespace.
    ##
    # tls:
    #   - secretName: argo-ui-tls
    #     hosts:
    #       - argo.domain.com

# Influences the creation of the ConfigMap for the workflow-controller itself.
useDefaultArtifactRepo: false
useStaticCredentials: true
artifactRepository:
  s3:
    # Note the `key` attribute is not the actual secret, it's the PATH to
    # the contents in the associated secret, as defined by the `name` attribute.
    accessKeySecret:
      # name: <releaseName>-minio (default)
      key: accesskey
    secretKeySecret:
      # name: <releaseName>-minio
      key: secretkey
    insecure: true
    # bucket:
    # endpoint:

# NOTE: These are setting attributes for the `minio` optional dependency
minio:
  # If set to true then chart installs minio and generate according artifactRepository section in workflow controller config map
  install: false
  defaultBucket:
    enabled: true
    name: argo-artifacts
```

</details>

---

## Argo Chart

This chart is used to set up argo and it's needed dependencies through one command. This is used in conjunction with [helm](https://github.com/kubernetes/helm).

If you want your deployment of this helm chart to most closely match the [argo CLI](https://github.com/argoproj/argo), you should deploy it in the `kube-system` namespace.

## Pre-Requisites

This chart uses an install hook to configure the CRD definition. Installation of CRDs is a somewhat privileged process in itself and in RBAC enabled clusters the `default` service account for namespaces does not typically have the ability to do create these.

A few options are:

- Setup the CRD yourself manually and use the `--no-hooks` options of `helm install`
- Manually create a ServiceAccount in the Namespace which your release will be deployed w/ appropriate bindings to perform this action and set the `init.serviceAccount` attribute
- Augment the `default` ServiceAccount permissions in the Namespace in which your Release is deployed to have the appropriate permissions

## Usage Notes:

This chart defaults to setting the `controller.instanceID.enabled` to `false` now, which means the deployed controller will act upon any workflow deployed to the cluster. If you would like to limit the behavior and deploy multiple workflow controllers, please use the `controller.instanceID.enabled` attribute along with one of it's configuration options to set the `instanceID` of the workflow controller to be properly scoped for your needs.

## Values

The `values.yaml` contains items used to tweak a deployment of this chart.
Fields to note:

- `controller.instanceID.enabled`: If set to true, the Argo Controller will **ONLY** monitor Workflow submissions with a `--instanceid` attribute
- `controller.instanceID.useReleaseName`: If set to true then chart set controller instance id to release name
- `controller.instanceID.explicitID`: Allows customization of an instance id for the workflow controller to monitor
- `controller.workflowNamespaces`: This is a list of namespaces where workflows will be ran
- `ui.enableWebConsole`: Enables ability to SSH into pod using web UI
- `minio.install`: If this is true, we'll install [minio](https://github.com/kubernetes/charts/tree/master/stable/minio) and build out the artifactRepository section in workflow controller config map.
- `artifactRepository.s3.accessKeySecret` and `artifactRepository.s3.secretKeySecret` These by default link to minio default credentials stored in the secret deployed by the minio chart.
