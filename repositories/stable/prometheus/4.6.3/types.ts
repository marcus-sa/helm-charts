// Automatically generated

export interface ChartValues {
  alertmanager?: {
    baseURL?: any
    configMapOverrideName?: any
    enabled?: any
    extraArgs?: any
    extraEnv?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      tls?: any
    }
    name?: any
    nodeSelector?: any
    persistentVolume?: {
      accessModes?: any
      annotations?: any
      enabled?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
      subPath?: any
    }
    podAnnotations?: any
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      labels?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      nodePort?: any
      servicePort?: any
      type?: any
    }
    serviceAccountName?: any
  }
  alertmanagerFiles?: any
  configmapReload?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    resources?: any
  }
  kubeStateMetrics?: {
    enabled?: any
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
      labels?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      servicePort?: any
      type?: any
    }
    serviceAccountName?: any
  }
  nameOverride?: any
  networkPolicy?: {
    enabled?: any
  }
  nodeExporter?: {
    enabled?: any
    extraArgs?: any
    extraHostPathMounts?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    nodeSelector?: any
    podAnnotations?: any
    resources?: any
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      hostPort?: any
      labels?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      servicePort?: any
      type?: any
    }
    serviceAccountName?: any
    tolerations?: any
  }
  pushgateway?: {
    enabled?: any
    extraArgs?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      tls?: any
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
      labels?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      servicePort?: any
      type?: any
    }
  }
  rbac?: {
    create?: any
  }
  server?: {
    alertmanagerURL?: any
    baseURL?: any
    configMapOverrideName?: any
    extraArgs?: any
    extraHostPathMounts?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      tls?: any
    }
    name?: any
    nodeSelector?: any
    persistentVolume?: {
      accessModes?: any
      annotations?: any
      enabled?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
      subPath?: any
    }
    podAnnotations?: any
    replicaCount?: any
    resources?: any
    retention?: any
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      labels?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      nodePort?: any
      servicePort?: any
      type?: any
    }
    serviceAccountName?: any
    terminationGracePeriodSeconds?: any
    tolerations?: any
  }
  serverFiles?: any
}

