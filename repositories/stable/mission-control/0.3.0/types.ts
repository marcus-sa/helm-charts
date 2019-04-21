// Automatically generated

export interface ChartValues {
  elasticsearch?: {
    env?: {
      clusterName?: any
      esUsername?: any
    }
  }
  existingCertsSecret?: any
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
  insightCrt?: any
  insightExecutor?: {
    affinity?: any
    externalPort?: any
    fullnameOverride?: any
    image?: any
    internalPort?: any
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
  insightKey?: any
  insightScheduler?: {
    affinity?: any
    externalPort?: any
    fullnameOverride?: any
    image?: any
    internalPort?: any
    name?: any
    nodeSelector?: any
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
    externalHttpPort?: any
    externalHttpsPort?: any
    fullnameOverride?: any
    image?: any
    internalHttpPort?: any
    internalHttpsPort?: any
    name?: any
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    service?: {
      type?: any
    }
    tolerations?: any
    version?: any
  }
  jfmcCrt?: any
  jfmcKeystore?: any
  jfmcTruststore?: any
  missionControl?: {
    affinity?: any
    externalPort?: any
    fullnameOverride?: any
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
  mongodb?: {
    db?: {
      adminPassword?: any
      adminUser?: any
      insightPassword?: any
      insightSchedulerDb?: any
      insightUser?: any
      mcPassword?: any
      mcUser?: any
    }
    enabled?: any
    image?: {
      tag?: any
    }
  }
  nameOverride?: any
  nodeSelector?: any
  podRestartTime?: any
}

