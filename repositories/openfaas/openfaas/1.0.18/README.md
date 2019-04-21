# `@helm-charts/openfaas-openfaas`

Enable Kubernetes as a backend for OpenFaaS (Functions as a Service)

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | openfaas |
| Chart Name          | openfaas |
| Chart Version       | 1.0.18   |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
functionNamespace:

async: true

exposeServices: true
serviceType: NodePort
rbac: true

faasnetesd:
  readTimeout: '20s'
  writeTimeout: '20s'
  imagePullPolicy: 'Always' # Image pull policy for deployed functions

gateway:
  readTimeout: '20s'
  writeTimeout: '20s'
  upstreamTimeout: '15s' # Must be smaller than read/write_timeout

queueWorker:
  ackWait: '30s'

# images
images:
  controller: functions/faas-netesd:0.5.5
  gateway: functions/gateway:0.8.2
  prometheus: prom/prometheus:v2.2.0
  alertmanager: prom/alertmanager:v0.15.0-rc.0
  nats: nats-streaming:0.6.0
  queueWorker: functions/queue-worker:0.4.3

# ingress configuration
ingress:
  enabled: false
  # Used to create Ingress record (should be used with exposeServices: false).
  hosts:
    - host: faas-netesd.openfaas.local
      serviceName: faas-netesd
      servicePort: 8080
      path: /
    - host: gateway.openfaas.local
      serviceName: gateway
      servicePort: 8080
      path: /
    - host: prometheus.openfaas.local
      serviceName: prometheus
      servicePort: 9090
      path: /
    - host: alertmanager.openfaas.local
      serviceName: alertmanager
      servicePort: 9093
      path: /
  annotations:
    kubernetes.io/ingress.class: nginx
  tls:
    # Secrets must be manually created in the namespace.
```

</details>

---

# OpenFaaS - Serverless Functions Made Simple

![OpenFaaS Logo](https://blog.alexellis.io/content/images/2017/08/faas_side.png)

[OpenFaaS](https://github.com/openfaas/faas) (Functions as a Service) is a framework for building serverless functions with Docker and Kubernetes which has first class support for metrics. Any process can be packaged as a function enabling you to consume a range of web events without repetitive boiler-plate coding.

**Highlights**

- Ease of use through UI portal and _one-click_ install
- Write functions in any language for Linux or Windows and package in Docker/OCI image format
- Portable - runs on existing hardware or public/private cloud - [Kubernetes](https://github.com/openfaas/faas-netes) and Docker Swarm native
- [CLI](http://github.com/openfaas/faas-cli) available with YAML format for templating and defining functions
- Auto-scales as demand increases

## Deploy OpenFaaS

**Note:** You must also pass `--set rbac=false` if your cluster is not configured with role-based access control. For further information, see [here](https://kubernetes.io/docs/admin/authorization/rbac/).

---

You can create a separate namespace for OpenFaaS core services and functions (recommended):

```
$ kubectl create ns openfaas
$ kubectl create ns openfaas-fn
```

This command should be run from within the `faas-netes/chart` folder or equivalent:

```
$ helm upgrade --install openfaas openfaas/ \
   --namespace openfaas \
   --set functionNamespace=openfaas-fn
```

By default NodePorts will be created for the API Gateway and Prometheus.

> Note: If you're running on a cloud such as AKS or GKE you will need to pass an additional flag of `--set serviceType=LoadBalancer` to tell `helm` to create LoadBalancer objects instead. An alternative to using multiple LoadBalancers is to install an Ingress controller.

Or to use the default namespace (not recommended):

```
$ helm upgrade --install openfaas openfaas/ \
   --namespace default \
   --set functionNamespace=default
```

### Deploy with an IngressController

In order to make use of automatic ingress settings you will need an IngressController in your cluster such as Traefik or Nginx.

Add `--set ingress.enabled` to enable ingress:

```
$ helm upgrade --install openfaas openfaas/ \
    --set ingress.enabled=true
```

By default services will be exposed with following hostnames (can be changed, see values.yaml for details):

- `faas-netesd.openfaas.local`
- `gateway.openfaas.local`
- `prometheus.openfaas.local`
- `alertmanager.openfaas.local`

## Configuration

Additional OpenFaaS options in `values.yaml`.

| Parameter                    | Description                                             | Default    |
| ---------------------------- | ------------------------------------------------------- | ---------- |
| `functionNamespace`          | Functions namespace                                     | `default`  |
| `async`                      | Deploys NATS                                            | `true`     |
| `exposeServices`             | Expose `NodePorts/LoadBalancer`                         | `true`     |
| `serviceType`                | Type of external service to use `NodePort/LoadBalancer` | `NodePort` |
| `ingress.enabled`            | Create ingress resources                                | `false`    |
| `rbac`                       | Enable RBAC                                             | `true`     |
| `faasnetesd.readTimeout`     | Queue worker read timeout                               | `20s`      |
| `faasnetesd.writeTimeout`    | Queue worker write timeout                              | `20s`      |
| `faasnetesd.imagePullPolicy` | Image pull policy for deployed functions                | `Always`   |
| `gateway.readTimeout`        | Queue worker read timeout                               | `20s`      |
| `gateway.writeTimeout`       | Queue worker write timeout                              | `20s`      |
| `gateway.upstreamTimeout`    | Maximum duration of upstream function call              | `20s`      |
| `queueWorker.ackWait`        | Max duration of any async task/request                  | `30s`      |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.
See values.yaml for detailed configuration.

## Removing the OpenFaaS

All control plane components can be cleaned up with helm:

```
$ helm delete --purge openfaas
```

Individual functions will need to be either deleted before deleting the chart with `faas-cli` or manually deleted using `kubectl delete`.
