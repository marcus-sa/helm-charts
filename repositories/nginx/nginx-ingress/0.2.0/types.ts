// Automatically generated

export interface ChartValues {
  controller?: {
    config?: {
      entries?: any
    }
    defaultTLS?: {
      cert?: any
      key?: any
      secret?: any
    }
    healthStatus?: any
    hostNetwork?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    ingressClass?: any
    kind?: any
    name?: any
    nginxDebug?: any
    nginxStatus?: {
      allowCidrs?: any
      enable?: any
      port?: any
    }
    nginxplus?: any
    nodeSelector?: any
    replicaCount?: any
    reportIngressStatus?: {
      enable?: any
      enableLeaderElection?: any
      externalService?: any
    }
    service?: {
      annotations?: any
      create?: any
      externalIPs?: any
      externalTrafficPolicy?: any
      loadBalancerIP?: any
      type?: any
    }
    serviceAccount?: {
      imagePullSecrets?: any
      name?: any
    }
    terminationGracePeriodSeconds?: any
    tolerations?: any
    useIngressClassOnly?: any
    watchNamespace?: any
  }
  prometheus?: {
    create?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    port?: any
  }
  rbac?: {
    create?: any
  }
}

