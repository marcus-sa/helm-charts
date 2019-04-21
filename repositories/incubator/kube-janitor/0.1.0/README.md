# `@helm-charts/incubator-kube-janitor`

A Helm chart for running kube-janitor

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | incubator    |
| Chart Name          | kube-janitor |
| Chart Version       | 0.1.0        |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  repository: themagicalkarp/kube-janitor
  tag: v0.1.0
  pullPolicy: IfNotPresent

kubejanitor:
  annotation: kube.janitor.io
  dryrun: false
  expiration: 60
  namespace: ''
  pendingJobExpiration: 60
  verbose: true

cron:
  schedule: '*/1 * * * *'

resources:
  {}
  # limits:
  #   cpu: 200m
  #   memory: 100Mi
  # requests:
  #   cpu: 50m
  #   memory: 50Mi
```

</details>
