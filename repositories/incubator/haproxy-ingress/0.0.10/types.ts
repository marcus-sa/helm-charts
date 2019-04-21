// Automatically generated

export interface ChartValues {
  controller?: {
    accessLogsSidecar?: any
    affinity?: any
    autoscaling?: {
      customMetrics?: any
      enabled?: any
      maxReplicas?: any
      minReplicas?: any
      targetCPUUtilizationPercentage?: any
      targetMemoryUtilizationPercentage?: any
    }
    config?: any
    daemonset?: {
      hostPorts?: {
        http?: any
        https?: any
        tcp?: any
      }
      useHostPort?: any
    }
    defaultBackendService?: any
    dnsPolicy?: any
    enableStaticPorts?: any
    extraArgs?: any
    extraEnvs?: any
    healthzPort?: any
    hostNetwork?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    ingressClass?: any
    initContainers?: any
    kind?: any
    livenessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      path?: any
      periodSeconds?: any
      port?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    metrics?: {
      enabled?: any
      image?: {
        pullPolicy?: any
        repository?: any
        tag?: any
      }
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
    minAvailable?: any
    minReadySeconds?: any
    name?: any
    nodeSelector?: any
    podAffinity?: any
    podAnnotations?: any
    podLabels?: any
    priorityClassName?: any
    readinessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      path?: any
      periodSeconds?: any
      port?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    replicaCount?: any
    resources?: any
    securityContext?: any
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      externalTrafficPolicy?: any
      healthCheckNodePort?: any
      httpPorts?: any
      httpsPorts?: any
      labels?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      nodePorts?: {
        http?: any
        https?: any
      }
      type?: any
    }
    stats?: {
      enabled?: any
      port?: any
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
    tcp?: any
    template?: any
    tolerations?: any
    updateStrategy?: any
  }
  defaultBackend?: {
    affinity?: any
    enabled?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    minAvailable?: any
    name?: any
    nodeSelector?: any
    podAnnotations?: any
    podLabels?: any
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
  fullnameOverride?: any
  nameOverride?: any
  rbac?: {
    create?: any
    security?: {
      enable?: any
    }
  }
  revisionHistoryLimit?: any
  serviceAccount?: {
    create?: any
    name?: any
  }
}

