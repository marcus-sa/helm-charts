# `@helm-charts/gabibbo97-periodic-daemonset`

Periodically run a job

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | gabibbo97          |
| Chart Name          | periodic-daemonset |
| Chart Version       | 1.0.1              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for periodic-daemonset.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

image:
  repository: gabibbo97/kubectl
  tag: v1.13.3-alpine
  pullPolicy: Always

nameOverride: ''
fullnameOverride: ''

podSpec:
  containers:
    - name: hello-world
      image: alpine:latest
      imagePullPolicy: Always
      command:
        - /bin/sh
        - -c
      args:
        - echo "Hello world"

schedule: '*/3 * * * *'
```

</details>

---

# periodic-daemonset

Periodic daemonset allows scheduling a Pod across all nodes in the cluster

## TL;DR

```bash
helm install gabibbo97/periodic-daemonset \
    --set schedule='*/3 * * * *' \
    --values /dev/stdin <<EOF
podSpec:
  containers:
    - name: hello-world
      image: alpine:latest
      imagePullPolicy: Always
      command:
        - /bin/sh
        - -c
      args:
        - echo "Hello world"
EOF
```

## Introduction

This chart periodically launches a pod across all hosts

## Configuration options

| Parameter  | Description                  |      Default       |
| ---------- | ---------------------------- | :----------------: |
| `schedule` | The schedule for the cronjob |   `*/3 * * * *`    |
| `podSpec`  | The pod for the cronjob      | An hello world pod |
