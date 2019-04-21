// Automatically generated

export interface ChartValues {
  controller?: {
    config?: any
    defaultBackendService?: any
    extraArgs?: any
    hostNetwork?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    kind?: any
    name?: any
    nodeSelector?: any
    podAnnotations?: any
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
    serviceAccountName?: any
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
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      servicePort?: any
    }
  }
  nameOverride?: any
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
      type?: any
    }
    statusPage?: any
  }
  tcp?: any
  udp?: any
}

