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
    masterKey?: any
    membershipPort?: any
    name?: any
    node?: {
      javaOpts?: {
        other?: any
        xms?: any
        xmx?: any
      }
      persistence?: {
        existingClaim?: any
      }
      replicaCount?: any
      resources?: any
    }
    persistence?: {
      accessMode?: any
      awsS3?: {
        bucketName?: any
        credential?: any
        identity?: any
        path?: any
        region?: any
      }
      enabled?: any
      googleStorage?: {
        bucketName?: any
        credential?: any
        identity?: any
        path?: any
      }
      local?: any
      mountPath?: any
      nfs?: {
        backupDir?: any
        capacity?: any
        dataDir?: any
        haBackupMount?: any
        haDataMount?: any
        ip?: any
      }
      redundancy?: any
      size?: any
      storageClass?: any
      type?: any
    }
    primary?: {
      javaOpts?: {
        other?: any
        xms?: any
        xmx?: any
      }
      persistence?: {
        existingClaim?: any
      }
      resources?: any
    }
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
    service?: {
      pool?: any
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
  fullnameOverride?: any
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
      skipAutoConfigUpdate?: any
      ssl?: any
    }
    externalPortHttp?: any
    externalPortHttps?: any
    externalPortReplicator?: any
    fullnameOverride?: any
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

