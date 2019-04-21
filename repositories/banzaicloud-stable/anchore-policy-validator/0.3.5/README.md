# `@helm-charts/banzaicloud-stable-anchore-policy-validator`

A Helm chart for anchore-policy-validator admission controller

| Field               | Value                    |
| ------------------- | ------------------------ |
| Repository Name     | banzaicloud-stable       |
| Chart Name          | anchore-policy-validator |
| Chart Version       | 0.3.5                    |
| NPM Package Version | 0.1.0                    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
replicaCount: 1
logVerbosity: 1
apiService:
  group: admission.anchore.io
  version: v1beta1
image:
  repository: banzaicloud/anchore-image-validator
  tag: 0.3.2
  pullPolicy: IfNotPresent
service:
  name: anchoreimagecheck
  type: ClusterIP
  externalPort: 443
  internalPort: 8443
externalAnchore:
  anchoreHost: ''
  anchoreUser: ''
  anchorePass: ''
resources: {}

## Node selector
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
nodeSelector: {}

## Affinity
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
affinity: {}

## Tolerations
## ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
tolerations: []
```

</details>

---

# Anchore policy validator

This chart deploys an admission-server that is used as a ValidatingWebhook in a k8s cluster. If it's working, kubernetes will send requests to the admission server when a Pod creation is initiated. The server checks the image, which is defined in PodSpec, against configured Anchore-engine API. If the API responds with an error, that the image is not valid according to defined policy, k8s will reject the Pod creation request.

## Installing the Chart

```bash
$ helm repo add banzaicloud-stable http://kubernetes-charts.banzaicloud.com/branch/master
$ helm repo update
```

Deploying anchore-policy-validator using external Anchore-engine service:

```bash
$ helm install --name <name> --set externalAnchore.anchoreHost=<my.anchore.host>  --set externalAnchore.anchoreUser=<username> -set externalAnchore.anchorePass=<password> banzaicloud-stable/anchore-policy-validator
```

During deploying this chart, it's creating predefined policy bundles and activates `AllowAll` by default.

## Policy bundles

| PolicyName     | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| AllowAll       | Allow all images to deploy                                   |
| RejectCritical | Reject deploying images that contain `critical` vulnerabiliy |
| RejectHigh     | Reject deploying images that contain `high` vulnerabiliy     |
| BlockRoot      | Block deploying images that using `root` as effective user   |
| DenyAll        | Deny all imagest to deploy                                   |

## Configuration

The following tables lists configurable parameters of the anchore-policy-validator chart and their default values.

| Parameter                   | Description                        | Default                             |
| --------------------------- | ---------------------------------- | ----------------------------------- |
| replicaCount                | number of replicas                 | 1                                   |
| logVerbosity                | log verbosity level                | 8                                   |
| apiService.group            | group of registered api service    | admission.anchore.io                |
| apiService.version          | version of registered api service  | v1beta1                             |
| image.repository            | admission-server image repo        | banzaicloud/anchore-image-validator |
| image.tag                   | admission-server image tag         | 0.3.0                               |
| image.pullPolicy            | admission-server image pull policy | IfNotPresent                        |
| service.name                | validation sevice name             | anchoreimagecheck                   |
| service.type                | validation service type            | ClusterIP                           |
| service.externalPort        | validation service external port   | 443                                 |
| service.internalPort        | validation service external port   | 443                                 |
| externalAnchore.anchoreHost | external anchore-engine host       | ""                                  |
| externalAnchore.anchoreUser | external anchore-engine username   | ""                                  |
| externalAnchore.anchorePass | external anchore-engine password   | ""                                  |
