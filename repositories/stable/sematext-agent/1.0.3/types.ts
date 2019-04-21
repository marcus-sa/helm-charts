// Automatically generated

export interface ChartValues {
  agent?: {
    config?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
    service?: {
      port?: any
      type?: any
    }
  }
  containerToken?: any
  customUrl?: {
    eventsRecieverUrl?: any
    logsReceiverUrl?: any
    serverBaseUrl?: any
  }
  fullnameOverride?: any
  imagePullSecrets?: any
  infraToken?: any
  logagent?: {
    config?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
  }
  logseneToken?: any
  nameOverride?: any
  nodeSelector?: any
  rbac?: {
    create?: any
  }
  region?: any
  serviceAccount?: {
    create?: any
    name?: any
  }
  tolerations?: any
}

