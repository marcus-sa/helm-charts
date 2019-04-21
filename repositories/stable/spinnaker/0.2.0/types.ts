// Automatically generated

export interface ChartValues {
  accounts?: any
  deck?: {
    host?: any
    port?: any
    protocol?: any
  }
  gate?: {
    allowedOriginsPattern?: any
  }
  gcs?: {
    enabled?: any
    jsonKey?: any
    project?: any
  }
  images?: {
    clouddriver?: any
    deck?: any
    echo?: any
    front50?: any
    gate?: any
    igor?: any
    orca?: any
    rosco?: any
  }
  jenkins?: {
    Agent?: {
      Cpu?: any
      Image?: any
      ImageTag?: any
      Memory?: any
    }
    Master?: {
      ContainerPort?: any
      Cpu?: any
      Image?: any
      ImagePullPolicy?: any
      ImageTag?: any
      JavaOpts?: any
      Memory?: any
      SlaveListenerPort?: any
    }
  }
  mail?: {
    enabled?: any
    fromAddress?: any
    host?: any
    password?: any
    port?: any
    username?: any
  }
  minio?: {
    accessKey?: any
    secretKey?: any
  }
  nameOverride?: any
  redis?: {
    redisPassword?: any
  }
  serviceType?: any
  storageBucket?: any
}

