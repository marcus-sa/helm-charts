// Automatically generated

export interface ChartValues {
  accounts?: any
  deck?: {
    host?: any
    ingress?: {
      annotations?: any
      enabled?: any
      tls?: any
    }
    port?: any
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
      Enabled?: any
      Image?: any
      ImageTag?: any
      Memory?: any
      NodeSelector?: any
    }
    Master?: {
      InitScripts?: any
      InstallPlugins?: any
      ScriptApproval?: any
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
    enabled?: any
    secretKey?: any
  }
  nameOverride?: any
  nodeSelector?: any
  redis?: {
    redisPassword?: any
  }
  serviceType?: any
  slack?: {
    botName?: any
    enabled?: any
    token?: any
  }
  storageBucket?: any
}

