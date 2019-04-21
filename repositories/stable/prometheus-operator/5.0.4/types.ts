// Automatically generated

export interface ChartValues {
  additionalPrometheusRules?: any
  alertmanager?: {
    alertmanagerSpec?: {
      additionalPeers?: any
      configMaps?: any
      containers?: any
      externalUrl?: any
      image?: {
        repository?: any
        tag?: any
      }
      listenLocal?: any
      logLevel?: any
      nodeSelector?: any
      paused?: any
      podAntiAffinity?: any
      podAntiAffinityTopologyKey?: any
      podMetadata?: any
      priorityClassName?: any
      replicas?: any
      resources?: any
      retention?: any
      routePrefix?: any
      secrets?: any
      securityContext?: any
      storage?: any
      tolerations?: any
    }
    config?: any
    enabled?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      labels?: any
      tls?: any
    }
    podDisruptionBudget?: {
      enabled?: any
      maxUnavailable?: any
      minAvailable?: any
    }
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      nodePort?: any
      type?: any
    }
    serviceAccount?: {
      create?: any
      name?: any
    }
    serviceMonitor?: {
      interval?: any
      selfMonitor?: any
    }
    templateFiles?: any
  }
  commonLabels?: any
  coreDns?: {
    enabled?: any
    service?: {
      port?: any
      selector?: any
      targetPort?: any
    }
    serviceMonitor?: {
      interval?: any
    }
  }
  defaultRules?: {
    annotations?: any
    create?: any
    labels?: any
    rules?: {
      alertmanager?: any
      etcd?: any
      general?: any
      k8s?: any
      kubeApiserver?: any
      kubePrometheusNodeAlerting?: any
      kubePrometheusNodeRecording?: any
      kubeScheduler?: any
      kubernetesAbsent?: any
      kubernetesApps?: any
      kubernetesResources?: any
      kubernetesStorage?: any
      kubernetesSystem?: any
      node?: any
      prometheus?: any
      prometheusOperator?: any
    }
  }
  fullnameOverride?: any
  global?: {
    imagePullSecrets?: any
    rbac?: {
      create?: any
      pspEnabled?: any
    }
  }
  grafana?: {
    additionalDataSources?: any
    defaultDashboardsEnabled?: any
    enabled?: any
    serviceMonitor?: {
      interval?: any
      selfMonitor?: any
    }
    sidecar?: {
      dashboards?: {
        label?: any
      }
      datasources?: {
        enabled?: any
        label?: any
      }
    }
  }
  kubeApiServer?: {
    enabled?: any
    relabelings?: any
    serviceMonitor?: {
      interval?: any
      jobLabel?: any
      selector?: any
    }
    tlsConfig?: {
      insecureSkipVerify?: any
      serverName?: any
    }
  }
  kubeControllerManager?: {
    enabled?: any
    endpoints?: any
    service?: {
      port?: any
      selector?: any
      targetPort?: any
    }
    serviceMonitor?: {
      https?: any
      interval?: any
    }
  }
  kubeDns?: {
    enabled?: any
    service?: {
      selector?: any
    }
    serviceMonitor?: {
      interval?: any
    }
  }
  kubeEtcd?: {
    enabled?: any
    endpoints?: any
    service?: {
      port?: any
      selector?: any
      targetPort?: any
    }
    serviceMonitor?: {
      caFile?: any
      certFile?: any
      insecureSkipVerify?: any
      interval?: any
      keyFile?: any
      scheme?: any
      serverName?: any
    }
  }
  kubeScheduler?: {
    enabled?: any
    endpoints?: any
    service?: {
      port?: any
      selector?: any
      targetPort?: any
    }
    serviceMonitor?: {
      https?: any
      interval?: any
    }
  }
  kubeStateMetrics?: {
    enabled?: any
    serviceMonitor?: {
      interval?: any
    }
  }
  kubelet?: {
    enabled?: any
    namespace?: any
    serviceMonitor?: {
      cAdvisorMetricRelabelings?: any
      https?: any
      interval?: any
    }
  }
  nameOverride?: any
  nodeExporter?: {
    enabled?: any
    jobLabel?: any
    serviceMonitor?: {
      interval?: any
      metricRelabelings?: any
    }
  }
  prometheus?: {
    additionalServiceMonitors?: any
    enabled?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      labels?: any
      tls?: any
    }
    podDisruptionBudget?: {
      enabled?: any
      maxUnavailable?: any
      minAvailable?: any
    }
    prometheusSpec?: {
      additionalAlertManagerConfigs?: any
      additionalAlertRelabelConfigs?: any
      additionalScrapeConfigs?: any
      additionalScrapeConfigsExternal?: any
      alertingEndpoints?: any
      configMaps?: any
      containers?: any
      evaluationInterval?: any
      externalLabels?: any
      externalUrl?: any
      image?: {
        repository?: any
        tag?: any
      }
      listenLocal?: any
      logLevel?: any
      nodeSelector?: any
      paused?: any
      podAntiAffinity?: any
      podAntiAffinityTopologyKey?: any
      podMetadata?: any
      priorityClassName?: any
      query?: any
      remoteRead?: any
      remoteWrite?: any
      replicas?: any
      resources?: any
      retention?: any
      routePrefix?: any
      ruleNamespaceSelector?: any
      ruleSelector?: any
      ruleSelectorNilUsesHelmValues?: any
      scrapeInterval?: any
      secrets?: any
      securityContext?: any
      serviceMonitorNamespaceSelector?: any
      serviceMonitorSelector?: any
      serviceMonitorSelectorNilUsesHelmValues?: any
      storageSpec?: any
      thanos?: any
      tolerations?: any
    }
    rbac?: {
      roleNamespaces?: any
    }
    service?: {
      additionalPorts?: any
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      nodePort?: any
      sessionAffinity?: any
      targetPort?: any
      type?: any
    }
    serviceAccount?: {
      create?: any
      name?: any
    }
    serviceMonitor?: {
      interval?: any
      selfMonitor?: any
    }
  }
  prometheusOperator?: {
    affinity?: any
    cleanupCustomResource?: any
    configReloaderCpu?: any
    configReloaderMemory?: any
    configmapReloadImage?: {
      repository?: any
      tag?: any
    }
    crdApiGroup?: any
    createCustomResource?: any
    enabled?: any
    hyperkubeImage?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    kubeletService?: {
      enabled?: any
      namespace?: any
    }
    logFormat?: any
    logLevel?: any
    nodeSelector?: any
    podLabels?: any
    priorityClassName?: any
    prometheusConfigReloaderImage?: {
      repository?: any
      tag?: any
    }
    resources?: any
    securityContext?: any
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      nodePort?: any
      type?: any
    }
    serviceAccount?: {
      create?: any
      name?: any
    }
    serviceMonitor?: {
      interval?: any
      selfMonitor?: any
    }
    tolerations?: any
  }
}

