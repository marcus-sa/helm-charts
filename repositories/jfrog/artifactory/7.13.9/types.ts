// Automatically generated

export interface ChartValues {
  artifactory?: {
    accessAdmin?: {
      dataKey?: any
      password?: any
      secret?: any
    }
    affinity?: any
    annotations?: any
    catalinaLoggers?: any
    configMapName?: any
    copyOnEveryStartup?: any
    customInitContainers?: any
    customSidecarContainers?: any
    customVolumes?: any
    externalPort?: any
    externalPortReplicator?: any
    extraEnvironmentVariables?: any
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
      path?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    loggers?: any
    masterKey?: any
    masterKeySecretName?: any
    name?: any
    nodeSelector?: any
    persistence?: {
      awsS3?: {
        bucketName?: any
        credential?: any
        endpoint?: any
        identity?: any
        path?: any
        properties?: any
        refreshCredentials?: any
        region?: any
        roleName?: any
        s3AwsVersion?: any
        testConnection?: any
      }
      azureBlob?: {
        accountKey?: any
        accountName?: any
        containerName?: any
        endpoint?: any
        testConnection?: any
      }
      enabled?: any
      existingClaim?: any
      googleStorage?: {
        bucketName?: any
        credential?: any
        identity?: any
        path?: any
      }
      maxCacheSize?: any
      mountPath?: any
      nfs?: {
        backupDir?: any
        dataDir?: any
      }
      size?: any
      type?: any
    }
    postStartCommand?: any
    preStartCommand?: any
    readinessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      path?: any
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
    terminationGracePeriodSeconds?: any
    tolerations?: any
    uid?: any
    userPluginSecrets?: any
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
      url?: {
        key?: any
        name?: any
      }
      user?: {
        key?: any
        name?: any
      }
    }
    type?: any
    url?: any
    user?: any
  }
  imagePullSecrets?: any
  ingress?: {
    annotations?: any
    defaultBackend?: {
      enabled?: any
    }
    enabled?: any
    hosts?: any
    labels?: any
    path?: any
    tls?: any
  }
  initContainerImage?: any
  installer?: {
    platform?: any
    type?: any
  }
  logger?: {
    image?: {
      repository?: any
      tag?: any
    }
  }
  nameOverride?: any
  networkpolicy?: any
  nginx?: {
    affinity?: any
    customArtifactoryConfigMap?: any
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
      path?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    loggers?: any
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
      path?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    replicaCount?: any
    resources?: any
    service?: {
      annotations?: any
      externalTrafficPolicy?: any
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

