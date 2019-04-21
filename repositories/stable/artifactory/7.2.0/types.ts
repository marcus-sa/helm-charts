// Automatically generated

export interface ChartValues {
  artifactory?: {
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
    persistence?: {
      ExistingClaim?: any
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
    replicator?: {
      enabled?: any
      publicUrl?: any
    }
    resources?: any
    service?: {
      annotations?: any
      type?: any
    }
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
    enabled?: any
    env?: {
      artUrl?: any
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
  }
  postgresql?: {
    enabled?: any
    postgresUser?: any
    service?: {
      port?: any
    }
  }
}

