# `@helm-charts/pnnl-miscscripts-k8s-node-image-1-14`

A Helm chart for Kubernetes

| Field               | Value               |
| ------------------- | ------------------- |
| Repository Name     | pnnl-miscscripts    |
| Chart Name          | k8s-node-image-1-14 |
| Chart Version       | 0.1.0               |
| NPM Package Version | 0.1.0               |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for k8s-node-image.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 2

nameOverride: ''
fullnameOverride: ''

anaconda:
  image:
    pullPolicy: IfNotPresent

  service:
    type: ClusterIP
    port: 80

k8sNode:
  prefix: 'pnnlmiscscripts.k8s-node-image-nginx-1-14'
  image:
    pullPolicy: IfNotPresent

  service:
    type: ClusterIP
    port: 80

ingress:
  enabled: true
  enableVersionPrefix: true
  regex: true
  prefix: ''
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  hosts:
    - chart-example.local

  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #   cpu: 100m
  #   memory: 128Mi
  # requests:
  #   cpu: 100m
  #   memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# K8S Node Image

The k8s-node-image chart provides a a standalone image useful for installing
bare metal nodes that can form a k8s cluster.

This can be used in conjunction with pixiecore and dhcpd.

## Dependencies

This chart requires nginx-ingress 0.22.0 or higher in the default config. To
support older nginx-ingress, set ingress.regex=false.

For other ingress controllers, you will need to annotate as needed to get
rewriting to happen appropriately for your ingress controller.

## Install Chart

To install the Chart into your Kubernetes cluster :

```bash
helm install --namespace "k8s-node-image" pnnl-miscscripts/k8s-node-image
```

After installation succeeds, you can get a status of Chart

```bash
helm status <release>
```

If you want to delete your Chart, use this command:

```bash
helm delete  --purge <release>
```
