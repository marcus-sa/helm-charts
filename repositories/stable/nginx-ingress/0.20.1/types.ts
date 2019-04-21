// Automatically generated

export interface ChartValues {
  controller?: {
    affinity?: any
    autoscaling?: {
      enabled?: any
      maxReplicas?: any
      minReplicas?: any
      targetCPUUtilizationPercentage?: any
      targetMemoryUtilizationPercentage?: any
    }
    config?: any
    customTemplate?: {
      configMapKey?: any
      configMapName?: any
    }
    daemonset?: {
      useHostPort?: any
    }
    defaultBackendService?: any
    dnsPolicy?: any
    electionID?: any
    extraArgs?: any
    extraContainers?: any
    extraEnvs?: any
    extraVolumeMounts?: any
    extraVolumes?: any
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
    livenessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      port?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    metrics?: {
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
    minAvailable?: any
    minReadySeconds?: any
    name?: any
    nodeSelector?: any
    podAnnotations?: any
    podLabels?: any
    publishService?: {
      enabled?: any
      pathOverride?: any
    }
    readinessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      port?: any
      successThreshold?: any
      timeoutSeconds?: any
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
      labels?: any
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
    affinity?: any
    enabled?: any
    extraArgs?: any
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
  imagePullSecrets?: any
  nameOverride?: any
  rbac?: {
    create?: any
  }
  revisionHistoryLimit?: any
  serviceAccount?: {
    create?: any
    name?: any
  }
  tcp?: any
  udp?: any
}

