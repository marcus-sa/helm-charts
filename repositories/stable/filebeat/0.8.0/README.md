# `@helm-charts/stable-filebeat`

A Helm chart to collect Kubernetes logs with filebeat

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | filebeat |
| Chart Version       | 0.8.0    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  repository: docker.elastic.co/beats/filebeat-oss
  tag: 6.3.2
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
        - /var/log/messages
        - /var/log/syslog
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

# Upload index template to Elasticsearch if Logstash output is enabled
# https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-template.html
# List of Elasticsearch hosts
indexTemplateLoad:
  []
  # - elasticsearch:9200

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

extraInitContainers:
  []
  # - name: echo
  #   image: busybox
  #   imagePullPolicy: Always
  #   args:
  #     - echo
  #     - hello

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

priorityClassName: ''

nodeSelector: {}

annotations: {}

tolerations:
  []
  # - operator: Exists

affinity: {}

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

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/filebeat
```

## Configuration

The following table lists the configurable parameters of the filebeat chart and their default values.

| Parameter                                           | Description                                                                      | Default                                |
| --------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------- |
| `image.repository`                                  | Docker image repo                                                                | `docker.elastic.co/beats/filebeat-oss` |
| `image.tag`                                         | Docker image tag                                                                 | `6.3.2`                                |
| `image.pullPolicy`                                  | Docker image pull policy                                                         | `IfNotPresent`                         |
| `config.filebeat.config.prospectors.path`           | Mounted `filebeat-prospectors` configmap                                         | `${path.config}/prospectors.d/*.yml`   |
| `config.filebeat.config.prospectors.reload.enabled` | Reload prospectors configs as they change                                        | `false`                                |
| `config.filebeat.config.modules.path`               |                                                                                  | `${path.config}/modules.d/*.yml`       |
| `config.filebeat.config.modules.reload.enabled`     | Reload module configs as they change                                             | `false`                                |
| `config.processors`                                 |                                                                                  | `- add_cloud_metadata`                 |
| `config.filebeat.prospectors`                       |                                                                                  | see values.yaml                        |
| `config.output.file.path`                           |                                                                                  | `"/usr/share/filebeat/data"`           |
| `config.output.file.filename`                       |                                                                                  | `filebeat`                             |
| `config.output.file.rotate_every_kb`                |                                                                                  | `10000`                                |
| `config.output.file.number_of_files`                |                                                                                  | `5`                                    |
| `config.http.enabled`                               |                                                                                  | `false`                                |
| `config.http.port`                                  |                                                                                  | `5066`                                 |
| `indexTemplateLoad`                                 | List of Elasticsearch hosts to load index template, when logstash output is used | `[]`                                   |
| `plugins`                                           | List of beat plugins                                                             | `[]`                                   |
| `extraVars`                                         | A map of additional environment variables                                        | `{}`                                   |
| `extraVolumes`                                      | Add additional volumes                                                           | `[]`                                   |
| `extraVolumeMounts`                                 | Add additional mounts                                                            | `[]`                                   |
| `extraInitContainers`                               | Add additional initContainers                                                    | `[]`                                   |
| `resources`                                         |                                                                                  | `{}`                                   |
| `priorityClassName`                                 | priorityClassName                                                                | `nil`                                  |
| `nodeSelector`                                      |                                                                                  | `{}`                                   |
| `annotations`                                       |                                                                                  | `{}`                                   |
| `tolerations`                                       |                                                                                  | `[]`                                   |
| `affinity`                                          |                                                                                  | `{}`                                   |
| `rbac.create`                                       | Specifies whether RBAC resources should be created                               | `true`                                 |
| `serviceAccount.create`                             | Specifies whether a ServiceAccount should be created                             | `true`                                 |
| `serviceAccount.name`                               | he name of the ServiceAccount to use                                             | `""`                                   |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/filebeat
```
