# `@helm-charts/nginx-nginx-ingress`

NGINX Ingress Controller

| Field               | Value         |
| ------------------- | ------------- |
| Repository Name     | nginx         |
| Chart Name          | nginx-ingress |
| Chart Version       | 0.2.0         |
| NPM Package Version | 0.1.0         |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
controller:
  name: nginx-ingress
  kind: deployment
  nginxplus: false
  hostNetwork: false
  nginxDebug: false
  image:
    repository: nginx/nginx-ingress
    tag: '1.4.5'
    pullPolicy: IfNotPresent
  config:
    entries: {}
  # It is recommended to use your own TLS certificate and key
  defaultTLS:
    cert: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUN2akNDQWFZQ0NRREFPRjl0THNhWFhEQU5CZ2txaGtpRzl3MEJBUXNGQURBaE1SOHdIUVlEVlFRRERCWk8KUjBsT1dFbHVaM0psYzNORGIyNTBjbTlzYkdWeU1CNFhEVEU0TURreE1qRTRNRE16TlZvWERUSXpNRGt4TVRFNApNRE16TlZvd0lURWZNQjBHQTFVRUF3d1dUa2RKVGxoSmJtZHlaWE56UTI5dWRISnZiR3hsY2pDQ0FTSXdEUVlKCktvWklodmNOQVFFQkJRQURnZ0VQQURDQ0FRb0NnZ0VCQUwvN2hIUEtFWGRMdjNyaUM3QlBrMTNpWkt5eTlyQ08KR2xZUXYyK2EzUDF0azIrS3YwVGF5aGRCbDRrcnNUcTZzZm8vWUk1Y2Vhbkw4WGM3U1pyQkVRYm9EN2REbWs1Qgo4eDZLS2xHWU5IWlg0Rm5UZ0VPaStlM2ptTFFxRlBSY1kzVnNPazFFeUZBL0JnWlJVbkNHZUtGeERSN0tQdGhyCmtqSXVuektURXUyaDU4Tlp0S21ScUJHdDEwcTNRYzhZT3ExM2FnbmovUWRjc0ZYYTJnMjB1K1lYZDdoZ3krZksKWk4vVUkxQUQ0YzZyM1lma1ZWUmVHd1lxQVp1WXN2V0RKbW1GNWRwdEMzN011cDBPRUxVTExSakZJOTZXNXIwSAo1TmdPc25NWFJNV1hYVlpiNWRxT3R0SmRtS3FhZ25TZ1JQQVpQN2MwQjFQU2FqYzZjNGZRVXpNQ0F3RUFBVEFOCkJna3Foa2lHOXcwQkFRc0ZBQU9DQVFFQWpLb2tRdGRPcEsrTzhibWVPc3lySmdJSXJycVFVY2ZOUitjb0hZVUoKdGhrYnhITFMzR3VBTWI5dm15VExPY2xxeC9aYzJPblEwMEJCLzlTb0swcitFZ1U2UlVrRWtWcitTTFA3NTdUWgozZWI4dmdPdEduMS9ienM3bzNBaS9kclkrcUI5Q2k1S3lPc3FHTG1US2xFaUtOYkcyR1ZyTWxjS0ZYQU80YTY3Cklnc1hzYktNbTQwV1U3cG9mcGltU1ZmaXFSdkV5YmN3N0NYODF6cFErUyt1eHRYK2VBZ3V0NHh3VlI5d2IyVXYKelhuZk9HbWhWNThDd1dIQnNKa0kxNXhaa2VUWXdSN0diaEFMSkZUUkk3dkhvQXprTWIzbjAxQjQyWjNrN3RXNQpJUDFmTlpIOFUvOWxiUHNoT21FRFZkdjF5ZytVRVJxbStGSis2R0oxeFJGcGZnPT0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=
    key: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBdi91RWM4b1JkMHUvZXVJTHNFK1RYZUprckxMMnNJNGFWaEMvYjVyYy9XMlRiNHEvClJOcktGMEdYaVN1eE9ycXgrajlnamx4NXFjdnhkenRKbXNFUkJ1Z1B0ME9hVGtIekhvb3FVWmcwZGxmZ1dkT0EKUTZMNTdlT1l0Q29VOUZ4amRXdzZUVVRJVUQ4R0JsRlNjSVo0b1hFTkhzbysyR3VTTWk2Zk1wTVM3YUhudzFtMApxWkdvRWEzWFNyZEJ6eGc2clhkcUNlUDlCMXl3VmRyYURiUzc1aGQzdUdETDU4cGszOVFqVUFQaHpxdmRoK1JWClZGNGJCaW9CbTVpeTlZTW1hWVhsMm0wTGZzeTZuUTRRdFFzdEdNVWozcGJtdlFmazJBNnljeGRFeFpkZFZsdmwKMm82MjBsMllxcHFDZEtCRThCay90elFIVTlKcU56cHpoOUJUTXdJREFRQUJBb0lCQVFDZklHbXowOHhRVmorNwpLZnZJUXQwQ0YzR2MxNld6eDhVNml4MHg4Mm15d1kxUUNlL3BzWE9LZlRxT1h1SENyUlp5TnUvZ2IvUUQ4bUFOCmxOMjRZTWl0TWRJODg5TEZoTkp3QU5OODJDeTczckM5bzVvUDlkazAvYzRIbjAzSkVYNzZ5QjgzQm9rR1FvYksKMjhMNk0rdHUzUmFqNjd6Vmc2d2szaEhrU0pXSzBwV1YrSjdrUkRWYmhDYUZhNk5nMUZNRWxhTlozVDhhUUtyQgpDUDNDeEFTdjYxWTk5TEI4KzNXWVFIK3NYaTVGM01pYVNBZ1BkQUk3WEh1dXFET1lvMU5PL0JoSGt1aVg2QnRtCnorNTZud2pZMy8yUytSRmNBc3JMTnIwMDJZZi9oY0IraVlDNzVWYmcydVd6WTY3TWdOTGQ5VW9RU3BDRkYrVm4KM0cyUnhybnhBb0dCQU40U3M0ZVlPU2huMVpQQjdhTUZsY0k2RHR2S2ErTGZTTXFyY2pOZjJlSEpZNnhubmxKdgpGenpGL2RiVWVTbWxSekR0WkdlcXZXaHFISy9iTjIyeWJhOU1WMDlRQ0JFTk5jNmtWajJTVHpUWkJVbEx4QzYrCk93Z0wyZHhKendWelU0VC84ajdHalRUN05BZVpFS2FvRHFyRG5BYWkyaW5oZU1JVWZHRXFGKzJyQW9HQkFOMVAKK0tZL0lsS3RWRzRKSklQNzBjUis3RmpyeXJpY05iWCtQVzUvOXFHaWxnY2grZ3l4b25BWlBpd2NpeDN3QVpGdwpaZC96ZFB2aTBkWEppc1BSZjRMazg5b2pCUmpiRmRmc2l5UmJYbyt3TFU4NUhRU2NGMnN5aUFPaTVBRHdVU0FkCm45YWFweUNweEFkREtERHdObit3ZFhtaTZ0OHRpSFRkK3RoVDhkaVpBb0dCQUt6Wis1bG9OOTBtYlF4VVh5YUwKMjFSUm9tMGJjcndsTmVCaWNFSmlzaEhYa2xpSVVxZ3hSZklNM2hhUVRUcklKZENFaHFsV01aV0xPb2I2NTNyZgo3aFlMSXM1ZUtka3o0aFRVdnpldm9TMHVXcm9CV2xOVHlGanIrSWhKZnZUc0hpOGdsU3FkbXgySkJhZUFVWUNXCndNdlQ4NmNLclNyNkQrZG8wS05FZzFsL0FvR0FlMkFVdHVFbFNqLzBmRzgrV3hHc1RFV1JqclRNUzRSUjhRWXQKeXdjdFA4aDZxTGxKUTRCWGxQU05rMXZLTmtOUkxIb2pZT2pCQTViYjhibXNVU1BlV09NNENoaFJ4QnlHbmR2eAphYkJDRkFwY0IvbEg4d1R0alVZYlN5T294ZGt5OEp0ek90ajJhS0FiZHd6NlArWDZDODhjZmxYVFo5MWpYL3RMCjF3TmRKS2tDZ1lCbyt0UzB5TzJ2SWFmK2UwSkN5TGhzVDQ5cTN3Zis2QWVqWGx2WDJ1VnRYejN5QTZnbXo5aCsKcDNlK2JMRUxwb3B0WFhNdUFRR0xhUkcrYlNNcjR5dERYbE5ZSndUeThXczNKY3dlSTdqZVp2b0ZpbmNvVlVIMwphdmxoTUVCRGYxSjltSDB5cDBwWUNaS2ROdHNvZEZtQktzVEtQMjJhTmtsVVhCS3gyZzR6cFE9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo=
    # secret: <namespace>/<secret_name>
  nodeSelector: {}
  terminationGracePeriodSeconds: 30
  tolerations: ''
  replicaCount: 1
  ingressClass: nginx
  useIngressClassOnly: false
  watchNamespace: ''
  healthStatus: false
  nginxStatus:
    enable: true
    port: 8080
    allowCidrs: '127.0.0.1'
  service:
    create: true
    type: LoadBalancer
    externalTrafficPolicy: Local
    annotations: {}
    loadBalancerIP: ''
    externalIPs: []
  serviceAccount:
    name: nginx-ingress
    imagePullSecrets:
      []
      # - name: secret_name
  reportIngressStatus:
    enable: true
    externalService: nginx-ingress
    enableLeaderElection: true
rbac:
  create: true
prometheus:
  create: false
  port: 9113
  image:
    repository: nginx/nginx-prometheus-exporter
    tag: '0.2.0'
    pullPolicy: IfNotPresent
```

</details>

---

# NGINX Ingress Controller Helm Chart

## Introduction

This chart deploys the NGINX Ingress controller in your Kubernetes cluster.

## Prerequisites

- Kubernetes 1.6+.
- Helm 2.8.x+.
- Git (for installation using the chart source files).
- If you’d like to use NGINX Plus:
  - Build an Ingress controller image with NGINX Plus and push it to your private registry by following the instructions from [here](https://github.com/nginxinc/kubernetes-ingress/blob/v1.4.5/build/README.md).
  - Configure `controller.nginxplus` and `controller.image.repository` parameters accordingly using a values file or the `--set` flag of the `helm install` command.

## Installing the Chart

### Installing via Helm Repository

1. Add NGINX Helm repository:

   ```
   $ helm repo add nginx-stable https://helm.nginx.com/stable
   $ helm repo update
   ```

2. To install the chart with the release name my-release (my-release is the name that you choose):

   For NGINX:

   ```
   $ helm install nginx-stable/nginx-ingress --name my-release
   ```

   For NGINX Plus (assuming you have pushed the Ingress controller image `nginx-plus-ingress` to your private registry `myregistry.example.com`):

   ```
   $ helm install nginx-stable/nginx-ingress --name my-release --set controller.image.repository=myregistry.example.com/nginx-plus-ingress --set controller.nginxplus=true
   ```

### Installing Using Chart Sources

1. Clone the Ingress controller repo and check out the latest stable version:
   ```
   $ git clone https://github.com/nginxinc/kubernetes-ingress/
   $ git checkout v1.4.5
   ```
2. Change your working directory to /deployments/helm-chart:
   ```
   $ cd kubernetes-ingress/deployments/helm-chart
   ```
3. To install the chart with the release name my-release (my-release is the name that you choose):

   For NGINX:

   ```
   $ helm install --name my-release .
   ```

   For NGINX Plus (assuming you have configured the `controller.nginxplus` and `controller.image.repository` parameters in the values file `values-plus.yaml`):

   ```
   $ helm install --name my-release -f values-plus.yaml .
   ```

### Notes

- The `helm install` command deploys the Ingress controller in your Kubernetes cluster in the default configuration. The configuration section lists the parameters that can be configured during installation.
- When deploying the Ingress controller, make sure to use your own TLS certificate and key for the default server rather than the default pre-generated ones. Read the [Configuration](#Configuration) section below to see how to configure a TLS certificate and key for the default server. Note that the default server returns the Not Found page with the 404 status code for all requests for domains for which there are no Ingress rules defined.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the release `my-release`

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the NGINX Ingress controller chart and their default values.

| Parameter                                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Default                                  |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `controller.name`                                     | The name of the Ingress controller daemon set or deployment.                                                                                                                                                                                                                                                                                                                                                                                                | nginx-ingress                            |
| `controller.kind`                                     | The kind of the Ingress controller installation - deployment or daemonset.                                                                                                                                                                                                                                                                                                                                                                                  | deployment                               |
| `controller.nginxplus`                                | Deploys the Ingress controller for NGINX Plus.                                                                                                                                                                                                                                                                                                                                                                                                              | false                                    |
| `controller.hostNetwork`                              | Enables the Ingress controller pods to use the host's network namespace.                                                                                                                                                                                                                                                                                                                                                                                    | false                                    |
| `controller.nginxDebug`                               | Enables debugging for NGINX. Uses the `nginx-debug` binary. Requires `error-log-level: debug` in the ConfigMap via `controller.config.entries`.                                                                                                                                                                                                                                                                                                             | false                                    |
| `controller.image.repository`                         | The image repository of the Ingress controller.                                                                                                                                                                                                                                                                                                                                                                                                             | nginx/nginx-ingress                      |
| `controller.image.tag`                                | The tag of the Ingress controller image.                                                                                                                                                                                                                                                                                                                                                                                                                    | 1.4.5                                    |
| `controller.image.pullPolicy`                         | The pull policy for the Ingress controller image.                                                                                                                                                                                                                                                                                                                                                                                                           | IfNotPresent                             |
| `controller.config.entries`                           | The entries of the ConfigMap for customizing NGINX configuration.                                                                                                                                                                                                                                                                                                                                                                                           | { }                                      |
| `controller.defaultTLS.cert`                          | The base64-encoded TLS certificate for the default HTTPS server. If not specified, a pre-generated self-signed certificate is used. **Note:** It is recommended that you specify your own certificate.                                                                                                                                                                                                                                                      | A pre-generated self-signed certificate. |
| `controller.defaultTLS.key`                           | The base64-encoded TLS key for the default HTTPS server. **Note:** If not specified, a pre-generated key is used. It is recommended that you specify your own key.                                                                                                                                                                                                                                                                                          | A pre-generated key.                     |
| `controller.defaultTLS.secret`                        | The secret with a TLS certificate and key for the default HTTPS server. The value must follow the following format: `<namespace>/<name>`. Used as an alternative to specifiying a certifcate and key using `controller.defaultTLS.cert` and `controller.defaultTLS.key` parameters.                                                                                                                                                                         | None                                     |
| `controller.nodeSelector`                             | The node selector for pod assignment for the Ingress controller pods.                                                                                                                                                                                                                                                                                                                                                                                       | { }                                      |
| `controller.terminationGracePeriodSeconds`            | The termination grace period of the Ingress controller pod.                                                                                                                                                                                                                                                                                                                                                                                                 | 30                                       |
| `controller.tolerations`                              | The tolerations required for the IBM Cloud Private installation.                                                                                                                                                                                                                                                                                                                                                                                            | None                                     |
| `controller.replicaCount`                             | The number of replicas of the Ingress controller deployment.                                                                                                                                                                                                                                                                                                                                                                                                | 1                                        |
| `controller.service.create`                           | Creates a service to expose the Ingress controller pods.                                                                                                                                                                                                                                                                                                                                                                                                    | true                                     |
| `controller.service.type`                             | The type of service to create for the Ingress controller.                                                                                                                                                                                                                                                                                                                                                                                                   | LoadBalancer                             |
| `controller.service.externalTrafficPolicy`            | The externalTrafficPolicy of the service. The value Local preserves the client source IP.                                                                                                                                                                                                                                                                                                                                                                   | Local                                    |
| `controller.service.annotations`                      | The annotations of the Ingress controller service.                                                                                                                                                                                                                                                                                                                                                                                                          | { }                                      |
| `controller.service.loadBalancerIP`                   | The static IP address for the load balancer. Requires `controller.service.type` set to `LoadBalancer`.                                                                                                                                                                                                                                                                                                                                                      | None                                     |
| `controller.service.externalIPs`                      | The list of external IPs for the Ingress controller service.                                                                                                                                                                                                                                                                                                                                                                                                | []                                       |
| `controller.serviceAccount.name`                      | The name of the service account of the Ingress controller pods. Used for RBAC.                                                                                                                                                                                                                                                                                                                                                                              | nginx-ingress                            |
| `controller.serviceAccount.imagePullSecrets`          | The names of the secrets containing docker registry credentials.                                                                                                                                                                                                                                                                                                                                                                                            | []                                       |
| `controller.ingressClass`                             | A class of the Ingress controller. The Ingress controller only processes Ingress resources that belong to its class - i.e. have the annotation `"kubernetes.io/ingress.class"` equal to the class. Additionally, the Ingress controller processes Ingress resources that do not have that annotation which can be disabled by setting the "-use-ingress-class-only" flag.                                                                                   | nginx                                    |
| `controller.useIngressClassOnly`                      | Ignore Ingress resources without the `"kubernetes.io/ingress.class"` annotation.                                                                                                                                                                                                                                                                                                                                                                            | false                                    |
| `controller.watchNamespace`                           | Namespace to watch for Ingress resources. By default the Ingress controller watches all namespaces.                                                                                                                                                                                                                                                                                                                                                         | ""                                       |
| `controller.healthStatus`                             | Add a location "/nginx-health" to the default server. The location responds with the 200 status code for any request. Useful for external health-checking of the Ingress controller.                                                                                                                                                                                                                                                                        | false                                    |
| `controller.nginxStatus.enable`                       | Enable the NGINX stub_status, or the NGINX Plus API.                                                                                                                                                                                                                                                                                                                                                                                                        | true                                     |
| `controller.nginxStatus.port`                         | Set the port where the NGINX stub_status or the NGINX Plus API is exposed.                                                                                                                                                                                                                                                                                                                                                                                  | 8080                                     |
| `controller.nginxStatus.allowCidrs`                   | Whitelist IPv4 IP/CIDR blocks to allow access to NGINX stub_status or the NGINX Plus API. Separate multiple IP/CIDR by commas.                                                                                                                                                                                                                                                                                                                              | 127.0.0.1                                |
| `controller.reportIngressStatus.enable`               | Update the address field in the status of Ingresses resources with an external address of the Ingress controller. You must also specify the source of the external address either through an external service via `controller.reportIngressStatus.externalService` or the `external-status-address` entry in the ConfigMap via `controller.config.entries`. **Note:** `controller.config.entries.external-status-address` takes precedence if both are set. | true                                     |
| `controller.reportIngressStatus.externalService`      | Specifies the name of the service with the type LoadBalancer through which the Ingress controller is exposed externally. The external address of the service is used when reporting the status of Ingress resources. `controller.reportIngressStatus.enable` must be set to `true`.                                                                                                                                                                         | nginx-ingress                            |
| `controller.reportIngressStatus.enableLeaderElection` | Enable Leader election to avoid multiple replicas of the controller reporting the status of Ingress resources. `controller.reportIngressStatus.enable` must be set to `true`.                                                                                                                                                                                                                                                                               | true                                     |
| `rbac.create`                                         | Configures RBAC.                                                                                                                                                                                                                                                                                                                                                                                                                                            | true                                     |
| `prometheues.create`                                  | Deploys a Prometheus exporter container within the Ingress controller pod. Requires NGINX status enabled via `controller.nginxStatus.enable`. Note: the exporter will use the port specified by `controller.nginxStatus.port`.                                                                                                                                                                                                                              | false                                    |
| `prometheus.port`                                     | Configures the port to scrape the metrics.                                                                                                                                                                                                                                                                                                                                                                                                                  | 9113                                     |
| `prometheus.image.repository`                         | The image repository of the Prometheus exporter.                                                                                                                                                                                                                                                                                                                                                                                                            | nginx/nginx-prometheus-exporter          |
| `prometheus.image.tag`                                | The tag of the Prometheus exporter image.                                                                                                                                                                                                                                                                                                                                                                                                                   | 0.2.0                                    |
| `prometheus.image.pullPolicy`                         | The pull policy for the Prometheus exporter image.                                                                                                                                                                                                                                                                                                                                                                                                          | IfNotPresent                             |

Example:

```
$ cd kubernetes-ingress/helm-chart
$ helm install --name my-release . --set controller.replicaCount=5
```

## Notes

- The values-icp.yaml file is used for deploying the Ingress controller on IBM Cloud Private. See the [blog post](https://www.nginx.com/blog/nginx-ingress-controller-ibm-cloud-private/) for more details.
