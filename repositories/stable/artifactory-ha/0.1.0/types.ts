// Automatically generated

export interface ChartValues {
  artifactory?: {
    externalPort?: any
    image?: {
      pullPolicy?: any
      repository?: any
      version?: any
    }
    internalPort?: any
    javaOpts?: {
      other?: any
    }
    license?: {
      dataKey?: any
      secret?: any
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
      replicaCount?: any
      resources?: any
    }
    persistence?: {
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
      type?: any
    }
    primary?: {
      javaOpts?: {
        other?: any
        xms?: any
        xmx?: any
      }
      resources?: any
    }
    service?: {
      pool?: any
      type?: any
    }
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
  initContainerImage?: any
  nameOverride?: any
  nginx?: {
    env?: {
      ssl?: any
    }
    fullnameOverride?: any
    image?: {
      pullPolicy?: any
      repository?: any
      version?: any
    }
    name?: any
    replicaCount?: any
    resources?: any
    service?: {
      loadBalancerSourceRanges?: any
      type?: any
    }
  }
  postgresql?: {
    enabled?: any
    postgresUser?: any
    service?: {
      port?: any
    }
  }
}

