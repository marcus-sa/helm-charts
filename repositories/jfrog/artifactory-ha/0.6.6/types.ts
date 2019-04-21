// Automatically generated

export interface ChartValues {
  artifactory?: {
    annotations?: any
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
    masterKeySecretName?: any
    membershipPort?: any
    name?: any
    node?: {
      affinity?: any
      javaOpts?: {
        other?: any
        xms?: any
        xmx?: any
      }
      minAvailable?: any
      nodeSelector?: any
      persistence?: {
        existingClaim?: any
      }
      podAntiAffinity?: {
        topologyKey?: any
        type?: any
      }
      replicaCount?: any
      resources?: any
      tolerations?: any
    }
    persistence?: {
      accessMode?: any
      awsS3?: {
        bucketName?: any
        credential?: any
        endpoint?: any
        identity?: any
        path?: any
        properties?: any
        refreshCredentials?: any
        region?: any
        testConnection?: any
      }
      enabled?: any
      googleStorage?: {
        bucketName?: any
        credential?: any
        identity?: any
        path?: any
      }
      local?: any
      maxCacheSize?: any
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
    postStartCommand?: any
    primary?: {
      affinity?: any
      javaOpts?: {
        other?: any
        xms?: any
        xmx?: any
      }
      nodeSelector?: any
      persistence?: {
        existingClaim?: any
      }
      resources?: any
      tolerations?: any
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
    secrets?: {
      password?: {
        key?: any
        name?: any
      }
      user?: {
        Key?: any
        name?: any
      }
    }
    type?: any
    user?: any
  }
  fullnameOverride?: any
  imagePullSecrets?: any
  ingress?: {
    annotations?: any
    defaultBackend?: {
      enabled?: any
    }
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
    fullnameOverride?: any
    gid?: any
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
    uid?: any
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

