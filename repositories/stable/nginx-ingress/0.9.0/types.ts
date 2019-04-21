// Automatically generated

export interface ChartValues {
  controller?: {
    autoscaling?: {
      enabled?: any
      maxReplicas?: any
      minReplicas?: any
      targetAverageUtilization?: any
    }
    config?: any
    customTemplate?: {
      configMapKey?: any
      configMapName?: any
    }
    daemonset?: {
      useHostPorts?: any
    }
    defaultBackendService?: any
    electionID?: any
    extraArgs?: any
    extraEnvs?: any
    headers?: any
    hostNetwork?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    ingressClass?: any
    kind?: any
    lifecycle?: any
    minReadySeconds?: any
    name?: any
    nodeSelector?: any
    podAnnotations?: any
    podLabels?: any
    publishService?: {
      enabled?: any
      pathOverride?: any
    }
    replicaCount?: any
    resources?: any
    scope?: {
      enabled?: any
      namespace?: any
    }
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      externalTrafficPolicy?: any
      healthCheckNodePort?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      nodePorts?: {
        http?: any
        https?: any
      }
      targetPorts?: {
        http?: any
        https?: any
      }
      type?: any
    }
    stats?: {
      enabled?: any
      service?: {
        annotations?: any
        clusterIP?: any
        externalIPs?: any
        loadBalancerIP?: any
        loadBalancerSourceRanges?: any
        servicePort?: any
        type?: any
      }
    }
    tolerations?: any
    updateStrategy?: any
  }
  defaultBackend?: {
    enabled?: any
    extraArgs?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    nodeSelector?: any
    podAnnotations?: any
    podLabels?: any
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      servicePort?: any
      type?: any
    }
    tolerations?: any
  }
  nameOverride?: any
  rbac?: {
    create?: any
    serviceAccountName?: any
  }
  revisionHistoryLimit?: any
  statsExporter?: {
    endpoint?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    metricsNamespace?: any
    name?: any
    resources?: any
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      servicePort?: any
      targetPort?: any
      type?: any
    }
    statusPage?: any
  }
  tcp?: any
  udp?: any
}

