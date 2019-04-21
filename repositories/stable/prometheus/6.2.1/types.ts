// Automatically generated

export interface ChartValues {
  alertmanager?: {
    affinity?: any
    baseURL?: any
    configMapOverrideName?: any
    enabled?: any
    extraArgs?: any
    extraEnv?: any
    fullnameOverride?: any
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
    tolerations?: any
  }
  alertmanagerFiles?: any
  configmapReload?: {
    extraArgs?: any
    extraConfigmapMounts?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    resources?: any
  }
  fullnameOverride?: any
  initChownData?: {
    enabled?: any
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
    fullnameOverride?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    nodeSelector?: any
    pod?: {
      labels?: any
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
      servicePort?: any
      type?: any
    }
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
    fullnameOverride?: any
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
    tolerations?: any
    updateStrategy?: any
  }
  pushgateway?: {
    affinity?: any
    enabled?: any
    extraArgs?: any
    fullnameOverride?: any
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
    extraSecretMounts?: any
    fullnameOverride?: any
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
    strategy?: any
    terminationGracePeriodSeconds?: any
    tolerations?: any
  }
  serverFiles?: any
  serviceAccounts?: {
    alertmanager?: {
      create?: any
      name?: any
    }
    kubeStateMetrics?: {
      create?: any
      name?: any
    }
    nodeExporter?: {
      create?: any
      name?: any
    }
    pushgateway?: {
      create?: any
      name?: any
    }
    server?: {
      create?: any
      name?: any
    }
  }
}

