// Automatically generated

export interface ChartValues {
  es?: {
    all?: any
    indices?: any
    ssl?: {
      ca?: {
        pem?: any
      }
      client?: {
        key?: any
        pem?: any
      }
      enabled?: any
    }
    timeout?: any
    uri?: any
  }
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  priorityClassName?: any
  replicaCount?: any
  resources?: any
  restartPolicy?: any
  service?: {
    annotations?: any
    httpPort?: any
    type?: any
  }
  serviceMonitor?: {
    enabled?: any
    interval?: any
    labels?: any
    namespace?: any
    scheme?: any
    scrapeTimeout?: any
  }
  tolerations?: any
  web?: {
    path?: any
  }
}

