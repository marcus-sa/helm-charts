# `@helm-charts/ibm-charts-ibm-netcool-probe-dev`

IBM Netcool Probe for Kubernetes (Limited Use)

| Field               | Value                 |
| ------------------- | --------------------- |
| Repository Name     | ibm-charts            |
| Chart Name          | ibm-netcool-probe-dev |
| Chart Version       | 1.1.1                 |
| NPM Package Version | 0.1.0                 |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for probe_cluster.
# This is a YAML-formatted file.

#Docker image license acceptance
license: 'not accepted'

image:
  # Update repository to pull from private image repository
  repository: netcool-probe-messagebus
  tag: '7.0'
  pullPolicy: IfNotPresent

global:
  image:
    secretName: ''

netcool:
  primaryServer: NCOMS
  primaryHost: omnibus.service.netcool
  primaryPort: 4100
  backupServer: ''
  backupHost: ''
  backupPort: ''

probe:
  # Probe log level
  messageLevel: warn

logstashProbe:
  enabled: true
  replicaCount: 5
  service:
    type: NodePort
    externalPort: 80

  ingress:
    enabled: false
    # Used to create Ingress record (should used with service.type: ClusterIP).
    # Uncomment to configure multiple hostnames, annotations and tls and then
    # install using helm command line.
    hosts:
      - netcool-probe-logstash.local
    #annotations:
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
    #tls:
    # Secrets must be manually created in the namespace.
    # - secretName: logstash-probe-tls
    #   hosts:
    #     - netcool-probe-logstash.local

  # Autoscaling Configuration
  autoscaling:
    enabled: true
    minReplicas: 2
    maxReplicas: 6
    cpuUtil: 60
  # Pod disruption budget
  poddisruptionbudget:
    enabled: true
    minAvailable: 1

prometheusProbe:
  enabled: true
  replicaCount: 1
  service:
    type: NodePort
    externalPort: 80
  ingress:
    enabled: false
    # Used to create Ingress record (should used with service.type: ClusterIP).
    # Uncomment to configure multiple hostnames, annotations and tls and then
    # install using helm command line.
    hosts:
      - netcool-probe-prometheus.local
    #annotations:
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
    #tls:
    # Secrets must be manually created in the namespace.
    # - secretName: prometheus-probe-tls
    #   hosts:
    #     - netcool-probe-prometheus.local

  # Autoscaling Configuration
  autoscaling:
    enabled: true
    minReplicas: 1
    maxReplicas: 3
    cpuUtil: 60
  # Pod disruption budget
  poddisruptionbudget:
    enabled: true
    minAvailable: 1

# Resources settings
resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 100m
    memory: 128Mi

# Node affinity settings
# Specify architecture (amd64). Only amd64 arch is supported.
arch: amd64
```

</details>

---

# IBM Tivoli Netcool/OMNIbus Integration - Probe for monitoring Kubernetes (Limited Use)

This is a helm package for deploying a cluster of Probes for Message Bus
onto Kubernetes. These probes process events and alerts from
Logstash HTTP output and Prometheus Alertmanager to a Netcool Operations Insight operational dashboard.

A commercial version of this chart is available on [IBM PASSPORT ADVANTAGE](https://www-01.ibm.com/software/passportadvantage/). More info is available here: [IBM Tivoli Netcool/OMNIbus Probe for Kubernetes Helm Chart](https://www.ibm.com/support/knowledgecenter/en/SSSHTQ/omnibus/helms/kubernetes/wip/concept/kub_intro.html)

## Introduction

IBM?? Netcool?? Operations Insight enables IT and network operations teams to increase effectiveness, efficiency
and reliability by leveraging cognitive analytics capabilities to identify, isolate and resolve problems before
they impact your business. It provides a consolidated view across your local, cloud and hybrid environments and
delivers actionable insight into the health and performance of services and their associated dynamic network and
IT infrastructures. More information can be seen here: [IBM Marketplace - IT Operations Management](https://www.ibm.com/uk-en/marketplace/it-operations-management)

## Chart Details

- Deploys two probes onto Kubernetes to start two webhook endpoints to receive notification in a form of HTTP POST requests from Logstash and Prometheus Alert Manager.

- Each probe deployment is fronted by a service.

- This chart can be deployed more than once on the same namespace.

## Prerequisites

- This solution requires IBM Tivoli Netcool/OMNIbus ObjectServer to be created and running prior to installing the probe. To create and run the IBM Tivoli Netcool/OMNIbus ObjectServer, see installation instructions at [IBM Knowledge Center - Creating and running ObjectServers](https://www.ibm.com/support/knowledgecenter/en/SSSHTQ_8.1.0/com.ibm.netcool_OMNIbus.doc_8.1.0/omnibus/wip/install/task/omn_con_creatingsettingupobjserv.html).

- Scope-based Event Grouping automation is installed and enabled, see installation instructions at [IBM Knowledge Center - Installing scope-based event grouping](https://www.ibm.com/support/knowledgecenter/en/SSSHTQ_8.1.0/com.ibm.netcool_OMNIbus.doc_8.1.0/omnibus/wip/install/task/omn_con_ext_installingscopebasedegrp.html)

- Kubernetes 1.9.
- Tiller 2.7.2
- Logstash 5.5.1.
- Prometheus 2.0.0.
- Prometheus Alert Manager 0.13.0.
- Operator role is a minimum to install this chart. Cluster Admin role required to obtain the Node IP using `kubectl get nodes` command and to configure Prometheus Alert Manager and Logstash.

## Resources Required

- CPU Requested : 100m (100 millicpu)
- Memory Requested : 128Mi (~ 128 MB)

## Installing the Chart

To install the chart with the release name `my-probe`:

```bash
$ helm install --name my-probe stable/ibm-netcool-probe
```

The command deploys on the Kubernetes cluster in the default configuration. The configuration section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Verifying the Chart

See NOTES.txt associated with this chart for verification instructions

## Uninstalling the Chart

To uninstall the chart with the release name `my-probe`:

```bash
$ helm delete my-probe --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The integration requires configuration of the following components:

- This chart to deploy the Netcool/OMNIbus probes.
- Prometheus Alert Manager to add a new `receiver` to direct notification to the probe and apply Prometheus alert rules.
- Logstash pipeline to add a `http` output to send notification to the probe.

The following table lists the configurable parameters of this chart and their default values.

| Parameter                                          | Description                                                                                                                                                                                                                               | Default                          |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `image.repository`                                 | Probe image repository. Update this repository name to pull from a private image repository.                                                                                                                                              | `netcool-probe-messagebus`       |
| `image.pullPolicy`                                 | Image pull policy                                                                                                                                                                                                                         | `IfNotPresent`                   |
| `global.image.secretName`                          | Name of the Secret containing the Docker Config to pull image from a private repository. Leave blank if the probe image already exists in the local image repository or the Service Account has a been assigned with a Image Pull Secret. | `nil`                            |
| `license`                                          | The license state of the image being deployed. Enter `accept` to install and use the image.                                                                                                                                               | `not accepted`                   |
| `image.tag`                                        | Image tag                                                                                                                                                                                                                                 | `7.0`                            |
| `netcool.primaryServer`                            | The primary Netcool/OMNIbus server to connect to                                                                                                                                                                                          | `NCOMS`                          |
| `netcool.primaryHost`                              | The host of primary the Netcool/OMNIbus server                                                                                                                                                                                            | `omnibus.service.netcool`        |
| `netcool.primaryPort`                              | The port of the primary Netcool/OMNIbus server                                                                                                                                                                                            | `4100`                           |
| `netcool.backupServer`                             | The backup Netcool/OMNIbus server to connect to. If the backupServer, backupHost and backupPort parameters are defined, the probe will be configured to connect to a virtual object server pair called `AGG_P`.                           | `nil`                            |
| `netcool.backupHost`                               | The host of backup the Netcool/OMNIbus server                                                                                                                                                                                             | `nil`                            |
| `netcool.backupPort`                               | The port of the backup Netcool/OMNIbus server                                                                                                                                                                                             | `nil`                            |
| `logstashProbe.enabled`                            | Set to `true` to enable a probe for Logstash.                                                                                                                                                                                             | `true`                           |
| `logstashProbe.replicaCount`                       | Number of deployment replicas of the Logstash Probe.Ignored if `logstashProbe.autoscaling.enabled=true` and will use the `minReplicas` as the `replicaCount`.                                                                             | `5`                              |
| `logstashProbe.service.type`                       | Logstash probe service type. Options are `NodePort` or `ClusterIP`.                                                                                                                                                                       | `NodePort`                       |
| `logstashProbe.service.externalPort`               | Logstash probe external port that probe is running on                                                                                                                                                                                     | `80`                             |
| `logstashProbe.ingress.enabled`                    | Set to `true` to enable ingress. Use to create Ingress record (should used with service.type: ClusterIP) for Logstash probe.                                                                                                              | `false`                          |
| `logstashProbe.ingress.hosts`                      | Sets the virtual host names for the same IP address. Use command line installation to specify multiple hosts.                                                                                                                             | `netcool-probe-logstash.local`   |
| `logstashProbe.autoscaling.enabled`                | Set to `false` to disable auto-scaling                                                                                                                                                                                                    | true                             |
| `logstashProbe.autoscaling.minReplicas`            | Minimum number of probe replicas                                                                                                                                                                                                          | `2`                              |
| `logstashProbe.autoscaling.maxReplicas`            | Maximum number of probe replicas                                                                                                                                                                                                          | `6`                              |
| `logstashProbe.autoscaling.cpuUtil`                | The target CPU utilization                                                                                                                                                                                                                | 60%                              |
| `logstashProbe.poddisruptionbudget.enabled`        | Set to `false` to disable Pod Disruption Budget to maintain high availablity during a node maintenance.                                                                                                                                   | `true`                           |
| `logstashProbe.poddisruptionbudget.minAvailable`   | The number of minimum available number of pods during node drain. Can be set to a number or percentage, eg: 1 or 10%. Caution: Setting to 100% or equal to the number of replicas) may block node drains entirely.                        | `1`                              |
| `prometheusProbe.enabled`                          | Set to `true` to enable a probe for Prometheus.                                                                                                                                                                                           | `true`                           |
| `prometheusProbe.replicaCount`                     | Number of deployment replicas of the Prometheus Probe. Ignored if `prometheusProbe.autoscaling.enabled=true` and will use the `minReplicas` as the `replicaCount`.                                                                        | `1`                              |
| `prometheusProbe.service.type`                     | Prometheus probe service type. Options are `NodePort` or `ClusterIP`.                                                                                                                                                                     | `NodePort`                       |
| `prometheusProbe.service.externalPort`             | Prometheus probe external port that probe is running on                                                                                                                                                                                   | `80`                             |
| `prometheusProbe.ingress.enabled`                  | Set to `true` to enable ingress. Use to create Ingress record (should used with service.type: ClusterIP) for Prometheus probe.                                                                                                            | `false`                          |
| `prometheusProbe.ingress.hosts`                    | Sets the virtual host names for the same IP address.Use command line installation to specify multiple hosts.                                                                                                                              | `netcool-probe-prometheus.local` |
| `prometheusProbe.autoscaling.enabled`              | Set to `false` to disable auto-scaling                                                                                                                                                                                                    | true                             |
| `prometheusProbe.autoscaling.minReplicas`          | Minimum number of probe replicas                                                                                                                                                                                                          | `1`                              |
| `prometheusProbe.autoscaling.maxReplicas`          | Maximum number of probe replicas                                                                                                                                                                                                          | `3`                              |
| `prometheusProbe.autoscaling.cpuUtil`              | The target CPU utilization                                                                                                                                                                                                                | 60%                              |
| `prometheusProbe.poddisruptionbudget.enabled`      | Set to `false` to disable Pod Disruption Budget to maintain high availablity during a node maintenance.                                                                                                                                   | `true`                           |
| `prometheusProbe.poddisruptionbudget.minAvailable` | The number of minimum available number of pods during node drain. Can be set to a number or percentage, eg: 1 or 10%. Caution: Setting to 100% or equal to the number of replicas) may block node drains entirely.                        | `1`                              |
| `probe.messageLevel`                               | Probe log message level.                                                                                                                                                                                                                  | `warn`                           |
| `resources.limits.cpu`                             | Container CPU limit                                                                                                                                                                                                                       | 500m                             |
| `resources.limits.memory`                          | Container memory limit                                                                                                                                                                                                                    | 512Mi                            |
| `resources.requests.cpu`                           | Container CPU requested                                                                                                                                                                                                                   | 100m                             |
| `resources.requests.memory`                        | Container Memory requested                                                                                                                                                                                                                | 128Mi                            |
| `arch`                                             | Worker node architecture. Fixed to `amd64`.                                                                                                                                                                                               | `amd64`                          |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-probe -f my_values.yaml stable/ibm-netcool-probe
```

## Integrating Prometheus Alert Manager with Netcool Operations Insight

### Modifying Prometheus Alert Manager and Alert Rules Configuration

This procedure modifies the default Prometheus configuration.

1. Deploy the `ibm-netcool-probe` chart.

2. On a successful deployment, get the probe's Endpoint Host and Port from the Workloads > Deployments page. The full webhook URL should look like `http://<Ingress IP>:<NodePort>/probe/webhook/prometheus`.

3. Determine the Prometheus Alert Manager and Alert Rules config maps in the same namespace. In this procedure, the config maps in the `kube-system` namespace are `monitoring-prometheus-alertmanager` and `alert-rules` respectively.

4. Edit the Prometheus Alert Manager config map to add a new receiver in the receivers section. If a seperate Prometheus is deployed, determine the Alert Manager configmap and add the new receiver. To do this via the command line, configure `kubectl` client and follow the steps below.

5. Load the configmap into a file.

```bash
kubectl get configmaps monitoring-prometheus-alertmanager --namespace=kube-system -o yaml > alertmanager.yaml
```

6. Edit the `alertmanager.yaml` file and add a new webhook receiver configuration. Sample configmap configuration is shown below.

```bash
$ cat alertmanager.yaml
apiVersion: v1
data:
  alertmanager.yml: |-
    global:
    receivers:
    - name: 'netcool_probe'
      webhook_configs:
      - url: 'http://<kube-proxy-ip>:<node_port>/probe/webhook/prometheus'
        send_resolved: true

    route:
      group_wait: 10s
      group_interval: 5m
      receiver: 'netcool_probe'
      repeat_interval: 3h
kind: ConfigMap
metadata:
  creationTimestamp: 2018-04-18T02:38:14Z
  labels:
    app: adr-monitoring-prometheus
    chart: ibm-icpmonitoring-1.0.0
    component: alertmanager
    heritage: Tiller
    release: adr-monitoring
  name: adr-monitoring-prometheus-alertmanager
  namespace: icpnoi-ns
  resourceVersion: "6705334"
  selfLink: /api/v1/namespaces/icpnoi-ns/configmaps/adr-monitoring-prometheus-alertmanager
  uid: 8aef5f39-42b1-11e8-bd3d-0050569b6c73

```

> ** Note: ** The `send_resolved` flag should be set to `true` so that the probe receives resolution events.

7. Save the changes in the file and replace the config map using:

```bash
$ kubectl replace configmaps monitoring-prometheus-alertmanager --namespace=kube-system -f alertmanager.yaml

configmap "monitoring-prometheus-alertmanager" replaced
```

8. Load the `alert-rules` config map into a file, update the `data` section to add your alerting rules and save the file. Sample rules are shown below. **Note**: For Prometheus 1.8 and 2.0 has different alert-rules syntax. Both sample alert rules are shown below.

```
$ kubectl get configmaps alert-rules --namespace=kube-system -o yaml > alertrules.yaml
```

> > Sample alert-rules configmap for Prometheus 2.0

```bash
$ cat alertrules.yaml
apiVersion: v1
data:
  alert.rules: |-
    groups:
    - name: alertrules.rules
      rules:
      - alert: jenkins_down
        expr: absent(container_memory_usage_bytes{pod_name=~".*jenkins.*"})
        for: 30s
        labels:
          severity: critical
        annotations:
          description: Jenkins container is down for more than 30 seconds.
          summary: Jenkins down
          type: Container
      - alert: jenkins_high_cpu
        expr: sum(rate(container_cpu_usage_seconds_total{pod_name=~".*jenkins.*"}[1m]))
          / count(node_cpu{mode="system"}) * 100 > 70
        for: 30s
        labels:
          severity: warning
        annotations:
          description: Jenkins CPU usage is {{ humanize $value}}%.
          summary: Jenkins high CPU usage
          type: Container
      - alert: jenkins_high_memory
        expr: sum(container_memory_usage_bytes{pod_name=~".*jenkins.*"}) > 1.2e+09
        for: 30s
        labels:
          severity: warning
        annotations:
          description: Jenkins memory consumption is at {{ humanize $value}}.
          summary: Jenkins high memory usage
          type: Container
      - alert: container_restarts
        expr: delta(kube_pod_container_status_restarts[1h]) >= 1
        for: 10s
        labels:
          severity: warning
        annotations:
          description: The container {{ $labels.container }} in pod {{ $labels.pod }}
            has restarted at least {{ humanize $value}} times in the last hour on instance
            {{ $labels.instance }}.
          summary: Containers are restarting
      - alert: high_cpu_load
        expr: node_load1 > 1.5
        for: 30s
        labels:
          severity: critical
        annotations:
          description: Docker host is under high load, the avg load 1m is at {{ $value}}.
            Reported by instance {{ $labels.instance }} of job {{ $labels.job }}.
          summary: Server under high load
      - alert: high_memory_load
        expr: (sum(node_memory_MemTotal) - sum(node_memory_MemFree + node_memory_Buffers
          + node_memory_Cached)) / sum(node_memory_MemTotal) * 100 > 85
        for: 30s
        labels:
          severity: warning
        annotations:
          description: Docker host memory usage is {{ humanize $value}}%. Reported by
            instance {{ $labels.instance }} of job {{ $labels.job }}.
          summary: Server memory is almost full
      - alert: high_storage_load
        expr: (node_filesystem_size{fstype="aufs"} - node_filesystem_free{fstype="aufs"})
          / node_filesystem_size{fstype="aufs"} * 100 > 85
        for: 30s
        labels:
          severity: warning
        annotations:
          description: Docker host storage usage is {{ humanize $value}}%. Reported by
            instance {{ $labels.instance }} of job {{ $labels.job }}.
          summary: Server storage is almost full
      - alert: monitor_service_down
        expr: up == 0
        for: 30s
        labels:
          severity: critical
        annotations:
          description: Service {{ $labels.instance }} is down.
          summary: Monitor service non-operational

kind: ConfigMap
metadata:
  creationTimestamp: 2018-04-18T02:38:14Z
  labels:
    app: adr-monitoring-prometheus
    chart: ibm-icpmonitoring-1.0.0
    component: prometheus
    heritage: Tiller
    release: adr-monitoring
  name: adr-monitoring-prometheus-alertrules
  namespace: icpnoi-ns
  resourceVersion: "6704022"
  selfLink: /api/v1/namespaces/icpnoi-ns/configmaps/adr-monitoring-prometheus-alertrules
  uid: 8aee6593-42b1-11e8-bd3d-0050569b6c73
```

> > Sample alert-rules configmap for Prometheus 1.8

```bash
$ cat alertrules.yaml
apiVersion: v1
data:
  alert.rules: |-
    # Container rules
    ALERT jenkins_down
    IF absent(container_memory_usage_bytes{pod_name=~".*jenkins.*"})
    FOR 30s
    LABELS { severity = "critical" }
    ANNOTATIONS {
      summary = "Jenkins down",
      description = "Jenkins container is down for more than 30 seconds.",
      type = "Container"
    }

    ALERT jenkins_high_cpu
    IF sum(rate(container_cpu_usage_seconds_total{pod_name=~".*jenkins.*"}[1m])) / count(node_cpu{mode="system"}) * 100 > 70
    FOR 30s
    LABELS { severity = "warning" }
    ANNOTATIONS {
      summary = "Jenkins high CPU usage",
      description = "Jenkins CPU usage is {{ humanize $value}}%.",
      type = "Container"
    }

    ALERT jenkins_high_memory
    IF sum(container_memory_usage_bytes{pod_name=~".*jenkins.*"}) > 1200000000
    FOR 30s
    LABELS { severity = "warning" }
    ANNOTATIONS {
      summary = "Jenkins high memory usage",
      description = "Jenkins memory consumption is at {{ humanize $value}}.",
      type = "Container"
    }

    ALERT container_restarts
    IF delta(kube_pod_container_status_restarts[1h]) >= 1
    FOR 10s
    LABELS { severity = "warning" }
    ANNOTATIONS {
      summary = "Containers are restarting",
      description = "The container {{ $labels.container }} in pod {{ $labels.pod }} has restarted at least {{ humanize $value}} times in the last hour on instance {{ $labels.instance }}.",
    }

    # host rules
    ALERT high_cpu_load
      IF node_load1 > 1.5
      FOR 30s
      LABELS { severity = "critical" }
      ANNOTATIONS {
          summary = "Server under high load",
          description = "Docker host is under high load, the avg load 1m is at {{ $value}}. Reported by instance {{ $labels.instance }} of job {{ $labels.job }}.",
      }

    ALERT high_memory_load
      IF (sum(node_memory_MemTotal) - sum(node_memory_MemFree + node_memory_Buffers + node_memory_Cached) ) / sum(node_memory_MemTotal) * 100 > 85
      FOR 30s
      LABELS { severity = "warning" }
      ANNOTATIONS {
          summary = "Server memory is almost full",
          description = "Docker host memory usage is {{ humanize $value}}%. Reported by instance {{ $labels.instance }} of job {{ $labels.job }}.",
      }

    ALERT high_storage_load
      IF (node_filesystem_size{fstype="aufs"} - node_filesystem_free{fstype="aufs"}) / node_filesystem_size{fstype="aufs"}  * 100 > 85
      FOR 30s
      LABELS { severity = "warning" }
      ANNOTATIONS {
          summary = "Server storage is almost full",
          description = "Docker host storage usage is {{ humanize $value}}%. Reported by instance {{ $labels.instance }} of job {{ $labels.job }}.",
      }

    # Targets rules
    ALERT monitor_service_down
      IF up == 0
      FOR 30s
      LABELS { severity = "critical" }
      ANNOTATIONS {
          summary = "Monitor service non-operational",
          description = "Service {{ $labels.instance }} is down.",
      }

kind: ConfigMap
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","data":{"sample.rules":""},"kind":"ConfigMap","metadata":{"annotations":{},"labels":{"app":"monitoring-prometheus","component":"prometheus"},"name":"alert-rules","namespace":"kube-system"}}
  creationTimestamp: 2017-11-07T09:21:41Z
  labels:
    app: monitoring-prometheus
    component: prometheus
  name: alert-rules
  namespace: kube-system
  resourceVersion: "8419962"
  selfLink: /api/v1/namespaces/kube-system/configmaps/alert-rules
  uid: 10d8b029-c39d-11e7-a34e-005056a093bb
```

9. Replace the config map with the updated configuration.

```bash
kubectl replace confimaps alert-rules --namespace=kube-system -f alertrules.yaml

configmap "alert-rules" replaced
```

10. It usually takes a couple of minutes for the Prometheus to reload the updated config maps and apply the new configuration. Verify that Prometheus events appear on the OMNIbus Event List.

## Integrating Logstash with Netcool Operations Insight

### Modifying Logstash Configuration

This procedure modifies the Logstash configuration:

1. Deploy the `ibm-netcool-probe` chart.
2. After a successful deployment, get the probe's Endpoint Host and Port from the Workloads > Deployments page. The full webhook URL will be `http://<Ingress IP>:<NodePort>/probe/webhook/logstash`.

3. Determine the Logstash Pipeline config map in the same namespace. In this procedure, the config map in the `kube-system` namespace is `logstash-pipeline`. If a seperate Logstash is deployed, determine the pipeline configmap and add a new `http output`.

4. Edit the Logstash pipeline config map to add a new `http output`. To do this via the command line, configure `kubectl` client and follow the steps below:

5. Load the configmap into a file.

```bash
kubectl get configmaps logstash-pipeline --namespace=kube-system -o yaml > logstash-pipeline.yaml
```

6. Edit the `logstash-pipeline.yaml` and add the configuration - modify the output object to add a new `http output` object as shown below.

```json
    output {
      elasticsearch {
        index => "logstash-%{+YYYY.MM.dd}"
        hosts => "elasticsearch:9200"
      }
       http {
         url => "http://<kube-proxy-ip>:<node-port>/probe/webhook/logstash"
         format => "json"
         http_method => "post"
         pool_max_per_route => "5"
       }
    }
```

where 'kube-proxy-ip' is the IP address of the proxy server for the Kubernetes cluster. The 'node-port' is port number that the probe is receiving on, or the probe service external port, e.g. 31000.

> **Note**: (Optional) The pool_max_per_route is set to limit concurrent connection to the probe to 5 so that Logstash does not flood the probe which may cause event loss.

7. Save the changes in the file and replace the config map.

```bash
kubectl --namespace kube-system replace -f logstash-pipeline.yaml

configmap "logstash-pipeline" replaced
```

8. Logstash takes a minute or so to reload the new confugration. Check the logs to make sure there are no errors sending HTTP POST notifications to the probe.

## Limitations

- Only the AMD64 / x86_64 architecture is supported for IBM Tivoli Netcool/OMNIbus Message Bus Probe.
- Validated to Run on IBM Cloud Private 2.1.0.2 or newer.
- In Kubernetes 1.8, kubelet writes to journald for systems with systemd instead of logging to file in a directory monitored by Logstash. Hence, probe will not receive kubelet messages.

## Documentation

- IBM Tivoli Netcool/OMNIBus Probe for Kubernetes Helm Chart Knowledge Center [page](https://www.ibm.com/support/knowledgecenter/en/SSSHTQ/omnibus/helms/kubernetes/wip/concept/kub_intro.html)
- Obtaining the IBM Tivoli Netcool/OMNIBus Probe for Kubernetes Helm Chart (Commercial Edition) [Part Number](https://www.ibm.com/support/knowledgecenter/en/SSSHTQ/omnibus/helms/common/topicref/hlm_obtaining_ppa_package.html)

## Troubleshooting

Desribes the issues and steps to resolve an issue when deploying the probe chart.

| Problem                                                                                                                                         | Cause                                                                                                        | Resolution                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Probe logs shows an error when loading or reading rules file. Failed during field verification check. Fields `SiteName` and `ScopeID` not found | The OMNIbus Object Server event grouping automation is not installed, hence the required fields are missing. | Install the event grouping automation in your Object Server and redeploy the chart. |
