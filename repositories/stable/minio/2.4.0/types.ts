// Automatically generated

export interface ChartValues {
  DeploymentUpdate?: {
    maxSurge?: any
    maxUnavailable?: any
    type?: any
  }
  StatefulSetUpdate?: {
    updateStrategy?: any
  }
  accessKey?: any
  affinity?: any
  azuregateway?: {
    enabled?: any
    replicas?: any
  }
  buckets?: any
  clusterDomain?: any
  configPath?: any
  configPathmc?: any
  defaultBucket?: {
    enabled?: any
    name?: any
    policy?: any
    purge?: any
  }
  environment?: any
  existingSecret?: any
  fullnameOverride?: any
  gcsgateway?: {
    enabled?: any
    gcsKeyJson?: any
    projectId?: any
    replicas?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    path?: any
    tls?: any
  }
  livenessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  mcImage?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  minioConfig?: {
    aqmp?: {
      autoDeleted?: any
      deliveryMode?: any
      durable?: any
      enable?: any
      exchange?: any
      exchangeType?: any
      immediate?: any
      internal?: any
      mandatory?: any
      noWait?: any
      routingKey?: any
      url?: any
    }
    cache?: {
      drives?: any
      exclude?: any
      expiry?: any
      maxuse?: any
    }
    elasticsearch?: {
      enable?: any
      format?: any
      index?: any
      url?: any
    }
    kafka?: {
      brokers?: any
      enable?: any
      topic?: any
    }
    mqtt?: {
      broker?: any
      clientId?: any
      enable?: any
      keepAliveInterval?: any
      password?: any
      qos?: any
      reconnectInterval?: any
      topic?: any
      username?: any
    }
    mysql?: {
      database?: any
      dsnString?: any
      enable?: any
      format?: any
      host?: any
      password?: any
      port?: any
      table?: any
      user?: any
    }
    nats?: {
      address?: any
      async?: any
      clientID?: any
      clusterID?: any
      enable?: any
      enableStreaming?: any
      maxPubAcksInflight?: any
      password?: any
      pingInterval?: any
      secure?: any
      subject?: any
      token?: any
      username?: any
    }
    postgresql?: {
      connectionString?: any
      database?: any
      enable?: any
      format?: any
      host?: any
      password?: any
      port?: any
      table?: any
      user?: any
    }
    redis?: {
      address?: any
      enable?: any
      format?: any
      key?: any
      password?: any
    }
    region?: any
    storageClass?: {
      reducedRedundancyStorageClass?: any
      standardStorageClass?: any
    }
    webhook?: {
      enable?: any
      endpoint?: any
    }
    worm?: any
  }
  mode?: any
  mountPath?: any
  nameOverride?: any
  nasgateway?: {
    enabled?: any
    pv?: any
    replicas?: any
  }
  networkPolicy?: {
    allowExternal?: any
    enabled?: any
  }
  nodeSelector?: any
  ossgateway?: {
    enabled?: any
    endpointURL?: any
    replicas?: any
  }
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
    subPath?: any
  }
  priorityClassName?: any
  readinessProbe?: {
    failureThreshold?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  replicas?: any
  resources?: any
  s3gateway?: {
    enabled?: any
    replicas?: any
  }
  secretKey?: any
  service?: {
    annotations?: any
    clusterIP?: any
    externalIPs?: any
    loadBalancerIP?: any
    nodePort?: any
    port?: any
    type?: any
  }
  tls?: {
    certSecret?: any
    enabled?: any
    privateKey?: any
    publicCrt?: any
  }
  tolerations?: any
}

