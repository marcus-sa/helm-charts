// Automatically generated

export interface ChartValues {
  accessKey?: any
  configPath?: any
  image?: any
  imagePullPolicy?: any
  imageTag?: any
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
      password?: any
      qos?: any
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
    webhook?: {
      enable?: any
      endpoint?: any
    }
  }
  minioLoadBalancerIP?: any
  mode?: any
  mountPath?: any
  nameOverride?: any
  networkPolicy?: {
    allowExternal?: any
    enabled?: any
  }
  persistence?: {
    accessMode?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  replicas?: any
  resources?: any
  secretKey?: any
  servicePort?: any
  serviceType?: any
}

