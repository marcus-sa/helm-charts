// Automatically generated

export interface ChartValues {
  elasticsearch?: {
    env?: {
      clusterName?: any
      esUsername?: any
    }
  }
  imagePullPolicy?: any
  imagePullSecrets?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    path?: any
    tls?: any
  }
  initContainerImage?: any
  insightExecutor?: {
    affinity?: any
    externalPort?: any
    fullnameOverride?: any
    home?: any
    image?: any
    internalPort?: any
    javaOpts?: {
      other?: any
      xms?: any
      xmx?: any
    }
    name?: any
    nodeSelector?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    replicaCount?: any
    resources?: any
    service?: {
      type?: any
    }
    tolerations?: any
    version?: any
  }
  insightScheduler?: {
    affinity?: any
    externalPort?: any
    fullnameOverride?: any
    home?: any
    image?: any
    internalPort?: any
    javaOpts?: {
      other?: any
      xms?: any
      xmx?: any
    }
    name?: any
    nodeSelector?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    replicaCount?: any
    resources?: any
    service?: {
      name?: any
      type?: any
    }
    tolerations?: any
    version?: any
  }
  insightServer?: {
    affinity?: any
    allowIP?: any
    externalHttpPort?: any
    fullnameOverride?: any
    home?: any
    image?: any
    internalHttpPort?: any
    name?: any
    nodeSelector?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    replicaCount?: any
    resources?: any
    service?: {
      type?: any
    }
    tolerations?: any
    version?: any
  }
  missionControl?: {
    affinity?: any
    appName?: any
    customInitContainers?: any
    dist?: any
    externalPort?: any
    fullnameOverride?: any
    home?: any
    image?: any
    internalPort?: any
    javaOpts?: {
      other?: any
      xms?: any
      xmx?: any
    }
    missionControlUrl?: any
    name?: any
    nodeSelector?: any
    osDist?: any
    osType?: any
    osVersion?: any
    package?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    replicaCount?: any
    repository?: any
    resources?: any
    service?: {
      type?: any
    }
    tolerations?: any
    version?: any
  }
  mongodb?: {
    db?: {
      adminPassword?: any
      adminUser?: any
      insightExecutorDb?: any
      insightPassword?: any
      insightSchedulerDb?: any
      insightServerDb?: any
      insightUser?: any
      mcPassword?: any
      mcUser?: any
      missionControl?: any
    }
    enabled?: any
  }
  nameOverride?: any
  nodeSelector?: any
  podRestartTime?: any
  postInstallHook?: {
    image?: {
      repository?: any
      tag?: any
    }
  }
  rbac?: {
    create?: any
    role?: {
      rules?: any
    }
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  uid?: any
}

