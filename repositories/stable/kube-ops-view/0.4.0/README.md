# `@helm-charts/stable-kube-ops-view`

Kubernetes Operational View - read-only system dashboard for multiple K8s clusters

| Field               | Value         |
| ------------------- | ------------- |
| Repository Name     | stable        |
| Chart Name          | kube-ops-view |
| Chart Version       | 0.4.0         |
| NPM Package Version | 0.1.0         |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Declare variables to be passed into your templates.
replicaCount: 1
image:
  repository: hjacobs/kube-ops-view
  tag: latest
  pullPolicy: IfNotPresent
service:
  # annotations:
  #   service.beta.kubernetes.io/aws-load-balancer-internal: "0.0.0.0/0"
  # labels:
  #   key: value
  type: ClusterIP
  externalPort: 80
  internalPort: 8080
resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 80m
    memory: 64Mi
ingress:
  enabled: false
  # hostname: kube-ops-view.local
  # annotations:
  #   kubernetes.io/ingress.class: nginx
  # tls:
  ## Secrets must be manually created in the namespace
  #   - secretName: kube-ops-view.local-tls
  #     hosts:
  #       - kube-ops-view.local
rbac:
  # If true, create & use RBAC resources
  create: false
  # Ignored if rbac.create is true
  serviceAccountName: default
```

</details>

---

# Kubernetes Operational View Helm Chart

[Kubernetes Operational View](https://github.com/hjacobs/kube-ops-view) provides a read-only system dashboard for multiple K8s clusters

## Installing the Chart

To install the chart with the release name my-release:

```console
$ helm install --name=my-release stable/kube-ops-view
```

The command deploys Kubernetes Operational View on the Kubernetes cluster in the default configuration.

## Accessing the UI

```console
$ kubectl proxy
```

Assuming you used `my-release` for installation, you can now access the UI in your browser by opening http://localhost:8001/api/v1/proxy/namespaces/default/services/my-release-kube-ops-view/

## Uninstalling the Chart

To uninstall/delete the my-release deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.
