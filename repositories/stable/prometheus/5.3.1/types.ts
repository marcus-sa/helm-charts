// Automatically generated

export interface ChartValues {
  alertmanager?: {
    affinity?: any
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
    prefixURL?: any
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      clusterIP?: any
      enableMeshPeer?: any
      externalIPs?: any
      labels?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      nodePort?: any
      servicePort?: any
      type?: any
    }
    serviceAccountName?: any
    tolerations?: any
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
  initChownData?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    resources?: any
  }
  kubeStateMetrics?: {
    affinity?: any
    args?: any
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
    tolerations?: any
  }
  nameOverride?: any
  networkPolicy?: {
    enabled?: any
  }
  nodeExporter?: {
    enabled?: any
    extraArgs?: any
    extraConfigmapMounts?: any
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
    securityContext?: any
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
    updateStrategy?: any
  }
  pushgateway?: {
    affinity?: any
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
    tolerations?: any
  }
  rbac?: {
    create?: any
  }
  server?: {
    affinity?: any
    baseURL?: any
    configMapOverrideName?: any
    extraArgs?: any
    extraConfigmapMounts?: any
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
    prefixURL?: any
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
    strategy?: any
    terminationGracePeriodSeconds?: any
    tolerations?: any
  }
  serverFiles?: any
}

