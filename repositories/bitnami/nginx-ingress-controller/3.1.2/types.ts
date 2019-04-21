// Automatically generated

export interface ChartValues {
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
    hostPorts?: {
      http?: any
      https?: any
    }
    useHostPort?: any
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
    port?: any
    priorityClassName?: any
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      port?: any
      type?: any
    }
    tolerations?: any
  }
  defaultBackendService?: any
  dnsPolicy?: any
  electionID?: any
  extraArgs?: any
  extraContainers?: any
  extraEnvs?: any
  extraInitContainers?: any
  extraVolumeMounts?: any
  extraVolumes?: any
  global?: {
    imageRegistry?: any
  }
  headers?: any
  hostNetwork?: any
  image?: {
    pullPolicy?: any
    registry?: any
    repository?: any
    tag?: any
  }
  imagePullSecrets?: any
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
      port?: any
      type?: any
    }
  }
  minAvailable?: any
  minReadySeconds?: any
  name?: any
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  podLabels?: any
  podSecurityPolicy?: {
    enabled?: any
  }
  priorityClassName?: any
  publishService?: {
    enabled?: any
    pathOverride?: any
  }
  rbac?: {
    create?: any
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
  revisionHistoryLimit?: any
  scope?: {
    enabled?: any
    namespace?: any
  }
  securityContext?: {
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    annotations?: any
    clusterIP?: any
    enableHttp?: any
    enableHttps?: any
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
  serviceAccount?: {
    create?: any
    name?: any
  }
  stats?: {
    enabled?: any
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      port?: any
      type?: any
    }
  }
  tcp?: any
  tolerations?: any
  udp?: any
  updateStrategy?: any
}

