# `@helm-charts/banzaicloud-stable-etcd`

Etcd Helm chart for Kubernetes

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | etcd               |
| Chart Version       | 0.1.1              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
etcd:
  cluster:
    name: etcd-cluster
    size: 3
    version: v3.2.9
    ## etcd cluster pod specific values
    pod:
      ## Antiaffinity for etcd pod assignment
      ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
      ##
      antiAffinity: false
      resources:
        limits:
          cpu: 100m
          memory: 128Mi
        requests:
          cpu: 100m
          memory: 128Mi
      ## Node labels for etcd pod assignment
      ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
      ##
      nodeSelector: {}
```

</details>
