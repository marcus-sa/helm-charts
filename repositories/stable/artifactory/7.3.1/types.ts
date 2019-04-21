// Automatically generated

export interface ChartValues {
  artifactory?: {
    affinity?: any
    configMapName?: any
    distributionCerts?: any
    externalPort?: any
    externalPortReplicator?: any
    image?: {
      pullPolicy?: any
      repository?: any
      version?: any
    }
    internalPort?: any
    internalPortReplicator?: any
    javaOpts?: {
      other?: any
      xms?: any
      xmx?: any
    }
    license?: {
      dataKey?: any
      secret?: any
    }
    livenessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    name?: any
    nodeSelector?: any
    persistence?: {
      accessMode?: any
      annotations?: any
      enabled?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
    }
    postStartCommand?: any
    readinessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    replicator?: {
      enabled?: any
      publicUrl?: any
    }
    resources?: any
    service?: {
      annotations?: any
      type?: any
    }
    tolerations?: any
    uid?: any
  }
  database?: {
    host?: any
    password?: any
    port?: any
    type?: any
    user?: any
  }
  imagePullSecrets?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  initContainerImage?: any
  nameOverride?: any
  nginx?: {
    affinity?: any
    customConfigMap?: any
    enabled?: any
    env?: {
      artUrl?: any
      skipAutoConfigUpdate?: any
      ssl?: any
    }
    externalPortHttp?: any
    externalPortHttps?: any
    externalPortReplicator?: any
    image?: {
      pullPolicy?: any
      repository?: any
      version?: any
    }
    internalPortHttp?: any
    internalPortHttps?: any
    internalPortReplicator?: any
    livenessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
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
    readinessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      type?: any
    }
    tlsSecretName?: any
    tolerations?: any
  }
  postgresql?: {
    enabled?: any
    postgresUser?: any
    service?: {
      port?: any
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
}

