// Automatically generated

export interface ChartValues {
  arch?: any
  global?: {
    image?: {
      secretName?: any
    }
  }
  image?: {
    name?: any
    pullPolicy?: any
    repository?: any
    tag?: any
    testRepository?: any
  }
  license?: any
  logstashProbe?: {
    autoscaling?: {
      cpuUtil?: any
      enabled?: any
      maxReplicas?: any
      minReplicas?: any
    }
    enabled?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      tls?: any
    }
    poddisruptionbudget?: {
      enabled?: any
      minAvailable?: any
    }
    replicaCount?: any
    service?: {
      externalPort?: any
      type?: any
    }
  }
  netcool?: {
    backupHost?: any
    backupPort?: any
    backupServer?: any
    primaryHost?: any
    primaryPort?: any
    primaryServer?: any
  }
  probe?: {
    messageLevel?: any
  }
  prometheusProbe?: {
    autoscaling?: {
      cpuUtil?: any
      enabled?: any
      maxReplicas?: any
      minReplicas?: any
    }
    enabled?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      tls?: any
    }
    poddisruptionbudget?: {
      enabled?: any
      minAvailable?: any
    }
    replicaCount?: any
    service?: {
      externalPort?: any
      type?: any
    }
  }
  resources?: any
}

