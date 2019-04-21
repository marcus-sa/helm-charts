# `@helm-charts/stable-filebeat`

A Helm chart to collect Kubernetes logs with filebeat

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | filebeat |
| Chart Version       | 0.3.0    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  repository: docker.elastic.co/beats/filebeat
  tag: 6.2.3
  pullPolicy: IfNotPresent

config:
  filebeat.config:
    prospectors:
      # Mounted `filebeat-prospectors` configmap:
      path: ${path.config}/prospectors.d/*.yml
      # Reload prospectors configs as they change:
      reload.enabled: false
    modules:
      path: ${path.config}/modules.d/*.yml
      # Reload module configs as they change:
      reload.enabled: false

  processors:
    - add_cloud_metadata:

  filebeat.prospectors:
    - type: log
      enabled: true
      paths:
        - /var/log/*.log
    - type: docker
      containers.ids:
        - '*'
      processors:
        - add_kubernetes_metadata:
            in_cluster: true
        - drop_event:
            when:
              equals:
                kubernetes.container.name: 'filebeat'

  output.file:
    path: '/usr/share/filebeat/data'
    filename: filebeat
    rotate_every_kb: 10000
    number_of_files: 5

  # When a key contains a period, use this format for setting values on the command line:
  # --set config."http\.enabled"=true
  http.enabled: false
  http.port: 5066

# List of beat plugins
plugins:
  []
  # - kinesis.so

# A map of additional environment variables
extraVars:
  {}
  # test1: "test2"

# Add additional volumes and mounts, for example to read other log files on the host
extraVolumes:
  []
  # - hostPath:
  #     path: /var/log
  #   name: varlog
extraVolumeMounts:
  []
  # - name: varlog
  #   mountPath: /host/var/log
  #   readOnly: true

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

# Filebeat

[filebeat](https://www.elastic.co/guide/en/beats/filebeat/current/index.html) is used to ship Kubernetes and host logs to multiple outputs.

## Prerequisites

- Kubernetes 1.9+

## Note

By default this chart only ships a single output to a file on the local system. Users should set config.output.file.enabled=false and configure their own outputs as [documented](https://www.elastic.co/guide/en/beats/filebeat/current/configuring-output.html)
