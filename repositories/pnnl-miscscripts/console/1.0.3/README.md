# `@helm-charts/pnnl-miscscripts-console`

Console access from Kubernetes. Adds IPMI Support.

| Field               | Value            |
| ------------------- | ---------------- |
| Repository Name     | pnnl-miscscripts |
| Chart Name          | console          |
| Chart Version       | 1.0.3            |
| NPM Package Version | 0.1.0            |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for console.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

ipmitool:
  server:
  prefix:
  org:
  repo:
  tag:
  pullPolicy: IfNotPresent

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
#- key: node-role.kubernetes.io/master
#  operator: Exists
#  effect: NoSchedule

affinity: {}

hosts: []
#- host:
#  ip:
#  secret:
```

</details>

---

# Console

The Console chart spawns a pod per console you have in your cluster.

Currently, the only driver is ipmitool.

## Install Chart

To install the Chart into your Kubernetes cluster :

```bash
helm install --namespace "console" --name "console" pnnl-miscscripts/console
```

After installation succeeds, you can get a status of Chart

```bash
helm status "console"
```

If you want to delete your Chart, use this command:

```bash
helm delete  --purge "console"
```

### Console configuration

Add your hosts to the host list like:

```yaml
hosts:
  - host: p1
    ip: 192.168.1.20
    secret: ipmi
  - host: p2
    ip: 192.168.1.21
    secret: ipmi
```

Where host is the name for the host. Ip is the ipmi bmc's ip or hostname. Secret is a Kubernetes secret in the same namespace with key username = ipmi username and password = ipmi password.

For example, to create a secret named ipmi that can be used with this chart:

```bash
kubectl create secret generic ipmi --namespace console --from-literal=username=ADMIN --from-literal=password=ADMIN
```
