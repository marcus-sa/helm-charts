// Automatically generated

export interface ChartValues {
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
      nodePort?: any
      type?: any
    }
    serviceAccount?: {
      create?: any
      name?: any
    }
    serviceMonitor?: {
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
  }
  defaultRules?: {
    create?: any
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
    defaultDashboardsEnabled?: any
    enabled?: any
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
    serviceMonitor?: {
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
    service?: {
      port?: any
      selector?: any
    }
  }
  kubeDns?: {
    enabled?: any
    service?: {
      selector?: any
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
      keyFile?: any
      scheme?: any
      serverName?: any
    }
  }
  kubeScheduler?: {
    enabled?: any
    service?: {
      port?: any
      selector?: any
      targetPort?: any
    }
  }
  kubeStateMetrics?: {
    enabled?: any
  }
  kubelet?: {
    enabled?: any
    namespace?: any
    serviceMonitor?: {
      https?: any
    }
  }
  nameOverride?: any
  nodeExporter?: {
    enabled?: any
    jobLabel?: any
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
      podMetadata?: any
      priorityClassName?: any
      remoteRead?: any
      remoteWrite?: any
      replicas?: any
      resources?: any
      retention?: any
      routePrefix?: any
      ruleNamespaceSelector?: any
      ruleSelector?: any
      scrapeInterval?: any
      secrets?: any
      securityContext?: any
      serviceMonitorNamespaceSelector?: any
      serviceMonitorSelector?: any
      storageSpec?: any
      thanos?: any
      tolerations?: any
    }
    rbac?: {
      roleNamespaces?: any
    }
    service?: {
      annotations?: any
      nodePort?: any
      type?: any
    }
    serviceAccount?: {
      create?: any
      name?: any
    }
    serviceMonitor?: {
      selfMonitor?: any
    }
  }
  prometheusOperator?: {
    affinity?: any
    cleanupCustomResource?: any
    configmapReloadImage?: {
      repository?: any
      tag?: any
    }
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
    nodeSelector?: any
    podLabels?: any
    prometheusConfigReloaderImage?: {
      repository?: any
      tag?: any
    }
    resources?: any
    service?: {
      annotations?: any
      nodePort?: any
      type?: any
    }
    serviceAccount?: {
      create?: any
      name?: any
    }
    serviceMonitor?: {
      selfMonitor?: any
    }
    tolerations?: any
  }
}

