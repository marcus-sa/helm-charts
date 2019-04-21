# `@helm-charts/banzaicloud-stable-spot-scheduler`

An extended Kubernetes scheduler that is able to schedule pods based on spot-instance related attributes

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | spot-scheduler     |
| Chart Version       | 0.1.0              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for spot-scheduler.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: banzaicloud/spot-scheduler
  tag: 1.10.3
  pullPolicy: IfNotPresent

extraArgs:
  feature-gates: PersistentLocalVolumes=false,VolumeScheduling=false

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

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# Spot scheduler

This chart will install BanzaiCloud's spot-affinity scheduler, a fork of the default Kubernetes scheduler, that is able to schedule a set percent of replicas of a Kubernetes deployment to on-demand AWS instances.

## Installing the Chart

```bash
$ helm repo add banzaicloud-stable http://kubernetes-charts.banzaicloud.com/branch/master
$ helm repo update
```

```bash
$ helm install --name <name> banzaicloud-stable/spot-scheduler
```

## Configuration

The following tables lists configurable parameters of the anchore-policy-validator chart and their default values.

| Parameter        | Description                               | Default                                                            |
| ---------------- | ----------------------------------------- | ------------------------------------------------------------------ |
| replicaCount     | number of replicas                        | 1                                                                  |
| image.repository | image repo that contains the scheduler    | banzaicloud/spot-scheduler                                         |
| image.tag        | image tag                                 | 1.10.3                                                             |
| image.pullPolicy | image pull policy                         | IfNotPresent                                                       |
| extraArgs        | map of extra args to add to the scheduler | feature-gates: PersistentLocalVolumes=false,VolumeScheduling=false |
| resources        | resources to request                      | {}                                                                 |
| nodeSelector     | node selector to use                      | {}                                                                 |
| tolerations      | tolerations to add                        | []                                                                 |
| affinity         | affinities to use                         | {}                                                                 |
