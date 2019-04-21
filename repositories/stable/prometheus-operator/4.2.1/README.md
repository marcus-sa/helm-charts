# `@helm-charts/stable-prometheus-operator`

Provides easy monitoring definitions for Kubernetes services, and deployment and management of Prometheus instances.

| Field               | Value               |
| ------------------- | ------------------- |
| Repository Name     | stable              |
| Chart Name          | prometheus-operator |
| Chart Version       | 4.2.1               |
| NPM Package Version | 0.1.0               |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for prometheus-operator.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

## Provide a name in place of prometheus-operator for `app:` labels
##
nameOverride: ''

## Provide a name to substitute for the full names of resources
##
fullnameOverride: ''

## Labels to apply to all resources
##
commonLabels: {}
# scmhash: abc123
# myLabel: aakkmd

## Create default rules for monitoring the cluster
##
defaultRules:
  create: true
  rules:
    alertmanager: true
    etcd: true
    general: true
    k8s: true
    kubeApiserver: true
    kubePrometheusNodeAlerting: true
    kubePrometheusNodeRecording: true
    kubeScheduler: true
    kubernetesAbsent: true
    kubernetesApps: true
    kubernetesResources: true
    kubernetesStorage: true
    kubernetesSystem: true
    node: true
    prometheusOperator: true
    prometheus: true
  ## Labels for default rules
  labels: {}
  ## Annotations for default rules
  annotations: {}

## Provide custom recording or alerting rules to be deployed into the cluster.
##
additionalPrometheusRules: []
#  - name: my-rule-file
#    groups:
#      - name: my_group
#        rules:
#        - record: my_record
#          expr: 100 * my_record

##
global:
  rbac:
    create: true
    pspEnabled: true

  ## Reference to one or more secrets to be used when pulling images
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  ##
  imagePullSecrets: []
  # - name: "image-pull-secret"

## Configuration for alertmanager
## ref: https://prometheus.io/docs/alerting/alertmanager/
##
alertmanager:
  ## Deploy alertmanager
  ##
  enabled: true

  ## Service account for Alertmanager to use.
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
  ##
  serviceAccount:
    create: true
    name: ''

  ## Configure pod disruption budgets for Alertmanager
  ## ref: https://kubernetes.io/docs/tasks/run-application/configure-pdb/#specifying-a-poddisruptionbudget
  ## This configuration is immutable once created and will require the PDB to be deleted to be changed
  ## https://github.com/kubernetes/kubernetes/issues/45398
  ##
  podDisruptionBudget:
    enabled: false
    minAvailable: 1
    maxUnavailable: ''

  ## Alertmanager configuration directives
  ## ref: https://prometheus.io/docs/alerting/configuration/#configuration-file
  ##      https://prometheus.io/webtools/alerting/routing-tree-editor/
  ##
  config:
    global:
      resolve_timeout: 5m
    route:
      group_by: ['job']
      group_wait: 30s
      group_interval: 5m
      repeat_interval: 12h
      receiver: 'null'
      routes:
        - match:
            alertname: Watchdog
          receiver: 'null'
    receivers:
      - name: 'null'

  ## Alertmanager template files to format alerts
  ## ref: https://prometheus.io/docs/alerting/notifications/
  ##      https://prometheus.io/docs/alerting/notification_examples/
  ##
  templateFiles: {}
  #
  # An example template:
  #   template_1.tmpl: |-
  #       {{ define "cluster" }}{{ .ExternalURL | reReplaceAll ".*alertmanager\\.(.*)" "$1" }}{{ end }}
  #
  #       {{ define "slack.myorg.text" }}
  #       {{- $root := . -}}
  #       {{ range .Alerts }}
  #         *Alert:* {{ .Annotations.summary }} - `{{ .Labels.severity }}`
  #         *Cluster:*  {{ template "cluster" $root }}
  #         *Description:* {{ .Annotations.description }}
  #         *Graph:* <{{ .GeneratorURL }}|:chart_with_upwards_trend:>
  #         *Runbook:* <{{ .Annotations.runbook }}|:spiral_note_pad:>
  #         *Details:*
  #           {{ range .Labels.SortedPairs }} • *{{ .Name }}:* `{{ .Value }}`
  #           {{ end }}

  ingress:
    enabled: false

    annotations: {}

    labels: {}

    ## Hosts must be provided if Ingress is enabled.
    ##
    hosts:
      []
      # - alertmanager.domain.com

    ## TLS configuration for Alertmanager Ingress
    ## Secret must be manually created in the namespace
    ##
    tls: []
    # - secretName: alertmanager-general-tls
    #   hosts:
    #   - alertmanager.example.com

  ## Configuration for Alertmanager service
  ##
  service:
    annotations: {}
    labels: {}
    clusterIP: ''

    ## Port to expose on each node
    ## Only used if service.type is 'NodePort'
    ##
    nodePort: 30903
    ## List of IP addresses at which the Prometheus server service is available
    ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
    ##
    externalIPs: []
    loadBalancerIP: ''
    loadBalancerSourceRanges: []
    ## Service type
    ##
    type: ClusterIP

  ## If true, create a serviceMonitor for alertmanager
  ##
  serviceMonitor:
    selfMonitor: true

  ## Settings affecting alertmanagerSpec
  ## ref: https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#alertmanagerspec
  ##
  alertmanagerSpec:
    ## Standard object’s metadata. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#metadata
    ## Metadata Labels and Annotations gets propagated to the Alertmanager pods.
    ##
    podMetadata: {}

    ## Image of Alertmanager
    ##
    image:
      repository: quay.io/prometheus/alertmanager
      tag: v0.16.1

    ## Secrets is a list of Secrets in the same namespace as the Alertmanager object, which shall be mounted into the
    ## Alertmanager Pods. The Secrets are mounted into /etc/alertmanager/secrets/.
    ##
    secrets: []

    ## ConfigMaps is a list of ConfigMaps in the same namespace as the Alertmanager object, which shall be mounted into the Alertmanager Pods.
    ## The ConfigMaps are mounted into /etc/alertmanager/configmaps/.
    ##
    configMaps: []

    ## Log level for Alertmanager to be configured with.
    ##
    logLevel: info

    ## Size is the expected size of the alertmanager cluster. The controller will eventually make the size of the
    ## running cluster equal to the expected size.
    replicas: 1

    ## Time duration Alertmanager shall retain data for. Default is '120h', and must match the regular expression
    ## [0-9]+(ms|s|m|h) (milliseconds seconds minutes hours).
    ##
    retention: 120h

    ## Storage is the definition of how storage will be used by the Alertmanager instances.
    ## ref: https://github.com/coreos/prometheus-operator/blob/master/Documentation/user-guides/storage.md
    ##
    storage: {}
    # volumeClaimTemplate:
    #   spec:
    #     storageClassName: gluster
    #     accessModes: ["ReadWriteOnce"]
    #     resources:
    #       requests:
    #         storage: 50Gi
    #   selector: {}

    ## 	The external URL the Alertmanager instances will be available under. This is necessary to generate correct URLs. This is necessary if Alertmanager is not served from root of a DNS name.	string	false
    ##
    externalUrl:

    ## 	The route prefix Alertmanager registers HTTP handlers for. This is useful, if using ExternalURL and a proxy is rewriting HTTP routes of a request, and the actual ExternalURL is still true,
    ## but the server serves requests under a different route prefix. For example for use with kubectl proxy.
    ##
    routePrefix: /

    ## If set to true all actions on the underlying managed objects are not going to be performed, except for delete actions.
    ##
    paused: false

    ## Define which Nodes the Pods are scheduled on.
    ## ref: https://kubernetes.io/docs/user-guide/node-selection/
    ##
    nodeSelector: {}

    ## Define resources requests and limits for single Pods.
    ## ref: https://kubernetes.io/docs/user-guide/compute-resources/
    ##
    resources: {}
    # requests:
    #   memory: 400Mi

    ## Pod anti-affinity can prevent the scheduler from placing Prometheus replicas on the same node.
    ## The default value "soft" means that the scheduler should *prefer* to not schedule two replica pods onto the same node but no guarantee is provided.
    ## The value "hard" means that the scheduler is *required* to not schedule two replica pods onto the same node.
    ## The value "" will disable pod anti-affinity so that no anti-affinity rules will be configured.
    ##
    podAntiAffinity: ''

    ## If anti-affinity is enabled sets the topologyKey to use for anti-affinity.
    ## This can be changed to, for example, failure-domain.beta.kubernetes.io/zone
    ##
    podAntiAffinityTopologyKey: kubernetes.io/hostname

    ## If specified, the pod's tolerations.
    ## ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
    ##
    tolerations: []
    # - key: "key"
    #   operator: "Equal"
    #   value: "value"
    #   effect: "NoSchedule"

    ## SecurityContext holds pod-level security attributes and common container settings.
    ## This defaults to non root user with uid 1000 and gid 2000.	*v1.PodSecurityContext	false
    ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
    ##
    securityContext:
      runAsNonRoot: true
      runAsUser: 1000
      fsGroup: 2000

    ## ListenLocal makes the Alertmanager server listen on loopback, so that it does not bind against the Pod IP.
    ## Note this is only for the Alertmanager UI, not the gossip communication.
    ##
    listenLocal: false

    ## Containers allows injecting additional containers. This is meant to allow adding an authentication proxy to an Alertmanager pod.
    ##
    containers: []

    ## Priority class assigned to the Pods
    ##
    priorityClassName: ''

    ## AdditionalPeers allows injecting a set of additional Alertmanagers to peer with to form a highly available cluster.
    ##
    additionalPeers: []

## Using default values from https://github.com/helm/charts/blob/master/stable/grafana/values.yaml
##
grafana:
  enabled: true

  ## Deploy default dashboards.
  ##
  defaultDashboardsEnabled: true

  adminPassword: prom-operator

  ingress:
    ## If true, Prometheus Ingress will be created
    ##
    enabled: false

    ## Annotations for Prometheus Ingress
    ##
    annotations:
      {}
      # kubernetes.io/ingress.class: nginx
      # kubernetes.io/tls-acme: "true"

    ## Labels to be added to the Ingress
    ##
    labels: {}

    ## Hostnames.
    ## Must be provided if Ingress is enable.
    ##
    # hosts:
    #   - prometheus.domain.com
    hosts: []

    ## TLS configuration for prometheus Ingress
    ## Secret must be manually created in the namespace
    ##
    tls: []
    # - secretName: prometheus-general-tls
    #   hosts:
    #   - prometheus.example.com

  sidecar:
    dashboards:
      enabled: true
      label: grafana_dashboard
    datasources:
      enabled: true
      label: grafana_datasource

  extraConfigmapMounts: []
  # - name: certs-configmap
  #   mountPath: /etc/grafana/ssl/
  #   configMap: certs-configmap
  #   readOnly: true

  ## If true, create a serviceMonitor for grafana
  ##
  serviceMonitor:
    selfMonitor: true

## Component scraping the kube api server
##
kubeApiServer:
  enabled: true
  tlsConfig:
    serverName: kubernetes
    insecureSkipVerify: false

  ## If your API endpoint address is not reachable (as in AKS) you can replace it with the kubernetes service
  ##
  relabelings: []
  # - sourceLabels:
  #     - __meta_kubernetes_namespace
  #     - __meta_kubernetes_service_name
  #     - __meta_kubernetes_endpoint_port_name
  #   action: keep
  #   regex: default;kubernetes;https
  # - targetLabel: __address__
  #   replacement: kubernetes.default.svc:443

  serviceMonitor:
    jobLabel: component
    selector:
      matchLabels:
        component: apiserver
        provider: kubernetes

## Component scraping the kubelet and kubelet-hosted cAdvisor
##
kubelet:
  enabled: true
  namespace: kube-system

  serviceMonitor:
    ## Enable scraping the kubelet over https. For requirements to enable this see
    ## https://github.com/coreos/prometheus-operator/issues/926
    ##
    https: false
    # cAdvisorMetricRelabelings:
    # - sourceLabels: [__name__, image]
    #   separator: ;
    #   regex: container_([a-z_]+);
    #   replacement: $1
    #   action: drop
    # - sourceLabels: [__name__]
    #   separator: ;
    #   regex: container_(network_tcp_usage_total|network_udp_usage_total|tasks_state|cpu_load_average_10s)
    #   replacement: $1
    #   action: drop

## Component scraping the kube controller manager
##
kubeControllerManager:
  enabled: true

  ## If your kube controller manager is not deployed as a pod, specify IPs it can be found on
  ##
  endpoints: []
  # - 10.141.4.22
  # - 10.141.4.23
  # - 10.141.4.24

  ## If using kubeControllerManager.endpoints only the port and targetPort are used
  ##
  service:
    port: 10252
    targetPort: 10252
    selector:
      k8s-app: kube-controller-manager
## Component scraping coreDns. Use either this or kubeDns
##
coreDns:
  enabled: true
  service:
    port: 9153
    targetPort: 9153
    selector:
      k8s-app: coredns

## Component scraping kubeDns. Use either this or coreDns
##
kubeDns:
  enabled: false
  service:
    selector:
      k8s-app: kube-dns
## Component scraping etcd
##
kubeEtcd:
  enabled: true

  ## If your etcd is not deployed as a pod, specify IPs it can be found on
  ##
  endpoints: []
  # - 10.141.4.22
  # - 10.141.4.23
  # - 10.141.4.24

  ## Etcd service. If using kubeEtcd.endpoints only the port and targetPort are used
  ##
  service:
    port: 4001
    targetPort: 4001
    selector:
      k8s-app: etcd-server

  ## Configure secure access to the etcd cluster by loading a secret into prometheus and
  ## specifying security configuration below. For example, with a secret named etcd-client-cert
  ##
  ## serviceMonitor:
  ##   scheme: https
  ##   insecureSkipVerify: false
  ##   serverName: localhost
  ##   caFile: /etc/prometheus/secrets/etcd-client-cert/etcd-ca
  ##   certFile: /etc/prometheus/secrets/etcd-client-cert/etcd-client
  ##   keyFile: /etc/prometheus/secrets/etcd-client-cert/etcd-client-key
  ##
  serviceMonitor:
    scheme: http
    insecureSkipVerify: false
    serverName: ''
    caFile: ''
    certFile: ''
    keyFile: ''

## Component scraping kube scheduler
##
kubeScheduler:
  enabled: true

  ## If your kube scheduler is not deployed as a pod, specify IPs it can be found on
  ##
  endpoints: []
  # - 10.141.4.22
  # - 10.141.4.23
  # - 10.141.4.24

  ## If using kubeScheduler.endpoints only the port and targetPort are used
  ##
  service:
    port: 10251
    targetPort: 10251
    selector:
      k8s-app: kube-scheduler

## Component scraping kube state metrics
##
kubeStateMetrics:
  enabled: true

## Configuration for kube-state-metrics subchart
##
kube-state-metrics:
  rbac:
    create: true
  podSecurityPolicy:
    enabled: true

## Deploy node exporter as a daemonset to all nodes
##
nodeExporter:
  enabled: true

  ## Use the value configured in prometheus-node-exporter.podLabels
  ##
  jobLabel: jobLabel

## Configuration for prometheus-node-exporter subchart
##
prometheus-node-exporter:
  podLabels:
    ## Add the 'node-exporter' label to be used by serviceMonitor to match standard common usage in rules and grafana dashboards
    ##
    jobLabel: node-exporter
  extraArgs:
    - --collector.filesystem.ignored-mount-points=^/(dev|proc|sys|var/lib/docker/.+)($|/)
    - --collector.filesystem.ignored-fs-types=^(autofs|binfmt_misc|cgroup|configfs|debugfs|devpts|devtmpfs|fusectl|hugetlbfs|mqueue|overlay|proc|procfs|pstore|rpc_pipefs|securityfs|sysfs|tracefs)$

## Manages Prometheus and Alertmanager components
##
prometheusOperator:
  enabled: true

  ## Service account for Alertmanager to use.
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
  ##
  serviceAccount:
    create: true
    name: ''

  ## Configuration for Prometheus operator service
  ##
  service:
    annotations: {}
    labels: {}
    clusterIP: ''

    ## Port to expose on each node
    ## Only used if service.type is 'NodePort'
    ##
    nodePort: 38080

    ## Additional ports to open for Prometheus service
    ## ref: https://kubernetes.io/docs/concepts/services-networking/service/#multi-port-services
    ##
    additionalPorts: []
    #  - name: thanos-cluster
    #    port: 10900
    #    nodePort: 30111

    ## Loadbalancer IP
    ## Only use if service.type is "loadbalancer"
    ##
    loadBalancerIP: ''
    loadBalancerSourceRanges: []

    ## Service type
    ## NodepPort, ClusterIP, loadbalancer
    ##
    type: ClusterIP

    ## List of IP addresses at which the Prometheus server service is available
    ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
    ##
    externalIPs: []

  ## Deploy CRDs used by Prometheus Operator.
  ##
  createCustomResource: true

  ## Customize CRDs API Group
  crdApiGroup: monitoring.coreos.com

  ## Attempt to clean up CRDs created by Prometheus Operator.
  ##
  cleanupCustomResource: false

  ## Labels to add to the operator pod
  ##
  podLabels: {}

  ## Assign a PriorityClassName to pods if set
  # priorityClassName: ""

  ## Define Log Format
  # Use logfmt (default) or json-formatted logging
  # logFormat: logfmt

  ## Decrease log verbosity to errors only
  # logLevel: error

  ## If true, the operator will create and maintain a service for scraping kubelets
  ## ref: https://github.com/coreos/prometheus-operator/blob/master/helm/prometheus-operator/README.md
  ##
  kubeletService:
    enabled: true
    namespace: kube-system

  ## Create a servicemonitor for the operator
  ##
  serviceMonitor:
    selfMonitor: true

  ## Resource limits & requests
  ##
  resources: {}
  # limits:
  #   cpu: 200m
  #   memory: 200Mi
  # requests:
  #   cpu: 100m
  #   memory: 100Mi

  ## Define which Nodes the Pods are scheduled on.
  ## ref: https://kubernetes.io/docs/user-guide/node-selection/
  ##
  nodeSelector: {}

  ## Tolerations for use with node taints
  ## ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
  ##
  tolerations: []
  # - key: "key"
  #   operator: "Equal"
  #   value: "value"
  #   effect: "NoSchedule"

  ## Assign the prometheus operator to run on specific nodes
  ## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
  ##
  affinity: {}
  # requiredDuringSchedulingIgnoredDuringExecution:
  #   nodeSelectorTerms:
  #   - matchExpressions:
  #     - key: kubernetes.io/e2e-az-name
  #       operator: In
  #       values:
  #       - e2e-az1
  #       - e2e-az2

  securityContext:
    runAsNonRoot: true
    runAsUser: 65534

  ## Prometheus-operator image
  ##
  image:
    repository: quay.io/coreos/prometheus-operator
    tag: v0.29.0
    pullPolicy: IfNotPresent

  ## Configmap-reload image to use for reloading configmaps
  ##
  configmapReloadImage:
    repository: quay.io/coreos/configmap-reload
    tag: v0.0.1

  ## Prometheus-config-reloader image to use for config and rule reloading
  ##
  prometheusConfigReloaderImage:
    repository: quay.io/coreos/prometheus-config-reloader
    tag: v0.29.0

  ## Hyperkube image to use when cleaning up
  ##
  hyperkubeImage:
    repository: k8s.gcr.io/hyperkube
    tag: v1.12.1
    pullPolicy: IfNotPresent

## Deploy a Prometheus instance
##
prometheus:
  enabled: true

  ## Service account for Prometheuses to use.
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
  ##
  serviceAccount:
    create: true
    name: ''

  ## Configuration for Prometheus service
  ##
  service:
    annotations: {}
    labels: {}
    clusterIP: ''

    ## To be used with a proxy extraContainer port
    targetPort: 9090

    ## List of IP addresses at which the Prometheus server service is available
    ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
    ##
    externalIPs: []

    ## Port to expose on each node
    ## Only used if service.type is 'NodePort'
    ##
    nodePort: 39090

    ## Loadbalancer IP
    ## Only use if service.type is "loadbalancer"
    loadBalancerIP: ''
    loadBalancerSourceRanges: []
    ## Service type
    ##
    type: ClusterIP

    sessionAffinity: ''

  rbac:
    ## Create role bindings in the specified namespaces, to allow Prometheus monitoring
    ## a role binding in the release namespace will always be created.
    ##
    roleNamespaces:
      - kube-system

  ## Configure pod disruption budgets for Prometheus
  ## ref: https://kubernetes.io/docs/tasks/run-application/configure-pdb/#specifying-a-poddisruptionbudget
  ## This configuration is immutable once created and will require the PDB to be deleted to be changed
  ## https://github.com/kubernetes/kubernetes/issues/45398
  ##
  podDisruptionBudget:
    enabled: false
    minAvailable: 1
    maxUnavailable: ''

  ingress:
    enabled: false
    annotations: {}
    labels: {}

    ## Hostnames.
    ## Must be provided if Ingress is enabled.
    ##
    # hosts:
    #   - prometheus.domain.com
    hosts: []

    ## TLS configuration for Prometheus Ingress
    ## Secret must be manually created in the namespace
    ##
    tls:
      []
      # - secretName: prometheus-general-tls
      #   hosts:
      #     - prometheus.example.com

  serviceMonitor:
    selfMonitor: true

  ## Settings affecting prometheusSpec
  ## ref: https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#prometheusspec
  ##
  prometheusSpec:
    ## Interval between consecutive scrapes.
    ##
    scrapeInterval: ''

    ## Interval between consecutive evaluations.
    ##
    evaluationInterval: ''

    ## ListenLocal makes the Prometheus server listen on loopback, so that it does not bind against the Pod IP.
    ##
    listenLocal: false

    ## Image of Prometheus.
    ##
    image:
      repository: quay.io/prometheus/prometheus
      tag: v2.7.1

    ## Tolerations for use with node taints
    ## ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
    ##
    tolerations: []
    #  - key: "key"
    #    operator: "Equal"
    #    value: "value"
    #    effect: "NoSchedule"

    ## Alertmanagers to which alerts will be sent
    ## ref: https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#alertmanagerendpoints
    ##
    ## Default configuration will connect to the alertmanager deployed as part of this release
    ##
    alertingEndpoints: []
    # - name: ""
    #   namespace: ""
    #   port: http
    #   scheme: http

    ## External labels to add to any time series or alerts when communicating with external systems
    ##
    externalLabels: {}

    ## External URL at which Prometheus will be reachable.
    ##
    externalUrl: ''

    ## Define which Nodes the Pods are scheduled on.
    ## ref: https://kubernetes.io/docs/user-guide/node-selection/
    ##
    nodeSelector: {}

    ## Secrets is a list of Secrets in the same namespace as the Prometheus object, which shall be mounted into the Prometheus Pods.
    ## The Secrets are mounted into /etc/prometheus/secrets/. Secrets changes after initial creation of a Prometheus object are not
    ## reflected in the running Pods. To change the secrets mounted into the Prometheus Pods, the object must be deleted and recreated
    ## with the new list of secrets.
    ##
    secrets: []

    ## ConfigMaps is a list of ConfigMaps in the same namespace as the Prometheus object, which shall be mounted into the Prometheus Pods.
    ## The ConfigMaps are mounted into /etc/prometheus/configmaps/.
    ##
    configMaps: []

    ## Namespaces to be selected for PrometheusRules discovery.
    ## If nil, select own namespace. Namespaces to be selected for ServiceMonitor discovery.
    ## See https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#namespaceselector for usage
    ##
    ruleNamespaceSelector: {}

    ## If true, a nil or {} value for prometheus.prometheusSpec.ruleSelector will cause the
    ## prometheus resource to be created with selectors based on values in the helm deployment,
    ## which will also match the PrometheusRule resources created
    ##
    ruleSelectorNilUsesHelmValues: true

    ## PrometheusRules to be selected for target discovery.
    ## If {}, select all ServiceMonitors
    ##
    ruleSelector: {}
    ## Example which select all prometheusrules resources
    ## with label "prometheus" with values any of "example-rules" or "example-rules-2"
    # ruleSelector:
    #   matchExpressions:
    #     - key: prometheus
    #       operator: In
    #       values:
    #         - example-rules
    #         - example-rules-2
    #
    ## Example which select all prometheusrules resources with label "role" set to "example-rules"
    # ruleSelector:
    #   matchLabels:
    #     role: example-rules

    ## If true, a nil or {} value for prometheus.prometheusSpec.serviceMonitorSelector will cause the
    ## prometheus resource to be created with selectors based on values in the helm deployment,
    ## which will also match the servicemonitors created
    ##
    serviceMonitorSelectorNilUsesHelmValues: true

    ## ServiceMonitors to be selected for target discovery.
    ## If {}, select all ServiceMonitors
    ##
    serviceMonitorSelector: {}
    ## Example which selects ServiceMonitors with label "prometheus" set to "somelabel"
    # serviceMonitorSelector:
    #   matchLabels:
    #     prometheus: somelabel

    ## Namespaces to be selected for ServiceMonitor discovery.
    ## See https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#namespaceselector for usage
    ##
    serviceMonitorNamespaceSelector: {}

    ## How long to retain metrics
    ##
    retention: 10d

    ## If true, the Operator won't process any Prometheus configuration changes
    ##
    paused: false

    ## Number of Prometheus replicas desired
    ##
    replicas: 1

    ## Log level for Prometheus be configured in
    ##
    logLevel: info

    ## Prefix used to register routes, overriding externalUrl route.
    ## Useful for proxies that rewrite URLs.
    ##
    routePrefix: /

    ## Standard object’s metadata. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#metadata
    ## Metadata Labels and Annotations gets propagated to the prometheus pods.
    ##
    podMetadata: {}
    # labels:
    #   app: prometheus
    #   k8s-app: prometheus

    ## Pod anti-affinity can prevent the scheduler from placing Prometheus replicas on the same node.
    ## The default value "soft" means that the scheduler should *prefer* to not schedule two replica pods onto the same node but no guarantee is provided.
    ## The value "hard" means that the scheduler is *required* to not schedule two replica pods onto the same node.
    ## The value "" will disable pod anti-affinity so that no anti-affinity rules will be configured.
    podAntiAffinity: ''

    ## If anti-affinity is enabled sets the topologyKey to use for anti-affinity.
    ## This can be changed to, for example, failure-domain.beta.kubernetes.io/zone
    ##
    podAntiAffinityTopologyKey: kubernetes.io/hostname

    ## The remote_read spec configuration for Prometheus.
    ## ref: https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#remotereadspec
    remoteRead: {}
    # - url: http://remote1/read

    ## The remote_write spec configuration for Prometheus.
    ## ref: https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#remotewritespec
    remoteWrite:
      {}
      # remoteWrite:
      #   - url: http://remote1/push

    ## Resource limits & requests
    ##
    resources: {}
    # requests:
    #   memory: 400Mi

    ## Prometheus StorageSpec for persistent data
    ## ref: https://github.com/coreos/prometheus-operator/blob/master/Documentation/user-guides/storage.md
    ##
    storageSpec: {}
    #  volumeClaimTemplate:
    #    spec:
    #      storageClassName: gluster
    #      accessModes: ["ReadWriteOnce"]
    #      resources:
    #        requests:
    #          storage: 50Gi
    #    selector: {}

    ## AdditionalScrapeConfigs allows specifying additional Prometheus scrape configurations. Scrape configurations
    ## are appended to the configurations generated by the Prometheus Operator. Job configurations must have the form
    ## as specified in the official Prometheus documentation:
    ## https://prometheus.io/docs/prometheus/latest/configuration/configuration/#<scrape_config>. As scrape configs are
    ## appended, the user is responsible to make sure it is valid. Note that using this feature may expose the possibility
    ## to break upgrades of Prometheus. It is advised to review Prometheus release notes to ensure that no incompatible
    ## scrape configs are going to break Prometheus after the upgrade.
    ##
    ## The scrape configuraiton example below will find master nodes, provided they have the name .*mst.*, relabel the
    ## port to 2379 and allow etcd scraping provided it is running on all Kubernetes master nodes
    ##
    additionalScrapeConfigs: []
    # - job_name: kube-etcd
    #   kubernetes_sd_configs:
    #     - role: node
    #   scheme: https
    #   tls_config:
    #     ca_file:   /etc/prometheus/secrets/etcd-client-cert/etcd-ca
    #     cert_file: /etc/prometheus/secrets/etcd-client-cert/etcd-client
    #     key_file:  /etc/prometheus/secrets/etcd-client-cert/etcd-client-key
    #   relabel_configs:
    #   - action: labelmap
    #     regex: __meta_kubernetes_node_label_(.+)
    #   - source_labels: [__address__]
    #     action: replace
    #     target_label: __address__
    #     regex: ([^:;]+):(\d+)
    #     replacement: ${1}:2379
    #   - source_labels: [__meta_kubernetes_node_name]
    #     action: keep
    #     regex: .*mst.*
    #   - source_labels: [__meta_kubernetes_node_name]
    #     action: replace
    #     target_label: node
    #     regex: (.*)
    #     replacement: ${1}
    #   metric_relabel_configs:
    #   - regex: (kubernetes_io_hostname|failure_domain_beta_kubernetes_io_region|beta_kubernetes_io_os|beta_kubernetes_io_arch|beta_kubernetes_io_instance_type|failure_domain_beta_kubernetes_io_zone)
    #     action: labeldrop

    ## AdditionalAlertManagerConfigs allows for manual configuration of alertmanager jobs in the form as specified
    ## in the official Prometheus documentation https://prometheus.io/docs/prometheus/latest/configuration/configuration/#<alertmanager_config>.
    ## AlertManager configurations specified are appended to the configurations generated by the Prometheus Operator.
    ## As AlertManager configs are appended, the user is responsible to make sure it is valid. Note that using this
    ## feature may expose the possibility to break upgrades of Prometheus. It is advised to review Prometheus release
    ## notes to ensure that no incompatible AlertManager configs are going to break Prometheus after the upgrade.
    ##
    additionalAlertManagerConfigs: []
    # - consul_sd_configs:
    #   - server: consul.dev.test:8500
    #     scheme: http
    #     datacenter: dev
    #     tag_separator: ','
    #     services:
    #       - metrics-prometheus-alertmanager

    ## AdditionalAlertRelabelConfigs allows specifying Prometheus alert relabel configurations. Alert relabel configurations specified are appended
    ## to the configurations generated by the Prometheus Operator. Alert relabel configurations specified must have the form as specified in the
    ## official Prometheus documentation: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#alert_relabel_configs.
    ## As alert relabel configs are appended, the user is responsible to make sure it is valid. Note that using this feature may expose the
    ## possibility to break upgrades of Prometheus. It is advised to review Prometheus release notes to ensure that no incompatible alert relabel
    ## configs are going to break Prometheus after the upgrade.
    ##
    additionalAlertRelabelConfigs: []
    # - separator: ;
    #   regex: prometheus_replica
    #   replacement: $1
    #   action: labeldrop

    ## SecurityContext holds pod-level security attributes and common container settings.
    ## This defaults to non root user with uid 1000 and gid 2000.
    ## https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md
    ##
    securityContext:
      runAsNonRoot: true
      runAsUser: 1000
      fsGroup: 2000

    ## 	Priority class assigned to the Pods
    ##
    priorityClassName: ''

    ## Thanos configuration allows configuring various aspects of a Prometheus server in a Thanos environment.
    ## This section is experimental, it may change significantly without deprecation notice in any release.
    ## This is experimental and may change significantly without backward compatibility in any release.
    ## ref: https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#thanosspec
    ##
    thanos: {}

    ## Containers allows injecting additional containers. This is meant to allow adding an authentication proxy to a Prometheus pod.
    ##  if using proxy extraContainer  update targetPort with proxy container port
    containers: []

    ## Enable additional scrape configs that are managed externally to this chart. Note that the prometheus
    ## will fail to provision if the correct secret does not exist.
    ##
    additionalScrapeConfigsExternal: false

  additionalServiceMonitors: []
  ## Name of the ServiceMonitor to create
  ##
  # - name: ""
  ## Additional labels to set used for the ServiceMonitorSelector. Together with standard labels from
  ## the chart
  ##
  # additionalLabels: {}
  ## Service label for use in assembling a job name of the form <label value>-<port>
  ## If no label is specified, the service name is used.
  ##
  # jobLabel: ""
  ## Label selector for services to which this ServiceMonitor applies
  ##
  # selector: {}
  ## Namespaces from which services are selected
  ##
  # namespaceSelector:
  ## Match any namespace
  ##
  # any: false
  ## Explicit list of namespace names to select
  ##
  # matchNames: []
  ## Endpoints of the selected service to be monitored
  ##
  # endpoints: []
  ## Name of the endpoint's service port
  ## Mutually exclusive with targetPort
  # - port: ""
  ## Name or number of the endpoint's target port
  ## Mutually exclusive with port
  # - targetPort: ""
  ## File containing bearer token to be used when scraping targets
  ##
  #   bearerTokenFile: ""
  ## Interval at which metrics should be scraped
  ##
  #   interval: 30s
  ## HTTP path to scrape for metrics
  ##
  #   path: /metrics
  ## HTTP scheme to use for scraping
  ##
  #   scheme: http
  ## TLS configuration to use when scraping the endpoint
  ##
  #   tlsConfig:
  ## Path to the CA file
  ##
  # caFile: ""
  ## Path to client certificate file
  ##
  # certFile: ""
  ## Skip certificate verification
  ##
  # insecureSkipVerify: false
  ## Path to client key file
  ##
  # keyFile: ""
  ## Server name used to verify host name
  ##
  # serverName: ""
```

</details>

---

# prometheus-operator

Installs [prometheus-operator](https://github.com/coreos/prometheus-operator) to create/configure/manage Prometheus clusters atop Kubernetes. This chart includes multiple components and is suitable for a variety of use-cases.

The default installation is intended to suit monitoring a kubernetes cluster the chart is deployed onto. It is closely matches the kube-prometheus project.

- [prometheus-operator](https://github.com/coreos/prometheus-operator)
- [prometheus](https://prometheus.io/)
- [alertmanager](https://prometheus.io/)
- [node-exporter](https://github.com/helm/charts/tree/master/stable/prometheus-node-exporter)
- [kube-state-metrics](https://github.com/helm/charts/tree/master/stable/kube-state-metrics)
- [grafana](https://github.com/helm/charts/tree/master/stable/grafana)
- service monitors to scrape internal kubernetes components
  - kube-apiserver
  - kube-scheduler
  - kube-controller-manager
  - etcd
  - kube-dns/coredns
    With the installation, the chart also includes dashboards and alerts.

The same chart can be used to run multiple prometheus instances in the same cluster if required. To achieve this, the other components need to be disabled - it is necessary to run only one instance of prometheus-operator and a pair of alertmanager pods for an HA configuration.

## TL;DR;

```console
$ helm install stable/prometheus-operator
```

## Introduction

This chart bootstraps a [prometheus-operator](https://github.com/coreos/prometheus-operator) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager. The chart can be installed multiple times to create separate Prometheus instances managed by Prometheus Operator.

## Prerequisites

- Kubernetes 1.10+ with Beta APIs
- Helm 2.10+ (For a workaround using an earlier version see [below](#helm-210-workaround))

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/prometheus-operator
```

The command deploys prometheus-operator on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

The default installation includes Prometheus Operator, Alertmanager, Grafana, and configuration for scraping Kubernetes infrastructure.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

CRDs created by this chart are not removed by default and should be manually cleaned up:

```
kubectl delete crd prometheuses.monitoring.coreos.com
kubectl delete crd prometheusrules.monitoring.coreos.com
kubectl delete crd servicemonitors.monitoring.coreos.com
kubectl delete crd alertmanagers.monitoring.coreos.com
```

## Configuration

The following tables lists the configurable parameters of the prometheus-operator chart and their default values.

### General

| Parameter                                        | Description                                                                                                                                        | Default |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `nameOverride`                                   | Provide a name in place of `prometheus-operator`                                                                                                   | `""`    |
| `fullNameOverride`                               | Provide a name to substitute for the full names of resources                                                                                       | `""`    |
| `commonLabels`                                   | Labels to apply to all resources                                                                                                                   | `[]`    |
| `defaultRules.create`                            | Create default rules for monitoring the cluster                                                                                                    | `true`  |
| `defaultRules.rules.alertmanager`                | Create default rules for Alert Manager                                                                                                             | `true`  |
| `defaultRules.rules.etcd`                        | Create default rules for ETCD                                                                                                                      | `true`  |
| `defaultRules.rules.general`                     | Create General default rules                                                                                                                       | `true`  |
| `defaultRules.rules.k8s`                         | Create K8S default rules                                                                                                                           | `true`  |
| `defaultRules.rules.kubeApiserver`               | Create Api Server default rules                                                                                                                    | `true`  |
| `defaultRules.rules.kubePrometheusNodeAlerting`  | Create Node Alerting default rules                                                                                                                 | `true`  |
| `defaultRules.rules.kubePrometheusNodeRecording` | Create Node Recording default rules                                                                                                                | `true`  |
| `defaultRules.rules.kubeScheduler`               | Create Kubernetes Scheduler default rules                                                                                                          | `true`  |
| `defaultRules.rules.kubernetesAbsent`            | Create Kubernetes Absent (example API Server down) default rules                                                                                   | `true`  |
| `defaultRules.rules.kubernetesApps`              | Create Kubernetes Apps default rules                                                                                                               | `true`  |
| `defaultRules.rules.kubernetesResources`         | Create Kubernetes Resources default rules                                                                                                          | `true`  |
| `defaultRules.rules.kubernetesStorage`           | Create Kubernetes Storage default rules                                                                                                            | `true`  |
| `defaultRules.rules.kubernetesSystem`            | Create Kubernetes System default rules                                                                                                             | `true`  |
| `defaultRules.rules.node`                        | Create Node default rules                                                                                                                          | `true`  |
| `defaultRules.rules.PrometheusOperator`          | Create Prometheus Operator default rules                                                                                                           | `true`  |
| `defaultRules.rules.prometheus`                  | Create Prometheus default rules                                                                                                                    | `true`  |
| `defaultRules.labels`                            | Labels for default rules for monitoring the cluster                                                                                                | `{}`    |
| `defaultRules.annotations`                       | Annotations for default rules for monitoring the cluster                                                                                           | `{}`    |
| `additionalPrometheusRules`                      | List of `prometheusRule` objects to create. See https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#prometheusrulespec. | `[]`    |
| `global.rbac.create`                             | Create RBAC resources                                                                                                                              | `true`  |
| `global.rbac.pspEnabled`                         | Create pod security policy resources                                                                                                               | `true`  |
| `global.imagePullSecrets`                        | Reference to one or more secrets to be used when pulling images                                                                                    | `[]`    |

### Prometheus Operator

| Parameter                                                     | Description                                                                                                                                                                                                                                                                                | Default                                      |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `prometheusOperator.enabled`                                  | Deploy Prometheus Operator. Only one of these should be deployed into the cluster                                                                                                                                                                                                          | `true`                                       |
| `prometheusOperator.serviceAccount`                           | Create a serviceaccount for the operator                                                                                                                                                                                                                                                   | `true`                                       |
| `prometheusOperator.name`                                     | Operator serviceAccount name                                                                                                                                                                                                                                                               | `""`                                         |
| `prometheusOperator.logFormat`                                | Operator log output formatting                                                                                                                                                                                                                                                             | `"logfmt"`                                   |
| `prometheusOperator.logLevel`                                 | Operator log level. Possible values: "all", "debug", "info", "warn", "error", "none"                                                                                                                                                                                                       | `"info"`                                     |
| `prometheusOperator.createCustomResource`                     | Create CRDs. Required if deploying anything besides the operator itself as part of the release. The operator will create / update these on startup. If your Helm version < 2.10 you will have to either create the CRDs first or deploy the operator first, then the rest of the resources | `true`                                       |
| `prometheusOperator.crdApiGroup`                              | Specify the API Group for the CustomResourceDefinitions                                                                                                                                                                                                                                    | `monitoring.coreos.com`                      |
| `prometheusOperator.cleanupCustomResource`                    | Attempt to delete CRDs when the release is removed. This option may be useful while testing but is not recommended, as deleting the CRD definition will delete resources and prevent the operator from being able to clean up resources that it manages                                    | `false`                                      |
| `prometheusOperator.podLabels`                                | Labels to add to the operator pod                                                                                                                                                                                                                                                          | `{}`                                         |
| `prometheusOperator.priorityClassName`                        | Name of Priority Class to assign pods                                                                                                                                                                                                                                                      | `nil`                                        |
| `prometheusOperator.kubeletService.enabled`                   | If true, the operator will create and maintain a service for scraping kubelets                                                                                                                                                                                                             | `true`                                       |
| `prometheusOperator.kubeletService.namespace`                 | Namespace to deploy kubelet service                                                                                                                                                                                                                                                        | `kube-system`                                |
| `prometheusOperator.serviceMonitor.selfMonitor`               | Enable monitoring of prometheus operator                                                                                                                                                                                                                                                   | `true`                                       |
| `prometheusOperator.service.type`                             | Prometheus operator service type                                                                                                                                                                                                                                                           | `ClusterIP`                                  |
| `prometheusOperator.service.clusterIP`                        | Prometheus operator service clusterIP IP                                                                                                                                                                                                                                                   | `""`                                         |
| `prometheusOperator.service.nodePort`                         | Port to expose prometheus operator service on each node                                                                                                                                                                                                                                    | `38080`                                      |
| `prometheusOperator.service.annotations`                      | Annotations to be added to the prometheus operator service                                                                                                                                                                                                                                 | `{}`                                         |
| `prometheusOperator.service.labels`                           | Prometheus Operator Service Labels                                                                                                                                                                                                                                                         | `{}`                                         |
| `prometheusOperator.service.externalIPs`                      | List of IP addresses at which the Prometheus Operator server service is available                                                                                                                                                                                                          | `[]`                                         |
| `prometheusOperator.service.loadBalancerIP`                   | Prometheus Operator Loadbalancer IP                                                                                                                                                                                                                                                        | `""`                                         |
| `prometheusOperator.service.loadBalancerSourceRanges`         | Prometheus Operator Load Balancer Source Ranges                                                                                                                                                                                                                                            | `[]`                                         |
| `prometheusOperator.resources`                                | Resource limits for prometheus operator                                                                                                                                                                                                                                                    | `{}`                                         |
| `prometheusOperator.securityContext`                          | SecurityContext for prometheus operator                                                                                                                                                                                                                                                    | `{"runAsNonRoot": true, "runAsUser": 65534}` |
| `prometheusOperator.nodeSelector`                             | Prometheus operator node selector https://kubernetes.io/docs/user-guide/node-selection/                                                                                                                                                                                                    | `{}`                                         |
| `prometheusOperator.tolerations`                              | Tolerations for use with node taints https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/                                                                                                                                                                               | `[]`                                         |
| `prometheusOperator.affinity`                                 | Assign the prometheus operator to run on specific nodes https://kubernetes.io/docs/concepts/configuration/assign-pod-node/                                                                                                                                                                 | `{}`                                         |
| `prometheusOperator.image.repository`                         | Repository for prometheus operator image                                                                                                                                                                                                                                                   | `quay.io/coreos/prometheus-operator`         |
| `prometheusOperator.image.tag`                                | Tag for prometheus operator image                                                                                                                                                                                                                                                          | `v0.29.0`                                    |
| `prometheusOperator.image.pullPolicy`                         | Pull policy for prometheus operator image                                                                                                                                                                                                                                                  | `IfNotPresent`                               |
| `prometheusOperator.configmapReloadImage.repository`          | Repository for configmapReload image                                                                                                                                                                                                                                                       | `quay.io/coreos/configmap-reload`            |
| `prometheusOperator.configmapReloadImage.tag`                 | Tag for configmapReload image                                                                                                                                                                                                                                                              | `v0.0.1`                                     |
| `prometheusOperator.prometheusConfigReloaderImage.repository` | Repository for config-reloader image                                                                                                                                                                                                                                                       | `quay.io/coreos/prometheus-config-reloader`  |
| `prometheusOperator.prometheusConfigReloaderImage.tag`        | Tag for config-reloader image                                                                                                                                                                                                                                                              | `v0.29.0`                                    |
| `prometheusOperator.hyperkubeImage.repository`                | Repository for hyperkube image used to perform maintenance tasks                                                                                                                                                                                                                           | `k8s.gcr.io/hyperkube`                       |
| `prometheusOperator.hyperkubeImage.tag`                       | Tag for hyperkube image used to perform maintenance tasks                                                                                                                                                                                                                                  | `v1.12.1`                                    |
| `prometheusOperator.hyperkubeImage.repository`                | Image pull policy for hyperkube image used to perform maintenance tasks                                                                                                                                                                                                                    | `IfNotPresent`                               |

### Prometheus

| Parameter                                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Default                                                      |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `prometheus.enabled`                                                | Deploy prometheus                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `true`                                                       |
| `prometheus.serviceMonitor.selfMonitor`                             | Create a `serviceMonitor` to automatically monitor the prometheus instance                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `true`                                                       |
| `prometheus.serviceAccount.create`                                  | Create a default serviceaccount for prometheus to use                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `true`                                                       |
| `prometheus.serviceAccount.name`                                    | Name for prometheus serviceaccount                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `""`                                                         |
| `prometheus.rbac.roleNamespaces`                                    | Create role bindings in the specified namespaces, to allow Prometheus monitoring a role binding in the release namespace will always be created.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `["kube-system"]`                                            |
| `prometheus.podDisruptionBudget.enabled`                            | If true, create a pod disruption budget for prometheus pods. The created resource cannot be modified once created - it must be deleted to perform a change                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `true`                                                       |
| `prometheus.podDisruptionBudget.minAvailable`                       | Minimum number / percentage of pods that should remain scheduled                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `1`                                                          |
| `prometheus.podDisruptionBudget.maxUnavailable`                     | Maximum number / percentage of pods that may be made unavailable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `""`                                                         |
| `prometheus.ingress.enabled`                                        | If true, Prometheus Ingress will be created                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `false`                                                      |
| `prometheus.ingress.annotations`                                    | Prometheus Ingress annotations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `{}`                                                         |
| `prometheus.ingress.labels`                                         | Prometheus Ingress additional labels                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `{}`                                                         |
| `prometheus.ingress.hosts`                                          | Prometheus Ingress hostnames                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `[]`                                                         |
| `prometheus.ingress.tls`                                            | Prometheus Ingress TLS configuration (YAML)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `[]`                                                         |
| `prometheus.service.type`                                           | Prometheus Service type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `ClusterIP`                                                  |
| `prometheus.service.clusterIP`                                      | Prometheus service clusterIP IP                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `""`                                                         |
| `prometheus.service.targetPort`                                     | Prometheus Service internal port                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `9090`                                                       |
| `prometheus.service.nodePort`                                       | Prometheus Service port for NodePort service type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `39090`                                                      |
| `prometheus.service.additionalPorts`                                | Additional Prometheus Service ports to add for NodePort service type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `[]`                                                         |
| `prometheus.service.annotations`                                    | Prometheus Service Annotations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `{}`                                                         |
| `prometheus.service.labels`                                         | Prometheus Service Labels                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `{}`                                                         |
| `prometheus.service.externalIPs`                                    | List of IP addresses at which the Prometheus server service is available                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `[]`                                                         |
| `prometheus.service.loadBalancerIP`                                 | Prometheus Loadbalancer IP                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `""`                                                         |
| `prometheus.service.loadBalancerSourceRanges`                       | Prometheus Load Balancer Source Ranges                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `[]`                                                         |
| `prometheus.service.sessionAffinity`                                | Prometheus Service Session Affinity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `""`                                                         |
| `prometheus.additionalServiceMonitors`                              | List of `serviceMonitor` objects to create. See https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#servicemonitorspec                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `[]`                                                         |
| `prometheus.prometheusSpec.podMetadata`                             | Standard object’s metadata. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#metadata Metadata Labels and Annotations gets propagated to the prometheus pods.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `{}`                                                         |
| `prometheus.prometheusSpec.serviceMonitorSelectorNilUsesHelmValues` | If true, a nil or {} value for prometheus.prometheusSpec.serviceMonitorSelector will cause the prometheus resource to be created with selectors based on values in the helm deployment, which will also match the servicemonitors created                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `true`                                                       |
| `prometheus.prometheusSpec.serviceMonitorSelector`                  | ServiceMonitors to be selected for target discovery. If {}, select all ServiceMonitors                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `{}`                                                         |
| `prometheus.prometheusSpec.serviceMonitorNamespaceSelector`         | Namespaces to be selected for ServiceMonitor discovery. See [namespaceSelector](https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#namespaceselector) for usage                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `{}`                                                         |
| `prometheus.prometheusSpec.image.repository`                        | Base image to use for a Prometheus deployment.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `quay.io/prometheus/prometheus`                              |
| `prometheus.prometheusSpec.image.tag`                               | Tag of Prometheus container image to be deployed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `v2.7.1`                                                     |
| `prometheus.prometheusSpec.paused`                                  | When a Prometheus deployment is paused, no actions except for deletion will be performed on the underlying objects.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `false`                                                      |
| `prometheus.prometheusSpec.replicas`                                | Number of instances to deploy for a Prometheus deployment.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `1`                                                          |
| `prometheus.prometheusSpec.retention`                               | Time duration Prometheus shall retain data for. Must match the regular expression `[0-9]+(ms\|s\|m\|h\|d\|w\|y)` (milliseconds seconds minutes hours days weeks years).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `120h`                                                       |
| `prometheus.prometheusSpec.logLevel`                                | Log level for Prometheus to be configured with.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `info`                                                       |
| `prometheus.prometheusSpec.scrapeInterval`                          | Interval between consecutive scrapes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `""`                                                         |
| `prometheus.prometheusSpec.evaluationInterval`                      | Interval between consecutive evaluations.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `""`                                                         |
| `prometheus.prometheusSpec.externalLabels`                          | The labels to add to any time series or alerts when communicating with external systems (federation, remote storage, Alertmanager).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `[]`                                                         |
| `prometheus.prometheusSpec.externalUrl`                             | The external URL the Prometheus instances will be available under. This is necessary to generate correct URLs. This is necessary if Prometheus is not served from root of a DNS name.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `""`                                                         |
| `prometheus.prometheusSpec.routePrefix`                             | The route prefix Prometheus registers HTTP handlers for. This is useful, if using ExternalURL and a proxy is rewriting HTTP routes of a request, and the actual ExternalURL is still true, but the server serves requests under a different route prefix. For example for use with `kubectl proxy`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `/`                                                          |
| `prometheus.prometheusSpec.storageSpec`                             | Storage spec to specify how storage shall be used.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `{}`                                                         |
| `prometheus.prometheusSpec.ruleSelectorNilUsesHelmValues`           | If true, a nil or {} value for prometheus.prometheusSpec.ruleSelector will cause the prometheus resource to be created with selectors based on values in the helm deployment, which will also match the PrometheusRule resources created.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `true`                                                       |
| `prometheus.prometheusSpec.ruleSelector`                            | A selector to select which PrometheusRules to mount for loading alerting rules from. Until (excluding) Prometheus Operator v0.24.0 Prometheus Operator will migrate any legacy rule ConfigMaps to PrometheusRule custom resources selected by RuleSelector. Make sure it does not match any config maps that you do not want to be migrated. If {}, select all PrometheusRules                                                                                                                                                                                                                                                                                                                                                                                                 | `{}`                                                         |
| `prometheus.prometheusSpec.ruleNamespaceSelector`                   | Namespaces to be selected for PrometheusRules discovery. If nil, select own namespace. See [namespaceSelector](https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#namespaceselector) for usage                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `{}`                                                         |
| `prometheus.prometheusSpec.alertingEndpoints`                       | Alertmanagers to which alerts will be sent https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#alertmanagerendpoints Default configuration will connect to the alertmanager deployed as part of this release                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `[]`                                                         |
| `prometheus.prometheusSpec.resources`                               | Define resources requests and limits for single Pods.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `{}`                                                         |
| `prometheus.prometheusSpec.nodeSelector`                            | Define which Nodes the Pods are scheduled on.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `{}`                                                         |
| `prometheus.prometheusSpec.secrets`                                 | Secrets is a list of Secrets in the same namespace as the Prometheus object, which shall be mounted into the Prometheus Pods. The Secrets are mounted into /etc/prometheus/secrets/<secret-name>. Secrets changes after initial creation of a Prometheus object are not reflected in the running Pods. To change the secrets mounted into the Prometheus Pods, the object must be deleted and recreated with the new list of secrets.                                                                                                                                                                                                                                                                                                                                          | `[]`                                                         |
| `prometheus.prometheusSpec.configMaps`                              | ConfigMaps is a list of ConfigMaps in the same namespace as the Prometheus object, which shall be mounted into the Prometheus Pods. The ConfigMaps are mounted into /etc/prometheus/configmaps/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `[]`                                                         |
| `prometheus.prometheusSpec.podAntiAffinity`                         | Pod anti-affinity can prevent the scheduler from placing Prometheus replicas on the same node. The default value "soft" means that the scheduler should _prefer_ to not schedule two replica pods onto the same node but no guarantee is provided. The value "hard" means that the scheduler is _required_ to not schedule two replica pods onto the same node. The value "" will disable pod anti-affinity so that no anti-affinity rules will be configured.                                                                                                                                                                                                                                                                                                                 | `""`                                                         |
| `prometheus.prometheusSpec.podAntiAffinityTopologyKey`              | If anti-affinity is enabled sets the topologyKey to use for anti-affinity. This can be changed to, for example `failure-domain.beta.kubernetes.io/zone`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `kubernetes.io/hostname`                                     |
| `prometheus.prometheusSpec.tolerations`                             | If specified, the pod's tolerations.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `[]`                                                         |
| `prometheus.prometheusSpec.remoteWrite`                             | If specified, the remote_write spec. This is an experimental feature, it may change in any upcoming release in a breaking way.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `[]`                                                         |
| `prometheus.prometheusSpec.remoteRead`                              | If specified, the remote_read spec. This is an experimental feature, it may change in any upcoming release in a breaking way.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `[]`                                                         |
| `prometheus.prometheusSpec.securityContext`                         | SecurityContext holds pod-level security attributes and common container settings. This defaults to non root user with uid 1000 and gid 2000 in order to support migration from operator version <0.26.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `{"runAsNonRoot": true, "runAsUser": 1000, "fsGroup": 2000}` |
| `prometheus.prometheusSpec.listenLocal`                             | ListenLocal makes the Prometheus server listen on loopback, so that it does not bind against the Pod IP.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `false`                                                      |
| `prometheus.prometheusSpec.containers`                              | Containers allows injecting additional containers. This is meant to allow adding an authentication proxy to a Prometheus pod.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `[]`                                                         |
| `prometheus.prometheusSpec.additionalScrapeConfigs`                 | AdditionalScrapeConfigs allows specifying additional Prometheus scrape configurations. Scrape configurations are appended to the configurations generated by the Prometheus Operator. Job configurations must have the form as specified in the official Prometheus documentation: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#<scrape_config>. As scrape configs are appended, the user is responsible to make sure it is valid. Note that using this feature may expose the possibility to break upgrades of Prometheus. It is advised to review Prometheus release notes to ensure that no incompatible scrape configs are going to break Prometheus after the upgrade.                                                                       | `{}`                                                         |
| `prometheus.prometheusSpec.additionalScrapeConfigsExternal`         | Enable additional scrape configs that are managed externally to this chart. Note that the prometheus will fail to provision if the correct secret does not exist.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `false`                                                      |
| `prometheus.prometheusSpec.additionalAlertManagerConfigs`           | AdditionalAlertManagerConfigs allows for manual configuration of alertmanager jobs in the form as specified in the official Prometheus documentation: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#<alertmanager_config>. AlertManager configurations specified are appended to the configurations generated by the Prometheus Operator. As AlertManager configs are appended, the user is responsible to make sure it is valid. Note that using this feature may expose the possibility to break upgrades of Prometheus. It is advised to review Prometheus release notes to ensure that no incompatible AlertManager configs are going to break Prometheus after the upgrade.                                                                   | `{}`                                                         |
| `prometheus.prometheusSpec.additionalAlertRelabelConfigs`           | AdditionalAlertRelabelConfigs allows specifying additional Prometheus alert relabel configurations. Alert relabel configurations specified are appended to the configurations generated by the Prometheus Operator. Alert relabel configurations specified must have the form as specified in the official Prometheus documentation: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#alert_relabel_configs. As alert relabel configs are appended, the user is responsible to make sure it is valid. Note that using this feature may expose the possibility to break upgrades of Prometheus. It is advised to review Prometheus release notes to ensure that no incompatible alert relabel configs are going to break Prometheus after the upgrade. | `[]`                                                         |
| `prometheus.prometheusSpec.thanos`                                  | Thanos configuration allows configuring various aspects of a Prometheus server in a Thanos environment. This section is experimental, it may change significantly without deprecation notice in any release.This is experimental and may change significantly without backward compatibility in any release. See https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#thanosspec                                                                                                                                                                                                                                                                                                                                                                     | `{}`                                                         |
| `prometheus.prometheusSpec.priorityClassName`                       | Priority class assigned to the Pods                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `""`                                                         |

### Alertmanager

| Parameter                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Default                                                                                                                                                                                                                                             |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alertmanager.enabled`                                 | Deploy alertmanager                                                                                                                                                                                                                                                                                                                                                                                                                                            | `true`                                                                                                                                                                                                                                              |
| `alertmanager.serviceMonitor.selfMonitor`              | Create a `serviceMonitor` to automatically monitor the alartmanager instance                                                                                                                                                                                                                                                                                                                                                                                   | `true`                                                                                                                                                                                                                                              |
| `alertmanager.serviceAccount.create`                   | Create a `serviceAccount` for alertmanager                                                                                                                                                                                                                                                                                                                                                                                                                     | `true`                                                                                                                                                                                                                                              |
| `alertmanager.serviceAccount.name`                     | Name for Alertmanager service account                                                                                                                                                                                                                                                                                                                                                                                                                          | `""`                                                                                                                                                                                                                                                |
| `alertmanager.podDisruptionBudget.enabled`             | If true, create a pod disruption budget for Alertmanager pods. The created resource cannot be modified once created - it must be deleted to perform a change                                                                                                                                                                                                                                                                                                   | `true`                                                                                                                                                                                                                                              |
| `alertmanager.podDisruptionBudget.minAvailable`        | Minimum number / percentage of pods that should remain scheduled                                                                                                                                                                                                                                                                                                                                                                                               | `1`                                                                                                                                                                                                                                                 |
| `alertmanager.podDisruptionBudget.maxUnavailable`      | Maximum number / percentage of pods that may be made unavailable                                                                                                                                                                                                                                                                                                                                                                                               | `""`                                                                                                                                                                                                                                                |
| `alertmanager.ingress.enabled`                         | If true, Alertmanager Ingress will be created                                                                                                                                                                                                                                                                                                                                                                                                                  | `false`                                                                                                                                                                                                                                             |
| `alertmanager.ingress.annotations`                     | Alertmanager Ingress annotations                                                                                                                                                                                                                                                                                                                                                                                                                               | `{}`                                                                                                                                                                                                                                                |
| `alertmanager.ingress.labels`                          | Alertmanager Ingress additional labels                                                                                                                                                                                                                                                                                                                                                                                                                         | `{}`                                                                                                                                                                                                                                                |
| `alertmanager.ingress.hosts`                           | Alertmanager Ingress hostnames                                                                                                                                                                                                                                                                                                                                                                                                                                 | `[]`                                                                                                                                                                                                                                                |
| `alertmanager.ingress.tls`                             | Alertmanager Ingress TLS configuration (YAML)                                                                                                                                                                                                                                                                                                                                                                                                                  | `[]`                                                                                                                                                                                                                                                |
| `alertmanager.service.type`                            | Alertmanager Service type                                                                                                                                                                                                                                                                                                                                                                                                                                      | `ClusterIP`                                                                                                                                                                                                                                         |
| `alertmanager.service.clusterIP`                       | Alertmanager service clusterIP IP                                                                                                                                                                                                                                                                                                                                                                                                                              | `""`                                                                                                                                                                                                                                                |
| `alertmanager.service.nodePort`                        | Alertmanager Service port for NodePort service type                                                                                                                                                                                                                                                                                                                                                                                                            | `30903`                                                                                                                                                                                                                                             |
| `alertmanager.service.annotations`                     | Alertmanager Service annotations                                                                                                                                                                                                                                                                                                                                                                                                                               | `{}`                                                                                                                                                                                                                                                |
| `alertmanager.service.labels`                          | Alertmanager Service Labels                                                                                                                                                                                                                                                                                                                                                                                                                                    | `{}`                                                                                                                                                                                                                                                |
| `alertmanager.service.externalIPs`                     | List of IP addresses at which the Alertmanager server service is available                                                                                                                                                                                                                                                                                                                                                                                     | `[]`                                                                                                                                                                                                                                                |
| `alertmanager.service.loadBalancerIP`                  | Alertmanager Loadbalancer IP                                                                                                                                                                                                                                                                                                                                                                                                                                   | `""`                                                                                                                                                                                                                                                |
| `alertmanager.service.loadBalancerSourceRanges`        | Alertmanager Load Balancer Source Ranges                                                                                                                                                                                                                                                                                                                                                                                                                       | `[]`                                                                                                                                                                                                                                                |
| `alertmanager.config`                                  | Provide YAML to configure Alertmanager. See https://prometheus.io/docs/alerting/configuration/#configuration-file. The default provided works to suppress the Watchdog alert from `defaultRules.create`                                                                                                                                                                                                                                                        | `{"global":{"resolve_timeout":"5m"},"route":{"group_by":["job"],"group_wait":"30s","group_interval":"5m","repeat_interval":"12h","receiver":"null","routes":[{"match":{"alertname":"Watchdog"},"receiver":"null"}]},"receivers":[{"name":"null"}]}` |
| `alertmanager.alertmanagerSpec.podMetadata`            | Standard object’s metadata. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#metadata Metadata Labels and Annotations gets propagated to the prometheus pods.                                                                                                                                                                                                                                              | `{}`                                                                                                                                                                                                                                                |
| `alertmanager.alertmanagerSpec.image.tag`              | Tag of Alertmanager container image to be deployed.                                                                                                                                                                                                                                                                                                                                                                                                            | `v0.16.1`                                                                                                                                                                                                                                           |
| `alertmanager.alertmanagerSpec.image.repository`       | Base image that is used to deploy pods, without tag.                                                                                                                                                                                                                                                                                                                                                                                                           | `quay.io/prometheus/alertmanager`                                                                                                                                                                                                                   |
| `alertmanager.alertmanagerSpec.secrets`                | Secrets is a list of Secrets in the same namespace as the Alertmanager object, which shall be mounted into the Alertmanager Pods. The Secrets are mounted into /etc/alertmanager/secrets/<secret-name>.                                                                                                                                                                                                                                                        | `[]`                                                                                                                                                                                                                                                |
| `alertmanager.alertmanagerSpec.configMaps`             | ConfigMaps is a list of ConfigMaps in the same namespace as the Alertmanager object, which shall be mounted into the Alertmanager Pods. The ConfigMaps are mounted into /etc/alertmanager/configmaps/                                                                                                                                                                                                                                                          | `[]`                                                                                                                                                                                                                                                |
| `alertmanager.alertmanagerSpec.logLevel`               | Log level for Alertmanager to be configured with.                                                                                                                                                                                                                                                                                                                                                                                                              | `info`                                                                                                                                                                                                                                              |
| `alertmanager.alertmanagerSpec.replicas`               | Size is the expected size of the alertmanager cluster. The controller will eventually make the size of the running cluster equal to the expected size.                                                                                                                                                                                                                                                                                                         | `1`                                                                                                                                                                                                                                                 |
| `alertmanager.alertmanagerSpec.retention`              | Time duration Alertmanager shall retain data for. Value must match the regular expression `[0-9]+(ms\|s\|m\|h)` (milliseconds seconds minutes hours).                                                                                                                                                                                                                                                                                                          | `120h`                                                                                                                                                                                                                                              |
| `alertmanager.alertmanagerSpec.storage`                | Storage is the definition of how storage will be used by the Alertmanager instances.                                                                                                                                                                                                                                                                                                                                                                           | `{}`                                                                                                                                                                                                                                                |
| `alertmanager.alertmanagerSpec.externalUrl`            | The external URL the Alertmanager instances will be available under. This is necessary to generate correct URLs. This is necessary if Alertmanager is not served from root of a DNS name.                                                                                                                                                                                                                                                                      | `""`                                                                                                                                                                                                                                                |
| `alertmanager.alertmanagerSpec.routePrefix`            | The route prefix Alertmanager registers HTTP handlers for. This is useful, if using ExternalURL and a proxy is rewriting HTTP routes of a request, and the actual ExternalURL is still true, but the server serves requests under a different route prefix. For example for use with `kubectl proxy`.                                                                                                                                                          | `/`                                                                                                                                                                                                                                                 |
| `alertmanager.alertmanagerSpec.paused`                 | If set to true all actions on the underlying managed objects are not going to be performed, except for delete actions.                                                                                                                                                                                                                                                                                                                                         | `false`                                                                                                                                                                                                                                             |
| `alertmanager.alertmanagerSpec.nodeSelector`           | Define which Nodes the Pods are scheduled on.                                                                                                                                                                                                                                                                                                                                                                                                                  | `{}`                                                                                                                                                                                                                                                |
| `alertmanager.alertmanagerSpec.resources`              | Define resources requests and limits for single Pods.                                                                                                                                                                                                                                                                                                                                                                                                          | `{}`                                                                                                                                                                                                                                                |
| `alertmanager.alertmanagerSpec.podAntiAffinity`        | Pod anti-affinity can prevent the scheduler from placing Prometheus replicas on the same node. The default value "soft" means that the scheduler should _prefer_ to not schedule two replica pods onto the same node but no guarantee is provided. The value "hard" means that the scheduler is _required_ to not schedule two replica pods onto the same node. The value "" will disable pod anti-affinity so that no anti-affinity rules will be configured. | `""`                                                                                                                                                                                                                                                |
| `prometheus.prometheusSpec.podAntiAffinityTopologyKey` | If anti-affinity is enabled sets the topologyKey to use for anti-affinity. This can be changed to, for example `failure-domain.beta.kubernetes.io/zone`                                                                                                                                                                                                                                                                                                        | `kubernetes.io/hostname`                                                                                                                                                                                                                            |
| `alertmanager.alertmanagerSpec.tolerations`            | If specified, the pod's tolerations.                                                                                                                                                                                                                                                                                                                                                                                                                           | `[]`                                                                                                                                                                                                                                                |
| `alertmanager.alertmanagerSpec.securityContext`        | SecurityContext holds pod-level security attributes and common container settings. This defaults to non root user with uid 1000 and gid 2000 in order to support migration from operator version < 0.26                                                                                                                                                                                                                                                        | `{"runAsNonRoot": true, "runAsUser": 1000, "fsGroup": 2000}`                                                                                                                                                                                        |
| `alertmanager.alertmanagerSpec.listenLocal`            | ListenLocal makes the Alertmanager server listen on loopback, so that it does not bind against the Pod IP. Note this is only for the Alertmanager UI, not the gossip communication.                                                                                                                                                                                                                                                                            | `false`                                                                                                                                                                                                                                             |
| `alertmanager.alertmanagerSpec.containers`             | Containers allows injecting additional containers. This is meant to allow adding an authentication proxy to an Alertmanager pod.                                                                                                                                                                                                                                                                                                                               | `[]`                                                                                                                                                                                                                                                |
| `alertmanager.alertmanagerSpec.priorityClassName`      | Priority class assigned to the Pods                                                                                                                                                                                                                                                                                                                                                                                                                            | `""`                                                                                                                                                                                                                                                |
| `alertmanager.alertmanagerSpec.additionalPeers`        | AdditionalPeers allows injecting a set of additional Alertmanagers to peer with to form a highly available cluster.                                                                                                                                                                                                                                                                                                                                            | `[]`                                                                                                                                                                                                                                                |

### Grafana

| Parameter                             | Description                                                                                                          | Default              |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `grafana.enabled`                     | If true, deploy the grafana sub-chart                                                                                | `true`               |
| `grafana.serviceMonitor.selfMonitor`  | Create a `serviceMonitor` to automatically monitor the grafana instance                                              | `true`               |
| `grafana.adminPassword`               | Admin password to log into the grafana UI                                                                            | "prom-operator"      |
| `grafana.defaultDashboardsEnabled`    | Deploy default dashboards. These are loaded using the sidecar                                                        | `true`               |
| `grafana.ingress.enabled`             | Enables Ingress for Grafana                                                                                          | `false`              |
| `grafana.ingress.annotations`         | Ingress annotations for Grafana                                                                                      | `{}`                 |
| `grafana.ingress.labels`              | Custom labels for Grafana Ingress                                                                                    | `{}`                 |
| `grafana.ingress.hosts`               | Ingress accepted hostnames for Grafana                                                                               | `[]`                 |
| `grafana.ingress.tls`                 | Ingress TLS configuration for Grafana                                                                                | `[]`                 |
| `grafana.sidecar.dashboards.enabled`  | Enable the Grafana sidecar to automatically load dashboards with a label `{{ grafana.sidecar.dashboards.label }}=1`  | `true`               |
| `grafana.sidecar.dashboards.label`    | If the sidecar is enabled, configmaps with this label will be loaded into Grafana as dashboards                      | `grafana_dashboard`  |
| `grafana.sidecar.datasources.enabled` | Enable the Grafana sidecar to automatically load dashboards with a label `{{ grafana.sidecar.datasources.label }}=1` | `true`               |
| `grafana.sidecar.datasources.label`   | If the sidecar is enabled, configmaps with this label will be loaded into Grafana as datasources configurations      | `grafana_datasource` |
| `grafana.rbac.pspUseAppArmor`         | Enforce AppArmor in created PodSecurityPolicy (requires rbac.pspEnabled)                                             | `true`               |
| `grafana.extraConfigmapMounts`        | Additional grafana server configMap volume mounts                                                                    | `[]`                 |

### Exporters

| Parameter                                          | Description                                                                                                                                               | Default                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kubeApiServer.enabled`                            | Deploy `serviceMonitor` to scrape the Kubernetes API server                                                                                               | `true`                                                                                                                                                                                                                                                                                      |
| `kubeApiServer.relabelings`                        | Relablings for the API Server ServiceMonitor                                                                                                              | `[]`                                                                                                                                                                                                                                                                                        |
| `kubeApiServer.tlsConfig.serverName`               | Name of the server to use when validating TLS certificate                                                                                                 | `kubernetes`                                                                                                                                                                                                                                                                                |
| `kubeApiServer.tlsConfig.insecureSkipVerify`       | Skip TLS certificate validation when scraping                                                                                                             | `false`                                                                                                                                                                                                                                                                                     |
| `kubeApiServer.serviceMonitor.jobLabel`            | The name of the label on the target service to use as the job name in prometheus                                                                          | `component`                                                                                                                                                                                                                                                                                 |
| `kubeApiServer.serviceMonitor.selector`            | The service selector                                                                                                                                      | `{"matchLabels":{"component":"apiserver","provider":"kubernetes"}}`                                                                                                                                                                                                                         |
| `kubelet.enabled`                                  | Deploy servicemonitor to scrape the kubelet service. See also `prometheusOperator.kubeletService`                                                         | `true`                                                                                                                                                                                                                                                                                      |
| `kubelet.namespace`                                | Namespace where the kubelet is deployed. See also `prometheusOperator.kubeletService.namespace`                                                           | `kube-system`                                                                                                                                                                                                                                                                               |
| `kubelet.serviceMonitor.https`                     | Enable scraping of the kubelet over HTTPS. For more information, see https://github.com/coreos/prometheus-operator/issues/926                             | `false`                                                                                                                                                                                                                                                                                     |
| `kubelet.serviceMonitor.cAdvisorMetricRelabelings` | The `metric_relabel_configs` for scraping cAdvisor.                                                                                                       | ``                                                                                                                                                                                                                                                                                          |
| `kubeControllerManager.enabled`                    | Deploy a `service` and `serviceMonitor` to scrape the Kubernetes controller-manager                                                                       | `true`                                                                                                                                                                                                                                                                                      |
| `kubeControllerManager.endpoints`                  | Endpoints where Controller-manager runs. Provide this if running Controller-manager outside the cluster                                                   | `[]`                                                                                                                                                                                                                                                                                        |
| `kubeControllermanager.service.port`               | Controller-manager port for the service runs on                                                                                                           | `10252`                                                                                                                                                                                                                                                                                     |
| `kubeControllermanager.service.targetPort`         | Controller-manager targetPort for the service runs on                                                                                                     | `10252`                                                                                                                                                                                                                                                                                     |
| `kubeControllermanager.service.selector`           | Controller-manager service selector                                                                                                                       | `{"k8s-app" : "kube-controller-manager" }`                                                                                                                                                                                                                                                  |
| `coreDns.enabled`                                  | Deploy coreDns scraping components. Use either this or kubeDns                                                                                            | true                                                                                                                                                                                                                                                                                        |
| `coreDns.service.port`                             | CoreDns port                                                                                                                                              | `9153`                                                                                                                                                                                                                                                                                      |
| `coreDns.service.targetPort`                       | CoreDns targetPort                                                                                                                                        | `9153`                                                                                                                                                                                                                                                                                      |
| `coreDns.service.selector`                         | CoreDns service selector                                                                                                                                  | `{"k8s-app" : "coredns" }`                                                                                                                                                                                                                                                                  |
| `kubeDns.enabled`                                  | Deploy kubeDns scraping components. Use either this or coreDns                                                                                            | `false`                                                                                                                                                                                                                                                                                     |
| `kubeDns.service.selector`                         | CoreDns service selector                                                                                                                                  | `{"k8s-app" : "kube-dns" }`                                                                                                                                                                                                                                                                 |
| `kubeEtcd.enabled`                                 | Deploy components to scrape etcd                                                                                                                          | `true`                                                                                                                                                                                                                                                                                      |
| `kubeEtcd.endpoints`                               | Endpoints where etcd runs. Provide this if running etcd outside the cluster                                                                               | `[]`                                                                                                                                                                                                                                                                                        |
| `kubeEtcd.service.port`                            | Etcd port                                                                                                                                                 | `4001`                                                                                                                                                                                                                                                                                      |
| `kubeEtcd.service.targetPort`                      | Etcd targetPort                                                                                                                                           | `4001`                                                                                                                                                                                                                                                                                      |
| `kubeEtcd.service.selector`                        | Selector for etcd if running inside the cluster                                                                                                           | `{"k8s-app":"etcd-server"}`                                                                                                                                                                                                                                                                 |
| `kubeEtcd.serviceMonitor.scheme`                   | Etcd servicemonitor scheme                                                                                                                                | `http`                                                                                                                                                                                                                                                                                      |
| `kubeEtcd.serviceMonitor.insecureSkipVerify`       | Skip validating etcd TLS certificate when scraping                                                                                                        | `false`                                                                                                                                                                                                                                                                                     |
| `kubeEtcd.serviceMonitor.serverName`               | Etcd server name to validate certificate against when scraping                                                                                            | `""`                                                                                                                                                                                                                                                                                        |
| `kubeEtcd.serviceMonitor.caFile`                   | Certificate authority file to use when connecting to etcd. See `prometheus.prometheusSpec.secrets`                                                        | `""`                                                                                                                                                                                                                                                                                        |
| `kubeEtcd.serviceMonitor.certFile`                 | Client certificate file to use when connecting to etcd. See `prometheus.prometheusSpec.secrets`                                                           | `""`                                                                                                                                                                                                                                                                                        |
| `kubeEtcd.serviceMonitor.keyFile`                  | Client key file to use when connecting to etcd. See `prometheus.prometheusSpec.secrets`                                                                   | `""`                                                                                                                                                                                                                                                                                        |
| `kubeScheduler.enabled`                            | Deploy a `service` and `serviceMonitor` to scrape the Kubernetes scheduler                                                                                | `true`                                                                                                                                                                                                                                                                                      |
| `kubeScheduler.endpoints`                          | Endpoints where scheduler runs. Provide this if running scheduler outside the cluster                                                                     | `[]`                                                                                                                                                                                                                                                                                        |
| `kubeScheduler.service.port`                       | Scheduler port for the service runs on                                                                                                                    | `10251`                                                                                                                                                                                                                                                                                     |
| `kubeScheduler.service.targetPort`                 | Scheduler targetPort for the service runs on                                                                                                              | `10251`                                                                                                                                                                                                                                                                                     |
| `kubeScheduler.service.selector`                   | Scheduler service selector                                                                                                                                | `{"k8s-app" : "kube-scheduler" }`                                                                                                                                                                                                                                                           |
| `kubeStateMetrics.enabled`                         | Deploy the `kube-state-metrics` chart and configure a servicemonitor to scrape                                                                            | `true`                                                                                                                                                                                                                                                                                      |
| `kube-state-metrics.rbac.create`                   | Create RBAC components in kube-state-metrics. See `global.rbac.create`                                                                                    | `true`                                                                                                                                                                                                                                                                                      |
| `kube-state-metrics.podSecurityPolicy.enabled`     | Create pod security policy resource for kube-state-metrics.                                                                                               | `true`                                                                                                                                                                                                                                                                                      |
| `nodeExporter.enabled`                             | Deploy the `prometheus-node-exporter` and scrape it                                                                                                       | `true`                                                                                                                                                                                                                                                                                      |
| `nodeExporter.jobLabel`                            | The name of the label on the target service to use as the job name in prometheus. See `prometheus-node-exporter.podLabels.jobLabel=node-exporter` default | `jobLabel`                                                                                                                                                                                                                                                                                  |
| `prometheus-node-exporter.podLabels`               | Additional labels for pods in the DaemonSet                                                                                                               | `{"jobLabel":"node-exporter"}`                                                                                                                                                                                                                                                              |
| `prometheus-node-exporter.extraArgs`               | Additional arguments for the node exporter container                                                                                                      | `["--collector.filesystem.ignored-mount-points=^/(dev|proc|sys|var/lib/docker/.+)($|/)", "--collector.filesystem.ignored-fs-types=^(autofs|binfmt_misc|cgroup|configfs|debugfs|devpts|devtmpfs|fusectl|hugetlbfs|mqueue|overlay|proc|procfs|pstore|rpc_pipefs|securityfs|sysfs|tracefs)$"]` |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release stable/prometheus-operator --set prometheusOperator.enabled=true
```

Alternatively, one or more YAML files that specify the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release stable/prometheus-operator -f values1.yaml,values2.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Developing Prometheus Rules and Grafana Dashboards

This chart Grafana Dashboards and Prometheus Rules are just a copy from coreos/prometheus-operator and other sources, synced (with alterations) by scripts in [hack](hack) folder. In order to introduce any changes you need to first [add them to original repo](https://github.com/coreos/prometheus-operator/blob/master/contrib/kube-prometheus/docs/developing-prometheus-rules-and-grafana-dashboards.md) and then sync there by scripts.

## Further Information

For more in-depth documentation of configuration options meanings, please see

- [Prometheus Operator](https://github.com/coreos/prometheus-operator)
- [Prometheus](https://prometheus.io/docs/introduction/overview/)
- [Grafana](https://github.com/helm/charts/tree/master/stable/grafana#grafana-helm-chart)

## Helm <2.10 workaround

The `crd-install` hook is required to deploy the prometheus operator CRDs before they are used. If you are forced to use an earlier version of Helm you can work around this requirement as follows:

1. Install prometheus-operator by itself, disabling everything but the prometheus-operator component, and also setting `prometheusOperator.serviceMonitor.selfMonitor=false`
2. Install all the other components, and configure `prometheus.additionalServiceMonitors` to scrape the prometheus-operator service.

# Migrating from coreos/prometheus-operator chart

The multiple charts have been combined into a single chart that installs prometheus operator, prometheus, alertmanager, grafana as well as the multitude of exporters necessary to monitor a cluster.

There is no simple and direct migration path between the charts as the changes are extensive and intended to make the chart easier to support.

The capabilities of the old chart are all available in the new chart, including the ability to run multiple prometheus instances on a single cluster - you will need to disable the parts of the chart you do not wish to deploy.

You can check out the tickets for this change [here](https://github.com/coreos/prometheus-operator/issues/592) and [here](https://github.com/helm/charts/pull/6765)

## High-level overview of Changes

The chart has 3 dependencies, that can be seen in the chart's requirements file:
https://github.com/helm/charts/blob/master/stable/prometheus-operator/requirements.yaml

### Node-Exporter, Kube-State-Metrics

These components are loaded as dependencies into the chart. The source for both charts is found in the same repository. They are relatively simple components.

### Grafana

The Grafana chart is more feature-rich than this chart - it contains a sidecar that is able to load data sources and dashboards from configmaps deployed into the same cluster. For more information check out the [documentation for the chart](https://github.com/helm/charts/tree/master/stable/grafana)

### Coreos CRDs

The CRDs are provisioned using crd-install hooks, rather than relying on a separate chart installation. If you already have these CRDs provisioned and don't want to remove them, you can disable the CRD creation by these hooks by passing `prometheusOperator.createCustomResource=false`

### Kubelet Service

Because the kubelet service has a new name in the chart, make sure to clean up the old kubelet service in the `kube-system` namespace to prevent counting container metrics twice

### Persistent Volumes

If you would like to keep the data of the current persistent volumes, it should be possible to attach existing volumes to new PVCs and PVs that are created using the conventions in the new chart. For example, in order to use an existing Azure disk for a helm release called `prometheus-migration` the following resources can be created:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pvc-prometheus-migration-prometheus-0
spec:
  accessModes:
  - ReadWriteOnce
  azureDisk:
    cachingMode: None
    diskName: pvc-prometheus-migration-prometheus-0
    diskURI: /subscriptions/f5125d82-2622-4c50-8d25-3f7ba3e9ac4b/resourceGroups/sample-migration-resource-group/providers/Microsoft.Compute/disks/pvc-prometheus-migration-prometheus-0
    fsType: ""
    kind: Managed
    readOnly: false
  capacity:
    storage: 1Gi
  persistentVolumeReclaimPolicy: Delete
  storageClassName: prometheus
  volumeMode: Filesystem
```

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  labels:
    app: prometheus
    prometheus: prometheus-migration-prometheus
  name: prometheus-prometheus-migration-prometheus-db-prometheus-prometheus-migration-prometheus-0
  namespace: monitoring
spec:
  accessModes:
  - ReadWriteOnce
  dataSource: null
  resources:
    requests:
      storage: 1Gi
  storageClassName: prometheus
  volumeMode: Filesystem
  volumeName: pvc-prometheus-migration-prometheus-0
status:
  accessModes:
  - ReadWriteOnce
  capacity:
    storage: 1Gi
```

The PVC will take ownership of the PV and when you create a release using a persistent volume claim template it will use the existing PVCs as they match the naming convention used by the chart. For other cloud providers similar approaches can be used.