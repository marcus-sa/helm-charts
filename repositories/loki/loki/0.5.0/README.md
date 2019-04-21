# `@helm-charts/loki-loki`

Loki: like Prometheus, but for logs.

| Field               | Value |
| ------------------- | ----- |
| Repository Name     | loki  |
| Chart Name          | loki  |
| Chart Version       | 0.5.0 |
| NPM Package Version | 0.1.0 |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
rbac:
  create: true
  pspEnabled: true

networkPolicy:
  enabled: false

serviceAccount:
  # if has deployed loki or promtail, must set false
  create: true
  name:

loki:
  enabled: true

  replicas: 1
  minReadySeconds: 0
  terminationGracePeriodSeconds: 30
  deploymentStrategy: RollingUpdate
  port: 3100

  image:
    repository: grafana/loki
    tag: latest
    pullPolicy: Always # Always pull while in BETA

  service:
    port: 3100
    annotations: {}
    #  prometheus.io/scrape: "true"
    #  prometheus.io/port: "http-metrics"
    labels: {}

  readinessProbe:
    httpGet:
      path: /ready
      port: http-metrics
    initialDelaySeconds: 45

  livenessProbe:
    httpGet:
      path: /ready
      port: http-metrics
    initialDelaySeconds: 45

  resources:
    {}
    # limits:
    #   cpu: 200m
    #   memory: 256Mi
    # requests:
    #   cpu: 100m
    #   memory: 128Mi

  securityContext:
    fsGroup: 10001
    runAsGroup: 10001
    runAsNonRoot: true
    runAsUser: 10001

  ## Pod Annotations
  podAnnotations: {}

  ## Deployment annotations
  annotations: {}

  ## Assign a PriorityClassName to pods if set
  # priorityClassName:

  ## Node labels for pod assignment
  ## ref: https://kubernetes.io/docs/user-guide/node-selection/
  #
  nodeSelector: {}

  ## Tolerations for pod assignment
  ## ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
  ##
  tolerations: []

  ## Affinity for pod assignment
  ## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
  ##
  affinity:
    {}
    # podAntiAffinity:
    #   requiredDuringSchedulingIgnoredDuringExecution:
    #   - labelSelector:
    #       matchExpressions:
    #       - key: app
    #         operator: In
    #         values:
    #         - loki
    #     topologyKey: "kubernetes.io/hostname"

  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ## If you set enabled as "True", you need :
  ## - create a pv which above 10Gi and has same namespace with loki
  ## - keep storageClassName same with below setting
  persistence:
    enabled: false
    accessModes:
      - ReadWriteOnce
    size: 10Gi
    storageClassName: default
    annotations: {}
    # subPath: ""
    # existingClaim:

  config:
    auth_enabled: false
    ingester:
      lifecycler:
        ring:
          store: inmemory
          replication_factor: 1
    schema_configs:
      - from: 0
        store: boltdb
        object_store: filesystem
        schema: v9
        index:
          prefix: index_
          period: 168h
    storage_config:
      boltdb:
        directory: /data/loki/index
      filesystem:
        directory: /data/loki/chunks

promtail:
  enabled: true

  nameOverride: promtail
  deploymentStrategy: RollingUpdate

  entryParser: docker

  image:
    repository: grafana/promtail
    tag: latest
    pullPolicy: Always # Always pull while in BETA

  # This should match promtail.config.server.http_listen_port
  port: 3101

  # Extra volumes to scrape logs from
  volumes:
    - name: pods
      hostPath:
        path: /var/log/pods
    - name: docker
      hostPath:
        path: /var/lib/docker/containers

  volumeMounts:
    - name: pods
      mountPath: /var/log/pods
      readOnly: true
    - name: docker
      mountPath: /var/lib/docker/containers
      readOnly: true

  readinessProbe:
    failureThreshold: 5
    httpGet:
      path: /metrics
      port: http-metrics
    initialDelaySeconds: 10
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 1

  livenessProbe:
    failureThreshold: 5
    httpGet:
      path: /metrics
      port: http-metrics
    initialDelaySeconds: 10
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 1

  resources: {}
  #  limits:
  #    cpu: 200m
  #    memory: 128Mi
  #  requests:
  #    cpu: 100m
  #    memory: 128Mi

  securityContext:
    readOnlyRootFilesystem: true
    runAsGroup: 0
    runAsUser: 0

  ## Pod Annotations
  podAnnotations: {}
  #  prometheus.io/scrape: "true"
  #  prometheus.io/port: "http-metrics"

  ## Deployment annotations
  annotations: {}

  ## Assign a PriorityClassName to pods if set
  # priorityClassName:

  ## Node labels for pod assignment
  ## ref: https://kubernetes.io/docs/user-guide/node-selection/
  #
  nodeSelector: {}

  ## Tolerations for pod assignment
  ## ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
  ##
  tolerations:
    - key: node-role.kubernetes.io/master
      effect: NoSchedule

  ## Affinity for pod assignment
  ## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
  ##
  affinity: {}

  config:
    client:
      # Maximum wait period before sending batch
      batchwait: 1s
      # Maximum batch size to accrue before sending, unit is byte
      batchsize: 102400

      # Maximum time to wait for server to respond to a request
      timeout: 10s

      backoff_config:
        # Initial backoff time between retries
        minbackoff: 100ms
        # Maximum backoff time between retries
        maxbackoff: 5s
        # Maximum number of retires when sending batches, 0 means infinite retries
        maxretries: 5

      # The labels to add to any time series or alerts when communicating with loki
      external_labels: {}

    server:
      http_listen_port: 3101
    positions:
      filename: /run/promtail/positions.yaml
    scrape_configs:
      - entry_parser: '{{ .Values.promtail.entryParser }}'
        job_name: kubernetes-pods-name
        kubernetes_sd_configs:
          - role: pod
        relabel_configs:
          - source_labels:
              - __meta_kubernetes_pod_label_name
            target_label: __service__
          - source_labels:
              - __meta_kubernetes_pod_node_name
            target_label: __host__
          - action: drop
            regex: ^$
            source_labels:
              - __service__
          - action: replace
            replacement: $1
            separator: /
            source_labels:
              - __meta_kubernetes_namespace
              - __service__
            target_label: job
          - action: replace
            source_labels:
              - __meta_kubernetes_namespace
            target_label: namespace
          - action: replace
            source_labels:
              - __meta_kubernetes_pod_name
            target_label: instance
          - action: replace
            source_labels:
              - __meta_kubernetes_pod_container_name
            target_label: container_name
          - action: labelmap
            regex: __meta_kubernetes_pod_label_(.+)
          - replacement: /var/log/pods/$1/*.log
            separator: /
            source_labels:
              - __meta_kubernetes_pod_uid
              - __meta_kubernetes_pod_container_name
            target_label: __path__
      - entry_parser: '{{ .Values.promtail.entryParser }}'
        job_name: kubernetes-pods-app
        kubernetes_sd_configs:
          - role: pod
        relabel_configs:
          - action: drop
            regex: .+
            source_labels:
              - __meta_kubernetes_pod_label_name
          - source_labels:
              - __meta_kubernetes_pod_label_app
            target_label: __service__
          - source_labels:
              - __meta_kubernetes_pod_node_name
            target_label: __host__
          - action: drop
            regex: ^$
            source_labels:
              - __service__
          - action: replace
            replacement: $1
            separator: /
            source_labels:
              - __meta_kubernetes_namespace
              - __service__
            target_label: job
          - action: replace
            source_labels:
              - __meta_kubernetes_namespace
            target_label: namespace
          - action: replace
            source_labels:
              - __meta_kubernetes_pod_name
            target_label: instance
          - action: replace
            source_labels:
              - __meta_kubernetes_pod_container_name
            target_label: container_name
          - action: labelmap
            regex: __meta_kubernetes_pod_label_(.+)
          - replacement: /var/log/pods/$1/*.log
            separator: /
            source_labels:
              - __meta_kubernetes_pod_uid
              - __meta_kubernetes_pod_container_name
            target_label: __path__
      - entry_parser: '{{ .Values.promtail.entryParser }}'
        job_name: kubernetes-pods-direct-controllers
        kubernetes_sd_configs:
          - role: pod
        relabel_configs:
          - action: drop
            regex: .+
            separator: ''
            source_labels:
              - __meta_kubernetes_pod_label_name
              - __meta_kubernetes_pod_label_app
          - action: drop
            regex: ^([0-9a-z-.]+)(-[0-9a-f]{8,10})$
            source_labels:
              - __meta_kubernetes_pod_controller_name
          - source_labels:
              - __meta_kubernetes_pod_controller_name
            target_label: __service__
          - source_labels:
              - __meta_kubernetes_pod_node_name
            target_label: __host__
          - action: drop
            regex: ^$
            source_labels:
              - __service__
          - action: replace
            replacement: $1
            separator: /
            source_labels:
              - __meta_kubernetes_namespace
              - __service__
            target_label: job
          - action: replace
            source_labels:
              - __meta_kubernetes_namespace
            target_label: namespace
          - action: replace
            source_labels:
              - __meta_kubernetes_pod_name
            target_label: instance
          - action: replace
            source_labels:
              - __meta_kubernetes_pod_container_name
            target_label: container_name
          - action: labelmap
            regex: __meta_kubernetes_pod_label_(.+)
          - replacement: /var/log/pods/$1/*.log
            separator: /
            source_labels:
              - __meta_kubernetes_pod_uid
              - __meta_kubernetes_pod_container_name
            target_label: __path__
      - entry_parser: '{{ .Values.promtail.entryParser }}'
        job_name: kubernetes-pods-indirect-controller
        kubernetes_sd_configs:
          - role: pod
        relabel_configs:
          - action: drop
            regex: .+
            separator: ''
            source_labels:
              - __meta_kubernetes_pod_label_name
              - __meta_kubernetes_pod_label_app
          - action: keep
            regex: ^([0-9a-z-.]+)(-[0-9a-f]{8,10})$
            source_labels:
              - __meta_kubernetes_pod_controller_name
          - action: replace
            regex: ^([0-9a-z-.]+)(-[0-9a-f]{8,10})$
            source_labels:
              - __meta_kubernetes_pod_controller_name
            target_label: __service__
          - source_labels:
              - __meta_kubernetes_pod_node_name
            target_label: __host__
          - action: drop
            regex: ^$
            source_labels:
              - __service__
          - action: replace
            replacement: $1
            separator: /
            source_labels:
              - __meta_kubernetes_namespace
              - __service__
            target_label: job
          - action: replace
            source_labels:
              - __meta_kubernetes_namespace
            target_label: namespace
          - action: replace
            source_labels:
              - __meta_kubernetes_pod_name
            target_label: instance
          - action: replace
            source_labels:
              - __meta_kubernetes_pod_container_name
            target_label: container_name
          - action: labelmap
            regex: __meta_kubernetes_pod_label_(.+)
          - replacement: /var/log/pods/$1/*.log
            separator: /
            source_labels:
              - __meta_kubernetes_pod_uid
              - __meta_kubernetes_pod_container_name
            target_label: __path__
```

</details>

---

# Loki Helm Chart

## Prerequisites

Make sure you have Helm [installed](https://helm.sh/docs/using_helm/#installing-helm) and
[deployed](https://helm.sh/docs/using_helm/#installing-tiller) to your cluster. Then add
Loki's chart repository to Helm:

```bash
$ helm repo add loki https://grafana.github.io/loki/charts
```

## Deploy Loki and Promtail to your cluster

```bash
$ helm upgrade --install loki loki/loki
```

## Deploy Grafana to your cluster

To install Grafana on your cluster with helm, use the following command:

```bash
$ helm install stable/grafana -n loki-grafana -f grafana.yaml --namespace <YOUR-NAMESPACE>
```

To get the admin password for the Grafana pod, run the following command:

```bash
$  kubectl get secret --namespace <YOUR-NAMESPACE> loki-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
```

To access the Grafana UI, run the following command:

```bash
$ kubectl port-forward --namespace <YOUR-NAMESPACE> service/loki-grafana 3000:80
```

Navigate to http://localhost:3000 and login with `admin` and the password output above.
Then follow the [instructions for adding the loki datasource](/docs/usage.md), using the URL `http://loki:3100/`.
