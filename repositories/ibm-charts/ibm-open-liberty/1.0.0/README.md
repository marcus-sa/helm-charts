# `@helm-charts/ibm-charts-ibm-open-liberty`

Open Liberty for Linux on x86

| Field               | Value            |
| ------------------- | ---------------- |
| Repository Name     | ibm-charts       |
| Chart Name          | ibm-open-liberty |
| Chart Version       | 1.0.0            |
| NPM Package Version | 0.1.0            |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
###############################################################################
# Licensed Materials - Property of IBM.
# Copyright IBM Corporation 2017. All Rights Reserved.
# U.S. Government Users Restricted Rights - Use, duplication or disclosure
# restricted by GSA ADP Schedule Contract with IBM Corp.
#
# Contributors:
#  IBM Corporation - initial API and implementation
###############################################################################

###############################################################################
## Common image variables
###############################################################################
image:
  repository: openliberty/open-liberty
  tag: latest
  pullPolicy: IfNotPresent

service:
  type: NodePort
  name: openliberty
  port: 9080
  targetPort: 9080

###############################################################################
## Auto scaling
###############################################################################
replicaCount: 1
autoscaling:
  enabled: false
  minReplicas: 1
  maxReplicas: 10
  targetCPUUtilizationPercentage: 50

###############################################################################
## Resource constraints
###############################################################################
resources:
  constraints:
    enabled: false
  requests:
    cpu: 500m
    memory: 512Mi
  limits:
    cpu: 500m
    memory: 512Mi
ingress:
  enabled: false
  rewriteTarget: '/'
  path: '/openliberty'
```

</details>

---

# Open Liberty Helm Chart

Open Liberty provides developers with proven Java EE 7 technology and the latest Eclipse MicroProfileTM capabilities for building microservices. Building cloud-native apps and microservices has never been more efficient, since you only have to run what you need. Our goal is to give you just enough to get the job done without getting in your way.

## Accessing Open-Liberty

From a browser, use http://*external ip*:*nodeport\* to access the application.

## Configuration

### Parameters

The Helm chart has the following values that can be overriden using the --set parameter. For example:

- `helm repo add ibm-charts https://raw.githubusercontent.com/IBM/charts/master/repo/stable/`
- `helm install --name liberty2 --set resources.constraints.enabled=true --set autoscaling.enabled=true --set autoscaling.minReplicas=2 ibm-charts/ibm-open-liberty --debug`

##### Common Parameters

| Qualifier    | Parameter                      | Definition                                                                                                                                                         | Allowed Value                                                                                                                                                   |
| ------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| image        | pullPolicy                     | Image Pull Policy                                                                                                                                                  | Always, Never, or IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise                                                       |
|              | repository                     | Name of image, including repository prefix (if required).                                                                                                          | See Extended description of Docker tags                                                                                                                         |
|              | tag                            | Docker image tag.                                                                                                                                                  | See Docker tag description                                                                                                                                      |
| service      | name                           | The name of the port service.                                                                                                                                      |                                                                                                                                                                 |
|              | type                           | Specify type of service.                                                                                                                                           | Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. see Publishing services - service types                                                  |
|              | port                           | The port that this container exposes.                                                                                                                              |                                                                                                                                                                 |
|              | targetPort                     | Port that will be exposed externally by the pod.                                                                                                                   |                                                                                                                                                                 |
| resources    | constraints.enabled            | Specifies whether the resource constraints specified in this helm chart are enabled.                                                                               | false (default) or true                                                                                                                                         |
|              | limits.cpu                     | Describes the maximum amount of CPU allowed.                                                                                                                       | Default is 500m. See Kubernetes - [meaning of CPU](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-cpu)        |
|              | limits.memory                  | Describes the maximum amount of memory allowed.                                                                                                                    | Default is 512Mi. See Kubernetes - [meaning of Memory](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-memory) |
|              | requests.cpu                   | Describes the minimum amount of CPU required - if not specified will default to limit (if specified) or otherwise implementation-defined value.                    | Default is 500m. See Kubernetes - [meaning of CPU](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-cpu)        |
|              | requests.memory                | Describes the minimum amount of memory required. If not specified, the memory amount will default to the limit (if specified) or the implementation-defined value. | Default is 512Mi. See Kubernetes - [meaning of Memory](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-memory) |
| replicaCount |                                | Describes the number of desired replica pods running at the same time.                                                                                             | Default is 1. See [Replica Sets](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset)                                                          |
| autoscaling  | enabled                        | Specifies whether or not a horizontal pod autoscaler (HPA) is deployed. Note that enabling this field disables the `replicaCount` field.                           | false (default) or true                                                                                                                                         |
|              | minReplicas                    | Lower limit for the number of pods that can be set by the autoscaler.                                                                                              | Positive integer (default to 1)                                                                                                                                 |
|              | maxReplicas                    | Upper limit for the number of pods that can be set by the autoscaler. Cannot be lower than `minReplicas`.                                                          | Positive integer (default to 10)                                                                                                                                |
|              | targetCPUUtilizationPercentage | Target average CPU utilization (represented as a percentage of requested CPU) over all the pods.                                                                   | Integer between 1 and 100 (default to 50)                                                                                                                       |
| ingress      | enabled                        | Specifies whether or not to use ingress.                                                                                                                           | false (default) or true                                                                                                                                         |
|              | rewriteTarget                  | Specifies ingress.kubernetes.io/rewrite-target                                                                                                                     | See Kubernetes ingress.kubernetes.io/rewrite-target - https://github.com/kubernetes/ingress-nginx/tree/master/docs/examples/rewrite                             |
|              | path                           | Specifies the path for the ingress http rule.                                                                                                                      | See Kubernetes - https://kubernetes.io/docs/concepts/services-networking/ingress/                                                                               |

###### More information

See [Open Liberty website](https://openliberty.io/) for configuration options for deploying the Open-Liberty server.

###### Service information

This helm chart installs the open source product open liberty, to get service for open liberty, you need to see the openliberty.io website.
