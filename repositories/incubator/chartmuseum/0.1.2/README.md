# `@helm-charts/incubator-chartmuseum`

Helm Chart Repository with support for Amazon S3 and Google Cloud Storage

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | incubator   |
| Chart Name          | chartmuseum |
| Chart Version       | 0.1.2       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
replicaCount: 1
image:
  repository: chartmuseum/chartmuseum
  tag: v0.2.6
  pullPolicy: IfNotPresent
service:
  type: ClusterIP
  externalPort: 8080
  internalPort: 8080
resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 80m
    memory: 64Mi
persistence:
  Enabled: false
  AccessMode: ReadWriteOnce
  Size: 8Gi
  ## A manually managed Persistent Volume and Claim
  ## Requires Persistence.Enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # ExistingClaim:
  ## jenkins data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # StorageClass: "-"
```

</details>

---

# ChartMuseum Helm Chart

Work in progress...

Please see https://github.com/chartmuseum/chartmuseum
