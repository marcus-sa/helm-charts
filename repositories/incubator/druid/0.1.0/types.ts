// Automatically generated

export interface ChartValues {
  broker?: {
    affinity?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      path?: any
      tls?: any
    }
    javaOpts?: any
    name?: any
    nodeSelector?: any
    podAnnotations?: any
    port?: any
    replicaCount?: any
    resources?: any
    serviceType?: any
    tolerations?: any
  }
  coordinator?: {
    affinity?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      path?: any
      tls?: any
    }
    javaOpts?: any
    name?: any
    nodeSelector?: any
    podAnnotations?: any
    port?: any
    replicaCount?: any
    resources?: any
    serviceType?: any
    tolerations?: any
  }
  env?: any
  fullnameOverride?: any
  historical?: {
    antiAffinity?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      path?: any
      tls?: any
    }
    javaOpts?: any
    name?: any
    nodeAffinity?: any
    nodeSelector?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      size?: any
      storageClass?: any
    }
    podAnnotations?: any
    podDisruptionBudget?: {
      enabled?: any
      maxUnavailable?: any
      minAvailable?: any
    }
    port?: any
    replicaCount?: any
    resources?: any
    serviceType?: any
    tolerations?: any
    updateStrategy?: {
      type?: any
    }
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  middleManager?: {
    antiAffinity?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      path?: any
      tls?: any
    }
    javaOpts?: any
    name?: any
    nodeAffinity?: any
    nodeSelector?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      size?: any
      storageClass?: any
    }
    podAnnotations?: any
    podDisruptionBudget?: {
      enabled?: any
      maxUnavailable?: any
      minAvailable?: any
    }
    port?: any
    replicaCount?: any
    resources?: any
    serviceType?: any
    tolerations?: any
    updateStrategy?: {
      type?: any
    }
  }
  mysql?: {
    enabled?: any
    mysqlDatabase?: any
    mysqlPassword?: any
    mysqlUser?: any
  }
  nameOverride?: any
  overlord?: {
    affinity?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      path?: any
      tls?: any
    }
    javaOpts?: any
    name?: any
    nodeSelector?: any
    podAnnotations?: any
    port?: any
    replicaCount?: any
    resources?: any
    serviceType?: any
    tolerations?: any
  }
  zkHosts?: any
  zookeeper?: {
    enabled?: any
  }
}

