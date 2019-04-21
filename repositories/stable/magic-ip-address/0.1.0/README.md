# `@helm-charts/stable-magic-ip-address`

A Helm chart to assign static IP addresses for node-local services

| Field               | Value            |
| ------------------- | ---------------- |
| Repository Name     | stable           |
| Chart Name          | magic-ip-address |
| Chart Version       | 0.1.0            |
| NPM Package Version | 0.1.0            |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  repository: mumoshu/kube-magic-ip-assigner
  tag: 0.9.0-1.9.8
  pullPolicy: IfNotPresent

config:
  ipAddress: 169.254.210.210
  selector: app=myapp
  hostInterface: cni0
  port: 9200
  protocol: tcp
  verbose:
  pollInterval: 5

# A map of additional environment variables
extraVars:
  {}
  # test1: "test2"

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 200Mi
  # requests:
  #  cpu: 100m
  #  memory: 100Mi

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:
```

</details>

---

# magic-ip-address

[magic-ip-address](https://github.com/mumoshu/kube-magic-ip-address) is a Kubernetes daemonset to implement [magic IP addresses](https://github.com/kubernetes/kubernetes/issues/15169#issuecomment-231267078), that are useful to serve [node-local services](https://github.com/kubernetes/kubernetes/issues/28610).

Magic IP addresses are static IP addresses that are well-known in your cluster. They are typically assigned to daemonset pods, so that the pods are accessible from other consumer pods that are collocated on the same nodes.

Under the hood, `magic-ip-address` periodically polls the Kubernetes API to find one of targeted daemonset pods that are collocated on the same node as the `magic-ip-address` pod, by matching the pod selector. The targeted daemonset pods are assigned the magic IP address like `169.254.210.210`, which can then be accessed by other pods.

One of typical use-cases of this project is to connect your applicaton pod to a Datadog's dd-agent, dd-zipkin, Elastic's apm-server, [zipkin-gcp](https://github.com/openzipkin/zipkin-gcp) agent pods. From your application, just point your tracer to the collector endpoint `169.254.210.210`. netfiler/iptables will redirect packets to the agent pod on the same node according to pod selector you've provided.

A possible alternative to use `magic-ip-address` is to use the downward API to obtain the IP address of the node, while running the agent pod with `hostNetwork: true`. However, it has two downsides. One is that you have to open up your network to allow pods to directly access the nodes running them, which results in a extra attack surface. Another alternative would be to use a deployment, which means that you're giving up adding a meaningful node-related metadata(node's ip address, name, namespace, and labels that your application pod is running on) to the traces collected by the agents.

In contrast to the two alternatives, `magic-ip-address` allows you add meaningful node metadata to your application traces, without exposing the agent pods via the host network.

## Prerequisites

- Kubernetes 1.9+

## Usage

For example, to make [`elastic/apm-server`](https://github.com/elastic/apm-server) pod running on the same node to be accessible via `169.254.210.210`, install this chart by:

```
$ helm upgrade 169-254-210-210 stable/magic-ip-address --set config.ipAddress=169.254.210.210 --set config.port=9200 --set config.selector=app=apm-server --namespace kube-system --install
```

It is recommended to name the helm release according to the magic IP address, while replacing every dot with hyphen, so that it is clear that which address the magic-ip-address pod is serving:

```
$ helm list
NAME           	REVISION	UPDATED                 	STATUS  	CHART                 	NAMESPACE
169-254-210-210	1       	Mon Jun 11 22:51:10 2018	DEPLOYED	magic-ip-address-0.1.0	kube-system
```

```
$ kubectl get po -n kube-system
NAME                                     READY     STATUS    RESTARTS   AGE
169-254-210-210-magic-ip-address-25h47   1/1       Running   0          19s
```
